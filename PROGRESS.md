# 🎓 Physics Wallah Clone - Project Progress & Roadmap

This file tracks the current state of the LMS ecosystem and guides future development sessions.

## 🚀 Current Status (Production-Ready Redesign)

The project has been restructured according to the `DOCUMENTATION.md` architecture and P0 critical features have been implemented.

### 🖥️ Backend (`/server`) - **Restructured & Secured**
- **Architecture**: 
    - Moved to **API v1** routing structure (`/api/v1/...`).
    - Controllers split for better separation: `auth.controller.ts` (Auth logic) and `user.controller.ts` (Profile/Admin).
    - Middlewares renamed to `*.middleware.ts`.
- **Infrastructure (P0)**:
    - **BullMQ**: Integrated for background jobs (emails, notifications).
    - **Socket.io Redis Adapter**: Multi-server WebSocket synchronization.
- **Security (P0)**: 
    - Added **Helmet**, **HPP**, **XSS-Clean**, and **Express-Mongo-Sanitize**.
    - **Device Management**: Enforced 2-device limit per account (anti-piracy).
- **Authentication**:
    - **OTP Phone Auth**: Added phone-based OTP login (PW standard) alongside email.
- **Features Verified**:
    - **Doubt System**: Subject/topic tags and threaded replies.
    - **Resource System**: PDF/DPP attachments per lesson with secure Cloudinary storage.
    - **Test Engine**: MCQ system with timer, scoring, and detailed result analytics.
    - **Payments**: Razorpay and Stripe (International) integrated.
    - **Subscriptions**: Tiered plan system (Free/Basic/Pro) with expiry management.

### 📱 Mobile App (`/app`)
- **Routing**: Reorganized screens according to `DOCUMENTATION.md` (e.g., `(tabs)/` directory structure).
- **Video Player**: HLS support with screen capture protection and dynamic user watermark.
- **Live Interaction**: Real-time Agora RTC, Chat, Polls, and Q&A overlays.

### 🎥 Admin Dashboard (`/lms-dashboard`)
- **Reorganization**: Grouped pages into subdirectories (courses, batches, live, auth, users, etc.) for scalability.
- **Course Editor**: Section-based content management with lesson uploader.
- **Live Control**: Teacher broadcasting via Agora SDK with poll/Q&A moderation.

---

## ✅ Implemented Features Matrix

| Feature | Backend | Mobile App | Dashboard | Status |
|---|---|---|---|---|
| **Auth & Profiles** | ✅ | ✅ | ✅ | Done |
| **Course & Lessons** | ✅ | ✅ | ✅ | Done |
| **HLS Streaming** | ✅ | ✅ | - | Done |
| **Doubt System** | ✅ | ✅ | ✅ | Done |
| **Live Classes** | ✅ | ✅ | ✅ | Done |
| **Test Engine** | ✅ | ✅ | ✅ | Done |
| **Payments** | ✅ | ✅ | - | Done |
| **BullMQ Jobs** | ✅ | - | - | Done |
| **Device Management** | ✅ | - | - | Done |
| **OTP Auth** | ✅ | - | - | Done |
| **Resource System** | ✅ | ✅ | ✅ | Done |
| **Subscriptions** | ✅ | ✅ | ✅ | Done |

---

## 📋 Next Steps (Roadmap)

### Phase 1: Mobile Polish (P1)
1.  **Offline Downloads**: Implement `expo-file-system` manager for offline video viewing.
2.  **Push Notifications**: Integrated Expo Push API for batch alerts.
3.  **Deep Linking**: Configure `yourapp://` scheme for course sharing.

### Phase 2: AI Power-ups (200% Roadmap)
1.  **AI Doubt Solver**: Instant resolution via OCR (Photo capture).
2.  **AI Video Summaries**: Auto-generated notes from transcripts.
3.  **Personalized Tests**: AI-generated MCQ tests based on student weak topics.

---

## ⚠️ Mandates for Future Agents
1.  **API Versioning**: All new routes must be added to `server/src/routes/v1/`.
2.  **BullMQ**: Offload heavy logic (emails, SMS, reports) to `emailQueue`.
3.  **Device Limit**: `isAuthenticated` middleware automatically handles device limit checking.
4.  **Consistency**: Any model change must be reflected across Dashboard and Mobile UI.
