import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Seekers from "./components/pages/Seekers";
import SeekerProfile from "./components/pages/SeekerProfile";
import ChatRequest from "./components/pages/ChatRequest";
import MissedChatRequest from "./components/pages/MissedChatRequest";
import Chat from "./components/pages/Chat";
import ChatDetail from "./components/pages/ChatDetail";
import Login from "./components/pages/Login";
import Listeners from "./components/pages/Listeners";
import ListenerProfile from "./components/pages/ListenerProfile";
import Moderation from "./components/pages/Moderation";
import AppFeedback from "./components/pages/ModerationDetail/AppFeedback";
import UserTypeFeedback from "./components/pages/ModerationDetail/UserTypeFeedback";
import Report from "./components/pages/ModerationDetail/Report";
import Session from "./components/pages/Session";
import SessionDetail from "./components/pages/SessionDetail";
import Therapists from "./components/pages/Therapists";
import TherapistDetail from "./components/pages/TherapistDetail";

function App() {
  return (
    <div className="flex min-h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/seekers" element={<Seekers />} />
          <Route path="/seekerprofile/:id" element={<SeekerProfile />} />
          <Route path="/chatrequest" element={<ChatRequest />} />
          <Route
            path="/missedchatrequests/:id"
            element={<MissedChatRequest />}
          />
          <Route path="/chats" element={<Chat />} />
          <Route path="/chatdetail/:id" element={<ChatDetail />} />
          <Route path="/listeners" element={<Listeners />} />
          <Route path="/listenerprofile/:id" element={<ListenerProfile />} />
          <Route path="/moderation" element={<Moderation />} />
          <Route path="/sessions" element={<Session />} />
          <Route path="sessiondetail/:id" element={<SessionDetail />} />
          <Route
            path="/moderation/:feebackType/:id"
            element={<AppFeedback />}
          />
          <Route
            path="/moderation/feedback/:feebackUserType/:id"
            element={<UserTypeFeedback />}
          />
          <Route
            path="/moderation/reports/:reportUserType/:id"
            element={<Report />}
          />
          <Route path="/therapists" element={<Therapists />} />
          <Route path="/therapistdetail/:id" element={<TherapistDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
