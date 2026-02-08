# Estrutura do projeto

```text
.
├── index.html                 # Página principal do portfólio
├── assets/                    # Arquivos estáticos
│   ├── css/                   # Estilos globais e responsivos
│   ├── js/                    # Scripts de interação do front-end
│   └── img/                   # Branding, screenshots e favicon
├── scripts/                   # Script Python auxiliar (campanhas)
├── docs/                      # Documentação técnica/operacional
├── robots.txt                 # Regras para crawlers
├── sitemap.xml                # Sitemap do domínio
├── vercel.json                # Configuração de deploy e headers (Vercel)
├── requirements.txt           # Dependências do script Python
├── README.md                  # Visão geral do repositório
└── LICENSE                    # Licença MIT
```

## Convenções
- `assets/` contém somente recursos usados no front-end.
- `docs/` concentra guias para manutenção, deploy e handoff.
- `scripts/` abriga utilitários que complementam o portfólio técnico.
- `.vercel/` é local e não deve ser versionado.
