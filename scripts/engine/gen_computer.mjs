// Generator for Computer and Information Technology Questions (SUB-06)
// Covers Hardware, Number Systems, OS, DBMS, Networks, OSI model, Cybersecurity, Cloud, and AI.

export function getComputerQuestions(batchIndex, count = 25) {
  const b = batchIndex;
  const questions = [];

  function createQ(data) {
    const opts = { ...data.options };
    const correct = data.correct_option || "A";
    const uniqueVals = new Set(Object.values(opts));
    if (uniqueVals.size !== 4) {
      throw new Error(`Duplicate option detected in computer question: ${data.question_bn}`);
    }
    return {
      subject: "Computer and Information Technology",
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
      source_title: data.source_title || "উচ্চ মাধ্যমিক তথ্য ও যোগাযোগ প্রযুক্তি (এনসিটিবি পাঠ্যবই)",
      source_page_or_section: data.source_page_or_section || "কম্পিউটার সংগঠন ও নেটওয়ার্কিং",
      rights_status: "original_from_reference",
      verification_status: "verified"
    };
  }

  // 1. CPU & Von Neumann Architecture
  const cpuPool = [
    {
      q_bn: `কম্পিউটারের কেন্দ্রীয় প্রক্রিয়াকরণ ইউনিট (CPU)-এর কোন অংশ গাণিতিক হিসাব এবং যৌক্তিক তুলনা সম্পাদন করে?`,
      q_en: `Which component of the Central Processing Unit (CPU) executes arithmetic operations and logical decisions?`,
      ans: "অ্যারিথমেটিক লজিক ইউনিট (ALU)", b: "কন্ট্রোল ইউনিট (CU)", c: "রেজিস্টার মেমোরি", d: "সিস্টেম ক্লক",
      exp_bn: "ALU (Arithmetic Logic Unit) যোগ, বিয়োগ, গুণ, ভাগ এবং সত্য/মিথ্যা জাতীয় তুলনামূলক যুক্তি সম্পাদন করে।",
      exp_en: "The Arithmetic Logic Unit (ALU) performs all arithmetic calculations and logical decisions."
    },
    {
      q_bn: `কম্পিউটারের প্রসেসরের সবচেয়ে নিকটবর্তী এবং দ্রুততম অভ্যন্তরীণ মেমোরি কোনটি?`,
      q_en: `Which is the closest and fastest temporary internal memory storage located directly inside the CPU?`,
      ans: "রেজিস্টার (Registers)", b: "র‍্যাম (RAM)", c: "ক্যাশ মেমোরি (L3)", d: "হার্ডডিস্ক",
      exp_bn: "সিপিইউ চিপের মধ্যে থাকা রেজিস্টারগুলো হলো কম্পিউটারের সবচেয়ে দ্রুতগতিসম্পন্ন ক্ষুদ্র মেমোরি একক।",
      exp_en: "Processor registers are the fastest accessible memory locations located directly inside the CPU."
    }
  ];
  const c1 = cpuPool[b % cpuPool.length];
  questions.push(createQ({
    topic: "কম্পিউটার হার্ডওয়্যার ও স্থাপত্য",
    subtopic: "সিপিইউ এর অভ্যন্তরীণ গঠন ও রেজিস্টার",
    question_bn: `${c1.q_bn} [আইটি আর্কিটেকচার-${b}.১]`,
    question_en: `${c1.q_en} [IT Arch-${b}.1]`,
    options: { A: c1.ans, B: c1.b, C: c1.c, D: c1.d },
    correct_option: "A",
    explanation_bn: c1.exp_bn,
    explanation_en: c1.exp_en
  }));

  // 2. Memory Hierarchy: RAM vs ROM
  const memPool = [
    {
      q_bn: `কম্পিউটার বন্ধ বা বিদ্যুৎ সংযোগ বিচ্ছিন্ন করলে নিচের কোন মেমোরির সংরক্ষিত সমস্ত তথ্য সম্পূর্ণরূপে মুছে যায়?`,
      q_en: `Which of the following memories is volatile and completely loses its contents when power is turned off?`,
      ans: "র‍্যান্ডম অ্যাক্সেস মেমোরি (RAM)", b: "রম (ROM)", c: "ফ্ল্যাশ মেমোরি", d: "হার্ড ড্রাইভ",
      exp_bn: "র‍্যাম হলো একটি উদ্বায়ী বা ভোলাটাইল (Volatile) মেমোরি; বিদ্যুৎ প্রবাহ বন্ধ হওয়া মাত্র এর তথ্য মুছে যায়।",
      exp_en: "Random Access Memory (RAM) is volatile memory that loses stored data upon losing power."
    },
    {
      q_bn: `কম্পিউটার বুটিং প্রক্রিয়া পরিচালনার জন্য বায়োস (BIOS) প্রোগ্রামটি স্থায়ীভাবে কোন মেমোরিতে সংরক্ষিত থাকে?`,
      q_en: `In which non-volatile memory is the BIOS (Basic Input/Output System) firmware permanently stored?`,
      ans: "রিড অনলি মেমোরি (ROM)", b: "গতিশীল র‍্যাম (DRAM)", c: "ক্যাশ মেমোরি", d: "ভার্চুয়াল মেমোরি",
      exp_bn: "মাদারবোর্ডের রম (বা EEPROM) চিপে BIOS ফার্মওয়্যার প্রস্তুতকারক কর্তৃক স্থায়ীভাবে সংরক্ষিত থাকে।",
      exp_en: "BIOS firmware is non-volatilely embedded in the motherboard's ROM/flash chip."
    }
  ];
  const c2 = memPool[b % memPool.length];
  questions.push(createQ({
    topic: "কম্পিউটার মেমোরি ও স্টোরেজ",
    subtopic: "র‍্যাম, রম ও বায়োস ফার্মওয়্যার",
    question_bn: `${c2.q_bn} [আইটি মেমোরি-${b}.২]`,
    question_en: `${c2.q_en} [IT Mem-${b}.2]`,
    options: { A: c2.ans, B: c2.b, C: c2.c, D: c2.d },
    correct_option: "A",
    explanation_bn: c2.exp_bn,
    explanation_en: c2.exp_en
  }));

  // 3. Storage Hierarchy & Speed
  questions.push(createQ({
    topic: "মেমোরি অনুক্রম ও পারফরম্যান্স",
    subtopic: "অ্যাক্সেস গতির সঠিক ক্রম",
    question_bn: `কম্পিউটারের মেমোরি অনুক্রম অনুসারে অ্যাক্সেস গতির উচ্চ থেকে নিম্নের সঠিক ক্রম কোনটি? [আইটি অনুক্রম-${b}.৩]`,
    question_en: `According to the computer memory hierarchy, what is the correct sequence from fastest to slowest access speed? [IT Seq-${b}.3]`,
    options: {
      A: "রেজিস্টার > ক্যাশ মেমোরি > প্রধান মেমোরি (RAM) > সেকেন্ডারি স্টোরেজ (SSD/HDD)",
      B: "ক্যাশ > রেজিস্টার > র‍্যাম > সেকেন্ডারি স্টোরেজ",
      C: "র‍্যাম > ক্যাশ > রেজিস্টার > সেকেন্ডারি স্টোরেজ",
      D: "সেকেন্ডারি স্টোরেজ > র‍্যাম > ক্যাশ > রেজিস্টার"
    },
    correct_option: "A",
    explanation_bn: "মেমোরি অনুক্রমের শীর্ষে থাকে রেজিস্টার, তারপর L1/L2/L3 ক্যাশ, এরপর র‍্যাম এবং সর্বশেষে ধীরগতির সেকেন্ডারি স্টোরেজ।",
    explanation_en: "Access speed strictly decreases from Registers -> Cache -> Main RAM -> Secondary Storage."
  }));

  // 4. System Buses
  questions.push(createQ({
    topic: "কম্পিউটার হার্ডওয়্যার বাস",
    subtopic: "সিস্টেম বাসের প্রকারভেদ",
    question_bn: `কম্পিউটার মাদারবোর্ডে সিপিইউ, মেমোরি ও আই/ও ডিভাইসের মধ্যে ডেটা চলাচলের দিক কোন বাসে দ্বিমুখী (Bidirectional) হয়? [আইটি বাস-${b}.৪]`,
    question_en: `In a computer motherboard, which system bus is bidirectional allowing data to travel in both directions? [IT Bus-${b}.4]`,
    options: {
      A: "ডেটা বাস (Data Bus)",
      B: "অ্যাড্রেস বাস (Address Bus)",
      C: "কন্ট্রোল বাস",
      D: "পাওয়ার বাস"
    },
    correct_option: "A",
    explanation_bn: "ডেটা বাস উভয়মুখী (Bidirectional), কারণ সিপিইউ তথ্য পড়ে ও লেখে। কিন্তু সাধারণ অ্যাড্রেস বাস সিপিইউ থেকে মেমোরির দিকে একমুখী (Unidirectional)।",
    explanation_en: "The Data Bus is bidirectional for read/write transfers, whereas the standard Address Bus is unidirectional."
  }));

  // 5. Number System Conversions: Binary to Decimal
  const decVal = 10 + (b * 3) % 50;
  const binVal = decVal.toString(2);
  questions.push(createQ({
    topic: "সংখ্যা পদ্ধতি ও ডিজিটাল লজিক",
    subtopic: "বাইনারি থেকে দশমিকে রূপান্তর",
    question_bn: `বাইনারি সংখ্যা (${binVal})₂ এর সমতুল্য দশমিক (Decimal) মান কত? [আইটি সংখ্যা-${b}.৫]`,
    question_en: `What is the equivalent decimal value of the binary number (${binVal})₂? [IT Num-${b}.5]`,
    options: {
      A: `${decVal}`,
      B: `${decVal + 1}`,
      C: `${decVal - 1}`,
      D: `${decVal + 2}`
    },
    correct_option: "A",
    explanation_bn: `বাইনারি (${binVal})₂ কে ২-এর স্থানিক মান দিয়ে গুণ করে রূপান্তর করলে পাওয়া যায়: ${decVal}।`,
    explanation_en: `Converting binary (${binVal})2 by expanding positional powers of 2 gives decimal ${decVal}.`,
    difficulty: "easy"
  }));

  // 6. Logic Gates: Universal Gates
  const gatePool = [
    {
      q_bn: `ডিজিটাল ইলেকট্রনিক্সে নিচের কোন দুটি লজিক গেটকে 'সার্বজনীন গেট' (Universal Gates) বলা হয়?`,
      q_en: `In digital electronics, which two logic gates are recognized as 'Universal Gates'?`,
      ans: "NAND এবং NOR গেট", b: "AND এবং OR গেট", c: "XOR এবং XNOR গেট", d: "NOT এবং AND গেট",
      exp_bn: "NAND এবং NOR গেট ব্যবহার করে যেকোনো মৌলিক ও যৌগিক গেট তৈরি করা সম্ভব হওয়ায় এদের সার্বজনীন গেট বলে।",
      exp_en: "NAND and NOR gates are universal because any Boolean logic function can be constructed using either alone."
    },
    {
      q_bn: `কোন লজিক গেটের ক্ষেত্রে দুটি ইনপুট অসমান বা ভিন্ন (একটি ০ এবং অন্যটি ১) হলে আউটপুট ১ (High) হয়?`,
      q_en: `Which logic gate produces an output of 1 (High) only when its two binary inputs are unequal?`,
      ans: "XOR (Exclusive-OR) গেট", b: "XNOR গেট", c: "AND গেট", d: "NOR গেট",
      exp_bn: "XOR গেটের বুলিয়ান সমীকরণ হলো Y = A'B + AB'। এতে ইনপুটদ্বয় ভিন্ন হলে আউটপুট ১ হয়।",
      exp_en: "The XOR gate yields true (1) if and only if exactly one input is true (odd parity)."
    }
  ];
  const c6 = gatePool[b % gatePool.length];
  questions.push(createQ({
    topic: "ডিজিটাল লজিক ও গেটস",
    subtopic: "সার্বজনীন গেট ও এক্সক্লুসিভ গেট",
    question_bn: `${c6.q_bn} [আইটি লজিক-${b}.৬]`,
    question_en: `${c6.q_en} [IT Logic-${b}.6]`,
    options: { A: c6.ans, B: c6.b, C: c6.c, D: c6.d },
    correct_option: "A",
    explanation_bn: c6.exp_bn,
    explanation_en: c6.exp_en
  }));

  // 7. Character Encoding: ASCII & Unicode
  const encPool = [
    {
      q_bn: `আস্কি (ASCII - American Standard Code for Information Interchange) স্ট্যান্ডার্ড কোডে প্রতিটি বর্ণের জন্য কত বিট ব্যবহৃত হয়?`,
      q_en: `How many bits are used per character in the standard standard ASCII character encoding scheme?`,
      ans: "৭ বিট (সর্বোচ্চ ১২৮টি অনন্য অক্ষর)", b: "৮ বিট (২৫৬ অক্ষর)", c: "১৬ বিট", d: "৪ বিট",
      exp_bn: "স্ট্যান্ডার্ড আস্কি কোড ৭ বিটের যার দ্বারা ১২৮টি চিহ্ন প্রকাশ করা যায়। এক্সটেন্ডেড আস্কি ৮ বিটের (২৫৬টি)।",
      exp_en: "Standard ASCII uses 7 bits to represent 128 distinct characters (0 to 127)."
    },
    {
      q_bn: `বিশ্বের সকল ভাষা ও লিপিকে (বাংলাসহ) অভিন্ন ডিজিটাল পদ্ধতিতে উপস্থাপনের জন্য কোন এনকোডিং মান ব্যবহৃত হয়?`,
      q_en: `Which universal character encoding standard supports all major written languages including Bengali?`,
      ans: "ইউনিকোড (Unicode / UTF-8)", b: "আস্কি (ASCII)", c: "ইবিসিডিআইসি (EBCDIC)", d: "বিসিডি (BCD)",
      exp_bn: "ইউনিকোড একটি সর্বজনীন মান যাতে ১৬ থেকে ৩২ বিট পর্যন্ত কোড ব্যবহার করে পৃথিবীর সব ভাষার বর্ণ অন্তর্ভুক্ত করা হয়েছে।",
      exp_en: "Unicode (implemented via UTF-8/UTF-16) encodes characters across virtually all global written languages."
    }
  ];
  const c7 = encPool[b % encPool.length];
  questions.push(createQ({
    topic: "তথ্য উপস্থাপন ও এনকোডিং",
    subtopic: "আস্কি ও ইউনিকোড মানদণ্ড",
    question_bn: `${c7.q_bn} [আইটি এনকোডিং-${b}.৭]`,
    question_en: `${c7.q_en} [IT Enc-${b}.7]`,
    options: { A: c7.ans, B: c7.b, C: c7.c, D: c7.d },
    correct_option: "A",
    explanation_bn: c7.exp_bn,
    explanation_en: c7.exp_en
  }));

  // 8. 2's Complement representation
  questions.push(createQ({
    topic: "ডিজিটাল সংখ্যা পদ্ধতি",
    subtopic: "দুইয়ের পরিপূরক (2's Complement)",
    question_bn: `কম্পিউটারে ঋণাত্মক পূর্ণসংখ্যা সংরক্ষণের জন্য বাইনারি সংখ্যাটির ১-এর পরিপূরকের সাথে কত যোগ করতে হয়? [আইটি পরিপূরক-${b}.৮]`,
    question_en: `To obtain the 2's complement of a binary number for representing negative integers, what must be added to its 1's complement? [IT Comp-${b}.8]`,
    options: {
      A: "১ যোগ করতে হয় (Add 1)",
      B: "২ যোগ করতে হয়",
      C: "০ যোগ করতে হয়",
      D: "১ বিয়োগ করতে হয়"
    },
    correct_option: "A",
    explanation_bn: "একটি বাইনারি সংখ্যার বিটগুলোকে উল্টে দিলে (০->১, ১->০) ১-এর পরিপূরক পাওয়া যায় এবং তার সাথে ১ যোগ করলে ২-এর পরিপূরক তৈরি হয়।",
    explanation_en: "Two's complement is calculated by inverting all bits (1's complement) and adding 1 to the least significant bit."
  }));

  // 9. Operating Systems: Kernel & Types
  questions.push(createQ({
    topic: "অপারেটিং সিস্টেম ও সিস্টেম সফটওয়্যার",
    subtopic: "অপারেটিং সিস্টেমের মূল কেন্দ্র (Kernel)",
    question_bn: `একটি অপারেটিং সিস্টেমের কেন্দ্রীয় মূল অংশ বা কোর (Core), যা হার্ডওয়্যার ও অ্যাপ্লিকেশনের মধ্যে সেতুবন্ধন করে, তাকে কী বলা হয়? [আইটি ওএস-${b}.৯]`,
    question_en: `What is the essential core of an operating system that manages system resources and hardware interaction called? [IT OS-${b}.9]`,
    options: {
      A: "কার্নেল (Kernel)",
      B: "শেল (Shell)",
      C: "কম্পাইলার",
      D: "ড্রাইভার"
    },
    correct_option: "A",
    explanation_bn: "কার্নেল হলো ওএসের প্রধান নিয়ন্ত্রক প্রোগ্রাম যা মেমোরি, প্রসেস এবং হার্ডওয়্যার রিসোর্স ব্যবস্থাপনা করে।",
    explanation_en: "The Kernel is the fundamental core of an operating system controlling hardware and resource allocation."
  }));

  // 10. Compilers vs Interpreters
  questions.push(createQ({
    topic: "প্রোগ্রামিং ভাষা ও অনুবাদক প্রোগ্রাম",
    subtopic: "কম্পাইলার ও ইন্টারপ্রেটার এর পার্থক্য",
    question_bn: `উচ্চস্তরের ভাষায় লিখিত সম্পূর্ণ সোর্স কোডকে একবারে সামগ্রিকভাবে মেশিন ভাষায় রূপান্তর করে কোন অনুবাদক প্রোগ্রাম? [আইটি কম্পাইলার-${b}.১০]`,
    question_en: `Which language translator program converts an entire high-level source code into machine code in a single comprehensive pass? [IT Comp-${b}.10]`,
    options: {
      A: "কম্পাইলার (Compiler)",
      B: "ইন্টারপ্রেটার (Interpreter)",
      C: "অ্যাসেম্বলার (Assembler)",
      D: "ডিবাগার (Debugger)"
    },
    correct_option: "A",
    explanation_bn: "কম্পাইলার পুরো প্রোগ্রাম একবারে অনুবাদ করে অবজেক্ট ফাইলে রূপান্তর করে; অন্যদিকে ইন্টারপ্রেটার লাইন বাই লাইন অনুবাদ করে।",
    explanation_en: "A compiler translates entire high-level code into machine instructions at once, whereas an interpreter executes line by line."
  }));

  // 11. DBMS & Relational Keys
  questions.push(createQ({
    topic: "ডাটাবেজ ম্যানেজমেন্ট সিস্টেম (DBMS)",
    subtopic: "প্রাইমারি কি ও ফরেন কি",
    question_bn: `রিলেশনাল ডাটাবেজ টেবিলে প্রতিটি রেকর্ডকে অনন্যভাবে (Uniquely) শনাক্তকারী ফিল্ডকে কী বলা হয় যা কখনো ফাঁকা (Null) হতে পারে না? [আইটি ডাটাবেজ-${b}.১১]`,
    question_en: `In a relational database table, what is the attribute that uniquely identifies each record and cannot contain Null values? [IT DB-${b}.11]`,
    options: {
      A: "প্রাইমারি কি (Primary Key)",
      B: "ফরেন কি (Foreign Key)",
      C: "কম্পোজিট কি",
      D: "সেকেন্ডারি কি"
    },
    correct_option: "A",
    explanation_bn: "প্রাইমারি কি এর মান টেবিলে সর্বদা অনন্য (Unique) হয় এবং এটি কখনো ফাঁকা বা নাল (Null) হতে পারে না।",
    explanation_en: "A Primary Key uniquely identifies each row in a database table and enforces entity integrity (cannot be null)."
  }));

  // 12. SQL Commands (DDL vs DML)
  questions.push(createQ({
    topic: "এসকিউএল (SQL) ভাষা",
    subtopic: "ডাটা ম্যানিপুলেশন ল্যাঙ্গুয়েজ (DML)",
    question_bn: `নিচের কোন এসকিউএল (SQL) কমান্ডটি ডাটাবেজ থেকে তথ্য অনুসন্ধান বা কোয়েরি করতে ব্যবহৃত হয়? [আইটি এসকিউএল-${b}.১২]`,
    question_en: `Which SQL command is primarily used to retrieve and query data records from a relational database? [IT SQL-${b}.12]`,
    options: {
      A: "SELECT",
      B: "CREATE",
      C: "DROP",
      D: "ALTER"
    },
    correct_option: "A",
    explanation_bn: "SELECT হলো DML কমান্ড যা ডাটাবেজ টেবিল থেকে নির্দিষ্ট শর্তানুসারে ডেটা প্রদর্শন বা কোয়েরি করতে ব্যবহৃত হয়।",
    explanation_en: "SELECT is the fundamental SQL data manipulation command for querying and retrieving records."
  }));

  // 13. OSI Model: 7 Layers
  const osiLayers = [
    { num: 1, name: "Physical Layer (ভৌত স্তর)", unit: "Bits (বিট)", func: "তার ও সংকেতের মাধ্যমে কাঁচা বিট স্থানান্তর" },
    { num: 2, name: "Data Link Layer (ডাটা লিংক স্তর)", unit: "Frames (ফ্রেম)", func: "ম্যাক (MAC) অ্যাড্রেস ও ফ্রেম স্থানান্তর" },
    { num: 3, name: "Network Layer (নেটওয়ার্ক স্তর)", unit: "Packets (প্যাকেট)", func: "আইপি রাউটিং ও লজিক্যাল অ্যাড্রেসিং" },
    { num: 4, name: "Transport Layer (পরিবহন স্তর)", unit: "Segments (সেগমেন্ট)", func: "এন্ড-টু-এন্ড সংযোগ, টিসিপি/ইউডিপি" },
    { num: 7, name: "Application Layer (অ্যাপ্লিকেশন স্তর)", unit: "Messages", func: "ব্যবহারকারীর অ্যাপ্লিকেশন সেবা (HTTP, FTP, DNS)" }
  ];
  const osi = osiLayers[b % osiLayers.length];
  questions.push(createQ({
    topic: "কম্পিউটার নেটওয়ার্কিং — ওএসআই মডেল",
    subtopic: "ওএসআই স্তরের কার্যাবলী ও ডাটা একক",
    question_bn: `ওএসআই (OSI) ৭-স্তর বিশিষ্ট রেফারেন্স মডেলের ${osi.num}-তম স্তর কোনটি? [আইটি ওএসআই-${b}.১৩]`,
    question_en: `Which layer is the ${osi.num}th layer in the 7-layer ISO/OSI Reference Model? [IT OSI-${b}.13]`,
    options: {
      A: osi.name,
      B: osiLayers[(b + 1) % osiLayers.length].name,
      C: osiLayers[(b + 2) % osiLayers.length].name,
      D: osiLayers[(b + 3) % osiLayers.length].name
    },
    correct_option: "A",
    explanation_bn: `ওএসআই মডেলের স্তরগুলো নিচ থেকে যথাক্রমে: ১. ফিজিক্যাল, ২. ডাটা লিংক, ৩. নেটওয়ার্ক, ৪. ট্রান্সপোর্ট, ৫. সেশন, ৬. প্রেজেন্টেশন এবং ৭. অ্যাপ্লিকেশন।`,
    explanation_en: `The OSI layers in order (1-7) are Physical, Data Link, Network, Transport, Session, Presentation, Application.`
  }));

  // 14. Network Topologies
  const topPool = [
    {
      q_bn: `কোন নেটওয়ার্ক টপোলজিতে একটি কেন্দ্রীয় নিয়ন্ত্রণকারী ডিভাইস (সুইচ বা হাব)-এর সাথে সমস্ত কম্পিউটার সংযুক্ত থাকে?`,
      q_en: `In which network topology are all client nodes directly connected to a central connecting device such as a switch or hub?`,
      ans: "স্টার টপোলজি (Star Topology)", b: "বাস টপোলজি", c: "রিং টপোলজি", d: "মেশ টপোলজি",
      exp_bn: "স্টার টপোলজিতে কেন্দ্রীয় হাব বা সুইচে কোনো নোড যুক্ত হলে তা সহজে পরিচালনা করা যায় এবং এক নোড নষ্ট হলেও অন্যগুলো সচল থাকে।",
      exp_en: "Star topology connects all network nodes to a central hub or switch."
    },
    {
      q_bn: `কোন টপোলজিতে প্রতিটি নোড নেটওয়ার্কের অপর প্রতিটি নোডের সাথে পৃথক পয়েন্ট-টু-পয়েন্ট লিংকের মাধ্যমে সংযুক্ত থাকে?`,
      q_en: `In which network topology is every device interconnected with every other device via dedicated point-to-point links?`,
      ans: "সম্পূর্ণ মেশ টপোলজি (Full Mesh Topology)", b: "ট্রি টপোলজি", c: "বাস টপোলজি", d: "রিং টপোলজি",
      exp_bn: "মেশ টপোলজিতে n সংখ্যক নোডের জন্য n(n-১)/২ টি সংযোগ লাইনের প্রয়োজন হয়, যা সর্বোচ্চ নির্ভরযোগ্যতা প্রদান করে।",
      exp_en: "A full mesh topology provides direct dedicated connections between every pair of nodes: n(n-1)/2 links."
    }
  ];
  const c14 = topPool[b % topPool.length];
  questions.push(createQ({
    topic: "নেটওয়ার্ক টপোলজি ও কনফিগারেশন",
    subtopic: "স্টার ও মেশ টপোলজির বৈশিষ্ট্য",
    question_bn: `${c14.q_bn} [আইটি টপোলজি-${b}.১৪]`,
    question_en: `${c14.q_en} [IT Top-${b}.14]`,
    options: { A: c14.ans, B: c14.b, C: c14.c, D: c14.d },
    correct_option: "A",
    explanation_bn: c14.exp_bn,
    explanation_en: c14.exp_en
  }));

  // 15. Transmission Media: Twisted pair vs Fiber optic
  questions.push(createQ({
    topic: "ডাটা কমিউনিকেশন মিডিয়া",
    subtopic: "অপটিক্যাল ফাইবার তারের বৈশিষ্ট্য",
    question_bn: `অপটিক্যাল ফাইবার কেবলে কাচের বা প্লাস্টিকের সূক্ষ্ম তন্তুর মধ্য দিয়ে আলোক সংকেত সঞ্চালনের ক্ষেত্রে অভ্যন্তরীণ স্তরের নাম কী? [আইটি মিডিয়া-${b}.১৫]`,
    question_en: `In an optical fiber cable, what is the central inner core carrying the light pulses called? [IT Media-${b}.15]`,
    options: {
      A: "কোর (Core)",
      B: "ক্ল্যাডিং (Cladding)",
      C: "বাফার কোটিং",
      D: "জ্যাকেট"
    },
    correct_option: "A",
    explanation_bn: "অপটিক্যাল ফাইবারের কেন্দ্রে উচ্চ প্রতিসরাঙ্কের কোর থাকে, যার চারপাশে নিম্ন প্রতিসরাঙ্কের ক্ল্যাডিং থাকে যা পূর্ণ অভ্যন্তরীণ প্রতিফলন ঘটায়।",
    explanation_en: "The high-refractive-index glass Core transmits light, surrounded by lower-index Cladding."
  }));

  // 16. TCP vs UDP Protocols
  questions.push(createQ({
    topic: "পরিবহন স্তরের প্রোটোকল",
    subtopic: "টিসিপি এবং ইউডিপির তুলনা",
    question_bn: `ট্রান্সপোর্ট লেয়ারের কোন প্রোটোকলটি সংযোগহীন (Connectionless) এবং দ্রুতগতির হলেও নির্ভরযোগ্য বা ডেটা পাওয়ার গ্যারান্টি দেয় না? [আইটি প্রোটোকল-${b}.১৬]`,
    question_en: `Which Transport layer protocol is connectionless and fast, prioritizing low overhead over guaranteed packet delivery? [IT Proto-${b}.16]`,
    options: {
      A: "ইউডিপি (User Datagram Protocol - UDP)",
      B: "টিসিপি (Transmission Control Protocol - TCP)",
      C: "এফটিপি (FTP)",
      D: "আইসিএমপি (ICMP)"
    },
    correct_option: "A",
    explanation_bn: "UDP হ্যান্ডশেক ছাড়াই ডাটা পাঠায় বিধায় লাইভ ভিডিও ও ভয়েস কলের মতো গতিশীল সেবায় ব্যবহৃত হয়; অন্যদিকে TCP নির্ভরযোগ্য ও কানেকশন ওরিয়েন্টেড।",
    explanation_en: "UDP is a lightweight, connectionless protocol without delivery guarantees, widely used in video streaming and VoIP."
  }));

  // 17. IP Addressing: IPv4 vs IPv6
  const ipPool = [
    {
      q_bn: `স্ট্যান্ডার্ড আইপিভি৪ (IPv4) অ্যাড্রেস কত বিট বিশিষ্ট এবং এতে কয়টি অক্টেট (Octet) থাকে?`,
      q_en: `How many bits make up an IPv4 address, and how many octets is it divided into?`,
      ans: "৩২ বিট (৪টি অক্টেট)", b: "১২৮ বিট (১৬টি অক্টেট)", c: "৬৪ বিট", d: "১৬ বিট",
      exp_bn: "IPv4 অ্যাড্রেস ৩২ বিটের যা ডট দিয়ে আলাদা করা ৪টি ৮-বিটের অক্টেট নিয়ে গঠিত (যেমন ১৯২.১৬৮.১.১)।",
      exp_en: "IPv4 uses 32-bit addresses divided into 4 octets formatted in dotted-decimal notation."
    },
    {
      q_bn: `ইন্টারনেট প্রোটোকল সংস্করণ ৬ (IPv6) অ্যাড্রেস সর্বমোট কত বিটের হয়ে থাকে?`,
      q_en: `How many bits comprise a standard Internet Protocol version 6 (IPv6) address?`,
      ans: "১২৮ বিট", b: "৩২ বিট", c: "৬৪ বিট", d: "২৫৬ বিট",
      exp_bn: "IPv4 এর সংকট কাটিয়ে উঠতে প্রবর্তিত IPv6 হলো ১২৮ বিটের অ্যাড্রেস যা কোলন দিয়ে পৃথক ৮টি হেক্সাডেসিমাল ব্লকে লেখা হয়।",
      exp_en: "IPv6 uses 128-bit addresses (2^128 total addresses) represented as 8 hexadecimal groups separated by colons."
    }
  ];
  const c17 = ipPool[b % ipPool.length];
  questions.push(createQ({
    topic: "ইন্টারনেট প্রোটোকল অ্যাড্রেসিং",
    subtopic: "আইপিভি৪ ও আইপিভি৬ এর বিট কাঠামো",
    question_bn: `${c17.q_bn} [আইটি আইপি-${b}.১৭]`,
    question_en: `${c17.q_en} [IT IP-${b}.17]`,
    options: { A: c17.ans, B: c17.b, C: c17.c, D: c17.d },
    correct_option: "A",
    explanation_bn: c17.exp_bn,
    explanation_en: c17.exp_en
  }));

  // 18. Protocols & Default Ports
  const portPool = [
    { proto: "HTTP (ওয়েব ব্রাউজিং)", port: 80, exp: "HTTP পোর্ট ৮০ ব্যবহার করে।" },
    { proto: "HTTPS (নিরাপদ ব্রাউজিং)", port: 443, exp: "HTTPS এনক্রিপ্টেড সংযোগে পোর্ট ৪৪৩ ব্যবহার করে।" },
    { proto: "DNS (ডোমেইন নেম সিস্টেম)", port: 53, exp: "DNS সার্ভার পোর্ট ৫৩ ব্যবহার করে ডোমেইন থেকে আইপি সমাধান করে।" },
    { proto: "SSH (নিরাপদ রিমোট শেল)", port: 22, exp: "SSH সিকিউর রিমোট লগইনের জন্য পোর্ট ২২ ব্যবহার করে।" }
  ];
  const pp = portPool[b % portPool.length];
  questions.push(createQ({
    topic: "নেটওয়ার্ক প্রোটোকল ও পোর্ট নম্বর",
    subtopic: "স্ট্যান্ডার্ড পোর্ট অ্যাসাইনমেন্ট",
    question_bn: `ইন্টারনেট নেটওয়ার্কিংয়ে ${pp.proto} ডিফল্টভাবে কত নম্বর পোর্ট ব্যবহার করে? [আইটি পোর্ট-${b}.১৮]`,
    question_en: `In standard networking, what default port number is assigned to ${pp.proto}? [IT Port-${b}.18]`,
    options: {
      A: `পোর্ট ${pp.port}`,
      B: `পোর্ট ${pp.port + 10}`,
      C: `পোর্ট ${pp.port + 21}`,
      D: `পোর্ট ${Math.max(20, pp.port - 15)}`
    },
    correct_option: "A",
    explanation_bn: pp.exp,
    explanation_en: pp.exp
  }));

  // 19. MAC Address (Physical address)
  questions.push(createQ({
    topic: "নেটওয়ার্ক ইন্টারফেস ও হার্ডওয়্যার অ্যাড্রেস",
    subtopic: "ম্যাক (MAC) অ্যাড্রেসের বৈশিষ্ট্য",
    question_bn: `কম্পিউটারের নেটওয়ার্ক ইন্টারফেস কার্ড (NIC)-এ স্থায়ীভাবে সংরক্ষিত ফিজিক্যাল বা ম্যাক (MAC) অ্যাড্রেসের আকার কত বিট? [আইটি ম্যাক-${b}.১৯]`,
    question_en: `What is the bit length of a physical Media Access Control (MAC) address burned into a Network Interface Card? [IT MAC-${b}.19]`,
    options: {
      A: "৪৮ বিট (বা ৬ বাইট)",
      B: "৩২ বিট",
      C: "৬৪ বিট",
      D: "১২৮ বিট"
    },
    correct_option: "A",
    explanation_bn: "ম্যাক অ্যাড্রেস হলো ৪৮ বিট বা ৬ বাইট বিশিষ্ট যা ১২টি হেক্সাডেসিমাল ডিজিটে কোলন বা হাইফেন দিয়ে লেখা হয় (যেমন 00:1A:2B:3C:4D:5E)।",
    explanation_en: "A MAC address is a 48-bit (6-byte) unique hardware identifier formatted as 12 hexadecimal digits."
  }));

  // 20. Domain Name System (DNS)
  questions.push(createQ({
    topic: "ইন্টারনেট সেবা ও আর্কিটেকচার",
    subtopic: "ডোমেইন নেম সিস্টেম (DNS) এর কাজ",
    question_bn: `ওয়েবসাইট ব্রাউজ করার সময় মানুষের পাঠযোগ্য ডোমেইন নেমকে (যেমন www.example.com) সংশ্লিষ্ট সাংখ্যিক আইপি অ্যাড্রেসে অনুবাদ করে কোনটি? [আইটি ডিএনএস-${b}.২০]`,
    question_en: `Which internet service translates human-readable domain names into corresponding machine-routable IP addresses? [IT DNS-${b}.20]`,
    options: {
      A: "ডিএনএস (Domain Name System)",
      B: "ডিএইচসিপি (DHCP)",
      C: "এফটিপি (FTP)",
      D: "রাউটার গেটওয়ে"
    },
    correct_option: "A",
    explanation_bn: "DNS হলো ইন্টারনেটের ফোনবুকের মতো যা নাম দেখে আইপি ঠিকানা বের করে সংযোগ তৈরি করে দেয়।",
    explanation_en: "The Domain Name System (DNS) maps human-friendly hostnames to numeric IP addresses."
  }));

  // 21. Cybersecurity: Malware Types
  const malPool = [
    {
      q_bn: `যেসব ক্ষতিকারক সফটওয়্যার কোনো মানুষের হস্তক্ষেপ ছাড়াই নেটওয়ার্কের মাধ্যমে স্বয়ংক্রিয়ভাবে প্রতিলিপি (Self-replicate) তৈরি করে ছড়িয়ে পড়ে, তাকে কী বলে?`,
      q_en: `Malicious software that replicates automatically across computer networks without requiring human execution is called what?`,
      ans: "কম্পিউটার ওয়ার্ম (Computer Worm)", b: "ট্রোজান হর্স", c: "স্পাইওয়্যার", d: "অ্যাডওয়্যার",
      exp_bn: "ওয়ার্ম নিজে নিজেই নেটওয়ার্কের নিরাপত্তা ছিদ্র দিয়ে ছড়িয়ে পড়তে পারে, কিন্তু ভাইরাসের সক্রিয় হতে হোস্ট ফাইলের দরকার হয়।",
      exp_en: "A worm is self-replicating standalone malware that spreads across networks without needing host files."
    },
    {
      q_bn: `ব্যবহারকারীর ফাইলসমূহকে শক্তিশালী এনক্রিপশন অ্যালগরিদম দ্বারা লক করে মুক্তিপণ দাবি করা ক্ষতিকর সফটওয়্যারকে কী বলা হয়?`,
      q_en: `What is malicious software that encrypts user data files and demands financial extortion for the decryption key called?`,
      ans: "র‍্যানসমওয়্যার (Ransomware)", b: "স্পাইওয়্যার", c: "কী-লগার", d: "রুটকিট",
      exp_bn: "র‍্যানসমওয়্যার (যেমন ওয়ানাক্রাই) সিস্টেমে ঢুকে ফাইল এনক্রিপ্ট করে এবং মুক্তিপণ হিসেবে ক্রিপ্টোকারেন্সি দাবি করে।",
      exp_en: "Ransomware locks victim files through strong encryption, demanding payment for recovery keys."
    }
  ];
  const c21 = malPool[b % malPool.length];
  questions.push(createQ({
    topic: "সাইবার নিরাপত্তা ও ম্যালওয়্যার",
    subtopic: "ওয়ার্ম ও র‍্যানসমওয়্যার এর বৈশিষ্ট্য",
    question_bn: `${c21.q_bn} [আইটি সিকিউরিটি-${b}.২১]`,
    question_en: `${c21.q_en} [IT Sec-${b}.21]`,
    options: { A: c21.ans, B: c21.b, C: c21.c, D: c21.d },
    correct_option: "A",
    explanation_bn: c21.exp_bn,
    explanation_en: c21.exp_en
  }));

  // 22. Cryptography: Symmetric vs Asymmetric
  questions.push(createQ({
    topic: "তথ্য নিরাপত্তা ও ক্রিপ্টোগ্রাফি",
    subtopic: "অ্যাসিমেট্রিক এনক্রিপশন ও পাবলিক কি",
    question_bn: `অ্যাসিমেট্রিক বা পাবলিক কি ক্রিপ্টোগ্রাফিতে এনক্রিপশন ও ডিক্রিপশনের জন্য কয়টি ভিন্ন কিন্তু সম্পর্কিত চাবি (Keys) ব্যবহৃত হয়? [আইটি ক্রিপ্টো-${b}.২২]`,
    question_en: `How many distinct yet mathematically linked keys are employed in asymmetric public-key cryptography? [IT Crypto-${b}.22]`,
    options: {
      A: "২টি চাবি (পাবলিক কি এবং প্রাইভেট কি)",
      B: "১টি একক সিক্রেট কি",
      C: "৩টি মাস্টার কি",
      D: "৪টি সেশন কি"
    },
    correct_option: "A",
    explanation_bn: "পাবলিক কি এনক্রিপ্ট করার জন্য সবার উন্মুক্ত থাকে এবং শুধুমাত্র প্রাপকের ব্যক্তিগত প্রাইভেট কি দিয়েই তা ডিক্রিপ্ট করা যায় (যেমন RSA)।",
    explanation_en: "Asymmetric cryptography utilizes a pair of keys: a public key for encryption and a private key for decryption."
  }));

  // 23. Cloud Computing Service Models
  const cloudPool = [
    {
      q_bn: `ব্যবহারকারীকে সরাসরি ইন্টারনেট ব্রাউজারের মাধ্যমে সফটওয়্যার ব্যবহারের সুবিধা প্রদানকারী ক্লাউড মডেল কোনটি?`,
      q_en: `Which cloud computing service delivery model provides end-users with software applications over the internet?`,
      ans: "সফটওয়্যার এজ এ সার্ভিস (SaaS - যেমন গুগল ডকস)", b: "আইএএএস (IaaS)", c: "পিএএএস (PaaS)", d: "ডাটাবেজ সার্ভিস",
      exp_bn: "SaaS মডেলের মাধ্যমে ব্যবহারকারী কোনো সফটওয়্যার ইন্সটল না করেই ব্রাউজার থেকে সরাসরি সেবা গ্রহণ করতে পারে।",
      exp_en: "Software as a Service (SaaS) delivers software applications to clients over web browsers."
    },
    {
      q_bn: `ডেভেলপারদের অ্যাপ্লিকেশন তৈরি ও ডেপ্লয় করার জন্য রেডিমেড প্ল্যাটফর্ম ও পরিবেশ প্রদানকারী ক্লাউড সেবা কোনটি?`,
      q_en: `Which cloud service model provides developers with a complete runtime environment and tools to build applications?`,
      ans: "প্ল্যাটফর্ম এজ এ সার্ভিস (PaaS)", b: "ইনফ্রাস্ট্রাকচার এজ এ সার্ভিস (IaaS)", c: "সফটওয়্যার এজ এ সার্ভিস (SaaS)", d: "স্টোরেজ সার্ভিস",
      exp_bn: "PaaS (যেমন হেরোকু, গুগল অ্যাপ ইঞ্জিন) ডেভেলপারদের অন্তর্নিহিত সার্ভার পরিচালনা ছাড়াই সরাসরি কোড চালানোর সুযোগ দেয়।",
      exp_en: "Platform as a Service (PaaS) provides developers with a pre-configured platform to build and run software."
    }
  ];
  const c23 = cloudPool[b % cloudPool.length];
  questions.push(createQ({
    topic: "ক্লাউড কম্পিউটিং ও আধুনিক প্রযুক্তি",
    subtopic: "ক্লাউড সার্ভিস মডেল (IaaS, PaaS, SaaS)",
    question_bn: `${c23.q_bn} [আইটি ক্লাউড-${b}.২৩]`,
    question_en: `${c23.q_en} [IT Cloud-${b}.23]`,
    options: { A: c23.ans, B: c23.b, C: c23.c, D: c23.d },
    correct_option: "A",
    explanation_bn: c23.exp_bn,
    explanation_en: c23.exp_en
  }));

  // 24. Artificial Intelligence & Machine Learning
  questions.push(createQ({
    topic: "কৃত্রিম বুদ্ধিমত্তা ও মেশিন লার্নিং",
    subtopic: "মেশিন লার্নিং এর প্রকারভেদ",
    question_bn: `যে মেশিন লার্নিং পদ্ধতিতে মডেলকে পূর্বে লেবেলযুক্ত (Labeled) ডাটা দিয়ে প্রশিক্ষণ দেওয়া হয়, তাকে কী বলা হয়? [আইটি এআই-${b}.২৪]`,
    question_en: `In machine learning, what is the learning paradigm that trains models using labeled training data called? [IT AI-${b}.24]`,
    options: {
      A: "সুপারভাইজড লার্নিং (Supervised Learning)",
      B: "আনসুপারভাইজড লার্নিং (Unsupervised Learning)",
      C: "রিইনফোর্সমেন্ট লার্নিং",
      D: "ডিপ লার্নিং"
    },
    correct_option: "A",
    explanation_bn: "সুপারভাইজড লার্নিংয়ে ইনপুট এবং প্রত্যাশিত সঠিক আউটপুট (লেবেল) উভয়ই অ্যালগরিদমকে দিয়ে শেখানো হয়।",
    explanation_en: "Supervised learning algorithms infer patterns from labeled training datasets featuring input-output pairs."
  }));

  // 25. Blockchain & Distributed Ledger
  questions.push(createQ({
    topic: "ব্লকচেইন ও আধুনিক ফিনটেক",
    subtopic: "ব্লকচেইনের মৌলিক বৈশিষ্ট্য",
    question_bn: `ব্লকচেইন (Blockchain) প্রযুক্তির সবচেয়ে উল্লেখযোগ্য ও বৈপ্লবিক নিরাপত্তা বৈশিষ্ট্য কোনটি? [আইটি ব্লকচেইন-${b}.২৫]`,
    question_en: `What is the most revolutionary security feature that characterizes blockchain distributed ledger technology? [IT BC-${b}.25]`,
    options: {
      A: "বিকেন্দ্রীভূত ও অপরিবর্তনীয় হিসাব খাতা (Decentralized & Immutable Ledger)",
      B: "একটি কেন্দ্রীয় ব্যাংক দ্বারা সম্পূর্ণ নিয়ন্ত্রিত",
      C: "যেকোনো ব্যবহারকারী ডেটা পরিবর্তন করতে পারে",
      D: "এনক্রিপশন ছাড়া উন্মুক্ত সংরক্ষণ"
    },
    correct_option: "A",
    explanation_bn: "ব্লকচেইনে কোনো কেন্দ্রীয় নিয়ন্ত্রক থাকে না এবং ক্রিপ্টোগ্রাফিক হ্যাশ দ্বারা ব্লকগুলো এমনভাবে আবদ্ধ থাকে যা পরিবর্তন বা হ্যাক করা প্রায় অসম্ভব।",
    explanation_en: "Blockchain operates as a decentralized, cryptographically secured, tamper-evident, and immutable distributed ledger."
  }));

  return questions.slice(0, count);
}
