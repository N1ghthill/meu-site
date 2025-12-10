// Função para executar o script Python (simulação)
function executarScript() {
    const output = document.getElementById('output');
    const btn = document.querySelector('.btn-code');
    
    // Mostrar loading
    output.innerHTML = '<code><i class="fas fa-spinner fa-spin"></i> Executando script Python...</code>';
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Executando...';
    btn.disabled = true;
    
    // Simular execução do script
    setTimeout(() => {
        const resultados = `
🎯 ANALISADOR DE CAMPANHAS - Irving Ruas
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

💾 Relatório salvo: relatorios/relatorio_20241210_203015.json
✅ Análise concluída com sucesso!
`;
        
        output.innerHTML = `<code>${resultados}</code>`;
        btn.innerHTML = '<i class="fas fa-play"></i> Executar Script';
        btn.disabled = false;
        
        // Adicionar animação
        output.style.animation = 'fadeIn 0.5s ease';
    }, 2000);
}

// Navegação suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Efeito de digitação no hero
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Iniciar efeito de digitação quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero-text h2');
    const originalText = heroTitle.textContent;
    
    // Reiniciar com efeito
    setTimeout(() => {
        typeWriter(heroTitle, originalText);
    }, 500);
    
    // Adicionar estilo de animação
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .fa-spin {
            animation: fa-spin 1s linear infinite;
        }
        
        @keyframes fa-spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Atualizar ano no footer
    const yearSpan = document.querySelector('footer p:first-child');
    if (yearSpan) {
        const currentYear = new Date().getFullYear();
        yearSpan.innerHTML = yearSpan.innerHTML.replace('2024', currentYear);
    }
});

// Efeito de highlight nos cards ao passar o mouse
document.querySelectorAll('.about-card, .contact-item').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    });
});
