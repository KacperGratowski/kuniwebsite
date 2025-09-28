// Translations object
const translations = {
  // Menu items
  "about": {
    "pl": "O mnie",
    "en": "About me",
    "fr": "À propos de moi"
  },
  "music": {
    "pl": "Muzyka",
    "en": "Music",
    "fr": "Musique"
  },
  "characters": {
    "pl": "Postacie",
    "en": "Characters",
    "fr": "Personnages"
  },
  "allies": {
    "pl": "Sojusznicy",
    "en": "Allies",
    "fr": "Alliés"
  },
  "alliesDesc": {
    "pl": "Każdy bohater potrzebuje drużyny. Poznaj moich sojuszników, którzy tak jak posiadacze Miraculum, mają wyjątkowe talenty i moce!",
    "en": "Every hero needs a team. Meet my allies who, just like Miraculous holders, have unique talents and powers!",
    "fr": "Chaque héros a besoin d'une équipe. Rencontrez mes alliés qui, comme les porteurs de Miraculous, ont des talents et des pouvoirs uniques !"
  },
  "scrollIndicator": {
    "pl": "← Przewiń →",
    "en": "← Scroll →",
    "fr": "← Défiler →"
  }
};

// Function to change language
function changeLanguage(languageCode) {
  // Update language buttons active state
  document.querySelectorAll('.lang-button').forEach(button => {
    button.classList.remove('active');
  });
  document.querySelector(`.lang-button.${languageCode}`).classList.add('active');
  
  // Update all elements with data-translate attribute
  document.querySelectorAll('[data-translate]').forEach(element => {
    const key = element.getAttribute('data-translate');
    if (translations[key]) {
      const translatedText = translations[key][languageCode];
      if (translatedText) {
        element.textContent = translatedText;
      }
    }
  });
  
  // Aktualizacja atrybutów title dla kwami (dostępność)
  updateKwamiTitles(languageCode);
  
  // Store selected language in localStorage
  localStorage.setItem('selectedLanguage', languageCode);
}

// Funkcja do aktualizacji atrybutów title dla kwami w zależności od języka
function updateKwamiTitles(languageCode) {
  const kwamiTitles = {
    "hero": {
      "pl": "Strona główna",
      "en": "Home",
      "fr": "Accueil"
    },
    "about": {
      "pl": "O mnie",
      "en": "About me",
      "fr": "À propos de moi"
    },
    "music": {
      "pl": "Muzyka",
      "en": "Music",
      "fr": "Musique"
    },
    "characters": {
      "pl": "Ulubione postacie",
      "en": "Favorite characters",
      "fr": "Personnages préférés"
    },
    "allies": {
      "pl": "Moi Sojusznicy",
      "en": "My Allies",
      "fr": "Mes Alliés"
    }
  };
  
  document.querySelectorAll('.kwami').forEach(kwami => {
    const section = kwami.getAttribute('data-section');
    if (section && kwamiTitles[section]) {
      kwami.setAttribute('title', kwamiTitles[section][languageCode]);
      // Aktualizacja alt dla obrazka
      const img = kwami.querySelector('img');
      if (img) {
        const kwamiName = img.getAttribute('alt').split(' - ')[0];
        img.setAttribute('alt', `${kwamiName} - ${kwamiTitles[section][languageCode]}`);
      }
    }
  });
}

// Initialize language from localStorage or default to Polish
document.addEventListener('DOMContentLoaded', function() {
  const savedLanguage = localStorage.getItem('selectedLanguage') || 'pl';
  changeLanguage(savedLanguage);
  
  // Add event listeners to language buttons
  document.querySelectorAll('.lang-button').forEach(button => {
    button.addEventListener('click', function() {
      // Pobierz kod języka z klasy przycisku (pl, en, fr)
      const lang = this.classList[1]; // Druga klasa to kod języka
      changeLanguage(lang);
    });
  });
});