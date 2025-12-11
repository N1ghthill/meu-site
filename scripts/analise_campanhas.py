#!/usr/bin/env python3
"""
🎯 ANÁLISE DE CAMPANHAS - Script Principal
Autor: Irving
GitHub: https://github.com/irvingruas
"""

import pandas as pd
import os
import json
from datetime import datetime

print("=" * 50)
print("🎯 ANALISADOR DE CAMPANHAS - Irving Ruas")
print("=" * 50)

def criar_dados_exemplo():
    """Cria dados de exemplo para teste."""
    dados = {
        'Campanha': ['Natal 2024', 'Black Friday', 'Cyber Monday', 'Ano Novo', 'Verão'],
        'Investimento_R$': [5000, 10000, 8000, 3000, 6000],
        'Cliques': [25000, 50000, 40000, 15000, 30000],
        'Conversões': [250, 500, 400, 150, 300],
        'ROI_%': [320, 280, 310, 350, 290]
    }

    df = pd.DataFrame(dados)
    arquivo = 'dados_campanhas.csv'
    df.to_csv(arquivo, index=False, encoding='utf-8')
    print(f"✅ Dados de exemplo criados: {arquivo}")
    return df

def analisar_dados(df):
    """Analisa os dados das campanhas."""
    print("\n📊 ANÁLISE DETALHADA")
    print("-" * 40)

    # Estatísticas básicas
    print(f"📈 Total de Campanhas: {len(df)}")
    print(f"💰 Investimento Total: R$ {df['Investimento_R$'].sum():,.2f}")
    print(f"📊 Investimento Médio: R$ {df['Investimento_R$'].mean():,.2f}")
    print(f"🖱️  Total de Cliques: {df['Cliques'].sum():,}")
    print(f"🎯 Total de Conversões: {df['Conversões'].sum():,}")

    # Cálculo de métricas
    taxa_conversao = (df['Conversões'].sum() / df['Cliques'].sum() * 100)
    custo_por_conversao = df['Investimento_R$'].sum() / df['Conversões'].sum()

    print(f"📈 Taxa de Conversão Média: {taxa_conversao:.2f}%")
    print(f"💵 Custo por Conversão: R$ {custo_por_conversao:.2f}")
    print(f"📊 ROI Médio: {df['ROI_%'].mean():.1f}%")

    # Melhor e pior campanha
    melhor_idx = df['ROI_%'].idxmax()
    pior_idx = df['ROI_%'].idxmin()

    print(f"\n🏆 MELHOR CAMPANHA: {df.loc[melhor_idx, 'Campanha']}")
    print(f"   ROI: {df.loc[melhor_idx, 'ROI_%']}%")
    print(f"   Investimento: R$ {df.loc[melhor_idx, 'Investimento_R$']:,.2f}")

    print(f"\n⚠️  PIOR CAMPANHA: {df.loc[pior_idx, 'Campanha']}")
    print(f"   ROI: {df.loc[pior_idx, 'ROI_%']}%")
    print(f"   Investimento: R$ {df.loc[pior_idx, 'Investimento_R$']:,.2f}")

def gerar_relatorio(df):
    """Gera relatório em JSON."""
    relatorio = {
        "data_geracao": datetime.now().strftime("%d/%m/%Y %H:%M:%S"),
        "autor": "Irving Ruas",
        "total_campanhas": int(len(df)),
        "resumo_metricas": {
            "investimento_total": float(df['Investimento_R$'].sum()),
            "investimento_medio": float(df['Investimento_R$'].mean()),
            "cliques_total": int(df['Cliques'].sum()),
            "conversoes_total": int(df['Conversões'].sum()),
            "roi_medio": float(df['ROI_%'].mean()),
            "taxa_conversao": float((df['Conversões'].sum() / df['Cliques'].sum() * 100))
        },
        "campanhas": df.to_dict('records')
    }

    # Salvar relatório
    os.makedirs('relatorios', exist_ok=True)
    arquivo_json = f"relatorios/relatorio_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"

    with open(arquivo_json, 'w', encoding='utf-8') as f:
        json.dump(relatorio, f, indent=2, ensure_ascii=False)

    print(f"\n💾 Relatório salvo: {arquivo_json}")
    return arquivo_json

def mostrar_menu():
    """Mostra menu interativo."""
    print("\n" + "=" * 50)
    print("📋 MENU PRINCIPAL")
    print("=" * 50)
    print("1. 🚀 Criar dados de exemplo e analisar")
    print("2. 📂 Carregar dados de arquivo CSV")
    print("3. 📄 Gerar relatório JSON")
    print("4. 📊 Ver estatísticas completas")
    print("5. 👋 Sair")
    print("=" * 50)

def main():
    """Função principal."""
    dados = None

    while True:
        mostrar_menu()

        try:
            opcao = input("\n👉 Escolha uma opção (1-5): ").strip()

            if opcao == '1':
                print("\n" + "=" * 50)
                print("🚀 CRIANDO DADOS DE EXEMPLO...")
                print("=" * 50)
                dados = criar_dados_exemplo()
                analisar_dados(dados)

            elif opcao == '2':
                arquivo = input("\n📁 Digite o nome do arquivo CSV: ").strip()
                if os.path.exists(arquivo):
                    dados = pd.read_csv(arquivo, encoding='utf-8')
                    print(f"✅ Arquivo carregado: {len(dados)} registros")
                    analisar_dados(dados)
                else:
                    print(f"❌ Arquivo não encontrado: {arquivo}")

            elif opcao == '3':
                if dados is not None:
                    arquivo = gerar_relatorio(dados)
                    print(f"✅ Relatório gerado com sucesso!")
                    print(f"📁 Arquivo: {arquivo}")
                else:
                    print("⚠️  Primeiro carregue ou crie dados (opção 1 ou 2)")

            elif opcao == '4':
                if dados is not None:
                    print("\n" + "=" * 50)
                    print("📈 ESTATÍSTICAS COMPLETAS")
                    print("=" * 50)
                    print(dados.describe())
                    print("\n📋 DADOS BRUTOS:")
                    print(dados.to_string())
                else:
                    print("⚠️  Primeiro carregue ou crie dados (opção 1 ou 2)")

            elif opcao == '5':
                print("\n👋 Obrigado por usar o Analisador de Campanhas!")
                print("📧 Irving Ruas - irving@ruas.dev.br")
                break

            else:
                print("❌ Opção inválida! Escolha entre 1 e 5.")

        except KeyboardInterrupt:
            print("\n\n⚠️  Programa interrompido.")
            break
        except Exception as e:
            print(f"❌ Erro: {e}")

if __name__ == "__main__":
    try:
        import pandas as pd
    except ImportError:
        print("❌ Pandas não instalado!")
        print("Instale com: pip install pandas")
        exit(1)

    main()
