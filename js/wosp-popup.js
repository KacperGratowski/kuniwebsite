(function() {
  // Redirect /eskarbonka
  if (window.location.href.includes('/eskarbonka') || window.location.hash === '#eskarbonka') {
    window.location.href = 'https://eskarbonka.wosp.org.pl/gugijujely';
    return;
  }

  const popup = document.getElementById('wosp-popup');
  const startScreen = document.getElementById('wosp-start-screen');
  const startBtn = document.getElementById('wosp-start-btn');
  const closeBtn = document.getElementById('wosp-close');
  const audio = document.getElementById('wosp-audio');
  const canTrigger = document.getElementById('wosp-can-trigger');
  const timerEl = document.getElementById('wosp-timer');
  const shareBtn = document.getElementById('wosp-share-btn');
  const donateBtn = document.querySelector('.wosp-donate-btn') || document.querySelector('.wosp-action-button');
  let heartInterval;
  let messageInterval;
  let countdownInterval;

  // Lock scroll initially
  document.body.style.overflow = 'hidden';

  // Hide can trigger initially
  if (canTrigger) {
    canTrigger.style.opacity = '0';
    canTrigger.style.pointerEvents = 'none';
    canTrigger.style.transform = 'translateY(100px)'; // Slide down
  }

  function stopAudio() {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }

  function playAudio() {
    if (audio) {
      audio.volume = 0.5;
      audio.play().catch(e => console.log("Audio play failed:", e));
    }
  }

  function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('wosp-floating-heart');
    
    const img = document.createElement('img');
    img.src = 'https://s-eskarbonka.wosp.org.pl/icon/wosp-logo.svg';
    img.style.width = '100%';
    img.style.height = '100%';
    heart.appendChild(img);
    
    // Random properties
    const size = Math.random() * 30 + 20; // 20-50px
    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 3 + 4) + 's'; // 4-7s
    
    document.body.appendChild(heart);
    
    // Cleanup
    setTimeout(() => {
      heart.remove();
    }, 7000);
  }

  function startHearts() {
    // Create a heart every 400ms
    heartInterval = setInterval(createHeart, 400);
  }

  function updateCountdown() {
    if (!timerEl) return;
    // Target: 34. Finał WOŚP - 25 stycznia 2026 (Last Sunday of Jan)
    const targetDate = new Date('2026-01-25T00:00:00').getTime();
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      timerEl.innerHTML = "GRAMY!";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    
    timerEl.innerHTML = `${days} dni ${hours} godz ${minutes} min`;
  }

  async function fetchStats() {
    try {
      // Używamy proxy (allorigins), aby ominąć blokadę CORS
      // Serwer WOŚP blokuje bezpośrednie zapytania z przeglądarki
      const targetUrl = 'https://eskarbonka.wosp.org.pl/gugijujely/stats';
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}&timestamp=${new Date().getTime()}`;

      const response = await fetch(proxyUrl);
      if (!response.ok) throw new Error('Network response was not ok');
      
      const data = await response.json();
      // Expected: {"amount":123,"donations_count":5}
      
      const amountEl = document.getElementById('wosp-amount');
      const donationsEl = document.getElementById('wosp-donations');
      const goalTargetEl = document.getElementById('wosp-goal-target');
      const goalPercentEl = document.getElementById('wosp-goal-percent');
      const progressFillEl = document.getElementById('wosp-progress-fill');
      
      if (amountEl) {
        amountEl.textContent = data.amount + ' PLN';
      }
      if (donationsEl) {
        donationsEl.textContent = data.donations_count;
      }

      // Calculate Goal (Dynamic)
      // If amount is 120, goal is 200. If 800, goal is 1000.
      let currentAmount = parseFloat(data.amount);
      let goal = 100;
      if (currentAmount >= 100) goal = 500;
      if (currentAmount >= 500) goal = 1000;
      if (currentAmount >= 1000) goal = 2000;
      if (currentAmount >= 2000) goal = 5000;
      if (currentAmount >= 5000) goal = Math.ceil((currentAmount + 1000) / 1000) * 1000;

      if (goalTargetEl) goalTargetEl.textContent = goal;
      
      if (progressFillEl && goalPercentEl) {
        let percent = (currentAmount / goal) * 100;
        if (percent > 100) percent = 100;
        progressFillEl.style.width = percent + '%';
        goalPercentEl.textContent = Math.floor(percent) + '%';
      }
      
    } catch (error) {
      console.log('Could not fetch WOŚP stats:', error);
      const amountEl = document.getElementById('wosp-amount');
      const donationsEl = document.getElementById('wosp-donations');
      if (amountEl) amountEl.textContent = '---';
      if (donationsEl) donationsEl.textContent = '---';
    }
  }

  function fireConfetti() {
    const colors = ['#F80000', '#ffffff', '#FFD700', '#000000'];
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.style.position = 'fixed';
      confetti.style.width = Math.random() * 10 + 5 + 'px';
      confetti.style.height = Math.random() * 5 + 5 + 'px';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = '50%';
      confetti.style.top = '50%';
      confetti.style.zIndex = '20002';
      confetti.style.pointerEvents = 'none';
      
      // Random direction
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 10 + 5;
      const tx = Math.cos(angle) * 200 * Math.random();
      const ty = Math.sin(angle) * 200 * Math.random();
      const rot = Math.random() * 360;

      confetti.style.transition = 'all 1s ease-out';
      
      document.body.appendChild(confetti);

      // Animate
      requestAnimationFrame(() => {
        confetti.style.transform = `translate(${tx}px, ${ty}px) rotate(${rot}deg)`;
        confetti.style.opacity = '0';
      });

      setTimeout(() => confetti.remove(), 1000);
    }
  }

  function rotateMessages() {
    if (!canTrigger) return;
    const bubble = canTrigger.querySelector('.wosp-speech-bubble');
    if (!bubble) return;

    const messages = [
      "Pomóż dzieciom! 🐞",
      "Wrzuć do puszki! ❤️",
      "Gramy z WOŚP! 🎸",
      "Siema! 👋",
      "Każdy grosz się liczy! 💰",
      "Bądź bohaterem! 🦸‍♀️"
    ];
    let index = 0;

    messageInterval = setInterval(() => {
      index = (index + 1) % messages.length;
      bubble.textContent = messages[index];
    }, 4000); // Change every 4s (sync with CSS animation roughly)
  }

  function stopHearts() {
    clearInterval(heartInterval);
    document.querySelectorAll('.wosp-floating-heart').forEach(h => h.remove());
  }

  function closePopup() {
    popup.classList.remove('show');
    stopAudio();
    stopHearts();
    document.body.style.overflow = ''; // Unlock scroll
  }

  if (popup && closeBtn && startScreen && startBtn) {
    // Start screen is shown by default in HTML (class="show")
    
    // Handle Start Button Click
    startBtn.addEventListener('click', () => {
      startScreen.classList.remove('show');
      popup.classList.add('show');
      playAudio();
      startHearts();
      
      // Start Countdown
      updateCountdown();
      countdownInterval = setInterval(updateCountdown, 60000); // Update every minute

      // Show can trigger with animation
      if (canTrigger) {
        setTimeout(() => {
            canTrigger.style.opacity = '1';
            canTrigger.style.pointerEvents = 'auto';
            canTrigger.style.transform = 'translateY(0)';
            rotateMessages();
        }, 500);
      }
    });

    // Close Popup Logic
    closeBtn.addEventListener('click', closePopup);

    // Close when clicking outside (overlay)
    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        closePopup();
      }
    });

    // Share Button Logic
    if (shareBtn) {
      shareBtn.addEventListener('click', async () => {
        const shareData = {
          title: 'Gram z WOŚP!',
          text: 'Dołącz do mnie i wesprzyj 34. Finał WOŚP! Gramy dla onkologii i hematologii dziecięcej. 🐞❤️',
          url: 'https://eskarbonka.wosp.org.pl/gugijujely'
        };

        try {
          if (navigator.share) {
            await navigator.share(shareData);
          } else {
            // Fallback to clipboard
            await navigator.clipboard.writeText(shareData.url);
            const originalIcon = shareBtn.innerHTML;
            shareBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
            setTimeout(() => {
              shareBtn.innerHTML = originalIcon;
            }, 2000);
          }
        } catch (err) {
          console.log('Error sharing:', err);
        }
      });
    }

    // Donate Button Confetti
    if (donateBtn) {
      donateBtn.addEventListener('click', fireConfetti);
    }

    // Trigger Button Logic
    if (canTrigger) {
      canTrigger.addEventListener('click', () => {
        // Ensure start screen is hidden if it was somehow still there
        if (startScreen.classList.contains('show')) {
            startScreen.classList.remove('show');
        }
        popup.classList.add('show');
        playAudio();
        startHearts();
        document.body.style.overflow = 'hidden';
      });
    }
    
    // Fetch stats immediately
    fetchStats();

  } else {
    console.error('WOŚP Popup elements not found');
  }
})();
