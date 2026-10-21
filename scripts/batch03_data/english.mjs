export const englishQuestions = [
  {
    subject: "English",
    topic: "Grammar — Parts of Speech",
    subtopic: "Noun Classifications",
    question_bn: "'The committee has arrived at a unanimous decision.' — এই বাক্যে 'committee' শব্দটি কোন প্রকারের Noun?",
    question_en: "In 'The committee has arrived at a unanimous decision', what type of noun is 'committee'?",
    options: {
      A: "Proper Noun",
      B: "Common Noun",
      C: "Collective Noun",
      D: "Abstract Noun"
    },
    correct_option: "C",
    explanation_bn: "'Committee' হলো একাধিক ব্যক্তির সমষ্টিবাচক বিশেষ্য (Collective Noun)। যখন কোনো কালেক্টিভ নাউন সর্বসম্মতিক্রমে একক সত্তা হিসেবে কাজ করে, তখন এর পর সিঙ্গুলার ভার্ব (has arrived) বসে। মতভেদ দেখা দিলে তা Noun of Multitude হয় এবং প্লুরাল ভার্ব গ্রহণ করে।",
    explanation_en: "'Committee' represents a unified group functioning as a single collective entity, thus it is a Collective Noun taking a singular verb here.",
    difficulty: "easy",
    question_type: "grammar",
    source_title: "A Practical English Grammar — Thomson & Martinet",
    source_page_or_section: "Nouns: Collective Nouns"
  },
  {
    subject: "English",
    topic: "Grammar — Parts of Speech",
    subtopic: "Abstract Noun Formation",
    question_bn: "'Coward' (ভীতু ব্যক্তি) শব্দটির Abstract Noun রূপ কোনটি?",
    question_en: "What is the correct abstract noun form of the word 'Coward'?",
    options: {
      A: "Cowardly",
      B: "Cowardice",
      C: "Cowardness",
      D: "Cowardism"
    },
    correct_option: "B",
    explanation_bn: "'Coward' (Noun) শব্দের Abstract Noun হলো 'Cowardice' (কাপুরুষতা বা ভীরুতা)। আর 'Cowardly' হলো Adjective (যেমন: a cowardly act)।",
    explanation_en: "'Cowardice' is the abstract quality or state of being a coward, while 'cowardly' functions as an adjective.",
    difficulty: "medium",
    question_type: "vocabulary",
    source_title: "High School English Grammar & Composition — Wren & Martin",
    source_page_or_section: "Formation of Abstract Nouns"
  },
  {
    subject: "English",
    topic: "Grammar — Pronoun",
    subtopic: "Relative Pronoun Agreement",
    question_bn: "Choose the grammatically correct sentence:",
    question_en: "Select the sentence with accurate relative pronoun-verb agreement:",
    options: {
      A: "It is I who is responsible for the lapse.",
      B: "It is I who am responsible for the lapse.",
      C: "It is I whom are responsible for the lapse.",
      D: "It is I who are responsible for the lapse."
    },
    correct_option: "B",
    explanation_bn: "Relative pronoun (who, which, that)-এর পরবর্তী verb তার পূর্ববর্তী Antecedent (পূর্বপদ) অনুযায়ী নির্ধারিত হয়। এখানে 'who'-এর পূর্বপদ হলো ১ম পুরুষ 'I', তাই এর পরে 'am' বসবে: 'It is I who am responsible...'",
    explanation_en: "A relative pronoun agrees with its antecedent in person and number; since the antecedent is 'I', the verb following 'who' must be 'am'.",
    difficulty: "medium",
    question_type: "grammar",
    source_title: "Practical English Usage — Michael Swan",
    source_page_or_section: "Relative Pronouns and Antecedents"
  },
  {
    subject: "English",
    topic: "Grammar — Subject-Verb Agreement",
    subtopic: "Compound Subjects with 'Together with'",
    question_bn: "'The captain, together with his crew members, ______ awarded for bravery.' — শূন্যস্থানে সঠিক verb কোনটি?",
    question_en: "Identify the correct verb for: 'The captain, together with his crew members, ______ awarded for bravery.'",
    options: {
      A: "were",
      B: "was",
      C: "are",
      D: "have been"
    },
    correct_option: "B",
    explanation_bn: "যখন দুটি Subject 'with', 'together with', 'along with', 'as well as', 'accompanied by' দ্বারা যুক্ত হয়, তখন Verb সর্বদা প্রথম Subject অনুযায়ী বসে। এখানে ১ম Subject 'The captain' (3rd person singular), তাই Verb হবে 'was'।",
    explanation_en: "When subjects are joined by parenthetical connectors like 'together with', the verb agrees with the primary head subject ('The captain' -> singular 'was').",
    difficulty: "easy",
    question_type: "grammar",
    source_title: "Cliffs TOEFL Preparation Guide — Michael A. Pyle",
    source_page_or_section: "Subject-Verb Agreement: Intervening Prepositional Phrases"
  },
  {
    subject: "English",
    topic: "Grammar — Subject-Verb Agreement",
    subtopic: "Correlative Conjunctions (Either...or / Neither...nor)",
    question_bn: "'Neither the manager nor the employees ______ present at the briefing yesterday.'",
    question_en: "Fill in the blank: 'Neither the manager nor the employees ______ present at the briefing yesterday.'",
    options: {
      A: "was",
      B: "were",
      C: "is",
      D: "has been"
    },
    correct_option: "B",
    explanation_bn: "'Either...or', 'Neither...nor', 'Not only...but also' দ্বারা ভিন্ন বচনের দুটি Subject যুক্ত হলে Verb সর্বদা নিকটবর্তী Subject (Proximity rule) অনুযায়ী বসে। এখানে Verb-এর নিকটবর্তী Subject হলো প্লুরাল 'the employees', তাই অতীত কালের প্লুরাল Verb 'were' বসবে।",
    explanation_en: "Under the rule of proximity with 'neither...nor', the verb agrees with the closer subject ('employees' -> 'were').",
    difficulty: "easy",
    question_type: "grammar",
    source_title: "Wren & Martin High School English Grammar",
    source_page_or_section: "Agreement of Verb with Subject"
  },
  {
    subject: "English",
    topic: "Grammar — Conditional Sentences",
    subtopic: "Third Conditional",
    question_bn: "'If he had informed me in advance, I ______ the arrangements.' — শূন্যস্থানে সঠিক রূপ কোনটি?",
    question_en: "Complete the conditional clause: 'If he had informed me in advance, I ______ the arrangements.'",
    options: {
      A: "would make",
      B: "would have made",
      C: "will have made",
      D: "had made"
    },
    correct_option: "B",
    explanation_bn: "Third Conditional-এর গঠন হলো: If + Past Perfect Tense (had + V3), Subject + would have / could have / might have + Past Participle (V3)। সুতরাং সঠিক উত্তর 'would have made'।",
    explanation_en: "The third conditional expressing past counterfactual situations requires 'would have + past participle' in the main clause.",
    difficulty: "easy",
    question_type: "grammar",
    source_title: "Oxford Practice Grammar — John Eastwood",
    source_page_or_section: "Third Conditional Sentences"
  },
  {
    subject: "English",
    topic: "Grammar — Subjunctive Mood",
    subtopic: "Mandative Subjunctive",
    question_bn: "'The doctor recommended that the patient ______ complete bed rest.' — শূন্যস্থানে ব্যাকরণসম্মত রূপ কোনটি?",
    question_en: "Select the grammatically correct subjunctive verb: 'The doctor recommended that the patient ______ complete bed rest.'",
    options: {
      A: "takes",
      B: "took",
      C: "take",
      D: "has taken"
    },
    correct_option: "C",
    explanation_bn: "সুপারিশ, আদেশ বা অনুরোধ জ্ঞাপক Mandative Subjunctive verb (যেমন: recommend, suggest, demand, insist, require)-এর পর 'that-clause'-এ subject সিঙ্গুলার হলেও verb-এর বেস ফর্ম (bare infinitive / V1) বসে। তাই 'take' হবে (takes নয়)।",
    explanation_en: "Mandative subjunctive verbs (recommend, insist) take a base form of the verb without inflections ('take') regardless of the subject's number.",
    difficulty: "hard",
    question_type: "grammar",
    source_title: "Barron's TOEFL iBT — Pamela J. Sharpe",
    source_page_or_section: "Subjunctive Verbs Structure"
  },
  {
    subject: "English",
    topic: "Grammar — Inversion",
    subtopic: "Negative Adverb Inversion",
    question_bn: "'Seldom ______ such a breathtaking natural panorama.' — সঠিক বাক্যরূপ নির্বাচন করুন:",
    question_en: "Choose the correct inverted sentence structure: 'Seldom ______ such a breathtaking natural panorama.'",
    options: {
      A: "I have witnessed",
      B: "have I witnessed",
      C: "I had witnessed",
      D: "did I witnessed"
    },
    correct_option: "B",
    explanation_bn: "বাক্যের শুরুতে যখন কোনো নেগেটিভ বা সীমাবদ্ধতামূলক Adverb (যেমন: Seldom, Rarely, Scarcely, Never, Hardly) আসে, তখন Subject-এর পূর্বে Auxiliary Verb বসে (Negative Inversion)। তাই সঠিক রূপ: 'Seldom have I witnessed...'",
    explanation_en: "Negative frequency adverbs at the beginning of a clause trigger subject-auxiliary inversion ('have I witnessed').",
    difficulty: "medium",
    question_type: "grammar",
    source_title: "Advanced Grammar in Use — Martin Hewings",
    source_page_or_section: "Inversion after Negative Adverbs"
  },
  {
    subject: "English",
    topic: "Grammar — Voice Change",
    subtopic: "Quasi-Passive Verbs",
    question_bn: "'Honey tastes sweet.' — বাক্যটির সঠিক Passive Voice কোনটি?",
    question_en: "What is the correct passive transformation of the quasi-passive sentence 'Honey tastes sweet'?",
    options: {
      A: "Sweetness is tasted by honey.",
      B: "Honey is sweet when it is tasted.",
      C: "Honey was tasted sweet.",
      D: "Honey is tasted sweetly."
    },
    correct_option: "B",
    explanation_bn: "'Quasi-Passive' verb (যা গঠনে active কিন্তু অর্থে passive, যেমন: taste, smell, feel, read)-কে passive করতে হলে গঠন হয়: Subject + be verb + adjective + when/if + it/they + be verb + V3। তাই: 'Honey is sweet when it is tasted.'",
    explanation_en: "Quasi-passive sentences with sensory verbs follow the formula: Subject + be verb + adjective + when it is + V3 ('Honey is sweet when it is tasted').",
    difficulty: "easy",
    question_type: "grammar",
    source_title: "A Comprehensive English Grammar — Eckersley",
    source_page_or_section: "Passive of Quasi-Passive Verbs"
  },
  {
    subject: "English",
    topic: "Grammar — Voice Change",
    subtopic: "Imperative Sentence with Order",
    question_bn: "'Shut the door at once.' — বাক্যটির সঠিক Passive রূপ কোনটি?",
    question_en: "What is the passive form of the imperative command 'Shut the door at once'?",
    options: {
      A: "Let the door be shut at once.",
      B: "Let the door shut at once.",
      C: "The door should be shut at once.",
      D: "You are asked shut the door at once."
    },
    correct_option: "A",
    explanation_bn: "আদেশসূচক Imperative sentence-এর passive গঠন: Let + Object + be + Past Participle (V3) + বাকি অংশ। Shut-এর তিনটি রূপই shut (shut-shut-shut)। তাই সঠিক উত্তর: 'Let the door be shut at once.'",
    explanation_en: "Imperative commands are transformed into passive via 'Let + object + be + past participle'.",
    difficulty: "easy",
    question_type: "grammar",
    source_title: "Wren & Martin English Grammar",
    source_page_or_section: "Voice of Imperative Sentences"
  },
  {
    subject: "English",
    topic: "Grammar — Narration / Reported Speech",
    subtopic: "Exclamatory Sentences",
    question_bn: "He said, 'Alas! I am undone.' — বাক্যটির Indirect Speech কোনটি?",
    question_en: "Identify the correct indirect speech for: He said, 'Alas! I am undone.'",
    options: {
      A: "He exclaimed with sorrow that he was undone.",
      B: "He said with grief that he is undone.",
      C: "He exclaimed that he had undone.",
      D: "He told sadly that he was undone."
    },
    correct_option: "A",
    explanation_bn: "দুঃখপ্রকাশক Exclamatory sentence-এ reporting verb পরিবর্তিত হয়ে 'exclaimed with sorrow / grief' হয় এবং লিংকার হিসেবে 'that' বসে। Present Indefinite (am undone) পরিবর্তিত হয়ে Past Indefinite (was undone) হয়।",
    explanation_en: "Exclamations expressing grief use 'exclaimed with sorrow that' followed by appropriate tense backshifting ('was undone').",
    difficulty: "easy",
    question_type: "grammar",
    source_title: "High School English Grammar — Wren & Martin",
    source_page_or_section: "Direct and Indirect Speech: Exclamations"
  },
  {
    subject: "English",
    topic: "Grammar — Prepositions",
    subtopic: "Appropriate Prepositions",
    question_bn: "The magistrate took cognizance ______ the public grievance.",
    question_en: "Select the appropriate preposition: 'The magistrate took cognizance ______ the public grievance.'",
    options: {
      A: "of",
      B: "for",
      C: "to",
      D: "into"
    },
    correct_option: "A",
    explanation_bn: "'Cognizance' শব্দের সাথে এপ্রোপ্রিয়েট প্রিপজিশন 'of' বসে। 'Take cognizance of' একটি আইনগত ও আনুষ্ঠানিক ফ্রেজ যার অর্থ কোনো বিষয়ে আনুষ্ঠানিক দৃষ্টি দেওয়া বা আমলে নেওয়া (take judicial notice of).",
    explanation_en: "The standard idiomatic collocation is 'take cognizance of', meaning to notice, acknowledge, or take legal jurisdiction over.",
    difficulty: "medium",
    question_type: "vocabulary",
    source_title: "Oxford Collocations Dictionary for Students of English",
    source_page_or_section: "Cognizance Collocations"
  },
  {
    subject: "English",
    topic: "Grammar — Prepositions",
    subtopic: "Preposition with Verbs of Dispensing",
    question_bn: "'The institution has decided to dispense ______ obsolete manual records.'",
    question_en: "Fill in the correct preposition: 'The institution has decided to dispense ______ obsolete manual records.'",
    options: {
      A: "with",
      B: "from",
      C: "of",
      D: "away"
    },
    correct_option: "A",
    explanation_bn: "'Dispense with' একটি সুপরিচিত Phrasal Verb যার অর্থ কোনো কিছু বাদ দেওয়া বা কোনো কিছু ছাড়া কাজ চালানো (to manage without or get rid of).",
    explanation_en: "'Dispense with' means to discard, forgo, or manage without something unnecessary.",
    difficulty: "medium",
    question_type: "vocabulary",
    source_title: "Cambridge International Dictionary of Phrasal Verbs",
    source_page_or_section: "Dispense with"
  },
  {
    subject: "English",
    topic: "Grammar — Gerund and Participle",
    subtopic: "Distinguishing Gerund from Participle",
    question_bn: "'Walking is a healthy habit.' — এখানে 'Walking' শব্দটি কী?",
    question_en: "In 'Walking is a healthy habit', what is 'Walking'?",
    options: {
      A: "Gerund",
      B: "Present Participle",
      C: "Verbal Noun",
      D: "Past Participle"
    },
    correct_option: "A",
    explanation_bn: "Verb + ing যখন একই সাথে Verb ও Noun-এর কাজ করে (এখানে বাক্যের Subject হিসেবে কাজ করছে), তখন তাকে Gerund বলে। Verbal Noun হতে হলে পূর্বে 'the' এবং পরে 'of' থাকতে হয় (যেমন: The walking of the old man).",
    explanation_en: "'Walking' acts as the subject of the clause combining verbal meaning with nominal function, hence it is a Gerund.",
    difficulty: "easy",
    question_type: "grammar",
    source_title: "English Grammar in Use — Raymond Murphy",
    source_page_or_section: "Gerunds as Subjects"
  },
  {
    subject: "English",
    topic: "Grammar — Degree of Comparison",
    subtopic: "Irregular and Absolute Adjectives",
    question_bn: "নিচের কোন Adjective-টির Comparative বা Superlative ডিগ্রি হয় না (Absolute Adjective)?",
    question_en: "Which of the following is an absolute (non-gradable) adjective that cannot take comparative degrees?",
    options: {
      A: "Unique",
      B: "Wise",
      C: "Great",
      D: "Noble"
    },
    correct_option: "A",
    explanation_bn: "'Unique' একটি Absolute বা Non-gradable Adjective (যার অর্থ অদ্বিতীয়/অনন্য)। এর আগে 'more', 'most' বা 'very' বসে না। একই রূপ অন্যান্য শব্দ: Perfect, Universal, Complete, Dead, Round, Infinite ইত্যাদি।",
    explanation_en: "'Unique' describes an absolute state (one of a kind) and cannot logically be graded with comparative or superlative modifiers.",
    difficulty: "medium",
    question_type: "grammar",
    source_title: "The Blue Book of Grammar and Punctuation — Jane Straus",
    source_page_or_section: "Non-gradable Adjectives"
  },
  {
    subject: "English",
    topic: "Vocabulary — Synonyms",
    subtopic: "Advanced Vocabulary",
    question_bn: "What is the closest synonym of the word 'EPHEMERAL'?",
    question_en: "Identify the closest synonym of the word 'EPHEMERAL':",
    options: {
      A: "Permanent",
      B: "Transient",
      C: "Eternal",
      D: "Monotonous"
    },
    correct_option: "B",
    explanation_bn: "'Ephemeral' অর্থ ক্ষণস্থায়ী বা অল্পক্ষণ স্থায়ী (lasting for a very short time)। এর সমার্থক শব্দ হলো 'Transient' বা 'Fleeting'। অপরদিকে 'Permanent' ও 'Eternal' হলো এর বিপরীতার্থক শব্দ।",
    explanation_en: "'Ephemeral' denotes short-lived or fleeting duration; its closest synonym is 'Transient'.",
    difficulty: "easy",
    question_type: "vocabulary",
    source_title: "Merriam-Webster's Collegiate Dictionary",
    source_page_or_section: "Entry: Ephemeral"
  },
  {
    subject: "English",
    topic: "Vocabulary — Synonyms",
    subtopic: "Academic Vocabulary",
    question_bn: "The word 'OBSEQUIOUS' is synonymous with:",
    question_en: "Which of the following is a synonym of 'OBSEQUIOUS'?",
    options: {
      A: "Servile",
      B: "Arrogant",
      C: "Defiant",
      D: "Sincere"
    },
    correct_option: "A",
    explanation_bn: "'Obsequious' শব্দের অর্থ অতিরিক্ত তোষামোদকারী বা দাসসুলভ (obedient or attentive to an excessive or servile degree)। এর সমার্থক শব্দ 'Servile', 'Fawning', বা 'Sycophantic'।",
    explanation_en: "'Obsequious' describes excessively obedient, fawning behavior, making 'Servile' the exact synonym.",
    difficulty: "medium",
    question_type: "vocabulary",
    source_title: "Word Power Made Easy — Norman Lewis",
    source_page_or_section: "Session on Personality Types"
  },
  {
    subject: "English",
    topic: "Vocabulary — Antonyms",
    subtopic: "Opposites in Context",
    question_bn: "What is the antonym of the word 'MITIGATE'?",
    question_en: "Choose the word opposite in meaning to 'MITIGATE':",
    options: {
      A: "Alleviate",
      B: "Assuage",
      C: "Exacerbate",
      D: "Subdue"
    },
    correct_option: "C",
    explanation_bn: "'Mitigate' অর্থ প্রশমিত করা, তীব্রতা কমানো বা উপশম করা (to lessen the gravity or severity of)。 এর বিপরীতার্থক শব্দ হলো 'Exacerbate' (আরও তীব্র বা খারাপ করে তোলা / worsen)। 'Alleviate' ও 'Assuage' হলো এর সমার্থক।",
    explanation_en: "'Mitigate' means to make less severe, while 'Exacerbate' means to worsen or aggravate, making it the antonym.",
    difficulty: "easy",
    question_type: "vocabulary",
    source_title: "Barron's Essential Words for the GRE",
    source_page_or_section: "Vocabulary List: M"
  },
  {
    subject: "English",
    topic: "Vocabulary — Antonyms",
    subtopic: "Opposites in Context",
    question_bn: "The antonym of 'GARRULOUS' is:",
    question_en: "What is the antonym of the word 'GARRULOUS'?",
    options: {
      A: "Taciturn",
      B: "Loquacious",
      C: "Voluble",
      D: "Chatty"
    },
    correct_option: "A",
    explanation_bn: "'Garrulous' অর্থ বাচাল বা অতিরিক্ত কথা বলা ব্যক্তি (excessively talkative)。 এর বিপরীত শব্দ হলো 'Taciturn' (অল্পভাষী, মিতভাষী বা নীরব স্বভাবের person)。 'Loquacious' ও 'Voluble' হলো Garrulous-এর সমার্থক।",
    explanation_en: "'Garrulous' denotes excessive talkativeness, whose direct antonym is 'Taciturn' (habitually silent).",
    difficulty: "medium",
    question_type: "vocabulary",
    source_title: "Word Power Made Easy — Norman Lewis",
    source_page_or_section: "Session on Speech Habits"
  },
  {
    subject: "English",
    topic: "Vocabulary — Idioms & Phrases",
    subtopic: "Classical Idioms",
    question_bn: "The idiom 'Achilles' heel' signifies:",
    question_en: "What is the meaning of the idiomatic phrase 'Achilles' heel'?",
    options: {
      A: "A secret strength",
      B: "A vulnerable weak spot",
      C: "A fast runner",
      D: "An honorable defeat"
    },
    correct_option: "B",
    explanation_bn: "গ্রিক পৌরাণিক বীর একিলিসের পৌরাণিক কাহিনী থেকে উদ্ভূত 'Achilles' heel' বাগ্ধারাটির অর্থ আপাতদৃষ্টিতে অপরাজেয় কারো একমাত্র দুর্বলতম বা অসুরক্ষিত স্থান (a vulnerable or fatal point in an otherwise strong situation).",
    explanation_en: "Originating from Greek mythology, 'Achilles' heel' refers to an ostensibly minor weakness that could cause fatal failure.",
    difficulty: "easy",
    question_type: "vocabulary",
    source_title: "Oxford Dictionary of Idioms",
    source_page_or_section: "Mythological Idioms: Achilles' heel"
  },
  {
    subject: "English",
    topic: "Vocabulary — Idioms & Phrases",
    subtopic: "Everyday Idiomatic Expressions",
    question_bn: "What does the expression 'To burn the candle at both ends' mean?",
    question_en: "What does the idiom 'To burn the candle at both ends' mean?",
    options: {
      A: "To be extremely stingy",
      B: "To overwork and exhaust one's energy",
      C: "To illuminate a room lavishly",
      D: "To destroy properties intentionally"
    },
    correct_option: "B",
    explanation_bn: "'To burn the candle at both ends' বাগ্ধারাটির অর্থ সকাল থেকে গভীর রাত পর্যন্ত অতিরিক্ত শারীরিক বা মানসিক পরিশ্রম করে নিজের স্বাস্থ্য বা জীবনীশক্তি নিঃশেষ করা (to exhaust one's energy by working excessively).",
    explanation_en: "'To burn the candle at both ends' means to overextend oneself by working early mornings and late nights.",
    difficulty: "easy",
    question_type: "vocabulary",
    source_title: "Cambridge Idioms Dictionary",
    source_page_or_section: "Idioms related to Work and Effort"
  },
  {
    subject: "English",
    topic: "Vocabulary — One-Word Substitution",
    subtopic: "Professions and Dispositions",
    question_bn: "A person who hates or distrusts humanity is called a:",
    question_en: "What is the one-word substitution for 'one who hates or distrusts humankind'?",
    options: {
      A: "Philanthropist",
      B: "Misanthrope",
      C: "Misogynist",
      D: "Altruist"
    },
    correct_option: "B",
    explanation_bn: "সমগ্র মানবজাতিকে যে ঘৃণা বা অবিশ্বাস করে তাকে 'Misanthrope' (মানববিদ্বেষী) বলে। নারীকে যে ঘৃণা করে সে 'Misogynist'; আর মানুষকে যে ভালোবাসে ও কল্যাণ করে সে 'Philanthropist' বা 'Altruist'।",
    explanation_en: "'Misanthrope' designates an individual who harbors hatred or distrust toward humanity (Greek misos = hatred + anthropos = human).",
    difficulty: "easy",
    question_type: "vocabulary",
    source_title: "Word Power Made Easy — Norman Lewis",
    source_page_or_section: "Haters and Lovers"
  },
  {
    subject: "English",
    topic: "Vocabulary — Spelling",
    subtopic: "Commonly Misspelled Words",
    question_bn: "নিচের কোন বানানটি শুদ্ধ?",
    question_en: "Which of the following represents the correct spelling?",
    options: {
      A: "Accommodate",
      B: "Acommodate",
      C: "Accomodate",
      D: "Acomodate"
    },
    correct_option: "A",
    explanation_bn: "সঠিক বানান হলো 'Accommodate' (যার মধ্যে দুটি 'c' এবং দুটি 'm' রয়েছে: A-c-c-o-m-m-o-d-a-t-e)। এর অর্থ আবাসন প্রদান করা বা মানিয়ে নেওয়া।",
    explanation_en: "'Accommodate' is correctly spelled with double 'c' and double 'm'.",
    difficulty: "easy",
    question_type: "vocabulary",
    source_title: "Oxford Advanced Learner's Dictionary",
    source_page_or_section: "Spelling Guide"
  },
  {
    subject: "English",
    topic: "Vocabulary — Foreign Phrases in English",
    subtopic: "Latin Legal and Literary Phrases",
    question_bn: "The Latin expression 'Status quo' means:",
    question_en: "What is the meaning of the Latin legal and diplomatic phrase 'Status quo'?",
    options: {
      A: "The present state of affairs",
      B: "A past legal precedent",
      C: "A future projection",
      D: "An emergency decree"
    },
    correct_option: "A",
    explanation_bn: "'Status quo' একটি বহুল ব্যবহৃত লাতিন বাক্যাংশ যার অর্থ বিদ্যমান বা বর্তমান পরিস্থিতি অপরিবর্তিত রাখা (the existing state of affairs, especially regarding social or political issues).",
    explanation_en: "'Status quo' directly translates to 'the state in which' and denotes maintaining current existing conditions.",
    difficulty: "easy",
    question_type: "vocabulary",
    source_title: "Black's Law Dictionary",
    source_page_or_section: "Latin Maxims and Terms"
  },
  {
    subject: "English",
    topic: "Literature — Elizabethan & Renaissance Period",
    subtopic: "William Shakespeare — Tragedies",
    question_bn: "Which of the following is NOT one of Shakespeare's four great tragedies?",
    question_en: "Which play is NOT classified among Shakespeare's four great tragedies?",
    options: {
      A: "Hamlet",
      B: "Othello",
      C: "King Lear",
      D: "The Tempest"
    },
    correct_option: "D",
    explanation_bn: "শেক্সপিয়রের বিখ্যাত ৪টি শ্রেষ্ঠ ট্র্যাজেডি হলো: Hamlet, Othello, King Lear এবং Macbeth। অপরদিকে 'The Tempest' হলো শেক্সপিয়রের জীবনের অন্যতম শেষ রোমান্স কমেডি বা ট্র্যাজিকমেডি নাটক।",
    explanation_en: "The four great Shakespearean tragedies are Hamlet, Othello, King Lear, and Macbeth. 'The Tempest' is a romance/tragicomedy.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "A Critical History of English Literature — David Daiches",
    source_page_or_section: "Shakespearean Tragedies"
  },
  {
    subject: "English",
    topic: "Literature — Elizabethan Period",
    subtopic: "William Shakespeare — Soliloquies",
    question_bn: "'To be, or not to be, that is the question' — এই বিখ্যাত আত্মকথনটি (Soliloquy) শেক্সপিয়রের কোন নাটকের?",
    question_en: "From which Shakespearean tragedy is the iconic soliloquy 'To be, or not to be, that is the question' quoted?",
    options: {
      A: "Macbeth",
      B: "Hamlet",
      C: "Julius Caesar",
      D: "Romeo and Juliet"
    },
    correct_option: "B",
    explanation_bn: "এটি উইলিয়াম শেক্সপিয়রের 'Hamlet' নাটকের তৃতীয় অঙ্কের ১ম দৃশ্যের (Act III, Scene 1) রাজকুমার হ্যামলেটের সুবিখ্যাত একক উক্তি (Soliloquy), যেখানে তিনি অস্তিত্ব, মৃত্যু ও যন্ত্রণার দ্বন্দ্বে জর্জরিত হন।",
    explanation_en: "This immortal philosophical soliloquy is uttered by Prince Hamlet in Act III, Scene 1 of Shakespeare's 'Hamlet'.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "The Oxford Shakespeare: Hamlet",
    source_page_or_section: "Act III, Scene 1"
  },
  {
    subject: "English",
    topic: "Literature — Elizabethan Period",
    subtopic: "Christopher Marlowe — University Wits",
    question_bn: "Which Renaissance dramatist introduced 'Mighty Line' (blank verse) to the English stage and authored 'Doctor Faustus'?",
    question_en: "Who authored 'Doctor Faustus' and pioneered the dramatic potential of English blank verse ('Mighty Line')?",
    options: {
      A: "Christopher Marlowe",
      B: "Ben Jonson",
      C: "John Lyly",
      D: "Thomas Kyd"
    },
    correct_option: "A",
    explanation_bn: "ক্রিস্টোফার মার্লো (১৫৬৪-১৫৯৩) ছিলেন ইউনিভার্সিটি উইটস-এর সর্বপ্রধান নাট্যকার যিনি ইংরেজি নাটকে ব্ল্যাংক ভার্সকে শক্তিশালী বাহন ('Marlowe's Mighty Line') হিসেবে প্রতিষ্ঠা করেন। তাঁর বিখ্যাত নাটক: Doctor Faustus, Tamburlaine, The Jew of Malta।",
    explanation_en: "Christopher Marlowe pioneered dramatic blank verse and penned 'The Tragical History of Doctor Faustus'.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "A Short History of English Literature — Harry Blamires",
    source_page_or_section: "The University Wits: Christopher Marlowe"
  },
  {
    subject: "English",
    topic: "Literature — Elizabethan & Jacobean Period",
    subtopic: "Francis Bacon — Father of English Essay",
    question_bn: "Who is celebrated as the 'Father of the English Essay' and famed for the aphorism 'Reading maketh a full man; conference a ready man; and writing an exact man'?",
    question_en: "Who is known as the Father of the English Essay and wrote 'Reading maketh a full man; conference a ready man; and writing an exact man'?",
    options: {
      A: "Francis Bacon",
      B: "Charles Lamb",
      C: "Michel de Montaigne",
      D: "William Hazlitt"
    },
    correct_option: "A",
    explanation_bn: "ফ্রান্সিস বেকনকে ইংরেজি প্রবন্ধের জনক (Father of English Essay) বলা হয় (ফরাসি মন্টেন হলেন সার্বিক প্রবন্ধের জনক)। তাঁর সংক্ষিপ্ত, প্রজ্ঞাময় ও সারগর্ভ উক্তি 'Of Studies' প্রবন্ধে সন্নিবেশিত: 'Reading maketh a full man...'",
    explanation_en: "Francis Bacon is acknowledged as the Father of the English Essay, famous for his aphoristic style in essays like 'Of Studies'.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "English Literature: Its History and Its Significance — William J. Long",
    source_page_or_section: "Francis Bacon's Essays"
  },
  {
    subject: "English",
    topic: "Literature — Metaphysical Poetry",
    subtopic: "John Donne — Metaphysical Conceits",
    question_bn: "Who was the pioneer of the 17th-century Metaphysical school of poetry and author of 'The Good-Morrow'?",
    question_en: "Who was the leading figure of the Metaphysical poets and author of 'The Sun Rising' and 'A Valediction: Forbidding Mourning'?",
    options: {
      A: "John Donne",
      B: "George Herbert",
      C: "Andrew Marvell",
      D: "Henry Vaughan"
    },
    correct_option: "A",
    explanation_bn: "জন ডান (১৫৭২-১৬৩১) ছিলেন মেটাফিজিক্যাল কবিতার প্রধান পুরোধা কবি। জটিল দর্শন, চমকপ্রদ উপমা (Conceit) এবং বুদ্ধিদীপ্ত ভাবাবেগের জন্য তিনি খ্যাতিমান। স্যামুয়েল জনসন পরবর্তীতে এই কবিগোষ্ঠীকে 'Metaphysical Poets' হিসেবে চিহ্নিত করেন।",
    explanation_en: "John Donne was the dean of Metaphysical poets, known for intricate conceits linking intellect and passionate emotion.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "The Metaphysical Poets — Helen Gardner",
    source_page_or_section: "Introduction to John Donne"
  },
  {
    subject: "English",
    topic: "Literature — Commonwealth & Puritan Period",
    subtopic: "John Milton — Epic Poetry",
    question_bn: "John Milton's monumental epic 'Paradise Lost' (1667) was written in which poetic meter?",
    question_en: "In which poetic verse form did John Milton compose his epic masterpiece 'Paradise Lost'?",
    options: {
      A: "Heroic Couplet",
      B: "Blank Verse (Unrhymed Iambic Pentameter)",
      C: "Spenserian Stanza",
      D: "Terza Rima"
    },
    correct_option: "B",
    explanation_bn: "জন মিল্টন তাঁর কালজয়ী মহাকাব্য 'Paradise Lost' বারো খণ্ডে অমিত্রাক্ষর ছন্দে বা ব্ল্যাংক ভার্সে (Unrhymed Iambic Pentameter) রচনা করেন। এই মহাকাব্যের ঘোষিত লক্ষ্য ছিল 'To justify the ways of God to men'।",
    explanation_en: "Milton consciously rejected rhyme as petty constraint and wrote 'Paradise Lost' in magnificent blank verse.",
    difficulty: "medium",
    question_type: "knowledge",
    source_title: "A History of English Literature — Edward Albert",
    source_page_or_section: "Milton and the Epic"
  },
  {
    subject: "English",
    topic: "Literature — Restoration Period",
    subtopic: "First Poet Laureate",
    question_bn: "Who was officially appointed as the first Poet Laureate of England in 1668 and wrote 'Absalom and Achitophel'?",
    question_en: "Who was the first formally appointed Poet Laureate of England and author of the satire 'Absalom and Achitophel'?",
    options: {
      A: "John Dryden",
      B: "Alexander Pope",
      C: "Jonathan Swift",
      D: "William Congreve"
    },
    correct_option: "A",
    explanation_bn: "জন ড্রাইডেন (১৬৩১-১৭০০) ছিলেন রেস্টোরেশন যুগের প্রধান সাহিত্যিক। ১৬৬৮ সালে রাজা দ্বিতীয় চার্লস তাঁকে ইংল্যান্ডের প্রথম আনুষ্ঠানিক রাজকবি (First official Poet Laureate) হিসেবে নিযুক্ত করেন।",
    explanation_en: "John Dryden was officially appointed the first Poet Laureate of England in 1668 by Charles II.",
    difficulty: "medium",
    question_type: "knowledge",
    source_title: "The Cambridge Companion to English Literature 1650-1740",
    source_page_or_section: "John Dryden and Restoration Literature"
  },
  {
    subject: "English",
    topic: "Literature — Augustan / Neo-Classical Age",
    subtopic: "Alexander Pope — Mock-Heroic Epic",
    question_bn: "Which celebrated mock-heroic narrative poem was written by Alexander Pope based on a real-life incident of clipping a lady's hair?",
    question_en: "Which famous mock-epic was composed by Alexander Pope satirizing aristocratic triviality over a stolen curl of hair?",
    options: {
      A: "The Dunciad",
      B: "The Rape of the Lock",
      C: "An Essay on Criticism",
      D: "An Essay on Man"
    },
    correct_option: "B",
    explanation_bn: "'The Rape of the Lock' (১৭১২) আলেকজান্ডার পোপের অমর ব্যঙ্গাত্মক রূপক মহাকাব্য (Mock-Heroic Epic)। লর্ড পিটার কর্তৃক মিস অ্যারাবেলা ফার্মারের একগুচ্ছ চুল কাটার ঘটনাকে কেন্দ্র করে সমকালীন অভিজাত সমাজের অসারতাকে পোপ নিপুণভাবে ব্যঙ্গ করেন।",
    explanation_en: "Alexander Pope's 'The Rape of the Lock' is a masterpiece of the mock-heroic genre satirizing the frivolities of high society.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "A Critical History of English Literature — David Daiches",
    source_page_or_section: "The Neo-Classical Age: Alexander Pope"
  },
  {
    subject: "English",
    topic: "Literature — Augustan Age",
    subtopic: "Jonathan Swift — Prose Satire",
    question_bn: "Jonathan Swift's biting satire 'Gulliver's Travels' (1726) features the race of rational horses known as:",
    question_en: "In Jonathan Swift's satire 'Gulliver's Travels', what is the noble and rational equine society called?",
    options: {
      A: "Lilliputians",
      B: "Brobdingnagians",
      C: "Yahoos",
      D: "Houyhnhnms"
    },
    correct_option: "D",
    explanation_bn: "'Gulliver's Travels'-এর চতুর্থ খণ্ডে সুইফট এক কাল্পনিক দেশে যান যেখানে 'Houyhnhnms' হলো প্রজ্ঞা ও ন্যায়ের প্রতীক সদগুণসম্পন্ন ঘোড়া, আর 'Yahoos' হলো বর্বর, নোংরা ও পাশবিক মানবসদৃশ জীব।",
    explanation_en: "The Houyhnhnms represent an enlightened society of rational horses contrasted with the brutal human-like Yahoos.",
    difficulty: "medium",
    question_type: "knowledge",
    source_title: "The Norton Anthology of English Literature",
    source_page_or_section: "Jonathan Swift: Gulliver's Travels Part IV"
  },
  {
    subject: "English",
    topic: "Literature — Romantic Period",
    subtopic: "William Wordsworth — Definition of Poetry",
    question_bn: "Who defined poetry as 'the spontaneous overflow of powerful feelings: it takes its origin from emotion recollected in tranquillity'?",
    question_en: "Which Romantic poet famously defined poetry as 'the spontaneous overflow of powerful feelings recollected in tranquillity'?",
    options: {
      A: "Samuel Taylor Coleridge",
      B: "William Wordsworth",
      C: "Percy Bysshe Shelley",
      D: "John Keats"
    },
    correct_option: "B",
    explanation_bn: "উইলিয়াম ওয়ার্ডসওয়ার্থ তাঁর ১৮০০ সালের 'Preface to Lyrical Ballads'-এ কবিতার এই অমর সংজ্ঞা প্রদান করেন। ওয়ার্ডসওয়ার্থকে প্রকৃতির কবি (Poet of Nature) বলা হয়।",
    explanation_en: "Wordsworth articulated this foundational definition of romantic poetics in the 1800 Preface to 'Lyrical Ballads'.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "Preface to Lyrical Ballads — William Wordsworth",
    source_page_or_section: "Poetic Theory"
  },
  {
    subject: "English",
    topic: "Literature — Romantic Period",
    subtopic: "Samuel Taylor Coleridge — Supernaturalism",
    question_bn: "'Water, water, everywhere, / Nor any drop to drink' — এই সুবিখ্যাত চরণ দুটি কোন কবিতার?",
    question_en: "From which renowned poem by S. T. Coleridge are the lines 'Water, water, everywhere, / Nor any drop to drink' taken?",
    options: {
      A: "Kubla Khan",
      B: "The Rime of the Ancient Mariner",
      C: "Christabel",
      D: "Dejection: An Ode"
    },
    correct_option: "B",
    explanation_bn: "স্যামুয়েল টেলর কোলরিজের অমর কবিতা 'The Rime of the Ancient Mariner' (১৭৯৮)-এ প্রাচীন নাবিক যখন আলবাট্রস পাখি বধ করার পর মাঝসমুদ্রে তৃষ্ণায় কাতর হয়, তখন এই মর্মান্তিক পরিস্থিতির বর্ণনা দেওয়া হয়।",
    explanation_en: "These lines are from Samuel Taylor Coleridge's famous lyrical ballad 'The Rime of the Ancient Mariner'.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "Lyrical Ballads (1798) — Wordsworth and Coleridge",
    source_page_or_section: "The Rime of the Ancient Mariner"
  },
  {
    subject: "English",
    topic: "Literature — Romantic Period",
    subtopic: "John Keats — Poet of Beauty",
    question_bn: "'Beauty is truth, truth beauty,—that is all / Ye know on earth, and all ye need to know' — এই উক্তিটি কার?",
    question_en: "Who concluded his ode with the famous line 'Beauty is truth, truth beauty'?",
    options: {
      A: "Lord Byron",
      B: "P. B. Shelley",
      C: "John Keats",
      D: "William Blake"
    },
    correct_option: "C",
    explanation_bn: "সৌন্দর্যের কবি (Poet of Beauty) জন কিটস তাঁর কালজয়ী কবিতা 'Ode on a Grecian Urn' (১৮১৯)-এর সমাপ্তিতে সত্য ও সৌন্দর্যের চিরন্তন অভিন্নতা প্রকাশে এই অবিস্মরণীয় পঙক্তি রচনা করেন।",
    explanation_en: "John Keats penned this immortal truth-beauty formulation in the closing lines of 'Ode on a Grecian Urn'.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "Keats's Odes — Jack Stillinger",
    source_page_or_section: "Ode on a Grecian Urn"
  },
  {
    subject: "English",
    topic: "Literature — Romantic Period",
    subtopic: "P. B. Shelley — Revolutionary Spirit",
    question_bn: "'If Winter comes, can Spring be far behind?' — এই আশাবাদী উক্তিটি শেলীর কোন কবিতার শেষ চরণ?",
    question_en: "Which celebrated poem by Percy Bysshe Shelley culminates in the line 'If Winter comes, can Spring be far behind?'",
    options: {
      A: "To a Skylark",
      B: "Ode to the West Wind",
      C: "Prometheus Unbound",
      D: "Ozymandias"
    },
    correct_option: "B",
    explanation_bn: "বিপ্লবী কবি পি. বি. শেলী তাঁর 'Ode to the West Wind' (১৮১৯) কবিতার সমাপ্তিতে সামাজিক পরিবর্তন ও আশাবাদের চূড়ান্ত ঘোষণা হিসেবে এই অমর পঙক্তি উচ্চারণ করেন।",
    explanation_en: "Shelley's revolutionary masterpiece 'Ode to the West Wind' concludes with this iconic line of eternal hope.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "English Romantic Poetry — M. H. Abrams",
    source_page_or_section: "P. B. Shelley: Ode to the West Wind"
  },
  {
    subject: "English",
    topic: "Literature — Victorian Period",
    subtopic: "Alfred Tennyson — Poet Laureate",
    question_bn: "'To strive, to seek, to find, and not to yield' — এটি লর্ড টেনিসনের কোন বিখ্যাত কবিতার শেষ চরণ?",
    question_en: "'To strive, to seek, to find, and not to yield' is the final line of which dramatic monologue by Alfred Lord Tennyson?",
    options: {
      A: "In Memoriam",
      B: "The Lady of Shalott",
      C: "Ulysses",
      D: "The Charge of the Light Brigade"
    },
    correct_option: "C",
    explanation_bn: "ভিক্টোরীয় যুগের পোয়েট লরিয়েট আলফ্রেড টেনিসনের ড্রামাটিক মনোলোগ 'Ulysses' (১৮৩৩)-এর সমাপ্তিতে চিরন্তন জ্ঞানপিপাসা ও দুর্নিবার মানবসাহসের প্রতীক হিসেবে ইউলিসিসের মুখে এই চরণটি বসানো হয়েছে।",
    explanation_en: "The heroic determination of human spirit is encapsulated in the closing line of Tennyson's 'Ulysses'.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "The Poems of Tennyson — Christopher Ricks",
    source_page_or_section: "Ulysses"
  },
  {
    subject: "English",
    topic: "Literature — Victorian Period",
    subtopic: "Robert Browning — Dramatic Monologue",
    question_bn: "Who is hailed as the supreme master of the 'Dramatic Monologue' in English literature and author of 'My Last Duchess'?",
    question_en: "Which Victorian poet perfected the poetic form of dramatic monologue in works like 'My Last Duchess' and 'Fra Lippo Lippi'?",
    options: {
      A: "Matthew Arnold",
      B: "Robert Browning",
      C: "Dante Gabriel Rossetti",
      D: "Thomas Hardy"
    },
    correct_option: "B",
    explanation_bn: "রবার্ট ব্রাউনিং (১৮১২-১৮৮৯) ইংরেজি সাহিত্যে ড্রামাটিক মনোলোগের অবিসংবাদিত সম্রাট। তাঁর 'My Last Duchess', 'Porphyria's Lover', ও 'Andrea del Sarto' মনস্তাত্ত্বিক বিশ্লেষণের অনন্য নিদর্শন।",
    explanation_en: "Robert Browning elevated the dramatic monologue to its zenith in Victorian English poetry.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "A History of English Literature — Edward Albert",
    source_page_or_section: "Robert Browning and Dramatic Monologue"
  },
  {
    subject: "English",
    topic: "Literature — Victorian Period",
    subtopic: "Charles Dickens — Social Realism",
    question_bn: "Charles Dickens' historical novel 'A Tale of Two Cities' (1859) is set against the background of which historical event?",
    question_en: "Against the turbulent backdrop of which historical event is Charles Dickens' 'A Tale of Two Cities' set?",
    options: {
      A: "The American War of Independence",
      B: "The French Revolution",
      C: "The Industrial Revolution in England",
      D: "The Crimean War"
    },
    correct_option: "B",
    explanation_bn: "চার্লস ডিকেন্সের বিখ্যাত ঐতিহাসিক উপন্যাস 'A Tale of Two Cities' ফরাসি বিপ্লব (French Revolution)-এর রক্তক্ষয়ী পটভূমিতে রচিত। দুটি শহর হলো লন্ডন ও প্যারিস। উপন্যাসের অমর প্রারম্ভিক লাইন: 'It was the best of times, it was the worst of times...'",
    explanation_en: "Dickens set 'A Tale of Two Cities' in London and Paris during the upheaval of the French Revolution.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "Charles Dickens: A Critical Study — George Gissing",
    source_page_or_section: "A Tale of Two Cities"
  },
  {
    subject: "English",
    topic: "Literature — Modern Period",
    subtopic: "T. S. Eliot — High Modernism",
    question_bn: "'The Waste Land' (1922), a milestone modernist poem exploring spiritual barrenness after WWI, was composed by:",
    question_en: "Who authored the 1922 landmark modernist poem 'The Waste Land'?",
    options: {
      A: "W. H. Auden",
      B: "T. S. Eliot",
      C: "Ezra Pound",
      D: "W. B. Yeats"
    },
    correct_option: "B",
    explanation_bn: "টি. এস. এলিয়ট (১৮৮৮-১৯৬৫) ১৯২২ সালে তাঁর বিখ্যাত মহাকাব্যধর্মী আধুনিক কবিতা 'The Waste Land' প্রকাশ করেন, যার জন্য তিনি পরবর্তীতে ১৯৪৮ সালে সাহিত্যে নোবেল পুরস্কার লাভ করেন। কবিতাটির প্রথম লাইন: 'April is the cruellest month...'",
    explanation_en: "T. S. Eliot composed 'The Waste Land' (1922), reflecting post-WWI civilizational disillusionment.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "Modernism: A Guide to European Literature — Malcolm Bradbury",
    source_page_or_section: "T. S. Eliot and High Modernism"
  },
  {
    subject: "English",
    topic: "Literature — Modern Period",
    subtopic: "George Bernard Shaw — Dramatist",
    question_bn: "Which Nobel-laureate playwright wrote 'Arms and the Man', 'Man and Superman', and 'Pygmalion'?",
    question_en: "Who authored 'Arms and the Man', a witty anti-romantic comedy on war and heroism?",
    options: {
      A: "George Bernard Shaw",
      B: "Oscar Wilde",
      C: "John Galsworthy",
      D: "Samuel Beckett"
    },
    correct_option: "A",
    explanation_bn: "জর্জ বার্নার্ড শ (১৮৫৬-১৯৫০) ছিলেন আইরিশ নাট্যকার ও আধুনিক ইংরেজি নাটকের অন্যতম দিকপাল। 'Arms and the Man' (১৮৯৪) নাটকে তিনি যুদ্ধ ও প্রেমের রোমান্টিক ভ্রান্ত ধারণাকে ব্লুন্টশলির বাস্তববুদ্ধিসম্পন্ন চরিত্রের মাধ্যমে বিদ্রূপ করেছেন। তিনি ১৯২৫ সালে সাহিত্যে নোবেল পান।",
    explanation_en: "G. B. Shaw penned 'Arms and the Man', debunking romantic illusions regarding warfare and hero-worship.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "Shaw: The Dramatist — Louis Crompton",
    source_page_or_section: "Arms and the Man"
  },
  {
    subject: "English",
    topic: "Literature — Modern Period",
    subtopic: "George Orwell — Dystopian Fiction",
    question_bn: "Which political allegorical novella by George Orwell features the famous slogan 'All animals are equal, but some animals are more equal than others'?",
    question_en: "In which satirical novella by George Orwell does the maxim 'All animals are equal, but some animals are more equal than others' appear?",
    options: {
      A: "Nineteen Eighty-Four",
      B: "Animal Farm",
      C: "Homage to Catalonia",
      D: "Burmese Days"
    },
    correct_option: "B",
    explanation_bn: "জর্জ অরওয়েলের ১৯৪৫ সালে প্রকাশিত 'Animal Farm' রাজনৈতিক ব্যঙ্গোপন্যাসটিতে সোভিয়েত ইউনিয়নের স্তালিনীয় স্বৈরাচার ও বিপ্লবের আদর্শচ্যুতির রূপক তুলে ধরা হয়েছে। উপন্যাসের মূল উক্তি: 'All animals are equal, but some animals are more equal than others.'",
    explanation_en: "George Orwell's satirical beast fable 'Animal Farm' (1945) introduced this famous corruption of egalitarianism.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "Orwell's Political Satire — Bernard Crick",
    source_page_or_section: "Animal Farm Analysis"
  },
  {
    subject: "English",
    topic: "Literature — Modern Period",
    subtopic: "Ernest Hemingway — Lost Generation",
    question_bn: "Which American novelist won the Pulitzer Prize (1953) and Nobel Prize (1954) for his novella 'The Old Man and the Sea'?",
    question_en: "Who authored 'The Old Man and the Sea', featuring the aging Cuban fisherman Santiago?",
    options: {
      A: "William Faulkner",
      B: "Ernest Hemingway",
      C: "F. Scott Fitzgerald",
      D: "John Steinbeck"
    },
    correct_option: "B",
    explanation_bn: "আর্নেস্ট হেমিংওয়ে (১৮৯৯-১৯৬১) 'The Old Man and the Sea' (১৯৫২) রচনার জন্য বিশ্বব্যাপী সমাদৃত হন। সান্তিয়াগোর বিখ্যাত উক্তি: 'Man is not made for defeat. A man can be destroyed but not defeated.'",
    explanation_en: "Ernest Hemingway authored 'The Old Man and the Sea', exemplifying his iceberg theory of concise prose.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "Hemingway: The Writer as Artist — Carlos Baker",
    source_page_or_section: "The Old Man and the Sea"
  },
  {
    subject: "English",
    topic: "Literature — Literary Terms",
    subtopic: "Figures of Speech",
    question_bn: "A statement that seems self-contradictory on the surface but reveals a deeper underlying truth is called a:",
    question_en: "What literary device is characterized by an apparent self-contradiction that actually expresses an underlying truth?",
    options: {
      A: "Oxymoron",
      B: "Paradox",
      C: "Hyperbole",
      D: "Euphemism"
    },
    correct_option: "B",
    explanation_bn: "'Paradox' (আপাতবিরোধিতা) হলো এমন একটি পূর্ণাঙ্গ বক্তব্য বা বাক্য যা প্রথম দৃষ্টিতে স্ববিরোধী মনে হলেও গভীরভাবে সত্য প্রকাশ করে (যেমন: 'Child is the father of man')। আর 'Oxymoron' হলো পাশাপাশি দুটি বিপরীত শব্দের সংযোগ (যেমন: 'deafening silence')।",
    explanation_en: "A paradox is an apparently self-contradictory proposition that reveals a profound deeper reality upon analysis.",
    difficulty: "medium",
    question_type: "knowledge",
    source_title: "A Glossary of Literary Terms — M. H. Abrams",
    source_page_or_section: "Paradox and Oxymoron"
  }
];
