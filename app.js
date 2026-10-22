(() => {
  'use strict';
  const c = window.OFERTA;
  if (!c) return;
  const $ = id => document.getElementById(id);
  const criar = (tag, classe, texto) => { const e = document.createElement(tag); if (classe) e.className = classe; if (texto !== undefined) e.textContent = texto; return e; };
  const escrever = (id, texto) => { $(id).textContent = texto || ''; };
  const desenhos = {
    pencil:'<path d="m4 16-1 5 5-1L21 7l-4-4L4 16Zm10-10 4 4M4 16l4 4"/>',
    download:'<path d="M12 3v12m-4-4 4 4 4-4M4 16v4h16v-4"/>',
    leaf:'<path d="M20 3C9 2 2 8 5 16c7 5 15-1 15-13ZM4 21 16 8M9 16v-5m0 5h5"/>',
    book:'<path d="M12 5C8 3 5 3 2 4v16c3-1 6-1 10 1 4-2 7-2 10-1V4c-3-1-6-1-10 1Zm0 0v16M5 8h4M5 12h4m6-4h4m-4 4h4"/>',
    video:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="m10 8 6 4-6 4Z"/>',
    shield:'<path d="M12 2 3 6v6c0 5 9 10 9 10s9-5 9-10V6L12 2Z"/><path d="m8 12 3 3 5-6"/>',
    lock:'<rect x="4" y="10" width="16" height="12" rx="2"/><path d="M7 10V7a5 5 0 0 1 10 0v3m-5 5v3"/>',
    ssl:'<rect x="3" y="9" width="18" height="13" rx="2"/><path d="M7 9V6a5 5 0 0 1 10 0v3"/><text x="12" y="18" fill="currentColor" stroke="none" font-size="6" font-weight="700" font-family="Arial,sans-serif" text-anchor="middle">SSL</text>'
  };
  const icone = nome => { const e=document.createElementNS('http://www.w3.org/2000/svg','svg');e.setAttribute('viewBox','0 0 24 24');e.setAttribute('class','icone');e.setAttribute('aria-hidden','true');e.innerHTML=desenhos[nome]||desenhos.pencil;return e; };
  const urlSegura = (valor, permitirEmail=false) => { try { const u=new URL(valor,location.href);if(permitirEmail&&u.protocol==='mailto:')return u.href;return u.protocol==='https:'&&!u.username&&!u.password ? u.href : null; }catch{return null;} };
  // Nenhum checkout do site de referência pode ser usado, inclusive em subdomínios.
  function checkoutValido(valor){
    if(!valor || !/^https:\/\//i.test(valor))return null;
    const segura=urlSegura(valor);if(!segura)return null;
    const host=new URL(segura).hostname.toLowerCase();
    if(/(^|\.)academiauniversocreativo\.com$/.test(host)||/(universocreativo|academiadedibujo)/i.test(host))return null;
    return segura;
  }
  const dinheiro = valor => new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(valor);
  const precoValido = valor => typeof valor==='number'&&Number.isFinite(valor)&&valor>0;
  const prazoGarantiaValido = Number.isInteger(c.garantia.dias)&&c.garantia.dias>0;
  const garantiaValida = prazoGarantiaValido&&!!c.garantia.condicoes&&!!c.garantia.canal;
  document.documentElement.style.setProperty('--verde',c.visual.verde);
  document.documentElement.style.setProperty('--texto',c.visual.texto);
  document.documentElement.style.setProperty('--verde-claro',c.visual.verdeClaro);
  document.title=`${c.marca.nome} | Projetos guiados em PDF`;
  function atualizarFaixa(){
    const track=$('faixa'),grupo=criar('div','faixa-grupo');
    const mensagem=criar('div','faixa-mensagem'),lapis=criar('span','emoji-colorido faixa-emoji','✏️');
    lapis.setAttribute('aria-hidden','true');mensagem.append(lapis,criar('span','',c.faixa));
    grupo.append(mensagem);track.replaceChildren(grupo);
    while(grupo.getBoundingClientRect().width<track.parentElement.clientWidth){
      const repeticao=mensagem.cloneNode(true);repeticao.setAttribute('aria-hidden','true');grupo.append(repeticao);
    }
    const copia=grupo.cloneNode(true);copia.setAttribute('aria-hidden','true');track.append(copia);
    track.style.setProperty('--faixa-duracao',`${grupo.getBoundingClientRect().width/(c.faixaVelocidade||58)}s`);
  }
  atualizarFaixa();
  new ResizeObserver(atualizarFaixa).observe($('faixa').parentElement);
  document.fonts.ready.then(atualizarFaixa);
  function marca(alvo){
    if(c.marca.logo){const im=criar('img','marca-img');im.src=c.marca.logo;im.alt=c.marca.nome;alvo.append(im);return;}
    const simbolo=criar('img','marca-simbolo');simbolo.src='assets/simbolo.svg';simbolo.alt='';alvo.append(simbolo,criar('span','marca-nome',c.marca.nome),criar('span','marca-assinatura',c.marca.assinatura));
  }
  marca($('marcaPrincipal'));marca($('marcaRodape'));
  // O WebP animado reproduz diretamente, como um GIF, sem depender de controles.
  function criarAnimacaoAutomatica(midia,recipiente,galeria=false){
    const imagem=criar('img',galeria?'imagem-animada imagem-animada-galeria':'imagem-animada');
    imagem.src=midia.src;imagem.alt=midia.alt;imagem.decoding='async';imagem.width=384;imagem.height=480;
    recipiente.append(imagem);
    return {destruir(){imagem.remove();}};
  }
  // Vídeos de demonstração: sem som, em loop e pausados fora da tela.
  function criarVideoAutomatico(midia, recipiente, galeria=false){
    const video=criar('video',galeria?'video-galeria':'video-demonstracao');
    video.src=midia.src;video.poster=midia.poster||'';video.muted=true;video.defaultMuted=true;
    video.setAttribute('muted','');video.playsInline=true;video.setAttribute('playsinline','');
    video.loop=midia.repetir!==false;video.preload='metadata';video.setAttribute('aria-label',midia.alt);
    video.append(document.createTextNode('Seu navegador não conseguiu reproduzir esta demonstração.'));
    const botao=criar('button','controle-video','Reproduzir vídeo');botao.type='button';
    recipiente.append(video,botao);
    const movimentoReduzido=matchMedia('(prefers-reduced-motion: reduce)');
    let visivel=false,pausadoPeloVisitante=false,manual=false,descartado=false;
    function atualizar(){botao.textContent=video.paused?'Reproduzir vídeo':'Pausar vídeo';}
    function tocar(){if(descartado)return;const promessa=video.play();if(promessa)promessa.catch(atualizar);}
    function sincronizar(){
      const podeMover=!movimentoReduzido.matches||manual;
      if(visivel&&!pausadoPeloVisitante&&podeMover&&(midia.reproducaoAutomatica!==false||manual))tocar();
      else video.pause();
    }
    botao.addEventListener('click',()=>{
      if(video.paused){manual=true;pausadoPeloVisitante=false;tocar();}
      else{pausadoPeloVisitante=true;video.pause();}
    });
    video.addEventListener('play',atualizar);video.addEventListener('pause',atualizar);
    const observador=new IntersectionObserver(entradas=>{visivel=entradas[0].isIntersecting;sincronizar();},{threshold:.15});observador.observe(video);
    const trocarPreferencia=()=>{manual=false;sincronizar();};movimentoReduzido.addEventListener('change',trocarPreferencia);
    return {video,destruir(){descartado=true;video.pause();observador.disconnect();movimentoReduzido.removeEventListener('change',trocarPreferencia);video.remove();botao.remove();}};
  }
  let videoGaleria=null;
  let indice=0;
  const miniaturas=[];
  function mostrarImagem(n,rolar=false){
    indice=(n+c.galeria.length)%c.galeria.length;
    const item=c.galeria[indice];
    if(videoGaleria){videoGaleria.destruir();videoGaleria=null;}
    const dinamica=item.tipo==='video'||item.tipo==='animacao';
    $('imagemPrincipal').hidden=dinamica;
    if(dinamica)videoGaleria=item.tipo==='video'?criarVideoAutomatico(item,$('galeriaPrincipal'),true):criarAnimacaoAutomatica(item,$('galeriaPrincipal'),true);
    else{$('imagemPrincipal').src=item.src;$('imagemPrincipal').alt=item.alt;}
    escrever('contadorGaleria',`${indice+1} / ${c.galeria.length}`);escrever('legendaGaleria',item.legenda);
    miniaturas.forEach((b,i)=>b.setAttribute('aria-current',String(i===indice)));
    if(rolar)miniaturas[indice]?.scrollIntoView({block:'nearest',inline:'nearest',behavior:'smooth'});
  }
  c.galeria.forEach((item,i)=>{
    const b=criar('button','miniatura');b.type='button';b.setAttribute('aria-label',`Ver imagem ${i+1}: ${item.legenda}`);
    const im=criar('img');im.src=item.tipo==='video'?item.poster:item.src;im.alt='';im.loading='lazy';im.decoding='async';b.append(im);if(item.tipo==='video'){const indicador=criar('span','miniatura-video','▶');indicador.setAttribute('aria-hidden','true');b.append(indicador);}b.addEventListener('click',()=>mostrarImagem(i));$('miniaturas').append(b);miniaturas.push(b);
  });
  mostrarImagem(0);
  $('galeriaPrincipal').addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();mostrarImagem(indice+(e.key==='ArrowRight'?1:-1),true);}});
  let inicio=null;
  $('galeriaPrincipal').addEventListener('pointerdown',e=>{if(e.target.closest('button'))return;inicio={x:e.clientX,y:e.clientY};$('galeriaPrincipal').setPointerCapture(e.pointerId);});
  $('galeriaPrincipal').addEventListener('pointerup',e=>{if(!inicio)return;const dx=e.clientX-inicio.x,dy=e.clientY-inicio.y;if(Math.abs(dx)>42&&Math.abs(dx)>Math.abs(dy)*1.3)mostrarImagem(indice+(dx<0?1:-1),true);inicio=null;});
  $('galeriaPrincipal').addEventListener('pointercancel',()=>inicio=null);
  const estrela=criar('span','emoji-colorido estrela-artistas','⭐');estrela.setAttribute('aria-hidden','true');
  const previas=criar('div','previas-artistas');previas.setAttribute('aria-hidden','true');
  c.destaqueArtistas.imagens.forEach(foto=>{
    const circulo=criar('span','retrato-artista'),imagem=criar('img'),r=foto.enquadramento;
    imagem.src=foto.src;imagem.alt='';imagem.loading='lazy';imagem.decoding='async';
    imagem.style.width=`${foto.largura/r.lado*100}%`;
    imagem.style.left=`${-r.x/r.lado*100}%`;imagem.style.top=`${-r.y/r.lado*100}%`;
    circulo.append(imagem);previas.append(circulo);
  });
  $('confianca').append(estrela,criar('strong','texto-artistas',c.destaqueArtistas.texto),previas);
  escrever('tituloOferta',c.titulo);escrever('subtituloOferta',c.subtitulo);
  c.beneficiosIniciais.forEach(b=>{const li=criar('li'),emoji=criar('span','emoji-colorido emoji-beneficio',b.emoji);emoji.setAttribute('aria-hidden','true');li.append(emoji,criar('span','',b.texto));$('beneficiosIniciais').append(li);});
  const depoimentoCompleto=d=>d&&d.nome&&d.foto&&d.texto&&Number.isFinite(d.nota)&&d.nota>=1&&d.nota<=5;
  const depoimentoReal=d=>depoimentoCompleto(d)&&d.autorizado===true;
  function avaliacao(d,compacta){
    const conteudo=criar('div',compacta?'perfil-depoimento':'conteudo-depoimento');
    if(compacta){
      if(d.foto){const foto=criar('img');foto.src=d.foto;foto.alt=d.nome;foto.loading='lazy';conteudo.append(foto);}
      else{const iniciais=criar('span','avatar-iniciais',d.iniciais||d.nome.slice(0,1));iniciais.setAttribute('aria-hidden','true');conteudo.append(iniciais);}
    }
    const nome=criar('div');nome.append(criar('p','nome-avaliacao',d.nome));
    const estrelas=criar('p','estrelas','★'.repeat(Math.floor(d.nota)));estrelas.setAttribute('aria-label',`${d.nota} de 5 estrelas`);nome.append(estrelas);conteudo.append(nome);
    if(!compacta)conteudo.append(criar('blockquote','',d.texto));return conteudo;
  }
  const destaque=c.depoimentoDestaque;
  if(depoimentoReal(destaque)||(destaque?.ilustrativo===true&&destaque.nome&&destaque.texto&&destaque.nota>=1&&destaque.nota<=5)){
    $('depoimentoDestaque').hidden=false;
    $('depoimentoDestaque').append(avaliacao(destaque,true),criar('blockquote','',`“${destaque.texto}”`));
    if(destaque.ilustrativo)$('depoimentoDestaque').append(criar('figcaption','aviso-depoimento-exemplo','Exemplo ilustrativo de depoimento para revisão.'));
  }
  let selecionado=c.pacotes.find(p=>p.id===c.pacoteInicial)||c.pacotes[c.pacotes.length-1];
  function atualizarCompra(){
    document.querySelectorAll('.pacote').forEach(e=>e.classList.toggle('selecionado',e.dataset.pacote===selecionado.id));
    const link=checkoutValido(selecionado.checkoutUrl),disponivel=!!link&&precoValido(selecionado.preco);
    const b=$('botaoCompra');b.setAttribute('aria-disabled',String(!disponivel));b.setAttribute('aria-describedby','avisoCompra');
    if(disponivel){b.href=link;b.removeAttribute('tabindex');}else{b.removeAttribute('href');b.tabIndex=0;}
    escrever('textoCompra',disponivel?c.compra.textoBotao:c.compra.textoIndisponivel);
    escrever('condicoesCompra',c.compra.condicoesAcesso||'Produto digital · sem envio físico');
    escrever('avisoCompra',disponivel?(c.pacotes.length===1?(selecionado.temVideo?'Material digital e aulas em vídeo incluídos.':'Material digital em PDF incluído.'):`Pacote selecionado: ${selecionado.temVideo?'com aulas em vídeo':'material digital'}.`):c.compra.avisoIndisponivel);
  }
  const ofertaUnica = c.pacotes.length === 1;
  document.querySelector('.pacotes legend').textContent = ofertaUnica ? 'Material digital em PDF' : 'Escolha como você quer praticar';
  c.pacotes.forEach(p=>{
    const label=criar(ofertaUnica?'article':'label',`pacote${ofertaUnica?' oferta-unica':''}`);label.dataset.pacote=p.id;
    const radio=criar('input');radio.type='radio';radio.name='pacote';radio.value=p.id;radio.checked=p.id===selecionado.id;
    radio.setAttribute('aria-label',`${p.titulo}. ${p.detalhe}. ${precoValido(p.preco)?dinheiro(p.preco):'Inscrições em breve'}`);
    radio.addEventListener('change',()=>{selecionado=p;atualizarCompra();});
    const texto=criar('div','pacote-texto');texto.append(criar('span','pacote-titulo',p.titulo));
    if(p.descricao)texto.append(criar('span','pacote-descricao',p.descricao));
    const vantagens=criar('div','pacote-vantagens');
    if(precoValido(p.preco)&&precoValido(p.precoAnterior)&&p.precoAnterior>p.preco){
      vantagens.append(criar('span','economia-pacote',`Você economiza ${dinheiro(p.precoAnterior-p.preco)}`));
    }
    const detalhe=criar('span',`pacote-detalhe${p.temVideo?' video':' sem-video'}`);
    if(p.temVideo){const camera=criar('span','emoji-colorido','🎥');camera.setAttribute('aria-hidden','true');detalhe.append(camera);}
    detalhe.append(document.createTextNode(p.detalhe));
    if(p.temVideo)vantagens.append(detalhe);
    texto.append(vantagens);if(!p.temVideo)texto.append(detalhe);
    const precos=criar('div','precos');
    if(precoValido(p.preco)){
      if(precoValido(p.precoAnterior)&&p.precoAnterior>p.preco)precos.append(criar('span','preco-anterior',dinheiro(p.precoAnterior)));
      precos.append(criar('span','preco',dinheiro(p.preco)));
    }else precos.append(criar('span','preco-pendente','Em breve'));
    if(!ofertaUnica)label.append(radio);label.append(texto,precos);if(p.selo&&precoValido(p.preco))label.append(criar('span','selo-pacote',p.selo));$('pacotes').append(label);
  });
  atualizarCompra();
  $('botaoCompra').addEventListener('click',e=>{if($('botaoCompra').getAttribute('aria-disabled')==='true'){e.preventDefault();escrever('avisoCompra',c.compra.avisoIndisponivel);}});
  $('segurancaPagamento').append(icone('ssl'),criar('span','',c.compra.textoSeguranca));
  if(c.compra.imagemFormasPagamento?.src){
    const marcas=criar('img');marcas.src=c.compra.imagemFormasPagamento.src;marcas.alt=c.compra.imagemFormasPagamento.alt;marcas.loading='lazy';marcas.decoding='async';
    $('metodosPagamento').hidden=false;$('metodosPagamento').classList.add('metodos-imagem');
    if(c.compra.imagemPix?.src){
      const faixa=criar('div','marcas-faixa'),pix=criar('div','marca-pix'),recortePix=criar('div','recorte-pix'),logoPix=criar('img');
      logoPix.src=c.compra.imagemPix.src;logoPix.alt=c.compra.imagemPix.alt;logoPix.loading='lazy';logoPix.decoding='async';
      faixa.append(marcas);recortePix.append(logoPix);pix.append(recortePix);$('metodosPagamento').classList.add('com-pix');$('metodosPagamento').append(faixa,pix);
    }else $('metodosPagamento').append(marcas);
  }else if(c.compra.formasPagamento.length){$('metodosPagamento').hidden=false;c.compra.formasPagamento.forEach(m=>$('metodosPagamento').append(criar('span','metodo',m)));}
  if(prazoGarantiaValido){$('miniGarantia').hidden=false;$('miniGarantia').append(icone('shield'),criar('span','',`Garantia de ${c.garantia.dias} dias`));}
  const m=c.demonstracao;
  if(m.proporcao)$('midiaDemonstracao').style.aspectRatio=m.proporcao;
  if(m.tipo==='video'){
    criarVideoAutomatico(m,$('midiaDemonstracao'));
  }else if(m.tipo==='animacao'){
    criarAnimacaoAutomatica(m,$('midiaDemonstracao'));
  }else{const im=criar('img');im.src=m.src;im.alt=m.alt;im.loading='lazy';im.decoding='async';im.width=1200;im.height=1500;$('midiaDemonstracao').append(im);}
  escrever('tituloProjetos',c.projetos.titulo);escrever('textoProjetos',c.projetos.texto);$('imagemProjetos').src=c.imagemProjetos.src;$('imagemProjetos').alt=c.imagemProjetos.alt;
  document.querySelectorAll('[data-ilustrativa]').forEach(e=>e.hidden=!c.midiasIlustrativas);
  escrever('tituloBeneficios',c.guia.titulo);escrever('subtituloBeneficios',c.guia.subtitulo);
  c.beneficiosGuia.forEach(texto=>{const li=criar('li'),check=criar('span','check','✓');check.setAttribute('aria-hidden','true');li.append(check,criar('span','',texto));$('beneficiosGuia').append(li);});
  escrever('tituloDepoimentos',c.textosDepoimentos.titulo);escrever('dicaDepoimentos',c.textosDepoimentos.dica);
  const depoimentos=[...c.depoimentos.filter(depoimentoReal),...c.depoimentosReferencia.filter(depoimentoCompleto)];
  if(depoimentos.length){
    const carrossel=$('carrosselDepoimentos');$('secaoDepoimentos').hidden=false;
    if(c.depoimentosReferencia.length){$('origemDepoimentos').hidden=false;escrever('origemDepoimentos',c.textosDepoimentos.origemReferencia);}
    depoimentos.forEach(d=>{const card=criar('article','cartao-depoimento');const foto=criar('img');foto.src=d.foto;foto.alt=`Imagem do depoimento de ${d.nome}`;foto.loading='lazy';foto.width=600;foto.height=600;card.append(foto,avaliacao(d,false));carrossel.append(card);});
    let pontos=[],offsets=[],pagina=0;
    function sincronizar(){
      pagina=offsets.reduce((melhor,n,i)=>Math.abs(n-carrossel.scrollLeft)<Math.abs(offsets[melhor]-carrossel.scrollLeft)?i:melhor,0);
      pontos.forEach((b,i)=>b.setAttribute('aria-current',String(i===pagina)));
      $('anteriorDepoimento').disabled=pagina===0;$('proximoDepoimento').disabled=pagina===offsets.length-1;
    }
    function ir(p){const i=Math.max(0,Math.min(p,offsets.length-1));carrossel.scrollTo({left:offsets[i],behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});}
    function organizar(){
      const passo=carrossel.firstElementChild.getBoundingClientRect().width+16;
      const visiveis=Math.max(1,Math.round((carrossel.clientWidth+16)/passo));const total=Math.ceil(depoimentos.length/visiveis);
      offsets=Array.from({length:total},(_,i)=>Math.min(i*visiveis*passo,Math.max(0,carrossel.scrollWidth-carrossel.clientWidth)));
      $('indicadoresDepoimentos').replaceChildren();pontos=offsets.map((_,i)=>{const b=criar('button','indicador');b.setAttribute('aria-label',`Ver página ${i+1} de depoimentos`);b.addEventListener('click',()=>ir(i));$('indicadoresDepoimentos').append(b);return b;});sincronizar();
    }
    carrossel.addEventListener('scroll',sincronizar,{passive:true});$('anteriorDepoimento').addEventListener('click',()=>ir(pagina-1));$('proximoDepoimento').addEventListener('click',()=>ir(pagina+1));
    new ResizeObserver(organizar).observe(carrossel);
  }
  c.faq.forEach((f,i)=>{
    let resposta=f.resposta;
    if(i===0&&c.entrega.texto)resposta=c.entrega.texto+(c.entrega.prazoAcesso?' '+c.entrega.prazoAcesso:'');
    if(i===7&&garantiaValida)resposta=`Você tem ${c.garantia.dias} dias de garantia. ${c.garantia.condicoes} Solicite pelo canal: ${c.garantia.canal}.`;
    else if(i===7&&prazoGarantiaValido)resposta=`Você tem ${c.garantia.dias} dias de garantia. As condições e o canal para solicitar reembolso serão informados antes da conclusão da compra.`;
    if(i===8&&c.compra.formasPagamento.length)resposta=`O pagamento é em reais. Você pode usar ${c.compra.formasPagamento.join(', ')}. Confira as condições da oferta no checkout.`;
    const details=criar('details','faq-item'),summary=criar('summary','',f.pergunta),conteudo=criar('div','faq-resposta',resposta);details.append(summary,conteudo);
    details.addEventListener('toggle',()=>{if(details.open)$('faq').querySelectorAll('details[open]').forEach(outro=>{if(outro!==details)outro.open=false;});});$('faq').append(details);
  });
  if(garantiaValida){
    $('seloGarantia').append(criar('span','selo-numero',String(c.garantia.dias)),criar('span','selo-label','DIAS'));
    escrever('tituloGarantia',`${c.garantia.dias} dias de garantia`);escrever('textoGarantia',c.garantia.condicoes);
    const link=urlSegura(c.garantia.url||c.garantia.canal,true);if(link){$('canalGarantia').hidden=false;$('canalGarantia').href=link;$('canalGarantia').textContent='Fale com o atendimento';}
    else $('textoGarantia').append(document.createTextNode(` Solicitações: ${c.garantia.canal}.`));
  }else if(prazoGarantiaValido){
    $('seloGarantia').append(criar('span','selo-numero',String(c.garantia.dias)),criar('span','selo-label','DIAS'));
    escrever('tituloGarantia',`${c.garantia.dias} dias de garantia`);escrever('textoGarantia','As condições de garantia e o canal de solicitação serão informados antes da conclusão da compra.');
  }else{$('seloGarantia').append(icone('shield'));escrever('textoGarantia','Consulte o prazo, as condições de garantia e o canal de atendimento antes de concluir a compra. Essas informações estarão disponíveis na abertura das inscrições.');}
  if(c.garantia.selo?.src){
    const selo=criar('img');selo.src=c.garantia.selo.src;selo.alt=c.garantia.selo.alt;selo.loading='lazy';selo.decoding='async';selo.width=700;selo.height=700;
    $('seloGarantia').replaceChildren(selo);$('seloGarantia').classList.add('selo-com-imagem');
  }
  escrever('sobreMarca',c.marca.descricao);
  const contatos=[...c.marca.redes];if(c.marca.email)contatos.push({nome:c.marca.email,url:`mailto:${c.marca.email}`});if(c.marca.whatsapp)contatos.push({nome:'WhatsApp',url:c.marca.whatsapp});
  contatos.forEach(r=>{const link=urlSegura(r.url,true);if(!link)return;const a=criar('a','',r.nome);a.href=link;a.rel='noopener noreferrer';$('contatos').append(a);});
  [['Termos de serviço',c.marca.termosUrl],['Privacidade',c.marca.privacidadeUrl],['Reembolso',c.marca.reembolsoUrl]].forEach(([nome,url])=>{
    const segura=url?urlSegura(url):null;
    const e=criar(segura?'a':'button','',nome);if(segura){e.href=segura;e.rel='noopener noreferrer';}else e.addEventListener('click',()=>{escrever('tituloModal',nome);escrever('textoModal','Este documento será disponibilizado antes da abertura das inscrições. A compra ficará disponível após a definição das informações da oferta.');$('modalLegal').showModal();});$('linksLegais').append(e);
  });
  $('fecharModal').addEventListener('click',()=>$('modalLegal').close());$('confirmarModal').addEventListener('click',()=>$('modalLegal').close());$('modalLegal').addEventListener('click',e=>{if(e.target===$('modalLegal')){const r=$('modalLegal').getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)$('modalLegal').close();}});
  escrever('copyright',`© ${new Date().getFullYear()} ${c.marca.nome}. Todos os direitos reservados.`);
  const empresa=[c.marca.razaoSocial,c.marca.documento,c.marca.endereco].filter(Boolean).join(' · ');if(empresa){$('dadosEmpresa').hidden=false;escrever('dadosEmpresa',empresa);}
  document.querySelectorAll('img').forEach(im=>im.addEventListener('error',()=>{if(!im.src.endsWith('imagem-indisponivel.svg'))im.src='assets/imagem-indisponivel.svg';},{once:true}));
})();
