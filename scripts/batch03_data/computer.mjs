export const computerQuestions = [
  {
    subject: "Computer and Information Technology",
    topic: "কম্পিউটার হার্ডওয়্যার ও স্থাপত্য",
    subtopic: "সিপিইউ রেজিস্টার ও ক্যাশ মেমোরি",
    question_bn: "সিপিইউ (CPU)-এর অভ্যন্তরে অবস্থিত সবচেয়ে দ্রুতগতির মেমোরি কোনটি?",
    question_en: "Which represents the fastest internal memory situated directly within the CPU?",
    options: {
      A: "র‌্যাম (RAM)",
      B: "রেজিস্টার (Registers)",
      C: "ক্যাশ মেমোরি (Cache Memory)",
      D: "রম (ROM)"
    },
    correct_option: "B",
    explanation_bn: "মেমোরি হায়ারার্কি অনুযায়ী সিপিইউর অভ্যন্তরে অবস্থিত রেজিস্টার (Registers) হলো বিশ্বের সবচেয়ে দ্রুততম মেমোরি (অ্যাক্সেস সময় ১ ন্যানোসেকেন্ডেরও কম)। এর পরই অবস্থান করে L1/L2/L3 ক্যাশ মেমোরি, তারপর প্রধান মেমোরি বা RAM।",
    explanation_en: "Internal CPU registers constitute the absolute fastest memory layer in computer architecture, followed by Cache and RAM.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "Computer Organization and Architecture — William Stallings",
    source_page_or_section: "Memory Hierarchy and CPU Registers"
  },
  {
    subject: "Computer and Information Technology",
    topic: "সংখ্যা পদ্ধতি ও ডিজিটাল লজিক",
    subtopic: "সার্বজনীন গেট (Universal Gates)",
    question_bn: "ডিজিটাল ইলেকট্রনিক্সে কোন দুটি লজিক গেটকে 'সার্বজনীন গেট' (Universal Gate) বলা হয়?",
    question_en: "Which two logic gates are recognized as Universal Gates in digital electronics?",
    options: {
      A: "AND ও OR গেট",
      B: "NAND ও NOR গেট",
      C: "XOR ও XNOR গেট",
      D: "NOT ও AND গেট"
    },
    correct_option: "B",
    explanation_bn: "NAND এবং NOR গেটকে সার্বজনীন গেট বলা হয়, কারণ কেবল এই গেটগুলোর যেকোনো একটি ব্যবহার করে মৌলিক গেটসহ (AND, OR, NOT) যেকোনো জটিল ডিজিটাল সার্কিট বা বুলিয়ান সমীকরণ বাস্তবায়ন করা সম্ভব।",
    explanation_en: "NAND and NOR gates are termed Universal Gates because any Boolean logic operation can be synthesized using them alone.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "উচ্চ মাধ্যমিক তথ্য ও যোগাযোগ প্রযুক্তি (এনসিটিবি)",
    source_page_or_section: "ডিজিটাল লজিক ও সার্বজনীন গেট"
  },
  {
    subject: "Computer and Information Technology",
    topic: "সংখ্যা পদ্ধতি",
    subtopic: "হেক্সাডেসিমেল রূপান্তর",
    question_bn: "দশমিক সংখ্যা '২৫৫' (Decimal 255)-এর হেক্সাডেসিমেল মান কত?",
    question_en: "What is the hexadecimal equivalent of decimal number 255?",
    options: {
      A: "EE",
      B: "FF",
      C: "FE",
      D: "100"
    },
    correct_option: "B",
    explanation_bn: "২৫৫-কে ১৬ দিয়ে ভাগ করলে ভাগফল ১৫ এবং ভাগশেষ ১৫ থাকে। হেক্সাডেসিমেলে ১৫-কে 'F' দ্বারা প্রকাশ করা হয়। সুতরাং ২৫৫ = (FF)১৬। বাইনারিতে এটি আটটি ১: (11111111)২।",
    explanation_en: "255 divided by 16 gives 15 with remainder 15; in hex notation, 15 is represented as 'F', hence (FF)16.",
    difficulty: "easy",
    question_type: "calculation",
    source_title: "Digital Logic and Computer Design — M. Morris Mano",
    source_page_or_section: "Number Systems Conversion"
  },
  {
    subject: "Computer and Information Technology",
    topic: "কম্পিউটার নেটওয়ার্ক",
    subtopic: "OSI মডেলের ৭টি স্তর",
    question_bn: "ওএসআই (OSI) রেফারেন্স মডেলের কোন স্তরে রাউটার কাজ করে এবং প্যাকেট রাউটিং সম্পন্ন হয়?",
    question_en: "At which layer of the 7-layer OSI reference model do routers operate to route packets?",
    options: {
      A: "ডাটা লিংক স্তর (Data Link Layer)",
      B: "নেটওয়ার্ক স্তর (Network Layer)",
      C: "ট্রান্সপোর্ট স্তর (Transport Layer)",
      D: "ফিজিক্যাল স্তর (Physical Layer)"
    },
    correct_option: "B",
    explanation_bn: "ওএসআই মডেলের ৩য় স্তর হলো নেটওয়ার্ক স্তর (Network Layer)। এই স্তরে আইপি অ্যাড্রেসিং, লজিক্যাল অ্যাড্রেসিং এবং রাউটারের মাধ্যমে প্যাকেট সঠিক গন্তব্যে প্রেরণের (Routing) কাজ সম্পন্ন হয়। সুইচ কাজ করে ডাটা লিংক স্তরে (Layer 2)।",
    explanation_en: "Routers operate at Layer 3 (Network Layer) of the OSI model using logical IP addressing for packet forwarding.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "Data Communications and Networking — Behrouz A. Forouzan",
    source_page_or_section: "The OSI Model: Network Layer"
  },
  {
    subject: "Computer and Information Technology",
    topic: "কম্পিউটার নেটওয়ার্ক",
    subtopic: "আইপি অ্যাড্রেসিং — IPv4 বনাম IPv6",
    question_bn: "IPv4 এবং IPv6 আইপি ঠিকানায় যথাক্রমে কত বিট ব্যবহার করা হয়?",
    question_en: "How many bits are used in IPv4 and IPv6 addresses respectively?",
    options: {
      A: "IPv4: ৩২ বিট; IPv6: ১২৮ বিট",
      B: "IPv4: ৬৪ বিট; IPv6: ১২৮ বিট",
      C: "IPv4: ৩২ বিট; IPv6: ৬৪ বিট",
      D: "IPv4: ১৬ বিট; IPv6: ১২৮ বিট"
    },
    correct_option: "A",
    explanation_bn: "IPv4 ঠিকানা ৩২ বিট (৪ বাইট) দীর্ঘ, যা ডট দিয়ে চারটি অক্টেটে বিভক্ত থাকে (যেমন: 192.168.1.1)। অন্যদিকে IPv6 ঠিকানা ১২৮ বিট (১৬ বাইট) দীর্ঘ, যা কোলন দিয়ে আটটি হেক্সাডেসিমেল গ্রুপে বিভক্ত থাকে।",
    explanation_en: "IPv4 uses 32-bit addresses (~4.3 billion space), while IPv6 uses 128-bit addresses (providing 2^128 unique addresses).",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "Computer Networks — Andrew S. Tanenbaum",
    source_page_or_section: "IP Version 4 and IP Version 6"
  },
  {
    subject: "Computer and Information Technology",
    topic: "কম্পিউটার নেটওয়ার্ক",
    subtopic: "ম্যাক অ্যাড্রেস (MAC Address)",
    question_bn: "নেটওয়ার্ক ইন্টারফেস কার্ড (NIC)-এর স্থায়ী ভৌত ঠিকানা বা 'MAC Address' কত বিটের হয়?",
    question_en: "How many bits constitute a Media Access Control (MAC) hardware address?",
    options: {
      A: "৩২ বিট",
      B: "৪৮ বিট (৬ বাইট)",
      C: "৬৪ বিট",
      D: "১২৮ বিট"
    },
    correct_option: "B",
    explanation_bn: "ম্যাক অ্যাড্রেস হলো নেটওয়ার্ক কার্ডের স্থায়ী হার্ডওয়্যার ঠিকানা যা ৪৮ বিট বা ৬ বাইট দীর্ঘ। এটি ১২টি হেক্সাডেসিমেল ডিজিটে কোলন বা হাইফেন দ্বারা বিভক্ত থাকে (যেমন: 00:1A:2B:3C:4D:5E)। প্রথম ২৪ বিট প্রস্তুতকারক সংস্থার (OUI) কোড।",
    explanation_en: "A MAC address is a 48-bit (6-byte) unique hardware identifier burnt into the Network Interface Card (NIC).",
    difficulty: "medium",
    question_type: "knowledge",
    source_title: "উচ্চ মাধ্যমিক আইসিটি — প্রকৌশলী মুজিবুর রহমান",
    source_page_or_section: "নেটওয়ার্কিং হার্ডওয়্যার ও ম্যাক অ্যাড্রেস"
  },
  {
    subject: "Computer and Information Technology",
    topic: "ইন্টারনেট ও প্রোটোকল",
    subtopic: "ওয়েব প্রোটোকল ও পোর্ট",
    question_bn: "সুরক্ষিত ওয়েব ব্রাউজিংয়ের জন্য ব্যবহৃত 'HTTPS' প্রোটোকল ডিফল্টভাবে কোন টিসিপি (TCP) পোর্ট নম্বর ব্যবহার করে?",
    question_en: "Which default TCP port number is utilized by HTTPS for secure, encrypted web transmission?",
    options: {
      A: "পোর্ট ৮০",
      B: "পোর্ট ৪৪৩",
      C: "পোর্ট ২১",
      D: "পোর্ট ২৫"
    },
    correct_option: "B",
    explanation_bn: "এইচটিটিপি (HTTP) সাধারণ ওয়েব ট্রাফিকের জন্য ডিফল্ট পোর্ট ৮০ ব্যবহার করে। আর এসএসএল/টিএলএস এনক্রিপশনযুক্ত নিরাপদ 'HTTPS' প্রোটোকল ডিফল্টভাবে পোর্ট ৪৪৩ (Port 443) ব্যবহার করে। এফটিপি ব্যবহার করে পোর্ট ২১ এবং এসএমটিপি পোর্ট ২৫।",
    explanation_en: "HTTPS uses TCP port 443 for SSL/TLS encrypted web communication, whereas standard HTTP defaults to port 80.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "TCP/IP Illustrated — W. Richard Stevens",
    source_page_or_section: "Well-Known Port Numbers"
  },
  {
    subject: "Computer and Information Technology",
    topic: "ইন্টারনেট ও ইমেইল",
    subtopic: "ইমেইল প্রোটোকলসমূহ",
    question_bn: "ব্যবহারকারীর ডিভাইসে নতুন ইমেইল পাঠানো বা প্রেরণের (Outgoing Email) ক্ষেত্রে কোন প্রোটোকল কাজ করে?",
    question_en: "Which protocol is utilized to send outgoing emails across mail servers?",
    options: {
      A: "POP3",
      B: "IMAP",
      C: "SMTP (Simple Mail Transfer Protocol)",
      D: "FTP"
    },
    correct_option: "C",
    explanation_bn: "ইমেইল পাঠানোর জন্য ব্যবহৃত হয় এসএমটিপি (SMTP)। আর রিসিভার বা সার্ভার থেকে নিজের ডিভাইসে ইমেইল গ্রহণ ও ডাউনলোড করার জন্য ব্যবহৃত হয় POP3 (Post Office Protocol 3) অথবা IMAP (Internet Message Access Protocol)।",
    explanation_en: "SMTP (Simple Mail Transfer Protocol) is dedicated to sending emails, while POP3/IMAP retrieve incoming mail.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "Computer Networking: A Top-Down Approach — Kurose & Ross",
    source_page_or_section: "Electronic Mail Protocols: SMTP"
  },
  {
    subject: "Computer and Information Technology",
    topic: "সফটওয়্যার ও অপারেটিং সিস্টেম",
    subtopic: "ওপেন সোর্স অপারেটিং সিস্টেম",
    question_bn: "১৯৯১ সালে লিনাস টরভাল্ডস কর্তৃক উদ্ভাবিত মনোলিথিক কার্নেল ভিত্তিক ওপেন সোর্স অপারেটিং সিস্টেম কোনটি?",
    question_en: "Which open-source operating system kernel was released in 1991 by Linus Torvalds?",
    options: {
      A: "উইন্ডোজ (Windows)",
      B: "লিনাক্স (Linux)",
      C: "ম্যাক ওএস (macOS)",
      D: "এমএস ডস (MS-DOS)"
    },
    correct_option: "B",
    explanation_bn: "১৯৯১ সালে ফিনল্যান্ডের হেলসিঙ্কি বিশ্ববিদ্যালয়ের শিক্ষার্থী লিনাস টরভাল্ডস লিনাক্স (Linux) কার্নেল উদ্ভাবন করেন। এটি একটি ফ্রি এবং ওপেন সোর্স ওএস যা উবুন্টু, রেডহ্যাট, ফেডোরা ইত্যাদি ডিস্ট্রিবিউশনে ব্যবহৃত হয়।",
    explanation_en: "Linux is an open-source, Unix-like operating system kernel created by Linus Torvalds in 1991.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "Operating System Concepts — Silberschatz, Galvin, Gagne",
    source_page_or_section: "Linux System Architecture"
  },
  {
    subject: "Computer and Information Technology",
    topic: "অপারেটিং সিস্টেম",
    subtopic: "ভার্চুয়াল মেমোরি ও পেজিং",
    question_bn: "অপারেটিং সিস্টেমে মূল মেমোরির (RAM) সীমাবদ্ধতা দূর করতে হার্ডডিস্কের অংশকে অস্থায়ী মেমোরি হিসেবে ব্যবহারের প্রযুক্তিকে কী বলে?",
    question_en: "What technique uses secondary storage space to extend physical RAM capacity seamlessly?",
    options: {
      A: "ক্যাশ মেমোরি",
      B: "ভার্চুয়াল মেমোরি (Virtual Memory)",
      C: "ফ্ল্যাশ রম",
      D: "সিপিইউ থ্রটলিং"
    },
    correct_option: "B",
    explanation_bn: "ভার্চুয়াল মেমোরি হলো এমন একটি মেমোরি ম্যানেজমেন্ট কৌশল যেখানে হার্ডডিস্কের নির্দিষ্ট অংশকে সোয়াপ স্পেস বা পেজিং ফাইলের মাধ্যমে RAM-এর সম্প্রসারণ হিসেবে ব্যবহার করা হয়, যাতে RAM-এর ক্ষমতার চেয়ে বড় প্রোগ্রাম নির্বাহ করা যায়।",
    explanation_en: "Virtual memory maps secondary storage addresses onto main memory, enabling execution of processes larger than physical RAM.",
    difficulty: "medium",
    question_type: "knowledge",
    source_title: "Modern Operating Systems — Andrew S. Tanenbaum",
    source_page_or_section: "Virtual Memory Management"
  },
  {
    subject: "Computer and Information Technology",
    topic: "ডাটাবেজ ম্যানেজমেন্ট সিস্টেম (DBMS)",
    subtopic: "প্রাইমারি কি (Primary Key)",
    question_bn: "রিলেশনাল ডাটাবেজ টেবিলে প্রতিটি রেকর্ডকে বা সারিকে অনন্যভাবে (Uniquely) শনাক্তকারী ফিল্ডকে কী বলা হয়?",
    question_en: "In a relational database table, a field that uniquely identifies each record and cannot contain NULL values is called:",
    options: {
      A: "ফরেন কি (Foreign Key)",
      B: "প্রাইমারি কি (Primary Key)",
      C: "কম্পোজিট কি",
      D: "সেকেন্ডারি কি"
    },
    correct_option: "B",
    explanation_bn: "প্রাইমারি কি (Primary Key) হলো এমন এক বা একাধিক ফিল্ডের সমষ্টি যা টেবিলের প্রতিটি রেকর্ডকে অদ্বিতীয়ভাবে শনাক্ত করে। প্রাইমারি কি-এর মান কখনোই ডুপ্লিকেট হতে পারে না এবং এটি নাল (NULL/ফাঁকা) হতে পারে না।",
    explanation_en: "A Primary Key enforces entity integrity by uniquely identifying each record in a table without containing NULL values.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "Database System Concepts — Silberschatz & Korth",
    source_page_or_section: "Relational Model Keys"
  },
  {
    subject: "Computer and Information Technology",
    topic: "ডাটাবেজ ও কোয়েরি ল্যাঙ্গুয়েজ",
    subtopic: "SQL কমান্ড",
    question_bn: "রিলেশনাল ডাটাবেজে সংরক্ষিত রেকর্ড মুছে ফেলার জন্য কোন এসকিউএল (SQL) স্টেটমেন্ট ব্যবহৃত হয়?",
    question_en: "Which SQL command is used to delete existing records from a database table?",
    options: {
      A: "REMOVE",
      B: "DELETE",
      C: "DROP",
      D: "CLEAR"
    },
    correct_option: "B",
    explanation_bn: "টেবিলের মধ্যকার নির্দিষ্ট এক বা একাধিক সারি বা রেকর্ড মুছে ফেলার জন্য 'DELETE FROM table_name WHERE condition;' ব্যবহৃত হয়। আর সম্পূর্ণ টেবিল স্ট্রাকচার মুছে ফেলতে 'DROP TABLE' এবং সব ডেটা তাৎক্ষণিক ফাঁকা করতে 'TRUNCATE' ব্যবহৃত হয়।",
    explanation_en: "The 'DELETE' statement removes rows from a table based on conditions, whereas 'DROP' eliminates the entire table structure.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "SQL The Complete Reference — James R. Groff",
    source_page_or_section: "Data Manipulation Language: DELETE"
  },
  {
    subject: "Computer and Information Technology",
    topic: "সাইবার নিরাপত্তা ও ক্রিপ্টোগ্রাফি",
    subtopic: "ম্যালওয়্যার — র‍্যানসমওয়্যার",
    question_bn: "ব্যবহারকারীর কম্পিউটার বা ফাইলের ডেটা এনক্রিপ্ট করে আটকে রেখে মুক্তিপণ দাবি করা ক্ষতিকর ম্যালওয়্যারকে কী বলে?",
    question_en: "What type of malicious malware encrypts a victim's files and demands payment to restore access?",
    options: {
      A: "স্পাইওয়্যার",
      B: "র‍্যানসমওয়্যার (Ransomware)",
      C: "অ্যাডওয়্যার",
      D: "ট্রোজান হর্স"
    },
    correct_option: "B",
    explanation_bn: "র‍্যানসমওয়্যার (যেমন: WannaCry) হলো একধরনের বিপজ্জনক ক্ষতিকর সফটওয়্যার যা ভিক্টিমের হার্ডড্রাইভের গুরুত্বপূর্ণ ডেটা এনক্রিপ্ট করে ফেলে এবং ডিক্রিপশন কি বা চাবি প্রদানের বিনিময়ে ক্রিপ্টোকারেন্সিতে মোটা অঙ্কের মুক্তিপণ দাবি করে।",
    explanation_en: "Ransomware locks or encrypts files, demanding extortion fees (ransom) for decryption keys.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "Cybersecurity Essentials — Charles J. Brooks",
    source_page_or_section: "Malware Types: Ransomware"
  },
  {
    subject: "Computer and Information Technology",
    topic: "সাইবার নিরাপত্তা ও ক্রিপ্টোগ্রাফি",
    subtopic: "অ্যাসিমেট্রিক এনক্রিপশন (Asymmetric Cryptography)",
    question_bn: "পাবলিক কি ক্রিপ্টোগ্রাফি বা অ্যাসিমেট্রিক এনক্রিপশনে এনক্রিপশন ও ডিক্রিপশনের জন্য কয়টি চাবি (Keys) ব্যবহৃত হয়?",
    question_en: "How many complementary cryptographic keys are used in asymmetric (public-key) encryption?",
    options: {
      A: "১টি গোপন চাবি",
      B: "২টি চাবি (একটি পাবলিক কি এবং একটি প্রাইভেট কি)",
      C: "৩টি চাবি",
      D: "কোনো চাবি লাগে না"
    },
    correct_option: "B",
    explanation_bn: "অ্যাসিমেট্রিক এনক্রিপশনে দুটি পরস্পর সম্পর্কযুক্ত কি ব্যবহৃত হয়: একটি উন্মুক্ত বা পাবলিক কি (যা দিয়ে যে কেউ মেসেজ এনক্রিপ্ট করতে পারে) এবং একটি গোপন বা প্রাইভেট কি (যা কেবল প্রাপকের কাছে থাকে এবং যা দিয়ে মেসেজ ডিক্রিপ্ট করা যায়)। বিখ্যাত অ্যালগরিদম হলো RSA।",
    explanation_en: "Asymmetric cryptography employs a key pair: an openly shared Public Key for encryption and a guarded Private Key for decryption.",
    difficulty: "medium",
    question_type: "knowledge",
    source_title: "Cryptography and Network Security — William Stallings",
    source_page_or_section: "Public-Key Cryptography Principles"
  },
  {
    subject: "Computer and Information Technology",
    topic: "ক্লাউড কম্পিউটিং",
    subtopic: "ক্লাউড সার্ভিস মডেল (IaaS, PaaS, SaaS)",
    question_bn: "গুগল ড্রাইভ (Google Drive), মাইক্রোসফট ৩৬৫ কিংবা জিমেইল ক্লাউড কম্পিউটিংয়ের কোন সেবা মডেলের উদাহরণ?",
    question_en: "Google Drive, Microsoft 365, and Gmail are standard examples of which cloud computing service model?",
    options: {
      A: "IaaS (Infrastructure as a Service)",
      B: "PaaS (Platform as a Service)",
      C: "SaaS (Software as a Service)",
      D: "BaaS (Backend as a Service)"
    },
    correct_option: "C",
    explanation_bn: "SaaS (Software as a Service) মডেলে ইন্টারনেট ব্রাউজারের মাধ্যমে সরাসরি প্রস্তুতকৃত সফটওয়্যার বা অ্যাপ্লিকেশন ব্যবহারকারীদের সেবা হিসেবে প্রদান করা হয়। AWS EC2 হলো IaaS; আর Heroku বা Google App Engine হলো PaaS।",
    explanation_en: "SaaS delivers finished end-user web applications over the internet without requiring local installation or infrastructure management.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "Cloud Computing: Concepts, Technology & Architecture — Thomas Erl",
    source_page_or_section: "Cloud Service Models"
  },
  {
    subject: "Computer and Information Technology",
    topic: "প্রোগ্রামিং ভাষা ও অনুবাদক",
    subtopic: "কম্পাইলার বনাম ইন্টারপ্রেটার",
    question_bn: "কোন অনুবাদক প্রোগ্রাম সম্পূর্ণ সোর্স প্রোগ্রামকে একসাথে পড়ে একবারে অবজেক্ট প্রোগ্রামে রূপান্তর করে?",
    question_en: "Which language translator scans and translates the entire source code into machine code in one unified pass?",
    options: {
      A: "ইন্টারপ্রেটার (Interpreter)",
      B: "কম্পাইলার (Compiler)",
      C: "অ্যাসেম্বলার (Assembler)",
      D: "লিংকার"
    },
    correct_option: "B",
    explanation_bn: "কম্পাইলার (যেমন C/C++ এর gcc) পুরো সোর্স কোডকে একবারে অনুবাদ করে এবং সকল ভুলত্রুটির তালিকা প্রদর্শন করে। অপরদিকে ইন্টারপ্রেটার (যেমন Python) কোডকে লাইন বাই লাইন পড়ে এবং একটি লাইনে ভুল পেলে সেখানে নির্বাহ থামিয়ে দেয়।",
    explanation_en: "A compiler translates the entire high-level program into machine code at once, whereas an interpreter executes instructions line by line.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "কম্পিউটার বিজ্ঞান পরিচিতি ও সি প্রোগ্রামিং",
    source_page_or_section: "অনুবাদক সফটওয়্যার"
  },
  {
    subject: "Computer and Information Technology",
    topic: "কম্পিউটার সংগঠন",
    subtopic: "রমের প্রকারভেদ — EEPROM",
    question_bn: "বৈদ্যুতিক সংকেতের সাহায্যে মুছে ফেলে পুনরায় নতুন তথ্য লেখা যায় কোন রম (ROM)-এ?",
    question_en: "Which type of non-volatile ROM can be electrically erased and reprogrammed byte-by-byte?",
    options: {
      A: "PROM",
      B: "EPROM",
      C: "EEPROM",
      D: "Mask ROM"
    },
    correct_option: "C",
    explanation_bn: "EEPROM (Electrically Erasable Programmable Read-Only Memory)-কে বৈদ্যুতিক পালস প্রয়োগ করে সহজেই তথ্য মুছে রিপ্রোগ্রাম করা যায়। আধুনিক কম্পিউটার মাদারবোর্ডের বায়োস (BIOS/UEFI) চিপ এবং পেনড্রাইভ/এসএসডি মূলত EEPROM প্রযুক্তির সম্প্রসারণ (Flash Memory)। EPROM অতিবেগুনি রশ্মি দ্বারা মুছতে হয়।",
    explanation_en: "EEPROM allows stored data to be erased and rewritten electrically, forming the foundation of modern Flash memory.",
    difficulty: "medium",
    question_type: "knowledge",
    source_title: "Digital Design — M. Morris Mano",
    source_page_or_section: "Read-Only Memory Types"
  },
  {
    subject: "Computer and Information Technology",
    topic: "ওয়্যারলেস যোগাযোগ",
    subtopic: "ব্লুটুথ ও আইইইই মান",
    question_bn: "স্বল্প দূরত্বের ওয়্যারলেস পার্সোনাল এরিয়া নেটওয়ার্ক (PAN) 'ব্লুটুথ' (Bluetooth)-এর IEEE স্ট্যান্ডার্ড কোনটি?",
    question_en: "What is the official IEEE standard specification for Bluetooth technology?",
    options: {
      A: "IEEE 802.3",
      B: "IEEE 802.11",
      C: "IEEE 802.15.1",
      D: "IEEE 802.16"
    },
    correct_option: "C",
    explanation_bn: "ব্লুটুথ হলো ২.৪ গিগাহার্টজ ISM ব্যান্ডে চালিত স্বল্প দূরত্বের (সাধারণত ১০ মিটার) ওয়্যারলেস যোগাযোগ মান, যার অফিশিয়াল কোড IEEE 802.15.1। IEEE 802.11 হলো ওয়াই-ফাই (Wi-Fi), 802.3 হলো ইথারনেট ক্যাবল, এবং 802.16 হলো ওয়াইম্যাক্স (WiMAX)।",
    explanation_en: "Bluetooth technology is codified under IEEE 802.15.1 for Wireless Personal Area Networks (WPAN).",
    difficulty: "medium",
    question_type: "knowledge",
    source_title: "Wireless Communications — Theodore S. Rappaport",
    source_page_or_section: "Wireless Personal Area Networks"
  },
  {
    subject: "Computer and Information Technology",
    topic: "কৃত্রিম বুদ্ধিমত্তা ও আধুনিক প্রযুক্তি",
    subtopic: "মেশিন লার্নিং ও এআই",
    question_bn: "কম্পিউটার যখন পূর্ববর্তী অভিজ্ঞতা ও বিশাল ডেটাসেট থেকে কোনো স্পষ্ট প্রোগ্রামিং নির্দেশ ছাড়া স্বয়ংক্রিয়ভাবে শেখে, তখন তাকে কী বলে?",
    question_en: "The branch of artificial intelligence where algorithms improve automatically through experience without explicit rule programming is:",
    options: {
      A: "ক্লাউড কম্পিউটিং",
      B: "মেশিন লার্নিং (Machine Learning)",
      C: "ডাটাবেজ নরমালাইজেশন",
      D: "কম্পিউটার গ্রাফিক্স"
    },
    correct_option: "B",
    explanation_bn: "মেশিন লার্নিং (ML) হলো কৃত্রিম বুদ্ধিমত্তার (AI) এমন একটি ক্ষেত্র যা অ্যালগরিদম ও পরিসংখ্যানিক মডেল ব্যবহার করে ডেটা বিশ্লেষণ করে প্যাটার্ন শনাক্ত করে এবং পূর্বানুমান প্রদান করতে শেখে। এর জনপ্রিয় শাখা ডিপ লার্নিং (Deep Learning)।",
    explanation_en: "Machine learning provides systems the ability to automatically learn and improve from empirical data without being explicitly programmed.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "Artificial Intelligence: A Modern Approach — Russell & Norvig",
    source_page_or_section: "Learning from Examples"
  },
  {
    subject: "Computer and Information Technology",
    topic: "ইন্টারনেট অফ থিংস (IoT)",
    subtopic: "আইওটি আর্কিটেকচার",
    question_bn: "ভৌত যন্ত্রপাতির সাথে সেন্সর, সফটওয়্যার ও ইন্টারনেট সংযোগের মাধ্যমে ডেটা আদান-প্রদান ও নিয়ন্ত্রণের প্রযুক্তিকে কী বলে?",
    question_en: "The interconnected network of physical devices embedded with sensors and network connectivity to exchange data is:",
    options: {
      A: "ইন্টারনেট অফ থিংস (IoT)",
      B: "ব্লকচেইন",
      C: "বিগ ডেটা অ্যানালিটিক্স",
      D: "সুপার কম্পিউটিং"
    },
    correct_option: "A",
    explanation_bn: "IoT (Internet of Things) হলো দৈনন্দিন ব্যবহারের যন্ত্রপাতি (যেমন স্মার্ট ফ্রিজ, স্মার্ট এসি, ট্রাফিক লাইট, স্মার্ট ঘড়ি)-কে ইন্টারনেটের মাধ্যমে সংযুক্ত করে মানুষের হস্তক্ষেপ ছাড়াই স্বয়ংক্রিয় নজরদারি ও পরিচালনার নেটওয়ার্ক। কেভিন অ্যাশটন ১৯৯৯ সালে এই শব্দটির প্রচলন করেন।",
    explanation_en: "Internet of Things (IoT) connects everyday physical objects to the web via sensors and communication modules.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "Internet of Things — Rajkumar Buyya",
    source_page_or_section: "Foundations of IoT"
  },
  {
    subject: "Computer and Information Technology",
    topic: "কম্পিউটার ডেটা পরিমাপ",
    subtopic: "মেমোরি একক",
    question_bn: "১ গিগাবাইট (1 GB) সমতুল্য কত বাইট?",
    question_en: "In standard binary computing measurement, 1 Gigabyte (1 GiB) equals how many bytes?",
    options: {
      A: "১০২৪ মেগাবাইট (1024 MB বা 2^30 বাইট)",
      B: "১০০০ মেগাবাইট",
      C: "১০২৪ কিলোবাইট",
      D: "২^২০ বাইট"
    },
    correct_option: "A",
    explanation_bn: "ডিজিটাল মেমোরি এককে: ৮ বিট = ১ বাইট; ১০২৪ বাইট = ১ কিলোবাইট (KB); ১০২৪ KB = ১ মেগাবাইট (MB); ১০২৪ MB = ১ গিগাবাইট (GB) = ২^৩০ বাইট। ১০২৪ GB = ১ টেরাবাইট (TB)।",
    explanation_en: "1 Gigabyte binary equals 1024 Megabytes (2^30 bytes), following base-2 computing powers.",
    difficulty: "easy",
    question_type: "calculation",
    source_title: "উচ্চ মাধ্যমিক আইসিটি (এনসিটিবি পাঠ্যপুস্তক)",
    source_page_or_section: "ডেটার একক ও পরিমাপ"
  },
  {
    subject: "Computer and Information Technology",
    topic: "বুলিয়ান অ্যালজেব্রা",
    subtopic: "ডি মর্গ্যানের উপপাদ্য",
    question_bn: "বুলিয়ান বীজগণিতে ডি মর্গ্যানের (De Morgan's) প্রথম উপপাদ্য কোনটি?",
    question_en: "Which represents De Morgan's first theorem in Boolean algebra?",
    options: {
      A: "(A + B)' = A' . B'",
      B: "(A . B)' = A' . B'",
      C: "(A + B)' = A + B",
      D: "A + A' = 0"
    },
    correct_option: "A",
    explanation_bn: "ডি মর্গ্যানের উপপাদ্য দুটি: (১) যেকোনো সংখ্যক চলকের যোগফলের কমপ্লিমেন্ট তাদের পৃথক কমপ্লিমেন্টের গুণফলের সমান: (A + B)' = A' . B'। (২) গুণফলের কমপ্লিমেন্ট পৃথক কমপ্লিমেন্টের যোগফলের সমান: (A . B)' = A' + B'।",
    explanation_en: "De Morgan's first theorem establishes that the complement of a sum equals the product of individual complements: (A + B)' = A' . B'.",
    difficulty: "medium",
    question_type: "knowledge",
    source_title: "উচ্চ মাধ্যমিক তথ্য ও যোগাযোগ প্রযুক্তি",
    source_page_or_section: "বুলিয়ান অ্যালজেব্রা ও উপপাদ্য"
  },
  {
    subject: "Computer and Information Technology",
    topic: "কম্পিউটার সিকিউরিটি",
    subtopic: "ফায়ারওয়াল (Firewall)",
    question_bn: "নেটওয়ার্কে অননুমোদিত প্রবেশাধিকার রোধে এবং আগত ও বহির্গামী ট্রাফিকের ওপর নজরদারির জন্য নিরাপত্তা প্রাচীরকে কী বলা হয়?",
    question_en: "A security system designed to monitor and filter incoming and outgoing network traffic based on predetermined rules is a:",
    options: {
      A: "গেটওয়ে",
      B: "ফায়ারওয়াল (Firewall)",
      C: "প্রক্সি রাউটার",
      D: "ব্রিজ"
    },
    correct_option: "B",
    explanation_bn: "ফায়ারওয়াল হলো এমন একটি হার্ডওয়্যার বা সফটওয়্যারভিত্তিক নিরাপত্তা ব্যবস্থা যা একটি বিশ্বস্ত অভ্যন্তরীণ নেটওয়ার্ক এবং একটি অবিশ্বস্ত বাইরের নেটওয়ার্কের (যেমন ইন্টারনেট) মধ্যে ট্রাফিক ফিল্টার করে অননুমোদিত সাইবার আক্রমণ প্রতিরোধ করে।",
    explanation_en: "A Firewall serves as a defensive barrier inspecting network traffic against configured security rules.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "Network Security Essentials — William Stallings",
    source_page_or_section: "Firewalls and Intrusion Prevention"
  },
  {
    subject: "Computer and Information Technology",
    topic: "কম্পিউটার হার্ডওয়্যার",
    subtopic: "বায়োস ও বুটস্ট্র্যাপ",
    question_bn: "কম্পিউটার অন করার সাথে সাথে হার্ডওয়্যার পরীক্ষা করার জন্য যে 'POST' (Power-On Self-Test) সম্পন্ন হয়, তা কোন প্রোগ্রামের নিয়ন্ত্রণে পরিচালিত হয়?",
    question_en: "During computer startup, the Power-On Self-Test (POST) routine is executed by:",
    options: {
      A: "অপারেটিং সিস্টেম",
      B: "বায়োস (BIOS — Basic Input/Output System)",
      C: "ক্যাশ কন্ট্রোলার",
      D: "সিপিইউ মাইক্রোকোড"
    },
    correct_option: "B",
    explanation_bn: "মাদারবোর্ডের রম (ROM) চিপে সংরক্ষিত ফার্মওয়্যার বায়োস (BIOS/UEFI) কম্পিউটার চালুর সাথে সাথে সকল সংযুক্ত হার্ডওয়্যার (কিবোর্ড, মেমোরি, ডিস্ক) ঠিক আছে কিনা পরীক্ষা করে (POST)। এরপর তা বুট লোডারের মাধ্যমে ডিস্ক থেকে অপারেটিং সিস্টেমকে RAM-এ লোড করে।",
    explanation_en: "The BIOS firmware stored in ROM initiates the POST routine to verify system hardware upon powering up.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "Upgrading and Repairing PCs — Scott Mueller",
    source_page_or_section: "BIOS and Booting Process"
  },
  {
    subject: "Computer and Information Technology",
    topic: "কম্পিউটার ইতিহাস ও প্রজন্ম",
    subtopic: "কম্পিউটারের প্রজন্ম",
    question_bn: "চতুর্থ প্রজন্মের (Fourth Generation) কম্পিউটারের প্রধান ইলেকট্রনিক উপাদান কোনটি?",
    question_en: "What was the core electronic component introduced in Fourth-Generation computers?",
    options: {
      A: "ভ্যাকুয়াম টিউব",
      B: "ট্রানজিস্টর",
      C: "মাইক্রোপ্রসেসর (VLSI / Microprocessor)",
      D: "কৃত্রিম বুদ্ধিমত্তা"
    },
    correct_option: "C",
    explanation_bn: "কম্পিউটারের ১ম প্রজন্মে ছিল ভ্যাকুয়াম টিউব, ২য় প্রজন্মে ট্রানজিস্টর, ৩য় প্রজন্মে আইসি (Integrated Circuit), এবং ৪র্থ প্রজন্মে (১৯৭১ থেকে বর্তমান) মাইক্রোপ্রসেসর বা ভিএলএসআই (VLSI - Very Large Scale Integration) প্রযুক্তি উদ্ভাবিত হয়। ১৯৭১ সালে ইন্টেল প্রথম মাইক্রোপ্রসেসর 'Intel 4004' তৈরি করে।",
    explanation_en: "The Fourth Generation of computers is characterized by microprocessors built with VLSI chips.",
    difficulty: "easy",
    question_type: "knowledge",
    source_title: "কম্পিউটার ও তথ্যপ্রযুক্তি — সেলিনা হোসেন",
    source_page_or_section: "কম্পিউটারের প্রজন্মসমূহ"
  }
];
