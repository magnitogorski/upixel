/* ============================================================
   BANNER PROMOCIONAL UPIXEL — componente reutilizável
   ============================================================

   O QUE É
   Um <upx-banner> é um Web Component nativo (Custom Element +
   Shadow DOM). Isso quer dizer que todo o CSS e todo o JS dele
   vivem isolados dentro de uma "sombra" — nenhum estilo daqui
   vaza pro resto da página, e nenhum estilo da página (style.css,
   mobile.css, etc.) entra aqui por acidente. Não precisa de
   nenhum prefixo de classe manual nem de cuidado especial: o
   navegador garante o isolamento sozinho.

   COMO USAR EM QUALQUER PÁGINA
   1) Inclua o script UMA VEZ por página, de preferência antes
      do </body>:

         <script src="banner-upixel.js" defer></script>

   2) Em qualquer lugar do HTML — entre duas seções, dentro de
      um artigo, onde quiser — cole a tag abaixo e preencha os
      atributos:

         <upx-banner
             id-anuncio="promo-exemplo-01"
             imagem="imagens/produto-exemplo.png"
             titulo="Nome do produto fictício"
             descricao="Uma frase curta contando o que é."
             link="https://upixel.com.br/pagina-do-produto.html">
         </upx-banner>

   3) Pronto. Quer outro banner em outra página (ou na mesma)?
      Copie a tag de novo e troque só os atributos. O script já
      incluído cuida de todas as instâncias da página sozinho.

   ATRIBUTOS DISPONÍVEIS
   - id-anuncio     (obrigatório) identificador único deste
                     anúncio. É a chave usada no localStorage
                     pra lembrar que o usuário fechou esse banner
                     específico. Dois banners com o mesmo
                     id-anuncio (mesmo em páginas diferentes)
                     são tratados como "o mesmo anúncio": fechar
                     um esconde o outro também, em qualquer
                     página do site.
   - imagem         caminho da imagem do banner.
   - titulo         título em destaque.
   - descricao      descrição curta (1–2 frases funciona melhor).
   - link           URL de destino (uma página do seu site).
   - selo           (opcional) texto do selo pequeno. Padrão: "Produto patrocinado".
   - texto-botao    (opcional) texto do botão. Padrão: "Saiba mais".
   - nova-aba       (opcional) escreva nova-aba="true" pra abrir
                     o link em outra aba. Padrão: mesma aba.

   IDENTIDADE VISUAL
   - O componente foi desenhado de propósito com um visual retrô,
     inspirado nas propagandas de portais brasileiros do fim dos
     anos 90 e dos anos 2000 (estilo UOL/Terra/Yahoo/Baixaki/
     Superdownloads/lojas virtuais da época). Tem barra "PUBLICIDADE
     / UPUBLI™" no topo, selo grande de destaque (ex.: "OFERTA",
     "LANÇAMENTO"), botão enorme estilo botão de loja antiga, e
     rodapé "Conteúdo patrocinado". É intencional: o objetivo é
     deixar óbvio, à primeira vista, que aquele bloco é uma peça
     publicitária — não uma funcionalidade nativa do site.

   ISOLAMENTO
   - CSS: vive inteiramente dentro do Shadow DOM (attachShadow).
     Nenhuma regra global do site consegue estilizar por engano
     o conteúdo do banner, e o banner não consegue vazar estilo
     pra fora dele.
   - JS: toda a lógica fica dentro da classe UpxBanner, dentro de
     um IIFE. O único nome que entra no escopo global é o próprio
     elemento customizado <upx-banner> (via customElements.define).
     Nenhuma variável solta, nenhuma função helper vazando pro
     `window`.
   ============================================================ */

(function () {
    'use strict';

    // Evita redefinir o elemento se o script for incluído 2x por engano.
    if (customElements.get('upx-banner')) return;

    var CHAVE_LOCALSTORAGE = 'upx-banner-fechado:';

    // Palavras de destaque estilo "selo de loja antiga". A escolha é
    // determinística (baseada no id-anuncio/título), então o mesmo
    // banner sempre mostra o mesmo selo — sem depender de novo atributo.
    var SELOS_DESTAQUE = ['OFERTA', 'LANÇAMENTO', 'NOVO', 'SUCESSO DE VENDAS'];

    class UpxBanner extends HTMLElement {

        connectedCallback() {
            var idAnuncio = this.getAttribute('id-anuncio');

            if (!idAnuncio) {
                console.warn(
                    '[upx-banner] Este banner não tem o atributo "id-anuncio". ' +
                    'Sem ele, a preferência de fechar não é salva corretamente. ' +
                    'Adicione algo como id-anuncio="promo-nome-do-produto".'
                );
            }
        
 

            this._render();
        }

        _foiFechadoAntes() {
            try {
                return window.localStorage.getItem(this._chave) === '1';
            } catch (erro) {
                // localStorage indisponível (modo privado restritivo, etc.)
                // — o banner simplesmente aparece sempre, sem quebrar nada.
                return false;
            }
        }

        _lembrarFechado() {
            try {
                window.localStorage.setItem(this._chave, '1');
            } catch (erro) {
                // sem persistência disponível — segue o jogo, só não
                // vai lembrar na próxima visita.
            }
        }

        _escolherSeloDestaque(chave) {
            var texto = chave || 'upx-banner';
            var soma = 0;
            for (var i = 0; i < texto.length; i++) {
                soma += texto.charCodeAt(i);
            }
            return SELOS_DESTAQUE[soma % SELOS_DESTAQUE.length];
        }

        _render() {
            var imagem = this.getAttribute('imagem') || '';
            var titulo = this.getAttribute('titulo') || 'Título do produto';
            var descricao = this.getAttribute('descricao') || '';
            var link = this.getAttribute('link') || '#';
            var selo = this.getAttribute('selo') || 'Produto patrocinado';
            var textoBotao = this.getAttribute('texto-botao') || 'Saiba mais';
            var novaAba = this.getAttribute('nova-aba') === 'true';
            var idAnuncio = this.getAttribute('id-anuncio') || titulo;
            var seloDestaque = this._escolherSeloDestaque(idAnuncio);

            var raiz = this.attachShadow({ mode: 'open' });

            raiz.innerHTML =
                '<style>' + this._css() + '</style>' +
                '<div class="wrapper">' +
                    '<div class="banner" part="banner" role="link" tabindex="0" aria-label="Publicidade. ' +
                        this._escapar(titulo) + '. ' + this._escapar(descricao) + '">' +

                        '<div class="barra-topo">' +
                            '<span class="barra-topo-esquerda">&#9679; PUBLICIDADE &#9679;</span>' +
                            '<span class="barra-topo-direita">UPUBLI<span class="tm">&trade;</span></span>' +
                        '</div>' +

                        '<button type="button" class="fechar" aria-label="Fechar este anúncio">' +
                            '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6L18 18M18 6L6 18" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>' +
                        '</button>' +

                        '<div class="corpo">' +
                            (imagem ?
                                '<div class="coluna-imagem">' +
                                    '<div class="moldura-imagem">' +
                                        '<img src="' + this._escapar(imagem) + '" alt="" loading="lazy">' +
                                    '</div>' +
                                    '<div class="estrela-selo"><span>' + this._escapar(seloDestaque) + '</span></div>' +
                                '</div>'
                            : '') +
                            '<div class="coluna-conteudo">' +
                                '<span class="selo-pequeno">&#9733; ' + this._escapar(selo) + '</span>' +
                                '<h3 class="titulo">' + this._escapar(titulo) + '</h3>' +
                                (descricao ? '<p class="descricao">' + this._escapar(descricao) + '</p>' : '') +
                                '<span class="botao">' +
                                    '[ ' + this._escapar(textoBotao) + ' ]' +
                                '</span>' +
                            '</div>' +
                        '</div>' +

                        '<div class="rodape">Conteúdo patrocinado &bull; Produto fictício da coleção Upubli&trade;</div>' +
                    '</div>' +
                '</div>';

            var elBanner = raiz.querySelector('.banner');
            var elFechar = raiz.querySelector('.fechar');

            var irParaLink = function () {
                if (novaAba) {
                    window.open(link, '_blank', 'noopener');
                } else {
                    window.location.href = link;
                }
            };

            elBanner.addEventListener('click', function () {
                irParaLink();
            });
            elBanner.addEventListener('keydown', function (evento) {
                if (evento.key === 'Enter' || evento.key === ' ') {
                    evento.preventDefault();
                    irParaLink();
                }
            });

            elFechar.addEventListener('click', (function (self) {
                return function (evento) {
                    evento.stopPropagation();
                    self._fecharComAnimacao();
                };
            })(this));
        }

        _fecharComAnimacao() {
            var alturaAtual = this.getBoundingClientRect().height;

            // Trava a altura atual em px pra poder animar até 0 — animar
            // "height: auto" não funciona em CSS puro.
            this.style.height = alturaAtual + 'px';
            this.style.overflow = 'hidden';

            // Força o navegador a registrar a altura fixa antes de mudar
            // pra 0, senão as duas mudanças colapsam numa só (sem animação).
            // eslint-disable-next-line no-unused-expressions
            this.offsetHeight;

            this.classList.add('upx-banner-fechando');
            this.style.height = '0px';
            this.style.marginTop = '0px';
            this.style.marginBottom = '0px';
            this.style.opacity = '0';

            var self = this;
            var finalizar = function () {

                self.remove();
            };

            this.addEventListener('transitionend', finalizar, { once: true });

            // Rede de segurança: se por algum motivo o evento de transição
            // não disparar (aba em segundo plano, navegador exótico etc.),
            // remove o banner mesmo assim depois de um tempo.
            setTimeout(finalizar, 500);
        }

        _escapar(texto) {
            var div = document.createElement('div');
            div.textContent = texto == null ? '' : texto;
            return div.innerHTML;
        }

        _css() {
            return (
                '@import url("https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@600;700&display=swap");' +

                ':host {' +
                    'display: block;' +
                    'width: 100%;' +
                    'max-width: 100%;' +
                    'box-sizing: border-box;' +
                    'transition: height .38s ease, opacity .32s ease, margin .38s ease;' +
                '}' +

                '*, *::before, *::after { box-sizing: border-box; }' +

                '.wrapper {' +
                    'width: 100%;' +
                    'max-width: 100%;' +
                    'padding: 32px 0;' +
                    'display: flex;' +
                    'justify-content: center;' +
                '}' +

                /* Retângulo de propaganda clássico: proporção próxima de
                   728x220 no desktop, moldura grossa, sombra "dura" em
                   vez de sombra suave moderna — lembrando banner de
                   portal dos anos 2000. */
                '.banner {' +
                    'position: relative;' +
                    'display: flex;' +
                    'flex-direction: column;' +
                    'width: 100%;' +
                    'max-width: 728px;' +
                    'background: linear-gradient(180deg, #fff6e9 0%, #ffe9c7 100%);' +
                    'border: 4px solid #1a1a1a;' +
                    'border-radius: 6px;' +
                    'cursor: pointer;' +
                    'font-family: Arial, Helvetica, sans-serif;' +
                    'overflow: hidden;' +
                    'box-shadow: 6px 6px 0 #1a1a1a, 0 0 0 2px #FA397A inset;' +
                    'transition: transform .15s ease, box-shadow .15s ease;' +
                '}' +

                '.banner:hover, .banner:focus-visible {' +
                    'transform: translate(-2px, -2px);' +
                    'box-shadow: 9px 9px 0 #1a1a1a, 0 0 0 2px #FA397A inset;' +
                    'outline: none;' +
                '}' +

                '.barra-topo {' +
                    'position: relative;' +
                    'display: flex;' +
                    'align-items: center;' +
                    'justify-content: space-between;' +
                    'gap: 10px;' +
                    'min-height: 32px;' +
                    'padding: 5px 40px 5px 12px;' +
                    'background: repeating-linear-gradient(' +
                        '45deg,' +
                        '#1a1a1a,' +
                        '#1a1a1a 8px,' +
                        '#2b2b2b 8px,' +
                        '#2b2b2b 16px' +
                    ');' +
                    'border-bottom: 3px solid #FA397A;' +
                '}' +

                '.barra-topo-esquerda {' +
                    'font-size: 10px;' +
                    'font-weight: 900;' +
                    'letter-spacing: 1.5px;' +
                    'text-transform: uppercase;' +
                    'color: #ffe600;' +
                    'text-shadow: 1px 1px 0 #000;' +
                '}' +

                '.barra-topo-direita {' +
                    'font-family: "Pixelify Sans", "Arial Black", Arial, sans-serif;' +
                    'font-size: 13px;' +
                    'font-weight: 700;' +
                    'letter-spacing: .5px;' +
                    'color: #FA397A;' +
                    'text-shadow: 1px 1px 0 #000;' +
                '}' +

                '.barra-topo-direita .tm { font-size: 8px; vertical-align: super; }' +

                /* Fica ancorado dentro da própria barra "PUBLICIDADE"
                   (topo do banner), em vez de flutuar sobre a imagem —
                   assim nunca fica escondido atrás do selo circular em
                   telas estreitas, em nenhum breakpoint. */
                '.fechar {' +
                    /* Reset da aparência nativa do <button>. Sem isso, o
                       Safari do iOS aplica o próprio "chrome" do sistema
                       em cima do botão (fundo, padding, cantos), o que
                       pode empurrar/cortar o elemento e fazê-lo sumir na
                       prática, mesmo com z-index alto. */
                    '-webkit-appearance: none;' +
                    'appearance: none;' +
                    'margin: 0;' +
                    'padding: 0;' +
                    'font: inherit;' +
                    'line-height: 1;' +
                    'box-sizing: border-box;' +
                    'position: absolute;' +
                    'top: 4px;' +
                    'right: 6px;' +
                    'width: 26px;' +
                    'height: 26px;' +
                    'display: flex;' +
                    'align-items: center;' +
                    'justify-content: center;' +
                    'background-color: rgba(255, 255, 255, 0.14);' +
                    'border: 1.5px solid #ffe600;' +
                    'border-radius: 4px;' +
                    'color: #ffe600;' +
                    'cursor: pointer;' +
                    '-webkit-tap-highlight-color: transparent;' +
                    'touch-action: manipulation;' +
                    'z-index: 6;' +
                    'transition: background .15s ease, color .15s ease, transform .15s ease;' +
                '}' +

                '.fechar:hover, .fechar:focus-visible {' +
                    'background: #FA397A;' +
                    'border-color: #FA397A;' +
                    'color: #ffffff;' +
                    'transform: scale(1.06);' +
                    'outline: none;' +
                '}' +

                '.fechar svg { width: 12px; height: 12px; pointer-events: none; }' +

                '.corpo {' +
                    'display: flex;' +
                    'align-items: stretch;' +
                    'flex: 1 1 auto;' +
                '}' +

                '.coluna-imagem {' +
                    'position: relative;' +
                    'flex: 0 0 36%;' +
                    'max-width: 36%;' +
                    'display: flex;' +
                    'align-items: center;' +
                    'justify-content: center;' +
                    'padding: 16px;' +
                    'background: repeating-linear-gradient(' +
                        '135deg,' +
                        '#ffe9c7,' +
                        '#ffe9c7 10px,' +
                        '#ffdead 10px,' +
                        '#ffdead 20px' +
                    ');' +
                    'border-right: 3px dashed #1a1a1a;' +
                '}' +

                '.moldura-imagem {' +
                    'width: 100%;' +
                    'aspect-ratio: 1 / 1;' +
                    'border-radius: 8px;' +
                    'overflow: hidden;' +
                    'background: #ffffff;' +
                    'border: 3px solid #1a1a1a;' +
                    'box-shadow: 3px 3px 0 #FA397A;' +
                '}' +

                '.moldura-imagem img {' +
                    'width: 100%;' +
                    'height: 100%;' +
                    'object-fit: cover;' +
                    'display: block;' +
                '}' +

                '.estrela-selo {' +
                    'position: absolute;' +
                    'top: -6px;' +
                    'right: -2px;' +
                    'width: 68px;' +
                    'height: 68px;' +
                    'display: flex;' +
                    'align-items: center;' +
                    'justify-content: center;' +
                    'background: #ffe600;' +
                    'border: 2px solid #1a1a1a;' +
                    'border-radius: 50%;' +
                    'transform: rotate(-14deg);' +
                    'box-shadow: 2px 2px 0 #1a1a1a;' +
                    'animation: upx-pulsar 1.6s ease-in-out infinite;' +
                '}' +

                '.estrela-selo span {' +
                    'display: block;' +
                    'width: 100%;' +
                    'text-align: center;' +
                    'font-size: 9.5px;' +
                    'font-weight: 900;' +
                    'line-height: 1.1;' +
                    'color: #c0006e;' +
                    'text-transform: uppercase;' +
                    'letter-spacing: .2px;' +
                    'padding: 0 4px;' +
                    'word-break: break-word;' +
                '}' +

                '@keyframes upx-pulsar {' +
                    '0%, 100% { transform: rotate(-14deg) scale(1); }' +
                    '50% { transform: rotate(-14deg) scale(1.08); }' +
                '}' +

                '.coluna-conteudo {' +
                    'flex: 1 1 auto;' +
                    'min-width: 0;' +
                    'display: flex;' +
                    'flex-direction: column;' +
                    'justify-content: center;' +
                    'gap: 8px;' +
                    'padding: 18px 20px;' +
                '}' +

                '.selo-pequeno {' +
                    'display: inline-block;' +
                    'align-self: flex-start;' +
                    'background: #1a1a1a;' +
                    'color: #ffe600;' +
                    'font-size: 10px;' +
                    'font-weight: 800;' +
                    'text-transform: uppercase;' +
                    'letter-spacing: .8px;' +
                    'padding: 3px 9px;' +
                    'border-radius: 3px;' +
                '}' +

                '.titulo {' +
                    'margin: 2px 0 0;' +
                    'color: #1a1a1a;' +
                    'font-family: "Pixelify Sans", "Arial Black", Arial, sans-serif;' +
                    'font-size: 1.28rem;' +
                    'font-weight: 700;' +
                    'line-height: 1.2;' +
                    'overflow-wrap: break-word;' +
                    'text-shadow: 1px 1px 0 #ffe600;' +
                '}' +

                '.descricao {' +
                    'margin: 0;' +
                    'color: #3a3a3a;' +
                    'font-size: .88rem;' +
                    'line-height: 1.45;' +
                    'overflow-wrap: break-word;' +
                    'max-width: 48ch;' +
                '}' +

                '.botao {' +
                    'display: inline-flex;' +
                    'align-items: center;' +
                    'justify-content: center;' +
                    'align-self: flex-start;' +
                    'margin-top: 10px;' +
                    'background: linear-gradient(180deg, #ff5fa2 0%, #FA397A 55%, #d61f60 100%);' +
                    'color: #ffffff;' +
                    'font-size: 1rem;' +
                    'font-weight: 900;' +
                    'letter-spacing: .5px;' +
                    'text-transform: uppercase;' +
                    'padding: 12px 26px;' +
                    'border: 2px solid #7a0e3c;' +
                    'border-radius: 6px;' +
                    'box-shadow: 0 4px 0 #7a0e3c, 0 6px 12px rgba(0,0,0,.35);' +
                    'text-shadow: 1px 1px 0 rgba(0,0,0,.35);' +
                    'transition: transform .12s ease, box-shadow .12s ease;' +
                '}' +

                '.banner:hover .botao, .banner:focus-visible .botao {' +
                    'transform: translateY(2px);' +
                    'box-shadow: 0 2px 0 #7a0e3c, 0 4px 8px rgba(0,0,0,.35);' +
                '}' +

                '.rodape {' +
                    'padding: 6px 14px;' +
                    'background: #1a1a1a;' +
                    'color: #cfcfcf;' +
                    'font-size: 10px;' +
                    'letter-spacing: .2px;' +
                    'text-align: center;' +
                '}' +

                '@media (prefers-reduced-motion: reduce) {' +
                    ':host, .banner, .fechar, .botao, .estrela-selo { transition: none !important; animation: none !important; }' +
                '}' +

                /* Tablet: mantém layout horizontal, só reduz respiro e
                   proporções pra caber sem estourar a largura. */
                '@media (max-width: 780px) {' +
                    '.coluna-imagem { flex-basis: 34%; max-width: 34%; padding: 12px; }' +
                    '.coluna-conteudo { padding: 14px 16px; }' +
                    '.titulo { font-size: 1.1rem; }' +
                    '.estrela-selo { width: 56px; height: 56px; }' +
                '}' +

                /* Celular: vira card vertical — imagem no topo, título,
                   descrição, botão ocupando 100% da largura. Sem rolagem
                   horizontal em nenhum momento. */
                '@media (max-width: 560px) {' +
                    '.wrapper { padding: 22px 0; }' +
                    '.barra-topo { padding: 6px 38px 6px 10px; }' +
                    '.barra-topo-esquerda { font-size: 9px; }' +
                    '.corpo { flex-direction: column; }' +
                    '.coluna-imagem {' +
                        'flex-basis: auto;' +
                        'max-width: 100%;' +
                        'width: 100%;' +
                        'border-right: none;' +
                        'border-bottom: 3px dashed #1a1a1a;' +
                        'padding: 18px;' +
                    '}' +
                    '.moldura-imagem { max-width: 220px; margin: 0 auto; }' +
                    '.estrela-selo { top: 6px; right: 6px; }' +
                    '.coluna-conteudo { align-items: stretch; padding: 16px 16px 18px; }' +
                    '.selo-pequeno, .titulo, .descricao { align-self: flex-start; }' +
                    '.botao { width: 100%; margin-top: 12px; }' +
                '}'
            );
        }
    }

    customElements.define('upx-banner', UpxBanner);
})();
