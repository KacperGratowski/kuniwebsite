document.addEventListener('DOMContentLoaded', function() {
  // ------------- PODSTAWOWE FUNKCJE -------------
  
  // Efekt transformacji po kliknięciu
  document.body.addEventListener('click', function(e) {
    if(e.target.tagName !== 'A' && e.target.tagName !== 'BUTTON') {
      const miracleSpot = document.createElement('div');
      miracleSpot.className = 'transformation-effect';
      miracleSpot.style.left = e.pageX + 'px';
      miracleSpot.style.top = e.pageY + 'px';
      document.body.appendChild(miracleSpot);
      
      setTimeout(() => {
        miracleSpot.remove();
      }, 1000);
    }
  });

  // Płynne przewijanie do sekcji
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  
  // ------------- NOWE FUNKCJE -------------
  
  // Motywy światła/ciemności (Hawkmoth/Miraculous)
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      document.body.classList.toggle('dark-theme');
      
      // Animacja transformacji strony
      const overlay = document.createElement('div');
      overlay.className = 'theme-transition-overlay';
      document.body.appendChild(overlay);
      
      setTimeout(() => {
        overlay.style.opacity = '0';
        setTimeout(() => {
          overlay.remove();
        }, 500);
      }, 500);
      
      // Zachowanie wyboru w local storage
      if (document.body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      } else {
        localStorage.setItem('theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-adjust"></i>';
      }
    });
    
    // Załaduj zapisany motyw
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark-theme');
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
  }
  
  // Animacja akumy
  const akumaButton = document.getElementById('akuma-button');
  if (akumaButton) {
    akumaButton.addEventListener('click', function() {
      const akumaContainer = document.getElementById('akuma-container');
      
      // Tworzymy motyla (akumę)
      const akuma = document.createElement('div');
      akuma.className = 'akuma';
      
      // Losowa pozycja startowa na dole ekranu
      const startPosX = Math.random() * window.innerWidth;
      akuma.style.left = `${startPosX}px`;
      akuma.style.bottom = '0';
      
      akumaContainer.appendChild(akuma);
      
      // Animacja lotu akumy
      const flyPath = [
        { left: `${startPosX}px`, bottom: '0px' },
        { left: `${startPosX + 100}px`, bottom: '200px' },
        { left: `${startPosX - 150}px`, bottom: '350px' },
        { left: `${startPosX + 200}px`, bottom: '500px' },
        { left: `${Math.random() * window.innerWidth}px`, bottom: `${window.innerHeight + 50}px` }
      ];
      
      const flyTiming = {
        duration: 8000,
        iterations: 1,
        easing: 'ease-in-out',
        fill: 'forwards'
      };
      
      akuma.animate(flyPath, flyTiming).onfinish = function() {
        akuma.remove();
      };
    });
  }

  // Animacja liczników
  function animateCounters() {
    const counters = document.querySelectorAll('.count');
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-count'));
      const duration = 2000; // 2 sekundy
      const step = target / (duration / 30); // 30 fps
      let current = 0;
      
      const updateCounter = () => {
        current += step;
        if (current < target) {
          counter.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };
      
      updateCounter();
    });
  }
  
  // Uruchamianie animacji liczników gdy element jest widoczny na ekranie
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.disconnect(); // Animacja tylko raz
      }
    });
  });
  
  const statsCounter = document.querySelector('.stats-counter');
  if (statsCounter) {
    observer.observe(statsCounter);
  }
  
  // Audio player
  const audioPlayer = document.getElementById('miraculous-player');
  const playBtn = document.getElementById('play-btn');
  const progressBar = document.querySelector('.progress-bar');
  const progressContainer = document.querySelector('.progress-container');
  const volumeBtn = document.getElementById('volume-btn');
  
  if (audioPlayer && playBtn) {
    playBtn.addEventListener('click', () => {
      if (audioPlayer.paused) {
        audioPlayer.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
      } else {
        audioPlayer.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
      }
    });
    
    // Aktualizacja paska postępu
    audioPlayer.addEventListener('timeupdate', () => {
      const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
      progressBar.style.width = `${progress}%`;
    });
    
    // Zmiana pozycji odtwarzania
    progressContainer.addEventListener('click', (e) => {
      const width = progressContainer.clientWidth;
      const clickPosition = e.offsetX;
      const jumpToTime = (clickPosition / width) * audioPlayer.duration;
      audioPlayer.currentTime = jumpToTime;
    });
    
    // Obsługa głośności
    let isMuted = false;
    volumeBtn.addEventListener('click', () => {
      if (isMuted) {
        audioPlayer.volume = 1;
        volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        isMuted = false;
      } else {
        audioPlayer.volume = 0;
        volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        isMuted = true;
      }
    });
    
    // Reset po zakończeniu odtwarzania
    audioPlayer.addEventListener('ended', () => {
      playBtn.innerHTML = '<i class="fas fa-play"></i>';
      progressBar.style.width = '0%';
    });
  }
  
  // Wybór supermocy
  const powerBtns = document.querySelectorAll('.power-btn');
  const powerDisplay = document.getElementById('power-display');
  
  if (powerBtns.length && powerDisplay) {
    powerBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const power = this.getAttribute('data-power');
        let content = '';
        
        // Wyczyszczenie klasy aktywnej ze wszystkich przycisków
        powerBtns.forEach(btn => btn.classList.remove('active'));
        // Dodanie klasy aktywnej do klikniętego przycisku
        this.classList.add('active');
        
        switch (power) {
          case 'cataclysm':
            content = `
              <div class="power-animation cataclysm">
                <i class="fas fa-hand-sparkles"></i>
              </div>
              <h4>Kotaklizm</h4>
              <p>Moc zniszczenia każdego dotkniętego obiektu. Używana przez Czarnego Kota.</p>
            `;
            break;
          case 'lucky-charm':
            content = `
              <div class="power-animation lucky-charm">
                <i class="fas fa-magic"></i>
              </div>
              <h4>Szczęśliwy Traf</h4>
              <p>Tworzy obiekt, który pomaga pokonać przeciwnika. Używana przez Biedronkę.</p>
            `;
            break;
          case 'mirage':
            content = `
              <div class="power-animation mirage">
                <i class="fas fa-clone"></i>
              </div>
              <h4>Miraż</h4>
              <p>Tworzy iluzję, która może zmylić przeciwnika. Używana przez Rena Rouge.</p>
            `;
            break;
        }
        
        powerDisplay.innerHTML = content;
      });
    });
  }
  
  // Miraculous Quiz
  const quizBtn = document.getElementById('miraculous-quiz');
  const quizModal = document.getElementById('quiz-modal');
  const closeModal = document.querySelector('.close-modal');
  const quizContent = document.getElementById('modal-quiz-content');
  
  const quizQuestions = [
    {
      question: "Co zrobiłbyś, gdybyś znalazł Miraculum?",
      options: [
        {text: "Natychmiast założył i wypróbował moce!", character: "cat"},
        {text: "Dokładnie przestudiował jego działanie przed użyciem", character: "ladybug"},
        {text: "Znalazł sposób, by zyskać więcej Miraculów", character: "hawkmoth"}
      ]
    },
    {
      question: "Jak zachowujesz się w trudnej sytuacji?",
      options: [
        {text: "Wymyślam sprytny plan", character: "ladybug"},
        {text: "Improwizuję i działam instynktownie", character: "cat"},
        {text: "Obserwuję z dystansu i szukam okazji", character: "hawkmoth"}
      ]
    },
    {
      question: "Co jest dla ciebie najważniejsze?",
      options: [
        {text: "Pomoc innym", character: "ladybug"},
        {text: "Wolność i zabawa", character: "cat"},
        {text: "Osiągnięcie własnych celów", character: "hawkmoth"}
      ]
    }
  ];
  
  let currentCharacter = {
    ladybug: 0,
    cat: 0,
    hawkmoth: 0
  };
  
  let currentQuestion = 0;
  
  if (quizBtn && quizModal && quizContent) {
    quizBtn.addEventListener('click', function() {
      quizModal.style.display = 'flex';
      startQuiz();
    });
    
    closeModal.addEventListener('click', function() {
      quizModal.style.display = 'none';
      currentQuestion = 0;
      currentCharacter = {
        ladybug: 0,
        cat: 0,
        hawkmoth: 0
      };
    });
    
    window.addEventListener('click', function(e) {
      if (e.target === quizModal) {
        quizModal.style.display = 'none';
        currentQuestion = 0;
        currentCharacter = {
          ladybug: 0,
          cat: 0,
          hawkmoth: 0
        };
      }
    });
  }
  
  function startQuiz() {
    showQuestion(currentQuestion);
  }
  
  function showQuestion(index) {
    if (index >= quizQuestions.length) {
      showResult();
      return;
    }
    
    const question = quizQuestions[index];
    let html = `
      <div class="quiz-question">${question.question}</div>
      <div class="quiz-options">
    `;
    
    question.options.forEach((option, i) => {
      html += `<button class="option-btn" data-character="${option.character}">${option.text}</button>`;
    });
    
    html += `</div>`;
    
    quizContent.innerHTML = html;
    
    document.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const character = this.getAttribute('data-character');
        currentCharacter[character]++;
        currentQuestion++;
        showQuestion(currentQuestion);
      });
    });
  }
  
  function showResult() {
    let winner = 'ladybug';
    let maxScore = currentCharacter.ladybug;
    
    if (currentCharacter.cat > maxScore) {
      winner = 'cat';
      maxScore = currentCharacter.cat;
    }
    
    if (currentCharacter.hawkmoth > maxScore) {
      winner = 'hawkmoth';
    }
    
    let resultHTML = '';
    
    switch(winner) {
      case 'ladybug':
        resultHTML = `
          <h3>Jesteś jak Biedronka!</h3>
          <div class="result-image">
            <img src="https://static.wikia.nocookie.net/lady-bug/images/7/7e/Ladybug_Square.png" alt="Biedronka">
          </div>
          <p>Jesteś odpowiedzialny, strategiczny i zawsze myślisz o dobru innych. Masz talent do rozwiązywania problemów i znajdowania kreatywnych rozwiązań!</p>
        `;
        break;
      case 'cat':
        resultHTML = `
          <h3>Jesteś jak Czarny Kot!</h3>
          <div class="result-image">
            <img src="https://static.wikia.nocookie.net/lady-bug/images/1/16/Cat_Noir_Square.png" alt="Czarny Kot">
          </div>
          <p>Jesteś wolnym duchem, zabawny i nieco impulsywny. Twoja lojalność wobec przyjaciół jest niezachwiana, a twoje żarty rozświetlają każdą trudną sytuację!</p>
        `;
        break;
      case 'hawkmoth':
        resultHTML = `
          <h3>Jesteś jak Władca Ciem!</h3>
          <div class="result-image">
            <img src="https://static.wikia.nocookie.net/lady-bug/images/e/ee/Hawk_Moth_Square.png" alt="Władca Ciem">
          </div>
          <p>Jesteś zdeterminowany i skupiony na celu. Potrafisz planować długoterminowo i wykorzystywać nadarzające się okazje. Ale pamiętaj, że cele nie zawsze usprawiedliwiają środki!</p>
        `;
        break;
    }
    
    resultHTML += `<button id="restart-quiz" class="miraculous-button">Rozpocznij ponownie</button>`;
    
    quizContent.innerHTML = resultHTML;
    
    document.getElementById('restart-quiz').addEventListener('click', function() {
      currentQuestion = 0;
      currentCharacter = {
        ladybug: 0,
        cat: 0,
        hawkmoth: 0
      };
      showQuestion(currentQuestion);
    });
  }
  
  // Test zgodności z postacią
  const startQuizButton = document.getElementById('start-quiz');
  const quizContainer = document.getElementById('quiz-container');
  const resultContainer = document.getElementById('quiz-result');
  const questionEl = document.querySelector('.quiz-question');
  const optionsEl = document.querySelector('.quiz-options');
  const nextButton = document.getElementById('next-question');
  const resultImg = document.getElementById('result-img');
  const resultName = document.getElementById('result-name');
  
  // Pytania testu zgodności
  const compatibilityQuestions = [
    {
      question: "Co jest dla ciebie najważniejsze?",
      options: [
        {text: "Rodzina i przyjaciele", points: {marinette: 3, adrien: 2, alya: 3, nino: 2, chloe: 0}},
        {text: "Osobisty sukces", points: {marinette: 1, adrien: 1, alya: 1, nino: 0, chloe: 3}},
        {text: "Prawda i sprawiedliwość", points: {marinette: 2, adrien: 3, alya: 3, nino: 1, chloe: 0}}
      ]
    },
    {
      question: "Jak reagujesz na stres?",
      options: [
        {text: "Wpadaj w panikę, potem znajduję rozwiązanie", points: {marinette: 3, adrien: 1, alya: 0, nino: 1, chloe: 2}},
        {text: "Zachowuję spokój i analizuję sytuację", points: {marinette: 1, adrien: 3, alya: 2, nino: 2, chloe: 0}},
        {text: "Szukam pomocy u innych", points: {marinette: 2, adrien: 1, alya: 1, nino: 3, chloe: 1}}
      ]
    },
    {
      question: "Co robisz w wolnym czasie?",
      options: [
        {text: "Tworzę (rysuję, projektuję, itp.)", points: {marinette: 3, adrien: 1, alya: 1, nino: 2, chloe: 0}},
        {text: "Spędzam czas ze znajomymi", points: {marinette: 2, adrien: 2, alya: 3, nino: 3, chloe: 2}},
        {text: "Doskonalę swoje umiejętności", points: {marinette: 2, adrien: 3, alya: 2, nino: 1, chloe: 1}}
      ]
    }
  ];
  
  let compatibilityResults = {
    marinette: 0,
    adrien: 0,
    alya: 0,
    nino: 0,
    chloe: 0
  };
  
  let currentCompQuestion = 0;
  
  if (startQuizButton) {
    startQuizButton.addEventListener('click', function() {
      this.style.display = 'none';
      quizContainer.style.display = 'block';
      showCompatibilityQuestion(currentCompQuestion);
    });
  }
  
  if (nextButton) {
    nextButton.addEventListener('click', function() {
      currentCompQuestion++;
      if (currentCompQuestion < compatibilityQuestions.length) {
        showCompatibilityQuestion(currentCompQuestion);
      } else {
        showCompatibilityResult();
      }
    });
  }
  
  function showCompatibilityQuestion(index) {
    const question = compatibilityQuestions[index];
    questionEl.textContent = question.question;
    
    optionsEl.innerHTML = '';
    question.options.forEach((option, i) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = option.text;
      btn.addEventListener('click', function() {
        // Usuń klasę active z wszystkich opcji
        document.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('active'));
        // Dodaj klasę active do wybranej opcji
        this.classList.add('active');
        
        // Zaktualizuj wyniki
        for (const character in option.points) {
          compatibilityResults[character] += option.points[character];
        }
        
        // Włącz przycisk dalej
        nextButton.disabled = false;
      });
      optionsEl.appendChild(btn);
    });
    
    // Wyłącz przycisk dalej do momentu wyboru opcji
    nextButton.disabled = true;
  }
  
  function showCompatibilityResult() {
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    
    // Znajdź postać z najwyższym wynikiem
    let maxScore = 0;
    let matchedCharacter = '';
    
    for (const character in compatibilityResults) {
      if (compatibilityResults[character] > maxScore) {
        maxScore = compatibilityResults[character];
        matchedCharacter = character;
      }
    }
    
    // Pokaż wynik
    switch(matchedCharacter) {
      case 'marinette':
        resultImg.src = 'https://static.wikia.nocookie.net/lady-bug/images/9/9d/Marinette_Dupain-Cheng_Square.png';
        resultName.textContent = 'Marinette Dupain-Cheng';
        break;
      case 'adrien':
        resultImg.src = 'https://static.wikia.nocookie.net/lady-bug/images/4/48/Adrien_Agreste_Square.png';
        resultName.textContent = 'Adrien Agreste';
        break;
      case 'alya':
        resultImg.src = 'https://static.wikia.nocookie.net/lady-bug/images/e/e7/Alya_C%C3%A9saire_Square.png';
        resultName.textContent = 'Alya Césaire';
        break;
      case 'nino':
        resultImg.src = 'https://static.wikia.nocookie.net/lady-bug/images/c/c4/Nino_Lahiffe_Square.png';
        resultName.textContent = 'Nino Lahiffe';
        break;
      case 'chloe':
        resultImg.src = 'https://static.wikia.nocookie.net/lady-bug/images/d/dd/Chlo%C3%A9_Bourgeois_Square.png';
        resultName.textContent = 'Chloé Bourgeois';
        break;
    }
  }
  
  // Efekt pisania tekstu dla podpisu
  const signatureElements = document.querySelectorAll('.signature');
  signatureElements.forEach(signature => {
    if (signature.tagName === 'IMG') {
      signature.classList.add('animated-signature');
    }
  });
  
  // Inicjalizacja zmiennych
  let currentLanguage = 'pl'; // Domyślny język
  const languageContent = {};

  // Kompletna definicja tekstów w różnych językach
  languageContent.pl = {
    title: 'Kuni_MLB',
    subtitle: 'Miraculous fan. Programista. Content creator.',
    status: 'Status: taken by agulina1992_2',
    aboutTitle: 'O mnie',
    alliesTitle: 'Moi Sojusznicy',
    alliesIntro: 'Każdy bohater potrzebuje drużyny. Poznaj moich sojuszników, którzy tak jak posiadacze Miraculum, mają wyjątkowe talenty i moce!',
    ally1Name: 'Kromek',
    ally1Role: 'Youtuber & Programista',
    ally1Desc: 'Kromek to taki typ, który łączy w sobie luzaka i technicznego mózga. Jego moc? Montaż i kod – potrafi skleić w całość rzeczy, które wyglądają jak kompletny chaos.',
    ally2Name: 'Des',
    ally2Role: 'Rysownik',
    ally2Desc: 'Des to prawdziwy artystyczny wojownik. Jego kreska to magia, która potrafi zmienić zwykłą kartkę w coś, co żyje. W trudnych czasach był obok, jakby miał w sobie Tikki.',
    ally3Name: 'Suni',
    ally3Role: 'Mistrz Photoshopa',
    ally3Desc: 'Suni to czarodziej od obrazów – serio, jakby miał Miraculum Iluzji. To on pokazał mi, jak wchodzić w świat posterów i grafik. Zawsze obok, jak Luka – spokojny, szczery, niezawodny.',
    ally4Name: 'Jedynek',
    ally4Role: 'Grafik & Twórca Botów',
    ally4Desc: 'Jedynek to taki „techno-mag" – jego Miraculum byłoby pewnie coś w stylu Mechanicznego Serca. Tworzy boty, które działają jak cisi strażnicy, a przy tym ogarnia grafikę z lekkością.',
aboutText1: "Hej, jestem Kuni. Mam 20 lat i na co dzień siedzę w programowaniu – lubię układać kod tak, żeby wszystko działało, rozkminiać problemy i szukać rozwiązań, które czasem wkurzają, a czasem dają niesamowitą satysfakcję. To trochę jak łamigłówki, które nigdy się nie kończą, i właśnie w tym mam frajdę. Ale nie wszystko w moim życiu kręci się wokół technologii. Od lat mam też coś zupełnie innego, co daje mi dużo radości i emocji – świat Miraculous: Biedronka i Czarny Kot. To dla mnie nie tylko kreskówka, ale opowieść, która zawsze potrafi poprawić humor, wzruszyć albo po prostu przenieść w miejsce, gdzie wszystko wydaje się bardziej kolorowe i magiczne. I tak właśnie balansuję między dwoma światami – tym logicznym i technicznym, a tym emocjonalnym i pełnym wyobraźni. Dzięki temu czuję, że jestem po prostu sobą, bez udawania i bez schematów.",
	aboutText2: "Tak, wiem co sobie myślisz. Animacja? Dla dzieci? Tylko spróbuj to powiedzieć na głos – zagryzę cię :D Miraculous to nie tylko kolorowa kreskówka. To historia, która dorasta razem z widzami. Jest pełna emocji, złożonych relacji, samotności, poświęcenia i ciągłej walki o to, by być sobą w świecie, który często każe nam nosić maski – dosłownie i w przenośni. Ten serial towarzyszy mi od lat i stał się częścią mojego życia. Wracam do niego, gdy potrzebuję oddechu, inspiracji albo przypomnienia, że nawet codzienni bohaterowie mogą zmieniać świat. I właśnie za to go kocham.",

    aboutQuote: 'Vox populi vox dei',
    likes: 'polubień',
    views: 'wyświetleń',
    musicTitle: 'Ulubiona muzyka',
    songTitle: 'Lou - Miraculous (French Version)',
    songDesc: 'Tytułowa piosenka z serialu Miraculous',
    listenOn: 'Słuchaj na Spotify',
    charactersTitle: 'Ulubione postacie',
    marinetteName: 'Marinette',
    marinetteDesc: 'Zwykła dziewczyna ze zwykłym życiem...',
    adrienName: 'Adrien',
    adrienDesc: 'Ale ma sekret, o którym nikt nie wie!',
    ladybugName: 'Biedronka',
    catNoirName: 'Czarny Kot',
    ladybugQuote: 'Szczęśliwy traf!',
    catNoirQuote: 'Kotaklizm!',
    copyright: '© 2025 Kuni_MLB. Wszystkie prawa zastrzeżone.',
    easterEggTitle: 'Znalazłeś Sekret Miraculum!',
    easterEggText: 'W pewnym miejscu w Paryżu, starzec o imieniu Wang Fu strzeże sekretów Miraculum. Teraz ty też jesteś częścią tej tajemnicy!',
    close: 'Zamknij',
    akumaBtn: 'Wypuść akumę',
    loadingText: 'Ładowanie...',
    song1Name: 'Enej - Neony',
    song2Name: 'Maanam - Cykady na Cykladach'
  };

  languageContent.en = {
    title: 'Kuni_MLB',
    subtitle: 'Miraculous fan. Developer. Content creator.',
    status: 'Status: taken by agulina1992_2',
    aboutTitle: 'About Me',
    alliesTitle: 'My Allies',
    alliesIntro: 'Every hero needs a team. Meet my allies who, just like Miraculous holders, have unique talents and powers!',
    ally1Name: 'Kromek',
    ally1Role: 'Youtuber & Developer',
    ally1Desc: 'Kromek is the type who combines a laid-back attitude with a technical mind. His power? Editing and coding – he can piece together things that look like complete chaos.',
    ally2Name: 'Des',
    ally2Role: 'Artist',
    ally2Desc: 'Des is a true artistic warrior. His drawing style is magic that can transform a blank page into something alive. In difficult times, he was there, as if he had Tikki inside him.',
    ally3Name: 'Suni',
    ally3Role: 'Photoshop Master',
    ally3Desc: 'Suni is a wizard of images – seriously, as if he had the Miraculous of Illusion. He showed me how to enter the world of posters and graphics. Always there, like Luka – calm, honest, reliable.',
    ally4Name: 'Jedynek',
    ally4Role: 'Graphic Designer & Bot Creator',
    ally4Desc: 'Jedynek is a "techno-mage" – his Miraculous would probably be something like a Mechanical Heart. He creates bots that act as silent guardians, while handling graphics with ease.',
aboutText1: `Hey, I'm Kuni. I'm 20 years old and I spend most of my days programming – I enjoy putting code together so everything works, figuring out problems and finding solutions that sometimes drive me crazy, but other times give me incredible satisfaction. It's kind of like solving puzzles that never really end, and that's exactly where I find the fun.

But not everything in my life is about technology. For years I've also had something completely different that brings me joy and emotions – the world of Miraculous: Ladybug and Cat Noir. For me, it's not just a cartoon, but a story that always manages to cheer me up, move me, or simply take me somewhere more colorful and magical.

That's how I balance between two worlds – the logical and technical one, and the emotional and imaginative one. Thanks to that, I feel like I can just be myself, without pretending and without fitting into any box.`,
aboutText2: "Yeah, I know what you're thinking. Animation? For kids? Say that out loud and I swear – I'll bite you :D Miraculous isn't just a colorful cartoon. It's a story that grows with its audience. It's full of emotions, complex relationships, loneliness, sacrifice, and the constant struggle to be yourself in a world that expects you to wear a mask – sometimes literally, sometimes metaphorically. This show has been a part of my life for years. I come back to it whenever I need a break, some inspiration, or just a reminder that even everyday heroes can make a difference. And that’s exactly why I love it.",

    aboutQuote: 'Vox populi vox dei',
    likes: 'likes',
    views: 'views',
    musicTitle: 'Favorite Music',
    songTitle: 'Lou - Miraculous (French Version)',
    songDesc: 'Theme song from Miraculous',
    listenOn: 'Listen on Spotify',
    charactersTitle: 'Favorite Characters',
    marinetteName: 'Marinette',
    marinetteDesc: 'Just an ordinary girl with an ordinary life...',
    adrienName: 'Adrien',
    adrienDesc: 'But she has a secret that nobody knows yet!',
    ladybugName: 'Ladybug',
    catNoirName: 'Cat Noir',
    ladybugQuote: 'Lucky Charm!',
    catNoirQuote: 'Cataclysm!',
    copyright: '© 2025 Kuni_MLB. All rights reserved.',
    easterEggTitle: 'You Found the Miraculous Secret!',
    easterEggText: 'In a place in Paris, an old man named Wang Fu guards the secrets of the Miraculous. Now you are part of this secret too!',
    close: 'Close',
    akumaBtn: 'Release an akuma',
    loadingText: 'Loading...',
    song1Name: 'Enej - Neons',
    song2Name: 'Maanam - Cicadas on Cyclades'
  };

  languageContent.fr = {
    title: 'Kuni_MLB',
    subtitle: 'Fan de Miraculous. Développeur. Créateur de contenu.',
    status: 'Statut: en couple avec agulina1992_2',
    aboutTitle: 'À Propos de Moi',
    alliesTitle: 'Mes Alliés',
    alliesIntro: 'Chaque héros a besoin d\'une équipe. Rencontrez mes alliés qui, comme les porteurs de Miraculous, ont des talents et des pouvoirs uniques !',
    ally1Name: 'Kromek',
    ally1Role: 'Youtubeur & Programmeur',
    ally1Desc: 'Kromek est le genre qui allie une attitude détendue à un esprit technique. Son pouvoir ? Le montage et le code – il peut assembler des choses qui semblent un chaos complet.',
    ally2Name: 'Des',
    ally2Role: 'Dessinateur',
    ally2Desc: 'Des est un véritable guerrier artistique. Son trait est une magie qui peut transformer une simple page en quelque chose qui vit. Dans les moments difficiles, il était là, comme s\'il avait Tikki en lui.',
    ally3Name: 'Suni',
    ally3Role: 'Maître de Photoshop',
    ally3Desc: 'Suni est un magicien des images – sérieusement, comme s\'il possédait le Miraculous de l\'Illusion. Il m\'a montré comment entrer dans le monde des affiches et des graphismes. Toujours présent, comme Luka – calme, honnête, fiable.',
    ally4Name: 'Jedynek',
    ally4Role: 'Graphiste & Créateur de Bots',
    ally4Desc: 'Jedynek est un "techno-mage" – son Miraculous serait probablement quelque chose comme un Cœur Mécanique. Il crée des bots qui agissent comme des gardiens silencieux, tout en maniant les graphismes avec facilité.',
    aboutText1: "Salut, moi c'est Kuni. J'ai 20 ans et je passe la plupart de mes journées à programmer – j'aime assembler du code pour que tout fonctionne, résoudre des problèmes et trouver des solutions qui parfois m'énervent, mais qui d'autres fois me donnent une énorme satisfaction. C'est un peu comme résoudre des énigmes sans fin, et c'est exactement ça qui me plaît. Mais ma vie ne tourne pas uniquement autour de la technologie. Depuis des années, j'ai aussi quelque chose de totalement différent qui m'apporte de la joie et des émotions – l'univers de Miraculous : Ladybug et Chat Noir. Pour moi, ce n'est pas seulement un dessin animé, mais une histoire qui arrive toujours à me redonner le sourire, à m'émouvoir ou simplement à m'emporter dans un monde plus coloré et magique. C'est comme ça que je trouve mon équilibre entre deux mondes – celui de la logique et de la technique, et celui des émotions et de l'imagination. Et grâce à ça, je peux simplement être moi-même, sans faire semblant et sans rentrer dans un cadre.",
    aboutText2: "Ouais, je sais ce que vous pensez. Un dessin animé ? Pour les enfants ? Répétez ça encore une fois, et je vous mords :D Miraculous, ce n'est pas juste une série colorée. C'est une histoire qui grandit avec son public. Elle regorge d'émotions, de relations complexes, de solitude, de sacrifices, et de cette lutte constante pour rester soi-même dans un monde qui nous oblige souvent à porter un masque – parfois au sens propre, parfois au figuré. Cette série fait partie de ma vie depuis des années. J'y reviens chaque fois que j'ai besoin d'une pause, d'inspiration, ou juste de me rappeler que même les héros du quotidien peuvent changer le monde. Et c'est pour ça que je l'aime autant.",
    aboutQuote: 'Vox populi vox dei',
    likes: 'j\'aimes',
    views: 'vues',
    musicTitle: 'Musique Préférée',
    songTitle: 'Lou - Miraculous (Version Française)',
    songDesc: 'Chanson thème de Miraculous',
    listenOn: 'Écouter sur Spotify',
    charactersTitle: 'Personnages Préférés',
    marinetteName: 'Marinette',
    marinetteDesc: 'Une fille ordinaire, avec une vie ordinaire...',
    adrienName: 'Adrien',
    adrienDesc: 'Mais elle a un secret que personne ne connaît encore!',
    ladybugName: 'Ladybug',
    catNoirName: 'Chat Noir',
    ladybugQuote: 'Lucky Charm!',
    catNoirQuote: 'Cataclysme!',
    copyright: '© 2025 Kuni_MLB. Tous droits réservés.',
    easterEggTitle: 'Vous avez trouvé le secret Miraculous!',
    easterEggText: 'Dans un endroit à Paris, un vieil homme nommé Wang Fu garde les secrets des Miraculous. Maintenant, vous faites aussi partie de ce secret!',
    close: 'Fermer',
    akumaBtn: 'Libérer un akuma',
    loadingText: 'Chargement...',
    song1Name: 'Enej - Néons',
    song2Name: 'Maanam - Cigales aux Cyclades'
    };

  // Funkcja zmieniająca język
  function changeLanguage(lang) {
    // Zapisz aktualnie wybrany język
    currentLanguage = lang;
    
    // Aktualizacja aktywnej klasy dla przycisków języka
    document.querySelectorAll('.lang-button').forEach(btn => {
      btn.classList.remove('active');
    });
    document.querySelector(`.lang-button.${lang}`).classList.add('active');
    
    // Zapisanie preferencji języka w localStorage
    localStorage.setItem('miraculous-language', lang);
    
    // Aktualizacja wszystkich elementów z klasą data-lang
    document.querySelectorAll('[data-lang]').forEach(el => {
      const key = el.getAttribute('data-lang');
      if (languageContent[lang][key]) {
        el.innerHTML = languageContent[lang][key];
      }
    });
    
    // Aktualizacja tytułu strony
    document.title = `Miraculous | ${languageContent[lang].title}`;
    
    // Efekt transformacji przy zmianie języka
    const transformEffect = document.createElement('div');
    transformEffect.className = 'transformation-effect language-transform';
    transformEffect.style.left = '50%';
    transformEffect.style.top = '50%';
    document.body.appendChild(transformEffect);
    
    setTimeout(() => {
      transformEffect.remove();
    }, 1000);
  }

  // Inicjalizacja stylu przycisków motylkowych
  function setupButterflyButtons() {
    // Zamień zwykłe przyciski na stylizowane
    const akumaButton = document.getElementById('akuma-button');
    if (akumaButton) {
      akumaButton.className = 'butterfly-btn';
      akumaButton.setAttribute('data-lang', 'akumaBtn');
    }
  }

  // Dodanie przycisków języka do strony
  function setupLanguagePanel() {
    const langPanel = document.createElement('div');
    langPanel.className = 'language-panel';
    
    const langPL = document.createElement('button');
    langPL.className = 'lang-button pl';
    langPL.title = 'Polski';
    langPL.addEventListener('click', () => changeLanguage('pl'));
    
    const langEN = document.createElement('button');
    langEN.className = 'lang-button en';
    langEN.title = 'English';
    langEN.addEventListener('click', () => changeLanguage('en'));
    
    const langFR = document.createElement('button');
    langFR.className = 'lang-button fr';
    langFR.title = 'Français';
    langFR.addEventListener('click', () => changeLanguage('fr'));
    
    langPanel.appendChild(langPL);
    langPanel.appendChild(langEN);
    langPanel.appendChild(langFR);
    
    document.body.appendChild(langPanel);
  }

  // Dodanie atrybutów data-lang do elementów, które chcemy tłumaczyć
  function addLanguageAttributes() {
    const elementsToTranslate = [
      { selector: '.miraculous-title', key: 'title' },
      { selector: '.miraculous-subtitle', key: 'subtitle' },
      { selector: '.miraculous-status p', key: 'status' },
      { selector: '#about .section-title', key: 'aboutTitle' },
      { selector: '#about .about-text p:first-child', key: 'aboutText1' },
      { selector: '#about .about-text p:nth-child(2)', key: 'aboutText2' },
      { selector: '.about-text .quote', key: 'aboutQuote' },
      { selector: '#allies .section-title', key: 'alliesTitle' },
      { selector: '#allies .allies-intro', key: 'alliesIntro' },
      { selector: '#allies .ally-card:nth-child(1) .ally-info h3', key: 'ally1Name' },
      { selector: '#allies .ally-card:nth-child(1) .ally-role', key: 'ally1Role' },
      { selector: '#allies .ally-card:nth-child(1) .ally-desc', key: 'ally1Desc' },
      { selector: '#allies .ally-card:nth-child(2) .ally-info h3', key: 'ally2Name' },
      { selector: '#allies .ally-card:nth-child(2) .ally-role', key: 'ally2Role' },
      { selector: '#allies .ally-card:nth-child(2) .ally-desc', key: 'ally2Desc' },
      { selector: '#allies .ally-card:nth-child(3) .ally-info h3', key: 'ally3Name' },
      { selector: '#allies .ally-card:nth-child(3) .ally-role', key: 'ally3Role' },
      { selector: '#allies .ally-card:nth-child(3) .ally-desc', key: 'ally3Desc' },
      { selector: '#allies .ally-card:nth-child(4) .ally-info h3', key: 'ally4Name' },
      { selector: '#allies .ally-card:nth-child(4) .ally-role', key: 'ally4Role' },
      { selector: '#allies .ally-card:nth-child(4) .ally-desc', key: 'ally4Desc' },

      { selector: '#music .section-title', key: 'musicTitle' },
      { selector: '.song-details h3', key: 'songTitle' },
      { selector: '.song-details p', key: 'songDesc' },
      { selector: '.spotify-button', key: 'listenOn' },
      { selector: '#characters .section-title', key: 'charactersTitle' },
      { selector: '.character-card.marinette .card-front h3', key: 'marinetteName' },
      { selector: '.character-card.marinette .card-back p', key: 'ladybugQuote' },
      { selector: '.character-card.adrien .card-front h3', key: 'adrienName' },
      { selector: '.character-card.adrien .card-back p', key: 'catNoirQuote' },
      { selector: '.character-card.marinette .card-back h3', key: 'ladybugName' },
      { selector: '.character-card.adrien .card-back h3', key: 'catNoirName' },
      { selector: 'footer p', key: 'copyright' },
      { selector: '.easter-egg-title', key: 'easterEggTitle' },
      { selector: '.easter-egg-content p', key: 'easterEggText' },
      { selector: '.easter-egg-close', key: 'close' },
      { selector: '.loader-text', key: 'loadingText' },
      { selector: '.song-card:first-child .song-overlay h4', key: 'song1Name' },
      { selector: '.song-card:nth-child(2) .song-overlay h4', key: 'song2Name' }
    ];
    
    elementsToTranslate.forEach(item => {
      const element = document.querySelector(item.selector);
      if (element) {
        element.setAttribute('data-lang', item.key);
      }
    });
  }

  // Funkcja do generowania losowych akum
  function setupAkumaEffect() {
    const akumaButton = document.getElementById('akuma-button');
    const akumaContainer = document.getElementById('akuma-container');
    
    if (akumaButton && akumaContainer) {
      akumaButton.addEventListener('click', function() {
        for (let i = 0; i < 10; i++) {
          setTimeout(() => {
            const akuma = document.createElement('div');
            akuma.className = 'akuma';
            akuma.style.left = `${Math.random() * 100}%`;
            akuma.style.animationDuration = `${15 + Math.random() * 10}s`;
            akumaContainer.appendChild(akuma);
            
            setTimeout(() => {
              akuma.remove();
            }, 20000);
          }, i * 500);
        }
      });
    }
  }

  // Funkcja inicjalizująca
  function init() {
    setupButterflyButtons();
    setupLanguagePanel();
    addLanguageAttributes();
    setupAkumaEffect();
    
    // Sprawdź, czy użytkownik miał wcześniej ustawiony język
    const savedLanguage = localStorage.getItem('miraculous-language');
    if (savedLanguage && ['pl', 'en', 'fr'].includes(savedLanguage)) {
      changeLanguage(savedLanguage);
    } else {
      // Domyślny język - polski
      changeLanguage('pl');
    }
  }

  // Uruchom inicjalizację
  init();
});