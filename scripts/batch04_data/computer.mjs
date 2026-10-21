export const computerQuestions = [
  {
    subject: "Computer and Information Technology",
    topic: "কম্পিউটার হার্ডওয়্যার ও মেমোরি",
    subtopic: "এসএসডি (SSD) বনাম এইচডিডি (HDD)",
    question_bn: "আধুনিক সলিড স্টেট ড্রাইভ (SSD)-এ কোনো ঘূর্ণায়মান ডিস্ক ছাড়া ইলেকট্রনিকভাবে ডেটা সংরক্ষণে কোন মেমোরি চিপ ব্যবহৃত হয়?",
    question_en: "Which non-volatile semiconductor memory technology is utilized inside Solid State Drives (SSDs)?",
    options: {
      A: "NAND ফ্ল্যাশ মেমোরি (NAND Flash Memory)",
      B: "DRAM মেমোরি",
      C: "SRAM মেমোরি",
      D: "চৌম্বকীয় ফিতা"
    },
    correct_option: "A",
    explanation_bn: "এসএসডি (SSD)-তে চিরাচরিত হার্ডডিস্কের (HDD) মতো কোনো মেকানিক্যাল মুভিং পার্টস বা স্পিন্ডল মোটর থাকে না। এতে সিলিকন চিপের ওপর তৈরি উচ্চগতির অ-উদ্বায়ী 'NAND Flash Memory' ব্যবহৃত হয়, ফলে এর ডাটা রিড/রাইট স্পিড অত্যন্ত দ্রুত এবং বিদ্যুৎ খরচ কম হয়।",
    explanation_en: "SSDs employ non-volatile NAND flash memory chips to achieve high-speed data access without mechanical moving components.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "Computer Architecture: A Quantitative Approach — Hennessy & Patterson",
    source_page_or_section: "Flash Storage and SSD Architecture"
  },
  {
    subject: "Computer and Information Technology",
    topic: "কম্পিউটার সংগঠন",
    subtopic: "মুর-এর সূত্র (Moore's Law)",
    question_bn: "১৯৬৫ সালে ইন্টেলের সহ-প্রতিষ্ঠাতা গর্ডন মুর মাইক্রোপ্রসেসরের ট্রানজিস্টর বৃদ্ধির গতিপ্রকৃতি নিয়ে যে বিখ্যাত পূর্বাভাস দেন তা কী নামে পরিচিত?",
    question_en: "What is the historical empirical observation that the number of transistors on a microchip doubles roughly every two years?",
    options: {
      A: "মুরের সূত্র (Moore's Law)",
      B: "অ্যামডাহলের সূত্র (Amdahl's Law)",
      C: "মেটক্যাফের সূত্র (Metcalfe's Law)",
      D: "শ্যাননের তত্ত্ব"
    },
    correct_option: "A",
    explanation_bn: "ইন্টেলের সহ-প্রতিষ্ঠাতা গর্ডন মুর ১৯৬৫ সালে পর্যবেক্ষণ করেন যে সমন্বিত বর্তনী বা আইসিতে (IC) ট্রানজিস্টরের সংখ্যা প্রতি ১৮ থেকে ২৪ মাসে প্রায় দ্বিগুণ হারে বৃদ্ধি পাবে এবং উৎপাদন খরচ হ্রাস পাবে। এই ঐতিহাসিক পর্যবেক্ষণকে 'মুরের সূত্র' বলা হয়।",
    explanation_en: "Moore's Law predicted that the transistor density on integrated microchips would double roughly every two years.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "Computer Organization and Embedded Systems — Carl Hamacher",
    source_page_or_section: "Historical Evolution of Microprocessors"
  },
  {
    subject: "Computer and Information Technology",
    topic: "সংখ্যা পদ্ধতি ও কোডিং",
    subtopic: "আস্কি কোড (ASCII Code)",
    question_bn: "স্ট্যান্ডার্ড বা মৌলিক 'আস্কি' (Standard ASCII) কোডে প্রতিটি বর্ণ বা চিহ্নের জন্য কত বিট ব্যবহার করা হয়?",
    question_en: "How many bits are utilized to represent a character in standard baseline ASCII encoding?",
    options: {
      A: "৭ বিট (১২৮টি চিহ্ন)",
      B: "৮ বিট (২৫৬টি চিহ্ন)",
      C: "১৬ বিট",
      D: "৩২ বিট"
    },
    correct_option: "A",
    explanation_bn: "মৌলিক ASCII (American Standard Code for Information Interchange) কোড হলো ৭-বিট কোড, যার মাধ্যমে ২^৭ = ১২৮টি ভিন্ন ভিন্ন ক্যারেক্টার (বর্ণ, সংখ্যা ও নিয়ন্ত্রণ সংকেত) প্রকাশ করা যায়। পরবর্তীতে এর সম্প্রসারিত রূপ Extended ASCII-তে ৮ বিট (২৫৬টি চিহ্ন) ব্যবহৃত হয়।",
    explanation_en: "Standard 7-bit ASCII encodes 128 characters (2^7), while Extended ASCII expands this to 8 bits (256 characters).",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "এনসিটিবি একাদশ-দ্বাদশ তথ্য ও যোগাযোগ প্রযুক্তি",
    source_page_or_section: "ক্যারেক্টার এনকোডিং: আসকি ও ইউনিকোড"
  },
  {
    subject: "Computer and Information Technology",
    topic: "সংখ্যা পদ্ধতি ও এনকোডিং",
    subtopic: "ইউনিকোড (Unicode)",
    question_bn: "বিশ্বের সকল ভাষার বর্ণ ও লিখিত লিপিকে একটি সার্বজনীন কোডে অন্তর্ভুক্ত করতে কোন এনকোডিং মান উদ্ভাবিত হয়েছে?",
    question_en: "Which universal character-encoding standard was developed to represent text from all writing systems in digital computing?",
    options: {
      A: "ইউনিকোড (Unicode — UTF-8, UTF-16)",
      B: "আস্কি (ASCII)",
      C: "বিসিডি (BCD)",
      D: "ইবিসিডিআইসি (EBCDIC)"
    },
    correct_option: "A",
    explanation_bn: "বিশ্বের সকল ভাষা (বাংলা, আরবি, চীনা, গ্রিক ইত্যাদি)-র প্রতিটি অক্ষরের জন্য একক ডিজিটাল মান নির্ধারণের জন্য ১৯৮৮ সালে ইউনিকোড কনসোর্টিয়াম 'Unicode' উদ্ভাবন করে। সবচেয়ে জনপ্রিয় বাস্তবায়ন হলো UTF-8। বাংলা লিপির ইউনিকোড ব্লক হলো U+0980 থেকে U+09FF।",
    explanation_en: "Unicode provides a unique numeric code point for every character across all modern and historic world languages.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "The Unicode Standard — Unicode Consortium",
    source_page_or_section: "Unicode Architecture Overview"
  },
  {
    subject: "Computer and Information Technology",
    topic: "কম্পিউটার নেটওয়ার্ক",
    subtopic: "নেটওয়ার্কিং ডিভাইস — রাউটার বনাম সুইচ",
    question_bn: "একই নেটওয়ার্কের অভ্যন্তরীণ একাধিক কম্পিউটারকে যুক্ত করার জন্য ম্যাক (MAC) অ্যাড্রেস ব্যবহার করে ডাটা ফ্রেম ফরোয়ার্ড করে কোন ডিভাইস?",
    question_en: "Which intelligent networking device uses MAC addresses to forward data frames within a Local Area Network (LAN)?",
    options: {
      A: "সুইচ (Network Switch)",
      B: "হাব (Hub)",
      C: "রাউটার (Router)",
      D: "মডেম (Modem)"
    },
    correct_option: "A",
    explanation_bn: "সুইচ ওএসআই মডেলের ২য় স্তরে (Data Link Layer) কাজ করে এবং এটি প্রতিটি পোর্টের সাথে সংযুক্ত ডিভাইসের ম্যাক অ্যাড্রেসের টেবিল তৈরি করে কেবল নির্দিষ্ট গন্তব্য ডিভাইসেই ডেটা ফ্রেম পাঠায় (বুদ্ধিমান ডিভাইস)। হাব নির্বিচারে সব পোর্টে ব্রডকাস্ট করে। আর রাউটার ৩য় স্তরে আইপি অ্যাড্রেস দিয়ে ভিন্ন ভিন্ন নেটওয়ার্ককে যুক্ত করে।",
    explanation_en: "A Layer-2 Network Switch uses a MAC address lookup table to deliver frames directly to the intended destination port.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "Data Communications and Networking — Behrouz A. Forouzan",
    source_page_or_section: "Network Devices: Switches and Hubs"
  },
  {
    subject: "Computer and Information Technology",
    topic: "কম্পিউটার নেটওয়ার্ক",
    subtopic: "নেটওয়ার্ক টপোলজি — মেশ টপোলজি",
    question_bn: "কোন নেটওয়ার্ক টপোলজিতে প্রতিটি নোড বা কম্পিউটার অন্য প্রতিটি নোডের সাথে সরাসরি ডেডিকেটেড ক্যাবল দ্বারা পয়েন্ট-টু-পয়েন্ট যুক্ত থাকে?",
    question_en: "In which network topology is every computer directly connected to every other computer via dedicated point-to-point links?",
    options: {
      A: "মেশ টপোলজি (Mesh Topology)",
      B: "স্টার টপোলজি",
      C: "রিং টপোলজি",
      D: "বাস টপোলজি"
    },
    correct_option: "A",
    explanation_bn: "মেশ টপোলজিতে প্রতিটি কম্পিউটারের মধ্যে সরাসরি পৃথক সংযোগ থাকে। n সংখ্যক নোডের জন্য মোট সংযোগ তার লাগে n(n - 1) / 2 টি। এটি সর্বাধিক নিরাপদ ও নির্ভরযোগ্য কারণ কোনো একটি সংযোগ নষ্ট হলেও বিকল্প অসংখ্য পথ থাকে, তবে এটি অত্যন্ত ব্যয়বহুল।",
    explanation_en: "In a full Mesh Topology, every node connects to every other node, requiring n(n-1)/2 physical communication links.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "এনসিটিবি উচ্চ মাধ্যমিক আইসিটি",
    source_page_or_section: "নেটওয়ার্ক টপোলজি"
  },
  {
    subject: "Computer and Information Technology",
    topic: "ইন্টারনেট ও ডোমেইন নেম সিস্টেম",
    subtopic: "ডিএনএস (DNS)",
    question_bn: "ইন্টারনেটে মানুষের পাঠযোগ্য ওয়েব ঠিকানা বা ডোমেন নামকে (যেমন www.bcs.gov.bd) আইপি ঠিকানায় (IP Address) অনুবাদ করে কোন সেবা?",
    question_en: "Which internet directory service translates human-friendly domain names into machine-readable numeric IP addresses?",
    options: {
      A: "ডিএনএস (Domain Name System / DNS)",
      B: "ডিএইচসিপি (DHCP)",
      C: "এফটিপি (FTP)",
      D: "ভিআইপি (VoIP)"
    },
    correct_option: "A",
    explanation_bn: "DNS (Domain Name System)-কে ইন্টারনেটের 'ফোনবুক' বলা হয়। মানুষ সহজে সংখ্যা মনে রাখতে পারে না তাই ডোমেন নাম লেখে; ডিএনএস সার্ভার সেই ডোমেন নামের সমতুল্য সংশ্লিষ্ট সার্ভারের নিউমেরিক আইপি ঠিকানা (যেমন 192.0.2.1) খুঁজে বের করে ব্রাউজারকে দেয়। ডিএনএস ডিফল্টভাবে পোর্ট ৫৩ ব্যবহার করে।",
    explanation_en: "The Domain Name System (DNS) translates alphanumeric hostnames into binary IP addresses across the internet.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "Computer Networks — Tanenbaum & Wetherall",
    source_page_or_section: "The Domain Name System (DNS)"
  },
  {
    subject: "Computer and Information Technology",
    topic: "ইন্টারনেট নেটওয়ার্কিং",
    subtopic: "ডিএইচসিপি (DHCP)",
    question_bn: "একটি লোকাল নেটওয়ার্কে যুক্ত হওয়া কম্পিউটার ও মোবাইল ডিভাইসগুলোকে স্বয়ংক্রিয়ভাবে আইপি ঠিকানা বরাদ্দ দেয় কোন প্রোটোকল?",
    question_en: "Which network management protocol automatically assigns dynamic IP addresses and network parameters to client devices?",
    options: {
      A: "ডিএইচসিপি (Dynamic Host Configuration Protocol / DHCP)",
      B: "ডিএনএস",
      C: "এআরপি (ARP)",
      D: "আইসিএমপি (ICMP)"
    },
    correct_option: "A",
    explanation_bn: "DHCP (Dynamic Host Configuration Protocol) সার্ভার বা রাউটারে সক্রিয় থাকলে কোনো নতুন ডিভাইস নেটওয়ার্কে যুক্ত হওয়ার সাথে সাথে তাকে স্বয়ংক্রিয়ভাবে সাবনেট মাস্ক, ডিফল্ট গেটওয়ে এবং একটি অব্যবহৃত অস্থায়ী আইপি ঠিকানা লিজ দেয়, ফলে হাতে কোনো আইপি কনফিগার করতে হয় না।",
    explanation_en: "DHCP dynamically automates the assignment of IP addresses, subnet masks, and default gateways to connected clients.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "TCP/IP Protocol Suite — Forouzan",
    source_page_or_section: "DHCP Operations"
  },
  {
    subject: "Computer and Information Technology",
    topic: "সাইবার নিরাপত্তা",
    subtopic: "ডিডস আক্রমণ (DDoS Attack)",
    question_bn: "বিপুল সংখ্যক সংক্রামিত কম্পিউটার বা বোটনেট (Botnet) থেকে একযোগে ভুয়া ট্রাফিকের বন্যা বইয়ে দিয়ে কোনো ওয়েব সার্ভারকে অচল করে দেওয়াকে কী বলে?",
    question_en: "What cyber attack overwhelms a targeted server or network with a flood of malicious traffic from distributed zombie machines (botnets)?",
    options: {
      A: "ডিডস আক্রমণ (Distributed Denial of Service / DDoS)",
      B: "ম্যান-ইন-দ্য-মিডল আক্রমণ",
      C: "এসকিউএল ইনজেকশন",
      D: "ফিশিং অ্যাটাক"
    },
    correct_option: "A",
    explanation_bn: "DDoS (Distributed Denial of Service) আক্রমণে হ্যাকাররা বিশ্বের বিভিন্ন প্রান্তের ম্যালওয়্যার সংক্রামিত হাজার হাজার কম্পিউটার বা আইওটি ডিভাইস (বোটনেট)-কে একসাথে নির্দেশ দিয়ে একটি নির্দিষ্ট সার্ভারে অতিরিক্ত রিকোয়েস্ট পাঠায়, যাতে সার্ভারের ব্যান্ডউইথ নিঃশেষ হয়ে যায় এবং সাধারণ বৈধ ব্যবহারকারীরা সেবায় প্রবেশ করতে ব্যর্থ হয়।",
    explanation_en: "A DDoS attack utilizes distributed compromised nodes (botnets) to flood network resources, causing system denial of service.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "Network Security Essentials — William Stallings",
    source_page_or_section: "Denial of Service Attacks"
  },
  {
    subject: "Computer and Information Technology",
    topic: "সাইবার নিরাপত্তা",
    subtopic: "ফিশিং (Phishing)",
    question_bn: "প্রতারণামূলক নকল ইমেইল বা হুবহু আসল ওয়েবসাইটের মতো দেখতে ভুয়া ওয়েবপেজ বানিয়ে ব্যবহারকারীর পাসওয়ার্ড ও ক্রেডিট কার্ডের গোপন তথ্য হাতিয়ে নেওয়ার কৌশলকে কী বলে?",
    question_en: "What social engineering technique deceives users into revealing sensitive credentials using counterfeit emails or look-alike web pages?",
    options: {
      A: "ফিশিং (Phishing)",
      B: "স্প্যামিং",
      C: "হ্যাকিং",
      D: "ক্র্যাকিং"
    },
    correct_option: "A",
    explanation_bn: "ফিশিং (Phishing) হলো এমন একধরনের সামাজিক ইঞ্জিনিয়ারিং সাইবার প্রতারণা যেখানে ব্যাংক বা বিশ্বস্ত প্রতিষ্ঠানের নামে ভুয়া ইমেইল বা নকল লগইন পেজ পাঠিয়ে ব্যবহারকারীকে বোকা বানিয়ে তার ইউজারনেম, পাসওয়ার্ড, পিন কোড বা ওটিপি চুরি করা হয়। নির্দিষ্ট কোনো উচ্চপদস্থ ব্যক্তিকে টার্গেট করলে তাকে 'স্পিয়ার ফিশিং' বলে।",
    explanation_en: "Phishing tricks victims into surrendering passwords, credit card numbers, or personal data via deceptive fraudulent communications.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "Cybersecurity for Beginners — Raef Meeuwisse",
    source_page_or_section: "Social Engineering and Phishing"
  },
  {
    subject: "Computer and Information Technology",
    topic: "ডাটাবেজ সিস্টেম",
    subtopic: "এসিড ধর্মাবলী (ACID Properties)",
    question_bn: "ডাটাবেজ ম্যানেজমেন্ট সিস্টেমে যেকোনো লেনদেন বা ট্রানজ্যাকশনের নির্ভরযোগ্যতা নিশ্চিতে 'ACID'-এর পূর্ণরূপ কোনটি?",
    question_en: "What does the standard acronym 'ACID' stand for regarding relational database transaction integrity?",
    options: {
      A: "Atomicity, Consistency, Isolation, Durability",
      B: "Accuracy, Consistency, Integrity, Dependency",
      C: "Authentication, Control, Identification, Data",
      D: "Access, Concurrency, Indexing, Delivery"
    },
    correct_option: "A",
    explanation_bn: "ডাটাবেজে ট্রানজ্যাকশন সুরক্ষিত রাখতে চারটি মূল বৈশিষ্ট্য নিশ্চিত করতে হয় (ACID): (১) Atomicity: লেনদেন হয় পুরোপুরি সফল হবে, নয়তো সম্পূর্ণ বাতিল হবে (All or Nothing); (২) Consistency: ডেটার বৈধ নিয়ম অক্ষুণ্ণ থাকবে; (৩) Isolation: একাধিক লেনদেন পরস্পরের কাজে বিঘ্ন ঘটাবে না; (৪) Durability: সফল লেনদেনের ফলাফল চিরস্থায়ী হবে।",
    explanation_en: "ACID represents Atomicity, Consistency, Isolation, and Durability, guaranteeing transactional database validity.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "Database System Concepts — Silberschatz, Korth, Sudarshan",
    source_page_or_section: "Transactions and ACID Properties"
  },
  {
    subject: "Computer and Information Technology",
    topic: "ডাটাবেজ সিস্টেম",
    subtopic: "ডাটাবেজ নরমালাইজেশন",
    question_bn: "ডাটাবেজে তথ্যের অপচয় বা পুনরাবৃত্তি (Redundancy) কমানো এবং ডেটা অখণ্ডতা রক্ষার লক্ষ্যে টেবিলগুলোকে ধাপে ধাপে সুবিন্যস্ত করার প্রক্রিয়াকে কী বলে?",
    question_en: "The systematic technique of organizing relational database tables to minimize redundant duplication and eliminate anomalies is called:",
    options: {
      A: "নরমালাইজেশন (Normalization)",
      B: "ইনডেক্সিং (Indexing)",
      C: "এনক্রিপশন",
      D: "ডাটা মাইনিং"
    },
    correct_option: "A",
    explanation_bn: "এডগার এফ. কড কর্তৃক উদ্ভাবিত নরমালাইজেশন (Normalization) হলো জটিল রিলেশনাল টেবিলকে বিভাজন করে ডেটার অপ্রয়োজনীয় পুনরাবৃত্তি পরিহার করা এবং ডেটা ইনসার্ট, আপডেট ও ডিলিট জনিত অসঙ্গতি দূর করার বৈজ্ঞানিক পদ্ধতি (1NF, 2NF, 3NF, BCNF)।",
    explanation_en: "Normalization organizes database attributes into well-structured relations, minimizing update, insertion, and deletion anomalies.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "Fundamentals of Database Systems — Elmasri & Navathe",
    source_page_or_section: "Functional Dependencies and Normalization"
  },
  {
    subject: "Computer and Information Technology",
    topic: "ওয়েব প্রযুক্তি",
    subtopic: "কুকিজ বনাম সেশন",
    question_bn: "ব্যবহারকারীর ওয়েব ব্রাউজিং সংক্রান্ত তথ্য, লগইন অবস্থা বা পছন্দসমূহ ট্র্যাক করতে ব্রাউজারের ক্লায়েন্ট কম্পিউটারে সংরক্ষিত ক্ষুদ্র টেক্সট ফাইলকে কী বলে?",
    question_en: "What small text file stored on a client computer by a web browser maintains state, user preferences, and tracking across sessions?",
    options: {
      A: "কুকি (Cookie)",
      B: "সেশন (Session)",
      C: "ক্যাশ (Cache)",
      D: "পপ-আপ"
    },
    correct_option: "A",
    explanation_bn: "ওয়েব ব্রাউজার ক্লায়েন্ট মেশিনে সার্ভার প্রেরিত যে ক্ষুদ্র ফাইল সংরক্ষণ করে তাকে কুকি (HTTP Cookie) বলে। এটি পুনরায় ওয়েবসাইটে প্রবেশকালে ব্যবহারকারীকে শনাক্ত করতে এবং কার্টের পণ্য মনে রাখতে সাহায্য করে। আর সেশন ডেটা সংরক্ষিত হয় ওয়েব সার্ভারে।",
    explanation_en: "A cookie is a small packet of data stored locally in the client browser by web servers to track stateful browsing sessions.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "Web Technologies: A Computer Science Perspective — Jackson",
    source_page_or_section: "Client-Side State: Cookies"
  },
  {
    subject: "Computer and Information Technology",
    topic: "কম্পিউটার সিকিউরিটি",
    subtopic: "ভিপিএন (VPN)",
    question_bn: "পাবলিক ইন্টারনেটের ওপর দিয়ে ডেটা এনক্রিপ্ট করে নিরাপদ ও ব্যক্তিগত টানেল তৈরির মাধ্যমে ইন্টারনেট ব্রাউজ করার প্রযুক্তি কোনটি?",
    question_en: "Which network technology creates an encrypted, secure virtual tunnel over the public internet to protect online communications?",
    options: {
      A: "ভিপিএন (Virtual Private Network / VPN)",
      B: "ল্যান (LAN)",
      C: "ম্যান (MAN)",
      D: "ওয়ান (WAN)"
    },
    correct_option: "A",
    explanation_bn: "VPN (Virtual Private Network) ব্যবহারকারীর কম্পিউটার এবং রিমোট সার্ভারের মধ্যে এনক্রিপ্টেড টানেল প্রতিষ্ঠা করে। ফলে ব্যবহারকারীর প্রকৃত আইপি ঠিকানা ও ভৌগোলিক অবস্থান গোপন থাকে এবং পাবলিক ওয়াইফাইতেও হ্যাকার বা আইএসপির নজরদারি থেকে ডেটা সুরক্ষিত থাকে।",
    explanation_en: "A Virtual Private Network (VPN) encrypts internet traffic and disguises online user identities across untrusted networks.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "Computer Security: Principles and Practice — Stallings",
    source_page_or_section: "IP Security and VPNs"
  },
  {
    subject: "Computer and Information Technology",
    topic: "সংরক্ষণ মাধ্যম ও রেইড (RAID)",
    subtopic: "রেইড লেভেলসমূহ",
    question_bn: "দুটি হার্ডডিস্কে অবিকল একই ডেটা একসাথে লিখে একটি ড্রাইভ নষ্ট হলেও অন্য ড্রাইভ থেকে তথ্য অক্ষুণ্ণ রাখার ডিস্ক মিররিং প্রযুক্তিকে কী বলে?",
    question_en: "Which RAID configuration level provides complete disk mirroring redundancy by writing identical data simultaneously to two separate drives?",
    options: {
      A: "RAID 1 (Disk Mirroring)",
      B: "RAID 0 (Disk Striping)",
      C: "RAID 5",
      D: "RAID 10"
    },
    correct_option: "A",
    explanation_bn: "RAID (Redundant Array of Independent Disks) 1 হলো মিররিং প্রযুক্তি। এতে দুটি ডিস্কে হুবহু একই তথ্য সমান্তরালভাবে কপি হয়। ফলে একটি ড্রাইভ শতভাগ নষ্ট হয়ে গেলেও তথ্য একটুও হারায় না। পক্ষান্তরে RAID 0 হলো স্ট্রাইপিং (কোনো রিডানড্যান্সি নেই, কেবল গতি বৃদ্ধির জন্য)।",
    explanation_en: "RAID 1 mirrors identical data blocks across at least two drives, delivering complete hardware redundancy in case of disk failure.",
    difficulty: "medium",
    question_type: "knowledge",
    source_title: "Operating System Concepts — Silberschatz et al.",
    source_page_or_section: "RAID Structure and Levels"
  },
  {
    subject: "Computer and Information Technology",
    topic: "কম্পিউটার হার্ডওয়্যার",
    subtopic: "জিপিইউ (GPU) ও গ্রাফিক্স প্রসেসিং",
    question_bn: "কম্পিউটার গ্রাফিক্স রেন্ডারিং এবং কৃত্রিম বুদ্ধিমত্তার বিশাল সমান্তরাল গাণিতিক গণনা (Parallel Processing)-র জন্য ডেডিকেটেড প্রসেসর কোনটি?",
    question_en: "Which specialized electronic circuit is engineered to rapidly process millions of parallel graphic computations and AI models?",
    options: {
      A: "জিপিইউ (Graphics Processing Unit / GPU)",
      B: "সিপিইউ (CPU)",
      C: "রম (ROM)",
      D: "বায়োস"
    },
    correct_option: "A",
    explanation_bn: "GPU (Graphics Processing Unit) শত শত ক্ষুদ্র কোর নিয়ে গঠিত যা উচ্চগতির প্যারালাল কম্পিউটিংয়ের জন্য অপ্টিমাইজড। ভিডিও গেমস, ৩ডি রেন্ডারিং, ভিডিও এডিটিং এবং বর্তমান এআই ও ডিপ লার্নিং মডেল প্রশিক্ষণে জিপিইউ এককভাবে অপরিহার্য। এনভিডিয়া (NVIDIA) এর প্রধান উদ্ভাবক।",
    explanation_en: "A GPU accelerates parallel data throughput, excelling at mathematical matrix processing for computer graphics and AI workloads.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "Computer Systems: A Programmer's Perspective — Bryant & O'Hallaron",
    source_page_or_section: "Accelerators: GPUs"
  },
  {
    subject: "Computer and Information Technology",
    topic: "ডিজিটাল লজিক ও বাইনারি যোগ",
    subtopic: "অ্যাডার সার্কিট (Adder)",
    question_bn: "ক্যারি (Carry) বিটসহ তিনটি বাইনারি বিটের যোগফল এবং ক্যারি আউটপুট প্রদানকারী সার্কিটকে কী বলে?",
    question_en: "Which combinational digital arithmetic circuit computes the sum of three binary bits (two significant bits and an incoming carry)?",
    options: {
      A: "ফুল অ্যাডার (Full Adder)",
      B: "হাফ অ্যাডার (Half Adder)",
      C: "এনকোডার",
      D: "ডিকোডার"
    },
    correct_option: "A",
    explanation_bn: "হাফ অ্যাডার মাত্র দুটি বিট যোগ করতে পারে (কোনো পূর্ববর্তী ক্যারি গ্রহণ করতে পারে না)। পক্ষান্তরে ফুল অ্যাডার (Full Adder) দুটি মূল বিট এবং পূর্ববর্তী পর্যায়ের ক্যারি বিটসহ মোট তিনটি বিট যোগ করে সাম (Sum) এবং ক্যারি (Carry) আউটপুট দেয়। দুটি হাফ অ্যাডার এবং একটি OR গেট দিয়ে একটি ফুল অ্যাডার তৈরি হয়।",
    explanation_en: "A Full Adder accepts three input bits (A, B, and Carry-in) and outputs Sum and Carry-out.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "উচ্চ মাধ্যমিক আইসিটি (এনসিটিবি পাঠ্যবই)",
    source_page_or_section: "অ্যাডার ও ডিজিটাল সার্কিট"
  },
  {
    subject: "Computer and Information Technology",
    topic: "কম্পিউটার সার্কিট",
    subtopic: "এনকোডার বনাম ডিকোডার",
    question_bn: "মানুষের বোধগম্য যেকোনো আলফানিউমেরিক সংকেতকে কম্পিউটারের গ্রহণযোগ্য বাইনারি সংকেতে রূপান্তর করে কোন ডিজিটাল ডিভাইস?",
    question_en: "Which combinational circuit converts human-readable alphanumeric inputs (e.g. keyboard keystrokes) into machine-readable binary code?",
    options: {
      A: "এনকোডার (Encoder)",
      B: "ডিকোডার (Decoder)",
      C: "মাল্টিপ্লেক্সার",
      D: "রেজিস্টার"
    },
    correct_option: "A",
    explanation_bn: "এনকোডার (যেমন কীবোর্ডের এনকোডার) মানুষের ভাষার টেক্সট বা ইনপুট সংকেতকে বাইনারি কোডে রূপান্তর করে (২^n সংখ্যক ইনপুট লাইন থেকে n সংখ্যক আউটপুট লাইন দেয়)। অপরদিকে ডিকোডার বাইনারি কোডকে পুনরায় মানুষের বোধগম্য সংকেতে রূপান্তর করে মনিটরে প্রদর্শন করে।",
    explanation_en: "An Encoder converts active decimal/alphanumeric inputs into coded binary outputs for the CPU.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "Digital Logic Design — Morris Mano",
    source_page_or_section: "Encoders and Decoders"
  },
  {
    subject: "Computer and Information Technology",
    topic: "অপারেটিং সিস্টেম",
    subtopic: "ডেডলক (Deadlock)",
    question_bn: "অপারেটিং সিস্টেমে যখন একাধিক প্রসেস একে অপরের জন্য আটকে থাকা রিসোর্সের অপেক্ষায় অনন্তকাল স্থবির হয়ে থাকে, তখন তাকে কী বলে?",
    question_en: "A situation where a set of processes are permanently blocked because each process is holding a resource and waiting for another is:",
    options: {
      A: "ডেডলক (Deadlock)",
      B: "স্টারভেশন",
      C: "থ্র্যাশিং",
      D: "রেস কন্ডিশন"
    },
    correct_option: "A",
    explanation_bn: "ডেডলক (Deadlock) হলো এমন এক অচলাবস্থা যেখানে প্রসেস-১ রিসোর্স-A ধরে রেখে রিসোর্স-B চাইছে, আর প্রসেস-২ রিসোর্স-B ধরে রেখে রিসোর্স-A চাইছে; ফলে কোনো প্রসেসই অগ্রসর হতে পারে না। কফম্যানের ৪টি শর্ত (Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait) পূরণ হলে ডেডলক ঘটে।",
    explanation_en: "Deadlock is a persistent gridlock in an operating system where circular dependencies among processes and resources halt execution.",
    difficulty: "medium",
    question_type: "knowledge",
    source_title: "Operating System Concepts — Silberschatz",
    source_page_or_section: "Deadlocks and Coffman Conditions"
  },
  {
    subject: "Computer and Information Technology",
    topic: "অপারেটিং সিস্টেম",
    subtopic: "সিপিইউ শিডিউলিং অ্যালগরিদম",
    question_bn: "টাইম-শেয়ারিং অপারেটিং সিস্টেমে প্রতিটি প্রসেসকে নির্দিষ্ট সময়সীমা বা টাইম কোয়ান্টাম (Time Quantum) বরাদ্দ দিয়ে পরিচালিত শিডিউলিং কোনটি?",
    question_en: "Which preemptive CPU scheduling algorithm allocates a fixed time quantum cyclically to each ready process in the queue?",
    options: {
      A: "রাউন্ড রবিন (Round Robin / RR)",
      B: "ফার্স্ট কাম ফার্স্ট সার্ভড (FCFS)",
      C: "শর্টেস্ট জব ফার্স্ট (SJF)",
      D: "প্রায়োরিটি শিডিউলিং"
    },
    correct_option: "A",
    explanation_bn: "রাউন্ড রবিন (Round Robin) শিডিউলিং হলো একটি প্রি-এম্পটিভ পদ্ধতি যেখানে প্রতিটি প্রসেসকে একটি নির্দিষ্ট ক্ষুদ্র সময়সীমা (Time Quantum বা Slice, যেমন ১০ মিলিসেকেন্ড) দেওয়া হয়। সময় শেষ হলে প্রসেসটি কিউয়ের পেছনে চলে যায় এবং পরবর্তী প্রসেস সুযোগ পায়।",
    explanation_en: "Round Robin (RR) CPU scheduling allocates equal time slices to each process in cyclic order without starvation.",
    difficulty: "medium",
    question_type: "knowledge",
    source_title: "Modern Operating Systems — Andrew S. Tanenbaum",
    source_page_or_section: "CPU Scheduling: Round Robin"
  },
  {
    subject: "Computer and Information Technology",
    topic: "ইন্টারনেট ও প্রোটোকল",
    subtopic: "ইউআরএল (URL) কাঠামো",
    question_bn: "একটি পূর্ণাঙ্গ ওয়েব ঠিকানা 'https://www.example.com/index.html'-এ 'https' অংশটিকে কী বলা হয়?",
    question_en: "In the standard URL 'https://www.example.com/index.html', what does the 'https' prefix denote?",
    options: {
      A: "প্রোটোকল (Protocol)",
      B: "ডোমেন নাম",
      C: "ফাইল পাথ",
      D: "পোর্ট নম্বর"
    },
    correct_option: "A",
    explanation_bn: "URL (Uniform Resource Locator)-এর চারটি মূল অংশ: (১) প্রোটোকল (https), (২) হোস্ট বা ডোমেন নাম (www.example.com), (৩) ডিরেক্টরি পাথ, এবং (৪) রিসোর্স বা ফাইল নেম (index.html)।",
    explanation_en: "The prefix 'https' specifies the network communication protocol required to access the requested resource.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "Computer Networks: A Systems Approach — Peterson & Davie",
    source_page_or_section: "Uniform Resource Locators (URL)"
  },
  {
    subject: "Computer and Information Technology",
    topic: "তথ্য সংরক্ষণ প্রযুক্তি",
    subtopic: "ক্লাউড স্টোরেজ",
    question_bn: "নিচের কোনটি অ্যামাজনের বহুল ব্যবহৃত অবজেক্ট স্টোরেজ সার্ভিস যা ক্লাউডে সীমাহীন ডেটা সংরক্ষণে ব্যবহৃত হয়?",
    question_en: "Which Amazon Web Services (AWS) offering provides scalable, industry-standard cloud object storage?",
    options: {
      A: "অ্যামাজন এস-৩ (Amazon S3 — Simple Storage Service)",
      B: "অ্যামাজন ইসি-২ (Amazon EC2)",
      C: "অ্যামাজন আরডিএস (RDS)",
      D: "অ্যামাজন ল্যাম্বডা (Lambda)"
    },
    correct_option: "A",
    explanation_bn: "Amazon Simple Storage Service (Amazon S3) হলো একটি অবজেক্ট স্টোরেজ সেবা যা ইন্টারনেটের যেকোনো স্থান থেকে যেকোনো পরিমাণের ডেটা জমা এবং পুনরুদ্ধারের জন্য ৯৯.৯৯৯৯৯৯৯৯৯% (11 9s) স্থায়িত্ব প্রদান করে। EC2 হলো কম্পিউট সার্ভিস; RDS হলো রিলেশনাল ডাটাবেজ।",
    explanation_en: "Amazon S3 (Simple Storage Service) is an object storage service offering high scalability, security, and performance.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "Cloud Architecture Patterns — Bill Wilder",
    source_page_or_section: "Object Storage and Amazon S3"
  },
  {
    subject: "Computer and Information Technology",
    topic: "ক্রিপ্টোকারেন্সি ও ব্লকচেইন",
    subtopic: "ব্লকচেইন প্রযুক্তি",
    question_bn: "২০০৮ সালে সাতোশি নাকামোতো ছদ্মনামে প্রকাশিত হোয়াইটপেপারের মাধ্যমে কোন বিকেন্দ্রীভূত উন্মুক্ত লেজার প্রযুক্তির ভিত্তি রচিত হয়?",
    question_en: "Which distributed, cryptographically secured decentralized ledger technology was introduced in Satoshi Nakamoto's 2008 whitepaper?",
    options: {
      A: "ব্লকচেইন (Blockchain)",
      B: "সেন্ট্রালাইজড ডাটাবেজ",
      C: "ক্লাউড হোস্টিং",
      D: "টোর নেটওয়ার্ক"
    },
    correct_option: "A",
    explanation_bn: "২০০৮ সালে সাতোশি নাকামোতো বিটকয়েনের হোয়াইটপেপারে ব্লকচেইন (Blockchain) প্রযুক্তির উদ্ভাবন প্রকাশ করেন। এটি ক্রিপ্টোগ্রাফিক হ্যাশিং (যেমন SHA-256) দ্বারা পরস্পর সংযুক্ত ব্লকের বিকেন্দ্রীভূত লেজার, যার তথ্য কোনো কেন্দ্রীয় ব্যাংকের নিয়ন্ত্রণ ছাড়াই পরিবর্তন-অযোগ্যভাবে সংরক্ষিত থাকে।",
    explanation_en: "Blockchain is a cryptographically linked decentralized immutable ledger introduced by Satoshi Nakamoto in 2008.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "Mastering Bitcoin — Andreas M. Antonopoulos",
    source_page_or_section: "Blockchain Architecture and Hashing"
  },
  {
    subject: "Computer and Information Technology",
    topic: "কম্পিউটার সংগঠন",
    subtopic: "বাস আর্কিটেকচার",
    question_bn: "কম্পিউটার প্রসেসরের সাথে মেমোরি ও ইনপুট/আউটপুট ডিভাইসের মধ্যে ডেটা আদান-প্রদানের বৈদ্যুতিক পথকে বাস (Bus) বলে। কোন বাসটি কেবল 'একমুখী' (Unidirectional)?",
    question_en: "Which computer system bus is strictly unidirectional, carrying information in only one direction?",
    options: {
      A: "অ্যাড্রেস বাস (Address Bus)",
      B: "ডাটা বাস (Data Bus)",
      C: "কন্ট্রোল বাস (Control Bus)",
      D: "পাওয়ার বাস"
    },
    correct_option: "A",
    explanation_bn: "অ্যাড্রেস বাস (Address Bus) হলো একমুখী (Unidirectional), কারণ সিপিইউ মেমোরি লোকেশন বা ডিভাইসের ঠিকানা কেবল পাঠায়, গ্রহণ করে না। অপরদিকে ডাটা বাস হলো দ্বিমুখী (Bidirectional), কারণ সিপিইউ মেমোরি থেকে ডেটা রিডও করে আবার মেমোরিতে ডেটা রাইটও করে।",
    explanation_en: "The Address Bus is unidirectional (CPU generates addresses pointing to memory), whereas the Data Bus is bidirectional.",
    difficulty: "medium",
    question_type: "knowledge",
    source_title: "Microprocessors and Interfacing — Douglas V. Hall",
    source_page_or_section: "System Buses and Address Decoding"
  },
  {
    subject: "Computer and Information Technology",
    topic: "কম্পিউটার প্রজন্ম",
    subtopic: "সুপারকম্পিউটার",
    question_bn: "বিশ্বের সবচেয়ে দ্রুতগতির সুপারকম্পিউটারের প্রসেসিং ক্ষমতা পরিমাপের আন্তর্জাতিক একক কোনটি?",
    question_en: "What standard benchmark unit measures the floating-point calculation performance of supercomputers?",
    options: {
      A: "ফ্লপস (FLOPS — Floating-point Operations Per Second)",
      B: "এমআইপিএস (MIPS)",
      C: "মেগাহার্টজ (MHz)",
      D: "বাইট পার সেকেন্ড"
    },
    correct_option: "A",
    explanation_bn: "সুপারকম্পিউটারের গতি ফ্লপস (FLOPS - Floating-Point Operations Per Second)-এ মাপা হয়। আধুনিক এক্সাস্কেল সুপারকম্পিউটারগুলো এক্সাফ্লপস (Exaflops = ১০^১৮ ফ্লপস) গতিতে প্রতি সেকেন্ডে কোটি কোটি গাণিতিক ভগ্নাংশের হিসাব সম্পন্ন করতে পারে। আর সাধারণ মাইক্রোপ্রসেসরের গতি এমআইপিএস (MIPS)-এ মাপা হয়।",
    explanation_en: "Supercomputer compute performance is quantified in FLOPS (Floating-point Operations Per Second).",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "Introduction to High Performance Computing for Scientists and Engineers",
    source_page_or_section: "Benchmarking and FLOPS"
  }
];
