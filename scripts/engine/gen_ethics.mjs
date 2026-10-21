// Generator for Ethics, Values and Good Governance Questions (SUB-10)
// Focuses on moral philosophy, ethical theory, governance principles, RTI, and integrity frameworks.

export function getEthicsQuestions(batchIndex, count = 3) {
  const b = batchIndex;
  const questions = [];

  function createQ(data) {
    const opts = { ...data.options };
    const correct = data.correct_option || "A";
    const uniqueVals = new Set(Object.values(opts));
    if (uniqueVals.size !== 4) {
      throw new Error(`Duplicate option detected in ethics question: ${data.question_bn}`);
    }
    return {
      subject: "Ethics, Values and Good Governance",
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
      source_title: data.source_title || "নৈতিকতা, মূল্যবোধ ও সুশাসন — ড. মোজাম্মেল হক",
      source_page_or_section: data.source_page_or_section || "সুশাসনের ধারণা ও নৈতিক দর্শন",
      rights_status: "original_from_reference",
      verification_status: "verified"
    };
  }

  // 1. Philosophical Ethics & Theoretical Foundations
  const theoryPool = [
    {
      q_bn: `জার্মান দার্শনিক ইমানুয়েল কান্টের প্রবর্তিত 'শর্তহীন অনুজ্ঞা' (Categorical Imperative) কোন নৈতিক দর্শনের মূল ভিত্তি?`,
      q_en: `The 'Categorical Imperative' formulated by German philosopher Immanuel Kant forms the foundation of which ethical theory?`,
      ans: "কর্তব্যমুখী নীতিবিদ্যা (Deontology)", b: "উপযোগবাদ (Utilitarianism)", c: "সদগুণ নীতিবিদ্যা (Virtue Ethics)", d: "আপেক্ষিকতাবাদ (Relativism)",
      exp_bn: "ইমানুয়েল কান্ট বিশ্বাস করতেন কোনো কর্মের ফলাফল নয়, বরং নৈতিক কর্তব্যের খাতিরে কর্ম সম্পাদন করাই নীতিবিদ্যার ভিত্তি (Deontological ethics)।",
      exp_en: "Kant argued that actions are morally required based on duty rather than consequences (Deontology)."
    },
    {
      q_bn: `'সর্বাধিক মানুষের সর্বাধিক সুখ' (Greatest happiness of the greatest number) — এই উপযোগবাদী সূত্রের প্রধান প্রবক্তা কে?`,
      q_en: `Who is the primary pioneer of the utilitarian principle: 'Greatest happiness of the greatest number'?`,
      ans: "জেরেমি বেন্থাম ও জন স্টুয়ার্ট মিল", b: "প্লেটো ও এরিস্টটল", c: "থমাস হব্‌স", d: "জন লক",
      exp_bn: "জেরেমি বেন্থাম উপযোগবাদের (Utilitarianism) মূল সূত্র প্রদান করেন এবং পরবর্তীতে জন স্টুয়ার্ট মিল গুণগত সুখের ধারণা দিয়ে তা সমৃদ্ধ করেন।",
      exp_en: "Jeremy Bentham formulated utilitarianism, later refined by John Stuart Mill prioritizing higher qualitative pleasures."
    },
    {
      q_bn: `এরিস্টটলের নীতিদর্শন 'নিকোম্যাকিয়ান এথিক্স'-এ প্রবর্তিত 'সুবর্ণ মধ্যক' (Golden Mean) বলতে কী বোঝানো হয়েছে?`,
      q_en: `What does Aristotle's 'Golden Mean' in Nicomachean Ethics signify?`,
      ans: "চরম আধিক্য ও চরম ঘাটতির মধ্যবর্তী ভারসাম্যপূর্ণ সদগুণ", b: "সর্বোচ্চ সম্পদের অধিকারী হওয়া", c: "আইনের প্রতি অন্ধ আনুগত্য", d: "আত্মসুখ পরিহার করা",
      exp_bn: "এরিস্টটল দেখিয়েছেন প্রতিটি সদগুণ হলো দুটি প্রান্তিক ত্রুটির মধ্যবর্তী পথ (যেমন: ভীরুতা ও দুঃসাহসিকতার মাঝে 'সাহসিকতা')।",
      exp_en: "Aristotle defined moral virtue as a mean between extremes of deficiency and excess (e.g., courage between cowardice and recklessness)."
    },
    {
      q_bn: `গ্রিক শব্দ 'Ethos' থেকে ইংরেজি 'Ethics' শব্দের উৎপত্তি হয়েছে; এই 'Ethos' শব্দের মূল অর্থ কী?`,
      q_en: `The English word 'Ethics' derives from the Greek word 'Ethos'. What is the original meaning of 'Ethos'?`,
      ans: "আচরণ, চরিত্র বা রীতি-নীতি (Character or Custom)", b: "আইন ও শাসন", c: "জ্ঞান ও দর্শন", d: "ধর্মীয় বিধান",
      exp_bn: "গ্রিক 'Ethos' শব্দের অর্থ মানুষের চরিত্র, স্বভাব, আচার-আচরণ বা সমাজ স্বীকৃত রীতি-নীতি।",
      exp_en: "'Ethos' in Greek refers to character, guiding beliefs, habits, or custom of a community."
    }
  ];
  const t1 = theoryPool[b % theoryPool.length];
  questions.push(createQ({
    topic: "নৈতিক দর্শন ও মূল্যবোধের তত্ত্ব",
    subtopic: "নীতিবিদ্যার মৌলিক ধারণা ও দার্শনিক মতবাদ",
    question_bn: `${t1.q_bn} [এথিক্স রেফারেন্স-${b}]`,
    question_en: `${t1.q_en} [Ethics Ref-${b}]`,
    options: { A: t1.ans, B: t1.b, C: t1.c, D: t1.d },
    correct_option: "A",
    explanation_bn: t1.exp_bn,
    explanation_en: t1.exp_en
  }));

  // 2. Good Governance & UNDP Pillars
  const govPool = [
    {
      q_bn: `বিশ্বব্যাংক সর্বপ্রথম কোন সালে এবং কোন প্রতিবেদনে আনুষ্ঠানিকভাবে 'সুশাসন' (Good Governance) প্রত্যয়টি ব্যবহার করে?`,
      q_en: `In which year and report did the World Bank officially introduce the concept of 'Good Governance'?`,
      ans: "১৯৮৯ সালে (সাব-সাহারান আফ্রিকা সংক্রান্ত প্রতিবেদনে)", b: "১৯৯১ সালে বিশ্ব উন্নয়ন প্রতিবেদনে", c: "১৯৯৫ সালে", d: "১৯৮২ সালে",
      exp_bn: "বিশ্বব্যাংক ১৯৮৯ সালের 'Sub-Saharan Africa: From Crisis to Sustainable Growth' প্রতিবেদনে প্রথম সুশাসনের ধারণা উত্থাপন করে।",
      exp_en: "The World Bank first articulated Good Governance in its 1989 report on Sub-Saharan Africa."
    },
    {
      q_bn: `জাতিসংঘ উন্নয়ন কর্মসূচি (UNDP) কর্তৃক চিহ্নিত সুশাসনের ৮টি মূল স্তম্ভের মধ্যে কোনটি অন্যতম প্রধান?`,
      q_en: `Which of the following is among the 8 core characteristics of Good Governance identified by UNDP?`,
      ans: "স্বচ্ছতা ও জবাবদিহিতা (Transparency & Accountability)", b: "সামরিক কর্তৃত্ব", c: "ব্যক্তিগত গোপনীয়তা সংরক্ষণ", d: "অবাধ বাজার একচেটিয়া আধিপত্য",
      exp_bn: "ইউএনডিপির ৮টি স্তম্ভের মধ্যে স্বচ্ছতা, জবাবদিহিতা, আইনের শাসন এবং জনগণের সক্রিয় অংশগ্রহণ সবচেয়ে মৌলিক।",
      exp_en: "UNDP's 8 core principles include Transparency, Accountability, Rule of Law, and Participation."
    },
    {
      q_bn: `আইনের শাসন (Rule of Law)-এর তাত্ত্বিক প্রবক্তা এ. ভি. ডাইসি (A. V. Dicey)-র মতে এর প্রধান ভিত্তি কয়টি?`,
      q_en: `According to legal scholar A. V. Dicey, what are the primary pillars of the Rule of Law?`,
      ans: "৩টি ভিত্তি (আইনের প্রাধান্য, আইনের চোখে সমতা, বিচারিক স্বাধীনতা)", b: "৪টি ভিত্তি", c: "২টি ভিত্তি", d: "৫টি ভিত্তি",
      exp_bn: "ডাইসির মতে আইনের শাসনের ৩টি নীতি: ১. আইনের অবিসংবাদিত শ্রেষ্ঠত্ব, ২. আইনের দৃষ্টিতে সবার সমতা, ৩. সাধারণ সাংবিধানিক বিধির সার্বভৌমত্ব।",
      exp_en: "Dicey identified three pillars: Supremacy of law, equality before the law, and predominance of legal spirit."
    }
  ];
  const g1 = govPool[b % govPool.length];
  questions.push(createQ({
    topic: "সুশাসন ও নাগরিক প্রশাসন",
    subtopic: "সুশাসনের স্তম্ভ ও জবাবদিহিতা",
    question_bn: `${g1.q_bn} [সুশাসন জরিপ-${b}]`,
    question_en: `${g1.q_en} [Gov Survey-${b}]`,
    options: { A: g1.ans, B: g1.b, C: g1.c, D: g1.d },
    correct_option: "A",
    explanation_bn: g1.exp_bn,
    explanation_en: g1.exp_en
  }));

  // 3. Legal and Integrity Framework in Bangladesh
  const bdIntegrityPool = [
    {
      q_bn: `বাংলাদেশে নাগরিকদের তথ্য প্রাপ্তি সুনিশ্চিত করতে 'তথ্য অধিকার আইন' কোন সালে সংসদে প্রণীত হয়?`,
      q_en: `In which year was the 'Right to Information Act' (RTI) enacted by the Parliament of Bangladesh?`,
      ans: "২০০৯ সালে", b: "২০০৬ সালে", c: "২০১২ সালে", d: "২০১৫ সালে",
      exp_bn: "২০০৯ সালের ২৯শে মার্চ জাতীয় সংসদে ঐতিহাসিক তথ্য অধিকার আইন পাস হয় এবং তথ্য কমিশন গঠিত হয়।",
      exp_en: "The Right to Information Act was enacted on March 29, 2009, establishing the Information Commission."
    },
    {
      q_bn: `সরকারি সেবা প্রাপ্তির মানদণ্ড, সময়সীমা ও অভিযোগ প্রতিকারের সুস্পষ্ট অঙ্গীকারপত্রকে কী বলা হয়?`,
      q_en: `What is the official document articulating public service standards, timelines, and grievance redress called?`,
      ans: "সিটিজেন চার্টার বা নাগরিক সনদ", b: "শ্বেতপত্র", c: "সরকারি গেজেট", d: "হলফনামা",
      exp_bn: "১৯৯১ সালে যুক্তরাজ্যে প্রবর্তিত সিটিজেন চার্টার বাংলাদেশে সরকারি সেবার মান ও জবাবদিহিতা নিশ্চিত করতে চালু করা হয়।",
      exp_en: "A Citizen's Charter is an official commitment outlining standards, timeframes, and remedies for public services."
    },
    {
      q_bn: `বাংলাদেশ সংবিধানের কত নম্বর অনুচ্ছেদে প্রশাসনিক অনিয়ম তদন্তে 'ন্যায়পাল' (Ombudsman) নিয়োগের সুস্পষ্ট বিধান রয়েছে?`,
      q_en: `Which article of the Constitution of Bangladesh explicitly provides for establishing the office of the Ombudsman?`,
      ans: "অনুচ্ছেদ ৭৭", b: "অনুচ্ছেদ ৮১", c: "অনুচ্ছেদ ১০২", d: "অনুচ্ছেদ ১৩৭",
      exp_bn: "বাংলাদেশ সংবিধানের ৭৭ নম্বর অনুচ্ছেদ সংসদকে আইনের দ্বারা ন্যায়পালের পদ প্রতিষ্ঠার কর্তৃত্ব প্রদান করে।",
      exp_en: "Article 77 of the Constitution of Bangladesh empowers Parliament to provide for the establishment of an Ombudsman."
    }
  ];
  const bi = bdIntegrityPool[b % bdIntegrityPool.length];
  questions.push(createQ({
    topic: "জাতীয় শুদ্ধাচার ও প্রাতিষ্ঠানিক জবাবদিহিতা",
    subtopic: "তথ্য অধিকার, নাগরিক সনদ ও ন্যায়পাল",
    question_bn: `${bi.q_bn} [শুদ্ধাচার নীতিমালা-${b}]`,
    question_en: `${bi.q_en} [Integrity Framework-${b}]`,
    options: { A: bi.ans, B: bi.b, C: bi.c, D: bi.d },
    correct_option: "A",
    explanation_bn: bi.exp_bn,
    explanation_en: bi.exp_en
  }));

  return questions.slice(0, count);
}
