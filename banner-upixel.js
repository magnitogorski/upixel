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
   - selo           (opcional) texto do selo. Padrão: "Produto Fictício".
   - texto-botao    (opcional) texto do botão. Padrão: "Saiba mais".
   - nova-aba       (opcional) escreva nova-aba="true" pra abrir
                     o link em outra aba. Padrão: mesma aba.

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

        _render() {
            var imagem = this.getAttribute('imagem') || '';
            var titulo = this.getAttribute('titulo') || 'Título do produto';
            var descricao = this.getAttribute('descricao') || '';
            var link = this.getAttribute('link') || '#';
            var selo = this.getAttribute('selo') || 'Será que Presta?';
            var textoBotao = this.getAttribute('texto-botao') || 'Saiba mais';
            var novaAba = this.getAttribute('nova-aba') === 'true';

            var raiz = this.attachShadow({ mode: 'open' });

            raiz.innerHTML =
                '<style>' + this._css() + '</style>' +
                '<div class="banner" part="banner" role="link" tabindex="0" aria-label="' +
                    this._escapar(titulo) + '. ' + this._escapar(descricao) + '">' +
                    '<button type="button" class="fechar" aria-label="Fechar este anúncio">' +
                        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6L18 18M18 6L6 18" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>' +
                    '</button>' +
                    (imagem ? '<div class="imagem"><img src="' + this._escapar(imagem) + '" alt="" loading="lazy"></div>' : '') +
                    '<div class="conteudo">' +
                        '<span class="selo">' + this._escapar(selo) + '</span>' +
                        '<h3 class="titulo">' + this._escapar(titulo) + '</h3>' +
                        (descricao ? '<p class="descricao">' + this._escapar(descricao) + '</p>' : '') +
                        '<span class="botao">' +
                            this._escapar(textoBotao) +
                            '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
                        '</span>' +
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

            elBanner.addEventListener('click', irParaLink);
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

                '.banner {' +
                    'position: relative;' +
                    'display: flex;' +
                    'align-items: center;' +
                    'gap: 24px;' +
                    'width: 100%;' +
                    'max-width: 100%;' +
                    'background: linear-gradient(135deg, #0d0d0d 0%, #000000 65%);' +
                    'border: 1px solid #262626;' +
                    'border-radius: 16px;' +
                    'padding: 24px 28px;' +
                    'cursor: pointer;' +
                    'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;' +
                    'overflow: hidden;' +
                    'transition: border-color .2s ease, box-shadow .2s ease, transform .2s ease;' +
                '}' +

                '.banner::before {' +
                    'content: "";' +
                    'position: absolute;' +
                    'inset: 0 auto 0 0;' +
                    'width: 3px;' +
                    'background: linear-gradient(180deg, #FA397A, #7a1f45);' +
                '}' +

                '.banner:hover, .banner:focus-visible {' +
                    'border-color: #FA397A;' +
                    'box-shadow: 0 8px 28px rgba(250, 57, 122, 0.16);' +
                    'transform: translateY(-1px);' +
                    'outline: none;' +
                '}' +

                '.fechar {' +
                    'position: absolute;' +
                    'top: 10px;' +
                    'right: 10px;' +
                    'width: 40px;' +
                    'height: 40px;' +
                    'display: flex;' +
                    'align-items: center;' +
                    'justify-content: center;' +
                    'background: rgba(255, 255, 255, 0.06);' +
                    'border: 1px solid #333333;' +
                    'border-radius: 50%;' +
                    'color: #ffffff;' +
                    'cursor: pointer;' +
                    'z-index: 2;' +
                    'transition: background .18s ease, border-color .18s ease, transform .18s ease;' +
                '}' +

                '.fechar:hover, .fechar:focus-visible {' +
                    'background: #FA397A;' +
                    'border-color: #FA397A;' +
                    'transform: scale(1.06);' +
                    'outline: none;' +
                '}' +

                '.fechar svg { width: 16px; height: 16px; }' +

                '.imagem {' +
                    'flex: none;' +
                    'width: 96px;' +
                    'height: 96px;' +
                    'border-radius: 12px;' +
                    'overflow: hidden;' +
                    'background: #1a1a1a;' +
                '}' +

                '.imagem img {' +
                    'width: 100%;' +
                    'height: 100%;' +
                    'object-fit: cover;' +
                    'display: block;' +
                '}' +

                '.conteudo {' +
                    'flex: 1 1 auto;' +
                    'min-width: 0;' +
                    'display: flex;' +
                    'flex-direction: column;' +
                    'gap: 6px;' +
                    'padding-right: 36px;' +
                '}' +

                '.selo {' +
                    'display: inline-block;' +
                    'align-self: flex-start;' +
                    'background: rgba(250, 57, 122, 0.14);' +
                    'color: #FA397A;' +
                    'font-size: 11px;' +
                    'font-weight: 700;' +
                    'text-transform: uppercase;' +
                    'letter-spacing: 1px;' +
                    'padding: 4px 10px;' +
                    'border-radius: 20px;' +
                    'border: 1px solid rgba(250, 57, 122, 0.35);' +
                '}' +

                '.titulo {' +
                    'margin: 2px 0 0;' +
                    'color: #ffffff;' +
                    'font-family: "Pixelify Sans", -apple-system, BlinkMacSystemFont, sans-serif;' +
                    'font-size: 1.15rem;' +
                    'font-weight: 700;' +
                    'line-height: 1.25;' +
                    'overflow-wrap: break-word;' +
                '}' +

                '.descricao {' +
                    'margin: 0;' +
                    'color: #a3a3a3;' +
                    'font-size: .9rem;' +
                    'line-height: 1.5;' +
                    'overflow-wrap: break-word;' +
                    'max-width: 60ch;' +
                '}' +

                '.botao {' +
                    'display: inline-flex;' +
                    'align-items: center;' +
                    'gap: 8px;' +
                    'align-self: flex-start;' +
                    'margin-top: 8px;' +
                    'background: #FA397A;' +
                    'color: #000000;' +
                    'font-size: .85rem;' +
                    'font-weight: 700;' +
                    'padding: 10px 18px;' +
                    'border-radius: 8px;' +
                    'transition: background .18s ease, transform .18s ease;' +
                '}' +

                '.botao svg { width: 15px; height: 15px; flex: none; }' +

                '.banner:hover .botao, .banner:focus-visible .botao {' +
                    'background: #ffffff;' +
                '}' +

                '@media (prefers-reduced-motion: reduce) {' +
                    ':host, .banner, .fechar, .botao { transition: none !important; }' +
                '}' +

                /* Tablet: reduz respiro sem quebrar a estrutura lado a lado. */
                '@media (max-width: 900px) {' +
                    '.banner { gap: 18px; padding: 20px; }' +
                    '.imagem { width: 76px; height: 76px; }' +
                '}' +

                /* Celular: empilha imagem em cima do texto, botão fechar some
                   do canto e some pra dentro do fluxo, nada de largura fixa
                   que force rolagem horizontal. */
                '@media (max-width: 560px) {' +
                    '.banner {' +
                        'flex-direction: column;' +
                        'align-items: flex-start;' +
                        'padding: 20px 18px;' +
                    '}' +
                    '.imagem { width: 100%; height: 140px; }' +
                    '.conteudo { padding-right: 0; width: 100%; }' +
                    '.botao { width: 100%; justify-content: center; }' +
                    '.fechar { top: 8px; right: 8px; }' +
                '}'
            );
        }
    }

    customElements.define('upx-banner', UpxBanner);
})();
