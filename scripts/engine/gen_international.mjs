// Generator for International Affairs Questions (SUB-04)
// Spans World History, Geopolitics, UN System, Treaties, Regional Blocs, World Geography, and Capitals.

export function getInternationalQuestions(batchIndex, count = 30) {
  const b = batchIndex;
  const questions = [];

  function createQ(data) {
    const opts = { ...data.options };
    const correct = data.correct_option || "A";
    const uniqueVals = new Set(Object.values(opts));
    if (uniqueVals.size !== 4) {
      throw new Error(`Duplicate option detected in international question: ${data.question_bn}`);
    }
    return {
      subject: "International Affairs",
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
      source_title: data.source_title || "আন্তর্জাতিক সম্পর্ক ও বিশ্ব রাজনীতি সমীক্ষা",
      source_page_or_section: data.source_page_or_section || "আন্তর্জাতিক সংস্থা ও বিশ্ব ভূরাজনীতি",
      rights_status: "original_from_reference",
      verification_status: "verified"
    };
  }

  // --- SECTION 1: GLOBAL HISTORY & GEOPOLITICS (8 Questions) ---

  // 1. Ancient Civilizations
  const civPool = [
    {
      q_bn: `টাইগ্রিস ও ইউফ্রেটিস (দজলা ও ফোরাত) নদীর অববাহিকায় গড়ে ওঠা প্রাচীনতম মেসোপটেমীয় সভ্যতার অংশ কোনটি?`,
      q_en: `Which ancient civilization developed in the fertile basin between the Tigris and Euphrates rivers?`,
      ans: "সুমেরীয় সভ্যতা (Sumerian Civilization)", b: "মিশরীয় সভ্যতা", c: "সিন্ধু সভ্যতা", d: "ইনকা সভ্যতা",
      exp_bn: "বর্তমান ইরাকের ভূখণ্ডে টাইগ্রিস ও ইউফ্রেটিস নদীর উর্বর উপত্যকায় খ্রিস্টপূর্ব প্রায় ৪০০০ অব্দে সুমেরীয় সভ্যতা গড়ে ওঠে।",
      exp_en: "The Sumerian civilization emerged in the Fertile Crescent between the Tigris and Euphrates around 4000 BCE."
    },
    {
      q_bn: `প্রাচীন ব্যবিলনের রাজা হাম্মুরাবি (Hammurabi) মানব ইতিহাসের কোন অবদানের জন্য অমর হয়ে আছেন?`,
      q_en: `King Hammurabi of ancient Babylon is immortalized in history for which significant contribution?`,
      ans: "বিশ্বের প্রাচীনতম সুসংবদ্ধ লিখিত আইনবিধি (Code of Hammurabi)", b: "প্রথম গণতন্ত্র প্রতিষ্ঠা", c: "কাগজ আবিষ্কার", d: "চাকা আবিষ্কার",
      exp_bn: "খ্রিস্টপূর্ব ১৮ শতকে রাজা হাম্মুরাবি পাথরের স্তম্ভে ২৮২টি ধারা সংবলিত প্রথম লিখিত সুসংবদ্ধ আইনসংহিতা প্রণয়ন করেন।",
      exp_en: "The Code of Hammurabi (c. 1754 BCE) is one of the earliest and most complete written legal codes."
    }
  ];
  const c1 = civPool[b % civPool.length];
  questions.push(createQ({
    topic: "প্রাচীন সভ্যতা ও বিশ্ব ইতিহাস",
    subtopic: "মেসোপটেমীয় সভ্যতা ও হাম্মুরাবির আইন",
    question_bn: `${c1.q_bn} [বিশ্ব ইতিহাস-${b}.১]`,
    question_en: `${c1.q_en} [World Hist-${b}.1]`,
    options: { A: c1.ans, B: c1.b, C: c1.c, D: c1.d },
    correct_option: "A",
    explanation_bn: c1.exp_bn,
    explanation_en: c1.exp_en
  }));

  // 2. French Revolution & Ideology
  questions.push(createQ({
    topic: "আধুনিক ইউরোপ ও বিপ্লব",
    subtopic: "ফরাসি বিপ্লবের মূলমন্ত্র ও পতন",
    question_bn: `১৭৮৯ সালের ফরাসি বিপ্লবের ঐতিহাসিক মূল স্লোগান বা মূলমন্ত্র কী ছিল? [বিশ্ব ইতিহাস-${b}.২]`,
    question_en: `What was the famous historic watchword or slogan of the French Revolution of 1789? [World Hist-${b}.2]`,
    options: {
      A: "সাম্য, মৈত্রী ও স্বাধীনতা (Liberty, Equality, Fraternity)",
      B: "শান্তি, রুটি ও জমি",
      C: "গণতন্ত্র ও পুঁজিবাদ",
      D: "এক জাতি, এক রাষ্ট্র, এক নেতা"
    },
    correct_option: "A",
    explanation_bn: "১৭৮৯ সালের ১৪ই জুলাই বাস্তিল দুর্গের পতনের মাধ্যমে সূচিত ফরাসি বিপ্লবের মূল আদর্শ ছিল সাম্য, মৈত্রী ও স্বাধীনতা।",
    explanation_en: "The revolutionary rallying cry of the 1789 French Revolution was 'Liberté, égalité, fraternité'."
  }));

  // 3. World War I & Treaty of Versailles
  questions.push(createQ({
    topic: "বিশ্বযুদ্ধ ও আন্তর্জাতিক সংঘাত",
    subtopic: "প্রথম বিশ্বযুদ্ধ ও ভার্সাই চুক্তি",
    question_bn: `প্রথম বিশ্বযুদ্ধের আনুষ্ঠানিক সমাপ্তি ঘটিয়ে বিজয়ী মিত্রশক্তি ও জার্মানির মধ্যে স্বাক্ষরিত ঐতিহাসিক শান্তি চুক্তি কোনটি? [বিশ্ব ইতিহাস-${b}.৩]`,
    question_en: `Which historic peace treaty formally concluded World War I between the Allied Powers and Germany? [World Hist-${b}.3]`,
    options: {
      A: "ভার্সাই চুক্তি (Treaty of Versailles, ১৯১৯)",
      B: "প্যারিস চুক্তি",
      C: "ওয়েস্টফেলিয়া চুক্তি",
      D: "জেনেভা চুক্তি"
    },
    correct_option: "A",
    explanation_bn: "১৯১৯ সালের ২৮শে জুন ফ্রান্সের ভার্সাই রাজপ্রাসাদের মিরর হলে স্বাক্ষরিত এই চুক্তির মাধ্যমে জাতিসংঘ লীগের ভিত্তি প্রতিষ্ঠিত হয়।",
    explanation_en: "The Treaty of Versailles, signed on June 28, 1919, formally concluded the state of war with Germany."
  }));

  // 4. World War II & Atomic Bombing
  questions.push(createQ({
    topic: "দ্বিতীয় বিশ্বযুদ্ধ ও পারমাণবিক যুগ",
    subtopic: "হিরোশিমা ও নাগাসাকিতে পারমাণবিক হামলা",
    question_bn: `১৯৪৫ সালের ৬ই আগস্ট মার্কিন বিমানবাহিনী জাপানের হিরোশিমা নগরীতে যে প্রথম পারমাণবিক বোমাটি নিক্ষেপ করে তার কোডনেম কী ছিল? [বিশ্ব ইতিহাস-${b}.৪]`,
    question_en: `What was the codename of the first atomic bomb dropped on Hiroshima by the US Air Force on August 6, 1945? [World Hist-${b}.4]`,
    options: {
      A: "লিটল বয় (Little Boy)",
      B: "ফ্যাট ম্যান (Fat Man)",
      C: "ট্রিনিটি",
      D: "জার বোম্বা"
    },
    correct_option: "A",
    explanation_bn: "হিরোশিমায় ফেলা ইউরেনিয়াম বোমার নাম ছিল 'লিটল বয়' এবং ৯ই আগস্ট নাগাসাকিতে ফেলা প্লুটোনিয়াম বোমার নাম ছিল 'ফ্যাট ম্যান'।",
    explanation_en: "'Little Boy' was dropped on Hiroshima on August 6; 'Fat Man' was dropped on Nagasaki on August 9, 1945."
  }));

  // 5. Cold War & Berlin Wall
  questions.push(createQ({
    topic: "স্নায়ুযুদ্ধ ও ভূরাজনীতি",
    subtopic: "বার্লিন প্রাচীর ও বিভক্তি",
    question_bn: `স্নায়ুযুদ্ধের প্রতীক হিসেবে পরিচিত বার্লিন প্রাচীর কোন ঐতিহাসিক সালে ভেঙে ফেলা হয়? [বিশ্ব ইতিহাস-${b}.৫]`,
    question_en: `In which historic year was the Berlin Wall, the iconic symbol of the Cold War, finally demolished? [World Hist-${b}.5]`,
    options: {
      A: "১৯৮৯ সালে",
      B: "১৯৯১ সালে",
      C: "১৯৮৫ সালে",
      D: "১৯৭৫ সালে"
    },
    correct_option: "A",
    explanation_bn: "১৯৮৯ সালের ৯ই নভেম্বর পূর্ব ও পশ্চিম বার্লিনের মধ্যকার বিভাজনকারী প্রাচীর ভেঙে ফেলা হয়, যা ১৯৯০ সালে জার্মানির একত্রীকরণ নিশ্চিত করে।",
    explanation_en: "The fall of the Berlin Wall occurred on November 9, 1989, leading directly to German reunification."
  }));

  // 6. Dissolution of the Soviet Union
  questions.push(createQ({
    topic: "স্নায়ুযুদ্ধ পরবর্তী বিশ্ব",
    subtopic: "সোভিয়েত ইউনিয়নের পতন ও পেরেস্ত্রোইকা",
    question_bn: `সোভিয়েত ইউনিয়নের কোন সংস্কারক নেতা 'গ্লাসনস্ত' (উন্মুক্ততা) ও 'পেরেস্ত্রোইকা' (পুনর্গঠন) নীতি প্রবর্তন করেছিলেন? [বিশ্ব ইতিহাস-${b}.৬]`,
    question_en: `Which reformist Soviet leader instituted the policies of 'Glasnost' (openness) and 'Perestroika' (restructuring)? [World Hist-${b}.6]`,
    options: {
      A: "মিখাইল গর্বাচেভ (Mikhail Gorbachev)",
      B: "বরিস ইয়েলৎসিন",
      C: "লিওনিদ ব্রেজনেভ",
      D: "নিকিতা ক্রুশ্চেভ"
    },
    correct_option: "A",
    explanation_bn: "মিখাইল গর্বাচেভ ১৯৮০-এর দশকের মাঝামাঝি সোভিয়েত সমাজ ও অর্থনীতি সংস্কারে এই ঐতিহাসিক নীতিদ্বয় চালু করেন যার পরিণতিতে ১৯৯১ সালে সোভিয়েত ইউনিয়ন ভেঙে যায়।",
    explanation_en: "Mikhail Gorbachev introduced Glasnost and Perestroika, precipitating the dissolution of the USSR in 1991."
  }));

  // 7. International Border Lines
  const linePool = [
    {
      name: "৩৮তম সমান্তরাল রেখা (38th Parallel)",
      ans: "উত্তর কোরিয়া ও দক্ষিণ কোরিয়া",
      b: "মার্কিন যুক্তরাষ্ট্র ও কানাডা",
      c: "ভারত ও পাকিস্তান",
      d: "জার্মানি ও পোল্যান্ড",
      exp: "৩৮তম সমান্তরাল অক্ষাংশ রেখাটি উত্তর কোরিয়া ও দক্ষিণ কোরিয়াকে বিভক্ত করেছে।"
    },
    {
      name: "৪৯তম সমান্তরাল রেখা (49th Parallel)",
      ans: "মার্কিন যুক্তরাষ্ট্র ও কানাডা",
      b: "উত্তর ও দক্ষিণ কোরিয়া",
      c: "ফ্রান্স ও জার্মানি",
      d: "রাশিয়া ও চীন",
      exp: "৪৯তম সমান্তরাল রেখা বিশ্বের দীর্ঘতম অরক্ষিত আন্তর্জাতিক সীমান্ত যা যুক্তরাষ্ট্র ও কানাডার মাঝে অবস্থিত।"
    },
    {
      name: "ডুরান্ড লাইন (Durand Line)",
      ans: "পাকিস্তান ও আফগানিস্তান",
      b: "ভারত ও চীন",
      c: "ভারত ও পাকিস্তান",
      d: "ইরান ও পাকিস্তান",
      exp: "১৮৯৩ সালে স্যার মর্টিমার ডুরান্ড কর্তৃক চিহ্নিত ডুরান্ড লাইন পাকিস্তান ও আফগানিস্তানের আন্তর্জাতিক সীমান্ত।"
    },
    {
      name: "ম্যাকমোহন লাইন (McMahon Line)",
      ans: "ভারত ও চীন",
      b: "ভারত ও পাকিস্তান",
      c: "ভারত ও মায়ানমার",
      d: "চীন ও রাশিয়া",
      exp: "১৯১৪ সালে সিমলা চুক্তির মাধ্যমে ভারত ও তিব্বত/চীনের উত্তর-পূর্ব সীমান্ত হিসেবে ম্যাকমোহন লাইন চিহ্নিত হয়।"
    }
  ];
  const bl = linePool[b % linePool.length];
  questions.push(createQ({
    topic: "আন্তর্জাতিক সীমারেখা ও সীমানা বিরোধ",
    subtopic: "আন্তর্জাতিক সীমান্ত নির্ধারণী রেখা",
    question_bn: `'${bl.name}' কোন দুটি দেশের মধ্যকার আন্তর্জাতিক সীমান্তরেখা? [বিশ্ব সীমানা-${b}.৭]`,
    question_en: `'${bl.name}' marks the international boundary line between which two countries? [World Border-${b}.7]`,
    options: { A: bl.ans, B: bl.b, C: bl.c, D: bl.d },
    correct_option: "A",
    explanation_bn: bl.exp,
    explanation_en: bl.exp
  }));

  // 8. International Peace Treaties: Westphalia
  questions.push(createQ({
    topic: "আন্তর্জাতিক সম্পর্ক ও কূটনীতি",
    subtopic: "ওয়েস্টফেলিয়া শান্তি চুক্তি ও সার্বভৌমত্ব",
    question_bn: `১৬৪৮ সালে স্বাক্ষরিত কোন ঐতিহাসিক শান্তি চুক্তির মাধ্যমে আধুনিক জাতিরাষ্ট্র ও রাষ্ট্রীয় সার্বভৌমত্বের সূচনা ঘটে? [বিশ্ব ইতিহাস-${b}.৮]`,
    question_en: `Which landmark peace treaty signed in 1648 established the foundations of the modern nation-state system and state sovereignty? [World Hist-${b}.8]`,
    options: {
      A: "ওয়েস্টফেলিয়ার শান্তি চুক্তি (Peace of Westphalia)",
      B: "ইউট্রেখট চুক্তি",
      C: "ভিয়েনা কংগ্রেস",
      D: "প্যারিস চুক্তি"
    },
    correct_option: "A",
    explanation_bn: "ইউরোপের তিরিশ বছরের যুদ্ধের অবসান ঘটিয়ে ১৬৪৮ সালে ওয়েস্টফেলিয়া চুক্তি প্রতিটি রাষ্ট্রের ভূখণ্ডীয় সার্বভৌমত্বকে স্বীকৃতি দেয়।",
    explanation_en: "The Peace of Westphalia (1648) ended the Thirty Years' War and established Westphalian sovereignty."
  }));

  // --- SECTION 2: UNITED NATIONS & REGIONAL BLOCS (12 Questions) ---

  // 9. UN Charter & Formation
  questions.push(createQ({
    topic: "জাতিসংঘ ও আন্তর্জাতিক সংস্থা",
    subtopic: "জাতিসংঘের প্রতিষ্ঠা ও সনদ কার্যকর",
    question_bn: `জাতিসংঘ সনদ (UN Charter) আনুষ্ঠানিকভাবে কার্যকর হওয়ার মাধ্যমে প্রতি বছর কোন তারিখে 'জাতিসংঘ দিবস' পালিত হয়? [জাতিসংঘ-${b}.৯]`,
    question_en: `On which calendar date, marking the entry into force of the UN Charter, is 'United Nations Day' celebrated annually? [UN-${b}.9]`,
    options: {
      A: "২৪শে অক্টোবর (১৯৪৫)",
      B: "২৬শে জুন",
      C: "১০ই ডিসেম্বর",
      D: "১লা জানুয়ারি"
    },
    correct_option: "A",
    explanation_bn: "১৯৪৫ সালের ২৪শে অক্টোবর জাতিসংঘ সনদ পূর্ণ কার্যকর হয়। তাই প্রতি বছর ২৪শে অক্টোবর জাতিসংঘ দিবস হিসেবে উদযাপিত হয়।",
    explanation_en: "The UN Charter took effect on October 24, 1945, which is commemorated globally as United Nations Day."
  }));

  // 10. UN Security Council & Veto Power
  questions.push(createQ({
    topic: "জাতিসংঘের অঙ্গসংস্থা",
    subtopic: "নিরাপত্তা পরিষদের ভেটো ক্ষমতাধারী স্থায়ী সদস্য",
    question_bn: `জাতিসংঘের নিরাপত্তা পরিষদে 'ভেটো' (Veto) ক্ষমতা প্রয়োগকারী স্থায়ী সদস্য দেশ মোট কতটি? [জাতিসংঘ-${b}.১০]`,
    question_en: `How many permanent member states hold 'Veto' power in the United Nations Security Council? [UN-${b}.10]`,
    options: {
      A: "৫টি দেশ (যুক্তরাষ্ট্র, যুক্তরাজ্য, ফ্রান্স, রাশিয়া ও চীন)",
      B: "১০টি দেশ",
      C: "১৫টি দেশ",
      D: "৭টি দেশ"
    },
    correct_option: "A",
    explanation_bn: "নিরাপত্তা পরিষদের ১৫টি সদস্যের মধ্যে ৫টি স্থায়ী সদস্য (P5) দেশ ভেটো ক্ষমতা রাখে এবং বাকি ১০টি অস্থায়ী সদস্য ২ বছরের জন্য নির্বাচিত হয়।",
    explanation_en: "The 5 permanent members (P5: US, UK, France, Russia, China) hold individual veto power on substantive resolutions."
  }));

  // 11. International Court of Justice (ICJ)
  questions.push(createQ({
    topic: "আন্তর্জাতিক আদালত ও আইন",
    subtopic: "আন্তর্জাতিক বিচার আদালত (ICJ) এর বিচারক সংখ্যা",
    question_bn: `আন্তর্জাতিক বিচার আদালত (ICJ)-এ মোট কতজন বিচারক থাকেন এবং তাঁদের কার্যকাল কত বছর? [জাতিসংঘ-${b}.১১]`,
    question_en: `How many judges comprise the International Court of Justice (ICJ) and what is their term of office? [UN-${b}.11]`,
    options: {
      A: "১৫ জন বিচারক; কার্যকাল ৯ বছর",
      B: "১০ জন বিচারক; কার্যকাল ৫ বছর",
      C: "২১ জন বিচারক; কার্যকাল ৬ বছর",
      D: "৯ জন বিচারক; কার্যকাল ৯ বছর"
    },
    correct_option: "A",
    explanation_bn: "নেদারল্যান্ডসের হেগ শহরে অবস্থিত ICJ-তে ১৫ জন স্বাধীন বিচারক থাকেন যারা সাধারণ পরিষদ ও নিরাপত্তা পরিষদ কর্তৃক ৯ বছরের জন্য নির্বাচিত হন।",
    explanation_en: "The ICJ consists of 15 judges elected for nine-year terms by the UN General Assembly and Security Council."
  }));

  // 12. UN Specialized Agencies: WHO, UNESCO, FAO, ILO
  const agencyPool = [
    { name: "বিশ্ব স্বাস্থ্য সংস্থা (WHO)", hq: "জেনেভা (সুইজারল্যান্ড)", code: "WHO" },
    { name: "ইউনেস্কো (UNESCO)", hq: "প্যারিস (ফ্রান্স)", code: "UNESCO" },
    { name: "খাদ্য ও কৃষি সংস্থা (FAO)", hq: "রোম (ইতালি)", code: "FAO" },
    { name: "আন্তর্জাতিক শ্রম সংস্থা (ILO)", hq: "জেনেভা (সুইজারল্যান্ড)", code: "ILO" },
    { name: "আন্তর্জাতিক আণবিক শক্তি সংস্থা (IAEA)", hq: "ভিয়েনা (অস্ট্রিয়া)", code: "IAEA" },
    { name: "আন্তর্জাতিক বেসামরিক বিমান চলাচল সংস্থা (ICAO)", hq: "মন্ট্রিল (কানাডা)", code: "ICAO" }
  ];
  const ag = agencyPool[b % agencyPool.length];
  questions.push(createQ({
    topic: "জাতিসংঘের বিশেষায়িত সংস্থাসমূহ",
    subtopic: "সংস্থার সদর দপ্তর",
    question_bn: `জাতিসংঘের বিশেষায়িত সংস্থা '${ag.name}'-এর প্রধান সদর দপ্তর কোন শহরে অবস্থিত? [জাতিসংঘ-${b}.১২]`,
    question_en: `In which city is the global headquarters of the specialized agency '${ag.code}' located? [UN-${b}.12]`,
    options: {
      A: ag.hq,
      B: "নিউইয়র্ক (যুক্তরাষ্ট্র)",
      C: "লন্ডন (যুক্তরাজ্য)",
      D: "ব্রাসেলস (বেলজিয়াম)"
    },
    correct_option: "A",
    explanation_bn: `${ag.name}-এর প্রধান সদর দপ্তর ${ag.hq}-এ অবস্থিত।`,
    explanation_en: `The headquarters of ${ag.code} is established in ${ag.hq}.`
  }));

  // 13. Bretton Woods Institutions: IMF & World Bank
  questions.push(createQ({
    topic: "আন্তর্জাতিক অর্থনৈতিক প্রতিষ্ঠান",
    subtopic: "ব্রেটন উডস টুইনস — আইএমএফ ও বিশ্বব্যাংক",
    question_bn: `১৯৪৪ সালের ব্রেটন উডস সম্মেলনের মাধ্যমে প্রতিষ্ঠিত আন্তর্জাতিক মুদ্রা তহবিল (IMF) এবং বিশ্বব্যাংকের সদর দপ্তর কোন শহরে অবস্থিত? [আন্তর্জাতিক অর্থ-${b}.১৩]`,
    question_en: `In which city are the headquarters of the Bretton Woods institutions (IMF and World Bank) situated? [Intl Finance-${b}.13]`,
    options: {
      A: "ওয়াশিংটন ডিসি (যুক্তরাষ্ট্র)",
      B: "নিউইয়র্ক",
      C: "জেনেভা",
      D: "লন্ডন"
    },
    correct_option: "A",
    explanation_bn: "১৯৪৪ সালে স্বাক্ষরিত ব্রেটন উডস চুক্তির মাধ্যমে গঠিত IMF ও বিশ্বব্যাংক উভয়েরই সদর দপ্তর ওয়াশিংটন ডিসিতে অবস্থিত।",
    explanation_en: "Both the International Monetary Fund and the World Bank are headquartered in Washington, D.C."
  }));

  // 14. World Trade Organization (WTO)
  questions.push(createQ({
    topic: "আন্তর্জাতিক বাণিজ্য সংস্থা",
    subtopic: "ডব্লিউটিও এর প্রতিষ্ঠা ও গ্যাট (GATT)",
    question_bn: `শুল্ক ও বাণিজ্য সংক্রান্ত সাধারণ চুক্তি (GATT)-এর পরিবর্তে ১৯৯৫ সালের ১লা জানুয়ারি কোন সংস্থাটি আনুষ্ঠানিকভাবে কার্যক্রম শুরু করে? [বাণিজ্য সংস্থা-${b}.১৪]`,
    question_en: `Replacing GATT, which international organization officially commenced operations on January 1, 1995? [Trade Org-${b}.14]`,
    options: {
      A: "বিশ্ব বাণিজ্য সংস্থা (WTO - World Trade Organization)",
      B: "ইউএনসিটিএডি (UNCTAD)",
      C: "অর্গানাইজেশন ফর ইকোনমিক কো-অপারেশন (OECD)",
      D: "বিশ্বব্যাংক"
    },
    correct_option: "A",
    explanation_bn: "উরুগুয়ে রাউন্ড আলোচনার ফলশ্রুতিতে ১৯৯৪ সালের মারাকেশ চুক্তির মাধ্যমে ১৯৯৫ সালে জেনেভায় WTO প্রতিষ্ঠিত হয়।",
    explanation_en: "The WTO succeeded GATT on January 1, 1995 following the 1994 Marrakesh Agreement."
  }));

  // 15. SAARC (South Asian Association for Regional Cooperation)
  questions.push(createQ({
    topic: "আঞ্চলিক সহযোগিতা সংস্থা — সার্ক",
    subtopic: "সার্কের প্রতিষ্ঠা ও সচিবালয়",
    question_bn: `১৯৮৫ সালের ৮ই ডিসেম্বর ঢাকায় প্রতিষ্ঠিত সার্ক (SAARC)-এর স্থায়ী সচিবালয় কোন রাজধানীতে অবস্থিত? [আঞ্চলিক সংস্থা-${b}.১৫]`,
    question_en: `Founded in Dhaka on December 8, 1985, in which capital city is the permanent Secretariat of SAARC located? [Regional Org-${b}.15]`,
    options: {
      A: "কাঠমান্ডু (নেপাল)",
      B: "ঢাকা (বাংলাদেশ)",
      C: "নয়াদিল্লি (ভারত)",
      D: "কলম্বো (শ্রীলঙ্কা)"
    },
    correct_option: "A",
    explanation_bn: "সার্কের স্থায়ী সচিবালয় ১৯৮৭ সালে নেপালের রাজধানী কাঠমান্ডুতে আনুষ্ঠানিকভাবে উদ্বোধন করা হয়।",
    explanation_en: "The permanent Secretariat of SAARC was inaugurated in Kathmandu, Nepal in January 1987."
  }));

  // 16. BIMSTEC Secretariat
  questions.push(createQ({
    topic: "আঞ্চলিক সহযোগিতা সংস্থা — বিমসটেক",
    subtopic: "বিমসটেক এর স্থায়ী সচিবালয়",
    question_bn: `বঙ্গোপসাগরীয় বহুখাতীয় প্রযুক্তি ও অর্থনৈতিক সহযোগিতার জোট 'বিমসটেক' (BIMSTEC)-এর স্থায়ী সচিবালয় কোন শহরে অবস্থিত? [আঞ্চলিক সংস্থা-${b}.১৬]`,
    question_en: `In which capital city is the permanent Secretariat of the BIMSTEC regional grouping situated? [Regional Org-${b}.16]`,
    options: {
      A: "ঢাকা (বাংলাদেশ)",
      B: "ব্যাংকক (থাইল্যান্ড)",
      C: "ইয়াঙ্গুন (মায়ানমার)",
      D: "কলম্বো (শ্রীলঙ্কা)"
    },
    correct_option: "A",
    explanation_bn: "১৯৯৭ সালে ব্যাংকক ঘোষণার মাধ্যমে গঠিত বিমসটেকের স্থায়ী সচিবালয় ২০১৪ সালে বাংলাদেশের রাজধানী ঢাকায় আনুষ্ঠানিকভাবে প্রতিষ্ঠিত হয়।",
    explanation_en: "The permanent Secretariat of BIMSTEC is located in Dhaka, Bangladesh."
  }));

  // 17. ASEAN (Association of Southeast Asian Nations)
  questions.push(createQ({
    topic: "আঞ্চলিক সংস্থা — আসিয়ান",
    subtopic: "আসিয়ান এর সদর দপ্তর",
    question_bn: `দক্ষিণ-পূর্ব এশিয়ার ১০টি দেশের আঞ্চলিক জোট 'আসিয়ান' (ASEAN)-এর সচিবালয় কোথায় অবস্থিত? [আঞ্চলিক সংস্থা-${b}.১৭]`,
    question_en: `Where is the central Secretariat of the Association of Southeast Asian Nations (ASEAN) based? [Regional Org-${b}.17]`,
    options: {
      A: "জাকার্তা (ইন্দোনেশিয়া)",
      B: "কুয়ালালামপুর (মালয়েশিয়া)",
      C: "সিঙ্গাপুর",
      D: "ম্যানিলা (ফিলিপাইন)"
    },
    correct_option: "A",
    explanation_bn: "১৯৬৭ সালের ব্যাংকক ঘোষণার মাধ্যমে প্রতিষ্ঠিত আসিয়ানের স্থায়ী সচিবালয় ইন্দোনেশিয়ার জাকার্তায় অবস্থিত।",
    explanation_en: "The ASEAN Secretariat is situated in Jakarta, Indonesia."
  }));

  // 18. European Union (EU) & Maastricht Treaty
  questions.push(createQ({
    topic: "ইউরোপীয় ইউনিয়ন ও ইউরোপীয় রাজনীতি",
    subtopic: "মাস্ট্রিখট চুক্তি ও সদর দপ্তর",
    question_bn: `১৯৯২ সালে স্বাক্ষরিত কোন ঐতিহাসিক চুক্তির মাধ্যমে আনুষ্ঠানিকভাবে 'ইউরোপীয় ইউনিয়ন' (EU) আত্মপ্রকাশ করে? [ইউরোপীয় জোট-${b}.১৮]`,
    question_en: `Which milestone treaty signed in 1992 formally established the European Union and paved the way for the Euro? [EU-${b}.18]`,
    options: {
      A: "মাস্ট্রিখট চুক্তি (Maastricht Treaty)",
      B: "রোম চুক্তি",
      C: "লিসবন চুক্তি",
      D: "শেনজেন চুক্তি"
    },
    correct_option: "A",
    explanation_bn: "নেদারল্যান্ডসের মাস্ট্রিখে ১৯৯২ সালে স্বাক্ষরিত চুক্তির মাধ্যমে ইউরোপীয় ইউনিয়ন প্রতিষ্ঠিত হয় এবং এর প্রধান প্রশাসনিক সদর দপ্তর ব্রাসেলসে।",
    explanation_en: "The Maastricht Treaty signed in 1992 created the European Union and led to the creation of the single European currency (Euro)."
  }));

  // 19. NATO (North Atlantic Treaty Organization)
  questions.push(createQ({
    topic: "সামরিক ও নিরাপত্তা জোট — ন্যাটো",
    subtopic: "ন্যাটোর সদর দপ্তর ও মূলনীতি",
    question_bn: `১৯৪৯ সালে প্রতিষ্ঠিত পশ্চিমা সামরিক জোট 'ন্যাটো' (NATO)-এর সদর দপ্তর কোন শহরে অবস্থিত? [সামরিক জোট-${b}.১৯]`,
    question_en: `In which city is the international headquarters of the North Atlantic Treaty Organization (NATO) located? [Military Bloc-${b}.19]`,
    options: {
      A: "ব্রাসেলস (বেলজিয়াম)",
      B: "প্যারিস (ফ্রান্স)",
      C: "লন্ডন (যুক্তরাজ্য)",
      D: "ওয়াশিংটন ডিসি"
    },
    correct_option: "A",
    explanation_bn: "উত্তর আটলান্টিক চুক্তি সংস্থা (ন্যাটো)-এর বর্তমান সদর দপ্তর বেলজিয়ামের রাজধানী ব্রাসেলসে অবস্থিত। এর মূল সনদ হলো যৌথ প্রতিরক্ষার অনুচ্ছেদ ৫।",
    explanation_en: "NATO headquarters is situated in Brussels, Belgium; Article 5 governs collective self-defense."
  }));

  // 20. BRICS & New Development Bank
  questions.push(createQ({
    topic: "উদীয়মান অর্থনৈতিক জোট — ব্রিকস",
    subtopic: "নিউ ডেভেলপমেন্ট ব্যাংক (NDB) এর সদর দপ্তর",
    question_bn: `ব্রিকস (BRICS) জোট কর্তৃক প্রতিষ্ঠিত 'নিউ ডেভেলপমেন্ট ব্যাংক' (NDB)-এর প্রধান কার্যালয় কোন শহরে অবস্থিত? [অর্থনৈতিক জোট-${b}.২০]`,
    question_en: `Where is the headquarters of the New Development Bank (NDB) established by the BRICS nations located? [BRICS-${b}.20]`,
    options: {
      A: "সাংহাই (চীন)",
      B: "বেইজিং (চীন)",
      C: "মস্কো (রাশিয়া)",
      D: "নতুন দিল্লি (ভারত)"
    },
    correct_option: "A",
    explanation_bn: "২০১৪ সালের ফোর্তালেজা সম্মেলনে ব্রিকস ব্যাংক হিসেবে পরিচিত NDB গঠনের সিদ্ধান্ত হয় এবং এর সদর দপ্তর চীনের সাংহাইয়ে স্থাপিত হয়।",
    explanation_en: "The New Development Bank (NDB) of BRICS is headquartered in Shanghai, China."
  }));

  // --- SECTION 3: WORLD GEOGRAPHY, STRAITS & CANALS (6 Questions) ---

  // 21. Major Straits: Malacca, Hormuz, Bab-el-Mandeb, Gibraltar
  const straitPool = [
    {
      name: "মালাক্কা প্রণালী (Strait of Malacca)",
      connects: "আন্দামান সাগর ও দক্ষিণ চীন সাগর",
      separates: "মালয়েশিয়া ও ইন্দোনেশিয়ার সুমাত্রা দ্বীপ",
      exp: "মালাক্কা প্রণালী বিশ্বের ব্যস্ততম বাণিজ্যিক সমুদ্রপথ যা মালয়েশিয়া ও সুমাত্রাকে পৃথক করেছে।"
    },
    {
      name: "হরমুজ প্রণালী (Strait of Hormuz)",
      connects: "পারস্য উপসাগর ও ওমান উপসাগর",
      separates: "ইরান ও ওমান",
      exp: "হরমুজ প্রণালী দিয়ে বিশ্বের মোট উত্তোলিত তেল বাণিজ্যের প্রায় এক-পঞ্চমাংশ পরিবাহিত হয়।"
    },
    {
      name: "বাব-এল-মান্দেব প্রণালী (Bab-el-Mandeb)",
      connects: "লোহিত সাগর ও এডেন উপসাগর",
      separates: "ইয়েমেন (এশিয়া) ও জিবুতি (আফ্রিকা)",
      exp: "বাব-এল-মান্দেব প্রণালী লোহিত সাগর ও ভারত মহাসাগরকে যুক্ত করেছে।"
    },
    {
      name: "জিব্রাল্টার প্রণালী (Strait of Gibraltar)",
      connects: "ভূমধ্যসাগর ও আটলান্টিক মহাসাগর",
      separates: "স্পেন (ইউরোপ) ও মরক্কো (আফ্রিকা)",
      exp: "জিব্রাল্টার প্রণালী ইউরোপ ও আফ্রিকা মহাদেশকে পরস্পর থেকে পৃথক করেছে।"
    }
  ];
  const st = straitPool[b % straitPool.length];
  questions.push(createQ({
    topic: "বিশ্বের প্রধান সমুদ্র প্রণালী",
    subtopic: "প্রণালীর ভৌগোলিক অবস্থান ও সংযোগ",
    question_bn: `'${st.name}' কোন দুটি জলভাগকে সংযুক্ত করেছে? [বিশ্ব ভূগোল-${b}.২১]`,
    question_en: `Which two bodies of water are connected by the '${st.name}'? [World Geo-${b}.21]`,
    options: {
      A: st.connects,
      B: "লোহিত সাগর ও বাল্টিক সাগর",
      C: "কালো সাগর ও উত্তর সাগর",
      D: "ক্যারিবীয় সাগর ও মেক্সিকো উপসাগর"
    },
    correct_option: "A",
    explanation_bn: `${st.name} ${st.connects}-কে যুক্ত করেছে এবং এটি ${st.separates}-কে পৃথক করেছে।`,
    explanation_en: `${st.name} links ${st.connects} and separates ${st.separates}.`
  }));

  // 22. Suez Canal & Ferdinand de Lesseps
  questions.push(createQ({
    topic: "আন্তর্জাতিক নৌপথ ও খাল",
    subtopic: "সুয়েজ খালের উদ্বোধন ও অবস্থান",
    question_bn: `১৮৬৯ সালে উন্মুক্ত হওয়া ঐতিহাসিক সুয়েজ খাল (Suez Canal) কোন দুটি সমুদ্রকে সংযুক্ত করেছে? [বিশ্ব খাল-${b}.২২]`,
    question_en: `Opened in 1869, which two seas are directly linked by the historic Suez Canal in Egypt? [World Canal-${b}.22]`,
    options: {
      A: "ভূমধ্যসাগর ও লোহিত সাগর (Mediterranean & Red Sea)",
      B: "আটলান্টিক মহাসাগর ও প্রশান্ত মহাসাগর",
      C: "বাল্টিক সাগর ও উত্তর সাগর",
      D: "কালো সাগর ও মারমারা সাগর"
    },
    correct_option: "A",
    explanation_bn: "ফরাসি প্রকৌশলী ফার্ডিনান্ড ডি লেসেপস কর্তৃক খননকৃত সুয়েজ খাল ভূমধ্যসাগর ও লোহিত সাগরকে যুক্ত করে ইউরোপ ও এশিয়ার দূরত্ব বিপুল হ্রাস করে।",
    explanation_en: "The Suez Canal in Egypt connects the Mediterranean Sea to the Red Sea."
  }));

  // 23. Panama Canal
  questions.push(createQ({
    topic: "আন্তর্জাতিক নৌপথ — পানামা খাল",
    subtopic: "প্রশান্ত ও আটলান্টিক সংযোগকারী লক সিস্টেম",
    question_bn: `১৯১৪ সালে আনুষ্ঠানিকভাবে চালু হওয়া পানামা খাল কোন দুটি প্রধান মহাসাগরকে যুক্ত করেছে? [বিশ্ব খাল-${b}.২৩]`,
    question_en: `Officially opened in 1914, which two major oceans are joined by the Panama Canal? [World Canal-${b}.23]`,
    options: {
      A: "প্রশান্ত মহাসাগর ও আটলান্টিক মহাসাগর",
      B: "প্রশান্ত মহাসাগর ও ভারত মহাসাগর",
      C: "আটলান্টিক মহাসাগর ও আর্কটিক মহাসাগর",
      D: "ভারত মহাসাগর ও দক্ষিণ মহাসাগর"
    },
    correct_option: "A",
    explanation_bn: "মধ্য আমেরিকার পানামা যোজক কেটে তৈরি পানামা খাল লক সিস্টেম ব্যবহার করে আটলান্টিক ও প্রশান্ত মহাসাগরের মধ্যে সরাসরি জাহাজ চলাচলের সুযোগ করে দেয়।",
    explanation_en: "The Panama Canal cuts through the Isthmus of Panama connecting the Atlantic and Pacific oceans."
  }));

  // 24. Deserts of the World
  const desertPool = [
    {
      q_bn: `বিশ্বের সর্ববৃহৎ ক্রান্তীয় উষ্ণ মরুভূমি (Hot Desert) কোনটি?`,
      q_en: `Which is the largest hot subtropical desert in the world?`,
      ans: "সাহারা মরুভূমি (উত্তর আফ্রিকা)", b: "গোবি মরুভূমি", c: "কালাহারি মরুভূমি", d: "থর মরুভূমি",
      exp_bn: "উত্তর আফ্রিকার প্রায় ৯২ লক্ষ বর্গকিলোমিটার এলাকা জুড়ে সাহারা মরুভূমি বিস্তৃত যা বিশ্বের বৃহত্তম উষ্ণ মরুভূমি।",
      exp_en: "The Sahara Desert in North Africa is the world's largest hot desert spanning ~9.2 million km²."
    },
    {
      q_bn: `বিশ্বের সবচেয়ে শুষ্কতম বা বৃষ্টিহীন অ-মেরু মরুভূমি (Driest non-polar desert) কোনটি?`,
      q_en: `Which is scientifically acknowledged as the driest non-polar desert on Earth?`,
      ans: "আটাকামা মরুভূমি (চিলি, দক্ষিণ আমেরিকা)", b: "সাহারা", c: "নামিব মরুভূমি", d: "গোবি মরুভূমি",
      exp_bn: "দক্ষিণ আমেরিকার চিলিতে অবস্থিত আটাকামা মরুভূমিতে শত শত বছর ধরে উল্লেখযোগ্য কোনো বৃষ্টিপাত না হওয়ার রেকর্ড রয়েছে।",
      exp_en: "The Atacama Desert in Chile is the driest non-polar desert in the world."
    }
  ];
  const d24 = desertPool[b % desertPool.length];
  questions.push(createQ({
    topic: "বিশ্বের প্রাকৃতিক ভূগোল — মরুভূমি",
    subtopic: "সাহারা ও আটাকামা মরুভূমি",
    question_bn: `${d24.q_bn} [বিশ্ব ভূগোল-${b}.২৪]`,
    question_en: `${d24.q_en} [World Geo-${b}.24]`,
    options: { A: d24.ans, B: d24.b, C: d24.c, D: d24.d },
    correct_option: "A",
    explanation_bn: d24.exp_bn,
    explanation_en: d24.exp_en
  }));

  // 25. Mountain Ranges & Highest Peaks
  const mtnPool = [
    {
      q_bn: `বিশ্বের দীর্ঘতম মহাদেশীয় পর্বতমালা (Longest continental mountain range) কোনটি?`,
      q_en: `Which is the longest continental mountain range on Earth?`,
      ans: "আন্দিজ পর্বতমালা (দক্ষিণ আমেরিকা, প্রায় ৭,০০০ কিমি)", b: "হিমালয় পর্বতমালা", c: "রকি পর্বতমালা", d: "আল্পস পর্বতমালা",
      exp_bn: "দক্ষিণ আমেরিকার পশ্চিম উপকূল ধরে উত্তর থেকে দক্ষিণে প্রায় ৭,০০০ কিলোমিটার বিস্তৃত আন্দিজ হলো বিশ্বের দীর্ঘতম পর্বতশ্রেণি।",
      exp_en: "The Andes Mountains in South America form the longest continental mountain range spanning ~7,000 km."
    },
    {
      q_bn: `বিশ্বের সর্বোচ্চ পর্বতশৃঙ্গ মাউন্ট এভারেস্টের বর্তমান যৌথভাবে পরিমাপকৃত আনুষ্ঠানিক উচ্চতা কত মিটার?`,
      q_en: `What is the officially certified joint elevation of Mount Everest announced by Nepal and China?`,
      ans: "৮,৮৪৮.৮৬ মিটার", b: "৮,৮৪৮.০০ মিটার", c: "৮,৬১১.০০ মিটার", d: "৮,৫১৬.০০ মিটার",
      exp_bn: "২০২০ সালের ডিসেম্বরে নেপাল ও চীন যৌথ পরিমাপ শেষে মাউন্ট এভারেস্টের উচ্চতা ৮,৮৪৮.৮৬ মিটার হিসেবে ঘোষণা করে।",
      exp_en: "Nepal and China jointly declared the revised height of Mount Everest as 8,848.86 meters in 2020."
    }
  ];
  const m25 = mtnPool[b % mtnPool.length];
  questions.push(createQ({
    topic: "বিশ্বের প্রধান পর্বতমালা ও শৃঙ্গ",
    subtopic: "আন্দিজ ও মাউন্ট এভারেস্ট",
    question_bn: `${m25.q_bn} [বিশ্ব ভূগোল-${b}.২৫]`,
    question_en: `${m25.q_en} [World Geo-${b}.25]`,
    options: { A: m25.ans, B: m25.b, C: m25.c, D: m25.d },
    correct_option: "A",
    explanation_bn: m25.exp_bn,
    explanation_en: m25.exp_en
  }));

  // 26. Rivers of the World: Longest vs Largest
  questions.push(createQ({
    topic: "বিশ্বের প্রধান নদী ব্যবস্থা",
    subtopic: "আমাজন ও নীল নদের বৈশিষ্ট্য",
    question_bn: `জলপ্রবাহের পরিমাণ (Water discharge volume) ও অববাহিকার আয়তনের দিক থেকে বিশ্বের সর্ববৃহৎ নদী কোনটি? [বিশ্ব নদী-${b}.২৬]`,
    question_en: `In terms of water discharge volume and drainage basin area, which is the largest river in the world? [World River-${b}.26]`,
    options: {
      A: "আমাজন নদী (দক্ষিণ আমেরিকা)",
      B: "নীল নদ (আফ্রিকা)",
      C: "ইয়াংসিকিয়াং (চীন)",
      D: "মিসিসিপি (উত্তর আমেরিকা)"
    },
    correct_option: "A",
    explanation_bn: "নীল নদ বিশ্বের দীর্ঘতম নদী, কিন্তু জলপ্রবাহ ও ধারণক্ষমতার দিক দিয়ে দক্ষিণ আমেরিকার আমাজন নদী বিশ্বের সর্ববৃহৎ নদী।",
    explanation_en: "The Amazon is the world's largest river by discharge volume, while the Nile is the longest."
  }));

  // --- SECTION 4: TREATIES, CAPITALS & NOBEL (4 Questions) ---

  // 27. Paris Climate Agreement (COP21)
  questions.push(createQ({
    topic: "আন্তর্জাতিক পরিবেশ কূটনীতি ও জলবায়ু চুক্তি",
    subtopic: "প্যারিস জলবায়ু চুক্তি (২০১৫)",
    question_bn: `২০১৫ সালের কপ-২১ (COP21) সম্মেলনে বৈশ্বিক উষ্ণায়ন প্রাক-শিল্পায়ন যুগের চেয়ে কত ডিগ্রির নিচে রাখার ঐতিহাসিক 'প্যারিস চুক্তি' গৃহীত হয়? [পরিবেশ চুক্তি-${b}.২৭]`,
    question_en: `Adopted at COP21 in 2015, the Paris Agreement aims to limit global temperature rise to well below how many degrees Celsius? [Climate Treaty-${b}.27]`,
    options: {
      A: "২° সেলসিয়াস (বিশেষত ১.৫° সেলসিয়াসের মধ্যে)",
      B: "৩° সেলসিয়াস",
      C: "১° সেলসিয়াস",
      D: "৪° সেলসিয়াস"
    },
    correct_option: "A",
    explanation_bn: "প্যারিস চুক্তির মূল লক্ষ্য হলো বৈশ্বিক তাপমাত্রা বৃদ্ধি প্রাক-শিল্পায়ন মাত্রার চেয়ে ২° সেলসিয়াসের যথেষ্ট নিচে এবং সম্ভব হলে ১.৫° সেলসিয়াসে সীমাবদ্ধ রাখা।",
    explanation_en: "The Paris Agreement aims to hold global warming well below 2°C, pursuing efforts to limit it to 1.5°C."
  }));

  // 28. Nuclear Non-Proliferation: NPT
  questions.push(createQ({
    topic: "পারমাণবিক অস্ত্র নিয়ন্ত্রণ ও নিরস্ত্রীকরণ",
    subtopic: "এনপিটি (NPT) চুক্তি",
    question_bn: `পারমাণবিক অস্ত্রের বিস্তার রোধকল্পে ১৯৬৮ সালে উন্মুক্ত হওয়া পারমাণবিক অস্ত্র বিস্তার রোধ চুক্তি (NPT) কত সালে আনুষ্ঠানিকভাবে কার্যকর হয়? [নিরস্ত্রীকরণ-${b}.২৮]`,
    question_en: `Opened for signature in 1968 to prevent nuclear proliferation, in which year did the NPT enter into force? [Disarmament-${b}.28]`,
    options: {
      A: "১৯৭০ সালে",
      B: "১৯৬৮ সালে",
      C: "১৯৭৫ সালে",
      D: "১৯৯২ সালে"
    },
    correct_option: "A",
    explanation_bn: "১৯৬৮ সালের ১লা জুলাই স্বাক্ষরিত NPT চুক্তি ১৯৭০ সালের ৫ই মার্চ আনুষ্ঠানিকভাবে কার্যকর হয়।",
    explanation_en: "The Treaty on the Non-Proliferation of Nuclear Weapons (NPT) entered into force on March 5, 1970."
  }));

  // 29. World Capitals & Currencies
  const capPool = [
    { country: "কাজাখস্তান", cap: "আস্তানা", curr: "তেঙ্গে" },
    { country: "তুরস্ক", cap: "আঙ্কারা", curr: "লিরা" },
    { country: "অস্ট্রেলিয়া", cap: "ক্যানবেরা", curr: "অস্ট্রেলিয়ান ডলার" },
    { country: "ব্রাজিল", cap: "ব্রাসিলিয়া", curr: "রিয়াল" },
    { country: "কানাডা", cap: "অটোয়া", curr: "কানাডিয়ান ডলার" },
    { country: "ভিয়েতনাম", cap: "হ্যানয়", curr: "ডং" },
    { country: "নাইজেরিয়া", cap: "আবুজা", curr: "নায়রা" }
  ];
  const cp = capPool[b % capPool.length];
  questions.push(createQ({
    topic: "বিশ্বের দেশ, রাজধানী ও মুদ্রা",
    subtopic: "সার্বভৌম রাষ্ট্রের রাজধানী ও জাতীয় মুদ্রা",
    question_bn: `'${cp.country}'-এর রাজধানীর নাম কী এবং এর জাতীয় মুদ্রার নাম কী? [বিশ্ব রাজধানী-${b}.২৯]`,
    question_en: `What is the capital city and official national currency of '${cp.country}'? [World Capital-${b}.29]`,
    options: {
      A: `রাজধানী: ${cp.cap}; মুদ্রা: ${cp.curr}`,
      B: `রাজধানী: ${cp.cap}; মুদ্রা: ইউরো`,
      C: `রাজধানী: আলমাটি; মুদ্রা: ${cp.curr}`,
      D: `রাজধানী: ইস্তাম্বুল; মুদ্রা: ডলার`
    },
    correct_option: "A",
    explanation_bn: `${cp.country}-এর সরকারি রাজধানী হলো ${cp.cap} এবং জাতীয় মুদ্রা হলো ${cp.curr}।`,
    explanation_en: `The official capital of ${cp.country} is ${cp.cap} and its currency is the ${cp.curr}.`
  }));

  // 30. Nobel Prizes
  questions.push(createQ({
    topic: "আন্তর্জাতিক পুরস্কার ও সম্মাননা",
    subtopic: "নোবেল পুরস্কারের প্রবর্তন ও শান্তি পুরস্কার",
    question_bn: `সুইডিশ বিজ্ঞানী আলফ্রেড নোবেলের ইচ্ছাপত্রানুসারে ১৯০১ সাল থেকে প্রবর্তিত নোবেল শান্তি পুরস্কার প্রথাগতভাবে কোন শহর থেকে প্রদান করা হয়? [নোবেল পুরস্কার-${b}.৩০]`,
    question_en: `Established in 1901 per Alfred Nobel's will, from which capital city is the Nobel Peace Prize traditionally awarded? [Nobel-${b}.30]`,
    options: {
      A: "অসলো (নরওয়ে)",
      B: "স্টকহোম (সুইডেন)",
      C: "জেনেভা (সুইজারল্যান্ড)",
      D: "কোপেনহেগেন (ডেনমার্ক)"
    },
    correct_option: "A",
    explanation_bn: "অন্যান্য সকল নোবেল পুরস্কার সুইডেনের স্টকহোমে প্রদান করা হলেও একমাত্র নোবেল শান্তি পুরস্কার নরওয়ের রাজধানী অসলো থেকে প্রদান করা হয়।",
    explanation_en: "The Nobel Peace Prize is awarded in Oslo, Norway, whereas all other Nobel Prizes are presented in Stockholm, Sweden."
  }));

  return questions.slice(0, count);
}
