# Deploy Vercel

Guia operacional para manter o deploy do `meu-site` previsível no Vercel.

## Pré-requisitos
- Vercel CLI instalado e autenticado
- Repositório conectado ao projeto correto na Vercel
- Branch de produção definida no projeto

## Fluxo recomendado
### 1) Vincular repositório local ao projeto
```bash
vercel link --yes
```

### 2) Sincronizar configurações do projeto
```bash
vercel pull --yes --environment=production
```

### 3) Gerar build local (validação)
```bash
vercel build
```

### 4) Deploy manual (opcional)
```bash
vercel deploy --prebuilt --prod
```

## Fluxo automático por push
Quando a integração Git está ativa, basta:

```bash
git push origin main
```

O Vercel dispara build/deploy automaticamente para produção (ou preview, conforme branch).

## Diagnóstico rápido
### Inspecionar projeto
```bash
vercel project inspect --yes
```

### Listar deploys recentes
```bash
vercel ls --yes
```

### Ver logs de um deploy
```bash
vercel inspect <deployment-url> --logs
```

## Padrão esperado para este projeto
- **Framework Preset:** `Other`
- **Root Directory:** `.`
- **Deploy estático:** `index.html` na raiz + `assets/*`

## Hardening aplicado
O arquivo `vercel.json` define:
- clean URLs
- política de trailing slash
- headers de segurança globais
- cache imutável para `/assets/*`

## Problemas comuns
### 1) Push não refletiu no site
- confirme se o push foi para a branch de produção do projeto
- confirme se o domínio em produção aponta para o projeto correto

### 2) Deploy pronto, mas visual quebrado
- valide caminhos locais em `index.html` (`assets/...`)
- confirme se os arquivos foram versionados e enviados no commit

### 3) CLI falhando com vínculo de projeto
```bash
rm -rf .vercel
vercel link --yes
```

## Segurança do repositório
- `.vercel/` deve permanecer ignorado no Git
- nunca versionar token/chaves de serviço
