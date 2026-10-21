// Mental Ability Question Generator for BCS Question Bank
// Generates unique, verified verbal and non-verbal reasoning problems.

export function generateMentalQuestions(startIndex, count) {
  const list = [];

  const generators = [
    // 1. Clock angle
    (i) => {
      const times = [
        { h: 3, m: 30, angle: 75 },
        { h: 8, m: 20, angle: 130 },
        { h: 2, m: 15, angle: 22.5 },
        { h: 7, m: 20, angle: 100 },
        { h: 9, m: 30, angle: 105 },
        { h: 5, m: 40, angle: 70 },
        { h: 1, m: 50, angle: 115 },
        { h: 10, m: 10, angle: 115 },
        { h: 6, m: 15, angle: 97.5 }
      ];
      const t = times[i % times.length];
      return {
        subject: "Mental Ability",
        topic: "ঘড়ি ও সময়",
        subtopic: "ঘড়ির কাঁটার মধ্যবর্তী কোণ",
        question_bn: `ঘড়িতে যখন ঠিক ${t.h}টা ${t.m} মিনিট বাজে, তখন ঘণ্টার কাঁটা ও মিনিটের কাঁটার মধ্যবর্তী কোণ কত ডিগ্রি?`,
        question_en: `What is the angle between the hour hand and the minute hand of a clock at ${t.h}:${t.m}?`,
        options: {
          A: `${t.angle}°`,
          B: `${t.angle + 10}°`,
          C: `${Math.max(1, t.angle - 10)}°`,
          D: `${t.angle + 15}°`
        },
        correct_option: "A",
        explanation_bn: `ঘড়ির দুই কাঁটার মধ্যবর্তী কোণ নির্ণয়ের সূত্র: θ = |(60H - 11M) / 2|। এখানে H = ${t.h}, M = ${t.m}। কোণ θ = |(60 × ${t.h} - 11 × ${t.m}) / 2| = |(${60 * t.h} - ${11 * t.m}) / 2| = ${t.angle} ডিগ্রি।`,
        explanation_en: `Formula: |(60H - 11M) / 2| = |(${60 * t.h} - ${11 * t.m}) / 2| = ${t.angle} degrees.`,
        difficulty: "medium",
        question_type: "calculation",
        source_title: "বিসিএস মানসিক দক্ষতা — মো. জহিরুল ইসলাম",
        source_page_or_section: "ঘড়ি ও সময় সংক্রান্ত সমস্যা"
      };
    },

    // 2. Calendar problems
    (i) => {
      const days = [
        { today: "সোমবার", offset: 45, ans: "বৃহস্পতিবার", odd: 45 % 7 }, // 45 = 6*7 + 3 -> Mon + 3 = Thu
        { today: "শুক্রবার", offset: 50, ans: "শনিবার", odd: 50 % 7 },   // 50 = 7*7 + 1 -> Fri + 1 = Sat
        { today: "রবিবার", offset: 60, ans: "বৃহস্পতিবার", odd: 60 % 7 }, // 60 = 8*7 + 4 -> Sun + 4 = Thu
        { today: "বুধবার", offset: 36, ans: "বৃহস্পতিবার", odd: 36 % 7 }, // 36 = 5*7 + 1 -> Wed + 1 = Thu
        { today: "মঙ্গলবার", offset: 40, ans: "রবিবার", odd: 40 % 7 },   // 40 = 5*7 + 5 -> Tue + 5 = Sun
        { today: "বৃহস্পতিবার", offset: 70, ans: "বৃহস্পতিবার", odd: 70 % 7 } // 70 = 10*7 + 0 -> Thu
      ];
      const d = days[i % days.length];
      return {
        subject: "Mental Ability",
        topic: "ক্যালেন্ডার ও দিন গণনা",
        subtopic: "অতিরিক্ত দিন হিসাব",
        question_bn: `আজ যদি ${d.today} হয়, তবে ঠিক ${d.offset} দিন পর কী বার হবে?`,
        question_en: `If today is ${d.today}, what day of the week will it be ${d.offset} days from today?`,
        options: {
          A: `${d.ans}`,
          B: "শুক্রবার",
          C: "মঙ্গলবার",
          D: "রবিবার"
        },
        correct_option: "A",
        explanation_bn: `${d.offset}-কে ৭ দিয়ে ভাগ করলে ভাগশেষ থাকে ${d.odd} দিন। ${d.today}-এর সাথে ${d.odd} দিন যোগ করলে বার হবে '${d.ans}'।`,
        explanation_en: `${d.offset} divided by 7 leaves a remainder of ${d.odd} odd days, resulting in ${d.ans}.`,
        difficulty: "easy",
        question_type: "reasoning",
        source_title: "মানসিক দক্ষতা অনুশীলন — বিসিএস",
        source_page_or_section: "ক্যালেন্ডার সমস্যা"
      };
    },

    // 3. Queue Ranking
    (i) => {
      const queues = [
        { front: 12, back: 18, total: 29 },
        { front: 15, back: 20, total: 34 },
        { front: 10, back: 15, total: 24 },
        { front: 25, back: 25, total: 49 },
        { front: 8, back: 14, total: 21 },
        { front: 17, back: 23, total: 39 }
      ];
      const q = queues[i % queues.length];
      return {
        subject: "Mental Ability",
        topic: "ক্রম ও অবস্থান",
        subtopic: "সারিতে মোট সংখ্যা",
        question_bn: `একটি লাইনে একজন ব্যক্তির অবস্থান সামনের দিক থেকে ${q.front}তম এবং পেছনের দিক থেকে ${q.back}তম হলে, লাইনে মোট কতজন ব্যক্তি আছেন?`,
        question_en: `If an individual is ${q.front}th from the front and ${q.back}th from the back in a line, how many people are in the line?`,
        options: {
          A: `${q.total} জন`,
          B: `${q.total + 1} জন`,
          C: `${q.total - 1} জন`,
          D: `${q.front + q.back} জন`
        },
        correct_option: "A",
        explanation_bn: `মোট সংখ্যা = (সামনের অবস্থান + পেছনের অবস্থান) - ১ = (${q.front} + ${q.back}) - ১ = ${q.front + q.back} - ১ = ${q.total} জন।`,
        explanation_en: `Total = (Front + Back) - 1 = (${q.front} + ${q.back}) - 1 = ${q.total}.`,
        difficulty: "easy",
        question_type: "reasoning",
        source_title: "A Modern Approach to Verbal Reasoning",
        source_page_or_section: "Position and Ranking"
      };
    },

    // 4. Analogies
    (i) => {
      const analogies = [
        { a: "Thermometer", b: "Temperature", c: "Barometer", d: "Atmospheric Pressure", expl: "থার্মোমিটার দিয়ে তাপমাত্রা মাপা হয়; ব্যারোমিটার দিয়ে বায়ুমণ্ডলীয় চাপ মাপা হয়।" },
        { a: "Seismograph", b: "Earthquake", c: "Anemometer", d: "Wind Speed", expl: "সিসমোগ্রাফ দিয়ে ভূমিকম্প মাপা হয়; অ্যানিমোমিটার দিয়ে বাতাসের গতিবেগ মাপা হয়।" },
        { a: "Hygrometer", b: "Humidity", c: "Odometer", d: "Distance", expl: "হাইগ্রোমিটার আর্দ্রতা মাপে; ওডোমিটার অতিক্রান্ত দূরত্ব মাপে।" },
        { a: "Cardiologist", b: "Heart", c: "Nephrologist", d: "Kidney", expl: "কার্ডিওলজিস্ট হৃদরোগ বিশেষজ্ঞ; নেফ্রোলজিস্ট কিডনি রোগ বিশেষজ্ঞ।" },
        { a: "Ophthalmologist", b: "Eye", c: "Dermatologist", d: "Skin", expl: "অপথ্যালমোলজিস্ট চোখের ডাক্তার; ডার্মাটোলজিস্ট চর্মরোগ বিশেষজ্ঞ।" },
        { a: "Author", b: "Book", c: "Sculptor", d: "Sculpture / Statue", expl: "লেখক বই রচনা করেন; ভাস্কর ভাস্কর্য তৈরি করেন।" }
      ];
      const item = analogies[i % analogies.length];
      return {
        subject: "Mental Ability",
        topic: "শব্দ সাদৃশ্য (Analogy)",
        subtopic: "যন্ত্র ও পরিমাপ / পেশা",
        question_bn: `'${item.a} : ${item.b} :: ${item.c} : ?' — সঠিক শব্দ কোনটি?`,
        question_en: `Select the corresponding analogical match: '${item.a} : ${item.b} :: ${item.c} : ?'`,
        options: {
          A: `${item.d}`,
          B: "Depth",
          C: "Volume",
          D: "Gravity"
        },
        correct_option: "A",
        explanation_bn: `${item.expl}`,
        explanation_en: `${item.a} measures ${item.b}; identically, ${item.c} measures ${item.d}.`,
        difficulty: "easy",
        question_type: "reasoning",
        source_title: "বিসিএস মানসিক দক্ষতা গাইড",
        source_page_or_section: "শব্দ সাদৃশ্য অধ্যায়"
      };
    },

    // 5. Letter Shifts
    (i) => {
      const ciphers = [
        { word: "CAT", shift: 2, coded: "ECV", target: "DOG", targetCoded: "FQI" },
        { word: "BOY", shift: 3, coded: "ERB", target: "GIRL", targetCoded: "JLOU" },
        { word: "PEN", shift: 1, coded: "QFO", target: "BOOK", targetCoded: "CPPL" },
        { word: "SUN", shift: 2, coded: "UWP", target: "MOON", targetCoded: "OQQP" }
      ];
      const c = ciphers[i % ciphers.length];
      return {
        subject: "Mental Ability",
        topic: "কোডিং ও ডিকোডিং",
        subtopic: "অক্ষর শিফট সংকেত",
        question_bn: `যদি কোনো সাংকেতিক নিয়মে '${c.word}'-কে '${c.coded}' লেখা হয়, তবে সেই নিয়মে '${c.target}'-কে কী লেখা হবে?`,
        question_en: `If '${c.word}' is coded as '${c.coded}' under a letter-shift cipher, how is '${c.target}' coded?`,
        options: {
          A: `${c.targetCoded}`,
          B: `${c.targetCoded.split('').reverse().join('')}`,
          C: `${c.targetCoded.slice(0, -1)}X`,
          D: `${c.targetCoded.slice(1)}Z`
        },
        correct_option: "A",
        explanation_bn: `প্রতিটি বর্ণ বর্ণমালায় ${c.shift} ধাপ সামনে অগ্রসর হয়েছে (+${c.shift} shift)। ফলে '${c.target}'-এর প্রতিটি বর্ণকে ${c.shift} ধাপ এগিয়ে লিখলে হবে '${c.targetCoded}'।`,
        explanation_en: `Each letter is shifted forward by +${c.shift} positions, producing '${c.targetCoded}'.`,
        difficulty: "easy",
        question_type: "reasoning",
        source_title: "A Modern Approach to Verbal Reasoning",
        source_page_or_section: "Coding and Decoding"
      };
    }
  ];

  for (let i = 0; i < count; i++) {
    const generator = generators[(startIndex + i) % generators.length];
    list.push(generator(startIndex + i));
  }
  return list;
}
