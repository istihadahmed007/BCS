export const mathQuestions = [
  {
    subject: "Mathematics",
    topic: "পাটিগণিত — সময় ও কাজ",
    subtopic: "কাজের গতি ও সম্মিলিত সময়",
    question_bn: "ক একটি কাজ ১০ দিনে এবং খ সেই কাজটি ১৫ দিনে সম্পন্ন করতে পারে। তারা একত্রে কাজটি শুরু করলে কত দিনে কাজটি শেষ হবে?",
    question_en: "A can complete a piece of work in 10 days and B can finish it in 15 days. In how many days can they finish it together?",
    options: {
      A: "৫ দিনে",
      B: "৬ দিনে",
      C: "৭ দিনে",
      D: "৮ দিনে"
    },
    correct_option: "B",
    explanation_bn: "ক ১ দিনে করে ১/১০ অংশ এবং খ ১ দিনে করে ১/১৫ অংশ। তারা একত্রে ১ দিনে করে = ১/১০ + ১/১৫ = (৩ + ২) / ৩০ = ৫/৩০ = ১/৬ অংশ। অতএব সম্পূর্ণ কাজটি একত্রে সম্পন্ন করতে সময় লাগবে ৬ দিন। সূত্র: (xy) / (x + y) = (১০ × ১৫) / (১০ + ১৫) = ১৫০ / ২৫ = ৬ দিন।",
    explanation_en: "Together in 1 day they do 1/10 + 1/15 = 1/6 of the work. Hence, they finish the work in 6 days.",
    difficulty: "easy",
    question_type: "calculation",
    source_title: "এনসিটিবি অষ্টম শ্রেণি গণিত",
    source_page_or_section: "ঐকিক নিয়ম — সময় ও কাজ"
  },
  {
    subject: "Mathematics",
    topic: "পাটিগণিত — নল ও চৌবাচ্চা",
    subtopic: "পাইপ ও প্রবাহের হার",
    question_bn: "একটি নল দ্বারা একটি খালি চৌবাচ্চা ২০ মিনিটে পূর্ণ হয় এবং অপর একটি নির্গমন নল দিয়ে ৩০ মিনিটে তা খালি হয়। দুটি নল একসাথে খুলে দিলে চৌবাচ্চাটি কত মিনিটে পূর্ণ হবে?",
    question_en: "Pipe A fills a cistern in 20 minutes while Pipe B empties it in 30 minutes. If both pipes are opened simultaneously, in how many minutes will the cistern be filled?",
    options: {
      A: "৫০ মিনিটে",
      B: "৬০ মিনিটে",
      C: "৪০ মিনিটে",
      D: "২৫ মিনিটে"
    },
    correct_option: "B",
    explanation_bn: "১ মিনিটে ভর্তি হয় = ১/২০ অংশ এবং ১ মিনিটে খালি হয় = ১/৩০ অংশ। দুটি নল খোলা থাকলে ১ মিনিটে নিট পূর্ণ হয় = ১/২০ - ১/৩০ = (৩ - ২) / ৬০ = ১/৬০ অংশ। অতএব সম্পূর্ণ চৌবাচ্চাটি পূর্ণ হতে সময় লাগবে ৬০ মিনিট (বা ১ ঘণ্টা)। সূত্র: (xy) / (y - x) = (২০ × ৩০) / (৩০ - ২০) = ৬০০ / ১০ = ৬০ মিনিট।",
    explanation_en: "Net rate per minute = 1/20 - 1/30 = 1/60. The cistern fills completely in 60 minutes.",
    difficulty: "easy",
    question_type: "calculation",
    source_title: "Quantitative Aptitude — R. S. Aggarwal",
    source_page_or_section: "Pipes and Cisterns"
  },
  {
    subject: "Mathematics",
    topic: "পাটিগণিত — গতিবেগ ও দূরত্ব",
    subtopic: "ট্রেন ও প্ল্যাটফর্ম অতিক্রম",
    question_bn: "১২০ মিটার দীর্ঘ একটি ট্রেন ঘণ্টায় ৫৪ কিমি বেগে চলে একটি বৈদ্যুতিক খুঁটিকে কত সেকেন্ডে অতিক্রম করবে?",
    question_en: "A train 120 meters long travelling at a speed of 54 km/h will cross an electric telegraph post in how many seconds?",
    options: {
      A: "6 সেকেন্ডে",
      B: "8 সেকেন্ডে",
      C: "10 সেকেন্ডে",
      D: "12 সেকেন্ডে"
    },
    correct_option: "B",
    explanation_bn: "গতিবেগকে মিটার/সেকেন্ডে রূপান্তর করি: ৫৪ কিমি/ঘণ্টা = ৫৪ × (৫ / ১৮) = ৩ × ৫ = ১৫ মিটার/সেকেন্ড। একটি খুঁটি অতিক্রম করতে ট্রেনকে কেবল নিজের দৈর্ঘ্যের সমান দূরত্ব (১২০ মিটার) অতিক্রম করতে হয়। অতএব সময় = দূরত্ব / বেগ = ১২০ / ১৫ = ৮ সেকেন্ড।",
    explanation_en: "Speed = 54 * (5/18) = 15 m/s. Time to cross post = Length / Speed = 120 / 15 = 8 seconds.",
    difficulty: "easy",
    question_type: "calculation",
    source_title: "মাধ্যমিক সাধারণ গণিত — সময় ও দূরত্ব",
    source_page_or_section: "গতিবেগ ও ট্রেন সম্পর্কিত সমস্যা"
  },
  {
    subject: "Mathematics",
    topic: "পাটিগণিত — নৌকা ও স্রোত",
    subtopic: "অনুকূল ও প্রতিকূল বেগ",
    question_bn: "স্থির পানিতে একটি নৌকার গতিবেগ ৮ কিমি/ঘণ্টা এবং স্রোতের অনুকূলে গতিবেগ ১২ কিমি/ঘণ্টা হলে, স্রোতের প্রতিকূলে নৌকার গতিবেগ কত?",
    question_en: "The speed of a boat in still water is 8 km/h. If its downstream speed is 12 km/h, what is its upstream speed?",
    options: {
      A: "4 কিমি/ঘণ্টা",
      B: "6 কিমি/ঘণ্টা",
      C: "5 কিমি/ঘণ্টা",
      D: "3 কিমি/ঘণ্টা"
    },
    correct_option: "A",
    explanation_bn: "স্রোতের অনুকূলে বেগ = নৌকার বেগ + স্রোতের বেগ => ১২ = ৮ + স্রোতের বেগ => স্রোতের বেগ = ১২ - ৮ = ৪ কিমি/ঘণ্টা। অতএব স্রোতের প্রতিকূলে বেগ = নৌকার বেগ - স্রোতের বেগ = ৮ - ৪ = ৪ কিমি/ঘণ্টা।",
    explanation_en: "Stream speed = Downstream (12) - Boat speed (8) = 4 km/h. Upstream speed = Boat speed (8) - Stream speed (4) = 4 km/h.",
    difficulty: "easy",
    question_type: "calculation",
    source_title: "পাটিগণিত — এনসিটিবি",
    source_page_or_section: "নৌকা ও স্রোতের অংক"
  },
  {
    subject: "Mathematics",
    topic: "বীজগণিত — দ্বিঘাত সমীকরণ",
    subtopic: "নিশ্চায়ক ও মূলের প্রকৃতি",
    question_bn: "ax^2 + bx + c = 0 দ্বিঘাত সমীকরণের নিশ্চায়ক (Discriminant) D = b^2 - 4ac > 0 এবং একটি পূর্ণবর্গ সংখ্যা হলে মূলদ্বয়ের প্রকৃতি কেমন হবে?",
    question_en: "In a quadratic equation ax^2 + bx + c = 0, if the discriminant D = b^2 - 4ac > 0 and is a perfect square, the roots are:",
    options: {
      A: "বাস্তব, অসমান ও মূলদ (Real, Unequal, and Rational)",
      B: "বাস্তব, সমান ও মূলদ",
      C: "বাস্তব, অসমান ও অমূলদ",
      D: "অবাস্তব বা জটিল"
    },
    correct_option: "A",
    explanation_bn: "দ্বিঘাত সমীকরণের নিশ্চায়ক D = b^2 - 4ac: (১) D > ০ এবং পূর্ণবর্গ হলে মূলদ্বয় বাস্তব, অসমান ও মূলদ হয়; (২) D > ০ কিন্তু পূর্ণবর্গ না হলে বাস্তব, অসমান ও অমূলদ হয়; (৩) D = ০ হলে বাস্তব ও সমান হয়; (৪) D < ০ হলে মূলদ্বয় জটিল বা অবাস্তব হয়।",
    explanation_en: "When the discriminant is strictly positive and a perfect square, roots are real, distinct, and rational.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "উচ্চ মাধ্যমিক গণিত ১ম পত্র — এস ইউ আহাম্মদ",
    source_page_or_section: "দ্বিঘাত সমীকরণ ও নিশ্চায়ক"
  },
  {
    subject: "Mathematics",
    topic: "বীজগণিত — অসমতা",
    subtopic: "পরমমান অসমতা সমাধান",
    question_bn: "|2x - 3| < 7 অসমতাটির সমাধান সেট কোনটি?",
    question_en: "What is the solution set of the modulus inequality |2x - 3| < 7?",
    options: {
      A: "-2 < x < 5",
      B: "-5 < x < 2",
      C: "x > 5 অথবা x < -2",
      D: "-2 <= x <= 5"
    },
    correct_option: "A",
    explanation_bn: "|u| < a এর সূত্র অনুযায়ী: -a < u < a। সুতরাং: -7 < 2x - 3 < 7 => উভয়পক্ষে 3 যোগ করি: -7 + 3 < 2x < 7 + 3 => -4 < 2x < 10 => উভয়পক্ষকে 2 দিয়ে ভাগ করি: -2 < x < 5।",
    explanation_en: "|2x - 3| < 7 => -7 < 2x - 3 < 7 => -4 < 2x < 10 => -2 < x < 5.",
    difficulty: "medium",
    question_type: "calculation",
    source_title: "এনসিটিবি নবম-দশম উচ্চতর গণিত",
    source_page_or_section: "অসমতা ও পরমমান"
  },
  {
    subject: "Mathematics",
    topic: "বীজগণিত — উৎপাদকে বিশ্লেষণ",
    subtopic: "ঘন রাশির উৎপাদক",
    question_bn: "x^3 - 8-এর উৎপাদকে বিশ্লেষিত রূপ কোনটি?",
    question_en: "What is the correct factorization of the algebraic expression x^3 - 8?",
    options: {
      A: "(x - 2)(x^2 + 2x + 4)",
      B: "(x - 2)(x^2 - 2x + 4)",
      C: "(x + 2)(x^2 - 2x + 4)",
      D: "(x - 2)^3"
    },
    correct_option: "A",
    explanation_bn: "আমরা জানি: a^3 - b^3 = (a - b)(a^2 + ab + b^2)। এখানে x^3 - 8 = x^3 - (2)^3 = (x - 2)(x^2 + 2x + 2^2) = (x - 2)(x^2 + 2x + 4)।",
    explanation_en: "Using a^3 - b^3 = (a - b)(a^2 + ab + b^2): x^3 - 8 = (x - 2)(x^2 + 2x + 4).",
    difficulty: "easy",
    question_type: "calculation",
    source_title: "এনসিটিবি সাধারণ গণিত",
    source_page_or_section: "উৎপাদকে বিশ্লেষণ"
  },
  {
    subject: "Mathematics",
    topic: "সূচক ও সমীকরণ",
    subtopic: "সূচকীয় সমীকরণ সমাধান",
    question_bn: "3^(2x - 1) = 81 হলে x-এর মান কত?",
    question_en: "If 3^(2x - 1) = 81, find the value of x.",
    options: {
      A: "2.5",
      B: "3",
      C: "2",
      D: "3.5"
    },
    correct_option: "A",
    explanation_bn: "81 = 3^4। অতএব 3^(2x - 1) = 3^4 => ভিত্তি সমান হওয়ায় 2x - 1 = 4 => 2x = 5 => x = 5/2 = 2.5।",
    explanation_en: "3^(2x - 1) = 3^4 => 2x - 1 = 4 => 2x = 5 => x = 2.5.",
    difficulty: "easy",
    question_type: "calculation",
    source_title: "নবম-দশম সাধারণ গণিত",
    source_page_or_section: "সূচকীয় সমীকরণ"
  },
  {
    subject: "Mathematics",
    topic: "লগারিদম",
    subtopic: "লগারিদমের গুণ ও ভাগ ধর্ম",
    question_bn: "log_10 (2) = 0.3010 হলে, log_10 (5)-এর মান কত?",
    question_en: "Given log_10 (2) = 0.3010, what is the value of log_10 (5)?",
    options: {
      A: "0.6990",
      B: "0.4990",
      C: "0.6020",
      D: "0.7500"
    },
    correct_option: "A",
    explanation_bn: "log_10 (5) = log_10 (10 / 2) = log_10 (10) - log_10 (2) = 1 - 0.3010 = 0.6990।",
    explanation_en: "log_10 (5) = log_10 (10/2) = log_10(10) - log_10(2) = 1 - 0.3010 = 0.6990.",
    difficulty: "medium",
    question_type: "calculation",
    source_title: "এনসিটিবি উচ্চতর গণিত",
    source_page_or_section: "লগারিদমের নিয়মাবলী"
  },
  {
    subject: "Mathematics",
    topic: "সমান্তর ধারা",
    subtopic: "ধারার পদসংখ্যা নির্ণয়",
    question_bn: "৪ + ৯ + ১৪ + ১৯ + ...... + ৯৯ ধারাটিতে মোট কতটি পদ রয়েছে?",
    question_en: "How many terms are there in the arithmetic progression 4 + 9 + 14 + 19 + ... + 99?",
    options: {
      A: "18",
      B: "20",
      C: "21",
      D: "22"
    },
    correct_option: "B",
    explanation_bn: "প্রথম পদ a = ৪, সাধারণ অন্তর d = ৯ - ৪ = ৫, শেষ পদ (n-তম পদ) = ৯৯। সূত্র: a + (n - 1)d = ৯৯ => ৪ + (n - 1)৫ = ৯৯ => ৫(n - 1) = ৯৫ => n - 1 = ১৯ => n = ২০টি।",
    explanation_en: "n-th term = a + (n-1)d => 4 + 5(n-1) = 99 => 5(n-1) = 95 => n = 20.",
    difficulty: "easy",
    question_type: "calculation",
    source_title: "এনসিটিবি নবম-দশম গণিত",
    source_page_or_section: "সমান্তর ধারা"
  },
  {
    subject: "Mathematics",
    topic: "জ্যামিতি — বৃত্ত",
    subtopic: "অর্ধবৃত্তস্থ কোণ",
    question_bn: "বৃত্তের কোনো ব্যাসের ওপর অঙ্কিত 'অর্ধবৃত্তস্থ কোণ' (Angle in a Semicircle)-এর মান সর্বদা কত ডিগ্রি?",
    question_en: "What is the invariable degree measure of an angle inscribed in a semicircle?",
    options: {
      A: "90° (এক সমকোণ)",
      B: "60°",
      C: "180°",
      D: "45°"
    },
    correct_option: "A",
    explanation_bn: "জ্যামিতির মৌলিক উপপাদ্য অনুসারে অর্ধবৃত্তস্থ কোণ এক সমকোণ বা ৯০° (Angle in a semicircle is a right angle)। কারণ বৃত্তস্থ কোণ কেন্দ্রস্থ কোণের অর্ধেক, আর ব্যাস কেন্দ্রে ১৮০° সরলকোণ তৈরি করে, যার অর্ধেক হলো ৯০°।",
    explanation_en: "By Thales's theorem, an inscribed angle subtended by a diameter forms a right angle of 90°.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "এনসিটিবি নবম-দশম সাধারণ গণিত",
    source_page_or_section: "বৃত্ত সংক্রান্ত উপপাদ্য"
  },
  {
    subject: "Mathematics",
    topic: "জ্যামিতি — চতুর্ভুজ ও রম্বস",
    subtopic: "রম্বসের ক্ষেত্রফল",
    question_bn: "একটি রম্বসের দুটি কর্ণের দৈর্ঘ্য যথাক্রমে ১২ সেমি এবং ১৬ সেমি হলে, রম্বসটির ক্ষেত্রফল কত বর্গ সেমি?",
    question_en: "If the two diagonals of a rhombus measure 12 cm and 16 cm respectively, what is its area?",
    options: {
      A: "96 বর্গ সেমি",
      B: "192 বর্গ সেমি",
      C: "48 বর্গ সেমি",
      D: "120 বর্গ সেমি"
    },
    correct_option: "A",
    explanation_bn: "রম্বসের ক্ষেত্রফলের সূত্র: ১/২ × (কর্ণদ্বয়ের গুণফল) = ১/২ × d1 × d2 = ১/২ × ১২ × ১৬ = ১২ × ৮ = ৯৬ বর্গ সেমি।",
    explanation_en: "Area of a rhombus = 1/2 * d1 * d2 = 0.5 * 12 * 16 = 96 sq cm.",
    difficulty: "easy",
    question_type: "calculation",
    source_title: "মাধ্যমিক পরিমিতি — এনসিটিবি",
    source_page_or_section: "চতুর্ভুজের ক্ষেত্রফল"
  },
  {
    subject: "Mathematics",
    topic: "জ্যামিতি — ট্রাপিজিয়াম",
    subtopic: "ট্রাপিজিয়ামের ক্ষেত্রফল",
    question_bn: "একটি ট্রাপিজিয়ামের সমান্তরাল বাহু দুটির দৈর্ঘ্য ১০ সেমি ও ১৪ সেমি এবং তাদের মধ্যবর্তী লম্ব দূরত্ব ৮ সেমি হলে, ট্রাপিজিয়ামটির ক্ষেত্রফল কত?",
    question_en: "Find the area of a trapezium whose parallel sides are 10 cm and 14 cm, and whose perpendicular height is 8 cm:",
    options: {
      A: "96 বর্গ সেমি",
      B: "192 বর্গ সেমি",
      C: "80 বর্গ সেমি",
      D: "112 বর্গ সেমি"
    },
    correct_option: "A",
    explanation_bn: "ট্রাপিজিয়ামের ক্ষেত্রফল = ১/২ × (সমান্তরাল বাহুদ্বয়ের যোগফল) × উচ্চতা = ১/২ × (১০ + ১৪) × ৮ = ১/২ × ২৪ × ৮ = ১২ × ৮ = ৯৬ বর্গ সেমি।",
    explanation_en: "Area of trapezium = 0.5 * (a + b) * h = 0.5 * (10 + 14) * 8 = 12 * 8 = 96 sq cm.",
    difficulty: "easy",
    question_type: "calculation",
    source_title: "এনসিটিবি নবম-দশম পরিমিতি",
    source_page_or_section: "ট্রাপিজিয়ামের ক্ষেত্রফল নির্ণয়"
  },
  {
    subject: "Mathematics",
    topic: "পরিমিতি — ঘনবস্তু ও বেলন",
    subtopic: "সিলিন্ডারের আয়তন",
    question_bn: "একটি সমবৃত্তভূমিক বেলন বা সিলিন্ডারের ভূমির ব্যাসার্ধ ৭ সেমি এবং উচ্চতা ১০ সেমি হলে, এর আয়তন কত? (π = 22/7 ধরি)",
    question_en: "What is the volume of a right circular cylinder having a base radius of 7 cm and a height of 10 cm? (take pi = 22/7)",
    options: {
      A: "1540 ঘন সেমি",
      B: "770 ঘন সেমি",
      C: "3080 ঘন সেমি",
      D: "440 ঘন সেমি"
    },
    correct_option: "A",
    explanation_bn: "সিলিন্ডারের আয়তনের সূত্র: V = π r^2 h। মান বসিয়ে: V = (২২/৭) × (৭)^২ × ১০ = (২২/৭) × ৪৯ × ১০ = ২২ × ৭ × ১০ = ১৫৪ × ১০ = ১৫৪০ ঘন সেমি।",
    explanation_en: "Volume = pi * r^2 * h = (22/7) * 7^2 * 10 = 154 * 10 = 1540 cubic cm.",
    difficulty: "easy",
    question_type: "calculation",
    source_title: "উচ্চতর পরিমিতি — এনসিটিবি",
    source_page_or_section: "বেলন বা সিলিন্ডারের ক্ষেত্রফল ও আয়তন"
  },
  {
    subject: "Mathematics",
    topic: "ত্রিকোণমিতি",
    subtopic: "মৌলিক ত্রিকোণমিতিক অভেদ",
    question_bn: "যেকোনো সূক্ষ্মকোণ θ-এর জন্য 'sec^2 θ - tan^2 θ'-এর মান কত?",
    question_en: "For any angle θ, what is the value of the identity sec^2 θ - tan^2 θ?",
    options: {
      A: "1",
      B: "0",
      C: "-1",
      D: "2"
    },
    correct_option: "A",
    explanation_bn: "মৌলিক ত্রিকোণমিতিক অভেদ তিনটি: (১) sin^2 θ + cos^2 θ = 1; (২) sec^2 θ - tan^2 θ = 1; (৩) cosec^2 θ - cot^2 θ = 1। সুতরাং সঠিক মান ১।",
    explanation_en: "Standard trigonometric identity: sec^2 θ - tan^2 θ = 1.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "এনসিটিবি মাধ্যমিক সাধারণ গণিত",
    source_page_or_section: "ত্রিকোণমিতিক অভেদাবলী"
  },
  {
    subject: "Mathematics",
    topic: "বিন্যাস (Permutation)",
    subtopic: "শব্দের বর্ণ সাজানোর বিন্যাস সংখ্যা",
    question_bn: "'LEADER' শব্দটির সবগুলো বর্ণকে একত্রে নিয়ে কত প্রকারে বিন্যাস বা সাজানো যায়?",
    question_en: "In how many distinct ways can all the letters of the word 'LEADER' be arranged?",
    options: {
      A: "360 প্রকারে",
      B: "720 প্রকারে",
      C: "180 প্রকারে",
      D: "120 প্রকারে"
    },
    correct_option: "A",
    explanation_bn: "'LEADER' শব্দটিতে মোট বর্ণ রয়েছে ৬টি, যার মধ্যে 'E' বর্ণটি রয়েছে ২ বার (বাকি বর্ণগুলো ১ বার করে)। অতএব মোট বিন্যাস সংখ্যা = ৬! / ২! = ৭২০ / ২ = ৩৬০ প্রকারে।",
    explanation_en: "Total letters = 6, with 2 E's. Permutations = 6! / 2! = 720 / 2 = 360 ways.",
    difficulty: "easy",
    question_type: "calculation",
    source_title: "উচ্চ মাধ্যমিক গণিত ১ম পত্র — বিন্যাস",
    source_page_or_section: "পুনরাবৃত্তিমূলক বর্ণের বিন্যাস"
  },
  {
    subject: "Mathematics",
    topic: "সমাবেশ (Combination)",
    subtopic: "কর্ণ সংখ্যা নির্ণয়",
    question_bn: "একটি সুষম ষড়ভুজের (Regular Hexagon) মোট কর্ণের (Diagonals) সংখ্যা কত?",
    question_en: "How many diagonals does a regular hexagon possess?",
    options: {
      A: "9টি",
      B: "6টি",
      C: "12টি",
      D: "15টি"
    },
    correct_option: "A",
    explanation_bn: "n-সংখ্যক বাহুবিশিষ্ট বহুভুজের কর্ণের সংখ্যা নির্ণয়ের সূত্র: n(n - 3) / 2 বা nC2 - n। ষড়ভুজের ক্ষেত্রে n = ৬। কর্ণ সংখ্যা = ৬(৬ - ৩) / ২ = ৬(৩) / ২ = ১৮ / ২ = ৯টি।",
    explanation_en: "Number of diagonals in an n-sided polygon = n(n - 3) / 2. For n = 6, diagonals = 6(3)/2 = 9.",
    difficulty: "medium",
    question_type: "calculation",
    source_title: "উচ্চ মাধ্যমিক গণিত — বিন্যাস ও সমাবেশ প্রয়োগ",
    source_page_or_section: "বহুভুজের কর্ণ সংখ্যা"
  },
  {
    subject: "Mathematics",
    topic: "সম্ভাবনা (Probability)",
    subtopic: "তাসের সম্ভাব্যতা",
    question_bn: "৫২টি তাসের একটি প্যাকেট থেকে দৈবচয়ন পদ্ধতিতে ১টি তাস তুললে সেটি 'টেক্কা' (Ace) হওয়ার সম্ভাবনা কত?",
    question_en: "If one card is drawn at random from a standard 52-card deck, what is the probability that it is an Ace?",
    options: {
      A: "1/13",
      B: "1/52",
      C: "1/4",
      D: "4/13"
    },
    correct_option: "A",
    explanation_bn: "৫২ তাসের একটি সম্পূর্ণ প্যাকেটে ৪টি ভিন্ন রঙের সুটের প্রতিটিতে ১টি করে মোট ৪টি টেক্কা (Ace) থাকে। অতএব ১টি তাস টেক্কা হওয়ার সম্ভাবনা = অনুকূল ফলাফল / মোট ফলাফল = ৪ / ৫২ = ১ / ১৩।",
    explanation_en: "Number of Aces = 4, Total cards = 52. Probability = 4/52 = 1/13.",
    difficulty: "easy",
    question_type: "calculation",
    source_title: "উচ্চ মাধ্যমিক পরিসংখ্যান ১ম পত্র",
    source_page_or_section: "ক্লাসিক্যাল সম্ভাবনা ও তাসের হিসাব"
  },
  {
    subject: "Mathematics",
    topic: "পরিসংখ্যান",
    subtopic: "মধ্যমা (Median) নির্ণয়",
    question_bn: "৮, ৩, ৭, ৫, ১২, ৯, ২ উপাত্তগুলোর মধ্যমা (Median) কত?",
    question_en: "What is the median of the data set: 8, 3, 7, 5, 12, 9, 2?",
    options: {
      A: "7",
      B: "5",
      C: "8",
      D: "6"
    },
    correct_option: "A",
    explanation_bn: "প্রথমে উপাত্তগুলোকে মানের ঊর্ধ্বক্রমে সাজাই: ২, ৩, ৫, ৭, ৮, ৯, ১২। এখানে মোট পদসংখ্যা n = ৭ (বিজোড় সংখ্যা)। মধ্যমা পদ = (n + ১)/২ = (৭ + ১)/২ = ৪র্থ পদ। ৪র্থ পদের মান হলো ৭। অতএব মধ্যমা = ৭।",
    explanation_en: "Arranging in ascending order: 2, 3, 5, 7, 8, 9, 12. The middle (4th) value is 7.",
    difficulty: "easy",
    question_type: "calculation",
    source_title: "এনসিটিবি নবম-দশম সাধারণ গণিত",
    source_page_or_section: "পরিসংখ্যান: মধ্যমা"
  },
  {
    subject: "Mathematics",
    topic: "পরিসংখ্যান",
    subtopic: "প্রচুরক (Mode) নির্ণয়",
    question_bn: "৪, ৬, ৭, ৯, ৬, ৮, ৫, ৬ উপাত্ত সারির প্রচুরক (Mode) কত?",
    question_en: "What is the mode of the numerical data set: 4, 6, 7, 9, 6, 8, 5, 6?",
    options: {
      A: "6",
      B: "7",
      C: "8",
      D: "প্রচুরক নেই"
    },
    correct_option: "A",
    explanation_bn: "প্রচুরক হলো কোনো উপাত্ত সারিতে সর্বাধিক সংখ্যক বার উপস্থিত সংখ্যাটি। এখানে ৬ সংখ্যাটি সর্বোচ্চ ৩ বার এসেছে (অন্যান্য সংখ্যা ১ বার করে)। তাই প্রচুরক = ৬।",
    explanation_en: "The mode is the most frequently occurring value in the set. 6 appears 3 times, hence Mode = 6.",
    difficulty: "easy",
    question_type: "calculation",
    source_title: "পরিসংখ্যান — নবম-দশম শ্রেণি",
    source_page_or_section: "প্রচুরক নির্ণয়"
  }
];
