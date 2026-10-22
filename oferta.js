/* CONFIGURAÇÃO CENTRAL DA OFERTA
   Valores null ou vazios não geram descontos, avaliações ou promessas.
   Preços são em reais. Nunca há conversão de moeda.
   Substitua as prévias ilustrativas por mídias do produto final antes da abertura. */
window.OFERTA = {
  marca: {
    nome: 'Academia de Desenho',
    assinatura: 'APRENDA · PRATIQUE · CRIE',
    logo: '', // caminho de um logotipo próprio; vazio usa a identidade tipográfica provisória
    descricao: 'Um espaço para explorar o desenho, praticar com intenção e dar forma às suas ideias.',
    razaoSocial: '', documento: '', endereco: '',
    email: '', whatsapp: '',
    redes: [], // { nome: 'Instagram', url: 'https://...' }
    termosUrl: '', privacidadeUrl: '', reembolsoUrl: ''
  },
  visual: { verde: '#61C7BD', texto: '#2D3142', verdeClaro: '#E1F6F3' },
  faixa: '50% DE DESCONTO · RESTAM 7 CUPONS DE DESCONTO',
  faixaVelocidade: 58, // pixels por segundo; rolagem contínua para a esquerda
  titulo: 'Academia de Desenho',
  subtitulo: 'Projetos guiados em PDF para praticar no seu ritmo.',
  destaqueArtistas: {
    texto: 'Aprovado por mais de 5000 artistas',
    imagens: [
      { src: 'assets/artistas/retrato-01.jpg', largura: 513, enquadramento: { x: 166, y: 140, lado: 220 } },
      { src: 'assets/artistas/retrato-02.jpg', largura: 493, enquadramento: { x: 126, y: 58, lado: 225 } },
      { src: 'assets/artistas/retrato-03.jpg', largura: 447, enquadramento: { x: 82, y: 70, lado: 260 } },
      { src: 'assets/artistas/retrato-04.jpg', largura: 494, enquadramento: { x: 135, y: 85, lado: 260 } },
      { src: 'assets/artistas/retrato-05.jpg', largura: 493, enquadramento: { x: 125, y: 222, lado: 245 } }
    ] // fotos fornecidas; enquadramento aplicado somente na exibição em CSS
  },
  beneficiosIniciais: [
    { emoji: '✏️', texto: 'Acesso digital para estudar onde preferir.' },
    { emoji: '🌿', texto: 'Um momento criativo, no seu próprio ritmo.' },
    { emoji: '📓', texto: 'Material imprimível para praticar no papel.' },
    { emoji: '🎨', texto: 'Projetos variados, com exercícios guiados.' }
  ],
  galeria: [
    { src: 'assets/produto-pdf-pt.webp', alt: 'Academia de Desenho: edição digital em PDF, guia passo a passo, desenhos e caderno de exercícios', legenda: 'Academia de Desenho · edição digital' },
    { tipo: 'animacao', src: 'assets/referencia/tablet-animado.webp', poster: 'assets/referencia/tablet-poster.webp', alt: 'Prévia em movimento da navegação por páginas de desenho em um tablet', legenda: 'Conheça as páginas do material', reproducaoAutomatica: true },
    { src: 'assets/referencia/caderno-cavalos.webp', alt: 'Caderno com estudo de cavalos a lápis', legenda: 'Estudo de cavalos no caderno' },
    { src: 'assets/referencia/estudo-retrato.webp', alt: 'Estudos de retrato no caderno e na tela do tablet', legenda: 'Estudos de retrato e observação' },
    { src: 'assets/referencia/estudo-lua.webp', alt: 'Estudo detalhado da lua em um caderno de desenho', legenda: 'Luz, sombras e detalhes' },
    { src: 'assets/referencia/pagina-cavalos.webp', alt: 'Página de caderno com desenho de cavalos', legenda: 'Desenhos para explorar no papel' }
  ],
  midiasIlustrativas: true, // trocar para false SOMENTE ao usar imagens fiéis ao material entregue
  demonstracao: { tipo: 'animacao', src: 'assets/referencia/tablet-animado.webp', poster: 'assets/referencia/tablet-poster.webp', alt: 'Prévia ilustrativa da navegação pelas páginas em um tablet', proporcao: '4 / 5', reproducaoAutomatica: true }, // mesma animação usada na segunda miniatura da referência
  imagemProjetos: { src: 'assets/referencia/projetos-desenho.webp', alt: 'Cadernos com estudos de desenho e lápis sobre uma mesa' },
  projetos: {
    titulo: '+200 projetos de desenho passo a passo',
    texto: 'Sem experiência prévia. Sem materiais caros. É só seguir os passos e criar algo bonito desde o primeiro dia.'
  },
  guia: {
    titulo: 'Por que você vai adorar este guia?',
    subtitulo: 'Amado por artistas de todos os níveis'
  },
  beneficiosGuia: [
    'Feito para despertar a criatividade sem estresse.',
    'Orientação leve para dominar o traço, o sombreamento e a perspectiva.',
    'Sem regras: apenas orientações bem estruturadas e espaço para criar livremente.',
    'Inclui retratos, figuras, natureza-morta e estudos de estilo livre.',
    'Perfeito para iniciantes, amadores e profissionais que querem se reconectar com o desenho.',
    'Estimula a atenção plena, a diversão e a expressão pessoal de verdade.'
  ],
  pacoteInicial: 'basico',
  pacotes: [
    { id: 'basico', titulo: 'Adquira a Academia de Desenho Criativo', descricao: '', detalhe: 'Material digital em PDF', preco: 37, precoAnterior: 74, selo: '', checkoutUrl: '', temVideo: false }
  ],
  compra: {
    textoBotao: 'QUERO COMEÇAR A DESENHAR', condicoesAcesso: '',
    textoSeguranca: 'Pagamento seguro garantido',
    formasPagamento: ['PayPal', 'Visa', 'Mastercard', 'American Express', 'Mercado Pago', 'Pix'],
    imagemFormasPagamento: { src: 'assets/pagamento/marcas-originais.webp', alt: 'PayPal, Visa, Mastercard, American Express e Mercado Pago' },
    imagemPix: { src: 'assets/pagamento/pix.jpg', alt: 'Pix' },
    textoIndisponivel: 'INSCRIÇÕES EM BREVE', avisoIndisponivel: 'As inscrições ainda não estão abertas.'
  },
  entrega: { texto: '', prazoAcesso: '' },
  garantia: { dias: 7, condicoes: '', canal: '', url: '', selo: { src: 'assets/garantia/selo-7-dias.png', alt: 'Selo de garantia de 7 dias' } },
  // Exemplo identificado na prévia privada. Substituir por relato real autorizado.
  depoimentoDestaque: {
    nome: 'Mariana R.', iniciais: 'MR', foto: 'assets/depoimentos/mariana.jpeg', nota: 5,
    texto: 'O material explica de um jeito muito didático como fazer os traços e as sombras no desenho. É muito bonito, e a qualidade é excelente!',
    ilustrativo: true
  },
  depoimentos: [], // clientes próprios: { nome, foto, nota: 5, texto, autorizado: true }
  textosDepoimentos: {
    titulo: 'O que dizem as alunas que já experimentaram',
    dica: 'Deslize para ver mais opiniões →',
    origemReferencia: 'Depoimentos da página de referência, traduzidos para o português.'
  },
  // Mantidos separados dos relatos de clientes próprios, com origem visível na página.
  depoimentosReferencia: [
    { nome: 'Isadora S.', foto: 'assets/referencia/foto-depoimento-01.webp', nota: 5, texto: 'Perfeito, exatamente como eu esperava, com todos os detalhes para poder praticar.' },
    { nome: 'Valentina M.', foto: 'assets/referencia/foto-depoimento-02.webp', nota: 5, texto: 'O produto é de ótima qualidade e tem uma edição excelente. Recomendo muito: é interessante, útil e prático para estudar desenho.' }
  ],
  faq: [
    { pergunta: 'Como vou receber o material?', resposta: 'O produto é digital: não há envio de livros ou cadernos físicos. As orientações para acessar o material serão informadas no checkout.' },
    { pergunta: 'Preciso ter experiência com desenho?', resposta: 'Você pode usar os projetos guiados como um ponto de partida para praticar. Siga as etapas com calma e adapte cada exercício ao seu nível.' },
    { pergunta: 'Quais materiais preciso ter?', resposta: 'Para a prática no papel, comece com lápis, borracha e folhas. Consulte a orientação de cada exercício antes de separar materiais adicionais.' },
    { pergunta: 'O que está incluído no material?', resposta: 'Você recebe o guia de fundamentos, a coleção de projetos de desenho passo a passo e o caderno de prática, em formato PDF.' },
    { pergunta: 'Em quanto tempo vou perceber evolução?', resposta: 'Isso depende do seu ponto de partida, da frequência e da forma de praticar. Reserve um tempo possível para você, compare seus estudos ao longo do tempo e respeite o seu processo.' },
    { pergunta: 'Consigo usar o material sem internet?', resposta: 'Sim. Depois de baixar os PDFs, você pode consultar os arquivos offline. As páginas impressas também podem ser usadas sem conexão.' },
    { pergunta: 'Posso repetir os exercícios?', resposta: 'Sim. Você pode retomar seus estudos e repetir a prática para uso pessoal. Reimprimir as páginas é uma forma de experimentar novas soluções e comparar seus desenhos.' },
    { pergunta: 'Como funciona a garantia?', resposta: 'O prazo, as condições e o canal para solicitar reembolso serão apresentados antes da conclusão da compra.' },
    { pergunta: 'Quais são as formas de pagamento?', resposta: 'O material digital em PDF custa R$37. As formas de pagamento disponíveis serão informadas no checkout.' }
  ]
};
