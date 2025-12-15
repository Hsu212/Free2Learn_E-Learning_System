// src/data/courses.js

export const courses = [
  // --- EXISTING COURSES (1-7) ---
  {
    id: 1,
    title: 'English Communication Mastery',
    description: 'Improve your fluency, pronunciation, and confidence in daily English conversations.',
    progress: 0,
    lessons: [
      { id: '1-1', title: 'The Art of Small Talk', completed: false, videoUrl: '#', content: 'Small talk fundamentals: Weather, weekends, and compliments.' },
      { id: '1-2', title: 'Business Meeting Etiquette', completed: false, videoUrl: '#', content: 'Agreeing, disagreeing, and professional vocabulary like "Consensus".' },
      { id: '1-3', title: 'Mastering Pronunciation: Vowels', completed: false, videoUrl: '#', content: 'Difference between short and long vowels (Ship vs Sheep).' },
      { id: '1-4', title: 'Idioms and Slang', completed: false, videoUrl: '#', content: 'Common idioms like "Break a leg" and "Hit the hay".' },
    ],
  },
  {
    id: 2,
    title: 'Spanish for Travelers',
    description: 'Essential vocabulary for Spain or Latin America. Order food and ask directions.',
    progress: 0,
    lessons: [
      { id: '2-1', title: 'Greetings and Introductions', completed: false, videoUrl: '#', content: 'Hola, Buenos días, and Me llamo...' },
      { id: '2-2', title: 'Ordering at a Restaurant', completed: false, videoUrl: '#', content: 'Una mesa para dos, La cuenta por favor.' },
      { id: '2-3', title: 'Directions and Transport', completed: false, videoUrl: '#', content: 'Donde esta el bano? Izquierda, Derecha.' },
    ],
  },
  {
    id: 3,
    title: 'Introduction to Japanese (N5)',
    description: 'Master Hiragana, Katakana, and basic grammar structures.',
    progress: 0,
    lessons: [
      { id: '3-1', title: 'Hiragana Basics', completed: false, videoUrl: '#', content: 'Reading the first rows: A, Ka, Sa, Ta, Na.' },
      { id: '3-2', title: 'Self Introductions', completed: false, videoUrl: '#', content: 'Hajimemashite, Watashi no namae wa...' },
      { id: '3-3', title: 'Numbers and Time', completed: false, videoUrl: '#', content: 'Counting 1-10 and telling time (ji).' },
    ],
  },
  {
    id: 4,
    title: 'French for Beginners',
    description: 'Learn the language of love. Pronunciation and essential grammar.',
    progress: 0,
    lessons: [
      { id: '4-1', title: 'Bonjour! Greetings', completed: false, videoUrl: '#', content: 'Bonjour, Bonsoir, Salut, Au revoir.' },
      { id: '4-2', title: 'Numbers 1-20', completed: false, videoUrl: '#', content: 'Un, Deux, Trois... pay attention to silent letters.' },
      { id: '4-3', title: 'Ordering a Croissant', completed: false, videoUrl: '#', content: 'Je voudrais un croissant, s\'il vous plaît.' }
    ]
  },
  {
    id: 5,
    title: 'Business Chinese (Mandarin)',
    description: 'Professional vocabulary, tones, and etiquette for working in China.',
    progress: 0,
    lessons: [
      { id: '5-1', title: 'The 4 Tones', completed: false, videoUrl: '#', content: 'Flat, Rising, Dipping, Falling tones.' },
      { id: '5-2', title: 'Business Cards', completed: false, videoUrl: '#', content: 'How to exchange cards with two hands.' }
    ]
  },
  {
    id: 6,
    title: 'German Grammar Intensive',
    description: 'Deep dive into cases, articles, and sentence structure.',
    progress: 0,
    lessons: [
      { id: '6-1', title: 'Der, Die, Das', completed: false, videoUrl: '#', content: 'Understanding Masculine, Feminine, and Neuter nouns.' },
      { id: '6-2', title: 'V2 Rule', completed: false, videoUrl: '#', content: 'The verb must always be in the second position.' }
    ]
  },
  {
    id: 7,
    title: 'Korean Hangul Basics',
    description: 'Read and write the Korean alphabet in hours.',
    progress: 0,
    lessons: [
      { id: '7-1', title: 'Basic Vowels', completed: false, videoUrl: '#', content: 'Vertical and horizontal vowels (A, O, U, I).' },
      { id: '7-2', title: 'Consonants', completed: false, videoUrl: '#', content: 'G, N, D, R, M, B, S, J, H.' }
    ]
  },

  // --- NEW COURSES (8-19) ---
  {
    id: 8,
    title: 'Italian for Foodies',
    description: 'Navigate menus, order wine, and speak with your hands in Italy.',
    progress: 0,
    lessons: [
      { id: '8-1', title: 'Coffee Culture', completed: false, videoUrl: '#', content: 'Espresso vs Cappuccino rules. Never order Cappuccino after 11am!' },
      { id: '8-2', title: 'Pizza and Pasta', completed: false, videoUrl: '#', content: 'Ordering: "Vorrei una pizza Margherita." vocabulary for toppings.' },
      { id: '8-3', title: 'Hand Gestures', completed: false, videoUrl: '#', content: 'The "Pinecone" hand (Che vuoi?) and other essential non-verbal cues.' }
    ]
  },
  {
    id: 9,
    title: 'Russian Alphabet & Basics',
    description: 'Demystify the Cyrillic alphabet and learn survival phrases.',
    progress: 0,
    lessons: [
      { id: '9-1', title: 'Cyrillic: False Friends', completed: false, videoUrl: '#', content: 'Letters that look like English but sound different (В = V, Н = N, Р = R).' },
      { id: '9-2', title: 'Greetings', completed: false, videoUrl: '#', content: 'Privet (Hi) vs Zdravstvuyte (Hello formal).' }
    ]
  },
  {
    id: 10,
    title: 'Vietnamese Essentials',
    description: 'Master the 6 tones and essential daily phrases for life in Vietnam.',
    progress: 0,
    lessons: [
      { id: '10-1', title: 'The 6 Tones', completed: false, videoUrl: '#', content: 'Ma (Ghost), Ma (Cheek), Ma (But)... tones change meaning completely.' },
      { id: '10-2', title: 'Pronouns', completed: false, videoUrl: '#', content: 'Addressing people correctly: Anh, Chi, Em, Chu, Bac based on age.' },
      { id: '10-3', title: 'Street Food', completed: false, videoUrl: '#', content: 'Ordering Pho, Banh Mi, and Ca Phe Sua Da.' }
    ]
  },
  {
    id: 11,
    title: 'Brazilian Portuguese',
    description: 'Learn the musical language of Brazil. Samba, beach, and greetings.',
    progress: 0,
    lessons: [
      { id: '11-1', title: 'Oi, Tudo Bem?', completed: false, videoUrl: '#', content: 'The universal greeting of Brazil.' },
      { id: '11-2', title: 'Sounds of Nasal Vowels', completed: false, videoUrl: '#', content: 'Pronouncing ão (Pão, Não, João).' }
    ]
  },
  {
    id: 12,
    title: 'Arabic (MSA) Beginners',
    description: 'Introduction to Modern Standard Arabic script and polite conversation.',
    progress: 0,
    lessons: [
      { id: '12-1', title: 'The Script (Right to Left)', completed: false, videoUrl: '#', content: 'Connecting letters and reading from right to left.' },
      { id: '12-2', title: 'Common Phrases', completed: false, videoUrl: '#', content: 'As-salamu alaykum (Peace be upon you) and Shukran (Thank you).' }
    ]
  },
  {
    id: 13,
    title: 'Thai for Travelers',
    description: 'Navigate Bangkok with confidence. Politeness particles and numbers.',
    progress: 0,
    lessons: [
      { id: '13-1', title: 'Polite Particles (Ka/Krup)', completed: false, videoUrl: '#', content: 'Adding Ka (female) or Krup (male) to soften sentences.' },
      { id: '13-2', title: 'Sawasdee (Hello)', completed: false, videoUrl: '#', content: 'The Wai gesture and greeting properly.' }
    ]
  },
  {
    id: 14,
    title: 'American Sign Language (ASL)',
    description: 'Communicate with your hands. Alphabet and basic expressions.',
    progress: 0,
    lessons: [
      { id: '14-1', title: 'Fingerspelling A-Z', completed: false, videoUrl: '#', content: 'The manual alphabet for spelling out names and words.' },
      { id: '14-2', title: 'Basic Greetings', completed: false, videoUrl: '#', content: 'Signs for Hello, Nice to meet you, and Thank you.' }
    ]
  },
  {
    id: 15,
    title: 'Hindi Conversation',
    description: 'Spoken Hindi for Bollywood fans and travelers to India.',
    progress: 0,
    lessons: [
      { id: '15-1', title: 'Namaste', completed: false, videoUrl: '#', content: 'Formal greetings and respect.' },
      { id: '15-2', title: 'Useful Phrases', completed: false, videoUrl: '#', content: 'Mera naam... (My name is...), Aap kaise hain? (How are you?)' }
    ]
  },
  {
    id: 16,
    title: 'Dutch for Beginners',
    description: 'Close to English and German. Learn the guttural "G".',
    progress: 0,
    lessons: [
      { id: '16-1', title: 'Pronunciation', completed: false, videoUrl: '#', content: 'The hard G sound and diphthongs like "ui".' },
      { id: '16-2', title: 'Cycling Vocabulary', completed: false, videoUrl: '#', content: 'Fiets (Bicycle) is the most important word in the Netherlands.' }
    ]
  },
  {
    id: 17,
    title: 'Swedish Basics',
    description: 'Learn the melodic language of Scandinavia. Fika and family.',
    progress: 0,
    lessons: [
      { id: '17-1', title: 'Hej Hej!', completed: false, videoUrl: '#', content: 'Informal greetings and introductions.' },
      { id: '17-2', title: 'Fika Culture', completed: false, videoUrl: '#', content: 'Coffee break vocabulary: Kaffe, Kanelbulle.' }
    ]
  },
  {
    id: 18,
    title: 'Turkish Language 101',
    description: 'Agglutinative language basics. Vowel harmony and suffixes.',
    progress: 0,
    lessons: [
      { id: '18-1', title: 'Vowel Harmony', completed: false, videoUrl: '#', content: 'How vowels change endings (Front vs Back vowels).' },
      { id: '18-2', title: 'Greetings', completed: false, videoUrl: '#', content: 'Merhaba (Hello), Nasilsin? (How are you?).' }
    ]
  },
  {
    id: 19,
    title: 'Modern Greek',
    description: 'Learn the alphabet that started it all. Travel phrases for Greece.',
    progress: 0,
    lessons: [
      { id: '19-1', title: 'The Alphabet', completed: false, videoUrl: '#', content: 'Alpha, Beta, Gamma... reading street signs.' },
      { id: '19-2', title: 'Essentials', completed: false, videoUrl: '#', content: 'Kalimera (Good morning), Efcharisto (Thank you).' }
    ]
  }
];

export function getCourseById(id) {
  return courses.find(course => course.id === parseInt(id));
}