import { SyllabusTopic } from '@/types';

export const SYLLABUS_TOPICS: SyllabusTopic[] = [
  // ----------------------------------------------------
  // Bangla (Shared - 20 marks)
  // ----------------------------------------------------
  {
    id: 'top-bng-grammar',
    subjectId: 'sub-sbcs-bangla',
    topicCode: 'BNG-01',
    titleEn: 'Bangla Grammar & Linguistics',
    titleBn: 'বাংলা ব্যাকরণ ও ভাষাতত্ত্ব',
    description: 'ধ্বনি, বর্ণ, সন্ধি, ণ-ত্ব ও ষ-ত্ব বিধান, সমাস, কারক ও বিভক্তি, প্রত্যয়, শুদ্ধাশুদ্ধি।',
    officialSyllabusPage: 'Official Syllabus Page 1',
    weightageLevel: 'critical',
    displayOrder: 1,
  },
  {
    id: 'top-bng-lit-ancient-medieval',
    subjectId: 'sub-sbcs-bangla',
    topicCode: 'BNG-02',
    titleEn: 'Ancient & Medieval Bangla Literature',
    titleBn: 'বাংলা সাহিত্যের প্রাচীন ও মধ্যযুগ',
    description: 'চর্যাপদ, শ্রীকৃষ্ণকীর্তন, মঙ্গলকাব্য, বৈষ্ণব পদাবলী, অনুবাদ সাহিত্য, প্রণয়োপাখ্যান।',
    officialSyllabusPage: 'Official Syllabus Page 1-2',
    weightageLevel: 'high',
    displayOrder: 2,
  },
  {
    id: 'top-bng-lit-modern',
    subjectId: 'sub-sbcs-bangla',
    topicCode: 'BNG-03',
    titleEn: 'Modern Bangla Literature & Liberation War Works',
    titleBn: 'আধুনিক যুগ ও মুক্তিযুদ্ধভিত্তিক সাহিত্য',
    description: 'রবীন্দ্রনাথ ঠাকুর, কাজী নজরুল ইসলাম, মাইকেল মধুসূদন দত্ত, বঙ্কিমচন্দ্র, জসীমউদ্দীন ও মুক্তিযুদ্ধের কবিতা, উপন্যাস, নাটক।',
    officialSyllabusPage: 'Official Syllabus Page 2',
    weightageLevel: 'critical',
    displayOrder: 3,
  },

  // ----------------------------------------------------
  // English (Shared - 20 marks)
  // ----------------------------------------------------
  {
    id: 'top-eng-grammar-usage',
    subjectId: 'sub-sbcs-english',
    topicCode: 'ENG-01',
    titleEn: 'English Grammar, Structure & Syntax',
    titleBn: 'ইংরেজি ব্যাকরণ ও বাক্য গঠন',
    description: 'Parts of Speech, Clauses, Subject-Verb Agreement, Modifiers, Voice, Narration, Correction of Errors.',
    officialSyllabusPage: 'Official Syllabus Page 3',
    weightageLevel: 'critical',
    displayOrder: 1,
  },
  {
    id: 'top-eng-vocab-idioms',
    subjectId: 'sub-sbcs-english',
    topicCode: 'ENG-02',
    titleEn: 'Vocabulary, Idioms & Prepositions',
    titleBn: 'শব্দভাণ্ডার, প্রবাদ-প্রবচন ও অ্যাপ্রোপ্রিয়েট প্রিপজিশন',
    description: 'Synonyms, Antonyms, Phrasal Verbs, Appropriate Prepositions, One Word Substitution.',
    officialSyllabusPage: 'Official Syllabus Page 3-4',
    weightageLevel: 'high',
    displayOrder: 2,
  },
  {
    id: 'top-eng-literature',
    subjectId: 'sub-sbcs-english',
    topicCode: 'ENG-03',
    titleEn: 'English Literature — Major Periods & Authors',
    titleBn: 'ইংরেজি সাহিত্যের প্রধান যুগ ও সাহিত্যিকবৃন্দ',
    description: 'Elizabethan, Romantic, Victorian, and Modern periods; Shakespeare, Wordsworth, Keats, Shelley, G.B. Shaw.',
    officialSyllabusPage: 'Official Syllabus Page 4',
    weightageLevel: 'medium',
    displayOrder: 3,
  },

  // ----------------------------------------------------
  // Bangladesh Affairs (Shared - 20 marks)
  // ----------------------------------------------------
  {
    id: 'top-bda-history-liberation',
    subjectId: 'sub-sbcs-bdaffairs',
    topicCode: 'BDA-01',
    titleEn: 'History of Bengal & The Great Liberation War 1971',
    titleBn: 'বাঙালির ইতিহাস, ভাষা আন্দোলন ও মহান মুক্তিযুদ্ধ',
    description: '১৯৪৭ দেশভাগ, ১৯৫২ ভাষা আন্দোলন, ১৯৬৬ ছয় দফা, ১৯৬৯ গণঅভ্যুত্থান, ১৯৭১ মুক্তিযুদ্ধ, মুজিবনগর সরকার ও বীরত্বসূচক খেতাব।',
    officialSyllabusPage: 'Official Syllabus Page 5',
    weightageLevel: 'critical',
    displayOrder: 1,
  },
  {
    id: 'top-bda-constitution-governance',
    subjectId: 'sub-sbcs-bdaffairs',
    topicCode: 'BDA-02',
    titleEn: 'Constitution of Bangladesh & State Organs',
    titleBn: 'বাংলাদেশের সংবিধান, শাসনব্যবস্থা ও প্রশাসনিক কাঠামো',
    description: 'সংবিধানের মূলনীতি, মৌলিক অধিকার, বিচার বিভাগ, নির্বাহী বিভাগ ও সাংবিধানিক সংস্থাসমূহ।',
    officialSyllabusPage: 'Official Syllabus Page 5',
    weightageLevel: 'critical',
    displayOrder: 2,
  },
  {
    id: 'top-bda-economy-health',
    subjectId: 'sub-sbcs-bdaffairs',
    topicCode: 'BDA-03',
    titleEn: 'Economy, Demographics & National Health Landscape',
    titleBn: 'বাংলাদেশের অর্থনীতি, জনমিতি ও স্বাস্থ্যখাত ব্যবস্থাপনা',
    description: 'জিডিপি, পঞ্চবার্ষিকী পরিকল্পনা, মেগাপ্রকল্প, ইপিআই কর্মসূচি, মাতৃমৃত্যু ও শিশুমৃত্যু হ্রাস, জাতীয় স্বাস্থ্যনীতি।',
    officialSyllabusPage: 'Official Syllabus Page 5',
    weightageLevel: 'high',
    displayOrder: 3,
  },

  // ----------------------------------------------------
  // International Affairs (Shared - 20 marks)
  // ----------------------------------------------------
  {
    id: 'top-int-organizations',
    subjectId: 'sub-sbcs-intaffairs',
    topicCode: 'INT-01',
    titleEn: 'Global Institutions, UN, WHO & Multilateral Bodies',
    titleBn: 'জাতিসংঘ, বিশ্ব স্বাস্থ্য সংস্থা ও আন্তর্জাতিক সংস্থাসমূহ',
    description: 'UN Charter, WHO structure, UNICEF, World Bank, IMF, WTO, Red Cross / Red Crescent.',
    officialSyllabusPage: 'Official Syllabus Page 6',
    weightageLevel: 'critical',
    displayOrder: 1,
  },
  {
    id: 'top-int-geopolitics-treaties',
    subjectId: 'sub-sbcs-intaffairs',
    topicCode: 'INT-02',
    titleEn: 'Geopolitics, Environmental Treaties & Global Health Security',
    titleBn: 'ভূ-রাজনীতি, পরিবেশ চুক্তি ও বৈশ্বিক স্বাস্থ্য নিরাপত্তা',
    description: 'Global alliances, Paris Climate Agreement, International Health Regulations (IHR), Pandemic Preparedness treaties.',
    officialSyllabusPage: 'Official Syllabus Page 6',
    weightageLevel: 'high',
    displayOrder: 2,
  },

  // ----------------------------------------------------
  // Mathematical Reasoning (Shared - 10 marks)
  // ----------------------------------------------------
  {
    id: 'top-mat-arithmetic-algebra',
    subjectId: 'sub-sbcs-math',
    topicCode: 'MAT-01',
    titleEn: 'Arithmetic, Percentage, Ratio & Algebra',
    titleBn: 'পাটিগণিত, শতকরা, অনুপাত ও বীজগণিতীয় সূত্রাবলী',
    description: 'শতকরা, লাভ-ক্ষতি, সুদকষা, বীজগণিতীয় সমীকরণ, উৎপাদক, সূচক ও লগারিদম।',
    officialSyllabusPage: 'Official Syllabus Page 7',
    weightageLevel: 'critical',
    displayOrder: 1,
  },
  {
    id: 'top-mat-geometry-sequences',
    subjectId: 'sub-sbcs-math',
    topicCode: 'MAT-02',
    titleEn: 'Geometry, Mensuration & Number Sequences',
    titleBn: 'জ্যামিতি, পরিমিতি ও ধারা',
    description: 'ত্রিভুজ, চতুর্ভুজ, বৃত্ত, পিথাগোরাসের উপপাদ্য, সমান্তর ও গুণোত্তর ধারা।',
    officialSyllabusPage: 'Official Syllabus Page 7',
    weightageLevel: 'high',
    displayOrder: 2,
  },

  // ----------------------------------------------------
  // Mental Ability (Shared - 10 marks)
  // ----------------------------------------------------
  {
    id: 'top-men-reasoning',
    subjectId: 'sub-sbcs-mental-ability',
    topicCode: 'MEN-01',
    titleEn: 'Verbal, Logical & Spatial Reasoning',
    titleBn: 'ভাষাগত যুক্তি, কোডিং-ডিকোডিং ও স্থানিক সম্পর্ক',
    description: 'শব্দ সম্পর্ক (Analogies), দিক নির্ণয়, সম্পর্ক নির্ণয় (Blood relations), মিরর ইমেজ ও ক্লক প্রবলেম।',
    officialSyllabusPage: 'Official Syllabus Page 8',
    weightageLevel: 'high',
    displayOrder: 1,
  },

  // ----------------------------------------------------
  // Medical Science — Part I (Assistant Surgeon - 50 marks)
  // ----------------------------------------------------
  {
    id: 'top-med-anatomy-embryology',
    subjectId: 'sub-sbcs-med-sci-1',
    topicCode: 'MED1-01',
    titleEn: 'Gross Anatomy, Histology, Embryology & Neuroanatomy',
    titleBn: 'অ্যানাটমি, হিস্টোলজি, ভ্রূণতত্ত্ব ও নিউরোঅ্যানাটমি',
    description: 'Thorax, Abdomen, Head & Neck, Limbs, cranial nerves, arterial supply, histological organization, development of organs.',
    officialSyllabusPage: 'Official Syllabus Page 9-11',
    weightageLevel: 'critical',
    displayOrder: 1,
  },
  {
    id: 'top-med-physiology-biochem',
    subjectId: 'sub-sbcs-med-sci-1',
    topicCode: 'MED1-02',
    titleEn: 'Medical Physiology, Biochemistry & Metabolism',
    titleBn: 'মেডিকেল ফিজিওলজি ও বায়োকেমিস্ট্রি',
    description: 'Cardiovascular hemodynamics, respiratory gas exchange, nephron function & acid-base, carbohydrate/lipid metabolism, endocrine regulation.',
    officialSyllabusPage: 'Official Syllabus Page 11-12',
    weightageLevel: 'critical',
    displayOrder: 2,
  },
  {
    id: 'top-med-pathology-microbio',
    subjectId: 'sub-sbcs-med-sci-1',
    topicCode: 'MED1-03',
    titleEn: 'General Pathology, Microbiology & Immunology',
    titleBn: 'প্যাথলজি, মাইক্রোবায়োলজি ও ইমিউনোলজি',
    description: 'Cell injury, acute/chronic inflammation, neoplasia, bacterial pathogens, viral replication, hypersensitivity, vaccines.',
    officialSyllabusPage: 'Official Syllabus Page 12-13',
    weightageLevel: 'critical',
    displayOrder: 3,
  },
  {
    id: 'top-med-pharma-forensic-commed',
    subjectId: 'sub-sbcs-med-sci-1',
    topicCode: 'MED1-04',
    titleEn: 'Pharmacology, Community Medicine & Forensic Medicine',
    titleBn: 'ফার্মাকোলজি, কমিউনিটি মেডিসিন ও ফরেনসিক মেডিসিন',
    description: 'Autonomic drugs, antimicrobial classes, epidemiology & biostatistics, national health programs, autopsy, medical ethics & legal issues.',
    officialSyllabusPage: 'Official Syllabus Page 13-14',
    weightageLevel: 'critical',
    displayOrder: 4,
  },

  // ----------------------------------------------------
  // Medical Science — Part II (Assistant Surgeon - 50 marks)
  // ----------------------------------------------------
  {
    id: 'top-med-internal-medicine',
    subjectId: 'sub-sbcs-med-sci-2',
    topicCode: 'MED2-01',
    titleEn: 'Internal Medicine, Cardiology, Pulmonology & Neurology',
    titleBn: 'ইন্টারনাল মেডিসিন, হৃদরোগ, বক্ষব্যাধি ও নিউরোলজি',
    description: 'Myocardial infarction, heart failure, asthma, COPD, pneumonia, stroke, meningitis, diabetes mellitus, thyroid disorders.',
    officialSyllabusPage: 'Official Syllabus Page 14-17',
    weightageLevel: 'critical',
    displayOrder: 1,
  },
  {
    id: 'top-med-general-surgery',
    subjectId: 'sub-sbcs-med-sci-2',
    topicCode: 'MED2-02',
    titleEn: 'General Surgery, Trauma, Acute Abdomen & Orthopedics',
    titleBn: 'জেনারেল সার্জারি, ট্রমা, অ্যাকিউট অ্যাবডোমেন ও অর্থোপেডিক্স',
    description: 'Appendicitis, intestinal obstruction, shock resuscitation, burns management, wound healing, fractures, surgical infections.',
    officialSyllabusPage: 'Official Syllabus Page 17-19',
    weightageLevel: 'critical',
    displayOrder: 2,
  },
  {
    id: 'top-med-obs-gynae',
    subjectId: 'sub-sbcs-med-sci-2',
    topicCode: 'MED2-03',
    titleEn: 'Obstetrics & Gynecology (Maternal Health)',
    titleBn: 'অবস্টেট্রিক্স ও গাইনোকোলজি (মাতৃস্বাস্থ্য)',
    description: 'Antenatal care, labor management, pre-eclampsia/eclampsia, postpartum hemorrhage (PPH), ectopic pregnancy, cervical screening.',
    officialSyllabusPage: 'Official Syllabus Page 19-20',
    weightageLevel: 'critical',
    displayOrder: 3,
  },
  {
    id: 'top-med-pediatrics',
    subjectId: 'sub-sbcs-med-sci-2',
    topicCode: 'MED2-04',
    titleEn: 'Pediatrics, Neonatology & Child Health',
    titleBn: 'শিশু স্বাস্থ্য ও নবজাতকবিদ্যা',
    description: 'Neonatal jaundice, birth asphyxia, diarrhea and ORS/zinc, acute malnutrition (SAM/MAM), immunization schedule, pediatric emergencies.',
    officialSyllabusPage: 'Official Syllabus Page 20-21',
    weightageLevel: 'critical',
    displayOrder: 4,
  },

  // ----------------------------------------------------
  // Dental Science — Part I (Assistant Dental Surgeon - 50 marks)
  // ----------------------------------------------------
  {
    id: 'top-den-anatomy-materials',
    subjectId: 'sub-sbcs-den-sci-1',
    topicCode: 'DEN1-01',
    titleEn: 'Dental Anatomy, Embryology, Histology & Dental Materials',
    titleBn: 'ডেন্টাল অ্যানাটমি, হিস্টোলজি ও ডেন্টাল ম্যাটেরিয়ালস',
    description: 'Tooth morphology, eruption chronology, enamel/dentin/pulp histology, impression materials, restorative resins, dental cements.',
    officialSyllabusPage: 'Official Syllabus Page 22-24',
    weightageLevel: 'critical',
    displayOrder: 1,
  },
  {
    id: 'top-den-basic-sciences',
    subjectId: 'sub-sbcs-den-sci-1',
    topicCode: 'DEN1-02',
    titleEn: 'Oral Pathology, Microbiology & Systemic Basic Sciences',
    titleBn: 'ওরাল প্যাথলজি, মাইক্রোবায়োলজি ও বেসিক সায়েন্স',
    description: 'Dental caries microbiology, odontogenic cysts & tumors, salivary gland disorders, head & neck anatomy, craniofacial nerves.',
    officialSyllabusPage: 'Official Syllabus Page 24-26',
    weightageLevel: 'critical',
    displayOrder: 2,
  },

  // ----------------------------------------------------
  // Dental Science — Part II (Assistant Dental Surgeon - 50 marks)
  // ----------------------------------------------------
  {
    id: 'top-den-oral-surgery',
    subjectId: 'sub-sbcs-den-sci-2',
    topicCode: 'DEN2-01',
    titleEn: 'Oral & Maxillofacial Surgery, Anesthesia & Trauma',
    titleBn: 'ওরাল অ্যান্ড ম্যাক্সিলোফেসিয়াল সার্জারি ও অ্যানেস্থেশিয়া',
    description: 'Exodontia, impacted mandibular third molars, maxillofacial trauma, local anesthesia techniques & complications, oral precancer.',
    officialSyllabusPage: 'Official Syllabus Page 27-28',
    weightageLevel: 'critical',
    displayOrder: 1,
  },
  {
    id: 'top-den-restorative-ortho-perio',
    subjectId: 'sub-sbcs-den-sci-2',
    topicCode: 'DEN2-02',
    titleEn: 'Conservative Dentistry, Endodontics, Orthodontics & Periodontology',
    titleBn: 'কনজারভেটিভ ডেন্টিস্ট্রি, এন্ডোডন্টিক্স, অর্থোডন্টিক্স ও পেরিওডন্টোলজি',
    description: 'Root canal treatment (RCT), gingivitis & periodontitis pathogenesis, malocclusion classification, prosthodontic rehabilitation.',
    officialSyllabusPage: 'Official Syllabus Page 28-30',
    weightageLevel: 'critical',
    displayOrder: 2,
  },
];
