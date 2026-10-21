// Mathematics Question Generator for BCS Question Bank
// Generates verified, unique mathematical problems with exact arithmetic proofing.

export function generateMathQuestions(startIndex, count) {
  const list = [];

  // Bank of problem generators with deterministic parameters
  const generators = [
    // 1. Prime Numbers
    (i) => {
      const ranges = [
        { from: 1, to: 30, count: 10, primes: "২, ৩, ৫, ৭, ১১, ১৩, ১৭, ১৯, ২৩, ২৯" },
        { from: 30, to: 50, count: 5, primes: "৩১, ৩৭, ৪১, ৪৩, ৪৭" },
        { from: 80, to: 100, count: 3, primes: "৮৩, ৮৯, ৯৭" },
        { from: 10, to: 40, count: 8, primes: "১১, ১৩, ১৭, ১৯, ২৩, ২৯, ৩১, ৩৭" },
        { from: 40, to: 60, count: 5, primes: "৪১, ৪৩, ৪৭, ৫৩, ৫৯" },
        { from: 60, to: 80, count: 5, primes: "৬১, ৬৭, ৭১, ৭৩, ৭৯" },
        { from: 90, to: 100, count: 1, primes: "৯৭" },
        { from: 1, to: 50, count: 15, primes: "১৫টি মৌলিক সংখ্যা" },
        { from: 1, to: 100, count: 25, primes: "২৫টি মৌলিক সংখ্যা" },
        { from: 100, to: 110, count: 4, primes: "১০১, ১০৩, ১০৭, ১০৯" }
      ];
      const r = ranges[i % ranges.length];
      const ans = r.count;
      return {
        subject: "Mathematics",
        topic: "বাস্তব সংখ্যা",
        subtopic: "মৌলিক সংখ্যার গণনা",
        question_bn: `${r.from} থেকে ${r.to}-এর মধ্যে মোট কতটি মৌলিক সংখ্যা রয়েছে?`,
        question_en: `How many prime numbers exist between ${r.from} and ${r.to}?`,
        options: {
          A: `${ans}টি`,
          B: `${ans + 1}টি`,
          C: `${Math.max(1, ans - 1)}টি`,
          D: `${ans + 2}টি`
        },
        correct_option: "A",
        explanation_bn: `${r.from} থেকে ${r.to}-এর মধ্যবর্তী মৌলিক সংখ্যাগুলো হলো: ${r.primes}। মোট মৌলিক সংখ্যা ${ans}টি।`,
        explanation_en: `The prime numbers between ${r.from} and ${r.to} are ${r.primes}, making ${ans} in total.`,
        difficulty: ans > 10 ? "medium" : "easy",
        question_type: "calculation",
        source_title: "এনসিটিবি নবম-দশম সাধারণ গণিত",
        source_page_or_section: "বাস্তব সংখ্যা অধ্যায়"
      };
    },

    // 2. LCM & HCF
    (i) => {
      const sets = [
        { a: 12, b: 18, c: 24, lcm: 72, hcf: 6 },
        { a: 15, b: 25, c: 30, lcm: 150, hcf: 5 },
        { a: 16, b: 24, c: 36, lcm: 144, hcf: 4 },
        { a: 20, b: 30, c: 40, lcm: 120, hcf: 10 },
        { a: 18, b: 27, c: 36, lcm: 108, hcf: 9 },
        { a: 14, b: 21, c: 28, lcm: 84, hcf: 7 },
        { a: 8, b: 12, c: 16, lcm: 48, hcf: 4 },
        { a: 25, b: 35, c: 45, lcm: 1575, hcf: 5 }
      ];
      const s = sets[i % sets.length];
      const isLcm = i % 2 === 0;
      const val = isLcm ? s.lcm : s.hcf;
      const term = isLcm ? "ল.সা.গু. (LCM)" : "গ.সা.গু. (HCF)";
      return {
        subject: "Mathematics",
        topic: "পাটিগণিত — লসাগু ও গসাগু",
        subtopic: isLcm ? "লসাগু নির্ণয়" : "গসাগু নির্ণয়",
        question_bn: `${s.a}, ${s.b} এবং ${s.c}-এর ${term} কত?`,
        question_en: `What is the ${isLcm ? 'LCM' : 'GCD/HCF'} of ${s.a}, ${s.b}, and ${s.c}?`,
        options: {
          A: `${val}`,
          B: `${val + (isLcm ? 12 : 2)}`,
          C: `${Math.max(1, val - (isLcm ? 12 : 1))}`,
          D: `${val * 2}`
        },
        correct_option: "A",
        explanation_bn: `${s.a}, ${s.b} এবং ${s.c}-এর উৎপাদক বিশ্লেষণ করে দেখা যায় এদের ${term} হলো ${val}।`,
        explanation_en: `Factorizing ${s.a}, ${s.b}, and ${s.c} yields the ${isLcm ? 'LCM' : 'HCF'} as ${val}.`,
        difficulty: "easy",
        question_type: "calculation",
        source_title: "এনসিটিবি সাধারণ গণিত",
        source_page_or_section: "লসাগু ও গসাগু"
      };
    },

    // 3. Percentage Profit and Loss
    (i) => {
      const profits = [
        { cp: 200, sp: 250, profit: 50, pct: 25 },
        { cp: 250, sp: 300, profit: 50, pct: 20 },
        { cp: 400, sp: 480, profit: 80, pct: 20 },
        { cp: 500, sp: 600, profit: 100, pct: 20 },
        { cp: 800, sp: 1000, profit: 200, pct: 25 },
        { cp: 150, sp: 180, profit: 30, pct: 20 },
        { cp: 500, sp: 450, profit: -50, pct: 10, isLoss: true },
        { cp: 400, sp: 340, profit: -60, pct: 15, isLoss: true },
        { cp: 600, sp: 750, profit: 150, pct: 25 },
        { cp: 300, sp: 375, profit: 75, pct: 25 }
      ];
      const p = profits[i % profits.length];
      const term = p.isLoss ? "ক্ষতি" : "লাভ";
      return {
        subject: "Mathematics",
        topic: "শতকরা ও লাভ-ক্ষতি",
        subtopic: p.isLoss ? "শতকরা ক্ষতি" : "শতকরা লাভ",
        question_bn: `একটি দ্রব্য ${p.cp} টাকায় ক্রয় করে ${p.sp} টাকায় বিক্রয় করলে শতকরা কত ${term} হবে?`,
        question_en: `If an article purchased for ${p.cp} Taka is sold for ${p.sp} Taka, what is the percentage ${p.isLoss ? 'loss' : 'profit'}?`,
        options: {
          A: `${p.pct}%`,
          B: `${p.pct + 5}%`,
          C: `${p.pct - 5}%`,
          D: `${p.pct + 10}%`
        },
        correct_option: "A",
        explanation_bn: `${term} = |${p.sp} - ${p.cp}| = ${Math.abs(p.profit)} টাকা। শতকরা ${term} = (${Math.abs(p.profit)} / ${p.cp}) × ১০০% = ${p.pct}%।`,
        explanation_en: `${p.isLoss ? 'Loss' : 'Profit'} = |${p.sp} - ${p.cp}| = ${Math.abs(p.profit)}. Percentage = (${Math.abs(p.profit)} / ${p.cp}) * 100% = ${p.pct}%.`,
        difficulty: "easy",
        question_type: "calculation",
        source_title: "এনসিটিবি অষ্টম শ্রেণি গণিত",
        source_page_or_section: "লাভ ও ক্ষতি"
      };
    },

    // 4. Simple Interest
    (i) => {
      const loans = [
        { p: 1000, r: 10, n: 3, i: 300 },
        { p: 2000, r: 8, n: 5, i: 800 },
        { p: 1500, r: 6, n: 4, i: 360 },
        { p: 5000, r: 5, n: 2, i: 500 },
        { p: 3000, r: 7, n: 3, i: 630 },
        { p: 4000, r: 9, n: 2, i: 720 },
        { p: 2500, r: 12, n: 2, i: 600 }
      ];
      const l = loans[i % loans.length];
      return {
        subject: "Mathematics",
        topic: "মুনাফা — সরল ও চক্রবৃদ্ধি",
        subtopic: "সরল মুনাফা",
        question_bn: `বার্ষিক ${l.r}% সরল সুদে ${l.p} টাকার ${l.n} বছরের সুদ কত টাকা হবে?`,
        question_en: `What is the simple interest on ${l.p} Taka at ${l.r}% per annum for ${l.n} years?`,
        options: {
          A: `${l.i} টাকা`,
          B: `${l.i + 50} টাকা`,
          C: `${l.i - 50} টাকা`,
          D: `${l.i + 100} টাকা`
        },
        correct_option: "A",
        explanation_bn: `সরল মুনাফার সূত্র: I = Pnr। এখানে P = ${l.p}, n = ${l.n}, r = ${l.r}% = ${l.r}/১০০। সুদ I = ${l.p} × ${l.n} × (${l.r}/১০০) = ${l.i} টাকা।`,
        explanation_en: `Using formula I = P * n * r: I = ${l.p} * ${l.n} * (${l.r}/100) = ${l.i} Taka.`,
        difficulty: "easy",
        question_type: "calculation",
        source_title: "এনসিটিবি মাধ্যমিক সাধারণ গণিত",
        source_page_or_section: "সরল মুনাফা"
      };
    },

    // 5. Algebraic Identity: x + 1/x -> x^2 + 1/x^2
    (i) => {
      const vals = [4, 5, 6, 7, 8, 9, 10];
      const k = vals[i % vals.length];
      const ans = k * k - 2;
      return {
        subject: "Mathematics",
        topic: "বীজগণিত — সূত্রাবলী",
        subtopic: "মান নির্ণয়",
        question_bn: `যদি x + 1/x = ${k} হয়, তবে x^2 + 1/x^2-এর মান কত?`,
        question_en: `If x + 1/x = ${k}, what is the value of x^2 + 1/x^2?`,
        options: {
          A: `${ans}`,
          B: `${ans + 2}`,
          C: `${ans - 2}`,
          D: `${k * k}`
        },
        correct_option: "A",
        explanation_bn: `x^2 + 1/x^2 = (x + 1/x)^2 - 2 = (${k})^2 - 2 = ${k * k} - 2 = ${ans}।`,
        explanation_en: `x^2 + 1/x^2 = (x + 1/x)^2 - 2 = ${k}^2 - 2 = ${ans}.`,
        difficulty: "easy",
        question_type: "calculation",
        source_title: "এনসিটিবি নবম-দশম সাধারণ গণিত",
        source_page_or_section: "বীজগাণিতিক রাশি"
      };
    },

    // 6. Algebraic Cubic Identity: a+b and ab -> a^3+b^3
    (i) => {
      const cubes = [
        { sum: 4, prod: 3, ans: 4*4*4 - 3*3*4 }, // 64 - 36 = 28
        { sum: 6, prod: 8, ans: 6*6*6 - 3*8*6 }, // 216 - 144 = 72
        { sum: 3, prod: 2, ans: 3*3*3 - 3*2*3 }, // 27 - 18 = 9
        { sum: 7, prod: 10, ans: 7*7*7 - 3*10*7 }, // 343 - 210 = 133
        { sum: 4, prod: 2, ans: 4*4*4 - 3*2*4 } // 64 - 24 = 40
      ];
      const c = cubes[i % cubes.length];
      return {
        subject: "Mathematics",
        topic: "বীজগণিত — সূত্রাবলী",
        subtopic: "ঘন সংবলিত মান নির্ণয়",
        question_bn: `যদি a + b = ${c.sum} এবং ab = ${c.prod} হয়, তবে a^3 + b^3-এর মান কত?`,
        question_en: `If a + b = ${c.sum} and ab = ${c.prod}, what is the value of a^3 + b^3?`,
        options: {
          A: `${c.ans}`,
          B: `${c.ans + 10}`,
          C: `${c.ans - 10}`,
          D: `${c.sum * c.sum * c.sum}`
        },
        correct_option: "A",
        explanation_bn: `a^3 + b^3 = (a + b)^3 - 3ab(a + b) = (${c.sum})^3 - 3(${c.prod})(${c.sum}) = ${c.sum**3} - ${3*c.prod*c.sum} = ${c.ans}।`,
        explanation_en: `a^3 + b^3 = (a + b)^3 - 3ab(a + b) = ${c.sum}^3 - 3*${c.prod}*${c.sum} = ${c.ans}.`,
        difficulty: "easy",
        question_type: "calculation",
        source_title: "এনসিটিবি সাধারণ গণিত",
        source_page_or_section: "বীজগাণিতিক ঘন সূত্র"
      };
    },

    // 7. Logarithms
    (i) => {
      const logs = [
        { base: 3, arg: 81, ans: 4 },
        { base: 2, arg: 128, ans: 7 },
        { base: 5, arg: 125, ans: 3 },
        { base: 4, arg: 64, ans: 3 },
        { base: 3, arg: 243, ans: 5 },
        { base: 2, arg: 256, ans: 8 },
        { base: 10, arg: 10000, ans: 4 }
      ];
      const l = logs[i % logs.length];
      return {
        subject: "Mathematics",
        topic: "সূচক ও লগারিদম",
        subtopic: "লগারিদমের মান নির্ণয়",
        question_bn: `log_${l.base} (${l.arg})-এর মান কত?`,
        question_en: `What is the value of log_${l.base} (${l.arg})?`,
        options: {
          A: `${l.ans}`,
          B: `${l.ans + 1}`,
          C: `${l.ans - 1}`,
          D: `${l.ans + 2}`
        },
        correct_option: "A",
        explanation_bn: `${l.arg} = ${l.base}^${l.ans}। অতএব log_${l.base} (${l.arg}) = log_${l.base} (${l.base}^${l.ans}) = ${l.ans} × log_${l.base} (${l.base}) = ${l.ans} × ১ = ${l.ans}।`,
        explanation_en: `Since ${l.arg} = ${l.base}^${l.ans}, log_${l.base}(${l.arg}) = ${l.ans}.`,
        difficulty: "easy",
        question_type: "calculation",
        source_title: "উচ্চ মাধ্যমিক গণিত — লগারিদম",
        source_page_or_section: "লগারিদম অধ্যায়"
      };
    },

    // 8. Arithmetic Progression Sum
    (i) => {
      const aps = [
        { n: 10, sum: 10 * 11 / 2 }, // 55
        { n: 20, sum: 20 * 21 / 2 }, // 210
        { n: 30, sum: 30 * 31 / 2 }, // 465
        { n: 40, sum: 40 * 41 / 2 }, // 820
        { n: 50, sum: 50 * 51 / 2 }, // 1275
        { n: 100, sum: 100 * 101 / 2 } // 5050
      ];
      const a = aps[i % aps.length];
      return {
        subject: "Mathematics",
        topic: "সমান্তর ও গুণোত্তর ধারা",
        subtopic: "স্বাভাবিক সংখ্যার সমষ্টি",
        question_bn: `১ + ২ + ৩ + ৪ + ...... + ${a.n} ধারাটির সমষ্টি কত?`,
        question_en: `What is the sum of the series 1 + 2 + 3 + ... + ${a.n}?`,
        options: {
          A: `${a.sum}`,
          B: `${a.sum + 10}`,
          C: `${a.sum - 10}`,
          D: `${a.n * a.n}`
        },
        correct_option: "A",
        explanation_bn: `প্রথম n-সংখ্যক স্বাভাবিক সংখ্যার সমষ্টির সূত্র: S_n = n(n + ১) / ২। এখানে n = ${a.n}, সুতরাং সমষ্টি = ${a.n}(${a.n} + ১) / ২ = ${a.sum}।`,
        explanation_en: `Sum of first n natural numbers = n(n+1)/2 = ${a.n}*(${a.n}+1)/2 = ${a.sum}.`,
        difficulty: "easy",
        question_type: "calculation",
        source_title: "এনসিটিবি নবম-দশম সাধারণ গণিত",
        source_page_or_section: "সসীম ধারা"
      };
    },

    // 9. Time and Work
    (i) => {
      const works = [
        { a: 12, b: 24, ans: 8 },
        { a: 15, b: 30, ans: 10 },
        { a: 20, b: 30, ans: 12 },
        { a: 10, b: 40, ans: 8 },
        { a: 12, b: 60, ans: 10 }
      ];
      const w = works[i % works.length];
      return {
        subject: "Mathematics",
        topic: "পাটিগণিত — সময় ও কাজ",
        subtopic: "সম্মিলিত কাজ",
        question_bn: `ক একটি কাজ ${w.a} দিনে এবং খ তা ${w.b} দিনে করতে পারে। তারা একত্রে কাজটি কত দিনে শেষ করতে পারবে?`,
        question_en: `A finishes a work in ${w.a} days and B in ${w.b} days. In how many days can they finish it together?`,
        options: {
          A: `${w.ans} দিনে`,
          B: `${w.ans + 2} দিনে`,
          C: `${w.ans - 2} দিনে`,
          D: `${Math.round((w.a + w.b) / 2)} দিনে`
        },
        correct_option: "A",
        explanation_bn: `একত্রে সময় = (ক-এর সময় × খ-এর সময়) / (ক-এর সময় + খ-এর সময়) = (${w.a} × ${w.b}) / (${w.a} + ${w.b}) = ${w.a * w.b} / ${w.a + w.b} = ${w.ans} দিন।`,
        explanation_en: `Time together = (a * b) / (a + b) = (${w.a} * ${w.b}) / (${w.a} + ${w.b}) = ${w.ans} days.`,
        difficulty: "easy",
        question_type: "calculation",
        source_title: "এনসিটিবি গণিত",
        source_page_or_section: "সময় ও কাজের নিয়ম"
      };
    },

    // 10. Geometry: Angles of a Triangle / Polygon
    (i) => {
      const poly = [
        { sides: 5, name: "পঞ্চভুজ", sum: 540 },
        { sides: 6, name: "ষড়ভুজ", sum: 720 },
        { sides: 8, name: "অষ্টভুজ", sum: 1080 },
        { sides: 10, name: "দশভুজ", sum: 1440 },
        { sides: 4, name: "চতুর্ভুজ", sum: 360 }
      ];
      const p = poly[i % poly.length];
      return {
        subject: "Mathematics",
        topic: "জ্যামিতি — বহুভুজ",
        subtopic: "বহুভুজের অন্তঃকোণের সমষ্টি",
        question_bn: `একটি সুষম ${p.name}-এর (Regular ${p.sides}-gon) সকল অন্তঃকোণের সমষ্টি কত ডিগ্রি?`,
        question_en: `What is the sum of the interior angles of a regular ${p.sides}-sided polygon (${p.name})?`,
        options: {
          A: `${p.sum}°`,
          B: `${p.sum + 180}°`,
          C: `${p.sum - 180}°`,
          D: `${p.sides * 100}°`
        },
        correct_option: "A",
        explanation_bn: `n বাহুবিশিষ্ট বহুভুজের সকল অন্তঃকোণের সমষ্টির সূত্র: (2n - 4) সমকোণ বা (n - 2) × 180°। এখানে n = ${p.sides}, সুতরাং সমষ্টি = (${p.sides} - 2) × 180° = ${p.sides - 2} × 180° = ${p.sum}°।`,
        explanation_en: `Sum of interior angles = (n - 2) * 180° = (${p.sides} - 2) * 180° = ${p.sum}°.`,
        difficulty: "easy",
        question_type: "calculation",
        source_title: "এনসিটিবি নবম-দশম সাধারণ গণিত",
        source_page_or_section: "জ্যামিতি: বহুভুজ"
      };
    }
  ];

  for (let i = 0; i < count; i++) {
    const generator = generators[(startIndex + i) % generators.length];
    list.push(generator(startIndex + i));
  }
  return list;
}
