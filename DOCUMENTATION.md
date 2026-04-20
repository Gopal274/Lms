                      edtech app

# Physics Wallah (PW) Batch System — Simply Explained - edtech app

## 🏫 What is a "Batch"?

Think of a **batch** like a **classroom section** in a regular school. Just like a school might have "Class 10 - Section A" and "Class 10 - Section B", PW organizes students into batches based on:

- 📚 **Their grade/class** (e.g., Class 11, Class 12)
- 🎯 **Their goal** (e.g., JEE, NEET, Board exams)
- 📅 **Their year of exam** (e.g., 2025 droppers, 2026 aspirants)

---

## 🔄 How the System Works (Step by Step)

### 1. 🧑‍🎓 Student Joins a Batch
- A student picks a batch that matches their goal and class.
- It's like choosing which "course package" to enroll in.
- Some batches are **free**, some are **paid**.

### 2. 📹 Live & Recorded Classes
- Teachers conduct **live classes** at scheduled times (like a real school timetable).
- If you miss a class, you can watch the **recorded version** later — like a replay on YouTube.

### 3. 📝 Study Material
- Each batch provides **notes, PDFs, and assignments** — like a school giving you textbooks and homework sheets.

### 4. 🧪 Tests & Quizzes
- Regular **tests** are conducted inside the batch — just like periodic exams in school.
- Your score is tracked so you can see your progress.

### 5. 💬 Doubt Solving
- Students can ask questions — either through **live chat during class** or a **separate doubt section**.
- Think of it like raising your hand in class or visiting a teacher after school.

---

## 🗂️ Types of Batches (Examples)

| Batch Type | Who it's for |
|---|---|
| **Arjuna Batch** | JEE/NEET aspirants (flagship) |
| **Eklavya Batch** | Board exam focused |
| **Dropper Batch** | Students repeating the year |
| **Foundation Batch** | Class 8, 9, 10 students |

---

## 📱 Where Does It Happen?

Everything runs on the **PW App or Website** — it's like a digital school building where:
- 🚪 You "enter" by logging in
- 🏛️ Each batch is a "classroom"
- 📋 Your dashboard shows your schedule, tests, and progress

---

## 🎯 The Big Picture

> **PW Batch System = A complete online school**, where instead of physically going to a building, you open an app — and everything a regular coaching institute offers (classes, notes, tests, teachers) is available on your phone or laptop.

It's designed so that a student in a small town gets the **same quality education** as someone in a big city. That's the core idea behind Physics Wallah.

---

Want me to explain any specific part in more detail — like how the fee structure works, or how live classes are conducted?
# 🎓 LMS Platform — Complete Project Documentation
### PW (Physics Wallah) Clone → Full-Scale EdTech Platform

> **Coverage:** Architecture · Full Project Structure · Missing Features · 200% Roadmap  
> **Stack:** Node.js + TypeScript · Expo React Native · React + Vite · MongoDB · Socket.io · Agora

---

## 📑 Table of Contents

1. [Project Architecture & Tech Stack](#1-project-architecture--tech-stack)
2. [Complete Directory Structure](#2-complete-directory-structure)
3. [Key Data Flow Patterns](#3-key-data-flow-patterns)
4. [Environment Variables](#4-environment-variables)
5. [Missing Critical Features (75% → 100%)](#5-missing-critical-features-75--100)
6. [Missing Important Features](#6-missing-important-features)
7. [Missing DevOps & Infrastructure](#7-missing-devops--infrastructure)
8. [200% Roadmap — Beat PW Completely](#8-200-roadmap--beat-pw-completely)
   - [AI-Powered Features](#81-ai-powered-features)
   - [Superior Mobile Experience](#82-superior-mobile-experience)
   - [Superior Learning Features](#83-superior-learning-features)
   - [Superior Monetization](#84-superior-monetization)
   - [Superior Analytics](#85-superior-analytics)
   - [Community & Retention](#86-community--retention)
   - [Technical Excellence](#87-technical-excellence)
   - [Growth Engine](#88-growth-engine)
9. [Complete Package List](#9-complete-package-list)
10. [Priority Roadmap Table](#10-priority-roadmap-table)
11. [Final Summary](#11-final-summary)

---

## 1. Project Architecture & Tech Stack

### 1.1 Backend (`/server`)
A robust Node.js server built with a focus on security and scalability.

| Layer | Technology |
|---|---|
| Language | TypeScript |
| Framework | Express.js |
| Database | MongoDB with Mongoose (ODM) |
| Real-time | Socket.io (Live Chat, Polls, Q&A) |
| Authentication | JWT (Access & Refresh tokens) + Bcryptjs |
| Media Management | Cloudinary (Video/Image) + HLS Streaming |
| Cache | Redis (Upstash) |
| Payments | Razorpay + Stripe (International) |
| Communication | Nodemailer with EJS templates |
| Live Engine | Agora SDK (RTC for video streaming) |

### 1.2 Student Mobile App (`/app`)
A modern cross-platform application focused on student engagement and security.

| Layer | Technology |
|---|---|
| Framework | Expo (React Native) |
| Styling | NativeWind (Tailwind CSS for React Native) |
| Navigation | Expo Router (File-based routing) |
| Video Player | expo-video with HLS support |
| Security | expo-screen-capture + Dynamic User Watermarking |
| Real-time | Socket.io-client |
| Live Stream | react-native-agora |

### 1.3 Admin Dashboard (`/lms-dashboard`)
A desktop-first management portal for teachers and administrators.

| Layer | Technology |
|---|---|
| Framework | React with Vite |
| Styling | Tailwind CSS + Shadcn UI (Radix UI primitives) |
| Icons | Lucide-React |
| State/Data | Axios + React Context API |
| Live Streaming | agora-rtc-sdk-ng (Teacher broadcasting) |
| Features | Course Editor, Batch Management, Live Control, Analytics |

---

## 2. Complete Directory Structure

```
/lms
├── 📁 server/                              # Backend TypeScript API
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.ts                       # MongoDB connection
│   │   │   ├── redis.ts                    # Upstash Redis client
│   │   │   ├── cloudinary.ts               # Cloudinary config
│   │   │   ├── agora.ts                    # Agora token generator
│   │   │   └── env.ts                      # Environment variables validator
│   │   │
│   │   ├── models/
│   │   │   ├── user.model.ts               # Student/Teacher/Admin schema
│   │   │   ├── course.model.ts             # Course + sections + lessons
│   │   │   ├── batch.model.ts              # Batch (e.g. "JEE 2025 Dropper")
│   │   │   ├── enrollment.model.ts         # User ↔ Course/Batch enrollment
│   │   │   ├── lesson.model.ts             # Video lesson with HLS metadata
│   │   │   ├── liveSession.model.ts        # Agora live class schema
│   │   │   ├── test.model.ts               # MCQ test with timer & marks
│   │   │   ├── testAttempt.model.ts        # Per-user attempt & analytics
│   │   │   ├── question.model.ts           # MCQ question bank
│   │   │   ├── poll.model.ts               # Live session poll
│   │   │   ├── qna.model.ts                # Live session Q&A
│   │   │   ├── order.model.ts              # Payment order (Razorpay/Stripe)
│   │   │   ├── notification.model.ts       # Push/in-app notifications
│   │   │   └── note.model.ts               # Student personal notes per lesson
│   │   │
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts          # Register, Login, Refresh, Logout
│   │   │   ├── user.controller.ts          # Profile, Avatar, Progress
│   │   │   ├── course.controller.ts        # CRUD courses, sections, lessons
│   │   │   ├── batch.controller.ts         # Batch management
│   │   │   ├── lesson.controller.ts        # HLS video upload & streaming URLs
│   │   │   ├── enrollment.controller.ts    # Enroll/unenroll, access check
│   │   │   ├── live.controller.ts          # Create/start/end live sessions
│   │   │   ├── test.controller.ts          # Create test, submit, get results
│   │   │   ├── analytics.controller.ts     # Admin analytics & reports
│   │   │   ├── payment.controller.ts       # Razorpay + Stripe order flow
│   │   │   ├── notification.controller.ts  # Push notification management
│   │   │   └── admin.controller.ts         # User management, dashboard stats
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.routes.ts
│   │   │   ├── user.routes.ts
│   │   │   ├── course.routes.ts
│   │   │   ├── batch.routes.ts
│   │   │   ├── lesson.routes.ts
│   │   │   ├── enrollment.routes.ts
│   │   │   ├── live.routes.ts
│   │   │   ├── test.routes.ts
│   │   │   ├── payment.routes.ts
│   │   │   ├── analytics.routes.ts
│   │   │   ├── notification.routes.ts
│   │   │   └── admin.routes.ts
│   │   │
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.ts          # JWT verify + attach user
│   │   │   ├── role.middleware.ts          # isAdmin, isTeacher, isStudent
│   │   │   ├── enrollment.middleware.ts    # Verify user has course access
│   │   │   ├── rateLimit.middleware.ts     # Redis-based rate limiting
│   │   │   ├── upload.middleware.ts        # Multer config for media
│   │   │   └── error.middleware.ts         # Global error handler
│   │   │
│   │   ├── utils/
│   │   │   ├── jwt.ts                      # Sign/verify access & refresh tokens
│   │   │   ├── hls.ts                      # FFmpeg HLS transcoding logic
│   │   │   ├── cloudinaryUpload.ts         # Upload video/image helpers
│   │   │   ├── agoraToken.ts               # RTC/RTM token generation
│   │   │   ├── redisCache.ts               # get/set/invalidate cache helpers
│   │   │   ├── sendEmail.ts                # Nodemailer + EJS template sender
│   │   │   ├── razorpay.ts                 # Razorpay order & verify helpers
│   │   │   ├── stripe.ts                   # Stripe session & webhook helpers
│   │   │   ├── watermark.ts                # Dynamic watermark metadata
│   │   │   └── apiResponse.ts              # Standardized API response wrapper
│   │   │
│   │   ├── email-templates/
│   │   │   ├── activation.ejs
│   │   │   ├── welcome.ejs
│   │   │   ├── resetPassword.ejs
│   │   │   └── purchaseConfirm.ejs
│   │   │
│   │   ├── types/
│   │   │   ├── express.d.ts                # Extend Request with user
│   │   │   └── index.ts                    # Shared TS interfaces/types
│   │   │
│   │   ├── socketServer.ts                 # All Socket.io events
│   │   │   # Events: join-room, leave-room
│   │   │   # Chat: send-message, receive-message
│   │   │   # Poll: launch-poll, submit-vote, poll-results
│   │   │   # Q&A: ask-question, answer-question, upvote
│   │   │   # Live: viewer-count, raise-hand, go-live, end-live
│   │   │
│   │   └── app.ts                          # Express app setup & route mounting
│   │
│   ├── server.ts                           # Entry point (HTTP + Socket.io)
│   ├── tsconfig.json
│   ├── .env
│   └── package.json
│
│
├── 📁 app/                                 # Expo React Native Student App
│   ├── app/                               # Expo Router file-based screens
│   │   ├── _layout.tsx                    # Root layout (fonts, auth gate)
│   │   ├── index.tsx                      # Splash / redirect screen
│   │   │
│   │   ├── (auth)/
│   │   │   ├── _layout.tsx
│   │   │   ├── login.tsx                  # Login screen
│   │   │   ├── register.tsx               # Register + OTP activation
│   │   │   └── forgot-password.tsx
│   │   │
│   │   ├── (tabs)/                        # Main bottom tab navigator
│   │   │   ├── _layout.tsx                # Tab bar config
│   │   │   ├── home.tsx                   # Home feed (batches, continue learning)
│   │   │   ├── explore.tsx                # Browse courses & batches
│   │   │   ├── my-courses.tsx             # Enrolled courses list
│   │   │   ├── tests.tsx                  # Available & attempted tests
│   │   │   └── profile.tsx                # User profile & settings
│   │   │
│   │   ├── course/[courseId]/
│   │   │   ├── index.tsx                  # Course detail + syllabus
│   │   │   └── checkout.tsx               # Payment screen
│   │   │
│   │   ├── batch/[batchId]/
│   │   │   └── index.tsx                  # Batch detail + subjects list
│   │   │
│   │   ├── lesson/[lessonId].tsx          # HLS video player screen
│   │   │                                  # (screen capture blocked + watermark)
│   │   │
│   │   ├── live/[sessionId].tsx           # Live class viewer (Agora + Socket)
│   │   │                                  # Chat, Poll, Q&A overlay
│   │   │
│   │   ├── test/[testId]/
│   │   │   ├── index.tsx                  # Test instructions screen
│   │   │   ├── attempt.tsx                # MCQ engine (timer, marks)
│   │   │   └── result.tsx                 # Score + explanations
│   │   │
│   │   └── notifications.tsx              # Notification center
│   │
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   ├── SkeletonLoader.tsx
│   │   │   └── Modal.tsx
│   │   │
│   │   ├── home/
│   │   │   ├── BannerCarousel.tsx
│   │   │   ├── BatchCard.tsx
│   │   │   └── ContinueLearningCard.tsx
│   │   │
│   │   ├── video/
│   │   │   ├── HLSVideoPlayer.tsx         # expo-video + HLS config
│   │   │   ├── WatermarkOverlay.tsx       # Dynamic user watermark
│   │   │   └── VideoControls.tsx
│   │   │
│   │   ├── live/
│   │   │   ├── LiveChatPanel.tsx          # Socket.io chat
│   │   │   ├── PollWidget.tsx             # Poll display + voting
│   │   │   ├── QnAPanel.tsx               # Q&A list + upvote
│   │   │   └── ViewerCount.tsx
│   │   │
│   │   ├── test/
│   │   │   ├── QuestionCard.tsx           # Single MCQ with options
│   │   │   ├── TestTimer.tsx              # Countdown timer
│   │   │   ├── QuestionPalette.tsx        # Grid nav (answered/skipped)
│   │   │   └── ResultSummary.tsx
│   │   │
│   │   └── common/
│   │       ├── Header.tsx
│   │       ├── EmptyState.tsx
│   │       └── ErrorBoundary.tsx
│   │
│   ├── context/
│   │   ├── AuthContext.tsx                # User state, login/logout
│   │   ├── SocketContext.tsx              # Socket.io connection + events
│   │   └── ThemeContext.tsx               # Dark/light mode
│   │
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useSocket.ts
│   │   ├── useLiveSession.ts
│   │   ├── useTestEngine.ts
│   │   └── useScreenProtection.ts        # expo-screen-capture hook
│   │
│   ├── utils/
│   │   ├── api.ts                         # Axios instance + interceptors
│   │   ├── tokenStorage.ts               # SecureStore for JWT
│   │   ├── watermark.ts                  # Generate watermark string
│   │   └── testHelpers.ts                # Score calc, time format
│   │
│   ├── constants/
│   │   ├── colors.ts
│   │   ├── routes.ts
│   │   └── config.ts                      # API base URL, Agora App ID
│   │
│   ├── app.json
│   ├── tailwind.config.js
│   ├── babel.config.js
│   ├── tsconfig.json
│   └── package.json
│
│
└── 📁 lms-dashboard/                      # React + Vite Admin Dashboard
    ├── src/
    │   ├── pages/
    │   │   ├── Dashboard.tsx              # Stats overview (users, revenue, live)
    │   │   │
    │   │   ├── courses/
    │   │   │   ├── CourseList.tsx         # All courses table
    │   │   │   ├── CourseEditor.tsx       # Create/edit course + sections
    │   │   │   └── LessonUploader.tsx     # Upload video → Cloudinary → HLS
    │   │   │
    │   │   ├── batches/
    │   │   │   ├── BatchList.tsx
    │   │   │   └── BatchEditor.tsx        # Batch + assign courses/teachers
    │   │   │
    │   │   ├── live/
    │   │   │   ├── LiveRoomList.tsx       # Scheduled & past sessions
    │   │   │   └── LiveRoom.tsx           # Teacher broadcast (Agora SDK)
    │   │   │                              # Poll control, Q&A moderation
    │   │   │
    │   │   ├── tests/
    │   │   │   ├── TestList.tsx
    │   │   │   ├── TestEditor.tsx         # Create MCQ test + question bank
    │   │   │   └── TestAnalytics.tsx      # Per-test performance heatmap
    │   │   │
    │   │   ├── users/
    │   │   │   ├── UserList.tsx           # All students + filter/search
    │   │   │   └── UserDetail.tsx         # Enrollment, progress, test history
    │   │   │
    │   │   ├── analytics/
    │   │   │   ├── RevenueReport.tsx      # Payment analytics (chart)
    │   │   │   ├── EngagementReport.tsx   # Watch time, completion rates
    │   │   │   └── LiveReport.tsx         # Peak viewers, poll responses
    │   │   │
    │   │   ├── payments/
    │   │   │   └── OrderList.tsx          # All orders with status
    │   │   │
    │   │   └── settings/
    │   │       ├── GeneralSettings.tsx
    │   │       └── AdminProfile.tsx
    │   │
    │   ├── components/
    │   │   ├── ui/                        # Shadcn UI components
    │   │   │   ├── button.tsx
    │   │   │   ├── card.tsx
    │   │   │   ├── dialog.tsx
    │   │   │   ├── table.tsx
    │   │   │   ├── input.tsx
    │   │   │   ├── select.tsx
    │   │   │   ├── tabs.tsx
    │   │   │   ├── badge.tsx
    │   │   │   ├── toast.tsx
    │   │   │   └── chart.tsx
    │   │   │
    │   │   ├── layout/
    │   │   │   ├── Sidebar.tsx
    │   │   │   ├── TopBar.tsx
    │   │   │   └── AppLayout.tsx
    │   │   │
    │   │   ├── live/
    │   │   │   ├── AgoraBroadcaster.tsx
    │   │   │   ├── PollControl.tsx
    │   │   │   ├── QnAModeration.tsx
    │   │   │   └── LiveChatMonitor.tsx
    │   │   │
    │   │   ├── course/
    │   │   │   ├── SectionBuilder.tsx
    │   │   │   ├── LessonForm.tsx
    │   │   │   └── VideoUploadProgress.tsx
    │   │   │
    │   │   └── common/
    │   │       ├── DataTable.tsx
    │   │       ├── StatCard.tsx
    │   │       ├── ConfirmDialog.tsx
    │   │       └── PageLoader.tsx
    │   │
    │   ├── context/
    │   │   ├── AuthContext.tsx
    │   │   └── SocketContext.tsx
    │   │
    │   ├── hooks/
    │   │   ├── useAuth.ts
    │   │   ├── useSocket.ts
    │   │   ├── useLiveBroadcast.ts
    │   │   └── usePollControl.ts
    │   │
    │   ├── lib/
    │   │   ├── api.js
    │   │   ├── utils.ts
    │   │   └── agora.ts
    │   │
    │   ├── App.tsx
    │   └── main.tsx
    │
    ├── index.html
    ├── vite.config.ts
    ├── tailwind.config.js
    ├── components.json
    ├── tsconfig.json
    └── package.json
```

---

## 3. Key Data Flow Patterns

### 🔐 Auth Flow
```
App/Dashboard → POST /auth/login → JWT (access 15m + refresh 7d)
→ SecureStore (mobile) / httpOnly cookie (dashboard)
→ Redis session cache for instant invalidation
```

### 🎬 Video Flow
```
Dashboard uploads video → Multer → Cloudinary (raw)
→ FFmpeg HLS transcode (360p/480p/720p) → .m3u8 manifest
→ Stored URL in Lesson model → App streams via expo-video
```

### 📡 Live Class Flow
```
Teacher (Dashboard) → Agora SDK publish → Agora Cloud
Student (App) → Agora SDK subscribe ← Agora Cloud
Both ↔ Socket.io server (chat, polls, Q&A, viewer count)
```

### 📝 Test Flow
```
Student starts test → testAttempt created (in-progress)
→ MCQ answers saved per question → Submit → auto-score
→ TestAttempt marked complete → Analytics updated
```

### 💳 Payment Flow
```
Student selects course → POST /payment/create-order
→ Razorpay/Stripe checkout → Webhook verifies → Enrollment created
```

---

## 4. Environment Variables

### server/.env
```env
PORT=8000
MONGO_URI=
JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
UPSTASH_REDIS_URL=
AGORA_APP_ID=
AGORA_APP_CERTIFICATE=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
SMTP_HOST=
SMTP_USER=
SMTP_PASS=
```

### app/.env
```env
EXPO_PUBLIC_API_URL=http://localhost:8000/api
EXPO_PUBLIC_AGORA_APP_ID=
EXPO_PUBLIC_SOCKET_URL=http://localhost:8000
```

### lms-dashboard/.env
```env
VITE_API_URL=http://localhost:8000/api
VITE_AGORA_APP_ID=
VITE_SOCKET_URL=http://localhost:8000
```

---

## 5. Missing Critical Features (75% → 100%)

### 5.1 🔴 API Gateway & Versioning
Without this, any breaking API change breaks all app versions in production.
```
server/src/
├── routes/v1/          # Current routes moved here
├── routes/v2/          # Future breaking changes
└── app.ts              # Mount as /api/v1/...
```

### 5.2 🔴 Background Job Queue (BullMQ)
Prevents blocking the main thread for heavy tasks like video transcoding.
```
server/src/jobs/
├── queue.ts                      # BullMQ setup (Redis-backed)
├── processors/
│   ├── videoTranscode.job.ts     # HLS processing after upload
│   ├── emailSend.job.ts          # Async email sending
│   ├── notificationSend.job.ts   # Batch push notifications
│   └── reportGenerate.job.ts     # PDF report generation
└── workers/
    └── worker.ts                 # Separate worker process
```
**Package:** `bullmq`

### 5.3 🔴 WebSocket Scalability (Redis Adapter)
Current Socket.io breaks with 2+ server instances.
```
server/src/config/
└── socketAdapter.ts    # socket.io-redis adapter
                        # All servers share same socket state
```
**Package:** `@socket.io/redis-adapter`

### 5.4 🔴 Logging & Monitoring
```
server/src/
├── config/logger.ts          # Winston + daily rotate file
├── middlewares/
│   ├── logger.middleware.ts  # Request/response logging
│   └── morgan.middleware.ts  # HTTP access logs
└── utils/
    └── sentry.ts             # Error tracking (Sentry SDK)
```

### 5.5 🔴 Security Middlewares
```typescript
// server/src/middlewares/security.middleware.ts
import helmet from "helmet"                           // HTTP headers
import mongoSanitize from "express-mongo-sanitize"   // NoSQL injection
import xss from "xss-clean"                          // XSS prevention
import hpp from "hpp"                                // HTTP param pollution
import cors from "cors"                              // Strict CORS config
```

### 5.6 🔴 OTP Phone Authentication
PW uses OTP on phone — currently email-only.
```
server/src/
├── models/otp.model.ts               # OTP with expiry (5 min TTL)
├── controllers/otp.controller.ts     # Send/verify OTP
└── utils/
    ├── smsProvider.ts                # Twilio or MSG91
    └── otpGenerator.ts               # 6-digit OTP + Redis TTL

app/app/(auth)/
└── verify-otp.tsx                    # OTP input screen (6 boxes)
```

### 5.7 🔴 Device Management
Prevent account sharing (1 account = max 2 devices, like PW).
```
server/src/
├── models/device.model.ts              # deviceId, platform, lastLogin
├── middlewares/device.middleware.ts    # Check device limit on login
└── controllers/device.controller.ts   # List/revoke devices

app/utils/
└── deviceId.ts                         # expo-device + SecureStore fingerprint

lms-dashboard/src/pages/users/
└── UserDevices.tsx                     # Admin can see/revoke devices
```

### 5.8 🔴 Doubt Resolution System
PW's most-used feature after video lessons.
```
server/src/
├── models/doubt.model.ts               # Doubt with subject/topic tags
├── models/doubtReply.model.ts          # Threaded replies
└── controllers/doubt.controller.ts

app/app/(tabs)/doubts.tsx               # Browse & post doubts
app/components/doubt/DoubtCard.tsx
lms-dashboard/src/pages/doubts/DoubtModeration.tsx
```

### 5.9 🔴 Notes/DPP (Daily Practice Problems) PDF System
Every PW lecture has attached PDFs.
```
server/src/
├── models/resource.model.ts            # PDF/notes attached to lesson
└── controllers/resource.controller.ts

app/components/lesson/ResourceList.tsx  # Download notes per lesson
app/utils/pdfViewer.ts                  # expo-file-system + WebView
```

### 5.10 🔴 Offline Download System
Students download videos for offline viewing — core PW feature.
```
app/hooks/useDownloadManager.ts         # expo-file-system download queue
app/context/DownloadContext.tsx         # Track download progress/status
app/app/(tabs)/downloads.tsx            # Downloaded lessons screen
```

### 5.11 🟡 Push Notifications
```
server/utils/pushNotification.ts        # Expo Push API or FCM
app/hooks/useNotifications.ts           # expo-notifications registration
```

### 5.12 🟡 Content Scheduling
Lessons/tests go live at a specific date (like PW batches).
```
server/src/
├── models/lesson.model.ts              # Add: scheduledAt, isPublished fields
└── utils/scheduler.ts                  # node-cron for auto-publish

lms-dashboard/pages/courses/ContentScheduler.tsx
```

### 5.13 🟡 Referral & Coupon System
```
server/src/
├── models/coupon.model.ts
├── models/referral.model.ts
└── controllers/coupon.controller.ts

lms-dashboard/pages/payments/CouponManager.tsx
```

### 5.14 🟡 Subscription / Plan System
PW has monthly/yearly plans, not just per-course purchases.
```
server/src/
├── models/plan.model.ts                # Free/Basic/Pro/Elite tiers
├── models/subscription.model.ts       # User ↔ Plan + expiry date
├── controllers/subscription.controller.ts
└── middlewares/subscription.middleware.ts  # Check plan for content access

lms-dashboard/src/pages/
├── plans/PlanEditor.tsx
└── subscriptions/SubscriptionList.tsx
```

### 5.15 🟡 Content Access Control Matrix
```
server/src/utils/accessControl.ts

// Access rules:
// Free tier    → Preview lessons only (first 2 of each section)
// Basic plan   → All videos, no live, no tests
// Pro plan     → Videos + Live + Tests
// Per-course   → Only that course content
// Batch        → All courses in batch
```

### 5.16 🟢 Nice-to-Have Features

| Feature | Files to Add |
|---|---|
| Leaderboard | `testLeaderboard.model.ts` + `leaderboard.tsx` screen |
| Student Progress Report | `progress.controller.ts` + PDF report export |
| Multi-language support | `i18n/` folder + `expo-localization` |
| Admin Role Levels | `superadmin`, `teacher`, `moderator` role middleware |
| App Version Gate | Force-update screen if app version is outdated |
| Bookmark/Favorites | `bookmark.model.ts` + bookmark icon on lessons |
| Study Planner | Daily study goals + streak tracking |
| In-app Purchases (IAP) | `expo-in-app-purchases` as alternative to web payment |

---

## 6. Missing Important Features

### 6.1 Teacher Management Portal
```
lms-dashboard/src/pages/teachers/
├── TeacherList.tsx             # All teachers + their courses
├── TeacherProfile.tsx          # Assign courses, set commission
└── TeacherPayouts.tsx          # Revenue share calculations
```

### 6.2 Bulk Operations
```
lms-dashboard/src/components/
├── BulkEnrollModal.tsx             # Upload CSV → enroll 1000 students
├── BulkNotificationSender.tsx      # Send push to filtered segments
└── BulkCouponGenerator.tsx         # Generate N coupons at once
```

### 6.3 Live Session Recordings
```
server/src/
├── models/recording.model.ts               # Agora cloud recording metadata
├── controllers/recording.controller.ts
└── utils/agoraRecording.ts                 # Agora Cloud Recording REST API

lms-dashboard/src/pages/live/
└── RecordingManager.tsx                    # Start/stop/download recordings
```

### 6.4 Affiliate / Educator Commission System
```
server/src/
├── models/affiliate.model.ts       # Affiliate with commission %
├── models/commission.model.ts      # Per-sale commission ledger
└── controllers/affiliate.controller.ts

lms-dashboard/src/pages/
└── affiliates/AffiliateManager.tsx
```

### 6.5 Study Streak & Gamification
Huge retention driver — PW has this.
```
server/src/
├── models/streak.model.ts          # currentStreak, longestStreak, lastStudyDate
├── models/badge.model.ts           # Achievement badges
└── controllers/gamification.controller.ts

app/components/
├── home/StreakWidget.tsx            # 🔥 7-day streak display
├── profile/BadgeCollection.tsx
└── home/DailyGoalCard.tsx          # Minutes studied today
```

### 6.6 Student Dashboard / Analytics
```
app/components/progress/
├── WeeklyActivityChart.tsx         # Bar chart - days studied
├── SubjectWiseScore.tsx            # Radar chart - per subject
├── TestHistoryList.tsx             # Past attempts + rank
└── CourseCompletionRing.tsx        # Circular progress per course
```

### 6.7 In-App Chat Support
```
server/src/
├── models/supportTicket.model.ts
└── controllers/support.controller.ts

app/app/support.tsx                 # Raise ticket + chat with support

lms-dashboard/src/pages/
└── support/TicketManager.tsx       # Resolve tickets, reply
```

### 6.8 Parent Dashboard
```
server/src/models/
└── parentLink.model.ts             # Parent ↔ Student relationship

app/app/(auth)/
└── parent-login.tsx

lms-dashboard/src/pages/
└── parents/ParentReport.tsx
    # Daily study time
    # Test scores & trends
    # Live class attendance
    # Weak subjects alert
    # Weekly email report
```

---

## 7. Missing DevOps & Infrastructure

```
/lms
├── 📁 docker/
│   ├── Dockerfile.server
│   ├── Dockerfile.dashboard
│   └── docker-compose.yml          # MongoDB + Redis + Server
│
├── 📁 .github/workflows/
│   ├── test.yml                    # Run tests on PR
│   ├── server-deploy.yml           # Deploy to Railway/Render
│   └── dashboard-deploy.yml        # Deploy to Vercel
│
├── 📁 nginx/
│   └── nginx.conf                  # Reverse proxy + SSL termination
│
├── 📁 scripts/
│   ├── seed.ts                     # Sample data seeder
│   ├── migrate.ts                  # DB migration runner
│   └── healthcheck.ts              # Uptime monitor script
│
└── 📁 tests/
    ├── server/
    │   ├── auth.test.ts
    │   ├── payment.test.ts
    │   └── enrollment.test.ts      # Jest + Supertest
    └── app/
        └── testEngine.test.ts      # Jest unit tests
```

---

## 8. 200% Roadmap — Beat PW Completely

### 8.1 AI-Powered Features (The Biggest Differentiator)

#### AI Doubt Solver (24/7 Instant Answers)
PW has human tutors with delays. You have instant AI.
```
server/src/
├── controllers/ai.controller.ts
└── utils/
    ├── openai.ts               # GPT-4o for text doubts
    ├── visionDoubt.ts          # GPT-4 Vision - solve from photo
    └── mathSolver.ts           # Wolfram Alpha API for equations

app/app/ai-tutor.tsx
    # Type doubt → instant answer
    # Click photo of question → AI solves it
    # Voice doubt → STT → AI → TTS response
    # Step-by-step solution with diagrams
```

#### AI-Generated Personalized Tests
```
server/src/utils/aiTestGenerator.ts
    # Input:  student weak topics (from analytics)
    # Output: custom 20-question test targeting weaknesses
    # Uses:   OpenAI + your question bank

server/src/controllers/adaptiveLearning.controller.ts
    # After each test → recalculate weak topics
    # Auto-suggest next lesson/test
```

#### AI Video Summaries & Smart Notes
```
server/src/utils/aiVideoProcessor.ts
    # After HLS upload:
    # → Transcribe with Whisper API
    # → Generate chapter timestamps
    # → Create bullet-point summary
    # → Extract key formulas/concepts
    # → Auto-generate quiz from video content

server/src/models/videoMetadata.model.ts   # Store transcript, summary, chapters
```

#### AI Study Planner
```
server/src/utils/studyPlanner.ts
    # Input:  exam date + syllabus + hours/day available
    # Output: day-by-day study schedule
    # Adapts: if student falls behind → reschedules automatically

app/app/(tabs)/planner.tsx                  # Calendar view of AI study plan
```

---

### 8.2 Superior Mobile Experience

#### Gesture-Based Video Controls
```
app/components/video/GestureVideoPlayer.tsx
    # Swipe right   → +10s
    # Swipe left    → -10s
    # Swipe up right → brightness
    # Swipe up left  → volume
    # Double tap    → fullscreen
    # Pinch         → zoom

app/components/video/SpeedController.tsx    # 0.5x to 3x speed
```

#### Picture-in-Picture (PiP) Mode
```
app/hooks/usePiP.ts
    # Watch video while taking notes
    # expo-pip or native module
```

#### Offline-First Architecture
```
app/db/localDB.ts                           # WatermelonDB for offline data
    # Sync courses, progress, doubts when online
    # Works 100% offline once downloaded

app/hooks/useOfflineSync.ts                 # Background sync when reconnected
```

#### Smart Search with Filters
```
app/app/(tabs)/explore.tsx
    # Search across: courses, lessons, doubts, teachers
    # Filters: subject, difficulty, duration, rating, price
    # Recent searches history
    # Trending searches
    # Voice search
```

---

### 8.3 Superior Learning Features

#### Spaced Repetition Flashcard System
```
server/src/
├── models/flashcard.model.ts       # Front/back + SRS interval data
└── utils/srs.ts                    # SM-2 spaced repetition algorithm

app/app/flashcards/
├── index.tsx                       # Deck list
└── study.tsx                       # Swipe card interface
    # Auto-generated from video AI summaries
    # Student can create own cards
    # SM-2 algorithm schedules review
```

#### Collaborative Study Rooms
```
server/src/
├── models/studyRoom.model.ts       # Room with members + session
└── socketServer.ts                 # Add study room events
    # Shared whiteboard (Socket + Canvas)
    # Group video call (Agora)
    # Shared timer (Pomodoro)
    # Collaborative notes

app/app/study-room/
├── index.tsx                       # Room browser
└── [roomId].tsx                    # Active room
    ├── SharedWhiteboard.tsx
    └── PomodoroTimer.tsx
```

#### Interactive Video (Pause & Answer)
```
server/src/models/videoCheckpoint.model.ts  # MCQ embedded at timestamp

app/components/video/CheckpointOverlay.tsx
    # Video auto-pauses at checkpoint
    # Student answers MCQ
    # Wrong → replay that segment
    # Right → continue
    # Completion locked until all checkpoints answered
```

#### Mind Map Generator
```
server/src/utils/mindMapGenerator.ts        # OpenAI → structured JSON tree
app/components/MindMap.tsx                  # Interactive mind map (react-native-svg)
```

---

### 8.4 Superior Monetization

#### Dynamic Pricing Engine
```
server/src/utils/dynamicPricing.ts
    # Early bird discount (countdown timer)
    # Location-based pricing (India vs international)
    # Demand-based pricing (more buyers = price rises)
    # Abandoned cart discount (email after 24hrs)
    # Group buying (5 friends = 40% off each)
```

#### Creator Marketplace
```
server/src/
├── models/creatorApplication.model.ts
└── controllers/creator.controller.ts

lms-dashboard/src/pages/marketplace/
├── CreatorApplications.tsx         # Approve/reject creators
└── CreatorEarnings.tsx             # Revenue share tracker

# Any verified teacher can upload a course
# Platform takes 20% commission
# Teacher gets dashboard with their earnings
# Students rate/review teacher content
# Top creators get "Verified" badge
```

#### Live Commerce (Sell During Live Class)
```
server/src/models/liveProduct.model.ts      # Product pinned during live

app/components/live/LiveProductBanner.tsx
    # Teacher pins a course during live
    # "Limited offer: Next 30 min only"
    # One-tap purchase without leaving live
    # Countdown timer pressure
```

---

### 8.5 Superior Analytics

#### Engagement Heatmap on Videos
```
server/src/
├── models/videoEngagement.model.ts         # Per-second watch events
└── controllers/heatmap.controller.ts

lms-dashboard/src/components/VideoHeatmap.tsx
    # Red zones   = rewatched (hard concepts)
    # Grey zones  = skipped (boring/easy)
    # Teacher sees exactly where students struggle
```

#### Predictive Analytics
```
server/src/utils/predictiveAnalytics.ts
    # Predict: student likely to drop off (churn risk)
    # Predict: student ready for next level
    # Predict: student will fail exam (intervention alert)
    # Auto-trigger: discount offer to churning student
```

---

### 8.6 Community & Retention

#### Forum / Community (like Reddit for students)
```
server/src/
├── models/post.model.ts            # Post with subject tags
├── models/comment.model.ts         # Threaded comments
├── models/vote.model.ts            # Upvote/downvote
└── controllers/community.controller.ts

app/app/(tabs)/community.tsx
    # Feed (trending posts)
    # Ask Question
    # Subject filters
    # Top contributors leaderboard
```

#### Competition & Mock Exams
```
server/src/
├── models/mockExam.model.ts        # Full JEE/NEET pattern exam
├── models/competition.model.ts     # Time-limited contest
└── utils/rankCalculator.ts         # Percentile + All-India rank

app/app/compete/
├── index.tsx                       # Upcoming competitions
├── live-exam.tsx                   # Proctored exam mode
│   # Lock screen during exam
│   # Random question order
│   # Copy-paste disabled
└── results/[examId].tsx            # Rank card (shareable)
```

#### Shareable Rank Card (Viral Growth Loop)
```
app/components/RankCard.tsx
    # "I scored 98 percentile in JEE Mock #12"
    # Beautiful card with student name, score, rank
    # One tap → share to WhatsApp/Instagram
```

---

### 8.7 Technical Excellence

#### GraphQL API Layer
```
server/src/graphql/
├── schema/
│   ├── user.schema.ts
│   ├── course.schema.ts
│   └── analytics.schema.ts
├── resolvers/
│   ├── user.resolver.ts
│   └── course.resolver.ts
└── index.ts                        # Apollo Server setup
    # Dashboard uses GraphQL (complex queries)
    # Mobile keeps REST (simpler, lighter)
```

#### CDN & Edge Optimization
```
# Cloudflare CDN for all static assets
# Video streaming via Cloudflare Stream (cheaper than Cloudinary at scale)
# Edge caching for course catalog (99% read, 1% write)
# Image optimization: WebP auto-conversion
# Lazy loading all images in app
```

#### Microservices Split (At Scale)
```
/lms/services/
├── auth-service/               # Only handles auth (port 8001)
├── video-service/              # Only handles HLS (port 8002)
├── payment-service/            # Only handles payments (port 8003)
├── notification-service/       # Only handles push/email (port 8004)
└── analytics-service/          # Only handles events (port 8005)

/lms/api-gateway/               # Kong or custom Express gateway
```

---

### 8.8 Growth Engine

#### Referral Viral Loop
```
# Student shares link → friend joins → both get 7 days free
# Refer 5 friends → 1 month free
# Leaderboard of top referrers (prizes)
# WhatsApp-first sharing (India market)
```

#### WhatsApp Bot Integration
```
server/src/utils/whatsappBot.ts     # Twilio WhatsApp API
    # Student sends "DOUBT: what is photoelectric effect"
    # Bot replies with AI answer
    # Daily revision question pushed at 8am
    # Test reminder 1hr before
    # Results announced via WhatsApp
```

#### Progressive Web App (PWA)
```
lms-dashboard/ → also deployable as student PWA
    # Students on low-end phones use browser instead of app
    # Same codebase, responsive design
    # Offline support via Service Workers
    # Install prompt on Android
```

---

## 9. Complete Package List

### Server
```bash
# Core
express typescript mongoose socket.io
jsonwebtoken bcryptjs cloudinary
agora-access-token ioredis razorpay stripe
nodemailer ejs multer fluent-ffmpeg

# Security (Missing — Add These)
helmet express-mongo-sanitize xss-clean hpp cors

# Jobs & Queue (Missing — Add These)
bullmq node-cron

# Communication (Missing — Add These)
twilio                          # SMS OTP

# Logging & Monitoring (Missing — Add These)
winston morgan @sentry/node

# Utils
sharp                           # Image optimization
```

### App (Expo React Native)
```bash
# Core (Already Have)
expo expo-router expo-video nativewind
socket.io-client react-native-agora
axios expo-secure-store

# Missing — Add These
expo-file-system                # Offline downloads
expo-notifications              # Push notifications
expo-document-picker            # Upload profile photo
react-native-pdf                # DPP/notes PDF viewer
@shopify/flash-list             # Performant lists
expo-device                     # Device fingerprinting
watermelondb                    # Offline-first database
```

### Admin Dashboard
```bash
# Core (Already Have)
react vite tailwindcss shadcn-ui
lucide-react axios agora-rtc-sdk-ng
recharts react-router-dom socket.io-client

# Missing — Add These
@tanstack/react-query            # Better caching than raw Axios
react-hook-form                  # Form management
zod                              # Schema validation
date-fns                         # Schedule/date formatting
```

---

## 10. Priority Roadmap Table

| Priority | Feature | Effort | Impact |
|---|---|---|---|
| 🔴 P0 | Security middlewares (helmet, xss, hpp) | 1 day | Critical |
| 🔴 P0 | Redis Socket.io adapter | 2 hrs | Critical at scale |
| 🔴 P0 | BullMQ job queue | 2 days | Prevents crashes |
| 🔴 P0 | OTP phone authentication | 1 day | PW standard |
| 🔴 P0 | Device limit enforcement | 1 day | Anti-piracy |
| 🔴 P0 | Doubt resolution system | 2 days | #1 used feature |
| 🔴 P0 | PDF/DPP resources | 1 day | Every teacher needs day 1 |
| 🟡 P1 | Offline downloads | 3 days | Retention |
| 🟡 P1 | Push notifications | 1 day | Retention |
| 🟡 P1 | Subscription/plan system | 3 days | Revenue model |
| 🟡 P1 | Content access control matrix | 2 days | Revenue model |
| 🟡 P1 | Study streak + gamification | 1 day | Retention |
| 🟡 P1 | Live session recordings | 2 days | Content reuse |
| 🟡 P1 | AI Doubt Solver (photo) | 3 days | Biggest differentiator |
| 🟡 P1 | Parent dashboard | 2 days | Sales driver |
| 🟢 P2 | Affiliate/referral system | 2 days | Growth |
| 🟢 P2 | Gamification/badges | 2 days | Engagement |
| 🟢 P2 | Docker + CI/CD | 2 days | Deployment |
| 🟢 P2 | Full test suite | 3 days | Stability |
| 🟢 P2 | Community forum | 3 days | Network effects |
| 🟢 P2 | Mock exam + rank card | 3 days | Viral growth |
| 🟢 P2 | WhatsApp bot | 2 days | Viral growth |
| 🔵 P3 | AI video summaries | 3 days | Differentiation |
| 🔵 P3 | Spaced repetition flashcards | 3 days | Learning outcomes |
| 🔵 P3 | Collaborative study rooms | 4 days | Engagement |
| 🔵 P3 | Interactive video checkpoints | 3 days | Completion rate |
| 🔵 P3 | Dynamic pricing engine | 2 days | Revenue optimization |
| 🔵 P3 | Creator marketplace | 4 days | Content scale |
| 🔵 P3 | Predictive analytics | 4 days | Data moat |
| 🔵 P3 | Video engagement heatmap | 2 days | Teacher insights |
| 🔵 P3 | GraphQL API layer | 4 days | Developer scale |
| 🔵 P3 | Microservices split | 1 week | Infrastructure scale |

---

## 11. Final Summary

```
Your original setup       →  75%  (solid PW clone foundation)

+ P0 fixes (security, queue, OTP, doubts, DPP)
                          →  85%  (production-safe)

+ P1 additions (subscriptions, offline, AI doubt solver, streaks)
                          →  110% (beats PW's core weaknesses)

+ P2 additions (community, mock exams, referrals, CI/CD)
                          →  140% (network effects kick in)

+ P3 additions (AI features, marketplace, predictive analytics)
                          →  175% (data moat builds)

+ Growth engine (viral loops, WhatsApp bot, PWA, live commerce)
                          →  200% (self-sustaining platform)
```

### The Single Biggest Lever
> The **AI Doubt Solver with photo capture** is the #1 feature to build first.
> PW's biggest student complaint is slow doubt resolution.
> Solving that instantly puts you ahead of every Indian edtech platform.

### Recommended Build Order
1. **Week 1–2:** P0 security + infrastructure fixes
2. **Week 3–4:** Doubt system + PDF resources + offline downloads
3. **Week 5–6:** Subscription system + access control
4. **Week 7–8:** AI doubt solver + push notifications
5. **Week 9–10:** Community forum + mock exams + streak system
6. **Month 3+:** AI features + marketplace + microservices

---

*Generated for LMS/PW Clone Full-Stack Project*  
*Stack: Node.js + TypeScript · Expo React Native · React Vite · MongoDB · Socket.io · Agora SDK*


Looking at everything we've covered, here are the remaining gaps:

---

## 📱 App Store & Launch Readiness (Never Mentioned)

```
/lms
├── app/
│   ├── assets/
│   │   ├── icon.png                    # 1024x1024 app icon
│   │   ├── splash.png                  # Splash screen
│   │   ├── adaptive-icon.png           # Android adaptive icon
│   │   └── favicon.png                 # PWA favicon
│   │
│   └── app.json
│       # Bundle ID: com.yourapp.student
│       # Version management: 1.0.0 → build numbers
│       # EAS Build config for iOS + Android
│       # Deep linking scheme: yourapp://
│       # Permissions declarations
│       #   - Camera (doubt photo)
│       #   - Microphone (live class)
│       #   - Notifications
│       #   - Storage (downloads)

eas.json                                # EAS Build profiles
├── development                         # Local dev build
├── preview                             # Internal testing (TestFlight/Internal Track)
└── production                          # App Store / Play Store
```

---

## 🔒 Legal & Compliance (Completely Missing)

```
server/src/
├── controllers/legal.controller.ts
└── models/
    ├── consentLog.model.ts             # GDPR/DPDP consent tracking
    └── dataRequest.model.ts            # Right to erasure requests

app/app/
├── terms.tsx                           # Terms of Service screen
├── privacy.tsx                         # Privacy Policy screen
└── (auth)/register.tsx                 # Add consent checkbox

# Required for:
# → Google Play Store approval
# → Apple App Store approval
# → India DPDP Act 2023 compliance
# → Razorpay/Stripe merchant compliance
```

---

## 🌐 Internationalization (i18n)

```
app/
├── locales/
│   ├── en.json                         # English
│   ├── hi.json                         # Hindi (huge PW market)
│   ├── te.json                         # Telugu
│   ├── ta.json                         # Tamil
│   └── bn.json                         # Bengali
│
└── hooks/useTranslation.ts             # expo-localization hook

server/src/
└── middlewares/i18n.middleware.ts      # Accept-Language header handling
```

---

## 📊 Business Intelligence Dashboard (Missing Entirely)

```
lms-dashboard/src/pages/bi/
├── CohortAnalysis.tsx
│   # Week 1 retention: 80%
│   # Week 4 retention: 45%
│   # Which batch has best retention?

├── FunnelAnalysis.tsx
│   # Visited course → Added to cart → Purchased
│   # Where exactly do students drop off?

├── RevenueForecasting.tsx
│   # Monthly Recurring Revenue (MRR)
│   # Annual Recurring Revenue (ARR)
│   # Churn rate + expansion revenue

└── GeographicHeatmap.tsx
│   # Which cities/states have most students?
│   # Where to run ads next?
```

---

## 🛡️ Content Piracy Protection (Advanced)

```
server/src/utils/
├── drmToken.ts                         # Signed URL expiry (15 min only)
├── ipRestriction.ts                    # Flag suspicious IPs
└── watermarkEmbed.ts                   # Server-side invisible watermark in video

app/components/video/
└── AntiRecordingOverlay.tsx
    # Black overlay when app goes to background
    # Disable AirPlay/Chromecast for protected content
    # Detect and block screen recording APIs
```

---

## 📧 Marketing Automation (Missing)

```
server/src/utils/
├── emailSequences.ts                   # Drip campaign engine
└── segmentation.ts                     # Tag users by behavior

# Email sequences:
# → Day 0:  Welcome + first lesson nudge
# → Day 3:  "You haven't started yet" reminder
# → Day 7:  Progress report
# → Day 14: Upsell to Pro plan
# → Day 30: Renewal reminder
# → Abandoned cart: 3-email sequence

# Integrations:
# Mailchimp / Brevo / Klaviyo for bulk sends
```

---

## 🧪 A/B Testing Framework

```
server/src/
├── models/experiment.model.ts          # Experiment definition
└── utils/abTesting.ts                  # Bucket users into variants

# Test examples:
# → Pricing page: ₹999/mo vs ₹799/mo conversion
# → Onboarding: 3-step vs 5-step completion rate
# → CTA button: "Start Learning" vs "Join Now"
# → Trial: 7 days vs 14 days conversion to paid

app/hooks/useExperiment.ts              # Get user's variant
lms-dashboard/pages/experiments/
└── ExperimentManager.tsx               # Create/analyze experiments
```

---

## 📱 Deep Linking & SEO

```
app/
└── app.json
    # Deep links:
    # yourapp://course/123        → Opens course detail
    # yourapp://live/456          → Opens live class
    # yourapp://test/789          → Opens test
    # yourapp://invite/REF123     → Referral link

server/src/
└── utils/ogMetadata.ts                 # Open Graph tags for course sharing
    # When student shares course link:
    # → WhatsApp shows course thumbnail + title + price
    # → Much higher click-through rate

lms-dashboard/src/pages/
└── seo/SitemapGenerator.tsx            # Auto-generate sitemap for course pages
```

---

## 🔄 Data Backup & Recovery

```
scripts/
├── backup/
│   ├── mongoBackup.ts                  # Daily MongoDB dump to S3
│   ├── redisBackup.ts                  # Redis snapshot backup
│   └── cloudinaryAudit.ts             # Verify all videos accessible
│
└── recovery/
    ├── restoreDB.ts                    # Point-in-time recovery
    └── verifyIntegrity.ts             # Check enrollment ↔ payment consistency
```

---

## 📋 Complete What's Still Missing Table

| Category | Feature | Priority | Why Matters |
|---|---|---|---|
| Launch | EAS Build + App Store config | 🔴 P0 | Can't ship without it |
| Launch | iOS/Android permissions setup | 🔴 P0 | App Store rejection risk |
| Legal | Privacy Policy + ToS screens | 🔴 P0 | Play Store / App Store required |
| Legal | DPDP Act consent logging | 🔴 P0 | India legal compliance |
| Legal | GDPR data deletion flow | 🔡 P1 | International students |
| i18n | Hindi + regional languages | 🟡 P1 | Core PW market |
| Marketing | Email drip campaigns | 🟡 P1 | Activation + retention |
| Marketing | Abandoned cart recovery | 🟡 P1 | Revenue recovery |
| Analytics | Cohort & funnel analysis | 🟡 P1 | Business decisions |
| Analytics | Revenue forecasting (MRR/ARR) | 🟡 P1 | Investor-ready metrics |
| Security | Signed video URL expiry | 🟡 P1 | Advanced piracy protection |
| Growth | A/B testing framework | 🟢 P2 | Optimize conversions |
| Growth | OG metadata for sharing | 🟢 P2 | Viral sharing quality |
| Growth | Deep linking scheme | 🟢 P2 | Campaign attribution |
| Ops | MongoDB automated backups | 🟢 P2 | Data safety |
| SEO | Course page sitemap | 🟢 P2 | Organic discovery |

---

## 🏁 Now You're Truly 100% Complete

```
Original structure          →  75%
+ All previous additions    →  95%
+ App Store readiness       →  97%
+ Legal & compliance        →  98%
+ i18n + marketing + BI     → 100% production ready

Then the 200% features      → Platform that beats PW
```

**The 3 things that will actually get you rejected from App Store if missing:**
1. Privacy Policy screen linked in app
2. Camera/microphone permission descriptions in `app.json`
3. Data deletion mechanism (Apple requires this since 2023)
