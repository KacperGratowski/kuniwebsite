/**
 * Last.fm API Widget for Kuni_MLB Website
 * Displays currently playing track from Spotify via Last.fm API
 */

class LastFmWidget {
  constructor(options) {
    this.apiKey = options.apiKey;
    this.user = options.user;
    this.containerSelector = options.containerSelector;
    this.updateInterval = options.updateInterval || 30000; // 30 seconds default
    this.container = document.querySelector(this.containerSelector);
    this.currentTrack = null;
    this.isPlaying = false;
    this.imageElement = options.imageElement || null;
    this.translations = {
      pl: {
        nowPlaying: "Teraz słucham",
        lastPlayed: "Ostatnio słuchałem",
        notPlaying: "Nic nie gram",
        by: "przez"
      },
      en: {
        nowPlaying: "Now Playing",
        lastPlayed: "Last Played",
        notPlaying: "Not Playing",
        by: "by"
      },
      fr: {
        nowPlaying: "En écoute",
        lastPlayed: "Écouté récemment",
        notPlaying: "Pas de musique",
        by: "par"
      }
    };
    
    this.init();
  }
  
  init() {
    if (!this.container) {
      console.error('Last.fm widget container not found');
      return;
    }
    
    // Create the widget HTML structure
    this.createWidgetStructure();
    
    // Start fetching data
    this.fetchNowPlaying();
    
    // Set update interval
    setInterval(() => {
      this.fetchNowPlaying();
    }, this.updateInterval);
    
    // Listen for language changes
    document.addEventListener('languageChanged', (e) => {
      this.updateTranslations(e.detail.language);
    });
  }
  
  createWidgetStructure() {
    // Main widget container
    this.container.classList.add('now-playing-widget');
    
    // Widget content wrapper
    const widgetContent = document.createElement('div');
    widgetContent.classList.add('now-playing-content');
    
    // Widget image container (for the provided image)
    if (this.imageElement) {
      const imageContainer = document.createElement('div');
      imageContainer.classList.add('now-playing-image');
      imageContainer.appendChild(this.imageElement);
      this.container.appendChild(imageContainer);
    } else {
      // Create a default image from the provided attachment
      const imageContainer = document.createElement('div');
      imageContainer.classList.add('now-playing-image');
      
      const img = document.createElement('img');
      img.src = 'img/now_playing_adrien.png'; // Path to the provided image
      img.alt = 'Adrien with headphones';
      
      imageContainer.appendChild(img);
      this.container.appendChild(imageContainer);
    }
    
    // Status element (Now Playing/Last Played text)
    const statusElement = document.createElement('div');
    statusElement.classList.add('now-playing-status');
    statusElement.textContent = this.translations.pl.notPlaying;
    this.statusElement = statusElement;
    widgetContent.appendChild(statusElement);
    
    // Track info container
    const trackInfo = document.createElement('div');
    trackInfo.classList.add('now-playing-track');
    
    // Album artwork
    const artwork = document.createElement('div');
    artwork.classList.add('now-playing-artwork');
    const albumImg = document.createElement('img');
    albumImg.src = 'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png'; // Default Last.fm image
    albumImg.alt = 'Album artwork';
    this.albumArtwork = albumImg;
    artwork.appendChild(albumImg);
    trackInfo.appendChild(artwork);
    
    // Track details
    const details = document.createElement('div');
    details.classList.add('now-playing-details');
    
    const trackName = document.createElement('div');
    trackName.classList.add('now-playing-song');
    this.trackNameElement = trackName;
    details.appendChild(trackName);
    
    const artistName = document.createElement('div');
    artistName.classList.add('now-playing-artist');
    this.artistNameElement = artistName;
    details.appendChild(artistName);
    
    trackInfo.appendChild(details);
    widgetContent.appendChild(trackInfo);
    
    // Spotify link
    const spotifyLink = document.createElement('a');
    spotifyLink.classList.add('now-playing-spotify-link');
    spotifyLink.target = '_blank';
    spotifyLink.innerHTML = '<i class="fab fa-spotify"></i>';
    this.spotifyLinkElement = spotifyLink;
    widgetContent.appendChild(spotifyLink);
    
    this.container.appendChild(widgetContent);
    
    // Add animation for the notes
    const notesContainer = document.createElement('div');
    notesContainer.classList.add('music-notes-container');
    
    // Create musical notes
    for (let i = 0; i < 3; i++) {
      const note = document.createElement('div');
      note.classList.add('music-note');
      note.innerHTML = '<i class="fas fa-music"></i>';
      note.style.animationDelay = `${i * 0.5}s`;
      notesContainer.appendChild(note);
    }
    
    this.container.appendChild(notesContainer);
    this.notesContainer = notesContainer;
  }
  
  async fetchNowPlaying() {
    try {
      const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${this.user}&api_key=${this.apiKey}&format=json&limit=1`;
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.message);
      }
      
      this.processTrackData(data);
    } catch (error) {
      console.error('Error fetching Last.fm data:', error);
      this.showErrorState();
    }
  }
  
  processTrackData(data) {
    if (!data.recenttracks || !data.recenttracks.track || data.recenttracks.track.length === 0) {
      this.showNotPlayingState();
      return;
    }
    
    const track = data.recenttracks.track[0];
    const isNowPlaying = track['@attr'] && track['@attr'].nowplaying === 'true';
    
    // If same track is still playing, don't update the UI
    if (this.currentTrack && 
        this.currentTrack.name === track.name && 
        this.currentTrack.artist === track.artist['#text'] &&
        this.isPlaying === isNowPlaying) {
      return;
    }
    
    // Update current track info
    this.currentTrack = {
      name: track.name,
      artist: track.artist['#text'],
      album: track.album['#text'],
      artwork: this.getBestArtwork(track.image),
      url: track.url
    };
    this.isPlaying = isNowPlaying;
    
    // Update UI
    this.updateUI();
  }
  
  getBestArtwork(images) {
    if (!images || images.length === 0) {
      return 'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png'; // Default Last.fm image
    }
    
    // Get the largest image (usually the last in the array)
    for (let i = images.length - 1; i >= 0; i--) {
      if (images[i]['#text']) {
        return images[i]['#text'];
      }
    }
    
    return 'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png'; // Default Last.fm image
  }
  
  updateUI() {
    if (!this.currentTrack) {
      this.showNotPlayingState();
      return;
    }
    
    // Show or hide music notes animation based on playing status
    if (this.isPlaying) {
      this.notesContainer.style.display = 'block';
    } else {
      this.notesContainer.style.display = 'none';
    }
    
    // Update status text based on current language
    const lang = document.documentElement.getAttribute('lang') || 'pl';
    const translations = this.translations[lang] || this.translations.pl;
    
    this.statusElement.textContent = this.isPlaying ? translations.nowPlaying : translations.lastPlayed;
    
    // Ustaw tekst piosenki i dodaj data-text dla zapętlenia animacji
    this.trackNameElement.textContent = this.currentTrack.name;
    this.trackNameElement.setAttribute('data-text', this.currentTrack.name);
    
    // Dodaj animację przewijania tylko jeśli tekst jest za długi
    setTimeout(() => {
      // Sprawdź czy tekst jest dłuższy niż kontener
      const isTextTooLong = this.trackNameElement.scrollWidth > this.trackNameElement.clientWidth;
      
      if (isTextTooLong && this.isPlaying) {
        this.trackNameElement.classList.add('scrolling');
      } else {
        this.trackNameElement.classList.remove('scrolling');
      }
    }, 100); // Małe opóźnienie aby mieć pewność, że elementy są wyrenderowane
    
    this.artistNameElement.textContent = `${translations.by} ${this.currentTrack.artist}`;
    this.albumArtwork.src = this.currentTrack.artwork;
    this.spotifyLinkElement.href = this.currentTrack.url;
    
    // Add the active class to the container if playing
    if (this.isPlaying) {
      this.container.classList.add('playing');
    } else {
      this.container.classList.remove('playing');
    }
  }
  
  showNotPlayingState() {
    const lang = document.documentElement.getAttribute('lang') || 'pl';
    const translations = this.translations[lang] || this.translations.pl;
    
    this.statusElement.textContent = translations.notPlaying;
    this.trackNameElement.textContent = '—';
    this.trackNameElement.removeAttribute('data-text'); // Usuń atrybut data-text gdy nie ma muzyki
    this.trackNameElement.classList.remove('scrolling'); // Usuń klasę scrolling
    this.artistNameElement.textContent = '—';
    this.albumArtwork.src = 'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png';
    this.spotifyLinkElement.href = '#';
    this.container.classList.remove('playing');
    this.notesContainer.style.display = 'none';
  }
  
  showErrorState() {
    this.statusElement.textContent = 'Error loading Last.fm data';
    this.trackNameElement.textContent = '—';
    this.trackNameElement.removeAttribute('data-text'); // Usuń atrybut data-text przy błędzie
    this.trackNameElement.classList.remove('scrolling'); // Usuń klasę scrolling
    this.artistNameElement.textContent = '—';
    this.container.classList.remove('playing');
    this.notesContainer.style.display = 'none';
  }
  
  updateTranslations(lang) {
    if (!this.translations[lang]) {
      lang = 'pl'; // Default to Polish
    }
    
    // Re-render with new language
    if (this.isPlaying) {
      this.statusElement.textContent = this.translations[lang].nowPlaying;
    } else if (this.currentTrack) {
      this.statusElement.textContent = this.translations[lang].lastPlayed;
    } else {
      this.statusElement.textContent = this.translations[lang].notPlaying;
    }
    
    if (this.currentTrack) {
      this.artistNameElement.textContent = `${this.translations[lang].by} ${this.currentTrack.artist}`;
    }
  }
}

// Initialize the widget when the document is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Create section for now playing widget
  const musicSection = document.getElementById('music');
  if (!musicSection) {
    console.error('Music section not found');
    return;
  }
  
  // Create container for the widget
  const nowPlayingContainer = document.createElement('div');
  nowPlayingContainer.id = 'now-playing-container';
  nowPlayingContainer.className = 'now-playing-container';
  
  // Insert it before the featured song
  const featuredSong = musicSection.querySelector('.featured-song');
  if (featuredSong) {
    featuredSong.parentNode.insertBefore(nowPlayingContainer, featuredSong);
  } else {
    // If no featured song, append to the container
    const container = musicSection.querySelector('.container');
    if (container) {
      container.appendChild(nowPlayingContainer);
    }
  }
  
  // Initialize Last.fm widget
  // Replace 'YOUR_LASTFM_API_KEY' with your actual Last.fm API key
  // Replace 'YOUR_LASTFM_USERNAME' with your Last.fm username
  const lastFmWidget = new LastFmWidget({
    apiKey: '03a0206d850fd37fa7f253f0abdd63ca', // You need to replace this with your Last.fm API key
    user: 'kuni_mlb', // Replace with your Last.fm username
    containerSelector: '#now-playing-container',
    updateInterval: 500 // Update every 0.5 seconds
  });
  
  // Listen for language change events
  document.querySelectorAll('.lang-button').forEach(btn => {
    btn.addEventListener('click', function() {
      const lang = this.classList.contains('pl') ? 'pl' : 
                  this.classList.contains('en') ? 'en' : 'fr';
      
      // Dispatch custom event for language change
      const event = new CustomEvent('languageChanged', {
        detail: { language: lang }
      });
      document.dispatchEvent(event);
    });
  });
});