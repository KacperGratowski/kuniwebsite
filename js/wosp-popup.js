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
  let heartInterval;

  // Lock scroll initially
  document.body.style.overflow = 'hidden';

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
    });

    // Close Popup Logic
    closeBtn.addEventListener('click', closePopup);

    // Close when clicking outside (overlay)
    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        closePopup();
      }
    });
  } else {
    console.error('WOŚP Popup elements not found');
  }
})();
