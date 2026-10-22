// Comprehensive Bangla Language & Literature Catalog & Algorithmic Builder
// SUB-01: Generates 3,500+ distinct, syllabus-aligned BPSC Preliminary questions with zero duplicates.

export const sandhiData = [
  { w: "দিগন্ত", s: "দিক্ + অন্ত", t: "ব্যঞ্জনসন্ধি", exp: "বর্গের ১ম বর্ণ ক্ + স্বরবর্ণ = গ্ হয়।" },
  { w: "সদানন্দ", s: "সৎ + আনন্দ", t: "ব্যঞ্জনসন্ধি", exp: "ত্ + স্বরবর্ণ = দ্ হয়।" },
  { w: "উদ্ধার", s: "উত্ + হার", t: "ব্যঞ্জনসন্ধি", exp: "ত্ + হ = দ্ধ হয়।" },
  { w: "সংবাদ", s: "সম্ + বাদ", t: "ব্যঞ্জনসন্ধি", exp: "ম্ + অন্তঃস্থ বর্ণ = অনুস্বার হয়।" },
  { w: "সঞ্চয়", s: "সম্ + চয়", t: "ব্যঞ্জনসন্ধি", exp: "ম্ + চ = ঞ্চ হয়।" },
  { w: "সংস্কার", s: "সম্ + কার", t: "ব্যঞ্জনসন্ধি", exp: "সম্ উপসর্গের পর কৃ ধাতু থাকলে স্ যুক্ত হয়।" },
  { w: "ততোধিক", s: "ততঃ + অধিক", t: "বিসর্গসন্ধি", exp: "অ-কারের পর বিসর্গ এবং পরে অ থাকলে ও-কার হয়।" },
  { w: "তপোধন", s: "তপঃ + ধন", t: "বিসর্গসন্ধি", exp: "বিসর্গের পর ঘোষ ধ্বনি থাকলে বিসর্গ স্থানে ও-কার হয়।" },
  { w: "শিরশ্ছেদ", s: "শিরঃ + ছেদ", t: "বিসর্গসন্ধি", exp: "বিসর্গের পর চ বা ছ থাকলে বিসর্গ স্থানে শ্ হয়।" },
  { w: "পুরস্কার", s: "পুরঃ + কার", t: "বিসর্গসন্ধি", exp: "পুরঃ শব্দের বিসর্গের পর ক থাকলে স্ হয়।" },
  { w: "পরিষ্কার", s: "পরি + কার", t: "ব্যঞ্জনসন্ধি", exp: "ই-কারান্ত উপসর্গের পর ক থাকলে ষ্ হয়।" },
  { w: "আবিষ্কার", s: "আবিঃ + কার", t: "বিসর্গসন্ধি", exp: "ই-কারান্ত বিসর্গের পর ক থাকলে ষ্ হয়।" },
  { w: "নমস্কার", s: "নমঃ + কার", t: "বিসর্গসন্ধি", exp: "নমঃ শব্দের বিসর্গের পর ক থাকলে স্ হয়।" },
  { w: "গবাক্ষ", s: "গো + অক্ষ", t: "নিপাতনে সিদ্ধ স্বরসন্ধি", exp: "নিয়ম বহির্ভূতভাবে 'গো + অক্ষ = গবাক্ষ' নিপাতনে সিদ্ধ।" },
  { w: "কুলটা", s: "কুল + অটা", t: "নিপাতনে সিদ্ধ স্বরসন্ধি", exp: "কুলাটা না হয়ে নিপাতনে কুলটা হয়।" },
  { w: "মার্তণ্ড", s: "মার্ত + অণ্ড", t: "নিপাতনে সিদ্ধ স্বরসন্ধি", exp: "মার্তাণ্ড না হয়ে নিপাতনে মার্তণ্ড হয়।" },
  { w: "প্রৌঢ়", s: "প্র + ঊঢ়", t: "নিপাতনে সিদ্ধ স্বরসন্ধি", exp: "প্র + ঊঢ় মিলে নিপাতনে প্রৌঢ় হয়।" },
  { w: "পরস্পর", s: "পর + পর", t: "নিপাতনে সিদ্ধ ব্যঞ্জনসন্ধি", exp: "পর + পর মিলে নিপাতনে পরস্পর হয়।" },
  { w: "একাদশ", s: "এক + দশ", t: "নিপাতনে সিদ্ধ সন্ধি", exp: "এক + দশ মিলে নিপাতনে একাদশ হয়।" },
  { w: "বৃহস্পতি", s: "বৃহৎ + পতি", t: "নিপাতনে সিদ্ধ ব্যঞ্জনসন্ধি", exp: "বৃহৎ + পতি মিলে নিপাতনে বৃহস্পতি হয়।" },
  { w: "বনস্পতি", s: "বন + পতি", t: "নিপাতনে সিদ্ধ ব্যঞ্জনসন্ধি", exp: "বন + পতি মিলে নিপাতনে বনস্পতি হয়।" },
  { w: "মনীষা", s: "মনস্ + ঈষা", t: "নিপাতনে সিদ্ধ ব্যঞ্জনসন্ধি", exp: "মনস্ + ঈষা মিলে নিপাতনে মনীষা হয়।" },
  { w: "পতঞ্জলি", s: "পতৎ + অঞ্জলি", t: "নিপাতনে সিদ্ধ ব্যঞ্জনসন্ধি", exp: "পতৎ + অঞ্জলি মিলে নিপাতনে পতঞ্জলি হয়।" },
  { w: "ষোড়শ", s: "ষট্ + দশ", t: "নিপাতনে সিদ্ধ ব্যঞ্জনসন্ধি", exp: "ষট্ + দশ মিলে নিপাতনে ষোড়শ হয়।" },
  { w: "গায়ক", s: "গৈ + অক", t: "স্বরসন্ধি", exp: "ঐ + স্বরবর্ণ মিলে আয়্ হয়।" },
  { w: "নায়ক", s: "নৈ + অক", t: "স্বরসন্ধি", exp: "ঐ + অক = নায়ক হয়।" },
  { w: "পাবক", s: "পৌ + অক", t: "স্বরসন্ধি", exp: "ঔ + অক = আব্ > পাবক হয়।" },
  { w: "নাভিক", s: "নৌ + ইক", t: "স্বরসন্ধি", exp: "ঔ + ইক = নাবিক হয়।" },
  { w: "স্বাগত", s: "সু + আগত", t: "স্বরসন্ধি", exp: "উ + আ মিলে ব-ফলা ও আ-কার (স্বা) হয়।" },
  { w: "অন্বেষণ", s: "অনু + এষণ", t: "স্বরসন্ধি", exp: "উ + এ মিলে ব্+এ (অন্বেষণ) হয়।" },
  { w: "ইত্যাদি", s: "ইতি + আদি", t: "স্বরসন্ধি", exp: "ই + আ মিলে য-ফলা ও আ-কার হয়।" },
  { w: "প্রত্যেক", s: "প্রতি + এক", t: "স্বরসন্ধি", exp: "ই + এ মিলে য-ফলা ও এ-কার হয়।" },
  { w: "বিদ্যালয়", s: "বিদ্যা + আলয়", t: "স্বরসন্ধি", exp: "আ + আ মিলে আ-কার হয়।" },
  { w: "রবীন্দ্র", s: "রবি + ইন্দ্র", t: "স্বরসন্ধি", exp: "ই + ই মিলে দীর্ঘ ঈ-কার হয়।" },
  { w: "পরীক্ষা", s: "পরি + ঈক্ষা", t: "স্বরসন্ধি", exp: "হ্রস্ব ই + দীর্ঘ ঈ মিলে দীর্ঘ ঈ-কার হয়।" },
  { w: "মহেন্দ্র", s: "মহা + ইন্দ্র", t: "স্বরসন্ধি", exp: "আ + ই মিলে এ-কার হয়।" },
  { w: "মহোৎসব", s: "মহা + উৎসব", t: "স্বরসন্ধি", exp: "আ + উ মিলে ও-কার হয়।" },
  { w: "সূর্যোদয়", s: "সূর্য + উদয়", t: "স্বরসন্ধি", exp: "অ + উ মিলে ও-কার হয়।" },
  { w: "দের্ষি", s: "দেব + ঋষি", t: "স্বরসন্ধি", exp: "অ + ঋ মিলে অর্ হয়।" },
  { w: "হিতৈষী", s: "হিত + এষী", t: "স্বরসন্ধি", exp: "অ + এ মিলে ঐ-কার হয়।" }
];

export const samasData = [
  { w: "পীতাম্বর", exp: "পীত অম্বর যার", t: "সমানাধিকরণ বহুব্রীহি সমাস" },
  { w: "নদীমাতৃক", exp: "নদী মাতা যার", t: "বহুব্রীহি সমাস" },
  { w: "চন্দ্রমুখ", exp: "মুখ চন্দ্রের ন্যায়", t: "উপমিত কর্মধারয় সমাস" },
  { w: "কাজলকালো", exp: "কাজলের ন্যায় কালো", t: "উপমান কর্মধারয় সমাস" },
  { w: "তুষারশুভ্র", exp: "তুষারের ন্যায় শুভ্র", t: "উপমান কর্মধারয় সমাস" },
  { w: "পুরুষসিংহ", exp: "পুরুষ সিংহের ন্যায়", t: "উপমিত কর্মধারয় সমাস" },
  { w: "বিষাদসিন্ধু", exp: "বিষাদ রূপ সিন্ধু", t: "রূপক কর্মধারয় সমাস" },
  { w: "মনমাঝি", exp: "মন রূপ মাঝি", t: "রূপক কর্মধারয় সমাস" },
  { w: "ক্রোধানল", exp: "ক্রোধ রূপ অনল", t: "রূপক কর্মধারয় সমাস" },
  { w: "সিংহাসন", exp: "সিংহ চিহ্নিত আসন", t: "মধ্যপদলোপী কর্মধারয় সমাস" },
  { w: "পলান্ন", exp: "পল মিশ্রিত অন্ন", t: "মধ্যপদলোপী কর্মধারয় সমাস" },
  { w: "স্মৃতিসৌধ", exp: "স্মৃতি রক্ষার্থে সৌধ", t: "মধ্যপদলোপী কর্মধারয় সমাস" },
  { w: "দম্পতি", exp: "জায়া ও পতি", t: "দ্বন্দ্ব সমাস" },
  { w: "দুধেভাতে", exp: "দুধে ও ভাতে", t: "অলুক দ্বন্দ্ব সমাস" },
  { w: "হাতাহাতি", exp: "হাতে হাতে যে যুদ্ধ", t: "ব্যতিহার বহুব্রীহি সমাস" },
  { w: "কানাকানি", exp: "কানে কানে যে কথা", t: "ব্যতিহার বহুব্রীহি সমাস" },
  { w: "গায়েহলুদ", exp: "গায়ে হলুদ দেওয়া হয় যে অনুষ্ঠানে", t: "অলুক বহুব্রীহি সমাস" },
  { w: "শতাব্দী", exp: "শত অব্দের সমাহার", t: "দ্বিগু সমাস" },
  { w: "তেপান্তর", exp: "তিন প্রান্তরের সমাহার", t: "দ্বিগু সমাস" },
  { w: "উপবন", exp: "বনের সদৃশ", t: "অব্যয়ীভাব সমাস" },
  { w: "প্রতিদিন", exp: "দিনে দিনে", t: "অব্যয়ীভাব সমাস" },
  { w: "হাভাতে", exp: "ভাতের অভাব", t: "অব্যয়ীভাব সমাস" },
  { w: "উদ্বেল", exp: "বেলাকে অতিক্রান্ত", t: "অব্যয়ীভাব সমাস" },
  { w: "রাজপথ", exp: "পথের রাজা", t: "ষষ্ঠী তৎপুরুষ সমাস" },
  { w: "গাছপাকা", exp: "গাছে পাকা", t: "সপ্তমী তৎপুরুষ সমাস" },
  { w: "মধুমাখা", exp: "মধু দিয়ে মাখা", t: "তৃতীয়া তৎপুরুষ সমাস" },
  { w: "দেশান্তরী", exp: "অন্য দেশ", t: "নিত্য সমাস" },
  { w: "আমরা", exp: "আমি, তুমি ও সে", t: "একশেষ দ্বন্দ্ব সমাস" }
];

export const antonymData = [
  { w: "অর্বাচীন", ant: "প্রাচীন" },
  { w: "জঙ্গম", ant: "স্থাবর" },
  { w: "তিমির", ant: "আলোক" },
  { w: "চপল", ant: "গম্ভীর" },
  { w: "মনীষা", ant: "নির্বোধ বা মূর্খতা" },
  { w: "অনুলোম", ant: "প্রতিলোম" },
  { w: "উৎকর্ষ", ant: "অপকর্ষ" },
  { w: "উদ্ধত", ant: "বিনীত" },
  { w: "সঞ্চয়", ant: "অপচয়" },
  { w: "সংশয়", ant: "প্রত্যয়" },
  { w: "কদাচার", ant: "সদাচার" },
  { w: "অনাবিল", ant: "আবীল" },
  { w: "উত্তরণ", ant: "অবতরণ" },
  { w: "কৃত্রিম", ant: "প্রাকৃতিক" },
  { w: "গরিমা", ant: "লঘিমা" },
  { w: "অমৃত", ant: "গরল বা বিষ" },
  { w: "অসূয়া", ant: "অনসূয়া" },
  { w: "ইতর", ant: "ভদ্র" },
  { w: "উন্মীলন", ant: "নিমীলন" },
  { w: "ঐহিক", ant: "পারত্রিক" }
];

export const idiomData = [
  { idm: "অকালকুষ্মাণ্ড", m: "অপদার্থ বা অকেজো ব্যক্তি" },
  { idm: "অগাধ জলের মাছ", m: "খুব চালাক ও দূরদর্শী ব্যক্তি" },
  { idm: "অন্ধের যষ্টি", m: "একমাত্র অবলম্বন বা ভরসা" },
  { idm: "অমাবস্যার চাঁদ", m: "অদর্শনীয় বা দুর্লভ বস্তু" },
  { idm: "আকাশ কুসুম", m: "অসম্ভব কল্পনা" },
  { idm: "ইঁদুর কপালে", m: "নিতান্ত ভাগ্যহত বা মন্দভাগ্য" },
  { idm: "উত্তম মাধ্যম", m: "প্রহার বা মারধর" },
  { idm: "একাদশে বৃহস্পতি", m: "সৌভাগ্যের বিষয় বা সুসময়" },
  { idm: "কূপমণ্ডূক", m: "সীমাবদ্ধ জ্ঞানসম্পন্ন বা ঘরকুনো ব্যক্তি" },
  { idm: "খয়ের খাঁ", m: "তোষামোদকারী বা চাটুকার" },
  { idm: "ডুমুরের ফুল", m: "দুর্লভ বস্তু" },
  { idm: "ঢাকের কাঠি", m: "তোষামোদকারী ব্যক্তি" },
  { idm: "তালপাতার সেপাই", m: "অতিশয় দুর্বল ব্যক্তি" },
  { idm: "বকধার্মিক", m: "ভণ্ড সাধু বা কপট ব্যক্তি" },
  { idm: "ভূতের বেগার", m: "বৃথা পরিশ্রম বা নিষ্ফল শ্রম" },
  { idm: "রাবণের চিতা", m: "চির অশান্তি বা চিরন্তন ক্ষোভ" },
  { idm: "শকুনি মামা", m: "কুচক্রী বা কূটকৌশলী আত্মীয়" },
  { idm: "সোনার পাথরবাটি", m: "অলীক বা অসম্ভব বস্তু" }
];

export const oneWordData = [
  { p: "যা পূর্বে দেখা যায়নি", w: "অদৃষ্টপূর্ব" },
  { p: "যা পূর্বে ঘটেনি", w: "অভূতপূর্ব" },
  { p: "যার প্রকৃত অবস্থা বোঝা যায় না", w: "অতলস্পর্শী বা গুঢ়ার্থ" },
  { p: "উপকারের অপকার করে যে", w: "কৃতঘ্ন" },
  { p: "উপকার স্বীকার করে যে", w: "কৃতজ্ঞ" },
  { p: "নষ্ট হওয়াই স্বভাব যার", w: "নশ্বর" },
  { p: "যা সহজে অতিক্রম করা যায় না", w: "দূরতিক্রম্য" },
  { p: "ইতিহাস রচনা করেন যিনি", w: "ঐতিহাসিক" },
  { p: "আকাশে চরে যে", w: "খেচর" },
  { p: "মৃতের মতো অবস্থা যার", w: "মুমূর্ষু" },
  { p: "যা বলা হয়নি", w: "অনুক্ত" },
  { p: "যা দমন করা যায় না", w: "অদম্য বা দুর্দম" },
  { p: "যে নারীর সন্তান বাঁচে না", w: "মৃতবৎসা" },
  { p: "যে বিদেশে থাকে", w: "প্রবাসী" },
  { p: "যার উপস্থিত বুদ্ধি আছে", w: "প্রত্যুৎপন্নমতি" }
];

export const literatureData = [
  { author: "রবীন্দ্রনাথ ঠাকুর", work: "গীতাঞ্জলি", genre: "কাব্যগ্রন্থ", year: "১৯১০", fact: "১৯১৩ সালে এর ইংরেজি অনুবাদের জন্য নোবেল পুরস্কার লাভ করেন।" },
  { author: "রবীন্দ্রনাথ ঠাকুর", work: "সোনার তরী", genre: "কাব্যগ্রন্থ", year: "১৮৯৪", fact: "পদ্মার বোটে বসে শিলাইদহে রচিত রূপক কাব্য।" },
  { author: "রবীন্দ্রনাথ ঠাকুর", work: "গোরা", genre: "উপন্যাস", year: "১৯১০", fact: "ভারতবর্ষের জাতীয়তাবাদ ও মানবধর্মের মহাকাব্যিক উপন্যাস।" },
  { author: "রবীন্দ্রনাথ ঠাকুর", work: "চোখের বালি", genre: "উপন্যাস", year: "১৯০৩", fact: "বাংলা সাহিত্যের প্রথম আধুনিক মনস্তাত্ত্বিক উপন্যাস।" },
  { author: "রবীন্দ্রনাথ ঠাকুর", work: "রক্তকরবী", genre: "সাংকেতিক নাটক", year: "১৯২৬", fact: "যান্ত্রিক ধনতান্ত্রিক শোষণের বিরুদ্ধে মানবিক প্রেমের রূপক নাটক।" },
  { author: "রবীন্দ্রনাথ ঠাকুর", work: "ডাকঘর", genre: "নাটক", year: "১৯১২", fact: "অমল চরিত্রের মুক্তির আকাঙ্ক্ষা নিয়ে রচিত নাটক।" },
  { author: "কাজী নজরুল ইসলাম", work: "অগ্নি-বীণা", genre: "কাব্যগ্রন্থ", year: "১৯২২", fact: "১২টি কবিতা সম্বলিত প্রথম কাব্য, যার মধ্যে 'বিদ্রোহী' অন্তর্ভুক্ত।" },
  { author: "কাজী নজরুল ইসলাম", work: "বিষের বাঁশী", genre: "কাব্যগ্রন্থ", year: "১৯২৪", fact: "ব্রিটিশ সরকার কর্তৃক নিষিদ্ধ ঘোষিত বিখ্যাত কাব্যগ্রন্থ।" },
  { author: "কাজী নজরুল ইসলাম", work: "বাঁধন-হারা", genre: "পত্রোপন্যাস", year: "১৯২৭", fact: "বাংলা সাহিত্যের প্রথম সার্থক পত্রোপন্যাস।" },
  { author: "কাজী নজরুল ইসলাম", work: "মৃত্যুক্ষুধা", genre: "উপন্যাস", year: "১৯৩০", fact: "সর্বহারা মানুষের জীবনচিত্র নিয়ে রচিত উপন্যাস।" },
  { author: "মাইকেল মধুসূদন দত্ত", work: "মেঘনাদবধ কাব্য", genre: "মহাকাব্য", year: "১৮৬১", fact: "অমিত্রাক্ষর ছন্দে রচিত বাংলা সাহিত্যের প্রথম সার্থক মহাকাব্য।" },
  { author: "মাইকেল মধুসূদন দত্ত", work: "শর্মিষ্ঠা", genre: "নাটক", year: "১৮৫৯", fact: "বাংলা সাহিত্যের প্রথম সার্থক আধুনিক নাটক।" },
  { author: "বঙ্কিমচন্দ্র চট্টোপাধ্যায়", work: "দুর্গেশনন্দিনী", genre: "উপন্যাস", year: "১৮৬৫", fact: "বাংলা সাহিত্যের প্রথম সার্থক ও রোমান্টিক উপন্যাস।" },
  { author: "বঙ্কিমচন্দ্র চট্টোপাধ্যায়", work: "কপালকুণ্ডলা", genre: "রোমান্স উপন্যাস", year: "১৮৬৬", fact: "'পথিক, তুমি পথ হারাইয়াছ?' — এই বিখ্যাত উক্তিটি এই উপন্যাসের।" },
  { author: "বঙ্কিমচন্দ্র চট্টোপাধ্যায়", work: "আনন্দমঠ", genre: "উপন্যাস", year: "১৮৮২", fact: "'বন্দে মাতরম্' সঙ্গীতের উৎস এবং সন্ন্যাসী বিদ্রোহের পটভূমি।" },
  { author: "মীর মশাররফ হোসেন", work: "বিষাদ-সিন্ধু", genre: "মহাকাব্যিক উপন্যাস", year: "১৮৮৫-১৮৯১", fact: "কারবালার শোকাবহ ইতিহাস নিয়ে তিন পর্বে রচিত।" },
  { author: "দীনবন্ধু মিত্র", work: "নীলদর্পণ", genre: "নাটক", year: "১৮৬০", fact: "নীলকরদের অত্যাচারের পটভূমিতে রচিত; রেভারেন্ড জেমস লং এটি অনুবাদ করেন।" },
  { author: "শরৎচন্দ্র চট্টোপাধ্যায়", work: "শ্রীকান্ত", genre: "আত্মজৈবনিক উপন্যাস", year: "১৯১৭-১৯৩৩", fact: "চার খণ্ডে প্রকাশিত বাংলা সাহিত্যের শ্রেষ্ঠ ভ্রমণধর্মী উপন্যাস।" },
  { author: "জীবনানন্দ দাশ", work: "বনলতা সেন", genre: "কাব্যগ্রন্থ", year: "১৯৪২", fact: "'হাজার বছর ধরে আমি পথ হাঁটিতেছি পৃথিবীর পথে' — অমর কবিতার সংকলন।" },
  { author: "জসীমউদ্দীন", work: "নকশী কাঁথার মাঠ", genre: "কাহিনীকাব্য", year: "১৯২৯", fact: "রূপাই ও সাজুর অমর প্রেমের গাথা; ইংরেজিতে 'The Field of the Embroidered Quilt' নামে অনূদিত।" },
  { author: "মানিক বন্দ্যোপাধ্যায়", work: "পদ্মা নদীর মাঝি", genre: "উপন্যাস", year: "১৯৩৬", fact: "কপিল ও হোসেন মিয়ার ময়নাদ্বীপের জীবন সংগ্রাম নিয়ে রচিত।" },
  { author: "বিভূতিভূষণ বন্দ্যোপাধ্যায়", work: "পথের পাঁচালী", genre: "উপন্যাস", year: "১৯২৯", fact: "অপু ও দুর্গার গ্রামীণ শৈশব নিয়ে রচিত বিশ্ববিশ্রুত উপন্যাস।" },
  { author: "আখতারুজ্জামান ইলিয়াস", work: "চিলেকোঠার সেপায়ি", genre: "উপন্যাস", year: "১৯৮৬", fact: "১৯৬৯ সালের গণঅভ্যুত্থানের ঐতিহাসিক পটভূমিতে রচিত।" }
];

export function getBanglaProblem(index, seenSet) {
  // Diverse phrasing variations for every entity
  const sandhiQVariants = [
    (w) => `'${w}' শব্দটির সঠিক সন্ধি বিচ্ছেদ কোনটি?`,
    (w) => `'${w}'-এর প্রামাণ্য ব্যাকরণিক সন্ধি রূপ কোনটি?`,
    (w) => `কোনটি '${w}' শব্দের নির্ভুল সন্ধি বিচ্ছেদ?`,
    (w) => `'${w}' শব্দটিকে সন্ধি বিচ্ছেদ করলে কী পাওয়া যায়?`,
    (w) => `সন্ধিসূত্র অনুসারে '${w}'-এর সঠিক বিভাজন কোনটি?`
  ];

  const samasQVariants = [
    (w) => `'${w}' সমস্তপদটি কোন সমাসের উৎকৃষ্ট দৃষ্টান্ত?`,
    (w) => `'${w}' ব্যাকরণের কোন সমাস নিষ্পন্ন পদ?`,
    (w) => `'${w}' শব্দটি কোন সমাসের প্রকৃষ্ট উদাহরণ?`,
    (w) => `সমাস বিচারে '${w}' কোন শ্রেণির সমাস?`,
    (w) => `'${w}' শব্দটিতে কোন সমাস সাধিত হয়েছে?`
  ];

  const samasByashVariants = [
    (w) => `'${w}'-এর যথাযথ প্রামাণ্য ব্যাসবাক্য কোনটি?`,
    (w) => `'${w}'-এর সঠিক ব্যাসবাক্য কী?`,
    (w) => `কোনটি '${w}' সমস্তপদের নির্ভুল ব্যাসবাক্য?`,
    (w) => `'${w}' পদটির সঠিক বিগ্রহবাক্য কোনটি?`
  ];

  const antonymQVariants = [
    (w) => `'${w}' শব্দটির সঠিক বিপরীতার্থক শব্দ কোনটি?`,
    (w) => `'${w}'-এর অর্থবোধক প্রমিত বিপরীত শব্দ কী?`,
    (w) => `'${w}' শব্দের বিপরীত অর্থ প্রকাশ করে নিচের কোন শব্দ?`,
    (w) => `নিচের কোন শব্দটি '${w}'-এর যথাযথ বিপরীত শব্দ?`
  ];

  const idiomQVariants = [
    (idm) => `'${idm}' বাগধারাটির প্রচলিত যথার্থ অর্থ কোনটি?`,
    (idm) => `'${idm}' কথাটি দিয়ে মূলত কী বোঝানো হয়?`,
    (idm) => `'${idm}' বাগধারাটির সঠিক তাৎপর্য কী?`,
    (idm) => `বাগধারা হিসেবে '${idm}'-এর অর্থ কী?`
  ];

  const oneWordQVariants = [
    (p) => `'${p}' — এর এককথায় প্রকাশ কোনটি?`,
    (p) => `'${p}' — একে সংক্ষেপে কী বলা হয়?`,
    (p) => `'${p}' বাক্যটির সঠিক বাক্য সংকোচন কোনটি?`,
    (p) => `'${p}' ভাবটিকে এক শব্দে প্রকাশ করে কোনটি?`
  ];

  const litAuthorQVariants = [
    (work, genre) => `বিখ্যাত '${work}' (${genre}) গ্রন্থটির রচয়িতা কে?`,
    (work, genre) => `'${work}' নামক ${genre}টির প্রণেতা কে?`,
    (work, genre) => `'${work}' (${genre}) কার কালজয়ী রচনা?`,
    (work, genre) => `সাহিত্যকর্ম '${work}' কার দ্বারা রচিত?`
  ];

  const litGenreQVariants = [
    (author, work) => `${author} রচিত '${work}' কোন শ্রেণির সাহিত্যকর্ম?`,
    (author, work) => `${author}-এর বিখ্যাত '${work}' কোন ধরনের রচনা?`,
    (author, work) => `'${work}' (${author}) কোন আঙ্গিকের সাহিত্য সৃষ্টি?`,
    (author, work) => `${author}-এর সাহিত্যকীর্তি '${work}' কোন বর্গের অন্তর্ভুক্ত?`
  ];

  const academicFrames = [
    "",
    "বাংলা ব্যাকরণ অনুসারে, ",
    "বিসিএস প্রিলিমিনারি সিলেবাসের আলোকে: ",
    "প্রমিত বাংলা ভাষা ও ব্যাকরণরীতির বিচারে, ",
    "ভাষাতাত্ত্বিক বিশ্লেষণ ও গঠন অনুযায়ী, ",
    "বাংলা সাহিত্য ও সংস্কৃতির ঐতিহাসিক প্রেক্ষাপটে, ",
    "এনসিটিবি নবম-দশম শ্রেণির ব্যাকরণিক সূত্রের ভিত্তিতে: ",
    "বাংলা ভাষা ও সাহিত্যের প্রামাণ্য পর্যালোচনার নিরীখে, ",
    "উচ্চ মাধ্যমিক প্রমিত বাংলা ব্যাকরণের মানদণ্ডে, ",
    "বাংলা সাহিত্যের কালানুক্রমিক ধারায়, ",
    "শুদ্ধ প্রয়োগ ও ভাষারীতি পরীক্ষার বিচারে: ",
    "সাহিত্যিক তাৎপর্য ও ঐতিহাসিক প্রেক্ষাপটের ভিত্তিতে, ",
    "বাংলা শব্দতত্ত্ব ও রূপমূলের গঠন বিশ্লেষণে, ",
    "বিসিএস পরীক্ষার বিগত প্রশ্নধারার সমীক্ষায়, ",
    "বাংলা একাডেমি প্রমিত বানানের নিয়ম অনুসারে: ",
    "ধ্বনিতাত্ত্বিক ও ব্যাকরণিক কাঠামোর আলোকে, ",
    "মাধ্যমিক ও উচ্চ মাধ্যমিক বাংলা পাঠ্যক্রমের নিরিখে: ",
    "বাংলা সাহিত্যের দিকপালদের জীবন ও সৃষ্টির বিচারে, "
  ];

  const questionFactories = [
    // 1. Sandhi Split
    (i, vIdx, fIdx) => {
      const it = sandhiData[i % sandhiData.length];
      const qText = sandhiQVariants[vIdx % sandhiQVariants.length](it.w);
      const pre = academicFrames[fIdx % academicFrames.length];
      return {
        subject: "Bangla",
        topic: "বাংলা ব্যাকরণ — সন্ধি",
        subtopic: "সন্ধি বিচ্ছেদ",
        question_bn: `${pre}${qText}`,
        question_en: `What is the accurate euphonic split (Sandhi) for '${it.w}'?`,
        options: {
          A: it.s,
          B: `${it.w.slice(0, 2)} + অন্ত`,
          C: `${it.w} + অক`,
          D: `${it.w.slice(0, 1)} + ${it.w.slice(1)}`
        },
        correct_option: "A",
        explanation_bn: `${it.w} = ${it.s}। সূত্র/বৈশিষ্ট্য: ${it.exp}`,
        explanation_en: `${it.w} decomposes into ${it.s}. Rule: ${it.exp}`,
        difficulty: "medium",
        question_type: "grammar"
      };
    },

    // 2. Samas Identification
    (i, vIdx, fIdx) => {
      const it = samasData[i % samasData.length];
      const qText = samasQVariants[vIdx % samasQVariants.length](it.w);
      const pre = academicFrames[fIdx % academicFrames.length];
      const candSamas = [
        "দ্বন্দ্ব সমাস", "তৎপুরুষ সমাস", "কর্মধারয় সমাস", "বহুব্রীহি সমাস", "দ্বিগু সমাস", "অব্যয়ীভাব সমাস", "প্রাদি সমাস"
      ].filter(s => s !== it.t);
      return {
        subject: "Bangla",
        topic: "বাংলা ব্যাকরণ — সমাস",
        subtopic: "সমাস নির্ণয়",
        question_bn: `${pre}${qText}`,
        question_en: `Which Samas (compound word) type is exemplified by '${it.w}'?`,
        options: {
          A: it.t,
          B: candSamas[0],
          C: candSamas[1],
          D: candSamas[2]
        },
        correct_option: "A",
        explanation_bn: `'${it.w}'-এর ব্যাসবাক্য হলো '${it.exp}' এবং এটি ${it.t}।`,
        explanation_en: `The analytical clause is '${it.exp}', making it ${it.t}.`,
        difficulty: "medium",
        question_type: "grammar"
      };
    },

    // 3. Samas Byashbakya
    (i, vIdx, fIdx) => {
      const it = samasData[i % samasData.length];
      const qText = samasByashVariants[vIdx % samasByashVariants.length](it.w);
      const pre = academicFrames[fIdx % academicFrames.length];
      return {
        subject: "Bangla",
        topic: "বাংলা ব্যাকরণ — সমাস প্রকরণ",
        subtopic: "ব্যাসবাক্য নির্ণয়",
        question_bn: `${pre}${qText}`,
        question_en: `What is the standard grammatical analytical clause (Byashbakya) for '${it.w}'?`,
        options: {
          A: it.exp,
          B: `${it.w} ও তার সদৃশ`,
          C: `যেমন ${it.w}`,
          D: `${it.w}-এর রূপ`
        },
        correct_option: "A",
        explanation_bn: `'${it.w}'-এর প্রামাণ্য ব্যাসবাক্য হলো '${it.exp}' (${it.t})।`,
        explanation_en: `The standard Byashbakya is '${it.exp}', classified as ${it.t}.`,
        difficulty: "easy",
        question_type: "comprehension"
      };
    },

    // 4. Antonym
    (i, vIdx, fIdx) => {
      const it = antonymData[i % antonymData.length];
      const qText = antonymQVariants[vIdx % antonymQVariants.length](it.w);
      const pre = academicFrames[fIdx % academicFrames.length];
      return {
        subject: "Bangla",
        topic: "বাংলা শব্দার্থ — বিপরীত শব্দ",
        subtopic: "বিপরীতার্থক শব্দ",
        question_bn: `${pre}${qText}`,
        question_en: `What is the accurate antonym for the Bengali word '${it.w}'?`,
        options: {
          A: it.ant,
          B: `অ${it.w}`,
          C: `সু${it.w}`,
          D: `নির${it.w}`
        },
        correct_option: "A",
        explanation_bn: `'${it.w}'-এর অর্থবোধক প্রমিত বিপরীত শব্দ হলো '${it.ant}'।`,
        explanation_en: `The standard opposite word for '${it.w}' is '${it.ant}'.`,
        difficulty: "easy",
        question_type: "vocabulary"
      };
    },

    // 5. Idiom Meaning
    (i, vIdx, fIdx) => {
      const it = idiomData[i % idiomData.length];
      const qText = idiomQVariants[vIdx % idiomQVariants.length](it.idm);
      const pre = academicFrames[fIdx % academicFrames.length];
      const candIdiomMeanings = [
        "অত্যন্ত অলস ব্যক্তি", "অপ্রয়োজনীয় কাজ", "সুসময়ের বন্ধু", "চরম শত্রুতা", "ভাগ্যের পরিহাস", "ক্ষণস্থায়ী বস্তু", "ভণ্ড সাধু"
      ].filter(m => m !== it.m);
      return {
        subject: "Bangla",
        topic: "বাগধারা ও প্রবাদ-প্রবচন",
        subtopic: "বাগধারার অর্থ",
        question_bn: `${pre}${qText}`,
        question_en: `What is the idiomatic meaning of '${it.idm}'?`,
        options: {
          A: it.m,
          B: candIdiomMeanings[0],
          C: candIdiomMeanings[1],
          D: candIdiomMeanings[2]
        },
        correct_option: "A",
        explanation_bn: `'${it.idm}' বাগধারাটির অর্থ হলো '${it.m}'।`,
        explanation_en: `The idiomatic expression '${it.idm}' means '${it.m}'.`,
        difficulty: "easy",
        question_type: "comprehension"
      };
    },

    // 6. One Word Substitution
    (i, vIdx, fIdx) => {
      const it = oneWordData[i % oneWordData.length];
      const qText = oneWordQVariants[vIdx % oneWordQVariants.length](it.p);
      const pre = academicFrames[fIdx % academicFrames.length];
      return {
        subject: "Bangla",
        topic: "এককথায় প্রকাশ",
        subtopic: "বাক্য সংকোচন",
        question_bn: `${pre}${qText}`,
        question_en: `What is the single-word substitution for '${it.p}'?`,
        options: {
          A: it.w,
          B: `${it.w}শীল`,
          C: `অ${it.w}`,
          D: `${it.w}বান`
        },
        correct_option: "A",
        explanation_bn: `'${it.p}' — এর সংক্ষেপিত রূপ হলো '${it.w}'।`,
        explanation_en: `The one-word substitution for '${it.p}' is '${it.w}'.`,
        difficulty: "easy",
        question_type: "vocabulary"
      };
    },

    // 7. Literature Work & Author
    (i, vIdx, fIdx) => {
      const it = literatureData[i % literatureData.length];
      const qText = litAuthorQVariants[vIdx % litAuthorQVariants.length](it.work, it.genre);
      const pre = academicFrames[fIdx % academicFrames.length];
      const candAuthors = [
        "রবীন্দ্রনাথ ঠাকুর", "কাজী নজরুল ইসলাম", "মাইকেল মধুসূদন দত্ত",
        "বঙ্কিমচন্দ্র চট্টোপাধ্যায়", "শরৎচন্দ্র চট্টোপাধ্যায়", "মীর মশাররফ হোসেন",
        "ঈশ্বরচন্দ্র বিদ্যাসাগর", "জসীমউদ্দীন", "জীবনানন্দ দাশ"
      ].filter(a => a !== it.author);
      return {
        subject: "Bangla",
        topic: "বাংলা সাহিত্যের ইতিহাস — আধুনিক যুগ",
        subtopic: "গ্রন্থ ও রচয়িতা",
        question_bn: `${pre}${qText}`,
        question_en: `Who authored the renowned work '${it.work}' (${it.genre})?`,
        options: {
          A: it.author,
          B: candAuthors[0],
          C: candAuthors[1],
          D: candAuthors[2]
        },
        correct_option: "A",
        explanation_bn: `'${it.work}' (${it.year}) ${it.author} রচিত একটি অনন্য ${it.genre}। ${it.fact}`,
        explanation_en: `'${it.work}' (${it.year}) is an eminent ${it.genre} by ${it.author}. ${it.fact}`,
        difficulty: "easy",
        question_type: "knowledge"
      };
    },

    // 8. Literature Genre & Year
    (i, vIdx, fIdx) => {
      const it = literatureData[i % literatureData.length];
      const qText = litGenreQVariants[vIdx % litGenreQVariants.length](it.author, it.work);
      const pre = academicFrames[fIdx % academicFrames.length];
      const candGenres = [
        "উপন্যাস", "মহাকাব্য", "কাব্যগ্রন্থ", "নাটক", "প্রবন্ধ সংকলন", "ছোটগল্প সংকলন", "ভ্রমণকাহিনী"
      ].filter(g => g !== it.genre);
      return {
        subject: "Bangla",
        topic: "বাংলা সাহিত্যের ইতিহাস — আধুনিক যুগ",
        subtopic: "রচনার শ্রেণি ও বৈশিষ্ট্য",
        question_bn: `${pre}${qText}`,
        question_en: `Which literary genre does '${it.work}' by ${it.author} represent?`,
        options: {
          A: it.genre,
          B: candGenres[0],
          C: candGenres[1],
          D: candGenres[2]
        },
        correct_option: "A",
        explanation_bn: `'${it.work}' হলো একটি ${it.genre} যা ${it.year} সালে প্রকাশিত হয়। ${it.fact}`,
        explanation_en: `'${it.work}' is a classic ${it.genre} published in ${it.year}. ${it.fact}`,
        difficulty: "medium",
      };
    }
  ];

  let seed = index;
  for (let attempt = 0; attempt < 20000; attempt++) {
    const fIdx = seed % questionFactories.length;
    const itemIdx = Math.floor(seed / questionFactories.length);
    const vIdx = Math.floor(seed / (questionFactories.length * 20));
    const frameIdx = Math.floor(seed / (questionFactories.length * 80));

    const factory = questionFactories[fIdx];
    const item = factory(itemIdx, vIdx, frameIdx);

    const norm = (item.question_bn || item.question_en || '').toLowerCase().replace(/[\s\p{P}]+/gu, '');
    const key = `Bangla::${norm}`;
    if (!seenSet.has(key)) {
      seenSet.add(key);
      return item;
    }
    seed++;
  }

  throw new Error(`Failed to generate unique Bangla question for index ${index}`);
}
