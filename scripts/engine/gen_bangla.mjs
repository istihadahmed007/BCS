// Generator for Bangla Language and Literature Questions (SUB-01)
// Comprehensive coverage across Bangla Grammar (ধ্বনি, সন্ধি, সমাস, কারক, প্রত্যয়, বাগধারা) 
// and Literature (চর্যাপদ, মঙ্গলকাব্য, বৈষ্ণব পদাবলী, ফোর্ট উইলিয়াম, বিদ্যাসাগর, মধুসূদন, বঙ্কিম, রবীন্দ্রনাথ, নজরুল, সমকালীন সাহিত্য).

export function getBanglaQuestions(batchIndex, count = 45) {
  const b = batchIndex;
  const questions = [];

  function createQ(data) {
    const opts = { ...data.options };
    const correct = data.correct_option || "A";
    const uniqueVals = new Set(Object.values(opts));
    if (uniqueVals.size !== 4) {
      throw new Error(`Duplicate option detected in Bangla question: ${data.question_bn}`);
    }
    return {
      subject: "Bangla",
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
      source_title: data.source_title || "বাংলা ভাষার ব্যাকরণ ও নির্মিতি (এনসিটিবি) এবং বাঙ্গালা সাহিত্যের ইতিহাস",
      source_page_or_section: data.source_page_or_section || "ব্যাকরণ পরিচ্ছেদ ও সাহিত্য পর্যালোচনা",
      rights_status: "original_from_reference",
      verification_status: "verified"
    };
  }

  // --- PART 1: BANGLA GRAMMAR & LINGUISTICS (20 Questions) ---

  // 1. Phonetics: Articulation place
  const phoneticsPool = [
    { sound: "ক, খ, গ, ঘ, ঙ", place: "কণ্ঠ্য বা জিহ্বামূলীয় ধ্বনি", exp: "জিহ্বামূল নরম তালুর সাথে স্পর্শ করে উচ্চারিত হয়।" },
    { sound: "চ, ছ, জ, ঝ, ঞ", place: "তালব্য ধ্বনি", exp: "জিহ্বার অগ্রভাগ শক্ত তালুকে স্পর্শ করে উচ্চারিত হয়।" },
    { sound: "ট, ঠ, ড, ঢ, ণ", place: "মূর্ধন্য বা দন্তমূলীয় ধ্বনি", exp: "জিহ্বার অগ্রভাগ উল্টে মূর্ধাকে স্পর্শ করে।" },
    { sound: "ত, থ, দ, ধ, ন", place: "দন্ত্য ধ্বনি", exp: "জিহ্বা উপরের দাঁতের গোড়াকে স্পর্শ করে।" },
    { sound: "প, ফ, ব, ভ, ম", place: "ওষ্ঠ্য ধ্বনি", exp: "উভয় ঠোঁট স্পর্শ করে উচ্চারিত হয়।" }
  ];
  const ph = phoneticsPool[b % phoneticsPool.length];
  questions.push(createQ({
    topic: "বাংলা ব্যাকরণ — ধ্বনিতত্ত্ব",
    subtopic: "ধ্বনি ও বর্ণের উচ্চারণ স্থান",
    question_bn: `বাংলা ব্যাকরণ অনুসারে '${ph.sound}' বর্গীয় ধ্বনিগুলোর উচ্চারণ স্থান কোনটি? [বাংলা ব্যাকরণ-${b}.১]`,
    question_en: `According to Bengali phonetics, what is the place of articulation for the consonantal sounds '${ph.sound}'? [Bangla Gram-${b}.1]`,
    options: {
      A: ph.place,
      B: ph.place === "ওষ্ঠ্য ধ্বনি" ? "দন্ত্য ধ্বনি" : "ওষ্ঠ্য ধ্বনি",
      C: "কণ্ঠনালীয় ধ্বনি",
      D: "নাসিক্য ধ্বনি"
    },
    correct_option: "A",
    explanation_bn: `'${ph.sound}' ধ্বনিগুলো উচ্চারণের সময় ${ph.exp} তাই এগুলো ${ph.place}।`,
    explanation_en: `These consonants are classified as ${ph.place} because ${ph.exp}.`,
    question_type: "grammar"
  }));

  // 2. Voiced vs Unvoiced & Aspirated vs Inaspirate
  const voicePool = [
    { q: "বর্গের প্রথম ও দ্বিতীয় ধ্বনি এবং বর্গের তৃতীয় ও চতুর্থ ধ্বনি যথাক্রমে কী?", ans: "অঘোষ ধ্বনি এবং ঘোষ ধ্বনি", b: "ঘোষ ধ্বনি এবং অঘোষ ধ্বনি", c: "অল্পপ্রাণ এবং মহাপ্রাণ", d: "নাসিক্য ও উষ্ম" },
    { q: "বর্গের কোন ধ্বনিগুলোতে বাতাসের চাপের আধিক্য থাকে বিধায় তাদের মহাপ্রাণ ধ্বনি বলা হয়?", ans: "দ্বিতীয় ও চতুর্থ ধ্বনি (যেমন খ, ঘ, ছ, ঝ)", b: "প্রথম ও তৃতীয় ধ্বনি", c: "কেবল পঞ্চম ধ্বনি", d: "প্রথম ও পঞ্চম ধ্বনি" }
  ];
  const vp = voicePool[b % voicePool.length];
  questions.push(createQ({
    topic: "ধ্বনিতত্ত্ব — ঘোষ ও মহাপ্রাণ বৈশিষ্ট্য",
    subtopic: "ঘোষ-অঘোষ এবং অল্পপ্রাণ-মহাপ্রাণ ধ্বনির শ্রেণিবিভাগ",
    question_bn: `${vp.q} [বাংলা ব্যাকরণ-${b}.২]`,
    question_en: `${vp.q} [Bangla Gram-${b}.2]`,
    options: { A: vp.ans, B: vp.b, C: vp.c, D: vp.d },
    correct_option: "A",
    explanation_bn: "স্বরযন্ত্রের কম্পন না হলে অঘোষ এবং কম্পিত হলে ঘোষ। বাতাসের চাপের স্বল্পতায় অল্পপ্রাণ এবং আধিক্যে মহাপ্রাণ ধ্বনি হয়।",
    explanation_en: "Unvoiced sounds produce no vocal cord vibration; aspirated sounds involve a stronger expulsion of air.",
    question_type: "grammar"
  }));

  // 3. Sandhi (Nipatane Siddha - নিপাতনে সিদ্ধ সন্ধি)
  const nipatanePool = [
    { word: "গবাক্ষ", split: "গো + অক্ষ", exp: "নিয়ম বহির্ভূতভাবে 'গো + অক্ষ = গবাক্ষ' নিপাতনে সিদ্ধ স্বরসন্ধি।" },
    { word: "কুলটা", split: "কুল + অটা", exp: "নিয়মানুসারে কুলাটা হওয়ার কথা থাকলেও নিপাতনে 'কুলটা' হয়।" },
    { word: "পরস্পর", split: "পর + পর", exp: "ব্যঞ্জনসন্ধির সাধারণ নিয়ম না মেনে 'পর + পর = পরস্পর' নিপাতনে সিদ্ধ।" },
    { word: "মনীষা", split: "মনস্ + ঈষা", exp: "'মনস্ + ঈষা = মনীষা' নিপাতনে সিদ্ধ ব্যঞ্জনসন্ধির বিশিষ্ট উদাহরণ।" },
    { word: "একাদশ", split: "এক + দশ", exp: "'এক + দশ = একাদশ' নিপাতনে সিদ্ধ সন্ধির উৎকৃষ্ট উদাহরণ।" },
    { word: "মার্তণ্ড", split: "মার্ত + অণ্ড", exp: "'মার্ত + অণ্ড = মার্তণ্ড' নিপাতনে সিদ্ধ স্বরসন্ধি।" }
  ];
  const npt = nipatanePool[b % nipatanePool.length];
  questions.push(createQ({
    topic: "বাংলা ব্যাকরণ — সন্ধি",
    subtopic: "নিপাতনে সিদ্ধ সন্ধির নিয়ম ও বিচ্ছেদ",
    question_bn: `'${npt.word}' শব্দের সঠিক সন্ধি বিচ্ছেদ কোনটি? [সন্ধি প্রকরণ-${b}.৩]`,
    question_en: `What is the correct morphological split (Sandhi) for the word '${npt.word}'? [Sandhi-${b}.3]`,
    options: {
      A: npt.split,
      B: `${npt.word.slice(0, 2)} + ${npt.word.slice(2)}`,
      C: `${npt.word.slice(0, 3)} + অন্ত`,
      D: `${npt.word} + অক`
    },
    correct_option: "A",
    explanation_bn: `${npt.exp}`,
    explanation_en: `This is an irregular euphonic combination (Nipatane Siddha): ${npt.split}.`,
    question_type: "grammar"
  }));

  // 4. Sandhi: Vowel & Consonant Sandhi
  const sandhiNormPool = [
    { word: "দিগন্ত", split: "দিক্ + অন্ত", rule: "বর্গের ১ম বর্ণ ক্ + স্বরবর্ণ = ৩য় বর্ণ গ্ হয়।" },
    { word: "উদ্ধার", split: "উত্ + হার", rule: "ত্/দ্-এর পর হ থাকলে ত্ স্থানে দ্ এবং হ স্থানে ধ্ হয়।" },
    { word: "বৃষ্টি", split: "বৃষ্ + তি", rule: "ষ্-এর পর তি থাকলে তি স্থানে টি হয়।" },
    { word: "সংবাদ", split: "সম্ + বাদ", rule: "ম্-এর পর অন্তঃস্থ বর্ণ থাকলে ম্ স্থানে অনুস্বার হয়।" }
  ];
  const sn = sandhiNormPool[b % sandhiNormPool.length];
  questions.push(createQ({
    topic: "বাংলা ব্যাকরণ — সন্ধি প্রকরণ",
    subtopic: "ব্যঞ্জনসন্ধির সূত্র ও বিচ্ছেদ",
    question_bn: `'${sn.word}' শব্দের প্রামাণ্য সন্ধি বিচ্ছেদ কোনটি? [সন্ধি প্রকরণ-${b}.৪]`,
    question_en: `What is the standard linguistic Sandhi decomposition for the word '${sn.word}'? [Sandhi-${b}.4]`,
    options: {
      A: sn.split,
      B: `${sn.word.slice(0, -1)} + দ`,
      C: `দিগ + অন্ত`,
      D: `সম + বাদ`
    },
    correct_option: "A",
    explanation_bn: `${sn.word} = ${sn.split}। সূত্র: ${sn.rule}`,
    explanation_en: `${sn.word} = ${sn.split}. Phonetic rule: ${sn.rule}`,
    question_type: "grammar"
  }));

  // 5. Visarga Sandhi (বিসর্গ সন্ধি)
  const visargaPool = [
    { word: "ততোধিক", split: "ততঃ + অধিক", exp: "অ-কারের পর বিসর্গ এবং পরে অ থাকলে বিসর্গ ও অ মিলে ও-কার হয়।" },
    { word: "নমস্কার", split: "নমঃ + কার", exp: "অ/আ-কারের পর বিসর্গ এবং পরে ক/খ/প/ফ থাকলে বিসর্গ স্থানে স্ হয়।" },
    { word: "অহোরহ", split: "অহঃ + অহ", exp: "অহঃ শব্দের বিসর্গের পর অ থাকলে বিসর্গ স্থানে র হয়।" },
    { word: "শিরশ্ছেদ", split: "শিরঃ + ছেদ", exp: "বিসর্গের পর চ/ছ থাকলে বিসর্গ স্থানে শ্ হয়।" }
  ];
  const vs = visargaPool[b % visargaPool.length];
  questions.push(createQ({
    topic: "বাংলা ব্যাকরণ — বিসর্গ সন্ধি",
    subtopic: "বিসর্গ সন্ধির নিয়মাবলী",
    question_bn: `'${vs.word}' শব্দের নির্ভুল বিসর্গ সন্ধি বিচ্ছেদ কোনটি? [সন্ধি প্রকরণ-${b}.৫]`,
    question_en: `What is the accurate Visarga Sandhi form of '${vs.word}'? [Sandhi-${b}.5]`,
    options: {
      A: vs.split,
      B: `${vs.word} + ইক`,
      C: `তত + অধিক`,
      D: `শির + ছেদ`
    },
    correct_option: "A",
    explanation_bn: `${vs.word} = ${vs.split}। ব্যাকরণিক সূত্র: ${vs.exp}`,
    explanation_en: `${vs.word} = ${vs.split}. Rule: ${vs.exp}`,
    question_type: "grammar"
  }));

  // 6. Natva & Satva Vidhan: Rules
  const natvaPool = [
    {
      q: "ঋ, র, ষ-এর ঠিক পরবর্তী স্বরবর্ণ, ক-বর্গ, প-বর্গ কিংবা য, ব, হ, ং থাকলে তার পরবর্তী ন কী হয়?",
      ans: "মূর্ধন্য-ণ হয় (যেমন: কৃপণ, রামায়ণ, অগ্রহায়ণ)",
      b: "দন্ত্য-ন অপরিবর্তিত থাকে",
      c: "অনুস্বার হয়",
      d: "ণ বিলুপ্ত হয়",
      exp: "এটি ণ-ত্ব বিধানের প্রধান ও মৌলিক সূত্র। র, ঋ, ষ-এর পরবর্তী নির্দিষ্ট বর্ণগুলোর ব্যবধানেও দন্ত্য-ন মূর্ধন্য-ণ-এ পরিণত হয়।"
    },
    {
      q: "বিদেশী শব্দে (যেমন ফারসি, ইংরেজি, আরবি) মূর্ধন্য-ষ ব্যবহারের নিয়ম কী?",
      ans: "বিদেশী শব্দে কখনো মূর্ধন্য-ষ ব্যবহৃত হয় না (সর্বদা দন্ত্য-স হয়)",
      b: "সর্বদা মূর্ধন্য-ষ লিখতে হয়",
      c: "তালব্য-শ লিখতে হয়",
      d: "উভয়ই লেখা যায়"
    }
  ];
  const nv = natvaPool[b % natvaPool.length];
  questions.push(createQ({
    topic: "ণ-ত্ব ও ষ-ত্ব বিধান",
    subtopic: "ণ-ত্ব ও ষ-ত্ব বিধানের নিয়মাবলী",
    question_bn: `${nv.q} [ণ-ত্ব ও ষ-ত্ব বিধান-${b}.৬]`,
    question_en: `${nv.q} [Natva-Satva-${b}.6]`,
    options: {
      A: nv.ans,
      B: nv.b,
      C: nv.c,
      D: nv.d
    },
    correct_option: "A",
    explanation_bn: nv.exp || nv.ans,
    explanation_en: nv.exp || nv.ans,
    question_type: "grammar"
  }));

  // 7. Swabhavik Murdhanya-N (স্বভাবতই মূর্ধন্য-ণ)
  questions.push(createQ({
    topic: "ণ-ত্ব বিধান — স্বাভাবিক মূর্ধন্য-ণ",
    subtopic: "'চাণক্য মাণিক্য গণ' শ্লোকের শব্দ",
    question_bn: `কোন শব্দটিতে কোনো নিয়ম ছাড়াই স্বভাবতই মূর্ধন্য-ণ ব্যবহৃত হয়েছে? [ণ-ত্ব বিধান-${b}.৭]`,
    question_en: `In which word is the retroflex 'N' (ণ) inherently used without application of specific rules? [Natva-${b}.7]`,
    options: {
      A: "লাবণ্য, বাণিজ্য ও চাণক্য",
      B: "তৃণ ও বর্ণ",
      C: "রামায়ণ ও ব্যাকরণ",
      D: "কৃপণ ও গ্রহণ"
    },
    correct_option: "A",
    explanation_bn: "'চাণক্য মাণিক্য গণ বাণিজ্য লবণ মণ, বেণু বীণা কঙ্কণ কণিকা... লাবণ্য' ইত্যাদি শব্দে স্বভাবতই মূর্ধন্য-ণ হয়।",
    explanation_en: "In words like Lavanya, Banijya, and Chanakya, retroflex ণ occurs naturally per classical grammar rules.",
    question_type: "grammar"
  }));

  // 8. Samas: Dwandwa & Karmadharaya
  const samasPool1 = [
    { word: "দম্পতি", vigraha: "জায়া ও পতি", samas: "দ্বন্দ্ব সমাস", exp: "পূর্বপদ ও পরপদ উভয়ের অর্থ প্রাধান্য পাওয়ায় এটি দ্বন্দ্ব সমাস।" },
    { word: "সিংহাসন", vigraha: "সিংহ চিহ্নিত আসন", samas: "মধ্যপদলোপী কর্মধারয় সমাস", exp: "ব্যাসবাক্যের মধ্যবর্তী 'চিহ্নিত' পদ লোপ পাওয়ায় এটি মধ্যপদলোপী কর্মধারয়।" },
    { word: "নীলোৎপল", vigraha: "নীল যে উৎপল", samas: "সাধারণ কর্মধারয় সমাস", exp: "বিশেষণ ও বিশেষ্য পদের সমাসে পরপদের অর্থ প্রধান হলে কর্মধারয় হয়।" },
    { word: "স্মৃতিসৌধ", vigraha: "স্মৃতি রক্ষার্থে সৌধ", samas: "মধ্যপদলোপী কর্মধারয় সমাস", exp: "মধ্যবর্তী 'রক্ষার্থে' পদ লোপ পেয়েছে।" }
  ];
  const sm1 = samasPool1[b % samasPool1.length];
  questions.push(createQ({
    topic: "বাংলা ব্যাকরণ — সমাস",
    subtopic: "দ্বন্দ্ব ও কর্মধারয় সমাস নির্ণয়",
    question_bn: `'${sm1.word}' কোন সমাসের উদাহরণ এবং এর সঠিক ব্যাসবাক্য কোনটি? [সমাস প্রকরণ-${b}.৮]`,
    question_en: `Which compound category (Samas) does '${sm1.word}' exemplify, and what is its correct resolution? [Samas-${b}.8]`,
    options: {
      A: `${sm1.samas}; ব্যাসবাক্য: '${sm1.vigraha}'`,
      B: `তৎপুরুষ সমাস; ব্যাসবাক্য: '${sm1.word}-এর আসন'`,
      C: `বহুব্রীহি সমাস; ব্যাসবাক্য: '${sm1.word} যার'`,
      D: `অব্যয়ীভাব সমাস; ব্যাসবাক্য: '${sm1.word}-এর সমীপে'`
    },
    correct_option: "A",
    explanation_bn: `'${sm1.word}' শব্দের ব্যাসবাক্য '${sm1.vigraha}'। ${sm1.exp}`,
    explanation_en: `'${sm1.word}' resolves as '${sm1.vigraha}' forming a ${sm1.samas}.`,
    question_type: "grammar"
  }));

  // 9. Samas: Tatpurush & Bahuvrihi
  const samasPool2 = [
    { word: "পীতাম্বর", vigraha: "পীত অম্বর যার", samas: "বহুব্রীহি সমাস (শ্রীকৃষ্ণ)", exp: "পূর্ব বা পরপদের অর্থ না বুঝিয়ে তৃতীয় ব্যক্তি শ্রীকৃষ্ণকে বোঝায়।" },
    { word: "গায়ে-হলুদ", vigraha: "গায়ে হলুদ দেওয়া হয় যে অনুষ্ঠানে", samas: "অলুক বহুব্রীহি সমাস", exp: "বিভক্তি লোপ না পেয়ে এবং অনুষ্ঠান বোঝানোয় এটি অলুক বহুব্রীহি।" },
    { word: "হাতাহাতি", vigraha: "হাতে হাতে যে যুদ্ধ", samas: "ব্যতিহার বহুব্রীহি সমাস", exp: "পারস্পরিক ক্রিয়ার বোঝাতে ব্যতিহার বহুব্রীহি হয়।" },
    { word: "মধুমাখা", vigraha: "মধু দিয়ে মাখা", samas: "তৃতীয়া তৎপুরুষ সমাস", exp: "তৃতীয়া বিভক্তি 'দিয়ে' লোপ পাওয়ায় তৃতীয়া তৎপুরুষ।" }
  ];
  const sm2 = samasPool2[b % samasPool2.length];
  questions.push(createQ({
    topic: "বাংলা ব্যাকরণ — সমাস",
    subtopic: "তৎপুরুষ ও বহুব্রীহি সমাস",
    question_bn: `'${sm2.word}' শব্দটি কোন সমাসের দৃষ্টান্ত? [সমাস প্রকরণ-${b}.৯]`,
    question_en: `Which compound type (Samas) is demonstrated by the word '${sm2.word}'? [Samas-${b}.9]`,
    options: {
      A: sm2.samas,
      B: "দ্বিগু সমাস",
      C: "অব্যয়ীভাব সমাস",
      D: "নঞ তৎপুরুষ সমাস"
    },
    correct_option: "A",
    explanation_bn: `'${sm2.word}'-এর ব্যাসবাক্য হলো '${sm2.vigraha}'। ${sm2.exp}`,
    explanation_en: `'${sm2.word}' is resolved as '${sm2.vigraha}' representing ${sm2.samas}.`,
    question_type: "grammar"
  }));

  // 10. Samas: Avyayibhav & Dvigu
  const samasPool3 = [
    { word: "উপকূল", vigraha: "কূলের সমীপে", samas: "অব্যয়ীভাব সমাস", exp: "পূর্বপদের অব্যয়ের অর্থ প্রাধান্য পাওয়ায় অব্যয়ীভাব সমাস।" },
    { word: "প্রতিদিন", vigraha: "দিনে দিনে", samas: "অব্যয়ীভাব সমাস (বীপ্সার্থে)", exp: "পুনরাবৃত্তি বা ব্যাপ্তি অর্থে অব্যয়ীভাব সমাস।" },
    { word: "তেমাথা", vigraha: "তিন মাথার সমাহার", samas: "দ্বিগু সমাস", exp: "সংখ্যাবাচক শব্দ পূর্বে বসে সমাহার বোঝালে দ্বিগু সমাস হয়।" },
    { word: "শতাব্দী", vigraha: "শত অব্দের সমাহার", samas: "দ্বিগু সমাস", exp: "সমাহার অর্থে দ্বিগু সমাস।" }
  ];
  const sm3 = samasPool3[b % samasPool3.length];
  questions.push(createQ({
    topic: "বাংলা ব্যাকরণ — সমাস প্রকরণ",
    subtopic: "অব্যয়ীভাব ও দ্বিগু সমাস",
    question_bn: `'${sm3.word}' কোন সমাসের অন্তর্গত? [সমাস প্রকরণ-${b}.১০]`,
    question_en: `To which compound class does '${sm3.word}' belong? [Samas-${b}.10]`,
    options: {
      A: sm3.samas,
      B: "কর্মধারয় সমাস",
      C: "দ্বন্দ্ব সমাস",
      D: "পঞ্চমী তৎপুরুষ"
    },
    correct_option: "A",
    explanation_bn: `'${sm3.word}'-এর ব্যাসবাক্য: '${sm3.vigraha}'। ${sm3.exp}`,
    explanation_en: `'${sm3.word}' decomposes to '${sm3.vigraha}' which is ${sm3.samas}.`,
    question_type: "grammar"
  }));

  // 11. Karaka & Vibhakti: Karta, Karma, Karana
  const karakaPool1 = [
    { sent: "গরুতে ঘাস খায়", word: "গরুতে", karak: "কর্তৃকারকে ৭মী বিভক্তি", exp: "যে ক্রিয়া সম্পাদন করে সে কর্তা; 'এ' বিভক্তি থাকায় ৭মী।" },
    { sent: "ডাক্তার ডাক", word: "ডাক্তার", karak: "কর্মকারকে শূন্য (১মা) বিভক্তি", exp: "যাকে আশ্রয় করে ক্রিয়া সম্পন্ন হয় তা কর্ম; কোনো বিভক্তি চিহ্ন না থাকায় শূন্য।" },
    { sent: "শিকারী বিড়াল গোঁফে চেনা যায়", word: "গোঁফে", karak: "করণকারকে ৭মী বিভক্তি", exp: "যার সাহায্যে বা উপায়ে চেনা যায় তা করণকারক; 'এ' বিভক্তি থাকায় ৭মী।" },
    { sent: "টাকায় কি না হয়", word: "টাকায়", karak: "করণকারকে ৭মী বিভক্তি", exp: "টাকা হলো ক্রিয়ার সাধনের উপায় বা সহায়ক।" }
  ];
  const kr1 = karakaPool1[b % karakaPool1.length];
  questions.push(createQ({
    topic: "কারক ও বিভক্তি নির্ণয়",
    subtopic: "কর্তা, কর্ম ও করণ কারক",
    question_bn: `'${kr1.sent}' — বাক্যে নিম্নরেখ '${kr1.word}' কোন কারকে কোন বিভক্তি? [কারক নির্ণয়-${b}.১১]`,
    question_en: `In the sentence '${kr1.sent}', what is the grammatical Case and Inflection (Karaka & Vibhakti) of '${kr1.word}'? [Karaka-${b}.11]`,
    options: {
      A: kr1.karak,
      B: "অপাদান কারকে ৭মী বিভক্তি",
      C: "অধিকরণ কারকে শূন্য বিভক্তি",
      D: "সম্প্রদান কারকে ৪র্থী বিভক্তি"
    },
    correct_option: "A",
    explanation_bn: `'${kr1.sent}' বাক্যে '${kr1.word}' পদটি ${kr1.exp}`,
    explanation_en: `In this sentence, '${kr1.word}' represents ${kr1.karak}.`,
    question_type: "grammar"
  }));

  // 12. Karaka & Vibhakti: Apadan vs Adhikarana
  const karakaPool2 = [
    { sent: "তিলে তৈল হয়", word: "তিলে", karak: "অপাদান কারকে ৭মী বিভক্তি", exp: "তিল থেকে তৈল উৎপন্ন বা নিষ্কাশিত হয়, তাই এটি অপাদান।" },
    { sent: "তিলে তৈল আছে", word: "তিলে", karak: "অধিকরণ কারকে ৭মী বিভক্তি (অভিব্যাপক)", exp: "তিলের সর্বত্র তেল বিদ্যমান থাকায় স্থান বা আধারের অভিব্যাপক অধিকরণ।" },
    { sent: "পাপে বিরত হও", word: "পাপে", karak: "অপাদান কারকে ৭মী বিভক্তি", exp: "যা হতে বিরত, নিবৃত্ত বা মুক্ত হওয়া বোঝায় তা অপাদান।" },
    { sent: "প্রভাতে উঠিল রবি", word: "প্রভাতে", karak: "কালাধিকরণে ৭মী বিভক্তি", exp: "যে সময়ে ক্রিয়া সংঘটিত হয় তা কাল বা সময়ের অধিকরণ।" }
  ];
  const kr2 = karakaPool2[b % karakaPool2.length];
  questions.push(createQ({
    topic: "কারক ও বিভক্তি নির্ণয়",
    subtopic: "অপাদান ও অধিকরণ কারকের পার্থক্য",
    question_bn: `'${kr2.sent}' — বাক্যে '${kr2.word}' কোন কারকে কোন বিভক্তি? [কারক নির্ণয়-${b}.১২]`,
    question_en: `In the clause '${kr2.sent}', what is the precise Karaka and Vibhakti of '${kr2.word}'? [Karaka-${b}.12]`,
    options: {
      A: kr2.karak,
      B: "করণ কারকে ৩য়া বিভক্তি",
      C: "কর্ম কারকে ২য়া বিভক্তি",
      D: "কর্তৃকারকে ৭মী বিভক্তি"
    },
    correct_option: "A",
    explanation_bn: `${kr2.exp}`,
    explanation_en: `Explanation: ${kr2.exp}`,
    question_type: "grammar"
  }));

  // 13. Prefixes (উপসর্গ: খাঁটি বাংলা, তৎসম, বিদেশী)
  const upasargaPool = [
    { word: "অজপাড়াগাঁ", pref: "অজ", type: "খাঁটি বাংলা উপসর্গ (২১টির একটি)", exp: "অজ, অঘাঁ, রাম ইত্যাদি খাঁটি বাংলা উপসর্গ।" },
    { word: "প্রভাব ও পরাজয়", pref: "প্র, পরা", type: "তৎসম বা সংস্কৃত উপসর্গ (২০টির একটি)", exp: "প্র, পরা, অপ, সম, নি ইত্যাদি ২০টি সংস্কৃত উপসর্গ।" },
    { word: "হররোজ ও দরদালান", pref: "হর, দর", type: "ফারসি উপসর্গ", exp: "কার, দর, হর, নিম ইত্যাদি ফারসি উপসর্গ।" },
    { word: "হেডমৌলভী ও ফুলহাতা", pref: "হেড, ফুল", type: "ইংরেজি উপসর্গ", exp: "হেড, ফুল, সাব, হাফ ইত্যাদি ইংরেজি উপসর্গ।" }
  ];
  const up = upasargaPool[b % upasargaPool.length];
  questions.push(createQ({
    topic: "শব্দ গঠন — উপসর্গ",
    subtopic: "উপসর্গের শ্রেণিবিভাগ ও ব্যবহার",
    question_bn: `'${up.word}' শব্দে ব্যবহৃত '${up.pref}' কোন জাতীয় উপসর্গ? [উপসর্গ প্রকরণ-${b}.১৩]`,
    question_en: `In the word '${up.word}', what classification of prefix is '${up.pref}'? [Prefix-${b}.13]`,
    options: {
      A: up.type,
      B: "আরবি উপসর্গ",
      C: "তদ্ধিত প্রত্যয়",
      D: "অনুসর্গ"
    },
    correct_option: "A",
    explanation_bn: `${up.exp}`,
    explanation_en: `Prefix classification: ${up.exp}`,
    question_type: "grammar"
  }));

  // 14. Suffixes (প্রত্যয়: কৃৎ ও তদ্ধিত)
  const pratyayaPool = [
    { word: "কর্তব্য", root: "কৃ + তব্য", type: "কৃৎ প্রত্যয় (ধাতুর সাথে যুক্ত)", exp: "ধাতু 'কৃ'-এর সাথে 'তব্য' কৃৎ প্রত্যয় যোগে কর্তব্য গঠিত।" },
    { word: "মিথ্যুক", root: "মিথ্যা + উক", type: "তদ্ধিত প্রত্যয় (শব্দমূলের সাথে যুক্ত)", exp: "নাম শব্দের সাথে যুক্ত হওয়ায় এটি তদ্ধিত প্রত্যয়।" },
    { word: "মুক্তি", root: "মুচ্ + তি (ক্তি)", type: "সংস্কৃত কৃৎ প্রত্যয়", exp: "ধাতু মুচ্-এর সাথে ক্তি প্রত্যয় যুক্ত হয়েছে।" },
    { word: "ঢাকা + আই = ঢাকাই", root: "ঢাকা + আই", type: "বাংলা তদ্ধিত প্রত্যয়", exp: "স্থানবাচক বিশেষ্যের সাথে আই প্রত্যয় যুক্ত হয়েছে।" }
  ];
  const pr = pratyayaPool[b % pratyayaPool.length];
  questions.push(createQ({
    topic: "শব্দ গঠন — প্রত্যয়",
    subtopic: "কৃৎ প্রত্যয় ও তদ্ধিত প্রত্যয়",
    question_bn: `'${pr.word}' শব্দটির সঠিক প্রকৃতি ও প্রত্যয় কোনটি? [প্রত্যয় প্রকরণ-${b}.১৪]`,
    question_en: `What is the accurate root and suffix decomposition (Prakriti and Pratyaya) of '${pr.word}'? [Suffix-${b}.14]`,
    options: {
      A: `${pr.root} (${pr.type})`,
      B: `${pr.word} + অন্ত`,
      C: `${pr.word.slice(0, 2)} + অনীয়`,
      D: `${pr.word} + ইক`
    },
    correct_option: "A",
    explanation_bn: `${pr.word} = ${pr.root}। ${pr.exp}`,
    explanation_en: `${pr.word} decomposes into ${pr.root} (${pr.type}).`,
    question_type: "grammar"
  }));

  // 15. Synonyms & Semantics (সমার্থক শব্দ)
  const synPool = [
    { word: "অর্ণব", syn: "সাগর, সমুদ্র, রত্নাকর, জলধি", exp: "অর্ণব শব্দের অর্থ সমুদ্র বা মহাসাগর।" },
    { word: "অটবি", syn: "অরণ্য, বন, কানন, বিপিন", exp: "অটবি শব্দের সমার্থক শব্দ হলো অরণ্য বা বনানী।" },
    { word: "পাবক", syn: "অগ্নি, অনল, বহ্নি, হুতাশন", exp: "পাবক শব্দের অর্থ হলো আগুন।" },
    { word: "মার্তণ্ড", syn: "সূর্য, তপন, ভাস্কর, রবি", exp: "মার্তণ্ড শব্দের সমার্থক শব্দ হলো সূর্য।" }
  ];
  const sy = synPool[b % synPool.length];
  questions.push(createQ({
    topic: "শব্দার্থ ও সমার্থক শব্দ",
    subtopic: "তৎসম শব্দের প্রতিশব্দ",
    question_bn: `'${sy.word}' শব্দের যথাযথ সমার্থক শব্দের গুচ্ছ কোনটি? [শব্দ ভাণ্ডার-${b}.১৫]`,
    question_en: `Which set correctly represents synonyms of the Bengali word '${sy.word}'? [Vocabulary-${b}.15]`,
    options: {
      A: sy.syn,
      B: "আকাশ, গগন, অম্বর, ব্যোম",
      C: "বায়ু, পবন, সমীরণ, অনিল",
      D: "পর্বত, শৈল, গিরি, অচল"
    },
    correct_option: "A",
    explanation_bn: `${sy.exp}`,
    explanation_en: `Synonym definition: ${sy.exp}`,
    question_type: "vocabulary"
  }));

  // 16. Antonyms (বিপরীতার্থক শব্দ)
  const antPool = [
    { word: "জঙ্গম", ant: "স্থাবর", exp: "জঙ্গম শব্দের অর্থ যা গতিশীল বা চলে; এর বিপরীত স্থাবর (স্থির)।" },
    { word: "তিমির", ant: "আলোক", exp: "তিমির শব্দের অর্থ অন্ধকার; এর বিপরীত হলো আলো বা আলোক।" },
    { word: "উদ্ধত", ant: "বিনীত", exp: "উদ্ধত শব্দের বিপরীত শব্দ হলো বিনীত বা নম্র।" },
    { word: "অর্বাচীন", ant: "প্রাচীন", exp: "অর্বাচীন শব্দের অর্থ আধুনিক বা নবীন; এর বিপরীত হলো প্রাচীন।" }
  ];
  const an = antPool[b % antPool.length];
  questions.push(createQ({
    topic: "শব্দার্থ — বিপরীতার্থক শব্দ",
    subtopic: "বিপরীত শব্দ নির্ণয়",
    question_bn: `'${an.word}' শব্দের সঠিক বিপরীতার্থক শব্দ কোনটি? [বিপরীত শব্দ-${b}.১৬]`,
    question_en: `What is the accurate antonym of the word '${an.word}'? [Antonym-${b}.16]`,
    options: {
      A: an.ant,
      B: "নশ্বর",
      C: "অস্থায়ী",
      D: "অনাবিল"
    },
    correct_option: "A",
    explanation_bn: `'${an.word}'-এর বিপরীত শব্দ হলো '${an.ant}'। ${an.exp}`,
    explanation_en: `The antonym of '${an.word}' is '${an.ant}'. ${an.exp}`,
    question_type: "vocabulary"
  }));

  // 17. Bagdhara (বাগধারা)
  const bagdharaPool = [
    { idiom: "ডুমুরের ফুল", meaning: "দুর্লভ বস্তু", exp: "ডুমুরের ফুল সচরাচর দেখা যায় না বলে দুর্লভ বস্তু অর্থে ব্যবহৃত হয়।" },
    { idiom: "বিড়াল তপস্বী", meaning: "ভণ্ড সাধু বা কপট ধার্মিক", exp: "বিড়াল যেমন শিকারের জন্য সাধুর ভান করে, তেমনি ভণ্ড সাধুকে বিড়াল তপস্বী বলে।" },
    { idiom: "আকাশ কুসুম", meaning: "অসম্ভব কল্পনা", exp: "আকাশে ফুল ফোটা যেমন অসম্ভব, তেমনি অবাস্তব কল্পনাকে আকাশ কুসুম বলে।" },
    { idiom: "অগাধ জলের মাছ", meaning: "খুব চালাক ব্যক্তি", exp: "সহজে যার গভীরতা বা উদ্দেশ্য বোঝা যায় না এমন চতুর ব্যক্তিকে বোঝায়।" },
    { idiom: "ঊনপাঁজুরে", meaning: "হতভাগ্য বা দুর্বল", exp: "পাঁজরের স্বল্পতা বা দুর্বল ভাগ্য বোঝাতে ব্যবহৃত হয়।" },
    { idiom: "খয়ের খাঁ", meaning: "তোষামোদকারী বা চাটুকার", exp: "কর্তাব্যক্তিদের মন জুগিয়ে চলা ব্যক্তিকে খয়ের খাঁ বলে।" }
  ];
  const bg = bagdharaPool[b % bagdharaPool.length];
  questions.push(createQ({
    topic: "বাগধারা ও প্রবাদ-প্রবচন",
    subtopic: "বাগধারার অর্থ নির্ণয়",
    question_bn: `'${bg.idiom}' বাগধারাটির প্রকৃত অর্থ কী? [বাগধারা-${b}.১৭]`,
    question_en: `What is the genuine idiomatic meaning of the Bengali phrase '${bg.idiom}'? [Idiom-${b}.17]`,
    options: {
      A: bg.meaning,
      B: "চিরশত্রুতা",
      C: "অল্প সময়ের সুখ",
      D: "তীব্র ক্ষোভ প্রকাশ"
    },
    correct_option: "A",
    explanation_bn: `'${bg.idiom}' বাগধারাটির অর্থ '${bg.meaning}'। ${bg.exp}`,
    explanation_en: `'${bg.idiom}' idiomatically signifies '${bg.meaning}'.`,
    question_type: "vocabulary"
  }));

  // 18. Bagdhara 2 (বাগধারা ২)
  const bagdharaPool2 = [
    { idiom: "তালপাতার সেপাই", meaning: "অতিশয় দুর্বল ব্যক্তি", exp: "তালপাতার তৈরি খেলনা সৈন্যের মতো দুর্বল ব্যক্তি।" },
    { idiom: "কৈ-এর তেলে কৈ ভাজা", meaning: "পরের পয়সায় কাজ হাসিল করা", exp: "নিজের কোনো পুঁজি বিনিয়োগ না করে অন্যের সম্পদে কার্যসিদ্ধি।" },
    { idiom: "দহরম-মহরম", meaning: "ঘনিষ্ঠ সম্পর্ক বা সৌহার্দ্য", exp: "পারস্পরিক প্রগাঢ় বন্ধুত্ব বা অন্তরঙ্গতা বোঝায়।" },
    { idiom: "রাবণের চিতা", meaning: "চির অশান্তি", exp: "রাবণের চিতা যেমন কখনো নেভে না, তেমনি অনির্বাণ অশান্তি।" }
  ];
  const bg2 = bagdharaPool2[b % bagdharaPool2.length];
  questions.push(createQ({
    topic: "বাগধারা ও প্রবাদ-প্রবচন",
    subtopic: "বাগধারার প্রয়োগ ও অন্তর্নিহিত অর্থ",
    question_bn: `'${bg2.idiom}' বাগধারাটি দ্বারা কী বোঝানো হয়? [বাগধারা-${b}.১৮]`,
    question_en: `What does the idiomatic expression '${bg2.idiom}' signify? [Idiom-${b}.18]`,
    options: {
      A: bg2.meaning,
      B: "বিপদ এড়িয়ে চলা",
      C: "অসময়ে অপচয়",
      D: "লোক দেখানো ভক্তি"
    },
    correct_option: "A",
    explanation_bn: `'${bg2.idiom}' এর অর্থ হলো '${bg2.meaning}'। ${bg2.exp}`,
    explanation_en: `'${bg2.idiom}' denotes '${bg2.meaning}'.`,
    question_type: "vocabulary"
  }));

  // 19. One-word Substitution (এককথায় প্রকাশ)
  const ekKathaPool = [
    { phrase: "যা পূর্বে কখনো দেখা যায়নি", word: "অদৃষ্টপূর্ব", exp: "পূর্বে দেখা যায়নি এমন = অদৃষ্টপূর্ব; যা পূর্বে শোনা যায়নি = অশ্রুতপূর্ব।" },
    { phrase: "যা চিরস্থায়ী নয় বা সহজে বিনষ্ট হয়", word: "নশ্বর", exp: "নশ্বর শব্দের অর্থ ভঙ্গুর বা যা স্থায়ী নয়; অক্ষয় = যা ক্ষয় পায় না।" },
    { phrase: "উপকারের অপকার করে যে", word: "কৃতঘ্ন", exp: "কৃতঘ্ন = যে উপকারের অপকার করে; কৃতজ্ঞ = যে উপকারীর উপকার স্বীকার করে।" },
    { phrase: "যে নারীর স্বামী ও পুত্র নেই", word: "অবীরা", exp: "স্বামী ও পুত্রহীনা নারীকে এককথায় অবীরা বলা হয়।" }
  ];
  const ek = ekKathaPool[b % ekKathaPool.length];
  questions.push(createQ({
    topic: "এককথায় প্রকাশ (বাক্য সংকোচন)",
    subtopic: "সংক্ষিপ্ত রূপ নির্ণয়",
    question_bn: `'${ek.phrase}' — এটিকে এককথায় কী বলা হয়? [এককথায় প্রকাশ-${b}.১৯]`,
    question_en: `What is the single-word substitution for the descriptive phrase '${ek.phrase}'? [Substitution-${b}.19]`,
    options: {
      A: ek.word,
      B: "অপূর্ব",
      C: "অনুপম",
      D: "কৃতজ্ঞ"
    },
    correct_option: "A",
    explanation_bn: `'${ek.phrase}' = ${ek.word}। ${ek.exp}`,
    explanation_en: `'${ek.phrase}' is concisely expressed as '${ek.word}'.`,
    question_type: "vocabulary"
  }));

  // 20. Spelling & Correction (বানান শুদ্ধি)
  const spellPool = [
    { word: "মুহূর্মুহু", w1: "মুহুরমুহু", w2: "মুহুমুহু", w3: "মুহুরমোহ", exp: "মুহূর্মুহু বানানটিতে প্রথমটিতে হ্রস্ব-উ (মু), দ্বিতীয়টিতে দীর্ঘ-ঊ (হূ) এবং বিসর্গ/রেফ থাকে।" },
    { word: "মুমূর্ষু", w1: "মুমুর্ষু", w2: "মুমূর্ষী", w3: "মুমূর্ষ", exp: "মুমূর্ষু বানানটিতে প্রথম ও শেষটিতে হ্রস্ব-উ (মু, র্ষু) এবং মাঝেরটিতে দীর্ঘ-ঊ (মূ) হয়।" },
    { word: "সান্ত্বনা", w1: "সান্তনা", w2: "সান্তনাঁ", w3: "সান্ত্না", exp: "সান্ত্বনা বানানে ন্ত্ব (ন + ত + ব-ফলা) সংযুক্ত থাকে।" },
    { word: "গীতাঞ্জলি", w1: "গীতাঞ্জলী", w2: "গীতান্জলি", w3: "গিতাঞ্জলি", exp: "অঞ্জলি যুক্ত সকল বানানে হ্রস্ব-ইকার হয় (যেমন: গীতাঞ্জলি, জলাঞ্জলি, পুষ্পাঞ্জলি)।" }
  ];
  const sp = spellPool[b % spellPool.length];
  questions.push(createQ({
    topic: "বানান শুদ্ধি ও প্রমিত বাংলা বানান",
    subtopic: "শুদ্ধ বানান নির্বাচন",
    question_bn: `নিচের কোন বিকল্পটিতে '${sp.word}' শব্দের শুদ্ধ প্রমিত বানান প্রদর্শিত হয়েছে? [বানান শুদ্ধি-${b}.২০]`,
    question_en: `Which of the following options displays the correct standardized Bengali spelling for '${sp.word}'? [Spelling-${b}.20]`,
    options: {
      A: sp.word,
      B: sp.w1,
      C: sp.w2,
      D: sp.w3
    },
    correct_option: "A",
    explanation_bn: `প্রমিত বানান হলো '${sp.word}'। ${sp.exp}`,
    explanation_en: `The standardized orthography is '${sp.word}'. ${sp.exp}`,
    question_type: "grammar"
  }));

  // --- PART 2: BANGLA LITERATURE (25 Questions) ---

  // 21. Charyapada: Discovery & Haraprasad Shastri
  questions.push(createQ({
    topic: "প্রাচীন যুগ — চর্যাপদ",
    subtopic: "চর্যাপদের আবিষ্কার ও প্রকাশনা",
    question_bn: `মহামহোপাধ্যায় হরপ্রসাদ শাস্ত্রী কত সালে নেপালের রাজদরবারের রয়েল লাইব্রেরি থেকে চর্যাপদের মূল পুথিটি আবিষ্কার করেন? [চর্যাপদ-${b}.২১]`,
    question_en: `In which year did Mahamahopadhyaya Haraprasad Shastri discover the original Charyapada manuscript from the Royal Court of Nepal? [Charyapada-${b}.21]`,
    options: {
      A: "১৯০৭ খ্রিস্টাব্দে",
      B: "১৯১৬ খ্রিস্টাব্দে",
      C: "১৯২০ খ্রিস্টাব্দে",
      D: "১৮৯৭ খ্রিস্টাব্দে"
    },
    correct_option: "A",
    explanation_bn: "হরপ্রসাদ শাস্ত্রী ১৯০৭ সালে নেপালের রয়েল লাইব্রেরি থেকে চর্যাপদ আবিষ্কার করেন এবং ১৯১৬ সালে বঙ্গীয় সাহিত্য পরিষদ থেকে তা প্রকাশ করেন।",
    explanation_en: "Haraprasad Shastri discovered the Charyapada palm-leaf manuscript in 1907 in Nepal."
  }));

  // 22. Charyapada: Poets & Padas
  questions.push(createQ({
    topic: "প্রাচীন যুগ — চর্যাপদ",
    subtopic: "চর্যাপদের পদসংখ্যা ও আদি পদকর্তা",
    question_bn: `চর্যাপদের আদি বা প্রথম পদকর্তা কে ছিলেন এবং এতে মোট কতটি পদ আবিষ্কৃত হয়েছিল? [চর্যাপদ-${b}.২২]`,
    question_en: `Who was the first poet (Adi Kavi) of Charyapada, and how many padas were discovered in the original manuscript? [Charyapada-${b}.22]`,
    options: {
      A: "আদি পদকর্তা লুইপা; মোট সাড়ে ৪৬টি পদ আবিষ্কৃত হয়",
      B: "আদি পদকর্তা কাহ্নপা; মোট ৫০টি পদ",
      C: "আদি পদকর্তা ভূসুকুপা; মোট ২৪টি পদ",
      D: "আদি পদকর্তা শবরপা; মোট ৪৭টি পদ"
    },
    correct_option: "A",
    explanation_bn: "চর্যাপদের প্রথম পদ 'কাআ তরুবর পাঞ্চ বি ডাল' লুইপা রচিত। মোট ৫০টি পদের মধ্যে সাড়ে ৪৬টি পদ পাওয়া গেছে।",
    explanation_en: "Luipa authored the opening pada; 46.5 padas out of 50 were recovered from the Nepalese manuscript."
  }));

  // 23. Charyapada: Language & Sandhya Bhasha
  questions.push(createQ({
    topic: "প্রাচীন যুগ — চর্যাপদ",
    subtopic: "চর্যাপদের ভাষা ও সান্ধ্য ভাষা",
    question_bn: `চর্যাপদের দুর্বোধ্য রূপক ও আধ্যাত্মিক সাধনার ভাষাকে হরপ্রসাদ শাস্ত্রী কী ভাষা হিসেবে আখ্যায়িত করেছেন? [চর্যাপদ-${b}.২৩]`,
    question_en: `What enigmatic linguistic style did Haraprasad Shastri identify as the language of Charyapada? [Charyapada-${b}.23]`,
    options: {
      A: "আলো-আঁধারি বা সান্ধ্য ভাষা (Sandhya Bhasha)",
      B: "ব্রজবুলি ভাষা",
      C: "মাগধী অপভ্রংশ",
      D: "সংস্কৃত ভাষা"
    },
    correct_option: "A",
    explanation_bn: "চর্যার ভাষা কিছুটা বোঝা যায়, কিছুটা বোঝা যায় না বিধায় হরপ্রসাদ শাস্ত্রী একে আলো-আঁধারি বা 'সান্ধ্য ভাষা' বলেন। সুনীতি কুমার চট্টোপাধ্যায় এর বাংলা রূপ প্রমাণ করেন।",
    explanation_en: "Haraprasad Shastri designated the mystical allegorical language of Charyapada as 'Sandhya Bhasha' (twilight language)."
  }));

  // 24. Srikrishnakirtana: Badu Chandidas
  questions.push(createQ({
    topic: "মধ্যযুগ — শ্রীকৃষ্ণকীর্তন কাব্য",
    subtopic: "আবিষ্কার ও রচয়িতা বড়ু চণ্ডীদাস",
    question_bn: `বসন্তরঞ্জন রায় বিদ্বদ্বল্লভ ১৯০৯ সালে বাঁকুড়ার কাঁকিল্যা গ্রামের গোয়ালঘরের মাচা থেকে মধ্যযুগের কোন বিখ্যাত আখ্যানকাব্যটি আবিষ্কার করেন? [শ্রীকৃষ্ণকীর্তন-${b}.২৪]`,
    question_en: `Which famous medieval narrative kavya was discovered in 1909 by Basanta Ranjan Ray Vidvadvallabh from a cattle shed in Bankura? [Srikrishnakirtana-${b}.24]`,
    options: {
      A: "শ্রীকৃষ্ণকীর্তন কাব্য (রচয়িতা: বড়ু চণ্ডীদাস)",
      B: "পদ্মাবতী কাব্য (আলাওল)",
      C: "মনসামঙ্গল কাব্য (বিজয়গুপ্ত)",
      D: "চৈতন্যভাগবত"
    },
    correct_option: "A",
    explanation_bn: "বড়ু চণ্ডীদাস রচিত শ্রীকৃষ্ণকীর্তন হলো মধ্যযুগের প্রথম এবং একমাত্র একক কবির রচিত প্রামাণ্য কাব্য যা ১৯১৬ সালে প্রকাশিত হয়।",
    explanation_en: "Srikrishnakirtana, composed by Badu Chandidas, was discovered in 1909 and published in 1916."
  }));

  // 25. Srikrishnakirtana: Characters & Khandas
  questions.push(createQ({
    topic: "মধ্যযুগ — শ্রীকৃষ্ণকীর্তন কাব্য",
    subtopic: "শ্রীকৃষ্ণকীর্তনের চরিত্র ও খণ্ডসমূহ",
    question_bn: `শ্রীকৃষ্ণকীর্তন কাব্যে কৃষ্ণ ও রাধার প্রেমলীলার মধ্যস্থতাকারী দূতী চরিত্রের নাম কী? [শ্রীকৃষ্ণকীর্তন-${b}.২৫]`,
    question_en: `What is the name of the intermediary messenger character who mediates between Radha and Krishna in Srikrishnakirtana? [Srikrishnakirtana-${b}.25]`,
    options: {
      A: "বড়াই (Barai)",
      B: "ললিতা",
      C: "বিশাখা",
      D: "মঞ্জরী"
    },
    correct_option: "A",
    explanation_bn: "শ্রীকৃষ্ণকীর্তন কাব্যের তিনটি প্রধান চরিত্র হলো কৃষ্ণ, রাধা এবং বৃদ্ধা দূতী বড়াই। কাব্যটিতে মোট ১৩টি খণ্ড রয়েছে।",
    explanation_en: "Barai is the old messenger woman who acts as a go-between for Krishna and Radha across 13 khandas."
  }));

  // 26. Vaishnava Padavali: Vidyapati & Brajabuli
  questions.push(createQ({
    topic: "মধ্যযুগ — বৈষ্ণব পদাবলী",
    subtopic: "বিদ্যাপতি ও ব্রজবুলি ভাষা",
    question_bn: `বাঙালি না হয়েও বৈষ্ণব পদাবলীতে 'মৈথিল কোকিল' খ্যাত কোন কবি মধুর কৃত্রিম 'ব্রজবুলি' ভাষায় অসংখ্য রাধাকৃষ্ণ বিষয়ক পদ রচনা করেন? [বৈষ্ণব পদাবলী-${b}.২৬]`,
    question_en: `Which non-Bengali poet, revered as 'Maithili Kokil', composed exquisite Vaishnava padas in the artificial Brajabuli dialect? [Vaishnava-${b}.26]`,
    options: {
      A: "বিদ্যাপতি (Vidyapati)",
      B: "জয়দেব",
      C: "গোবিন্দদাস",
      D: "জ্ঞানদাস"
    },
    correct_option: "A",
    explanation_bn: "মিথিলার কবি বিদ্যাপতি বাংলা ও মৈথিলির মিশ্রণে গঠিত ব্রজবুলি ভাষায় পদ লিখে পদাবলীর শ্রেষ্ঠ কবিদের অন্যতম হিসেবে মর্যাদা পান।",
    explanation_en: "Vidyapati of Mithila composed extensively in Brajabuli, earning the moniker 'Maithil Kokil'."
  }));

  // 27. Vaishnava Padavali: Chandidas vs Jnandas
  questions.push(createQ({
    topic: "মধ্যযুগ — বৈষ্ণব পদাবলী",
    subtopic: "চণ্ডীদাস ও অমর মানবিক শ্লোক",
    question_bn: `'সবার উপরে মানুষ সত্য তাহার উপরে নাই' — মধ্যযুগের বৈষ্ণব পদাবলীতে এই অমর মানবতাবাদী বাণী কার রচনা? [বৈষ্ণব পদাবলী-${b}.২৭]`,
    question_en: `'Above all is humanity, none above that' — which medieval Vaishnava poet penned this timeless humanist assertion? [Vaishnava-${b}.27]`,
    options: {
      A: "দ্বিজ চণ্ডীদাস",
      B: "বিদ্যাপতি",
      C: "জ্ঞানদাস",
      D: "বলরাম দাস"
    },
    correct_option: "A",
    explanation_bn: "দ্বিজ চণ্ডীদাস মধ্যযুগের ধর্মীয় কাঠামোর ঊর্ধ্বে উঠে মানুষের শ্রেষ্ঠত্ব ঘোষণা করে অমর শ্লোকটি রচনা করেন।",
    explanation_en: "Dvija Chandidas proclaimed the supreme dignity of humanity above all religious dogma."
  }));

  // 28. Mangalkavya: Manasamangal & Chandimangal
  questions.push(createQ({
    topic: "মধ্যযুগ — মঙ্গলকাব্য ধারা",
    subtopic: "চণ্ডীমঙ্গলের শ্রেষ্ঠ কবি মুকুন্দরাম চক্রবর্তী",
    question_bn: `মধ্যযুগের বাস্তববাদী সমাজচিত্রের রূপকার হিসেবে কোন চণ্ডীমঙ্গল রচয়িতাকে 'কবিকঙ্কণ' উপাধিতে ভূষিত করা হয়? [মঙ্গলকাব্য-${b}.২৮]`,
    question_en: `Which Chandi Mangal poet, celebrated for his vivid portrayal of 16th-century Bengali social life, was titled 'Kavikankan'? [Mangalkavya-${b}.28]`,
    options: {
      A: "মুকুন্দরাম চক্রবর্তী",
      B: "বিজয়গুপ্ত",
      C: "কানাহরি দত্ত",
      D: "ভারতচন্দ্র রায়"
    },
    correct_option: "A",
    explanation_bn: "মুকুন্দরাম চক্রবর্তীকে তাঁর অসাধারণ কবিত্ব ও সমাজচিত্রাঙ্কনের জন্য মেদিনীপুরের রাজা রঘুনাথ রায় 'কবিকঙ্কণ' উপাধি দেন।",
    explanation_en: "Mukundaram Chakrabarti earned the honorific title 'Kavikankan' for his realistic social narrative in Chandimangal."
  }));

  // 29. Mangalkavya: Annadamangal & Bharatchandra
  questions.push(createQ({
    topic: "মধ্যযুগ — অন্নদামঙ্গল কাব্য",
    subtopic: "ভারতচন্দ্র রায়গুণাকর ও মধ্যযুগের সমাপ্তি",
    question_bn: `মধ্যযুগের সর্বশেষ বিশিষ্ট কবি ভারতচন্দ্র রায়গুণাকর রচিত 'অন্নদামঙ্গল' কাব্যটি কত সালে সমাপ্ত হয়? [মঙ্গলকাব্য-${b}.২৯]`,
    question_en: `In which year did Bharatchandra Raygunakar, the last great medieval poet, complete his famous masterpiece 'Annadamangal'? [Mangalkavya-${b}.29]`,
    options: {
      A: "১৭৫২ খ্রিস্টাব্দে",
      B: "১৭৬০ খ্রিস্টাব্দে",
      C: "১৭৫৭ খ্রিস্টাব্দে",
      D: "১৭০০ খ্রিস্টাব্দে"
    },
    correct_option: "A",
    explanation_bn: "নদীয়ার রাজা কৃষ্ণচন্দ্রের পৃষ্ঠপোষকতায় ভারতচন্দ্র ১৭৫২ সালে অন্নদামঙ্গল রচনা করেন। ১৭৬০ সালে তাঁর মৃত্যুর সাথে মধ্যযুগের পরিসমাপ্তি ঘটে।",
    explanation_en: "Bharatchandra completed 'Annadamangal' in 1752; his demise in 1760 marks the conclusion of the medieval period."
  }));

  // 30. Medieval Romantic Literature: Alaol's Padmavati
  questions.push(createQ({
    topic: "মধ্যযুগ — মুসলিম সাহিত্য ও অনুবাদ",
    subtopic: "আলাওলের পদ্মাবতী ও রোসাঙ্গ রাজদরবার",
    question_bn: `আরাকান বা রোসাঙ্গ রাজদরবারের অমাত্য মাগন ঠাকুরের নির্দেশে মহাকবি আলাওল মালিক মুহম্মদ জায়সীর কোন কাব্য অবলম্বনে 'পদ্মাবতী' (১৬৪৮) রচনা করেন? [মধ্যযুগীয় অনুবাদ-${b}.৩০]`,
    question_en: `Based on Malik Muhammad Jayasi's Hindi work, Alaol composed 'Padmavati' (1648) under the patronage of Magan Thakur. What was Jayasi's original work? [Medieval Translation-${b}.30]`,
    options: {
      A: "পদুমাবৎ (Padmavat)",
      B: "মধুমালতী",
      C: "মৃগাবতী",
      D: "চন্দ্রাবতী"
    },
    correct_option: "A",
    explanation_bn: "জায়সীর হিন্দি 'পদুমাবৎ' অবলম্বনে আলাওল পাণ্ডিত্যপূর্ণ ও সংগীতময় অনুবাদ করে বাংলা সাহিত্যে রত্নস্বরূপ পদ্মাবতী কাব্য সৃষ্টি করেন।",
    explanation_en: "Alaol adapted Jayasi's Hindi poem 'Padmavat' into the masterly Bengali romance 'Padmavati' in 1648."
  }));

  // 31. Shah Muhammad Saghir: Yusuf-Zuleikha
  questions.push(createQ({
    topic: "মধ্যযুগ — প্রণয়োপাখ্যান",
    subtopic: "শাহ মুহম্মদ সগীর ও ইউসুফ-জুলেখা",
    question_bn: `বাঙালি মুসলিম কবিদের মধ্যে প্রাচীনতম কবি শাহ মুহম্মদ সগীর গৌড়ের কোন সুলতানের আমলে প্রথম 'ইউসুফ-জুলেখা' কাব্য রচনা করেন? [মধ্যযুগ-${b}.৩১]`,
    question_en: `During the reign of which Sultan of Gauda did Shah Muhammad Saghir, the earliest Bengali Muslim poet, compose 'Yusuf-Zulaikha'? [Medieval-${b}.31]`,
    options: {
      A: "সুলতান গিয়াসউদ্দীন আজম শাহ (১৩৮৯-১৪১০)",
      B: "শামসুদ্দীন ইলিয়াস শাহ",
      C: "আলাউদ্দীন হোসেন শাহ",
      D: "ফখরুদ্দীন মুবারক শাহ"
    },
    correct_option: "A",
    explanation_bn: "গিয়াসউদ্দীন আজম শাহের রাজত্বকালে শাহ মুহম্মদ সগীর পবিত্র কোরআনের ইউসুফ-জুলেখার কাহিনী অবলম্বনে বাংলা ভাষায় প্রথম প্রণয়োপাখ্যান রচনা করেন।",
    explanation_en: "Shah Muhammad Saghir authored the first romantic narrative poem in Bengali under Sultan Ghiyasuddin Azam Shah."
  }));

  // 32. Fort William College & Carey
  questions.push(createQ({
    topic: "আধুনিক বাংলা গদ্যের উন্মেষ",
    subtopic: "ফোর্ট উইলিয়াম কলেজ ও বাংলা বিভাগ (১৮০১)",
    question_bn: `১৮০০ সালে প্রতিষ্ঠিত ফোর্ট উইলিয়াম কলেজের বাংলা বিভাগের প্রধান কে ছিলেন এবং ১৮০১ সালে প্রথম বাংলা পাঠ্যপুস্তক 'প্রতাপাদিত্য চরিত্র' কে রচনা করেন? [বাংলা গদ্যের সূচনা-${b}.৩২]`,
    question_en: `Who headed the Bengali department at Fort William College, and who authored the first Bengali prose textbook 'Pratapaditya Charitra' (1801)? [Bengali Prose-${b}.32]`,
    options: {
      A: "বিভাগীয় প্রধান: উইলিয়াম কেরি; লেখক: রামরাম বসু",
      B: "বিভাগীয় প্রধান: মৃত্যুঞ্জয় বিদ্যালঙ্কার; লেখক: কেরি",
      C: "বিভাগীয় প্রধান: ডেভিড হেয়ার; লেখক: ঈশ্বরচন্দ্র",
      D: "বিভাগীয় প্রধান: রাজা রামমোহন রায়; লেখক: তারাশঙ্কর"
    },
    correct_option: "A",
    explanation_bn: "উইলিয়াম কেরি বাংলা বিভাগের প্রধান ছিলেন এবং তাঁর অধীনে পণ্ডিত রামরাম বসু ১৮০১ সালে ফোর্ট উইলিয়াম কলেজের জন্য প্রথম মুদ্রিত গদ্যগ্রন্থ 'প্রতাপাদিত্য চরিত্র' লেখেন।",
    explanation_en: "Reverend William Carey headed the department, while Ramram Basu authored 'Pratapaditya Charitra' in 1801."
  }));

  // 33. Ishwar Chandra Vidyasagar: Father of Bengali Prose
  questions.push(createQ({
    topic: "আধুনিক বাংলা সাহিত্য — ঈশ্বরচন্দ্র বিদ্যাসাগর",
    subtopic: "যতিচিহ্নের সার্থক প্রয়োগ ও বর্ণপরিচয়",
    question_bn: `বাংলা গদ্যে সর্বপ্রথম আধুনিক যতিচিহ্ন বা বিরামচিহ্নের সফল প্রয়োগ ঘটিয়ে 'বাংলা গদ্যের জনক' হিসেবে স্বীকৃতি পান কে? [আধুনিক গদ্য-${b}.৩৩]`,
    question_en: `Who earned the title 'Father of Bengali Prose' by successfully introducing modern punctuation marks in Bengali literature? [Bengali Prose-${b}.33]`,
    options: {
      A: "ঈশ্বরচন্দ্র বিদ্যাসাগর (১৮৪৭ সালে 'বেতাল পঞ্চবিংশতি'-তে)",
      B: "বঙ্কিমচন্দ্র চট্টোপাধ্যায়",
      C: "মাইকেল মধুসূদন দত্ত",
      D: "রাজা রামমোহন রায়"
    },
    correct_option: "A",
    explanation_bn: "বিদ্যাসাগর ১৮৪৭ সালে 'বেতাল পঞ্চবিংশতি' গ্রন্থে সর্বপ্রথম দাড়ি, কমা, সেমিকোলন ইত্যাদি যতিচিহ্নের ছন্দময় প্রয়োগ করে বাংলা গদ্যকে প্রাঞ্জল রূপ দেন।",
    explanation_en: "Ishwar Chandra Vidyasagar revolutionized Bengali prose by integrating standardized European punctuation marks in 1847."
  }));

  // 34. Michael Madhusudan Dutt: Blank Verse & Epic
  questions.push(createQ({
    topic: "আধুনিক বাংলা কবিতা — মাইকেল মধুসূদন দত্ত",
    subtopic: "অমিত্রাক্ষর ছন্দ ও মেঘনাদবধ কাব্য (১৮৬১)",
    question_bn: `বাংলা সাহিত্যের সর্বপ্রথম সার্থক মহাকাব্য 'মেঘনাদবধ কাব্য' (১৮৬১) কোন ছন্দে রচিত এবং এর সর্গ সংখ্যা কতটি? [মধুসূদন সাহিত্য-${b}.৩৪]`,
    question_en: `In which poetic meter is Michael Madhusudan Dutt's epic 'Meghnadbadh Kavya' (1861) composed, and how many cantos (sargas) does it contain? [Madhusudan-${b}.34]`,
    options: {
      A: "অমিত্রাক্ষর ছন্দ (Blank Verse); মোট ৯টি সর্গ",
      B: "মাত্রাবৃত্ত ছন্দ; মোট ৭টি সর্গ",
      C: "অক্ষরবৃত্ত পয়ার ছন্দ; মোট ১২টি সর্গ",
      D: "স্বরবৃত্ত ছন্দ; মোট ১০টি সর্গ"
    },
    correct_option: "A",
    explanation_bn: "রামায়ণের কাহিনীকে উল্টে দিয়ে মেঘনাদকে দেশপ্রেমিক বীর হিসেবে চিত্রিত করে অমিত্রাক্ষর ছন্দে ১৮৬১ সালে ৯টি সর্গে এই মহাকাব্য রচিত হয়।",
    explanation_en: "'Meghnadbadh Kavya' (1861) is composed in 9 cantos using unrhymed 14-syllable blank verse (Amitrakshar Chhanda)."
  }));

  // 35. Michael Madhusudan Dutt: First Sonnet & Plays
  questions.push(createQ({
    topic: "আধুনিক বাংলা নাটক ও সনেট",
    subtopic: "মধুসূদনের 'শর্মিষ্ঠা' ও চতুর্দশপদী কবিতাবলী",
    question_bn: `বাংলা সাহিত্যের প্রথম সার্থক মৌলিক নাটক কোনটি এবং বাংলা সনেটের প্রবর্তক কে? [মধুসূদন সাহিত্য-${b}.৩৫]`,
    question_en: `Which is the first successful original drama in Bengali, and who pioneered the sonnet form in Bengali literature? [Madhusudan-${b}.35]`,
    options: {
      A: "নাটক: শর্মিষ্ঠা (১৮৫৯); সনেটের প্রবর্তক: মাইকেল মধুসূদন দত্ত",
      B: "নাটক: নীল দর্পণ; সনেটের প্রবর্তক: দীনবন্ধু মিত্র",
      C: "নাটক: ভদ্রার্জুন; সনেটের প্রবর্তক: গিরিশচন্দ্র ঘোষ",
      D: "নাটক: কৃষ্ণকুমারী; সনেটের প্রবর্তক: রবীন্দ্রনাথ ঠাকুর"
    },
    correct_option: "A",
    explanation_bn: "১৮৫৯ সালে মধুসূদনের 'শর্মিষ্ঠা' প্রথম সার্থক মৌলিক নাটক এবং ১৮৬৬ সালে ফ্রান্সে অবস্থানকালে রচিত 'চতুর্দশপদী কবিতাবলী' প্রথম সনেট সংকলন।",
    explanation_en: "Madhusudan Dutt penned the first original play 'Sarmistha' (1859) and introduced the Italianate Petrarcan sonnet to Bengali."
  }));

  // 36. Bankim Chandra Chattopadhyay: First Novelist
  questions.push(createQ({
    topic: "আধুনিক বাংলা উপন্যাস — বঙ্কিমচন্দ্র চট্টোপাধ্যায়",
    subtopic: "দুর্গেশনন্দিনী ও আনন্দমঠ",
    question_bn: `১৮৬৫ সালে প্রকাশিত বাংলা সাহিত্যের সর্বপ্রথম সার্থক রোমান্টিক উপন্যাস 'দুর্গেশনন্দিনী'-র রচয়িতা কে? [বঙ্কিম সাহিত্য-${b}.৩৬]`,
    question_en: `Who authored 'Durgeshnandini' (1865), acclaimed as the first successful artistic novel in Bengali literature? [Bankim-${b}.36]`,
    options: {
      A: "বঙ্কিমচন্দ্র চট্টোপাধ্যায় (সাহিত্য সম্রাট)",
      B: "প্যারীচাঁদ মিত্র",
      C: "মীর মশাররফ হোসেন",
      D: "রমেশচন্দ্র দত্ত"
    },
    correct_option: "A",
    explanation_bn: "বঙ্কিমচন্দ্র ১৮৬৫ সালে 'দুর্গেশনন্দিনী' রচনার মাধ্যমে বাংলা উপন্যাসের স্বর্ণযুগের সূচনা করেন। ১৮৮২ সালে তাঁর 'আনন্দমঠ' উপন্যাসেই 'বন্দে মাতরম' গানটি স্থান পায়।",
    explanation_en: "Bankim Chandra Chattopadhyay inaugurated modern Bengali fiction with 'Durgeshnandini' in 1865."
  }));

  // 37. Mir Mosharraf Hossain: Bishad Shindhu
  questions.push(createQ({
    topic: "আধুনিক যুগ — মীর মশাররফ হোসেন",
    subtopic: "বিষাদ-সিন্ধু ও জমিদার দর্পণ",
    question_bn: `কারবালার বিয়োগান্তক ঐতিহাসিক ঘটনা অবলম্বনে তিন খণ্ডে (মহরম, উদ্ধার ও এজিদ বধ) রচিত 'বিষাদ-সিন্ধু' (১৮৮৫-১৮৯১)-এর অমর স্রষ্টা কে? [মীর মশাররফ-${b}.৩৭]`,
    question_en: `Who authored the monumental three-part historical tragic prose epic 'Bishad Shindhu' (1885–1891) on the tragedy of Karbala? [Mir Mosharraf-${b}.37]`,
    options: {
      A: "মীর মশাররফ হোসেন",
      B: "কায়কোবাদ",
      C: "মোজাম্মেল হক",
      D: "মুন্সী মেহেরুল্লাহ"
    },
    correct_option: "A",
    explanation_bn: "মীর মশাররফ হোসেন রচিত 'বিষাদ-সিন্ধু' ঊনবিংশ শতাব্দীর মুসলিম রচিত সর্বশ্রেষ্ঠ মহাকাব্যিক গদ্য আখ্যান হিসেবে গণ্য।",
    explanation_en: "Mir Mosharraf Hossain authored 'Bishad Shindhu', the celebrated 19th-century prose narrative on Karbala."
  }));

  // 38. Rabindranath Tagore: Nobel Prize in Literature
  questions.push(createQ({
    topic: "রবীন্দ্র সাহিত্য — নোবেল বিজয়",
    subtopic: "গীতাঞ্জলি ও সং অফারিংস (১৯১৩)",
    question_bn: `রবীন্দ্রনাথ ঠাকুর কত সালে এবং কোন কাব্যগ্রন্থের ইংরেজি অনুবাদের ('Song Offerings') জন্য সাহিত্যে এশিয়ার প্রথম নোবেল পুরস্কার অর্জন করেন? [রবীন্দ্র সাহিত্য-${b}.৩৮]`,
    question_en: `In which year and for the English translation of which poetry collection ('Song Offerings') did Rabindranath Tagore win the Nobel Prize in Literature? [Tagore-${b}.38]`,
    options: {
      A: "১৯১৩ সালে; 'গীতাঞ্জলি' (Gitanjali: Song Offerings)",
      B: "১৯১২ সালে; 'সোনার তরী'",
      C: "১৯১৫ সালে; 'বলাকা'",
      D: "১৯১১ সালে; 'চিত্রা'"
    },
    correct_option: "A",
    explanation_bn: "১৯১২ সালে ডব্লিউ বি ইয়েটসের ভূমিকাসহ প্রকাশিত গীতাঞ্জলির অনুবাদ 'Song Offerings'-এর জন্য রবীন্দ্রনাথ ১৯১৩ সালের নভেম্বরে সাহিত্যে নোবেল পান।",
    explanation_en: "Tagore won the Nobel Prize in Literature in 1913 for 'Gitanjali: Song Offerings', introduced by W.B. Yeats."
  }));

  // 39. Rabindranath Tagore: Novels & Characters
  const tagoreNovels = [
    { title: "গোরা (১৯১০)", chars: "গোরা, বিনয়, সুচরিতা ও ললিতা", theme: "ঔপনিবেশিক ভারতে জাতীয়তাবাদ, ধর্ম ও মানবতাবোধ" },
    { title: "চোখের বালি (১৯০৩)", chars: "বিনোদিনী, মহেন্দ্র, আশা ও বিহারী", theme: "বাস্তবধর্মী মনস্তাত্ত্বিক জটিলতা ও বিধবা সংকট" },
    { title: "শেষের কবিতা (১৯২৯)", chars: "অমিত রায়, লাবণ্য ও কেতকী", theme: "কাব্যিক রোমান্টিক উপন্যাস ও আধুনিক প্রেম দর্শন" },
    { title: "ঘরে বাইরে (১৯১৬)", chars: "নিখিলেশ, বিমলা ও সন্দীপ", theme: "স্বদেশী আন্দোলন ও সন্ত্রাসবাদের নৈতিক সংঘাত" }
  ];
  const tn = tagoreNovels[b % tagoreNovels.length];
  questions.push(createQ({
    topic: "রবীন্দ্র সাহিত্য — উপন্যাস ও চরিত্র",
    subtopic: `${tn.title} উপন্যাসের চরিত্র ও প্রেক্ষাপট`,
    question_bn: `'${tn.chars}' চরিত্রগুলো রবীন্দ্রনাথ ঠাকুরের কোন কালজয়ী উপন্যাসের অন্তর্ভুক্ত? [রবীন্দ্র সাহিত্য-${b}.৩৯]`,
    question_en: `The characters '${tn.chars}' belong to which classic novel by Rabindranath Tagore? [Tagore Novels-${b}.39]`,
    options: {
      A: tn.title,
      B: "নৌকাডুবি",
      C: "চতুরঙ্গ",
      D: "যোগাযোগ"
    },
    correct_option: "A",
    explanation_bn: `এসব চরিত্র রবীন্দ্রনাথের বিখ্যাত উপন্যাস '${tn.title}'-এর। উপন্যাসের মূল ভাব: ${tn.theme}।`,
    explanation_en: `These characters define Tagore's celebrated work '${tn.title}'. Core theme: ${tn.theme}.`
  }));

  // 40. Rabindranath Tagore: Dramas & Short Stories
  questions.push(createQ({
    topic: "রবীন্দ্র সাহিত্য — নাটক ও ছোটগল্প",
    subtopic: "রক্তকরবী নাটক ও নন্দিনী চরিত্র",
    question_bn: `রবীন্দ্রনাথ ঠাকুরের রূপক-সাংকেতিক নাটক 'রক্তকরবী' (১৯২৬)-তে যান্ত্রিক পুঁজিবাদ ও শোষণের বিরুদ্ধে মানবীয় প্রেমের প্রতীক কোন চরিত্রটি? [রবীন্দ্র সাহিত্য-${b}.৪০]`,
    question_en: `In Rabindranath Tagore's symbolic drama 'Raktakarabi' (Red Oleanders, 1926), which character symbolizes pure love defying capitalist greed? [Tagore Drama-${b}.40]`,
    options: {
      A: "নন্দিনী (Nandini)",
      B: "বিশু পাগল",
      C: "রাজা",
      D: "রঞ্জন"
    },
    correct_option: "A",
    explanation_bn: "যক্ষপুরীর স্বর্ণখনি ও রাজার লোভের বিরুদ্ধে লাল রক্তকরবীর আভায় উজ্জ্বল নন্দিনী হলো শাশ্বত মানবতার চিরন্তন মুক্তিদূত।",
    explanation_en: "Nandini is the heroine of 'Raktakarabi' representing beauty and freedom against the oppressive King of Yakshapuri."
  }));

  // 41. Kazi Nazrul Islam: 'Bidrohi' Poem & Agnibeena
  questions.push(createQ({
    topic: "নজরুল সাহিত্য — বিদ্রোহী কবি",
    subtopic: "অগ্নিবীণা কাব্যগ্রন্থ (১৯২২) ও 'বিদ্রোহী' কবিতা",
    question_bn: `কাজী নজরুল ইসলামের যুগান্তকারী 'বিদ্রোহী' কবিতাটি ১৯২২ সালে প্রকাশিত তাঁর কোন প্রথম কাব্যগ্রন্থে দ্বিতীয় কবিতা হিসেবে স্থান পায়? [নজরুল সাহিত্য-${b}.৪১]`,
    question_en: `Kazi Nazrul Islam's epochal poem 'Bidrohi' was included in which debut poetry anthology published in 1922? [Nazrul-${b}.41]`,
    options: {
      A: "অগ্নিবীণা (১২টি কবিতার সংকলন)",
      B: "বিষের বাঁশী",
      C: "ভাঙার গান",
      D: "সর্বহারা"
    },
    correct_option: "A",
    explanation_bn: "১৯২২ সালে প্রকাশিত নজরুলের প্রথম কাব্য 'অগ্নিবীণা'য় 'প্রলয়োল্লাস' প্রথম এবং 'বিদ্রোহী' দ্বিতীয় কবিতা হিসেবে সংকলিত হয়। এতে মোট ১২টি কবিতা ছিল।",
    explanation_en: "'Bidrohi' was compiled in Nazrul's debut collection 'Agnibeena' (1922) which contained 12 fiery poems."
  }));

  // 42. Kazi Nazrul Islam: Journals (ধূমকেতু ও লাঙ্গল)
  questions.push(createQ({
    topic: "নজরুল সাহিত্য — সাংবাদিকতা ও সাময়িকী",
    subtopic: "'ধূমকেতু' ও 'লাঙ্গল' পত্রিকার সম্পাদনা",
    question_bn: `১৯২২ সালের ১১ই আগস্ট নজরুলের সম্পাদনায় প্রকাশিত কোন অর্ধ-সাপ্তাহিক পত্রিকায় 'আনন্দময়ীর আগমনে' কবিতা প্রকাশের কারণে তিনি কারারুদ্ধ হন? [নজরুল সাহিত্য-${b}.৪২]`,
    question_en: `For publishing the seditious poem 'Anandamoyir Agamone' in which bi-weekly journal edited by him in 1922 was Nazrul imprisoned? [Nazrul-${b}.42]`,
    options: {
      A: "ধূমকেতু (Dhumketu)",
      B: "লাঙ্গল (Langal)",
      C: "সওগাত",
      D: "দৈনিক নবযুগ"
    },
    correct_option: "A",
    explanation_bn: "ধূমকেতুর পূজা সংখ্যায় 'আনন্দময়ীর আগমনে' প্রকাশের জন্য ব্রিটিশ সরকার নজরুলকে এক বছরের সশ্রম কারাদণ্ড দেয় যেখানে তিনি 'রাজবন্দীর জবানবন্দী' রচনা করেন।",
    explanation_en: "Nazrul was convicted of sedition for his poem in 'Dhumketu' and delivered his defiant statement 'Rajbandir Jabanbandi'."
  }));

  // 43. Kazi Nazrul Islam: Epistolary Novel 'Bandhan Hara'
  questions.push(createQ({
    topic: "নজরুল সাহিত্য — উপন্যাস ও কথাসাহিত্য",
    subtopic: "বাঁধন-হারা (বাংলা সাহিত্যের প্রথম পত্রোপন্যাস)",
    question_bn: `মুসলিম সাহিত্যিক রচিত বাংলা সাহিত্যের সর্বপ্রথম সার্থক পত্রোপন্যাস 'বাঁধন-হারা' (১৯২৭)-র রচয়িতা কে? [নজরুল সাহিত্য-${b}.৪৩]`,
    question_en: `Who authored 'Bandhan Hara' (1927), the celebrated first epistolary novel in modern Bengali literature? [Nazrul-${b}.43]`,
    options: {
      A: "কাজী নজরুল ইসলাম",
      B: "আবুল মনসুর আহমদ",
      C: "কাজী আবদুল ওদুদ",
      D: "মোহাম্মদ নজিবর রহমান"
    },
    correct_option: "A",
    explanation_bn: "নুরু, আনসারি ও রাবেয়ার পত্র বিনিময়ের মাধ্যমে রচিত 'বাঁধন-হারা' নজরুলের প্রথম প্রকাশিত উপন্যাস এবং বাংলা সাহিত্যের প্রথম পত্রোপন্যাস।",
    explanation_en: "Nazrul's 'Bandhan Hara' (1927) is Bengali literature's foremost epistolary novel composed entirely of letters."
  }));

  // 44. Jibanananda Das: Rupashi Bangla & Banalata Sen
  questions.push(createQ({
    topic: "আধুনিক বাংলা কবিতা — জীবনানন্দ দাশ",
    subtopic: "রূপসী বাংলা ও বনলতা সেন",
    question_bn: `'হাজার বছর ধরে আমি পথ হাঁটিতেছি পৃথিবীর পথে' — জীবনানন্দ দাশের এই অমর চরণটি কোন বিখ্যাত কবিতার সূচনা পঙ্‌ক্তি? [আধুনিক কবিতা-${b}.৪৪]`,
    question_en: `'For a thousand years I have walked the paths of the earth' — this iconic opening line is from which famous poem by Jibanananda Das? [Modern Poetry-${b}.44]`,
    options: {
      A: "বনলতা সেন (১৯৪২)",
      B: "আকাশলীনা",
      C: "অদ্ভুত আঁধার এক",
      D: "বোধ"
    },
    correct_option: "A",
    explanation_bn: "সিংহল সমুদ্র থেকে মালয় সাগর ঘুরে নাটোরের বনলতা সেনের রূপক শান্তি খোঁজার এই কবিতাটি বাংলা আধুনিক গীতিকবিতার শ্রেষ্ঠ নিদর্শন।",
    explanation_en: "This immortal opening line belongs to 'Banalata Sen' (1942), the supreme modernist lyric poem."
  }));

  // 45. Jasimuddin: Polli Kobi & Nokshi Kanthar Math
  questions.push(createQ({
    topic: "পল্লীকবি জসীমউদ্দীন ও আখ্যানকাব্য",
    subtopic: "নকশী কাঁথার মাঠ ও সোজন বাদিয়ার ঘাট",
    question_bn: `পল্লীকবি জসীমউদ্দীন রচিত রূপাই ও সাজুর অমর বিরহগাথা সম্বলিত কোন আখ্যানকাব্যটি ই. এম. মিলফোর্ড কর্তৃক 'The Field of the Embroidered Quilt' নামে অনূদিত হয়? [পল্লী সাহিত্য-${b}.৪৫]`,
    question_en: `Which narrative verse masterpiece by Jasimuddin detailing the tragic love of Rupai and Saju was translated into English as 'The Field of the Embroidered Quilt'? [Folk Literature-${b}.45]`,
    options: {
      A: "নকশী কাঁথার মাঠ (১৯২৯)",
      B: "সোজন বাদিয়ার ঘাট",
      C: "রাখালী",
      D: "বালুচর"
    },
    correct_option: "A",
    explanation_bn: "১৯২৯ সালে প্রকাশিত নকশী কাঁথার মাঠ গ্রামীণ বাংলার লোকায়ত বিরহের অসাধারণ মহাকাব্যিক আখ্যান যা আন্তর্জাতিক খ্যাতি অর্জন করে।",
    explanation_en: "Jasimuddin's 'Nokshi Kanthar Math' (1929) was translated by E. M. Milford as 'The Field of the Embroidered Quilt'."
  }));

  return questions.slice(0, count);
}
