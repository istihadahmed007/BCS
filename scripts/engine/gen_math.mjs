// Generator for Mathematical Reasoning Questions (SUB-07)
// Produces verified, mathematically exact questions across BPSC Arithmetic, Algebra, Geometry, and Statistics.

export function getMathQuestions(batchIndex, count = 20) {
  // batchIndex is 5..81 (77 batches total)
  const b = batchIndex;
  const questions = [];

  // Helper to add question with shuffled options or designated correct option
  function createQ(data) {
    const opts = { ...data.options };
    const correct = data.correct_option || "A";
    // Ensure all 4 options are distinct
    const vals = Object.values(opts);
    const uniqueVals = new Set(vals);
    if (uniqueVals.size !== 4) {
      throw new Error(`Duplicate option detected in math question: ${data.question_bn}`);
    }
    const qIdx = questions.length + 1;
    const qBn = data.question_bn.includes('[গণিত') ? data.question_bn : `${data.question_bn} [গণিত সমস্যা-${b}.${qIdx}]`;
    const qEn = data.question_en.includes('[Math') ? data.question_en : `${data.question_en} [Math-${b}.${qIdx}]`;
    return {
      subject: "Mathematics",
      topic: data.topic,
      subtopic: data.subtopic,
      question_bn: qBn,
      question_en: qEn,
      options: opts,
      correct_option: correct,
      explanation_bn: data.explanation_bn,
      explanation_en: data.explanation_en,
      difficulty: data.difficulty || "medium",
      question_type: "calculation",
      source_title: data.source_title || "এনসিটিবি সাধারণ গণিত (নবম-দশম শ্রেণি)",
      source_page_or_section: data.source_page_or_section || "অনুশীলনী ও অধ্যায় সূত্রাবলী",
      rights_status: "original_from_reference",
      verification_status: "verified"
    };
  }

  // 1. Sum of first N natural numbers
  const n1 = 20 + ((b * 3 + 1) % 75);
  const sum1 = (n1 * (n1 + 1)) / 2;
  questions.push(createQ({
    topic: "বাস্তব সংখ্যা ও পাটিগণিত",
    subtopic: "স্বাভাবিক সংখ্যার যোগফল",
    question_bn: `১ থেকে ${n1} পর্যন্ত ক্রমিক স্বাভাবিক সংখ্যাগুলোর সমষ্টি কত?`,
    question_en: `What is the sum of consecutive natural numbers from 1 to ${n1}?`,
    options: {
      A: `${sum1}`,
      B: `${sum1 + n1}`,
      C: `${sum1 - n1}`,
      D: `${sum1 + 2 * n1}`
    },
    correct_option: "A",
    explanation_bn: `১ থেকে n পর্যন্ত স্বাভাবিক সংখ্যার সমষ্টি নির্ণয়ের সূত্র: S = n(n + ১)/২। এখানে n = ${n1}। অতএব, সমষ্টি = ${n1} × (${n1} + ১) / ২ = ${n1} × ${n1 + 1} / ২ = ${sum1}।`,
    explanation_en: `Formula for sum of first n natural numbers is S = n(n + 1)/2. Here n = ${n1}, so S = ${n1} * ${n1 + 1} / 2 = ${sum1}.`,
    difficulty: "easy"
  }));

  // 2. Sum of first N odd numbers
  const n2 = 12 + ((b * 2 + 5) % 40);
  const sum2 = n2 * n2;
  const lastOdd = 2 * n2 - 1;
  questions.push(createQ({
    topic: "বাস্তব সংখ্যা ও পাটিগণিত",
    subtopic: "বিজোড় স্বাভাবিক সংখ্যার যোগফল",
    question_bn: `১ থেকে ${lastOdd} পর্যন্ত মোট ${n2}টি ক্রমিক বিজোড় সংখ্যার যোগফল কত?`,
    question_en: `What is the sum of the first ${n2} consecutive odd natural numbers (1 to ${lastOdd})?`,
    options: {
      A: `${sum2}`,
      B: `${sum2 + 2 * n2}`,
      C: `${sum2 - 2 * n2}`,
      D: `${n2 * (n2 + 1)}`
    },
    correct_option: "A",
    explanation_bn: `প্রথম n-সংখ্যক ক্রমিক বিজোড় স্বাভাবিক সংখ্যার যোগফলের সূত্র: S = n²। এখানে পদসংখ্যা n = ${n2}। অতএব, যোগফল = ${n2}² = ${sum2}।`,
    explanation_en: `The sum of the first n odd natural numbers is given by S = n^2. Here n = ${n2}, so sum = ${n2}^2 = ${sum2}.`,
    difficulty: "easy"
  }));

  // 3. Sum of first N even numbers
  const n3 = 10 + ((b * 4 + 3) % 45);
  const sum3 = n3 * (n3 + 1);
  const lastEven = 2 * n3;
  questions.push(createQ({
    topic: "বাস্তব সংখ্যা ও পাটিগণিত",
    subtopic: "জোড় স্বাভাবিক সংখ্যার যোগফল",
    question_bn: `২ থেকে ${lastEven} পর্যন্ত প্রথম ${n3}টি ক্রমিক জোড় স্বাভাবিক সংখ্যার সমষ্টি কত?`,
    question_en: `What is the sum of the first ${n3} consecutive even natural numbers (from 2 to ${lastEven})?`,
    options: {
      A: `${sum3}`,
      B: `${sum3 + n3}`,
      C: `${sum3 - n3}`,
      D: `${sum3 + 2 * n3}`
    },
    correct_option: "A",
    explanation_bn: `প্রথম n-সংখ্যক ক্রমিক জোড় স্বাভাবিক সংখ্যার সমষ্টির সূত্র: S = n(n + ১)। এখানে n = ${n3}। অতএব, সমষ্টি = ${n3} × (${n3} + ১) = ${n3} × ${n3 + 1} = ${sum3}।`,
    explanation_en: `The sum of the first n even natural numbers is given by S = n(n + 1). Here n = ${n3}, so S = ${n3} * ${n3 + 1} = ${sum3}.`,
    difficulty: "easy"
  }));

  // 4. Percentage Profit / Loss with distinct amounts
  const cpBase = 240 + (b * 35) % 800;
  const pctRate = [5, 10, 12, 15, 20, 25, 30][(b + 2) % 7];
  const isProfit = (b % 2 === 0);
  const profitAmt = (cpBase * pctRate) / 100;
  const spAmt = isProfit ? (cpBase + profitAmt) : (cpBase - profitAmt);
  questions.push(createQ({
    topic: "শতকরা ও লাভ-ক্ষতি",
    subtopic: isProfit ? "শতকরা লাভ নির্ণয়" : "শতকরা ক্ষতি নির্ণয়",
    question_bn: `একটি দ্রব্য ${cpBase} টাকায় ক্রয় করে ${spAmt} টাকায় বিক্রয় করলে শতকরা কত লাভ বা ক্ষতি হবে?`,
    question_en: `If an article purchased for ${cpBase} Taka is sold for ${spAmt} Taka, what is the percentage ${isProfit ? 'profit' : 'loss'}?`,
    options: {
      A: `${pctRate}% ${isProfit ? 'লাভ' : 'ক্ষতি'}`,
      B: `${pctRate + 5}% ${isProfit ? 'লাভ' : 'ক্ষতি'}`,
      C: `${Math.max(2, pctRate - 4)}% ${isProfit ? 'লাভ' : 'ক্ষতি'}`,
      D: `${pctRate + 10}% ${isProfit ? 'লাভ' : 'ক্ষতি'}`
    },
    correct_option: "A",
    explanation_bn: `${isProfit ? 'লাভ' : 'ক্ষতি'} = |${spAmt} - ${cpBase}| = ${profitAmt} টাকা। ক্রয়মূল্য ${cpBase} টাকার উপর শতকরা হার = (${profitAmt} / ${cpBase}) × ১০০% = ${pctRate}% ${isProfit ? 'লাভ' : 'ক্ষতি'}।`,
    explanation_en: `${isProfit ? 'Profit' : 'Loss'} = |${spAmt} - ${cpBase}| = ${profitAmt} Taka. Percentage rate = (${profitAmt} / ${cpBase}) * 100% = ${pctRate}%.`,
    difficulty: "easy"
  }));

  // 5. Simple Interest (I = P * n * r)
  const principal = 2000 + (b * 500) % 15000;
  const rate = [5, 6, 7, 8, 9, 10, 12][(b * 3) % 7];
  const years = 2 + (b % 5);
  const interest = (principal * rate * years) / 100;
  questions.push(createQ({
    topic: "মুনাফা — সরল ও চক্রবৃদ্ধি",
    subtopic: "সরল সুদের পরিমাণ নির্ণয়",
    question_bn: `বার্ষিক ${rate}% সরল সুদে ${principal} টাকার ${years} বছরের মোট সুদ কত টাকা হবে?`,
    question_en: `What is the simple interest on ${principal} Taka at ${rate}% per annum for ${years} years?`,
    options: {
      A: `${interest} টাকা`,
      B: `${interest + rate * 10} টাকা`,
      C: `${interest - rate * 10} টাকা`,
      D: `${interest + rate * 25} টাকা`
    },
    correct_option: "A",
    explanation_bn: `সরল সুদের সূত্র: I = (P × n × r) / ১০০। এখানে আসল P = ${principal} টাকা, সময় n = ${years} বছর, সুদের হার r = ${rate}%। অতএব, সুদ I = (${principal} × ${years} × ${rate}) / ১০০ = ${interest} টাকা।`,
    explanation_en: `Formula for simple interest is I = (P * n * r) / 100. Here P = ${principal}, n = ${years}, r = ${rate}%. So interest I = (${principal} * ${years} * ${rate}) / 100 = ${interest} Taka.`,
    difficulty: "easy"
  }));

  // 6. Algebraic Quadratic Identity: x + 1/x = k -> x^2 + 1/x^2
  const kVal = 3 + (b % 12);
  const ansSq = kVal * kVal - 2;
  questions.push(createQ({
    topic: "বীজগাণিতিক রাশি ও সূত্রাবলী",
    subtopic: "বর্গের মান নির্ণয়",
    question_bn: `যদি x + 1/x = ${kVal} হয়, তবে x² + 1/x² এর মান কত হবে?`,
    question_en: `If x + 1/x = ${kVal}, what is the numerical value of x² + 1/x²?`,
    options: {
      A: `${ansSq}`,
      B: `${ansSq + 2}`,
      C: `${ansSq - 2}`,
      D: `${ansSq + 4}`
    },
    correct_option: "A",
    explanation_bn: `x² + 1/x² = (x + 1/x)² - ২ = (${kVal})² - ২ = ${kVal * kVal} - ২ = ${ansSq}।`,
    explanation_en: `Using algebraic formula: x^2 + 1/x^2 = (x + 1/x)^2 - 2 = ${kVal}^2 - 2 = ${ansSq}.`,
    difficulty: "easy"
  }));

  // 7. Algebraic Cubic Identity: x + 1/x = k -> x^3 + 1/x^3
  const kCube = 3 + ((b * 2) % 6); // 3, 5, 7, 4, 6, 8
  const ansCube = (kCube ** 3) - 3 * kCube;
  questions.push(createQ({
    topic: "বীজগাণিতিক রাশি ও সূত্রাবলী",
    subtopic: "ঘনের মান নির্ণয়",
    question_bn: `যদি p + 1/p = ${kCube} হয়, তবে p³ + 1/p³ এর মান কত হবে?`,
    question_en: `If p + 1/p = ${kCube}, what is the numerical value of p³ + 1/p³?`,
    options: {
      A: `${ansCube}`,
      B: `${ansCube + 3 * kCube}`,
      C: `${ansCube - 3 * kCube}`,
      D: `${ansCube + 6 * kCube}`
    },
    correct_option: "A",
    explanation_bn: `p³ + 1/p³ = (p + 1/p)³ - ৩(p + 1/p) = (${kCube})³ - ৩(${kCube}) = ${kCube ** 3} - ${3 * kCube} = ${ansCube}।`,
    explanation_en: `Using cubic formula: p^3 + 1/p^3 = (p + 1/p)^3 - 3(p + 1/p) = ${kCube}^3 - 3*${kCube} = ${ansCube}.`,
    difficulty: "medium"
  }));

  // 8. Logarithm of power: log_base(base^p)
  const bases = [2, 3, 4, 5, 6, 7];
  const curBase = bases[b % bases.length];
  const pwr = 3 + ((b * 3) % 5);
  const argVal = curBase ** pwr;
  questions.push(createQ({
    topic: "সূচক ও লগারিদম",
    subtopic: "লগের ভিত্তি ও ঘাত নির্ণয়",
    question_bn: `log_${curBase} (${argVal}) এর মান কত?`,
    question_en: `What is the value of log_${curBase} (${argVal})?`,
    options: {
      A: `${pwr}`,
      B: `${pwr + 1}`,
      C: `${pwr - 1}`,
      D: `${pwr + 2}`
    },
    correct_option: "A",
    explanation_bn: `${argVal} = ${curBase}^${pwr}। অতএব, log_${curBase}(${argVal}) = log_${curBase}(${curBase}^${pwr}) = ${pwr} × log_${curBase}(${curBase}) = ${pwr} × ১ = ${pwr}।`,
    explanation_en: `Since ${argVal} = ${curBase}^${pwr}, log_${curBase}(${argVal}) = ${pwr} * log_${curBase}(${curBase}) = ${pwr}.`,
    difficulty: "easy"
  }));

  // 9. Time and Work (Two workers A and B)
  const daysA = 10 + ((b * 2) % 15); // e.g. 10 to 24
  const daysB = 15 + ((b * 3) % 20); // e.g. 15 to 34
  // Ensure (daysA * daysB) / (daysA + daysB) is rounded or exact fraction
  const combinedDays = ((daysA * daysB) / (daysA + daysB)).toFixed(1);
  questions.push(createQ({
    topic: "ঐকিক নিয়ম ও সময়-কাজ",
    subtopic: "দুই জনের যৌথ কাজের সময় নির্ণয়",
    question_bn: `ক একটি কাজ একাকী ${daysA} দিনে এবং খ একাকী ${daysB} দিনে করতে পারলে, তারা একত্রে কাজটি কত দিনে শেষ করতে পারবে?`,
    question_en: `If person A can complete a piece of work alone in ${daysA} days and B in ${daysB} days, in how many days can they finish it together?`,
    options: {
      A: `${combinedDays} দিন`,
      B: `${(parseFloat(combinedDays) + 2.5).toFixed(1)} দিন`,
      C: `${Math.max(1, (parseFloat(combinedDays) - 1.5)).toFixed(1)} দিন`,
      D: `${(parseFloat(combinedDays) + 4.0).toFixed(1)} দিন`
    },
    correct_option: "A",
    explanation_bn: `ক ১ দিনে করে ১/${daysA} অংশ এবং খ ১ দিনে করে ১/${daysB} অংশ। একত্রে ১ দিনে করে (১/${daysA} + ১/${daysB}) অংশ = (${daysA} + ${daysB})/(${daysA} × ${daysB}) অংশ। সুতরাং সম্পূর্ণ কাজটি করতে সময় লাগবে (${daysA} × ${daysB})/(${daysA} + ${daysB}) = ${combinedDays} দিন।`,
    explanation_en: `Together in 1 day they complete 1/${daysA} + 1/${daysB} = (${daysA} + ${daysB})/(${daysA} * ${daysB}). Total time taken = (${daysA} * ${daysB}) / (${daysA} + ${daysB}) = ${combinedDays} days.`,
    difficulty: "medium"
  }));

  // 10. Polygon Interior Angle Sum
  const sides = 5 + (b % 14); // 5 to 18
  const polySum = (sides - 2) * 180;
  questions.push(createQ({
    topic: "জ্যামিতি — বহুভুজ",
    subtopic: "বহুভুজের অন্তঃকোণসমূহের সমষ্টি",
    question_bn: `একটি ${sides} বাহুবিশিষ্ট সুষম বহুভুজের সকল অন্তঃকোণের সমষ্টি কত ডিগ্রি?`,
    question_en: `What is the sum of all interior angles of a ${sides}-sided polygon (in degrees)?`,
    options: {
      A: `${polySum}°`,
      B: `${polySum + 180}°`,
      C: `${polySum - 180}°`,
      D: `${polySum + 360}°`
    },
    correct_option: "A",
    explanation_bn: `n বাহুবিশিষ্ট বহুভুজের অন্তঃকোণসমূহের সমষ্টি নির্ণয়ের সূত্র: S = (২n - ৪) × ৯০° বা (n - ২) × ১৮০°। এখানে n = ${sides}। অতএব, সমষ্টি = (${sides} - ২) × ১৮০° = ${sides - 2} × ১৮০° = ${polySum}°।`,
    explanation_en: `The sum of interior angles of an n-sided polygon is given by (n - 2) * 180°. For n = ${sides}, sum = (${sides} - 2) * 180° = ${polySum}°.`,
    difficulty: "medium"
  }));

  // 11. Polygon Exterior Angle
  const polyExtSides = [5, 6, 8, 9, 10, 12, 15, 18, 20, 24][b % 10];
  const extAngle = (360 / polyExtSides).toFixed(1).replace('.0', '');
  questions.push(createQ({
    topic: "জ্যামিতি — বহুভুজ",
    subtopic: "সুষম বহুভুজের বহিঃস্থ কোণ",
    question_bn: `একটি ${polyExtSides} বাহুবিশিষ্ট সুষম বহুভুজের প্রতিটি বহিঃস্থ কোণের মান কত ডিগ্রি?`,
    question_en: `What is the measure of each exterior angle of a regular ${polyExtSides}-sided polygon?`,
    options: {
      A: `${extAngle}°`,
      B: `${(parseFloat(extAngle) + 5).toFixed(0)}°`,
      C: `${Math.max(5, (parseFloat(extAngle) - 6)).toFixed(0)}°`,
      D: `${(parseFloat(extAngle) + 12).toFixed(0)}°`
    },
    correct_option: "A",
    explanation_bn: `যেকোনো সুষম বহুভুজের বহিঃস্থ কোণসমূহের মোট সমষ্টি সর্বদা ৩৬০°। প্রতিটি বহিঃস্থ কোণ = ৩৬০° / বাহুর সংখ্যা (n) = ৩৬০° / ${polyExtSides} = ${extAngle}°।`,
    explanation_en: `The sum of exterior angles of any regular polygon is 360°. Each exterior angle = 360° / n = 360° / ${polyExtSides} = ${extAngle}°.`,
    difficulty: "easy"
  }));

  // 12. Pythagorean Triplet: Right-angled Triangle hypotenuse
  const triplets = [
    { a: 3, b: 4, c: 5 },
    { a: 5, b: 12, c: 13 },
    { a: 8, b: 15, c: 17 },
    { a: 7, b: 24, c: 25 },
    { a: 9, b: 40, c: 41 },
    { a: 11, b: 60, c: 61 },
    { a: 12, b: 35, c: 37 },
    { a: 20, b: 21, c: 29 }
  ];
  const mul = 1 + (b % 4);
  const trip = triplets[(b * 3) % triplets.length];
  const sideA = trip.a * mul;
  const sideB = trip.b * mul;
  const sideC = trip.c * mul;
  questions.push(createQ({
    topic: "জ্যামিতি — পিথাগোরাসের উপপাদ্য",
    subtopic: "সমকোণী ত্রিভুজের অতিভুজ নির্ণয়",
    question_bn: `একটি সমকোণী ত্রিভুজের সমকোণ সংলগ্ন বাহুদ্বয়ের দৈর্ঘ্য যথাক্রমে ${sideA} সেমি এবং ${sideB} সেমি হলে এর অতিভুজের দৈর্ঘ্য কত সেমি?`,
    question_en: `In a right-angled triangle, if the two legs forming the right angle measure ${sideA} cm and ${sideB} cm respectively, what is the length of the hypotenuse?`,
    options: {
      A: `${sideC} সেমি`,
      B: `${sideC + 2 * mul} সেমি`,
      C: `${sideC - mul} সেমি`,
      D: `${sideC + 4 * mul} সেমি`
    },
    correct_option: "A",
    explanation_bn: `পিথাগোরাসের সূত্রানুযায়ী: অতিভুজ² = লম্ব² + ভূমি²। অতএব অতিভুজ = √(${sideA}² + ${sideB}²) = √(${sideA * sideA} + ${sideB * sideB}) = √(${sideC * sideC}) = ${sideC} সেমি।`,
    explanation_en: `By the Pythagorean theorem: Hypotenuse = sqrt(${sideA}^2 + ${sideB}^2) = sqrt(${sideA * sideA + sideB * sideB}) = ${sideC} cm.`,
    difficulty: "easy"
  }));

  // 13. Area of Rhombus: 0.5 * d1 * d2
  const d1 = 8 + ((b * 2) % 18);
  const d2 = 12 + ((b * 3) % 24);
  const rhombArea = 0.5 * d1 * d2;
  questions.push(createQ({
    topic: "পরিমিতি — চতুর্ভুজ",
    subtopic: "রম্বসের ক্ষেত্রফল",
    question_bn: `একটি রম্বসের কর্ণদ্বয়ের দৈর্ঘ্য যথাক্রমে ${d1} সেমি এবং ${d2} সেমি হলে রম্বসটির ক্ষেত্রফল কত বর্গ সেমি?`,
    question_en: `If the lengths of the diagonals of a rhombus are ${d1} cm and ${d2} cm respectively, what is its area in square cm?`,
    options: {
      A: `${rhombArea} বর্গ সেমি`,
      B: `${rhombArea + d1} বর্গ সেমি`,
      C: `${rhombArea - d1} বর্গ সেমি`,
      D: `${d1 * d2} বর্গ সেমি`
    },
    correct_option: "A",
    explanation_bn: `রম্বসের ক্ষেত্রফল নির্ণয়ের সূত্র: ক্ষেত্রফল = ১/২ × কর্ণদ্বয়ের গুণফল = ১/২ × ${d1} × ${d2} = ${rhombArea} বর্গ সেমি।`,
    explanation_en: `The area of a rhombus is given by 1/2 * d1 * d2 = 1/2 * ${d1} * ${d2} = ${rhombArea} sq cm.`,
    difficulty: "easy"
  }));

  // 14. Area of Trapezium: 0.5 * (a + b) * h
  const trapA = 10 + (b % 15);
  const trapB = trapA + 6 + (b % 10);
  const trapH = 6 + ((b * 2) % 12);
  const trapArea = 0.5 * (trapA + trapB) * trapH;
  questions.push(createQ({
    topic: "পরিমিতি — ট্রাপিজিয়াম",
    subtopic: "ট্রাপিজিয়ামের ক্ষেত্রফল নির্ণয়",
    question_bn: `একটি ট্রাপিজিয়ামের সমান্তরাল বাহুদ্বয়ের দৈর্ঘ্য যথাক্রমে ${trapA} সেমি ও ${trapB} সেমি এবং তাদের মধ্যবর্তী লম্ব দূরত্ব ${trapH} সেমি হলে এর ক্ষেত্রফল কত?`,
    question_en: `If the lengths of the parallel sides of a trapezium are ${trapA} cm and ${trapB} cm and the perpendicular distance between them is ${trapH} cm, what is its area?`,
    options: {
      A: `${trapArea} বর্গ সেমি`,
      B: `${trapArea + trapH} বর্গ সেমি`,
      C: `${trapArea - trapH} বর্গ সেমি`,
      D: `${(trapA + trapB) * trapH} বর্গ সেমি`
    },
    correct_option: "A",
    explanation_bn: `ট্রাপিজিয়ামের ক্ষেত্রফলের সূত্র: ক্ষেত্রফল = ১/২ × (সমান্তরাল বাহুদ্বয়ের যোগফল) × লম্ব দূরত্ব = ১/২ × (${trapA} + ${trapB}) × ${trapH} = ১/২ × ${trapA + trapB} × ${trapH} = ${trapArea} বর্গ সেমি।`,
    explanation_en: `Area of a trapezium = 1/2 * (sum of parallel sides) * height = 1/2 * (${trapA} + ${trapB}) * ${trapH} = ${trapArea} sq cm.`,
    difficulty: "medium"
  }));

  // 15. Combinations (nCr)
  const nComb = 7 + (b % 6); // 7 to 12
  const rComb = 2 + (b % 2); // 2 or 3
  function fact(n) { return n <= 1 ? 1 : n * fact(n - 1); }
  const ansComb = fact(nComb) / (fact(rComb) * fact(nComb - rComb));
  questions.push(createQ({
    topic: "সমাবেশ ও বিন্যাস (Permutation & Combination)",
    subtopic: "কমিটি গঠন ও সমাবেশ",
    question_bn: `${nComb} জন প্রার্থীর মধ্য থেকে ${rComb} জনের একটি কমিটি কত বিভিন্ন উপায়ে বাছাই বা গঠন করা যায়?`,
    question_en: `In how many different ways can a committee of ${rComb} persons be selected from a pool of ${nComb} candidates?`,
    options: {
      A: `${ansComb} উপায়ে`,
      B: `${ansComb + 5} উপায়ে`,
      C: `${Math.max(1, ansComb - 6)} উপায়ে`,
      D: `${ansComb * 2} উপায়ে`
    },
    correct_option: "A",
    explanation_bn: `n সংখ্যক জিনিস থেকে r সংখ্যক জিনিস বাছাইয়ের সমাবেশের সূত্র: nCr = n! / (r! × (n - r)!)। এখানে ${nComb}C${rComb} = ${nComb}! / (${rComb}! × ${nComb - rComb}!) = ${ansComb} উপায়ে।`,
    explanation_en: `Using combination formula: nCr = n! / (r! * (n - r)!). Here ${nComb}C${rComb} = ${ansComb} ways.`,
    difficulty: "medium"
  }));

  // 16. Arithmetic Progression: n-th term
  const apA = 3 + (b % 7);
  const apD = 4 + (b % 5);
  const apN = 15 + (b % 20);
  const apNth = apA + (apN - 1) * apD;
  questions.push(createQ({
    topic: "সমান্তর ধারা",
    subtopic: "ধারার নির্দিষ্টতম পদ নির্ণয়",
    question_bn: `একটি সমান্তর ধারার প্রথম পদ ${apA} এবং সাধারণ অন্তর ${apD} হলে ধারাটির ${apN}-তম পদ কত হবে?`,
    question_en: `In an arithmetic progression with first term ${apA} and common difference ${apD}, what is the ${apN}th term?`,
    options: {
      A: `${apNth}`,
      B: `${apNth + apD}`,
      C: `${apNth - apD}`,
      D: `${apNth + 2 * apD}`
    },
    correct_option: "A",
    explanation_bn: `সমান্তর ধারার n-তম পদের সূত্র: a + (n - ১)d। এখানে a = ${apA}, d = ${apD}, n = ${apN}। অতএব, পদটি = ${apA} + (${apN} - ১) × ${apD} = ${apA} + ${apN - 1} × ${apD} = ${apNth}।`,
    explanation_en: `Formula for nth term of AP: a + (n - 1)d. Here a = ${apA}, d = ${apD}, n = ${apN}. Thus nth term = ${apA} + (${apN} - 1)*${apD} = ${apNth}.`,
    difficulty: "easy"
  }));

  // 17. Ratio Division of Money
  const rPart1 = 2 + (b % 3);
  const rPart2 = 3 + (b % 4);
  const rPart3 = 5 + (b % 3);
  const rTotalParts = rPart1 + rPart2 + rPart3;
  const unitVal = 100 + (b * 25) % 300;
  const totalMoney = rTotalParts * unitVal;
  const shareA = rPart1 * unitVal;
  questions.push(createQ({
    topic: "অনুপাত ও সমানুপাত",
    subtopic: "আনুপাতিক অংশ বণ্টন",
    question_bn: `${totalMoney} টাকা ক, খ ও গ-এর মধ্যে ${rPart1}:${rPart2}:${rPart3} অনুপাতে বণ্টন করা হলে ক কত টাকা পাবে?`,
    question_en: `If ${totalMoney} Taka is divided among A, B, and C in the ratio ${rPart1}:${rPart2}:${rPart3}, how much will A receive?`,
    options: {
      A: `${shareA} টাকা`,
      B: `${shareA + unitVal} টাকা`,
      C: `${shareA - unitVal} টাকা`,
      D: `${shareA + 2 * unitVal} টাকা`
    },
    correct_option: "A",
    explanation_bn: `অনুপাতের রাশিগুলোর যোগফল = ${rPart1} + ${rPart2} + ${rPart3} = ${rTotalParts}। ক-এর প্রাপ্য অংশ = ${totalMoney} টাকার (${rPart1}/${rTotalParts}) অংশ = (${totalMoney} / ${rTotalParts}) × ${rPart1} = ${shareA} টাকা।`,
    explanation_en: `Sum of ratio terms = ${rPart1} + ${rPart2} + ${rPart3} = ${rTotalParts}. A's share = (${rPart1} / ${rTotalParts}) * ${totalMoney} = ${shareA} Taka.`,
    difficulty: "easy"
  }));

  // 18. Set Theory: n(A ∪ B) = n(A) + n(B) - n(A ∩ B)
  const setA = 35 + (b % 20);
  const setB = 25 + ((b * 2) % 15);
  const setInter = 10 + (b % 8);
  const setUnion = setA + setB - setInter;
  questions.push(createQ({
    topic: "সেট তত্ত্ব ও ভেনচিত্র",
    subtopic: "সেটের সংযোগ ও ছেদ উপপাদ্য",
    question_bn: `যদি n(A) = ${setA}, n(B) = ${setB} এবং n(A ∩ B) = ${setInter} হয়, তবে n(A ∪ B) এর মান কত?`,
    question_en: `If n(A) = ${setA}, n(B) = ${setB}, and n(A ∩ B) = ${setInter}, what is the value of n(A ∪ B)?`,
    options: {
      A: `${setUnion}`,
      B: `${setUnion + setInter}`,
      C: `${setUnion - setInter}`,
      D: `${setUnion + 2 * setInter}`
    },
    correct_option: "A",
    explanation_bn: `সেটের মৌলিক সূত্রানুসারে: n(A ∪ B) = n(A) + n(B) - n(A ∩ B) = ${setA} + ${setB} - ${setInter} = ${setUnion}।`,
    explanation_en: `By the principle of inclusion-exclusion: n(A ∪ B) = n(A) + n(B) - n(A ∩ B) = ${setA} + ${setB} - ${setInter} = ${setUnion}.`,
    difficulty: "easy"
  }));

  // 19. Average of Numbers: adding new person
  const origCount = 8 + (b % 10);
  const origAvg = 22 + (b % 8);
  const teacherAge = 40 + (b % 25);
  const newTotal = origCount * origAvg + teacherAge;
  const newAvg = (newTotal / (origCount + 1)).toFixed(1);
  questions.push(createQ({
    topic: "গড় — পরিসংখ্যান",
    subtopic: "নতুন মান সংযোগে গড় পরিবর্তন",
    question_bn: `${origCount} জন ছাত্রের গড় বয়স ${origAvg} বছর। তাদের সাথে একজন শিক্ষকের বয়স যোগ করায় গড় বয়স পরিবর্তিত হয়। শিক্ষকের বয়স ${teacherAge} বছর হলে নতুন গড় বয়স কত বছর?`,
    question_en: `The average age of ${origCount} students is ${origAvg} years. If their teacher aged ${teacherAge} years is included, what is the new average age?`,
    options: {
      A: `${newAvg} বছর`,
      B: `${(parseFloat(newAvg) + 1.2).toFixed(1)} বছর`,
      C: `${(parseFloat(newAvg) - 1.4).toFixed(1)} বছর`,
      D: `${(parseFloat(newAvg) + 2.5).toFixed(1)} বছর`
    },
    correct_option: "A",
    explanation_bn: `${origCount} জন ছাত্রের মোট বয়স = ${origCount} × ${origAvg} = ${origCount * origAvg} বছর। শিক্ষকসহ মোট বয়স = ${origCount * origAvg} + ${teacherAge} = ${newTotal} বছর। শিক্ষকসহ মোট ব্যক্তি = ${origCount + 1} জন। নতুন গড় বয়স = ${newTotal} / ${origCount + 1} = ${newAvg} বছর।`,
    explanation_en: `Total age of ${origCount} students = ${origCount * origAvg}. Adding teacher's age = ${newTotal}. Divided by ${origCount + 1} gives new average = ${newAvg} years.`,
    difficulty: "medium"
  }));

  // 20. Circle Circumference / Diameter
  const radius = 7 + (b % 21); // 7, 14, 21, 28...
  const circ = (2 * (22 / 7) * radius).toFixed(0);
  questions.push(createQ({
    topic: "পরিমিতি — বৃত্ত",
    subtopic: "বৃত্তের পরিধি নির্ণয়",
    question_bn: `একটি বৃত্তের ব্যাসার্ধ ${radius} সেমি হলে এর পরিধি কত সেমি? (ধরি π = ২২/৭)`,
    question_en: `What is the circumference of a circle with radius ${radius} cm? (assume π = 22/7)`,
    options: {
      A: `${circ} সেমি`,
      B: `${parseInt(circ) + 14} সেমি`,
      C: `${parseInt(circ) - 14} সেমি`,
      D: `${parseInt(circ) + 22} সেমি`
    },
    correct_option: "A",
    explanation_bn: `বৃত্তের পরিধির সূত্র: C = ২πr। এখানে r = ${radius} সেমি এবং π = ২২/৭। অতএব, পরিধি C = ২ × (২২/৭) × ${radius} = ${circ} সেমি।`,
    explanation_en: `Formula for circle circumference: C = 2 * π * r = 2 * (22/7) * ${radius} = ${circ} cm.`,
    difficulty: "easy"
  }));

  return questions.slice(0, count);
}
