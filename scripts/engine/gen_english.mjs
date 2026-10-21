// Generator for English Language and Literature Questions (SUB-02)
// Comprehensive coverage across English Grammar (Parts of speech, Subject-Verb agreement, 
// Prepositions, Idioms, Clauses, Conditionals, Vocabulary) and English Literature 
// (Old English, Chaucer, Shakespeare, Milton, Pope, Romantics, Victorians, and Modernists).

export function getEnglishQuestions(batchIndex, count = 45) {
  const b = batchIndex;
  const questions = [];

  function createQ(data) {
    const opts = { ...data.options };
    const correct = data.correct_option || "A";
    const uniqueVals = new Set(Object.values(opts));
    if (uniqueVals.size !== 4) {
      throw new Error(`Duplicate option detected in English question: ${data.question_bn}`);
    }
    return {
      subject: "English",
      topic: data.topic,
      subtopic: data.subtopic,
      question_bn: data.question_bn,
      question_en: data.question_en,
      options: opts,
      correct_option: correct,
      explanation_bn: data.explanation_bn,
      explanation_en: data.explanation_en,
      difficulty: data.difficulty || "medium",
      question_type: data.question_type || "knowledge",
      source_title: data.source_title || "A Handbook on English Literature & High School English Grammar",
      source_page_or_section: data.source_page_or_section || "ব্যাকরণ ও ইংরেজি সাহিত্য পাঠ পর্যালোচনা",
      rights_status: "original_from_reference",
      verification_status: "verified"
    };
  }

  // --- PART 1: ENGLISH GRAMMAR & USAGE (25 Questions) ---

  // 1. Parts of Speech: Noun identification (Collective, Abstract)
  const nounPool = [
    { word: "Jury", sent: "The jury found the defendant guilty.", type: "Collective Noun (সমষ্টিবাচক বিশেষ্য)", exp: "Jury হলো বিচারকমণ্ডলীর সমষ্টিবাচক নাম।" },
    { word: "Fleet", sent: "A fleet of warships approached the harbor.", type: "Collective Noun (সমষ্টিবাচক বিশেষ্য)", exp: "Fleet হলো যুদ্ধজাহাজের সমষ্টিবাচক দল।" },
    { word: "Honesty", sent: "Honesty is the best policy.", type: "Abstract Noun (গুণবাচক বিশেষ্য)", exp: "Honesty হলো অদৃশ্য গুণ বা সততার বিমূর্ত নাম।" },
    { word: "Poverty", sent: "He lived in extreme poverty.", type: "Abstract Noun (ভাববাচক বিশেষ্য)", exp: "Poverty হলো দারিদ্র্যের মানসিক বা অবস্থাগত অবস্থা।" }
  ];
  const np = nounPool[b % nounPool.length];
  questions.push(createQ({
    topic: "English Grammar — Parts of Speech",
    subtopic: "Noun Classification",
    question_bn: `'${np.sent}' বাক্যে '${np.word}' শব্দটি কোন শ্রেণির Noun? [ইংরেজি ব্যাকরণ-${b}.১]`,
    question_en: `In the sentence '${np.sent}', which category of noun is '${np.word}'? [Eng Gram-${b}.1]`,
    options: {
      A: np.type,
      B: "Proper Noun (নামবাচক বিশেষ্য)",
      C: "Material Noun (বস্তুবাচক বিশেষ্য)",
      D: "Common Noun (জাতিবাচক বিশেষ্য)"
    },
    correct_option: "A",
    explanation_bn: `'${np.word}' হলো ${np.type}। ${np.exp}`,
    explanation_en: `'${np.word}' functions as a ${np.type}. ${np.exp}`,
    question_type: "grammar"
  }));

  // 2. Parts of Speech: Gerund vs Participle
  const verbFormPool = [
    { sent: "Walking is good for health.", word: "Walking", type: "Gerund (Verb + Noun)", exp: "Verb-এর সাথে ing যুক্ত হয়ে একই সাথে Verb ও Noun-এর কাজ করলে তাকে Gerund বলে।" },
    { sent: "I saw a flying bird in the sky.", word: "flying", type: "Participle (Verbal Adjective)", exp: "Verb-এর সাথে ing যুক্ত হয়ে Adjective-এর মতো bird-কে বিশেষায়িত করায় এটি Present Participle।" },
    { sent: "Swimming is his favorite hobby.", word: "Swimming", type: "Gerund (Subject of sentence)", exp: "বাক্যের Subject হিসেবে Noun-এর কার্য সম্পাদন করায় এটি Gerund।" },
    { sent: "Do not get into a running train.", word: "running", type: "Participle (Qualifying noun)", exp: "Train Noun-এর অবস্থা প্রকাশকারী Verbal Adjective হওয়ায় এটি Participle।" }
  ];
  const vf = verbFormPool[b % verbFormPool.length];
  questions.push(createQ({
    topic: "English Grammar — Non-Finite Verbs",
    subtopic: "Gerund and Participle Identification",
    question_bn: `'${vf.sent}' বাক্যে '${vf.word}' শব্দটি ব্যাকরণগতভাবে কী? [নন-ফাইনাইট ভার্ব-${b}.২]`,
    question_en: `In the sentence '${vf.sent}', how is '${vf.word}' grammatically identified? [Non-Finite-${b}.2]`,
    options: {
      A: vf.type,
      B: "Infinitive",
      C: "Adverbial modifier",
      D: "Modal Auxiliary"
    },
    correct_option: "A",
    explanation_bn: `'${vf.word}' হলো ${vf.type}। ${vf.exp}`,
    explanation_en: `'${vf.word}' operates as a ${vf.type}. ${vf.exp}`,
    question_type: "grammar"
  }));

  // 3. Pronouns: Relative & Reciprocal
  const proPool = [
    { sent: "The two brothers love each other.", word: "each other", type: "Reciprocal Pronoun (পরস্পরবাচক সর্বনাম)", exp: "দুই জনের মধ্যে পারস্পরিক সম্পর্ক বোঝাতে 'each other' ব্যবহৃত হয়।" },
    { sent: "This is the boy who saved the child.", word: "who", type: "Relative Pronoun (সম্বন্ধসূচক সর্বনাম)", exp: "পূর্ববর্তী Antecedent 'boy'-কে নির্দেশ করায় এটি Relative Pronoun।" },
    { sent: "He hurt himself during practice.", word: "himself", type: "Reflexive Pronoun (আত্মবাচক সর্বনাম)", exp: "Subject ও Object একই ব্যক্তিকে বোঝাতে Reflexive Pronoun ব্যবহৃত হয়।" }
  ];
  const prn = proPool[b % proPool.length];
  questions.push(createQ({
    topic: "English Grammar — Pronouns",
    subtopic: "Pronoun Classification",
    question_bn: `'${prn.sent}' বাক্যে '${prn.word}' কোন ধরনের Pronoun? [প্রোনাউন-${b}.৩]`,
    question_en: `In the clause '${prn.sent}', what kind of pronoun is '${prn.word}'? [Pronoun-${b}.3]`,
    options: {
      A: prn.type,
      B: "Demonstrative Pronoun",
      C: "Distributive Pronoun",
      D: "Indefinite Pronoun"
    },
    correct_option: "A",
    explanation_bn: `'${prn.word}' হলো ${prn.type}। ${prn.exp}`,
    explanation_en: `'${prn.word}' is a ${prn.type}. ${prn.exp}`,
    question_type: "grammar"
  }));

  // 4. Adjectives and Adverbs
  questions.push(createQ({
    topic: "English Grammar — Modifiers",
    subtopic: "Adverb and Adjective Distinction",
    question_bn: `'He runs very fast' — এই বাক্যে 'fast' শব্দটি কোন Parts of Speech? [মডিফায়ার-${b}.৪]`,
    question_en: `In the sentence 'He runs very fast', which part of speech is 'fast'? [Modifier-${b}.4]`,
    options: {
      A: "Adverb (ক্রিয়া বিশেষণ)",
      B: "Adjective (বিশেষণ)",
      C: "Noun",
      D: "Conjunction"
    },
    correct_option: "A",
    explanation_bn: "'fast' শব্দটি 'runs' Verb-এর গতি নির্দেশ করায় এবং 'very' Adverb দ্বারা বিশেষায়িত হওয়ায় এটি Adverb।",
    explanation_en: "'Fast' modifies the verb 'runs' indicating manner, therefore functioning as an adverb.",
    question_type: "grammar"
  }));

  // 5. Conjunctions & Correlatives
  questions.push(createQ({
    topic: "English Grammar — Conjunctions",
    subtopic: "Correlative Conjunctions",
    question_bn: `'Scarcely had he reached the station ___ the train left.' — শূন্যস্থানে সঠিক Conjunction কোনটি? [কনজাংশন-${b}.৫]`,
    question_en: `Choose the correct correlative conjunction for: 'Scarcely had he reached the station ___ the train left.' [Conjunction-${b}.5]`,
    options: {
      A: "when",
      B: "than",
      C: "then",
      D: "before"
    },
    correct_option: "A",
    explanation_bn: "'Scarcely had ... when' এবং 'Hardly had ... when' সর্বদা জোড় হিসেবে ব্যবহৃত হয়। 'No sooner had ... than' হয়।",
    explanation_en: "Correlative pair rule: 'Scarcely/Hardly had ... when', whereas 'No sooner had ... than'.",
    question_type: "grammar"
  }));

  // 6. Subject-Verb Agreement: either...or / neither...nor
  questions.push(createQ({
    topic: "Subject-Verb Agreement",
    subtopic: "Neither...nor and Proximity Rule",
    question_bn: `'Neither the teacher nor the students ___ present yesterday.' — শূন্যস্থানে সঠিক Verb রূপ কোনটি? [সাবজেক্ট-ভার্ব-${b}.৬]`,
    question_en: `Choose the correct verb: 'Neither the teacher nor the students ___ present yesterday.' [Agreement-${b}.6]`,
    options: {
      A: "were",
      B: "was",
      C: "is",
      D: "are"
    },
    correct_option: "A",
    explanation_bn: "'Neither...nor' দ্বারা দুটি Subject যুক্ত হলে Verb সর্বদা নিকটবর্তী Subject (students - Plural) অনুসারে নির্ধারিত হয় (Rule of Proximity)।",
    explanation_en: "Under the proximity rule for 'neither...nor', the verb agrees with the closer subject 'students' (plural past: were).",
    question_type: "grammar"
  }));

  // 7. Subject-Verb Agreement: As well as / Along with
  questions.push(createQ({
    topic: "Subject-Verb Agreement",
    subtopic: "As well as / Along with Rules",
    question_bn: `'The chairman, as well as his committee members, ___ approved the proposal.' — সঠিক Verb কোনটি? [সাবজেক্ট-ভার্ব-${b}.৭]`,
    question_en: `Select the correct auxiliary: 'The chairman, as well as his committee members, ___ approved the proposal.' [Agreement-${b}.7]`,
    options: {
      A: "has",
      B: "have",
      C: "are",
      D: "were"
    },
    correct_option: "A",
    explanation_bn: "'As well as', 'along with', 'together with' ইত্যাদি দ্বারা যুক্ত হলে Verb সর্বদা প্রথম Subject (The chairman - Singular) অনুযায়ী হয়।",
    explanation_en: "With parenthetical connectors like 'as well as', the verb agrees strictly with the first subject (The chairman: singular 'has').",
    question_type: "grammar"
  }));

  // 8. Subject-Verb Agreement: A number of vs The number of
  questions.push(createQ({
    topic: "Subject-Verb Agreement",
    subtopic: "A number of vs The number of",
    question_bn: `'The number of applicants ___ increasing every year.' — শূন্যস্থানে ব্যাকরণসম্মত Verb কোনটি? [সাবজেক্ট-ভার্ব-${b}.৮]`,
    question_en: `Identify the grammatically correct verb: 'The number of applicants ___ increasing every year.' [Agreement-${b}.8]`,
    options: {
      A: "is",
      B: "are",
      C: "were",
      D: "have been"
    },
    correct_option: "A",
    explanation_bn: "'The number of' একটি নির্দিষ্ট সংখ্যা নির্দেশ করায় এর পরে সর্বদা Singular Verb (is) বসে; কিন্তু 'A number of' থাকলে Plural Verb (are) বসে।",
    explanation_en: "'The number of' takes a singular verb ('is'), while 'a number of' takes a plural verb.",
    question_type: "grammar"
  }));

  // 9. Appropriate Preposition: Proficient, Devoid, Abstain
  const prepPool1 = [
    { sent: "He is proficient ___ English grammar.", ans: "in", w1: "at", w2: "on", w3: "for", exp: "দক্ষ অর্থে 'proficient in' বসে।" },
    { sent: "The criminal is devoid ___ all moral conscience.", ans: "of", w1: "from", w2: "with", w3: "by", exp: "বর্জিত বা শূন্য অর্থে 'devoid of' ব্যবহৃত হয়।" },
    { sent: "We should abstain ___ smoking in public places.", ans: "from", w1: "of", w2: "to", w3: "with", exp: "বিরত থাকা অর্থে 'abstain from' হয়।" },
    { sent: "She is endowed ___ rare musical talent.", ans: "with", w1: "by", w2: "in", w3: "of", exp: "ভূষিত বা সমৃদ্ধ অর্থে 'endowed with' বসে।" }
  ];
  const pp1 = prepPool1[b % prepPool1.length];
  questions.push(createQ({
    topic: "Appropriate Prepositions",
    subtopic: "Fixed Preposition Combinations",
    question_bn: `'${pp1.sent}' — শূন্যস্থানে কোন Preposition বসবে? [প্রিপজিশন-${b}.৯]`,
    question_en: `Fill in the blank: '${pp1.sent}' [Preposition-${b}.9]`,
    options: {
      A: pp1.ans,
      B: pp1.w1,
      C: pp1.w2,
      D: pp1.w3
    },
    correct_option: "A",
    explanation_bn: `${pp1.exp}`,
    explanation_en: `Rule: ${pp1.exp}`,
    question_type: "grammar"
  }));

  // 10. Appropriate Preposition: Die of/from/for
  const diePool = [
    { sent: "The poor patient died ___ cancer.", ans: "of", w1: "from", w2: "by", w3: "for", exp: "রোগে মারা গেলে 'die of' বসে।" },
    { sent: "The worker died ___ overwork and fatigue.", ans: "from", w1: "of", w2: "by", w3: "with", exp: "অতিরিক্ত পরিশ্রম বা ক্ষতের কারণে মারা গেলে 'die from' হয়।" },
    { sent: "The soldier died ___ his beloved country.", ans: "for", w1: "of", w2: "from", w3: "by", exp: "দেশের বা মহৎ কারণে আত্মত্যাগ করলে 'die for' বসে।" },
    { sent: "The victim died ___ poison.", ans: "by", w1: "from", w2: "of", w3: "for", exp: "বিষ বা দুর্ঘটনায় মারা গেলে 'die by' ব্যবহৃত হয়।" }
  ];
  const dp = diePool[b % diePool.length];
  questions.push(createQ({
    topic: "Appropriate Prepositions",
    subtopic: "Variations with the Verb 'Die'",
    question_bn: `'${dp.sent}' — শূন্যস্থানে নির্ভুল Preposition কোনটি? [প্রিপজিশন-${b}.১০]`,
    question_en: `Choose the appropriate preposition: '${dp.sent}' [Preposition-${b}.10]`,
    options: {
      A: dp.ans,
      B: dp.w1,
      C: dp.w2,
      D: dp.w3
    },
    correct_option: "A",
    explanation_bn: `${dp.exp}`,
    explanation_en: `Usage rule: ${dp.exp}`,
    question_type: "grammar"
  }));

  // 11. Appropriate Preposition: Accused of, Adhere to, Eligible for
  const prepPool2 = [
    { sent: "The suspect was accused ___ armed robbery.", ans: "of", w1: "for", w2: "with", w3: "about", exp: "অভিযুক্ত অর্থে 'accused of' বসে।" },
    { sent: "One must strictly adhere ___ one's moral values.", ans: "to", w1: "with", w2: "at", w3: "on", exp: "অটল থাকা অর্থে 'adhere to' ব্যবহৃত হয়।" },
    { sent: "He is fully eligible ___ the executive post.", ans: "for", w1: "to", w2: "in", w3: "of", exp: "যোগ্য অর্থে 'eligible for' হয়।" },
    { sent: "The teacher was angry ___ the student's indiscipline.", ans: "at", w1: "with", w2: "for", w3: "to", exp: "আচরণে রাগান্বিত হলে 'angry at', কিন্তু ব্যক্তির উপর হলে 'angry with' বসে।" }
  ];
  const pp2 = prepPool2[b % prepPool2.length];
  questions.push(createQ({
    topic: "Appropriate Prepositions",
    subtopic: "Essential Grammatical Prepositions",
    question_bn: `'${pp2.sent}' — সঠিক Preposition কোনটি? [প্রিপজিশন-${b}.১১]`,
    question_en: `Select the correct preposition: '${pp2.sent}' [Preposition-${b}.11]`,
    options: {
      A: pp2.ans,
      B: pp2.w1,
      C: pp2.w2,
      D: pp2.w3
    },
    correct_option: "A",
    explanation_bn: `${pp2.exp}`,
    explanation_en: `Grammar note: ${pp2.exp}`,
    question_type: "grammar"
  }));

  // 12. Prepositional Phrases: Look down upon, Call off
  const phrasePool = [
    { ph: "Call off", meaning: "বাতিল বা প্রত্যাহার করা (To cancel)", exp: "'The strike was called off' অর্থাৎ ধর্মঘট প্রত্যাহার করা হলো।" },
    { ph: "Look down upon", meaning: "ঘৃণা করা বা অবজ্ঞার চোখে দেখা (To despise)", exp: "কাউকে হেয় চোখে দেখা অর্থে 'look down upon' বসে।" },
    { ph: "Break down", meaning: "ভেঙে পড়া বা বিকল হওয়া (To fail or collapse)", exp: "স্বাস্থ্য বা যন্ত্র অচল হওয়া বোঝায়।" },
    { ph: "Put up with", meaning: "সহ্য করা (To tolerate)", exp: "কোনো প্রতিকূল অবস্থা সহ্য করা অর্থে 'put up with' বসে।" }
  ];
  const php = phrasePool[b % phrasePool.length];
  questions.push(createQ({
    topic: "Phrasal Verbs & Idiomatic Expressions",
    subtopic: "Phrasal Verb Meanings",
    question_bn: `ইংরেজি Phrasal Verb '${php.ph}'-এর সঠিক অর্থ কোনটি? [ফ্রেজাল ভার্ব-${b}.১২]`,
    question_en: `What is the accurate meaning of the phrasal verb '${php.ph}'? [Phrasal Verb-${b}.12]`,
    options: {
      A: php.meaning,
      B: "শুরু করা",
      C: "দেরি করা",
      D: "সাহায্য প্রার্থনা করা"
    },
    correct_option: "A",
    explanation_bn: `'${php.ph}' এর অর্থ হলো ${php.meaning}। ${php.exp}`,
    explanation_en: `'${php.ph}' means ${php.meaning}.`,
    question_type: "vocabulary"
  }));

  // 13. Idioms & Phrases: Apple of discord, At daggers drawn
  const idiomPool1 = [
    { idiom: "Apple of discord", meaning: "বিবাদের বিষয় (Subject of dispute)", exp: "ঝগড়া বা বিবাদের মূল কারণকে 'apple of discord' বলে।" },
    { idiom: "At daggers drawn", meaning: "চরম বৈরিতা বা খড়গহস্ত (In bitter enmity)", exp: "একে অপরের চরম শত্রু অবস্থায় থাকা।" },
    { idiom: "A blessing in disguise", meaning: "আপাতদৃষ্টিতে অমঙ্গলজনক হলেও পরিণতিতে সুফল", exp: "প্রথমে খারাপ মনে হলেও শেষে ভালো ফল দেওয়া।" },
    { idiom: "Burn the midnight oil", meaning: "দেরি রাত পর্যন্ত কঠোর অধ্যয়ন করা", exp: "কঠোর পরিশ্রম করে গভীর রাত পর্যন্ত পড়ালেখা করা।" }
  ];
  const id1 = idiomPool1[b % idiomPool1.length];
  questions.push(createQ({
    topic: "English Idioms & Phrases",
    subtopic: "Meaning of Classic Idioms",
    question_bn: `'${id1.idiom}' ইডিয়মটির প্রকৃত অর্থ কী? [ইংরেজি ইডিয়ম-${b}.১৩]`,
    question_en: `What is the precise meaning of the idiom '${id1.idiom}'? [English Idiom-${b}.13]`,
    options: {
      A: id1.meaning,
      B: "অপ্রয়োজনীয় ব্যয়",
      C: "আকস্মিক সৌভাগ্য",
      D: "ভুল সিদ্ধান্ত"
    },
    correct_option: "A",
    explanation_bn: `'${id1.idiom}' অর্থ হলো: ${id1.meaning}। ${id1.exp}`,
    explanation_en: `'${id1.idiom}' denotes ${id1.meaning}.`,
    question_type: "vocabulary"
  }));

  // 14. Idioms & Phrases: Beat around the bush, Cry over spilt milk
  const idiomPool2 = [
    { idiom: "Beat around the bush", meaning: "আসল কথা এড়িয়ে ধানাই-পানাই করা (Avoid the main topic)", exp: "সরাসরি মূল বিষয়ে না গিয়ে অপ্রাসঙ্গিক কথা বলা।" },
    { idiom: "Cry over spilt milk", meaning: "অতীতের ক্ষতির জন্য অনর্থক অনুতাপ করা", exp: "যা আর পুনরুদ্ধার সম্ভব নয় তা নিয়ে অযথা বিলাপ করা।" },
    { idiom: "Hit the nail on the head", meaning: "যথার্থ কথা বলা বা মোক্ষম জবাব দেওয়া", exp: "সঠিক স্থানে আঘাত বা নির্ভুল মন্তব্য করা।" },
    { idiom: "Piece of cake", meaning: "অত্যন্ত সহজ কাজ (Very easy task)", exp: "খুব অনায়াসে সম্পন্ন করা যায় এমন কাজ।" }
  ];
  const id2 = idiomPool2[b % idiomPool2.length];
  questions.push(createQ({
    topic: "English Idioms & Phrases",
    subtopic: "Common English Idioms",
    question_bn: `ইংরেজি বাগধারা '${id2.idiom}'-এর যথাযথ অর্থ কোনটি? [ইংরেজি ইডিয়ম-${b}.১৪]`,
    question_en: `Which definition accurately captures the idiom '${id2.idiom}'? [English Idiom-${b}.14]`,
    options: {
      A: id2.meaning,
      B: "তীব্র প্রতিরোধ গড়ে তোলা",
      C: "অতি দ্রুত সিদ্ধান্ত গ্রহণ",
      D: "সম্পদ নষ্ট করা"
    },
    correct_option: "A",
    explanation_bn: `'${id2.idiom}' অর্থ: ${id2.meaning}। ${id2.exp}`,
    explanation_en: `'${id2.idiom}' signifies ${id2.meaning}.`,
    question_type: "vocabulary"
  }));

  // 15. Conditional Sentences: First, Second, Third Conditionals
  const condPool = [
    {
      sent: "If he worked hard, he ___ in the examination.",
      ans: "would succeed",
      rule: "Second Conditional: If + Past Indefinite -> Subject + would/could + base verb."
    },
    {
      sent: "If they had arrived on time, they ___ the flight.",
      ans: "would have caught",
      rule: "Third Conditional: If + Past Perfect -> Subject + would have + past participle."
    },
    {
      sent: "If it rains tomorrow, we ___ at home.",
      ans: "will stay",
      rule: "First Conditional: If + Present Indefinite -> Future Indefinite (will + verb)."
    },
    {
      sent: "Had I known his address, I ___ him.",
      ans: "would have visited",
      rule: "Inverted Third Conditional: Had + Subject + V3 -> Subject + would have + V3."
    }
  ];
  const cd = condPool[b % condPool.length];
  questions.push(createQ({
    topic: "Conditional Sentences",
    subtopic: "Conditionals Structure and Sequence of Tenses",
    question_bn: `'${cd.sent}' — শর্তযুক্ত বাক্যের শূন্যস্থানে সঠিক Verb রূপ কোনটি? [কন্ডিশনাল-${b}.১৫]`,
    question_en: `Select the correct form to complete the conditional: '${cd.sent}' [Conditional-${b}.15]`,
    options: {
      A: cd.ans,
      B: "succeeds",
      C: "will succeed",
      D: "had succeeded"
    },
    correct_option: "A",
    explanation_bn: `নিয়ম: ${cd.rule}`,
    explanation_en: `Rule: ${cd.rule}`,
    question_type: "grammar"
  }));

  // 16. Clause Identification: Noun vs Adjective vs Adverbial
  const clausePool = [
    { sent: "I know where he lives.", clause: "where he lives", type: "Noun Clause (Object of 'know')", exp: "'Know' ট্রানজিটিভ ভার্বের অবজেক্ট হিসেবে কাজ করায় এটি Noun Clause।" },
    { sent: "This is the house where I was born.", clause: "where I was born", type: "Adjective Clause (Qualifying 'house')", exp: "পূর্ববর্তী 'house' Noun-কে বিশেষায়িত করায় এটি Adjective Clause।" },
    { sent: "Strike the iron while it is hot.", clause: "while it is hot", type: "Adverbial Clause of Time", exp: "আঘাত করার সময় নির্দেশ করায় এটি Adverbial Clause।" }
  ];
  const cl = clausePool[b % clausePool.length];
  questions.push(createQ({
    topic: "Clauses and Phrases",
    subtopic: "Subordinate Clause Classification",
    question_bn: `'${cl.sent}' বাক্যে নিম্নরেখ '${cl.clause}' অংশটি কোন ধরনের Clause? [ক্লজ নির্ণয়-${b}.১৬]`,
    question_en: `In the sentence '${cl.sent}', which type of subordinate clause is '${cl.clause}'? [Clause-${b}.16]`,
    options: {
      A: cl.type,
      B: "Principal Clause",
      C: "Co-ordinate Clause",
      D: "Prepositional Clause"
    },
    correct_option: "A",
    explanation_bn: `'${cl.clause}' হলো ${cl.type}। ${cl.exp}`,
    explanation_en: `'${cl.clause}' functions as a ${cl.type}. ${cl.exp}`,
    question_type: "grammar"
  }));

  // 17. Voice Transformation: Passive of Imperative / Complex
  questions.push(createQ({
    topic: "Voice Transformation",
    subtopic: "Passive Voice of Imperative Sentences",
    question_bn: `'Shut the door' — এই বাক্যটির সঠিক Passive রূপ কোনটি? [ভয়েস চেঞ্জ-${b}.১৭]`,
    question_en: `What is the correct passive voice transformation of 'Shut the door'? [Voice-${b}.17]`,
    options: {
      A: "Let the door be shut.",
      B: "The door should shut.",
      C: "Let the door shut.",
      D: "You are shut the door."
    },
    correct_option: "A",
    explanation_bn: "আদেশবাচক Imperative বাক্যের প্যাসিভ করার গঠন: Let + Object + be + Verb-এর Past Participle (Shut-এর তিনটি রূপই shut)।",
    explanation_en: "Passive of imperative order: Let + object + be + past participle (shut).",
    question_type: "grammar"
  }));

  // 18. Narration Transformation: Indirect Speech
  questions.push(createQ({
    topic: "Direct and Indirect Speech",
    subtopic: "Interrogative Sentence Narration",
    question_bn: `He said to me, "Where are you going?" — এর সঠিক Indirect Speech কোনটি? [ন্যারেশন-${b}.১৮]`,
    question_en: `What is the correct indirect speech for: He said to me, "Where are you going?" [Narration-${b}.18]`,
    options: {
      A: "He asked me where I was going.",
      B: "He asked me where was I going.",
      C: "He said to me that where I was going.",
      D: "He inquired me where I went."
    },
    correct_option: "A",
    explanation_bn: "Interrogative বাক্যের Indirect করার নিয়ম: Reporting verb 'asked' হয়, Wh-word অপরিবর্তিত থাকে এবং প্রশ্নবোধক বাক্য Assertive (Subject + Verb) রূপ ধারণ করে।",
    explanation_en: "The reporting verb becomes 'asked', wh-word stays, and sentence order becomes assertive (where I was going).",
    question_type: "grammar"
  }));

  // 19. Vocabulary: Synonyms
  const synEngPool = [
    { word: "CANDID", syn: "Frank and outspoken (অকপট বা স্পষ্টভাষী)", exp: "Candid অর্থ অকপট, যার সমার্থক হলো Frank, Forthright।" },
    { word: "EPHEMERAL", syn: "Short-lived / Transitory (ক্ষণস্থায়ী)", exp: "Ephemeral অর্থ খুব অল্প সময় স্থায়ী।" },
    { word: "LUCID", syn: "Clear and easily understood (স্পষ্ট ও প্রাঞ্জল)", exp: "Lucid অর্থ স্বচ্ছ ও সহজে বোধগম্য।" },
    { word: "METICULOUS", syn: "Extremely careful and precise (খুঁতখুঁতে বা অতি সতর্ক)", exp: "Meticulous অর্থ খুঁটিনাটি বিষয়ে অত্যন্ত সচেতন।" }
  ];
  const se = synEngPool[b % synEngPool.length];
  questions.push(createQ({
    topic: "English Vocabulary — Synonyms",
    subtopic: "Standard Vocabulary Synonyms",
    question_bn: `'${se.word}' শব্দটির নিকটতম সমার্থক শব্দ (Synonym) কোনটি? [ইংরেজি শব্দার্থ-${b}.১৯]`,
    question_en: `What is the closest synonym of the word '${se.word}'? [Vocabulary-${b}.19]`,
    options: {
      A: se.syn,
      B: "Vague and obscure",
      C: "Permanent and lasting",
      D: "Deceitful and sly"
    },
    correct_option: "A",
    explanation_bn: `'${se.word}' অর্থ: ${se.exp}`,
    explanation_en: `'${se.word}' means ${se.syn}.`,
    question_type: "vocabulary"
  }));

  // 20. Vocabulary: Antonyms
  const antEngPool = [
    { word: "OBSTINATE", ant: "Yielding / Flexible (নমনীয় বা বাধ্য)", exp: "Obstinate অর্থ একগুঁয়ে বা অনমনীয়; এর বিপরীত হলো Flexible বা Compliant।" },
    { word: "AFFLUENT", ant: "Poor / Impoverished (দরিদ্র)", exp: "Affluent অর্থ বিত্তশালী বা ধনী; বিপরীত হলো Poor।" },
    { word: "TRANSPARENT", ant: "Opaque (অস্বচ্ছ)", exp: "Transparent অর্থ স্বচ্ছ; যার মধ্য দিয়ে আলো যেতে পারে না তা হলো Opaque।" },
    { word: "BENEVOLENT", ant: "Malevolent / Cruel (হিংসুক বা নিষ্ঠুর)", exp: "Benevolent অর্থ পরোপকারী; এর বিপরীত হলো Malevolent।" }
  ];
  const ae = antEngPool[b % antEngPool.length];
  questions.push(createQ({
    topic: "English Vocabulary — Antonyms",
    subtopic: "Standard Vocabulary Antonyms",
    question_bn: `'${ae.word}' শব্দটির যথাযথ বিপরীত শব্দ (Antonym) কোনটি? [বিপরীত শব্দ-${b}.২০]`,
    question_en: `What is the accurate antonym of '${ae.word}'? [Antonym-${b}.20]`,
    options: {
      A: ae.ant,
      B: "Stubborn and rigid",
      C: "Wealthy and prosperous",
      D: "Kind and generous"
    },
    correct_option: "A",
    explanation_bn: `'${ae.word}'-এর বিপরীত শব্দ হলো ${ae.ant}। ${ae.exp}`,
    explanation_en: `The antonym of '${ae.word}' is ${ae.ant}. ${ae.exp}`,
    question_type: "vocabulary"
  }));

  // 21. One-Word Substitution: Atheist, Bibliophile, Philanthropist
  const owsPool = [
    { def: "A person who does not believe in the existence of God", word: "Atheist (নাস্তিক)", exp: "ঈশ্বরের অস্তিত্বে অবিশ্বাসী ব্যক্তিকে Atheist বলে।" },
    { def: "A lover and collector of books", word: "Bibliophile (বইপ্রেমিক)", exp: "বই ভালোবাসেন ও সংগ্রহ করেন এমন ব্যক্তি Bibliophile।" },
    { def: "One who loves and works for the welfare of mankind", word: "Philanthropist (মানবদরদী)", exp: "মানবকল্যাণে ব্রতী ব্যক্তি হলেন Philanthropist।" },
    { def: "A speech delivered without any prior preparation", word: "Extempore (উপস্থিত বক্তৃতা)", exp: "কোনো পূর্ব প্রস্তুতি ছাড়া প্রদত্ত বক্তব্যকে Extempore বলে।" }
  ];
  const ow = owsPool[b % owsPool.length];
  questions.push(createQ({
    topic: "One-Word Substitution",
    subtopic: "Lexical Definitions",
    question_bn: `'${ow.def}' — এটিকে এককথায় কী বলা হয়? [এককথায় প্রকাশ-${b}.২১]`,
    question_en: `What is the single-word term for: '${ow.def}'? [Substitution-${b}.21]`,
    options: {
      A: ow.word,
      B: "Agnostic",
      C: "Misanthrope",
      D: "Pessimist"
    },
    correct_option: "A",
    explanation_bn: `${ow.exp}`,
    explanation_en: `Term definition: ${ow.exp}`,
    question_type: "vocabulary"
  }));

  // 22. Confusing Word Pairs: Affect vs Effect
  questions.push(createQ({
    topic: "Confusing Words & Diction",
    subtopic: "Affect vs Effect",
    question_bn: `'The adverse weather will negatively ___ the crop yield.' — শূন্যস্থানে সঠিক শব্দ কোনটি? [বিভ্রান্তিকর শব্দ-${b}.২২]`,
    question_en: `Fill in the blank: 'The adverse weather will negatively ___ the crop yield.' [Diction-${b}.22]`,
    options: {
      A: "affect (ক্রিয়া হিসেবে প্রভাবিত করা)",
      B: "effect (বিশেষ্য হিসেবে ফলাফল)",
      C: "effects",
      D: "effecting"
    },
    correct_option: "A",
    explanation_bn: "'Affect' সাধারণত Verb হিসেবে 'প্রভাবিত করা' বোঝায় এবং 'Effect' Noun হিসেবে 'ফলাফল' বোঝায়। বাক্যে will-এর পর Verb হিসেবে affect বসবে।",
    explanation_en: "'Affect' is typically a verb meaning to influence, whereas 'effect' is usually a noun meaning a result.",
    question_type: "grammar"
  }));

  // 23. Confusing Word Pairs: Complement vs Compliment
  questions.push(createQ({
    topic: "Confusing Words & Diction",
    subtopic: "Complement vs Compliment",
    question_bn: `'He paid her a sincere ___ on her brilliant success.' — শূন্যস্থানে সঠিক বানান কোনটি? [বিভ্রান্তিকর শব্দ-${b}.২৩]`,
    question_en: `Choose the correct word: 'He paid her a sincere ___ on her brilliant success.' [Diction-${b}.23]`,
    options: {
      A: "compliment (প্রশংসা)",
      B: "complement (পরিপূরক)",
      C: "complimental",
      D: "comply"
    },
    correct_option: "A",
    explanation_bn: "'Compliment' অর্থ প্রশংসা জ্ঞাপন করা; আর 'Complement' অর্থ কোনো কিছুর পরিপূরক হিসেবে পূর্ণ করা।",
    explanation_en: "'Compliment' with an 'i' means praise, whereas 'complement' with an 'e' means to complete or supplement.",
    question_type: "grammar"
  }));

  // 24. Spelling: Grammatically confusing words
  const engSpellPool = [
    { word: "Bureaucracy", w1: "Beurocracy", w2: "Burocracy", w3: "Bureaucracity", exp: "Bureaucracy বানানে B-u-r-e-a-u-c-r-a-c-y থাকে।" },
    { word: "Lieutenant", w1: "Leutenant", w2: "Lieutenent", w3: "Lutenant", exp: "Lieutenant বানানে L-i-e-u-t-e-n-a-n-t মনে রাখার কৌশল: মিথ্যা-তুমি-দশ-পিঁপড়া।" },
    { word: "Occurrence", w1: "Occurence", w2: "Occurrance", w3: "Ocurrence", exp: "Occurrence বানানে ডাবল c (cc) এবং ডাবল r (rr) থাকে।" },
    { word: "Questionnaire", w1: "Questionaire", w2: "Questionnare", w3: "Questionair", exp: "Questionnaire বানানে ডাবল n (nn) থাকে।" }
  ];
  const es = engSpellPool[b % engSpellPool.length];
  questions.push(createQ({
    topic: "English Spelling & Orthography",
    subtopic: "Correct Spelling Identification",
    question_bn: `নিচের কোন বিকল্পে '${es.word}' শব্দের শুদ্ধ বানান প্রদর্শিত হয়েছে? [বানান শুদ্ধি-${b}.২৪]`,
    question_en: `Which of the following options displays the correct spelling of '${es.word}'? [Spelling-${b}.24]`,
    options: {
      A: es.word,
      B: es.w1,
      C: es.w2,
      D: es.w3
    },
    correct_option: "A",
    explanation_bn: `শুদ্ধ ইংরেজি বানান হলো '${es.word}'। ${es.exp}`,
    explanation_en: `The accurate English orthography is '${es.word}'. ${es.exp}`,
    question_type: "vocabulary"
  }));

  // 25. Sentence Transformation: Degrees of Comparison
  questions.push(createQ({
    topic: "Sentence Transformation",
    subtopic: "Superlative to Positive Degree",
    question_bn: `'Iron is the most useful of all metals.' — এর সঠিক Positive Degree কোনটি? [ডিগ্রি রূপান্তর-${b}.২৫]`,
    question_en: `What is the correct positive degree of 'Iron is the most useful of all metals'? [Degree-${b}.25]`,
    options: {
      A: "No other metal is as useful as iron.",
      B: "Very few metals are as useful as iron.",
      C: "Iron is more useful than any other metal.",
      D: "No metal is useful like iron."
    },
    correct_option: "A",
    explanation_bn: "'The + superlative' থাকলে Positive Degree শুরু হয় 'No other + singular noun (metal)' দিয়ে এবং 'as useful as' বসে।",
    explanation_en: "Superlative with 'the' transforms into positive using 'No other + singular noun + as ... as'.",
    question_type: "grammar"
  }));

  // --- PART 2: ENGLISH LITERATURE (20 Questions) ---

  // 26. Old & Middle English: Beowulf & Chaucer
  questions.push(createQ({
    topic: "English Literature — Old & Middle English",
    subtopic: "Beowulf and Geoffrey Chaucer",
    question_bn: `ইংরেজি সাহিত্যের প্রাচীনতম মহাকাব্য (Oldest English Epic) কোনটি এবং কাকে 'Father of English Literature' বলা হয়? [ইংরেজি সাহিত্য-${b}.২৬]`,
    question_en: `Which work is recognized as the oldest surviving epic in English literature, and who is hailed as the 'Father of English Literature'? [Eng Lit-${b}.26]`,
    options: {
      A: "মহাকাব্য: বিওউলফ (Beowulf); জনক: জিওফ্রে চসার (Geoffrey Chaucer)",
      B: "মহাকাব্য: ইলিয়াড; জনক: শেকসপিয়র",
      C: "মহাকাব্য: দ্য ওয়ান্ডারার; জনক: মিল্টন",
      D: "মহাকাব্য: দ্য ক্যান্টারবেরি টেলস; জনক: স্পেন্সার"
    },
    correct_option: "A",
    explanation_bn: "অষ্টম শতকে রচিত 'Beowulf' হলো প্রথম ইংরেজি জাতীয় মহাকাব্য এবং চতুর্দশ শতকে 'The Canterbury Tales'-এর রচয়িতা চসারকে ইংরেজি সাহিত্যের জনক বলা হয়।",
    explanation_en: "'Beowulf' is the oldest heroic poem in Old English, and Geoffrey Chaucer is acclaimed as the Father of English Literature."
  }));

  // 27. Geoffrey Chaucer: The Canterbury Tales
  questions.push(createQ({
    topic: "Middle English Literature — Geoffrey Chaucer",
    subtopic: "The Canterbury Tales and Heroic Couplet",
    question_bn: `জিওফ্রে চসার রচিত বিখ্যাত 'The Canterbury Tales' তীর্থযাত্রীদের কোন ধর্মীয় তীর্থক্ষেত্রে গমনের কাহিনী অবলম্বনে রচিত? [চসার সাহিত্য-${b}.২৭]`,
    question_en: `Geoffrey Chaucer's 'The Canterbury Tales' depicts pilgrims on a journey to the shrine of which saint? [Chaucer-${b}.27]`,
    options: {
      A: "সেন্ট থমাস বেকেটের মাজার (Canterbury Cathedral)",
      B: "সেন্ট পিটার্স ব্যাসিলিকা",
      C: "ওয়েস্টমিনস্টার অ্যাবে",
      D: "সেন্ট পলস ক্যাথিড্রাল"
    },
    correct_option: "A",
    explanation_bn: "লন্ডনের সাউথওয়ার্কের ট্যাবার্ড ইন থেকে ক্যান্টারবেরি ক্যাথেড্রালে নিহত আর্চবিশপ সেন্ট থমাস বেকেটের মাজার অভিমুখে যাত্রাকালে ২৯ জন তীর্থযাত্রীর গল্প বলার কাঠামো এটি।",
    explanation_en: "The pilgrims journey from the Tabard Inn to Canterbury Cathedral to visit the shrine of Saint Thomas Becket."
  }));

  // 28. Renaissance & Elizabethan: Christopher Marlowe
  questions.push(createQ({
    topic: "Elizabethan Drama — Christopher Marlowe",
    subtopic: "University Wits and Doctor Faustus",
    question_bn: `'University Wits'-এর অন্যতম প্রধান নাট্যকার ক্রিস্টোফার মার্লোর রচিত কোন নাটকে আত্মার বিনিময়ে শয়তান মেফিস্টোফিলিসের সাথে চুক্তি করার কাহিনী বর্ণিত? [এলিজাবেথীয় সাহিত্য-${b}.২৮]`,
    question_en: `In which renowned tragedy by Elizabethan playwright Christopher Marlowe does the protagonist sell his soul to Lucifer for 24 years of forbidden knowledge? [Marlowe-${b}.28]`,
    options: {
      A: "ডক্টর ফস্টাস (Doctor Faustus)",
      B: "ট্যাম্বারলেইন দ্য গ্রেট",
      C: "দ্য জিউ অব মাল্টা",
      D: "এডওয়ার্ড দ্য সেকেন্ড"
    },
    correct_option: "A",
    explanation_bn: "মার্লোর অমর ট্র্যাজেডি 'Doctor Faustus'-এ জ্ঞান ও ক্ষমতার মোহে শয়তানের কাছে আত্মা বিক্রি এবং চূড়ান্ত পরিণতির কাহিনী ব্ল্যাংক ভার্সে বর্ণিত হয়েছে।",
    explanation_en: "Marlowe's 'Doctor Faustus' depicts the tragic pact with Mephistopheles selling the soul for worldly mastery."
  }));

  // 29. Francis Bacon: Father of English Essay
  questions.push(createQ({
    topic: "Elizabethan Prose — Francis Bacon",
    subtopic: "Aphoristic Style & Essays",
    question_bn: `'Knowledge is power' (জ্ঞানই শক্তি) এবং 'Some books are to be tasted, others to be swallowed' — এই অমর উক্তিদ্বয় কার? [বেকন সাহিত্য-${b}.২৯]`,
    question_en: `'Knowledge is power' and 'Some books are to be tasted, others to be swallowed' — who is the author of these famous aphorisms? [Bacon-${b}.29]`,
    options: {
      A: "ফ্রান্সিস বেকন (Francis Bacon)",
      B: "জন লক",
      C: "টমাস কার্লাইল",
      D: "উইলিয়াম হ্যাজলিট"
    },
    correct_option: "A",
    explanation_bn: "ইংরেজি প্রবন্ধের জনক ফ্রান্সিস বেকন তাঁর প্রজ্ঞাপূর্ণ সংক্ষিপ্ত 'Aphoristic Style'-এর মাধ্যমে এসব নীতিগর্ভ প্রবচন রচনা করেন।",
    explanation_en: "Francis Bacon, the Father of the English Essay, is famed for his pithy aphoristic wisdom."
  }));

  // 30. Shakespeare Tragedies: Hamlet
  questions.push(createQ({
    topic: "Shakespearean Tragedies — Hamlet",
    subtopic: "'To be or not to be' and Soliloquy",
    question_bn: `শেকসপিয়রের বিখ্যাত ট্র্যাজেডি 'Hamlet'-এ রাজকুমার হ্যামলেটের অমর স্বগতোক্তি (Soliloquy) 'To be, or not to be, that is the question' নাটকের কোন অঙ্কে পাওয়া যায়? [শেকসপিয়র-${b}.৩০]`,
    question_en: `In William Shakespeare's tragedy 'Hamlet', in which act and scene does the iconic soliloquy 'To be, or not to be, that is the question' occur? [Shakespeare-${b}.30]`,
    options: {
      A: "অঙ্ক ৩, দৃশ্য ১ (Act III, Scene 1)",
      B: "অঙ্ক ১, দৃশ্য ২",
      C: "অঙ্ক ২, দৃশ্য ২",
      D: "অঙ্ক ৫, দৃশ্য ১"
    },
    correct_option: "A",
    explanation_bn: "ডেনমার্কের রাজকুমার হ্যামলেট জীবন ও মৃত্যুর দ্বন্দ্ব নিয়ে অ্যাক্ট ৩, সিন ১-এ এই বিশ্ববিখ্যাত সলিলকি উচ্চারণ করেন।",
    explanation_en: "Prince Hamlet delivers this iconic meditation on existence and death in Act III, Scene 1."
  }));

  // 31. Shakespeare Tragedies: Othello & Iago
  questions.push(createQ({
    topic: "Shakespearean Tragedies — Othello",
    subtopic: "Flaw of Jealousy and Villain Iago",
    question_bn: `শেকসপিয়রের 'Othello' ট্র্যাজেডিতে নায়ক ওথেলোর পতনের জন্য দায়ী প্রধান কুচক্রী খলনায়ক (Villain) চরিত্র কোনটি? [শেকসপিয়র-${b}.৩১]`,
    question_en: `In Shakespeare's tragedy 'Othello', who is the diabolical master villain engineering Othello's downfall through jealousy? [Shakespeare-${b}.31]`,
    options: {
      A: "ইয়াগো (Iago)",
      B: "ক্যাসিও",
      C: "রডরিগো",
      D: "ব্রাবানশিও"
    },
    correct_option: "A",
    explanation_bn: "ইয়াগো হিংসা ও চাতুর্যের মাধ্যমে রুমালের মিথ্যে প্রমাণ সাজিয়ে ওথেলোকে তাঁর নির্দোষ স্ত্রী ডেসডিমোনার বিরুদ্ধে অন্ধ সন্দেহে উসকে দেয়।",
    explanation_en: "Iago orchestrates the tragic downfall of Othello by manipulating him into fatal sexual jealousy."
  }));

  // 32. Shakespeare Tragedies: Macbeth
  questions.push(createQ({
    topic: "Shakespearean Tragedies — Macbeth",
    subtopic: "Vaulting Ambition and Famous Quotes",
    question_bn: `'Life's but a walking shadow, a poor player' — শেকসপিয়রের কোন ট্র্যাজেডিতে স্ত্রীর মৃত্যুর পর নায়ক এই বিখ্যাত উক্তিটি করেন? [শেকসপিয়র-${b}.৩২]`,
    question_en: `'Life's but a walking shadow, a poor player...' — which Shakespearean tragic hero delivers this existential monologue? [Shakespeare-${b}.32]`,
    options: {
      A: "ম্যাকবেথ (Macbeth)",
      B: "কিং লিয়ার",
      C: "জুলিয়াস সিজার",
      D: "রোমিও"
    },
    correct_option: "A",
    explanation_bn: "অ্যাক্ট ৫, সিন ৫-এ লেডি ম্যাকবেথের মৃত্যুর খবর শুনে ম্যাকবেথ জীবনের চরম শূন্যতা ও ক্ষণস্থায়ী অর্থহীনতা প্রকাশে এই অবিস্মরণীয় উক্তি করেন।",
    explanation_en: "Macbeth speaks this famous soliloquy in Act V, Scene 5 upon hearing of Lady Macbeth's death."
  }));

  // 33. Shakespeare Comedies: The Merchant of Venice
  questions.push(createQ({
    topic: "Shakespearean Comedies — The Merchant of Venice",
    subtopic: "Portia's 'Quality of Mercy' and Shylock",
    question_bn: `'The quality of mercy is not strained' — শেকসপিয়রের 'The Merchant of Venice'-এ আদালতে ছদ্মবেশে এই বক্তব্য কে রাখেন? [শেকসপিয়র-${b}.৩৩]`,
    question_en: `'The quality of mercy is not strained' — in 'The Merchant of Venice', who delivers this eloquent speech disguised as a lawyer? [Shakespeare-${b}.33]`,
    options: {
      A: "পোর্শিয়া (Portia - বালথাজার ছদ্মনামে)",
      B: "আন্তোনিও",
      C: "বাসানিও",
      D: "জেসিকা"
    },
    correct_option: "A",
    explanation_bn: "আইনজীবী বালথাজারের ছদ্মবেশ ধারণ করে বুদ্ধিমতী নায়িকা পোর্শিয়া ভেনিসের আদালতে নিষ্ঠুর সুদখোর শাইলকের বিরুদ্ধে ক্ষমার মহিমা বর্ণনা করেন।",
    explanation_en: "Portia, disguised as the young legal doctor Balthazar, appeals for mercy against Shylock's pound-of-flesh demand."
  }));

  // 34. John Donne: Metaphysical Poetry
  questions.push(createQ({
    topic: "Metaphysical Poetry — John Donne",
    subtopic: "Metaphysical Conceit & 'The Good-Morrow'",
    question_bn: `সপ্তদশ শতকের 'মেটাফিজিক্যাল পোয়েট্রি'র প্রধান পুরোধা কবি কে যিনি দুরূহ রূপক (Conceit) ব্যবহারে অদ্বিতীয় ছিলেন? [মেটাফিজিক্যাল কবিতা-${b}.৩৪]`,
    question_en: `Who is the primary pioneer of 17th-century 'Metaphysical Poetry' celebrated for his far-fetched conceits in poems like 'The Sun Rising'? [Donne-${b}.34]`,
    options: {
      A: "জন ডান (John Donne)",
      B: "জর্জ হার্বার্ট",
      C: "অ্যান্ড্রু মার্ভেল",
      D: "রবার্ট হেরিক"
    },
    correct_option: "A",
    explanation_bn: "জন ডান মেটাফিজিক্যাল কবিদের নেতা ছিলেন। তাঁর কবিতায় আবেগ ও বুদ্ধিবৃত্তির জটিল মিলন এবং অভিনব কনসিটের প্রাচুর্য বিদ্যমান।",
    explanation_en: "John Donne is the supreme master of metaphysical poetry and intellectual conceits."
  }));

  // 35. John Milton: Paradise Lost
  questions.push(createQ({
    topic: "Puritan Period — John Milton",
    subtopic: "Paradise Lost and Epic Invocations",
    question_bn: `অন্ধ কবি জন মিল্টন রচিত বিখ্যাত মহাকাব্য 'Paradise Lost' (১৬৬৭)-এর মূল মহৎ উদ্দেশ্য (Grand Theme) কী ছিল? [মিল্টন সাহিত্য-${b}.৩৫]`,
    question_en: `What was the grand avowed theological objective stated by John Milton in the invocation of 'Paradise Lost' (1667)? [Milton-${b}.35]`,
    options: {
      A: "মানুষের কাছে ঈশ্বরের বিধিব্যবস্থাকে যৌক্তিক প্রমাণ করা (Justify the ways of God to men)",
      B: "শয়তান লুসিফারের গৌরবগাথা রচনা",
      C: "স্বর্গের রাজত্ব ধ্বংস করা",
      D: "রোমান সাম্রাজ্যের পতন বর্ণনা"
    },
    correct_option: "A",
    explanation_bn: "মিল্টনের নিজের ভাষায় মহাকাব্যের উদ্দেশ্য ছিল: 'To justify the ways of God to men' অর্থাৎ মানুষের কাছে ঈশ্বরের ন্যায়পরায়ণতা তুলে ধরা।",
    explanation_en: "Milton stated his epic aim was to 'assert Eternal Providence, and justify the ways of God to men'."
  }));

  // 36. Alexander Pope: The Rape of the Lock
  questions.push(createQ({
    topic: "Augustan Age — Alexander Pope",
    subtopic: "The Rape of the Lock and Mock-Heroic Epic",
    question_bn: `আলেকজান্ডার পোপের অমর ব্যঙ্গাত্মক কাব্য 'The Rape of the Lock' ইংরেজি সাহিত্যের কোন ধরনের কাব্যের শ্রেষ্ঠ নিদর্শন? [পোপ সাহিত্য-${b}.৩৬]`,
    question_en: `Alexander Pope's masterpiece 'The Rape of the Lock' is considered the supreme masterpiece of which literary genre? [Pope-${b}.36]`,
    options: {
      A: "মক-হিরোইক এপিক বা ব্যঙ্গ মহাকাব্য (Mock-Heroic Epic)",
      B: "রোমান্টিক ট্র্যাজেডি",
      C: "ঐতিহাসিক আখ্যানকাব্য",
      D: "ধর্মীয় গীতিকাব্য"
    },
    correct_option: "A",
    explanation_bn: "লর্ড পিটারের বেলিন্ডার চুলের বেণী কাটার তুচ্ছ ঘটনাকে মহাকাব্যের গাম্ভীর্যে ব্যঙ্গ করে হিরোইক কাপলেটে পোপ এই মক-এপিক রচনা করেন।",
    explanation_en: "'The Rape of the Lock' is a high mock-heroic epic satirizing aristocratic vanity in heroic couplets."
  }));

  // 37. Jonathan Swift: Gulliver's Travels
  questions.push(createQ({
    topic: "18th Century Prose — Jonathan Swift",
    subtopic: "Gulliver's Travels and Satire",
    question_bn: `জোনাথন সুইফট রচিত কালজয়ী ব্যঙ্গাত্মক উপন্যাস 'Gulliver's Travels' (১৭২৬)-এ ছয় ইঞ্চি আকারের ক্ষুদ্র মানুষের দেশকে কী বলা হয়েছে? [সুইফট সাহিত্য-${b}.৩৭]`,
    question_en: `In Jonathan Swift's biting satire 'Gulliver's Travels' (1726), what is the island kingdom of six-inch tiny people named? [Swift-${b}.37]`,
    options: {
      A: "লিলিপুট (Lilliput)",
      B: "ব্রবডিংনাগ (Brobdingnag)",
      C: "লাপুট্টা (Laputa)",
      D: "হুইনহম (Houyhnhnms)"
    },
    correct_option: "A",
    explanation_bn: "প্রথম পর্বে গালিভার লিলিপুটের ক্ষুদ্র মানুষদের দ্বীপে যান; দ্বিতীয় পর্বে ব্রবডিংনাগে যান যেখানে মানুষগুলো বিশালাকার দৈত্যের মতো ছিল।",
    explanation_en: "Lilliput is the land inhabited by tiny people six inches tall in Part I of Gulliver's Travels."
  }));

  // 38. Romantic Period: Wordsworth and Lyrical Ballads
  questions.push(createQ({
    topic: "Romantic Poetry — William Wordsworth",
    subtopic: "Lyrical Ballads (1798) and Nature",
    question_bn: `১৭৯৮ সালে উইলিয়াম ওয়ার্ডসওয়ার্থ এবং এস টি কোলরিজের যৌথভাবে প্রকাশিত কোন কাব্যগ্রন্থের মাধ্যমে ইংরেজি রোমান্টিক যুগের সূচনা ঘটে? [রোমান্টিক সাহিত্য-${b}.৩৮]`,
    question_en: `The publication of which joint poetry collection by Wordsworth and Coleridge in 1798 heralded the Romantic Revival? [Romantic Lit-${b}.38]`,
    options: {
      A: "লিরিক্যাল ব্যালাডস (Lyrical Ballads)",
      B: "দ্য প্রিলিউড",
      C: "কুবালা খান",
      D: "সংগস অব ইনোসেন্স"
    },
    correct_option: "A",
    explanation_bn: "১৭৯৮ সালে লিরিক্যাল ব্যালাডসের প্রকাশনার মাধ্যমেই প্রকৃতির কবি ওয়ার্ডসওয়ার্থ ও কোলরিজ রোমান্টিক ধারার বিপ্লব ঘটান। এতে মোট ২৩টি কবিতা ছিল।",
    explanation_en: "The publication of 'Lyrical Ballads' in 1798 with 23 poems officially marks the beginning of English Romanticism."
  }));

  // 39. John Keats: Poet of Beauty
  questions.push(createQ({
    topic: "Romantic Poetry — John Keats",
    subtopic: "'A thing of beauty is a joy for ever'",
    question_bn: `'A thing of beauty is a joy for ever' এবং 'Beauty is truth, truth beauty' — এই অমর কাব্যচরণগুলোর রচয়িতা কে? [রোমান্টিক সাহিত্য-${b}.৩৯]`,
    question_en: `'A thing of beauty is a joy for ever' and 'Beauty is truth, truth beauty' were penned by which supreme poet of beauty? [Romantic Lit-${b}.39]`,
    options: {
      A: "জন কিটস (John Keats)",
      B: "পি বি শেলি",
      C: "লর্ড বায়রন",
      D: "উইলিয়াম ব্লেক"
    },
    correct_option: "A",
    explanation_bn: "সৌন্দর্যের কবি জন কিটস তাঁর 'Endymion' কাব্যের সূচনায় প্রথম লাইনটি এবং 'Ode on a Grecian Urn'-এর সমাপ্তিতে দ্বিতীয় লাইনটি রচনা করেন।",
    explanation_en: "John Keats wrote these immortal aesthetic maxims in 'Endymion' and 'Ode on a Grecian Urn'."
  }));

  // 40. P. B. Shelley: Poet of Hope and Revolution
  questions.push(createQ({
    topic: "Romantic Poetry — P. B. Shelley",
    subtopic: "'Ode to the West Wind' and Optimism",
    question_bn: `'If Winter comes, can Spring be far behind?' — আশাবাদের এই অমর পঙ্‌ক্তিটি পি বি শেলির কোন বিখ্যাত কবিতার সমাপ্তি চরণ? [রোমান্টিক সাহিত্য-${b}.৪০]`,
    question_en: `'If Winter comes, can Spring be far behind?' — this celebrated line of supreme optimism concludes which poem by P. B. Shelley? [Romantic Lit-${b}.40]`,
    options: {
      A: "ওড টু দ্য ওয়েস্ট উইন্ড (Ode to the West Wind)",
      B: "টু আ স্কাইলার্ক",
      C: "প্রমিথিউস আনবাউন্ড",
      D: "অ্যাডোনেইস"
    },
    correct_option: "A",
    explanation_bn: "পশ্চিমা বাতাসের বৈপ্লবিক ধ্বংস ও পুনর্জন্মের ক্ষমতার বন্দনা করে ১৮১৯ সালে শেলি এই কালজয়ী আশাবাদী কবিতাটি রচনা করেন।",
    explanation_en: "Shelley concludes his stirring revolutionary lyric 'Ode to the West Wind' with this triumphant line."
  }));

  // 41. Victorian Literature: Charles Dickens
  questions.push(createQ({
    topic: "Victorian Fiction — Charles Dickens",
    subtopic: "A Tale of Two Cities and Social Realism",
    question_bn: `চার্লস ডিকেন্সের কালজয়ী ঐতিহাসিক উপন্যাস 'A Tale of Two Cities' (১৮৫৯)-এর কাহিনী কোন দুটি শহরের প্রেক্ষাপটে রচিত? [ভিক্টোরীয় সাহিত্য-${b}.৪১]`,
    question_en: `Charles Dickens's famous historical novel 'A Tale of Two Cities' (1859) is set against the turbulent backdrop of which two cities? [Victorian Lit-${b}.41]`,
    options: {
      A: "লন্ডন ও প্যারিস (London & Paris)",
      B: "লন্ডন ও নিউইয়র্ক",
      C: "প্যারিস ও রোম",
      D: "লন্ডন ও ডাবলিন"
    },
    correct_option: "A",
    explanation_bn: "ফরাসি বিপ্লবের প্রেক্ষাপটে সিডনি কার্টন ও চার্লস ডার্নের কাহিনী নিয়ে লন্ডন ও প্যারিস শহরের দ্বন্দ্বে এই উপন্যাস রচিত। বিখ্যাত সূচনা: 'It was the best of times, it was the worst of times'।"
  }));

  // 42. Victorian Poetry: Lord Tennyson and Robert Browning
  questions.push(createQ({
    topic: "Victorian Poetry — Dramatic Monologue",
    subtopic: "Robert Browning and 'My Last Duchess'",
    question_bn: `ভিক্টোরীয় যুগের কবি রবার্ট ব্রাউনিং কোন বিশেষ কাব্যধারার (Poetic Genre) সর্বশ্রেষ্ঠ রূপকার হিসেবে খ্যাত? [ভিক্টোরীয় কবিতা-${b}.৪২]`,
    question_en: `Victorian poet Robert Browning is celebrated as the unmatched supreme master of which poetic form? [Victorian Poetry-${b}.42]`,
    options: {
      A: "ড্রামাটিক মনোলগ বা নাটকীয় স্বগতোক্তি (Dramatic Monologue)",
      B: "সনেট গুচ্ছ",
      C: "মহাকাব্য",
      D: "ব্যালাড"
    },
    correct_option: "A",
    explanation_bn: "'My Last Duchess' এবং 'Fra Lippo Lippi'-তে ব্রাউনিং একক বক্তার মাধ্যমে এক গভীর মনস্তাত্ত্বিক চরিত্র উন্মোচন করেন যাকে ড্রামাটিক মনোলগ বলে।",
    explanation_en: "Browning perfected the Dramatic Monologue, presenting a single speaker revealing their inner psychology."
  }));

  // 43. Modernist Literature: T. S. Eliot
  questions.push(createQ({
    topic: "Modernist Poetry — T. S. Eliot",
    subtopic: "'The Waste Land' (1922) and Nobel Prize",
    question_bn: `১৯২২ সালে প্রকাশিত আধুনিক কবিতার মাইলফলক 'The Waste Land' (যার বিখ্যাত সূচনা: 'April is the cruellest month')-এর রচয়িতা কে? [আধুনিক ইংরেজি সাহিত্য-${b}.৪৩]`,
    question_en: `Who authored the landmark modernist poem 'The Waste Land' (1922) famously opening with 'April is the cruellest month'? [Modernist Lit-${b}.43]`,
    options: {
      A: "টি এস এলিয়ট (T. S. Eliot - নোবেল বিজয়ী ১৯৪৮)",
      B: "ডব্লিউ বি ইয়েটস",
      C: "এজরা পাউন্ড",
      D: "ডব্লিউ এইচ অডেন"
    },
    correct_option: "A",
    explanation_bn: "প্রথম বিশ্বযুদ্ধোত্তর ইউরোপীয় অবক্ষয় ও আধ্যাত্মিক শূন্যতাকে রূপক করে ৫টি অংশে এলিয়ট 'The Waste Land' রচনা করেন।",
    explanation_en: "T. S. Eliot published 'The Waste Land' in 1922, capturing postwar spiritual disillusionment in 433 lines."
  }));

  // 44. Modern Fiction: George Orwell
  questions.push(createQ({
    topic: "20th Century Dystopian Fiction — George Orwell",
    subtopic: "'Animal Farm' & '1984'",
    question_bn: `জর্জ অরওয়েল রচিত রূপক ব্যঙ্গাত্মক উপন্যাস 'Animal Farm'-এ শূকরদের স্লোগান 'All animals are equal, but some animals are more equal than others' কার স্বৈরতন্ত্রকে ব্যঙ্গ করে? [অরওয়েল সাহিত্য-${b}.৪৪]`,
    question_en: `George Orwell's satirical fable 'Animal Farm' (1945) primarily allegorizes the totalitarian regime of which historical figure? [Orwell-${b}.44]`,
    options: {
      A: "জোসেফ স্ট্যালিন ও সোভিয়েত একনায়কতন্ত্র (নেপোলিয়ন চরিত্র)",
      B: "এডলফ হিটলার",
      C: "বেনিতো মুসোলিনি",
      D: "উইনস্টন চার্চিল"
    },
    correct_option: "A",
    explanation_bn: "অরওয়েল রাশিয়ার ১৯১৭ সালের বিপ্লব ও স্ট্যালিনের চরম ক্ষমতার অপব্যবহারকে ব্যঙ্গ করে নেপোলিয়ন নামক শূকর চরিত্রের মাধ্যমে এ চিত্র আঁকেন।",
    explanation_en: "'Animal Farm' satirizes the Russian Revolution and Stalinist totalitarian corruption through the pig Napoleon."
  }));

  // 45. Modern Fiction: Ernest Hemingway
  questions.push(createQ({
    topic: "American Literature — Ernest Hemingway",
    subtopic: "'The Old Man and the Sea' (1952) and Nobel",
    question_bn: `'Man is not made for defeat. A man can be destroyed but not defeated' — আর্নেস্ট হেমিংওয়ের কোন নোবেলজয়ী উপন্যাসের অমর উক্তি? [হেমিংওয়ে সাহিত্য-${b}.৪৫]`,
    question_en: `'Man is not made for defeat. A man can be destroyed but not defeated' — which masterpiece by Ernest Hemingway features this defiance? [Hemingway-${b}.45]`,
    options: {
      A: "দ্য ওল্ড ম্যান অ্যান্ড দ্য সি (The Old Man and the Sea)",
      B: "আ ফেয়ারওয়েল টু আর্মস",
      C: "ফর হুম দ্য বেল টোলস",
      D: "দ্য সান অলসো রাইজেস"
    },
    correct_option: "A",
    explanation_bn: "বৃদ্ধ কিউবান জেলে সান্তিয়াগোর বিশাল মার্লিন মাছের সাথে ৮৪ দিন পর তিন দিনের অসম সংগ্রামের এই কাহিনী হেমিংওয়েকে নোবেল পুরস্কার (১৯৫৪) এনে দেয়।",
    explanation_en: "Santiago utters this immortal declaration in 'The Old Man and the Sea' (1952) exemplifying human endurance."
  }));

  return questions.slice(0, count);
}
