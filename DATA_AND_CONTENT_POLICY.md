# BCS Crack — Data & Content Policy

## 1. Principles of Intellectual Property, Rights & Content Integrity

BCS Crack adheres to strict copyright compliance, legal provenance tracking, and editorial integrity.
The platform differentiates fundamentally between **Bibliographic Catalog Metadata** and **Digitized Learning Content**.

---

## 2. Catalog Metadata vs. Full Content Reproduction

### 2.1 Catalog Metadata (Permitted Public Reference)
The 19 resources identified in the research catalog (`B01` through `B19` from the 51st Special BCS Health inventory) represent public bibliographic metadata:
- Resource Title, Author/Editor, Publisher, Edition/Publication Date.
- Language, Page Count, General Subject Coverage.
- Retailer Listings and Observed Market Prices (snapshots for candidate reference only).
- Outbound links to public retailer pages (e.g., Rokomari, Wafilife, eBoighar, PBS).

**Policy Rule:** Storing and displaying bibliographic metadata and purchase links **does NOT constitute an infringement** of copyright. However, catalog metadata **does NOT grant** BCS Crack the right to digitize, OCR, ingest, embed into vector databases, or republish full book contents, question banks, or explanatory texts without explicit written authorization or licensing.

### 2.2 Digitized Learning Content (Restricted & Controlled)
No copyrighted commercial book text, question stem, or published solution may be exposed in the application unless:
1. It is from a public domain government document (e.g., official BPSC circular or published syllabus).
2. A formal publisher/author license agreement is signed and filed in `source_rights`.
3. It has been authored independently as original content by qualified subject-matter experts.

---

## 3. Five-Tier Content Hierarchy

To maintain complete editorial integrity, every item in BCS Crack's question bank and learning center is tagged with one of five explicit content tiers:

| Tier | Classification | Description & Permitted Use | Approval Requirements |
|---|---|---|---|
| **Tier 1** | **Official BPSC Documents** | Official circulars, 30-page syllabus PDF, application instructions, and official notices from BPSC.gov.bd. May be cited, linked, and used for syllabus taxonomy. | Exam Manager verification against official government portal. |
| **Tier 2** | **Licensed Commercial References** | Books and digests where a legal agreement or permission allows syllabus mapping, excerpting, or question inclusion. | Legal license on file in `source_rights`; editor review. |
| **Tier 3** | **Historical Examination Questions** | Past authentic BCS questions (39th, 42nd, 48th Special BCS, 35th–50th General BCS) with recorded paper year and verified solution. | Dual subject-matter expert review; verified answer key against authentic textbooks. |
| **Tier 4** | **Original Expert-Authored Practice** | Original questions, case vignettes, and explanations created specifically for BCS Crack by certified doctors (MBBS/BDS) and BCS cadre officers. | Clinical/subject reviewer approval before publication. |
| **Tier 5** | **AI-Generated / Synthetic Drafts** | Machine-generated practice questions or draft explanations. | **STRICTLY QUARANTINED** in `review_status = 'unverified_ai'`. Forbidden from appearing in official mock tests until human review passes. |

---

## 4. Editorial Ingestion & Verification Workflow

Every question and study resource must traverse the 5-step Editorial Quality Gate:

```
[1. Source Acquisition]
       |
       v
[2. Rights & Provenance Logging]  --> Verify license / fair citation / official status
       |
       v
[3. Syllabus & Stream Mapping]    --> Map to Topic ID, Exam Track (General vs. Special Health),
       |                              and Stream (Assistant Surgeon vs. Dental Surgeon)
       v
[4. Dual-Expert Review]           --> Medical/Dental accuracy, Bangla orthography, explanation quality
       |
       v
[5. Publication to Verified Bank] --> Becomes eligible for diagnostic and mock test engines
```

### 4.1 Strict Quarantine of Medical & Dental Content
- Questions in Medical Science (Anatomy, Physiology, Pharmacology, Pathology, Medicine, Surgery, Gynae) and Dental Science (Dental Anatomy, Materials, Oral Surgery, Prosthodontics) have high professional impact.
- **Under NO circumstances** shall an AI model automatically approve a clinical question or mark key without human medical/dental expert validation.

---

## 5. Prevention of Synthetic & Fabricated Data

BCS Crack strictly enforces the following prohibitions:
1. **No Fabricated Book Contents:** Missing authors, editions, ISBNs, or prices in the research catalog must remain marked as `Unverified` or empty rather than guessed.
2. **No Fake Student Activity:** Fresh student dashboards must display clear, helpful empty states, not simulated exam scores, fake leaderboards, or false testimonials.
3. **No Hallucinated Official Rules:** Official cut-off marks, candidate quotas, viva rules, or circular dates must only be served from verified `exam_config_versions` referencing primary BPSC publications.
4. **Honest Readiness Indicator:** Candidate readiness is framed transparently as an internal learning progress heuristic based on syllabus coverage and recent mock accuracy—never marketed as an official prediction or guarantee of BPSC cadre selection.
