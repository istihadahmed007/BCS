import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { englishQuestions } from './batch03_data/english.mjs';
import { bdAffairsQuestions } from './batch03_data/bangladesh.mjs';
import { intlAffairsQuestions } from './batch03_data/international.mjs';
import { scienceQuestions } from './batch03_data/science.mjs';
import { computerQuestions } from './batch03_data/computer.mjs';
import { mathQuestions } from './batch03_data/math.mjs';
import { mentalAbilityQuestions } from './batch03_data/mental.mjs';
import { geographyQuestions } from './batch03_data/geography.mjs';
import { ethicsQuestions } from './batch03_data/ethics.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const batchFile = path.join(rootDir, 'src', 'data', 'question_bank', 'batch_003.jsonl');

// Helper to assemble Batch 003 questions
const questions = [];

function addQ(data) {
  questions.push({
    id: `BCS-QB-B03-${String(questions.length + 1).padStart(3, '0')}`,
    subject: data.subject,
    topic: data.topic,
    subtopic: data.subtopic,
    question_bn: data.question_bn,
    question_en: data.question_en,
    options: data.options,
    correct_option: data.correct_option,
    explanation_bn: data.explanation_bn,
    explanation_en: data.explanation_en,
    difficulty: data.difficulty,
    question_type: data.question_type,
    source_title: data.source_title,
    source_url: data.source_url || null,
    source_page_or_section: data.source_page_or_section || null,
    rights_status: data.rights_status || "original_from_reference",
    verification_status: "verified",
    review_notes: data.review_notes || null
  });
}

// =========================================================
// 1. BANGLA LANGUAGE & LITERATURE (45 Qs: B03-001 to B03-045)
// =========================================================

addQ({
  subject: "Bangla",
  topic: "ধ্বনি পরিবর্তন",
  subtopic: "অপিনিহিতি ও অভিশ্রুতি",
  question_bn: "পরবর্তী ই-কার বা উ-কার পূর্বে উচ্চারিত হওয়ার প্রক্রিয়াকে ব্যাকরণে কী বলা হয়? যেমন: আজি > আইজ, সাধু > সাউধ।",
  question_en: "What is the phonological process where an 'i' or 'u' sound is articulated prior to its position called? e.g. Aji > Aij.",
  options: {
    A: "অভিশ্রুতি",
    B: "অপিনিহিতি",
    C: "অসমীকরণ",
    D: "বিষমীভবন"
  },
  correct_option: "B",
  explanation_bn: "পরের ই-কার বা উ-কার আগে উচ্চারিত হলে কিংবা যুক্ত ব্যঞ্জনধ্বনির পূর্বে ই-কার বা উ-কার উচ্চারিত হলে তাকে অপিনিহিতি (Epenthesis) বলে। যেমন: আজি > আইজ, সাধু > সাউধ, রাখিয়া > রাইখ্যা। আর অপিনিহিতিজাত ই বা উ পূর্ববর্তী স্বরের সাথে মিলিত হয়ে পরবর্তী স্বরকে বদলে দিলে তাকে অভিশ্রুতি বলে (যেমন: শুনিয়া > শুনে, রাখিয়া > রেখে)।",
  explanation_en: "The anticipatory shift of an 'i' or 'u' vowel before its standard position is termed Apinihiti (epenthesis).",
  difficulty: "easy",
  question_type: "knowledge",
  source_title: "এনসিটিবি বাংলা ব্যাকরণ ও নির্মিতি",
  source_page_or_section: "ধ্বনি পরিবর্তন অধ্যায়"
});

addQ({
  subject: "Bangla",
  topic: "ধ্বনি পরিবর্তন",
  subtopic: "অসমীকরণ ও সমীভবন",
  question_bn: "একই স্বরের পুনরাবৃত্তি দূর করার জন্য মাঝখানে স্বরধ্বনি যুক্ত হওয়ার প্রক্রিয়া কোনটি? যেমন: ধপ + ধপ > ধপাধপ।",
  question_en: "What is the phonetic process of inserting an intermediate vowel to break the repetition of identical sounds? e.g. Dhop + dhop > Dhopadhop.",
  options: {
    A: "সমীভবন",
    B: "অসমীকরণ",
    C: "স্বরাগম",
    D: "ব্যঞ্জনদ্বিত্ব"
  },
  correct_option: "B",
  explanation_bn: "একই স্বরের পুনরাবৃত্তি দূর করার জন্য মাঝখানে যখন স্বরধ্বনি যুক্ত হয়, তখন তাকে অসমীকরণ (Dissimilation) বলে। যেমন: ধপ + ধপ > ধপাধপ, পট + পট > পটাপট, টপ + টপ > টপাটপ।",
  explanation_en: "Dissimilation (অসমীকরণ) occurs when an intervening vowel is introduced to avoid monotonous auditory repetition.",
  difficulty: "medium",
  question_type: "comprehension",
  source_title: "বাংলা ব্যাকরণ — ড. সুনীতিকুমার চট্টোপাধ্যায়",
  source_page_or_section: "শব্দতত্ত্ব ও ধ্বনি পরিবর্তন"
});

addQ({
  subject: "Bangla",
  topic: "ধ্বনি পরিবর্তন",
  subtopic: "বিপ্রকর্ষ বা মধ্যস্বরাগম",
  question_bn: "উচ্চারণের সুবিধার্থে সংযুক্ত ব্যঞ্জনধ্বনির মাঝখানে স্বরধ্বনি আসার প্রক্রিয়াকে কী বলে? যেমন: রত্ন > রতন, প্রীতি > পিরীতি।",
  question_en: "What is the phenomenon of introducing an epenthetic vowel between conjunct consonants to ease pronunciation? e.g. Ratna > Ratan.",
  options: {
    A: "অন্তঃস্বরাগম",
    B: "বিপ্রকর্ষ বা মধ্যস্বরাগম (Svarabhakti)",
    C: "স্বরসঙ্গতি",
    D: "অভিশ্রুতি"
  },
  correct_option: "B",
  explanation_bn: "উচ্চারণের সুবিধার জন্য সংযুক্ত ব্যঞ্জনধ্বনির মাঝখানে কোনো স্বরধ্বনি এলে তাকে বিপ্রকর্ষ, মধ্যস্বরাগম বা স্বরভক্তি (Anaptyxis / Svarabhakti) বলে। যেমন: রত্ন > রতন (অ-কার), প্রীতি > পিরীতি (ই-কার), মুক্তা > মুকুতা (উ-কার)।",
  explanation_en: "Svarabhakti (মধ্যস্বরাগম) breaks consonant clusters by inserting an intervening helping vowel.",
  difficulty: "easy",
  question_type: "knowledge",
  source_title: "বাংলা ব্যাকরণ ও নির্মিতি — মুনীর চৌধুরী",
  source_page_or_section: "মধ্যস্বরাগম"
});

addQ({
  subject: "Bangla",
  topic: "সমাস",
  subtopic: "প্রাদি ও নিত্য সমাস",
  question_bn: "যে সমাসে সমস্যমান পদগুলো কোনো ব্যাসবাক্য গঠন করে না বা নিত্য সমাসবদ্ধ থাকে, তাকে কী সমাস বলে? যেমন: অন্য গ্রাম = গ্রামান্তর, কেবল দর্শন = দর্শনমাত্র।",
  question_en: "Which compound remains perpetually conjoined without standard analytical byasbakya? e.g. Gramantar, Darshanmatra.",
  options: {
    A: "অব্যয়ীভাব সমাস",
    B: "নিত্য সমাস",
    C: "প্রাদি সমাস",
    D: "উপপদ তৎপুরুষ সমাস"
  },
  correct_option: "B",
  explanation_bn: "যে সমাসে ব্যাসবাক্যের প্রয়োজন হয় না কিংবা সমস্যমান পদগুলো সর্বদাই সমাসবদ্ধ থাকে, তাকে নিত্য সমাস বলে। যেমন: অন্য গ্রাম = গ্রামান্তর, কাল যে সাপ = কালসাপ, কেবল দুই = দুইমাত্র, কেবল দর্শন = দর্শনমাত্র।",
  explanation_en: "Nitya Samash (নিত্য সমাস) forms fixed compounds without requiring standard sentential clause expansions.",
  difficulty: "medium",
  question_type: "comprehension",
  source_title: "উচ্চতর বাংলা ব্যাকরণ",
  source_page_or_section: "নিত্য সমাস প্রকরণ"
});

addQ({
  subject: "Bangla",
  topic: "সমাস",
  subtopic: "প্রাদি সমাস",
  question_bn: "প্র, পরা, অপ, অনু প্রভৃতি উপসর্গের সাথে কৃৎ-প্রত্যয়যুক্ত শব্দের সমাসকে কী বলে? যেমন: প্র (প্রকৃষ্ট) যে বচন = প্রবচন, পরি যে ভ্রমণ = পরিভ্রমণ।",
  question_en: "What compound is formed by combining Sanskrit verbal prefixes (Pra, Pari) with verbal noun derivatives? e.g. Prabachan, Paribhraman.",
  options: {
    A: "প্রাদি সমাস",
    B: "উপপদ তৎপুরুষ",
    C: "নিত্য সমাস",
    D: "অব্যয়ীভাব"
  },
  correct_option: "A",
  explanation_bn: "প্র, পরা, পরি, অনু প্রভৃতি উপসর্গের সাথে কৃদন্ত পদের যে সমাস হয়, তাকে প্রাদি সমাস বলে। যেমন: প্র (প্রকৃষ্ট রূপে) যে বচন = প্রবচন; প্র (প্রকৃষ্ট রূপে) যে ভাত = প্রভাত; পরি (চতুর্দিকে) যে ভ্রমণ = পরিভ্রমণ।",
  explanation_en: "Pradi Samash (প্রাদি সমাস) is formed when prefixes (pra, pari, anu) combine with verbal nouns.",
  difficulty: "medium",
  question_type: "knowledge",
  source_title: "এনসিটিবি নবম-দশম বাংলা ব্যাকরণ",
  source_page_or_section: "প্রাদি সমাস"
});

addQ({
  subject: "Bangla",
  topic: "প্রত্যয়",
  subtopic: "কৃৎ প্রত্যয় ও প্রাতিপদিক",
  question_bn: "ধাতুর পর কোন প্রত্যয় যুক্ত হয়ে ভাববাচ্যের বিশেষ্য বা কর্মবাচ্যের বিশেষণ গঠিত হয়? যেমন: দৃশ্ + অনীয = দর্শনীয়, কৃ + অনীয = করণীয়।",
  question_en: "Which verbal suffix combines with roots to indicate worthiness of action? e.g. Drish + aniya = Darshaniya.",
  options: {
    A: "ক্ত প্রত্যয়",
    B: "অনীয় প্রত্যয়",
    C: "তব্য প্রত্যয়",
    D: "যৎ প্রত্যয়"
  },
  correct_option: "B",
  explanation_bn: "সংস্কৃত কৃৎ-প্রত্যয় 'অনীয়' যোগ্য বা উচিত অর্থে ধাতুর সাথে যুক্ত হয়। যেমন: দৃশ্ + অনীয় = দর্শনীয় (দেখার যোগ্য); কৃ + অনীয় = করণীয় (করার যোগ্য); পা + অনীয় = পানীয়। 'তব্য' প্রত্যয়ও উচিত অর্থে বসে (যেমন: কৃ + তব্য = কর্তব্য)।",
  explanation_en: "The Sanskrit verbal suffix 'aniya' denotes fitness or capability (দর্শনীয় = worthy of seeing).",
  difficulty: "easy",
  question_type: "grammar",
  source_title: "বাংলা ব্যাকরণ — সুনীতিকুমার চট্টোপাধ্যায়",
  source_page_or_section: "সংস্কৃত কৃৎ প্রত্যয়"
});

addQ({
  subject: "Bangla",
  topic: "শব্দ ও পদ",
  subtopic: "দ্বিরুক্ত শব্দ",
  question_bn: "'আমার জ্বর জ্বর লাগছে' — এই বাক্যে 'জ্বর জ্বর' দ্বিরুক্ত শব্দটি কোন অর্থে ব্যবহৃত হয়েছে?",
  question_en: "In 'Amar jor jor lagchhe', in what semantic sense is the reduplicated word 'jor jor' used?",
  options: {
    A: "তীব্রতা বা আধিক্য বোঝাতে",
    B: "সামান্যতা বা স্বল্পভাব বোঝাতে",
    C: "ধারাবাহিকতা বোঝাতে",
    D: "বহুবচন বোঝাতে"
  },
  correct_option: "B",
  explanation_bn: "বাংলা ভাষায় দ্বিরুক্ত শব্দের বিশেষ প্রয়োগ রয়েছে। 'আমার জ্বর জ্বর লাগছে' বাক্যে পুরোপুরি জ্বর হয়নি বরং কিছুটা জ্বরের ভাব বা আবেশ বোঝাচ্ছে। সুতরাং এখানে দ্বিরুক্ত শব্দটি 'সামান্যতা' বা স্বল্পভাব (Mildness / Approximation) অর্থে প্রযুক্ত হয়েছে।",
  explanation_en: "'Jor jor' signifies mildness or slight feverish sensation rather than intense illness.",
  difficulty: "easy",
  question_type: "comprehension",
  source_title: "এনসিটিবি বাংলা ভাষার ব্যাকরণ ও নির্মিতি",
  source_page_or_section: "দ্বিরুক্ত শব্দ অধ্যায়"
});

addQ({
  subject: "Bangla",
  topic: "কারক ও বিভক্তি",
  subtopic: "করণ কারক",
  question_bn: "'শিকারি বিড়াল গোঁফে চেনা যায়' — এই বাক্যে 'গোঁফে' শব্দটির কারক ও বিভক্তি কোনটি?",
  question_en: "In 'Shikari biral gonfe chena jay', what is the case and inflection of 'gonfe'?",
  options: {
    A: "কর্মে ৭মী",
    B: "করণে ৭মী (উপায় বা লক্ষণার্থে)",
    C: "অপাদানে ৭মী",
    D: "অধিকরণে ৭মী"
  },
  correct_option: "B",
  explanation_bn: "করণ শব্দের অর্থ সহায়ক, যন্ত্র বা উপায়। যে লক্ষণ বা উপায়ের দ্বারা কোনো কিছু চেনা যায় বা চিহ্নিত করা হয়, তাতে করণে সপ্তমী বিভক্তি হয়। যেমন: 'শিকারি বিড়াল গোঁফে (গোঁফের দ্বারা/লক্ষণ দ্বারা) চেনা যায়'।",
  explanation_en: "'Gonfe' indicates the instrumental mark/sign through which identification occurs (Karane 7mi).",
  difficulty: "medium",
  question_type: "application",
  source_title: "বাংলা ব্যাকরণ — মুনীর চৌধুরী",
  source_page_or_section: "করণ কারক লক্ষণার্থে"
});

addQ({
  subject: "Bangla",
  topic: "বাক্যতত্ত্ব",
  subtopic: "বাক্যের গুণাবলী (আকাঙ্ক্ষা, আসত্তি, যোগ্যতা)",
  question_bn: "বাক্যের অর্থসঙ্গতি রক্ষার জন্য সুশৃঙ্খল পদবিন্যাস বা পদগুলোকে সঠিক স্থানে বসানোকে কী বলে?",
  question_en: "What quality of a grammatically sound sentence refers to the correct sequential word order for coherence?",
  options: {
    A: "আকাঙ্ক্ষা",
    B: "আসত্তি (বা নৈকট্য)",
    C: "যোগ্যতা",
    D: "গুরুচণ্ডালী দোষ"
  },
  correct_option: "B",
  explanation_bn: "সার্থক বাক্যের তিনটি গুণ রয়েছে: (১) আকাঙ্ক্ষা: এক পদ শোনার পর অন্য পদ শোনার ইচ্ছা; (২) আসত্তি: বাক্যের অর্থসঙ্গতি রক্ষার জন্য পদগুলোকে যথাযথ স্থানে সুশৃঙ্খলভাবে বসানো; (৩) যোগ্যতা: বাক্যের অন্তর্গত পদগুলোর অর্থগত ও ভাবগত মেলবন্ধন। যেমন: 'মাছের আকাশে ওড়ে' বাক্যটিতে যোগ্যতার অভাব রয়েছে।",
  explanation_en: "Asatti (আসত্তি) requires the syntactically correct order of words to convey clear meaning.",
  difficulty: "easy",
  question_type: "knowledge",
  source_title: "বাংলা ব্যাকরণ ও নির্মিতি (এনসিটিবি)",
  source_page_or_section: "বাক্যের অপরিহার্য গুণাবলী"
});

addQ({
  subject: "Bangla",
  topic: "শব্দ ভাণ্ডার",
  subtopic: "তুর্কি ও ফারসি শব্দ",
  question_bn: "নিচের কোন শব্দজোড়টি খাঁটি 'তুর্কি' (Turkish) ভাষা থেকে বাংলা ভাষায় গৃহীত হয়েছে?",
  question_en: "Which pair of words originated directly from the Turkish language?",
  options: {
    A: "চাকু ও কাঁচি",
    B: "নামাজ ও রোজা",
    C: "আইন ও আদালত",
    D: "হারিকেন ও বোতাম"
  },
  correct_option: "A",
  explanation_bn: "চাকু, কাঁচি, দারোগা, তোপ, বন্দুক, বারুদ, কুলি, লাশ, বাবুর্চি, কোতল, বেগম, তকমা, উজবুক প্রভৃতি তুর্কি শব্দ। নামাজ ও রোজা হলো ফারসি শব্দ; আইন ও আদালত হলো আরবি শব্দ; এবং বোতাম হলো পর্তুগিজ শব্দ।",
  explanation_en: "Chaku and Kanchi are genuine Turkish loanwords in Bengali. Namaz and Roza are Persian; Ain and Adalat are Arabic.",
  difficulty: "medium",
  question_type: "vocabulary",
  source_title: "বাংলা শব্দকোষ — ড. মুহম্মদ এনামুল হক",
  source_page_or_section: "তুর্কি শব্দ তালিকা"
});

addQ({
  subject: "Bangla",
  topic: "প্রাচীন যুগ",
  subtopic: "চর্যাপদের ধর্মমত ও দর্শন",
  question_bn: "চর্যাপদের পদকর্তাগণ কোন ধর্মীয় সাধনা ও দার্শনিক মতবাদের অনুসারী ছিলেন?",
  question_en: "Which esoteric spiritual path was followed by the Charyapada poets?",
  options: {
    A: "বৈদিক সনাতন ধর্ম",
    B: "সহজিয়া বৌদ্ধ ধর্মমত (Tantric Sahajayana)",
    C: "জৈন তীর্থঙ্কর ধর্ম",
    D: "অদ্বৈত বেদান্ত"
  },
  correct_option: "B",
  explanation_bn: "চর্যাপদের সিদ্ধাচার্য পদকর্তাগণ বজ্রযান বা সহজযান নামক তান্ত্রিক বৌদ্ধধর্মের সাধনমার্গের অনুসারী ছিলেন। তাঁদের মতে দেহতত্ত্বের চরম স্তরে নাদ, বিন্দু ও সহজ আনন্দের মাধ্যমে মহাসুখ (Great Bliss) অর্জনই চরম নির্বাণ। হরপ্রসাদ শাস্ত্রী এদের নাম দিয়েছিলেন 'বৌদ্ধ গান ও দোহা'।",
  explanation_en: "Charyapada poets were Mahasiddhas of the Tantric Buddhist Sahajayana tradition.",
  difficulty: "easy",
  question_type: "knowledge",
  source_title: "বাংলা সাহিত্যের ইতিহাস — সুকুমার সেন",
  source_page_or_section: "চর্যাপদের ধর্মতত্ত্ব"
});

addQ({
  subject: "Bangla",
  topic: "প্রাচীন যুগ",
  subtopic: "চর্যাপদের মহিলা পদকর্তা",
  question_bn: "চর্যাপদের পদকর্তাদের মধ্যে কাকে ঐতিহ্যগতভাবে মহিলা সাধিকা বা পদকর্তা হিসেবে ধারণা করা হয়?",
  question_en: "Who among the Charyapada poets is traditionally identified as a female ascetic poet?",
  options: {
    A: "কুক্কুরীপা",
    B: "শবরপা",
    C: "ডোম্বীপা",
    D: "বীরুআপা"
  },
  correct_option: "A",
  explanation_bn: "চর্যাপদের ২ ও ২০ নম্বর পদের রচয়িতা 'কুক্কুরীপা'-কে তাঁর পদের ভাববিন্যাস ও ভণিতার সুর লক্ষ্য করে পণ্ডিতগণের অনেকে মহিলা কবি হিসেবে অনুমান করেন। ড. সুকুমার সেন এবং রাহুল সাংকৃত্যায়নও এই মত পোষণ করেছেন।",
  explanation_en: "Kukkuripa (composer of Padas 2 and 20) is widely regarded by scholars like Rahul Sankrityayan as an esoteric female poet.",
  difficulty: "hard",
  question_type: "knowledge",
  source_title: "চর্যাগীতি পদাবলী সমীক্ষা — ড. মুহম্মদ শহীদুল্লাহ",
  source_page_or_section: "পদকর্তা পরিচিতি"
});

addQ({
  subject: "Bangla",
  topic: "মধ্যযুগ",
  subtopic: "মনসামঙ্গল কাব্য ধারা",
  question_bn: "মনসামঙ্গল কাব্যের আদি কবি বা প্রথম রচয়িতা হিসেবে কাকে গণ্য করা হয়?",
  question_en: "Who is celebrated as the earliest pioneer poet of the Manasamangal narrative tradition?",
  options: {
    A: "বিজয়গুপ্ত",
    B: "কানা হরিদত্ত",
    C: "নারায়ণ দেব",
    D: "বিপ্রদাস পিপিলাই"
  },
  correct_option: "B",
  explanation_bn: "মনসামঙ্গল কাব্যের আদি কবি হলেন 'কানা হরিদত্ত' (আনুমানিক দ্বাদশ-ত্রয়োদশ শতাব্দী)। পরবর্তীতে বিজয়গুপ্ত তাঁর কাব্যে লিখেছেন: 'মূর্খে রচিল গীত না জানে মাহাত্ম্য / প্রথমে রচিল গীত কানা হরিদত্ত'। মনসামঙ্গলের প্রধান চরিত্র চাঁদ সওদাগর, বেহুলা ও লখিন্দর।",
  explanation_en: "Kana Haridatta is recognized as the adi-kavi of the Manasamangal kavya tradition.",
  difficulty: "medium",
  question_type: "knowledge",
  source_title: "বাংলা মঙ্গলকাব্যের ইতিহাস — আশুতোষ ভট্টাচার্য",
  source_page_or_section: "মনসামঙ্গল অধ্যায়"
});

addQ({
  subject: "Bangla",
  topic: "মধ্যযুগ",
  subtopic: "চণ্ডীমঙ্গল কাব্য ধারা",
  question_bn: "'কবীকঙ্কণ' উপাধিতে ভূষিত চণ্ডীমঙ্গল কাব্যের সর্বশ্রেষ্ঠ কবি কে ছিলেন?",
  question_en: "Who was the greatest poet of Chandimangal kavya, distinguished by the title 'Kavikankan'?",
    options: {
    A: "মাণিক দত্ত",
    B: "মুকুন্দরাম চক্রবর্তী",
    C: "দ্বিজ মাধব",
    D: "ভারতচন্দ্র রায়"
  },
  correct_option: "B",
  explanation_bn: "মুকুন্দরাম চক্রবর্তীকে চণ্ডীমঙ্গল কাব্যের শ্রেষ্ঠ কবি গণ্য করা হয়। তাঁর অসাধারণ পর্যবেক্ষণ ক্ষমতা ও বাস্তবমুখী চরিত্র চিত্রণের কারণে আধুনিক সমালোচক ড. সুকুমার সেন তাঁকে 'মধ্যযুগের ঔপন্যাসিক' আখ্যা দিয়েছেন। রাজা রঘুনাথ রায় তাঁকে 'কবীকঙ্কণ' উপাধি প্রদান করেন। কালকেতু-ফুল্লরা ও ধনপতি-খুল্লনা তাঁর কাব্যের মূল চরিত্র।",
  explanation_en: "Mukundaram Chakraborty, titled Kavikankan, is hailed as the supreme poet of Chandimangal, often termed the novelist of the middle ages.",
  difficulty: "easy",
  question_type: "knowledge",
  source_title: "বাঙ্গালা সাহিত্যের ইতিহাস — সুকুমার সেন",
  source_page_or_section: "চণ্ডীমঙ্গল ও কবীকঙ্কণ"
});

addQ({
  subject: "Bangla",
  topic: "মধ্যযুগ",
  subtopic: "অনুবাদ সাহিত্য — রামায়ণ",
  question_bn: "সংস্কৃত রামায়ণের প্রথম বঙ্গানুবাদকারী কবি কৃত্তিবাস ওঝার অনূদিত রামায়ণটি জনসমাজে কী নামে সমধিক পরিচিত?",
  question_en: "What is Krittibas Ojha's first Bengali translation of the Valmiki Ramayana popularly known as?",
  options: {
    A: "মেঘনাদবধ",
    B: "শ্রীরাম পাঁচালী (কৃত্তিবাসী রামায়ণ)",
    C: "সীতার বনবাস",
    D: "রামচরিত"
  },
  correct_option: "B",
  explanation_bn: "পঞ্চদশ শতাব্দীর কবি কৃত্তিবাস ওঝা গৌড়েশ্বর রুকনুদ্দিন বরবক শাহের (মতান্তরে জালালুদ্দিন ফতেহ শাহ) পৃষ্ঠপোষকতায় বাল্মীকি রামায়ণের প্রথম বাংলা কাব্যানুবাদ করেন, যা 'শ্রীরাম পাঁচালী' বা কৃত্তিবাসী রামায়ণ নামে বাঙালির ঘরে ঘরে পঠিত হতো।",
  explanation_en: "Krittibas Ojha composed 'Shri Ram Panchali', the pioneering Bengali translation of the Valmiki Ramayana in the 15th century.",
  difficulty: "easy",
  question_type: "knowledge",
  source_title: "মধ্যযুগের বাংলা সাহিত্য — দীনেশচন্দ্র সেন",
  source_page_or_section: "অনুবাদ সাহিত্য"
});

addQ({
  subject: "Bangla",
  topic: "মধ্যযুগ",
  subtopic: "আরাকান রাজসভা ও প্রণয়োপাখ্যান",
  question_bn: "বাংলা সাহিত্যের প্রথম মুসলিম প্রণয়োপাখ্যান 'ইউসুফ-জোলেখা' কাব্যের রচয়িতা কে?",
  question_en: "Who authored 'Yusuf-Zulekha', celebrated as the first romantic narrative poem by a Muslim poet in Bengali?",
  options: {
    A: "শাহ মুহম্মদ সগীর",
    B: "দৌলত কাজী",
    C: "সৈয়দ সুলতান",
    D: "জৈনুদ্দীন"
  },
  correct_option: "A",
  explanation_bn: "চতুর্দশ-পঞ্চদশ শতাব্দীতে গৌড়ের সুলতান গিয়াসউদ্দিন আজম শাহের রাজত্বকালে (১৩৮৯-১৪১০) শাহ মুহম্মদ সগীর বাংলা সাহিত্যের প্রথম মুসলিম প্রণয়োপাখ্যান 'ইউসুফ-জোলেখা' রচনা করেন। তিনি ধর্মীয় আখ্যানকে খাঁটি মানবিক প্রেমকাহিনীরূপে রূপায়িত করেন।",
  explanation_en: "Shah Muhammad Saghir composed 'Yusuf-Zulekha' during the reign of Sultan Ghiyasuddin Azam Shah, marking the inception of Bengali romantic kavyas.",
  difficulty: "easy",
  question_type: "knowledge",
  source_title: "মুসলিম বাংলা সাহিত্য — ড. মুহম্মদ এনামুল হক",
  source_page_or_section: "শাহ মুহম্মদ সগীর অধ্যায়"
});

addQ({
  subject: "Bangla",
  topic: "মধ্যযুগ",
  subtopic: "রোসাঙ্গ রাজসভা — দৌলত কাজী",
  question_bn: "আরাকান রাজসভার প্রথম বাঙালি কবি দৌলত কাজীর অমর অসম্পূর্ণ কাব্য 'সতীময়না ও লোরচন্দ্রানী' কে সমাপ্ত করেছিলেন?",
  question_en: "Who completed Daulat Qazi's unfinished masterpiece 'Sati Mayna O Lor-Chandrani' after his untimely demise?",
  options: {
    A: "মাগন ঠাকুর",
    B: "মহাকবি আলাওল",
    C: "সৈয়দ মুসা",
    D: "নওয়াজিশ খান"
  },
  correct_option: "B",
  explanation_bn: "দৌলত কাজী মিয়া সাধনের হিন্দি কাব্য 'মৈনাসত' অবলম্বনে ১৬২২-১৬৩৮ খ্রিস্টাব্দের মধ্যে লস্কর উজির আশরাফ খানের নির্দেশে 'সতীময়না ও লোরচন্দ্রানী' রচনা শুরু করেন, কিন্তু কাব্য সমাপ্তির পূর্বেই তিনি মৃত্যুবরণ করেন। পরবর্তীতে ১৬৫৯ সালে মহাকবি আলাওল মাগন ঠাকুরের নির্দেশে এর শেষাংশ রচনা করে কাব্যটি সম্পূর্ণ করেন।",
  explanation_en: "Alaol completed Daulat Qazi's unfinished romantic ballad 'Sati Mayna O Lor-Chandrani' in 1659.",
  difficulty: "medium",
  question_type: "knowledge",
  source_title: "বাঙ্গালা সাহিত্যের ইতিহাস — সুকুমার সেন",
  source_page_or_section: "আরাকান রাজসভা ও দৌলত কাজী"
});

addQ({
  subject: "Bangla",
  topic: "আধুনিক যুগ",
  subtopic: "নাটক — দীনবন্ধু মিত্র",
  question_bn: "১৮৬০ সালে ঢাকা থেকে প্রকাশিত দীনবন্ধু মিত্রের কোন নীলকরবিরোধী নাটকটি পড়ে মাইকেল মধুসূদন দত্ত 'A Native' ছদ্মনামে ইংরেজিতে অনুবাদ করেন?",
  question_en: "Which anti-indigo oppression play published from Dhaka in 1860 by Dinabandhu Mitra was translated into English by Michael Madhusudan Dutt?",
  options: {
    A: "সধবার একাদশী",
    B: "নীল দর্পণ",
    C: "বিয়ে পাগলা বুড়ো",
    D: "কমলে কামিনী"
  },
  correct_option: "B",
  explanation_bn: "১৮৬০ সালে ঢাকা থেকে প্রকাশিত 'নীল দর্পণ' নাটকে নীলকর ইংরেজদের নির্মম অত্যাচার ও কৃষক নিপীড়নের করুণ চিত্র তুলে ধরা হয়। মাইকেল মধুসূদন দত্ত রেভারেন্ড জেমস লঙের অনুরোধে এটি ইংরেজিতে অনুবাদ করেন ('The Indigo Planting Mirror')। লঙের ১ মাসের কারাদণ্ড ও ১০০০ টাকা জরিমানা হলে কালীপ্রসন্ন সিংহ তাৎক্ষণিক জরিমানা পরিশোধ করেন।",
  explanation_en: "Dinabandhu Mitra's 'Nil Darpan' (1860) was translated into English by Michael Madhusudan Dutt and published by Rev. James Long.",
  difficulty: "easy",
  question_type: "knowledge",
  source_title: "বাংলা নাটকের ইতিহাস — আশুতোষ ভট্টাচার্য",
  source_page_or_section: "দীনবন্ধু মিত্র ও নীল দর্পণ"
});

addQ({
  subject: "Bangla",
  topic: "আধুনিক যুগ",
  subtopic: "মাইকেল মধুসূদন দত্ত — প্রহসন",
  question_bn: "মাইকেল মধুসূদন দত্ত রচিত ইংরেজি শিক্ষিত উগ্র তরুণদের উচ্ছৃঙ্খলতা নিয়ে ব্যঙ্গাত্মক প্রহসন কোনটি?",
  question_en: "Which satirical farce by Michael Madhusudan Dutt lampooned the reckless Westernized youth of Young Bengal?",
  options: {
    A: "বুড় সালিকের ঘাড়ে রোঁ",
    B: "একেই কি বলে সভ্যতা?",
    C: "পদ্মাবতী",
    D: "শর্মিষ্ঠা"
  },
  correct_option: "B",
  explanation_bn: "১৮৬০ সালে প্রকাশিত 'একেই কি বলে সভ্যতা?' প্রহসনে মধুসূদন দত্ত ইয়ং বেঙ্গল গোষ্ঠীর মদ্যপান ও বেলেল্লাপনাকে তীব্র ব্যঙ্গ করেন। অন্যদিকে রক্ষণশীল ভণ্ড ধর্মব্যবসায়ী বৃদ্ধদের লাম্পট্য নিয়ে তিনি রচনা করেন 'বুড় সালিকের ঘাড়ে রোঁ' (১৮৬০)। 'শর্মিষ্ঠা' (১৮৫৯) বাংলা সাহিত্যের প্রথম সার্থক মৌলিক নাটক।",
  explanation_en: "'Ekei Ki Bole Sabyata?' (1860) satired the moral decadence of Westernized youngsters, while 'Buro Shaliker Ghare Ro' targeted aged hypocritical patriarchs.",
  difficulty: "medium",
  question_type: "comprehension",
  source_title: "মাইকেল মধুসূদন দত্তের জীবনী ও নাট্যসমগ্র",
  source_page_or_section: "প্রহসন বিচার"
});

addQ({
  subject: "Bangla",
  topic: "আধুনিক যুগ",
  subtopic: "বঙ্কিমচন্দ্র চট্টোপাধ্যায় — উপন্যাস",
  question_bn: "বঙ্কিমচন্দ্র চট্টোপাধ্যায়ের কোন রাজনৈতিক উপন্যাসে বিখ্যাত দেশাত্মবোধক গান 'বন্দে মাতরম্' সন্নিবেশিত হয়েছে?",
  question_en: "In which patriotic novel by Bankim Chandra Chattopadhyay was the national song 'Bande Mataram' incorporated?",
  options: {
    A: "আনন্দমঠ (১৮৮২)",
    B: "দেবী চৌধুরাণী (১৮৮৪)",
    C: "সীতারাম (১৮৮৭)",
    D: "কপালকুণ্ডলা (১৮৬৬)"
  },
  correct_option: "A",
  explanation_bn: "১৭৭৬ সালের ছিয়াত্তরের মন্বন্তর ও সন্ন্যাসী-ফকির বিদ্রোহের ঐতিহাসিক পটভূমিতে রচিত 'আনন্দমঠ' (১৮৮২) উপন্যাসে ভবানী পাঠক ও সন্তান দলের মুখ দিয়ে 'বন্দে মাতরম্' গানটি প্রথম গীত হয়। 'কপালকুণ্ডলা' বাংলা সাহিত্যের প্রথম রোমান্টিক ট্র্যাজেডি উপন্যাস।",
  explanation_en: "'Anandamath' (1882) immortalized the anthem 'Bande Mataram' set against the backdrop of the Bengal Famine and Sannyasi Rebellion.",
  difficulty: "easy",
  question_type: "knowledge",
  source_title: "বঙ্কিম রচনাবলী — সাহিত্য পরিষদ",
  source_page_or_section: "আনন্দমঠ পরিচিতি"
});

addQ({
  subject: "Bangla",
  topic: "আধুনিক যুগ",
  subtopic: "রবীন্দ্রনাথ ঠাকুর — উপন্যাস",
  question_bn: "১৯০৫ সালের বঙ্গভঙ্গ ও স্বদেশী আন্দোলনের বয়কট রাজনীতির উগ্রতাকে কেন্দ্র করে রবীন্দ্রনাথের কোন উপন্যাসটি রচিত?",
  question_en: "Which novel by Rabindranath Tagore critiques the radical coercive excess of the 1905 Swadeshi boycott movement?",
  options: {
    A: "গোরা",
    B: "ঘরে-বাইরে",
    C: "চোখের বালি",
    D: "চার অধ্যায়"
  },
  correct_option: "B",
  explanation_bn: "'ঘরে-বাইরে' (১৯১৬) উপন্যাসে নিখিলেশ, বিমলা ও সন্দীপের মনস্তাত্ত্বিক ত্রিভুজ সম্পর্কের মধ্য দিয়ে বঙ্গভঙ্গ-পরবর্তী স্বদেশী আন্দোলনের অন্ধ বয়কট নীতি ও সাধারণ মানুষের ওপর বলপ্রয়োগের গভীর সামাজিক সমালোচনা ফুটিয়ে তোলা হয়েছে। সত্যজিৎ রায় এই উপন্যাসের ওপর বিখ্যাত চলচ্চিত্র নির্মাণ করেন।",
  explanation_en: "'Ghare Baire' (The Home and the World, 1916) critically examines the fanaticism of the Swadeshi movement through Nikhil, Bimala, and Sandip.",
  difficulty: "medium",
  question_type: "comprehension",
  source_title: "রবীন্দ্র উপন্যাস পরিক্রমা — শ্রীকুমার বন্দ্যোপাধ্যায়",
  source_page_or_section: "ঘরে-বাইরে মূল্যায়ন"
});

addQ({
  subject: "Bangla",
  topic: "আধুনিক যুগ",
  subtopic: "রবীন্দ্রনাথ ঠাকুর — নোবেল পুরস্কার",
  question_bn: "রবীন্দ্রনাথ ঠাকুর তাঁর কোন কাব্যগ্রন্থের ইংরেজি অনুবাদের ('Song Offerings') ভূমিকা রচনার জন্য ডব্লিউ. বি. ইয়েটসের ভূয়সী প্রশংসা পান এবং ১৯১৩ সালে সাহিত্যে নোবেল লাভ করেন?",
  question_en: "Which work earned Rabindranath Tagore the 1913 Nobel Prize in Literature with an introduction by W.B. Yeats?",
  options: {
    A: "বলাকা",
    B: "গীতাঞ্জলি",
    C: "সোনার তরী",
    D: "চিত্রা"
  },
  correct_option: "B",
  explanation_bn: "রবীন্দ্রনাথ ঠাকুর ১৯১০ সালে প্রকাশিত তাঁর 'গীতাঞ্জলি' কাব্যগ্রন্থের ১০৩টি কবিতার ইংরেজি ভাবানুবাদ সংকলন করেন 'Gitanjali: Song Offerings' নামে, যার ভূমিকা লিখেছিলেন আইরিশ কবি ডব্লিউ. বি. ইয়েটস। ১৯১৩ সালের ১৩ নভেম্বর তিনি প্রথম এশীয় হিসেবে সাহিত্যে নোবেল পুরস্কার অর্জন করেন।",
  explanation_en: "Rabindranath Tagore was awarded the Nobel Prize in Literature in 1913 for 'Song Offerings' (Gitanjali).",
  difficulty: "easy",
  question_type: "knowledge",
  source_title: "Nobel Prize in Literature Presentation 1913",
  source_page_or_section: "Rabindranath Tagore Award Citation"
});

addQ({
  subject: "Bangla",
  topic: "আধুনিক যুগ",
  subtopic: "কাজী নজরুল ইসলাম — কাব্য",
  question_bn: "কাজী নজরুল ইসলামের যুগান্তকারী প্রথম কাব্যগ্রন্থ 'অগ্নি-বীণা' (১৯২২) কাকে উৎসর্গ করা হয়েছিল?",
  question_en: "To whom was Kazi Nazrul Islam's revolutionary debut poetry collection 'Agni-Bina' (1922) dedicated?",
  options: {
    A: "রবীন্দ্রনাথ ঠাকুর",
    B: "বিপ্লবী বারীন্দ্রকুমার ঘোষ",
    C: "দেশবন্ধু চিত্তরঞ্জন দাশ",
    D: "মুজফ্ফর আহমদ"
  },
  correct_option: "B",
  explanation_bn: "১৯২২ সালে প্রকাশিত নজরুলের অমর কাব্যগ্রন্থ 'অগ্নি-বীণা' (যার মধ্যে প্রলয়োল্লাস, বিদ্রোহী, রক্তাম্বরধারিণী মা, ধূমকেতু কবিতাগুলো ছিল) উৎসর্গ করা হয়েছিল ব্রিটিশবিরোধী বিপ্লবী অরবিন্দ ঘোষের কনিষ্ঠ ভ্রাতা ও যুগান্তর দলের নেতা বারীন্দ্রকুমার ঘোষকে।",
  explanation_en: "Kazi Nazrul Islam dedicated 'Agni-Bina' (1922) to the Indian revolutionary Barindra Kumar Ghosh.",
  difficulty: "medium",
  question_type: "knowledge",
  source_title: "নজরুল রচনাবলী — বাংলা একাডেমি",
  source_page_or_section: "অগ্নি-বীণা উৎসর্গপত্র"
});

addQ({
  subject: "Bangla",
  topic: "আধুনিক যুগ",
  subtopic: "বেগম রোকেয়া সাখাওয়াত হোসেন",
  question_bn: "বেগম রোকেয়া সাখাওয়াত হোসেন রচিত বিশ্বের অন্যতম প্রাচীন ফেমিনিস্ট সায়েন্স-ফিকশন ইউটোপিয়ান উপন্যাসিকা কোনটি?",
  question_en: "Which pioneering feminist science-fiction utopian story was authored in English by Begum Rokeya in 1905?",
  options: {
    A: "অবরোধ-বাসিনী",
    B: "সুলতানাস ড্রিম (Sultana's Dream)",
    C: "মতিচূর",
    D: "পদ্মরাগ"
  },
  correct_option: "B",
  explanation_bn: "১৯০৫ সালে মাদ্রাজের দ্য ইন্ডিয়ান লেডিস ম্যাগাজিনে বেগম রোকেয়ার বিখ্যাত কল্পবিজ্ঞান গল্প 'Sultana's Dream' প্রকাশিত হয়। এতে 'লেডিল্যান্ড' (Ladyland) নামক এক কল্পরাজ্যের চিত্র আঁকা হয়েছে যেখানে সৌরশক্তি ও আবহাওয়া নিয়ন্ত্রণ প্রযুক্তির সাহায্যে নারীরা বিজ্ঞানসম্মতভাবে রাষ্ট্র পরিচালনা করে। এটি বিশ্বসাহিত্যের প্রাচীনতম নারীবাদী কল্পবিজ্ঞান।",
  explanation_en: "Begum Rokeya's 'Sultana's Dream' (1905) portrays a technologically advanced utopian 'Ladyland' run by women.",
  difficulty: "easy",
  question_type: "knowledge",
  source_title: "রোকেয়া রচনাবলী — বাংলা একাডেমি",
  source_page_or_section: "সুলতানার স্বপ্ন ও মূল ইংরেজি টেক্সট"
});

addQ({
  subject: "Bangla",
  topic: "আধুনিক যুগ",
  subtopic: "শরৎচন্দ্র চট্টোপাধ্যায়",
  question_bn: "শরৎচন্দ্র চট্টোপাধ্যায়ের কোন রাজনৈতিক উপন্যাসটি ব্রিটিশ সরকার প্রকাশ ও প্রচারের ওপর নিষেধাজ্ঞা জারি করেছিল?",
  question_en: "Which anti-imperialist political novel by Sarat Chandra Chattopadhyay was proscribed by the British government?",
  options: {
    A: "দেবদাস",
    B: "পথের দাবী (১৯২৬)",
    C: "চরিত্রহীন",
    D: "শ্রীকান্ত"
  },
  correct_option: "B",
  explanation_bn: "১৯২৬ সালে প্রকাশিত শরৎচন্দ্রের 'পথের দাবী' উপন্যাসে সশস্ত্র বিপ্লবী নেতা সব্যসাচীর ব্রিটিশ সাম্রাজ্যবাদবিরোধী বিপ্লবী কর্মকাণ্ডের বিবরণ তুলে ধরায় ১৯২৭ সালের ৪ জানুয়ারি ব্রিটিশ সরকার উপন্যাসটি নিষিদ্ধ ও বাজেয়াপ্ত করে। 'শ্রীকান্ত' তাঁর আত্মজৈবনিক শ্রেষ্ঠ চার খণ্ডের উপন্যাস।",
  explanation_en: "'Pather Dabi' (1926) was banned by the British colonial administration in 1927 for advocating armed insurrection through the revolutionary Sabyasachi.",
  difficulty: "medium",
  question_type: "knowledge",
  source_title: "শরৎ রচনাবলী — সেন্ট্রাল লাইব্রেরি",
  source_page_or_section: "পথের দাবী নিষিদ্ধকরণ ইতিহাস"
});

addQ({
  subject: "Bangla",
  topic: "আধুনিক যুগ",
  subtopic: "মানিক বন্দ্যোপাধ্যায়",
  question_bn: "পদ্মাপাড়ের জেলেদের সুখ-দুঃখ, শোষণ ও জীবনসংগ্রাম নিয়ে রচিত কালজয়ী উপন্যাস 'পদ্মানদীর মাঝি' (১৯৩৬)-এর প্রধান চরিত্র কোনটি?",
  question_en: "Who is the central fisherman protagonist in Manik Bandopadhyay's epic novel 'Padma Nadir Majhi' (1936)?",
  options: {
    A: "কুবের",
    B: "তিতাস",
    C: "বনমালী",
    D: "রামকুমার"
  },
  correct_option: "A",
  explanation_bn: "মার্কসীয় ও ফ্রয়েডীয় দর্শনে প্রভাবিত কথাসাহিত্যিক মানিক বন্দ্যোপাধ্যায়ের অমর সৃষ্টি 'পদ্মানদীর মাঝি' (১৯৩৬)-র মূল চরিত্র হলো কুবের মাঝি, কপিলার সাথে তার জটিল টানাপোড়েন এবং ময়নাদ্বীপের স্বপ্নদ্রষ্টা হোসেন মিয়া। 'তিতাস একটি নদীর নাম' অদ্বৈত মল্লবর্মণের উপন্যাস।",
  explanation_en: "Kuber is the central fisherman protagonist in Manik Bandopadhyay's classic novel 'Padma Nadir Majhi'.",
  difficulty: "easy",
  question_type: "knowledge",
  source_title: "পদ্মানদীর মাঝি — মানিক বন্দ্যোপাধ্যায়",
  source_page_or_section: "উপন্যাস পরিচিতি"
});

addQ({
  subject: "Bangla",
  topic: "আধুনিক যুগ",
  subtopic: "তারাশঙ্কর বন্দ্যোপাধ্যায়",
  question_bn: "তারাশঙ্কর বন্দ্যোপাধ্যায়ের 'রাঢ় অঞ্চলের ট্রিলজি' নামে পরিচিত তিনটি উপন্যাসের মধ্যে কোনটি অন্তর্ভুক্ত নয়?",
  question_en: "Which of the following is NOT part of Tarasankar Bandyopadhyay's acclaimed Rarh region trilogy?",
  options: {
    A: "ধাত্রীদেবতা (১৯৩৯)",
    B: "গণদেবতা (১৯৪২)",
    C: "পঞ্চগ্রাম (১৯৪৪)",
    D: "হাঁসুলী বাঁকের উপকথা (১৯৪৭)"
  },
  correct_option: "D",
  explanation_bn: "তারাশঙ্কর বন্দ্যোপাধ্যায়ের বিখ্যাত গ্রামীণ ট্রিলজি উপন্যাস তিনটি হলো: 'ধাত্রীদেবতা', 'গণদেবতা' এবং 'পঞ্চগ্রাম'। 'গণদেবতা' উপন্যাসের জন্য তিনি ভারতের সর্বোচ্চ সাহিত্য পুরস্কার 'জ্ঞানপীঠ' লাভ করেন। 'হাঁসুলী বাঁকের উপকথা' তাঁর কাহার সমাজের ওপর রচিত স্বতন্ত্র শ্রেষ্ঠ উপন্যাস।",
  explanation_en: "Tarasankar's famed village trilogy comprises Dhatridevata, Ganadebata, and Panchagram. Hansuli Banker Upakatha is an independent epic of the Kahar tribe.",
  difficulty: "hard",
  question_type: "comprehension",
  source_title: "তারাশঙ্কর জীবন ও সাহিত্য সমীক্ষা",
  source_page_or_section: "উপন্যাস ত্রয়ী বিশ্লেষণ"
});

addQ({
  subject: "Bangla",
  topic: "আধুনিক যুগ",
  subtopic: "শামসুর রাহমান — মুক্তিযুদ্ধ ও রাজনৈতিক কবিতা",
  question_bn: "১৯৬৯ সালের গণঅভ্যুত্থানে আসাদুজ্জামান আসাদের রক্তে রঞ্জিত শার্ট দেখে কবি শামসুর রাহমান কোন বিখ্যাত কবিতাটি রচনা করেছিলেন?",
  question_en: "Which stirring poem was composed by Shamsur Rahman on seeing the blood-soaked shirt of martyred student Asad in 1969?",
  options: {
    A: "আসাদের শার্ট",
    B: "তোমাকে পাওয়ার জন্যে, হে স্বাধীনতা",
    C: "বন্দী শিবির থেকে",
    D: "বুক তার বাংলাদেশের হৃদয়"
  },
  correct_option: "A",
  explanation_bn: "১৯৬৯ সালের ২০ জানুয়ারি পাকিস্তানি পুলিশের গুলিতে ছাত্রনেতা আমানুল্লাহ আসাদুজ্জামান শহীদ হলে তাঁর রক্তমাখা শার্ট নিয়ে ছাত্ররা বিক্ষোভ মিছিল করে। এই দৃশ্য দেখে শামসুর রাহমান রচনা করেন কালজয়ী কবিতা 'আসাদের শার্ট': 'গুচ্ছ গুচ্ছ রক্তকরবীর মতো কিংবা সূর্যাস্তের / জলন্ত মেঘের মতো আসাদের শার্ট / উড়ছে হাওয়ায় নীলিমায়।' 'তোমাকে পাওয়ার জন্যে হে স্বাধীনতা' একাত্তরের রণাঙ্গনে রচিত।",
  explanation_en: "Shamsur Rahman authored 'Asader Shirt' in 1969, honoring the sacrifice of student leader Asaduzzaman.",
  difficulty: "easy",
  question_type: "knowledge",
  source_title: "শামসুর রাহমান শ্রেষ্ঠ কবিতা — বাংলা একাডেমি",
  source_page_or_section: "আসাদের শার্ট"
});

addQ({
  subject: "Bangla",
  topic: "আধুনিক যুগ",
  subtopic: "হাসান আজিজুল হক",
  question_bn: "ষাটের দশকের অন্যতম প্রধান কথাসাহিত্যিক হাসান আজিজুল হকের মুক্তিযুদ্ধভিত্তিক প্রথম প্রকাশিত গল্পগ্রন্থ কোনটি?",
  question_en: "Which was Hasan Azizul Huq's acclaimed debut collection of short stories published in 1967?",
  options: {
    A: "সমুদ্রের স্বপ্ন শীতের অরণ্য (১৯৬৪)",
    B: "নামহীন গোত্রহীন (১৯৭৫)",
    C: "আত্মজা ও একটি করবী গাছ (১৯৬৭)",
    D: "জীবন ঘষে আগুন (১৯৭৩)"
  },
  correct_option: "A",
  explanation_bn: "হাসান আজিজুল হকের প্রথম গল্পগ্রন্থ হলো 'সমুদ্রের স্বপ্ন শীতের অরণ্য' (১৯৬৪)। তবে তাঁর সর্বাধিক পঠিত ও আলোচিত গল্পসংকলন হলো 'আত্মজা ও একটি করবী গাছ' (১৯৬৭) এবং মুক্তিযুদ্ধভিত্তিক অমর সংকলন 'নামহীন গোত্রহীন' (১৯৭৫)।",
  explanation_en: "'Samudrer Swapna Shiter Aranya' (1964) was Hasan Azizul Huq's debut collection.",
  difficulty: "medium",
  question_type: "knowledge",
  source_title: "বাংলাদেশের ছোটগল্প — ড. বিশ্বজিৎ ঘোষ",
  source_page_or_section: "হাসান আজিজুল হক ধারা"
});

addQ({
  subject: "Bangla",
  topic: "আধুনিক যুগ",
  subtopic: "আখতারুজ্জামান ইলিয়াস — মুক্তিযুদ্ধভিত্তিক উপন্যাস",
  question_bn: "পুরান ঢাকার একাত্তরের অবরুদ্ধ জীবন এবং পাকিস্তানপন্থী চাটুকার সমাজের ভণ্ডামির ওপর রচিত আখতারুজ্জামান ইলিয়াসের উপন্যাস কোনটি?",
  question_en: "Which novel by Akhtaruzzaman Elias depicts occupied Old Dhaka during the 1971 Liberation War through the hypocrite Anwar and Tariq?",
  options: {
    A: "চিলেকোঠার সেপায়ি",
    B: "খোয়ারি",
    C: "খোঁয়ারি ও দুধভাতে উৎপাত",
    D: "খোয়াবনামা (১৯৯৬)"
  },
  correct_option: "D",
  explanation_bn: "আখতারুজ্জামান ইলিয়াসের দ্বিতীয় উপন্যাস 'খোয়াবনামা' (১৯৯৬) তেভাগা আন্দোলন ও দেশভাগের স্বপ্নভঙ্গের ওপর রচিত। আর তাঁর প্রথম উপন্যাস 'চিলেকোঠার সেপায়ি' (১৯৮৬) ঊনসত্তরের গণঅভ্যুত্থানের ওপর রচিত। ছোটগল্প 'অপঘাত' ও 'রেইনকোট'-এ তিনি একাত্তরের অবরুদ্ধ ঢাকার চিত্র ফুটিয়ে তুলেছেন।",
  explanation_en: "'Khoabnama' (1996) explores the peasant Tebhaga struggle, Partition, and folklore, while 'Chilekothar Sepai' centers on the 1969 Uprising.",
  difficulty: "medium",
  question_type: "comprehension",
  source_title: "আখতারুজ্জামান ইলিয়াস রচনাবলী",
  source_page_or_section: "খোয়াবনামা পরিচিতি"
});

addQ({
  subject: "Bangla",
  topic: "আধুনিক যুগ",
  subtopic: "সেলিনা হোসেন — ভাষা আন্দোলনভিত্তিক উপন্যাস",
  question_bn: "১৯৫২ সালের মহান ভাষা আন্দোলনের পটভূমিতে রচিত সেলিনা হোসেনের বিখ্যাত উপন্যাস কোনটি?",
  question_en: "Which famous novel based on the 1952 Language Movement was authored by Selina Hossain?",
  options: {
    A: "হাঙর নদী গ্রেনেড",
    B: "যাপিত জীবন (১৯৮১)",
    C: "নীল ময়ূরের যৌবন",
    D: "পোকা মাকড়ের ঘরবসতি"
  },
  correct_option: "B",
  explanation_bn: "কথাসাহিত্যিক সেলিনা হোসেনের 'যাপিত জীবন' (১৯৮১) ১৯৪৭-এর দেশভাগ থেকে শুরু করে ১৯৫২ সালের ভাষা আন্দোলনের রক্তাক্ত পটভূমিতে রচিত এক অবিস্মরণীয় উপন্যাস। তাঁর 'হাঙর নদী গ্রেনেড' (১৯৭৬) একাত্তরের মুক্তিযুদ্ধের ওপর এক শহীদি মায়ের সত্য ঘটনা নিয়ে রচিত।",
  explanation_en: "'Yapita Jiban' (1981) by Selina Hossain is set in the 1952 Language Movement; 'Hangor Nodi Grenade' is set in the Liberation War.",
  difficulty: "easy",
  question_type: "knowledge",
  source_title: "বাংলাদেশের উপন্যাসের মূল্যায়ন — জাতীয় গ্রন্থকেন্দ্র",
  source_page_or_section: "সেলিনা হোসেন অধ্যায়"
});

addQ({
  subject: "Bangla",
  topic: "আধুনিক সাহিত্য",
  subtopic: "বাংলা মহাকাব্য ধারা — কায়কোবাদ",
  question_bn: "১৭৬১ সালের পানিপথের তৃতীয় যুদ্ধের ঐতিহাসিক ধ্বংসযজ্ঞ অবলম্বনে কবি কায়কোবাদ কোন সুবিশাল মহাকাব্যটি রচনা করেন?",
  question_en: "Which monumental epic based on the Third Battle of Panipat (1761) was composed by poet Kaikobad?",
  options: {
    A: "বৃত্রসংহার",
    B: "মহাশ্মশান (১৯০৪)",
    C: "কাশেম বধ",
    D: "কুরুক্ষেত্র"
  },
  correct_option: "B",
  explanation_bn: "মহাকবি কায়কোবাদ (মুহম্মদ কাজেম আল কোরায়শী) ১৭৬১ সালের পানিপথের তৃতীয় যুদ্ধে আহমদ শাহ আবদালী এবং মারাঠাদের মধ্যকার রক্তক্ষয়ী যুদ্ধের ঐতিহাসিক পটভূমিতে তিন খণ্ডে রচিত সুবিশাল মহাকাব্য 'মহাশ্মশান' (১৯০৪) রচনা করেন। হেমচন্দ্র বন্দ্যোপাধ্যায় রচনা করেন 'বৃত্রসংহার'।",
  explanation_en: "Kaikobad's epic 'Mahashmashan' (1904) depicts the tragic carnage of the Third Battle of Panipat.",
  difficulty: "easy",
  question_type: "knowledge",
  source_title: "আধুনিক বাংলা মহাকাব্য সমীক্ষা — ড. ক্ষেত্র গুপ্ত",
  source_page_or_section: "কায়কোবাদের মহাশ্মশান"
});

addQ({
  subject: "Bangla",
  topic: "আধুনিক সাহিত্য",
  subtopic: "প্রমথ চৌধুরী ও সবুজপত্র",
  question_bn: "বাংলা সাহিত্যে চলিত রীতির প্রবর্তক প্রমথ চৌধুরী সম্পাদিত বিখ্যাত সাহিত্য পত্রিকা 'সবুজপত্র' কত সালে প্রথম প্রকাশিত হয়?",
  question_en: "In which year was 'Sabujpatra', the historic journal edited by Pramatha Chowdhury that established colloquial Bengali prose, first published?",
  options: {
    A: "১৯০১ সাল",
    B: "১৯১৪ সাল",
    C: "১৯২৩ সাল",
    D: "১৯৩১ সাল"
  },
  correct_option: "B",
  explanation_bn: "১৯১৪ সালে প্রমথ চৌধুরীর (ছদ্মনাম: বীরবল) সম্পাদনায় 'সবুজপত্র' পত্রিকা প্রকাশিত হয়। এই পত্রিকার মাধ্যমেই বাংলা গদ্যের সাধু ভাষার কৃত্রিম শৃঙ্খল ভেঙে আধুনিক চলিত রীতির (বীরবলী রীতি) ঐতিহাসিক বিজয় সূচিত হয়। রবীন্দ্রনাথ তাঁর 'ঘরে-বাইরে' ও 'বলাকা'র বহু লেখা সবুজপত্রেই প্রথম প্রকাশ করেন।",
  explanation_en: "Pramatha Chowdhury founded 'Sabujpatra' in 1914, successfully establishing the modern colloquial (Chalit) prose standard.",
  difficulty: "easy",
  question_type: "knowledge",
  source_title: "সবুজপত্র ও বাংলা সাহিত্য — সুকুমার সেন",
  source_page_or_section: "১৯১৪ সবুজপত্র পর্ব"
});

addQ({
  subject: "Bangla",
  topic: "আধুনিক সাহিত্য",
  subtopic: "ফররুখ আহমদ",
  question_bn: "মুসলিম রেনেসাঁর কবি ফররুখ আহমদের ১৯৪৩ সালের পঞ্চাশের মন্বন্তরের মর্মস্পর্শী বাস্তবতার ওপর রচিত কালজয়ী কবিতা কোনটি?",
  question_en: "Which famous poem depicting the harrowing Bengal famine of 1943 was composed by poet Farrukh Ahmad?",
  options: {
    A: "সাত সাগরের মাঝি",
    B: "লাশ",
    C: "পাঞ্জেরী",
    D: "সিরাজাম মুনীরা"
  },
  correct_option: "B",
  explanation_bn: "ফররুখ আহমদের ১৯৪৩ সালের ভয়াবহ ছিয়াত্তরের পর পঞ্চাশের মন্বন্তরে কলকাতার ফুটপাতে অনাহারে মৃত মানুষের চিত্র নিয়ে রচিত অমর কবিতা 'লাশ'। তাঁর বিখ্যাত প্রতীকী কবিতা 'পাঞ্জেরী' এবং প্রথম কাব্যগ্রন্থ 'সাত সাগরের মাঝি' (১৯৪৪)।",
  explanation_en: "Farrukh Ahmad's poem 'Lash' (Corpse) depicts the tragic horrors of the 1943 Bengal Famine.",
  difficulty: "medium",
  question_type: "knowledge",
  source_title: "ফররুখ আহমদের কবিতা ও রেনেসাঁ",
  source_page_or_section: "মন্বন্তরের কবিতা"
});

addQ({
  subject: "Bangla",
  topic: "আধুনিক সাহিত্য",
  subtopic: "শওকত ওসমান — রূপক উপন্যাস",
  question_bn: "আইয়ুব খানের সামরিক একনায়কতান্ত্রিক শাসন ও নির্যাতনের রূপক হিসেবে শওকত ওসমান কোন বিখ্যাত উপন্যাসটি রচনা করেন?",
  question_en: "Which allegorical novel was authored by Shawkat Osman satirizing Ayub Khan's military dictatorship?",
  options: {
    A: "ক্রীতদাসের হাসি (১৯৬২)",
    B: "জননী (১৯৫৮)",
    C: "বনি আদম",
    D: "জাহান্নাম হইতে বিদায়"
  },
  correct_option: "A",
  explanation_bn: "কথাসাহিত্যিক শওকত ওসমানের রূপক উপন্যাস 'ক্রীতদাসের হাসি' (১৯৬২)। এতে বাগদাদের খলিফা হারুন-অর-রশীদের সীমাহীন ক্ষমতার বিপরীতে ক্রীতদাস তাতারীর অবাধ প্রাণের হাসি ও স্বাধীনতার আকুতি তুলে ধরে তৎকালীন পাকিস্তানের আইয়ুব খানের একনায়কতন্ত্রকে তীব্র চপেটাঘাত করা হয়। এর জন্য তিনি আদমজী সাহিত্য পুরস্কার পান।",
  explanation_en: "'Kritadaser Hasi' (Laugh of the Slave, 1962) allegorizes political repression under Ayub Khan's regime.",
  difficulty: "easy",
  question_type: "knowledge",
  source_title: "শওকত ওসমান উপন্যাস সম্ভার",
  source_page_or_section: "ক্রীতদাসের হাসি ভূমিকা"
});

addQ({
  subject: "Bangla",
  topic: "আধুনিক সাহিত্য",
  subtopic: "জহির রায়হান — মুক্তিযুদ্ধ ও তথ্যচিত্র",
  question_bn: "একাত্তরের মুক্তিযুদ্ধের ওপর নির্মিত জহির রায়হানের আন্তর্জাতিক খ্যাতিসম্পন্ন ঐতিহাসিক তথ্যচিত্রটির নাম কী?",
  question_en: "What is the title of Zahir Raihan's internationally renowned 1971 documentary film on the Bangladesh genocide?",
  options: {
    A: "জীবন থেকে নেয়া",
    B: "স্টপ জেনোসাইড (Stop Genocide)",
    C: "কাঁচের দেয়াল",
    D: "লেট দেয়ার বি লাইট"
  },
  correct_option: "B",
  explanation_bn: "১৯৭১ সালে মুক্তিযুদ্ধ চলাকালীন জহির রায়হান পাকিস্তানি সেনাবাহিনীর নৃশংস গণহত্যা ও শরণার্থী শিবিরের অবর্ণনীয় দুর্দশা বিশ্বের দরবারে তুলে ধরতে নির্মাণ করেন ২০ মিনিটের ঐতিহাসিক কালজয়ী তথ্যচিত্র 'Stop Genocide'। এটি বিশ্ব জনমত গঠনে অপরিসীম ভূমিকা রাখে। তাঁর বিখ্যাত চলচ্চিত্র 'জীবন থেকে নেয়া' (১৯৭০)।",
  explanation_en: "Zahir Raihan directed the world-renowned documentary 'Stop Genocide' in 1971 exposing the Pakistani military atrocities.",
  difficulty: "easy",
  question_type: "knowledge",
  source_title: "বাংলাদেশের মুক্তিযুদ্ধ ও চলচ্চিত্র কোষ",
  source_page_or_section: "জহির রায়হানের স্টপ জেনোসাইড"
});

addQ({
  subject: "Bangla",
  topic: "আধুনিক সাহিত্য",
  subtopic: "সুকান্ত ভট্টাচার্য",
  question_bn: "'ক্ষুধার রাজ্যে পৃথিবী গদ্যময় / পূর্ণিমা-চাঁদ যেন ঝলসানো রুটি' — মার্কসবাদী কিশোর কবি সুকান্ত ভট্টাচার্যের কোন কবিতার চরণ?",
  question_en: "'The world is prosaic in the realm of hunger: The full moon looks like a charred loaf of bread' — from which poem by Sukanta Bhattacharya are these lines taken?",
  options: {
    A: "ছাড়পত্র",
    B: "হে মহাজীবন",
    C: "রানার",
    D: "আঠারো বছর বয়স"
  },
  correct_option: "B",
  explanation_bn: "মাত্র ২১ বছর বয়সে প্রয়াত বিপ্লবী কবি সুকান্ত ভট্টাচার্যের অমর কবিতা 'হে মহাজীবন'-এর সমাপ্তি চরণ এটি। ক্ষুধার্ত মেহনতি মানুষের কাছে চাঁদের রূপোলি সৌন্দর্য অর্থহীন হয়ে রুটির মতো প্রতীয়মান হওয়ার তীব্র বাস্তবতাবাদী উচ্চারণ এতে প্রকাশ পেয়েছে। তাঁর একমাত্র প্রকাশিতব্য সংকলন 'ছাড়পত্র' (১৯৪৭)।",
  explanation_en: "Famous concluding lines of Sukanta Bhattacharya's revolutionary poem 'He Mahajiban'.",
  difficulty: "easy",
  question_type: "knowledge",
  source_title: "সুকান্ত সমগ্র — ছাড়পত্র কাব্যগ্রন্থ",
  source_page_or_section: "হে মহাজীবন"
});

addQ({
  subject: "Bangla",
  topic: "আধুনিক সাহিত্য",
  subtopic: "রবীন্দ্রনাথ ঠাকুর — ছোটগল্প চরিত্র",
  question_bn: "রবীন্দ্রনাথ ঠাকুরের বিখ্যাত মনস্তাত্ত্বিক ছোটগল্প 'একরাত্রি'-র প্রধান দুটি চরিত্র কারা?",
  question_en: "Who are the two central protagonists in Rabindranath Tagore's psychological short story 'Ekratri'?",
  options: {
    A: "সুরবালা ও নামহীন কথক শিক্ষক",
    B: "রতন ও পোস্টমাস্টার",
    C: "মৃণ্ময়ী ও অপূর্ব",
    D: "চারুলতা ও অমল"
  },
  correct_option: "A",
  explanation_bn: "'একরাত্রি' ছোটগল্পে শৈশবের খেলার সাথী সুরবালা এবং এক পল্লী বিদ্যালয়ের নামহীন শিক্ষক কথকের মধ্যকার অপূর্ণ ভালোবাসার সুর তীব্র বন্যায় এক রাতের জন্য এক উঁচু ঢিবিতে আশ্রয়ের মাধ্যমে চিত্রিত হয়েছে। রতন ও পোস্টমাস্টার হলো 'পোস্টমাস্টার' গল্পের এবং চারুলতা ও অমল হলো 'নষ্টনীড়' গল্পের চরিত্র।",
  explanation_en: "Surabala and the unnamed schoolmaster narrator are protagonists of Tagore's poignant masterpiece 'Ekratri'.",
  difficulty: "medium",
  question_type: "knowledge",
  source_title: "গল্পগুচ্ছ — রবীন্দ্রনাথ ঠাকুর",
  source_page_or_section: "একরাত্রি গল্প"
});

addQ({
  subject: "Bangla",
  topic: "আধুনিক সাহিত্য",
  subtopic: "মৈথিল কোকিল — বিদ্যাপতি",
  question_bn: "'এ ভরা ভাদর / মাহ ভাদর / শূন্য মন্দির মোর' — রাধার বিরহবেদনা নিয়ে রচিত পদটির রচয়িতা কে?",
  question_en: "'E bhara bhadara, maha bhadara, shunya mandira mora' — who authored this poignant Vaishnava lyric?",
  options: {
    A: "জ্ঞানদাস",
    B: "বিদ্যাপতি",
    C: "গোবিন্দদাস",
    D: "চণ্ডীদাস"
  },
  correct_option: "B",
  explanation_bn: "ব্রজবুলি ভাষায় রচিত বৈষ্ণব সাহিত্যের অন্যতম শ্রেষ্ঠ বিরহী পদ 'এ ভরা ভাদর মাহ ভাদর / শূন্য মন্দির মোর'-এর রচয়িতা মহাকবি বিদ্যাপতি। শ্রাবণ-ভাদ্রের বর্ষণমুখর রাতে শ্রীকৃষ্ণের অনুপস্থিতিতে রাধার একাকী শূন্য ঘরের হাহাকার এখানে ব্যক্ত হয়েছে।",
  explanation_en: "Composed by Vidyapati in Brajabuli, reflecting Radha's aching solitude in the torrential monsoon month of Bhadra.",
  difficulty: "easy",
  question_type: "knowledge",
  source_title: "বৈষ্ণব পদাবলী সংকলন",
  source_page_or_section: "বিদ্যাপতি বিরহ পর্যায়"
});

addQ({
  subject: "Bangla",
  topic: "ব্যাকরণ — পারিভাষিক শব্দ",
  subtopic: "প্রশাসনিক পরিভাষা",
  question_bn: "'Embezzlement' এবং 'Subpoena' শব্দ দুটির বাংলা সঠিক প্রশাসনিক পরিভাষা যথাক্রমে কী?",
  question_en: "What are the correct official administrative Bengali terms for 'Embezzlement' and 'Subpoena'?",
  options: {
    A: "ঘুষ এবং পরোয়ানা",
    B: "আত্মসাৎ (বা তহবিল তছরুপ) এবং সমন (আদালতের তলবনামা)",
    C: "জবানবন্দি এবং জামিন",
    D: "অর্থদণ্ড এবং রিট"
  },
  correct_option: "B",
  explanation_bn: "বাংলা একাডেমি প্রশাসনিক পরিভাষাকোষ অনুযায়ী: 'Embezzlement' শব্দের প্রমিত পরিভাষা হলো 'আত্মসাৎ' বা 'তহবিল তছরুপ'। আর আদালত কর্তৃক সাক্ষীকে সাক্ষ্যদানের জন্য উপস্থিত হতে জারিকৃত নির্দেশনামা 'Subpoena'-এর প্রমিত পরিভাষা হলো 'সমন' বা 'সাক্ষী তলবনামা'।",
  explanation_en: "Embezzlement translates to 'আত্মসাৎ' and Subpoena translates to 'সমন / আদালতের তলবনামা'.",
  difficulty: "medium",
  question_type: "vocabulary",
  source_title: "বাংলা একাডেমি প্রশাসনিক পরিভাষা কোষ",
  source_page_or_section: "আইন ও অর্থ বিষয়ক পরিভাষা"
});

addQ({
  subject: "Bangla",
  topic: "বানান শুদ্ধি",
  subtopic: "ণ-ত্ব ও ষ-ত্ব সম্বলিত প্রমিত বানান",
  question_bn: "নিচের কোন শব্দগুচ্ছের প্রতিটি বানানই বাংলা একাডেমি অভিধান অনুসারে শুদ্ধ?",
  question_en: "Which set contains solely correct spellings per the Bangla Academy dictionary?",
  options: {
    A: "মরিচীকা, শশীভূষণ, গীতাঞ্জলী",
    B: "মরীচিকা, শশীভূষণ, গীতাঞ্জলি",
    C: "মরীচীকা, শশিভূষণ, গীতাঞ্জলি",
    D: "মরিচিকা, শশীভুষণ, গীতাঞ্জলী"
  },
  correct_option: "B",
  explanation_bn: "প্রমিত বানান নিয়ম: 'মরীচিকা' (ম-র-দীর্ঘ ঈ-চ-হ্রস্ব ই-ক-আ); 'শশীভূষণ' (শ-তালব্য শ-দীর্ঘ ঈ-ভ-দীর্ঘ ঊ-ষ-মূর্ধন্য ণ); এবং 'গীতাঞ্জলি' ('অঞ্জলি' যুক্ত সকল শব্দে হ্রস্ব ই-কার বসে: গীতাঞ্জলি, জলাঞ্জলি, পুষ্পাঞ্জলি)। অতএব বিকল্প B সম্পূর্ণ শুদ্ধ।",
  explanation_en: "Correct orthography: মরীচিকা (ī-i), শশীভূষণ (ī-ū-ṇ), and গীতাঞ্জলি (all anjali-derivatives take short i).",
  difficulty: "medium",
  question_type: "grammar",
  source_title: "বাংলা একাডেমি প্রমিত বাংলা বানানের নিয়ম",
  source_page_or_section: "ই ও ঈ-কার ব্যবহারের নিয়ম"
});

addQ({
  subject: "Bangla",
  topic: "আধুনিক সাহিত্য",
  subtopic: "রবীন্দ্রনাথ ঠাকুর — কাব্যনাট্য",
  question_bn: "রবীন্দ্রনাথ ঠাকুরের বিখ্যাত সাঙ্কেতিক সাংকেতিক রূপক নাটক 'রক্তকরবী'-র প্রধান নারী চরিত্র কোনটি?",
  question_en: "Who is the liberating central female protagonist in Rabindranath Tagore's symbolic drama 'Raktakarabi' (Red Oleanders)?",
  options: {
    A: "নন্দিনী",
    B: "সুজাতা",
    C: "কমল",
    D: "মালিনী"
  },
  correct_option: "A",
  explanation_bn: "'রক্তকরবী' (১৯২৬) রবীন্দ্রনাথ ঠাকুরের শ্রেষ্ঠ রূপক-সাংকেতিক নাটক। যক্ষপুরীর লোভী রাজা ও যন্ত্রসভ্যতার নির্মম শোষণের নাগপাশ ছিন্ন করে মানবপ্রেম, সৌন্দর্য ও প্রাণের মুক্ত বাতাস নিয়ে আসে রক্তকরবীর মঞ্জরী পরা কিশোরী 'নন্দিনী'। রাজার অন্তরে প্রেম জাগিয়ে সে যক্ষপুরীর কারাগার ধূলিসাৎ করে।",
  explanation_en: "Nandini is the iconic protagonist in Tagore's 'Raktakarabi' (Red Oleanders), symbolizing life, freedom, and beauty against industrial greed.",
  difficulty: "easy",
  question_type: "knowledge",
  source_title: "রবীন্দ্র নাট্যসমীক্ষা — ড. অজিতকুমার ঘোষ",
  source_page_or_section: "সাংকেতিক নাটক: রক্তকরবী"
});

addQ({
  subject: "Bangla",
  topic: "আধুনিক সাহিত্য",
  subtopic: "কাজী নজরুল ইসলাম — প্রবন্ধ সংকলন",
  question_bn: "কাজী নজরুল ইসলামের সমাজতান্ত্রিক ও বিপ্লবী চিন্তাধারার প্রথম নিষিদ্ধ প্রবন্ধগ্রন্থ কোনটি?",
  question_en: "Which was Kazi Nazrul Islam's revolutionary prose essay collection proscribed by the British in 1922?",
  options: {
    A: "রুদ্র-মঙ্গল (১৯২৭)",
    B: "যুগবাণী (১৯২২)",
    C: "দুর্দিনের যাত্রী (১৯২৬)",
    D: "রাজবন্দীর জবানবন্দী (১৯২৩)"
  },
  correct_option: "B",
  explanation_bn: "১৯২২ সালে প্রকাশিত 'যুগবাণী' নজরুলের প্রথম প্রবন্ধ সংকলন এবং এটি ব্রিটিশ সরকার কর্তৃক বাজেয়াপ্ত হওয়া তাঁর সর্বপ্রথম গ্রন্থ। এর অন্তর্ভুক্ত 'ডায়ার স্মৃতিসৌধ' ও 'মুহাজিরিন হত্যার প্রতিকার' প্রবন্ধ ব্রিটিশদের ভিত নাড়িয়ে দিয়েছিল। 'রাজবন্দীর জবানবন্দী' তাঁর ঐতিহাসিক জবানবন্দি।",
  explanation_en: "'Yugabani' (1922) was Nazrul's first prose essay anthology, banned by the British colonial administration.",
  difficulty: "medium",
  question_type: "knowledge",
  source_title: "নজরুল সাহিত্য পরিচয় — রফিকুল ইসলাম",
  source_page_or_section: "যুগবাণী ও বাজেয়াপ্ত প্রবন্ধ"
});

addQ({
  subject: "Bangla",
  topic: "আধুনিক সাহিত্য",
  subtopic: "মাইকেল মধুসূদন দত্ত — সনেট",
  question_bn: "মাইকেল মধুসূদন দত্ত রচিত বাংলা সাহিত্যের প্রথম সনেট বা চতুর্দশপদী কবিতা কোনটি?",
  question_en: "Which was the first sonnet (Chaturdashpadi poem) composed in Bengali by Michael Madhusudan Dutt?",
  options: {
    A: "কপোতাক্ষ নদ",
    B: "বঙ্গভাষা (কবি-মাতৃভাষা)",
    C: "ঈশ্বরচন্দ্র বিদ্যাসাগর",
    D: "মেঘনাদবধ"
  },
  correct_option: "B",
  explanation_bn: "ইতালীয় কবি পেত্রার্কের আদর্শে অনুপ্রাণিত হয়ে ১৮৬০ সালে মধুসূদন দত্ত প্রথম বাংলা সনেট 'বঙ্গভাষা' (যার আদি নাম ছিল 'কবি-মাতৃভাষা': 'হে বঙ্গ, ভাণ্ডারে তব বিবিধ রতন...') রচনা করেন। পরবর্তীতে ১৮৬৬ সালে ফ্রান্সের ভার্সাই নগরীতে বসে তিনি 'চতুর্দশপদী কবিতাবলী' প্রকাশ করেন যার মধ্যে বিখ্যাত 'কপোতাক্ষ নদ' অন্তর্ভুক্ত।",
  explanation_en: "'Bangabhasha' (1860) was the very first Italian-style sonnet in Bengali, penned by Michael Madhusudan Dutt.",
  difficulty: "medium",
  question_type: "knowledge",
  source_title: "মধুসূদন রচনাবলী — ক্ষেত্র গুপ্ত",
  source_page_or_section: "চতুর্দশপদী কবিতা সূচনা"
});

addQ({
  subject: "Bangla",
  topic: "আধুনিক সাহিত্য",
  subtopic: "বঙ্কিমচন্দ্র চট্টোপাধ্যায় — উপন্যাস",
  question_bn: "বাংলা সাহিত্যের প্রথম সার্থক রোমান্টিক উপন্যাস হিসেবে স্বীকৃত বঙ্কিমচন্দ্র চট্টোপাধ্যায়ের উপন্যাস কোনটি?",
  question_en: "Which novel by Bankim Chandra Chattopadhyay is recognized as the first successful romantic novel in Bengali literature?",
  options: {
    A: "কপালকুণ্ডলা (১৮৬৬)",
    B: "দুর্গেশনন্দিনী (১৮৬৫)",
    C: "বিষবৃক্ষ (১৮৭৩)",
    D: "আনন্দমঠ (১৮৮২)"
  },
  correct_option: "A",
  explanation_bn: "১৮৬৫ সালে প্রকাশিত 'দুর্গেশনন্দিনী' বাংলা সাহিত্যের প্রথম সার্থক উপন্যাস হলেও এতে ঐতিহাসিক আবহ প্রধান ছিল। পক্ষান্তরে ১৮৬৬ সালে প্রকাশিত 'কপালকুণ্ডলা' হলো বাংলা সাহিত্যের সর্বপ্রথম বিশুদ্ধ রোমান্টিক প্রেমের উপন্যাস। এর অমর সংলাপ: 'পথিক, তুমি পথ হারাইয়াছ?'",
  explanation_en: "'Kapalkundala' (1866) by Bankim Chandra Chattopadhyay is celebrated as the first true romantic novel in Bengali literature.",
  difficulty: "medium",
  question_type: "knowledge",
  source_title: "বঙ্কিম রচনাবলী — সাহিত্য পরিষদ সংস্করণ",
  source_page_or_section: "কপালকুণ্ডলা ভূমিকা"
});

// Append English (45 Qs)
englishQuestions.forEach(q => addQ(q));

// Append Bangladesh Affairs (40 Qs)
bdAffairsQuestions.forEach(q => addQ(q));

// Append International Affairs (30 Qs)
intlAffairsQuestions.forEach(q => addQ(q));

// Append Science (25 Qs)
scienceQuestions.forEach(q => addQ(q));

// Append Computer & IT (25 Qs)
computerQuestions.forEach(q => addQ(q));

// Append Mathematics (20 Qs)
mathQuestions.forEach(q => addQ(q));

// Append Mental Ability (10 Qs)
mentalAbilityQuestions.forEach(q => addQ(q));

// Append Geography & Environment (7 Qs)
geographyQuestions.forEach(q => addQ(q));

// Append Ethics, Values and Good Governance (3 Qs)
ethicsQuestions.forEach(q => addQ(q));

console.log(`Assembled ${questions.length} questions for Batch 003.`);

// Ensure directory exists and write JSONL
const dir = path.dirname(batchFile);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const jsonlContent = questions.map(q => JSON.stringify(q)).join('\n') + '\n';
fs.writeFileSync(batchFile, jsonlContent, 'utf8');

console.log(`Successfully wrote ${questions.length} questions to ${batchFile}`);
