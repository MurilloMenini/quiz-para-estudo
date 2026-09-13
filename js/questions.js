// Banco de Questões de Histologia Veterinária/Zootecnia (1º Semestre)
// Total de 50 Questões divididas em 5 tópicos (10 por tópico)

const QUESTIONS_DATABASE = [
  // ==========================================
  // ASSUNTO 1: TECIDO EPITELIAL DE REVESTIMENTO (10 questões)
  // ==========================================
  {
    id: 1,
    assunto: "Tecido epitelial de revestimento",
    dificuldade: "facil",
    pergunta: "Qual das seguintes alternativas apresenta uma característica FUNDAMENTAL do tecido epitelial de revestimento?",
    alternativas: [
      "Abundante matriz extracelular mineralizada entre as células.",
      "Células fortemente justapostas com reduzida quantidade de matriz extracelular.",
      "Presença de intensa vascularização sanguínea própria entre as células.",
      "Predomínio de fibras colágenas espessas e poucas células."
    ],
    respostaCorreta: 1,
    explicacao: "O tecido epitelial é caracterizado por ter células muito próximas umas das outras (justapostas) unidas por junções intercelulares, com pouquíssima matriz extracelular entre elas.",
    dica: "Epitélio = Células justapostas + pouca matriz extracelular + avascular."
  },
  {
    id: 2,
    assunto: "Tecido epitelial de revestimento",
    dificuldade: "facil",
    pergunta: "Como o tecido epitelial de revestimento obtém seus nutrientes e oxigênio, considerando que ele é avascular?",
    alternativas: [
      "Por difusão a partir dos vasos sanguíneos do tecido conjuntivo adjacente, através da membrana basal.",
      "Através de canais calcificados que conectam diretamente com o tecido ósseo.",
      "Por absorção direta e exclusiva de luz solar e ar atmosférico.",
      "Sintetizando seus próprios nutrientes internamente a partir de lipídios acumulados."
    ],
    respostaCorreta: 0,
    explicacao: "Como não possui vasos sanguíneos (é avascular), o tecido epitelial é nutrido pela difusão de substâncias que saem dos capilares do tecido conjuntivo vizinho e atravessam a membrana basal.",
    dica: "Nutrição epitelial = Difusão via tecido conjuntivo adjacente."
  },
  {
    id: 3,
    assunto: "Tecido epitelial de revestimento",
    dificuldade: "medio",
    pergunta: "O epitélio de revestimento da bexiga urinária dos animais domésticos precisa se adaptar a grandes variações de volume. Qual é essa classificação de epitélio?",
    alternativas: [
      "Epitélio pavimentoso simples.",
      "Epitélio pseudoestratificado prismático.",
      "Epitélio de transição (ou urofiélio).",
      "Epitélio cúbico estratificado."
    ],
    respostaCorreta: 2,
    explicacao: "O epitélio de transição é um tipo especial de epitélio estratificado cujas células superficiais mudam de formato (de arredondadas/globosas para achatadas) conforme a bexiga se enche ou esvazia.",
    dica: "Bexiga urinária = Epitélio de transição (muda de forma conforme o estiramento)."
  },
  {
    id: 4,
    assunto: "Tecido epitelial de revestimento",
    dificuldade: "medio",
    pergunta: "Nas vias respiratórias (como a traqueia dos mamíferos), encontramos um epitélio que parece ter várias camadas devido à posição variada dos núcleos, mas todas as células tocam a membrana basal. Trata-se do:",
    alternativas: [
      "Epitélio pavimentoso estratificado queratinizado.",
      "Epitélio pseudoestratificado prismático ciliado.",
      "Epitélio cúbico simples.",
      "Epitélio de transição."
    ],
    respostaCorreta: 1,
    explicacao: "O epitélio pseudoestratificado é simples (todas as células repousam na membrana basal), porém os núcleos em diferentes alturas dão a falsa impressão de estratificação. Na traqueia, é acompanhado de cílios e células caliciformes.",
    dica: "Traqueia = Pseudoestratificado prismático ciliado (falsa estratificação)."
  },
  {
    id: 5,
    assunto: "Tecido epitelial de revestimento",
    dificuldade: "medio",
    pergunta: "Qual das funções abaixo NÃO é uma função típica realizada pelos tecidos epiteliais de revestimento?",
    alternativas: [
      "Proteção mecânica e contra atrito nas superfícies corporais.",
      "Absorção de nutrientes no trato gastrointestinal.",
      "Produção de força contrátil para movimentação esquelética.",
      "Percepção sensorial por meio de terminações nervosas associadas."
    ],
    respostaCorreta: 2,
    explicacao: "A produção de força contrátil para movimentação é função do TECIDO MUSCULAR. O tecido epitelial atua em proteção, absorção, secreção, transporte e sensibilidade.",
    dica: "Contração muscular é do tecido muscular, não do epitelial."
  },
  {
    id: 6,
    assunto: "Tecido epitelial de revestimento",
    dificuldade: "medio",
    pergunta: "Em relação à polaridade celular do tecido epitelial, a superfície voltada para o lúmen (cavidade de um órgão) é chamada de domínio:",
    alternativas: [
      "Basal.",
      "Lateral.",
      "Apical.",
      "Mesenquimal."
    ],
    respostaCorreta: 2,
    explicacao: "As células epiteliais possuem polaridade: o domínio apical está voltado para a superfície livre ou lúmen do órgão; o domínio lateral entra em contato com células vizinhas; e o domínio basal fixa-se à membrana basal.",
    dica: "Superfície livre/lúmen = Domínio Apical."
  },
  {
    id: 7,
    assunto: "Tecido epitelial de revestimento",
    dificuldade: "dificil",
    pergunta: "A pele de um bovino necessita de elevada proteção contra o atrito mecânico e contra a dessecação. Que tipo de epitélio reveste a epiderme desse animal?",
    alternativas: [
      "Epitélio prismático simples com microvilosidades.",
      "Epitélio pavimentoso estratificado queratinizado.",
      "Epitélio cúbico simples não queratinizado.",
      "Epitélio de transição queratinizado."
    ],
    respostaCorreta: 1,
    explicacao: "A epiderme é formada por epitélio pavimentoso estratificado queratinizado. As múltiplas camadas de células impermeabilizadas pela proteína queratina protegem contra agressões físicas, químicas e desidratação.",
    dica: "Pele/Epiderme = Pavimentoso estratificado queratinizado."
  },
  {
    id: 8,
    assunto: "Tecido epitelial de revestimento",
    dificuldade: "dificil",
    pergunta: "A estrutura acelular que separa o tecido epitelial do tecido conjuntivo subjacente, servindo como suporte e filtro seletivo, é denominada:",
    alternativas: [
      "Membrana basal.",
      "Lâmina própria.",
      "Glicocálice.",
      "Cápsula de Glisson."
    ],
    respostaCorreta: 0,
    explicacao: "A membrana basal é uma lâmina delgada acelular (composta por colágeno tipo IV, laminina e proteoglicanos) localizada entre o tecido epitelial e o conjuntivo.",
    dica: "Divisão e ancoragem entre epitélio e conjuntivo = Membrana basal."
  },
  {
    id: 9,
    assunto: "Tecido epitelial de revestimento",
    dificuldade: "medio",
    pergunta: "No intestino delgado dos animais, o epitélio de revestimento necessita de grande área de superfície para absorver nutrientes. Qual é a morfologia desse epitélio e sua especialização apical?",
    alternativas: [
      "Epitélio prismático simples com microvilosidades (borda em escova).",
      "Epitélio pavimentoso estratificado com estereocílios.",
      "Epitélio cúbico estratificado com cílios móveis.",
      "Epitélio de transição com flagship vesicular."
    ],
    respostaCorreta: 0,
    explicacao: "O intestino possui epitélio prismático (colunar) simples com microvilosidades na superfície apical, aumentando imensamente a superfície de absorção de nutrientes.",
    dica: "Intestino delgado = Prismático simples + microvilosidades."
  },
  {
    id: 10,
    assunto: "Tecido epitelial de revestimento",
    dificuldade: "facil",
    pergunta: "Assinale a alternativa INCORRETA sobre o epitélio pavimentoso simples:",
    alternativas: [
      "É formado por apenas uma camada de células achatadas.",
      "Facilita o transporte passivo e a difusão de gases e fluidos.",
      "É encontrado revestindo vasos sanguíneos (endotélio).",
      "Confere altíssima resistência mecânica contra atritos intensos."
    ],
    respostaCorreta: 3,
    explicacao: "O epitélio pavimentoso SIMPLES tem apenas uma camada de células delgadas, sendo ideal para difusão (ex: alvéolos, endotélio), e NÃO para resistência mecânica. Para resistência mecânica são necessários epitélios ESTRATIFICADOS.",
    dica: "Epitélio simples = pouca camada, não serve para atrito intenso."
  },

  // ==========================================
  // ASSUNTO 2: TECIDO EPITELIAL GLANDULAR (10 questões)
  // ==========================================
  {
    id: 11,
    assunto: "Tecido epitelial glandular",
    dificuldade: "facil",
    pergunta: "Em termos embriológicos e histológicos, como se originam as glândulas do organismo animal?",
    alternativas: [
      "A partir da diferenciação de adipócitos maduros.",
      "Por proliferação de células do tecido epitelial de revestimento que se invaginam no tecido conjuntivo.",
      "A partir do endurecimento e mineralização da matriz óssea.",
      "Pela fusão direta de fibras nervosas com vasos sanguíneos."
    ],
    respostaCorreta: 1,
    explicacao: "As glândulas originam-se durante o desenvolvimento embrionário a partir de células epiteliais de revestimento que se multiplicam e mergulham (invaginam) no tecido conjuntivo subjacente.",
    dica: "Origem glandular = Invaginação do epitélio de revestimento."
  },
  {
    id: 12,
    assunto: "Tecido epitelial glandular",
    dificuldade: "facil",
    pergunta: "Qual é a diferença estrutural principal entre uma glândula EXÓCRINA e uma glândula ENDÓCRINA?",
    alternativas: [
      "Glândulas exócrinas possuem ductos de secreção; glândulas endócrinas não têm ductos e lançam secreções no sangue.",
      "Glândulas exócrinas produzem apenas hormônios; glândulas endócrinas produzem apenas suores.",
      "Glândulas endócrinas mantêm contato direto com o exterior do corpo por ductos longos.",
      "Glândulas exócrinas são formadas por tecido conjuntivo e endócrinas por tecido nervoso."
    ],
    respostaCorreta: 0,
    explicacao: "As glândulas exócrinas mantêm conexão com a superfície epitelial através de ductos secretores. As endócrinas perdem esse ducto e lançam seus produtos (hormônios) diretamente na corrente sanguínea.",
    dica: "Exócrina = possui ducto. Endócrina = sem ducto, via sanguínea."
  },
  {
    id: 13,
    assunto: "Tecido epitelial glandular",
    dificuldade: "medio",
    pergunta: "As glândulas salivares dos animais liberam suas secreções por exocitose, sem que haja qualquer perda do citoplasma celular durante o processo. Esse modo de secreção é classificado como:",
    alternativas: [
      "Merócrino (ou écrino).",
      "Apócrino.",
      "Holócrino.",
      "Endócrino parácrino."
    ],
    respostaCorreta: 0,
    explicacao: "Na secreção merócrina, o produto de secreção é liberado por exocitose através de grânulos, mantendo a célula inteiramente intacta.",
    dica: "Merócrina = exocitose pura, Célula intacta."
  },
  {
    id: 14,
    assunto: "Tecido epitelial glandular",
    dificuldade: "medio",
    pergunta: "Durante a lactação em uma vaca, a glândula mamária libera leite, em que porções do citoplasma apical da célula secretora saem juntas com a secreção lipídica. Qual é esse modo de secreção?",
    alternativas: [
      "Holócrino.",
      "Apócrino.",
      "Merócrino.",
      "Autócrino."
    ],
    respostaCorreta: 1,
    explicacao: "Na secreção apócrina, o produto acumulado na porção apical da célula é eliminado juntamente com um pedaço do citoplasma apical (ex: secreção lipídica da glândula mamária).",
    dica: "Apócrina = Perda de parte do Ápice celular."
  },
  {
    id: 15,
    assunto: "Tecido epitelial glandular",
    dificuldade: "medio",
    pergunta: "As glândulas sebáceas associadas aos folículos pilosos dos cães acumulam lipídios até que toda a célula morra e se destaque para compor o sebo. Esse mecanismo chama-se:",
    alternativas: [
      "Merócrino.",
      "Apócrino.",
      "Holócrino.",
      "Endócrino."
    ],
    respostaCorreta: 2,
    explicacao: "Na secreção holócrina (Holo = todo), a célula inteira se destrói e se transforma no próprio produto de secreção (ex: glândulas sebáceas).",
    dica: "Holócrina = Destruição HOLística (total) da célula."
  },
  {
    id: 16,
    assunto: "Tecido epitelial glandular",
    dificuldade: "facil",
    pergunta: "Qual é o exemplo mais clássico e importante de glândula exócrina UNICELULAR encontrada no revestimento intestinal e respiratório dos mamíferos?",
    alternativas: [
      "Célula caliciforme (Goblet cell).",
      "Fibroblasto ativo.",
      "Macrófago alveolar.",
      "Mastócito mucoso."
    ],
    respostaCorreta: 0,
    explicacao: "A célula caliciforme é uma glândula exócrina unicelular isolada que secretará muco (mucina) para lubrificar e proteger os epitélios respiratório e digestório.",
    dica: "Glândula unicelular = Célula Caliciforme."
  },
  {
    id: 17,
    assunto: "Tecido epitelial glandular",
    dificuldade: "medio",
    pergunta: "Quando a porção secretora de uma glândula exócrina tem a forma de um saco arredondado ou esfera, ela é classificada histologicamente como:",
    alternativas: [
      "Tubular.",
      "Acinosa ou Alveolar.",
      "Fasciculada.",
      "Reticular."
    ],
    respostaCorreta: 1,
    explicacao: "As porções secretoras podem ser tubulares (formato de tubo) ou acinosas/alveolares (formato esférico/arredondado com pequeno lúmen).",
    dica: "Porção arredondada = Acinosa/Alveolar. Porção cilíndrica = Tubular."
  },
  {
    id: 18,
    assunto: "Tecido epitelial glandular",
    dificuldade: "dificil",
    pergunta: "Uma glândula exócrina cujo ducto excretor se ramifica repetidamente antes de atingir os adênomeros secretores é classificada morfologicamente como:",
    alternativas: [
      "Glândula simples.",
      "Glândula composta.",
      "Glândula holócrina.",
      "Glândula folicular."
    ],
    respostaCorreta: 1,
    explicacao: "Glândulas simples possuem um único ducto não ramificado. Glândulas compostas possuem ductos secretores ramificados (ex: pâncreas exócrino, glândula mamária).",
    dica: "Ducto ramificado = Glândula Composta."
  },
  {
    id: 19,
    assunto: "Tecido epitelial glandular",
    dificuldade: "dificil",
    pergunta: "O pâncreas dos animais desempenha funções tanto exócrinas (suco pancreático via ductos no duodeno) quanto endócrinas (insulina e glucagon na corrente sanguínea). Por essa razão, ele é classificado como uma glândula:",
    alternativas: [
      "Mista ou Anfícrina.",
      "Holócrina pura.",
      "Unicelular apócrina.",
      "Folicular simples."
    ],
    respostaCorreta: 0,
    explicacao: "Glândulas mistas ou anfícrinas apresentam porções exócrinas e endócrinas no mesmo órgão. O pâncreas e as gônadas (testículos e ovários) são exemplos clássicos.",
    dica: "Exócrina + Endócrina juntas = Glândula Mista ou Anfícrina."
  },
  {
    id: 20,
    assunto: "Tecido epitelial glandular",
    dificuldade: "medio",
    pergunta: "Em relação ao produto sintetizado, glândulas que secretam uma solução aquosa rica em enzimas são chamadas de ___, enquanto as que secretam fluídos viscosos e ricos em glicoproteínas são chamadas de ___:",
    alternativas: [
      "Mucosas / Serosas.",
      "Serosas / Mucosas.",
      "Sebáceas / Hormonais.",
      "Holócrinas / Merócrinas."
    ],
    respostaCorreta: 1,
    explicacao: "Glândulas serosas secretam líquidos fluidos e ricos em proteínas/enzimas (núcleos arredondados centrais). Glândulas mucosas secretam muco viscoso (núcleos achatados na base).",
    dica: "Serosa = aquosa/enzimática. Mucosa = viscosa/glicoproteica."
  },

  // ==========================================
  // ASSUNTO 3: CÉLULAS DO TECIDO CONJUNTIVO (10 questões)
  // ==========================================
  {
    id: 21,
    assunto: "Células do tecido conjuntivo",
    dificuldade: "facil",
    pergunta: "Qual é a célula mais abundante do tecido conjuntivo, responsável pela síntese de fibras (colágeno, elastina) e da substância fundamental da matriz extracelular?",
    alternativas: [
      "Fibroblasto.",
      "Mastócito.",
      "Macrófago.",
      "Plasmócito."
    ],
    respostaCorreta: 0,
    explicacao: "O fibroblasto é a célula chave do tecido conjuntivo. Ele sintetiza os componentes proteicos das fibras e os glicosaminoglicanos da substância fundamental.",
    dica: "Síntese principal da matriz e fibras = Fibroblasto."
  },
  {
    id: 22,
    assunto: "Células do tecido conjuntivo",
    dificuldade: "facil",
    pergunta: "Qual é a diferença funcional e morfológica entre um FIBROBLASTO e um FIBRÓCITO?",
    alternativas: [
      "Fibroblasto é a célula jovem e metabolicamente ativa; Fibrócito é a célula madura e quiescente.",
      "Fibroblasto produz anticorpos; Fibrócito realiza fagocitose de bactérias.",
      "Fibrócito é muito maior e possui grânulos de histamina; Fibroblasto é avascular.",
      "Não há diferença, são nomes idênticos para os macrófagos."
    ],
    respostaCorreta: 0,
    explicacao: "O fibroblasto é a forma jovem, com citoplasma abundante e núcleo proeminente, muito ativo na síntese. O fibrócito é menor, com núcleo denso, sendo a forma em repouso/quiescente.",
    dica: "Sufixo -blasto = ativo/sintetizante; Sufixo -cito = maduro/quiescente."
  },
  {
    id: 23,
    assunto: "Células do tecido conjuntivo",
    dificuldade: "medio",
    pergunta: "Os macrófagos teciduais desempenham papel crucial na defesa e eliminação de restos celulares por fagocitose. Qual é a célula sanguínea precursora dos macrófagos?",
    alternativas: [
      "Neutrófilo.",
      "Monócito.",
      "Eosinófilo.",
      "Basófilo."
    ],
    respostaCorreta: 1,
    explicacao: "Os macrófagos se originam dos monócitos que circulam no sangue. Quando os monócitos atravessam a parede dos vasos e entram no tecido conjuntivo, diferenciam-se em macrófagos.",
    dica: "Monócito no sangue → Macrófago no tecido conjuntivo."
  },
  {
    id: 24,
    assunto: "Células do tecido conjuntivo",
    dificuldade: "medio",
    pergunta: "Células ovóides repletas de grânulos citoplasmáticos contendo HISTAMINA e HEPARINA, envolvidas em reações alérgicas e processos inflamatórios nos animais, são os:",
    alternativas: [
      "Mastócitos.",
      "Adipócitos.",
      "Plasmócitos.",
      "Osteócitos."
    ],
    respostaCorreta: 0,
    explicacao: "Os mastócitos contêm grânulos basofílicos estocando histamina (vasodilatador e mediador de alergias) e heparina (anticoagulante).",
    dica: "Histamina + Heparina + Alergia = Mastócito."
  },
  {
    id: 25,
    assunto: "Células do tecido conjuntivo",
    dificuldade: "medio",
    pergunta: "Os plasmócitos são células do tecido conjuntivo originadas a partir da diferenciação de Linfócitos B. Sua função principal é:",
    alternativas: [
      "Sintetizar e secretar imunoglobulinas (anticorpos).",
      "Armazenar gordura sob a forma de gotas lipídicas.",
      "Fagocitar parasitas multicelulares no lúmen intestinal.",
      "Produzir matriz cartilaginosa rica em proteoglicanos."
    ],
    respostaCorreta: 0,
    explicacao: "Os plasmócitos são células especializadas na produção e secreção massiva de anticorpos (imunoglobulinas) para a defesa humoral do organismo.",
    dica: "Plasmócito = Fábrica de Anticorpos (origem em Linfócito B)."
  },
  {
    id: 26,
    assunto: "Células do tecido conjuntivo",
    dificuldade: "facil",
    pergunta: "Células especializadas no armazenamento de gordura (triglicerídeos), atuando como reserva de energia, isolante térmico e amortecedor de choques mecânicos são os:",
    alternativas: [
      "Adipócitos.",
      "Fibroblastos.",
      "Condrócitos.",
      "Mastócitos."
    ],
    respostaCorreta: 0,
    explicacao: "Os adipócitos são células que acumulam lipídios (triglicerídeos) no citoplasma, formando o tecido adiposo.",
    dica: "Armazenamento de gordura = Adipócito."
  },
  {
    id: 27,
    assunto: "Células do tecido conjuntivo",
    dificuldade: "facil",
    pergunta: "Todas as células do tecido conjuntivo derivam embrionariamente de qual tecido precursor multipotente?",
    alternativas: [
      "Mênstruo epidérmico.",
      "Mesenquima (tecido mesenquimal embrionário).",
      "Endoderma intestinal.",
      "Ectoderma neural."
    ],
    respostaCorreta: 1,
    explicacao: "O mesênquima é o tecido embrionário derivado principalmente da mesoderme, que origina todos os tipos de tecidos conjuntivos e suas células.",
    dica: "Tecido conjuntivo vem da mesoderme / Mesênquima embrionário."
  },
  {
    id: 28,
    assunto: "Células do tecido conjuntivo",
    dificuldade: "dificil",
    pergunta: "Em um corte histológico corado por Hematoxilina e Eosina (HE), uma célula apresenta núcleo excêntrico com cromatina disposta em aspecto de 'roda de carro' e citoplasma intensamente basófilo. Trata-se do:",
    alternativas: [
      "Plasmócito.",
      "Adipócito unilocular.",
      "Mastócito subconjuntival.",
      "Fibroblasto quiescente."
    ],
    respostaCorreta: 0,
    explicacao: "O plasmócito possui caracteristicamente um núcleo deslocado para a periferia (excêntrico) com grumos de cromatina alternados que lembram raios de uma roda de carro ou mostrador de relógio, devido ao intenso RER.",
    dica: "Núcleo em roda de carro + citoplasma basófilo = Plasmócito."
  },
  {
    id: 29,
    assunto: "Células do tecido conjuntivo",
    dificuldade: "dificil",
    pergunta: "Qual das seguintes células conjuntivas é capaz de atuar como Célula Apresentadora de Antígenos (APC) para os linfócitos T no sistema imune dos animais?",
    alternativas: [
      "Macrófago.",
      "Adipócito.",
      "Fibrócito.",
      "Condrócito."
    ],
    respostaCorreta: 0,
    explicacao: "Além da fagocitose, os macrófagos processam fragmentos de patógenos e os exibem em sua membrana celular (via MHC classe II), apresentando-os aos linfócitos T.",
    dica: "Fagocitose + Apresentação de Antígenos (APC) = Macrófago."
  },
  {
    id: 30,
    assunto: "Células do tecido conjuntivo",
    dificuldade: "medio",
    pergunta: "Após uma cirurgia veterinária ou ferimento em um cavalo, qual célula conjuntiva sofre mitose e se diferencia em miofibroblasto para fechar e cicatrizar a ferida?",
    alternativas: [
      "Fibroblasto.",
      "Mastócito.",
      "Plasmócito.",
      "Osteoclasto."
    ],
    respostaCorreta: 0,
    explicacao: "Durante o processo de cicatrização, os fibroblastos migram para a lesão, produzem nova matriz e alguns se diferenciam em miofibroblastos (com microfilamentos de actina) para contrair a ferida.",
    dica: "Cicatrização e reparo tecidual = Fibroblasto."
  },

  // ==========================================
  // ASSUNTO 4: FIBRAS DO TECIDO CONJUNTIVO (10 questões)
  // ==========================================
  {
    id: 31,
    assunto: "Fibras do tecido conjuntivo",
    dificuldade: "facil",
    pergunta: "Qual é o tipo de fibra mais abundante no corpo dos animais domésticos, caracterizada por ser extremamente resistente à força de tração mecânica?",
    alternativas: [
      "Fibras elásticas.",
      "Fibras colágenas.",
      "Fibras reticulares.",
      "Fibras mielínicas."
    ],
    respostaCorreta: 1,
    explicacao: "As fibras colágenas são as mais abundantes no organismo animal, formadas pela proteína colágeno, e oferecem alta resistência a forças de tração mecânica.",
    dica: "Abundante + Resistência à tração = Fibras colágenas."
  },
  {
    id: 32,
    assunto: "Fibras do tecido conjuntivo",
    dificuldade: "facil",
    pergunta: "Fibras capazes de se esticar quando submetidas a forças de tração e retornar à sua forma e comprimento originais ao cessar a força são chamadas de:",
    alternativas: [
      "Fibras elásticas.",
      "Fibras colágenas tipo I.",
      "Fibras reticulares argentófilas.",
      "Fibras musculares estriadas."
    ],
    respostaCorreta: 0,
    explicacao: "As fibras elásticas conferem elasticidade aos tecidos, permitindo que eles sofram deformação reversível e retornem à forma inicial.",
    dica: "Esticar e retornar à forma original = Fibras elásticas (elastina)."
  },
  {
    id: 33,
    assunto: "Fibras do tecido conjuntivo",
    dificuldade: "medio",
    pergunta: "As fibras reticulares formam uma rede delicada de sustentação em órgãos hematopoiéticos e linfoides (como baço e linfonodos). Elas são constituídas quimicamente por qual tipo de colágeno?",
    alternativas: [
      "Colágeno tipo I.",
      "Colágeno tipo II.",
      "Colágeno tipo III.",
      "Colágeno tipo IV."
    ],
    respostaCorreta: 2,
    explicacao: "As fibras reticulares são formadas predominantemente por colágeno tipo III associado a glicoproteínas, organizando-se em redes ramificadas muito finas.",
    dica: "Fibras reticulares = Colágeno Tipo III."
  },
  {
    id: 34,
    assunto: "Fibras do tecido conjuntivo",
    dificuldade: "medio",
    pergunta: "O ligamento da nuca (ligamento nucal) dos grandes bovinos sustenta o peso da cabeça e exige grande flexibilidade e retorno elástico. Que tipo de fibra predomina nesse ligamento?",
    alternativas: [
      "Fibras elásticas.",
      "Fibras reticulares.",
      "Fibras de queratina.",
      "Fibras colágenas frouxas."
    ],
    respostaCorreta: 0,
    explicacao: "O ligamento nucal dos ruminantes e equinos é rico em tecido conjuntivo elástico (predomínio de fibras elásticas espessas), permitindo sustentar a cabeça com baixo gasto energético.",
    dica: "Ligamento nucal em bovinos = Fibras elásticas."
  },
  {
    id: 35,
    assunto: "Fibras do tecido conjuntivo",
    dificuldade: "medio",
    pergunta: "Fibras reticulares são muito finas e não aparecem bem coradas por Hematoxilina-Eosina (HE). Qual método de coloração histológica é especificamente utilizado para evidenciá-las em preto?",
    alternativas: [
      "Impregnação por sais de prata (argirofilia).",
      "Coloração por Sudan IV para lipídios.",
      "Azul de Metileno simples.",
      "Técnica de Gram."
    ],
    respostaCorreta: 0,
    explicacao: "Devido ao elevado teor de glicoproteínas associadas, as fibras reticulares reduzem sais de prata, sendo chamadas de aratófilas ou argentófilas (coram-se em preto pela prata).",
    dica: "Fibras reticulares + Prata (argentófilas) = coradas em preto."
  },
  {
    id: 36,
    assunto: "Fibras do tecido conjuntivo",
    dificuldade: "dificil",
    pergunta: "As fibras elásticas são formadas por dois componentes fundamentais sintetizados pelos fibroblastos. Quais são esses dois componentes?",
    alternativas: [
      "Elastina e microfibrilas de Fibrilina.",
      "Colágeno tipo I e Queratina.",
      "Heparina e Histamina.",
      "Condroitim sulfato e Ácido Hialurônico."
    ],
    respostaCorreta: 0,
    explicacao: "As fibras elásticas possuem um núcleo amorfo de elastina cercado por uma bainha de microfibrilas da glicoproteína fibrilina.",
    dica: "Fibra elástica = Elastina + Fibrilina."
  },
  {
    id: 37,
    assunto: "Fibras do tecido conjuntivo",
    dificuldade: "medio",
    pergunta: "Assinale a alternativa que relaciona CORRETAMENTE a fibra com a sua característica anatômica principal:",
    alternativas: [
      "Fibras colágenas - Muito ramificadas, coram-se exclusivamente com prata.",
      "Fibras elásticas - Formadas por colágeno tipo III, sustentam os alvéolos pulmonares.",
      "Fibras reticulares - Formam o estroma delicado de órgãos parenquimatosos moles.",
      "Fibras colágenas - Responsáveis pelo retorno elástico das paredes arteriais."
    ],
    respostaCorreta: 2,
    explicacao: "As fibras reticulares formam a arquitetura/estroma de suporte de órgãos moles como fígado, linfonodos, baço e medula óssea.",
    dica: "Estroma de órgãos moles = Fibras reticulares."
  },
  {
    id: 38,
    assunto: "Fibras do tecido conjuntivo",
    dificuldade: "dificil",
    pergunta: "Na biossíntese do colágeno pelos fibroblastos, a hidroxilação dos aminoácidos prolina e lisina no RER exige a presença de um cofator vitamínico. Qual é esse cofator?",
    alternativas: [
      "Vitamina C (ácido ascórbico).",
      "Vitamina A (retinol).",
      "Vitamina D (calciferol).",
      "Vitamina K (menadiona)."
    ],
    respostaCorreta: 0,
    explicacao: "A vitamina C é cofator essencial para as enzimas proli-hidroxilase e lisi-hidroxilase na síntese do procolágeno. Sua falta impede a formação correta de fibras colágenas.",
    dica: "Síntese de colágeno exige Vitamina C."
  },
  {
    id: 39,
    assunto: "Fibras do tecido conjuntivo",
    dificuldade: "facil",
    pergunta: "Assinale a alternativa INCORRETA a respeito das fibras colágenas:",
    alternativas: [
      "São incolores quando frescas, mas em grande quantidade conferem cor branca aos tecidos (ex: tendões).",
      "São formadas pela polimerização da molécula de tropocolágeno.",
      "Apresentam capacidade de contração muscular ativa voluntária.",
      "São encontradas em abundância na derme, nos tendões e na matriz óssea."
    ],
    respostaCorreta: 2,
    explicacao: "Fibras colágenas oferecem resistência PASSIVA à tração e NÃO possuem capacidade de contração muscular ativa.",
    dica: "Colágeno dá resistência passiva, não se contrai como músculo."
  },
  {
    id: 40,
    assunto: "Fibras do tecido conjuntivo",
    dificuldade: "medio",
    pergunta: "As grandes artérias (como a aorta dos bovinos) precisam expandir durante a sístole cardíaca e retrair durante a diástole. Qual fibra é abundante em sua camada média para essa função?",
    alternativas: [
      "Fibras elásticas.",
      "Fibras colágenas tipo II.",
      "Fibras reticulares simples.",
      "Fibras queratinizadas."
    ],
    respostaCorreta: 0,
    explicacao: "A parede da aorta e de grandes artérias possui membranas e fibras elásticas abundantes para suportar e amortecer a pressão do pulso sanguíneo.",
    dica: "Aorta / Artérias elásticas = Fibras elásticas."
  },

  // ==========================================
  // ASSUNTO 5: CLASSIFICAÇÃO DOS TECIDOS CONJUNTIVOS (10 questões)
  // ==========================================
  {
    id: 41,
    assunto: "Classificação dos tecidos conjuntivos",
    dificuldade: "facil",
    pergunta: "Como se diferencia o Tecido Conjuntivo Propriamente Dito FROUXO do Tecido Conjuntivo Propriamente Dito DENSO?",
    alternativas: [
      "O frouxo possui equilíbrio entre células, fibras e substância fundamental; o denso possui predomínio acentuado de fibras colágenas.",
      "O frouxo é exclusivo dos ossos; o denso é exclusivo da cartilagem.",
      "O frouxo é completamente avascular e o denso tem grande vascularização.",
      "O frouxo contém apenas adipócitos e o denso contém apenas mastócitos."
    ],
    respostaCorreta: 0,
    explicacao: "O TC Frouxo possui muitos elementos celulares e substância fundamental com poucas fibras espaçadas (flexível). O TC Denso é dominado por fibras colágenas espessas (resistente a tração).",
    dica: "Frouxo = flexível, mais células/substância. Denso = rígido, muitas fibras colágenas."
  },
  {
    id: 42,
    assunto: "Classificação dos tecidos conjuntivos",
    dificuldade: "medio",
    pergunta: "Os tendões que conectam os músculos aos ossos nos membros dos equinos sofrem tração em uma única direção. Que tipo de tecido conjuntivo constitui os tendões?",
    alternativas: [
      "Tecido conjuntivo denso regular (modelado).",
      "Tecido conjuntivo denso irregular (não modelado).",
      "Tecido conjuntivo frouxo estromal.",
      "Tecido adiposo multilocular."
    ],
    respostaCorreta: 0,
    explicacao: "No tecido conjuntivo denso REGULAR (modelado), os feixes de colágeno são dispostos em arranjo paralelo ordenado, oferecendo máxima resistência à tração unidirecional (ex: tendões).",
    dica: "Tendões = Conjuntivo Denso Regular (feixes paralelos ordenados)."
  },
  {
    id: 43,
    assunto: "Classificação dos tecidos conjuntivos",
    dificuldade: "medio",
    pergunta: "A derme profunda da pele e as cápsulas protetoras de órgãos como o fígado e rins precisam resistir a trações exercidas em VÁRIAS direções. Qual é esse tecido?",
    alternativas: [
      "Tecido conjuntivo denso irregular (não modelado).",
      "Tecido conjuntivo denso regular (modelado).",
      "Tecido cartilaginoso hialino.",
      "Tecido embrionário mucoso."
    ],
    respostaCorreta: 0,
    explicacao: "No tecido conjuntivo denso IRREGULAR (não modelado), as fibras colágenas formam uma rede tridimensional entrelaçada em várias direções, resistindo a forças multidirecionais.",
    dica: "Derme e cápsula de órgãos = Denso Irregular (não modelado)."
  },
  {
    id: 44,
    assunto: "Classificação dos tecidos conjuntivos",
    dificuldade: "facil",
    pergunta: "O tecido adiposo multilocular (gordura marrom/castanha) difere do unilocular (gordura branca) por ser especialmente abundante em recém-nascidos. Sua função principal é:",
    alternativas: [
      "Produção de calor para termorregulação (termogênese sem tremor).",
      "Armazenamento de cálcio para os ossos.",
      "Produção de anticorpos de classe IgE.",
      "Condução de impulsos elétricos cardíacos."
    ],
    respostaCorreta: 0,
    explicacao: "A gordura multilocular é rica em mitocôndrias com a proteína UCP-1 (termogenina), gerando calor diretamente ao invés de ATP, vital para recém-nascidos e animais hibernantes.",
    dica: "Gordura multilocular/marrom = Produção de calor (termogênese)."
  },
  {
    id: 45,
    assunto: "Classificação dos tecidos conjuntivos",
    dificuldade: "medio",
    pergunta: "Qual das seguintes características é verdadeira para o TECIDO CARTILAGINOSO dos animais?",
    alternativas: [
      "É um tecido avascular, nutrido por difusão através do pericôndrio ou líquido sinovial.",
      "Possui canais de Havers por onde passam vasos sanguíneos arteriais.",
      "Suas células principais são os osteócitos localizados em canalículos rígidos.",
      "Não contém nenhuma fibra na matriz extracelular."
    ],
    respostaCorreta: 0,
    explicacao: "A cartilagem é um tecido conjuntivo especial AVASCULAR. Suas células (condrócitos) recebem nutrientes por difusão do tecido conjuntivo envolvente (pericôndrio).",
    dica: "Cartilagem = Avascular (sem vasos), nutrida pelo pericôndrio."
  },
  {
    id: 46,
    assunto: "Classificação dos tecidos conjuntivos",
    dificuldade: "medio",
    pergunta: "O tecido ósseo é um tecido conjuntivo de suporte rígido. Sua matriz extracelular se distingue dos outros tecidos conjuntivos por apresentar:",
    alternativas: [
      "Calcificação por depósito de cristais de hidroxiapatita (cálcio e fosfato).",
      "Ausência total de fibras colágenas.",
      "Predomínio de substância fundamental fluida aquosa.",
      "Células vivas imersas em ácido hialurônico puro."
    ],
    respostaCorreta: 0,
    explicacao: "O tecido ósseo destaca-se pela mineralização da sua matriz orgânica (formada por colágeno I) com cristais minerais de fosfato de cálcio (hidroxiapatita).",
    dica: "Tecido ósseo = Matriz calcificada por Hidroxiapatita."
  },
  {
    id: 47,
    assunto: "Classificação dos tecidos conjuntivos",
    dificuldade: "medio",
    pergunta: "O sangue é considerado histologicamente uma variedade de tecido conjuntivo de propriedades especiais porque:",
    alternativas: [
      "Possui células imersas em uma matriz extracelular líquida chamada plasma sanguíneo.",
      "É sintetizado diretamente pelos osteoclastos da medula amarela.",
      "Suas hemácias produzem fibras colágenas na circulação.",
      "Não possui origem no mesênquima embrionário."
    ],
    respostaCorreta: 0,
    explicacao: "O sangue é um tecido conjuntivo especial com origem mesenquimal, no qual as células (hemácias, leucócitos, plaquetas) ficam suspensas na matriz extracelular líquida (plasma).",
    dica: "Sangue = Tecido conjuntivo especial com matriz líquida (plasma)."
  },
  {
    id: 48,
    assunto: "Classificação dos tecidos conjuntivos",
    dificuldade: "dificil",
    pergunta: "Que tipo de cartilagem é encontrada nos discos intervertebrais e na sínfise púbica dos mamíferos, caracterizando-se por suportar elevadíssimas pressões e conter feixes espessos de colágeno tipo I?",
    alternativas: [
      "Fibrocartilagem (cartilagem fibrosa).",
      "Cartilagem hialina embrionária.",
      "Cartilagem elástica de orelha.",
      "Cartilagem serosa."
    ],
    respostaCorreta: 0,
    explicacao: "A fibrocartilagem é o tipo mais resistente, combinando características de tecido conjuntivo denso e cartilagem hialina, abundante em colágeno I (sem pericôndrio).",
    dica: "Discos intervertebrais = Fibrocartilagem (cartilagem fibrosa)."
  },
  {
    id: 49,
    assunto: "Classificação dos tecidos conjuntivos",
    dificuldade: "dificil",
    pergunta: "Um touro de alta linhagem sofreu uma laceração no tendão do membro posterior. O médico veterinário explicou que a recuperação é lenta porque o tecido do tendão é:",
    alternativas: [
      "Tecido conjuntivo denso regular, com reduzida vascularização e células com baixo índice mitótico.",
      "Tecido epitelial simples com rápida proliferação por difusão.",
      "Tecido muscular estriado cardíaco de rápida regeneração.",
      "Tecido adiposo unilocular sem fibras."
    ],
    respostaCorreta: 0,
    explicacao: "Tendões são formados por TC denso regular. Por possuírem vascularização relativamente escassa e tenócitos (fibrócitos) pouco mitóticos, sua regeneração é bastante demorada.",
    dica: "Tendões (TC Denso Regular) têm cicatrização lenta por baixa vascularização."
  },
  {
    id: 50,
    assunto: "Classificação dos tecidos conjuntivos",
    dificuldade: "medio",
    pergunta: "Assinale a alternativa que agrupa CORRETAMENTE apenas tecidos que pertencem ao grande grupo dos TECIDOS CONJUNTIVOS:",
    alternativas: [
      "Tecido conjuntivo frouxo, Tecido adiposo, Tecido cartilaginoso, Tecido ósseo e Sangue.",
      "Tecido epitelial pavimentoso, Tecido muscular liso, Tecido nervoso e Tecido ósseo.",
      "Tecido glandular merócrino, Tecido conjuntivo denso, Tecido epidérmico e Neurônios.",
      "Epitélio de transição, Tendão, Tecido adiposo e Miocárdio."
    ],
    respostaCorreta: 0,
    explicacao: "O grande grupo dos tecidos conjuntivos abrange: propriamente dito (frouxo e denso), adiposo, cartilaginoso, ósseo, sanguíneo e hemocitopoético.",
    dica: "Grandes tecidos conjuntivos: Propriamente dito, Adiposo, Cartilagem, Ósseo e Sangue."
  }
];

window.QUESTIONS_DATABASE = QUESTIONS_DATABASE;
