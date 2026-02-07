# Scripts

## `analise_campanhas.py`
Script CLI em Python para análise de campanhas de marketing. Ele lê um CSV, calcula métricas (ROI, taxa de conversão, custo por conversão) e gera um relatório em JSON.

### Pré-requisitos
```
pip install -r requirements.txt
```

### Executar
```
python3 scripts/analise_campanhas.py
```

### Arquivos gerados
- `dados_campanhas.csv` (quando usa dados de exemplo)
- `relatorios/relatorio_YYYYMMDD_HHMMSS.json`

Esses outputs já estão no `.gitignore`.
