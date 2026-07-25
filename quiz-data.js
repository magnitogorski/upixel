// ============================================================
// BANCO DE PERGUNTAS DO QUIZ
//
// Este arquivo é compartilhado por TODAS as páginas do quiz
// (quiz.html e cada quiz-<categoria>.html). Só existe um lugar
// para editar perguntas: o array QUESTOES abaixo.
//
// COMO EDITAR:
// 1. Pra adicionar/trocar perguntas, mexa só no array QUESTOES.
//    Cada pergunta é um objeto:
//    { id, tags: [...], pergunta, respostas: [...],
//      correta: índice da resposta certa (0 a 4),
//      explicacao: texto que aparece depois de responder }
//
// 2. Pra criar uma CATEGORIA NOVA (ex.: "Filmes"):
//    a) Use essa tag em pelo menos uma pergunta aqui embaixo.
//    b) Adicione o slug dela em CATEGORIA_SLUGS (o slug vira
//       o nome do arquivo: quiz-filmes.html).
//    c) Copie um arquivo quiz-<categoria>.html existente,
//       troque a linha "const CATEGORIA_PAGINA = ..." pro nome
//       da tag nova, e ajuste o <title>/<h1> da página.
//    quiz.html detecta a categoria nova sozinho e mostra o card
//    dela automaticamente (não precisa editar quiz.html).
//
// 3. PONTOS_POR_ACERTO controla quantos pontos cada acerto vale.
//    Não há login nem ranking — é só o placar da rodada atual.
// ============================================================

const QUESTOES = [

// ---------- WCAG ----------
{
    id:"ia-01",
    tags:["IA"],
    pergunta:"O que é Inteligência Artificial (IA)?",
    respostas:[
        "Um sistema capaz de executar tarefas que normalmente exigem inteligência humana",
        "Um computador mais rápido",
        "Uma linguagem de programação",
        "Um tipo de banco de dados",
        "Um antivírus"
    ],
    correta:0,
    explicacao:"IA é a área da computação dedicada ao desenvolvimento de sistemas capazes de aprender, interpretar informações e tomar decisões."
},

{
    id:"ia-02",
    tags:["IA"],
    pergunta:"Quem cunhou o termo 'Inteligência Artificial' em 1956?",
    respostas:[
        "Alan Turing",
        "John McCarthy",
        "Elon Musk",
        "Bill Gates",
        "Tim Berners-Lee"
    ],
    correta:1,
    explicacao:"John McCarthy utilizou o termo Inteligência Artificial durante a conferência de Dartmouth em 1956."
},

{
    id:"ia-03",
    tags:["IA"],
    pergunta:"O que é Machine Learning?",
    respostas:[
        "Uma forma de computador aprender com dados sem ser explicitamente programado para cada tarefa",
        "Um computador que nunca erra",
        "Uma linguagem de programação",
        "Um tipo de processador",
        "Uma rede social"
    ],
    correta:0,
    explicacao:"Machine Learning permite que algoritmos aprendam padrões a partir de dados."
},

{
    id:"ia-04",
    tags:["IA"],
    pergunta:"O que caracteriza uma IA generativa?",
    respostas:[
        "Criar novos conteúdos como textos, imagens, músicas ou códigos",
        "Apenas armazenar arquivos",
        "Fazer backup automático",
        "Aumentar a velocidade da internet",
        "Detectar vírus"
    ],
    correta:0,
    explicacao:"Modelos generativos produzem novos conteúdos baseados em padrões aprendidos."
},

{
    id:"ia-05",
    tags:["IA"],
    pergunta:"O que significa a sigla LLM?",
    respostas:[
        "Large Language Model",
        "Local Language Machine",
        "Long Learning Method",
        "Logical Language Memory",
        "Linear Learning Module"
    ],
    correta:0,
    explicacao:"LLM significa Large Language Model, um modelo treinado para compreender e gerar linguagem natural."
},

{
    id:"ia-06",
    tags:["IA"],
    pergunta:"Qual é a principal função de um chatbot baseado em IA?",
    respostas:[
        "Conversar e responder perguntas em linguagem natural",
        "Aumentar a velocidade da internet",
        "Criar redes Wi-Fi",
        "Instalar programas automaticamente",
        "Substituir processadores"
    ],
    correta:0,
    explicacao:"Chatbots utilizam IA para compreender solicitações e gerar respostas relevantes."
},

{
    id:"ia-07",
    tags:["IA"],
    pergunta:"Deep Learning é baseado principalmente em:",
    respostas:[
        "Redes neurais artificiais",
        "Planilhas eletrônicas",
        "Arquivos ZIP",
        "Servidores FTP",
        "Linguagem HTML"
    ],
    correta:0,
    explicacao:"Deep Learning utiliza redes neurais profundas para aprender padrões complexos."
},

{
    id:"ia-08",
    tags:["IA"],
    pergunta:"Qual é um dos principais desafios éticos da IA?",
    respostas:[
        "Viés nos dados utilizados para treinamento",
        "Peso do computador",
        "Cor do monitor",
        "Velocidade do mouse",
        "Tamanho do teclado"
    ],
    correta:0,
    explicacao:"Modelos podem reproduzir preconceitos presentes nos dados de treinamento."
},

{
    id:"ia-09",
    tags:["IA"],
    pergunta:"O que é um prompt?",
    respostas:[
        "A instrução enviada para uma IA",
        "Um vírus",
        "Uma placa de vídeo",
        "Uma memória RAM",
        "Um navegador"
    ],
    correta:0,
    explicacao:"Prompt é o texto ou comando utilizado para orientar a resposta da IA."
},

{
    id:"ia-10",
    tags:["IA"],
    pergunta:"O que significa dizer que uma IA 'alucinou'?",
    respostas:[
        "Gerou uma resposta incorreta apresentada como verdadeira",
        "Travou completamente",
        "Foi desligada",
        "Perdeu conexão com a internet",
        "Entrou em modo de economia de energia"
    ],
    correta:0,
    explicacao:"Alucinação ocorre quando o modelo inventa informações com aparente confiança."
},    
// ---------- WCAG ----------

{
    id:"wcag-01",
    tags:["WCAG"],
    pergunta:"O que significa a sigla WCAG?",
    respostas:[
        "Web Content Accessibility Guidelines",
        "Web Creative Application Guide",
        "World Computer Accessibility Group",
        "Website Code Adjustment Guide",
        "Web Control Access Grid"
    ],
    correta:0,
    explicacao:"WCAG significa Web Content Accessibility Guidelines, um conjunto de recomendações para tornar conteúdos digitais mais acessíveis."
},

{
    id:"wcag-02",
    tags:["WCAG"],
    pergunta:"Qual é o principal objetivo da WCAG?",
    respostas:[
        "Aumentar a velocidade dos sites",
        "Criar interfaces mais coloridas",
        "Tornar conteúdos digitais acessíveis para mais pessoas",
        "Substituir o HTML",
        "Criar aplicativos mobile"
    ],
    correta:2,
    explicacao:"A WCAG orienta como criar sites e sistemas acessíveis para pessoas com diferentes necessidades."
},

{
    id:"wcag-03",
    tags:["WCAG"],
    pergunta:"Quantos princípios fundamentais existem na WCAG?",
    respostas:[
        "2",
        "3",
        "4",
        "5",
        "10"
    ],
    correta:2,
    explicacao:"A WCAG é baseada em quatro princípios: Perceptível, Operável, Compreensível e Robusto."
},

{
    id:"wcag-04",
    tags:["WCAG"],
    pergunta:"Qual destes é um dos quatro princípios da WCAG?",
    respostas:[
        "Decorativo",
        "Perceptível",
        "Animado",
        "Colorido",
        "Automático"
    ],
    correta:1,
    explicacao:"Os quatro princípios da WCAG são: Perceptível, Operável, Compreensível e Robusto."
},

{
    id:"wcag-05",
    tags:["WCAG"],
    pergunta:"O texto alternativo (alt) em imagens serve principalmente para:",
    respostas:[
        "Aumentar o tamanho da imagem",
        "Melhorar o SEO apenas",
        "Descrever a imagem para pessoas que não conseguem visualizá-la",
        "Substituir o HTML",
        "Deixar o site mais colorido"
    ],
    correta:2,
    explicacao:"O texto alternativo permite que leitores de tela descrevam imagens para usuários com deficiência visual."
},

{
    id:"wcag-06",
    tags:["WCAG"],
    pergunta:"Qual recurso ajuda pessoas cegas a navegar em sites?",
    respostas:[
        "Leitor de tela",
        "Mais animações",
        "Vídeos maiores",
        "Mais banners",
        "Fundos coloridos"
    ],
    correta:0,
    explicacao:"Leitores de tela transformam informações visuais em áudio ou braile."
},

{
    id:"wcag-07",
    tags:["WCAG"],
    pergunta:"Um bom contraste entre texto e fundo ajuda principalmente na:",
    respostas:[
        "Velocidade do servidor",
        "Legibilidade do conteúdo",
        "Quantidade de páginas",
        "Programação do site",
        "Criação de imagens"
    ],
    correta:1,
    explicacao:"Contraste adequado facilita a leitura, especialmente para pessoas com baixa visão."
},

{

    id:"wcag-08",
    tags:["WCAG"],
    pergunta:"Navegar por um site usando apenas o teclado é importante para:",
    respostas:[
        "Aumentar o número de imagens",
        "Pessoas que não usam mouse",
        "Criar animações",
        "Reduzir o código",
        "Melhorar o design visual"
    ],
    correta:1,
    explicacao:"Algumas pessoas utilizam apenas teclado ou tecnologias assistivas para navegar."
},

{
    id:"wcag-09",
    tags:["WCAG"],
    pergunta:"Qual nível de conformidade da WCAG é considerado o mais alto?",
    respostas:[
        "A",
        "AA",
        "AAA",
        "AAAA",
        "X"
    ],
    correta:2,
    explicacao:"A WCAG possui níveis A, AA e AAA, sendo AAA o nível mais alto de conformidade."
},

{
    id:"wcag-10",
    tags:["WCAG"],
    pergunta:"Um formulário acessível deve possuir:",
    respostas:[
        "Apenas cores bonitas",
        "Campos sem identificação",
        "Rótulos claros para os campos",
        "Muitas animações",
        "Texto escondido"
    ],
    correta:2,
    explicacao:"Rótulos claros ajudam usuários a entender o objetivo de cada campo, inclusive usando leitores de tela."
},
    // ---------- Interfaces UI ----------
    
    {
    id:"ui-01",
    tags:["Interfaces UI"],
    pergunta:"O que significa a sigla UI?",
    respostas:[
        "User Interface",
        "Universal Interaction",
        "User Internet",
        "Interface Utility",
        "User Intelligence"
    ],
    correta:0,
    explicacao:"UI significa User Interface, ou Interface do Usuário."
},

{
    id:"ui-02",
    tags:["Interfaces UI"],
    pergunta:"Qual é o principal objetivo de uma boa interface?",
    respostas:[
        "Ter muitas animações",
        "Ser bonita apenas",
        "Facilitar a interação do usuário",
        "Usar várias cores",
        "Impressionar o cliente"
    ],
    correta:2,
    explicacao:"Uma boa interface facilita a realização das tarefas do usuário."
},

{
    id:"ui-03",
    tags:["Interfaces UI"],
    pergunta:"Qual destes elementos é usado para iniciar uma ação na interface?",
    respostas:[
        "Título",
        "Botão",
        "Rodapé",
        "Imagem",
        "Logo"
    ],
    correta:1,
    explicacao:"Botões são elementos de ação em interfaces."
},

{
    id:"ui-04",
    tags:["Interfaces UI"],
    pergunta:"Qual princípio melhora a organização visual de uma tela?",
    respostas:[
        "Hierarquia visual",
        "Mais efeitos",
        "Mais fontes",
        "Mais cores",
        "Mais sombras"
    ],
    correta:0,
    explicacao:"A hierarquia visual ajuda o usuário a identificar rapidamente o que é mais importante."
},

{
    id:"ui-05",
    tags:["Interfaces UI"],
    pergunta:"O alinhamento dos elementos em uma interface serve para:",
    respostas:[
        "Deixar tudo colorido",
        "Organizar e facilitar a leitura",
        "Aumentar o tamanho da tela",
        "Melhorar a internet",
        "Diminuir o código"
    ],
    correta:1,
    explicacao:"Elementos bem alinhados tornam a interface mais organizada e fácil de entender."
},

{
    id:"ui-06",
    tags:["Interfaces UI"],
    pergunta:"O contraste é importante porque:",
    respostas:[
        "Economiza memória",
        "Ajuda a destacar informações importantes",
        "Diminui o código",
        "Aumenta a velocidade da internet",
        "Substitui a tipografia"
    ],
    correta:1,
    explicacao:"O contraste melhora a legibilidade e chama atenção para os elementos importantes."
},

{
    id:"ui-07",
    tags:["Interfaces UI"],
    pergunta:"Qual ferramenta é uma das mais utilizadas para criar interfaces?",
    respostas:[
        "Excel",
        "Figma",
        "Word",
        "PowerPoint",
        "Bloco de Notas"
    ],
    correta:1,
    explicacao:"O Figma é uma das ferramentas mais populares para design de interfaces."
},

{
    id:"ui-08",
    tags:["Interfaces UI"],
    pergunta:"Em interfaces, consistência significa:",
    respostas:[
        "Mudar o estilo em cada tela",
        "Usar padrões semelhantes em todo o sistema",
        "Ter muitas fontes diferentes",
        "Usar apenas preto e branco",
        "Evitar ícones"
    ],
    correta:1,
    explicacao:"A consistência facilita o aprendizado e reduz erros do usuário."
},

{
    id:"ui-09",
    tags:["Interfaces UI"],
    pergunta:"Qual destes itens melhora a legibilidade de textos?",
    respostas:[
        "Espaçamento adequado",
        "Misturar várias fontes",
        "Texto centralizado sempre",
        "Usar letras muito pequenas",
        "Usar apenas caixa alta"
    ],
    correta:0,
    explicacao:"Espaçamento e boa tipografia tornam a leitura mais confortável."
},

{
    id:"ui-10",
    tags:["Interfaces UI"],
    pergunta:"Uma interface bem projetada deve ser principalmente:",
    respostas:[
        "Complexa",
        "Chamativa",
        "Intuitiva",
        "Colorida",
        "Cheia de animações"
    ],
    correta:2,
    explicacao:"Uma boa UI deve ser intuitiva para que o usuário consiga utilizá-la com facilidade."
},

    // ---------- UI/UX ----------
    {
        id:"ux-01",
        tags:["UX"],
        pergunta:"Qual princípio de Jakob Nielsen indica que o sistema deve sempre informar o usuário sobre o que está acontecendo?",
        respostas:[
            "Prevenção de erros",
            "Visibilidade do status do sistema",
            "Flexibilidade",
            "Controle de cores",
            "Consistência visual"
        ],
        correta:1,
        explicacao:"O usuário precisa receber feedback sobre ações e estados do sistema."
    },

    {
        id:"ux-02",
        tags:["UX"],
        pergunta:"Qual ferramenta é muito usada para criar protótipos de interfaces?",
        respostas:[
            "Photoshop",
            "Excel",
            "Figma",
            "Word",
            "Premiere"
        ],
        correta:2,
        explicacao:"O Figma é uma das ferramentas mais usadas para prototipação de interfaces."
    },

    {
        id:"ux-03",
        tags:["UX"],
        pergunta:"O que significa UX?",
        respostas:[
            "User Experience",
            "Universal XML",
            "User Extension",
            "User Execution",
            "Visual Experience"
        ],
        correta:0,
        explicacao:"UX significa Experiência do Usuário."
    },

    {
        id:"ux-04",
        tags:["UX"],
        pergunta:"Um wireframe representa principalmente:",
        respostas:[
            "O código final do sistema",
            "A estrutura e organização da interface",
            "As campanhas de marketing",
            "O banco de dados",
            "O servidor"
        ],
        correta:1,
        explicacao:"Wireframes mostram estrutura antes do design final."
    },

    {
        id:"ux-05",
        tags:["UX"],
        pergunta:"Qual é o objetivo principal de um teste de usabilidade?",
        respostas:[
            "Encontrar usuários famosos",
            "Validar se pessoas conseguem usar o produto",
            "Escolher cores",
            "Criar campanhas",
            "Programar funcionalidades"
        ],
        correta:1,
        explicacao:"Testes de usabilidade revelam problemas reais de uso."
    },

    {
        id:"ux-06",
        tags:["UX"],
        pergunta:"UI significa:",
        respostas:[
            "User Interface",
            "Universal Internet",
            "User Information",
            "Unique Interaction",
            "User Intelligence"
        ],
        correta:0,
        explicacao:"UI significa Interface do Usuário."
    },

    {
        id:"ux-07",
        tags:["UX"],
        pergunta:"Um botão deve parecer clicável principalmente através de:",
        respostas:[
            "Hierarquia visual e padrões conhecidos",
            "Texto gigante sempre",
            "Muitas cores",
            "Animações exageradas",
            "Som obrigatório"
        ],
        correta:0,
        explicacao:"Usuários reconhecem padrões visuais."
    },

    {
        id:"ux-08",
        tags:["UX"],
        pergunta:"Persona em UX é:",
        respostas:[
            "Um personagem fictício baseado em usuários reais",
            "Um programador",
            "Uma tela do sistema",
            "Uma ferramenta de código",
            "Um banco de dados"
        ],
        correta:0,
        explicacao:"Personas representam perfis de usuários."
    },

    {
        id:"ux-09",
        tags:["UX"],
        pergunta:"Design responsivo significa:",
        respostas:[
            "Um site que funciona apenas no computador",
            "Um site que se adapta a diferentes telas",
            "Um site sem imagens",
            "Um aplicativo pago",
            "Um site com animações"
        ],
        correta:1,
        explicacao:"Responsividade adapta layouts para vários dispositivos."
    },

    {
        id:"ux-10",
        tags:["UX"],
        pergunta:"A melhor interface geralmente é aquela que:",
        respostas:[
            "Tem muitos recursos",
            "É difícil de aprender",
            "Resolve o problema do usuário com simplicidade",
            "Tem muitos efeitos",
            "Usa muitas cores"
        ],
        correta:2,
        explicacao:"Bom UX reduz esforço e facilita objetivos."
    },

    // ---------- The Office ----------
    {
        id:"office-01",
        tags:["The Office"],
        pergunta:"Qual é o nome da empresa onde se passa The Office?",
        respostas:[
            "Dunder Mifflin",
            "Scranton Paper",
            "Michael Scott Paper",
            "Office World",
            "Pennsylvania Company"
        ],
        correta:0,
        explicacao:"A série acompanha a filial Scranton da Dunder Mifflin."
    },

    {
        id:"office-02",
        tags:["The Office"],
        pergunta:"Quem é o gerente da filial de Scranton durante grande parte da série?",
        respostas:[
            "Jim Halpert",
            "Dwight Schrute",
            "Michael Scott",
            "Stanley Hudson",
            "Toby Flenderson"
        ],
        correta:2,
        explicacao:"Michael Scott é o chefe carismático e caótico da filial."
    },

    {
        id:"office-03",
        tags:["The Office"],
        pergunta:"Qual personagem é conhecido por ser extremamente competitivo e obcecado por regras?",
        respostas:[
            "Kevin",
            "Dwight",
            "Creed",
            "Andy",
            "Oscar"
        ],
        correta:1,
        explicacao:"Dwight é conhecido por sua obsessão por autoridade e regras."
    },

    {
        id:"office-04",
        tags:["The Office"],
        pergunta:"Qual casal é um dos principais romances da série?",
        respostas:[
            "Michael e Jan",
            "Jim e Pam",
            "Dwight e Angela",
            "Ryan e Kelly",
            "Stanley e Phyllis"
        ],
        correta:1,
        explicacao:"Jim e Pam são o casal mais famoso da série."
    },

    {
        id:"office-05",
        tags:["The Office"],
        pergunta:"Qual é o nome do documentário fictício dentro da série?",
        respostas:[
            "The Office Files",
            "People Working",
            "Dunder Stories",
            "The Office",
            "Scranton Life"
        ],
        correta:3,
        explicacao:"A série é apresentada como um documentário sobre o escritório."
    },

    {
        id:"office-06",
        tags:["The Office"],
        pergunta:"Qual frase é uma das marcas de Michael Scott?",
        respostas:[
            "Winter is coming",
            "That's what she said",
            "I am the danger",
            "How you doin?",
            "Bazinga"
        ],
        correta:1,
        explicacao:"That's what she said virou a piada clássica de Michael."
    },

    {
        id:"office-07",
        tags:["The Office"],
        pergunta:"Qual personagem trabalha no RH e é frequentemente ignorado por Michael?",
        respostas:[
            "Toby",
            "Creed",
            "Meredith",
            "Kevin",
            "Stanley"
        ],
        correta:0,
        explicacao:"Michael demonstra grande antipatia pelo Toby."
    },

    {
        id:"office-08",
        tags:["The Office"],
        pergunta:"Dwight trabalha principalmente como:",
        respostas:[
            "Contador",
            "Vendedor",
            "Gerente regional assistente",
            "Fotógrafo",
            "Diretor"
        ],
        correta:2,
        explicacao:"Dwight é Assistant Regional Manager (segundo ele)."
    },

    {
        id:"office-09",
        tags:["The Office"],
        pergunta:"Qual personagem é famoso por seu humor extremamente seco?",
        respostas:[
            "Jim",
            "Kevin",
            "Creed",
            "Stanley",
            "Oscar"
        ],
        correta:0,
        explicacao:"Jim usa muito sarcasmo e quebra a quarta parede."
    },

    {
        id:"office-10",
        tags:["The Office"],
        pergunta:"Onde fica a filial principal retratada na série?",
        respostas:[
            "Nova York",
            "Scranton, Pensilvânia",
            "Chicago",
            "Los Angeles",
            "Boston"
        ],
        correta:1,
        explicacao:"A série se passa na filial de Scranton."
    },

    // ---------- Tecnologia ----------
    {
        id:"tec-01",
        tags:["Tecnologia"],
        pergunta:"O que significa a sigla HTML?",
        respostas:[
            "HyperText Markup Language",
            "High Technology Machine Language",
            "Hyper Transfer Main Link",
            "Home Tool Management Language",
            "Hyperlink Text Mode Language"
        ],
        correta:0,
        explicacao:"HTML é a linguagem usada para estruturar páginas web."
    },

    {
        id:"tec-02",
        tags:["Tecnologia"],
        pergunta:"Qual linguagem é usada principalmente para criar interações em páginas web?",
        respostas:[
            "HTML",
            "CSS",
            "JavaScript",
            "SQL",
            "Python"
        ],
        correta:2,
        explicacao:"JavaScript adiciona comportamentos e interações."
    },

    {
        id:"tec-03",
        tags:["Tecnologia"],
        pergunta:"O que significa CSS?",
        respostas:[
            "Computer Style System",
            "Cascading Style Sheets",
            "Creative Software System",
            "Code Style Source",
            "Central Style Service"
        ],
        correta:1,
        explicacao:"CSS controla a aparência e o layout das páginas."
    },

    {
        id:"tec-04",
        tags:["Tecnologia"],
        pergunta:"Qual empresa criou o sistema operacional Android?",
        respostas:[
            "Microsoft",
            "Apple",
            "Google",
            "Samsung",
            "Intel"
        ],
        correta:2,
        explicacao:"O Android foi desenvolvido pela Google e pela Open Handset Alliance."
    },

    {
        id:"tec-05",
        tags:["Tecnologia"],
        pergunta:"O que significa IA?",
        respostas:[
            "Internet Avançada",
            "Inteligência Artificial",
            "Interface Automática",
            "Informação Aplicada",
            "Integração Analítica"
        ],
        correta:1,
        explicacao:"IA significa Inteligência Artificial."
    },

    {
        id:"tec-06",
        tags:["Tecnologia"],
        pergunta:"Qual destes é um banco de dados?",
        respostas:[
            "Photoshop",
            "MySQL",
            "Figma",
            "Chrome",
            "Windows"
        ],
        correta:1,
        explicacao:"MySQL é um sistema de gerenciamento de banco de dados."
    },

    {
        id:"tec-07",
        tags:["Tecnologia"],
        pergunta:"O que significa URL?",
        respostas:[
            "Universal Resource Locator",
            "User Random Link",
            "Unified Remote Login",
            "Universal Robot Language",
            "User Route Line"
        ],
        correta:0,
        explicacao:"URL é o endereço usado para localizar recursos na internet."
    },

    {
        id:"tec-08",
        tags:["Tecnologia"],
        pergunta:"Qual empresa desenvolve o Windows?",
        respostas:[
            "Google",
            "Apple",
            "Microsoft",
            "Adobe",
            "Amazon"
        ],
        correta:2,
        explicacao:"O Windows é desenvolvido pela Microsoft."
    },

    {
        id:"tec-09",
        tags:["Tecnologia"],
        pergunta:"O que é um navegador de internet?",
        respostas:[
            "Um programa para acessar sites",
            "Um antivírus",
            "Um banco de dados",
            "Um editor de imagens",
            "Uma linguagem de programação"
        ],
        correta:0,
        explicacao:"Navegadores permitem acessar páginas da web."
    },

    {
        id:"tec-10",
        tags:["Tecnologia"],
        pergunta:"Qual destes é um serviço de armazenamento em nuvem?",
        respostas:[
            "Google Drive",
            "Paint",
            "Bloco de Notas",
            "Calculadora",
            "BIOS"
        ],
        correta:0,
        explicacao:"Google Drive permite armazenar arquivos na nuvem."
    },

    // ---------- Memes ----------
    {
        id:"meme-01",
        tags:["Memes"],
        pergunta:"No universo dos memes, o termo 'LOL' significa:",
        respostas:[
            "Lots Of Laughs",
            "League Of Legends",
            "Look Online Later",
            "Level Of Logic",
            "Link Over Load"
        ],
        correta:0,
        explicacao:"LOL é uma abreviação usada para indicar risada."
    },

    {
        id:"meme-02",
        tags:["Memes"],
        pergunta:"O meme 'This is fine' normalmente representa:",
        respostas:[
            "Uma situação perfeita",
            "Alguém tranquilo enquanto tudo está dando errado",
            "Uma comemoração",
            "Um cachorro famoso",
            "Uma mensagem motivacional"
        ],
        correta:1,
        explicacao:"O meme mostra alguém fingindo normalidade no caos."
    },

    {
        id:"meme-03",
        tags:["Memes"],
        pergunta:"O que significa 'cringe' na internet?",
        respostas:[
            "Algo muito engraçado",
            "Algo considerado vergonhoso ou constrangedor",
            "Uma tecnologia nova",
            "Uma tendência de moda",
            "Um jogo online"
        ],
        correta:1,
        explicacao:"Cringe descreve algo que causa vergonha alheia."
    },

    {
        id:"meme-04",
        tags:["Memes"],
        pergunta:"O termo 'viralizar' na internet significa:",
        respostas:[
            "Apagar uma postagem",
            "Um conteúdo se espalhar rapidamente",
            "Instalar um antivírus",
            "Criar um aplicativo",
            "Ficar offline"
        ],
        correta:1,
        explicacao:"Um conteúdo viral se espalha rapidamente entre usuários."
    },

    {
        id:"meme-05",
        tags:["Memes"],
        pergunta:"O meme 'Doge' ficou famoso por apresentar:",
        respostas:[
            "Um gato astronauta",
            "Um cachorro Shiba Inu com frases engraçadas",
            "Um robô inteligente",
            "Um personagem de jogo",
            "Um político famoso"
        ],
        correta:1,
        explicacao:"Doge usa a imagem de um cachorro Shiba Inu."
    },

    {
        id:"meme-06",
        tags:["Memes"],
        pergunta:"Quando alguém responde 'é sobre isso', normalmente quer dizer:",
        respostas:[
            "Discordo totalmente",
            "Concordo ou me identifico com a situação",
            "Não entendi nada",
            "Vou sair da conversa",
            "É uma informação falsa"
        ],
        correta:1,
        explicacao:"A expressão indica identificação ou aprovação."
    },

    {
        id:"meme-07",
        tags:["Memes"],
        pergunta:"O termo 'bug' nos memes geralmente é usado para:",
        respostas:[
            "Uma comida estranha",
            "Um erro inesperado",
            "Uma atualização",
            "Um personagem",
            "Um filme"
        ],
        correta:1,
        explicacao:"Bug significa falha ou comportamento inesperado."
    },

    {
        id:"meme-08",
        tags:["Memes"],
        pergunta:"A expressão 'expectativa x realidade' geralmente mostra:",
        respostas:[
            "Uma comparação entre o que era esperado e o que aconteceu",
            "Uma aula de matemática",
            "Uma notícia falsa",
            "Uma propaganda",
            "Uma previsão do tempo"
        ],
        correta:0,
        explicacao:"O meme compara idealização e resultado real."
    },

    {
        id:"meme-09",
        tags:["Memes"],
        pergunta:"O meme 'Stonks' brinca principalmente com:",
        respostas:[
            "Decisões financeiras absurdas apresentadas como sucesso",
            "Programação",
            "Culinária",
            "Esportes",
            "Viagens"
        ],
        correta:0,
        explicacao:"Stonks ironiza decisões ruins tratadas como grandes negócios."
    },

    {
        id:"meme-10",
        tags:["Memes"],
        pergunta:"Na internet, 'relatable' significa:",
        respostas:[
            "Algo difícil de entender",
            "Algo com que muitas pessoas se identificam",
            "Algo proibido",
            "Algo antigo",
            "Algo sem graça"
        ],
        correta:1,
        explicacao:"Relatable é algo que representa uma experiência comum."
    },

    // ---------- Séries / Breaking Bad ----------
    {
        id:"bb-01",
        tags:["Breaking Bad"],
        pergunta:"Qual é o nome do protagonista de Breaking Bad?",
        respostas:[
            "Jesse Pinkman",
            "Walter White",
            "Saul Goodman",
            "Hank Schrader",
            "Gus Fring"
        ],
        correta:1,
        explicacao:"Walter White é o professor de química que começa a produzir metanfetamina."
    },

    {
        id:"bb-02",
        tags:["Breaking Bad"],
        pergunta:"Qual era a profissão de Walter White antes do crime?",
        respostas:[
            "Advogado",
            "Policial",
            "Professor de química",
            "Médico",
            "Engenheiro"
        ],
        correta:2,
        explicacao:"Walter era professor de química em uma escola."
    },

    {
        id:"bb-03",
        tags:["Breaking Bad"],
        pergunta:"Qual é o apelido de Walter White no mundo das drogas?",
        respostas:[
            "Heisenberg",
            "El Patrón",
            "Mr. Blue",
            "Capitão Cook",
            "The King"
        ],
        correta:0,
        explicacao:"Heisenberg é o nome usado por Walter no submundo."
    },

    {
        id:"bb-04",
        tags:["Breaking Bad"],
        pergunta:"Quem é o parceiro de Walter White na produção de drogas?",
        respostas:[
            "Saul Goodman",
            "Jesse Pinkman",
            "Hank Schrader",
            "Mike Ehrmantraut",
            "Tuco Salamanca"
        ],
        correta:1,
        explicacao:"Jesse Pinkman é o antigo aluno que vira parceiro de Walter."
    },

    {
        id:"bb-05",
        tags:["Breaking Bad"],
        pergunta:"Qual é a profissão de Saul Goodman?",
        respostas:[
            "Químico",
            "Policial",
            "Advogado",
            "Empresário",
            "Jornalista"
        ],
        correta:2,
        explicacao:"Saul é o advogado especialista em resolver problemas ilegais."
    },

    {
        id:"bb-06",
        tags:["Breaking Bad"],
        pergunta:"Qual objeto ficou famoso como símbolo de Breaking Bad?",
        respostas:[
            "Um chapéu preto",
            "Uma máscara de gás",
            "Uma guitarra",
            "Um carro vermelho",
            "Uma faca"
        ],
        correta:1,
        explicacao:"A máscara de gás aparece na famosa imagem promocional da série."
    },

    {
        id:"bb-07",
        tags:["Breaking Bad"],
        pergunta:"Quem é Hank Schrader na série?",
        respostas:[
            "Um traficante",
            "Um professor",
            "Um agente da DEA",
            "Um advogado",
            "Um cientista"
        ],
        correta:2,
        explicacao:"Hank trabalha combatendo o tráfico de drogas pela DEA."
    },

    {
        id:"bb-08",
        tags:["Breaking Bad"],
        pergunta:"Qual é a famosa frase de Walter White?",
        respostas:[
            "I am the danger",
            "Winter is coming",
            "Why so serious?",
            "Hasta la vista",
            "You talking to me?"
        ],
        correta:0,
        explicacao:"A frase representa a transformação de Walter em Heisenberg."
    },

    {
        id:"bb-09",
        tags:["Breaking Bad"],
        pergunta:"Em qual estado americano se passa principalmente Breaking Bad?",
        respostas:[
            "Texas",
            "Califórnia",
            "Novo México",
            "Flórida",
            "Nevada"
        ],
        correta:2,
        explicacao:"A história acontece principalmente em Albuquerque, Novo México."
    },

    {
        id:"bb-10",
        tags:["Breaking Bad"],
        pergunta:"Qual é o principal produto fabricado por Walter e Jesse?",
        respostas:[
            "Cocaína",
            "Heroína",
            "Metanfetamina",
            "Remédios",
            "Álcool"
        ],
        correta:2,
        explicacao:"A dupla produz metanfetamina de alta pureza."
    },

    // ---------- Games ----------
    {
        id:"games-01",
        tags:["Games"],
        pergunta:"Qual personagem é o mascote oficial da Nintendo?",
        respostas:[
            "Sonic",
            "Mario",
            "Link",
            "Kirby",
            "Donkey Kong"
        ],
        correta:1,
        explicacao:"Mario é o personagem mais famoso da Nintendo e seu principal símbolo."
    },

    {
        id:"games-02",
        tags:["Games"],
        pergunta:"Em qual jogo aparece o personagem Link?",
        respostas:[
            "Final Fantasy",
            "Minecraft",
            "The Legend of Zelda",
            "Pokémon",
            "Metroid"
        ],
        correta:2,
        explicacao:"Link é o protagonista da famosa franquia The Legend of Zelda."
    },

    {
        id:"games-03",
        tags:["Games"],
        pergunta:"Qual empresa criou o PlayStation?",
        respostas:[
            "Microsoft",
            "Nintendo",
            "Sony",
            "Sega",
            "Atari"
        ],
        correta:2,
        explicacao:"O PlayStation foi criado pela Sony e lançado em 1994."
    },

    {
        id:"games-04",
        tags:["Games"],
        pergunta:"Qual jogo ficou famoso por permitir construir usando blocos?",
        respostas:[
            "Fortnite",
            "Minecraft",
            "Terraria",
            "Roblox",
            "The Sims"
        ],
        correta:1,
        explicacao:"Minecraft permite explorar e construir mundos usando blocos."
    },

    {
        id:"games-05",
        tags:["Games"],
        pergunta:"Qual personagem é conhecido por capturar criaturas chamadas Pokémon?",
        respostas:[
            "Mario",
            "Ash Ketchum",
            "Kratos",
            "Master Chief",
            "Geralt"
        ],
        correta:1,
        explicacao:"Ash Ketchum é um dos personagens mais conhecidos do universo Pokémon."
    },

    {
        id:"games-06",
        tags:["Games"],
        pergunta:"Qual jogo apresenta o personagem Kratos?",
        respostas:[
            "God of War",
            "Halo",
            "Doom",
            "Resident Evil",
            "Dark Souls"
        ],
        correta:0,
        explicacao:"Kratos é o protagonista da série God of War."
    },

    {
        id:"games-07",
        tags:["Games"],
        pergunta:"Qual empresa criou o Xbox?",
        respostas:[
            "Sony",
            "Nintendo",
            "Microsoft",
            "Sega",
            "Valve"
        ],
        correta:2,
        explicacao:"O Xbox foi lançado pela Microsoft em 2001."
    },

    {
        id:"games-08",
        tags:["Games"],
        pergunta:"Em qual jogo o jogador enfrenta zumbis e administra recursos para sobreviver?",
        respostas:[
            "The Last of Us",
            "FIFA",
            "Mario Kart",
            "Forza Horizon",
            "Animal Crossing"
        ],
        correta:0,
        explicacao:"The Last of Us mistura sobrevivência, ação e uma história pós-apocalíptica."
    },

    {
        id:"games-09",
        tags:["Games"],
        pergunta:"Qual personagem da Sega é conhecido por sua grande velocidade?",
        respostas:[
            "Crash Bandicoot",
            "Sonic",
            "Mega Man",
            "Pac-Man",
            "Ryu"
        ],
        correta:1,
        explicacao:"Sonic ficou famoso por sua velocidade e é o mascote da Sega."
    },

    {
        id:"games-10",
        tags:["Games"],
        pergunta:"Qual jogo popularizou o gênero battle royale com construção?",
        respostas:[
            "Counter-Strike",
            "Fortnite",
            "Street Fighter",
            "League of Legends",
            "World of Warcraft"
        ],
        correta:1,
        explicacao:"Fortnite popularizou o battle royale combinado com construção."
    },
];

// Pontos ganhos por resposta certa (usado no cálculo da pontuação final)
const PONTOS_POR_ACERTO = 10;

// Slug de cada categoria -> usado no nome do arquivo (quiz-<slug>.html)
const CATEGORIA_SLUGS = {
    "IA": "ia",
    "WCAG": "wcag",
    "UX": "ux",
    "Interfaces UI": "interfaceui",
    "The Office": "office",
    "Tecnologia": "tecnologia",
    "Memes": "memes",
    "Breaking Bad": "breaking-bad",
    "Games": "games"
};

// Lê todas as tags usadas em QUESTOES (usado por quiz.html para
// montar a lista de categorias automaticamente)
function obterCategorias() {
    const tags = new Set();
    QUESTOES.forEach(questao => {
        questao.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort((a, b) => a.localeCompare(b, "pt-BR"));
}
