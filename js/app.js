// Lógica Principal do Aplicativo HistoZoo Gamificado

class HistoZooApp {
  constructor() {
    this.questions = window.QUESTIONS_DATABASE || [];
    this.currentQuestionsList = [];
    this.currentIndex = 0;
    this.mode = 'home'; // 'home', 'study', 'exam', 'exam_result', 'reward'
    this.selectedTopic = null;
    this.selectedDifficulty = null;
    
    // Estado do Quiz Atual
    this.userAnswers = []; // { questionId, selectedIndex, isCorrect, question }
    this.answeredCurrent = false;

    // Estatísticas Persistentes
    this.stats = this.loadStats();

    this.initUI();
  }

  loadStats() {
    const saved = localStorage.getItem('histozoo_stats');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Erro ao carregar estatísticas", e);
      }
    }
    return {
      totalAnswered: 0,
      totalCorrect: 0,
      totalWrong: 0,
      streak: 0,
      maxStreak: 0,
      topicErrors: {
        "Tecido epitelial de revestimento": 0,
        "Tecido epitelial glandular": 0,
        "Células do tecido conjuntivo": 0,
        "Fibras do tecido conjuntivo": 0,
        "Classificação dos tecidos conjuntivos": 0
      },
      examHistory: []
    };
  }

  saveStats() {
    localStorage.setItem('histozoo_stats', JSON.stringify(this.stats));
    this.updateHeaderStats();
  }

  initUI() {
    this.updateHeaderStats();
    this.renderHome();
  }

  updateHeaderStats() {
    const total = this.stats.totalAnswered;
    const correct = this.stats.totalCorrect;
    const percent = total > 0 ? Math.round((correct / total) * 100) : 0;

    const streakEl = document.getElementById('stat-streak');
    const percentEl = document.getElementById('stat-percent');
    const countEl = document.getElementById('stat-count');
    const progressBar = document.getElementById('global-progress-bar');
    const progressText = document.getElementById('global-progress-text');

    if (streakEl) streakEl.textContent = `${this.stats.streak} 🔥`;
    if (percentEl) percentEl.textContent = `${percent}%`;
    if (countEl) countEl.textContent = `${correct}/${total}`;

    // Progresso baseado no banco de 50 questões dominadas
    const masteredPercent = Math.min(100, Math.round((correct / this.questions.length) * 100));
    if (progressBar) progressBar.style.width = `${masteredPercent}%`;
    if (progressText) progressText.textContent = `Você já dominou ${masteredPercent}% deste conteúdo!`;
  }

  // NAVEGAÇÃO E REQUISIÇÕES DE MODOS
  startStudyTopic(topicName) {
    this.mode = 'study';
    this.selectedTopic = topicName;
    this.selectedDifficulty = null;
    this.currentQuestionsList = this.shuffleArray(
      this.questions.filter(q => q.assunto === topicName)
    );
    this.currentIndex = 0;
    this.userAnswers = [];
    this.answeredCurrent = false;
    this.renderQuiz();
  }

  startDifficultyFilter(difficulty) {
    this.mode = 'study';
    this.selectedTopic = null;
    this.selectedDifficulty = difficulty;
    
    let filtered = [];
    if (difficulty === 'desafio') {
      filtered = this.questions.filter(q => q.dificuldade === 'medio' || q.dificuldade === 'dificil');
    } else {
      filtered = this.questions.filter(q => q.dificuldade === difficulty);
    }

    this.currentQuestionsList = this.shuffleArray(filtered);
    this.currentIndex = 0;
    this.userAnswers = [];
    this.answeredCurrent = false;
    this.renderQuiz();
  }

  startExamSimulation() {
    this.mode = 'exam';
    this.selectedTopic = null;
    this.selectedDifficulty = null;
    
    // Selecionar 20 questões aleatórias do banco total
    const count = window.CONFIG ? window.CONFIG.EXAM_QUESTION_COUNT : 20;
    this.currentQuestionsList = this.shuffleArray([...this.questions]).slice(0, count);
    this.currentIndex = 0;
    this.userAnswers = [];
    this.answeredCurrent = false;
    this.renderQuiz();
  }

  startReviewWeakTopic(topicName) {
    this.mode = 'study';
    this.selectedTopic = topicName;
    this.selectedDifficulty = null;
    this.currentQuestionsList = this.shuffleArray(
      this.questions.filter(q => q.assunto === topicName)
    );
    this.currentIndex = 0;
    this.userAnswers = [];
    this.answeredCurrent = false;
    this.renderQuiz();
  }

  startReviewWrongExamQuestions(wrongQuestionsList) {
    this.mode = 'study';
    this.selectedTopic = 'Revisão de Erros';
    this.selectedDifficulty = null;
    this.currentQuestionsList = this.shuffleArray(wrongQuestionsList);
    this.currentIndex = 0;
    this.userAnswers = [];
    this.answeredCurrent = false;
    this.renderQuiz();
  }

  // UTILS
  shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  getDifficultyBadge(diff) {
    if (diff === 'facil') return `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">🟢 Fácil</span>`;
    if (diff === 'medio') return `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">🟡 Médio</span>`;
    return `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-200">🔴 Difícil</span>`;
  }

  // RENDERS DE TELA

  renderHome() {
    this.mode = 'home';
    const mainContainer = document.getElementById('app-content');
    if (!mainContainer) return;

    // Identificar assuntos que precisam de revisão (tópicos com mais erros)
    const weakTopics = Object.entries(this.stats.topicErrors)
      .filter(([_, count]) => count > 0)
      .sort((a, b) => b[1] - a[1]);

    const topicsList = [
      { name: "Tecido epitelial de revestimento", icon: "🧬", desc: "Epitélios simples, estratificados, polaridade e nutrição" },
      { name: "Tecido epitelial glandular", icon: "🧪", desc: "Exócrinas, endócrinas, adênomeros e mecanismos de secreção" },
      { name: "Células do tecido conjuntivo", icon: "🔬", desc: "Fibroblastos, macrófagos, mastócitos, plasmócitos e adipócitos" },
      { name: "Fibras do tecido conjuntivo", icon: "🧵", desc: "Fibras colágenas, reticulares e elásticas comparadas" },
      { name: "Classificação dos tecidos conjuntivos", icon: "🧠", desc: "TC Frouxo, Denso, Adiposo, Cartilagem, Ósseo e Sangue" }
    ];

    mainContainer.innerHTML = `
      <!-- Título de Boas-Vindas -->
      <div class="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-pink-200/50 mb-8 relative overflow-hidden">
        <div class="absolute -right-10 -bottom-10 opacity-10 text-9xl font-bold select-none pointer-events-none">🔬</div>
        <div class="max-w-2xl relative z-10">
          <span class="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider mb-3">
            📚 Zootecnia • 1º Semestre
          </span>
          <h1 class="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2">
            Preparatória para a Prova de Histologia 🌸
          </h1>
          <p class="text-rose-100 text-sm sm:text-base leading-relaxed mb-6">
            Aprenda o conteúdo através de questões de múltipla escolha interativas com explicações didáticas e desfrute de um sistema gamificado!
          </p>

          <button onclick="app.startExamSimulation()" 
            class="inline-flex items-center justify-center gap-3 bg-white text-rose-600 font-extrabold px-6 py-3.5 rounded-2xl shadow-lg hover:bg-rose-50 transition transform hover:-translate-y-0.5 active:translate-y-0 text-base sm:text-lg">
            <span>🎯</span> INICIAR SIMULADO DA PROVA (20 QUESTÕES)
          </button>
        </div>
      </div>

      <!-- Seção de Revisão Inteligente (Aparece se houver tópicos fracos) -->
      ${weakTopics.length > 0 ? `
        <div class="mb-8 bg-amber-50/80 border border-amber-200 rounded-2xl p-5 shadow-sm">
          <div class="flex items-center gap-3 mb-3">
            <span class="text-2xl">⚠️</span>
            <div>
              <h3 class="font-bold text-amber-900 text-lg">Precisa Revisar</h3>
              <p class="text-xs sm:text-sm text-amber-700">Identificamos os assuntos em que você teve maior frequência de erros:</p>
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
            ${weakTopics.slice(0, 2).map(([topic, errors]) => `
              <div class="bg-white p-3.5 rounded-xl border border-amber-200 flex items-center justify-between shadow-xs">
                <div>
                  <span class="font-semibold text-gray-800 text-sm block">${topic}</span>
                  <span class="text-xs text-rose-600 font-medium">${errors} erro(s) acumulado(s)</span>
                </div>
                <button onclick="app.startReviewWeakTopic('${topic}')" 
                  class="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-bold text-xs shadow-xs transition">
                  REVISAR ESTE ASSUNTO
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Modos Principais -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        
        <!-- ESTUDAR POR ASSUNTO -->
        <div class="lg:col-span-2 space-y-4">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold text-gray-800 flex items-center gap-2">
              <span>📚</span> Estudar por Assunto
            </h2>
            <span class="text-xs font-semibold text-gray-500">10 Questões por tema</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            ${topicsList.map(t => `
              <div onclick="app.startStudyTopic('${t.name}')" 
                class="bg-white rounded-2xl p-5 border border-pink-100 shadow-sm hover:shadow-md hover:border-pink-300 cursor-pointer transition transform hover:-translate-y-1 group relative">
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 text-2xl flex items-center justify-center group-hover:scale-110 transition">
                    ${t.icon}
                  </div>
                  <div class="flex-1">
                    <h3 class="font-bold text-gray-800 text-base group-hover:text-rose-600 transition mb-1">${t.name}</h3>
                    <p class="text-xs text-gray-500 line-clamp-2">${t.desc}</p>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- FILTROS DE DIFICULDADE & DESAFIO -->
        <div class="space-y-4">
          <h2 class="text-xl font-bold text-gray-800 flex items-center gap-2">
            <span>🎚️</span> Filtros & Desafios
          </h2>

          <div class="bg-white rounded-2xl p-5 border border-purple-100 shadow-sm space-y-3">
            <button onclick="app.startDifficultyFilter('facil')" 
              class="w-full text-left p-3 rounded-xl border border-emerald-100 bg-emerald-50/50 hover:bg-emerald-100/60 flex items-center justify-between transition">
              <span class="font-bold text-emerald-900 text-sm flex items-center gap-2">
                <span>🟢</span> Nível Fácil
              </span>
              <span class="text-xs font-semibold bg-emerald-200 text-emerald-800 px-2 py-0.5 rounded-md">Conceituais</span>
            </button>

            <button onclick="app.startDifficultyFilter('medio')" 
              class="w-full text-left p-3 rounded-xl border border-amber-100 bg-amber-50/50 hover:bg-amber-100/60 flex items-center justify-between transition">
              <span class="font-bold text-amber-900 text-sm flex items-center gap-2">
                <span>🟡</span> Nível Médio
              </span>
              <span class="text-xs font-semibold bg-amber-200 text-amber-800 px-2 py-0.5 rounded-md">Comparativas</span>
            </button>

            <button onclick="app.startDifficultyFilter('dificil')" 
              class="w-full text-left p-3 rounded-xl border border-rose-100 bg-rose-50/50 hover:bg-rose-100/60 flex items-center justify-between transition">
              <span class="font-bold text-rose-900 text-sm flex items-center gap-2">
                <span>🔴</span> Nível Difícil
              </span>
              <span class="text-xs font-semibold bg-rose-200 text-rose-800 px-2 py-0.5 rounded-md">Aprofundadas</span>
            </button>

            <div class="pt-2 border-t border-gray-100">
              <button onclick="app.startDifficultyFilter('desafio')" 
                class="w-full p-4 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 text-white font-extrabold shadow-md hover:opacity-95 transition text-center block">
                🔥 MODO DESAFIO (MÉDIO + DIFÍCIL)
              </button>
            </div>
          </div>
        </div>

      </div>
    `;
  }

  renderQuiz() {
    const mainContainer = document.getElementById('app-content');
    if (!mainContainer) return;

    if (this.currentIndex >= this.currentQuestionsList.length) {
      if (this.mode === 'exam') {
        this.renderExamResult();
      } else {
        this.renderStudyFinished();
      }
      return;
    }

    const currentQ = this.currentQuestionsList[this.currentIndex];
    const totalQ = this.currentQuestionsList.length;
    const progressPercent = Math.round(((this.currentIndex) / totalQ) * 100);

    const isExamMode = this.mode === 'exam';

    mainContainer.innerHTML = `
      <div class="max-w-3xl mx-auto">
        <!-- Top Bar do Quiz -->
        <div class="flex items-center justify-between mb-4">
          <button onclick="app.renderHome()" 
            class="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-rose-600 transition">
            <span>←</span> Sair para o Início
          </button>
          <div class="flex items-center gap-2">
            ${isExamMode ? `<span class="px-3 py-1 bg-purple-100 text-purple-800 rounded-full font-bold text-xs border border-purple-200">🎯 Simulado Prova</span>` : ''}
            <span class="text-xs font-bold text-gray-500">Questão ${this.currentIndex + 1} de ${totalQ}</span>
          </div>
        </div>

        <!-- Barra de Progresso do Quiz -->
        <div class="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden mb-6">
          <div class="bg-gradient-to-r from-rose-400 to-purple-500 h-full transition-all duration-300" style="width: ${progressPercent}%"></div>
        </div>

        <!-- Card da Questão -->
        <div class="bg-white rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-xl mb-6 relative">
          
          <!-- Badges de Assunto e Dificuldade -->
          <div class="flex flex-wrap items-center justify-between gap-2 mb-4 pb-4 border-b border-gray-100">
            <span class="text-xs font-extrabold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
              📌 ${currentQ.assunto}
            </span>
            ${this.getDifficultyBadge(currentQ.dificuldade)}
          </div>

          <!-- Pergunta -->
          <h2 class="text-lg sm:text-xl font-bold text-gray-800 leading-relaxed mb-6">
            ${currentQ.pergunta}
          </h2>

          <!-- Alternativas -->
          <div class="space-y-3 mb-6" id="alternatives-container">
            ${currentQ.alternativas.map((alt, idx) => {
              const letter = ['A', 'B', 'C', 'D'][idx];
              return `
                <button id="opt-${idx}" onclick="app.selectOption(${idx})" 
                  class="w-full text-left p-4 rounded-2xl border-2 border-gray-100 bg-gray-50/50 hover:bg-rose-50/60 hover:border-rose-300 transition flex items-start gap-4 group">
                  <span class="w-8 h-8 rounded-xl bg-white border border-gray-200 text-gray-600 font-extrabold text-sm flex items-center justify-center group-hover:bg-rose-500 group-hover:text-white group-hover:border-rose-500 transition shrink-0">
                    ${letter}
                  </span>
                  <span class="text-sm sm:text-base font-medium text-gray-700 leading-snug pt-1">
                    ${alt}
                  </span>
                </button>
              `;
            }).join('')}
          </div>

          <!-- Área de Feedback Imediato (Apenas no Modo Estudo) -->
          <div id="feedback-area" class="hidden space-y-4 pt-4 border-t border-gray-100"></div>

          <!-- Botão Próxima Questão (Habilitado após responder) -->
          <div id="action-btn-area" class="hidden justify-end pt-4">
            <button onclick="app.nextQuestion()" 
              class="px-8 py-3.5 bg-gradient-to-r from-rose-500 to-purple-600 hover:opacity-95 text-white font-extrabold rounded-2xl shadow-lg transition transform hover:-translate-y-0.5">
              PRÓXIMA QUESTÃO →
            </button>
          </div>

        </div>
      </div>
    `;
  }

  selectOption(selectedIndex) {
    if (this.answeredCurrent) return; // Evitar respostas duplas

    const currentQ = this.currentQuestionsList[this.currentIndex];
    const isCorrect = selectedIndex === currentQ.respostaCorreta;
    this.answeredCurrent = true;

    // Registrar resposta do usuário
    this.userAnswers.push({
      questionId: currentQ.id,
      selectedIndex,
      isCorrect,
      question: currentQ
    });

    // Atualizar Estatísticas Globais
    this.stats.totalAnswered++;
    if (isCorrect) {
      this.stats.totalCorrect++;
      this.stats.streak++;
      if (this.stats.streak > this.stats.maxStreak) {
        this.stats.maxStreak = this.stats.streak;
      }
      if (window.SoundFX) window.SoundFX.playSuccess();
    } else {
      this.stats.totalWrong++;
      this.stats.streak = 0;
      // Registrar tópico fraco
      if (!this.stats.topicErrors[currentQ.assunto]) {
        this.stats.topicErrors[currentQ.assunto] = 0;
      }
      this.stats.topicErrors[currentQ.assunto]++;
      if (window.SoundFX) window.SoundFX.playError();
    }
    this.saveStats();

    // Desabilitar todas as alternativas
    for (let i = 0; i < currentQ.alternativas.length; i++) {
      const btn = document.getElementById(`opt-${i}`);
      if (btn) {
        btn.disabled = true;
        btn.classList.remove('hover:bg-rose-50/60', 'hover:border-rose-300');
        btn.classList.add('cursor-not-allowed', 'opacity-70');
      }
    }

    if (this.mode === 'exam') {
      // No modo simulado: destacar apenas a opção selecionada de forma neutra e ir para a próxima após breve instante ou clique
      const selectedBtn = document.getElementById(`opt-${selectedIndex}`);
      if (selectedBtn) {
        selectedBtn.classList.remove('bg-gray-50/50', 'border-gray-100', 'opacity-70');
        selectedBtn.classList.add('bg-purple-100', 'border-purple-400', 'opacity-100');
      }
      setTimeout(() => {
        this.nextQuestion();
      }, 300);

    } else {
      // No modo Estudo: Mostrar Feedback Imediato
      const selectedBtn = document.getElementById(`opt-${selectedIndex}`);
      const correctBtn = document.getElementById(`opt-${currentQ.respostaCorreta}`);

      if (isCorrect) {
        if (selectedBtn) {
          selectedBtn.classList.remove('bg-gray-50/50', 'border-gray-100', 'opacity-70');
          selectedBtn.classList.add('bg-emerald-100', 'border-emerald-500', 'opacity-100');
        }
      } else {
        if (selectedBtn) {
          selectedBtn.classList.remove('bg-gray-50/50', 'border-gray-100', 'opacity-70');
          selectedBtn.classList.add('bg-rose-100', 'border-rose-500', 'opacity-100');
        }
        if (correctBtn) {
          correctBtn.classList.remove('bg-gray-50/50', 'border-gray-100', 'opacity-70');
          correctBtn.classList.add('bg-emerald-100', 'border-emerald-500', 'opacity-100');
        }
      }

      this.renderImmediateFeedback(isCorrect, currentQ, selectedIndex);
    }
  }

  renderImmediateFeedback(isCorrect, currentQ, selectedIndex) {
    const feedbackArea = document.getElementById('feedback-area');
    const actionBtnArea = document.getElementById('action-btn-area');
    if (!feedbackArea || !actionBtnArea) return;

    const correctLetter = ['A', 'B', 'C', 'D'][currentQ.respostaCorreta];

    if (isCorrect) {
      feedbackArea.innerHTML = `
        <div class="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 space-y-3">
          <div class="flex items-center gap-3">
            <span class="text-3xl">🎉</span>
            <div>
              <h3 class="text-xl font-extrabold text-emerald-800">ACERTOU!</h3>
              <p class="text-xs text-emerald-700 font-semibold">Excelente raciocínio histológico!</p>
            </div>
          </div>
          <p class="text-sm text-emerald-900 leading-relaxed bg-white/70 p-4 rounded-xl border border-emerald-100">
            ${currentQ.explicacao}
          </p>
          <div class="text-xs font-bold text-emerald-800 flex items-center gap-2 pt-1">
            <span>🧠 Para lembrar:</span>
            <span class="font-normal text-emerald-900">${currentQ.dica}</span>
          </div>
        </div>
      `;
    } else {
      feedbackArea.innerHTML = `
        <div class="bg-rose-50 border border-rose-200 rounded-2xl p-5 space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <span class="text-3xl">❌</span>
              <div>
                <h3 class="text-xl font-extrabold text-rose-800">VOCÊ ERROU</h3>
                <span class="inline-block mt-1 px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-extrabold">
                  Resposta correta: Alternativa ${correctLetter}
                </span>
              </div>
            </div>
          </div>

          <div class="bg-white/80 p-4 rounded-xl border border-rose-100 space-y-2">
            <h4 class="font-bold text-rose-900 text-sm flex items-center gap-1.5">
              <span>💡</span> POR QUE?
            </h4>
            <p class="text-sm text-gray-700 leading-relaxed">
              ${currentQ.explicacao}
            </p>
          </div>

          <div class="bg-amber-50 p-3.5 rounded-xl border border-amber-200 text-xs font-bold text-amber-900 flex items-start gap-2">
            <span class="text-base">🧠</span>
            <div>
              <span class="block font-extrabold text-amber-950">Para lembrar:</span>
              <span class="font-medium text-amber-900">${currentQ.dica}</span>
            </div>
          </div>
        </div>
      `;
    }

    feedbackArea.classList.remove('hidden');
    actionBtnArea.classList.remove('hidden');
    actionBtnArea.classList.add('flex');
  }

  nextQuestion() {
    this.currentIndex++;
    this.answeredCurrent = false;
    this.renderQuiz();
  }

  renderStudyFinished() {
    const mainContainer = document.getElementById('app-content');
    if (!mainContainer) return;

    const total = this.userAnswers.length;
    const correctCount = this.userAnswers.filter(a => a.isCorrect).length;
    const percent = total > 0 ? Math.round((correctCount / total) * 100) : 0;

    mainContainer.innerHTML = `
      <div class="max-w-2xl mx-auto bg-white rounded-3xl p-8 border border-pink-100 shadow-xl text-center">
        <div class="w-20 h-20 bg-rose-100 text-rose-600 text-4xl rounded-3xl flex items-center justify-center mx-auto mb-4">
          👏
        </div>
        <h2 class="text-2xl font-extrabold text-gray-800 mb-2">Estudo Concluído!</h2>
        <p class="text-sm text-gray-500 mb-6">Você revisou este bloco de questões com sucesso.</p>

        <div class="bg-rose-50/50 rounded-2xl p-6 border border-rose-100 max-w-md mx-auto mb-8 flex justify-around">
          <div>
            <span class="text-xs font-semibold text-gray-500 block">Acertos</span>
            <span class="text-2xl font-extrabold text-emerald-600">${correctCount}</span>
          </div>
          <div class="border-r border-rose-200"></div>
          <div>
            <span class="text-xs font-semibold text-gray-500 block">Total</span>
            <span class="text-2xl font-extrabold text-gray-700">${total}</span>
          </div>
          <div class="border-r border-rose-200"></div>
          <div>
            <span class="text-xs font-semibold text-gray-500 block">Aproveitamento</span>
            <span class="text-2xl font-extrabold text-purple-600">${percent}%</span>
          </div>
        </div>

        <button onclick="app.renderHome()" 
          class="px-8 py-3.5 bg-rose-500 hover:bg-rose-600 text-white font-extrabold rounded-2xl shadow-md transition">
          VOLTAR AO PAINEL DE ESTUDOS
        </button>
      </div>
    `;
  }

  // TELA DE RESULTADO DO SIMULADO
  renderExamResult() {
    const mainContainer = document.getElementById('app-content');
    if (!mainContainer) return;

    const total = this.userAnswers.length;
    const correctCount = this.userAnswers.filter(a => a.isCorrect).length;
    const wrongCount = total - correctCount;
    const percent = Math.round((correctCount / total) * 100);

    const minScorePercent = window.CONFIG ? window.CONFIG.REWARD_MIN_SCORE_PERCENT : 80;
    const unlockedReward = percent >= minScorePercent;

    // Calcular erros por assunto no simulado
    const examErrorsByTopic = {};
    this.userAnswers.forEach(ans => {
      if (!ans.isCorrect) {
        const topic = ans.question.assunto;
        examErrorsByTopic[topic] = (examErrorsByTopic[topic] || 0) + 1;
      }
    });

    // Mensagem baseada no resultado
    let titleMsg = "";
    let subMsg = "";
    let headerBg = "";

    if (percent >= 90) {
      titleMsg = "🏆 INCRÍVEL!";
      subMsg = "Você está muito preparada para a prova de Histologia!";
      headerBg = "from-emerald-500 to-teal-600";
    } else if (percent >= 80) {
      titleMsg = "🔥 MUITO BEM!";
      subMsg = "Você está no caminho certo! Excelente desempenho!";
      headerBg = "from-rose-500 to-pink-600";
    } else if (percent >= 60) {
      titleMsg = "💪 QUASE LÁ!";
      subMsg = "Vamos revisar os assuntos que você mais errou para garantir o 10 na prova.";
      headerBg = "from-amber-500 to-orange-600";
    } else {
      titleMsg = "📚 VAMOS DE NOVO!";
      subMsg = "Não desanima. Agora você já sabe exatamente o que precisa revisar.";
      headerBg = "from-rose-600 to-red-700";
    }

    const wrongQuestionsList = this.userAnswers.filter(a => !a.isCorrect).map(a => a.question);

    mainContainer.innerHTML = `
      <div class="max-w-3xl mx-auto space-y-6">
        
        <!-- Top Banner Resultado -->
        <div class="bg-gradient-to-r ${headerBg} rounded-3xl p-8 text-white shadow-xl text-center relative overflow-hidden">
          <h1 class="text-3xl sm:text-4xl font-black mb-2">${titleMsg}</h1>
          <p class="text-white/90 text-sm sm:text-base font-medium max-w-md mx-auto mb-6">${subMsg}</p>

          <div class="bg-white/20 backdrop-blur-md rounded-2xl p-4 inline-flex items-center gap-6 border border-white/30">
            <div>
              <span class="text-xs uppercase font-extrabold tracking-wider text-white/80 block">Seu resultado</span>
              <span class="text-3xl font-black text-white">${correctCount} / ${total}</span>
            </div>
            <div class="h-10 w-px bg-white/30"></div>
            <div>
              <span class="text-xs uppercase font-extrabold tracking-wider text-white/80 block">Aproveitamento</span>
              <span class="text-3xl font-black text-white">${percent}%</span>
            </div>
          </div>
        </div>

        <!-- Análise Detalhada -->
        <div class="bg-white rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-md space-y-6">
          <h2 class="text-lg font-bold text-gray-800 flex items-center gap-2">
            <span>📊</span> Análise de Desempenho
          </h2>

          <div class="grid grid-cols-2 gap-4">
            <div class="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 flex items-center gap-3">
              <span class="text-2xl">✅</span>
              <div>
                <span class="text-xs font-semibold text-emerald-700 block">Acertos</span>
                <span class="text-xl font-black text-emerald-800">${correctCount} questões</span>
              </div>
            </div>
            <div class="bg-rose-50 p-4 rounded-2xl border border-rose-200 flex items-center gap-3">
              <span class="text-2xl">❌</span>
              <div>
                <span class="text-xs font-semibold text-rose-700 block">Erros</span>
                <span class="text-xl font-black text-rose-800">${wrongCount} questões</span>
              </div>
            </div>
          </div>

          <!-- Erros por Assunto -->
          <div>
            <h3 class="text-sm font-bold text-gray-700 mb-3">Detalhamento dos Erros por Assunto:</h3>
            <div class="space-y-2">
              ${[
                "Tecido epitelial de revestimento",
                "Tecido epitelial glandular",
                "Células do tecido conjuntivo",
                "Fibras do tecido conjuntivo",
                "Classificação dos tecidos conjuntivos"
              ].map(t => {
                const count = examErrorsByTopic[t] || 0;
                return `
                  <div class="flex items-center justify-between p-3 rounded-xl ${count > 0 ? 'bg-rose-50/70 border border-rose-100' : 'bg-gray-50 border border-gray-100'}">
                    <span class="text-xs sm:text-sm font-semibold text-gray-800">${t}</span>
                    <span class="text-xs font-bold ${count > 0 ? 'text-rose-600 bg-rose-100 px-2.5 py-0.5 rounded-full' : 'text-emerald-600 bg-emerald-100 px-2.5 py-0.5 rounded-full'}">
                      ${count > 0 ? `${count} erro(s)` : '0 erros ✨'}
                    </span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Botões de Ação -->
          <div class="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-gray-100">
            ${wrongQuestionsList.length > 0 ? `
              <button onclick='app.startReviewWrongExamQuestions(${JSON.stringify(wrongQuestionsList).replace(/'/g, "&apos;")})' 
                class="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-extrabold rounded-2xl shadow-md transition">
                📚 REVISAR QUESTÕES ERRADAS
              </button>
            ` : ''}

            <button onclick="app.startExamSimulation()" 
              class="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-extrabold rounded-2xl shadow-md transition">
              🔄 NOVO SIMULADO
            </button>
          </div>
        </div>

        <!-- CARD DA RECOMPENSA ❤️🎁 -->
        <div class="bg-white rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-xl text-center">
          ${unlockedReward ? `
            <div class="space-y-4">
              <span class="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full font-extrabold text-xs">
                🎉 RECOMPENSA DESBLOQUEADA!
              </span>
              <h3 class="text-2xl font-black text-gray-800">Parabéns! Você atingiu a meta de ${minScorePercent}%! ❤️</h3>
              <p class="text-sm text-gray-600">Seu esforço e dedicação merecem um presente especial.</p>
              
              <button onclick="app.renderRewardScreen()" 
                class="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-black rounded-2xl shadow-xl transform transition hover:scale-105 animate-pulse text-lg">
                <span>🎁</span> DESBLOQUEAR MEU PRESENTE
              </button>
            </div>
          ` : `
            <div class="space-y-4">
              <h3 class="text-xl font-bold text-gray-800">Você ficou pertinho! ❤️</h3>
              <p class="text-sm text-gray-600">
                Você precisa de <strong class="text-rose-600">${minScorePercent}%</strong> no Simulado para desbloquear seu presente especial.
              </p>
              <div class="inline-block bg-rose-50 px-4 py-2 rounded-xl text-rose-700 text-xs font-bold border border-rose-200">
                Seu resultado: ${percent}% • Faltaram apenas ${minScorePercent - percent}%!
              </div>

              <div class="flex justify-center gap-3 pt-2">
                <button onclick="app.startExamSimulation()" 
                  class="px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white font-extrabold rounded-2xl shadow-md transition">
                  🔄 TENTAR NOVAMENTE
                </button>
              </div>
            </div>
          `}
        </div>

      </div>
    `;
  }

  // TELA DA RECOMPENSA ESPECIAL (PRESENTE 🎁 + WHATSAPP)
  renderRewardScreen() {
    this.mode = 'reward';
    if (window.SoundFX) window.SoundFX.playFanfare();

    const mainContainer = document.getElementById('app-content');
    if (!mainContainer) return;

    const phone = window.CONFIG ? window.CONFIG.WHATSAPP_NUMBER : "5511999999999";
    const msg = encodeURIComponent("EU QUERO O PRESENTE!!! 🎁❤️");
    const waUrl = `https://wa.me/${phone}?text=${msg}`;

    // Lançar partículas de confetti
    this.launchConfetti();

    mainContainer.innerHTML = `
      <div class="max-w-2xl mx-auto bg-gradient-to-b from-rose-500 via-pink-500 to-purple-600 rounded-3xl p-8 sm:p-12 text-white text-center shadow-2xl relative overflow-hidden">
        
        <!-- Elementos decorativos em background -->
        <div class="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent pointer-events-none"></div>

        <div class="relative z-10 space-y-6">
          <span class="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-black tracking-widest uppercase text-white shadow-xs">
            🎉 PARABÉNS! VOCÊ CONSEGUIU! 🎉
          </span>

          <h1 class="text-3xl sm:text-5xl font-black tracking-tight">
            Você é incrível! ❤️
          </h1>

          <p class="text-rose-100 text-sm sm:text-lg max-w-md mx-auto leading-relaxed">
            Você atingiu mais de 80% de aproveitamento no Simulado da Prova de Histologia. Todo o seu esforço merece ser comemorado!
          </p>

          <!-- Caixa de Presente Animada -->
          <div class="py-6">
            <div class="w-32 h-32 sm:w-40 sm:h-40 bg-white/20 backdrop-blur-md rounded-3xl mx-auto flex items-center justify-center text-7xl sm:text-8xl shadow-2xl border border-white/30 transform hover:rotate-6 transition duration-300 animate-bounce cursor-pointer">
              🎁
            </div>
            <p class="text-xs text-rose-100 font-semibold mt-4">Seu esforço merece uma recompensa ❤️</p>
          </div>

          <!-- Botão de Resgate no WhatsApp -->
          <a href="${waUrl}" target="_blank" rel="noopener noreferrer" 
            class="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-lg rounded-2xl shadow-xl transform transition hover:-translate-y-1 active:translate-y-0">
            <span>🎁</span> QUERO MEU PRESENTE
          </a>

          <div class="pt-4">
            <button onclick="app.renderHome()" 
              class="text-xs font-bold text-white/80 hover:text-white underline">
              Voltar ao Painel Principal
            </button>
          </div>
        </div>

      </div>
    `;
  }

  launchConfetti() {
    // Motor simples de partículas em canvas se não houver biblioteca externa
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '99999';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#f43f5e', '#ec4899', '#a855f7', '#3b82f6', '#10b981', '#f59e0b'];

    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        vy: Math.random() * 3 + 2,
        vx: Math.random() * 2 - 1,
        angle: Math.random() * 360,
        spin: Math.random() * 0.2 - 0.1
      });
    }

    let startTime = performance.now();

    function render(now) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.y += p.vy;
        p.x += p.vx;
        p.angle += p.spin;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });

      if (now - startTime < 4500) {
        requestAnimationFrame(render);
      } else {
        canvas.remove();
      }
    }

    requestAnimationFrame(render);
  }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  window.app = new HistoZooApp();
});
