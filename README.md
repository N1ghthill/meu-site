<div align="center">

# 🌐 Meu Site — Portfólio de Irving Ruas
**Portfólio profissional (mobile-first) com animações, terminal interativo e base para integrar meus projetos.**  
A professional portfolio (mobile-first) with animations, an interactive terminal, and a foundation to integrate my projects.

<br/>

**Live:** https://ruas.dev.br  
**Deploy (Vercel):** https://meu-site-neon-seven.vercel.app

<br/>

<!-- Badges (opcional) -->
![Status](https://img.shields.io/badge/status-active-success)
![Stack](https://img.shields.io/badge/stack-HTML%20%7C%20CSS%20%7C%20JS-blue)
![Deploy](https://img.shields.io/badge/deploy-vercel-black)

</div>

---

## ✨ Visão | Overview
Este projeto é meu **hub público**: um portfólio que apresenta meus trabalhos e serve como **base para integrar outros projetos** (demos, docs, ferramentas e componentes reutilizáveis).

This project is my public **hub**: a portfolio that showcases my work and acts as a **foundation to integrate other projects** (demos, docs, tools and reusable components).

---

## 🚀 Destaques | Highlights
- 📱 **Mobile-first** e layout responsivo  
- 🧩 Seções de **About / Projects / Contact**  
- 🖥️ **Terminal interativo** (experiência “dev vibe”)  
- ✨ Animações e micro-interações  
- 🔎 SEO básico (metadados, social cards)

---

## 🧱 Stack
- **HTML5**, **CSS3**, **JavaScript (ES6+)**
- Font Awesome + Google Fonts

> Objetivo: manter o core **simples, rápido e fácil de manter** — e evoluir com organização (docs + padrões + integrações).

---

## 🧭 Roadmap (próximos dias)
**Fase 1 — Base de projeto (documentado e exemplo)**
- [ ] Padronizar estrutura de pastas (`src/`, `assets/`, `docs/`)
- [ ] Criar `docs/` (arquitetura, decisões, integrações)
- [ ] Adicionar prints e/ou GIF no README
- [ ] Criar checklist de qualidade (SEO/perf/acessibilidade)

**Fase 2 — Integrações (hub de projetos)**
- [ ] Página “Projetos” com cards padronizados + tags
- [ ] Integração com GitHub API (pins + stats) *(opcional)*
- [ ] Página “Labs” para demos (CLI tools, mini-apps, etc)
- [ ] Área “Changelog/Updates” (para mostrar evolução)

**Fase 3 — Produto pessoal**
- [ ] Blog/Notas (Markdown → HTML) *(se fizer sentido)*
- [ ] Analytics (leve) + events importantes
- [ ] i18n (PT/EN) com toggle

---

## 🗂️ Estrutura do projeto | Project Structure
> Ajuste conforme sua realidade atual — mas mantenha a ideia de separar “site” de “docs” e “scripts”.

- `index.html`
- `assets/`
  - `css/`
  - `js/`
  - `img/`
- `scripts/`
  - `analise_campanhas.py`
- `docs/` *(recomendado — para virar exemplo)*
  - `ARCHITECTURE.md`
  - `INTEGRATIONS.md`
  - `DECISIONS.md` (ADR-lite)
  - `CHECKLIST.md`

---

## ▶️ Rodar localmente | Run locally

git clone https://github.com/N1ghthill/meu-site.git
cd meu-site
python -m http.server

Acesse: http://localhost:8000

## 🧪 Scripts (opcional) | Optional scripts
pip install -r requirements.txt
python scripts/analise_campanhas.py

## 🔌 Integrações planejadas | Planned integrations

### Este site será o lugar onde eu conecto e demonstro:

- ferramentas internas (CLIs, automações)

- projetos web (demos, landing pages)

- documentação e padrões reutilizáveis

- indicadores (performance, qualidade, changelog)

### Veja /docs/INTEGRATIONS.md para o plano de integrações (em evolução).

## ✅ Qualidade (padrão de exemplo) | Quality baseline

### Performance: carregamento rápido e assets otimizados

- SEO: metatags e social preview

- Acessibilidade: contraste, foco e navegação por teclado

- Manutenibilidade: estrutura clara + docs + convenções

## 🤝 Contribuição | Contributing

### Sugestões e PRs são bem-vindos — especialmente em performance, acessibilidade e melhorias de DX.

📄 Licença | License

### MIT


