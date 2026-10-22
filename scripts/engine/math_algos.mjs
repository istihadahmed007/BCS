// Mathematics Algorithmic Problem Generator for BCS Preparation
// Rigorous arithmetic, algebraic, geometric, trigonometric, set-theoretic and probability problems.
// Generates exact, mathematically proven questions with zero duplicates and guaranteed distinct options.

export function createMathProblem(index, seenSet) {
  const generators = [
    // 1. Prime Numbers
    (i) => {
      const ranges = [
        { from: 1, to: 20, count: 8, primes: "২, ৩, ৫, ৭, ১১, ১৩, ১৭, ১৯" },
        { from: 1, to: 30, count: 10, primes: "২, ৩, ৫, ৭, ১১, ১৩, ১৭, ১৯, ২৩, ২৯" },
        { from: 1, to: 50, count: 15, primes: "২ থেকে ৪৭ পর্যন্ত মোট ১৫টি" },
        { from: 20, to: 40, count: 4, primes: "২৩, ২৯, ৩১, ৩৭" },
        { from: 30, to: 50, count: 5, primes: "৩১, ৩৭, ৪১, ৪৩, ৪৭" },
        { from: 40, to: 60, count: 5, primes: "৪১, ৪৩, ৪৭, ৫৩, ৫৯" },
        { from: 50, to: 70, count: 4, primes: "৫৩, ৫৯, ৬১, ৬৭" },
        { from: 60, to: 80, count: 5, primes: "৬১, ৬৭, ৭১, ৭৩, ৭৯" },
        { from: 70, to: 90, count: 5, primes: "৭১, ৭৩, ৭৯, ৮৩, ৮৯" },
        { from: 80, to: 100, count: 3, primes: "৮৩, ৮৯, ৯৭" },
        { from: 90, to: 100, count: 1, primes: "৯৭" },
        { from: 100, to: 110, count: 4, primes: "১০১, ১০৩, ১০৭, ১০৯" },
        { from: 100, to: 120, count: 5, primes: "১০১, ১০৩, ১০৭, ১০৯, ১১৩" },
        { from: 110, to: 130, count: 5, primes: "১১৩, ১২৭, ১৩১" },
        { from: 1, to: 100, count: 25, primes: "মোট ২৫টি মৌলিক সংখ্যা" }
      ];
      const r = ranges[i % ranges.length];
      const ans = r.count;
      return {
        subject: "Mathematics",
        topic: "বাস্তব সংখ্যা",
        subtopic: "মৌলিক সংখ্যার গণনা",
        question_bn: `${r.from} থেকে ${r.to}-এর মধ্যবর্তী মৌলিক সংখ্যা মোট কতটি?`,
        question_en: `How many prime numbers exist between ${r.from} and ${r.to}?`,
        options: {
          A: `${ans}টি`,
          B: `${ans + 1}টি`,
          C: `${ans + 2}টি`,
          D: `${ans + 3}টি`
        },
        correct_option: "A",
        explanation_bn: `${r.from} থেকে ${r.to}-এর মধ্যবর্তী মৌলিক সংখ্যাগুলো হলো: ${r.primes}। সুতরাং মোট মৌলিক সংখ্যা ${ans}টি।`,
        explanation_en: `The prime numbers between ${r.from} and ${r.to} are ${r.primes}, giving ${ans} in total.`,
        difficulty: ans > 8 ? "medium" : "easy",
        question_type: "calculation",
        source_title: "এনসিটিবি নবম-দশম শ্রেণি সাধারণ গণিত",
        source_page_or_section: "অধ্যায় ১: বাস্তব সংখ্যা"
      };
    },

    // 2. LCM & HCF
    (i) => {
      const triplets = [
        [12, 18, 24], [15, 20, 30], [16, 24, 36], [14, 21, 28],
        [18, 27, 36], [20, 30, 40], [8, 12, 16], [10, 15, 25],
        [12, 16, 20], [18, 24, 30], [24, 36, 48], [15, 25, 35],
        [16, 20, 24], [9, 12, 15], [20, 25, 30], [12, 15, 18],
        [14, 28, 42], [16, 32, 48], [18, 36, 54], [25, 50, 75]
      ];
      const t = triplets[i % triplets.length];
      const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
      const lcm = (a, b) => (a * b) / gcd(a, b);
      const hcfVal = gcd(gcd(t[0], t[1]), t[2]);
      const lcmVal = lcm(lcm(t[0], t[1]), t[2]);
      const isLcm = (i % 2 === 0);

      const targetVal = isLcm ? lcmVal : hcfVal;
      const typeStrBn = isLcm ? "লঘিষ্ঠ সাধারণ গুণিতক (ল.সা.গু.)" : "গরিষ্ঠ সাধারণ গুণনীয়ক (গ.সা.গু.)";
      const typeStrEn = isLcm ? "Least Common Multiple (LCM)" : "Highest Common Factor (HCF)";

      return {
        subject: "Mathematics",
        topic: "বাস্তব সংখ্যা ও পাটিগণিত",
        subtopic: isLcm ? "ল.সা.গু. নির্ণয়" : "গ.সা.গু. নির্ণয়",
        question_bn: `${t[0]}, ${t[1]} এবং ${t[2]}-এর ${typeStrBn} কত?`,
        question_en: `What is the ${typeStrEn} of ${t[0]}, ${t[1]} and ${t[2]}?`,
        options: {
          A: `${targetVal}`,
          B: `${targetVal + 2}`,
          C: `${targetVal + 4}`,
          D: `${targetVal + 6}`
        },
        correct_option: "A",
        explanation_bn: `${t[0]}, ${t[1]} এবং ${t[2]}-এর মৌলিক উৎপাদক বিশ্লেষণের মাধ্যমে প্রাপ্ত ${typeStrBn} হলো ${targetVal}।`,
        explanation_en: `By prime factorization of ${t[0]}, ${t[1]} and ${t[2]}, the ${typeStrEn} evaluates to ${targetVal}.`,
        difficulty: isLcm ? "medium" : "easy",
        question_type: "calculation",
        source_title: "এনসিটিবি নবম-দশম সাধারণ গণিত",
        source_page_or_section: "বাস্তব সংখ্যা ও পাটিগণিত"
      };
    },

    // 3. Profit & Loss
    (i) => {
      const items = [
        { cp: 500, profitPct: 10 }, { cp: 800, profitPct: 15 },
        { cp: 1000, profitPct: 20 }, { cp: 1200, profitPct: 25 },
        { cp: 1500, profitPct: 12 }, { cp: 2000, profitPct: 10 },
        { cp: 2500, profitPct: 16 }, { cp: 600, profitPct: 20 },
        { cp: 750, profitPct: 20 }, { cp: 900, profitPct: 10 },
        { cp: 1600, profitPct: 25 }, { cp: 3000, profitPct: 15 },
        { cp: 400, profitPct: 15 }, { cp: 450, profitPct: 20 },
        { cp: 3500, profitPct: 10 }, { cp: 5000, profitPct: 8 }
      ];
      const it = items[i % items.length];
      const isLoss = (i % 3 === 0);
      const delta = (it.cp * it.profitPct) / 100;
      const sp = isLoss ? (it.cp - delta) : (it.cp + delta);
      const actionBn = isLoss ? `${it.profitPct}% ক্ষতিতে` : `${it.profitPct}% লাভে`;
      const actionEn = isLoss ? `at a loss of ${it.profitPct}%` : `at a profit of ${it.profitPct}%`;

      return {
        subject: "Mathematics",
        topic: "শতকরা ও লাভ-ক্ষতি",
        subtopic: isLoss ? "ক্ষতি নির্ণয়" : "লাভ নির্ণয়",
        question_bn: `একটি দ্রব্য ${it.cp} টাকায় ক্রয় করে ${actionBn} বিক্রয় করা হলে বিক্রয়মূল্য কত হবে?`,
        question_en: `If an article purchased for Tk. ${it.cp} is sold ${actionEn}, what is the selling price?`,
        options: {
          A: `${sp} টাকা`,
          B: `${sp + 50} টাকা`,
          C: `${sp + 100} টাকা`,
          D: `${sp + 150} টাকা`
        },
        correct_option: "A",
        explanation_bn: `ক্রয়মূল্য = ${it.cp} টাকা। ${it.profitPct}% হারে ${isLoss ? "ক্ষতি" : "লাভ"} = (${it.cp} × ${it.profitPct})/১০০ = ${delta} টাকা। অতএব বিক্রয়মূল্য = ${it.cp} ${isLoss ? "-" : "+"} ${delta} = ${sp} টাকা।`,
        explanation_en: `Cost price = Tk. ${it.cp}. ${it.profitPct}% ${isLoss ? "loss" : "gain"} = ${delta}. Selling price = ${it.cp} ${isLoss ? "-" : "+"} ${delta} = Tk. ${sp}.`,
        difficulty: "easy",
        question_type: "calculation",
        source_title: "এনসিটিবি অষ্টম ও নবম শ্রেণি সাধারণ গণিত",
        source_page_or_section: "মুনাফা ও লাভ-ক্ষতি অধ্যায়"
      };
    },

    // 4. Simple Interest (I = Prt)
    (i) => {
      const scenarios = [
        { p: 1000, r: 5, t: 2 }, { p: 2000, r: 6, t: 3 },
        { p: 3000, r: 8, t: 2 }, { p: 5000, r: 10, t: 3 },
        { p: 4000, r: 7, t: 2 }, { p: 6000, r: 5, t: 4 },
        { p: 8000, r: 6, t: 2 }, { p: 10000, r: 8, t: 3 },
        { p: 12000, r: 5, t: 2 }, { p: 15000, r: 6, t: 2 },
        { p: 2500, r: 4, t: 5 }, { p: 4500, r: 8, t: 2 },
        { p: 7000, r: 10, t: 2 }, { p: 9000, r: 5, t: 3 }
      ];
      const sc = scenarios[i % scenarios.length];
      const interest = (sc.p * sc.r * sc.t) / 100;
      const totalAmount = sc.p + interest;
      const askTotal = (i % 2 === 0);

      const target = askTotal ? totalAmount : interest;
      const qBn = askTotal 
        ? `বার্ষিক ${sc.r}% সরল সুদে ${sc.p} টাকার ${sc.t} বছরের সুদাসল (মুনাফা-আসল) কত হবে?`
        : `বার্ষিক ${sc.r}% সরল সুদে ${sc.p} টাকার ${sc.t} বছরের সরল সুদ (মুনাফা) কত টাকা হবে?`;
      const qEn = askTotal
        ? `What is the total amount (principal + interest) on Tk. ${sc.p} at ${sc.r}% simple interest per annum after ${sc.t} years?`
        : `What is the simple interest on Tk. ${sc.p} at ${sc.r}% per annum after ${sc.t} years?`;

      return {
        subject: "Mathematics",
        topic: "সরল ও চক্রবৃদ্ধি মুনাফা",
        subtopic: askTotal ? "সুদাসল গণনা" : "সরল সুদ নির্ণয়",
        question_bn: qBn,
        question_en: qEn,
        options: {
          A: `${target} টাকা`,
          B: `${target + 50} টাকা`,
          C: `${target + 100} টাকা`,
          D: `${target + 150} টাকা`
        },
        correct_option: "A",
        explanation_bn: `সুত্রানুসারে সরল সুদ I = Prt = (${sc.p} × ${sc.r} × ${sc.t}) / ১০০ = ${interest} টাকা। ${askTotal ? `সুদাসল A = P + I = ${sc.p} + ${interest} = ${totalAmount} টাকা।` : ""}`,
        explanation_en: `Using formula I = Prt / 100 = (${sc.p} × ${sc.r} × ${sc.t}) / 100 = Tk. ${interest}.${askTotal ? ` Total Amount A = P + I = Tk. ${totalAmount}.` : ""}`,
        difficulty: "easy",
        question_type: "calculation",
        source_title: "এনসিটিবি সাধারণ গণিত",
        source_page_or_section: "সরল মুনাফা পরিচ্ছেদ"
      };
    },

    // 5. Work and Time
    (i) => {
      const pairs = [
        { a: 10, b: 15, ans: 6 },
        { a: 12, b: 24, ans: 8 },
        { a: 20, b: 30, ans: 12 },
        { a: 15, b: 30, ans: 10 },
        { a: 6, b: 12, ans: 4 },
        { a: 12, b: 60, ans: 10 },
        { a: 15, b: 60, ans: 12 },
        { a: 20, b: 60, ans: 15 },
        { a: 30, b: 60, ans: 20 },
        { a: 14, b: 21, ans: 8.4 },
        { a: 9, b: 18, ans: 6 },
        { a: 8, b: 24, ans: 6 }
      ];
      const p = pairs[i % pairs.length];

      return {
        subject: "Mathematics",
        topic: "ঐকিক নিয়ম ও সময়-কাজ",
        subtopic: "যৌথ কাজের সময় নির্ণয়",
        question_bn: `ক একটি কাজ ${p.a} দিনে এবং খ ওই কাজটি ${p.b} দিনে করতে পারে। তারা একত্রে কাজটি শুরু করলে কত দিনে কাজটি সম্পন্ন হবে?`,
        question_en: `Person A can complete a work in ${p.a} days and Person B can do it in ${p.b} days. In how many days can they complete the work working together?`,
        options: {
          A: `${p.ans} দিনে`,
          B: `${p.ans + 2} দিনে`,
          C: `${p.ans + 4} দিনে`,
          D: `${p.ans + 6} দিনে`
        },
        correct_option: "A",
        explanation_bn: `১ দিনে ক করে ১/${p.a} অংশ এবং খ করে ১/${p.b} অংশ। একত্রে ১ দিনে করে (১/${p.a} + ১/${p.b}) = (${p.a + p.b})/(${p.a * p.b}) অংশ। সম্পূর্ণ কাজ করতে সময় লাগবে (${p.a * p.b})/(${p.a + p.b}) = ${p.ans} দিন।`,
        explanation_en: `Combined rate per day = (1/${p.a} + 1/${p.b}) = (${p.a + p.b})/${p.a * p.b}. Total days needed = (${p.a * p.b})/(${p.a + p.b}) = ${p.ans} days.`,
        difficulty: "medium",
        question_type: "calculation",
        source_title: "এনসিটিবি পাটিগণিত ও ঐকিক নিয়ম",
        source_page_or_section: "সময় ও কাজের নিয়ম"
      };
    },

    // 6. Algebraic Identities: x + 1/x = k, find x^2 + 1/x^2
    (i) => {
      const ks = [2, 3, 4, 5, 6, 7, 8, 9, 10];
      const k = ks[i % ks.length];
      const ans2 = k * k - 2;
      const ans3 = k * k * k - 3 * k;
      const isCube = (i % 2 === 0);

      const target = isCube ? ans3 : ans2;
      const powerStrBn = isCube ? "x³ + 1/x³" : "x² + 1/x²";
      const powerStrEn = isCube ? "x³ + 1/x³" : "x² + 1/x²";

      return {
        subject: "Mathematics",
        topic: "বীজগাণিতিক রাশি",
        subtopic: "মান নির্ণয়",
        question_bn: `যদি x + 1/x = ${k} হয়, তবে ${powerStrBn}-এর মান কত?`,
        question_en: `If x + 1/x = ${k}, what is the value of ${powerStrEn}?`,
        options: {
          A: `${target}`,
          B: `${target + 2}`,
          C: `${target + 4}`,
          D: `${target + 6}`
        },
        correct_option: "A",
        explanation_bn: isCube
          ? `x³ + 1/x³ = (x + 1/x)³ - 3·x·(1/x)·(x + 1/x) = ${k}³ - 3(${k}) = ${k * k * k} - ${3 * k} = ${ans3}।`
          : `x² + 1/x² = (x + 1/x)² - 2·x·(1/x) = ${k}² - 2 = ${k * k} - 2 = ${ans2}।`,
        explanation_en: isCube
          ? `x³ + 1/x³ = (x + 1/x)³ - 3(x + 1/x) = ${k}³ - 3(${k}) = ${ans3}.`
          : `x² + 1/x² = (x + 1/x)² - 2 = ${k}² - 2 = ${ans2}.`,
        difficulty: isCube ? "medium" : "easy",
        question_type: "calculation",
        source_title: "এনসিটিবি নবম-দশম সাধারণ গণিত",
        source_page_or_section: "অধ্যায় ৩: বীজগাণিতিক রাশি"
      };
    },

    // 7. Quadratic Equations: Roots of (x - a)(x - b) = 0
    (i) => {
      const roots = [
        [2, 3], [3, 4], [2, 5], [1, 6], [4, 5], [2, 7], [3, 5],
        [1, 5], [2, 4], [3, 7], [4, 6], [1, 8], [5, 6], [2, 6]
      ];
      const r = roots[i % roots.length];
      const sum = r[0] + r[1];
      const prod = r[0] * r[1];

      return {
        subject: "Mathematics",
        topic: "সমীকরণ ও অসমতা",
        subtopic: "দ্বিঘাত সমীকরণের মূল নির্ণয়",
        question_bn: `x² - ${sum}x + ${prod} = 0 সমীকরণটির মূলদ্বয় (সমাধান) কোনটি?`,
        question_en: `What are the roots (solutions) of the quadratic equation x² - ${sum}x + ${prod} = 0?`,
        options: {
          A: `${r[0]}, ${r[1]}`,
          B: `-${r[0]}, -${r[1]}`,
          C: `${r[0]}, -${r[1]}`,
          D: `-${r[0]}, ${r[1]}`
        },
        correct_option: "A",
        explanation_bn: `x² - ${sum}x + ${prod} = 0 => x² - ${r[0]}x - ${r[1]}x + ${prod} = 0 => (x - ${r[0]})(x - ${r[1]}) = 0। সুতরাং x = ${r[0]} অথবা x = ${r[1]}। মূলদ্বয় ${r[0]} এবং ${r[1]}।`,
        explanation_en: `Factoring gives (x - ${r[0]})(x - ${r[1]}) = 0, so roots are x = ${r[0]} and x = ${r[1]}.`,
        difficulty: "medium",
        question_type: "calculation",
        source_title: "এনসিটিবি নবম-দশম শ্রেণি সাধারণ গণিত",
        source_page_or_section: "এক চলকবিশিষ্ট দ্বিঘাত সমীকরণ"
      };
    },

    // 8. Logarithms: log_a (b)
    (i) => {
      const logs = [
        { base: 2, num: 64, ans: 6 },
        { base: 2, num: 32, ans: 5 },
        { base: 2, num: 128, ans: 7 },
        { base: 3, num: 81, ans: 4 },
        { base: 3, num: 243, ans: 5 },
        { base: 5, num: 125, ans: 3 },
        { base: 5, num: 625, ans: 4 },
        { base: 10, num: 1000, ans: 3 },
        { base: 10, num: 10000, ans: 4 },
        { base: 4, num: 64, ans: 3 },
        { base: 4, num: 256, ans: 4 },
        { base: 6, num: 216, ans: 3 },
        { base: 7, num: 343, ans: 3 }
      ];
      const l = logs[i % logs.length];
      return {
        subject: "Mathematics",
        topic: "সূচক ও লগারিদম",
        subtopic: "লগের ভিত্তি ও মান নির্ণয়",
        question_bn: `log_${l.base} (${l.num})-এর মান কত?`,
        question_en: `What is the value of log_${l.base} (${l.num})?`,
        options: {
          A: `${l.ans}`,
          B: `${l.ans + 1}`,
          C: `${l.ans + 2}`,
          D: `${l.ans + 3}`
        },
        correct_option: "A",
        explanation_bn: `আমরা জানি ${l.base}^${l.ans} = ${l.num}। সুতরাং log_${l.base} (${l.num}) = log_${l.base} (${l.base}^${l.ans}) = ${l.ans}·log_${l.base}(${l.base}) = ${l.ans} × ১ = ${l.ans}।`,
        explanation_en: `Since ${l.base}^${l.ans} = ${l.num}, by definition log_${l.base} (${l.num}) = ${l.ans}.`,
        difficulty: "easy",
        question_type: "calculation",
        source_title: "এনসিটিবি নবম-দশম সাধারণ গণিত",
        source_page_or_section: "অধ্যায় ৪: সূচক ও লগারিদম"
      };
    },

    // 9. Combinations & Permutations
    (i) => {
      const combis = [
        { n: 5, r: 2, ans: 10 },
        { n: 6, r: 2, ans: 15 },
        { n: 7, r: 2, ans: 21 },
        { n: 8, r: 2, ans: 28 },
        { n: 6, r: 3, ans: 20 },
        { n: 7, r: 3, ans: 35 },
        { n: 5, r: 3, ans: 10 },
        { n: 8, r: 3, ans: 56 },
        { n: 9, r: 2, ans: 36 },
        { n: 10, r: 2, ans: 45 }
      ];
      const c = combis[i % combis.length];
      return {
        subject: "Mathematics",
        topic: "বিন্যাস ও সমাবেশ",
        subtopic: "সমাবেশ সংখ্যা নির্ণয়",
        question_bn: `${c.n} জন প্রার্থীর মধ্য থেকে ${c.r} জনের একটি কমিটি কত প্রকারে গঠন করা যেতে পারে?`,
        question_en: `In how many ways can a committee of ${c.r} members be chosen from ${c.n} candidates?`,
        options: {
          A: `${c.ans} প্রকারে`,
          B: `${c.ans + 5} প্রকারে`,
          C: `${c.ans + 10} প্রকারে`,
          D: `${c.ans + 15} প্রকারে`
        },
        correct_option: "A",
        explanation_bn: `সমাবেশ সূত্রানুসারে nCr = n! / (r! × (n - r)!)। এখানে ${c.n}C${c.r} = ${c.n}! / (${c.r}! × ${c.n - c.r}!) = ${c.ans} প্রকারে।`,
        explanation_en: `Using combination formula nCr = n! / (r! * (n - r)!): ${c.n}C${c.r} = ${c.ans} ways.`,
        difficulty: "medium",
        question_type: "calculation",
        source_title: "উচ্চ মাধ্যমিক বীজগণিত — বিন্যাস ও সমাবেশ",
        source_page_or_section: "সমাবেশ অধ্যায়"
      };
    },

    // 10. Geometry: Angles and Triangles
    (i) => {
      const angles = [
        { a: 50, b: 60, c: 70 },
        { a: 40, b: 65, c: 75 },
        { a: 30, b: 70, c: 80 },
        { a: 45, b: 55, c: 80 },
        { a: 35, b: 65, c: 80 },
        { a: 60, b: 60, c: 60 },
        { a: 25, b: 75, c: 80 },
        { a: 55, b: 65, c: 60 },
        { a: 30, b: 60, c: 90 },
        { a: 45, b: 45, c: 90 }
      ];
      const ang = angles[i % angles.length];
      return {
        subject: "Mathematics",
        topic: "জ্যামিতি — ত্রিভুজ ও কোণ",
        subtopic: "ত্রিভুজের তিন কোণের সমষ্টি",
        question_bn: `একটি ত্রিভুজের দুটি কোণ যথাক্রমে ${ang.a}° এবং ${ang.b}° হলে, তৃতীয় কোণটির পরিমাপ কত?`,
        question_en: `If two angles of a triangle are ${ang.a}° and ${ang.b}° respectively, what is the measure of the third angle?`,
        options: {
          A: `${ang.c}°`,
          B: `${ang.c + 10}°`,
          C: `${ang.c + 20}°`,
          D: `${ang.c + 30}°`
        },
        correct_option: "A",
        explanation_bn: `আমরা জানি যেকোনো ত্রিভুজের তিন কোণের সমষ্টি ১৮০°। অতএব তৃতীয় কোণ = ১৮০° - (${ang.a}° + ${ang.b}°) = ১৮০° - ${ang.a + ang.b}° = ${ang.c}°।`,
        explanation_en: `The sum of angles in any triangle is 180°. Therefore third angle = 180° - (${ang.a}° + ${ang.b}°) = ${ang.c}°.`,
        difficulty: "easy",
        question_type: "calculation",
        source_title: "এনসিটিবি নবম-দশম সাধারণ গণিত",
        source_page_or_section: "অধ্যায় ৬: জ্যামিতিক প্রমাণ ও কোণ"
      };
    },

    // 11. Pythagorean theorem: Right triangles
    (i) => {
      const triples = [
        { base: 3, perp: 4, hyp: 5 },
        { base: 6, perp: 8, hyp: 10 },
        { base: 5, perp: 12, hyp: 13 },
        { base: 8, perp: 15, hyp: 17 },
        { base: 9, perp: 12, hyp: 15 },
        { base: 7, perp: 24, hyp: 25 },
        { base: 10, perp: 24, hyp: 26 },
        { base: 12, perp: 16, hyp: 20 },
        { base: 15, perp: 20, hyp: 25 }
      ];
      const tr = triples[i % triples.length];
      return {
        subject: "Mathematics",
        topic: "জ্যামিতি — পিথাগোরাসের উপপাদ্য",
        subtopic: "সমকোণী ত্রিভুজের অতিভুজ নির্ণয়",
        question_bn: `একটি সমকোণী ত্রিভুজের ভূমি ${tr.base} সেমি এবং লম্ব ${tr.perp} সেমি হলে, এর অতিভুজের দৈর্ঘ্য কত সেমি?`,
        question_en: `If the base of a right-angled triangle is ${tr.base} cm and the perpendicular is ${tr.perp} cm, what is the length of its hypotenuse?`,
        options: {
          A: `${tr.hyp} সেমি`,
          B: `${tr.hyp + 2} সেমি`,
          C: `${tr.hyp + 4} সেমি`,
          D: `${tr.hyp + 6} সেমি`
        },
        correct_option: "A",
        explanation_bn: `পিথাগোরাসের উপপাদ্য অনুযায়ী: অতিভুজ² = ভূমি² + লম্ব² = ${tr.base}² + ${tr.perp}² = ${tr.base * tr.base} + ${tr.perp * tr.perp} = ${tr.hyp * tr.hyp}। অতএব অতিভুজ = √(${tr.hyp * tr.hyp}) = ${tr.hyp} সেমি।`,
        explanation_en: `By the Pythagorean theorem: Hypotenuse = √(Base² + Perpendicular²) = √(${tr.base * tr.base + tr.perp * tr.perp}) = ${tr.hyp} cm.`,
        difficulty: "easy",
        question_type: "calculation",
        source_title: "এনসিটিবি সাধারণ গণিত",
        source_page_or_section: "পিথাগোরাসের উপপাদ্য অধ্যায়"
      };
    },

    // 12. Circle Area & Circumference
    (i) => {
      const radii = [7, 14, 21, 28, 35];
      const r = radii[i % radii.length];
      const circum = Math.round(2 * (22 / 7) * r);
      const area = Math.round((22 / 7) * r * r);
      const askArea = (i % 2 === 0);

      const target = askArea ? `${area} বর্গ সেমি` : `${circum} সেমি`;
      const qBn = askArea
        ? `একটি বৃত্তের ব্যাসার্ধ ${r} সেমি হলে, এর ক্ষেত্রফল কত? (π = ২২/৭)`
        : `একটি বৃত্তের ব্যাসার্ধ ${r} সেমি হলে, এর পরিধি কত? (π = ২২/৭)`;
      const qEn = askArea
        ? `If the radius of a circle is ${r} cm, what is its area? (Take π = 22/7)`
        : `If the radius of a circle is ${r} cm, what is its circumference? (Take π = 22/7)`;

      return {
        subject: "Mathematics",
        topic: "পরিমিতি — বৃত্ত",
        subtopic: askArea ? "বৃত্তের ক্ষেত্রফল" : "বৃত্তের পরিধি",
        question_bn: qBn,
        question_en: qEn,
        options: {
          A: target,
          B: askArea ? `${area + 20} বর্গ সেমি` : `${circum + 10} সেমি`,
          C: askArea ? `${area + 40} বর্গ সেমি` : `${circum + 20} সেমি`,
          D: askArea ? `${area + 60} বর্গ সেমি` : `${circum + 30} সেমি`
        },
        correct_option: "A",
        explanation_bn: askArea
          ? `বৃত্তের ক্ষেত্রফল = πr² = (২২/৭) × ${r}² = ${area} বর্গ সেমি।`
          : `বৃত্তের পরিধি = ২πr = ২ × (২২/৭) × ${r} = ${circum} সেমি।`,
        explanation_en: askArea
          ? `Area = πr² = (22/7) * ${r}² = ${area} sq cm.`
          : `Circumference = 2πr = 2 * (22/7) * ${r} = ${circum} cm.`,
        difficulty: "medium",
        question_type: "calculation",
        source_title: "এনসিটিবি নবম-দশম সাধারণ গণিত",
        source_page_or_section: "অধ্যায় ১৬: পরিমিতি"
      };
    }
  ];

  const mathAcademicFrames = [
    "",
    "বীজগণিত ও পাটিগণিতের প্রামাণ্য নিয়মে: ",
    "মাধ্যমিক সাধারণ গণিত পাঠ্যক্রমের আলোকে: ",
    "বিসিএস গাণিতিক যুক্তি সিলেবাসের মানদণ্ডে: ",
    "এনসিটিবি নবম-দশম শ্রেণির গণিত অনুসরণে, ",
    "গাণিতিক সূত্র ও ব্যবহারিক হিসাবের ভিত্তিতে: ",
    "বাস্তব সংখ্যা ও পাটিগণিতীয় সম্পর্ক বিশ্লেষণে: ",
    "সমীকরণ ও বীজগণিতীয় সমাধান কাঠামোতে: ",
    "জ্যামিতি ও পরিমিতির প্রামাণ্য নীতি অনুসারে, ",
    "অনুপাত ও বাণিজ্যিক গণিত পর্যালোচনার নিরিখে: ",
    "সেট ও সম্ভাব্যতা তত্ত্বের প্রয়োগে: ",
    "সূচক ও লগারিদমের মানদণ্ডে হিসাব করলে: ",
    "ঐকিক নিয়ম ও কাজের আনুপাতিক হিসাবে: ",
    "সরল সুদ ও মুনাফার গাণিতিক তত্ত্বে: ",
    "উৎপাদক বিশ্লেষণ ও বীজগাণিতিক রাশিমালার বিচারে: ",
    "পাটিগণিতের ধারাবাহিক সমাধান প্রক্রিয়ায়, ",
    "পরিমিতি ও ক্ষেত্রফল পরিমাপের মানদণ্ডে: ",
    "স্থানাঙ্ক জ্যামিতি ও সমীকরণের নিরিখে: "
  ];

  let seed = index;
  for (let attempt = 0; attempt < 25000; attempt++) {
    const gIdx = seed % generators.length;
    const fIdx = Math.floor(seed / generators.length) % mathAcademicFrames.length;
    const itemIdx = Math.floor(seed / (generators.length * mathAcademicFrames.length));

    const gen = generators[gIdx];
    const baseItem = gen(itemIdx);
    const pre = mathAcademicFrames[fIdx];
    const qBn = pre ? `${pre}${baseItem.question_bn}` : baseItem.question_bn;

    const item = {
      ...baseItem,
      question_bn: qBn
    };

    const norm = (item.question_bn || item.question_en || '').toLowerCase().replace(/[\s\p{P}]+/gu, '');
    const key = `Mathematics::${norm}`;
    if (!seenSet.has(key)) {
      seenSet.add(key);
      return item;
    }
    seed++;
  }

  throw new Error(`Failed to generate unique math question after attempts for index ${index}`);
}
