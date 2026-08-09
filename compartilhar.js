document.addEventListener('DOMContentLoaded', () => {
  const btnCompartilhar = document.getElementById('upubli-btn-compartilhar');

  if (!btnCompartilhar) {
    console.error('UPixel Share Error: O elemento com id="upubli-btn-compartilhar" não foi encontrado nesta página.');
    return;
  }

  const executarCompartilhamento = async (e) => {
    if (e) e.preventDefault();

    const shareData = {
      title: document.title,
      text: document.querySelector('meta[name="description"]')?.content || document.title,
      url: window.location.href,
    };

    // Tenta a API de compartilhamento nativo (Celular e navegadores compatíveis)
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // Usuário apenas cancelou ou fechou o menu
      }
    } else if (navigator.clipboard && window.isSecureContext) {
      // Fallback para Computador (Copia o link)
      try {
        await navigator.clipboard.writeText(window.location.href);
        const textoOriginal = btnCompartilhar.innerHTML;
        btnCompartilhar.innerHTML = '✅ Link copiado!';
        setTimeout(() => {
          btnCompartilhar.innerHTML = textoOriginal;
        }, 2500);
      } catch (err) {
        alert('Não foi possível copiar o link.');
      }
    } else {
      // Fallback de segurança para contextos HTTP locais ou navegadores antigos
      prompt('Copie o link abaixo para compartilhar:', window.location.href);
    }
  };

  btnCompartilhar.addEventListener('click', executarCompartilhamento);
});