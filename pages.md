# Angels School — Page Structure & Site Architecture

This document provides a comprehensive overview of the page hierarchy, route structure, component organization, and bilingual navigation flow implemented for **Angels School**.

---

## 🗺️ Information Architecture & Navigation Map

```
Angels School Website Root (/)
├── Top Bar & Sticky Header
│   ├── School Logo Identity
│   ├── Navigation Links (About, Academics, Campuses, Higher Secondary, Admissions, School Life, News & Events, Contact)
│   ├── Language Switcher (English | ગુજરાતી)
│   └── Primary Action CTA ("Start Admissions")
│
├── 🌐 Pages & Route Structure
│   ├── /                         [HomePage]
│   ├── /about                    [About Angels School Page]
│   ├── /campuses/bhulka          [Bhulka Campus Page - Ages 3-7]
│   ├── /campuses/angels          [Angels School Main Campus Page - Grades 1-12]
│   ├── /academics                [Academics Overview & Progression Page]
│   ├── /higher-secondary         [Higher Secondary Streams Page - Science, Commerce, Arts]
│   ├── /admissions              [Admissions Process, Guidelines & FAQs Page]
│   ├── /school-life              [School Life, Sports, Arts & Clubs Page]
│   ├── /facilities                [Campus Infrastructure & STEM Labs Page]
│   ├── /news-events              [News, Announcements & Calendar Page]
│   ├── /contact                  [Contact, Campus Addresses & Map Page]
│   └── /apply                    [Dedicated Enquiry & Online Application Page]
│
├── 📑 Global Drawers & Modals
│   └── AdmissionsModal           [Unified 5-Option Action Drawer + 3-Step Application Form]
│
└── 🦶 Global Footer
    ├── Brand Mission & Language Toggle
    ├── Quick Navigation Links
    ├── Campus Address Cards
    └── Direct Contact & Social Links
```

---

## 📄 Detailed Page-by-Page Specifications

### 1. Homepage (`/` — `src/app/page.tsx`)
Assembles 11 distinct visual storytelling sections:
1. **Immersive Hero (`HeroSection.tsx`)**: Full-screen cinematic hero featuring the authentic supplied school building image (`/angels-school-campus.jpg`), smooth zoom animation, dark-navy depth overlay, tagline *"A Beautiful Beginning. A Confident Future."*, and action buttons.
2. **Brand Statement (`BrandStatement.tsx`)**: Large-type editorial motto *"Where Education is Growth"* with logo-inspired green arc animation.
3. **Interactive Path Finder (`PathFinder.tsx`)**: Selection tool for parents (Child age slider, Medium preference, Grade stage, Stream selection for 11–12) generating real-time campus & stage recommendations.
4. **Two-Campus Reveal (`TwoCampusReveal.tsx`)**: Side-by-side cinematic split cards for **Bhulka Campus** (Ages 3–7) and **Angels School Campus** (Grades 1–12).
5. **Academic Journey (`AcademicJourney.tsx`)**: Progression timeline from Early Years through Primary, Middle, Secondary, and Higher Secondary.
6. **Higher Secondary Pathways (`HigherSecondaryStreams.tsx`)**: 3 stream cards for **Science**, **Commerce**, and **Arts** with hover depth effects.
7. **Why Angels School (`WhyAngelsSchool.tsx`)**: 6 core educational pillars (Caring Teachers, Strong Academics, Safe Campuses, Sports & Arts, Modern Spaces, Individual Growth).
8. **School Life Gallery (`SchoolLifeGallery.tsx`)**: Editorial photo grid showcasing early childhood learning, STEM labs, athletic tracks, and cultural celebrations.
9. **Testimonials (`TestimonialsSection.tsx`)**: Quotes from parents and alumni.
10. **News & Events Preview (`NewsEventsSection.tsx`)**: Latest announcements and event previews.
11. **Admissions CTA (`AdmissionsCTA.tsx`)**: Final immersive section with quick buttons for visit booking, enquiry, online application, call, and WhatsApp.

---

### 2. About Angels School (`/about` — `src/app/about/page.tsx`)
- **Header**: Educational motto *"Where Education is Growth"*.
- **Philosophy Section**: Detailed narrative on balancing academic rigor with emotional security.
- **Heritage Callout**: Established 1998, operating 2 specialized campuses in Gujarat.
- **6 Foundational Pillars**: In-depth breakdown of educational values.
- **Call-To-Action**: Campus visit booking trigger.

---

### 3. Bhulka Campus (`/campuses/bhulka` — `src/app/campuses/bhulka/page.tsx`)
- **Target Audience**: Parents seeking admission for Playgroup, Nursery, LKG, and HKG (Ages 3–7).
- **Core Focus**: Warm, safe, imaginative environment, play-based discovery, and early childhood literacy.
- **Key Features**: Sensory playrooms, CCTV-monitored classrooms, splash play park, gentle early childhood educators, phonetic & storytelling immersion.
- **Language Options**: English Medium and Gujarati Medium early years learning.

---

### 4. Angels School Main Campus (`/campuses/angels` — `src/app/campuses/angels/page.tsx`)
- **Target Audience**: Parents seeking admission for Grade 1 through Grade 12 (Higher Secondary).
- **Hero Banner**: Features the supplied authentic Angels School building image (`/angels-school-campus.jpg`).
- **Core Infrastructure**: STEM Physics, Chemistry, Biology laboratories, computer centers, expansive sports grounds, and 15,000+ title library.
- **Higher Secondary Teaser**: Science, Commerce, and Arts stream pathways.

---

### 5. Academics Overview (`/academics` — `src/app/academics/page.tsx`)
- **Dual Medium Breakdown**:
  - **English Medium Stream**: Immersive English instruction, global communication, STEM literacy.
  - **Gujarati Medium Stream**: Deep conceptual clarity in mother tongue paired with parallel English speech enrichment.
- **Progression Timeline**: Comprehensive breakdown across Early Years, Primary, Middle School, Secondary, and Higher Secondary.

---

### 6. Higher Secondary Streams (`/higher-secondary` — `src/app/higher-secondary/page.tsx`)
- **Science Stream**:
  - *Focus*: Physics, Chemistry, Mathematics / Biology, Computer Science.
  - *Preparation*: Engineering (IITs/NITs), Medicine (MBBS/BDS), Data Science, JEE/NEET/GUJCET entrance mentorship.
- **Commerce Stream**:
  - *Focus*: Elements of Accounts, Business Administration, Economics, Statistics.
  - *Preparation*: Chartered Accountancy (CA/ACCA), Business Administration (BBA/MBA), Finance, Fintech.
- **Arts & Humanities Stream**:
  - *Focus*: Psychology, Sociology, Political Science, History, Literature.
  - *Preparation*: Civil Services (UPSC/GPSC), Law (BA LLB), Journalism, Media & Design.

---

### 7. Admissions Guidelines & FAQs (`/admissions` — `src/app/admissions/page.tsx`)
- **4-Step Admission Journey**:
  1. Submit Enquiry / Online Application
  2. Campus Visit & Teacher Interaction
  3. Document Verification (Birth certificate, previous school records)
  4. Admission Confirmation & Welcome Kit
- **Interactive FAQs**: Expandable accordion answering common parent queries regarding campuses, mediums, streams, and tours.

---

### 8. School Life & Extracurriculars (`/school-life` — `src/app/school-life/page.tsx`)
- **Sports & Athletics**: Football pitch, athletic track, cricket grounds, badminton, indoor games.
- **Arts & Music**: Music studios, traditional dance, drama, fine arts.
- **STEM & Clubs**: Robotics club, debate forum, eco club, science exhibition.

---

### 9. Campus Facilities (`/facilities` — `src/app/facilities/page.tsx`)
- **STEM Laboratories**: High-precision physics, chemistry, and biology experimental spaces.
- **Computer Science & Coding Hub**: High-speed internet and modern desktops.
- **Digital Library**: Quiet reading zones and digital archives.
- **Sensory Play Park**: Child-safe early childhood equipment at Bhulka Campus.
- **GPS-Tracked Transport**: Buses equipped with GPS tracking and trained female attendants.
- **Security & Medical Support**: 24/7 CCTV surveillance and medical nurse station.

---

### 10. News & Events (`/news-events` — `src/app/news-events/page.tsx`)
- **Categorized News**: Academic achievements, campus events, early years activities.
- **Interactive Modal Reader**: Clicking *"Read Full Article"* opens a detailed pop-up modal without leaving the page.

---

### 11. Contact Us (`/contact` — `src/app/contact/page.tsx`)
- **Campus Addresses & Contact Numbers**:
  - *Bhulka Campus*: Near Green Park Society, Ring Road, Gujarat (`+91 98765 43211`).
  - *Angels School Main Campus*: Angels Educational Zone, Academic Parkway, Gujarat (`+91 98765 43210`).
- **Office Timings**: Monday – Saturday (8:00 AM – 4:30 PM).
- **Interactive Contact Form**: Direct message submission with success feedback.

---

### 12. Online Application (`/apply` — `src/app/apply/page.tsx`)
- **Multi-Step Form**:
  - *Step 1*: Student & Parent Name, Date of Birth, Phone (WhatsApp).
  - *Step 2*: Campus preference, Medium (English/Gujarati), Grade, Stream selection (for 11–12).
  - *Step 3*: Email address, preferred contact channel, notes, and submit action.

---

## 🗂️ Component Directory Hierarchy

```
src/
├── app/
│   ├── layout.tsx                # Root layout with metadata and MainLayout wrapper
│   ├── globals.css               # Global CSS tokens, glassmorphism, fonts & scrollbar
│   ├── page.tsx                  # Homepage assembling 11 sections
│   ├── about/page.tsx            # About page
│   ├── campuses/
│   │   ├── bhulka/page.tsx       # Bhulka Campus page
│   │   └── angels/page.tsx       # Angels School Campus page
│   ├── academics/page.tsx        # Academics page
│   ├── higher-secondary/page.tsx # Science, Commerce & Arts page
│   ├── admissions/page.tsx       # Admissions & FAQs page
│   ├── school-life/page.tsx      # School Life page
│   ├── facilities/page.tsx       # Facilities page
│   ├── news-events/page.tsx      # News & Events page
│   ├── contact/page.tsx          # Contact page
│   └── apply/page.tsx            # Standalone Online Application page
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx            # Sticky frosted-glass header with nav & language toggle
│   │   ├── Footer.tsx            # Academic footer with links & addresses
│   │   ├── MainLayout.tsx        # App layout wrapper managing modal state
│   │   └── AdmissionsModal.tsx   # Unified admissions drawer & multi-step form
│   │
│   └── home/
│       ├── HeroSection.tsx       # Full-screen hero with building photo
│       ├── BrandStatement.tsx    # Editorial motto with green arc
│       ├── PathFinder.tsx        # Interactive parent selection tool
│       ├── TwoCampusReveal.tsx   # Side-by-side campus split cards
│       ├── AcademicJourney.tsx   # Age 3-12 progression timeline
│       ├── HigherSecondaryStreams.tsx # Science, Commerce, Arts cards
│       ├── WhyAngelsSchool.tsx   # 6 core values grid
│       ├── SchoolLifeGallery.tsx # Photo grid showcase
│       ├── TestimonialsSection.tsx # Parent & alumni reviews
│       ├── NewsEventsSection.tsx # News cards preview
│       └── AdmissionsCTA.tsx     # Final admissions banner
│
├── context/
│   └── LanguageContext.tsx       # Global English/Gujarati switching context
│
└── data/
    └── schoolData.ts             # Editable configuration for campuses, streams, FAQs, news & values
```