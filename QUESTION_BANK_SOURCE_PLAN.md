# BCS Crack — Question Bank & Source Ingestion Architecture Plan

## 1. System Vision & Objectives
The primary objective of this phase is to turn BCS Crack into a **source-backed, continuously maintained, legitimate BCS daily question bank** without altering the existing visual branding, design system, layout, or working features.

Students study daily using:
1. **Genuine previous-year BCS questions** (35th–50th General BCS, 39th, 42nd, 48th Special BCS Health).
2. **Verified answers and textbook-grounded explanations** (reviewed by qualified medical doctors and cadre officers).
3. **Structured syllabus mapping** (mapped to the BPSC 30-page official syllabus).
4. **Special BCS Health professional streams** (Assistant Surgeon [Medical Science Part I & II] vs. Assistant Dental Surgeon [Dental Science Part I & II] strictly separated).
5. **Daily personalized practice queue (`/study/today`)** dynamically prioritizing:
   - 40% Spaced-repetition revision due today
   - 30% Diagnosed weakness topics
   - 20% Unmastered verified previous-year questions
   - 10% New or unassessed syllabus topics
6. **Legitimate source traceability**: Every published question traces back to an official circular, verified past paper, or licensed study resource. Fabricated questions are prohibited.

---

## 2. Four-Tier Source Hierarchy & Registry

### Priority 1: Official BPSC Sources (Primary System of Record)
- **BPSC Portal:** `https://bpsc.gov.bd/`
- **BPSC Exam Notices:** `https://bpsc.gov.bd/pages/psc-exams`
- **51st Special BCS Health Circular:** Published 24 Sep 2026 (5,000 cadre posts: 4,700 Assistant Surgeons + 300 Dental Surgeons; 200 MCQs, 120 mins, -0.50 negative marking).
- **51st Special BCS Written Syllabus:** 30-Page PDF published 30 Sep 2026.
- **Form-1 & Admit Card Instructions:** Published 1 Oct 2026.
- **Handling:** Registered with SHA-256 checksums, official URLs, and primary authority designation.

### Priority 2: Previous-Year Question Archives (Secondary Research Sources)
- `https://www.genmcq.com/bcs-previous-year-questions.html`
- `https://somadhan.app/job-question-bank/bcs-preliminary`
- `https://bcsprep.com/`
- **Handling:** Secondary research sources. Metadata and citations stored; no automated mass-scraping that violates robots.txt or terms; manual and licensed ingestions only; past questions validated against official answer keys before publication.

### Priority 3: Curated Books & Commercial Question Banks
- Catalog of 19 reference resources (`B01` through `B19` from `BCS_51st_Special_Health_Book_and_Question_Bank_Catalog.xlsx`).
- **Handling:** Bibliographic metadata stored with retailer links. Commercial text is never ingested without written license. Authorized excerpts or question sets require rights verification before extraction.

### Priority 4: Expert-Reviewed Original Practice Questions
- Original practice items authored by MBBS/BDS physicians and BCS officers based directly on syllabus gaps.
- Strictly segregated from historical past papers with clear `content_origin` labeling.

---

## 3. Seven-Stage Source-Ingestion Pipeline

```
[ Stage A: Source Discovery & Registration ]
                   |
[ Stage B: Metadata Archival & Checksum Verification ]
                   |
[ Stage C: Multi-Format Question Extraction (PDF/DOCX/CSV/JSON) ]
                   |
[ Stage D: Normalization & Duplicate Detection ]
                   |
[ Stage E: Official Syllabus & Stream Mapping ]
                   |
[ Stage F: Authoritative Answer Key Verification ]
                   |
[ Stage G: Dual-Review Editorial Approval Queue (/admin/question-bank/review) ]
                   |
           [ Verified Question Bank ]
```

### Review Status Lifecycle:
- `imported`: Raw extracted items from ingestion jobs.
- `needs_extraction_review`: Formatting, Bangla ligatures, or options order requires check.
- `needs_answer_verification`: Contradictory answer keys or unverified medical solutions.
- `needs_syllabus_mapping`: Topic tag uncertain.
- `pending_content_review`: Dual reviewer verification in progress.
- `approved`: Live in verified bank and mock tests.
- `rejected`: Inaccurate or defective item.
- `retired`: Superseded by newer syllabus rules.

---

## 4. Daily Practice Architecture (`/study/today`)

### Daily Modes:
1. **Daily Mixed Practice:** 40% revision, 30% weak topics, 20% past papers, 10% new topics.
2. **Subject-Wise Practice:** Focused session on one selected subject.
3. **Topic-Wise Practice:** Deep dive into specific syllabus code.
4. **Previous-Year Question Papers:** Authentic prior BCS examinations (e.g. 42nd Special Health, 39th Special Health, 45th General BCS).
5. **Special BCS Health Shared Practice:** Bangla, English, BD Affairs, Int Affairs, Math, Mental.
6. **Assistant Surgeon Professional:** Medical Science Part I & Part II.
7. **Assistant Dental Surgeon Professional:** Dental Science Part I & Part II.
8. **Mistake Notebook Practice:** Drilling flagged and unsolved incorrect items.
9. **Revision Due Today:** Spaced-repetition items due on current date.
10. **Verified Current Affairs:** Dated questions linked to verifiable contemporary facts.

### Session Interaction & Persistence:
- Answer choices hidden until user clicks "Submit Answer".
- Immediate visual feedback (+1.0 / -0.50 scoring rule displayed).
- Full explanation, syllabus topic code, and source citation shown post-submission.
- In-place actions: Bookmark, Add to Mistake Notebook, Report Issue.
- Session summary persisting to database: Accuracy %, Time Taken, Mistakes to Revise, New Revision Tasks.

---

## 5. Admin Management Routes

- `/admin/sources`: Source registry, health monitoring, sync schedule, and copyright status.
- `/admin/question-bank/imports`: Ingestion jobs, file uploads (JSON/CSV), preview, and error reports.
- `/admin/question-bank/review`: Interactive question review queue with editing, topic mapping, and approval toggles.
- `/admin/question-bank/coverage`: Real database metrics: imported, approved, pending, subject coverage, and topic gaps. Zero synthetic numbers.
