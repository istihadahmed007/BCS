export const mentalAbilityQuestions = [
  {
    subject: "Mental Ability",
    topic: "সংখ্যা ও অক্ষর শ্রেণি",
    subtopic: "সংখ্যা ধারা",
    question_bn: "নিচের সংখ্যা সারির পরবর্তী সংখ্যাটি কত? ২, ৩, ৫, ৯, ১৭, ৩৩, ...",
    question_en: "Find the next number in the given logical sequence: 2, 3, 5, 9, 17, 33, ...",
    options: {
      A: "49",
      B: "65",
      C: "55",
      D: "67"
    },
    correct_option: "B",
    explanation_bn: "পার্থক্য লক্ষ্য করি: ৩-২ = ১ = ২^০; ৫-৩ = ২ = ২^১; ৯-৫ = ৪ = ২^২; ১৭-৯ = ৮ = ২^৩; ৩৩-১৭ = ১৬ = ২^৪। পরবর্তী পার্থক্য হবে ২^৫ = ৩২। অতএব পরবর্তী সংখ্যা = ৩৩ + ৩২ = ৬৫। (বিকল্পভাবে: পদ × ২ - ১: ৩৩ × ২ - ১ = ৬৫)।",
    explanation_en: "The successive differences double each time (1, 2, 4, 8, 16, 32), yielding 33 + 32 = 65.",
    difficulty: "easy",
    question_type: "reasoning",
    source_title: "বিসিএস মানসিক দক্ষতা — মো. জহিরুল ইসলাম",
    source_page_or_section: "সংখ্যা শ্রেণি প্যাটার্ন"
  },
  {
    subject: "Mental Ability",
    topic: "কোডিং ও ডিকোডিং",
    subtopic: "অক্ষর প্রতিস্থাপন সংকেত",
    question_bn: "একটি নির্দিষ্ট সাংকেতিক নিয়মে যদি 'APPLE'-কে 'EQTPI' লেখা হয়, তবে সেই নিয়মে 'MANGO'-কে কী লেখা হবে?",
    question_en: "If 'APPLE' is coded as 'EQTPI' in a cipher where each letter shifts by +4 positions, how is 'MANGO' coded?",
    options: {
      A: "QERKS",
      B: "RERKS",
      C: "QESKS",
      D: "PESKS"
    },
    correct_option: "A",
    explanation_bn: "প্রতিটি বর্ণ বর্ণমালায় ৪ ধাপ সামনে অগ্রসর হয়েছে (+4 shift): A (+4) = E, P (+4) = T, P (+4) = T, L (+4) = P, E (+4) = I। একইভাবে 'MANGO'-এর ক্ষেত্রে: M (+4) = Q; A (+4) = E; N (+4) = R; G (+4) = K; O (+4) = S। সুতরাং সংকেত হবে 'QERKS'।",
    explanation_en: "Applying a Caesar shift of +4: M->Q, A->E, N->R, G->K, O->S, yielding 'QERKS'.",
    difficulty: "medium",
    question_type: "reasoning",
    source_title: "A Modern Approach to Verbal & Non-Verbal Reasoning — R. S. Aggarwal",
    source_page_or_section: "Coding-Decoding: Letter Shifting"
  },
  {
    subject: "Mental Ability",
    topic: "রক্তের সম্পর্ক",
    subtopic: "পারিবারিক সম্পর্ক নির্ণয়",
    question_bn: "একটি ছবির দিকে নির্দেশ করে রহিমা বলল, 'তিনি আমার মায়ের একমাত্র ছেলের পিতা।' ছবির ব্যক্তিটি রহিমার কে হন?",
    question_en: "Pointing to a photograph, Rahima said, 'He is the father of my mother's only son.' How is the person related to Rahima?",
    options: {
      A: "চাচা",
      B: "বাবা (পিতা)",
      C: "ভাই",
      D: "দাদা"
    },
    correct_option: "B",
    explanation_bn: "রহিমার 'মায়ের একমাত্র ছেলে' হলো রহিমার নিজের ভাই। আর ভাইয়ের পিতা হলেন রহিমার নিজের পিতা (বাবা)। সুতরাং ছবির ব্যক্তিটি রহিমার পিতা।",
    explanation_en: "Mother's only son is Rahima's brother. The brother's father is Rahima's own father.",
    difficulty: "easy",
    question_type: "reasoning",
    source_title: "মানসিক দক্ষতা গাইড — খাইরুল ইসলাম",
    source_page_or_section: "রক্তের সম্পর্ক সমস্যা"
  },
  {
    subject: "Mental Ability",
    topic: "দিক ও দূরত্ব",
    subtopic: "দিক নির্ণয়",
    question_bn: "একজন ব্যক্তি উত্তর দিকে ২০ মিটার হাঁটার পর ডানদিকে ঘুরে ৩০ মিটার হাঁটলেন। এরপর আবার ডানদিকে ঘুরে ২০ মিটার হাঁটলেন। তিনি শুরুর স্থান থেকে কোন দিকে এবং কত দূরে আছেন?",
    question_en: "A person walks 20m North, turns right and walks 30m, then turns right again and walks 20m. Where is he from the start?",
    options: {
      A: "পূর্ব দিকে ৩০ মিটার",
      B: "পশ্চিম দিকে ৩০ মিটার",
      C: "উত্তর দিকে ৫০ মিটার",
      D: "দক্ষিণ দিকে ২০ মিটার"
    },
    correct_option: "A",
    explanation_bn: "প্রথমে উত্তর দিকে ২০ মিটার গিয়ে ডানদিকে (পূর্বে) ৩০ মিটার গেলেন। এরপর আবার ডানদিকে (দক্ষিণে) ২০ মিটার আসায় তার উত্তর-দক্ষিণ সরণ শূন্য হয়ে গেল (+২০ - ২০ = ০)। তিনি শুরুর বিন্দু থেকে ঠিক পূর্ব দিকে ৩০ মিটার দূরত্বে অবস্থান করছেন।",
    explanation_en: "Vertical displacement cancels (+20m North - 20m South = 0m). The horizontal displacement leaves him 30m directly East of the starting point.",
    difficulty: "easy",
    question_type: "reasoning",
    source_title: "বিসিএস মানসিক দক্ষতা অনুশীলন",
    source_page_or_section: "দিক ও দূরত্বের সমস্যা"
  },
  {
    subject: "Mental Ability",
    topic: "ঘড়ি ও সময়",
    subtopic: "ঘড়ির কাঁটার মধ্যবর্তী কোণ",
    question_bn: "ঘড়িতে যখন ঠিক ৪টা ২০ মিনিট বাজে, তখন ঘণ্টার কাঁটা ও মিনিটের কাঁটার মধ্যবর্তী কোণ কত ডিগ্রি?",
    question_en: "What is the angle between the hour hand and minute hand of a clock at exactly 4:20?",
    options: {
      A: "0°",
      B: "10°",
      C: "15°",
      D: "20°"
    },
    correct_option: "B",
    explanation_bn: "ঘড়ির কাঁটা দুটির মধ্যবর্তী কোণের সূত্র: θ = |(60H - 11M) / 2|। এখানে ঘণ্টা H = 4 এবং মিনিট M = 20। কোণ θ = |(60 × 4 - 11 × 20) / 2| = |(240 - 220) / 2| = |20 / 2| = 10 ডিগ্রি।",
    explanation_en: "Formula: |(60H - 11M) / 2| = |(240 - 220) / 2| = 20 / 2 = 10 degrees.",
    difficulty: "medium",
    question_type: "calculation",
    source_title: "মানসিক দক্ষতা গণিত — ড. জামিলুর রেজা",
    source_page_or_section: "ঘড়ির কাঁটার কৌণিক দূরত্ব"
  },
  {
    subject: "Mental Ability",
    topic: "ক্যালেন্ডার ও দিন গণনা",
    subtopic: "বার নির্ণয়",
    question_bn: "আজ যদি শনিবার হয়, তবে ঠিক ৬৩ দিন পর কী বার হবে?",
    question_en: "If today is Saturday, what day of the week will it be 63 days from today?",
    options: {
      A: "শুক্রবার",
      B: "শনিবার",
      C: "রবিবার",
      D: "সোমবার"
    },
    correct_option: "B",
    explanation_bn: "সপ্তাহ ৭ দিনে চক্রাকারে আবর্তিত হয়। ৬৩-কে ৭ দিয়ে ভাগ করলে ভাগশেষ থাকে ০ (৬৩ = ৭ × ৯ + ০)। অতিরিক্ত কোনো দিন (Odd days) না থাকায় ৬৩ দিন পরের দিনটি আজকের দিনের মতোই 'শনিবার' হবে।",
    explanation_en: "63 is exactly divisible by 7 (remainder 0). With zero odd days, the day remains Saturday.",
    difficulty: "easy",
    question_type: "reasoning",
    source_title: "মানসিক দক্ষতা — এনসিটিবি ও বিসিএস পাঠ্য",
    source_page_or_section: "ক্যালেন্ডার সমস্যা"
  },
  {
    subject: "Mental Ability",
    topic: "শব্দ সাদৃশ্য (Analogy)",
    subtopic: "সম্পর্কীয় সাদৃশ্য",
    question_bn: "'Book : Library :: Painting : ?' — শূন্যস্থানে সঠিক সাদৃশ্যমূলক শব্দটি কোনটি?",
    question_en: "Select the corresponding analogical match: 'Book : Library :: Painting : ?'",
    options: {
      A: "Studio",
      B: "Museum / Gallery",
      C: "Canvas",
      D: "Artist"
    },
    correct_option: "B",
    explanation_bn: "বই (Book) সংরক্ষিত ও প্রদর্শিত হয় লাইব্রেরিতে (Library)। একইভাবে চিত্রকর্ম (Painting) জনসাধারণের দেখার জন্য সংরক্ষিত ও প্রদর্শিত হয় আর্ট গ্যালারি বা জাদুঘরে (Gallery / Museum)।",
    explanation_en: "Books are preserved and displayed in a Library; similarly, paintings are housed and exhibited in a Museum or Art Gallery.",
    difficulty: "easy",
    question_type: "reasoning",
    source_title: "Verbal Analogies — GRE & BCS Guide",
    source_page_or_section: "Item to Repository Analogy"
  },
  {
    subject: "Mental Ability",
    topic: "শ্রেণিবিভাগ (Odd One Out)",
    subtopic: "বেমানান শব্দ শনাক্তকরণ",
    question_bn: "নিচের চারটির মধ্যে কোনটি ভিন্ন বা বেমানান?",
    question_en: "Which of the following does not belong with the others (Odd One Out)?",
    options: {
      A: "মার্কারি (বুধ)",
      B: "ভেনাস (শুক্র)",
      C: "জুপিতার (বৃহস্পতি)",
      D: "মুন (চাঁদ)"
    },
    correct_option: "D",
    explanation_bn: "বুধ (Mercury), শুক্র (Venus) এবং বৃহস্পতি (Jupiter) সৌরজগতের গ্রহ (Planets)। কিন্তু চাঁদ (Moon) হলো পৃথিবীর একমাত্র প্রাকৃতিক উপগ্রহ (Satellite)। তাই চাঁদ বেমানান।",
    explanation_en: "Mercury, Venus, and Jupiter are planets, whereas the Moon is a natural satellite.",
    difficulty: "easy",
    question_type: "reasoning",
    source_title: "General Mental Ability — BPSC Pattern",
    source_page_or_section: "Classification / Odd One Out"
  },
  {
    subject: "Mental Ability",
    topic: "আয়না ও প্রতিবিম্ব",
    subtopic: "অক্ষরের পার্শ্বীয় পরিবর্তন",
    question_bn: "আয়নায় দেখলে নিচের কোন ইংরেজি শব্দটির প্রতিফলন অবিকল অপরিবর্তিত থাকবে?",
    question_en: "Which of the following capitalized English words looks identical to its original form in a plane vertical mirror?",
    options: {
      A: "MOM",
      B: "CAT",
      C: "DOG",
      D: "PEN"
    },
    correct_option: "A",
    explanation_bn: "M এবং O বর্ণ দুটি উল্লম্ব অক্ষ বরাবর প্রতিসম (Symmetrical)। ফলে 'MOM' শব্দটিকে সমতল উল্লম্ব আয়নায় দেখলে তার অক্ষরগুলো উল্টে গেলেও অবিকল 'MOM' হিসেবেই দৃশ্যমান হবে।",
    explanation_en: "The letters M and O have vertical bilateral symmetry; hence 'MOM' reflected across a vertical plane mirror appears identical.",
    difficulty: "easy",
    question_type: "reasoning",
    source_title: "নন-ভার্বাল রিজনিং — বিসিএস",
    source_page_or_section: "মিরর ইমেজ"
  },
  {
    subject: "Mental Ability",
    topic: "যুক্তি ও অনুমান (Syllogism)",
    subtopic: "যৌক্তিক সিদ্ধান্ত গ্রহণ",
    question_bn: "বিবৃতি ১: সকল ফল সুস্বাদু। বিবৃতি ২: আম একটি ফল। সিদ্ধান্ত: কোনটি সঠিক?",
    question_en: "Premise 1: All fruits are delicious. Premise 2: Mango is a fruit. Conclusion:",
    options: {
      A: "আম অবশ্যই সুস্বাদু",
      B: "কিছু আম সুস্বাদু নয়",
      C: "সকল সুস্বাদু বস্তুই আম",
      D: "কোনো সিদ্ধান্ত নেওয়া যায় না"
    },
    correct_option: "A",
    explanation_bn: "যেহেতু সকল ফল সুস্বাদু শ্রেণীর অন্তর্ভুক্ত এবং আম ফলের একটি উপসেট, তাই যৌক্তিকভাবে আম অবশ্যই সুস্বাদু হবে (Valid deductive syllogism: All A are B, C is A, therefore C is B)।",
    explanation_en: "By classical deductive logic, if all fruits are delicious and mango belongs to the set of fruits, then mango is unequivocally delicious.",
    difficulty: "easy",
    question_type: "reasoning",
    source_title: "Logical Deductions — Deductive Reasoning Guide",
    source_page_or_section: "Categorical Syllogisms"
  }
];
