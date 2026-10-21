// Generator for Bangladesh Affairs Questions (SUB-03)
// Comprehensive coverage across Ancient Bengal, Colonial Struggles, Language Movement, 
// Liberation War, Constitutional Articles, Governance, Economy, Agriculture, and Mega Projects.

export function getBangladeshQuestions(batchIndex, count = 40) {
  const b = batchIndex;
  const questions = [];

  function createQ(data) {
    const opts = { ...data.options };
    const correct = data.correct_option || "A";
    const uniqueVals = new Set(Object.values(opts));
    if (uniqueVals.size !== 4) {
      throw new Error(`Duplicate option detected in Bangladesh Affairs question: ${data.question_bn}`);
    }
    return {
      subject: "Bangladesh Affairs",
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
      source_title: data.source_title || "বাংলাদেশ বিষয়াবলী — বাংলাপিডিয়া ও জাতীয় শিক্ষাক্রম",
      source_page_or_section: data.source_page_or_section || "বাংলাদেশের ইতিহাস, সংবিধান ও জাতীয় অর্থনীতি",
      rights_status: "original_from_reference",
      verification_status: "verified"
    };
  }

  // --- SECTION 1: ANCIENT & MEDIEVAL BENGAL (5 Questions) ---

  // 1. Sasanka & Matsyanyaya
  questions.push(createQ({
    topic: "প্রাচীন বাংলার ইতিহাস ও রাজবংশ",
    subtopic: "শশাঙ্ক ও মাৎস্যন্যায় পর্ব",
    question_bn: `প্রাচীন বাংলার প্রথম স্বাধীন ও সার্বভৌম নরপতি হিসেবে পরিচিত রাজা শশাঙ্কের মৃত্যুর পর বাংলায় শতবর্ষব্যাপী বিরাজমান নৈরাজ্যময় অবস্থাকে কী বলা হয়? [বিডি ইতিহাস-${b}.১]`,
    question_en: `What is the century-long period of lawlessness and anarchy that engulfed Bengal following the death of King Sasanka called? [BD Hist-${b}.1]`,
    options: {
      A: "মাৎস্যন্যায় (Matsyanyaya)",
      B: "অন্ধকার যুগ",
      C: "সামন্তযুগ",
      D: "মহাসামন্ত পর্ব"
    },
    correct_option: "A",
    explanation_bn: "সপ্তম ও অষ্টম শতকে কেন্দ্রীয় শাসনের অভাবে ছোট মাছ যেমন বড় মাছের খাদ্য হয়, তেমনি দুর্বলের ওপর সবলের অত্যাচারের পর্বকে 'মাৎস্যন্যায়' বলা হয়।",
    explanation_en: "Matsyanyaya refers to the period of widespread disorder in early medieval Bengal before the election of Gopala."
  }));

  // 2. Pala Dynasty & Somapura Mahavihara
  questions.push(createQ({
    topic: "পাল সাম্রাজ্য ও বৌদ্ধ সংস্কৃতি",
    subtopic: "সোমপুর মহাবিহার প্রতিষ্ঠা",
    question_bn: `ইউনেস্কো বিশ্ব ঐতিহ্য হিসেবে ঘোষিত নওগাঁর পাহাড়পুরের 'সোমপুর মহাবিহার' পাল বংশের কোন শ্রেষ্ঠ সম্রাট নির্মাণ করেছিলেন? [বিডি ইতিহাস-${b}.২]`,
    question_en: `Somapura Mahavihara at Paharpur in Naogaon, a UNESCO World Heritage site, was established by which prominent Pala emperor? [BD Hist-${b}.2]`,
    options: {
      A: "ধর্মপাল (Dharmapala)",
      B: "গোপাল",
      C: "দেবপাল",
      D: "মহীপাল"
    },
    correct_option: "A",
    explanation_bn: "পাল বংশের দ্বিতীয় এবং সর্বশ্রেষ্ঠ শাসক সম্রাট ধর্মপাল (৭৭০-৮১০ খ্রিস্টাব্দ) পাহাড়পুরে এশিয়ার অন্যতম বৃহত্তম বৌদ্ধ বিহার নির্মাণ করেন।",
    explanation_en: "Emperor Dharmapala (r. 770–810 CE) built the immense Somapura Mahavihara at Paharpur."
  }));

  // 3. Muslim Rule & Bakhtiyar Khalji
  questions.push(createQ({
    topic: "মধ্যযুগীয় বাংলার সূচনা",
    subtopic: "ইখতিয়ার উদ্দীন মুহম্মদ বখতিয়ার খলজীর বাংলা বিজয়",
    question_bn: `তুর্কি সেনাপতি ইখতিয়ার উদ্দীন মুহম্মদ বখতিয়ার খলজী কত খ্রিস্টাব্দে সেন বংশের শেষ রাজা লক্ষণ সেনকে পরাজিত করে নদীয়া অধিকার করেন? [বিডি ইতিহাস-${b}.৩]`,
    question_en: `In which year did Ikhtiyar al-Din Muhammad Bakhtiyar Khalji conquer Nadia, initiating Muslim rule in Bengal? [BD Hist-${b}.3]`,
    options: {
      A: "১২০৪ বা ১২০৫ খ্রিস্টাব্দে",
      B: "১২০৬ খ্রিস্টাব্দে",
      C: "১২১২ খ্রিস্টাব্দে",
      D: "১১৯২ খ্রিস্টাব্দে"
    },
    correct_option: "A",
    explanation_bn: "১২০৪ সালে বখতিয়ার খলজী মাত্র ১৮ জন অশ্বারোহী সৈন্য নিয়ে নদীয়া আক্রমণ করে লক্ষণ সেনের রাজপ্রাসাদ জয় করেন।",
    explanation_en: "Bakhtiyar Khalji captured Nadia in 1204/1205 CE, displacing the Sena dynasty."
  }));

  // 4. Iliyas Shahi Dynasty & Bangalah identity
  questions.push(createQ({
    topic: "সুলতানি আমল — স্বাধীন বাংলা",
    subtopic: "শামসুদ্দীন ইলিয়াস শাহ ও শাহ-ই-বাঙ্গালাহ",
    question_bn: `সমগ্র বাংলাকে একত্র করে সর্বপ্রথম নিজেকে 'শাহ-ই-বাঙ্গালাহ' বা 'সুলতান-ই-বাঙ্গালাহ' উপাধিতে ভূষিত করেন কোন দূরদর্শী সুলতান? [বিডি ইতিহাস-${b}.৪]`,
    question_en: `Which Sultan unified Bengal and assumed the imperial title 'Shah-i-Bangalah' (King of Bengal)? [BD Hist-${b}.4]`,
    options: {
      A: "শামসুদ্দীন ইলিয়াস শাহ",
      B: "ফখরুদ্দীন মুবারক শাহ",
      C: "আলাউদ্দীন হোসেন শাহ",
      D: "গিয়াসউদ্দীন আজম শাহ"
    },
    correct_option: "A",
    explanation_bn: "১৩৫২ সালে শামসুদ্দীন ইলিয়াস শাহ সমগ্র বাংলাকে একত্রিত করে জাতীয় সংহতি প্রতিষ্ঠা করেন এবং শাহ-ই-বাঙ্গালাহ উপাধি নেন।",
    explanation_en: "Shamsuddin Iliyas Shah unified Bengal in 1352 CE, officially adopting the title 'Shah-i-Bangalah'."
  }));

  // 5. Mughal Dhaka & Subahdar Islam Khan
  questions.push(createQ({
    topic: "মুঘল সুবাহ বাংলা",
    subtopic: "ঢাকাকে রাজধানী ঘোষণা ও জাহাঙ্গীরনগর নামকরণ",
    question_bn: `মুঘল সুবাহদার ইসলাম খাঁ চিশতী কত সালে ঢাকাকে সুবাহ বাংলার প্রথম সুবাহদারি রাজধানী ঘোষণা করেন এবং এর নাম রাখেন 'জাহাঙ্গীরনগর'? [বিডি ইতিহাস-${b}.৫]`,
    question_en: `In which year did Mughal Subahdar Islam Khan Chishti declare Dhaka the provincial capital and rename it 'Jahangirnagar'? [BD Hist-${b}.5]`,
    options: {
      A: "১৬১০ খ্রিস্টাব্দে",
      B: "১৬০৫ খ্রিস্টাব্দে",
      C: "১৬৬৬ খ্রিস্টাব্দে",
      D: "১৭০৪ খ্রিস্টাব্দে"
    },
    correct_option: "A",
    explanation_bn: "১৬১০ সালে সম্রাট জাহাঙ্গীরের শাসনকালে সুবাহদার ইসলাম খাঁ চিশতী বারো-ভুঁইয়াদের দমন করে ঢাকাকে বাংলার রাজধানী স্থাপন করেন।",
    explanation_en: "Subahdar Islam Khan established Dhaka as Bengal's capital in 1610 CE, naming it Jahangirnagar in honor of Emperor Jahangir."
  }));

  // --- SECTION 2: COLONIAL RULE & RESISTANCE (5 Questions) ---

  // 6. Battle of Plassey 1757
  questions.push(createQ({
    topic: "ব্রিটিশ ঔপনিবেশিক শাসন প্রতিষ্ঠা",
    subtopic: "পলাশীর যুদ্ধ ও নবাব সিরাজউদ্দৌলার পতন",
    question_bn: `১৭৫৭ সালের ২৩শে জুন পলাশীর আম্রকাননে রবার্ট ক্লাইভের নেতৃত্বাধীন ব্রিটিশ ইস্ট ইন্ডিয়া কোম্পানির বিরুদ্ধে নবাব সিরাজউদ্দৌলার পরাজয়ের প্রধান কারণ কী ছিল? [ঔপনিবেশিক যুগ-${b}.৬]`,
    question_en: `What was the primary factor behind Nawab Siraj-ud-Daulah's defeat against Robert Clive's British forces at the Battle of Plassey on June 23, 1757? [Colonial-${b}.6]`,
    options: {
      A: "সেনাপতি মীর জাফর ও দরবারের প্রভাবশালী অমাত্যদের বিশ্বাসঘাতকতা",
      B: "নবাবের সৈন্যবাহিনীর প্রচণ্ড স্বল্পতা",
      C: "ফরাসিদের অস্ত্র সহায়তা প্রত্যাহার",
      D: "ক্লাইভের গোলন্দাজ বাহিনীর অবিস্মরণীয় শ্রেষ্ঠত্ব"
    },
    correct_option: "A",
    explanation_bn: "নবাবের প্রধান সেনাপতি মীর জাফর আলী খান যুদ্ধের ময়দানে সৈন্যবাহিনীকে পুতুলের মতো নিষ্ক্রিয় রেখে ব্রিটিশদের সাথে চরম বেইমানি করেন।",
    explanation_en: "The treason and premeditated non-engagement by Commander-in-Chief Mir Jafar sealed the Nawab's defeat at Plassey."
  }));

  // 7. Permanent Settlement 1793
  questions.push(createQ({
    topic: "ব্রিটিশ ভূমি রাজস্ব ব্যবস্থা",
    subtopic: "লর্ড কর্নওয়ালিসের চিরস্থায়ী বন্দোবস্ত (১৭৯৩)",
    question_bn: `১৭৯৩ সালে লর্ড কর্নওয়ালিস প্রবর্তিত 'চিরস্থায়ী বন্দোবস্ত' (Permanent Settlement) অনুসারে ভূমির চিরস্থায়ী মালিকানা কার ওপর ন্যস্ত করা হয়েছিল? [ঔপনিবেশিক যুগ-${b}.৭]`,
    question_en: `Under the Permanent Settlement introduced by Lord Cornwallis in 1793, to whom was permanent hereditary land ownership granted? [Colonial-${b}.7]`,
    options: {
      A: "জমিদারদের ওপর (ভূমি রাজস্বের বিনিময়ে)",
      B: "প্রকৃত চাষী ও প্রজাদের ওপর",
      C: "ব্রিটিশ গভর্নর জেনারেলের ওপর",
      D: "গ্রাম পঞ্চায়েতের ওপর"
    },
    correct_option: "A",
    explanation_bn: "চিরস্থায়ী বন্দোবস্তের মাধ্যমে সরকার নির্দিষ্ট পরিমাণ খাজনার বিনিময়ে জমিদারদের ভূমির চূড়ান্ত ও বংশানুক্রমিক স্বত্ব প্রদান করে।",
    explanation_en: "The Permanent Settlement made the Zamindars the permanent proprietary owners of agricultural lands subject to fixed revenue."
  }));

  // 8. Titumir's Bamboo Fort (বাঁশের কেল্লা)
  questions.push(createQ({
    topic: "ব্রিটিশ বিরোধী গণআন্দোলন",
    subtopic: "তিতুমীরের বাঁশের কেল্লা ও নারকেলবাড়িয়া সংগ্রাম",
    question_bn: `ব্রিটিশ নীলকর ও জমিদারদের অত্যাচারের বিরুদ্ধে ১৮৩১ সালে চব্বিশ পরগনার নারকেলবাড়িয়ায় বিখ্যাত 'বাঁশের কেল্লা' নির্মাণ করে শহীদ হন কোন বীর সংগ্রামী? [ঔপনিবেশিক যুগ-${b}.৮]`,
    question_en: `Which heroic freedom fighter built the historic Bamboo Fort (Basher Kella) at Narkelbaria in 1831 resisting British indigo planters? [Colonial-${b}.8]`,
    options: {
      A: "সৈয়দ মীর নিসার আলী (তিতুমীর)",
      B: "হাজী শরীয়তুল্লাহ",
      C: "দুদু মিয়া",
      D: "মজনু শাহ"
    },
    correct_option: "A",
    explanation_bn: "তিতুমীর ১৮৩১ সালের ১৯শে নভেম্বর ব্রিটিশ ক্যাপ্টেন আলেকজান্ডারের গোলন্দাজ বাহিনীর বিরুদ্ধে কামান-বন্দুকের বিপরীতে বাঁশের কেল্লায় যুদ্ধ করে শহীদ হন।",
    explanation_en: "Syed Mir Nisar Ali (Titumir) fell heroically defending his Bamboo Fort against British artillery on November 19, 1831."
  }));

  // 9. Partition of Bengal (1905) & Annulment (1911)
  questions.push(createQ({
    topic: "জাতীয়তাবাদী আন্দোলন ও বঙ্গভঙ্গ",
    subtopic: "১৯০৫ সালের বঙ্গভঙ্গ ও লর্ড কার্জন",
    question_bn: `১৯০৫ সালে লর্ড কার্জন কর্তৃক ঘোষিত বঙ্গভঙ্গের ফলে গঠিত নতুন 'পূর্ববঙ্গ ও আসাম' প্রদেশের প্রথম লেফটেন্যান্ট গভর্নর কে নিযুক্ত হয়েছিলেন? [ঔপনিবেশিক যুগ-${b}.৯]`,
    question_en: `Who was appointed the first Lieutenant Governor of the newly created province of 'Eastern Bengal and Assam' following the 1905 Partition? [Colonial-${b}.9]`,
    options: {
      A: "স্যার জোসেফ ব্যামফিল্ড ফুলার (Bampfylde Fuller)",
      B: "লর্ড কার্জন",
      C: "লর্ড মিন্টো",
      D: "স্যার অ্যান্ড্রিউ ফ্রেজার"
    },
    correct_option: "A",
    explanation_bn: "১৯০৫ সালের ১৬ই অক্টোবর কার্যকর বঙ্গভঙ্গে ঢাকাকে রাজধানী করে গঠিত পূর্ববঙ্গ ও আসাম প্রদেশের প্রথম ছোটলাট হন ব্যামফিল্ড ফুলার।",
    explanation_en: "Sir Bampfylde Fuller served as the first Lieutenant Governor of Eastern Bengal and Assam (capital at Dhaka)."
  }));

  // 10. Historic Lahore Resolution 1940
  questions.push(createQ({
    topic: "পাকিস্তান প্রস্তাব ও লাহোর প্রস্তাব",
    subtopic: "শেরে বাংলা এ. কে. ফজলুল হক ও লাহোর প্রস্তাব",
    question_bn: `১৯৪০ সালের ২৩শে মার্চ লাহোরে নিখিল ভারত মুসলিম লীগের বার্ষিক অধিবেশনে ঐতিহাসিক 'লাহোর প্রস্তাব' আনুষ্ঠানিকভাবে উত্থাপন করেন কে? [রাজনৈতিক ইতিহাস-${b}.১০]`,
    question_en: `Who formally moved the historic Lahore Resolution at the Muslim League's annual session on March 23, 1940? [Pol Hist-${b}.10]`,
    options: {
      A: "শেরে বাংলা এ. কে. ফজলুল হক",
      B: "মুহাম্মদ আলী জিন্নাহ",
      C: "হোসেন শহীদ সোহরাওয়ার্দী",
      D: "লিয়াকত আলী খান"
    },
    correct_option: "A",
    explanation_bn: "বাংলার অবিসংবাদিত নেতা ও তৎকালীন প্রধানমন্ত্রী শেরে বাংলা এ. কে. ফজলুল হক স্বাধীন মুসলিম রাষ্ট্রসমূহের (States) রূপরেখা সম্বলিত লাহোর প্রস্তাব পেশ করেন।",
    explanation_en: "Sher-e-Bangla A. K. Fazlul Huq presented the landmark Lahore Resolution calling for autonomous, sovereign states."
  }));

  // --- SECTION 3: 1947–1971 STRUGGLE FOR AUTONOMY (6 Questions) ---

  // 11. Language Movement & 21st February 1952
  questions.push(createQ({
    topic: "ভাষা আন্দোলন ও বাঙালি জাতীয়তাবাদ",
    subtopic: "১৯৫২ সালের ২১শে ফেব্রুয়ারির শহীদগণ",
    question_bn: `১৯৫২ সালের ২১শে ফেব্রুয়ারি বাংলাকে রাষ্ট্রভাষা করার দাবিতে ১৪৪ ধারা ভেঙে ঢাকা মেডিকেল কলেজের সামনে মিছিলে পুলিশের গুলিতে শহীদ হওয়া প্রথম ব্যক্তি কে? [ভাষা আন্দোলন-${b}.১১]`,
    question_en: `Who was among the first martyrs shot dead when police opened fire on language demonstrators breaking Section 144 on February 21, 1952? [Language Movement-${b}.11]`,
    options: {
      A: "রফিক উদ্দিন আহমদ",
      B: "আবুল বরকত",
      C: "আব্দুস সালাম",
      D: "শফিউর রহমান"
    },
    correct_option: "A",
    explanation_bn: "২১শে ফেব্রুয়ারি পুলিশের গুলিতে রফিক উদ্দিন আহমদের মাথায় গুলি লেগে ঘটনাস্থলেই শাহাদাত বরণ করেন। একই দিনে বরকত ও জব্বার শহীদ হন।",
    explanation_en: "Rafiq Uddin Ahmad was martyred on the spot outside Dhaka Medical College; Barkat and Jabbar died later that evening."
  }));

  // 12. UNESCO Recognition of Mother Language Day
  questions.push(createQ({
    topic: "ভাষা আন্দোলনের আন্তর্জাতিক স্বীকৃতি",
    subtopic: "আন্তর্জাতিক মাতৃভাষা দিবস ঘোষণা",
    question_bn: `ইউনেস্কো (UNESCO) কত সালের কোন ঐতিহাসিক তারিখে ২১শে ফেব্রুয়ারিকে বিশ্বব্যাপী 'আন্তর্জাতিক মাতৃভাষা দিবস' হিসেবে সর্বসম্মত স্বীকৃতি প্রদান করে? [ভাষা আন্দোলন-${b}.১২]`,
    question_en: `On which historic date did UNESCO unanimously declare February 21 as 'International Mother Language Day'? [Language Movement-${b}.12]`,
    options: {
      A: "১৭ই নভেম্বর ১৯৯৯",
      B: "২১শে ফেব্রুয়ারি ২০০০",
      C: "২৬শে মার্চ ১৯৯৮",
      D: "১৬ই ডিসেম্বর ১৯৯৯"
    },
    correct_option: "A",
    explanation_bn: "ইউনেস্কোর ৩০তম সাধারণ অধিবেশনে ১৯৯৯ সালের ১৭ই নভেম্বর ২১শে ফেব্রুয়ারিকে আন্তর্জাতিক মাতৃভাষা দিবস ঘোষণা করা হয় এবং ২০০০ সাল থেকে তা পালিত হচ্ছে।",
    explanation_en: "UNESCO's 30th General Conference adopted the resolution on November 17, 1999."
  }));

  // 13. United Front Election 1954 (যুক্তফ্রন্ট)
  questions.push(createQ({
    topic: "যুক্তফ্রন্ট নির্বাচন ও ২১ দফা",
    subtopic: "১৯৫৪ সালের নির্বাচনে যুক্তফ্রন্টের নির্বাচনী প্রতীক",
    question_bn: `১৯৫৪ সালের পূর্ব বাংলা প্রাদেশিক নির্বাচনে আওয়ামী লীগ, কৃষক শ্রমিক পার্টি ও অন্যান্য দল সমন্বয়ে গঠিত যুক্তফ্রন্টের নির্বাচনী প্রতীক কী ছিল? [যুক্তফ্রন্ট-${b}.১৩]`,
    question_en: `What was the official election symbol of the United Front coalition in the 1954 East Bengal legislative election? [United Front-${b}.13]`,
    options: {
      A: "নৌকা (Boat)",
      B: "লাঙ্গল",
      C: "হাতপাখা",
      D: "ধানের শিষ"
    },
    correct_option: "A",
    explanation_bn: "১৯৫৪ সালের নির্বাচনে যুক্তফ্রন্টের ২১ দফার ভিত্তিতে প্রতীক ছিল 'নৌকা'। ২৩৭টি মুসলিম আসনের মধ্যে যুক্তফ্রন্ট রেকর্ড ২২৩টি আসনে বিজয় লাভ করে।",
    explanation_en: "The United Front contested on the 'Boat' symbol, winning a landslide 223 out of 237 Muslim seats."
  }));

  // 14. Historic Six-Point Movement 1966
  questions.push(createQ({
    topic: "বাঙালির মুক্তির সনদ — ৬ দফা কর্মসূচি",
    subtopic: "বঙ্গবন্ধু কর্তৃক ৬ দফা পেশ ও লাহোর সম্মেলন",
    question_bn: `১৯৬৬ সালের ৫-৬ই ফেব্রুয়ারি লাহোরে অনুষ্ঠিত সর্বদলীয় বিরোধী জাতীয় সম্মেলনে ঐতিহাসিক ৬-দফা দাবি আনুষ্ঠানিকভাবে প্রথম কে উত্থাপন করেন? [ছয় দফা-${b}.১৪]`,
    question_en: `Who officially presented the historic Six-Point Charter of Demands at the opposition conference in Lahore on February 5-6, 1966? [Six Points-${b}.14]`,
    options: {
      A: "বঙ্গবন্ধু শেখ মুজিবুর রহমান",
      B: "তাজউদ্দীন আহমদ",
      C: "নবাবজাদা নসরুল্লাহ খান",
      D: "মাওলানা ভাসানী"
    },
    correct_option: "A",
    explanation_bn: "বঙ্গবন্ধু শেখ মুজিবুর রহমান বাঙালির স্বাধিকার ও অর্থনৈতিক মুক্তির দলিল হিসেবে ৬-দফা পেশ করেন যা পরবর্তীতে 'ম্যাগনাকার্টা অব বেঙ্গল' হিসেবে স্বীকৃতি পায়।",
    explanation_en: "Bangabandhu Sheikh Mujibur Rahman tabled the Six-Point charter, known as the Magna Carta of Bengal."
  }));

  // 15. Agartala Conspiracy Case 1968
  questions.push(createQ({
    topic: "আগরতলা ষড়যন্ত্র মামলা",
    subtopic: "মামলার আনুষ্ঠানিক নাম ও প্রধান আসামি",
    question_bn: `আইয়ুব খান সরকার কর্তৃক ১৯৬৮ সালে দায়েরকৃত আগরতলা ষড়যন্ত্র মামলার আনুষ্ঠানিক দাপ্তরিক নাম কী ছিল? [আগরতলা মামলা-${b}.১৫]`,
    question_en: `What was the official state title of the 1968 Agartala Conspiracy Case instituted by the Ayub regime? [Agartala Case-${b}.15]`,
    options: {
      A: "রাষ্ট্র বনাম শেখ মুজিবুর রহমান ও অন্যান্য (State vs. Sheikh Mujibur Rahman and others)",
      B: "পূর্ব পাকিস্তান বিচ্ছিন্নতাবাদী মামলা",
      C: "ঢাকা বিদ্রোহ মামলা",
      D: "আগরতলা রাষ্ট্রদ্রোহ মামলা"
    },
    correct_option: "A",
    explanation_bn: "৩৫ জন বাঙালি সেনা ও সিভিলিয়ানদের বিরুদ্ধে রাষ্ট্রদ্রোহিতার অভিযোগে দায়েরকৃত এই মামলার ১ নম্বর আসামি ছিলেন বঙ্গবন্ধু শেখ মুজিবুর রহমান।",
    explanation_en: "The official case title was 'State vs. Sheikh Mujibur Rahman and others' involving 35 accused."
  }));

  // 16. 1969 Mass Uprising & Bangabandhu Title
  questions.push(createQ({
    topic: "উনসত্তরের গণঅভ্যুত্থান",
    subtopic: "'বঙ্গবন্ধু' উপাধি প্রদান",
    question_bn: `১৯৬৯ সালের ২৩শে ফেব্রুয়ারি রেসকোর্স ময়দানের ঐতিহাসিক গণসংবর্ধনায় শেখ মুজিবুর রহমানকে সর্বসম্মতভাবে 'বঙ্গবন্ধু' উপাধিতে ভূষিত করেন কে? [গণঅভ্যুত্থান-${b}.১৬]`,
    question_en: `Who conferred the historic title 'Bangabandhu' upon Sheikh Mujibur Rahman on February 23, 1969 at the Race Course Ground? [Mass Uprising-${b}.16]`,
    options: {
      A: "ছাত্রনেতা তোফায়েল আহমেদ (ডাকসু ভিপি)",
      B: "মওলানা ভাসানী",
      C: "তাজউদ্দীন আহমদ",
      D: "নূরে আলম সিদ্দিকী"
    },
    correct_option: "A",
    explanation_bn: "কেন্দ্রীয় ছাত্র সংগ্রাম পরিষদের পক্ষ থেকে লাখো জনতার উপস্থিতিতে তৎকালীন ডাকসু ভিপি ও ছাত্র সংগ্রাম পরিষদের আহ্বায়ক তোফায়েল আহমেদ এই উপাধি দেন।",
    explanation_en: "DUCSU VP Tofail Ahmed bestowed the title 'Bangabandhu' (Friend of Bengal) on behalf of the student mass movement."
  }));

  // --- SECTION 4: 1971 LIBERATION WAR (8 Questions) ---

  // 17. 7th March Speech & UNESCO Memory of the World
  questions.push(createQ({
    topic: "ঐতিহাসিক ৭ই মার্চের ভাষণ",
    subtopic: "ভাষণের ইউনেস্কো স্বীকৃতি",
    question_bn: `বঙ্গবন্ধু শেখ মুজিবুর রহমানের ঐতিহাসিক ৭ই মার্চের ভাষণকে ইউনেস্কো (UNESCO) কোন ক্যাটাগরিতে বিশ্ব প্রামাণ্য ঐতিহ্য হিসেবে স্বীকৃতি দিয়েছে? [মুক্তিযুদ্ধ-${b}.১৭]`,
    question_en: `Under which prestigious international register did UNESCO inscribe Bangabandhu's Historic 7th March Speech in 2017? [Liberation War-${b}.17]`,
    options: {
      A: "মেমোরি অব দ্য ওয়ার্ল্ড ইন্টারন্যাশনাল রেজিস্টার (Memory of the World)",
      B: "বিশ্ব সাংস্কৃতিক ঐতিহ্য",
      C: "অদৃশ্য সাংস্কৃতিক ঐতিহ্য (Intangible Heritage)",
      D: "বিশ্ব মানবতা দলিল"
    },
    correct_option: "A",
    explanation_bn: "২০১৭ সালের ৩০শে অক্টোবর ইউনেস্কো বঙ্গবন্ধুর ৭ই মার্চের স্বাধীনতার দিকনির্দেশনামূলক ভাষণকে আন্তর্জাতিক মেমোরি অব দ্য ওয়ার্ল্ডের অংশ হিসেবে অন্তর্ভুক্ত করে।",
    explanation_en: "UNESCO inscribed the speech in the Memory of the World Register as a documentary heritage of world significance on October 30, 2017."
  }));

  // 18. Operation Searchlight (25 March 1971)
  questions.push(createQ({
    topic: "কালরাত ও অপারেশন সার্চলাইট",
    subtopic: "২৫শে মার্চের পাকিস্তানি গণহত্যা পরিকল্পনা",
    question_bn: `১৯৭১ সালের ২৫শে মার্চ রাতে পাকিস্তানি সামরিক জান্তা নিরীহ বাঙালিদের ওপর বর্বরোচিত যে সশস্ত্র নিধনযজ্ঞ পরিচালনা করে তার সামরিক কোডনেম কী ছিল? [মুক্তিযুদ্ধ-${b}.১৮]`,
    question_en: `What was the military operational codename for the genocidal crackdown launched on unarmed Bengalis by the Pakistani military on March 25, 1971? [Liberation War-${b}.18]`,
    options: {
      A: "অপারেশন সার্চলাইট (Operation Searchlight)",
      B: "অপারেশন চেঙ্গিস খান",
      C: "অপারেশন ক্লোজ ডোর",
      D: "অপারেশন জ্যাকপট"
    },
    correct_option: "A",
    explanation_bn: "জেনারেল টিক্কা খান ও খাদিম হুসাইন রাজার তত্ত্বাবধানে পরিচালিত অপারেশন সার্চলাইটের মাধ্যমে ঢাকা বিশ্ববিদ্যালয়, রাজারবাগ ও সারা দেশে গণহত্যা শুরু হয়।",
    explanation_en: "'Operation Searchlight' was the military operation ordered by General Yahya Khan to crush the Bengali nationalist movement."
  }));

  // 19. Declaration of Independence (26 March 1971)
  questions.push(createQ({
    topic: "স্বাধীনতার আনুষ্ঠানিক ঘোষণা",
    subtopic: "২৬শে মার্চের প্রথম প্রহরে স্বাধীনতার ঘোষণা",
    question_bn: `১৯৭১ সালের ২৬শে মার্চ প্রথম প্রহরে গ্রেপ্তার হওয়ার পূর্বে বঙ্গবন্ধু কোন ওয়্যারলেস মাধ্যমে বাংলাদেশের স্বাধীনতার ঘোষণা বার্তাটি সারাদেশে প্রেরণ করেন? [মুক্তিযুদ্ধ-${b}.১৯]`,
    question_en: `Through which wireless transmission network did Bangabandhu broadcast the Declaration of Independence in the early hours of March 26, 1971? [Liberation War-${b}.19]`,
    options: {
      A: "ইপিআর (EPR) এর ওয়ারলেস ট্রান্সমিটার",
      B: "বাংলাদেশ বেতার",
      C: "টেলিগ্রাফ টেলিগ্রাফ লাইন",
      D: "ঢাকা পুলিশ কন্ট্রোল"
    },
    correct_option: "A",
    explanation_bn: "ধানমন্ডির ৩২ নম্বর থেকে ইপিআরের পিলখানা ওয়্যারলেসের বিশেষ ফ্রিকোয়েন্সিতে বঙ্গবন্ধু স্বাধীনতার মূল ঘোষণা পাঠান যা চট্টগ্রামসহ সারাদেশে প্রচারিত হয়।",
    explanation_en: "Bangabandhu transmitted the declaration using the East Pakistan Rifles (EPR) dedicated wireless communications."
  }));

  // 20. Mujibnagar Government (10 April & 17 April 1971)
  questions.push(createQ({
    topic: "মুজিবনগর সরকার গঠন ও শপথ গ্রহণ",
    subtopic: "প্রথম সরকারের শপথ গ্রহণ ও নেতৃবৃন্দ",
    question_bn: `১৯৭১ সালের ১৭ই এপ্রিল গণপ্রজাতন্ত্রী বাংলাদেশের প্রথম সরকারের শপথ গ্রহণ অনুষ্ঠানটি মেহেরপুরের বৈদ্যনাথতলার কোন আম্রকাননে অনুষ্ঠিত হয়েছিল? [মুজিবনগর-${b}.২০]`,
    question_en: `At which mango grove in Baidyanathtala, Meherpur was the historic swearing-in of the Mujibnagar Government solemnized on April 17, 1971? [Mujibnagar-${b}.20]`,
    options: {
      A: "ভবেরপাড়া গ্রামের বৈদ্যনাথতলা (মুজিবনগর)",
      B: "শালিখা আমবাগান",
      C: "আমঝুপি বাগান",
      D: "গোয়ালন্দ ঘাট"
    },
    correct_option: "A",
    explanation_bn: "মেহেরপুরের ভবেরপাড়া গ্রামে সৈয়দ নজরুল ইসলাম অস্থায়ী রাষ্ট্রপতি এবং তাজউদ্দীন আহমদ প্রধানমন্ত্রী হিসেবে শপথ নেন এবং স্থানটির নামকরণ হয় 'মুজিবনগর'।",
    explanation_en: "The historic oath took place at Baidyanathtala in Bhaberpara village, Meherpur, renamed 'Mujibnagar'."
  }));

  // 21. Sectors & Commanders: 11 Sectors
  const secList = [
    { sec: 1, cmd: "মেজর জিয়াউর রহমান (পরবর্তীতে রফিকুল ইসলাম)", area: "চট্টগ্রাম ও পার্বত্য চট্টগ্রাম" },
    { sec: 2, cmd: "মেজর খালেদ মোশাররফ (পরবর্তীতে মেজর এটিএম হায়দার)", area: "ঢাকা, কুমিল্লা ও ফরিদপুরের কিছু অংশ" },
    { sec: 3, cmd: "মেজর কে এম শফিউল্লাহ (পরবর্তীতে মেজর নূরুজ্জামান)", area: "কিশোরগঞ্জ ও ময়মনসিংহের কিছু অংশ" },
    { sec: 8, cmd: "মেজর আবু ওসমান চৌধুরী (পরবর্তীতে মেজর এম এ মঞ্জুর)", area: "কুষ্টিয়া, যশোর ও খুলনা" }
  ];
  const sInfo = secList[b % secList.length];
  questions.push(createQ({
    topic: "মুক্তিযুদ্ধের সেক্টর বিন্যাস ও কমান্ডার",
    subtopic: `সেক্টর ${sInfo.sec}-এর দায়িত্বপ্রাপ্ত সেক্টর কমান্ডার`,
    question_bn: `১৯৭১ সালের মুক্তিযুদ্ধে '${sInfo.area}' অঞ্চলটি কোন সেক্টরের অন্তর্ভুক্ত ছিল এবং এর কমান্ডার কে ছিলেন? [সেক্টর-${b}.২১]`,
    question_en: `During the 1971 Liberation War, which sector covered '${sInfo.area}' and who was its commander? [Sector-${b}.21]`,
    options: {
      A: `সেক্টর ${sInfo.sec}; কমান্ডার: ${sInfo.cmd}`,
      B: `সেক্টর ${sInfo.sec + 2}; কমান্ডার: মেজর জলিল`,
      C: `সেক্টর ৯; কমান্ডার: এম এ জলিল`,
      D: `সেক্টর ৪; কমান্ডার: সি আর দত্ত`
    },
    correct_option: "A",
    explanation_bn: `মুক্তিযুদ্ধকে সুসংগঠিত করতে সমগ্র বাংলাদেশকে ১১টি সেক্টরে ভাগ করা হয় যার মধ্যে সেক্টর ${sInfo.sec} এর দায়িত্বে ছিলেন ${sInfo.cmd}।`,
    explanation_en: `Bangladesh was divided into 11 military sectors; Sector ${sInfo.sec} was commanded by ${sInfo.cmd}.`
  }));

  // 22. Sector 10 (Naval Commando - নো রেগুলার কমান্ডার)
  questions.push(createQ({
    topic: "মুক্তিযুদ্ধের সেক্টর বিন্যাস",
    subtopic: "সেক্টর ১০-এর বিশেষত্ব",
    question_bn: `১৯৭১ সালের মুক্তিযুদ্ধের কোন সেক্টরটিতে কোনো স্থায়ী নিয়মিত সেক্টর কমান্ডার ছিলেন না এবং এটি সরাসরি প্রধান সেনাপতির অধীনে পরিচালিত হতো? [সেক্টর ১০-${b}.২২]`,
    question_en: `Which sector during the 1971 Liberation War had no permanent sector commander and operated under the C-in-C directly? [Sector 10-${b}.22]`,
    options: {
      A: "১০ নম্বর সেক্টর (নৌ সেক্টর)",
      B: "১ নম্বর সেক্টর",
      C: "১১ নম্বর সেক্টর",
      D: "৭ নম্বর সেক্টর"
    },
    correct_option: "A",
    explanation_bn: "১০ নম্বর নৌ কমান্ডো সেক্টরে কোনো নির্দিষ্ট ভৌগোলিক সীমানা বা স্থায়ী কমান্ডার ছিল না; হেডকোয়ার্টারের প্রত্যক্ষ কমান্ডে 'অপারেশন জ্যাকপট' পরিচালিত হয়।",
    explanation_en: "Sector 10 had no regular sector commander; it consisted of naval commandos executing specialized operations directly under GHQ."
  }));

  // 23. Seven Bir Sreshtho Heroes
  const birPool = [
    { name: "ক্যাপ্টেন মহিউদ্দিন জাহাঙ্গীর", force: "বাংলাদেশ সেনাবাহিনী", loc: "চাঁপাইনবাবগঞ্জের রেহাইচর", date: "১৪ই ডিসেম্বর ১৯৭১" },
    { name: "ফ্লাইট লেফটেন্যান্ট মতিউর রহমান", force: "বাংলাদেশ বিমান বাহিনী", loc: "সিন্ধুর থাট্টা (পাকিস্তান)", date: "২০শে আগস্ট ১৯৭১" },
    { name: "ল্যান্স নায়েক মুন্সী আব্দুর রউফ", force: "ইপিআর (বর্তমানে বিজিবি)", loc: "বুড়িঘাট (রাঙ্গামাটি)", date: "৮ই এপ্রিল ১৯৭১" },
    { name: "ইঞ্জিনরুম আর্টিফিসার মো. রুহুল আমিন", force: "বাংলাদেশ নৌবাহিনী", loc: "রূপসা নদী (খুলনা)", date: "১০ই ডিসেম্বর ১৯৭১" }
  ];
  const bs = birPool[b % birPool.length];
  questions.push(createQ({
    topic: "মুক্তিযুদ্ধের বীরশ্রেষ্ঠ খেতাবপ্রাপ্ত শহীদ",
    subtopic: `${bs.name}-এর পরিচয় ও বীরত্ব`,
    question_bn: `সর্বোচ্চ সামরিক বীরত্ব খেতাবপ্রাপ্ত বীরশ্রেষ্ঠ শহীদ '${bs.name}' কোন বাহিনীর সদস্য ছিলেন? [বীরশ্রেষ্ঠ-${b}.২৩]`,
    question_en: `Highest gallantry awardee Bir Sreshtho martyr '${bs.name}' was an active member of which armed service? [Bir Sreshtho-${b}.23]`,
    options: {
      A: bs.force,
      B: "বাংলাদেশ পুলিশ",
      C: "আনসার ও ভিডিপি",
      D: "বীর মুক্তিযোদ্ধা বেসামরিক দল"
    },
    correct_option: "A",
    explanation_bn: `বীরশ্রেষ্ঠ ${bs.name} ${bs.force}-এর সদস্য হিসেবে বীরত্বের সাথে যুদ্ধ করে ${bs.loc}-এ শহীদ হন।`,
    explanation_en: `Bir Sreshtho ${bs.name} served valiantly in the ${bs.force}, martyred at ${bs.loc}.`
  }));

  // 24. Instrument of Surrender (16 December 1971)
  questions.push(createQ({
    topic: "চূড়ান্ত বিজয় ও ঐতিহাসিক আত্মসমর্পণ",
    subtopic: "১৬ই ডিসেম্বরের আত্মসমর্পণ দলিল",
    question_bn: `১৯৭১ সালের ১৬ই ডিসেম্বর তৎকালীন রেসকোর্স ময়দানে পাকিস্তান সেনাবাহিনীর পক্ষে আত্মসমর্পণ দলিলে স্বাক্ষর করেন কে? [বিজয় দিবস-${b}.২৪]`,
    question_en: `Who signed the historic Instrument of Surrender on behalf of the Pakistan Armed Forces on December 16, 1971? [Victory Day-${b}.24]`,
    options: {
      A: "লেফটেন্যান্ট জেনারেল এ. এ. কে. নিয়াজী",
      B: "জেনারেল টিক্কা খান",
      C: "মেজর জেনারেল রাও ফরমান আলী",
      D: "জেনারেল ইয়াহিয়া খান"
    },
    correct_option: "A",
    explanation_bn: "লেফটেন্যান্ট জেনারেল জগজিৎ সিং অরোরা (যৌথ বাহিনীর প্রধান)-এর কাছে পাকিস্তানের ৯৩ হাজার সৈন্যসহ জেনারেল নিয়াজী আত্মসমর্পণ পত্রে স্বাক্ষর করেন।",
    explanation_en: "Lt. Gen. A. A. K. Niazi signed the Instrument of Surrender accepting unconditional surrender to Lt. Gen. Jagjit Singh Aurora."
  }));

  // --- SECTION 5: CONSTITUTION OF BANGLADESH (8 Questions) ---

  // 25. Constitutional Drafting & Adoption Dates
  questions.push(createQ({
    topic: "গণপ্রজাতন্ত্রী বাংলাদেশের সংবিধান প্রণয়ন",
    subtopic: "সংবিধান গৃহীত ও কার্যকর হওয়ার তারিখ",
    question_bn: `বাংলাদেশ গণপরিষদে সংবিধান কোন তারিখে সর্বসম্মতভাবে গৃহীত হয় এবং কোন তারিখে আনুষ্ঠানিকভাবে কার্যকর হয়? [সংবিধান-${b}.২৫]`,
    question_en: `On which date was the Constitution adopted by the Constituent Assembly, and when did it take official effect? [Constitution-${b}.25]`,
    options: {
      A: "গৃহীত: ৪ঠা নভেম্বর ১৯৭২; কার্যকর: ১৬ই ডিসেম্বর ১৯৭২",
      B: "গৃহীত: ১৬ই ডিসেম্বর ১৯৭২; কার্যকর: ২৬শে মার্চ ১৯৭৩",
      C: "গৃহীত: ১০ই এপ্রিল ১৯৭২; কার্যকর: ৪ঠা নভেম্বর ১৯৭২",
      D: "গৃহীত: ২৬শে মার্চ ১৯৭২; কার্যকর: ১৬ই ডিসেম্বর ১৯৭২"
    },
    correct_option: "A",
    explanation_bn: "ড. কামাল হোসেনের সভাপতিত্বে ৩৪ সদস্যের সংবিধান খসড়া কমিটি প্রণীত সংবিধান ১৯৭২ সালের ৪ঠা নভেম্বর গণপরিষদে গৃহীত এবং ১৬ই ডিসেম্বর কার্যকর হয়।",
    explanation_en: "The Constitution was adopted on November 4, 1972 and came into force on Victory Day, December 16, 1972."
  }));

  // 26. Fundamental Principles: Part II
  questions.push(createQ({
    topic: "সংবিধানের মূলনীতিসমূহ — দ্বিতীয় ভাগ",
    subtopic: "রাষ্ট্র পরিচালনার মূল চার নীতি",
    question_bn: `বাংলাদেশ সংবিধানের মূলনীতি হিসেবে রাষ্ট্র পরিচালনার যে চারটি মৌলিক ভিত্তি অনুচ্ছেদ ৮-এ উল্লিখিত হয়েছে, তা কী কী? [সংবিধান-${b}.২৬]`,
    question_en: `What are the four fundamental principles of state policy enshrined in Article 8 of the Bangladesh Constitution? [Constitution-${b}.26]`,
    options: {
      A: "জাতীয়তাবাদ, সমাজতন্ত্র, গণতন্ত্র এবং ধর্মনিরপেক্ষতা",
      B: "সার্বভৌমত্ব, সততা, সমতা ও ভ্রাতৃত্ব",
      C: "আইনের শাসন, মানবাধিকার, অর্থনৈতিক মুক্তি ও ঐক্য",
      D: "ইসলামিক প্রজাতন্ত্র, পুঁজিবাদ, বিচারিক স্বাধীনতা ও শান্তি"
    },
    correct_option: "A",
    explanation_bn: "সংবিধানের দ্বিতীয় ভাগের ৮ নম্বর অনুচ্ছেদে রাষ্ট্র পরিচালনার চার মূলনীতি: জাতীয়তাবাদ, সমাজতন্ত্র, গণতন্ত্র ও ধর্মনিরপেক্ষতা নিশ্চিত করা হয়েছে।",
    explanation_en: "Article 8 specifies the 4 pillars: Nationalism, Socialism, Democracy, and Secularism."
  }));

  // 27. Article 27: Equality before Law
  questions.push(createQ({
    topic: "মৌলিক অধিকার — তৃতীয় ভাগ",
    subtopic: "আইনের দৃষ্টিতে সমতা — অনুচ্ছেদ ২৭",
    question_bn: `বাংলাদেশ সংবিধানের কোন অনুচ্ছেদে 'সকল নাগরিক আইনের দৃষ্টিতে সমান এবং আইনের সমান আশ্রয় লাভের অধিকারী' নিশ্চিত করা হয়েছে? [সংবিধান-${b}.২৭]`,
    question_en: `Which article of the Constitution of Bangladesh guarantees that 'all citizens are equal before law and are entitled to equal protection of law'? [Constitution-${b}.27]`,
    options: {
      A: "অনুচ্ছেদ ২৭",
      B: "অনুচ্ছেদ ১৯",
      C: "অনুচ্ছেদ ৩১",
      D: "অনুচ্ছেদ ৩২"
    },
    correct_option: "A",
    explanation_bn: "অনুচ্ছেদ ২৭ হলো সমতার প্রধান রক্ষাকবচ যা আইনের সমপ্রয়োগ ও বৈষম্যহীনতার সাংবিধানিক নিশ্চয়তা দেয়।",
    explanation_en: "Article 27 strictly establishes the fundamental right to equality before the law."
  }));

  // 28. Article 32: Protection of Right to Life
  questions.push(createQ({
    topic: "মৌলিক অধিকারসমূহ",
    subtopic: "জীবন ও ব্যক্তি স্বাধীনতার অধিকার — অনুচ্ছেদ ৩২",
    question_bn: `সংবিধানের কত নম্বর অনুচ্ছেদে 'আইনানুযায়ী ব্যতীত জীবন ও ব্যক্তি-স্বাধীনতা হইতে কোন ব্যক্তিকে বঞ্চিত করা যাইবে না' বিধান রয়েছে? [সংবিধান-${b}.২৮]`,
    question_en: `Which article ensures that 'no person shall be deprived of life or personal liberty, save in accordance with law'? [Constitution-${b}.28]`,
    options: {
      A: "অনুচ্ছেদ ৩২",
      B: "অনুচ্ছেদ ২৯",
      C: "অনুচ্ছেদ ৩৬",
      D: "অনুচ্ছেদ ৩৯"
    },
    correct_option: "A",
    explanation_bn: "অনুচ্ছেদ ৩২ মানুষের জীবনের অধিকার ও ব্যক্তিগত স্বাধীনতার সর্বোচ্চ সাংবিধানিক নিরাপত্তা প্রদান করে।",
    explanation_en: "Article 32 guarantees protection of the right to life and personal liberty."
  }));

  // 29. Article 39: Freedom of Thought, Conscience & Speech
  questions.push(createQ({
    topic: "মৌলিক অধিকারসমূহ",
    subtopic: "চিন্তা ও বিবেকের স্বাধীনতা এবং বাক-স্বাধীনতা — অনুচ্ছেদ ৩৯",
    question_bn: `সংবিধানের কত নম্বর অনুচ্ছেদ অনুসারে চিন্তা ও বিবেকের স্বাধীনতা এবং সংবাদপত্র ও বাক-স্বাধীনতা নিশ্চিত করা হয়েছে? [সংবিধান-${b}.২৯]`,
    question_en: `Which constitutional article guarantees freedom of thought and conscience, and freedom of speech, expression, and press? [Constitution-${b}.29]`,
    options: {
      A: "অনুচ্ছেদ ৩৯",
      B: "অনুচ্ছেদ ৩৭",
      C: "অনুচ্ছেদ ৩৮",
      D: "অনুচ্ছেদ ৪০"
    },
    correct_option: "A",
    explanation_bn: "অনুচ্ছেদ ৩৯(১) চিন্তা ও বিবেকের স্বাধীনতাকে শর্তহীন এবং ৩৯(২) বাক ও ভাব প্রকাশের স্বাধীনতাকে আইনের যুক্তিসঙ্গত বাধানিষেধ সাপেক্ষে সুরক্ষা দেয়।",
    explanation_en: "Article 39 protects freedom of thought, conscience, speech, expression, and the press."
  }));

  // 30. Article 102: Writ Jurisdiction of High Court
  questions.push(createQ({
    topic: "বিচার বিভাগ ও মৌলিক অধিকার বলবৎকরণ",
    subtopic: "হাইকোর্ট বিভাগের রিট এখতিয়ার — অনুচ্ছেদ ১০২",
    question_bn: `মৌলিক অধিকার বলবৎকরণ এবং প্রতিকার প্রার্থনায় সুপ্রিম কোর্টের হাইকোর্ট বিভাগে রিট (Writ) পিটিশন দায়েরের বিধান কোন অনুচ্ছেদে রয়েছে? [সংবিধান-${b}.৩০]`,
    question_en: `Under which landmark article of the Constitution can a citizen file a Writ petition in the High Court Division to enforce fundamental rights? [Constitution-${b}.30]`,
    options: {
      A: "অনুচ্ছেদ ১০২ (Article 102)",
      B: "অনুচ্ছেদ ৪৪",
      C: "অনুচ্ছেদ ৯৪",
      D: "অনুচ্ছেদ ১১৭"
    },
    correct_option: "A",
    explanation_bn: "অনুচ্ছেদ ১০২ হাইকোর্ট বিভাগকে হেবিয়াস কর্পাস, ম্যান্ডামাস, প্রহিবিশন, সার্টিওরারি ও কুও-ওয়ারেন্টো জাতীয় রিট জারির অসাধারণ এখতিয়ার দেয়।",
    explanation_en: "Article 102 empowers the High Court Division to issue prerogative writs enforcing fundamental rights and judicial review."
  }));

  // 31. Constitutional Bodies: Articles 118 & 137
  const constBodies = [
    { name: "নির্বাচন কমিশন (Election Commission)", art: "অনুচ্ছেদ ১১৮", func: "সংসদ ও রাষ্ট্রপতি নির্বাচন পরিচালনা" },
    { name: "সরকারি কর্ম কমিশন (Public Service Commission - PSC)", art: "অনুচ্ছেদ ১৩৭", func: "প্রজাতন্ত্রের কর্মকর্তা নিয়োগ ও পরীক্ষা" },
    { name: "মহা হিসাব-নিরীক্ষক ও নিয়ন্ত্রক (CAG)", art: "অনুচ্ছেদ ১২৭", func: "সরকারি আয়ের নিরীক্ষা ও অডিট" },
    { name: "অ্যাটর্নি জেনারেল (Attorney-General)", art: "অনুচ্ছেদ ৬৪", func: "রাষ্ট্রের পক্ষে সর্বোচ্চ আইনি পরামর্শ" }
  ];
  const cb = constBodies[b % constBodies.length];
  questions.push(createQ({
    topic: "সাংবিধানিক প্রতিষ্ঠান ও সংবিধিবদ্ধ পদ",
    subtopic: `${cb.name} এর সাংবিধানিক ভিত্তি`,
    question_bn: `বাংলাদেশ সংবিধানের কোন অনুচ্ছেদের বিধানবলে '${cb.name}' প্রতিষ্ঠা করার বাধ্যবাধকতা রয়েছে? [সংবিধান-${b}.৩১]`,
    question_en: `Under which specific article of the Bangladesh Constitution is the '${cb.name}' established? [Constitution-${b}.31]`,
    options: {
      A: cb.art,
      B: "অনুচ্ছেদ ৭০",
      C: "অনুচ্ছেদ ৯৩",
      D: "অনুচ্ছেদ ১৫০"
    },
    correct_option: "A",
    explanation_bn: `সংবিধানের ${cb.art} অনুসারে ${cb.name} সাংবিধানিকভাবে গঠিত যা ${cb.func}-এর দায়িত্ব পালন করে।`,
    explanation_en: `${cb.name} is constitutionally created and empowered under ${cb.art}.`
  }));

  // 32. Schedules of Constitution: Fifth, Sixth, Seventh
  const schPool = [
    { num: "পঞ্চম তফসিল", desc: "বঙ্গবন্ধুর ১৯৭১ সালের ৭ই মার্চের ঐতিহাসিক ভাষণ" },
    { num: "ষষ্ঠ তফসিল", desc: "বঙ্গবন্ধু কর্তৃক ১৯৭১ সালের ২৬শে মার্চের স্বাধীনতার ঘোষণা" },
    { num: "সপ্তম তফসিল", desc: "১৯৭১ সালের ১০ই এপ্রিলের ঐতিহাসিক স্বাধীনতার ঘোষণাপত্র (Proclamation of Independence)" }
  ];
  const sc = schPool[b % schPool.length];
  questions.push(createQ({
    topic: "সংবিধানের তফসিলসমূহ",
    subtopic: `${sc.num}-এর অন্তর্ভুক্ত বিষয়বস্তু`,
    question_bn: `বাংলাদেশ সংবিধানের '${sc.num}'-এ কোন ঐতিহাসিক জাতীয় দলিলটি অন্তর্ভুক্ত রয়েছে? [সংবিধান-${b}.৩২]`,
    question_en: `Which landmark historical document is constitutionally incorporated in the '${sc.num}' of the Constitution? [Constitution-${b}.32]`,
    options: {
      A: sc.desc,
      B: "প্রধান বিচারপতি ও মন্ত্রীদের শপথ বাক্য",
      C: "১৯৭২ সালের মূল খসড়া সংবিধান",
      D: "রাষ্ট্রপতি নির্বাচনের পদ্ধতি"
    },
    correct_option: "A",
    explanation_bn: `সংবিধানের অনুচ্ছেদ ১৫০(২) এর অধীনে সংবিধানে ৭টি তফসিল রয়েছে যার মধ্যে ${sc.num}-এ রয়েছে ${sc.desc}।`,
    explanation_en: `The ${sc.num} enshrines ${sc.desc} under Article 150(2).`
  }));

  // --- SECTION 6: ECONOMY, MEGA PROJECTS & AGRICULTURE (8 Questions) ---

  // 33. Padma Multipurpose Bridge
  questions.push(createQ({
    topic: "জাতীয় মেগা প্রকল্প ও অবকাঠামো",
    subtopic: "পদ্মা বহুমুখী সেতু — দৈর্ঘ্য, স্প্যান ও উদ্বোধন",
    question_bn: `২০২২ সালের ২৫শে জুন উদ্বোধন হওয়া বাংলাদেশের নিজস্ব অর্থায়নে নির্মিত পদ্মা বহুমুখী সেতুর মূল দৈর্ঘ্য কত কিলোমিটার এবং এতে মোট কতটি স্প্যান রয়েছে? [মেগা প্রকল্প-${b}.৩৩]`,
    question_en: `What is the main length in kilometers and total number of spans of the self-financed Padma Multipurpose Bridge opened on June 25, 2022? [Mega Project-${b}.33]`,
    options: {
      A: "৬.১৫ কিলোমিটার এবং ৪১টি স্প্যান (৪২টি খুঁটি)",
      B: "৫.৮০ কিলোমিটার এবং ৩৮টি স্প্যান",
      C: "৭.২০ কিলোমিটার এবং ৪৫টি স্প্যান",
      D: "৬.৫০ কিলোমিটার এবং ৪০টি স্প্যান"
    },
    correct_option: "A",
    explanation_bn: "পদ্মা সেতু মুন্সীগঞ্জের মাওয়া ও শরীয়তপুরের জাজিরাকে যুক্ত করেছে; এর মূল দৈর্ঘ্য ৬.১৫ কিমি, স্প্যান সংখ্যা ৪১টি এবং পিলার সংখ্যা ৪২টি।",
    explanation_en: "Padma Bridge spans 6.15 km with 41 steel truss spans resting on 42 piers, linking Mawa to Jazira."
  }));

  // 34. Bangabandhu Tunnel under Karnaphuli
  questions.push(createQ({
    topic: "জাতীয় মেগা প্রকল্প — কর্ণফুলী টানেল",
    subtopic: "বঙ্গবন্ধু শেখ মুজিবুর রহমান টানেলের দৈর্ঘ্য ও বৈশিষ্ট্য",
    question_bn: `দক্ষিণ এশিয়ার সর্বপ্রথম নদীর তলদেশ দিয়ে নির্মিত সড়ক টানেল 'বঙ্গবন্ধু শেখ মুজিবুর রহমান টানেল' কোন নদীর তলদেশে নির্মিত এবং এর দৈর্ঘ্য কত? [মেগা প্রকল্প-${b}.৩৪]`,
    question_en: `Beneath which river is the Bangabandhu Tunnel—South Asia's first underwater roadway tunnel—constructed, and what is its length? [Mega Project-${b}.34]`,
    options: {
      A: "কর্ণফুলী নদী; দৈর্ঘ্য ৩.৩২ কিলোমিটার",
      B: "পদ্মা নদী; দৈর্ঘ্য ৪.৫০ কিলোমিটার",
      C: "মেঘনা নদী; দৈর্ঘ্য ২.৮০ কিলোমিটার",
      D: "যমুনা নদী; দৈর্ঘ্য ৫.০০ কিলোমিটার"
    },
    correct_option: "A",
    explanation_bn: "চট্টগ্রামে কর্ণফুলী নদীর তলদেশে নির্মিত ৩.৩২ কিমি দীর্ঘ এই টানেল 'ওয়ান সিটি টু টাউন' মডেলে আনোয়ারা ও পতেঙ্গাকে সংযুক্ত করেছে।",
    explanation_en: "Constructed under the Karnaphuli River in Chattogram, the 3.32-km Bangabandhu Tunnel connects Patenga to Anwara."
  }));

  // 35. Dhaka Metro Rail (MRT Line-6)
  questions.push(createQ({
    topic: "নগর পরিবহন — ঢাকা মেট্রোরেল",
    subtopic: "এমআরটি লাইন-৬ (উত্তরা থেকে মতিঝিল)",
    question_bn: `ঢাকার প্রথম উড়াল মেট্রোরেল ব্যবস্থা (MRT Line-6) কোন দুটি প্রধান প্রান্তিক স্টেশনের মধ্যে বাণিজ্যিক সেবা প্রদান করছে? [মেগা প্রকল্প-${b}.৩৫]`,
    question_en: `Between which two terminal stations does Dhaka's first elevated mass rapid transit line (MRT Line-6) operate? [Mega Project-${b}.35]`,
    options: {
      A: "উত্তরা উত্তর (দিয়াবাড়ী) থেকে মতিঝিল (কমলাপুর পর্যন্ত সম্প্রসারণাধীন)",
      B: "মিরপুর-১০ থেকে সায়েদাবাদ",
      C: "বিমানবন্দর থেকে ফার্মগেট",
      D: "গাবতলী থেকে গুলশান"
    },
    correct_option: "A",
    explanation_bn: "জাপানের জাইকা (JICA)-এর অর্থায়নে নির্মিত MRT Line-6 এর উত্তরা থেকে আগারগাঁও অংশ ২০২২ সালের ডিসেম্বরে এবং মতিঝিল পর্যন্ত ২০২৩ সালে চালু হয়।",
    explanation_en: "MRT Line-6 connects Uttara North to Motijheel (extending to Kamalapur) funded in part by JICA."
  }));

  // 36. Rooppur Nuclear Power Plant
  questions.push(createQ({
    topic: "বিদ্যুৎ ও জ্বালানি খাত — রূপপুর পারমাণবিক প্রকল্প",
    subtopic: "রূপপুর এনপিপি এর বিদ্যুৎ উৎপাদন ক্ষমতা ও অবস্থান",
    question_bn: `রাশিয়ার সহযোগিতায় পাবনার ঈশ্বরদীতে বাস্তবায়নাধীন রূপপুর পারমাণবিক বিদ্যুৎ কেন্দ্রের (RNPP) দুটি ইউনিটের সম্মিলিত উৎপাদন ক্ষমতা কত মেগাওয়াট? [জ্বালানি প্রকল্প-${b}.৩৬]`,
    question_en: `What is the combined electric power generation capacity of the two units of Rooppur Nuclear Power Plant in Ishwardi, Pabna? [Energy Project-${b}.36]`,
    options: {
      A: "২,৪০০ মেগাওয়াট (১২০০ × ২ মেগাওয়াট)",
      B: "১,৮০০ মেগাওয়াট",
      C: "৩,২০০ মেগাওয়াট",
      D: "১,২০০ মেগাওয়াট"
    },
    correct_option: "A",
    explanation_bn: "রাশিয়ার রোসাটমের সহায়তায় স্থাপিত VVER-1200 রিঅ্যাক্টর সমৃদ্ধ দুটি ইউনিটের মাধ্যমে রূপপুর মোট ২,৪০০ মেগাওয়াট পারমাণবিক বিদ্যুৎ উৎপাদন করবে।",
    explanation_en: "RNPP features two Russian VVER-1200 reactors with a total generation capacity of 2,400 MW."
  }));

  // 37. Matarbari Deep Sea Port
  questions.push(createQ({
    topic: "বন্দর ও সামুদ্রিক বাণিজ্য",
    subtopic: "মাতারবাড়ী গভীর সমুদ্র বন্দর",
    question_bn: `বাংলাদেশের প্রথম গভীর সমুদ্র বন্দর (Deep Sea Port) কক্সবাজারের কোন উপজেলার মাতারবাড়ীতে বাস্তবায়িত হচ্ছে? [বন্দর অবকাঠামো-${b}.৩৭]`,
    question_en: `In which upazila of Cox's Bazar district is Bangladesh's first deep seaport being developed at Matarbari? [Port Infra-${b}.37]`,
    options: {
      A: "মহেশখালী উপজেলা",
      B: "কুতুবদিয়া উপজেলা",
      C: "টেকনাফ উপজেলা",
      D: "উখিয়া উপজেলা"
    },
    correct_option: "A",
    explanation_bn: "কক্সবাজারের মহেশখালী দ্বীপের মাতারবাড়ীতে ১৮.৫ মিটার ড্রাফটের বিশালাকার মাদার ভেসেল ভেড়ানোর উপযোগী গভীর সমুদ্র বন্দর নির্মিত হচ্ছে।",
    explanation_en: "The Matarbari Deep Sea Port is situated in Moheshkhali upazila, Cox's Bazar with an 18.5-meter navigational draft."
  }));

  // 38. Agricultural Research & Rice Varieties (BRRI)
  questions.push(createQ({
    topic: "বাংলাদেশের কৃষি ও শস্য বিজ্ঞান",
    subtopic: "বিআরআরআই উদ্ভাবিত জিঙ্কসমৃদ্ধ ও প্রিমিয়াম জাত",
    question_bn: `বাংলাদেশ ধান গবেষণা ইনস্টিটিউট (BRRI) উদ্ভাবিত জনপ্রিয় সুগন্ধি প্রিমিয়াম জাত 'বাংলামতি' ধানের আনুষ্ঠানিক নাম কোনটি? [কৃষি বিজ্ঞান-${b}.৩৮]`,
    question_en: `What is the official accession designation of the fragrant premium rice variety developed by BRRI commonly called 'Banglamati'? [Agri Sci-${b}.38]`,
    options: {
      A: "ব্রি ধান ৫০ (BRRI dhan 50)",
      B: "ব্রি ধান ২৮",
      C: "ব্রি ধান ২৯",
      D: "ব্রি ধান ৮৪"
    },
    correct_option: "A",
    explanation_bn: "ব্রি ধান ৫০ কে বাসমতি চালের গুণসম্পন্ন সুগন্ধযুক্ত জাত হিসেবে উদ্ভাবন করা হয় যা জনপ্রিয়ভাবে 'বাংলামতি' নামে খ্যাত।",
    explanation_en: "BRRI dhan 50 is the aromatic long-grain cultivar commercially marketed as 'Banglamati'."
  }));

  // 39. Geographical Indication (GI) Products of Bangladesh
  const giPool = [
    { name: "জামদানি শাড়ি", no: "১ম", year: "২০১৬" },
    { name: "ইলিশ মাছ", no: "২য়", year: "২০১৭" },
    { name: "ক্ষীরশাপাত আম (চাঁপাইনবাবগঞ্জ)", no: "৩য়", year: "২০১৯" },
    { name: "ঢাকাই মসলিন", no: "৪র্থ", year: "২০২০" }
  ];
  const gi = giPool[b % giPool.length];
  questions.push(createQ({
    topic: "ভৌগোলিক নির্দেশক পণ্য (GI Products)",
    subtopic: `${gi.name}-এর জিআই সনদ লাভ`,
    question_bn: `বাংলাদেশে ভৌগোলিক নির্দেশক (GI) সনদ প্রাপ্ত পণ্যের তালিকায় '${gi.name}' কততম জিআই পণ্য হিসেবে আনুষ্ঠানিকভাবে স্বীকৃতি লাভ করে? [জিআই পণ্য-${b}.৩৯]`,
    question_en: `As which ordinal Geographical Indication (GI) product of Bangladesh was '${gi.name}' officially registered? [GI Product-${b}.39]`,
    options: {
      A: `${gi.no} জিআই পণ্য (সনদ লাভ: ${gi.year})`,
      B: `৫ম জিআই পণ্য`,
      C: `৭ম জিআই পণ্য`,
      D: `১০ম জিআই পণ্য`
    },
    correct_option: "A",
    explanation_bn: `শিল্প মন্ত্রণালয়ের ডিপিডিটি কর্তৃক ${gi.name}-কে বাংলাদেশের ${gi.no} জিআই পণ্য হিসেবে নিবন্ধন ও সনদ প্রদান করা হয়।`,
    explanation_en: `${gi.name} was officially registered as the ${gi.no} GI product of Bangladesh in ${gi.year}.`
  }));

  // 40. Population and Housing Census 2022 Findings
  questions.push(createQ({
    topic: "জনমিতি ও আদমশুমারি — জনশুমারি ২০২২",
    subtopic: "বাংলাদেশের জনসংখ্যা ও সাক্ষরতার হার",
    question_bn: `বাংলাদেশ পরিসংখ্যান ব্যুরোর (BBS) জনশুমারি ও গৃহগণনা ২০২২ এর চূড়ান্ত প্রতিবেদন অনুযায়ী দেশের মোট সমন্বয়কৃত জনসংখ্যা কত কোটি? [জনশুমারি-${b}.৪০]`,
    question_en: `According to the final verified report of the Population and Housing Census 2022 conducted by BBS, what is Bangladesh's adjusted population? [Census-${b}.40]`,
    options: {
      A: "১৬ কোটি ৯৮ লক্ষ (প্রায় ১৬.৯৮ কোটি)",
      B: "১৫ কোটি ২৫ লক্ষ",
      C: "১৮ কোটি ১০ লক্ষ",
      D: "১৪ কোটি ৮০ লক্ষ"
    },
    correct_option: "A",
    explanation_bn: "বিআইডিএস-এর সমন্বয়কৃত হিসাব মতে ২০২২ সালের জনশুমারিতে বাংলাদেশের সমন্বয়কৃত জনসংখ্যা দাঁড়িয়েছে ১৬ কোটি ৯৮ লক্ষ ২৮ হাজার ৯১১ জনে।",
    explanation_en: "The adjusted 2022 Census population figure reported by Bangladesh Bureau of Statistics (BBS) is 169.8 million."
  }));

  return questions.slice(0, count);
}
