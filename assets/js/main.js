// ===== CONFIGURAÇÕES GLOBAIS =====
const config = {
    name: "Irving Ruas",
    email: "irving@ruas.dev.br",
    github: "https://github.com/N1ghthill",
    website: "https://ruas.dev.br"
};

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    console.log(`🚀 Site ${config.name} inicializado`);
    console.log(`📧 Contato: ${config.email}`);
    
    // Inicializar componentes
    initTypingEffect();
    initNavigation();
    initScrollEffects();
    initStatsCounter();
    initMobileMenu();
    initTerminalDemo();
    
    // Mostrar mensagem de boas-vindas no console
    showWelcomeMessage();
});

// ===== EFEITO DE DIGITAÇÃO =====
function initTypingEffect() {
    const typingText = document.getElementById('typingText');
    if (!typingText) return;
    
    const texts = [
        "Irving Ruas",
        "Developer",
        "Data Analyst",
        "Problem Solver"
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            // Deletando
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            // Escrevendo
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        // Verificar se terminou de escrever
        if (!isDeleting && charIndex === currentText.length) {
            // Esperar antes de deletar
            typingSpeed = 1500;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Passar para próximo texto
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Iniciar após um delay
    setTimeout(type, 1000);
}

// ===== NAVEGAÇÃO SUAVE =====
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    // Scroll suave
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                // Atualizar link ativo
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Scroll suave
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Atualizar link ativo ao scroll
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ===== CONTADOR DE ESTATÍSTICAS =====
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const target = parseInt(stat.textContent.replace('+', ''));
                let count = 0;
                const increment = target / 50;
                const timer = setInterval(() => {
                    count += increment;
                    if (count >= target) {
                        count = target;
                        clearInterval(timer);
                    }
                    stat.textContent = Math.floor(count) + (stat.textContent.includes('+') ? '+' : '');
                }, 30);
                
                observer.unobserve(stat);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => observer.observe(stat));
}

// ===== MENU MOBILE =====
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!menuToggle || !navLinks) return;
    
    menuToggle.addEventListener('click', function() {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        
        if (navLinks.style.display === 'flex') {
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'rgba(10, 10, 15, 0.95)';
            navLinks.style.backdropFilter = 'blur(10px)';
            navLinks.style.padding = '1rem';
            navLinks.style.gap = '1rem';
            navLinks.style.borderTop = '1px solid rgba(0, 217, 255, 0.1)';
        }
    });
    
    // Fechar menu ao clicar em um link (mobile)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
            }
        });
    });
}

// ===== DEMO DO TERMINAL =====
function initTerminalDemo() {
    const codeDisplay = document.getElementById('codeDisplay');
    if (!codeDisplay) return;
    
    // Código de exemplo para mostrar
    const sampleCode = `#!/usr/bin/env python3
# 🎯 Analisador de Campanhas - ${config.name}
# 📧 ${config.email}

import pandas as pd
import matplotlib.pyplot as plt
import json
from datetime import datetime

class AnalisadorCampanhas:
    """Analisa campanhas de marketing"""
    
    def __init__(self):
        self.dados = None
        self.relatorios = []
    
    def carregar_csv(self, arquivo):
        """Carrega dados de um arquivo CSV"""
        try:
            self.dados = pd.read_csv(arquivo)
            print(f"✅ Dados carregados: {len(self.dados)} registros")
            return True
        except Exception as e:
            print(f"❌ Erro: {e}")
            return False
    
    def analisar_roi(self):
        """Calcula ROI médio"""
        if self.dados is not None and 'ROI' in self.dados.columns:
            roi_medio = self.dados['ROI'].mean()
            print(f"📊 ROI Médio: {roi_medio:.1f}%")
            return roi_medio
        return None
    
    def gerar_relatorio(self):
        """Gera relatório em JSON"""
        relatorio = {
            "data": datetime.now().isoformat(),
            "analista": "${config.name}",
            "total_campanhas": len(self.dados) if self.dados else 0,
            "status": "concluído"
        }
        return json.dumps(relatorio, indent=2)

# Exemplo de uso
if __name__ == "__main__":
    print("🚀 Iniciando análise...")
    analisador = AnalisadorCampanhas()
    analisador.carregar_csv("dados/campanhas.csv")
    analisador.analisar_roi()
    print(analisador.gerar_relatorio())
    print("✅ Análise concluída!")`;
    
    // Atualizar código exibido
    codeDisplay.textContent = sampleCode;
}

// ===== FUNÇÃO PARA EXECUTAR DEMO =====
function runTerminalDemo() {
    const outputDiv = document.createElement('div');
    outputDiv.className = 'terminal-output';
    outputDiv.innerHTML = `
        <div class="output-header">
            <span>Terminal Output</span>
            <button onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
        <div class="output-content">
            <pre><code>$ python3 scripts/analise_campanhas.py

🎯 ANALISADOR DE CAMPANHAS - ${config.name}
==================================================

📊 ANÁLISE DETALHADA
----------------------------------------
📈 Total de Campanhas: 5
💰 Investimento Total: R$ 32.000,00
📊 Investimento Médio: R$ 6.400,00
🖱️  Total de Cliques: 160.000
🎯 Total de Conversões: 1.600
📈 Taxa de Conversão Média: 1.00%
💵 Custo por Conversão: R$ 20,00
📊 ROI Médio: 310,0%

🏆 MELHOR CAMPANHA: Ano Novo
   ROI: 350%
   Investimento: R$ 3.000,00

⚠️  PIOR CAMPANHA: Black Friday
   ROI: 280%
   Investimento: R$ 10.000,00

💾 Relatório salvo: relatorios/relatorio_20241211_010000.json
✅ Análise concluída com sucesso!</code></pre>
        </div>
    `;
    
    // Estilos para o output
    const style = document.createElement('style');
    style.textContent = `
        .terminal-output {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 400px;
            max-width: 90vw;
            background: var(--gray);
            border-radius: 8px;
            border: 1px solid rgba(0, 217, 255, 0.3);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            z-index: 10000;
            overflow: hidden;
        }
        .output-header {
            background: var(--darker);
            padding: 10px 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid rgba(0, 217, 255, 0.2);
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.9rem;
            color: var(--primary);
        }
        .output-header button {
            background: none;
            border: none;
            color: var(--light);
            cursor: pointer;
            font-size: 1.2rem;
            padding: 0 5px;
        }
        .output-header button:hover {
            color: var(--danger);
        }
        .output-content {
            padding: 15px;
            max-height: 300px;
            overflow-y: auto;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.8rem;
        }
        .output-content code {
            color: var(--success);
        }
        @media (max-width: 768px) {
            .terminal-output {
                width: 90%;
                right: 5%;
                bottom: 10px;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(outputDiv);
    
    // Auto-remover após 10 segundos
    setTimeout(() => {
        if (outputDiv.parentElement) {
            outputDiv.remove();
        }
    }, 10000);
}

// ===== FUNÇÃO PARA DEMO DE PROJETO =====
function runProjectDemo(projectId) {
    const messages = {
        1: "🚀 Executando Analisador de Campanhas...\n📊 Gerando relatórios...\n✅ Demo do projeto 1 concluída!",
        2: "🌐 Inicializando Portfólio Digital...\n🎨 Carregando componentes...\n✅ Demo do projeto 2 concluída!"
    };
    
    alert(messages[projectId] || "🎯 Demo executada!");
}

// ===== EFEITOS DE SCROLL =====
function initScrollEffects() {
    // Efeito de parallax suave
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.code-window, .project-card');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.1 + (index * 0.05);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ===== MENSAGEM DE BOAS-VINDAS NO CONSOLE =====
function showWelcomeMessage() {
    console.log("%c" + "=".repeat(50), "color: #00d9ff; font-weight: bold;");
    console.log("%c🚀 BEM-VINDO AO PORTFÓLIO DE IRVING RUAS", "color: #00d9ff; font-size: 16px; font-weight: bold;");
    console.log("%c" + "=".repeat(50), "color: #00d9ff; font-weight: bold;");
    console.log("%c📧 Contato: irving@ruas.dev.br", "color: #00ff88;");
    console.log("%c🐍 GitHub: https://github.com/N1ghthill", "color: #00ff88;");
    console.log("%c🌐 Site: https://ruas.dev.br", "color: #00ff88;");
    console.log("%c" + "=".repeat(50), "color: #00d9ff; font-weight: bold;");
    console.log("%c💡 Dica: Clique no botão 'Terminal Demo' para ver uma simulação!", "color: #ffaa00;");
}

// ===== ATUALIZAR ANO NO FOOTER (se houver) =====
function updateCurrentYear() {
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(element => {
        if (element.textContent.includes('2024')) {
            element.textContent = element.textContent.replace('2024', currentYear);
        }
    });
}

// ===== EXPORTAR FUNÇÕES PARA USO GLOBAL =====
window.runTerminalDemo = runTerminalDemo;
window.runProjectDemo = runProjectDemo;
