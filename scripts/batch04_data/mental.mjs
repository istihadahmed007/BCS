export const mentalAbilityQuestions = [
  {
    subject: "Mental Ability",
    topic: "অক্ষর ও সংখ্যা স্থানিক মান",
    subtopic: "বর্ণমালার বিপরীত অবস্থান",
    question_bn: "ইংরেজি বর্ণমালায় বাম দিক থেকে ১৬তম বর্ণের ঠিক ডানদিকের ৪র্থ বর্ণটি কোনটি?",
    question_en: "In standard English alphabetical order, which letter is the 4th to the right of the 16th letter from the left?",
    options: {
      A: "T",
      B: "S",
      C: "U",
      D: "R"
    },
    correct_option: "A",
    explanation_bn: "বাম দিক থেকে ১৬তম বর্ণ হলো 'P'। তার ডানদিকে ৪ ধাপ অগ্রসর হলে হবে (১৬ + ৪) = ২০তম বর্ণ। ইংরেজি বর্ণমালার ২০তম বর্ণ হলো 'T' (T-20)।",
    explanation_en: "The 16th letter is P. Moving 4 positions to the right yields the 20th letter, which is T.",
    difficulty: "easy",
    question_type: "reasoning",
    source_title: "বিসিএস মানসিক দক্ষতা — মো. জহিরুল ইসলাম",
    source_page_or_section: "বর্ণমালা ক্রম সমস্যা"
  },
  {
    subject: "Mental Ability",
    topic: "ক্রম ও অবস্থান (Ranking)",
    subtopic: "সারিতে মোট ব্যক্তি গণনা",
    question_bn: "একটি সারিতে রহিমের অবস্থান উভয় প্রান্ত থেকেই (সামনে এবং পেছন থেকে) ১৬তম হলে, সারিতে মোট কতজন শিক্ষার্থী রয়েছে?",
    question_en: "If Rahim is ranked 16th from both the front and the back in a single file queue, how many students are in the queue?",
    options: {
      A: "31 জন",
      B: "32 জন",
      C: "30 জন",
      D: "33 জন"
    },
    correct_option: "A",
    explanation_bn: "সূত্র: মোট ব্যক্তি = (সামনের অবস্থান + পেছনের অবস্থান) - ১। এখানে মোট ছাত্র = (১৬ + ১৬) - ১ = ৩২ - ১ = ৩১ জন (যেহেতু রহিমকে দুইবার গণনা করা হয়েছে, তাই ১ বিয়োগ করতে হবে)।",
    explanation_en: "Total persons = (Position from front + Position from back) - 1 = (16 + 16) - 1 = 31.",
    difficulty: "easy",
    question_type: "reasoning",
    source_title: "A Modern Approach to Verbal Reasoning — R. S. Aggarwal",
    source_page_or_section: "Ranking and Ordering"
  },
  {
    subject: "Mental Ability",
    topic: "স্থানিক যুক্তি — ছক্কার বিপরীত তল",
    subtopic: "আদর্শ ছক্কা (Standard Die)",
    question_bn: "একটি আদর্শ বা প্রমাণ ছক্কার (Standard Die) '৩' লেখা তলের ঠিক বিপরীত তলে কোন সংখ্যাটি থাকবে?",
    question_en: "On a standard fair cubic die, which number is located directly opposite to the face showing 3?",
    options: {
      A: "4",
      B: "5",
      C: "6",
      D: "2"
    },
    correct_option: "A",
    explanation_bn: "একটি স্ট্যান্ডার্ড বা আদর্শ ছক্কার বিপরীত দুটি তলের সংখ্যার যোগফল সর্বদা ৭ হয় (১+৬ = ৭; ২+৫ = ৭; ৩+৪ = ৭)। সুতরাং ৩-এর বিপরীত তলে থাকবে (৭ - ৩) = ৪।",
    explanation_en: "On any standard die, opposite faces always sum to 7. Opposite to 3 is 7 - 3 = 4.",
    difficulty: "easy",
    question_type: "reasoning",
    source_title: "নন-ভার্বাল রিজনিং — ডাইস সমস্যা",
    source_page_or_section: "স্ট্যান্ডার্ড ছক্কার নিয়মাবলী"
  },
  {
    subject: "Mental Ability",
    topic: "গাণিতিক ধাঁধা ও প্যাটার্ন",
    subtopic: "ত্রিভুজীয় সংখ্যা ধাঁধা",
    question_bn: "যদি 2 + 3 = 10, 7 + 2 = 63, 6 + 5 = 66 হয়, তবে 8 + 4 = ?",
    question_en: "If 2 + 3 = 10, 7 + 2 = 63, and 6 + 5 = 66, find the value of 8 + 4 under the same logic.",
    options: {
      A: "96",
      B: "48",
      C: "84",
      D: "32"
    },
    correct_option: "A",
    explanation_bn: "লজিক: (১ম সংখ্যা + ২য় সংখ্যা) × ১ম সংখ্যা। পরীক্ষা: (২ + ৩) × ২ = ৫ × ২ = ১০; (৭ + ২) × ৭ = ৯ × ৭ = ৬৩; (৬ + ৫) × ৬ = ১১ × ৬ = ৬৬। অতএব: (৮ + ৪) × ৮ = ১২ × ৮ = ৯৬।",
    explanation_en: "Pattern: (A + B) * A. For 8 + 4: (8 + 4) * 8 = 12 * 8 = 96.",
    difficulty: "medium",
    question_type: "reasoning",
    source_title: "মানসিক দক্ষতা গাইড — খাইরুল ইসলাম",
    source_page_or_section: "গাণিতিক যুক্তি ও ধাঁধা"
  },
  {
    subject: "Mental Ability",
    topic: "সম্পর্ক ও যুক্তি",
    subtopic: "পারিবারিক সম্পর্ক",
    question_bn: "করিম হলো সালমার একমাত্র মামার একমাত্র ভাগ্নে। করিমের সাথে সালমার সম্পর্ক কী?",
    question_en: "Karim is the only nephew of Salma's only maternal uncle. What is Karim to Salma?",
    options: {
      A: "সালমার নিজের ভাই (বা করিম নিজেই সালমার ভাই)",
      B: "চাচাত ভাই",
      C: "মামা",
      D: "ভাগ্নে"
    },
    correct_option: "A",
    explanation_bn: "সালমার 'একমাত্র মামার একমাত্র ভাগ্নে' হলেন সালমার মায়ের একমাত্র ছেলে অর্থাৎ সালমার নিজের ভাই। সুতরাং করিম হলো সালমার সহোদর ভাই।",
    explanation_en: "Salma's only maternal uncle's only nephew is Salma's mother's only son, making Karim her own brother.",
    difficulty: "easy",
    question_type: "reasoning",
    source_title: "বিসিএস মানসিক দক্ষতা প্র্যাকটিস",
    source_page_or_section: "রক্তের সম্পর্ক"
  },
  {
    subject: "Mental Ability",
    topic: "শব্দ সাদৃশ্য (Analogy)",
    subtopic: "পেশা ও কর্মক্ষেত্র",
    question_bn: "'Doctor : Hospital :: Teacher : ?' — সঠিক উত্তর কোনটি?",
    question_en: "Complete the occupational analogy: 'Doctor : Hospital :: Teacher : ?'",
    options: {
      A: "School / Classroom",
      B: "Student",
      C: "Book",
      D: "Degree"
    },
    correct_option: "A",
    explanation_bn: "ডাক্তারের পেশাগত কাজের প্রধান কর্মক্ষেত্র হলো হাসপাতাল (Hospital)। একইভাবে শিক্ষকের প্রধান পেশাগত কর্মক্ষেত্র হলো বিদ্যালয় (School বা শিক্ষা প্রতিষ্ঠান)।",
    explanation_en: "A Doctor works professionally in a Hospital; analogously, a Teacher practices in a School.",
    difficulty: "easy",
    question_type: "reasoning",
    source_title: "Verbal Reasoning — Analogy Bank",
    source_page_or_section: "Worker and Workplace"
  },
  {
    subject: "Mental Ability",
    topic: "শ্রেণিবিভাগ (Odd One Out)",
    subtopic: "সংখ্যার বৈশিষ্ট্যগত অমিল",
    question_bn: "নিচের কোন সংখ্যাটি এই গ্রুপের অন্য সংখ্যাগুলো থেকে ভিন্ন? (Odd One Out)",
    question_en: "Which of the following numbers does not belong to the group? 17, 23, 29, 33, 37",
    options: {
      A: "33",
      B: "17",
      C: "23",
      D: "37"
    },
    correct_option: "A",
    explanation_bn: "১৭, ২৩, ২৯ এবং ৩৭ হলো মৌলিক সংখ্যা (Prime numbers)। কিন্তু ৩৩ হলো যৌগিক সংখ্যা (Composite number — ৩ × ১১ = ৩৩)। তাই ৩৩ সংখ্যাটি বেমানান।",
    explanation_en: "17, 23, 29, and 37 are prime numbers, whereas 33 is composite (3 x 11), making it the odd one out.",
    difficulty: "easy",
    question_type: "reasoning",
    source_title: "General Mental Ability Guide",
    source_page_or_section: "Number Classification"
  },
  {
    subject: "Mental Ability",
    topic: "দিক নির্ণয়",
    subtopic: "সূর্যোদয় ও ছায়ার দিক",
    question_bn: "সকালবেলায় সূর্যোদয়ের পর হাসান একটি খুঁটির দিকে মুখ করে দাঁড়িয়ে দেখল খুঁটির ছায়া ঠিক তার বাম দিকে পড়েছে। হাসান কোন দিকে মুখ করে দাঁড়িয়ে ছিল?",
    question_en: "One morning after sunrise, Hasan stood facing a post and noticed that its shadow fell exactly to his left. Which direction was Hasan facing?",
    options: {
      A: "উত্তর দিকে (North)",
      B: "দক্ষিণ দিকে (South)",
      C: "পূর্ব দিকে",
      D: "পশ্চিম দিকে"
    },
    correct_option: "A",
    explanation_bn: "সকালে সূর্য পূর্বে থাকে, তাই যেকোনো বস্তুর ছায়া সর্বদাই পশ্চিম দিকে পড়ে। খুঁটির ছায়া হাসানের বাম দিকে পড়েছে, অর্থাৎ হাসানের বাম হাত পশ্চিম দিকে নির্দেশ করছে। বাম হাত পশ্চিম দিকে এবং ডান হাত পূর্ব দিকে থাকলে মানুষের মুখ অবশ্যই উত্তর দিকে (North) থাকবে।",
    explanation_en: "Morning shadows fall due West. If West is to Hasan's left, he must be facing North.",
    difficulty: "medium",
    question_type: "reasoning",
    source_title: "বিসিএস মানসিক দক্ষতা — মো. জহিরুল ইসলাম",
    source_page_or_section: "দিক ও সূর্য সংক্রান্ত সমস্যা"
  },
  {
    subject: "Mental Ability",
    topic: "জ্যামিতিক চিত্র গণনা",
    subtopic: "ত্রিভুজ গণনা",
    question_bn: "একটি চতুর্ভুজের কর্ণ দুটি পরস্পরকে ছেদ করলে ভেতরের মোট কয়টি ত্রিভুজ তৈরি হয়?",
    question_en: "How many distinct triangles are formed inside a quadrilateral when its two diagonals intersect?",
    options: {
      A: "8টি ত্রিভুজ",
      B: "4টি",
      C: "6টি",
      D: "10টি"
    },
    correct_option: "A",
    explanation_bn: "কর্ণ দুটি ছেদ করলে ৪টি ছোট একক ত্রিভুজ তৈরি হয় এবং সন্নিহিত দুটি করে ছোট ত্রিভুজ মিলিয়ে আরও ৪টি বড় ত্রিভুজ (প্রতিটি কর্ণের দুই পাশে দুটি করে) গঠিত হয়। মোট ত্রিভুজ = ৪ + ৪ = ৮টি। সূত্র: n × ২ = ৪ × ২ = ৮টি।",
    explanation_en: "An intersecting diagonal structure yields 4 small single triangles plus 4 combined larger triangles, totaling 8 triangles.",
    difficulty: "easy",
    question_type: "reasoning",
    source_title: "নন-ভার্বাল জ্যামিতিক রিজনিং",
    source_page_or_section: "চিত্রের ত্রিভুজ গণনা কৌশল"
  },
  {
    subject: "Mental Ability",
    topic: "যুক্তি ও সিদ্ধান্ত",
    subtopic: "যৌক্তিক সিদ্ধান্ত গ্রহণ",
    question_bn: "বিবৃতি ১: কিছু শিক্ষক লেখক। বিবৃতি ২: সকল লেখক চিন্তাশীল। সিদ্ধান্ত: নিচের কোনটি নিশ্চিতভাবে সঠিক?",
    question_en: "Statements: Some teachers are writers. All writers are thinkers. Conclusion: Which is definitely true?",
    options: {
      A: "কিছু শিক্ষক অবশ্যই চিন্তাশীল",
      B: "সকল শিক্ষকই চিন্তাশীল",
      C: "কোনো শিক্ষক চিন্তাশীল নন",
      D: "সকল চিন্তাশীল ব্যক্তিই শিক্ষক"
    },
    correct_option: "A",
    explanation_bn: "যে শিক্ষকরা লেখক, তাঁরা সকলেই চিন্তাশীল শ্রেণীর অন্তর্ভুক্ত (যেহেতু সকল লেখকই চিন্তাশীল)। সুতরাং কিছু শিক্ষক অবশ্যই চিন্তাশীল (Some teachers are thinkers)। এটি একটি নিশ্চিত ও বৈধ সিদ্ধান্ত।",
    explanation_en: "Since the subset of teachers who write falls entirely within thinkers, 'some teachers are thinkers' is undeniably valid.",
    difficulty: "easy",
    question_type: "reasoning",
    source_title: "A Modern Approach to Verbal Reasoning — R. S. Aggarwal",
    source_page_or_section: "Categorical Syllogism"
  }
];
