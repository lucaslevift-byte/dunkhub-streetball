function navegar(event, viewId) {
    if (event) event.preventDefault();
    
    document.querySelectorAll('.page-view').forEach(view => {
        view.classList.remove('active');
    });
    
    const viewAlvo = document.getElementById('view-' + viewId);
    if (viewAlvo) {
        viewAlvo.classList.add('active');
    }
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('ativo');
    });
    
    if (event && event.target) {
        event.target.classList.add('ativo');
    }
}

let tamanhoFonteBase = 16; 

function alterarFonte(direcao) {
    tamanhoFonteBase += (direcao * 2);
    
    if (tamanhoFonteBase < 12) tamanhoFonteBase = 12;
    if (tamanhoFonteBase > 26) tamanhoFonteBase = 26;
    
    document.documentElement.style.fontSize = tamanhoFonteBase + 'px';
}

function toggleContrast() {
    const body = document.body;
    const btnContraste = document.getElementById('btn-contraste');
    
    if (body.classList.contains('theme-dark')) {
        body.classList.remove('theme-dark');
        body.classList.add('theme-light');
        btnContraste.innerText = "MODO ESCURO";
    } else {
        body.classList.remove('theme-light');
        body.classList.add('theme-dark');
        btnContraste.innerText = "MODO CLARO";
    }
}

function efectuarLogin(event) {
    if (event) event.preventDefault();
    
    const email = document.getElementById('inputEmail').value;
    
    if (email.trim() !== "") {
        const nomeUsuario = email.split('@')[0];
        document.getElementById('usuarioAtual').innerText = `🏀 Atleta: ${nomeUsuario}`;
        alert(`Autenticado com sucesso! Bem-vindo, ${nomeUsuario}.`);
        navegar(null, 'home'); 
    }
}

function filtrarQuadras(filtro) {
    const itens = document.querySelectorAll('.quadra-item');
    itens.forEach(item => {
        if (filtro === 'todas') {
            item.style.display = 'block';
        } else if (filtro === 'luz' && item.getAttribute('data-luz') === 'sim') {
            item.style.display = 'block';
        } else if (filtro === 'rede' && item.getAttribute('data-rede') === 'sim') {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

function filtrarManual() {
    const busca = document.getElementById('inputBuscaManual').value.toLowerCase();
    const cartas = document.querySelectorAll('.item-mecanica');
    cartas.forEach(carta => {
        const titulo = carta.querySelector('.card-titulo').innerText.toLowerCase();
        if (titulo.includes(busca)) {
            carta.style.display = 'block';
        } else {
            carta.style.display = 'none';
        }
    });
}

function gerarChavesTorneio() {
    const t1 = document.getElementById('t1').value || 'Time 1';
    const t2 = document.getElementById('t2').value || 'Time 2';
    const t3 = document.getElementById('t3').value || 'Time 3';
    const t4 = document.getElementById('t4').value || 'Time 4';
    
    document.getElementById('b-s1').innerHTML = `${t1} <span class="text-warning">VS</span> ${t2}`;
    document.getElementById('b-s2').innerHTML = `${t3} <span class="text-warning">VS</span> ${t4}`;
    document.getElementById('bracket-area').style.display = 'flex';
}

function addPts(time, qtd) {
    const elementId = time === 'home' ? 'ptsHome' : 'ptsAway';
    let pts = parseInt(document.getElementById(elementId).innerText);
    pts = Math.max(0, pts + qtd);
    document.getElementById(elementId).innerText = pts < 10 ? '0' + pts : pts;
}

function mudarQuarto() {
    let quarto = parseInt(document.getElementById('displayQuarto').innerText);
    quarto = quarto >= 4 ? 1 : quarto + 1;
    document.getElementById('displayQuarto').innerText = quarto;
}

function resetGeral() {
    document.getElementById('ptsHome').innerText = '00';
    document.getElementById('ptsAway').innerText = '00';
    document.getElementById('displayQuarto').innerText = '1';
}

function toggleMusic() { 
    const current = document.getElementById('current-track');
    current.innerText = current.innerText === 'Off' ? '90s Boom Bap Instrumental' : 'Off';
}