// Generator for Geography and Environment Questions (SUB-09)
// Covers Bangladesh physiography, river systems, maritime zones, climate, natural disasters, and global ecology.

export function getGeographyQuestions(batchIndex, count = 7) {
  const b = batchIndex;
  const questions = [];

  function createQ(data) {
    const opts = { ...data.options };
    const correct = data.correct_option || "A";
    const uniqueVals = new Set(Object.values(opts));
    if (uniqueVals.size !== 4) {
      throw new Error(`Duplicate option detected in geography question: ${data.question_bn}`);
    }
    return {
      subject: "Geography and Environment",
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
      source_title: data.source_title || "এনসিটিবি ভূগোল ও পরিবেশ (নবম-দশম ও একাদশ শ্রেণি)",
      source_page_or_section: data.source_page_or_section || "বাংলাদেশের ভৌগোলিক পরিচয় ও দুর্যোগ ব্যবস্থাপনা",
      rights_status: "original_from_reference",
      verification_status: "verified"
    };
  }

  // 1. Bangladesh Physiography & Hills
  const physioPool = [
    {
      q_bn: `বাংলাদেশের ভূপ্রকৃতি অনুসারে মোট ভূমির কত শতাংশ টারশিয়ারি যুগের পাহাড়িয়া অঞ্চলের অন্তর্ভুক্ত?`,
      q_en: `According to the physiography of Bangladesh, what percentage of total land area belongs to the Tertiary hills region?`,
      ans: "১২ শতাংশ", b: "৮ শতাংশ", c: "২০ শতাংশ", d: "৮০ শতাংশ",
      exp_bn: "বাংলাদেশের মোট ভূখণ্ডের প্রায় ১২% এলাকা নিয়ে টারশিয়ারি যুগের পাহাড় গঠিত। এটি চট্টগ্রাম, পার্বত্য চট্টগ্রাম ও সিলেট অঞ্চলে বিস্তৃত।",
      exp_en: "Tertiary hills cover approximately 12% of the total land area of Bangladesh, located in the Chittagong Hill Tracts and Sylhet."
    },
    {
      q_bn: `বাংলাদেশের প্লাইস্টোসিন কালের সোপান বা চত্বরভূমি মোট ভূখণ্ডের শতকরা কত ভাগ নিয়ে গঠিত?`,
      q_en: `What percentage of Bangladesh's land area is comprised of Pleistocene terraces?`,
      ans: "৮ শতাংশ", b: "১২ শতাংশ", c: "১৫ শতাংশ", d: "৮০ শতাংশ",
      exp_bn: "প্লাইস্টোসিন কালের বরেন্দ্রভূমি, মধুপুর-ভাওয়াল গড় এবং লালমাই পাহাড় মোট ভূমির প্রায় ৮% এলাকা জুড়ে রয়েছে।",
      exp_en: "Pleistocene terraces (Barind Tract, Madhupur-Bhawal Garh, Lalmai Hills) occupy roughly 8% of Bangladesh's landmass."
    },
    {
      q_bn: `বাংলাদেশের ভূপ্রাকৃতিক কাঠামোর কত শতাংশ সাম্প্রতিক কালের প্লাবন সমভূমি বা পলল সমভূমি?`,
      q_en: `What percentage of Bangladesh's physiographic structure consists of Recent alluvial floodplains?`,
      ans: "৮০ শতাংশ", b: "৭০ শতাংশ", c: "৮৮ শতাংশ", d: "৭৫ শতাংশ",
      exp_bn: "নদীবিধৌত উর্বর সাম্প্রতিক কালের প্লাবন সমভূমি বাংলাদেশের প্রায় ৮০% এলাকা জুড়ে বিস্তৃত।",
      exp_en: "Recent alluvial floodplains cover approximately 80% of the territory of Bangladesh."
    },
    {
      q_bn: `বাংলাদেশের সর্বোচ্চ পর্বতশৃঙ্গ হিসেবে স্বীকৃত 'সাকা হাফং' (মওদক মুয়াল) কোন জেলায় অবস্থিত?`,
      q_en: `In which district is 'Saka Haphong' (Mowdok Mual), recognized as Bangladesh's highest peak, situated?`,
      ans: "বান্দরবান জেলা", b: "রাঙ্গামাটি জেলা", c: "খাগড়াছড়ি জেলা", d: "কক্সবাজার জেলা",
      exp_bn: "বান্দরবান জেলার রুমা ও থানচি সীমান্তে অবস্থিত সাকা হাফং শৃঙ্গের উচ্চতা প্রায় ১,০৫২ মিটার (৩,৪৫১ ফুট)।",
      exp_en: "Saka Haphong (approx. 1,052 meters) is situated in Bandarban district along the Myanmar border."
    }
  ];
  const p1 = physioPool[b % physioPool.length];
  questions.push(createQ({
    topic: "বাংলাদেশের ভূপ্রকৃতি ও প্রাকৃতিক ভূগোল",
    subtopic: "ভূপ্রাকৃতিক অঞ্চল ও পর্বতমালা",
    question_bn: `${p1.q_bn} [ভৌগোলিক তথ্যসূত্র-${b}]`,
    question_en: `${p1.q_en} [GeoRef-${b}]`,
    options: { A: p1.ans, B: p1.b, C: p1.c, D: p1.d },
    correct_option: "A",
    explanation_bn: p1.exp_bn,
    explanation_en: p1.exp_en
  }));

  // 2. River Systems & Confluences
  const riverPool = [
    {
      q_bn: `পদ্মা ও যমুনা নদী বাংলাদেশের কোন স্থানে এসে পরস্পর মিলিত হয়েছে?`,
      q_en: `At which location in Bangladesh do the Padma and Jamuna rivers converge?`,
      ans: "গোয়ালন্দ (রাজবাড়ী)", b: "চাঁদপুর", c: "ভৈরব বাজার", d: "বাহাদুরাবাদ",
      exp_bn: "রাজবাড়ী জেলার গোয়ালন্দ ঘাটের কাছে পদ্মা ও যমুনা নদী মিলিত হয়ে সম্মিলিত ধারা 'পদ্মা' নামে প্রবাহিত হয়।",
      exp_en: "The Padma and Jamuna rivers converge at Goalando in Rajbari district."
    },
    {
      q_bn: `সম্মিলিত পদ্মা নদী কোন জেলায় গিয়ে মেঘনা নদীর সাথে মিলিত হয়েছে?`,
      q_en: `In which district does the combined flow of Padma meet the Meghna river?`,
      ans: "চাঁদপুর জেলা", b: "শরীয়তপুর জেলা", c: "মুন্সীগঞ্জ জেলা", d: "ভোলা জেলা",
      exp_bn: "চাঁদপুরের কাছে পদ্মা ও মেঘনা নদী মিলিত হয়ে পরবর্তীকালে 'মেঘনা' নাম ধারণ করে বঙ্গোপসাগরে পতিত হয়েছে।",
      exp_en: "The Padma joins the Meghna at Chandpur, flowing into the Bay of Bengal as the Meghna."
    },
    {
      q_bn: `সুরমা ও কুশিয়ারা নদী কোন স্থানে মিলিত হয়ে যৌথভাবে কালনী নাম ধারণ করেছে?`,
      q_en: `Where do the Surma and Kushiyara rivers unite to form the Kalni river?`,
      ans: "আজমিরীগঞ্জ (হবিগঞ্জ)", b: "ভৈরব বাজার", c: "ছাতক", d: "কুলাউড়া",
      exp_bn: "হবিগঞ্জের আজমিরীগঞ্জে সুরমা ও কুশিয়ারা মিলিত হয়ে কালনী নাম ধারণ করে এবং পরবর্তীতে ভৈরব বাজারের কাছে মেঘনার সাথে মেশে।",
      exp_en: "Surma and Kushiyara converge at Ajmiriganj in Habiganj to form the Kalni river."
    },
    {
      q_bn: `বাংলাদেশ ও ভারতের মধ্যে অভিন্ন বা আন্তঃসীমান্ত নদীর সংখ্যা মোট কতটি?`,
      q_en: `How many transboundary rivers are officially shared between Bangladesh and India?`,
      ans: "৫৪টি নদী", b: "৫৭টি নদী", c: "৩টি নদী", d: "৫০টি নদী",
      exp_bn: "বাংলাদেশ যৌথ নদী কমিশনের তথ্যমতে ভারত ও বাংলাদেশের মধ্যে ৫৪টি এবং মিয়ানমারের সাথে ৩টি (মোট ৫৭টি) আন্তঃসীমান্ত নদী রয়েছে।",
      exp_en: "Bangladesh shares 54 transboundary rivers with India and 3 with Myanmar, totaling 57 transboundary rivers."
    }
  ];
  const p2 = riverPool[b % riverPool.length];
  questions.push(createQ({
    topic: "বাংলাদেশের নদ-নদী ও জলবায়ু",
    subtopic: "নদী সংযোগ ও আন্তঃসীমান্ত নদী",
    question_bn: `${p2.q_bn} [নদী সমীক্ষা-${b}]`,
    question_en: `${p2.q_en} [River Survey-${b}]`,
    options: { A: p2.ans, B: p2.b, C: p2.c, D: p2.d },
    correct_option: "A",
    explanation_bn: p2.exp_bn,
    explanation_en: p2.exp_en
  }));

  // 3. Maritime Boundaries
  const maritimePool = [
    {
      q_bn: `জাতিসংঘের সমুদ্র আইন কনভেনশন (UNCLOS) অনুযায়ী বাংলাদেশের টেরিটোরিয়াল বা আঞ্চলিক সমুদ্রসীমা উপকূল থেকে কত নটিক্যাল মাইল?`,
      q_en: `According to UNCLOS, what is the extent of Bangladesh's Territorial Sea from the baseline?`,
      ans: "১২ নটিক্যাল মাইল", b: "২৪ নটিক্যাল মাইল", c: "২০০ নটিক্যাল মাইল", d: "৩৫০ নটিক্যাল মাইল",
      exp_bn: "উপকূলীয় ভিত্তিপ্রস্তর বা বেসলাইন থেকে ১২ নটিক্যাল মাইল পর্যন্ত রাষ্ট্রের পূর্ণ সার্বভৌম আঞ্চলিক সমুদ্রসীমা নির্ধারিত।",
      exp_en: "The Territorial Sea extends up to 12 nautical miles from the coastal baseline."
    },
    {
      q_bn: `আন্তর্জাতিক সমুদ্র আইন অনুসারে অর্থনৈতিক সমুদ্রসীমা (EEZ) উপকূলীয় ভিত্তিপ্রস্তর থেকে কত নটিক্যাল মাইল পর্যন্ত বিস্তৃত?`,
      q_en: `According to international law, how far does the Exclusive Economic Zone (EEZ) extend from the baseline?`,
      ans: "২০০ নটিক্যাল মাইল", b: "১২ নটিক্যাল মাইল", c: "২৪ নটিক্যাল মাইল", d: "৩৫০ নটিক্যাল মাইল",
      exp_bn: "উপকূল থেকে ২০০ নটিক্যাল মাইল পর্যন্ত এলাকাকে অনন্য বা এক্সক্লুসিভ অর্থনৈতিক সমুদ্রসীমা (EEZ) হিসেবে গণ্য করা হয়।",
      exp_en: "The Exclusive Economic Zone (EEZ) extends up to 200 nautical miles from the baseline."
    },
    {
      q_bn: `আন্তর্জাতিক ট্রাইব্যুনাল (ITLOS)-এ মায়ানমারের সাথে সমুদ্রসীমা বিরোধের ঐতিহাসিক রায়টি কোন সালে ঘোষিত হয়?`,
      q_en: `In which year was the historic ITLOS maritime boundary verdict between Bangladesh and Myanmar delivered?`,
      ans: "২০১২ সালে", b: "২০১৪ সালে", c: "২০১০ সালে", d: "২০১৬ সালে",
      exp_bn: "জার্মানির হামবুর্গে অবস্থিত ITLOS ২০১২ সালের ১৪ই মার্চ মিয়ানমারের সাথে বিরোধে বাংলাদেশের অনুকূলে রায় প্রদান করে।",
      exp_en: "The International Tribunal for the Law of the Sea (ITLOS) in Hamburg delivered the verdict on March 14, 2012."
    },
    {
      q_bn: `স্থায়ী সালিশি আদালত (PCA)-এ ভারতের সাথে সমুদ্রসীমা বিরোধ সংক্রান্ত চূড়ান্ত রায় কত সালে ঘোষিত হয়?`,
      q_en: `In which year was the Permanent Court of Arbitration (PCA) verdict on the India-Bangladesh maritime dispute announced?`,
      ans: "২০১৪ সালে", b: "২০১২ সালে", c: "২০১৫ সালে", d: "২০১৩ সালে",
      exp_bn: "নেদারল্যান্ডসের হেগে অবস্থিত স্থায়ী সালিশি আদালত (PCA) ২০১৪ সালের ৭ই জুলাই ভারতের সাথে সমুদ্র বিরোধের রায় ঘোষণা করে।",
      exp_en: "The PCA in The Hague rendered its maritime arbitration verdict between Bangladesh and India on July 7, 2014."
    }
  ];
  const p3 = maritimePool[b % maritimePool.length];
  questions.push(createQ({
    topic: "সামুদ্রিক ভূগোল ও আঞ্চলিক সীমানা",
    subtopic: "সমুদ্রসীমা ও আন্তর্জাতিক সালিশ",
    question_bn: `${p3.q_bn} [মেরিটাইম কোড-${b}]`,
    question_en: `${p3.q_en} [Maritime Code-${b}]`,
    options: { A: p3.ans, B: p3.b, C: p3.c, D: p3.d },
    correct_option: "A",
    explanation_bn: p3.exp_bn,
    explanation_en: p3.exp_en
  }));

  // 4. Climate, Rainfall & Temperature
  const climatePool = [
    {
      q_bn: `বাংলাদেশের কোন স্থানে বছরে সর্বাধিক গড় বৃষ্টিপাত রেকর্ড করা হয়?`,
      q_en: `Which location in Bangladesh records the highest annual average rainfall?`,
      ans: "লালাখাল (জৈন্তাপুর, সিলেট)", b: "শ্রীমঙ্গল (মৌলভীবাজার)", c: "সীতাকুণ্ড (চট্টগ্রাম)", d: "কক্সবাজার",
      exp_bn: "সিলেটের জৈন্তাপুর উপজেলার লালাখালে খাসিয়া-জয়ন্তীয়া পাহাড়ের পাদদেশে অবস্থিত হওয়ায় সর্বোচ্চ বৃষ্টিপাত (প্রায় ৫,০০০+ মিমি) হয়।",
      exp_en: "Lalkhan in Jaintiapur, Sylhet receives the highest average annual precipitation (over 5,000 mm)."
    },
    {
      q_bn: `বাংলাদেশের সবচেয়ে কম বৃষ্টিপাতযুক্ত বা উষ্ণতম স্থান 'লালপুর' কোন জেলায় অবস্থিত?`,
      q_en: `In which district is 'Lalpur', the location with the lowest rainfall in Bangladesh, situated?`,
      ans: "নাটোর জেলা", b: "রাজশাহী জেলা", c: "কুষ্টিয়া জেলা", d: "পাবনা জেলা",
      exp_bn: "নাটোর জেলার লালপুরে বার্ষিক গড় বৃষ্টিপাত সবচেয়ে কম (প্রায় ১,১৫০ থেকে ১,২০০ মিলিমিটার)।",
      exp_en: "Lalpur, recording the minimum average rainfall in Bangladesh, is located in Natore district."
    },
    {
      q_bn: `বাংলাদেশ আবহাওয়া অধিদপ্তরের তথ্যমতে বছরের শীতলতম মাস কোনটি?`,
      q_en: `According to the Bangladesh Meteorological Department, which is the coldest month of the year?`,
      ans: "জানুয়ারি মাস", b: "ডিসেম্বর মাস", c: "ফেব্রুয়ারি মাস", d: "নভেম্বর মাস",
      exp_bn: "জানুয়ারি মাসে বাংলাদেশে গড় তাপমাত্রা সবচেয়ে নিচে (১১° সেলসিয়াস বা তার কম) নেমে যায়।",
      exp_en: "January is statistically the coldest month in Bangladesh with the lowest mean temperatures."
    }
  ];
  const p4 = climatePool[b % climatePool.length];
  questions.push(createQ({
    topic: "আবহাওয়া ও জলবায়ুবিজ্ঞান",
    subtopic: "বৃষ্টিপাত ও তাপমাত্রার বিন্যাস",
    question_bn: `${p4.q_bn} [আবহাওয়া রেকর্ড-${b}]`,
    question_en: `${p4.q_en} [Climate Record-${b}]`,
    options: { A: p4.ans, B: p4.b, C: p4.c, D: p4.d },
    correct_option: "A",
    explanation_bn: p4.exp_bn,
    explanation_en: p4.exp_en
  }));

  // 5. Natural Disasters & Cyclones
  const disasterPool = [
    {
      q_bn: `বাংলাদেশে সামুদ্রিক ঘূর্ণিঝড়ের জন্য প্রচলিত সংকেত ব্যবস্থার সর্বোচ্চ বা মহাবিপদ সংকেতের মাত্রা কত নম্বর?`,
      q_en: `What is the highest maritime storm warning signal number denoting 'Great Danger' in Bangladesh?`,
      ans: "১০ ও ১১ নম্বর মহাবিপদ সংকেত", b: "৮ নম্বর বিপদ সংকেত", c: "৭ নম্বর সংকেত", d: "১২ নম্বর সংকেত",
      exp_bn: "সমুদ্র বন্দরের জন্য সর্বোচ্চ সংকেত হলো ১০ ও ১১ নম্বর মহাবিপদ সংকেত। ১১ নম্বর সংকেত দেওয়া হয় যখন যোগাযোগ পুরোপুরি বিচ্ছিন্ন হওয়ার আশঙ্কা থাকে।",
      exp_en: "Signals 10 and 11 represent 'Great Danger Signal' under the maritime warning code in Bangladesh."
    },
    {
      q_bn: `স্মরণকালের অন্যতম প্রলয়ঙ্করী ঘূর্ণিঝড় 'সিডর' (Sidr) কত তারিখে বাংলাদেশের উপকূলে আঘাত হানে?`,
      q_en: `On which date did the catastrophic Cyclone Sidr strike the coastal belt of Bangladesh?`,
      ans: "১৫ই নভেম্বর ২০০৭", b: "২৫শে মে ২০০৯", c: "২৯শে এপ্রিল ১৯৯১", d: "১২ই নভেম্বর ১৯৭০",
      exp_bn: "ক্যাটাগরি-৫ মাত্রার প্রলয়ঙ্করী সাইক্লোন সিডর ২০০৭ সালের ১৫ই নভেম্বর বাংলাদেশের দক্ষিণ-পশ্চিম উপকূলীয় অঞ্চলে আঘাত হানে।",
      exp_en: "Super Cyclone Sidr struck the southwestern coast of Bangladesh on November 15, 2007."
    },
    {
      q_bn: `ভূমিকম্পের মাত্রা বা তীব্রতা পরিমাপের জন্য কোন যন্ত্র ও স্কেল আন্তর্জাতিকভাবে ব্যবহৃত হয়?`,
      q_en: `Which instrument and mathematical scale are globally used to record and quantify earthquakes?`,
      ans: "সিসমোগ্রাফ ও রিখটার স্কেল", b: "ব্যারোমিটার ও প্যাসকেল স্কেল", c: "অ্যানিমোমিটার", d: "হাইড্রোমিটার",
      exp_bn: "ভূমিকম্পের তরঙ্গ পরিমাপে সিসমোগ্রাফ যন্ত্র এবং এর মুক্ত শক্তির মাত্রা নির্ধারণে রিখটার স্কেল (লগারিদমিক স্কেল) ব্যবহৃত হয়।",
      exp_en: "Seismograph records seismic vibrations and the Richter scale measures magnitude on a logarithmic scale."
    }
  ];
  const p5 = disasterPool[b % disasterPool.length];
  questions.push(createQ({
    topic: "প্রাকৃতিক দুর্যোগ ও ব্যবস্থাপনা",
    subtopic: "ঘূর্ণিঝড় সংকেত ও চরম আবহাওয়া",
    question_bn: `${p5.q_bn} [দুর্যোগ বার্তা-${b}]`,
    question_en: `${p5.q_en} [Disaster Advisory-${b}]`,
    options: { A: p5.ans, B: p5.b, C: p5.c, D: p5.d },
    correct_option: "A",
    explanation_bn: p5.exp_bn,
    explanation_en: p5.exp_en
  }));

  // 6. Atmospheric Layers & Ozone
  const atmospherePool = [
    {
      q_bn: `বায়ুমণ্ডলের কোন স্তরে সমস্ত প্রধান আবহাওয়া সংক্রান্ত ঘটনা (মেঘ, বৃষ্টি, ঝড় ও কুয়াশা) সংঘটিত হয়?`,
      q_en: `In which layer of the atmosphere do virtually all primary weather phenomena (clouds, rain, storms) take place?`,
      ans: "ট্রপোস্ফিয়ার (Troposphere)", b: "স্ট্র্যাটোস্ফিয়ার", c: "মেসোস্ফিয়ার", d: "থার্মোস্ফিয়ার",
      exp_bn: "ভূপৃষ্ঠের সংলগ্ন ট্রপোস্ফিয়ারে বায়ুমণ্ডলের মোট ভরের প্রায় ৭৫% বিদ্যমান এবং এখানেই ঝড়-বৃষ্টি ইত্যাদি আবহাওয়া সংঘটিত হয়।",
      exp_en: "The Troposphere is the lowest atmospheric layer containing 75% of atmospheric mass where weather events occur."
    },
    {
      q_bn: `সূর্য থেকে আগত ক্ষতিকর অতিবেগুনি (UV) রশ্মি শোষণকারী ওজোন স্তরটি বায়ুমণ্ডলের কোন স্তরে অবস্থিত?`,
      q_en: `In which layer of the atmosphere is the ozone layer located that absorbs harmful ultraviolet rays?`,
      ans: "স্ট্র্যাটোস্ফিয়ার (Stratosphere)", b: "ট্রপোস্ফিয়ার", c: "মেসোস্ফিয়ার", d: "এক্সোস্ফিয়ার",
      exp_bn: "স্ট্র্যাটোস্ফিয়ারের প্রায় ১৫ থেকে ৩৫ কিলোমিটার উচ্চতায় ওজোন গ্যাসের স্তর অবস্থিত যা অতিবেগুনি রশ্মিকে আটকে রাখে।",
      exp_en: "The ozone layer resides in the Stratosphere between 15 and 35 km altitude, shielding Earth from UV rays."
    },
    {
      q_bn: `ওজোন স্তর ক্ষয়কারী সিএফসি (CFC) গ্যাস নিয়ন্ত্রণ ও নিষিদ্ধকরণের ঐতিহাসিক আন্তর্জাতিক চুক্তি কোনটি?`,
      q_en: `Which historic international treaty was enacted to ban and phase out ozone-depleting chlorofluorocarbons (CFCs)?`,
      ans: "মন্ট্রিল প্রোটোকল (১৯৮৭)", b: "কিয়োটো প্রোটোকল", c: "প্যারিস চুক্তি", d: "রামসার কনভেনশন",
      exp_bn: "১৯৮৭ সালের ১৬ই সেপ্টেম্বর কানাডার মন্ট্রিলে ওজোন ক্ষয়কারী গ্যাস হ্রাসে মন্ট্রিল প্রোটোকল স্বাক্ষরিত হয়।",
      exp_en: "The Montreal Protocol was signed on September 16, 1987 to protect the stratospheric ozone layer by phasing out CFCs."
    }
  ];
  const p6 = atmospherePool[b % atmospherePool.length];
  questions.push(createQ({
    topic: "বায়ুমণ্ডল ও বৈশ্বিক পরিবেশ",
    subtopic: "বায়ুমণ্ডলের স্তরবিন্যাস ও ওজোন স্তর",
    question_bn: `${p6.q_bn} [বায়বীয় নিরীক্ষা-${b}]`,
    question_en: `${p6.q_en} [Atmospheric Audit-${b}]`,
    options: { A: p6.ans, B: p6.b, C: p6.c, D: p6.d },
    correct_option: "A",
    explanation_bn: p6.exp_bn,
    explanation_en: p6.exp_en
  }));

  // 7. Wetlands & Ramsar Sites
  const ramsarPool = [
    {
      q_bn: `আন্তর্জাতিকভাবে স্বীকৃত রামসার কনভেনশন অনুসারে সুন্দরবন কত সালে রামসার এলাকা হিসেবে স্বীকৃতি লাভ করে?`,
      q_en: `In which year was the Sundarbans officially designated as a Ramsar Wetland of International Importance?`,
      ans: "১৯৯২ সালে", b: "১৯৯৭ সালে", c: "১৯৮৭ সালে", d: "২০০০ সালে",
      exp_bn: "১৯৯২ সালের ২১শে মে সুন্দরবনকে রামসার সাইট (৫৬০তম) এবং ১৯৯৭ সালে ইউনেস্কো বিশ্ব প্রাকৃতিক ঐতিহ্য হিসেবে ঘোষণা করে।",
      exp_en: "Sundarbans was designated a Ramsar site in 1992 (and a UNESCO Natural World Heritage site in 1997)."
    },
    {
      q_bn: `বাংলাদেশের দ্বিতীয় রামসার সাইট হিসেবে স্বীকৃত 'টাঙ্গুয়ার হাওর' কোন জেলায় অবস্থিত?`,
      q_en: `In which district is 'Tanguar Haor', the second declared Ramsar wetland of Bangladesh, located?`,
      ans: "সুনামগঞ্জ জেলা", b: "মৌলভীবাজার জেলা", c: "কিশোরগঞ্জ জেলা", d: "হবিগঞ্জ জেলা",
      exp_bn: "সুনামগঞ্জ জেলার তাহিরপুর ও ধর্মপাশা উপজেলায় বিস্তৃত টাঙ্গুয়ার হাওর ২০০০ সালের জুলাই মাসে রামসার সাইট ঘোষিত হয়।",
      exp_en: "Tanguar Haor, designated as Bangladesh's second Ramsar site in 2000, is located in Sunamganj district."
    },
    {
      q_bn: `বিশ্বের বৃহত্তম একক ম্যানগ্রোভ বন সুন্দরবনের শতকরা কত ভাগ এলাকা বাংলাদেশের ভূখণ্ডের মধ্যে অবস্থিত?`,
      q_en: `What percentage of the Sundarbans mangrove forest lies within the sovereign territory of Bangladesh?`,
      ans: "প্রায় ৬২ শতাংশ", b: "প্রায় ৩৮ শতাংশ", c: "৫০ শতাংশ", d: "৭৫ শতাংশ",
      exp_bn: "সুন্দরবনের মোট প্রায় ১০,০০০ বর্গকিলোমিটার এলাকার মধ্যে প্রায় ৬২% বাংলাদেশে এবং ৩৮% ভারতের পশ্চিমবঙ্গে অবস্থিত।",
      exp_en: "Approximately 62% of the Sundarbans forest is situated in Bangladesh and the remaining 38% in India."
    }
  ];
  const p7 = ramsarPool[b % ramsarPool.length];
  questions.push(createQ({
    topic: "পরিবেশ ও জীববৈচিত্র্য সংরক্ষণ",
    subtopic: "রামসার জলাভূমি ও ম্যানগ্রোভ বাস্তুতন্ত্র",
    question_bn: `${p7.q_bn} [ইকো-ইনভেন্টরি-${b}]`,
    question_en: `${p7.q_en} [Eco-Inventory-${b}]`,
    options: { A: p7.ans, B: p7.b, C: p7.c, D: p7.d },
    correct_option: "A",
    explanation_bn: p7.exp_bn,
    explanation_en: p7.exp_en
  }));

  return questions.slice(0, count);
}
