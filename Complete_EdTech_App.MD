# 📚 EdTech App — Complete Documentation
### (Physics Wallah / Online Teaching Platform Style)

---

## 📋 Table of Contents

1. [Project Overview](#1-project-overview)
2. [App Modules & Features](#2-app-modules--features)
3. [User Roles](#3-user-roles)
4. [Student Panel](#4-student-panel)
5. [Teacher Panel](#5-teacher-panel)
6. [Admin Panel](#6-admin-panel)
7. [Batch & Course System](#7-batch--course-system)
8. [Live Class System](#8-live-class-system)
9. [Recorded Video System](#9-recorded-video-system)
10. [Test & Quiz System](#10-test--quiz-system)
11. [Notes & Study Material](#11-notes--study-material)
12. [Doubt Solving System](#12-doubt-solving-system)
13. [Fee & Payment System](#13-fee--payment-system)
14. [Notification System](#14-notification-system)
15. [Leaderboard & Progress Tracking](#15-leaderboard--progress-tracking)
16. [Mobile App Features](#16-mobile-app-features)
17. [Database Structure (Simple)](#17-database-structure-simple)
18. [Tech Stack Suggestion](#18-tech-stack-suggestion)
19. [App Screens List](#19-app-screens-list)
20. [Future Features / Roadmap](#20-future-features--roadmap)

---

## 1. Project Overview

| Field | Details |
|---|---|
| **App Name** | EduPlatform (or your brand name) |
| **Type** | Online EdTech / Coaching Platform |
| **Target Users** | Students (Class 6–12, Dropper, Competitive Exams) |
| **Platforms** | Android App, iOS App, Website |
| **Core Goal** | Provide quality education with live classes, recorded videos, tests, notes & doubt solving |

### 🎯 App Purpose
This platform allows coaching institutes and educators to:
- Conduct **live and recorded classes** online
- Manage **batches** of students
- Conduct **tests and quizzes**
- Share **study material & notes**
- Track **student progress**
- Manage **fees and payments**

---

## 2. App Modules & Features

```
EdTech App
│
├── 👨‍🎓 Student Module
│   ├── Registration & Login
│   ├── Batch Enrollment
│   ├── Live Classes
│   ├── Recorded Videos
│   ├── Tests & Quizzes
│   ├── Notes / PDF Downloads
│   ├── Doubt Forum
│   ├── Progress Dashboard
│   └── Payment & Subscription
│
├── 👨‍🏫 Teacher Module
│   ├── Teacher Login
│   ├── Schedule & Conduct Live Class
│   ├── Upload Recorded Videos
│   ├── Create & Assign Tests
│   ├── Upload Study Material
│   ├── Answer Student Doubts
│   └── View Batch Analytics
│
└── 🛠️ Admin Module
    ├── Manage Users
    ├── Manage Batches & Courses
    ├── Manage Teachers
    ├── Fee & Payment Reports
    ├── Notification Management
    └── Platform Analytics
```

---

## 3. User Roles

| Role | Access Level | Description |
|---|---|---|
| **Super Admin** | Full Access | Manages entire platform |
| **Admin** | High | Manages batches, teachers, payments |
| **Teacher / Educator** | Medium | Creates content, conducts classes |
| **Student** | Limited | Views content based on enrollment |
| **Parent** | View Only | Monitors child's progress |

---

## 4. Student Panel

### 4.1 Registration & Login
- Register via **Mobile Number / Email**
- OTP verification
- Login with **Password or OTP**
- Social Login (Google / Facebook) *(optional)*
- Profile setup: Name, Class, Target Exam, City

### 4.2 Student Dashboard
The main screen a student sees after login:

```
┌─────────────────────────────────┐
│  👋 Hello, Rahul!               │
│  Class 11 | JEE Batch           │
├─────────────────────────────────┤
│  📅 Today's Schedule            │
│  - Physics Live Class  10:00 AM │
│  - Chemistry Test      3:00 PM  │
├─────────────────────────────────┤
│  📊 Your Progress               │
│  Tests Given: 12  |  Rank: #45  │
├─────────────────────────────────┤
│  🔔 New Notifications (3)       │
└─────────────────────────────────┘
```

### 4.3 My Batches
- View all enrolled batches
- Each batch shows:
  - Subjects covered
  - Teacher names
  - Schedule (timetable)
  - Progress percentage

### 4.4 Free vs Paid Content
- **Free students** can access free batch content
- **Paid students** unlock premium batch content after payment
- Lock icon shown on premium content for free users

---

## 5. Teacher Panel

### 5.1 Teacher Login
- Separate teacher login portal
- Teachers assigned to specific batches by admin

### 5.2 Teacher Dashboard
```
┌──────────────────────────────────┐
│  👨‍🏫 Teacher: Alakh Pandey        │
│  Subject: Physics                │
├──────────────────────────────────┤
│  📅 Next Live Class: Tomorrow    │
│      10:00 AM - Class 11 JEE     │
├──────────────────────────────────┤
│  📹 Recent Uploads: 5 Videos     │
│  📝 Pending Doubts: 12           │
│  📊 Total Students: 8,450        │
└──────────────────────────────────┘
```

### 5.3 Teacher Capabilities

| Action | Description |
|---|---|
| Create Live Class | Schedule & start live session |
| Upload Video | Upload recorded lecture |
| Add Notes | Upload PDF, images |
| Create Test | Make MCQ/subjective tests |
| Answer Doubts | Reply to student queries |
| View Analytics | See class performance data |

---

## 6. Admin Panel

### 6.1 Admin Dashboard
- Total Students count
- Total Revenue (monthly/yearly)
- Active Batches count
- Live Classes happening now
- New signups today

### 6.2 Admin Controls

| Module | Actions |
|---|---|
| **User Management** | View, edit, ban, export students |
| **Teacher Management** | Add/remove teachers, assign batches |
| **Batch Management** | Create, edit, delete batches |
| **Payment Management** | View transactions, refunds, reports |
| **Notification Management** | Send announcements |
| **Content Moderation** | Review and approve uploads |

---

## 7. Batch & Course System

### 7.1 What is a Batch?
A **batch** is a group of students learning together under the same course/program.

### 7.2 Batch Creation

**Fields when creating a batch:**
```
Batch Name:        [JEE Mains 2026 - Arjuna Batch]
Target Exam:       [JEE / NEET / Board / Foundation]
Class:             [Class 11 / Class 12 / Dropper]
Start Date:        [01-June-2025]
End Date:          [31-March-2026]
Price:             [₹4,999]
Subjects:          [Physics, Chemistry, Maths]
Assigned Teachers: [Teacher 1, Teacher 2, Teacher 3]
Max Students:      [Unlimited / 500 / Custom]
Batch Type:        [Live / Recorded / Hybrid]
```

### 7.3 Batch Types

| Type | Description |
|---|---|
| **Live Batch** | All classes happen live, no recorded backup |
| **Recorded Batch** | Only pre-recorded videos, no live sessions |
| **Hybrid Batch** | Mix of live classes + recorded videos |
| **Free Batch** | Open to all, no payment needed |
| **Paid Batch** | Requires enrollment fee |

### 7.4 Student Enrollment Flow
```
Student searches batch
        ↓
Views batch details & syllabus
        ↓
Clicks "Enroll Now"
        ↓
Free Batch → Direct Access
Paid Batch → Payment Gateway → Confirmation → Access
```

---

## 8. Live Class System

### 8.1 How Live Classes Work

```
Teacher starts live class
         ↓
Students get notification
         ↓
Students join via app/website
         ↓
Live video + audio streaming
         ↓
Students can ask questions in chat
         ↓
Class ends → Recording saved automatically
```

### 8.2 Live Class Features

| Feature | Description |
|---|---|
| **HD Video Streaming** | Teacher's face + screen share |
| **Whiteboard** | Digital board for writing/drawing |
| **Live Chat** | Students send messages during class |
| **Hand Raise** | Students raise virtual hand to speak |
| **Poll/Quiz** | Quick polls during lecture |
| **Attendance** | Auto-marked when student joins |
| **Recording** | Auto-saved for later viewing |
| **Screen Share** | Teacher shares slides/screen |

### 8.3 Live Class Schedule (Timetable)

```
Monday     - Physics (10:00 AM - 12:00 PM)
Tuesday    - Chemistry (10:00 AM - 12:00 PM)
Wednesday  - Mathematics (10:00 AM - 12:00 PM)
Thursday   - Physics + Doubt Session (9:00 AM - 12:00 PM)
Friday     - Chemistry (10:00 AM - 12:00 PM)
Saturday   - Full Length Test (10:00 AM - 1:00 PM)
Sunday     - OFF / Revision
```

---

## 9. Recorded Video System

### 9.1 Video Organization Structure
```
Batch: JEE Mains 2026
└── Subject: Physics
    ├── Chapter 1: Motion in a Straight Line
    │   ├── Lecture 1 - Introduction (45 min)
    │   ├── Lecture 2 - Equations of Motion (1 hr)
    │   └── Lecture 3 - Graphs (50 min)
    ├── Chapter 2: Laws of Motion
    │   ├── Lecture 1 - Newton's Laws (55 min)
    │   └── Lecture 2 - Applications (1 hr 10 min)
    └── Chapter 3: Work & Energy
        └── ...
```

### 9.2 Video Player Features
- **Speed Control** — 0.5x, 0.75x, 1x, 1.25x, 1.5x, 2x
- **Quality Control** — 360p, 480p, 720p, 1080p
- **Subtitles / Captions** *(optional)*
- **Bookmark** — mark timestamp for later review
- **Notes while watching** — write notes at specific timestamps
- **Download** — for offline viewing *(limited)*
- **Continue from where left off** — progress saved automatically

### 9.3 Video Access Rules
| Condition | Access |
|---|---|
| Student enrolled in batch | ✅ Full Access |
| Student not enrolled | ❌ No Access (Lock shown) |
| Free preview content | ✅ First few minutes free |
| Expired subscription | ❌ Locked until renewal |

---

## 10. Test & Quiz System

### 10.1 Types of Tests

| Test Type | Description |
|---|---|
| **Chapter Test** | After completing a chapter |
| **Weekly Test** | Every week covering recent topics |
| **Monthly Test** | Full syllabus covered so far |
| **Full Mock Test** | Complete exam simulation |
| **Daily Practice Problems (DPP)** | Small set of questions daily |
| **Live Quiz** | Conducted during live class |

### 10.2 Test Creation (by Teacher/Admin)

**Test Settings:**
```
Test Title:      [Chapter 1 - Motion Test]
Subject:         [Physics]
Total Questions: [30]
Total Marks:     [120]
Duration:        [60 minutes]
Marking Scheme:
  - Correct Answer:   +4
  - Wrong Answer:     -1
  - Unattempted:       0
Question Types:
  - Single Correct MCQ
  - Multiple Correct MCQ
  - Integer / Numerical Type
  - Subjective (Long Answer)
Start Time:      [15-May-2025, 10:00 AM]
End Time:        [15-May-2025, 11:00 AM]
```

### 10.3 Student Test Experience
```
Student opens test
      ↓
Instructions screen shown
      ↓
Timer starts when student clicks "Start"
      ↓
Questions displayed one by one OR in a panel
      ↓
Student can:
  - Mark for review
  - Skip and come back
  - See question palette (color coded)
      ↓
Submit test (or auto-submit when time runs out)
      ↓
Instant result shown (score, rank, solutions)
```

### 10.4 Question Palette (Color Code)
| Color | Meaning |
|---|---|
| 🟢 Green | Answered |
| 🔴 Red | Not answered |
| 🟣 Purple | Marked for review (answered) |
| 🟡 Yellow | Marked for review (not answered) |
| ⬜ White/Grey | Not visited yet |

### 10.5 Test Result & Analysis
After submitting, student sees:
- Total Score
- Correct / Incorrect / Unattempted counts
- Percentile rank among all students
- Time taken per question
- Solution for each question
- Comparison with topper's performance

---

## 11. Notes & Study Material

### 11.1 Material Types
| Type | Format |
|---|---|
| **Lecture Notes** | PDF |
| **Short Notes** | PDF / Image |
| **Mind Maps** | Image / PDF |
| **Formula Sheets** | PDF |
| **Previous Year Questions** | PDF |
| **DPP Sheets** | PDF (questions + solutions) |
| **Revision Material** | PDF |

### 11.2 Notes Access
- Organized chapter-wise under each subject
- Preview available for free users
- Full download for enrolled/paid students
- Watermark with student's name on PDF *(optional, for security)*

---

## 12. Doubt Solving System

### 12.1 Types of Doubt Support

| Type | Description |
|---|---|
| **Live Chat Doubt** | During live class via chat box |
| **Doubt Forum** | Post doubt anytime, teacher replies |
| **Doubt Video** | Teacher records short video explanation |
| **1-on-1 Doubt Session** | Scheduled call with teacher *(premium)* |
| **AI Doubt Bot** | Basic doubts answered by AI *(future feature)* |

### 12.2 Doubt Forum Flow
```
Student posts doubt
  (text + optional image/photo of question)
           ↓
Assigned to subject teacher
           ↓
Teacher replies (text / video / image)
           ↓
Student gets notification
           ↓
Student can mark doubt as "Resolved"
```

### 12.3 Doubt Post Fields
- Doubt title (short description)
- Full question (text)
- Attach image *(photo of textbook/notebook)*
- Select chapter / topic
- Mark as urgent *(optional)*

---

## 13. Fee & Payment System

### 13.1 Pricing Models

| Model | Description |
|---|---|
| **One-time Fee** | Pay once for the full batch |
| **Monthly Subscription** | Pay every month |
| **EMI Option** | Split payment in installments |
| **Free Batch** | No payment, open access |
| **Free + Premium (Freemium)** | Basic free, advanced paid |

### 13.2 Payment Gateway Integration
- **Razorpay** *(most popular in India)*
- **PayU**
- **Paytm**
- **UPI / Net Banking / Credit-Debit Card**
- **International: Stripe / PayPal** *(for global reach)*

### 13.3 Payment Flow
```
Student clicks "Buy Now"
         ↓
Order summary shown
         ↓
Apply coupon code (if any)
         ↓
Select payment method
         ↓
Payment gateway processes
         ↓
Success → Batch Access Unlocked
Failure → Retry / Try another method
         ↓
Invoice / Receipt sent via Email + SMS
```

### 13.4 Admin Financial Reports
- Daily / Monthly revenue
- Batch-wise revenue
- Refund requests
- Coupon usage stats
- Failed transactions log

---

## 14. Notification System

### 14.1 Types of Notifications

| Trigger | Notification Sent |
|---|---|
| Live class starting in 15 mins | "Physics class starts in 15 minutes!" |
| New video uploaded | "New lecture added: Chapter 5 - Optics" |
| Test scheduled | "Mock Test on Saturday 10:00 AM" |
| Test result available | "Your test result is ready. Score: 92/120" |
| New note uploaded | "Formula Sheet for Thermodynamics uploaded" |
| Doubt answered | "Your doubt has been answered by the teacher" |
| Fee reminder | "Your subscription expires in 3 days" |
| New announcement | "Holiday on 15th August" |

### 14.2 Notification Channels
- **Push Notification** (Mobile App)
- **SMS**
- **Email**
- **In-App Bell Icon**
- **WhatsApp** *(optional integration)*

---

## 15. Leaderboard & Progress Tracking

### 15.1 Student Progress Dashboard

```
┌──────────────────────────────────────┐
│  📊 My Progress - Class 11 JEE Batch │
├──────────────────────────────────────┤
│  Videos Watched:    48 / 120  (40%)  │
│  Tests Given:       12 / 24   (50%)  │
│  Average Score:     78%              │
│  Doubts Solved:     15               │
│  Attendance:        82%              │
├──────────────────────────────────────┤
│  🏆 Overall Batch Rank:  #145 / 8420 │
│  📈 Subject-wise Ranks:              │
│     Physics:    #89                  │
│     Chemistry:  #201                 │
│     Maths:      #155                 │
└──────────────────────────────────────┘
```

### 15.2 Leaderboard
- Global rank among all batch students
- Weekly rank (based on tests given that week)
- Subject-wise rank
- Top 10 students highlighted with medals 🥇🥈🥉
- Student can see their position & nearby ranks

### 15.3 Badges & Achievements *(optional gamification)*
| Badge | Earned When |
|---|---|
| 🔥 Streak Master | 7 days consecutive login |
| 📹 Video Champion | Watched 50 videos |
| 🎯 Perfect Score | 100% in any test |
| ❓ Curious Learner | Asked 10 doubts |
| ⚡ Speed Solver | Completed test in half the time |

---

## 16. Mobile App Features

### 16.1 Android & iOS App Specific Features
- **Offline Video Download** — Watch without internet
- **Picture-in-Picture (PiP)** — Minimize video and use other apps
- **Dark Mode** — Eye-friendly night mode
- **App Lock** — PIN / Fingerprint / Face ID
- **DRM Protection** — Prevents video screen recording
- **Background Audio** — Listen to lecture with screen off
- **Low Data Mode** — Reduces video quality to save data

### 16.2 App Navigation (Bottom Bar)

```
┌─────┬───────┬───────┬───────┬───────┐
│Home │Batches│ Tests │ Notes │Profile│
└─────┴───────┴───────┴───────┴───────┘
```

---

## 17. Database Structure (Simple)

### Key Tables / Collections

```
USERS
  - user_id
  - name
  - email
  - phone
  - role (student/teacher/admin)
  - created_at

BATCHES
  - batch_id
  - batch_name
  - target_exam
  - price
  - start_date
  - end_date
  - teacher_ids[]
  - is_free (yes/no)

ENROLLMENTS
  - enrollment_id
  - student_id
  - batch_id
  - enrolled_at
  - payment_id
  - status (active/expired)

VIDEOS
  - video_id
  - batch_id
  - subject
  - chapter
  - title
  - duration
  - video_url
  - uploaded_at

TESTS
  - test_id
  - batch_id
  - title
  - total_marks
  - duration_minutes
  - start_time
  - end_time

QUESTIONS
  - question_id
  - test_id
  - question_text
  - options[]
  - correct_answer
  - marks

TEST_RESULTS
  - result_id
  - student_id
  - test_id
  - score
  - total_marks
  - rank
  - submitted_at

DOUBTS
  - doubt_id
  - student_id
  - batch_id
  - subject
  - question_text
  - image_url
  - status (open/answered/resolved)
  - created_at

PAYMENTS
  - payment_id
  - student_id
  - batch_id
  - amount
  - method (UPI/card/etc)
  - status (success/failed/refunded)
  - transaction_id
  - created_at
```

---

## 18. Tech Stack Suggestion

### 18.1 Frontend (Website)
| Layer | Technology |
|---|---|
| Framework | React.js / Next.js |
| Styling | Tailwind CSS |
| State Management | Redux / Zustand |

### 18.2 Mobile App
| Platform | Technology |
|---|---|
| Android + iOS | React Native / Flutter |

### 18.3 Backend
| Layer | Technology |
|---|---|
| Server | Node.js + Express.js |
| Database | MongoDB / PostgreSQL |
| Authentication | JWT + OTP (Firebase / MSG91) |
| File Storage | AWS S3 / Cloudflare R2 |
| Video Streaming | AWS CloudFront / Cloudflare Stream |
| Live Streaming | Agora.io / Zoom SDK / 100ms |
| Payment | Razorpay |
| Notifications | Firebase FCM + Twilio |
| Search | Elasticsearch *(optional)* |

### 18.4 DevOps & Hosting
| Tool | Purpose |
|---|---|
| AWS / GCP | Cloud hosting |
| Docker | Containerization |
| Nginx | Reverse proxy |
| GitHub Actions | CI/CD pipeline |
| Redis | Caching & sessions |

---

## 19. App Screens List

### Student App Screens
1. Splash Screen
2. Onboarding (3-4 slides)
3. Login / Register Screen
4. OTP Verification
5. Profile Setup
6. Home Dashboard
7. Batch Listing
8. Batch Detail Page
9. Live Class Screen
10. Video Player Screen
11. Chapter / Subject Listing
12. Test List Screen
13. Test Instructions Screen
14. Test Attempt Screen
15. Test Result Screen
16. Test Analysis Screen
17. Notes / PDF Listing
18. PDF Viewer
19. Doubt Forum List
20. Post a Doubt Screen
21. My Doubts Screen
22. Leaderboard Screen
23. My Progress Screen
24. Notifications Screen
25. Payment / Checkout Screen
26. Transaction History
27. My Profile Screen
28. Settings Screen
29. About / Contact Screen

### Teacher App Screens
1. Teacher Login
2. Teacher Dashboard
3. My Batches
4. Schedule Live Class
5. Start Live Class
6. Upload Video
7. Create Test
8. Add Questions
9. Upload Notes
10. Doubt Inbox
11. Batch Analytics

---

## 20. Future Features / Roadmap

| Feature | Priority | Description |
|---|---|---|
| 🤖 AI Doubt Solver | High | AI answers basic doubts instantly |
| 🧠 Personalized Learning Path | High | AI suggests what to study next |
| 👨‍👩‍👧 Parent Portal | Medium | Parents track child's progress |
| 🏅 Scholarship Tests | Medium | Open tests for scholarships |
| 📊 Detailed Analytics for Teachers | Medium | Class performance insights |
| 🌐 Multi-language Support | High | Hindi, Tamil, Telugu, etc. |
| 📱 Tablet Optimized UI | Low | Better layout for tablets |
| 🎮 Gamification | Low | Points, levels, missions |
| 📝 AI Test Generator | Medium | Auto-generate tests from content |
| 🔗 Social Learning | Low | Students form study groups |
| 📡 WhatsApp Integration | Medium | Notifications + content via WhatsApp |
| 🖥️ Smart TV App | Low | Cast classes on TV |

---

## 📌 Summary

```
EdTech App = 
  Live Classes +
  Recorded Videos +
  Batch Management +
  Tests & Quizzes +
  Notes & PDFs +
  Doubt Solving +
  Progress Tracking +
  Fee Management +
  Notifications +
  Admin Controls
```

> ✅ This document covers the **complete blueprint** of an EdTech platform 
> similar to Physics Wallah, Unacademy, or BYJU'S. It is suitable for
> use as a project requirement document, developer handoff, or product planning.

---

*Document Version: 1.0 | Created: April 2025 | Platform: Web + Android + iOS*

