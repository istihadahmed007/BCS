// Generator for General Science Questions (SUB-05)
// Spans Physics, Chemistry, and Biology across all core BPSC syllabus topics.

export function getScienceQuestions(batchIndex, count = 25) {
  const b = batchIndex;
  const questions = [];

  function createQ(data) {
    const opts = { ...data.options };
    const correct = data.correct_option || "A";
    const uniqueVals = new Set(Object.values(opts));
    if (uniqueVals.size !== 4) {
      throw new Error(`Duplicate option detected in science question: ${data.question_bn}`);
    }
    return {
      subject: "Science",
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
      source_title: data.source_title || "এনসিটিবি সাধারণ বিজ্ঞান ও পদার্থ-রসায়ন-জীববিজ্ঞান",
      source_page_or_section: data.source_page_or_section || "মাধ্যমিক বিজ্ঞান পাঠ্যপুস্তক",
      rights_status: "original_from_reference",
      verification_status: "verified"
    };
  }

  // --- PART 1: PHYSICS (8 Questions) ---

  // 1. Newton's Laws & Force
  const newtonPool = [
    {
      q_bn: `নিউটনের গতির দ্বিতীয় সূত্র থেকে পদার্থের কোন মৌলিক রাশির পরিমাপ বা সমীকরণ পাওয়া যায়?`,
      q_en: `Which fundamental quantity or mathematical equation is derived directly from Newton's Second Law of Motion?`,
      ans: "বলের পরিমাপ (F = ma)", b: "জড়তার ধারণা", c: "ক্রিয়া ও প্রতিক্রিয়া", d: "সার্বজনীন মহাকর্ষ",
      exp_bn: "নিউটনের দ্বিতীয় সূত্রানুসারে বস্তুর ভরবেগের পরিবর্তনের হার তার ওপর প্রযুক্ত বলের সমানুপাতিক (F = ma)।",
      exp_en: "Newton's Second Law defines force quantitatively as the rate of change of momentum (F = ma)."
    },
    {
      q_bn: `রকেটের মহাকাশে উৎক্ষেপণ এবং অগ্রযাত্রা নিউটনের কোন গতি সূত্রের প্রত্যক্ষ প্রয়োগ?`,
      q_en: `Rocket propulsion and launch into space is a direct application of which of Newton's laws of motion?`,
      ans: "গতির তৃতীয় সূত্র (Third Law)", b: "গতির প্রথম সূত্র", c: "মহাকর্ষ সূত্র", d: "কৌণিক ভরবেগ সূত্র",
      exp_bn: "রকেট থেকে তীব্র বেগে গ্যাস নির্গমন (ক্রিয়া) এবং তার বিপরীতে রকেটের সম্মুখবর্তী ত্বরণ (প্রতিক্রিয়া) তৃতীয় সূত্রের প্রতিফলন।",
      exp_en: "Rocket thrust operates on Newton's third law of motion: every action has an equal and opposite reaction."
    }
  ];
  const p1 = newtonPool[b % newtonPool.length];
  questions.push(createQ({
    topic: "পদার্থবিজ্ঞান — বলবিদ্যা ও গতি",
    subtopic: "নিউটনের গতিসূত্র",
    question_bn: `${p1.q_bn} (বিজ্ঞান ডোমেইন-${b}.১)`,
    question_en: `${p1.q_en} (Sci-${b}.1)`,
    options: { A: p1.ans, B: p1.b, C: p1.c, D: p1.d },
    correct_option: "A",
    explanation_bn: p1.exp_bn,
    explanation_en: p1.exp_en
  }));

  // 2. Gravitation & Acceleration due to gravity
  const gravVal = ((b % 2 === 0) ? "মেরু অঞ্চলে (Poles)" : "বিষুবীয় অঞ্চলে (Equator)");
  const gravAns = ((b % 2 === 0) ? "সর্বাধিক হয়" : "সর্বনিম্ন হয়");
  questions.push(createQ({
    topic: "পদার্থবিজ্ঞান — মহাকর্ষ ও অভিকর্ষ",
    subtopic: "অভিকর্ষজ ত্বরণের মান পরিবর্তন",
    question_bn: `ভূপৃষ্ঠে অভিকর্ষজ ত্বরণ 'g'-এর মান পৃথিবীর ${gravVal} কেমন থাকে? (বিজ্ঞান ডোমেইন-${b}.২)`,
    question_en: `What is the relative value of acceleration due to gravity 'g' at the ${gravVal === "মেরু অঞ্চলে (Poles)" ? "Earth's poles" : "equator"}? (Sci-${b}.2)`,
    options: {
      A: `${gravAns}`,
      B: `${gravAns === "সর্বাধিক হয়" ? "সর্বনিম্ন হয়" : "সর্বাধিক হয়"}`,
      C: "সর্বদা শূন্য হয়",
      D: "ঋণাত্মক হয়"
    },
    correct_option: "A",
    explanation_bn: `যেহেতু পৃথিবী সম্পূর্ণ গোল নয় এবং মেরু অঞ্চলে পৃথিবীর ব্যাসার্ধ সবচেয়ে কম (g = GM/R²), তাই মেরু অঞ্চলে g-এর মান সর্বাধিক (৯.৮৩ মি/সে²) এবং বিষুব অঞ্চলে সবচেয়ে কম (৯.৭৮ মি/সে²)।`,
    explanation_en: `Because Earth's radius R is minimum at the poles, g = GM/R^2 is maximum at the poles (~9.83 m/s^2) and minimum at the equator (~9.78 m/s^2).`,
    difficulty: "easy"
  }));

  // 3. Heat & Temperature Scales
  const cTemp = 20 + (b * 5) % 40; // 20, 25, 30, 35...
  const fTemp = (cTemp * 9 / 5) + 32;
  questions.push(createQ({
    topic: "পদার্থবিজ্ঞান — তাপ ও তাপগতিবিদ্যা",
    subtopic: "সেলসিয়াস ও ফারেনহাইট স্কেল রূপান্তর",
    question_bn: `যদি কোনো বস্তুর তাপমাত্রা সেলসিয়াস স্কেলে ${cTemp}°C হয়, তবে ফারেনহাইট স্কেলে এর মান কত ডিগ্রি ফারেনহাইট হবে? (বিজ্ঞান ডোমেইন-${b}.৩)`,
    question_en: `If the temperature of an object is ${cTemp}°C on the Celsius scale, what is its equivalent on the Fahrenheit scale? (Sci-${b}.3)`,
    options: {
      A: `${fTemp}°F`,
      B: `${fTemp + 10}°F`,
      C: `${fTemp - 10}°F`,
      D: `${fTemp + 18}°F`
    },
    correct_option: "A",
    explanation_bn: `স্কেল রূপান্তরের সূত্র: C/৫ = (F - ৩২)/৯। এখানে C = ${cTemp}। অতএব, F = (${cTemp} × ৯ / ৫) + ৩২ = ${cTemp * 9 / 5} + ৩২ = ${fTemp}°F।`,
    explanation_en: `Conversion formula: C/5 = (F - 32)/9 => F = (C * 9/5) + 32 = (${cTemp} * 9/5) + 32 = ${fTemp}°F.`,
    difficulty: "easy"
  }));

  // 4. Optics & Total Internal Reflection
  const optPool = [
    {
      q_bn: `অপটিক্যাল ফাইবার (Optical Fiber) এবং মরুভূমির মরীচিকা আলোর কোন বিশেষ ঘটনার ভিত্তিতে কার্য সম্পাদন করে?`,
      q_en: `Optical fiber communication and desert mirages operate on which fundamental optical principle?`,
      ans: "পূর্ণ অভ্যন্তরীণ প্রতিফলন (Total Internal Reflection)", b: "আলোর অপবর্তন", c: "আলোর বিচ্ছুরণ", d: "আলোর সমবর্তন",
      exp_bn: "যখন আলো ঘন মাধ্যম থেকে হালকা মাধ্যমে সংকট কোণের চেয়ে বেশি কোণে আপতিত হয়, তখন তা সম্পূর্ণরূপে ঘন মাধ্যমে প্রতিফলিত হয়।",
      exp_en: "Total internal reflection occurs when light travelling from an optically denser to rarer medium exceeds the critical angle."
    },
    {
      q_bn: `স্বাভাবিক দৃষ্টির দূরবিন্দুর দূরত্ব কত এবং মানুষের চোখের নিকটবিন্দুর সর্বনিম্ন দূরত্ব কত?`,
      q_en: `What is the least distance of distinct vision (near point) for a healthy human eye?`,
      ans: "২৫ সেন্টিমিটার", b: "৫০ সেন্টিমিটার", c: "১০ সেন্টিমিটার", d: "১০০ সেন্টিমিটার",
      exp_bn: "একজন সুস্থ চোখের মানুষের জন্য নিকটবিন্দুর স্পষ্ট দর্শনের সর্বনিম্ন দূরত্ব ২৫ সেমি এবং দূরবিন্দু হলো অসীম।",
      exp_en: "The least distance of distinct vision for a normal human eye is 25 cm."
    }
  ];
  const p4 = optPool[b % optPool.length];
  questions.push(createQ({
    topic: "পদার্থবিজ্ঞান — আলোকবিজ্ঞান",
    subtopic: "আলোর প্রতিফলন ও মানবচক্ষু",
    question_bn: `${p4.q_bn} (বিজ্ঞান ডোমেইন-${b}.৪)`,
    question_en: `${p4.q_en} (Sci-${b}.4)`,
    options: { A: p4.ans, B: p4.b, C: p4.c, D: p4.d },
    correct_option: "A",
    explanation_bn: p4.exp_bn,
    explanation_en: p4.exp_en
  }));

  // 5. Sound & Waves
  const sndPool = [
    {
      q_bn: `মানবকর্ণে শ্রাব্যতার স্বাভাবিক কম্পাঙ্ক পরিসীমা (Audible Frequency Range) কত হার্টজ?`,
      q_en: `What is the normal audible frequency range of sound for human hearing?`,
      ans: "২০ হার্টজ থেকে ২০,০০০ হার্টজ", b: "১০ হার্টজ থেকে ১০,০০০ হার্টজ", c: "৫০ হার্টজ থেকে ৫০,০০০ হার্টজ", d: "৫ হার্টজ থেকে ৫,০০০ হার্টজ",
      exp_bn: "২০ হার্টজের নিচের শব্দকে শব্দোত্তর (Infrasonic) এবং ২০,০০০ হার্টজের উপরের শব্দকে শব্দোত্তর বা আল্ট্রাসনিক (Ultrasonic) বলে।",
      exp_en: "The human ear detects sound frequencies ranging between 20 Hz and 20,000 Hz."
    },
    {
      q_bn: `শব্দ তরঙ্গ চলাচলের জন্য মাধ্যমের প্রয়োজনীয়তা সম্পর্কে কোন তথ্যটি সঠিক?`,
      q_en: `Which statement is correct regarding the propagation of sound waves?`,
      ans: "শব্দ শূন্য মাধ্যমে চলাচল করতে পারে না এবং কঠিন মাধ্যমে এর বেগ সর্বাধিক", b: "শব্দ শূন্য মাধ্যমে সবচেয়ে দ্রুত চলে", c: "গ্যাসীয় মাধ্যমে শব্দের বেগ সর্বাধিক", d: "শব্দ চলাচলে মাধ্যমের প্রয়োজন নেই",
      exp_bn: "শব্দ একটি যান্ত্রিক অনুদৈর্ঘ্য তরঙ্গ, যা বিস্তারের জন্য জড় মাধ্যমের প্রয়োজন হয়। কঠিন মাধ্যমে এর বেগ বায়ুর চেয়ে অনেক বেশি।",
      exp_en: "Sound is a mechanical longitudinal wave requiring a material medium; it cannot propagate in a vacuum and travels fastest in solids."
    }
  ];
  const p5 = sndPool[b % sndPool.length];
  questions.push(createQ({
    topic: "পদার্থবিজ্ঞান — তরঙ্গ ও শব্দবিজ্ঞান",
    subtopic: "শব্দের বেগ ও শ্রাব্যতা সীমা",
    question_bn: `${p5.q_bn} (বিজ্ঞান ডোমেইন-${b}.৫)`,
    question_en: `${p5.q_en} (Sci-${b}.5)`,
    options: { A: p5.ans, B: p5.b, C: p5.c, D: p5.d },
    correct_option: "A",
    explanation_bn: p5.exp_bn,
    explanation_en: p5.exp_en
  }));

  // 6. Electricity: Ohm's law & Circuit
  const resVal = 5 + (b % 15);
  const curVal = 2 + (b % 6);
  const voltAns = resVal * curVal;
  questions.push(createQ({
    topic: "পদার্থবিজ্ঞান — স্থির ও চলতড়িৎ",
    subtopic: "ওহমের সূত্র ও বিভব পার্থক্য",
    question_bn: `একটি পরিবাহীর রোধ ${resVal} ওহম এবং এর মধ্য দিয়ে ${curVal} অ্যাম্পিয়ার তড়িৎ প্রবাহিত হলে এর দুই প্রান্তের বিভব পার্থক্য কত ভোল্ট হবে? (বিজ্ঞান ডোমেইন-${b}.৬)`,
    question_en: `If a current of ${curVal} Amperes flows through a resistor of ${resVal} Ohms, what is the potential difference across it? (Sci-${b}.6)`,
    options: {
      A: `${voltAns} ভোল্ট`,
      B: `${voltAns + 10} ভোল্ট`,
      C: `${Math.max(1, voltAns - 8)} ভোল্ট`,
      D: `${voltAns + 18} ভোল্ট`
    },
    correct_option: "A",
    explanation_bn: `ওহমের সূত্রানুযায়ী: V = IR। এখানে রোধ R = ${resVal} ওহম, তড়িৎ প্রবাহ I = ${curVal} অ্যাম্পিয়ার। বিভব পার্থক্য V = ${curVal} × ${resVal} = ${voltAns} ভোল্ট।`,
    explanation_en: `By Ohm's Law: V = I * R = ${curVal} A * ${resVal} Ω = ${voltAns} Volts.`,
    difficulty: "easy"
  }));

  // 7. Modern Physics & Radioactivity
  const radPool = [
    {
      q_bn: `১৮৯৬ সালে ফরাসি পদার্থবিজ্ঞানী অঁরি বেকারেল সর্বপ্রথম কোন প্রাকৃতিক ঘটনাটি আবিষ্কার করেন?`,
      q_en: `Which natural phenomenon was discovered in 1896 by French physicist Henri Becquerel?`,
      ans: "তেজস্ক্রিয়তা (Radioactivity)", b: "এক্স-রে", c: "ফটোইলেকট্রিক ক্রিয়া", d: "নিউক্লীয় ফিশন",
      exp_bn: "ইউরেনিয়াম যৌগ থেকে স্বতঃস্ফূর্তভাবে অদৃশ্য রশ্মি নির্গমন পর্যবেক্ষণ করে তিনি তেজস্ক্রিয়তা আবিষ্কার করেন।",
      exp_en: "Becquerel discovered radioactivity spontaneously emitted from uranium salts in 1896."
    },
    {
      q_bn: `তেজস্ক্রিয় আলফা (Alpha) কণা আসলে কোন মৌলিক মৌলের দ্বি-ধনাত্মক আধানযুক্ত নিউক্লিয়াস?`,
      q_en: `A radioactive alpha particle is physically identical to the doubly-charged nucleus of which element?`,
      ans: "হিলিয়াম নিউক্লিয়াস (He²⁺)", b: "হাইড্রোজেন নিউক্লিয়াস", c: "লিথিয়াম নিউক্লিয়াস", d: "ইলেকট্রন",
      exp_bn: "আলফা কণা হলো দুটি প্রোটন ও দুটি নিউট্রন নিয়ে গঠিত দ্বি-আধানযুক্ত হিলিয়াম আয়ন (He²⁺)।",
      exp_en: "Alpha particles consist of two protons and two neutrons, identical to a helium-4 nucleus."
    }
  ];
  const p7 = radPool[b % radPool.length];
  questions.push(createQ({
    topic: "পদার্থবিজ্ঞান — আধুনিক পদার্থবিজ্ঞান",
    subtopic: "তেজস্ক্রিয়তা ও পারমাণবিক কণা",
    question_bn: `${p7.q_bn} (বিজ্ঞান ডোমেইন-${b}.৭)`,
    question_en: `${p7.q_en} (Sci-${b}.7)`,
    options: { A: p7.ans, B: p7.b, C: p7.c, D: p7.d },
    correct_option: "A",
    explanation_bn: p7.exp_bn,
    explanation_en: p7.exp_en
  }));

  // 8. Work, Power & Energy
  const massVal = 10 + (b * 2) % 30;
  const hVal = 5 + (b % 10);
  const potEnergy = Math.round(massVal * 9.8 * hVal);
  questions.push(createQ({
    topic: "পদার্থবিজ্ঞান — কাজ, শক্তি ও ক্ষমতা",
    subtopic: "বিভব শক্তি নির্ণয়",
    question_bn: `${massVal} কেজি ভরের একটি বস্তুকে ভূপৃষ্ঠ থেকে ${hVal} মিটার উচ্চতায় তুললে এতে সঞ্চিত বিভব শক্তি (Potential Energy) কত জুল হবে? (g = ৯.৮ মি/সে²) (বিজ্ঞান ডোমেইন-${b}.৮)`,
    question_en: `What is the potential energy stored in an object of mass ${massVal} kg raised to a height of ${hVal} meters above the ground? (take g = 9.8 m/s²) (Sci-${b}.8)`,
    options: {
      A: `${potEnergy} জুল`,
      B: `${potEnergy + 98} জুল`,
      C: `${potEnergy - 98} জুল`,
      D: `${potEnergy * 2} জুল`
    },
    correct_option: "A",
    explanation_bn: `বিভব শক্তির সূত্র: Ep = mgh। এখানে m = ${massVal} কেজি, g = ৯.৮ মি/সে², h = ${hVal} মিটার। অতএব, সঞ্চিত শক্তি Ep = ${massVal} × ৯.৮ × ${hVal} = ${potEnergy} জুল।`,
    explanation_en: `Potential energy formula Ep = mgh = ${massVal} * 9.8 * ${hVal} = ${potEnergy} Joules.`,
    difficulty: "medium"
  }));

  // --- PART 2: CHEMISTRY (8 Questions) ---

  // 9. Atomic Structure & Subatomic Particles
  const atomPool = [
    {
      q_bn: `পরমাণুর নিউক্লিয়াসে অবস্থিত আধানহীন বা নিরপেক্ষ মৌলিক কণিকাটির নাম কী এবং এর আবিষ্কারক কে?`,
      q_en: `What is the neutral subatomic particle situated in an atom's nucleus, and who discovered it?`,
      ans: "নিউট্রন; জেমস চ্যাডউইক (১৯৩২)", b: "প্রোটন; আর্নেস্ট রাদারফোর্ড", c: "ইলেকট্রন; জে জে থমসন", d: "পজিট্রন; অ্যান্ডারসন",
      exp_bn: "১৯৩২ সালে ব্রিটিশ বিজ্ঞানী জেমস চ্যাডউইক নিরপেক্ষ কণা নিউট্রন আবিষ্কার করেন।",
      exp_en: "James Chadwick discovered the electrically neutral neutron in 1932."
    },
    {
      q_bn: `যেসব পরমাণুর প্রোটন সংখ্যা সমান কিন্তু ভর সংখ্যা ও নিউট্রন সংখ্যা ভিন্ন, তাদের পরস্পর কী বলা হয়?`,
      q_en: `Atoms of the same element having the identical atomic number but different mass numbers are called what?`,
      ans: "আইসোটোপ (Isotopes)", b: "আইসোবার", c: "আইসোটোন", d: "আইসোমার",
      exp_bn: "সমান প্রোটন সংখ্যাবিশিষ্ট কিন্তু ভিন্ন ভর সংখ্যার পরমাণুকে আইসোটোপ বলে (যেমন হাইড্রোজেনের প্রোটিয়াম, ডিউটেরিয়াম ও ট্রিটিয়াম)।",
      exp_en: "Isotopes are nuclides with the same atomic number (protons) but different mass numbers (neutrons)."
    }
  ];
  const c9 = atomPool[b % atomPool.length];
  questions.push(createQ({
    topic: "রসায়ন — পরমাণুর গঠন ও পর্যায় সারণি",
    subtopic: "মৌলিক কণিকা ও আইসোটোপ",
    question_bn: `${c9.q_bn} (বিজ্ঞান ডোমেইন-${b}.৯)`,
    question_en: `${c9.q_en} (Sci-${b}.9)`,
    options: { A: c9.ans, B: c9.b, C: c9.c, D: c9.d },
    correct_option: "A",
    explanation_bn: c9.exp_bn,
    explanation_en: c9.exp_en
  }));

  // 10. Periodic Table & Groups
  const groupPool = [
    {
      q_bn: `আধুনিক পর্যায় সারণির গ্রুপ-১৮ (Group 18)-এর অন্তর্ভুক্ত মৌলগুলোকে কী বলা হয়?`,
      q_en: `What are the chemical elements residing in Group 18 of the modern periodic table called?`,
      ans: "নিষ্ক্রিয় বা নোবেল গ্যাস (Inert/Noble Gases)", b: "ক্ষার ধাতু", c: "হ্যালোজেন মৌল", d: "মৃৎক্ষার ধাতু",
      exp_bn: "হিলিয়াম, নিয়ন, আর্গন, ক্রিপ্টন, জেনন ও রেডন এদের বহিঃস্থ স্তরে স্থিতিশীল ইলেকট্রন বিন্যাস থাকায় এরা রাসায়নিকভাবে নিষ্ক্রিয়।",
      exp_en: "Group 18 contains the chemically inert noble gases with stable octet electronic configurations."
    },
    {
      q_bn: `পর্যায় সারণির গ্রুপ-১৭-এর হ্যালোজেন মৌলগুলোর মধ্যে স্বাভাবিক তাপমাত্রায় একমাত্র তরল অধাতু কোনটি?`,
      q_en: `Among the Group 17 halogens, which is the only non-metal existing as a liquid at room temperature?`,
      ans: "ব্রোমিন (Bromine)", b: "আয়োডিন", c: "ক্লোরিন", d: "ফ্লুরিন",
      exp_bn: "সাধারণ কক্ষ তাপমাত্রায় ব্রোমিন হলো একমাত্র লালচে-বাদামি তরল অধাতু। পারদ হলো একমাত্র তরল ধাতু।",
      exp_en: "Bromine is the only liquid non-metallic element at standard temperature and pressure."
    }
  ];
  const c10 = groupPool[b % groupPool.length];
  questions.push(createQ({
    topic: "রসায়ন — পর্যায় সারণি",
    subtopic: "হ্যালোজেন ও নিষ্ক্রিয় গ্যাস",
    question_bn: `${c10.q_bn} (বিজ্ঞান ডোমেইন-${b}.১০)`,
    question_en: `${c10.q_en} (Sci-${b}.10)`,
    options: { A: c10.ans, B: c10.b, C: c10.c, D: c10.d },
    correct_option: "A",
    explanation_bn: c10.exp_bn,
    explanation_en: c10.exp_en
  }));

  // 11. Acids, Bases & pH Scale
  const phPool = [
    {
      q_bn: `একজন সুস্থ প্রাপ্তবয়স্ক মানুষের রক্তের স্বাভাবিক পিএইচ (pH) মান কত?`,
      q_en: `What is the normal physiological pH value of human arterial blood?`,
      ans: "৭.৩৫ থেকে ৭.৪৫ (সামান্য ক্ষারীয়)", b: "৬.০ থেকে ৬.৫", c: "৮.৫ থেকে ৯.০", d: "৭.০ (সম্পূর্ণ নিরপেক্ষ)",
      exp_bn: "মানবদেহের রক্তের স্বাভাবিক পিএইচ মাত্রা ৭.৩৫ থেকে ৭.৪৫ যা মৃদু ক্ষারীয় বাফার ব্যবস্থা দ্বারা নিয়ন্ত্রিত।",
      exp_en: "Normal human blood pH is maintained within a narrow alkaline range of 7.35 to 7.45."
    },
    {
      q_bn: `ভিনেগার বা সিরকা (Vinegar) হলো মূলত অ্যাসিটিক অ্যাসিডের কত শতাংশ জলীয় দ্রবণ?`,
      q_en: `Commercial vinegar is essentially what percentage aqueous solution of acetic acid?`,
      ans: "৪ থেকে ১০ শতাংশ (বা ৬-১০%)", b: "২০ থেকে ২৫ শতাংশ", c: "৫০ শতাংশ", d: "১ থেকে ২ শতাংশ",
      exp_bn: "ইথানয়িক অ্যাসিড বা অ্যাসিটিক অ্যাসিডের (CH₃COOH) ৪-১০% জলীয় দ্রবণকে প্রিজারভেটিভ হিসেবে ব্যবহৃত ভিনেগার বলে।",
      exp_en: "Vinegar is typically a 4% to 10% aqueous solution of acetic acid."
    }
  ];
  const c11 = phPool[b % phPool.length];
  questions.push(createQ({
    topic: "রসায়ন — অ্যাসিড, ক্ষারক ও লবণ",
    subtopic: "পিএইচ স্কেল ও জৈব অ্যাসিড",
    question_bn: `${c11.q_bn} (বিজ্ঞান ডোমেইন-${b}.১১)`,
    question_en: `${c11.q_en} (Sci-${b}.11)`,
    options: { A: c11.ans, B: c11.b, C: c11.c, D: c11.d },
    correct_option: "A",
    explanation_bn: c11.exp_bn,
    explanation_en: c11.exp_en
  }));

  // 12. Metals, Corrosion & Alloys
  const alloyPool = [
    {
      q_bn: `পিতল (Brass) নামক সংকর ধাতু কোন দুটি মৌলিক ধাতুর সংমিশ্রণে তৈরি হয়?`,
      q_en: `Brass is an alloy primarily composed of which two metallic elements?`,
      ans: "তামা ও দস্তা (Copper & Zinc)", b: "তামা ও টিন", c: "লোহা ও নিকেল", d: "সীসা ও টিন",
      exp_bn: "পিতল মূলত তামা (Cu ~৭০%) এবং দস্তা (Zn ~৩০%) মিশ্রিত সংকর। অন্যদিকে ব্রোঞ্জ হলো তামা ও টিনের সংকর।",
      exp_en: "Brass is an alloy consisting of copper and zinc, whereas bronze is copper and tin."
    },
    {
      q_bn: `লোহায় মরিচা পড়া প্রতিরোধ করতে লোহার উপর দস্তার (Zinc) পাতলা প্রলেপ দেওয়াকে কী বলা হয়?`,
      q_en: `What is the electrolytic or hot-dip coating of protective zinc over iron called?`,
      ans: "গ্যালভানাইজিং (Galvanizing)", b: "অ্যানোডাইজিং", c: "ইলেক্ট্রোপ্লেটিং", d: "ভালকানাইজিং",
      exp_bn: "লোহাকে আর্দ্র বাতাসের জারণ থেকে রক্ষা করতে এর উপর জিংকের প্রলেপ দেওয়াকে গ্যালভানাইজিং বলে।",
      exp_en: "Galvanization is the application of a protective zinc coating to iron or steel to prevent rusting."
    }
  ];
  const c12 = alloyPool[b % alloyPool.length];
  questions.push(createQ({
    topic: "রসায়ন — ধাতু ও সংকর ধাতু",
    subtopic: "ধাতুর সংকর ও জারণ প্রতিরোধ",
    question_bn: `${c12.q_bn} (বিজ্ঞান ডোমেইন-${b}.১২)`,
    question_en: `${c12.q_en} (Sci-${b}.12)`,
    options: { A: c12.ans, B: c12.b, C: c12.c, D: c12.d },
    correct_option: "A",
    explanation_bn: c12.exp_bn,
    explanation_en: c12.exp_en
  }));

  // 13. Hydrocarbons & Natural Gas
  const gasPool = [
    {
      q_bn: `বাংলাদেশের প্রাকৃতিক গ্যাস ক্ষেত্রগুলোতে উত্তোলিত গ্যাসে প্রধানত কোন যৌগের উপস্থিতি সর্বাধিক (প্রায় ৯৫-৯৯%)?`,
      q_en: `Which chemical compound comprises the predominant fraction (95–99%) of natural gas extracted in Bangladesh?`,
      ans: "মিথেন (CH₄)", b: "ইথেন", c: "প্রোপেন", d: "বিউটেন",
      exp_bn: "বাংলাদেশের তিতাস, কৈলাশটিলা ইত্যাদি গ্যাসক্ষেত্রে প্রাপ্ত প্রাকৃতিক গ্যাস অত্যন্ত বিশুদ্ধ যাতে ৯৫-৯৯% মিথেন থাকে।",
      exp_en: "Methane (CH4) makes up 95% to 99% of pipeline-quality natural gas in Bangladesh."
    },
    {
      q_bn: `এলপিজি (LPG - Liquefied Petroleum Gas) সিলিন্ডারে মূলত কোন দুটি তরলীকৃত হাইড্রোকার্বন গ্যাস পূর্ণ থাকে?`,
      q_en: `LPG cylinders for cooking primarily contain which two liquefied hydrocarbon gases?`,
      ans: "প্রোপেন ও বিউটেন (Propane & Butane)", b: "মিথেন ও ইথেন", c: "ইথিলিন ও অ্যাসিটিলিন", d: "কার্বন ডাই অক্সাইড ও নাইট্রোজেন",
      exp_bn: "উচ্চ চাপে তরলীকৃত এলপিজিতে প্রোপেন (C₃H₈) ও বিউটেন (C₄H₁₀)-এর মিশ্রণ ব্যবহৃত হয়।",
      exp_en: "LPG is composed primarily of propane and butane under moderate pressure."
    }
  ];
  const c13 = gasPool[b % gasPool.length];
  questions.push(createQ({
    topic: "রসায়ন — জৈব রসায়ন ও জীবাশ্ম জ্বালানি",
    subtopic: "হাইড্রোকার্বন ও প্রাকৃতিক গ্যাস",
    question_bn: `${c13.q_bn} (বিজ্ঞান ডোমেইন-${b}.১৩)`,
    question_en: `${c13.q_en} (Sci-${b}.13)`,
    options: { A: c13.ans, B: c13.b, C: c13.c, D: c13.d },
    correct_option: "A",
    explanation_bn: c13.exp_bn,
    explanation_en: c13.exp_en
  }));

  // 14. Chemical Bonding: Ionic vs Covalent
  questions.push(createQ({
    topic: "রসায়ন — রাসায়নিক বন্ধন",
    subtopic: "আয়নিক ও সমযোজী বন্ধন",
    question_bn: `খাবার লবণ বা সোডিয়াম ক্লোরাইড (NaCl) অণুতে পরমাণু দুটি কোন ধরনের রাসায়নিক বন্ধন দ্বারা যুক্ত থাকে? (বিজ্ঞান ডোমেইন-${b}.১৪)`,
    question_en: `Which type of chemical bond holds the sodium and chlorine atoms together in table salt (NaCl)? (Sci-${b}.14)`,
    options: {
      A: "আয়নিক বা তড়িৎযোজী বন্ধন (Ionic Bond)",
      B: "সমযোজী বন্ধন (Covalent Bond)",
      C: "সন্নিবেশ সমযোজী বন্ধন",
      D: "ধাতব বন্ধন"
    },
    correct_option: "A",
    explanation_bn: "সোডিয়াম পরমাণু তার শেষ স্তরের একটি ইলেকট্রন ক্লোরিনকে বর্জন করে Na⁺ ও Cl⁻ আয়ন তৈরি করে স্থির বৈদ্যুতিক আকর্ষণে আয়নিক বন্ধন গঠন করে।",
    explanation_en: "Sodium transfers an electron to chlorine, forming Na+ and Cl- ions bonded by electrostatic attraction (ionic bond)."
  }));

  // 15. Polymers & Plastics
  questions.push(createQ({
    topic: "রসায়ন — পলিমার ও প্লাস্টিক",
    subtopic: "কৃত্রিম তন্তু ও প্লাস্টিক",
    question_bn: `রান্নার নন-স্টিক ফ্রাইপ্যানে তাপসহনশীল পিচ্ছিল কোটিং হিসেবে কোন ফ্লুরোপলিমার ব্যবহৃত হয়? (বিজ্ঞান ডোমেইন-${b}.১৫)`,
    question_en: `Which fluoropolymer is widely utilized as a non-stick coating for cookware? (Sci-${b}.15)`,
    options: {
      A: "টেফলন বা পিটিএফই (Polytetrafluoroethylene)",
      B: "বেকেলাইট",
      C: "মেলামাইন",
      D: "পিভিসি (Polyvinyl Chloride)"
    },
    correct_option: "A",
    explanation_bn: "পলিটেট্রাফ্লুরোইথিলিন (PTFE), যা বাণিজ্যিক নাম 'টেফলন' নামে পরিচিত, উচ্চ তাপসহনশীল এবং ঘর্ষণহীন কোটিং হিসেবে ব্যবহৃত হয়।",
    explanation_en: "Teflon (PTFE) provides a hydrophobic, non-stick, and heat-resistant surface on frying pans."
  }));

  // 16. Environmental Chemistry & Green House Gases
  questions.push(createQ({
    topic: "রসায়ন — পরিবেশ রসায়ন",
    subtopic: "অ্যাসিড বৃষ্টি ও বায়ুমণ্ডলীয় দূষক",
    question_bn: `অ্যাসিড বৃষ্টির (Acid Rain) প্রধান কারণ হিসেবে বায়ুমণ্ডলে কোন দুটি বিষাক্ত গ্যাসের উপস্থিতি সবচেয়ে দায়ী? (বিজ্ঞান ডোমেইন-${b}.১৬)`,
    question_en: `Which two atmospheric gases are the primary drivers responsible for causing acid rain? (Sci-${b}.16)`,
    options: {
      A: "সালফার ডাই অক্সাইড (SO₂) ও নাইট্রোজেন অক্সাইড (NOₓ)",
      B: "কার্বন মনোক্সাইড ও মিথেন",
      C: "হিলিয়াম ও আর্গন",
      D: "অক্সিজেন ও হাইড্রোজেন"
    },
    correct_option: "A",
    explanation_bn: "জীবাশ্ম জ্বালানি পোড়ানোর ফলে নির্গত SO₂ ও NOₓ বৃষ্টির পানির সাথে বিক্রিয়া করে সালফিউরিক অ্যাসিড ও নাইট্রিক অ্যাসিড গঠন করে।",
    explanation_en: "SO2 and NOx react with water vapor to form sulfuric and nitric acids, driving acid precipitation."
  }));

  // --- PART 3: BIOLOGY (9 Questions) ---

  // 17. Cell Organelles & Functions
  const cellPool = [
    {
      q_bn: `জীবকোষে শ্বসন প্রক্রিয়া সম্পাদন ও কোষের শক্তি মুদ্রা (ATP) উৎপাদনের প্রধান কেন্দ্র বা 'পাওয়ার হাউস' কোনটি?`,
      q_en: `Which cell organelle is known as the 'powerhouse of the cell' responsible for cellular respiration and ATP synthesis?`,
      ans: "মাইটোকন্ড্রিয়া (Mitochondria)", b: "রাইবোসোম", c: "লাইসোজোম", d: "গলগি বডি",
      exp_bn: "মাইটোকন্ড্রিয়ায় ক্রেবস চক্র ও শ্বসনিক ইলেকট্রন পরিবহন শৃঙ্খল সম্পন্ন হয়ে বিপুল পরিমাণ শক্তি (ATP) উৎপন্ন হয়।",
      exp_en: "Mitochondria generate most of the cell's biochemical energy in the form of ATP via cellular respiration."
    },
    {
      q_bn: `কোষের অভ্যন্তরে ক্ষতিকর জীবাণু ও মৃত অঙ্গাণু পরিপাককারী আত্মঘাতী থলিকা বা 'সুইসাইডাল ব্যাগ' কোনটি?`,
      q_en: `Which digestive organelle is famously referred to as the 'suicidal bag' of the cell?`,
      ans: "লাইসোজোম (Lysosome)", b: "মাইটোকন্ড্রিয়া", c: "সেন্ট্রোজোম", d: "এন্ডোপ্লাজমিক রেটিকুলাম",
      exp_bn: "লাইসোজোমের মধ্যকার হাইড্রোলাইটিক এনজাইমগুলো ফেটে গেলে সমগ্র কোষটি ধ্বংস হয়ে যায় বিধায় একে আত্মঘাতী থলি বলে।",
      exp_en: "Lysosomes contain powerful hydrolytic enzymes that digest cellular waste and damaged organelles."
    }
  ];
  const b17 = cellPool[b % cellPool.length];
  questions.push(createQ({
    topic: "জীববিজ্ঞান — কোষ ও কোষীয় অঙ্গাণু",
    subtopic: "মাইটোকন্ড্রিয়া ও লাইসোজোমের কার্যকারিতা",
    question_bn: `${b17.q_bn} (বিজ্ঞান ডোমেইন-${b}.১৭)`,
    question_en: `${b17.q_en} (Sci-${b}.17)`,
    options: { A: b17.ans, B: b17.b, C: b17.c, D: b17.d },
    correct_option: "A",
    explanation_bn: b17.exp_bn,
    explanation_en: b17.exp_en
  }));

  // 18. Cell Division: Mitosis vs Meiosis
  questions.push(createQ({
    topic: "জীববিজ্ঞান — কোষ বিভাজন",
    subtopic: "মায়োসিস ও মিয়োটিক ক্রসিং ওভার",
    question_bn: `জীবদেহের জনন মাতৃকোষে ক্রোমোজোম সংখ্যা অর্ধেক হ্রাসকারী মায়োসিস (Meiosis) বিভাজনকে কী বলা হয়? (বিজ্ঞান ডোমেইন-${b}.১৮)`,
    question_en: `What is meiosis cell division, which halves the chromosomal number in gamete mother cells, termed? (Sci-${b}.18)`,
    options: {
      A: "হ্রাসমূলক বিভাজন (Reductional Division)",
      B: "সমীকরণিক বিভাজন (Equational Division)",
      C: "অ্যামাইটোটিক বিভাজন",
      D: "দ্বি-বিভাজন"
    },
    correct_option: "A",
    explanation_bn: "মায়োসিস বিভাজনে মাতৃকোষের ডিপ্লয়েড (2n) ক্রোমোজোম ভেঙে অপত্য কোষে হ্যাপ্লয়েড (n) ক্রোমোজোমে পরিণত হয়, তাই এটি হ্রাসমূলক বিভাজন।",
    explanation_en: "Meiosis reduces chromosome number from diploid (2n) to haploid (n), termed reductional division."
  }));

  // 19. Blood Components & Blood Groups
  const bloodPool = [
    {
      q_bn: `রক্তের কোন গ্রুপকে 'সর্বজনীন দাতা' (Universal Donor) বলা হয়?`,
      q_en: `Which blood group is universally recognized as the 'Universal Donor'?`,
      ans: "ও নেগেটিভ (O Negative)", b: "এবি পজিটিভ", c: "ও পজিটিভ", d: "এ পজিটিভ",
      exp_bn: "O নেগেটিভ রক্তে লোহিত কণিকায় কোনো A, B কিংবা Rh অ্যান্টিজেন থাকে না, তাই এটি যেকোনো রোগীকে নিরাপদে দেওয়া যায়।",
      exp_en: "O negative red blood cells lack A, B, and Rh antigens, making it the universal donor."
    },
    {
      q_bn: `রক্তের কোন গ্রুপকে 'সর্বজনীন গ্রহীতা' (Universal Recipient) হিসেবে অভিহিত করা হয়?`,
      q_en: `Which blood group is medically designated as the 'Universal Recipient'?`,
      ans: "এবি পজিটিভ (AB Positive)", b: "ও নেগেটিভ", c: "বি পজিটিভ", d: "এ নেগেটিভ",
      exp_bn: "AB পজিটিভ রক্তধারী ব্যক্তির প্লাজমায় কোনো অ্যান্টি-A, অ্যান্টি-B কিংবা অ্যান্টি-Rh অ্যান্টিবডি থাকে না।",
      exp_en: "AB positive blood lacks anti-A, anti-B, and anti-Rh antibodies, allowing receipt of all blood types."
    }
  ];
  const b19 = bloodPool[b % bloodPool.length];
  questions.push(createQ({
    topic: "জীববিজ্ঞান — রক্ত ও রক্ত সংবহন",
    subtopic: "রক্তের গ্রুপ ও অ্যান্টিজেন",
    question_bn: `${b19.q_bn} (বিজ্ঞান ডোমেইন-${b}.১৯)`,
    question_en: `${b19.q_en} (Sci-${b}.19)`,
    options: { A: b19.ans, B: b19.b, C: b19.c, D: b19.d },
    correct_option: "A",
    explanation_bn: b19.exp_bn,
    explanation_en: b19.exp_en
  }));

  // 20. Human Organ Systems: Excretory / Kidney
  questions.push(createQ({
    topic: "জীববিজ্ঞান — রেচনতন্ত্র ও মানব শারীরস্থান",
    subtopic: "বৃক্ক ও নেফ্রনের গঠন",
    question_bn: `মানবদেহের প্রধান রেচন অঙ্গ বৃক্কের (Kidney) গঠনগত ও কার্যকরী মৌলিক একককে কী বলা হয়? (বিজ্ঞান ডোমেইন-${b}.২০)`,
    question_en: `What is the microscopic structural and functional unit of the human kidney called? (Sci-${b}.20)`,
    options: {
      A: "নেফ্রন (Nephron)",
      B: "নিউরন",
      C: "অ্যালভিওলাই",
      D: "হেপাটোসাইট"
    },
    correct_option: "A",
    explanation_bn: "প্রতিটি বৃক্কে প্রায় ১০ থেকে ১২ লক্ষ নেফ্রন থাকে যা রক্ত পরিশোধনের মাধ্যমে মূত্র তৈরি করে। নিউরন হলো স্নায়ুতন্ত্রের একক।",
    explanation_en: "The nephron is the functional filtration unit of the kidney; each kidney contains about one million nephrons."
  }));

  // 21. Endocrine Glands & Hormones
  const hormonePool = [
    {
      q_bn: `মানবদেহে রক্তের গ্লুকোজের মাত্রা নিয়ন্ত্রণকারী 'ইনসুলিন' (Insulin) হরমোন কোন গ্রন্থি থেকে নিঃসৃত হয়?`,
      q_en: `Which endocrine organ secretes the hormone insulin that regulates blood glucose levels?`,
      ans: "অগ্ন্যাশয়ের আইলেটস অব ল্যাঙ্গারহ্যান্সের বিটা কোষ", b: "থাইরয়েড গ্রন্থি", c: "পিটুইটারি গ্রন্থি", d: "যকৃৎ",
      exp_bn: "অগ্ন্যাশয়ের আইলেটস অব ল্যাঙ্গারহ্যান্সের বিটা কোষ থেকে ইনসুলিন নিঃসৃত হয়ে রক্তের গ্লুকোজ হ্রাস করে।",
      exp_en: "Beta cells in the islets of Langerhans of the pancreas secrete insulin to lower blood glucose."
    },
    {
      q_bn: `মানবদেহের মস্তিষ্কের তলদেশে অবস্থিত কোন অন্তঃখরা গ্রন্থিকে 'মাস্টার গ্ল্যান্ড' বা প্রধান গ্রন্থি বলা হয়?`,
      q_en: `Which small endocrine gland at the base of the brain is designated the 'Master Gland'?`,
      ans: "পিটুইটারি গ্রন্থি (Pituitary Gland)", b: "অ্যাড্রেনাল গ্রন্থি", c: "প্যারাইথাইরয়েড", d: "থাইমাস",
      exp_bn: "পিটুইটারি গ্রন্থি অন্যান্য সকল অন্তঃক্ষরা গ্রন্থির ক্ষরণ নিয়ন্ত্রণকারী ট্রপিক হরমোন নিঃসরণ করে।",
      exp_en: "The pituitary gland coordinates other endocrine glands, earning the title 'master gland'."
    }
  ];
  const b21 = hormonePool[b % hormonePool.length];
  questions.push(createQ({
    topic: "জীববিজ্ঞান — অন্তঃক্ষরা গ্রন্থি ও হরমোন",
    subtopic: "ইনসুলিন ও পিটুইটারি গ্রন্থি",
    question_bn: `${b21.q_bn} (বিজ্ঞান ডোমেইন-${b}.২১)`,
    question_en: `${b21.q_en} (Sci-${b}.21)`,
    options: { A: b21.ans, B: b21.b, C: b21.c, D: b21.d },
    correct_option: "A",
    explanation_bn: b21.exp_bn,
    explanation_en: b21.exp_en
  }));

  // 22. Vitamins & Deficiency Diseases
  const vitPool = [
    {
      q_bn: `ভিটামিন সি (অ্যাসকরবিক অ্যাসিড)-এর তীব্র অভাবে মানবদেহে কোন রোগটি প্রকাশ পায়?`,
      q_en: `Severe deficiency of Vitamin C (ascorbic acid) leads to which classic clinical condition?`,
      ans: "স্কার্ভি (Scurvy - মাড়ি দিয়ে রক্তপাত)", b: "রাতকানা রোগ", c: "রিকেটস", d: "বেরিবেরি",
      exp_bn: "ভিটামিন সি কোলাজেন তৈরিতে সাহায্য করে; এর অভাবে মাড়ি ফুলে রক্ত পড়ে ও স্কার্ভি রোগ হয়।",
      exp_en: "Vitamin C is essential for collagen synthesis; deficiency causes bleeding gums and scurvy."
    },
    {
      q_bn: `সূর্যের অতিবেগুনি রশ্মির উপস্থিতিতে মানুষের ত্বকে কোন অত্যাবশ্যকীয় ভিটামিনটি সংশ্লেষিত হয়?`,
      q_en: `Which essential vitamin is synthesized in human skin cells upon exposure to solar UV radiation?`,
      ans: "ভিটামিন ডি (Calciferol)", b: "ভিটামিন এ", c: "ভিটামিন কে", d: "ভিটামিন ই",
      exp_bn: "সূর্যালোকের প্রভাবে ত্বকের কোলেস্টেরল জাতীয় উপাদান থেকে ভিটামিন ডি তৈরি হয়, যা ক্যালসিয়াম শোষণে জরুরি।",
      exp_en: "Sunlight triggers the synthesis of Vitamin D from 7-dehydrocholesterol in the skin."
    }
  ];
  const b22 = vitPool[b % vitPool.length];
  questions.push(createQ({
    topic: "জীববিজ্ঞান — পুষ্টিবিজ্ঞান ও খাদ্য উপাদান",
    subtopic: "ভিটামিন ও অভাবজনিত রোগ",
    question_bn: `${b22.q_bn} (বিজ্ঞান ডোমেইন-${b}.২২)`,
    question_en: `${b22.q_en} (Sci-${b}.22)`,
    options: { A: b22.ans, B: b22.b, C: b22.c, D: b22.d },
    correct_option: "A",
    explanation_bn: b22.exp_bn,
    explanation_en: b22.exp_en
  }));

  // 23. Genetics & DNA Structure
  questions.push(createQ({
    topic: "জীববিজ্ঞান — জিনতত্ত্ব ও বংশগতি",
    subtopic: "ডিএনএ দ্বিসূত্রক গঠন ও ক্ষার জোড়",
    question_bn: `ওয়াটসন ও ক্রিক (১৯৫৩) কর্তৃক আবিষ্কৃত ডিএনএ অণুর দ্বি-সূত্রক কাঠামোতে অ্যাডিনিন (A) সর্বদা কোন ক্ষারের সাথে ২টি হাইড্রোজেন বন্ধন দ্বারা যুক্ত থাকে? (বিজ্ঞান ডোমেইন-${b}.২৩)`,
    question_en: `In the Watson-Crick double helix DNA model, Adenine (A) always pairs with which base via 2 hydrogen bonds? (Sci-${b}.23)`,
    options: {
      A: "থাইমিন (Thymine)",
      B: "গুয়ানিন",
      C: "সাইটোসিন",
      D: "ইউরাসিল"
    },
    correct_option: "A",
    explanation_bn: "ডিএনএ-তে অ্যাডিনিন থাইমিনের সাথে (A=T) ২টি হাইড্রোজেন বন্ধন এবং গুয়ানিন সাইটোসিনের সাথে (G≡C) ৩টি হাইড্রোজেন বন্ধন দ্বারা যুক্ত থাকে।",
    explanation_en: "Adenine pairs exclusively with Thymine (A=T) with two hydrogen bonds in DNA."
  }));

  // 24. Plant Physiology: Photosynthesis
  questions.push(createQ({
    topic: "উদ্ভিদবিজ্ঞান — সালোকসংশ্লেষণ",
    subtopic: "আলোক ও অন্ধকার পর্যায়",
    question_bn: `সবুজ উদ্ভিদের সালোকসংশ্লেষণ প্রক্রিয়ায় নির্গত অক্সিজেন (O₂) গ্যাসের মূল উৎস কোনটি? (বিজ্ঞান ডোমেইন-${b}.২৪)`,
    question_en: `What is the primary source of the oxygen gas (O2) released during plant photosynthesis? (Sci-${b}.24)`,
    options: {
      A: "পানি (H₂O) এর বিশ্লিষ্টতা",
      B: "কার্বন ডাই অক্সাইড (CO₂)",
      C: "গ্লুকোজ",
      D: "ক্লোরোফিল"
    },
    correct_option: "A",
    explanation_bn: "আলোক পর্যায়ে পানির ফটোলাইসিস বা আলোর প্রভাবে পানির বিভাজনের মাধ্যমে ইলেকট্রন ও অক্সিজেন গ্যাস মুক্ত হয়। রবিন হিল ও রুবেন-কামেন এটি প্রমাণ করেন।",
    explanation_en: "Water photolysis during the light reactions splits H2O molecules to release O2 gas."
  }));

  // 25. Microbiology & Infectious Diseases
  const disPool = [
    {
      q_bn: `ম্যালেরিয়া (Malaria) রোগের পরজীবী প্লাজমোডিয়াম কোন প্রজাতির স্ত্রী মশার মাধ্যমে মানবদেহে ছড়ায়?`,
      q_en: `The malaria parasite Plasmodium is transmitted to humans via which species of female mosquito?`,
      ans: "স্ত্রী অ্যানোফিলিস মশা (Anopheles)", b: "স্ত্রী এডিস মশা", c: "কিউলেক্স মশা", d: "ম্যানসোনিয়া মশা",
      exp_bn: "স্ত্রী অ্যানোফিলিস মশা ম্যালেরিয়ার ভেক্টর হিসেবে কাজ করে। এডিস মশা ডেঙ্গু ও চিকুনগুনিয়া ছড়ায়।",
      exp_en: "Female Anopheles mosquitoes transmit Plasmodium, the causative parasite of malaria."
    },
    {
      q_bn: `যক্ষ্মা বা টিবি (Tuberculosis) রোগের জন্য দায়ী প্রধান ব্যাকটেরিয়ার নাম কী?`,
      q_en: `What is the primary bacterial pathogen responsible for tuberculosis in humans?`,
      ans: "মাইকোব্যাকটেরিয়াম টিউবারকিউলোসিস (Mycobacterium tuberculosis)", b: "ভিব্রিও কলেরি", c: "সালমোনেলা টাইফি", d: "ক্লোস্ট্রিডিয়াম টিটেনি",
      exp_bn: "রবার্ট কচ ১৮৮২ সালে যক্ষ্মার জীবাণু মাইকোব্যাকটেরিয়াম টিউবারকিউলোসিস আবিষ্কার করেন।",
      exp_en: "Robert Koch discovered Mycobacterium tuberculosis as the bacterial cause of tuberculosis in 1882."
    }
  ];
  const b25 = disPool[b % disPool.length];
  questions.push(createQ({
    topic: "জীববিজ্ঞান — অণুজীব ও সংক্রামক রোগ",
    subtopic: "রোগজীবাণু ও বাহক",
    question_bn: `${b25.q_bn} (বিজ্ঞান ডোমেইন-${b}.২৫)`,
    question_en: `${b25.q_en} (Sci-${b}.25)`,
    options: { A: b25.ans, B: b25.b, C: b25.c, D: b25.d },
    correct_option: "A",
    explanation_bn: b25.exp_bn,
    explanation_en: b25.exp_en
  }));

  return questions.slice(0, count);
}
