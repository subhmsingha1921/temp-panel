export type SeekerColumnType = {
  key?: string | any;
  name?: string;
  age?: number;
  gender?: string;
};

export type SeekersChatColumnType = {
  photo?: string;
  name?: string;
  age?: number;
  topicName?: string;
  chatId?: string;
  userId?: string;
  otherUserId?: string;
  chatType?: string;
};

export type SeekerSessionColumnType = {
  sessionId?: string;
  therapist?: string;
  reason?: string;
  timestamp?: string;
  key?: string;
  seekerId?: string;
  payment?: any;
  paidTime?: string;
  email?: string;
  reasonForBooking?: string;
  preferredAge: string;
  preferredLanguage?: string;
};

export type SeekerReportColumnType = {
  photo?: string;
  name?: string;
  reason?: string;
  chatId?: string;
  userId?: string;
  otherUserId?: string;
};

export type ChatRequestColumnType = {
  seeker?: string;
  topic?: string;
  onMind?: string;
  requestedTime?: string;
};

export type MissedChatRequestColumnType = {
  seeker?: string;
  topic?: string;
  onMind?: string;
  requestedTime?: string;
  key?: string;
};

export type ChatColumnType = {
  id?: string;
  listener?: string;
  listenerId?: string;
  seeker?: string;
  seekerId?: string;
  started?: string;
  chatId?: string;
  chatType?: string;
  topic?: string;
};

export type MemberListColumnType = {
  photo?: string;
  name?: string;
  age?: number;
  gender?: string;
  key?: string;
  profileType?: string;
};

export type ListenerColumnType = {
  name?: string;
  age?: number;
  gender?: string;
  key?: string;
};

export type ListenersChatColumnType = {
  name?: string;
  age?: number;
  topicName?: string;
  chatId?: string;
  otherUserId?: string;
  userId?: string;
  chatType?: string;
};

export type ListenersReportColumnType = {
  seekerName?: string;
  reason?: string;
  requestReported?: any;
  chatId?: string;
  seekerId?: string;
  listenerId?: string;
};

export type AppFeedbackColumnType = {
  user?: string | any;
  experience?: string;
  timestamp?: string;
  type?: string;
  id?: string;
  userId?: string;
};

export type ListenersReviewColumnType = {
  chatId?: string;
  seekerName?: string;
  experience?: string;
  seekerId?: string;
  listenerId?: string;
};

export type MatchingFeedbackColumnType = {
  user?: string | any;
  reason?: string;
  timestamp?: string;
  type?: string;
  id?: string;
  userId?: string;
};

export type ListenerFeedbackColumnType = {
  id?: string;
  seeker?: string;
  experience?: string;
  timestamp?: string;
  type?: any;
  feedbackId?: string;
  userType?: string;
  userId?: string;
  otherUserId?: string;
};

export type SeekerFeedbackColumnType = {
  id?: string;
  listener?: string | any;
  experience?: string;
  timestamp?: string;
  type?: any;
  feedbackId?: string;
  userType?: string;
  userId?: string;
  otherUserId?: string;
  feeling?: string;
  rating?: string;
};

export type ModerationListenerReportColumn = {
  id?: string;
  seeker?: string;
  report?: string;
  timestamp?: string;
  userType?: any;
  reportId?: string;
  userId?: string;
  otherUserId?: string;
  requestReported?: any;
};

export type ModerationSeekerReportColumnType = {
  id?: string;
  listener?: string;
  report?: string;
  timestamp?: string;
  userType?: any;
  reportId?: string;
  userId?: string;
  otherUserId?: string;
};

export type SessionRequestsColumnType = {
  sessionId?: string;
  therapist?: string;
  reason?: string;
  started?: string;
};

export type SessionUpdatesColumnType = {
  sessionId?: string;
  therapist?: string;
  reason?: string;
  started?: string;
};

export type SessionCreditsColumnType = {
  therapist?: string;
  sessionsBooked?: any;
  creditsPurchased?: number;
  creditsLeft?: number;
};

export type SessionColumnType = {
  id?: string;
  seekerId?: string;
  reasonForBooking?: string;
  started?: string;
  key?: string | any;
  therapist?: string;
  payment?: any;
  paidTime?: string;
  email?: string;
  preferredAge?: string;
  preferredLanguage?: string;
};

export type GlobalArchiveChatColumnType = {
  id?: string;
  listener?: string;
  listenerId?: string;
  seekerId?: string;
  ended?: any;
  chatId?: string;
  chatType?: string;
};

export type TherapistColumnType = {
  photo?: string;
  key?: string;
  age?: number;
};
