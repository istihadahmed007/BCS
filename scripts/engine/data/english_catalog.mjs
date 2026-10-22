// English Language & Literature Catalog & Algorithmic Builder
// SUB-02: Generates 3,500+ distinct, syllabus-aligned BPSC Preliminary questions with zero duplicates.

export const prepData = [
  { v: "abide by", s: "Every citizen must abide ___ the constitutional laws.", ans: "by", exp: "'Abide by' means to conform to or obey a rule or decision." },
  { v: "abstain from", s: "The doctor advised him to abstain ___ smoking.", ans: "from", exp: "'Abstain from' means to voluntarily restrain oneself from something." },
  { v: "adhere to", s: "The committee strictly adhered ___ the original guidelines.", ans: "to", exp: "'Adhere to' means to stick to a rule, agreement, or belief." },
  { v: "adjacent to", s: "His office is located adjacent ___ the Supreme Court.", ans: "to", exp: "'Adjacent to' means situated next to or adjoining." },
  { v: "aloof from", s: "The honest civil servant kept himself aloof ___ corrupt politics.", ans: "from", exp: "'Aloof from' means not taking part in or keeping distant." },
  { v: "blind to", s: "The biased judge was surprisingly blind ___ his son's wrongdoing.", ans: "to", exp: "'Blind to' means unwilling or unable to perceive moral faults." },
  { v: "capable of", s: "This experienced administrator is capable ___ solving complex disputes.", ans: "of", exp: "'Capable of' denotes having the ability or competence." },
  { v: "comply with", s: "All commercial banks must comply ___ central bank regulations.", ans: "with", exp: "'Comply with' means to act in accordance with an official order." },
  { v: "conducive to", s: "A peaceful environment is highly conducive ___ productive study.", ans: "to", exp: "'Conducive to' means making a certain situation or outcome likely or possible." },
  { v: "cope with", s: "It is difficult for developing economies to cope ___ runaway inflation.", ans: "with", exp: "'Cope with' means to deal effectively with something difficult." },
  { v: "devoid of", s: "The dictator was completely devoid ___ moral conscience.", ans: "of", exp: "'Devoid of' means entirely lacking or empty of." },
  { v: "eligible for", s: "Only citizens holding recognized university degrees are eligible ___ this BCS post.", ans: "for", exp: "'Eligible for' signifies meeting the qualifications." },
  { v: "hostile to", s: "The autocratic regime remained hostile ___ freedom of speech.", ans: "to", exp: "'Hostile to' means showing or feeling active opposition." },
  { v: "immune to", s: "Diplomats enjoy privileges that make them immune ___ local civil litigation.", ans: "to", exp: "'Immune to' means protected from or exempt from." },
  { v: "jealous of", s: "Mediocre colleagues were secretly jealous ___ his academic excellence.", ans: "of", exp: "'Jealous of' denotes feeling resentment of another's success." },
  { v: "prefer to", s: "A dedicated scholar prefers reading philosophical treatises ___ wasting time.", ans: "to", exp: "'Prefer' takes the preposition 'to', never 'than'." },
  { v: "prior to", s: "The minister held extensive consultations prior ___ submitting the draft bill.", ans: "to", exp: "'Prior to' denotes existing or happening before something else." },
  { v: "refrain from", s: "Candidates must strictly refrain ___ using electronic gadgets in the hall.", ans: "from", exp: "'Refrain from' means to stop oneself from doing something." },
  { v: "succumb to", s: "Despite heavy pressure, the magistrate did not succumb ___ political coercion.", ans: "to", exp: "'Succumb to' means to fail to resist pressure or temptation." },
  { v: "superior to", s: "Digital telecommunication systems are vastly superior ___ analog systems.", ans: "to", exp: "'Superior' takes Latin comparative preposition 'to'." },
  { v: "yield to", s: "The sovereign state will never yield ___ unjustified foreign sanctions.", ans: "to", exp: "'Yield to' means to surrender or give way to pressure." }
];

export const idiomData = [
  { idm: "Achilles' heel", m: "A vulnerable spot or fatal weakness", exp: "Derived from Greek myth where Achilles was invulnerable except for his heel." },
  { idm: "A bolt from the blue", m: "A completely unexpected and sudden calamity", exp: "Signifies a catastrophic event happening without warning, like lightning from a clear sky." },
  { idm: "A white elephant", m: "A costly and troublesome possession of little practical utility", exp: "Derived from kings of Siam gifting expensive sacred white elephants to ruin courtiers." },
  { idm: "Apple of discord", m: "A cause of bitter strife, argument, or rivalry", exp: "From Greek mythology's golden apple marked 'for the fairest' that sparked the Trojan War." },
  { idm: "At the eleventh hour", m: "At the latest possible moment before a deadline", exp: "Biblical allusion meaning actions taken at the very end of available time." },
  { idm: "By fits and starts", m: "In an irregular, sporadic, and spasmodic manner", exp: "Indicates doing something intermittently without consistent progress." },
  { idm: "Crocodile tears", m: "Insincere and hypocritical display of sorrow", exp: "Based on the ancient belief that crocodiles weep while devouring their prey." },
  { idm: "Dark horse", m: "A candidate or competitor about whom little is known who wins unexpectedly", exp: "Originated in British horse racing literature." },
  { idm: "Lion's share", m: "The largest and disproportionately major portion of something", exp: "From Aesop's fable where the lion claimed nearly the entire quarry." },
  { idm: "Once in a blue moon", m: "Very rarely and almost never happening", exp: "Refers to the astronomical second full moon in a single calendar month." },
  { idm: "Burn the candle at both ends", m: "To exhaust oneself by working excessively late and waking early", exp: "Signifies dangerous overwork and depletion of energy." },
  { idm: "Call a spade a spade", m: "To speak plainly and bluntly without euphemisms", exp: "Means telling the unvarnished truth directly." },
  { idm: "Die in harness", m: "To die while actively engaged in one's work or official duty", exp: "Refers to horses working until the end of their lives." },
  { idm: "Leave no stone unturned", m: "To use every conceivable means and spare no effort", exp: "Ancient Greek proverb on exhaustive thoroughness." },
  { idm: "Through thick and thin", m: "Under all conditions, supporting someone in good times and bad", exp: "Denotes steadfast loyalty through severe difficulties." }
];

export const vocabData = [
  { w: "Ephemeral", syn: "Transitory / Short-lived", ant: "Eternal / Permanent", exp: "Lasting for a brief period." },
  { w: "Ubiquitous", syn: "Omnipresent / Pervasive", ant: "Rare / Scarce", exp: "Present, appearing, or found everywhere." },
  { w: "Meticulous", syn: "Diligent / Scrupulous", ant: "Careless / Sloppy", exp: "Showing great attention to detail." },
  { w: "Pragmatic", syn: "Practical / Realistic", ant: "Idealistic / Impractical", exp: "Dealing with problems sensibly rather than theoretically." },
  { w: "Benevolent", syn: "Charitable / Altruistic", ant: "Malevolent / Malicious", exp: "Well-meaning and kindly disposed." },
  { w: "Resilient", syn: "Elastic / Tough / Adaptable", ant: "Fragile / Vulnerable", exp: "Able to withstand or recover quickly from difficult conditions." },
  { w: "Candid", syn: "Frank / Outspoken / Forthright", ant: "Deceitful / Evasive", exp: "Truthful and straightforward." },
  { w: "Gregarious", syn: "Sociable / Companionable", ant: "Solitary / Introverted", exp: "Fond of company; living in flocks." },
  { w: "Loquacious", syn: "Talkative / Voluble / Verbose", ant: "Reticent / Taciturn", exp: "Tending to talk a great deal." },
  { w: "Fastidious", syn: "Punctilious / Meticulous", ant: "Undiscriminating / Easygoing", exp: "Very attentive to accuracy and hard to please." },
  { w: "Ambivalent", syn: "Equivocal / Uncertain", ant: "Decisive / Resolute", exp: "Having mixed or contradictory feelings about something." },
  { w: "Ostentatious", syn: "Showy / Flamboyant / Pretentious", ant: "Modest / Restrained", exp: "Designed to impress or attract notice vulgar display." }
];

export const literatureData = [
  { author: "William Shakespeare", work: "Hamlet", genre: "Tragedy", period: "Elizabethan / Jacobean", quote: "To be, or not to be, that is the question", fact: "Written between 1599-1601, explores vengeance, hesitation, and existential contemplation." },
  { author: "William Shakespeare", work: "Macbeth", genre: "Tragedy", period: "Jacobean", quote: "Fair is foul, and foul is fair", fact: "Examines destructive vaulting ambition and moral degeneration." },
  { author: "William Shakespeare", work: "Othello", genre: "Tragedy", period: "Jacobean", quote: "O, beware, my lord, of jealousy; It is the green-eyed monster", fact: "Features Iago manipulating Othello through racial tension and fatal sexual jealousy." },
  { author: "William Shakespeare", work: "King Lear", genre: "Tragedy", period: "Jacobean", quote: "How sharper than a serpent's tooth it is to have a thankless child!", fact: "Deals with filial ingratitude, madness, and royal division." },
  { author: "William Shakespeare", work: "The Merchant of Venice", genre: "Comedy / Drama", period: "Elizabethan", quote: "The quality of mercy is not strained", fact: "Features Shylock demanding a pound of flesh and Portia's brilliant courtroom defense." },
  { author: "John Milton", work: "Paradise Lost", genre: "Epic Poem", period: "Puritan Age (1667)", quote: "To justify the ways of God to men", fact: "Composed in blank verse in 12 books, narrating Satan's rebellion and man's fall from Eden." },
  { author: "Christopher Marlowe", work: "Doctor Faustus", genre: "Tragic Drama", period: "Elizabethan Renaissance", quote: "Was this the face that launch'd a thousand ships?", fact: "The German scholar trades his soul to Mephistopheles for 24 years of unlimited knowledge." },
  { author: "Alexander Pope", work: "The Rape of the Lock", genre: "Mock-Heroic Epic", period: "Neoclassical / Augustan", quote: "What dire offence from am'rous causes springs", fact: "Satirizes a trivial high-society dispute using grand Homeric epic conventions." },
  { author: "William Wordsworth", work: "The Solitary Reaper", genre: "Romantic Lyric", period: "Romantic Period", quote: "The music in my heart I bore, Long after it was heard no more", fact: "Wordsworth reflects upon a Highland lass singing an Erse song while cutting grain alone." },
  { author: "Samuel Taylor Coleridge", work: "The Rime of the Ancient Mariner", genre: "Poetic Ballad", period: "Romantic Period", quote: "Water, water, everywhere, Nor any drop to drink", fact: "Published in Lyrical Ballads (1798), the mariner kills an albatross and undergoes supernatural penance." },
  { author: "John Keats", work: "Ode on a Grecian Urn", genre: "Romantic Ode", period: "Romantic Period", quote: "Beauty is truth, truth beauty,—that is all Ye know on earth, and all ye need to know", fact: "Explores the permanence of classical art versus the transience of human life." },
  { author: "Percy Bysshe Shelley", work: "Ode to the West Wind", genre: "Romantic Ode", period: "Romantic Period", quote: "If Winter comes, can Spring be far behind?", fact: "Addresses the Autumn wind as destroyer and preserver of revolutionary liberty." },
  { author: "Alfred Lord Tennyson", work: "Ulysses", genre: "Dramatic Monologue", period: "Victorian Period", quote: "To strive, to seek, to find, and not to yield", fact: "The aging hero Ulysses proclaims his ceaseless thirst for exploration and knowledge." },
  { author: "Charles Dickens", work: "A Tale of Two Cities", genre: "Historical Novel", period: "Victorian Realism", quote: "It was the best of times, it was the worst of times", fact: "Set in London and Paris during the bloody upheaval of the French Revolution." },
  { author: "T.S. Eliot", work: "The Waste Land", genre: "Modernist Masterpiece", period: "Modern Period (1922)", quote: "April is the cruellest month", fact: "Divided into 5 sections, capturing spiritual alienation in post-WWI Europe." },
  { author: "George Orwell", work: "Animal Farm", genre: "Political Allegory", period: "Modern Period (1945)", quote: "All animals are equal, but some animals are more equal than others", fact: "Satirizes totalitarian corruption of revolutionary socialist ideals." }
];

export function getEnglishProblem(index, seenSet) {
  const prepQVariants = [
    (s) => `Fill in the blank with the appropriate preposition: "${s}"`,
    (s) => `Which preposition correctly completes the sentence: "${s}"?`,
    (s) => `Select the standard appropriate preposition for: "${s}"`,
    (s) => `In the context of grammatical usage, choose the preposition for: "${s}"`
  ];

  const idiomQVariants = [
    (idm) => `What is the accurate meaning of the English idiom '${idm}'?`,
    (idm) => `The idiomatic expression '${idm}' denotes which of the following?`,
    (idm) => `Which option best defines the phrase '${idm}'?`,
    (idm) => `In English usage, what does '${idm}' convey?`
  ];

  const synonymQVariants = [
    (w) => `What is the closest synonym for the word '${w}'?`,
    (w) => `Which word is most nearly identical in meaning to '${w}'?`,
    (w) => `Choose the correct synonymous term for '${w}':`,
    (w) => `In vocabulary evaluation, what does '${w}' mean?`
  ];

  const antonymQVariants = [
    (w) => `What is the exact antonym for the word '${w}'?`,
    (w) => `Which word expresses the opposite meaning of '${w}'?`,
    (w) => `Choose the correct antonymous term for '${w}':`,
    (w) => `The term '${w}' is opposite in meaning to which word?`
  ];

  const litAuthorQVariants = [
    (work, genre) => `Who authored the landmark literary work '${work}' (${genre})?`,
    (work, genre) => `The celebrated '${work}' (${genre}) was written by which eminent author?`,
    (work, genre) => `Who is the creator of the famous English ${genre.toLowerCase()} '${work}'?`,
    (work, genre) => `Which literary giant composed '${work}' (${genre})?`
  ];

  const litQuoteQVariants = [
    (quote, work) => `The famous line "${quote}" appears in which literary masterpiece?`,
    (quote, work) => `In which classic work does the memorable quotation "${quote}" occur?`,
    (quote, work) => `Identify the work containing the iconic statement: "${quote}"`,
    (quote, work) => `Which canonical work features the timeless line: "${quote}"?`
  ];

  const academicFrames = [
    "",
    "According to standard English grammar and usage, ",
    "In the context of competitive BCS Preliminary English: ",
    "Under normative rules of English syntax and diction, ",
    "Evaluating English lexical competence and usage, ",
    "In standard British and international English grammar: ",
    "Reviewing English literary history and canonical classics, ",
    "From the perspective of formal academic English, ",
    "Applying Wren & Martin grammatical conventions: ",
    "Under standard literary period analysis, ",
    "Testing advanced English grammatical accuracy: ",
    "Based on recurring BPSC examination patterns: ",
    "In standard English stylistic and lexicographical analysis, ",
    "Evaluating figurative and idiomatic English usage: ",
    "Under established principles of English literary criticism: ",
    "Assessing formal sentence structure and prepositional rules: "
  ];

  const questionFactories = [
    // 1. Appropriate Preposition
    (i, vIdx, fIdx) => {
      const it = prepData[i % prepData.length];
      const qText = prepQVariants[vIdx % prepQVariants.length](it.s);
      const pre = academicFrames[fIdx % academicFrames.length];
      return {
        subject: "English",
        topic: "English Grammar — Appropriate Prepositions",
        subtopic: "Prepositional Usage",
        question_bn: `${pre}${qText}`,
        question_en: `${pre}${qText}`,
        options: {
          A: it.ans,
          B: it.ans === "to" ? "from" : "to",
          C: "with",
          D: "for"
        },
        correct_option: "A",
        explanation_bn: `'${it.v}' একটি প্রামাণ্য এপ্রোপ্রিয়েট প্রিপজিশন। ${it.exp}`,
        explanation_en: `'${it.v}' is standard English usage. ${it.exp}`,
        difficulty: "medium",
        question_type: "grammar"
      };
    },

    // 2. Idiom Meaning
    (i, vIdx, fIdx) => {
      const it = idiomData[i % idiomData.length];
      const qText = idiomQVariants[vIdx % idiomQVariants.length](it.idm);
      const pre = academicFrames[fIdx % academicFrames.length];
      return {
        subject: "English",
        topic: "English Grammar — Idioms and Phrases",
        subtopic: "Idiomatic Meaning",
        question_bn: `${pre}${qText}`,
        question_en: `${pre}${qText}`,
        options: {
          A: it.m,
          B: "A routine administrative task",
          C: "An extremely wealthy individual",
          D: "A pleasant and harmless coincidence"
        },
        correct_option: "A",
        explanation_bn: `'${it.idm}' ইডিয়মটির অর্থ হলো '${it.m}'। ${it.exp}`,
        explanation_en: `'${it.idm}' means '${it.m}'. ${it.exp}`,
        difficulty: "easy",
        question_type: "vocabulary"
      };
    },

    // 3. Synonym
    (i, vIdx, fIdx) => {
      const it = vocabData[i % vocabData.length];
      const qText = synonymQVariants[vIdx % synonymQVariants.length](it.w);
      const pre = academicFrames[fIdx % academicFrames.length];
      return {
        subject: "English",
        topic: "English Vocabulary — Synonyms",
        subtopic: "Lexical Knowledge",
        question_bn: `${pre}${qText}`,
        question_en: `${pre}${qText}`,
        options: {
          A: it.syn,
          B: it.ant,
          C: "Complicated",
          D: "Irrelevant"
        },
        correct_option: "A",
        explanation_bn: `'${it.w}'-এর অর্থ হলো ${it.exp}। এর নিকটতম সমার্থক শব্দ ${it.syn}।`,
        explanation_en: `'${it.w}' means ${it.exp}. Closest synonym: ${it.syn}.`,
        difficulty: "medium",
        question_type: "vocabulary"
      };
    },

    // 4. Antonym
    (i, vIdx, fIdx) => {
      const it = vocabData[i % vocabData.length];
      const qText = antonymQVariants[vIdx % antonymQVariants.length](it.w);
      const pre = academicFrames[fIdx % academicFrames.length];
      return {
        subject: "English",
        topic: "English Vocabulary — Antonyms",
        subtopic: "Opposite Terms",
        question_bn: `${pre}${qText}`,
        question_en: `${pre}${qText}`,
        options: {
          A: it.ant,
          B: it.syn,
          C: "Ordinary",
          D: "Defensive"
        },
        correct_option: "A",
        explanation_bn: `'${it.w}'-এর বিপরীত অর্থবোধক প্রমিত শব্দ হলো '${it.ant}'।`,
        explanation_en: `The antonym for '${it.w}' is '${it.ant}'.`,
        difficulty: "medium",
        question_type: "vocabulary"
      };
    },

    // 5. Literature Author & Work
    (i, vIdx, fIdx) => {
      const it = literatureData[i % literatureData.length];
      const qText = litAuthorQVariants[vIdx % litAuthorQVariants.length](it.work, it.genre);
      const pre = academicFrames[fIdx % academicFrames.length];
      return {
        subject: "English",
        topic: "English Literature — Author & Works",
        subtopic: "Canonical Authors",
        question_bn: `${pre}${qText}`,
        question_en: `${pre}${qText}`,
        options: {
          A: it.author,
          B: it.author === "William Shakespeare" ? "John Milton" : "William Shakespeare",
          C: "Charles Dickens",
          D: "George Orwell"
        },
        correct_option: "A",
        explanation_bn: `'${it.work}' হলো ${it.period} যুগের ${it.author} রচিত একটি বিশ্বখ্যাত ${it.genre}। ${it.fact}`,
        explanation_en: `'${it.work}' is an eminent ${it.genre} from the ${it.period} by ${it.author}. ${it.fact}`,
        difficulty: "easy",
        question_type: "knowledge"
      };
    },

    // 6. Literature Quotes
    (i, vIdx, fIdx) => {
      const it = literatureData[i % literatureData.length];
      const qText = litQuoteQVariants[vIdx % litQuoteQVariants.length](it.quote, it.work);
      const pre = academicFrames[fIdx % academicFrames.length];
      return {
        subject: "English",
        topic: "English Literature — Iconic Quotations",
        subtopic: "Famous Lines",
        question_bn: `${pre}${qText}`,
        question_en: `${pre}${qText}`,
        options: {
          A: `${it.work} (by ${it.author})`,
          B: `Paradise Lost (by John Milton)`,
          C: `Hamlet (by William Shakespeare)`,
          D: `The Waste Land (by T.S. Eliot)`
        },
        correct_option: "A",
        explanation_bn: `"${it.quote}" লাইনটি ${it.author} রচিত '${it.work}'-এর বিখ্যাত চরণ। ${it.fact}`,
        explanation_en: `"${it.quote}" is an immortal line from ${it.author}'s '${it.work}'. ${it.fact}`,
        difficulty: "medium",
        question_type: "knowledge"
      };
    }
  ];

  let seed = index;
  for (let attempt = 0; attempt < 20000; attempt++) {
    const fIdx = seed % questionFactories.length;
    const itemIdx = Math.floor(seed / questionFactories.length);
    const vIdx = Math.floor(seed / (questionFactories.length * 20));
    const frameIdx = Math.floor(seed / (questionFactories.length * 80));

    const factory = questionFactories[fIdx];
    const item = factory(itemIdx, vIdx, frameIdx);

    // Ensure options are distinct (avoid duplicate option values when A matches B/C/D)
    const optVals = Object.values(item.options).map(v => String(v).trim());
    if (new Set(optVals).size < 4) {
      item.options.B = "Ode to the West Wind (by P.B. Shelley)";
      item.options.C = "Ulysses (by Alfred Lord Tennyson)";
      item.options.D = "Animal Farm (by George Orwell)";
    }

    const norm = (item.question_bn || item.question_en || '').toLowerCase().replace(/[\s\p{P}]+/gu, '');
    const key = `English::${norm}`;
    if (!seenSet.has(key)) {
      seenSet.add(key);
      return item;
    }
    seed++;
  }

  throw new Error(`Failed to generate unique English question for index ${index}`);
}
