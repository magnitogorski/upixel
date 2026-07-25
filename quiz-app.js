// ============================================================
// MOTOR DO QUIZ (compartilhado por todas as páginas quiz-<categoria>.html)
//
// Depende de:
//   - quiz-data.js carregado ANTES deste script (dá QUESTOES e
//     PONTOS_POR_ACERTO)
//   - uma variável CATEGORIA_PAGINA definida ANTES deste script,
//     dentro do próprio HTML da página, com o nome exato da tag
//     da categoria (ex.: const CATEGORIA_PAGINA = "UX";)
//
// Cada página de categoria só faz o quiz daquela categoria — pra
// trocar de categoria o usuário volta pra quiz.html.
// ============================================================

let questoesFiltradas = QUESTOES.filter(questao => questao.tags.includes(CATEGORIA_PAGINA));
let indiceAtual = 0;
let acertosSessao = 0;

// ---------- cronômetro ----------
// Começa quando o quiz inicia e para quando a última pergunta é
// respondida. O tempo total entra direto no cálculo da pontuação.
let inicioCronometro = 0;
let idIntervaloCronometro = null;
let tempoTotalSegundos = 0;

// "Tempo ideal" usado como referência pra calcular o bônus de
// velocidade: quanto mais rápido que isso, mais pontos de bônus.
const TEMPO_ESPERADO_POR_PERGUNTA = 20; // segundos
const PONTOS_POR_SEGUNDO_ECONOMIZADO = 0.5; // pontos por segundo abaixo do esperado

const cardQuiz = document.getElementById("quiz-card");

function formatarTempo(segundosTotais) {
    const segundos = Math.max(0, Math.round(segundosTotais));
    const minutos = Math.floor(segundos / 60).toString().padStart(2, "0");
    const segundosRestantes = (segundos % 60).toString().padStart(2, "0");
    return `${minutos}:${segundosRestantes}`;
}

function iniciarCronometro() {
    inicioCronometro = Date.now();
    idIntervaloCronometro = setInterval(() => {
        const elementoCronometro = document.getElementById("quiz-cronometro");
        if (elementoCronometro) {
            elementoCronometro.textContent = formatarTempo((Date.now() - inicioCronometro) / 1000);
        }
    }, 1000);
}

function pararCronometro() {
    clearInterval(idIntervaloCronometro);
    tempoTotalSegundos = (Date.now() - inicioCronometro) / 1000;
}

// ----------------------------------------------------------
// INICIAR / REINICIAR O QUIZ
// ----------------------------------------------------------
function iniciarQuiz() {
    indiceAtual = 0;
    acertosSessao = 0;
    renderizarPergunta();
    iniciarCronometro();
}

// ----------------------------------------------------------
// MONTA A PERGUNTA NA TELA
// ----------------------------------------------------------
function renderizarPergunta() {

    if (questoesFiltradas.length === 0) {
        cardQuiz.innerHTML = `
            <div class="quiz-fim">
                <h2>Ainda não tem perguntas aqui 😅</h2>
                <p>Essa categoria ainda não tem perguntas cadastradas.</p>
                <div class="quiz-fim-botoes">
                    <a class="botao-outra-categoria" href="quiz.html">Escolher outra categoria</a>
                </div>
            </div>
        `;
        return;
    }

    if (indiceAtual >= questoesFiltradas.length) {
        finalizarQuiz();
        return;
    }

    const questao = questoesFiltradas[indiceAtual];
    const ultimaPergunta = indiceAtual === questoesFiltradas.length - 1;
    const textoBotao = ultimaPergunta ? "Finalizar quiz →" : "Próxima pergunta →";

    const tagsHtml = questao.tags.map(t => `<span class="quiz-tag">${t}</span>`).join("");

    const respostasHtml = questao.respostas
        .map((resposta, i) => `
            <button class="quiz-resposta" data-indice="${i}">${resposta}</button>
        `)
        .join("");

    cardQuiz.innerHTML = `
        <div class="quiz-tags">${tagsHtml}</div>
        <div class="quiz-pergunta">${questao.pergunta}</div>
        <div class="quiz-respostas">${respostasHtml}</div>
        <div class="quiz-feedback" id="quiz-feedback">${questao.explicacao}</div>
        <div class="quiz-rodape-card">
            <span class="quiz-progresso">
                Pergunta ${indiceAtual + 1} de ${questoesFiltradas.length}
                &nbsp;·&nbsp; ⏱ <span id="quiz-cronometro">00:00</span>
            </span>
            <button class="botao-proxima" id="botao-proxima">${textoBotao}</button>
        </div>
    `;

    document.querySelectorAll(".quiz-resposta").forEach(botao => {
        botao.addEventListener("click", () => responderPergunta(botao, questao));
    });

    document.getElementById("botao-proxima").addEventListener("click", () => {
        indiceAtual++;
        renderizarPergunta();
    });
}

// ----------------------------------------------------------
// RESPONDE A PERGUNTA (marca certo/errado)
// ----------------------------------------------------------
function responderPergunta(botaoClicado, questao) {
    const indiceEscolhido = Number(botaoClicado.dataset.indice);
    const acertou = indiceEscolhido === questao.correta;

    document.querySelectorAll(".quiz-resposta").forEach(botao => {
        botao.disabled = true;
        if (Number(botao.dataset.indice) === questao.correta) {
            botao.classList.add("correta");
        } else if (botao === botaoClicado) {
            botao.classList.add("errada");
        }
    });

    document.getElementById("quiz-feedback").classList.add("visivel");
    document.getElementById("botao-proxima").classList.add("visivel");

    if (acertou) {
        acertosSessao++;
    }
}

// ----------------------------------------------------------
// TELA FINAL DO QUIZ
// Mostra acertos, percentual, tempo total e a pontuação final
// (acertos + bônus de tempo), além dos botões "Refazer" /
// "Escolher outra categoria" e o ícone de compartilhar no LinkedIn.
// ----------------------------------------------------------
function finalizarQuiz() {
    pararCronometro();

    const total = questoesFiltradas.length;
    const percentual = total > 0 ? Math.round((acertosSessao / total) * 100) : 0;
    const pontosAcertos = acertosSessao * PONTOS_POR_ACERTO;

    // Quanto menor o tempo total, maior o bônus (nunca fica negativo)
    const tempoEsperadoTotal = TEMPO_ESPERADO_POR_PERGUNTA * total;
    const segundosEconomizados = Math.max(0, tempoEsperadoTotal - tempoTotalSegundos);
    const bonusTempo = Math.round(segundosEconomizados * PONTOS_POR_SEGUNDO_ECONOMIZADO);

    const pontosGanhos = pontosAcertos + bonusTempo;

    cardQuiz.innerHTML = `
        <div class="quiz-fim">
            <h2>Quiz finalizado! 🎉</h2>
            <p>Categoria: <strong>${CATEGORIA_PAGINA}</strong></p>

            <div class="quiz-fim-stats">
                <div class="stat-item">
                    <span class="stat-numero">${acertosSessao}/${total}</span>
                    <span class="stat-legenda">Acertos</span>
                </div>
                <div class="stat-item">
                    <span class="stat-numero">${percentual}%</span>
                    <span class="stat-legenda">Aproveitamento</span>
                </div>
                <div class="stat-item">
                    <span class="stat-numero">${formatarTempo(tempoTotalSegundos)}</span>
                    <span class="stat-legenda">Tempo total</span>
                </div>
                <div class="stat-item">
                    <span class="stat-numero">${pontosGanhos}</span>
                    <span class="stat-legenda">Pontos (bônus: ${bonusTempo})</span>
                </div>
            </div>

            <div class="quiz-fim-botoes">
                <button class="botao-refazer" id="botao-refazer">Refazer</button>
                <a class="botao-outra-categoria" href="quiz.html">Escolher outra categoria</a>
            </div>

            <div class="compartilhar-linkedin-discreto">
                <button class="icone-linkedin" id="botao-linkedin-icone" title="Compartilhar no LinkedIn" aria-label="Compartilhar no LinkedIn">
                    <svg viewBox="0 0 24 24" fill="#FA397A">
                        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/>
                    </svg>
                </button>
            </div>
        </div>
    `;

    document.getElementById("botao-refazer").addEventListener("click", iniciarQuiz);
    document.getElementById("botao-linkedin-icone").addEventListener("click", compartilharNoLinkedIn);
}

// ----------------------------------------------------------
// COMPARTILHAR A PÁGINA DO QUIZ NO LINKEDIN
// ----------------------------------------------------------
function compartilharNoLinkedIn() {
    const urlPagina = encodeURIComponent(window.location.href);
    const urlCompartilhamento = `https://www.linkedin.com/sharing/share-offsite/?url=${urlPagina}`;

    window.open(urlCompartilhamento, "_blank", "noopener,noreferrer,width=600,height=600");
}

// ----------------------------------------------------------
// INICIALIZA O QUIZ ASSIM QUE A PÁGINA CARREGA
// ----------------------------------------------------------
iniciarQuiz();
