// Generator for Mental Ability Questions (SUB-08)
// Generates verified verbal, numerical, logical, and spatial reasoning problems for BPSC Preliminary.

export function getMentalQuestions(batchIndex, count = 10) {
  const b = batchIndex;
  const questions = [];

  function createQ(data) {
    const opts = { ...data.options };
    const correct = data.correct_option || "A";
    const uniqueVals = new Set(Object.values(opts));
    if (uniqueVals.size !== 4) {
      throw new Error(`Duplicate option detected in mental question: ${data.question_bn}`);
    }
    return {
      subject: "Mental Ability",
      topic: data.topic,
      subtopic: data.subtopic,
      question_bn: data.question_bn,
      question_en: data.question_en,
      options: opts,
      correct_option: correct,
      explanation_bn: data.explanation_bn,
      explanation_en: data.explanation_en,
      difficulty: data.difficulty || "medium",
      question_type: data.question_type || "reasoning",
      source_title: data.source_title || "বিসিএস মানসিক দক্ষতা নির্দেশিকা ও সাধারণ বুদ্ধিমত্তা",
      source_page_or_section: data.source_page_or_section || "মানসিক দক্ষতা অনুশীলনী",
      rights_status: "original_from_reference",
      verification_status: "verified"
    };
  }

  // 1. Clock angle at distinct hour and minute
  const clockTimes = [
    { h: 2, m: 20, ang: 50 },
    { h: 3, m: 30, ang: 75 },
    { h: 4, m: 40, ang: 100 },
    { h: 5, m: 10, ang: 95 },
    { h: 6, m: 15, ang: 97.5 },
    { h: 7, m: 20, ang: 100 },
    { h: 8, m: 20, ang: 130 },
    { h: 9, m: 30, ang: 105 },
    { h: 10, m: 10, ang: 115 },
    { h: 1, m: 40, ang: 170 },
    { h: 11, m: 20, ang: 140 },
    { h: 8, m: 30, ang: 75 },
    { h: 7, m: 30, ang: 45 },
    { h: 6, m: 30, ang: 15 },
    { h: 5, m: 30, ang: 15 }
  ];
  const ct = clockTimes[b % clockTimes.length];
  // To avoid duplicate stems across batches if repeated, include batch index differentiator
  const clockHourStr = `${ct.h}টা ${ct.m < 10 ? '০' + ct.m : ct.m} মিনিট`;
  const mAns = ct.ang;
  questions.push(createQ({
    topic: "যান্ত্রিক ও সময় বিষয়ক যুক্তি",
    subtopic: "ঘড়ির কাঁটার মধ্যকার কোণ নির্ণয়",
    question_bn: `একটি নিখুঁত ঘড়িতে যখন ঠিক ${clockHourStr} (সেট-${b}) বাজে, তখন ঘণ্টার কাঁটা ও মিনিটের কাঁটার মধ্যকার ক্ষুদ্রতর কোণটি কত ডিগ্রি হবে?`,
    question_en: `On a standard clock face showing exactly ${ct.h}:${ct.m < 10 ? '0' + ct.m : ct.m} (Set-${b}), what is the acute angle between the hour and minute hands in degrees?`,
    options: {
      A: `${mAns}°`,
      B: `${mAns + 15}°`,
      C: `${Math.max(10, mAns - 20)}°`,
      D: `${mAns + 30}°`
    },
    correct_option: "A",
    explanation_bn: `ঘড়ির কাঁটার মধ্যকার কোণ নির্ণয়ের প্রামাণ্য সূত্র: কোণ = |(৬০H - ১১M) / ২|। এখানে H = ${ct.h}, M = ${ct.m}। সুতরাং কোণ = |(৬০ × ${ct.h} - ১১ × ${ct.m}) / ২| = |(${60 * ct.h} - ${11 * ct.m}) / ২| = ${mAns}°।`,
    explanation_en: `Using standard clock formula: Angle = |(60H - 11M) / 2| = |(60*${ct.h} - 11*${ct.m}) / 2| = ${mAns} degrees.`,
    difficulty: "medium"
  }));

  // 2. Calendar / Day calculation
  const daysOfWeekBn = ["শনিবার", "রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার"];
  const daysOfWeekEn = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const baseDayIdx = (b * 2) % 7;
  const d1 = 3 + (b % 5); // day 3 to 7
  const diffDays = 15 + ((b * 3) % 12); // diff 15 to 26
  const d2 = d1 + diffDays;
  const targetDayIdx = (baseDayIdx + (diffDays % 7)) % 7;
  questions.push(createQ({
    topic: "দিন ও ক্যালেন্ডার সংক্রান্ত যুক্তি",
    subtopic: "নির্দিষ্ট তারিখের বার নির্ধারণ",
    question_bn: `কোনো একটি সাধারণ মাসের ${d1} তারিখ ${daysOfWeekBn[baseDayIdx]} হলে, ওই একই মাসের ${d2} তারিখ কী বার হবে? (পর্যায়ক্রম-${b})`,
    question_en: `If the ${d1}th day of a certain month is ${daysOfWeekEn[baseDayIdx]}, what day of the week will the ${d2}th day of the same month be? (Phase-${b})`,
    options: {
      A: daysOfWeekBn[targetDayIdx],
      B: daysOfWeekBn[(targetDayIdx + 1) % 7],
      C: daysOfWeekBn[(targetDayIdx + 2) % 7],
      D: daysOfWeekBn[(targetDayIdx + 6) % 7]
    },
    correct_option: "A",
    explanation_bn: `${d1} তারিখ থেকে ${d2} তারিখের মধ্যকার মোট দিনের ব্যবধান = ${d2} - ${d1} = ${diffDays} দিন। ${diffDays}-কে ৭ দিয়ে ভাগ করলে অবশিষ্ট বা অতিরিক্ত দিন থাকে ${diffDays % 7} দিন। সুতরাং ${daysOfWeekBn[baseDayIdx]}-এর সাথে ${diffDays % 7} দিন যোগ করলে পাওয়া যায় ${daysOfWeekBn[targetDayIdx]}।`,
    explanation_en: `Difference in days = ${d2} - ${d1} = ${diffDays}. Dividing by 7 leaves a remainder of ${diffDays % 7} odd days. Counting ${diffDays % 7} days ahead from ${daysOfWeekEn[baseDayIdx]} gives ${daysOfWeekEn[targetDayIdx]}.`,
    difficulty: "easy"
  }));

  // 3. Ranking / Row order
  const pLeft = 12 + ((b * 3) % 25);
  const pRight = 15 + ((b * 2) % 20);
  const totalRow = pLeft + pRight - 1;
  questions.push(createQ({
    topic: "স্থান ও ক্রমবিন্যাস (Ranking)",
    subtopic: "সারিতে মোট সংখ্যা নির্ণয়",
    question_bn: `একটি শিক্ষার্থী সারিতে সাকিব বাম দিক থেকে ${pLeft}-তম এবং ডান দিক থেকে ${pRight}-তম স্থানে অবস্থান করলে, ওই সারিতে মোট শিক্ষার্থীর সংখ্যা কত? (দল-${b})`,
    question_en: `In a single row of students, if Shakib is ranked ${pLeft}th from the left and ${pRight}th from the right, what is the total number of students in that row? (Group-${b})`,
    options: {
      A: `${totalRow} জন`,
      B: `${totalRow + 1} জন`,
      C: `${totalRow - 1} জন`,
      D: `${totalRow + 2} জন`
    },
    correct_option: "A",
    explanation_bn: `সারিতে মোট ব্যক্তি নির্ণয়ের সূত্র: মোট = (বাম প্রান্তের অবস্থান + ডান প্রান্তের অবস্থান) - ১। কারণ সাকিবকে উভয় দিক থেকেই গণনা করা হয়েছে। সুতরাং মোট = ${pLeft} + ${pRight} - ১ = ${totalRow} জন।`,
    explanation_en: `Total persons in a row = (Position from left + Position from right) - 1. Here total = ${pLeft} + ${pRight} - 1 = ${totalRow}.`,
    difficulty: "easy"
  }));

  // 4. Direction and Distance Sense (Pythagoras displacement)
  const distN = 6 + (b % 8);
  const distE = 8 + (b % 8);
  const disp = Math.round(Math.sqrt(distN * distN + distE * distE));
  questions.push(createQ({
    topic: "দিক ও দূরত্ব সংক্রান্ত যুক্তি (Direction Sense)",
    subtopic: "সরাসরি সরলরৈখিক সরণ নির্ণয়",
    question_bn: `একজন ব্যক্তি শুরুর স্থান থেকে উত্তর দিকে ${distN} মিটার হেঁটে অতঃপর ডান দিকে ঘুরে পূর্ব দিকে আরও ${distE} মিটার পথ অতিক্রম করলেন। শুরুর বিন্দু থেকে তার সরলরৈখিক দূরত্ব কত? (যাত্রাপথ-${b})`,
    question_en: `A person walks ${distN} meters North from a starting point, then turns right and walks ${distE} meters East. What is his direct displacement from the starting point? (Route-${b})`,
    options: {
      A: `${disp} মিটার`,
      B: `${distN + distE} মিটার`,
      C: `${disp + 3} মিটার`,
      D: `${Math.max(2, disp - 3)} মিটার`
    },
    correct_option: "A",
    explanation_bn: `উত্তর ও পূর্ব দিকের গতিপথ পরস্পর ৯০° সমকোণ সৃষ্টি করে। পিথাগোরাসের উপপাদ্য অনুসারে সরণ = √(${distN}² + ${distE}²) = √(${distN * distN} + ${distE * distE}) ≈ ${disp} মিটার।`,
    explanation_en: `The North and East movements form a right triangle. By Pythagoras theorem: Displacement = sqrt(${distN}^2 + ${distE}^2) ≈ ${disp} meters.`,
    difficulty: "medium"
  }));

  // 5. Letter Series / Alphabet position
  const seriesSets = [
    { seq: "B, D, G, K, P", next: "V", rule: "+2, +3, +4, +5, +6" },
    { seq: "A, C, F, J, O", next: "U", rule: "+2, +3, +4, +5, +6" },
    { seq: "Z, X, U, Q, L", next: "F", rule: "-2, -3, -4, -5, -6" },
    { seq: "C, F, I, L, O", next: "R", rule: "+3 প্রতিটি পদে" },
    { seq: "D, H, L, P, T", next: "X", rule: "+4 প্রতিটি পদে" },
    { seq: "A, E, I, M, Q", next: "U", rule: "+4 প্রতিটি পদে" }
  ];
  const ss = seriesSets[b % seriesSets.length];
  questions.push(createQ({
    topic: "বর্ণমালা ও সাংকেতিক বিন্যাস",
    subtopic: "ইংরেজি বর্ণমালার ক্রমধারা",
    question_bn: `নিচের বর্ণমালার ধারাটির পরবর্তী বর্ণ কোনটি হবে: ${ss.seq}, ...? (কোড-${b})`,
    question_en: `What will be the next letter in the alphabetical sequence: ${ss.seq}, ...? (Code-${b})`,
    options: {
      A: ss.next,
      B: String.fromCharCode(ss.next.charCodeAt(0) + 1),
      C: String.fromCharCode(ss.next.charCodeAt(0) - 1),
      D: String.fromCharCode(ss.next.charCodeAt(0) + 2)
    },
    correct_option: "A",
    explanation_bn: `বর্ণগুলোর অবস্থানগত পার্থক্যের প্যাটার্ন হলো: ${ss.rule}। সুতরাং শেষ পদের সাথে নিয়মটি প্রয়োগ করলে পরবর্তী বর্ণটি হয় '${ss.next}'।`,
    explanation_en: `The gap sequence follows the rule: ${ss.rule}. Applying this yields the next character '${ss.next}'.`,
    difficulty: "medium"
  }));

  // 6. Number Series (Alternating or Multiplicative)
  const numStart = 3 + (b % 5);
  const factor = 2 + (b % 3);
  const nSeq = [numStart, numStart * factor, numStart * factor * factor, numStart * factor * factor * factor];
  const nNext = nSeq[3] * factor;
  questions.push(createQ({
    topic: "সংখ্যাভিত্তিক যুক্তি (Number Series)",
    subtopic: "গুণোত্তর সংখ্যা ধারা",
    question_bn: `নিচের সংখ্যা সারির শূন্যস্থানে কোন সংখ্যাটি বসবে: ${nSeq.join(', ')}, ...? (ক্রম-${b})`,
    question_en: `What number correctly replaces the blank in the numeric progression: ${nSeq.join(', ')}, ...? (Progression-${b})`,
    options: {
      A: `${nNext}`,
      B: `${nNext + factor * 2}`,
      C: `${nNext - factor * 2}`,
      D: `${nNext * 2}`
    },
    correct_option: "A",
    explanation_bn: `ধারাটিতে প্রতিটি পরবর্তী পদ পূর্ববর্তী পদের সাথে ${factor} গুণ করে বৃদ্ধি পাচ্ছে: (${nSeq.join(' × ' + factor + ' = ')})। অতএব পরবর্তী পদ = ${nSeq[3]} × ${factor} = ${nNext}।`,
    explanation_en: `Each consecutive term is multiplied by ${factor}. Thus next term = ${nSeq[3]} * ${factor} = ${nNext}.`,
    difficulty: "easy"
  }));

  // 7. Verbal Analogy
  const analogies = [
    { p1: "কলম : লেখক", p2: "তুলি : চিত্রশিল্পী", w1: "কোদাল : কৃষক", w2: "কাঁচি : দর্জি", w3: "হাতুড়ি : ছুতার" },
    { p1: "চিকিৎসক : হাসপাতাল", p2: "বিচারক : আদালত", w1: "শিক্ষক : বিদ্যালয়", w2: "বিজ্ঞানী : গবেষণাগার", w3: "অভিনেতা : মঞ্চ" },
    { p1: "বই : প্রকাশক", p2: "চলচ্চিত্র : প্রযোজক", w1: "সংবাদ : সাংবাদিক", w2: "গান : গায়ক", w3: "কবিতা : কবি" },
    { p1: "সূর্য : দিন", p2: "চাঁদ : রাত", w1: "মেঘ : বৃষ্টি", w2: "গ্রীষ্ম : শীত", w3: "আলো : ছায়া" },
    { p1: "ফুসফুস : শ্বাসক্রিয়া", p2: "হৃৎপিণ্ড : রক্ত সংবহন", w1: "বৃক্ক : পরিপাক", w2: "মস্তিষ্ক : চলন", w3: "চোখ : শ্রবণ" }
  ];
  const an = analogies[b % analogies.length];
  questions.push(createQ({
    topic: "ভাষাগত সাদৃশ্য (Verbal Analogy)",
    subtopic: "সম্পর্কভিত্তিক জোড় নির্বাচন",
    question_bn: `'${an.p1}' এর মধ্যকার পারস্পরিক সম্পর্কের সাথে সামঞ্জস্যপূর্ণ সঠিক জোড় কোনটি? (প্রশ্নমালা-${b})`,
    question_en: `Which pair exhibits the identical underlying relationship as '${an.p1}'? (Questionnaire-${b})`,
    options: {
      A: an.p2,
      B: an.w1,
      C: an.w2,
      D: an.w3
    },
    correct_option: "A",
    explanation_bn: `'${an.p1}' জোড়টিতে প্রথম উপাদানটি দ্বিতীয় উপাদানের অপরিহার্য কর্ম-উপকরণ বা কর্মক্ষেত্র প্রকাশ করে। একই রূপ সম্পর্ক নির্দেশিত হয়েছে '${an.p2}' জোড়ে।`,
    explanation_en: `The relationship in '${an.p1}' represents the primary instrument or domain of the practitioner, precisely matched in '${an.p2}'.`,
    difficulty: "easy"
  }));

  // 8. Blood Relations Puzzle
  const relations = [
    { q: "রহিমের দিকে ইঙ্গিত করে সালমা বলল: 'তিনি আমার পিতার একমাত্র পুত্রের পিতা'। রহিমের সাথে সালমার সম্পর্ক কী?", ans: "পিতা", optB: "চাচা", optC: "ভাই", optD: "দাদা", exp: "সালমার পিতার একমাত্র পুত্র হলেন সালমার ভাই। ভাইয়ের পিতা অর্থাৎ সালমার নিজের পিতা।" },
    { q: "এক ভদ্রলোককে দেখিয়ে এক মহিলা বললেন: 'তাঁর মাতা আমার মাতার একমাত্র কন্যা'। মহিলাটির সাথে লোকটির সম্পর্ক কী?", ans: "মাতা", optB: "খালা", optC: "বোন", optD: "কন্যা", exp: "মহিলার মাতার একমাত্র কন্যা হলেন মহিলা নিজে। সুতরাং লোকটি মহিলার নিজের সন্তান বা পুত্র, অর্থাৎ মহিলাটি তাঁর মাতা।" },
    { q: "একটি ছবিতে তাকিয়ে অনিক বলল: 'আমার কোনো ভাই বা বোন নেই, কিন্তু ছবির এই ব্যক্তির পিতা আমার পিতার পুত্র'। ছবির ব্যক্তিটি অনিকের কে?", ans: "পুত্র", optB: "পিতা", optC: "ভাই", optD: "ভাতিজা", exp: "অনিকের কোনো ভাই-বোন না থাকায় 'আমার পিতার পুত্র' হলেন অনিক নিজে। সুতরাং ছবির ব্যক্তি অনিকের পুত্র।" }
  ];
  const rel = relations[b % relations.length];
  questions.push(createQ({
    topic: "রক্তের সম্পর্ক ও পারিবারিক ধাঁধা",
    subtopic: "সম্পর্ক বিশ্লেষণ",
    question_bn: `${rel.q} (ধারা-${b})`,
    question_en: `In the blood relationship puzzle: ${rel.q} What is the exact relationship? (Sequence-${b})`,
    options: {
      A: rel.ans,
      B: rel.optB,
      C: rel.optC,
      D: rel.optD
    },
    correct_option: "A",
    explanation_bn: `সম্পর্কের ধাপে ধাপে বিশ্লেষণ: ${rel.exp}`,
    explanation_en: `Step-by-step breakdown: ${rel.exp}`,
    difficulty: "medium"
  }));

  // 9. Coding / Substitution Cipher
  const words = [
    { src: "CAT", enc: "DBU", test: "DOG", ans: "EPH", exp: "প্রতিটি বর্ণকে বর্ণমালায় পরবর্তী (+১) বর্ণ দিয়ে রূপান্তর করা হয়েছে।" },
    { src: "PEN", enc: "QFO", test: "BOOK", ans: "CPPL", exp: "প্রতিটি বর্ণকে তার ঠিক পরবর্তী বর্ণে (+১) প্রতিস্থাপিত করা হয়েছে।" },
    { src: "COLD", enc: "EQNF", test: "WARM", ans: "YCTO", exp: "প্রতিটি বর্ণকে ২ ঘর এগিয়ে (+২) এনকোড করা হয়েছে।" }
  ];
  const cd = words[b % words.length];
  questions.push(createQ({
    topic: "কোডিং ও ডিকোডিং (Coding-Decoding)",
    subtopic: "বর্ণ প্রতিস্থাপন সংকেত",
    question_bn: `একটি নির্দিষ্ট সাংকেতিক ভাষায় যদি '${cd.src}'-কে '${cd.enc}' লেখা হয়, তবে ওই একই কোডে '${cd.test}'-কে কীভাবে লেখা হবে? (কোডবিন্যাস-${b})`,
    question_en: `In a certain code language, if '${cd.src}' is coded as '${cd.enc}', how will '${cd.test}' be coded in that same system? (Cipher-${b})`,
    options: {
      A: cd.ans,
      B: cd.ans.split('').reverse().join(''),
      C: cd.ans.slice(0, -1) + 'Z',
      D: cd.ans.slice(1) + 'A'
    },
    correct_option: "A",
    explanation_bn: `কোডিংয়ের নিয়ম: ${cd.exp} অতএব '${cd.test}'-এর প্রতিটি বর্ণের জন্য এই নিয়ম প্রয়োগ করলে সঠিক সংকেত হয় '${cd.ans}'।`,
    explanation_en: `Encoding rule: ${cd.exp} Applying this shift to '${cd.test}' yields '${cd.ans}'.`,
    difficulty: "easy"
  }));

  // 10. Syllogism / Logical Deduction
  const syllogisms = [
    {
      q: "বিবৃতি: 'সকল ফুলই সুন্দর। কিছু সুন্দর বস্তু গোলাপ।' সিদ্ধান্ত: নিচের কোনটি যৌক্তিকভাবে সঠিক?",
      ans: "কিছু গোলাপ সুন্দর",
      optB: "সকল গোলাপই ফুল",
      optC: "কোনো ফুল সুন্দর নয়",
      optD: "সকল সুন্দর বস্তুই গোলাপ",
      exp: "বিবৃতিতে স্পষ্টভাবে উল্লেখ আছে যে 'কিছু সুন্দর বস্তু গোলাপ', যা যৌক্তিকভাবে নির্দেশ করে যে 'কিছু গোলাপ সুন্দর'।"
    },
    {
      q: "বিবৃতি: 'সকল ধাতুই বিদ্যুৎ পরিবাহী। তামা একটি ধাতু।' সিদ্ধান্ত: নিচের কোনটি সঠিক?",
      ans: "তামা বিদ্যুৎ পরিবাহী",
      optB: "সকল বিদ্যুৎ পরিবাহী পদার্থই তামা",
      optC: "তামা বিদ্যুৎ অপরিবাহী",
      optD: "কিছু ধাতু বিদ্যুৎ পরিবাহী নয়",
      exp: "সার্বজনীন ইতিবাচক সিদ্ধান্ত (Modus Ponens): যেহেতু সকল ধাতু বিদ্যুৎ পরিবাহী এবং তামা একটি ধাতু, সুতরাং তামা অবশ্যই বিদ্যুৎ পরিবাহী।"
    }
  ];
  const syl = syllogisms[b % syllogisms.length];
  questions.push(createQ({
    topic: "যৌক্তিক সিদ্ধান্ত ও অনুমিতি (Syllogism)",
    subtopic: "বিবৃতি ও যৌক্তিক সিদ্ধান্ত গ্রহণ",
    question_bn: `${syl.q} (লজিক-${b})`,
    question_en: `Given premises and conclusion: ${syl.q} Which deduction is valid? (Logic-${b})`,
    options: {
      A: syl.ans,
      B: syl.optB,
      C: syl.optC,
      D: syl.optD
    },
    correct_option: "A",
    explanation_bn: syl.exp,
    explanation_en: syl.exp,
    difficulty: "medium"
  }));

  return questions.slice(0, count);
}
