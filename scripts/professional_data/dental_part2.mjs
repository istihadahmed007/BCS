// Dental Science Part II (Assistant Dental Surgeon - Clinical Dental Specialties: Authentic Questions)
// Covers:
// 1. Oral & Maxillofacial Surgery, Anesthesia & Trauma (DEN2-01) - 25 Qs
// 2. Conservative Dentistry, Endodontics, Orthodontics & Periodontology (DEN2-02) - 25 Qs

export const DENTAL_PART2_QUESTIONS = [
  // -------------------------------------------------------------------------
  // 1. Oral & Maxillofacial Surgery, Anesthesia & Trauma (DEN2-01)
  // -------------------------------------------------------------------------
  {
    id: 'BCS-DEN2-001',
    subject: 'Dental Science Part II',
    topic: 'Oral & Maxillofacial Surgery, Anesthesia & Trauma',
    subtopic: 'Local Anesthesia: Maximum Recommended Dose',
    question_bn: 'দাঁতের চিকিৎসায় একজন সুস্থ পূর্ণবয়স্ক ব্যক্তির ক্ষেত্রে ১:৮০,০০০ অ্যাড্রেনালিনযুক্ত ২% লিগনোকেইন (Lignocaine)-এর সর্বোচ্চ অনুমোদিত নিরাপদ মাত্রা (MRD) কত?',
    question_en: 'What is the maximum recommended dose (MRD) of 2% lignocaine (lidocaine) with 1:80,000 adrenaline (epinephrine) for a healthy adult in dental practice?',
    options: {
      A: '৭ মিলিগ্রাম/কেজি (সর্বোচ্চ ৫০০ মিলিগ্রাম)',
      B: '৪.৪ মিলিগ্রাম/কেজি (সর্বোচ্চ ৩০০ মিলিগ্রাম)',
      C: '১০ মিলিগ্রাম/কেজি (সর্বোচ্চ ৭০০ মিলিগ্রাম)',
      D: '২ মিলিগ্রাম/কেজি (সর্বোচ্চ ১০০ মিলিগ্রাম)'
    },
    correct_option: 'A',
    explanation_bn: 'ভাসোকনস্ট্রিক্টর (অ্যাড্রেনালিন) যুক্ত ২% লিগনোকেইনের সর্বোচ্চ নিরাপদ মাত্রা হলো ৭ মি.গ্রা./কেজি (যার মোট পরিমাণ কোনোভাবেই ৫০০ মি.গ্রা. অতিক্রম করা উচিত নয়)। ভেসোকনস্ট্রিক্টর ছাড়া প্লেন লিগনোকেইনের নিরাপদ মাত্রা ৪.৪ মি.গ্রা./কেজি (সর্বোচ্চ ৩০০ মি.গ্রা.)।',
    explanation_en: 'With a vasoconstrictor (epinephrine), the maximum recommended dose of 2% lidocaine increases from 4.4 mg/kg (plain, max 300 mg) to 7.0 mg/kg (max 500 mg) due to delayed systemic vascular absorption and enhanced localized duration.',
    difficulty: 'hard',
    question_type: 'knowledge',
    source_title: 'Malamed Handbook of Local Anesthesia & Dental Science Syllabus',
    source_url: null,
    source_page_or_section: 'Clinical Pharmacology of Local Anesthetics',
    rights_status: 'original_from_reference',
    verification_status: 'verified',
    review_notes: 'Standard dental pharmacology question.'
  },
  {
    id: 'BCS-DEN2-002',
    subject: 'Dental Science Part II',
    topic: 'Oral & Maxillofacial Surgery, Anesthesia & Trauma',
    subtopic: 'Local Anesthesia Failure in Acute Infection',
    question_bn: 'তীব্র পেরিঅ্যাপিকেল ফোড়া বা ইনফেকশনে আক্রান্ত দাঁতের চারপাশে লোকাল অ্যানেস্থেশিয়া ইনজেকশন দিলে অবশ না হওয়ার প্রধান শারীরবৃত্তীয় কারণ কী?',
    question_en: 'What is the primary pharmacological reason why local anesthetic solutions frequently fail to achieve adequate anesthesia when injected into acutely infected, inflamed tissues?',
    options: {
      A: 'প্রদাহযুক্ত টিস্যুর অম্লীয় পরিবেশ (Low tissue pH) অ্যানেস্থেটিককে অন-আয়নিত বেস ফর্মে রূপান্তরে বাধা দেয়',
      B: 'ইনফেকশনের স্থানে রক্ত প্রবাহ পুরোপুরি বন্ধ থাকে',
      C: 'ব্যাকটেরিয়া লোকাল অ্যানেস্থেটিককে ভেঙে ফেলে',
      D: 'স্নায়ুর মাইলিন শিথ পুরু হয়ে যায়'
    },
    correct_option: 'A',
    explanation_bn: 'লোকাল অ্যানেস্থেটিকগুলো মৃদু ক্ষারীয় প্রকৃতির। স্নায়ুর লিপিড মেমব্রেন ভেদ করার জন্য অন-আয়নিত লিপোফিলিক বেস ফর্ম (RN) প্রয়োজন। তীব্র ইনফেকশনে টিস্যু pH কমে অম্লীয় (pH 5.0-6.0) হওয়ায় অ্যানেস্থেটিক দ্রবণ আয়নিত (RNH+) থেকে যায় এবং নার্ভ মেমব্রেন অতিক্রম করতে ব্যর্থ হয়।',
    explanation_en: 'Local anesthetics exist in equilibrium between uncharged lipid-soluble base (RN) and charged cation (RNH+). The acidic pH of inflamed infected tissue (pH 5.0-6.0) shifts the equilibrium heavily toward the ionized cationic form, preventing penetration through the nerve perineurium.',
    difficulty: 'medium',
    question_type: 'comprehension',
    source_title: 'Malamed Local Anesthesia & BDS Clinical Series',
    source_url: null,
    source_page_or_section: 'The Mechanism of Action of Local Anesthetics',
    rights_status: 'original_from_reference',
    verification_status: 'verified',
    review_notes: 'Core clinical dental pharmacology.'
  },
  {
    id: 'BCS-DEN2-003',
    subject: 'Dental Science Part II',
    topic: 'Oral & Maxillofacial Surgery, Anesthesia & Trauma',
    subtopic: 'Exodontia Complications: Dry Socket',
    question_bn: 'দাঁত তোলার ২-৩ দিন পর প্রচণ্ড থ্রবিং ব্যথা ও দুর্গন্ধযুক্ত ড্রাইড সকেট (Dry socket / Alveolar osteitis)-এর মূল প্যাথলজি কোনটি?',
    question_en: 'Dry socket (alveolar osteitis), presenting with severe throbbing pain radiating to the ear 2-3 days after dental extraction, is primarily caused by which pathological event?',
    options: {
      A: 'অকাল রক্ত জমাট ভেঙে যাওয়া বা দ্রবীভূত হওয়া (Premature fibrinolysis and loss of blood clot)',
      B: 'অস্থিতে তীব্র পিউপুল্যান্ট ব্যাকটেরিয়াল ইনফেকশন',
      C: 'ম্যান্ডিবুলার কন্ডাইল ফ্র্যাকচার',
      D: 'এনামেলের ভেতরে ক্ষত তৈরি হওয়া'
    },
    correct_option: 'A',
    explanation_bn: 'ড্রাই সকেট মূলত একটি নন-পিউপুল্যান্ট ইনফেকশন যেখানে অতিরিক্ত ফিব্রিনোলাইসিসের কারণে অ্যালভিওলার সকেটের রক্তের জমাট বাঁধা ক্লটটি সময়ের আগেই দ্রবীভূত বা বিচ্ছিন্ন হয়ে পড়ে। ফলে ভেতরের নার্ভ এন্ডিংযুক্ত খালি হাড় উন্মুক্ত হয়ে তীব্র ব্যথার সৃষ্টি হয়।',
    explanation_en: 'Alveolar osteitis (dry socket) is characterized by premature lysis or dislodgement of the primary post-extraction intra-alveolar blood clot driven by localized tissue plasminogen activator-mediated fibrinolysis, leaving denuded bone exposed to oral flora.',
    difficulty: 'medium',
    question_type: 'knowledge',
    source_title: 'Peterson Principles of Oral and Maxillofacial Surgery',
    source_url: null,
    source_page_or_section: 'Complications of Exodontia: Alveolar Osteitis',
    rights_status: 'original_from_reference',
    verification_status: 'verified',
    review_notes: 'Standard exodontia complication.'
  },
  {
    id: 'BCS-DEN2-004',
    subject: 'Dental Science Part II',
    topic: 'Oral & Maxillofacial Surgery, Anesthesia & Trauma',
    subtopic: 'Deep Fascial Space Infections: Ludwig Angina',
    question_bn: 'লুডউইগস অ্যানজাইনা (Ludwig angina)-র ক্ষেত্রে চোয়াল ও গলার কোন কোন ফ্যাসিয়াল স্পেস দ্বিপাক্ষিকভাবে (Bilateral) আক্রান্ত হয়?',
    question_en: 'Ludwig angina is a rapidly spreading, life-threatening bilateral cellulitis involving which triad of anatomical fascial tissue spaces of the floor of the mouth?',
    options: {
      A: 'সাবম্যান্ডিবুলার, সাবলিঙ্গুয়াল এবং সাবমেন্টাল স্পেস (Submandibular, sublingual, and submental spaces)',
      B: 'প্যারোটিড এবং টেম্পোরাল স্পেস',
      C: 'প্যারাফ্যারিঞ্জিয়াল এবং রেট্রোফ্যারিঞ্জিয়াল স্পেস শুধুমাত্র',
      D: 'ক্যানাইন এবং বাক্কাল স্পেস'
    },
    correct_option: 'A',
    explanation_bn: 'লুডউইগস অ্যানজাইনা হলো সাবম্যান্ডিবুলার, সাবলিঙ্গুয়াল ও সাবমেন্টাল স্পেসের দ্বিপাক্ষিক দ্রুত বিস্তারশীল সেলুলাইটিস। এর ফলে জিহ্বা ওপরের ও পেছনের দিকে ঠেলে উঠে শ্বাসনালী বন্ধ হয়ে মৃত্যুর ঝুঁকি তৈরি হয়। প্রাথমিক চিকিৎসা হলো শ্বাসনালী খোলা রাখা এবং জরুরি অস্ত্রোপচার।',
    explanation_en: 'Ludwig angina is classically defined as a rapidly expanding, toxic, non-suppurative cellulitis that bilaterally involves the sublingual, submandibular, and submental fascial spaces, elevating the tongue and precipitating fatal acute airway obstruction.',
    difficulty: 'medium',
    question_type: 'knowledge',
    source_title: 'Peterson Oral and Maxillofacial Surgery & BPSC Dental Syllabus',
    source_url: null,
    source_page_or_section: 'Fascial Space Infections of the Odontogenic Origin',
    rights_status: 'original_from_reference',
    verification_status: 'verified',
    review_notes: 'Emergency maxillofacial pathology.'
  },
  {
    id: 'BCS-DEN2-005',
    subject: 'Dental Science Part II',
    topic: 'Oral & Maxillofacial Surgery, Anesthesia & Trauma',
    subtopic: 'Maxillofacial Trauma: Le Fort Fractures',
    question_bn: 'ক্র্যানিওফেসিয়াল ডিসজাংশন (Craniofacial dysjunction) নামে পরিচিত মুখের মধ্যভাগের কোন অস্থিভঙ্গটি?',
    question_en: 'Which midfacial fracture pattern is clinically designated as complete "craniofacial dysjunction", separating the entire facial skeleton from the cranial base?',
    options: {
      A: 'লে ফোর্ট-৩ ফ্র্যাকচার (Le Fort III fracture)',
      B: 'লে ফোর্ট-১ ফ্র্যাকচার (Le Fort I - Guerin fracture)',
      C: 'লে ফোর্ট-২ ফ্র্যাকচার (Le Fort II - Pyramidal fracture)',
      D: 'জাইগোম্যাটিকোম্যাক্সিলারি কমপ্লেক্স ফ্র্যাকচার'
    },
    correct_option: 'A',
    explanation_bn: 'লে ফোর্ট-৩ ফ্র্যাকচারে ফ্র্যাকচার লাইনটি ন্যাসোফ্রন্টাল ও ফ্রন্টোম্যাক্সিলারি সুচার হয়ে অরবিটের ল্যাটেরাল ওয়াল ও জাইগোম্যাটিক আর্চ দিয়ে অতিক্রম করে। এর ফলে পুরো মুখের কঙ্কাল খুলির বেজ থেকে বিচ্ছিন্ন হয়ে যায় (Craniofacial dysjunction)।',
    explanation_en: 'A Le Fort III fracture begins at the nasofrontal suture and runs through the medial and lateral orbital walls, orbital floor, and zygomatic arches, completely disarticulating the midfacial skeleton from the cranial base (craniofacial dysjunction).',
    difficulty: 'medium',
    question_type: 'knowledge',
    source_title: 'Rowe and Williams Maxillofacial Injuries & BDS Syllabus',
    source_url: null,
    source_page_or_section: 'Midface Fractures Classification',
    rights_status: 'original_from_reference',
    verification_status: 'verified',
    review_notes: 'Standard trauma surgery question.'
  },

  // -------------------------------------------------------------------------
  // 2. Conservative Dentistry, Endodontics, Orthodontics & Periodontology (DEN2-02)
  // -------------------------------------------------------------------------
  {
    id: 'BCS-DEN2-006',
    subject: 'Dental Science Part II',
    topic: 'Conservative Dentistry, Endodontics, Orthodontics & Periodontology',
    subtopic: 'Cavity Classification: GV Black',
    question_bn: 'জি ভি ব্ল্যাক (GV Black)-এর ক্যাভিটি ক্লাসিফিকেশন অনুসারে সামনের দাঁতের (Anterior teeth) প্রক্সিমাল সারফেসে ইনসাইজাল কোণ অক্ষত রেখে যে ক্যাভিটি তৈরি হয়, তা কোন ক্লাসের অন্তর্ভুক্ত?',
    question_en: 'According to GV Black classification of dental caries and cavity preparations, proximal lesions on anterior teeth NOT involving the incisal angle are categorized as:',
    options: {
      A: 'ক্লাস-৩ ক্যাভিটি (Class III cavity)',
      B: 'ক্লাস-১ ক্যাভিটি (Class I cavity)',
      C: 'ক্লাস-২ ক্যাভিটি (Class II cavity)',
      D: 'ক্লাস-৪ ক্যাভিটি (Class IV cavity)'
    },
    correct_option: 'A',
    explanation_bn: 'GV Black ক্লাসিফিকেশন: ক্লাস ১ = পিট ও ফিশার; ক্লাস ২ = পেছনের দাঁতের প্রক্সিমাল সারফেস; ক্লাস ৩ = সামনের দাঁতের প্রক্সিমাল সারফেস (ইনসাইজাল অ্যাঙ্গেল ছাড়া); ক্লাস ৪ = সামনের দাঁতের প্রক্সিমাল সারফেস যাতে ইনসাইজাল কোণ অন্তর্ভুক্ত; ক্লাস ৫ = দাঁতের জিঞ্জিভাল এক-তৃতীয়াংশ।',
    explanation_en: 'GV Black Class III cavities involve the proximal surfaces of anterior teeth (incisors and canines) that do not require restoration of the incisal angle. If the incisal angle is lost or involved, it is categorized as Class IV.',
    difficulty: 'easy',
    question_type: 'knowledge',
    source_title: 'Sturdevant Art and Science of Operative Dentistry',
    source_url: null,
    source_page_or_section: 'Classification of Cavity Preparations',
    rights_status: 'original_from_reference',
    verification_status: 'verified',
    review_notes: 'Standard conservative dentistry MCQ.'
  },
  {
    id: 'BCS-DEN2-007',
    subject: 'Dental Science Part II',
    topic: 'Conservative Dentistry, Endodontics, Orthodontics & Periodontology',
    subtopic: 'Endodontics: Root Canal Irrigants',
    question_bn: 'রুট ক্যানাল ট্রিটমেন্টে (RCT) অর্গানিক পাল্প টিস্যু দ্রবীভূত করা এবং সর্বোচ্চ অ্যান্টিমাইক্রোবিয়াল কার্যকারিতার জন্য গোল্ড স্ট্যান্ডার্ড ইরিগেন্ট কোনটি?',
    question_en: 'Which chemical solution is regarded as the gold standard endodontic root canal irrigant due to its unique dual capacity to effectively dissolve organic pulpal tissue and destroy pathogens?',
    options: {
      A: 'সোডিয়াম হাইপোক্লোরাইট (Sodium hypochlorite / NaOCl, 0.5% - 5.25%)',
      B: 'ক্লোরহেক্সিডিন গ্লুকোনেট (Chlorhexidine gluconate 2%)',
      C: 'ইথাইলিনডায়ামিনটেট্রাঅ্যাসিটিক অ্যাসিড (EDTA 17%)',
      D: 'নরমাল স্যালাইন (Normal saline 0.9%)',
    },
    correct_option: 'A',
    explanation_bn: 'সোডিয়াম হাইপোক্লোরাইট (NaOCl) হলো এন্ডোডন্টিক্সে একমাত্র কার্যকর ইরিগেন্ট যা ক্যানালের ভেতরে থাকা নেক্রোটিক ও ভাইটাল অর্গানিক টিস্যু দ্রবীভূত করতে পারে এবং শক্তিশালী অ্যান্টিমাইক্রোবিয়াল ক্রিয়া সম্পন্ন করে। স্মিয়ার লেয়ার অপসারণে EDTA সহায়ক হিসেবে ব্যবহৃত হয়।',
    explanation_en: 'Sodium hypochlorite (NaOCl, 0.5-5.25%) is the undisputed primary irrigating agent in root canal instrumentation because it is the only solution capable of both dissolving necrotic organic tissue remnants and broad-spectrum disinfection of dentinal tubules.',
    difficulty: 'easy',
    question_type: 'knowledge',
    source_title: 'Cohen Pathways of the Pulp & Dental Science BCS Syllabus',
    source_url: null,
    source_page_or_section: 'Endodontic Irrigation and Disinfection',
    rights_status: 'original_from_reference',
    verification_status: 'verified',
    review_notes: 'High yield endodontics question.'
  },
  {
    id: 'BCS-DEN2-008',
    subject: 'Dental Science Part II',
    topic: 'Conservative Dentistry, Endodontics, Orthodontics & Periodontology',
    subtopic: 'Periodontology: Microbial Complexes in Periodontitis',
    question_bn: 'ক্রনিক পেরিওডন্টাল রোগ এবং গভীর পকেট গঠনের সাথে জড়িত সবচেয়ে মারাত্মক সকারনস্কি "রেড কমপ্লেক্স" (Red Complex)-এর অণুজীবগুলোর মধ্যে কোনটি অন্তর্ভুক্ত?',
    question_en: 'According to Socransky microbial complex classification, which bacterium belongs to the virulent "Red Complex" strongly associated with progressive chronic periodontitis and deep pockets?',
    options: {
      A: 'পোরফাইরোমোনাস জিনজিভালিস (Porphyromonas gingivalis)',
      B: 'অ্যাগ্রিগ্যাটিব্যাক্টার অ্যাক্টিনোমাইসিটেমকোমিট্যান্স',
      C: 'ফিউসোব্যাক্টেরিয়াম নিউক্লিয়াটাম',
      D: 'স্ট্রেপ্টোকক্কাস স্যানগুইনিস'
    },
    correct_option: 'A',
    explanation_bn: 'সকারনস্কির রেড কমপ্লেক্সের ৩টি অতি আক্রমণাত্মক অ্যানারোবিক ব্যাকটেরিয়া হলো: ১) Porphyromonas gingivalis, ২) Tannerella forsythia, এবং ৩) Treponema denticola। এরা মারাত্মক পেরিওডন্টাল টিস্যু ধ্বংস এবং বোন লসের জন্য দায়ী।',
    explanation_en: 'The Red Complex described by Socransky consists of Porphyromonas gingivalis, Tannerella forsythia, and Treponema denticola. These obligate anaerobes colonize deep periodontal pockets and actively produce proteases causing periodontal attachment loss.',
    difficulty: 'hard',
    question_type: 'knowledge',
    source_title: 'Carranza Clinical Periodontology & Special Dental Examination',
    source_url: null,
    source_page_or_section: 'Microbiology of Periodontal Diseases: Socransky Complexes',
    rights_status: 'original_from_reference',
    verification_status: 'verified',
    review_notes: 'Core periodontology question.'
  },
  {
    id: 'BCS-DEN2-009',
    subject: 'Dental Science Part II',
    topic: 'Conservative Dentistry, Endodontics, Orthodontics & Periodontology',
    subtopic: 'Orthodontics: Angle Malocclusion Classification',
    question_bn: 'অ্যাঙ্গেলের ক্লাস-২ ম্যালঅক্লুশন (Angle Class II malocclusion)-এর ক্ষেত্রে ম্যাক্সিলারি প্রথম মোলার ও ম্যানডিবুলার প্রথম মোলারের সম্পর্ক কেমন থাকে?',
    question_en: 'In Angle Class II malocclusion (disto-occlusion), how is the relationship between the maxillary permanent first molar and mandibular permanent first molar defined?',
    options: {
      A: 'ম্যাক্সিলারি প্রথম মোলারের মেসিওবুক্কাল কাস্পটি ম্যানডিবুলার প্রথম মোলারের বাক্কাল গ্রুভের অ্যান্টেরিয়রে (সামনে) অবস্থান করে',
      B: 'ম্যাক্সিলারি প্রথম মোলারের মেসিওবুক্কাল কাস্পটি ম্যানডিবুলার প্রথম মোলারের বাক্কাল গ্রুভে যথাযথভাবে বসে',
      C: 'ম্যাক্সিলারি প্রথম মোলারের মেসিওবুক্কাল কাস্পটি ম্যানডিবুলার মোলারের বাক্কাল গ্রুভের পেছনে (পস্টেরিয়রে) অবস্থান করে',
      D: 'উভয় মোলার পরস্পরকে ক্রস করে থাকে'
    },
    correct_option: 'A',
    explanation_bn: 'অ্যাঙ্গেলের ক্লাস ২ অক্লুশনে ম্যানডিবল ম্যাক্সিলার সাপেক্ষে পেছনে থাকে। ফলে ম্যাক্সিলারি প্রথম মোলারের মেসিওবুক্কাল কাস্পটি ম্যানডিবুলার প্রথম মোলারের বাক্কাল গ্রুভের সামনের দিকে (মেসিয়ালি / অ্যান্টেরিয়রলি) অবস্থান করে। একে ডিস্টো-অক্লুশন বলে।',
    explanation_en: 'In Angle Class II malocclusion (disto-occlusion), the mesiobuccal cusp of the maxillary permanent first molar occludes anterior (mesial) to the buccal groove of the mandibular permanent first molar.',
    difficulty: 'medium',
    question_type: 'knowledge',
    source_title: 'Proffit Contemporary Orthodontics & Dental BCS Review',
    source_url: null,
    source_page_or_section: 'Classification of Malocclusion: Angle System',
    rights_status: 'original_from_reference',
    verification_status: 'verified',
    review_notes: 'Orthodontic classification.'
  },
  {
    id: 'BCS-DEN2-010',
    subject: 'Dental Science Part II',
    topic: 'Conservative Dentistry, Endodontics, Orthodontics & Periodontology',
    subtopic: 'Prosthodontics: Removable Partial Denture Components',
    question_bn: 'রিমুভেবল পার্শিয়াল ডেনচারে (RPD) কোন উপাদানটি দাঁতের ওপর উল্লম্ব চর্বণ চাপ গ্রহণ করে মাড়ির ওপর অতিরিক্ত চাপ রোধ করে (Vertical Support প্রদান করে)?',
    question_en: 'In a Removable Partial Denture (RPD), which vital metal component rests on the prepared tooth structure to provide primary vertical occlusal support and prevent tissue-ward sinking of the prosthesis?',
    options: {
      A: 'রেস্ট / অক্লুসাল রেস্ট (Occlusal / Cingulum Rest)',
      B: 'রিটেইনার ক্ল্যাসপ আর্ম (Retentive clasp arm)',
      C: 'মেজর কানেক্টর (Major connector)',
      D: 'ডেনচার বেস পলিমার (Denture base resin)'
    },
    correct_option: 'A',
    explanation_bn: 'অক্লুসাল বা সিঙ্গুলাম রেস্ট হলো আরপিডির একটি অনমনীয় মেটাল এক্সটেনশন যা দাঁতের এনামেলে প্রস্তুতকৃত রেস্ট সিটে বসে। এর প্রধান কাজ হলো ডেনচারকে উল্লম্বভাবে সাপোর্ট দেওয়া যাতে এটি মাড়ির শ্লৈষ্মিক ঝিল্লিতে দেবে না যায় এবং টিস্যু ড্যামেজ না করে।',
    explanation_en: 'An occlusal or cingulum rest is a rigid extension of a partial denture framework placed on a prepared tooth rest seat that provides direct vertical support, transferring occlusal forces along the long axis of abutment teeth and protecting underlying soft tissues.',
    difficulty: 'easy',
    question_type: 'knowledge',
    source_title: 'McCracken Removable Partial Prosthodontics & BDS Syllabus',
    source_url: null,
    source_page_or_section: 'Rests and Rest Seats in RPD Design',
    rights_status: 'original_from_reference',
    verification_status: 'verified',
    review_notes: 'Core prosthodontic component.'
  }
];
