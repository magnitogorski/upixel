/* ============================================================================
   UPIXEL · VOLTAR INTELIGENTE (smart-back.js)
   ----------------------------------------------------------------------------
   O que este arquivo faz:
   - Cria sozinho um botão "← VOLTAR" fixo na tela, sem precisar de HTML
     em nenhuma página.
   - Usa history.back() para voltar exatamente à página/posição anterior
     (o navegador já restaura o scroll sozinho — não mexemos nisso).
   - Só aparece quando existe, de fato, um histórico útil para voltar.
   - Não toca em nenhum link, card, formulário ou script já existente:
     tudo aqui roda isolado (IIFE) e com nomes de CSS exclusivos (prefixo
     "upx-smartback"), então não há risco de colidir com estilos do site.

   COMO USAR (única coisa que você precisa fazer):
   - Inclua esta linha uma vez no template/rodapé compartilhado do site
     (ou, na ausência de um template, no final do <body> de cada página):

       <script src="/js/smart-back.js" defer></script>

   - Isso é tudo. O script se encarrega de criar o botão, estilizar e
     controlar quando ele aparece ou some. Nenhuma outra alteração de
     HTML, CSS ou estrutura é necessária.
   ============================================================================ */

(function () {
  "use strict";

  /* ==========================================================================
     🔧 ÁREA DE CONFIGURAÇÃO
     Mexa só aqui para ajustar visual e comportamento no futuro.
     ========================================================================== */
  const CONFIG = {
    // Texto do botão
    label: "← VOLTAR",

    // Posição na tela: "bottom-left" | "bottom-right" | "top-left" | "top-right"
    position: "bottom-left",

    // Distância das bordas da tela (respeitando notch/safe-area no mobile)
    offset: "20px",

    // Paleta Upixel
    colors: {
      background: "#000000",
      border: "#FA397A",
      text: "#FFFFFF",
      hoverBackground: "#FA397A",
      hoverText: "#000000",
      shadow: "rgba(250, 57, 122, 0.35)",
    },

    // Tipografia (mesma linha do site: Pixelify Sans, com fallback pixelado)
    fontFamily: "'Pixelify Sans', 'Segoe UI', monospace",
    fontSize: "13px",

    // Tamanho/format geral (compacto e discreto, estética pixel)
    paddingY: "10px",
    paddingX: "16px",
    borderWidth: "2px",
    borderRadius: "0px", // 0 = cantos retos, mais "pixel/underground"

    // Camada de exibição (alto o bastante para ficar sobre o conteúdo,
    // mas sem exagero — ajuste se algum elemento do site usar z-index maior)
    zIndex: 9999,

    // Histórico mínimo para o botão ser considerado "útil".
    // 1 = só a própria página no histórico da aba => nada para voltar.
    minHistoryLength: 2,

    // id/classe usados internamente (não altere a menos que precise
    // evitar conflito com algo já existente no site)
    elementId: "upx-smartback-btn",
    styleId: "upx-smartback-style",
  };

  /* ==========================================================================
     🧠 LÓGICA — normalmente não precisa mexer daqui pra baixo
     ========================================================================== */

  // Evita duplicar o botão caso o script seja incluído mais de uma vez
  if (document.getElementById(CONFIG.elementId)) return;

  // Decide se existe histórico "útil" para voltar
  function hasUsefulHistory() {
    return window.history.length >= CONFIG.minHistoryLength;
  }

  // Monta o CSS do botão (isolado por prefixo próprio, não herda nada do site)
  function injectStyles() {
    if (document.getElementById(CONFIG.styleId)) return;

    const posMap = {
      "bottom-left": `bottom: ${CONFIG.offset}; left: ${CONFIG.offset};`,
      "bottom-right": `bottom: ${CONFIG.offset}; right: ${CONFIG.offset};`,
      "top-left": `top: ${CONFIG.offset}; left: ${CONFIG.offset};`,
      "top-right": `top: ${CONFIG.offset}; right: ${CONFIG.offset};`,
    };

    const css = `
      #${CONFIG.elementId} {
        position: fixed;
        ${posMap[CONFIG.position] || posMap["bottom-left"]}
        z-index: ${CONFIG.zIndex};

        display: inline-flex;
        align-items: center;
        gap: 6px;

        background: ${CONFIG.colors.background};
        color: ${CONFIG.colors.text};
        border: ${CONFIG.borderWidth} solid ${CONFIG.colors.border};
        border-radius: ${CONFIG.borderRadius};

        font-family: ${CONFIG.fontFamily};
        font-size: ${CONFIG.fontSize};
        letter-spacing: 0.5px;
        text-transform: uppercase;

        padding: ${CONFIG.paddingY} ${CONFIG.paddingX};
        cursor: pointer;
        user-select: none;

        box-shadow: 0 0 0 rgba(0,0,0,0);
        transition: background-color 0.15s ease,
                    color 0.15s ease,
                    box-shadow 0.15s ease,
                    transform 0.1s ease;

        /* leve efeito "pixelado" no contorno, sem imagens externas */
        image-rendering: pixelated;
      }

      #${CONFIG.elementId}:hover,
      #${CONFIG.elementId}:focus-visible {
        background: ${CONFIG.colors.hoverBackground};
        color: ${CONFIG.colors.hoverText};
        box-shadow: 0 0 12px ${CONFIG.colors.shadow};
        outline: none;
      }

      #${CONFIG.elementId}:active {
        transform: translateY(1px) scale(0.97);
      }

      /* some com o botão sempre que ele estiver marcado como oculto */
      #${CONFIG.elementId}.upx-smartback-hidden {
        display: none !important;
      }

      /* ajustes finos para telas pequenas (mobile) */
      @media (max-width: 480px) {
        #${CONFIG.elementId} {
          font-size: 12px;
          padding: 8px 12px;
        }
      }
    `;

    const styleTag = document.createElement("style");
    styleTag.id = CONFIG.styleId;
    styleTag.textContent = css;
    document.head.appendChild(styleTag);
  }

  // Cria o botão em si
  function createButton() {
    const btn = document.createElement("button");
    btn.id = CONFIG.elementId;
    btn.type = "button";
    btn.textContent = CONFIG.label;
    btn.setAttribute("aria-label", "Voltar para a página anterior");

    // Voltar preservando a posição de scroll: o navegador já faz isso
    // sozinho via history.back() (scroll restoration nativo). Não
    // aplicamos nenhum scrollTo manual para não sobrescrever esse
    // comportamento nativo.
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      window.history.back();
    });

    document.body.appendChild(btn);
    return btn;
  }

  // Mostra ou esconde o botão conforme o histórico disponível
  function updateVisibility(btn) {
    if (hasUsefulHistory()) {
      btn.classList.remove("upx-smartback-hidden");
    } else {
      btn.classList.add("upx-smartback-hidden");
    }
  }

  function init() {
    injectStyles();
    const btn = createButton();
    updateVisibility(btn);

    // Recheca visibilidade quando a página volta do cache do navegador
    // (bfcache) — cobre casos de navegação entre abas/back-forward.
    window.addEventListener("pageshow", function () {
      updateVisibility(btn);
    });
  }

  // Garante que o <body> já existe antes de inserir o botão
  if (document.body) {
    init();
  } else {
    document.addEventListener("DOMContentLoaded", init);
  }
})();