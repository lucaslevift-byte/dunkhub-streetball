let tempoRestante = 12 * 60;
let cronometroInterval = null;
let cronometroRodando = false;
let pontos = { home: 0, away: 0 };
let faltas = { home: 0, away: 0 };
let quartoAtual = 1;
let fontSizeAtual = 16;

window.addEventListener('DOMContentLoaded', () => {
    const botoes = document.querySelectorAll('#view-placar button');
    botoes.forEach(btn => {
        if (btn.getAttribute('onclick') === "alert('Cronômetro Iniciado!')") {
            btn.setAttribute('onclick', 'toggleCronometro(this)');
            btn.textContent = 'START';
        }
    });
});

function navegar(event, viewId) {
    if(event) event.preventDefault();
    document.querySelectorAll('.page-view').forEach(view => view.classList.remove('active'));
    const targetView = document.getElementById(`view-${viewId}`);
    if(targetView) targetView.classList.add('active');
    
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('ativo'));
    if(event && event.target) event.target.classList.add('ativo');
}

function alterarFonte(direcao) {
    fontSizeAtual += direcao;
    document.body.style.fontSize = fontSizeAtual + 'px';
}

function toggleContrast() {
    const body = document.body;
    const btn = document.getElementById('btn-contraste');
    if (body.classList.contains('theme-dark')) {
        body.classList.remove('theme-dark');
        body.classList.add('theme-light');
        if (btn) btn.textContent = 'MODO ESCURO';
    } else {
        body.classList.remove('theme-light');
        body.classList.add('theme-dark');
        if (btn) btn.textContent = 'MODO CLARO';
    }
}

function toggleMusic() {
    const track = document.getElementById('current-track');
    if (track) {
        if (track.textContent === 'Off') {
            track.textContent = 'Lo-Fi Hip Hop Beats';
        } else {
            track.textContent = 'Off';
        }
    }
}

function filtrarManual() {
    const busca = document.getElementById('inputBuscaManual').value.toLowerCase();
    const itens = document.querySelectorAll('.item-mecanica');
    itens.forEach(item => {
        const titulo = item.querySelector('.card-titulo').textContent.toLowerCase();
        if (titulo.includes(busca)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}

function gerarChavesTorneio() {
    const t1 = document.getElementById('t1').value;
    const t2 = document.getElementById('t2').value;
    const t3 = document.getElementById('t3').value;
    const t4 = document.getElementById('t4').value;
    
    document.getElementById('b-s1').textContent = `${t1} VS ${document.getElementById('t4').value}`;
    document.getElementById('b-s2').textContent = `${t2} VS ${t3}`;
    document.getElementById('bracket-area').style.display = 'flex';
}

function filtrarQuadras(filtro) {
    const quadras = document.querySelectorAll('.quadra-item');
    quadras.forEach(quadra => {
        if (filtro === 'todas') {
            quadra.style.display = '';
        } else if (filtro === 'luz') {
            quadra.style.display = quadra.getAttribute('data-luz') === 'sim' ? '' : 'none';
        } else if (filtro === 'rede') {
            quadra.style.display = quadra.getAttribute('data-rede') === 'sim' ? '' : 'none';
        }
    });
}

function efetuarLogin(event) {
    event.preventDefault();
    const email = document.getElementById('inputEmail').value;
    document.getElementById('usuarioAtual').textContent = `Atleta: ${email.split('@')[0]}`;
    navegar(null, 'home');
}

function atualizarDisplayCronometro() {
    const minutos = Math.floor(tempoRestante / 60);
    const segundos = tempoRestante % 60;
    const display = document.getElementById('cronometro');
    if (display) {
        display.textContent = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
    }
}

function toggleCronometro(botao) {
    if (cronometroRodando) {
        clearInterval(cronometroInterval);
        cronometroRodando = false;
        botao.textContent = 'START';
        botao.classList.remove('btn-danger');
        botao.classList.add('btn-success');
    } else {
        cronometroRodando = true;
        botao.textContent = 'PAUSE';
        botao.classList.remove('btn-success');
        botao.classList.add('btn-danger');
        
        cronometroInterval = setInterval(() => {
            if (tempoRestante > 0) {
                tempoRestante--;
                atualizarDisplayCronometro();
            } else {
                clearInterval(cronometroInterval);
                cronometroRodando = false;
                botao.textContent = 'FIM';
                botao.disabled = true;
                alert("Fim de quarto! Buzzer Beater! 🚨");
            }
        }, 1000);
    }
}

function addPts(time, valor) {
    pontos[time] = Math.max(0, pontos[time] + valor);
    const displayId = time === 'home' ? 'ptsHome' : 'ptsAway';
    const display = document.getElementById(displayId);
    if (display) {
        display.textContent = pontos[time].toString().padStart(2, '0');
    }
}

function addFalta(time, valor) {
    faltas[time] = Math.max(0, faltas[time] + valor);
    const displayId = time === 'home' ? 'faltasHome' : 'faltasAway';
    const display = document.getElementById(displayId);
    if (display) {
        display.textContent = faltas[time];
    }
}

function mudarQuarto() {
    quartoAtual = quartoAtual >= 4 ? 1 : quartoAtual + 1;
    const display = document.getElementById('displayQuarto');
    if (display) {
        display.textContent = quartoAtual;
    }
}

function resetGeral() {
    clearInterval(cronometroInterval);
    cronometroRodando = false;
    tempoRestante = 12 * 60;
    atualizarDisplayCronometro();
    
    const botoes = document.querySelectorAll('#view-placar button');
    botoes.forEach(btn => {
        if (btn.textContent === 'PAUSE' || btn.textContent === 'FIM' || btn.getAttribute('onclick')?.includes('toggleCronometro')) {
            btn.textContent = 'START';
            btn.disabled = false;
            btn.classList.remove('btn-danger');
            btn.classList.add('btn-success');
        }
    });

    pontos = { home: 0, away: 0 };
    faltas = { home: 0, away: 0 };
    quartoAtual = 1;
    
    document.getElementById('ptsHome').textContent = '00';
    document.getElementById('ptsAway').textContent = '00';
    document.getElementById('faltasHome').textContent = '0';
    document.getElementById('faltasAway').textContent = '0';
    document.getElementById('displayQuarto').textContent = '1';
}
