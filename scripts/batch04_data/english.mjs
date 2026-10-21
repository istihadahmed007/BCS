export const englishQuestions = [
  {
    subject: "English",
    topic: "Grammar — Modifiers",
    subtopic: "Dangling Modifiers",
    question_bn: "Choose the sentence that correctly avoids a dangling modifier:",
    question_en: "Identify the sentence that correctly resolves the dangling modifier problem:",
    options: {
      A: "Walking through the park, a snake bit the tourist.",
      B: "Walking through the park, the tourist was bitten by a snake.",
      C: "Walking through the park, a snake was encountered by him.",
      D: "Walking through the park, biting occurred by a snake."
    },
    correct_option: "B",
    explanation_bn: "Participle phrase (Walking through the park)-এর ঠিক পরপরই সেই কর্তা বা Subject বসতে হবে যে হাঁটার কাজটি করছিল (the tourist)। অন্য বিকল্পগুলোতে 'a snake' বা passive গঠন আসায় মনে হয় সাপটি পার্কে হাঁটছিল (Dangling/Misplaced modifier)।",
    explanation_en: "The introductory participial phrase 'Walking through the park' logically modifies the tourist, who must immediately follow the comma.",
    difficulty: "medium",
    question_type: "grammar",
    source_title: "The Elements of Style — Strunk & White",
    source_page_or_section: "Dangling Participles and Modifiers"
  },
  {
    subject: "English",
    topic: "Grammar — Parallelism",
    subtopic: "Parallel Structure in Conjunctions",
    question_bn: "Which sentence exemplifies correct parallel grammatical structure?",
    question_en: "Select the grammatically parallel sentence:",
    options: {
      A: "She loves swimming, jogging, and to ride a bicycle.",
      B: "She loves swimming, jogging, and riding a bicycle.",
      C: "She loves to swim, jogging, and ride a bicycle.",
      D: "She loves swimming, to jog, and riding bicycles."
    },
    correct_option: "B",
    explanation_bn: "Parallelism বা সমান্তরাল গঠনের নিয়ম অনুযায়ী সমন্বয়কারী অব্যয় (and/or) দিয়ে যুক্ত পদগুলোর ব্যাকরণিক রূপ অভিন্ন হতে হবে। এখানে তিনটিই Gerund (-ing form): swimming, jogging, and riding a bicycle।",
    explanation_en: "Items in a coordinate series must share an identical grammatical form: all gerunds ('swimming, jogging, and riding').",
    difficulty: "easy",
    question_type: "grammar",
    source_title: "Cliffs TOEFL Preparation Guide",
    source_page_or_section: "Parallel Structure Rules"
  },
  {
    subject: "English",
    topic: "Grammar — Determiners",
    subtopic: "Countable vs Uncountable (Few vs Little)",
    question_bn: "'I have ______ friends in this new city, so I rarely feel lonely.' — সঠিক শব্দ কোনটি?",
    question_en: "Choose the appropriate determiner: 'I have ______ friends in this new city, so I rarely feel lonely.'",
    options: {
      A: "few",
      B: "a few",
      C: "little",
      D: "a little"
    },
    correct_option: "B",
    explanation_bn: "'Friends' একটি গণনযোগ্য বহুবচন বিশেষ্য (Countable plural noun), তাই এর পূর্বে 'few' বা 'a few' বসবে। যেহেতু তিনি একাকীত্ব বোধ করেন না, অর্থাৎ তাঁর কিছু বন্ধু আছে (ইতিবাচক ভাব), তাই 'a few' (কিছু সংখ্যক) সঠিক। 'Few' বসলে বোঝাত বন্ধু নেই বললেই চলে (নেতিবাচক)।",
    explanation_en: "'A few' conveys a positive countable quantity ('some friends'), which explains why the speaker rarely feels lonely.",
    difficulty: "medium",
    question_type: "grammar",
    source_title: "Practical English Usage — Michael Swan",
    source_page_or_section: "Few and A Few; Little and A Little"
  },
  {
    subject: "English",
    topic: "Grammar — Determiners",
    subtopic: "Little vs A Little",
    question_bn: "'There is ______ hope of his recovery; the doctors are extremely worried.'",
    question_en: "Fill in the blank: 'There is ______ hope of his recovery; the doctors are extremely worried.'",
    options: {
      A: "little",
      B: "a little",
      C: "few",
      D: "a few"
    },
    correct_option: "A",
    explanation_bn: "'Hope' হলো Uncountable Noun। ডাক্তাররা অত্যন্ত উদ্বিগ্ন হওয়ায় সুস্থতার আশা নেই বললেই চলে (নেতিবাচক অর্থ)। 'Little' শব্দের অর্থ 'নেই বললেই চলে' (Hardly any)। তাই সঠিক উত্তর 'little'।",
    explanation_en: "'Little' is used with uncountable nouns to denote a negative quantity ('almost no hope').",
    difficulty: "easy",
    question_type: "grammar",
    source_title: "High School English Grammar — Wren & Martin",
    source_page_or_section: "Adjectives of Quantity: Little and A Little"
  },
  {
    subject: "English",
    topic: "Grammar — Clauses",
    subtopic: "Noun Clause Identification",
    question_bn: "'What he said at the meeting surprised everyone.' — এখানে 'What he said at the meeting' কোন প্রকারের Clause?",
    question_en: "In 'What he said at the meeting surprised everyone', the underlined clause functions as a/an:",
    options: {
      A: "Noun Clause",
      B: "Adjective Clause",
      C: "Adverbial Clause",
      D: "Prepositional Clause"
    },
    correct_option: "A",
    explanation_bn: "বাক্যের মূল ক্রিয়াপদ হলো 'surprised'। এই ক্রিয়াপদের কর্তা বা Subject হিসেবে সম্পূর্ণ ক্লজটি ('What he said at the meeting') কাজ করছে। Subject হিসেবে কাজ করায় এটি একটি Noun Clause।",
    explanation_en: "The entire dependent clause operates as the grammatical subject of the main verb 'surprised', defining it as a Noun Clause.",
    difficulty: "easy",
    question_type: "grammar",
    source_title: "A Comprehensive Grammar of the English Language — Quirk et al.",
    source_page_or_section: "Nominal Clauses"
  },
  {
    subject: "English",
    topic: "Grammar — Clauses",
    subtopic: "Adjective Clause Identification",
    question_bn: "'The scholar who arrived yesterday will deliver the keynote lecture.' — এখানে 'who arrived yesterday' কোন ক্লজ?",
    question_en: "In 'The scholar who arrived yesterday will deliver the keynote lecture', the clause is a/an:",
    options: {
      A: "Noun Clause",
      B: "Adjective Clause (Relative Clause)",
      C: "Adverbial Clause",
      D: "Co-ordinate Clause"
    },
    correct_option: "B",
    explanation_bn: "এখানে ক্লজটি তার পূর্ববর্তী Noun 'The scholar'-কে বিশেষায়িত বা modify করছে এবং relative pronoun 'who' দ্বারা শুরু হয়েছে। তাই এটি একটি Adjective Clause (বা Relative Clause)।",
    explanation_en: "The clause modifies the preceding noun antecedent 'The scholar', functioning adjectivally as a Relative Clause.",
    difficulty: "easy",
    question_type: "grammar",
    source_title: "Oxford Practice Grammar — John Eastwood",
    source_page_or_section: "Relative Clauses"
  },
  {
    subject: "English",
    topic: "Grammar — Prepositions",
    subtopic: "Appropriate Prepositions",
    question_bn: "'He is indifferent ______ both praise and criticism.' — উপযুক্ত Preposition কোনটি?",
    question_en: "Select the correct preposition: 'He is indifferent ______ both praise and criticism.'",
    options: {
      A: "to",
      B: "for",
      C: "with",
      D: "at"
    },
    correct_option: "A",
    explanation_bn: "'Indifferent' (উদাসীন)-এর পর সর্বদা Appropriate Preposition 'to' বসে (যেমন: indifferent to pain, indifferent to criticism)।",
    explanation_en: "The adjective 'indifferent' takes the fixed preposition 'to' when describing unconcern.",
    difficulty: "easy",
    question_type: "vocabulary",
    source_title: "Oxford Advanced Learner's Dictionary",
    source_page_or_section: "Entry: Indifferent"
  },
  {
    subject: "English",
    topic: "Grammar — Prepositions",
    subtopic: "Appropriate Prepositions",
    question_bn: "'The climate of this mountain retreat is congenial ______ my health.'",
    question_en: "Fill in the blank with the appropriate preposition: 'The climate of this mountain retreat is congenial ______ my health.'",
    options: {
      A: "to",
      B: "with",
      C: "for",
      D: "in"
    },
    correct_option: "A",
    explanation_bn: "'Congenial' (অনুকূল বা উপযোগী) শব্দের পর স্বাস্থ্যের অনুকূল অর্থে Appropriate Preposition 'to' বসে (Congenial to health)। আর মানুষের সাথে মনের মিল বোঝাতে 'with' বসে (Congenial with someone)।",
    explanation_en: "'Congenial' pairs with 'to' when indicating suitability to health or environment.",
    difficulty: "medium",
    question_type: "vocabulary",
    source_title: "A Practical English Grammar — Thomson & Martinet",
    source_page_or_section: "Prepositions with Adjectives"
  },
  {
    subject: "English",
    topic: "Grammar — Prepositions",
    subtopic: "Verbs of Refraining",
    question_bn: "'Citizens are advised to abstain ______ spreading unverified rumors.'",
    question_en: "Select the appropriate preposition: 'Citizens are advised to abstain ______ spreading unverified rumors.'",
    options: {
      A: "from",
      B: "to",
      C: "of",
      D: "in"
    },
    correct_option: "A",
    explanation_bn: "বিরত থাকা বা বর্জন করা অর্থবোধক ক্রিয়া (যেমন: Abstain, Refrain, Desist)-এর পর সর্বদা Appropriate Preposition 'from' বসে এবং এর পর Gerund (V-ing) রূপ বসে।",
    explanation_en: "Verbs indicating avoidance or restraining oneself (abstain, refrain) systematically govern 'from'.",
    difficulty: "easy",
    question_type: "vocabulary",
    source_title: "Wren & Martin English Grammar",
    source_page_or_section: "Verbs Followed by Prepositions"
  },
  {
    subject: "English",
    topic: "Grammar — Phrasal Verbs",
    subtopic: "Phrasal Verb Meanings",
    question_bn: "The meeting was 'called off' due to unforeseen circumstances. What does 'called off' mean?",
    question_en: "In 'The meeting was called off due to unforeseen circumstances', what does 'called off' signify?",
    options: {
      A: "Postponed",
      B: "Cancelled",
      C: "Concluded",
      D: "Summoned"
    },
    correct_option: "B",
    explanation_bn: "'Call off' একটি সুপরিচিত Phrasal Verb যার অর্থ বাতিল করা (Cancel)। আর 'Put off' অর্থ স্থগিত বা মুলতবি করা (Postpone)।",
    explanation_en: "'Call off' means to cancel a scheduled event, whereas 'put off' means to postpone.",
    difficulty: "easy",
    question_type: "vocabulary",
    source_title: "Cambridge International Dictionary of Phrasal Verbs",
    source_page_or_section: "Entry: Call off"
  },
  {
    subject: "English",
    topic: "Grammar — Phrasal Verbs",
    subtopic: "Phrasal Verb Meanings",
    question_bn: "The committee was formed to 'look into' the allegations. What is the meaning of 'look into'?",
    question_en: "What does the phrasal verb 'look into' mean?",
    options: {
      A: "To examine or investigate",
      B: "To gaze at intently",
      C: "To anticipate with joy",
      D: "To despise"
    },
    correct_option: "A",
    explanation_bn: "'Look into' অর্থ কোনো বিষয় খতিয়ে দেখা বা তদন্ত করা (Investigate / Examine)。",
    explanation_en: "'Look into' idiomatically denotes conducting a formal investigation or detailed inquiry.",
    difficulty: "easy",
    question_type: "vocabulary",
    source_title: "Oxford Phrasal Verbs Dictionary",
    source_page_or_section: "Entry: Look into"
  },
  {
    subject: "English",
    topic: "Grammar — Pronoun",
    subtopic: "Reflexive vs Emphatic Pronoun",
    question_bn: "'She herself completed the complex project.' — এই বাক্যে 'herself' শব্দটি কোন ধরনের Pronoun?",
    question_en: "In 'She herself completed the complex project', what type of pronoun is 'herself'?",
    options: {
      A: "Reflexive Pronoun",
      B: "Emphatic / Intensive Pronoun",
      C: "Demonstrative Pronoun",
      D: "Relative Pronoun"
    },
    correct_option: "B",
    explanation_bn: "যখন -self যুক্ত Pronoun সরাসরি Subject-এর ওপর অতিরিক্ত জোর (Emphasis) প্রদানের জন্য বসে এবং বাক্য থেকে তুলে নিলেও বাক্যের মূল অর্থ অক্ষুণ্ণ থাকে, তখন তাকে Emphatic বা Intensive Pronoun বলে। আর যখন Subject এবং Object একই ব্যক্তি হয় (যেমন: She killed herself), তখন তা Reflexive Pronoun হয়।",
    explanation_en: "'Herself' is employed here for emphasis directly reinforcing the subject 'She', classifying it as an Emphatic Pronoun.",
    difficulty: "medium",
    question_type: "grammar",
    source_title: "Wren & Martin High School English Grammar",
    source_page_or_section: "Reflexive and Emphatic Pronouns"
  },
  {
    subject: "English",
    topic: "Vocabulary — Synonyms",
    subtopic: "High-Frequency Words",
    question_bn: "What is the closest synonym of the word 'CANDID'?",
    question_en: "Select the most accurate synonym for the word 'CANDID':",
    options: {
      A: "Frank / Forthright",
      B: "Deceitful",
      C: "Cunning",
      D: "Arrogant"
    },
    correct_option: "A",
    explanation_bn: "'Candid' অর্থ অকপট, খোলামেলা বা স্পষ্টভাষী (truthful and straightforward)। এর সমার্থক শব্দ হলো 'Frank', 'Forthright' বা 'Outspoken'।",
    explanation_en: "'Candid' denotes openness and unreserved honesty, synonymous with 'Frank'.",
    difficulty: "easy",
    question_type: "vocabulary",
    source_title: "Merriam-Webster's Collegiate Dictionary",
    source_page_or_section: "Entry: Candid"
  },
  {
    subject: "English",
    topic: "Vocabulary — Synonyms",
    subtopic: "Advanced Vocabulary",
    question_bn: "The word 'ENIGMA' means:",
    question_en: "Which of the following is a direct synonym of 'ENIGMA'?",
    options: {
      A: "Mystery / Puzzle",
      B: "Certainty",
      C: "Solution",
      D: "Manifesto"
    },
    correct_option: "A",
    explanation_bn: "'Enigma' অর্থ ধাঁধা, রহস্য বা অবোধ্য বিষয় (a person or thing that is mysterious or difficult to understand)। এর সমার্থক শব্দ 'Mystery', 'Puzzle' বা 'Riddle'।",
    explanation_en: "'Enigma' refers to a perplexing or insoluble riddle, making 'Mystery' its synonym.",
    difficulty: "easy",
    question_type: "vocabulary",
    source_title: "Barron's Essential Words for the GRE",
    source_page_or_section: "Word List: E"
  },
  {
    subject: "English",
    topic: "Vocabulary — Antonyms",
    subtopic: "Advanced Antonyms",
    question_bn: "What is the antonym of the word 'NADIR'?",
    question_en: "What is the exact antonym of 'NADIR'?",
    options: {
      A: "Zenith / Apex",
      B: "Abyss",
      C: "Base",
      D: "Depth"
    },
    correct_option: "A",
    explanation_bn: "'Nadir' শব্দের অর্থ কোনো কিছুর সর্বনিম্ন বিন্দু বা পতনের প্রান্তসীমা (the lowest point in fortunes of a person)। এর বিপরীতার্থক শব্দ হলো 'Zenith' বা 'Apex' (সর্বোচ্চ চূড়া বা শীর্ষবিন্দু)।",
    explanation_en: "'Nadir' represents the lowest possible point, whose astronomical and metaphorical antonym is 'Zenith'.",
    difficulty: "easy",
    question_type: "vocabulary",
    source_title: "Word Power Made Easy — Norman Lewis",
    source_page_or_section: "Spatial and Astrological Extremes"
  },
  {
    subject: "English",
    topic: "Vocabulary — Antonyms",
    subtopic: "Opposites in Personality",
    question_bn: "The antonym of the word 'GREGARIOUS' is:",
    question_en: "Which word is opposite in meaning to 'GREGARIOUS'?",
    options: {
      A: "Reclusive / Solitary",
      B: "Sociable",
      C: "Outgoing",
      D: "Affable"
    },
    correct_option: "A",
    explanation_bn: "'Gregarious' অর্থ মিশুক, দলপ্রিয় বা সামাজিক (fond of company / sociable)। এর বিপরীতার্থক শব্দ হলো 'Reclusive' বা 'Solitary' (নির্জনতাপূর্ণ বা সমাজবিমুখ)।",
    explanation_en: "'Gregarious' denotes social companionship, contrasted with 'Reclusive' (solitary and isolated).",
    difficulty: "easy",
    question_type: "vocabulary",
    source_title: "Barron's GRE Word List",
    source_page_or_section: "Word List: G"
  },
  {
    subject: "English",
    topic: "Vocabulary — Idioms & Phrases",
    subtopic: "Standard Idioms",
    question_bn: "The idiom 'To bite the bullet' means:",
    question_en: "What is the meaning of the idiom 'To bite the bullet'?",
    options: {
      A: "To face an inevitable grim situation with courage",
      B: "To engage in armed combat",
      C: "To express violent anger",
      D: "To surrender unconditionally"
    },
    correct_option: "A",
    explanation_bn: "'To bite the bullet' বাগ্ধারাটির উৎপত্তি যুদ্ধের সময় অ্যানেস্থেসিয়া ছাড়া আহত সেনাদের বুলেটে কামড় দিয়ে যন্ত্রণা সহ্য করার ঘটনা থেকে। এর অর্থ একটি অবশ্যম্ভাবী কঠিন বা অপ্রীতিকর পরিস্থিতি সাহসের সাথে মেনে নেওয়া ও মোকাবেলা করা।",
    explanation_en: "'To bite the bullet' means to stoically endure an unavoidable, difficult ordeal.",
    difficulty: "easy",
    question_type: "vocabulary",
    source_title: "Oxford Dictionary of Idioms",
    source_page_or_section: "Idioms Origin: Bite the bullet"
  },
  {
    subject: "English",
    topic: "Vocabulary — Idioms & Phrases",
    subtopic: "Classical Metaphors",
    question_bn: "The phrase 'An apple of discord' signifies:",
    question_en: "What does the expression 'An apple of discord' mean?",
    options: {
      A: "A delicious fruit",
      B: "A subject of dispute or contention",
      C: "A source of wealth",
      D: "A symbol of peace"
    },
    correct_option: "B",
    explanation_bn: "গ্রিক পৌরাণিক কাহিনীর সোনার আপেলকে কেন্দ্র করে দেবীদের বিরোধ থেকে ট্রয় যুদ্ধের সূত্রপাত হয়। 'An apple of discord' বাগ্ধারাটির অর্থ বিবাদের মূল কারণ বা ঝগড়ার বিষয় (A cause of dispute or rivalry).",
    explanation_en: "Originating in Greek mythology, 'an apple of discord' denotes the core subject of bitter contention.",
    difficulty: "easy",
    question_type: "vocabulary",
    source_title: "Brewer's Dictionary of Phrase and Fable",
    source_page_or_section: "Mythological Allusions: Apple of Discord"
  },
  {
    subject: "English",
    topic: "Vocabulary — One-Word Substitution",
    subtopic: "Philosophical & Character Traits",
    question_bn: "One who possesses infinite, all-encompassing knowledge is called:",
    question_en: "What is the one-word substitution for 'all-knowing or possessing infinite knowledge'?",
    options: {
      A: "Omnipotent",
      B: "Omniscient",
      C: "Omnipresent",
      D: "Polyglot"
    },
    correct_option: "B",
    explanation_bn: "যিনি সর্বজ্ঞ (সবকিছু জানেন) তাকে 'Omniscient' বলে (Omni = সর্ব + Scient = জ্ঞান)। যিনি সর্বশক্তিমান তিনি 'Omnipotent'; যিনি সর্বত্র বিরাজমান তিনি 'Omnipresent'; আর যিনি বহু ভাষায় দক্ষ তিনি 'Polyglot'।",
    explanation_en: "'Omniscient' describes an entity possessing universal or infinite knowledge (Latin omnis + scire).",
    difficulty: "easy",
    question_type: "vocabulary",
    source_title: "Word Power Made Easy — Norman Lewis",
    source_page_or_section: "Attributes of God and Man"
  },
  {
    subject: "English",
    topic: "Vocabulary — One-Word Substitution",
    subtopic: "Human Traits",
    question_bn: "A person whose bad habits or faults cannot be corrected or reformed is called:",
    question_en: "What term denotes a person incapable of being reformed or corrected?",
    options: {
      A: "Incorrigible",
      B: "Infallible",
      C: "Invincible",
      D: "Incurable"
    },
    correct_option: "A",
    explanation_bn: "যাকে কোনোভাবেই সংশোধন বা ভালো করা যায় না তাকে 'Incorrigible' (অসংশোধনীয়) বলে। যে ব্যক্তি কখনো ভুল করে না সে 'Infallible'; যাকে পরাস্ত করা যায় না সে 'Invincible'।",
    explanation_en: "'Incorrigible' identifies someone whose undesirable tendencies or traits cannot be reformed.",
    difficulty: "easy",
    question_type: "vocabulary",
    source_title: "English Vocabulary in Use — Michael McCarthy",
    source_page_or_section: "Describing Character and Flaws"
  },
  {
    subject: "English",
    topic: "Literature — Old & Middle English",
    subtopic: "Geoffrey Chaucer — Father of English Literature",
    question_bn: "Who is universally celebrated as the 'Father of English Poetry' and authored 'The Canterbury Tales'?",
    question_en: "Who authored 'The Canterbury Tales' and is hailed as the 'Father of English Literature'?",
    options: {
      A: "Geoffrey Chaucer",
      B: "John Gower",
      C: "William Langland",
      D: "Edmund Spenser"
    },
    correct_option: "A",
    explanation_bn: "জিওফ্রে চসার (১৩৪০-১৪০০) চতুর্দশ শতকে মধ্যযুগীয় লন্ডনের কথ্য উপভাষাকে মান্য সাহিত্যিক রূপ দিয়ে ইংরেজি সাহিত্যের ভিত্তি স্থাপন করেন। তাঁর অমর কাব্য সংকলন 'The Canterbury Tales' ২৪টি তীর্থযাত্রীর গল্পের অমূল্য সংকলন। জন ড্রাইডেন তাঁকে ইংরেজি কবিতার পিতা হিসেবে বন্দনা করেন।",
    explanation_en: "Geoffrey Chaucer is acknowledged as the Father of English Poetry and Literature for masterworks like 'The Canterbury Tales'.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "A Critical History of English Literature — David Daiches",
    source_page_or_section: "Geoffrey Chaucer and Middle English"
  },
  {
    subject: "English",
    topic: "Literature — Renaissance & Elizabethan Age",
    subtopic: "Edmund Spenser — Poets' Poet",
    question_bn: "Which Elizabethan poet, acclaimed by Charles Lamb as 'The Poets' Poet', composed the monumental allegorical epic 'The Faerie Queene'?",
    question_en: "Who composed 'The Faerie Queene' and was famously dubbed 'The Poets' Poet' by Charles Lamb?",
    options: {
      A: "Edmund Spenser",
      B: "Sir Philip Sidney",
      C: "John Donne",
      D: "Thomas Sackville"
    },
    correct_option: "A",
    explanation_bn: "এডমুন্ড স্পেন্সার (১৫৫২-১৫৯৯) রানি প্রথম এলিজাবেথকে উৎসর্গ করে সুবিখ্যাত রূপক মহাকাব্য 'The Faerie Queene' রচনা করেন। তিনি স্পেন্সারিয়ান স্ট্যাঞ্জা (Spenserian Stanza — নয় লাইনের ছন্দ) উদ্ভাবন করেন। চার্লস ল্যাম্ব তাঁকে 'কবিদের কবি' (The Poets' Poet) আখ্যা দেন।",
    explanation_en: "Edmund Spenser penned 'The Faerie Queene' and was commemorated by Charles Lamb as 'The Poets' Poet'.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "A History of English Literature — Edward Albert",
    source_page_or_section: "Edmund Spenser and Elizabethan Poetry"
  },
  {
    subject: "English",
    topic: "Literature — Jacobean Period",
    subtopic: "Ben Jonson — Comedy of Humours",
    question_bn: "Who pioneered the dramatic genre 'Comedy of Humours' and authored the satirical masterpiece 'Volpone'?",
    question_en: "Which dramatist popularized the 'Comedy of Humours' with plays like 'Volpone' and 'The Alchemist'?",
    options: {
      A: "Ben Jonson",
      B: "John Webster",
      C: "Thomas Dekker",
      D: "William Shakespeare"
    },
    correct_option: "A",
    explanation_bn: "বেন জনসন (১৫৭২-১৬৩৭) প্রাচীন চিকিৎসা তত্ত্বের চারটি দৈহিক তরল (Blood, Phlegm, Yellow bile, Black bile)-এর অসামঞ্জস্যের ওপর ভিত্তি করে মানুষের আচরণগত অদ্ভুত বৈশিষ্ট্য নিয়ে 'Comedy of Humours' প্রবর্তন করেন। তাঁর শ্রেষ্ঠ নাটক: Volpone (The Fox), Every Man in His Humour, The Alchemist।",
    explanation_en: "Ben Jonson established the 'Comedy of Humours' satirizing human eccentrities in plays like 'Volpone'.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "The Oxford Companion to English Literature",
    source_page_or_section: "Ben Jonson and Comedy of Humours"
  },
  {
    subject: "English",
    topic: "Literature — Commonwealth Period",
    subtopic: "John Milton — Areopagitica",
    question_bn: "Which classic 1644 prose tract by John Milton is hailed as the foundational defense of freedom of speech and of the press?",
    question_en: "Which 1644 polemical treatise by John Milton defends the freedom of the press and unlicensed publishing?",
    options: {
      A: "Areopagitica",
      B: "Of Education",
      C: "Samson Agonistes",
      D: "Lycidas"
    },
    correct_option: "A",
    explanation_bn: "১৬৪৪ সালে ব্রিটিশ পার্লামেন্টের কঠোর মুদ্রণ সেন্সরশিপ লাইসেন্সিং আদেশের বিরুদ্ধে জন মিল্টন তাঁর ঐতিহাসিক প্রবন্ধ 'Areopagitica' রচনা করেন। এটি স্বাধীন মতপ্রকাশ ও মুক্ত সাংবাদিকতার বিশ্বের অন্যতম শ্রেষ্ঠ সনদ।",
    explanation_en: "Milton's 'Areopagitica' (1644) stands as one of history's most eloquent philosophical defenses of freedom of speech and the press.",
    difficulty: "medium",
    question_type: "knowledge",
    source_title: "John Milton: Selected Prose",
    source_page_or_section: "Areopagitica Introduction"
  },
  {
    subject: "English",
    topic: "Literature — Augustan Age",
    subtopic: "Daniel Defoe — Father of the English Novel",
    question_bn: "Which 1719 adventure novel by Daniel Defoe about a shipwrecked mariner on a deserted island is considered one of the earliest English novels?",
    question_en: "Which 1719 novel by Daniel Defoe recounts the solitary survival of a castaway on a remote island?",
    options: {
      A: "Robinson Crusoe",
      B: "Moll Flanders",
      C: "Gulliver's Travels",
      D: "Tom Jones"
    },
    correct_option: "A",
    explanation_bn: "ড্যানিয়েল ডিফো ১৭১৯ সালে আলেকজান্ডার সেলকার্কের বাস্তব ঘটনার অনুপ্রেরণায় 'Robinson Crusoe' রচনা করেন। এটি ইংরেজি উপন্যাসের ইতিহাসের আদি ভিত্তি হিসেবে সমাদৃত। এতে ফ্রাইডে (Friday) চরিত্রটি বিখ্যাত।",
    explanation_en: "Daniel Defoe's 'Robinson Crusoe' (1719) is a foundational narrative that helped establish the English realistic novel.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "The Rise of the Novel — Ian Watt",
    source_page_or_section: "Robinson Crusoe, Individualism and the Novel"
  },
  {
    subject: "English",
    topic: "Literature — 18th Century",
    subtopic: "Samuel Johnson — The Dictionary",
    question_bn: "Who compiled the monumental 'A Dictionary of the English Language' (1755), single-handedly setting the standard for English lexicography?",
    question_en: "Who single-handedly compiled the monumental 1755 'A Dictionary of the English Language'?",
    options: {
      A: "Dr. Samuel Johnson",
      B: "James Boswell",
      C: "Oliver Goldsmith",
      D: "Noah Webster"
    },
    correct_option: "A",
    explanation_bn: "ড. স্যামুয়েল জনসন (Dr. Samuel Johnson) দীর্ঘ নয় বছর একক পরিশ্রমে ১৭৫৫ সালে ঐতিহাসিক 'A Dictionary of the English Language' প্রকাশ করেন। জেমস বসওয়েল তাঁর বিখ্যাত জীবনী 'The Life of Samuel Johnson' রচনা করেন।",
    explanation_en: "Dr. Samuel Johnson published his comprehensive 'Dictionary of the English Language' in 1755, transforming lexicography.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "The Life of Samuel Johnson — James Boswell",
    source_page_or_section: "The Dictionary of 1755"
  },
  {
    subject: "English",
    topic: "Literature — Romantic Period",
    subtopic: "Jane Austen — Domestic Realism",
    question_bn: "'It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.' — opens which Jane Austen novel?",
    question_en: "Which classic novel by Jane Austen opens with this immortal satirical declaration on matrimonial expectations?",
    options: {
      A: "Pride and Prejudice (1813)",
      B: "Sense and Sensibility (1811)",
      C: "Emma (1815)",
      D: "Persuasion (1817)"
    },
    correct_option: "A",
    explanation_bn: "জেন অস্টিনের অমর সামাজিক রোমান্টিক উপন্যাস 'Pride and Prejudice' (১৮১৩)-এর এই অবিস্মরণীয় সূচনা বাক্যটিতে সমকালীন সমাজের ধনী পাত্র খোঁজার বিয়ে সংক্রান্ত মানসিকতাকে তীক্ষ্ণ ব্যঙ্গ করা হয়েছে। উপন্যাসের মূল দুই চরিত্র এলিজাবেথ বেনেট ও ফিটজউইলিয়াম ডার্সি।",
    explanation_en: "This famous opening line belongs to Jane Austen's 1813 masterpiece 'Pride and Prejudice'.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "Jane Austen: Her Life and Art — David Cecil",
    source_page_or_section: "Pride and Prejudice Analysis"
  },
  {
    subject: "English",
    topic: "Literature — Romantic Period",
    subtopic: "Lord Byron — Byronic Hero",
    question_bn: "Which Romantic poet created the archetype of the brooding, rebellious, and melancholic 'Byronic Hero' and composed 'Don Juan'?",
    question_en: "Which flamboyant poet popularized the 'Byronic Hero' and authored 'Childe Harold's Pilgrimage' and 'Don Juan'?",
    options: {
      A: "Lord Byron (George Gordon Byron)",
      B: "P. B. Shelley",
      C: "John Keats",
      D: "William Blake"
    },
    correct_option: "A",
    explanation_bn: "লর্ড বায়রন তাঁর বিখ্যাত কাব্যগ্রন্থ 'Childe Harold's Pilgrimage' এবং মহাকাব্যধর্মী ব্যঙ্গকাব্য 'Don Juan'-এ এমন এক চরিত্রের জন্ম দেন যে সমাজে বিদ্রোহী, আবেগপ্রবণ অথচ আত্মদ্বন্দ্বে ক্ষতবিক্ষত; একে সাহিত্যে 'Byronic Hero' বলা হয়।",
    explanation_en: "Lord Byron introduced the charismatic yet cynical and defiant 'Byronic Hero' persona into European literature.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "Byron: The Poetical Works — Frederick Page",
    source_page_or_section: "Don Juan and the Byronic Hero"
  },
  {
    subject: "English",
    topic: "Literature — Victorian Period",
    subtopic: "The Brontë Sisters",
    question_bn: "Under the pen name 'Ellis Bell', who authored the haunting Gothic romance novel 'Wuthering Heights' (1847)?",
    question_en: "Who authored 'Wuthering Heights' (1847), featuring Heathcliff and Catherine Earnshaw?",
    options: {
      A: "Emily Brontë",
      B: "Charlotte Brontë",
      C: "Anne Brontë",
      D: "George Eliot"
    },
    correct_option: "A",
    explanation_bn: "ব্রন্টি বোনদের মধ্যে মেঝ বোন এমিলি ব্রন্টি (Emily Brontë) ১৮৪৭ সালে এলিস বেল ছদ্মনামে তাঁর একমাত্র উপন্যাস 'Wuthering Heights' প্রকাশ করেন। ক্যাথরিন ও হিথক্লিফের সর্বগ্রাসী তীব্র প্রেমের এক অন্ধকার গথিক রূপ এতে চিত্রিত হয়েছে। বড় বোন শার্লট ব্রন্টি লেখেন 'Jane Eyre'।",
    explanation_en: "Emily Brontë authored the sole Gothic masterpiece 'Wuthering Heights' (1847).",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "The Brontës: Life and Letters — Clement Shorter",
    source_page_or_section: "Emily Brontë and Wuthering Heights"
  },
  {
    subject: "English",
    topic: "Literature — Victorian Period",
    subtopic: "Thomas Hardy — Wessex Novels",
    question_bn: "Which Victorian novelist set his tragic, pessimistic novels in the fictional county of 'Wessex' and wrote 'Tess of the d'Urbervilles'?",
    question_en: "Who authored 'Tess of the d'Urbervilles' and 'The Mayor of Casterbridge', setting them in the pastoral realm of Wessex?",
    options: {
      A: "Thomas Hardy",
      B: "Charles Dickens",
      C: "William Makepeace Thackeray",
      D: "George Eliot"
    },
    correct_option: "A",
    explanation_bn: "টমাস হার্ডি (১৮৪০-১৯২৮) তাঁর প্রায় সকল বিখ্যাত উপন্যাসে দক্ষিণ-পশ্চিম ইংল্যান্ডের কাল্পনিক নাম দেন 'ওয়েসেক্স' (Wessex)। অদৃষ্টবাদ ও প্রকৃতির নির্মম বাস্তবতায় মানুষের ট্র্যাজেডি তিনি নিপুণভাবে তুলে ধরেছেন 'Tess of the d'Urbervilles' (১৮৯১) এবং 'Jude the Obscure'-এ।",
    explanation_en: "Thomas Hardy anchored his fatalistic regional tragedies in the fictional landscape of Wessex.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "Thomas Hardy: The Critical Heritage",
    source_page_or_section: "Wessex Novels Overview"
  },
  {
    subject: "English",
    topic: "Literature — Modern Period",
    subtopic: "W. B. Yeats — Irish Literary Revival",
    question_bn: "'Things fall apart; the centre cannot hold; / Mere anarchy is loosed upon the world' — From which W. B. Yeats poem is this quoted?",
    question_en: "These famous lines forecasting global upheaval are from which landmark poem by William Butler Yeats?",
    options: {
      A: "The Second Coming (1919)",
      B: "Sailing to Byzantium",
      C: "Easter, 1916",
      D: "The Lake Isle of Innisfree"
    },
    correct_option: "A",
    explanation_bn: "আইরিশ সাহিত্যের অবিসংবাদিত কবি ডব্লিউ. বি. ইয়েটস (১৯২৩ সালে সাহিত্যে নোবেল বিজয়ী) প্রথম বিশ্বযুদ্ধোত্তর সভ্যতার ভাঙন দেখে ১৯১৯ সালে 'The Second Coming' কবিতাটি রচনা করেন। নাইজেরিয়ান ঔপন্যাসিক চিনুয়া আচেবে তাঁর বিখ্যাত উপন্যাস 'Things Fall Apart'-এর শিরোনাম এই কবিতা থেকেই নিয়েছিলেন।",
    explanation_en: "These lines are from W. B. Yeats's apocalyptic poem 'The Second Coming' (1919).",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "The Collected Poems of W. B. Yeats",
    source_page_or_section: "The Second Coming"
  },
  {
    subject: "English",
    topic: "Literature — Modern Period",
    subtopic: "Virginia Woolf — Stream of Consciousness",
    question_bn: "Which pioneering modernist feminist author utilized the 'Stream of Consciousness' technique in 'Mrs. Dalloway' and 'To the Lighthouse'?",
    question_en: "Who authored 'To the Lighthouse' and the seminal feminist essay 'A Room of One's Own'?",
    options: {
      A: "Virginia Woolf",
      B: "Katherine Mansfield",
      C: "Sylvia Plath",
      D: "Doris Lessing"
    },
    correct_option: "A",
    explanation_bn: "ভার্জিনিয়া উলফ (১৮৮২-১৯৪১) আধুনিক ইংরেজি উপন্যাসে মানুষের চেতনার অবাধ প্রবাহ (Stream of Consciousness) কৌশলকে শৈল্পিক উচ্চতায় পৌঁছে দেন। তাঁর বিখ্যাত রচনা: Mrs. Dalloway, To the Lighthouse, এবং নারীদের অর্থনৈতিক ও বুদ্ধিবৃত্তিক স্বাধীনতার ডাক দেওয়া প্রবন্ধ 'A Room of One's Own' (১৯২৯)।",
    explanation_en: "Virginia Woolf mastered the stream-of-consciousness narrative style and penned 'A Room of One's Own'.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "Virginia Woolf: A Biography — Quentin Bell",
    source_page_or_section: "Literary Techniques and Feminism"
  },
  {
    subject: "English",
    topic: "Literature — Modern Period",
    subtopic: "James Joyce — Ulysses",
    question_bn: "Which monumental 1922 modernist novel by James Joyce chronicles a single day (16 June 1904) in the life of Leopold Bloom in Dublin?",
    question_en: "Which groundbreaking modernist novel by James Joyce records the events of June 16, 1904 (Bloomsday) in Dublin?",
    options: {
      A: "Ulysses",
      B: "A Portrait of the Artist as a Young Man",
      C: "Dubliners",
      D: "Finnegans Wake"
    },
    correct_option: "A",
    explanation_bn: "আইরিশ সাহিত্যিক জেমস জয়েসের 'Ulysses' (১৯২২) আধুনিক সাহিত্যের অন্যতম জটিল ও শ্রেষ্ঠ উপন্যাস। হোমারের ওডিসির সমান্তরালে এতে ১৬ জুন ১৯০৪-এ ডাবলিনের পথে লিওপোল্ড ব্লুমের একদিনের মানসিক ও শারীরিক অভিযাত্রার নিখুঁত বর্ণনা রয়েছে। বিশ্বজুড়ে দিনটি 'ব্লুমসডে' (Bloomsday) হিসেবে উদযাপিত হয়।",
    explanation_en: "James Joyce's 'Ulysses' (1922) captures Leopold Bloom's journey through Dublin on 16 June 1904.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "James Joyce — Richard Ellmann",
    source_page_or_section: "Ulysses and Bloomsday"
  },
  {
    subject: "English",
    topic: "Literature — Theatre of the Absurd",
    subtopic: "Samuel Beckett — Waiting for Godot",
    question_bn: "Which Nobel-laureate playwright wrote 'Waiting for Godot' (1953), the definitive masterpiece of the 'Theatre of the Absurd'?",
    question_en: "Who authored the iconic Absurdist play 'Waiting for Godot', featuring Vladimir and Estragon?",
    options: {
      A: "Samuel Beckett",
      B: "Harold Pinter",
      C: "Eugene Ionesco",
      D: "Edward Albee"
    },
    correct_option: "A",
    explanation_bn: "আইরিশ নাট্যকার স্যামুয়েল বেকেট (১৯৬৯ সালে নোবেল বিজয়ী) ১৯৫৩ সালে 'Waiting for Godot' নাটকটি রচনা করেন। এতে ভ্লাদিমির ও এস্ট্রাগন নামক দুই চরিত্র এক জনমানবহীন গাছের নিচে একজন অজানা ব্যক্তি 'গোদো' (Godot)-র জন্য নিরন্তর অপেক্ষা করে কিন্তু সে কখনোই আসে না। এটি মানুষের অর্থহীন অস্তিত্ব ও অ্যাবসার্ড নাট্যধারার শ্রেষ্ঠ স্মারক।",
    explanation_en: "Samuel Beckett's 'Waiting for Godot' epitomizes the Theatre of the Absurd.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "The Theatre of the Absurd — Martin Esslin",
    source_page_or_section: "Samuel Beckett Chapter"
  },
  {
    subject: "English",
    topic: "Literature — Figures of Speech",
    subtopic: "Metaphor vs Simile",
    question_bn: "'Life is a broken-winged bird that cannot fly.' — This sentence is an example of which literary device?",
    question_en: "Which figure of speech is exemplified in Langston Hughes's line 'Life is a broken-winged bird that cannot fly'?",
    options: {
      A: "Simile",
      B: "Metaphor",
      C: "Personification",
      D: "Alliteration"
    },
    correct_option: "B",
    explanation_bn: "যখন 'like' বা 'as' ব্যবহার না করে সরাসরি দুটি ভিন্নধর্মী বস্তুর মধ্যে অভেদ তুলনা করা হয় (Life = a broken-winged bird), তখন তাকে রূপক বা 'Metaphor' বলে। 'Like' বা 'as' থাকলে তা 'Simile' হতো (যেমন: Life is like a bird)।",
    explanation_en: "An implicit comparison between two unlike entities without using 'like' or 'as' is a Metaphor.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "A Glossary of Literary Terms — M. H. Abrams",
    source_page_or_section: "Metaphor and Simile"
  },
  {
    subject: "English",
    topic: "Literature — Figures of Speech",
    subtopic: "Synecdoche vs Metonymy",
    question_bn: "Using the expression 'Fifty head of cattle' where a part ('head') represents the whole animal is an example of:",
    question_en: "What rhetorical device uses a part of something to signify the whole (e.g. 'hired hands' for workers)?",
    options: {
      A: "Synecdoche",
      B: "Metonymy",
      C: "Hyperbole",
      D: "Onomatopoeia"
    },
    correct_option: "A",
    explanation_bn: "'Synecdoche' (উপলক্ষণ) হলো এমন একটি অলঙ্কার যেখানে কোনো সমগ্র সত্তাকে বোঝাতে তার একটি অঙ্গ বা অংশকে উল্লেখ করা হয় (Part for the whole, যেমন: All hands on deck = workers; head of cattle)। আর 'Metonymy' হলো কোনো বস্তুর সাথে ঘনিষ্ঠভাবে সম্পর্কিত অন্য কোনো প্রতীকী শব্দ ব্যবহার করা (যেমন: The pen is mightier than the sword)।",
    explanation_en: "Synecdoche is a figure of speech in which a part is made to represent the whole.",
    difficulty: "medium",
    question_type: "knowledge",
    source_title: "The Oxford Dictionary of Literary Terms — Chris Baldick",
    source_page_or_section: "Synecdoche"
  },
  {
    subject: "English",
    topic: "Literature — Figures of Speech",
    subtopic: "Personification",
    question_bn: "'The autumn wind whispered secrets through the trembling leaves.' — Which literary device is employed here?",
    question_en: "Attributing human traits like 'whispering secrets' to the non-human wind is an example of:",
    options: {
      A: "Personification",
      B: "Hyperbole",
      C: "Irony",
      D: "Euphemism"
    },
    correct_option: "A",
    explanation_bn: "যখন কোনো জড় পদার্থ, প্রাকৃতিক উপাদান বা বিমূর্ত ধারণাকে মানুষের মতো অনুভূতি, আচরণ বা কথা বলার ক্ষমতা আরোপ করে চিত্রিত করা হয়, তখন তাকে ব্যক্তিত্বারোপ বা 'Personification' বলে।",
    explanation_en: "Personification endows inanimate objects or natural forces with human attributes or emotions.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "A Glossary of Literary Terms — M. H. Abrams",
    source_page_or_section: "Personification"
  },
  {
    subject: "English",
    topic: "Grammar — Tense & Sequence",
    subtopic: "Past Perfect with 'Before' and 'After'",
    question_bn: "'The train had departed before we ______ the station.' — Fill in the blank:",
    question_en: "Choose the correct verb form: 'The train had departed before we ______ the station.'",
    options: {
      A: "reached",
      B: "had reached",
      C: "have reached",
      D: "reach"
    },
    correct_option: "A",
    explanation_bn: "অতীতের দুটি ঘটনার মধ্যে যে কাজটি আগে সম্পন্ন হয়েছিল তা Past Perfect (had departed) হয় এবং 'before'-এর পরের অংশে তুলনামূলক পরের কাজটি Past Indefinite (reached) হয়। সূত্র: Past Perfect + before + Past Indefinite।",
    explanation_en: "In past sequence of events, 'before' is preceded by past perfect and followed by past simple ('reached').",
    difficulty: "easy",
    question_type: "grammar",
    source_title: "High School English Grammar — Wren & Martin",
    source_page_or_section: "Past Perfect Tense Sequences"
  },
  {
    subject: "English",
    topic: "Grammar — Tense & Sequence",
    subtopic: "Since with Tense Sequences",
    question_bn: "'It is ten years since I last ______ him.' — শূন্যস্থানে সঠিক verb কোনটি?",
    question_en: "Select the correct form of verb: 'It is ten years since I last ______ him.'",
    options: {
      A: "saw",
      B: "have seen",
      C: "had seen",
      D: "see"
    },
    correct_option: "A",
    explanation_bn: "নিয়ম: 'Since'-এর পূর্ববর্তী অংশ Present Indefinite বা Present Perfect হলে 'since'-এর পরবর্তী অংশ Past Indefinite হয়। এখানে 'It is ten years' Present Tense, সুতরাং পরের অংশে V2 রূপ 'saw' বসবে।",
    explanation_en: "When 'since' connects clauses, a present tense principal clause requires a past indefinite clause following 'since' ('saw').",
    difficulty: "medium",
    question_type: "grammar",
    source_title: "Oxford Practice Grammar — John Eastwood",
    source_page_or_section: "Conjunctions of Time: Since"
  },
  {
    subject: "English",
    topic: "Grammar — Subject-Verb Agreement",
    subtopic: "Titles of Books and Subject Names",
    question_bn: "'Gulliver's Travels ______ written by Jonathan Swift.' — Choose the correct auxiliary verb:",
    question_en: "Fill in the blank: 'Gulliver's Travels ______ written by Jonathan Swift.'",
    options: {
      A: "was",
      B: "were",
      C: "are",
      D: "have been"
    },
    correct_option: "A",
    explanation_bn: "কোনো একক বইয়ের নাম, সিনেমার নাম বা সাহিত্যের শিরোনাম দেখতে বহুবচন বা প্লুরাল (যেমন 'Travels') মনে হলেও তা মূলত একটি একক গ্রন্থের নাম, তাই এর পর সিঙ্গুলার Verb (was) বসে।",
    explanation_en: "The titles of books or artistic works taking a plural form remain singular entities, requiring the singular verb 'was'.",
    difficulty: "easy",
    question_type: "grammar",
    source_title: "Wren & Martin English Grammar",
    source_page_or_section: "Subject-Verb Agreement"
  },
  {
    subject: "English",
    topic: "Vocabulary — Synonyms",
    subtopic: "Academic Words",
    question_bn: "What is the synonym of the word 'PRUDENT'?",
    question_en: "Identify the closest synonym of the word 'PRUDENT':",
    options: {
      A: "Judicious / Wise",
      B: "Reckless",
      C: "Extravagant",
      D: "Impulsive"
    },
    correct_option: "A",
    explanation_bn: "'Prudent' অর্থ দূরদর্শী, বিচক্ষণ বা সুবিবেচক (acting with or showing care and thought for the future)。 এর সমার্থক শব্দ হলো 'Judicious', 'Wise', বা 'Cautious'। বিপরীত শব্দ 'Reckless'।",
    explanation_en: "'Prudent' means wise and cautious in practical affairs, identical in meaning to 'Judicious'.",
    difficulty: "easy",
    question_type: "vocabulary",
    source_title: "Merriam-Webster Vocabulary Builder",
    source_page_or_section: "Root: Prudence"
  },
  {
    subject: "English",
    topic: "Vocabulary — Antonyms",
    subtopic: "Values and Reverence",
    question_bn: "What is the antonym of the word 'VENERATE'?",
    question_en: "Which word is opposite in meaning to 'VENERATE'?",
    options: {
      A: "Despise / Scorn",
      B: "Revere",
      C: "Worship",
      D: "Respect"
    },
    correct_option: "A",
    explanation_bn: "'Venerate' অর্থ গভীর শ্রদ্ধা করা বা পূজা করা (regard with great respect / revere)। এর বিপরীতার্থক শব্দ হলো 'Despise' (ঘৃণা করা বা অবজ্ঞা করা) অথবা 'Scorn'।",
    explanation_en: "'Venerate' means to treat with profound reverence; its antonym is 'Despise' or 'Disdain'.",
    difficulty: "easy",
    question_type: "vocabulary",
    source_title: "Word Power Made Easy — Norman Lewis",
    source_page_or_section: "Respect and Reverence"
  },
  {
    subject: "English",
    topic: "Vocabulary — Idioms & Phrases",
    subtopic: "Common Social Idioms",
    question_bn: "What does the idiom 'To break the ice' mean?",
    question_en: "What does the expression 'To break the ice' mean in social contexts?",
    options: {
      A: "To initiate conversation and relieve social awkwardness",
      B: "To melt frozen waterways",
      C: "To provoke a quarrel",
      D: "To complete a hazardous journey"
    },
    correct_option: "A",
    explanation_bn: "'To break the ice' বাগ্ধারাটির অর্থ অচেনা মানুষের মধ্যে জড়তা বা অস্বস্তি দূর করে প্রথম কথা শুরু করা (To initiate a conversation in a friendly and relaxed way).",
    explanation_en: "'To break the ice' means to overcome initial social awkwardness and get a friendly conversation going.",
    difficulty: "easy",
    question_type: "vocabulary",
    source_title: "Oxford Dictionary of English Idioms",
    source_page_or_section: "Break the ice"
  },
  {
    subject: "English",
    topic: "Vocabulary — Spelling",
    subtopic: "Frequently Tested Spelling",
    question_bn: "ইংরেজি 'আমলাতন্ত্র' অর্থে 'Bureaucracy' শব্দের কোন বানানটি শুদ্ধ?",
    question_en: "Identify the correctly spelled word for 'Bureaucracy':",
    options: {
      A: "Bureaucracy",
      B: "Burocracy",
      C: "Beurocracy",
      D: "Bureaucrasy"
    },
    correct_option: "A",
    explanation_bn: "আমলাতন্ত্রের সঠিক ইংরেজি বানান হলো 'Bureaucracy' (B-u-r-e-a-u-c-r-a-c-y)।",
    explanation_en: "'Bureaucracy' is correctly spelled B-U-R-E-A-U-C-R-A-C-Y (from French 'bureau' + Greek 'kratos').",
    difficulty: "easy",
    question_type: "vocabulary",
    source_title: "Oxford Advanced Learner's Dictionary",
    source_page_or_section: "Spelling: Bureaucracy"
  },
  {
    subject: "English",
    topic: "Literature — Romantic Period",
    subtopic: "Mary Shelley — Frankenstein",
    question_bn: "Which landmark Gothic science-fiction novel subtitled 'The Modern Prometheus' was authored by Mary Shelley in 1818?",
    question_en: "Who authored the 1818 classic novel 'Frankenstein; or, The Modern Prometheus'?",
    options: {
      A: "Mary Shelley",
      B: "Ann Radcliffe",
      C: "Mary Wollstonecraft",
      D: "Jane Austen"
    },
    correct_option: "A",
    explanation_bn: "পি. বি. শেলীর সহধর্মিণী মেরি শেলী (Mary Shelley) মাত্র বিশ বছর বয়সে ১৮১৮ সালে কালজয়ী বিজ্ঞান কল্পকাহিনী উপন্যাস 'Frankenstein' রচনা করেন। এতে বিজ্ঞানী ভিক্টর ফ্রাঙ্কেনস্টাইন প্রাণহীন অঙ্গপ্রত্যঙ্গ জোড়া লাগিয়ে কৃত্রিম মানবসদৃশ দানব সৃষ্টি করেন।",
    explanation_en: "Mary Shelley authored 'Frankenstein; or, The Modern Prometheus' (1818), pioneering science fiction.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "The Cambridge Companion to Mary Shelley",
    source_page_or_section: "Frankenstein Analysis"
  }
];
