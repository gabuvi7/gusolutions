# PRD — GU Solutions Website

## 1. Overview

GU Solutions is a software solutions brand focused on helping businesses, professionals, and companies digitize processes, automate operations, and build custom software tailored to real business needs.

The website will act as the main commercial and professional presentation channel for GU Solutions. It should communicate trust, technical capability, clarity, and business value.

The site should work as a landing page, portfolio, and lead-generation tool.

---

## 2. Product Goals

The main goal of the GU Solutions website is to present the company in a professional and commercial way, helping potential clients understand what GU Solutions does, what kind of problems it solves, and how to get in touch.

### Primary goals

- Present GU Solutions as a professional software solutions brand.
- Explain the services offered in a clear and business-oriented way.
- Showcase real projects and case studies.
- Generate leads through contact forms, WhatsApp, email, and LinkedIn.
- Build trust with potential clients.
- Position GU Solutions as more than a simple web development service.
- Support future scalability, including dynamic portfolio management and a possible client portal.

---

## 3. Target Audience

The website should target two main audiences.

### 3.1 Local clients in Argentina

Small and medium businesses, professionals, real estate agencies, accounting offices, local companies, and operational businesses that need:

- Institutional websites.
- Landing pages.
- Internal management systems.
- Custom business software.
- Process automation.
- Customer management.
- Payment, stock, ticket, or administrative control.
- Better online presence.

### 3.2 Technical and international clients

Companies, startups, or recruiters looking for:

- Frontend development.
- Full-stack development.
- Software architecture.
- Product-oriented engineering.
- Custom web platforms.
- Technical consulting.

---

## 4. Value Proposition

GU Solutions builds custom digital solutions that help businesses work better, reduce manual processes, and scale their operations.

### Main value proposition

> Software solutions designed to organize, automate, and grow your business.

### Alternative messaging

> We transform manual processes into efficient, scalable, and easy-to-use digital solutions.

### Positioning

GU Solutions should not be positioned only as a freelance portfolio or a simple web development service. The website should present the brand as a boutique software agency capable of building websites, internal systems, automation tools, and scalable platforms.

---

## 5. Scope

## 5.1 MVP Scope

The first version of the website should be a professional one-page landing with dynamic portfolio data.

The MVP should include:

- Home / Hero section.
- Services section.
- Portfolio / Projects section.
- Process section.
- Benefits section.
- About GU Solutions section.
- Contact section.
- Responsive design.
- Basic SEO.
- Favicon.
- Open Graph metadata.
- Dynamic project loading from Supabase.
- Supabase Storage for project images.
- Contact options through form, WhatsApp, email, and LinkedIn.

## 5.2 Out of Scope for MVP

The following items are not required for the first version:

- Full admin panel.
- Client portal.
- Blog.
- Advanced CMS.
- Authentication.
- Online payments.
- Project detail pages.
- Testimonials management.
- Public SaaS real estate product page.
- Multi-tenant SaaS functionality.

These items may be added in future phases.

---

## 6. Website Structure

The MVP can be implemented as a single-page website.

```txt
/
```

With internal sections:

```txt
#home
#services
#projects
#process
#benefits
#about
#contact
```

A future version may include dedicated pages:

```txt
/
/services
/projects
/projects/[slug]
/about
/contact
/client-portal
```

---

## 7. Main Sections

## 7.1 Home / Hero

The hero section should quickly explain what GU Solutions does and provide clear calls to action.

### Content requirements

- Brand name.
- Strong headline.
- Short description.
- Primary CTA.
- Secondary CTA.
- Visual element, abstract design, code-inspired graphic, or product mockup.

### Suggested headline

> Software solutions for modern businesses

### Suggested Spanish headline

> Soluciones de software para potenciar tu negocio

### Suggested supporting text

> We build websites, internal systems, and custom digital tools to help businesses improve operations, automate processes, and grow with technology.

### Suggested Spanish supporting text

> Creamos sitios web, sistemas internos y herramientas digitales a medida para ayudar a empresas y profesionales a trabajar mejor, automatizar procesos y escalar su negocio.

### CTAs

- Contact us
- Let’s talk
- View projects
- Hablemos de tu proyecto
- Ver proyectos
- Contactar por WhatsApp

---

## 7.2 Services

The services section should explain what GU Solutions offers in a clear, business-oriented way.

### Initial services

#### Custom Websites

Institutional websites, landing pages, portfolios, commercial websites, and professional online presence.

#### Custom Business Systems

Internal platforms for managing clients, payments, stock, operations, tickets, reports, or administrative workflows.

#### SaaS and Web Platforms

Scalable web applications and multi-tenant platforms designed for future growth.

#### Process Automation

Digitization of manual workflows, forms, notifications, reports, and internal operations.

#### Integrations

Connection with APIs, email services, databases, third-party tools, payment providers, and external platforms.

#### Maintenance and Continuous Improvement

Technical support, bug fixing, improvements, performance optimization, and long-term product evolution.

---

## 7.3 Portfolio / Projects

The portfolio should showcase real projects and demonstrate GU Solutions' ability to solve different types of problems.

The portfolio should be dynamic and loaded from Supabase, so projects can be updated without redeploying the website.

### Initial visible projects

The MVP should include 3 visible projects:

1. Vergani Propiedades
2. Internal customer management system
3. Prensadora Márquez management system

### Project excluded from public MVP portfolio

The real estate SaaS platform is currently in development. It should not be included as a main public portfolio item in the MVP unless it is clearly marked as a product in development.

Recommended handling:

- Do not show it in the main public portfolio for the MVP.
- Optionally mention it internally in the roadmap.
- Add it later as a case study or product page when it reaches a more mature stage.

---

## 7.4 Process

The process section should explain how GU Solutions works with clients.

### Suggested process

#### 1. Discovery

Understand the client's business, current process, pain points, and goals.

#### 2. Proposal

Define scope, features, estimated timeline, technical approach, and budget.

#### 3. Design and Development

Build the solution with focus on usability, scalability, performance, and maintainability.

#### 4. Delivery

Deploy the product, test the flow, and support the client during launch.

#### 5. Maintenance

Provide support, improvements, and continuous evolution based on business needs.

---

## 7.5 Benefits

This section should focus on why a client should choose GU Solutions.

### Suggested benefits

- Custom solutions based on real business needs.
- Direct communication during the entire process.
- Modern and scalable technology.
- Professional and responsive design.
- Possibility of monthly maintenance.
- Clean architecture and maintainable code.
- Experience in frontend, backend, product, and software architecture.
- Ability to build both websites and internal systems.

---

## 7.6 About GU Solutions

The about section should present GU Solutions as a professional software brand while also showing the personal experience behind it.

### Suggested content

> GU Solutions was created to help businesses, professionals, and companies build useful, scalable, and business-oriented digital solutions.
>
> We combine experience in frontend development, backend development, software architecture, and product thinking to create tools that not only look good, but also solve real operational problems.

### Founder-focused version

> Behind GU Solutions is Gabriel Uviedo, a Senior Software Engineer with more than 7 years of experience building digital products for local and international companies.

---

## 7.7 Contact

The contact section should make it easy for visitors to reach out.

### Contact options

- Contact form.
- WhatsApp button.
- Email.
- LinkedIn.
- Website URL.

### Contact form fields

- Name.
- Email.
- Phone, optional.
- Company, optional.
- Project type.
- Message.

### Project type options

- Website.
- Custom system.
- Automation.
- Maintenance.
- Consulting.
- SaaS / platform.
- Other.

---

## 8. Project Portfolio Strategy

The portfolio should not only show visual design. It should prove that GU Solutions can solve real problems across different business contexts.

### Portfolio positioning

The initial portfolio should demonstrate three main capabilities:

- Commercial web presence.
- Internal business systems.
- Operational and administrative software.

### Initial project positioning

## 8.1 Vergani Propiedades

### Type

Real estate website / digital presence.

### Goal

Improve online presence, property presentation, and customer acquisition for a real estate business.

### Value

Shows capability in commercial websites, real estate-oriented user experience, and client-facing digital presence.

### Suggested category

Real Estate Website

---

## 8.2 Internal Customer Management System

### Type

Internal business management platform.

### Goal

Organize customer information, improve follow-up, and centralize client-related operations.

### Value

Shows capability in dashboards, internal tools, business logic, and administrative UX.

### Suggested category

Customer Management System

---

## 8.3 Prensadora Márquez Management System

### Type

Operational and administrative management system.

### Goal

Improve business organization and management of operational processes for Prensadora Márquez.

### Value

Shows capability in solving real operational problems beyond simple websites.

### Suggested category

Business Management System

---

## 8.4 Real Estate SaaS Platform

### Type

SaaS platform for real estate agencies.

### Status

In development.

### MVP decision

This project should not be included in the public portfolio for the MVP unless it is clearly labeled as in progress.

### Future usage

It may become:

- A product page.
- A SaaS case study.
- A dedicated landing page.
- A commercial offer for real estate agencies.

---

## 9. Dynamic Content Management

The website should load portfolio projects from Supabase instead of hardcoding them in the frontend.

This avoids needing a new deployment every time a project, client, description, image, or technology list changes.

### Recommended approach

- Static brand content remains in code.
- Dynamic portfolio content is stored in Supabase.
- Project images are stored in Supabase Storage.
- A future admin panel can be added to manage this content.

### Content that should be dynamic

- Projects.
- Project images.
- Project descriptions.
- Technologies used.
- Project status.
- Visibility.
- Featured flag.
- Sort order.
- Optional bilingual content.

### Content that can remain static in code

- Hero title.
- Main brand messaging.
- Navigation.
- General service descriptions.
- Main metadata.
- Footer copy.
- Primary CTAs.

---

## 10. Data Model

## 10.1 `projects` table

Recommended initial table structure:

```sql
create table projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  client_name text,
  category text,
  short_description_es text,
  short_description_en text,
  full_description_es text,
  full_description_en text,
  problem_es text,
  problem_en text,
  solution_es text,
  solution_en text,
  result_es text,
  result_en text,
  technologies text[],
  main_image_url text,
  project_url text,
  repository_url text,
  is_featured boolean default false,
  is_published boolean default false,
  is_in_progress boolean default false,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

### Notes

- `slug` should be used for future project detail pages.
- `is_published` controls public visibility.
- `is_featured` controls highlighted projects.
- `is_in_progress` can be used for projects that are not fully completed.
- `sort_order` controls the display order.
- `technologies` can be stored as a simple text array for the MVP.

---

## 10.2 Optional `project_images` table

If a project needs multiple images, use a separate table.

```sql
create table project_images (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id) on delete cascade,
  image_url text not null,
  alt_text_es text,
  alt_text_en text,
  sort_order int default 0,
  created_at timestamptz default now()
);
```

For the MVP, this table is optional. A single `main_image_url` field in `projects` may be enough.

---

## 10.3 Optional `contact_leads` table

If contact submissions should be stored in Supabase, create a table for leads.

```sql
create table contact_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  company text,
  project_type text,
  message text not null,
  source text default 'website',
  created_at timestamptz default now()
);
```

---

## 11. Functional Requirements

## RF-01 — Navigation

The website must include a clear navigation menu with links to the main sections:

- Home.
- Services.
- Projects.
- Process.
- About.
- Contact.

---

## RF-02 — Hero CTA

The website must include a visible primary CTA in the hero section.

Accepted CTAs:

- Contact us.
- Let’s talk.
- Hablemos de tu proyecto.
- Contactar por WhatsApp.

---

## RF-03 — Portfolio from Supabase

The website must fetch projects from Supabase.

### Rules

- Only projects with `is_published = true` should be displayed publicly.
- Featured projects should be displayed first when applicable.
- Projects should be ordered by `sort_order`.
- If no image is available, a fallback visual should be displayed.
- The website should not require a deployment to update project content.

---

## RF-04 — Project Cards

Each project card should display:

- Project title.
- Client name, if available.
- Category.
- Short description.
- Main image or mockup.
- Technologies used.
- Optional link to project URL.

---

## RF-05 — Contact Form

The website should include a contact form.

### Required fields

- Name.
- Email.
- Message.

### Optional fields

- Phone.
- Company.
- Project type.

### Behavior

- Validate required fields.
- Validate email format.
- Show success message after submission.
- Show error message if submission fails.
- Optionally save the lead in Supabase.
- Optionally send an email using Resend or another email service.

---

## RF-06 — WhatsApp Contact

The website should include a WhatsApp CTA.

The button should open a prefilled message when possible.

Suggested message:

```txt
Hola Gabriel, vengo desde la web de GU Solutions y me gustaría consultar por un proyecto.
```

---

## RF-07 — Responsive Design

The website must work correctly on:

- Desktop.
- Tablet.
- Mobile.

Mobile experience is a priority because many local clients may access the site from WhatsApp, Instagram, LinkedIn, or mobile search.

---

## RF-08 — Basic SEO

The website must include:

- Page title.
- Meta description.
- Open Graph title.
- Open Graph description.
- Open Graph image.
- Favicon.
- Semantic HTML.
- Proper heading hierarchy.
- Descriptive alt text for images.

---

## RF-09 — Bilingual Support

The website should be prepared for Spanish and English content.

For MVP, bilingual support can be implemented in one of two ways:

### Option A

Use static content dictionaries in the frontend.

### Option B

Store bilingual project content in Supabase and static bilingual content in the frontend.

Recommended MVP approach:

- Static sections: frontend dictionary.
- Projects: Supabase fields with `_es` and `_en`.

---

## RF-10 — Project Visibility Control

The website must support hiding projects from the public website.

A project should be hidden when:

```txt
is_published = false
```

This allows adding drafts or incomplete projects without making them visible.

---

## 12. Non-Functional Requirements

## 12.1 Performance

The website should load fast and provide a smooth user experience.

### Goals

- Lighthouse Performance score above 90.
- Optimized images.
- Lazy loading for heavy images.
- Minimal JavaScript where possible.
- Avoid unnecessary client-side fetching for static-like content.

---

## 12.2 Accessibility

The website should follow basic accessibility best practices.

### Requirements

- Good color contrast.
- Keyboard-friendly navigation.
- Visible focus states.
- Accessible buttons and links.
- Labels for form fields.
- Alt text for meaningful images.
- Semantic HTML structure.

---

## 12.3 Security

The website should avoid exposing sensitive information.

### Requirements

- Supabase anon key can be public only with proper Row Level Security.
- Private keys must be stored in environment variables.
- Contact form submissions should be validated.
- Spam protection should be considered.
- Supabase RLS policies must be configured correctly.

---

## 12.4 Maintainability

The website should be easy to update and extend.

### Requirements

- Reusable components.
- Typed data models.
- Clear folder structure.
- Separation between layout, content, and data fetching.
- Project data should not be hardcoded.
- Future admin panel should be possible without major refactor.

---

## 13. Recommended Tech Stack

## 13.1 Frontend

- Next.js.
- TypeScript.
- React.
- Tailwind CSS or CSS Modules.
- Framer Motion, optional.
- React Hook Form, optional.
- Zod, optional.

## 13.2 Backend / Data

- Supabase.
- Supabase Postgres.
- Supabase Storage.
- Supabase Row Level Security.

## 13.3 Email / Contact

Possible options:

- Resend.
- Supabase table for storing leads.
- Serverless API route for contact form handling.

## 13.4 Deployment

- Vercel.

## 13.5 Analytics

Possible options:

- Vercel Analytics.
- Google Analytics.
- Plausible.
- PostHog.

---

## 14. Supabase Security Rules

## 14.1 Projects table

Public users should be able to read only published projects.

Recommended policy:

```sql
create policy "Allow public read access to published projects"
on projects
for select
using (is_published = true);
```

Only authenticated admin users should be able to insert, update, or delete projects.

For the MVP, admin operations can be done manually from Supabase Studio.

---

## 14.2 Contact leads table

Public users may insert contact leads, but should not be able to read them.

Recommended policies:

```sql
create policy "Allow public insert contact leads"
on contact_leads
for insert
with check (true);
```

Do not create a public select policy for `contact_leads`.

---

## 15. Content Management Strategy

## 15.1 MVP

During the MVP phase:

- Project content is managed manually from Supabase Studio.
- Images are uploaded manually to Supabase Storage.
- Static website copy is managed in the codebase.
- No admin panel is required.

## 15.2 Future

In a later phase, build a private admin panel to manage:

- Projects.
- Images.
- Services.
- Testimonials.
- Contact leads.
- Client portal content.

---

## 16. SEO Requirements

## 16.1 Homepage metadata

Suggested title:

```txt
GU Solutions | Custom Software Solutions
```

Suggested Spanish title:

```txt
GU Solutions | Soluciones de software a medida
```

Suggested description:

```txt
GU Solutions builds custom websites, internal systems, and digital tools to help businesses automate processes, improve operations, and grow.
```

Suggested Spanish description:

```txt
GU Solutions crea sitios web, sistemas internos y herramientas digitales a medida para ayudar a empresas y profesionales a automatizar procesos, mejorar operaciones y crecer.
```

---

## 16.2 Keywords

Possible keywords:

- custom software development.
- software solutions.
- business automation.
- internal systems.
- web development.
- software a medida.
- desarrollo web.
- sistemas para empresas.
- automatización de procesos.
- soluciones digitales.
- sistemas de gestión.

---

## 17. Analytics Events

The website should track important conversion events.

### Recommended events

- Click on WhatsApp CTA.
- Contact form submission.
- Click on email.
- Click on LinkedIn.
- Click on project card.
- Click on external project URL.
- Language switch.
- Scroll to contact section.

---

## 18. Success Metrics

The website will be successful if it helps generate qualified leads and improves the professional perception of GU Solutions.

### Main metrics

- Number of contact form submissions.
- Number of WhatsApp clicks.
- Number of email clicks.
- Number of LinkedIn clicks.
- Project card interactions.
- Average time on page.
- Bounce rate.
- Conversion rate from visitor to contact.

---

## 19. Roadmap

## Phase 1 — MVP Website

### Includes

- One-page landing.
- Hero.
- Services.
- Portfolio with 3 public projects.
- Dynamic project data from Supabase.
- Contact form.
- WhatsApp CTA.
- About section.
- SEO basics.
- Responsive design.
- Deploy to Vercel.

---

## Phase 2 — Commercial Improvements

### Includes

- Project detail pages.
- More complete case studies.
- Testimonials.
- Better analytics.
- Blog or articles.
- Lead tracking.
- Improved Open Graph images.
- More advanced SEO.

---

## Phase 3 — Admin Panel

### Includes

- Private login.
- Project management.
- Image management.
- Contact lead management.
- Service management.
- Testimonial management.

---

## Phase 4 — Client Portal

### Includes

- Client login.
- Project status.
- Hours tracking.
- Tickets.
- Payment status.
- Documents.
- Project communication history.

This phase aligns with the idea of allowing clients to access a private dashboard to see project progress, hours worked, pending payments, and support tickets.

---

## 20. User Stories

## US-01

As a potential client, I want to quickly understand what GU Solutions does, so I can decide if it can help my business.

## US-02

As a potential client, I want to see real projects, so I can trust the company’s experience.

## US-03

As a potential client, I want to contact GU Solutions easily, so I can ask for a quote or consultation.

## US-04

As a business owner, I want to understand the services offered, so I can identify which one matches my needs.

## US-05

As the owner of GU Solutions, I want to update portfolio projects without redeploying the website, so I can keep the content fresh with less effort.

## US-06

As the owner of GU Solutions, I want to hide unfinished projects, so I can prepare content without making it public.

## US-07

As a technical visitor, I want to see technologies used in each project, so I can understand the technical capability behind the work.

---

## 21. Acceptance Criteria

The MVP is considered complete when:

- The homepage clearly communicates what GU Solutions does.
- The hero section includes at least one clear CTA.
- The services section explains the main offerings.
- The projects section loads data from Supabase.
- At least 3 published projects are visible.
- Unpublished projects are not visible.
- Project order can be controlled with `sort_order`.
- Project images are loaded from Supabase Storage or a valid external URL.
- The contact form validates required fields.
- The contact form shows success and error states.
- WhatsApp CTA works correctly.
- The website is responsive on mobile, tablet, and desktop.
- Basic SEO metadata is configured.
- Favicon is configured.
- Open Graph metadata is configured.
- Website is deployed to production.
- No private Supabase keys are exposed in the frontend.
- Supabase RLS is configured for public project reading and secure lead handling.

---

## 22. Risks and Mitigations

## Risk 1 — Website feels too technical

If the website focuses too much on technologies and not enough on business problems, non-technical clients may not connect with the message.

### Mitigation

Use simple language focused on business value, outcomes, and problems solved.

---

## Risk 2 — Portfolio has limited content

If the portfolio has few projects or weak descriptions, it may not generate enough trust.

### Mitigation

Use strong case descriptions, mockups, clear categories, and explain the problem solved by each project.

---

## Risk 3 — Overengineering the MVP

Adding an admin panel, CMS, authentication, and complex features too early may delay launch.

### Mitigation

Start with Supabase Studio for manual project management and build the admin panel later.

---

## Risk 4 — Contact form spam

A public contact form may receive spam.

### Mitigation

Add validation, rate limiting, honeypot fields, or CAPTCHA if needed.

---

## Risk 5 — Incomplete SaaS project creates confusion

Showing the real estate SaaS platform too early may create confusion if it is not ready.

### Mitigation

Do not show it in the public portfolio until it has a clearer demo, screenshots, or product positioning.

---

## 23. Implementation Notes

## 23.1 Suggested project fetching behavior

Recommended logic:

```ts
const { data: projects } = await supabase
  .from('projects')
  .select('*')
  .eq('is_published', true)
  .order('is_featured', { ascending: false })
  .order('sort_order', { ascending: true });
```

## 23.2 Recommended caching strategy

If using Next.js, project data can be fetched server-side and revalidated periodically.

Suggested revalidation:

```ts
export const revalidate = 3600;
```

This allows portfolio updates without redeploying the website while keeping the site performant.

---

## 24. Final Recommendation

The GU Solutions website should be built as a professional, scalable landing page with dynamic project content.

The best balance for the MVP is:

```txt
Static brand content -> code
Dynamic portfolio content -> Supabase
Project images -> Supabase Storage
Contact leads -> Supabase and/or email
Admin panel -> future phase
Client portal -> future phase
```

This approach keeps the first version simple enough to launch quickly while preparing the website for future growth.
