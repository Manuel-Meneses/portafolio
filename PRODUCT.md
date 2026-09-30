# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary users: Potential clients, agency founders, and hiring teams looking to contract or hire for product design and frontend engineering. They review portfolios with high velocity, evaluating taste, craft, engineering execution, and proof of delivered work.

## Product Purpose

A digital portfolio showcasing shipped design and frontend development projects. Success means establishing high credibility, demonstrating nuanced taste and technical mastery, and converting visitors into inquiries or job/contract offers.

## Positioning

A focused editorial showcase where the work speaks directly. Rather than generic templates or exaggerated self-promotion, it presents real-world, shipped products across diverse sectors (modular architecture, fragrance e-commerce, language education, AI agents) with interactive previews, fluid motion, and direct live links.

## Operating Context

Evaluated on desktop and mobile web browsers during client discovery calls, hiring screen reviews, or direct link sharing. Must load fast, behave smoothly across viewports, handle touch and pointer interactions gracefully, and provide effortless navigation between project overview and detailed case views.

## Capabilities and Constraints

- **Confirmed functionality**:
  - Interactive project catalog with kinetic typography and responsive layout.
  - Floating preview on desktop cursor hover with boundary containment.
  - Smooth layoutId shared transitions into full-screen editorial project views.
  - Real project metadata, multi-screenshot galleries, and external live site links.
  - Respects `prefers-reduced-motion` for kinetic typography and animations.
- **Technical constraints**:
  - Built with Next.js 15 (App Router), React 19, Tailwind CSS v4, Framer Motion, and Radix/Lucide components.
  - Responsive design with dedicated mobile preview/touch affordances.
- **Undecided / open facts**:
  - Potential future addition of an "About / Bio" section or direct contact mechanism (currently visitors reach out via project links and external channels).

## Brand Commitments

- **Language**: Spanish copy throughout the UI and project summaries.
- **Voice**: Personal first-person editorial voice ("Una selección de trabajos que diseñé y desarrollé"), restrained, professional, and confident.
- **Identity constraints**: Clean typography (Geist / Geist Mono), high-contrast minimalist palette, custom pointer interactions, and understated elegance without unnecessary decorative clutter.

## Evidence on Hand

- Real projects with live production URLs:
  - Stylebox (`https://www.styleboxmodular.com`) — Arquitectura modular
  - Morperfumes (`https://www.morpefumes.com`) — Catálogo e-commerce
  - Español con E (`https://www.espanolcone.com`) — Edtech landing y app
  - Clapwise (`https://clap-wise-web.vercel.app/`) — Agencia de automatización con IA
- High-resolution real project screenshots under `public/projects/` (`stylebox-1..3.png`, `morperfumes-1..3.png`, `espanolcone-1..3.png`, `clapwise-1..3.png`).
- Do not fabricate false client testimonials, fictitious metrics, or synthetic placeholder projects.

## Product Principles

1. **Artifact Leads First**: Let the real project imagery, live sites, and craftsmanship take center stage from the very first viewport.
2. **Subtle Motion, Maximum Performance**: Employ kinetic interactions and shared element transitions that feel tactile and fluid without degrading responsiveness or accessibility.
3. **Restraint and Truth**: Speak honestly in first-person; ground every claim in verifiable, shipped work and accessible external links.
4. **Editorial Clarity**: Maintain clear typographical rhythm and hierarchy, avoiding visual gimmicks or decorative noise that distract from the work.

## Accessibility & Inclusion

- Keyboard navigable (`Escape` to dismiss open project detail, accessible buttons and links).
- Respects `prefers-reduced-motion` to disable kinetic tilt for users sensitive to motion.
- Semantic HTML elements (`header`, `main`, `h1`, `h2`, `h3`, `button`, `a`).
- High contrast foreground/background text ratios.
