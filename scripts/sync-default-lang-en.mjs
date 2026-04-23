/**
 * Sets default visible text to data-en for every element with both data-es and data-en.
 * Closing tags may be split across lines (e.g. </span\n>).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, "..", "index.html");

function decodeAttr(raw) {
  return raw
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

/** Index of `</tag` followed by optional whitespace and `>` */
function nextCloseTag(html, pos, tag) {
  const low = html.toLowerCase();
  const needle = `</${tag.toLowerCase()}`;
  let i = pos;
  while (i < html.length) {
    const j = low.indexOf(needle, i);
    if (j === -1) return -1;
    let k = j + needle.length;
    while (k < html.length && /\s/.test(html[k])) k++;
    if (html[k] === ">") return j;
    i = j + 1;
  }
  return -1;
}

/** End index (exclusive) of full closing token including `>` */
function closeTagEnd(html, closeStart, tag) {
  const low = html.toLowerCase();
  const needle = `</${tag.toLowerCase()}`;
  let k = closeStart + needle.length;
  while (k < html.length && /\s/.test(html[k])) k++;
  if (html[k] === ">") return k + 1;
  return -1;
}

/** Index of next `<tag` opening (not `</tag`) */
function nextOpenTag(html, pos, tag) {
  const low = html.toLowerCase();
  const needle = `<${tag.toLowerCase()}`;
  let p = pos;
  while (p < html.length) {
    const i = low.indexOf(needle, p);
    if (i === -1) return -1;
    if (i > 0 && html[i - 1] === "/") {
      p = i + 1;
      continue;
    }
    const after = i + needle.length;
    const c = html[after];
    if (c === " " || c === ">" || c === "\t" || c === "\n" || c === "\r" || c === "/") {
      return i;
    }
    p = i + 1;
  }
  return -1;
}

/** `>` that closes the opening tag starting at openLt (first `>` in tag) */
function openTagGt(html, openLt) {
  return html.indexOf(">", openLt);
}

function findMatchingCloseStart(html, innerStart, tag) {
  let pos = innerStart;
  let depth = 1;
  while (depth > 0 && pos < html.length) {
    const nextOpen = nextOpenTag(html, pos, tag);
    const nextClose = nextCloseTag(html, pos, tag);
    if (nextClose === -1) return -1;
    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth++;
      const gtInner = html.indexOf(">", nextOpen);
      if (gtInner === -1) return -1;
      pos = gtInner + 1;
    } else {
      depth--;
      if (depth === 0) return nextClose;
      const end = closeTagEnd(html, nextClose, tag);
      if (end === -1) return -1;
      pos = end;
    }
  }
  return -1;
}

let html = fs.readFileSync(filePath, "utf8");
let out = "";
let scan = 0;

while (scan < html.length) {
  const lt = html.indexOf("<", scan);
  if (lt === -1) {
    out += html.slice(scan);
    break;
  }
  out += html.slice(scan, lt);
  const tagM = /^<([a-zA-Z][\w-]*)/.exec(html.slice(lt, lt + 40));
  if (!tagM) {
    out += html[lt];
    scan = lt + 1;
    continue;
  }
  const tag = tagM[1];
  const gt = openTagGt(html, lt);
  if (gt === -1) {
    out += html[lt];
    scan = lt + 1;
    continue;
  }
  const chunk = html.slice(lt, gt + 1);
  const isClose = /^<\//.test(chunk);
  const isVoid =
    /^<(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)\b/i.test(
      chunk
    ) || /\/\s*>$/.test(chunk);
  const hasEs = /\bdata-es="/.test(chunk);
  const hasEn = /\bdata-en="/.test(chunk);

  if (isClose || isVoid || !hasEs || !hasEn) {
    out += chunk;
    scan = gt + 1;
    continue;
  }

  const enM = /\bdata-en="([^"]*)"/.exec(chunk);
  if (!enM) {
    out += chunk;
    scan = gt + 1;
    continue;
  }
  const enText = decodeAttr(enM[1]);
  const innerStart = gt + 1;
  const closeStart = findMatchingCloseStart(html, innerStart, tag);
  if (closeStart === -1) {
    out += chunk;
    scan = gt + 1;
    continue;
  }
  const closeEnd = closeTagEnd(html, closeStart, tag);
  if (closeEnd === -1) {
    out += chunk;
    scan = gt + 1;
    continue;
  }

  out += chunk + enText + html.slice(closeStart, closeEnd);
  scan = closeEnd;
}

fs.writeFileSync(filePath, out);
console.log("Synced default visible copy to data-en in index.html");
