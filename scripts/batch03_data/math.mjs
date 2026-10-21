export const mathQuestions = [
  {
    subject: "Mathematics",
    topic: "বাস্তব সংখ্যা ও মৌলিক সংখ্যা",
    subtopic: "মৌলিক সংখ্যার গণনা",
    question_bn: "৫০ থেকে ৮০-এর মধ্যে মোট কয়টি মৌলিক সংখ্যা (Prime Numbers) বিদ্যমান?",
    question_en: "How many prime numbers exist between 50 and 80?",
    options: {
      A: "৫টি",
      B: "৬টি",
      C: "৭টি",
      D: "৮টি"
    },
    correct_option: "C",
    explanation_bn: "৫০ থেকে ৮০-এর মধ্যবর্তী মৌলিক সংখ্যাগুলো হলো: ৫৩, ৫৯, ৬১, ৬৭, ৭১, ৭৩ এবং ৭৯। মোট মৌলিক সংখ্যা ৭টি।",
    explanation_en: "The prime numbers strictly between 50 and 80 are 53, 59, 61, 67, 71, 73, and 79, making 7 primes in total.",
    difficulty: "medium",
    question_type: "calculation",
    source_title: "এনসিটিবি নবম-দশম সাধারণ গণিত",
    source_page_or_section: "বাস্তব সংখ্যা ও মৌলিক সংখ্যা"
  },
  {
    subject: "Mathematics",
    topic: "পাটিগণিত — লসাগু ও গসাগু",
    subtopic: "দুটি সংখ্যার গুণফল সূত্র",
    question_bn: "দুটি সংখ্যার গ.সা.গু. ১১ এবং ল.সা.গু. ৭৭০০। একটি সংখ্যা ২৭৫ হলে, অপর সংখ্যাটি কত?",
    question_en: "The GCD of two numbers is 11 and their LCM is 7700. If one number is 275, what is the other number?",
    options: {
      A: "৩০৮",
      B: "৩১৮",
      C: "২৮০",
      D: "৩৫০"
    },
    correct_option: "A",
    explanation_bn: "আমরা জানি: দুটি সংখ্যার গুণফল = গ.সা.গু. × ল.সা.গু.। সুতরাং, অপর সংখ্যা = (১১ × ৭৭০০) / ২৭৫ = ৮৪,৭০০ / ২৭৫ = ৩০৮।",
    explanation_en: "Product of two numbers = GCD x LCM. Therefore, the other number = (11 x 7700) / 275 = 308.",
    difficulty: "easy",
    question_type: "calculation",
    source_title: "পাটিগণিত — ড. সুব্রত কুমার দেবনাথ",
    source_page_or_section: "লসাগু ও গসাগুর সম্পর্ক"
  },
  {
    subject: "Mathematics",
    topic: "শতকরা ও লাভ-ক্ষতি",
    subtopic: "লাভ-ক্ষতির শতকরা হার",
    question_bn: "একটি দ্রব্য ১২০ টাকায় ক্রয় করে ১৪৪ টাকায় বিক্রয় করলে শতকরা কত লাভ হবে?",
    question_en: "If an item is purchased for 120 Taka and sold for 144 Taka, what is the percentage profit?",
    options: {
      A: "১৫%",
      B: "২০%",
      C: "২৪%",
      D: "২৫%"
    },
    correct_option: "B",
    explanation_bn: "লাভ = বিক্রয়মূল্য - ক্রয়মূল্য = ১৪৪ - ১২০ = ২৪ টাকা। ক্রয়মূল্য ১২০ টাকায় লাভ ২৪ টাকা, অতএব শতকরা লাভ = (২৪ / ১২০) × ১০০% = ২০%।",
    explanation_en: "Profit = 144 - 120 = 24. Percentage profit = (24 / 120) x 100% = 20%.",
    difficulty: "easy",
    question_type: "calculation",
    source_title: "মাধ্যমিক গণিত — এনসিটিবি",
    source_page_or_section: "লাভ ও ক্ষতি অধ্যায়"
  },
  {
    subject: "Mathematics",
    topic: "শতকরা ও ছাড়",
    subtopic: "ধারাবাহিক মূল্যহ্রাস (Successive Discounts)",
    question_bn: "২০% এবং ১০%-এর দুটি ক্রমিক বা ধারাবাহিক ছাড়ের সমতুল্য একক ছাড় (Single Equivalent Discount) কত?",
    question_en: "What is the single equivalent discount corresponding to two successive discounts of 20% and 10%?",
    options: {
      A: "৩০%",
      B: "২৮%",
      C: "২৬%",
      D: "২২%"
    },
    correct_option: "B",
    explanation_bn: "সমতুল্য একক ছাড় = a + b - (ab / 100) = ২০ + ১০ - (২০ × ১০ / ১০০) = ৩০ - ২ = ২৮%। বিকল্পভাবে: ১০০ টাকার দ্রব্যে ২০% ছাড়ে মূল্য ৮০ টাকা, পরে ৮০ টাকায় ১০% (৮ টাকা) ছাড় দিলে চূড়ান্ত মূল্য ৭২ টাকা, অর্থাৎ মোট ছাড় ২৮ টাকা বা ২৮%।",
    explanation_en: "Equivalent single discount = 20 + 10 - (20 x 10)/100 = 30 - 2 = 28%.",
    difficulty: "medium",
    question_type: "calculation",
    source_title: "Quantitative Aptitude for Competitive Examinations — R. S. Aggarwal",
    source_page_or_section: "Profit, Loss and Discount"
  },
  {
    subject: "Mathematics",
    topic: "মুনাফা — সরল ও চক্রবৃদ্ধি",
    subtopic: "সরল মুনাফা সূত্র",
    question_bn: "বার্ষিক ৮% সরল সুদে কত বছরে ৫০০ টাকার সুদ ১২০ টাকা হবে?",
    question_en: "At an 8% annual simple interest rate, in how many years will the interest on 500 Taka amount to 120 Taka?",
    options: {
      A: "২.৫ বছর",
      B: "৩ বছর",
      C: "৩.৫ বছর",
      D: "৪ বছর"
    },
    correct_option: "B",
    explanation_bn: "সরল মুনাফার সূত্র: I = Pnr। এখানে আসল P = ৫০০ টাকা, মুনাফার হার r = ৮% = ০.০৮, মুনাফা I = ১২০ টাকা। সময় n = I / (Pr) = ১২০ / (৫০০ × ০.০৮) = ১২০ / ৪০ = ৩ বছর।",
    explanation_en: "Using I = Pnr: n = 120 / (500 x 0.08) = 120 / 40 = 3 years.",
    difficulty: "easy",
    question_type: "calculation",
    source_title: "এনসিটিবি অষ্টম শ্রেণি গণিত",
    source_page_or_section: "মুনাফা অধ্যায়"
  },
  {
    subject: "Mathematics",
    topic: "অনুপাত ও সমানুপাত",
    subtopic: "মিশ্র অনুপাত ও ধারাবাহিক অনুপাত",
    question_bn: "যদি A : B = 2 : 3 এবং B : C = 4 : 5 হয়, তবে A : B : C কত?",
    question_en: "If A : B = 2 : 3 and B : C = 4 : 5, what is the combined ratio A : B : C?",
    options: {
      A: "8 : 12 : 15",
      B: "6 : 12 : 15",
      C: "8 : 10 : 15",
      D: "2 : 4 : 5"
    },
    correct_option: "A",
    explanation_bn: "B-এর মান সমান করতে ১ম অনুপাতকে ৪ দিয়ে এবং ২য় অনুপাতকে ৩ দিয়ে গুণ করি: A : B = (২×৪) : (৩×৪) = ৮ : ১২। B : C = (৪×৩) : (৫×৩) = ১২ : ১৫। সুতরাং A : B : C = ৮ : ১২ : ১৫।",
    explanation_en: "Normalizing B: A:B = 8:12 and B:C = 12:15, yielding A:B:C = 8:12:15.",
    difficulty: "easy",
    question_type: "calculation",
    source_title: "মাধ্যমিক সাধারণ গণিত — নবম-দশম",
    source_page_or_section: "অনুপাত ও সমানুপাত"
  },
  {
    subject: "Mathematics",
    topic: "বীজগণিত — সূত্রাবলী",
    subtopic: "মান নির্ণয়",
    question_bn: "যদি x - 1/x = 3 হয়, তবে x^2 + 1/x^2-এর মান কত?",
    question_en: "If x - 1/x = 3, what is the value of x^2 + 1/x^2?",
    options: {
      A: "7",
      B: "9",
      C: "11",
      D: "13"
    },
    correct_option: "C",
    explanation_bn: "আমরা জানি: x^2 + 1/x^2 = (x - 1/x)^2 + 2 = (3)^2 + 2 = 9 + 2 = 11।",
    explanation_en: "x^2 + 1/x^2 = (x - 1/x)^2 + 2 = 3^2 + 2 = 9 + 2 = 11.",
    difficulty: "easy",
    question_type: "calculation",
    source_title: "এনসিটিবি নবম-দশম শ্রেণি সাধারণ গণিত",
    source_page_or_section: "বীজগাণিতিক রাশি"
  },
  {
    subject: "Mathematics",
    topic: "বীজগণিত — ঘন সংবলিত সূত্র",
    subtopic: "মান নির্ণয়",
    question_bn: "যদি a + b = 5 এবং ab = 6 হয়, তবে a^3 + b^3-এর মান কত?",
    question_en: "If a + b = 5 and ab = 6, what is the value of a^3 + b^3?",
    options: {
      A: "35",
      B: "45",
      C: "55",
      D: "65"
    },
    correct_option: "A",
    explanation_bn: "a^3 + b^3 = (a + b)^3 - 3ab(a + b) = (5)^3 - 3(6)(5) = 125 - 90 = 35।",
    explanation_en: "a^3 + b^3 = (a + b)^3 - 3ab(a + b) = 5^3 - 3(6)(5) = 125 - 90 = 35.",
    difficulty: "easy",
    question_type: "calculation",
    source_title: "নবম-দশম শ্রেণি গণিত — এনসিটিবি",
    source_page_or_section: "বীজগাণিতিক ঘন সূত্রাবলী"
  },
  {
    subject: "Mathematics",
    topic: "সূচক ও লগারিদম",
    subtopic: "সূচকের নিয়মাবলী",
    question_bn: "2^(x + 3) = 32 হলে x-এর মান কত?",
    question_en: "If 2^(x + 3) = 32, find the value of x.",
    options: {
      A: "2",
      B: "3",
      C: "4",
      D: "5"
    },
    correct_option: "A",
    explanation_bn: "32 = 2^5। সুতরাং 2^(x + 3) = 2^5। যেহেতু ভিত্তি সমান, তাই x + 3 = 5 => x = 5 - 3 = 2।",
    explanation_en: "2^(x + 3) = 32 = 2^5 => x + 3 = 5 => x = 2.",
    difficulty: "easy",
    question_type: "calculation",
    source_title: "এনসিটিবি সাধারণ গণিত",
    source_page_or_section: "সূচক অধ্যায়"
  },
  {
    subject: "Mathematics",
    topic: "সূচক ও লগারিদম",
    subtopic: "লগারিদমের মান নির্ণয়",
    question_bn: "log_2 (64)-এর মান কত?",
    question_en: "What is the value of log_2 (64)?",
    options: {
      A: "5",
      B: "6",
      C: "7",
      D: "8"
    },
    correct_option: "B",
    explanation_bn: "৬৪ = ২^৬। অতএব, log_2 (64) = log_2 (2^6) = 6 . log_2 (2) = 6 × 1 = 6।",
    explanation_en: "64 = 2^6, thus log_2 (64) = log_2 (2^6) = 6 x log_2(2) = 6.",
    difficulty: "easy",
    question_type: "calculation",
    source_title: "উচ্চ মাধ্যমিক গণিত — এস ইউ আহাম্মদ",
    source_page_or_section: "লগারিদম"
  },
  {
    subject: "Mathematics",
    topic: "সমান্তর ও গুণোত্তর ধারা",
    subtopic: "সমান্তর ধারার n-তম পদ ও সমষ্টি",
    question_bn: "১ + ৩ + ৫ + ৭ + ...... ধারাটির প্রথম ২০টি পদের সমষ্টি কত?",
    question_en: "What is the sum of the first 20 terms of the arithmetic series 1 + 3 + 5 + 7 + ...?",
    options: {
      A: "২০০",
      B: "৩০০",
      C: "৪০০",
      D: "৪২০"
    },
    correct_option: "C",
    explanation_bn: "প্রথম n-সংখ্যক স্বাভাবিক বিজোড় সংখ্যার সমষ্টির সরাসরি সূত্র হলো n^2। এখানে n = ২০, অতএব সমষ্টি = ২০^২ = ৪০০। বিকল্পভাবে: S_n = (n/2)[2a + (n-1)d] = (20/2)[2(1) + 19(2)] = 10[2 + 38] = 10 × 40 = 400।",
    explanation_en: "The sum of the first n odd natural numbers is n^2. For n = 20, Sum = 20^2 = 400.",
    difficulty: "easy",
    question_type: "calculation",
    source_title: "এনসিটিবি নবম-দশম সাধারণ গণিত",
    source_page_or_section: "সসীম ধারা অধ্যায়"
  },
  {
    subject: "Mathematics",
    topic: "সমান্তর ও গুণোত্তর ধারা",
    subtopic: "গুণোত্তর ধারা",
    question_bn: "২ + ৪ + ৮ + ১৬ + ...... গুণোত্তর ধারাটির ৮ম পদটি কত?",
    question_en: "What is the 8th term of the geometric progression 2 + 4 + 8 + 16 + ...?",
    options: {
      A: "১২৮",
      B: "২৫৬",
      C: "৫১২",
      D: "৬৪"
    },
    correct_option: "B",
    explanation_bn: "গুণোত্তর ধারার n-তম পদের সূত্র: a . r^(n-1)। এখানে ১ম পদ a = ২ এবং সাধারণ অনুপাত r = ৪/২ = ২। সুতরাং ৮ম পদ = ২ × ২^(৮-১) = ২ × ২^৭ = ২ × ১২৮ = ২৫৬।",
    explanation_en: "8th term = a * r^(n-1) = 2 * 2^(8-1) = 2 * 128 = 256.",
    difficulty: "easy",
    question_type: "calculation",
    source_title: "এনসিটিবি সাধারণ গণিত",
    source_page_or_section: "গুণোত্তর ধারা"
  },
  {
    subject: "Mathematics",
    topic: "সেট তত্ত্ব ও ভেনচিত্র",
    subtopic: "সেটের উপাদান সংখ্যা ও উপসেট",
    question_bn: "যদি কোনো সেটের উপাদান সংখ্যা n = 4 হয়, তবে ওই সেটের মোট উপসেট (Subset) সংখ্যা কত?",
    question_en: "If a set contains n = 4 elements, how many subsets does it possess?",
    options: {
      A: "8",
      B: "16",
      C: "15",
      D: "32"
    },
    correct_option: "B",
    explanation_bn: "n সংখ্যক উপাদানবিশিষ্ট সেটের মোট উপসেটের সংখ্যা হলো ২^n। এখানে n = ৪, অতএব মোট উপসেট সংখ্যা = ২^৪ = ১৬। প্রকৃত উপসেট সংখ্যা হতো (২^n - ১) = ১৫।",
    explanation_en: "The number of subsets for a set with n elements is 2^n. For n = 4, 2^4 = 16.",
    difficulty: "easy",
    question_type: "calculation",
    source_title: "উচ্চ মাধ্যমিক গণিত ১ম পত্র — মো. রফিকুল ইসলাম",
    source_page_or_section: "সেট ও ফাংশন"
  },
  {
    subject: "Mathematics",
    topic: "জ্যামিতি — ত্রিভুজ",
    subtopic: "পিথাগোরাসের উপপাদ্য",
    question_bn: "একটি সমকোণী ত্রিভুজের অতিভুজ ১৩ সেমি এবং ভূমি ১২ সেমি হলে, ত্রিভুজটির উচ্চতা কত?",
    question_en: "In a right-angled triangle, if the hypotenuse is 13 cm and the base is 12 cm, what is its height?",
    options: {
      A: "4 সেমি",
      B: "5 সেমি",
      C: "6 সেমি",
      D: "7 সেমি"
    },
    correct_option: "B",
    explanation_bn: "পিথাগোরাসের উপপাদ্য অনুসারে: অতিভুজ^২ = ভূমি^২ + লম্ব^২। লম্ব^২ = ১৩^২ - ১২^২ = ১৬৯ - ১৪৪ = ২৫। অতএব লম্ব বা উচ্চতা = √২৫ = ৫ সেমি।",
    explanation_en: "Using the Pythagorean theorem: height = sqrt(13^2 - 12^2) = sqrt(169 - 144) = sqrt(25) = 5 cm.",
    difficulty: "easy",
    question_type: "calculation",
    source_title: "এনসিটিবি জ্যামিতি — নবম-দশম শ্রেণি",
    source_page_or_section: "পিথাগোরাসের উপপাদ্য ও প্রয়োগ"
  },
  {
    subject: "Mathematics",
    topic: "জ্যামিতি — বৃত্ত",
    subtopic: "বৃত্তের পরিধি ও ক্ষেত্রফল",
    question_bn: "একটি বৃত্তের ব্যাসার্ধ দ্বিগুণ করা হলে তার ক্ষেত্রফল পূর্বের ক্ষেত্রফলের কত গুণ বৃদ্ধি পাবে?",
    question_en: "If the radius of a circle is doubled, by what factor does its area increase?",
    options: {
      A: "২ গুণ",
      B: "৩ গুণ",
      C: "৪ গুণ",
      D: "৮ গুণ"
    },
    correct_option: "C",
    explanation_bn: "বৃত্তের ক্ষেত্রফলের সূত্র: A = π r^2। ব্যাসার্ধ দ্বিগুণ (2r) করা হলে নতুন ক্ষেত্রফল = π (2r)^2 = 4 π r^2, যা আদি ক্ষেত্রফলের ৪ গুণ।",
    explanation_en: "Area = pi * r^2. If radius becomes 2r, New Area = pi * (2r)^2 = 4 * (pi * r^2), which is 4 times the original area.",
    difficulty: "easy",
    question_type: "reasoning",
    source_title: "মাধ্যমিক পরিমিতি — এনসিটিবি",
    source_page_or_section: "বৃত্ত সংক্রান্ত ক্ষেত্রফল"
  },
  {
    subject: "Mathematics",
    topic: "পরিমিতি — আয়তক্ষেত্র",
    subtopic: "পরিসীমা ও ক্ষেত্রফল",
    question_bn: "একটি আয়তাকার ক্ষেত্রের দৈর্ঘ্য প্রস্থের ৩ গুণ এবং ক্ষেত্রফল ৩০০ বর্গমিটার হলে, তার পরিসীমা কত?",
    question_en: "The length of a rectangle is 3 times its width. If its area is 300 sq meters, what is its perimeter?",
    options: {
      A: "60 মিটার",
      B: "80 মিটার",
      C: "100 মিটার",
      D: "120 মিটার"
    },
    correct_option: "B",
    explanation_bn: "ধরি প্রস্থ = x মিটার, দৈর্ঘ্য = 3x মিটার। ক্ষেত্রফল = 3x × x = 3x^2 = ৩০০ => x^2 = ১০০ => x = ১০ মিটার। দৈর্ঘ্য = ৩০ মিটার। পরিসীমা = ২ × (দৈর্ঘ্য + প্রস্থ) = ২ × (৩০ + ১০) = ২ × ৪০ = ৮০ মিটার।",
    explanation_en: "Let width = x, length = 3x. Area = 3x^2 = 300 => x = 10 m. Length = 30 m. Perimeter = 2(30 + 10) = 80 m.",
    difficulty: "medium",
    question_type: "calculation",
    source_title: "এনসিটিবি নবম-দশম সাধারণ গণিত",
    source_page_or_section: "পরিমিতি: ক্ষেত্রফল ও পরিসীমা"
  },
  {
    subject: "Mathematics",
    topic: "সমাবেশ ও বিন্যাস",
    subtopic: "সমাবেশ সূত্র (nCr)",
    question_bn: "১০ জন সদস্যের একটি দল থেকে ৩ সদস্যের একটি উপকমিটি কত প্রকারে গঠন করা যেতে পারে?",
    question_en: "In how many ways can a committee of 3 members be formed from a pool of 10 people?",
    options: {
      A: "720 প্রকারে",
      B: "120 প্রকারে",
      C: "210 প্রকারে",
      D: "90 প্রকারে"
    },
    correct_option: "B",
    explanation_bn: "দল নির্বাচনের ক্ষেত্রে ক্রম বিবেচ্য নয়, তাই এটি সমাবেশ (Combination)। সূত্র: 10C3 = (10 × 9 × 8) / (3 × 2 × 1) = 720 / 6 = 120 প্রকারে।",
    explanation_en: "Combinations 10C3 = (10 x 9 x 8) / (3 x 2 x 1) = 720 / 6 = 120 ways.",
    difficulty: "easy",
    question_type: "calculation",
    source_title: "উচ্চ মাধ্যমিক গণিত ১ম পত্র — বিন্যাস ও সমাবেশ",
    source_page_or_section: "সমাবেশ ও দল গঠন"
  },
  {
    subject: "Mathematics",
    topic: "সম্ভাবনা (Probability)",
    subtopic: "ছক্কার গাণিতিক সম্ভাবনা",
    question_bn: "একটি নিরপেক্ষ ছক্কা একবার নিক্ষেপ করলে মৌলিক সংখ্যা (Prime Number) ওঠার সম্ভাবনা কত?",
    question_en: "What is the probability of rolling a prime number in a single throw of a fair six-sided die?",
    options: {
      A: "1/6",
      B: "1/3",
      C: "1/2",
      D: "2/3"
    },
    correct_option: "C",
    explanation_bn: "একটি ছক্কার মোট ফলাফল ৬টি: {১, ২, ৩, ৪, ৫, ৬}। এদের মধ্যে মৌলিক সংখ্যা ৩টি: {২, ৩, ৫} (১ মৌলিক নয়)। সুতরাং মৌলিক সংখ্যা ওঠার সম্ভাবনা = ৩ / ৬ = ১ / ২।",
    explanation_en: "Total outcomes = 6. Prime outcomes = {2, 3, 5} (3 primes). Probability = 3/6 = 1/2.",
    difficulty: "easy",
    question_type: "calculation",
    source_title: "এনসিটিবি নবম-দশম সাধারণ গণিত",
    source_page_or_section: "সম্ভাবনা অধ্যায়"
  },
  {
    subject: "Mathematics",
    topic: "পরিসংখ্যান ও গড়",
    subtopic: "গাণিতিক গড় নির্ণয়",
    question_bn: "৫টি সংখ্যার গড় ২০। যদি তাদের সাথে একটি নতুন সংখ্যা যোগ করা হয়, তবে ৬টি সংখ্যার গড় হয় ২২। নতুন সংখ্যাটি কত?",
    question_en: "The average of 5 numbers is 20. If an additional number is included, the average becomes 22. What is the new number?",
    options: {
      A: "28",
      B: "30",
      C: "32",
      D: "34"
    },
    correct_option: "C",
    explanation_bn: "৫টি সংখ্যার মোট সমষ্টি = ৫ × ২০ = ১০০। নতুন সংখ্যা যোগ করার পর ৬টি সংখ্যার মোট সমষ্টি = ৬ × ২২ = ১৩২। অতএব, নতুন সংখ্যাটি = ১৩২ - ১০০ = ৩২।",
    explanation_en: "Sum of 5 numbers = 5 x 20 = 100. Sum of 6 numbers = 6 x 22 = 132. New number = 132 - 100 = 32.",
    difficulty: "easy",
    question_type: "calculation",
    source_title: "পরিসংখ্যান পরিচিতি — এনসিটিবি",
    source_page_or_section: "গড় ও কেন্দ্রীয় প্রবণতা"
  },
  {
    subject: "Mathematics",
    topic: "ত্রিকোণমিতি",
    subtopic: "ত্রিকোণমিতিক অভেদাবলী ও মান",
    question_bn: "যদি sin θ = 1/2 হয়, তবে cot θ-এর মান কত? (যেখানে θ সূক্ষ্মকোণ)",
    question_en: "If sin θ = 1/2 (where θ is acute), what is the value of cot θ?",
    options: {
      A: "1/√3",
      B: "√3",
      C: "1",
      D: "2"
    },
    correct_option: "B",
    explanation_bn: "যেহেতু sin θ = 1/2, তাই সূক্ষ্মকোণ θ = 30°। অতএব, cot θ = cot 30° = √3। বিকল্পভাবে: cos θ = √(1 - sin^2 θ) = √(1 - 1/4) = √3/2। cot θ = cos θ / sin θ = (√3/2) / (1/2) = √3।",
    explanation_en: "Since sin θ = 1/2, θ = 30°. cot 30° = √3.",
    difficulty: "easy",
    question_type: "calculation",
    source_title: "মাধ্যমিক সাধারণ গণিত — ত্রিকোণমিতি",
    source_page_or_section: "ত্রিকোণমিতিক অনুপাতসমূহ"
  }
];
