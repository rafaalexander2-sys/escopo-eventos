# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repository is

This repo contains a single static HTML file (`index.html`) — a product scope document for an MVP of a white-label events platform. It is a living design document, not a built application. There are no build steps, no package manager, no tests, and no frameworks.

To preview the document, open `index.html` directly in a browser. No server is required.

## Document structure

The scope document is self-contained HTML with embedded CSS. The content sections, in order:

1. **O Problema** — three market gaps (no white label, poor dashboards, abandoned cart ignored)
2. **Arquitetura** — three product layers: Landing (`plataforma.com.br`), Admin (`app.plataforma.com.br`), Portal (`{slug}.plataforma.com.br`), plus future custom domain support
3. **Stack Técnica** — React + Vite (frontend), Cloudflare Pages (deploy), Supabase (DB/auth/storage), payment gateway TBD, Resend (email), qrcode.js (QR codes)
4. **Pagamentos** — PagSeguro (primary candidate) or Asaas (alternative); Mercado Pago as fallback; PayPal/Appmax/Stripe discarded
5. **Features do MVP** — three modules: Superadmin (platform founders), Admin (organizer panel), Portal (public attendee-facing page)
6. **Roadmap** — 8–10 week plan broken into 5 two-week sprints
7. **Benchmark de concorrentes** — comparison of Sympla, Eventbrite, Even3, E-inscrição, Ticket Gospel, Tiketo with pain points from Reclame Aqui
8. **Cássio precisa validar** — open business decisions (billing model, plan limits, refunds, certificates, LGPD, etc.)
9. **Identidade** — candidate product names
10. **Decisões pendentes** — technical and commercial decisions still open

## Key architectural decisions captured in the document

- **Multi-tenant via Supabase RLS** — each organizer (tenant) is isolated at the database level using Row Level Security
- **Subdomain routing** — dynamic subdomains handled by Cloudflare (`{slug}.plataforma.com.br`); custom CNAME per client is post-MVP
- **White label** — the participant-facing Portal shows only the organizer's brand; the platform name is never visible to attendees
- **Split payments** — the platform retains a spread on each transaction; exact model (spread-only vs. hybrid subscription) is still TBD
- **100% free tier until scale** — every infrastructure choice targets the free tier (Supabase 500 MB, Cloudflare Pages, Resend 3k emails/month)

## Editing conventions

The HTML uses CSS custom properties defined in `:root` for all colors and the border-radius. When changing visual styles, edit the variables rather than hardcoding values. The layout is responsive with a `640px` breakpoint.

Content is in Brazilian Portuguese.
