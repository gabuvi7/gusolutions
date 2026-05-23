export function LocalizedText({ es, en }: { es: string; en?: string }) {
  const fallback = en ?? es;

  return (
    <>
      <span className="lang-es">{es}</span>
      <span className="lang-en">{fallback}</span>
    </>
  );
}
