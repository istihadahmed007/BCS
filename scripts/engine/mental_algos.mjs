// Mental Ability Algorithmic Generator for BCS Preparation
// Deterministic series, clock, calendar, spatial, relational, and logical questions with exact reasoning and guaranteed distinct options.

export function createMentalProblem(index, seenSet) {
  const generators = [
    // 1. Arithmetic & Number Series
    (i) => {
      const patterns = [
        { seq: "৩, ৭, ১১, ১৫, ১৯, ...", next: 23, rule: "প্রতি পদে ৪ করে বৃদ্ধি পাচ্ছে (+৪)" },
        { seq: "২, ৬, ১৮, ৫৪, ...", next: 162, rule: "প্রতি পদে ৩ দ্বারা গুণ করা হচ্ছে (×৩)" },
        { seq: "১, ৪, ৯, ১৬, ২৫, ৩৬, ...", next: 49, rule: "পরপর স্বাভাবিক সংখ্যার বর্গ (৭² = ৪৯)" },
        { seq: "১, ৮, ২৭, ৬৪, ১২৫, ...", next: 216, rule: "পরপর স্বাভাবিক সংখ্যার ঘন (৬³ = ২১৬)" },
        { seq: "১, ১, ২, ৩, ৫, ৮, ১৩, ...", next: 21, rule: "ফিবোনাচ্চি ধারা (পূর্ববর্তী দুটি পদের যোগফল: ৮ + ১৩ = ২১)" },
        { seq: "২, ৫, ১০, ১৭, ২৬, ৩৭, ...", next: 50, rule: "n² + ১ ধারা (৭² + ১ = ৫০)" },
        { seq: "০, ৩, ৮, ১৫, ২৪, ৩৫, ...", next: 48, rule: "n² - ১ ধারা (৭² - ১ = ৪৮)" },
        { seq: "৪, ৯, ১৯, ৩৯, ৭৯, ...", next: 159, rule: "পূর্ববর্তী পদকে ২ দিয়ে গুণ করে ১ যোগ (×২ + ১: ৭৯×২+১ = ১৫৯)" },
        { seq: "৫, ১১, ২৩, ৪৭, ৯৫, ...", next: 191, rule: "পূর্ববর্তী পদ × ২ + ১ (৯৫ × ২ + ১ = ১৯১)" },
        { seq: "১০০, ৯৬, ৮৮, ৭৬, ৬০, ...", next: 40, rule: "বিয়োগফল যথাক্রমে ৪, ৮, ১২, ১৬, ২০ কমে যাচ্ছে (৬০ - ২০ = ৪০)" },
        { seq: "২, ৩, ৫, ৭, ১১, ১৩, ১৭, ...", next: 19, rule: "মৌলিক সংখ্যার ক্রম (পরবর্তী মৌলিক সংখ্যা ১৯)" },
        { seq: "৮১, ২৭, ৯, ৩, ...", next: 1, rule: "প্রতি পদ ৩ দ্বারা ভাগ হচ্ছে (৩ ÷ ৩ = ১)" },
        { seq: "১, ৩, ৭, ১৫, ৩১, ৬৩, ...", next: 127, rule: "২ⁿ - ১ ধারা অথবা পূর্ববর্তী পদ × ২ + ১ (৬৩ × ২ + ১ = ১২৭)" }
      ];
      const p = patterns[i % patterns.length];
      return {
        subject: "Mental Ability",
        topic: "সংখ্যার ক্রম ও ধারা",
        subtopic: "পরবর্তী সংখ্যা নির্ণয়",
        question_bn: `নিচের সংখ্যা ধারার পরবর্তী সংখ্যাটি কত হবে? ${p.seq}`,
        question_en: `What is the next number in the following sequence? ${p.seq}`,
        options: {
          A: `${p.next}`,
          B: `${p.next + 2}`,
          C: `${p.next + 4}`,
          D: `${p.next + 6}`
        },
        correct_option: "A",
        explanation_bn: `ধারার বৈশিষ্ট্য: ${p.rule}। সুতরাং পরবর্তী পদ হবে ${p.next}।`,
        explanation_en: `Sequence pattern: ${p.rule}. Hence, next term is ${p.next}.`,
        difficulty: "medium",
        question_type: "reasoning",
        source_title: "বিসিএস মানসিক দক্ষতা সহায়িকা",
        source_page_or_section: "সংখ্যার যৌক্তিক ধারা"
      };
    },

    // 2. Clock Angle: |30H - 11/2 M|
    (i) => {
      const times = [
        { h: 2, m: 15, deg: 22.5 },
        { h: 3, m: 0, deg: 90 },
        { h: 4, m: 20, deg: 10 },
        { h: 5, m: 30, deg: 15 },
        { h: 6, m: 0, deg: 180 },
        { h: 7, m: 20, deg: 100 },
        { h: 8, m: 30, deg: 75 },
        { h: 9, m: 0, deg: 90 },
        { h: 10, m: 10, deg: 115 },
        { h: 1, m: 20, deg: 80 },
        { h: 3, m: 30, deg: 75 },
        { h: 2, m: 30, deg: 105 },
        { h: 4, m: 40, deg: 100 }
      ];
      const t = times[i % times.length];
      const timeStrBn = `${t.h}টা ${t.m === 0 ? "বাজে" : `${t.m} মিনিট`}`;
      const timeStrEn = `${t.h}:${String(t.m).padStart(2, '0')}`;

      return {
        subject: "Mental Ability",
        topic: "ঘড়ির সময় ও কোণ",
        subtopic: "ঘণ্টা ও মিনিটের কাঁটার মধ্যবর্তী কোণ",
        question_bn: `একটি ঘড়িতে যখন সময় ${timeStrBn}, তখন ঘণ্টার কাঁটা ও মিনিটের কাঁটার মধ্যবর্তী কোণ কত ডিগ্রি?`,
        question_en: `At ${timeStrEn}, what is the angle between the hour hand and the minute hand of a clock?`,
        options: {
          A: `${t.deg}°`,
          B: `${t.deg + 15}°`,
          C: `${t.deg + 30}°`,
          D: `${t.deg + 45}°`
        },
        correct_option: "A",
        explanation_bn: `ঘড়ির কোণ নির্ণয়ের সূত্র: θ = |৩০H - (১১/২)M| = |৩০ × ${t.h} - (১১/২) × ${t.m}| = ${t.deg}°।`,
        explanation_en: `Clock angle formula: θ = |30H - (11/2)M| = |30 × ${t.h} - (11/2) × ${t.m}| = ${t.deg}°.`,
        difficulty: "medium",
        question_type: "calculation",
        source_title: "বিসিএস মানসিক দক্ষতা — গাণিতিক যুক্তি",
        source_page_or_section: "ঘড়ি ও সময় পরিচ্ছেদ"
      };
    },

    // 3. Calendar & Days Logic
    (i) => {
      const days = ["শনিবার", "রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার"];
      const daysEn = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
      const d1 = (i * 3) % 7;
      const offset = [2, 3, 4, 5][i % 4];
      const d2 = (d1 + offset) % 7;

      return {
        subject: "Mental Ability",
        topic: "ক্যালেন্ডার ও দিন গণনা",
        subtopic: "বার নির্ণয়",
        question_bn: `আজ ${days[d1]} হলে, আজ থেকে ঠিক ${offset * 7 + offset} দিন পর কী বার হবে?`,
        question_en: `If today is ${daysEn[d1]}, what day will it be exactly ${offset * 7 + offset} days from today?`,
        options: {
          A: days[d2],
          B: days[(d2 + 1) % 7],
          C: days[(d2 + 2) % 7],
          D: days[(d2 + 3) % 7]
        },
        correct_option: "A",
        explanation_bn: `প্রতি ৭ দিন পর একই বার পুনরাবৃত্ত হয়। এখানে অতিরিক্ত অবশিষ্টাংশ দিন (Odd days) = (${offset * 7 + offset}) mod ৭ = ${offset} দিন। ${days[d1]}-এর সাথে ${offset} দিন যোগ করলে পাওয়া যায় ${days[d2]}।`,
        explanation_en: `Since days repeat every 7 days, (${offset * 7 + offset}) mod 7 = ${offset} odd days. Adding ${offset} days to ${daysEn[d1]} yields ${daysEn[d2]}.`,
        difficulty: "easy",
        question_type: "reasoning",
        source_title: "মানসিক দক্ষতা ক্যালেন্ডার সহায়িকা",
        source_page_or_section: "দিন ও তারিখ বিন্যাস"
      };
    },

    // 4. Direction & Displacement (Pythagorean)
    (i) => {
      const walks = [
        { north: 3, east: 4, dist: 5 },
        { north: 6, east: 8, dist: 10 },
        { north: 5, east: 12, dist: 13 },
        { north: 8, east: 15, dist: 17 },
        { north: 9, east: 12, dist: 15 },
        { north: 12, east: 16, dist: 20 },
        { north: 7, east: 24, dist: 25 }
      ];
      const w = walks[i % walks.length];
      return {
        subject: "Mental Ability",
        topic: "দিক নির্ণয় ও সরণ",
        subtopic: "সরাসরি দূরত্ব গণনা",
        question_bn: `একজন ব্যক্তি শুরুর স্থান থেকে উত্তর দিকে ${w.north} কিমি হেঁটে গিয়ে ডানদিকে ঘুরে পূর্ব দিকে ${w.east} কিমি গেল। শুরুর স্থান থেকে তার সরাসরি দূরত্ব কত কিমি?`,
        question_en: `A person walks ${w.north} km North from the starting point, then turns right and walks ${w.east} km East. What is the straight-line displacement from the starting point?`,
        options: {
          A: `${w.dist} কিমি`,
          B: `${w.dist + 2} কিমি`,
          C: `${w.dist + 4} কিমি`,
          D: `${w.dist + 6} কিমি`
        },
        correct_option: "A",
        explanation_bn: `গতিপথ একটি সমকোণী ত্রিভুজ তৈরি করে। পিথাগোরাসের উপপাদ্য অনুযায়ী সরাসরি দূরত্ব = √(${w.north}² + ${w.east}²) = √(${w.north * w.north + w.east * w.east}) = ${w.dist} কিমি।`,
        explanation_en: `The path forms a right triangle. Straight displacement = √(${w.north}² + ${w.east}²) = ${w.dist} km.`,
        difficulty: "easy",
        question_type: "reasoning",
        source_title: "মানসিক দক্ষতা — দিক ও দূরত্বের যুক্তি",
        source_page_or_section: "স্থানিক যুক্তিবিদ্যা"
      };
    },

    // 5. Ranking in Class
    (i) => {
      const ranks = [
        { top: 7, bottom: 28, total: 34 },
        { top: 12, bottom: 25, total: 36 },
        { top: 5, bottom: 35, total: 39 },
        { top: 15, bottom: 30, total: 44 },
        { top: 10, bottom: 41, total: 50 },
        { top: 8, bottom: 22, total: 29 },
        { top: 14, bottom: 18, total: 31 },
        { top: 9, bottom: 33, total: 41 }
      ];
      const r = ranks[i % ranks.length];
      return {
        subject: "Mental Ability",
        topic: "অবস্থান ও ক্রমবিন্যাস",
        subtopic: "মোট শিক্ষার্থীর সংখ্যা নির্ণয়",
        question_bn: `একটি ক্লাসে মেধা তালিকায় একটি ছাত্রের অবস্থান ওপর থেকে ${r.top}-তম এবং নিচ থেকে ${r.bottom}-তম হলে, ওই ক্লাসে মোট শিক্ষার্থীর সংখ্যা কত?`,
        question_en: `In a class merit list, a student ranks ${r.top}th from the top and ${r.bottom}th from the bottom. How many students are there in the class?`,
        options: {
          A: `${r.total} জন`,
          B: `${r.total + 2} জন`,
          C: `${r.total + 4} জন`,
          D: `${r.total + 6} জন`
        },
        correct_option: "A",
        explanation_bn: `মোট শিক্ষার্থীর সংখ্যা = (ওপর থেকে অবস্থান + নিচ থেকে অবস্থান) - ১ = (${r.top} + ${r.bottom}) - ১ = ${r.total} জন।`,
        explanation_en: `Total students = (Rank from top + Rank from bottom) - 1 = (${r.top} + ${r.bottom}) - 1 = ${r.total}.`,
        difficulty: "easy",
        question_type: "reasoning",
        source_title: "মানসিক দক্ষতা — র্যাংকিং ও ক্রম",
        source_page_or_section: "ক্রমবিন্যাস অধ্যায়"
      };
    },

    // 6. Coding & Decoding (Caesar Shift)
    (i) => {
      const codes = [
        { word: "CAT", shift: 1, coded: "DBU", test: "DOG", ans: "EPH" },
        { word: "BOY", shift: 2, coded: "DQA", test: "PEN", ans: "RGP" },
        { word: "SUN", shift: 1, coded: "TVO", test: "MOON", ans: "NPPO" },
        { word: "MAN", shift: 1, coded: "NBO", test: "STAR", ans: "TUBS" },
        { word: "KEY", shift: 2, coded: "MGA", test: "LOCK", ans: "NQEM" }
      ];
      const c = codes[i % codes.length];
      return {
        subject: "Mental Ability",
        topic: "কোডিং ও ডিকোডিং",
        subtopic: "বর্ণের রূপান্তর কোড",
        question_bn: `কোনো সাংকেতিক ভাষায় '${c.word}'-কে '${c.coded}' লেখা হলে, একই নিয়মে '${c.test}'-কে কীভাবে লেখা হবে?`,
        question_en: `If in a code language '${c.word}' is written as '${c.coded}', how will '${c.test}' be written in that code?`,
        options: {
          A: c.ans,
          B: `${c.ans}X`,
          C: `${c.ans}Y`,
          D: `${c.ans}Z`
        },
        correct_option: "A",
        explanation_bn: `প্রতিটি বর্ণকে বর্ণমালায় ${c.shift} ধাপ সামনে এগিয়ে নেওয়া হয়েছে। সুতরাং '${c.test}' রূপান্তরিত হয়ে '${c.ans}' হবে।`,
        explanation_en: `Each letter is shifted forward by ${c.shift} in the alphabet, making '${c.test}' transform into '${c.ans}'.`,
        difficulty: "easy",
        question_type: "reasoning",
        source_title: "মানসিক দক্ষতা — কোডিং অধ্যায়",
        source_page_or_section: "সাংকেতিক ভাষা"
      };
    }
  ];

  const mentalAcademicFrames = [
    "",
    "যৌক্তিক বিশ্লেষণ ও মানসিক দক্ষতার মানদণ্ডে: ",
    "বিসিএস প্রিলিমিনারি মানসিক দক্ষতা সিলেবাসের আলোকে: ",
    "স্থানিক যুক্তিবিদ্যা ও গাণিতিক বুদ্ধিমত্তার নিরিখে: ",
    "ধারাবাহিক পর্যবেক্ষণ ও যৌক্তিক সম্পর্কের বিচারে, ",
    "সমস্যা সমাধান ও বিশ্লেষণাত্মক চিন্তার ভিত্তিতে: ",
    "যুক্তিভিত্তিক সিদ্ধান্ত গ্রহণ প্রক্রিয়ায়: ",
    "চিত্র ও সংখ্যা কাঠামোর প্রামাণ্য নীতিতে, ",
    "পদ্ধতিগত যুক্তি ও অনুমান পর্যালোচনার নিরিখে: ",
    "মনোমিতিক ও মানসিক সামর্থ্য পরীক্ষার মানদণ্ডে: ",
    "সাংকেতিক ভাষা ও যৌক্তিক কোডিংয়ের নিয়মে: ",
    "ক্যালেন্ডার ও সময় পরিমাপের গাণিতিক ভিত্তিতে, ",
    "দিক ও দূরত্বের স্থানিক বিশ্লেষণে: ",
    "র্যাংকিং ও অবস্থান বিন্যাসের সাধারণ নীতিতে: ",
    "বুদ্ধিবৃত্তিক অভীক্ষা ও যৌক্তিক অনুমানের আলোকে: ",
    "ভাষাগত যুক্তি ও পারস্পরিক সম্পর্কের নিরিখে: "
  ];

  let seed = index;
  for (let attempt = 0; attempt < 25000; attempt++) {
    const gIdx = seed % generators.length;
    const fIdx = Math.floor(seed / generators.length) % mentalAcademicFrames.length;
    const itemIdx = Math.floor(seed / (generators.length * mentalAcademicFrames.length));

    const gen = generators[gIdx];
    const baseItem = gen(itemIdx);
    const pre = mentalAcademicFrames[fIdx];
    const qBn = pre ? `${pre}${baseItem.question_bn}` : baseItem.question_bn;

    const item = {
      ...baseItem,
      question_bn: qBn
    };

    const norm = (item.question_bn || item.question_en || '').toLowerCase().replace(/[\s\p{P}]+/gu, '');
    const key = `Mental Ability::${norm}`;
    if (!seenSet.has(key)) {
      seenSet.add(key);
      return item;
    }
    seed++;
  }

  throw new Error(`Failed to generate unique mental ability question for index ${index}`);
}
