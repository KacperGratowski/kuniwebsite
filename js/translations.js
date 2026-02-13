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
  // Alliés
  "kromekRole": {
    "pl": "Youtuber & Programista",
    "en": "YouTuber & Programmer",
    "fr": "YouTuber & Programmeur"
  },
  "kromekDesc": {
    "pl": "Kromek to taki typ, który łączy w sobie luzaka i technicznego mózga. Jego moc? Montaż i kod – potrafi skleić w całość rzeczy, które wyglądają jak kompletny chaos.",
    "en": "Kromek is the type who combines a chill vibe with a tech brain. His power? Editing and code – he can piece together things that look like complete chaos.",
    "fr": "Kromek est le genre de personne qui allie une ambiance détendue à un esprit technologique. Son pouvoir ? Le montage et le code – il peut assembler des choses qui ressemblent à un chaos total."
  },
  "desRole": {
    "pl": "RYSOWNIK",
    "en": "ARTIST",
    "fr": "DESSINATEUR"
  },
  "desDesc": {
    "pl": "Des to prawdziwy artystyczny wojownik. Jego kreska to magia, która potrafi zmienić zwykłą kartkę w coś, co żyje. W trudnych czasach był obok, jakby miał w sobie Tikki.",
    "en": "Des is a true artistic warrior. His line work is magic that can turn a plain sheet of paper into something alive. In difficult times, he was there, as if he had Tikki in him.",
    "fr": "Des est un véritable guerrier artistique. Son trait est de la magie qui peut transformer une simple feuille de papier en quelque chose de vivant. Dans les moments difficiles, il était là, comme s'il avait Tikki en lui."
  },
  "suniRole": {
    "pl": "Mistrz Photoshopa",
    "en": "Photoshop Master",
    "fr": "Maître Photoshop"
  },
  "suniDesc": {
    "pl": "Suni to czarodziej od obrazów – serio, jakby miał Miraculum Iluzji. To on pokazał mi, jak wchodzić w świat posterów i grafik. Zawsze obok, jak Luka – spokojny, szczery, niezawodny.",
    "en": "Suni is an image wizard – seriously, like he has the Fox Miraculous of Illusion. He showed me how to enter the world of posters and graphics. Always there, like Luka – calm, sincere, reliable.",
    "fr": "Suni est un sorcier de l'image – sérieusement, comme s'il avait le Miraculous du Renard. Il m'a montré comment entrer dans le monde des affiches et du graphisme. Toujours là, comme Luka – calme, sincère, fiable."
  },
  "jedynekRole": {
    "pl": "Grafik & Twórca Botów",
    "en": "Graphic Designer & Bot Creator",
    "fr": "Graphiste & Créateur de Bots"
  },
  "jedynekDesc": {
    "pl": "Jedynek to taki „techno-mag\" – jego Miraculum byłoby pewnie coś w stylu Mechanicznego Serca. Tworzy boty, które działają jak cisi strażnicy, a przy tym ogarnia grafikę z lekkością.",
    "en": "Jedynek is like a \"techno-mage\" – his Miraculous would probably be something like a Mechanical Heart. He creates bots that act like silent guardians, all while handling graphics with effortless flair.",
    "fr": "Jedynek est un genre de \"technomage\" – son Miraculous serait sans doute un truc comme le Cœur Mécanique. Il crée des bots qui agissent comme des gardiens silencieux, tout en gérant le graphisme avec une aisance naturelle."
  },
  "niverRole": {
    "pl": "Programista JS",
    "en": "JS Developer",
    "fr": "Développeur JS"
  },
  "niverDesc": {
    "pl": "Futrzak, który stawia innych ponad siebie, zawsze chętny do pomocy. Lubię sobie pokodować w JSie. Mam wielką chęć do nauczenia sie rysowania :3",
    "en": "A furry who puts others before himself, always ready to lend a paw. I enjoy coding in JS and really want to learn how to draw :3",
    "fr": "Un furry qui fait passer les autres avant lui, toujours prêt à aider. J'aime coder en JS et j'ai une grande envie d'apprendre le dessin :3"
  },
  "ky0oRole": {
    "pl": "Aktor, Wokalista & Grafik",
    "en": "Actor, Vocalist & Graphic Designer",
    "fr": "Acteur, Chanteur & Graphiste"
  },
  "ky0oDesc": {
    "pl": "Mam 18 lat i mieszkam w Krakowie. Jestem furrasem, a moja fursona to ten słodki lisek, na którego patrzysz! Moje pasje to aktorstwo i śpiew (robię to od dziecka!). Zajmuję się też grafiką, tłumaczeniami i graniem w gry.",
    "en": "I'm 18 and live in Krakow. I'm a furry, and my fursona is this cute fox you're looking at! My passions are acting and singing (been doing it since I was a kid!). I also do graphic design, translations, and gaming.",
    "fr": "J'ai 18 ans et j'habite à Cracovie. Je suis un furry et mon fursona est ce renard mignon que vous regardez ! Mes passions sont le théâtre et le chant (je fais ça depuis tout petit !). Je fais aussi du graphisme, de la traduction et des jeux vidéo."
  },
  "scrollIndicator": {
    "pl": "← Przewiń →",
    "en": "← Scroll →",
    "fr": "← Défiler →"
  },
  // Fursona Page
  "fursonaSubtitle": {
    "pl": "Moja Fursona",
    "en": "My Fursona",
    "fr": "Mon Fursona"
  },
  "backToHome": {
    "pl": "Powrót do strony głównej",
    "en": "Back to Home",
    "fr": "Retour à l'accueil"
  },
  "infoTitle": {
    "pl": "Informacje",
    "en": "Information",
    "fr": "Informations"
  },
  "speciesLabel": {
    "pl": "Gatunek:",
    "en": "Species:",
    "fr": "Espèce :"
  },
  "speciesValue": {
    "pl": "Kot (Felis Catus)",
    "en": "Cat (Felis Catus)",
    "fr": "Chat (Felis Catus)"
  },
  "nameLabel": {
    "pl": "Imię:",
    "en": "Name:",
    "fr": "Nom :"
  },
  "genderLabel": {
    "pl": "Płeć:",
    "en": "Gender:",
    "fr": "Sexe :"
  },
  "genderValue": {
    "pl": "Samiec",
    "en": "Male",
    "fr": "Mâle"
  },
  "ageLabel": {
    "pl": "Wiek:",
    "en": "Age:",
    "fr": "Âge :"
  },
  "styleLabel": {
    "pl": "Styl:",
    "en": "Style:",
    "fr": "Style :"
  },
  "aboutTitle": {
    "pl": "O postaci",
    "en": "About Character",
    "fr": "À propos du personnage"
  },
  "aboutDesc1": {
    "pl": "Kuni to spokojna, cicha dusza. Nie musi być w centrum uwagi - najlepiej czuje się wtedy, gdy może obserwować, słuchać i być sobą, bez presji. Jest typem, który najpierw patrzy, myśli, a dopiero potem mówi. Dzięki temu często widzi więcej niż inni.",
    "en": "Kuni is a calm, quiet soul. He doesn't need to be the center of attention - he feels best when he can observe, listen, and be himself without pressure. He is the type who looks and thinks first, and speaks later. Thanks to this, he often sees more than others.",
    "fr": "Kuni est une âme calme et silencieuse. Il n'a pas besoin d'être au centre de l'attention - il se sent mieux lorsqu'il peut observer, écouter et être lui-même sans pression. C'est le genre de personne qui regarde et réfléchit d'abord, et parle ensuite. Grâce à cela, il voit souvent plus que les autres."
  },
  "aboutDesc2": {
    "pl": "Ma w sobie dużo empatii i zrozumienia. Potrafi słuchać naprawdę, a nie tylko czekać na swoją kolej. Jeśli ktoś do niego przyjdzie z problemem, Kuni nie bagatelizuje — raczej spróbuje zrozumieć emocje i dać poczucie bezpieczeństwa. Jest delikatny w obyciu, nawet jeśli nie zawsze umie to ubrać w idealne słowa.",
    "en": "He has a lot of empathy and understanding. He can truly listen, not just wait for his turn. If someone comes to him with a problem, Kuni doesn't downplay it — rather, he tries to understand the emotions and provide a sense of safety. He is gentle in his manner, even if he can't always put it into perfect words.",
    "fr": "Il a beaucoup d'empathie et de compréhension. Il sait vraiment écouter, pas seulement attendre son tour. Si quelqu'un vient le voir avec un problème, Kuni ne le minimise pas — il essaie plutôt de comprendre les émotions et d'offrir un sentiment de sécurité. Il est doux dans ses manières, même s'il ne trouve pas toujours les mots parfaits."
  },
  "aboutDesc3": {
    "pl": "Jest wrażliwy, ale w cichy sposób. Przeżywa rzeczy głęboko, często wewnętrznie. Ma tendencję do rozmyślania, analizowania rozmów i sytuacji, ale nie dlatego, że coś jest nie tak — tylko dlatego, że mu zależy. Uczucia są dla niego ważne, nawet jeśli nie zawsze potrafi je od razu okazać.",
    "en": "He is sensitive, but in a quiet way. He experiences things deeply, often internally. He tends to overthink, analyzing conversations and situations, not because something is wrong — but because he cares. Feelings are important to him, even if he can't always show them immediately.",
    "fr": "Il est sensible, mais d'une manière silencieuse. Il vit les choses profondément, souvent intérieurement. Il a tendance à trop réfléchir, analysant les conversations et les situations, non pas parce que quelque chose ne va pas — mais parce qu'il s'en soucie. Les sentiments sont importants pour lui, même s'il ne peut pas toujours les montrer immédiatement."
  },
  "aboutDesc4": {
    "pl": "W relacjach jest lojalny i oddany. Gdy kogoś polubi lub pokocha, robi to szczerze i na długo. Potrzebuje czasu, żeby się otworzyć, ale gdy już to zrobi, staje się ciepłym, wspierającym towarzyszem — kimś, kto zostaje nawet wtedy, gdy jest trudno.",
    "en": "In relationships, he is loyal and devoted. When he likes or loves someone, he does so sincerely and for the long haul. He needs time to open up, but once he does, he becomes a warm, supportive companion — someone who stays even when things get tough.",
    "fr": "Dans ses relations, il est loyal et dévoué. Lorsqu'il aime ou apprécie quelqu'un, il le fait sincèrement et pour longtemps. Il a besoin de temps pour s'ouvrir, mais une fois qu'il le fait, il devient un compagnon chaleureux et solidaire — quelqu'un qui reste même quand les choses deviennent difficiles."
  },
  "aboutDesc5": {
    "pl": "Ma też w sobie łagodny humor — raczej subtelny niż głośny. Lubi drobne żarty, uśmiechy, momenty ciszy, które nie są niezręczne, tylko komfortowe. Jest typem osoby, przy której można po prostu być, bez udawania.",
    "en": "He also has a gentle humor — subtle rather than loud. He likes small jokes, smiles, moments of silence that aren't awkward, just comfortable. He is the type of person you can just be with, without pretending.",
    "fr": "Il a aussi un humour doux — subtil plutôt que bruyant. Il aime les petites blagues, les sourires, les moments de silence qui ne sont pas gênants, juste confortables. C'est le genre de personne avec qui on peut simplement être, sans faire semblant."
  },
  "refTitle": {
    "pl": "Reference Sheet",
    "en": "Reference Sheet",
    "fr": "Fiche de référence"
  },
  "refCaption": {
    "pl": "Oficjalny arkusz referencyjny (2026)",
    "en": "Official Reference Sheet (2026)",
    "fr": "Fiche de référence officielle (2026)"
  },
  // Nowe sekcje
  "paletteTitle": {
    "pl": "Paleta Kolorów",
    "en": "Color Palette",
    "fr": "Palette de Couleurs"
  },
  "likesTitle": {
    "pl": "Lubię",
    "en": "Likes",
    "fr": "J'aime"
  },
  "dislikesTitle": {
    "pl": "Nie lubię",
    "en": "Dislikes",
    "fr": "Je n'aime pas"
  },
  "like1": { "pl": "Technologia", "en": "Technology", "fr": "Technologie" },
  "like2": { "pl": "Nocne spacery", "en": "Night walks", "fr": "Promenades nocturnes" },
  "like3": { "pl": "Muzyka", "en": "Music", "fr": "Musique" },
  "like4": { "pl": "Spokój", "en": "Peace", "fr": "Calme" },
  "like5": { "pl": "Gry wideo", "en": "Video Games", "fr": "Jeux vidéo" },
  "like6": { "pl": "Deszcz", "en": "Rain", "fr": "Pluie" },
  "dislike1": { "pl": "Hałas", "en": "Loud noise", "fr": "Bruit fort" },
  "dislike2": { "pl": "Tłumy", "en": "Crowds", "fr": "Foules" },
  "dislike3": { "pl": "Upały", "en": "Heat", "fr": "Chaleur" },
  "dislike4": { "pl": "Kłamstwa", "en": "Lies", "fr": "Mensonges" },
  "dislike5": { "pl": "Pośpiech", "en": "Rushing", "fr": "Précipitation" },
  "dislike6": { "pl": "Dramy", "en": "Drama", "fr": "Drames" },
  // Nowe sekcje - Cechy i Status
  "traitsTitle": { "pl": "Cechy", "en": "Traits", "fr": "Traits" },
  "trait1": { "pl": "Introwertyk", "en": "Introvert", "fr": "Introverti" },
  "trait2": { "pl": "Nocny Marek", "en": "Night Owl", "fr": "Oiseau de nuit" },
  "trait3": { "pl": "Empatyczny", "en": "Empathetic", "fr": "Empathique" },
  "trait4": { "pl": "Analityczny", "en": "Analytical", "fr": "Analytique" },
  "statusLabel": { "pl": "Status:", "en": "Status:", "fr": "Statut :" },
  "statusValue": { "pl": "Dostępny", "en": "Online", "fr": "En ligne" }
};

// Function to change language
function changeLanguage(languageCode) {
  // Update language buttons active state
  document.querySelectorAll('.lang-button').forEach(button => {
    button.classList.remove('active');
  });
  const activeButton = document.querySelector(`.lang-button.${languageCode}`);
  if (activeButton) {
    activeButton.classList.add('active');
  }
  
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