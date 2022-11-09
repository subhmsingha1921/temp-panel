import { RightOutlined, CheckOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Images } from "../assets";

const seekerColumns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
  },
  {
    title: "",
    dataIndex: "action",
    key: "action",
    render: (text, record) => (
      <Link to={`/seekerprofile/${record.key}`} state={{ userId: record.key }}>
        <RightOutlined />
      </Link>
    ),
  },
];

const seekersChatColumn = [
  {
    title: "",
    dataIndex: "photo",
    key: "photo",
    render: (text, record) => (
      <img
        src={record.photo !== "" ? record.photo : Images.fallBackImage}
        className="w-[48px] h-[54px] object-contain"
        alt=""
      />
    ),
  },
  {
    title: "",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "",
    dataIndex: "topicName",
    key: "topicName",
  },
  {
    title: "",
    dataIndex: "action1",
    key: "action1",
    render: (text, record) => (
      <Link
        className="text-lg font-bold underline text-black"
        to={`/chatdetail/${record.chatId}`}
        state={{
          detail: {
            chatId: record.chatId,
            userId: record.userId,
            otherUserId: record.otherUserId,
            report: false,
            chatType: record.chatType,
            topic: record.topicName,
          },
        }}
      >
        VIEW
      </Link>
    ),
  },
  {
    title: "",
    dataIndex: "action2",
    key: "action2",
    render: (text, record) => (
      <Link
        to={`/listenerprofile/${record.otherUserId}`}
        state={{ userId: record.otherUserId }}
      >
        <RightOutlined />
      </Link>
    ),
  },
];

const seekerSessionColumn = [
  {
    title: "Session ID",
    dataIndex: "sessionId",
    key: "sessionId",
  },
  {
    title: "Therapist",
    dataIndex: "therapist",
    key: "therapist",
  },
  {
    title: "Reason",
    dataIndex: "reason",
    key: "reason",
  },
  {
    title: "Started",
    dataIndex: "timestamp",
    key: "timestamp",
  },
  {
    title: "",
    dataIndex: "action2",
    key: "action2",
    render: (text, record) => (
      <Link
        className="text-lg font-bold underline text-black"
        to={`/sessiondetail/${record.key}`}
        state={{
          detail: {
            sessionId: record.key,
            seekerId: record.seekerId,
            therapist: record.therapist,
            payment: record.payment,
            paidTime: record.paidTime,
            bookedAt: record.timestamp,
            email: record.email,
            reasonForBooking: record.reason,
            preferredAge: record.preferredAge,
            preferredLanguage: record.preferredLanguage,
          },
        }}
      >
        <RightOutlined />
      </Link>
    ),
  },
];

const seekersReportColumn = [
  {
    title: "",
    dataIndex: "photo",
    key: "photo",
    render: (text, record) => (
      <img
        src={record.photo !== "" ? record.photo : Images.fallBackImage}
        className="w-[48px] h-[54px] object-contain"
        alt=""
      />
    ),
  },
  {
    title: "",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "",
    dataIndex: "reason",
    key: "reason",
  },
  {
    title: "",
    dataIndex: "action1",
    key: "action1",
    render: (text, record) => (
      <Link
        className="text-lg font-bold underline text-black"
        to={`/chatdetail/${record.chatId}`}
        state={{
          detail: {
            chatId: record.chatId,
            userId: record.userId,
            otherUserId: record.otherUserId,
            report: true,
            reason: record.reason,
          },
        }}
      >
        VIEW
      </Link>
    ),
  },
  {
    title: "",
    dataIndex: "action2",
    key: "action2",
    render: (text, record) => (
      <Link
        to={`/listenerprofile/${record.otherUserId}`}
        state={{ userId: record.otherUserId }}
      >
        <RightOutlined />
      </Link>
    ),
  },
];

const chatRequestColumn = [
  {
    title: "Seeker Name",
    dataIndex: "seeker",
    key: "seeker",
  },
  {
    title: "Topic",
    dataIndex: "topic",
    key: "topic",
  },
  {
    title: "On Mind",
    dataIndex: "onMind",
    key: "onMind",
  },
  {
    title: "Requested time",
    dataIndex: "requestedTime",
    key: "requestedTime",
  },
];

const missedChatRequestColumn = [
  {
    title: "Seeker Name",
    dataIndex: "seeker",
    key: "seeker",
  },
  {
    title: "Topic",
    dataIndex: "topic",
    key: "topic",
  },
  {
    title: "On Mind",
    dataIndex: "onMind",
    key: "onMind",
  },
  {
    title: "Requested time",
    dataIndex: "requestedTime",
    key: "requestedTime",
  },
  {
    title: "",
    dataIndex: "action",
    key: "action",
    render: (text, record) => (
      <Link to={`/missedchatrequests/${record.key}`} state={{ record: record }}>
        <RightOutlined />
      </Link>
    ),
  },
];

const chatColumns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Listener",
    dataIndex: "listener",
    key: "listener",
    render: (text, record) => (
      <Link
        to={`/listenerprofile/${record.listenerId}`}
        state={{ userId: record.listenerId }}
      >
        {text}
      </Link>
    ),
  },
  {
    title: "Seeker",
    dataIndex: "seeker",
    key: "seeker",
    render: (text, record) => (
      <Link
        to={`/seekerprofile/${record.seekerId}`}
        state={{
          userId: record.seekerId,
        }}
      >
        {text}
      </Link>
    ),
  },
  {
    title: "Started",
    dataIndex: "started",
    key: "started",
  },
  {
    title: "",
    dataIndex: "action",
    key: "action",
    render: (text, record) => (
      <Link
        to={`/chatdetail/${record.chatId}`}
        state={{
          detail: {
            chatId: record.chatId,
            userId: record.seekerId,
            otherUserId: record.listenerId,
            report: false,
            chatType: record.chatType,
            topic: record.topic,
          },
        }}
      >
        <RightOutlined />
      </Link>
    ),
  },
];

const memberListColumns = [
  {
    title: "",
    dataIndex: "photo",
    key: "photo",
    render: (text, record) => (
      <img
        src={record.photo !== "" ? record.photo : Images.fallBackImage}
        className="w-[48px] h-[54px] object-contain"
        alt=""
      />
    ),
  },
  {
    title: "",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "",
    dataIndex: "gender",
    key: "gender",
  },
  {
    title: "",
    dataIndex: "action2",
    key: "action2",
    render: (text, record) => (
      <Link
        to={`/${record.profileType}/${record.key}`}
        state={{ userId: record.key }}
      >
        <RightOutlined />
      </Link>
    ),
  },
];

const listenerColumns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
  },
  {
    title: "",
    dataIndex: "action",
    key: "action",
    render: (text, record) => (
      <Link
        to={`/listenerprofile/${record.key}`}
        state={{ userId: record.key }}
      >
        <RightOutlined />
      </Link>
    ),
  },
];

const listenersChatColumn = [
  {
    title: "",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "",
    dataIndex: "topicName",
    key: "topicName",
  },
  {
    title: "",
    dataIndex: "action1",
    key: "action1",
    render: (text, record) => (
      <Link
        className="text-lg font-bold underline text-black"
        to={`/chatdetail/${record.chatId}`}
        state={{
          detail: {
            chatId: record.chatId,
            userId: record.otherUserId,
            otherUserId: record.userId,
            report: false,
            chatType: record.chatType,
            topic: record.topicName,
          },
        }}
      >
        VIEW
      </Link>
    ),
  },
  {
    title: "",
    dataIndex: "action2",
    key: "action2",
    render: (text, record) => (
      <Link
        to={`/seekerprofile/${record.otherUserId}`}
        state={{ userId: record.otherUserId }}
      >
        <RightOutlined />
      </Link>
    ),
  },
];

const listenersReportColumn = [
  {
    title: "Seeker name",
    dataIndex: "seekerName",
    key: "seekerName",
  },
  {
    title: "Reason",
    dataIndex: "reason",
    key: "reason",
  },
  {
    title: "Chat report",
    dataIndex: "chatReport",
    key: "chatReport",
    render: (text, record) => {
      return record.requestReported ? "-" : <CheckOutlined />;
    },
  },
  {
    title: "Chat Request tab Report",
    dataIndex: "requestReport",
    key: "requestReport",
    render: (text, record) => {
      return record.requestReported ? <CheckOutlined /> : "-";
    },
  },
  {
    title: "",
    dataIndex: "action1",
    key: "action1",
    render: (text, record) => (
      <Link
        className="text-lg font-bold underline text-black"
        to={`/chatdetail/${record.chatId}`}
        state={{
          detail: {
            chatId: record.chatId,
            userId: record.seekerId,
            otherUserId: record.listenerId,
            report: true,
            reason: record.reason,
            request: record.requestReported,
          },
        }}
      >
        View Report
      </Link>
    ),
  },
  {
    title: "",
    dataIndex: "action2",
    key: "action2",
    render: (text, record) => (
      <Link
        to={`/seekerprofile/${record.seekerId}`}
        state={{ userId: record.seekerId }}
      >
        <RightOutlined />
      </Link>
    ),
  },
];

const listenersReviewColumn = [
  {
    title: "Chat ID",
    dataIndex: "chatId",
    key: "chatId",
  },
  {
    title: "Seeker name",
    dataIndex: "seekerName",
    key: "seekerName",
  },
  {
    title: "Experience",
    dataIndex: "experience",
    key: "experience",
  },
  {
    title: "",
    dataIndex: "action1",
    key: "action1",
    render: (text, record) => (
      <Link
        className="text-lg font-bold underline text-black"
        to={`/chatdetail/${record.chatId}`}
        state={{
          detail: {
            chatId: record.chatId,
            userId: record.seekerId,
            otherUserId: record.listenerId,
            review: true,
            reason: record.experience,
          },
        }}
      >
        VIEW REVIEW
      </Link>
    ),
  },
  {
    title: "",
    dataIndex: "action2",
    key: "action2",
    render: (text, record) => (
      <Link
        to={`/seekerprofile/${record.seekerId}`}
        state={{ userId: record.seekerId }}
      >
        <RightOutlined />
      </Link>
    ),
  },
];

const appFeebackColumn = [
  {
    title: "User name",
    dataIndex: "user",
    key: "user",
  },
  {
    title: "Experience",
    dataIndex: "experience",
    key: "experience",
  },
  {
    title: "Time stamp",
    dataIndex: "timestamp",
    key: "timestamp",
  },
  {
    title: "",
    dataIndex: "action",
    key: "action",
    render: (text, record) => (
      <Link
        to={`/moderation/${record.type}/${record.id}`}
        state={{
          type: record.type,
          id: record.id,
          userId: record.userId,
          userName: record.user,
          message: record.experience,
          timestamp: record.timestamp,
        }}
      >
        <RightOutlined />
      </Link>
    ),
  },
];

const matchingFeedbackColumn = [
  {
    title: "User name",
    dataIndex: "user",
    key: "user",
  },
  {
    title: "Reason",
    dataIndex: "reason",
    key: "reason",
  },
  {
    title: "Time stamp",
    dataIndex: "timestamp",
    key: "timestamp",
  },
  {
    title: "",
    dataIndex: "action",
    key: "action",
    render: (text, record) => (
      <Link
        to={`/moderation/${record.type}/${record.id}`}
        state={{
          type: record.type,
          id: record.id,
          userId: record.userId,
          userName: record.user,
          message: record.reason,
          timestamp: record.timestamp,
        }}
      >
        <RightOutlined />
      </Link>
    ),
  },
];

const listenerFeedbackColumn = [
  {
    title: "Chat ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Seeker name",
    dataIndex: "seeker",
    key: "seeker",
  },
  {
    title: "Experience",
    dataIndex: "experience",
    key: "experience",
  },
  {
    title: "Timestamp",
    dataIndex: "timestamp",
    key: "timestamp",
  },
  {
    title: "",
    dataIndex: "action1",
    key: "action1",
    render: (text, record) => (
      <Link
        to={`/moderation/feedback/${record.type.toLowerCase()}/${
          record.feedbackId
        }`}
        state={{
          userType: record.userType,
          feedbackId: record.feedbackId,
          userId: record.userId,
          otherUserId: record.otherUserId,
          chatId: record.id,
          experience: record.experience,
          timestamp: record.timestamp,
        }}
      >
        <button className="text-lg text-black font-medium underline">
          View Review
        </button>
      </Link>
    ),
  },
  {
    title: "",
    dataIndex: "action2",
    key: "action2",
    render: (text, record) => (
      <Link
        to={`/moderation/feedback/${record.type.toLowerCase()}/${
          record.feedbackId
        }`}
        state={{
          userType: record.userType,
          feedbackId: record.feedbackId,
          userId: record.userId,
          otherUserId: record.otherUserId,
          chatId: record.id,
          experience: record.experience,
          timestamp: record.timestamp,
        }}
      >
        <RightOutlined />
      </Link>
    ),
  },
];

const seekerFeedbackColumn = [
  {
    title: "Chat ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Listener name",
    dataIndex: "listener",
    key: "listener",
  },
  {
    title: "Experience",
    dataIndex: "experience",
    key: "experience",
  },
  {
    title: "Timestamp",
    dataIndex: "timestamp",
    key: "timestamp",
  },
  {
    title: "",
    dataIndex: "action1",
    key: "action1",
    render: (text, record) => (
      <Link
        to={`/moderation/feedback/${record.type.toLowerCase()}/${
          record.feedbackId
        }`}
        state={{
          userType: record.userType,
          feedbackId: record.feedbackId,
          userId: record.userId,
          otherUserId: record.otherUserId,
          chatId: record.id,
          experience: record.experience,
          feeling: record.feeling,
          rating: record.rating,
          timestamp: record.timestamp,
        }}
      >
        <button className="text-lg text-black font-medium underline">
          View Review
        </button>
      </Link>
    ),
  },
  {
    title: "",
    dataIndex: "action2",
    key: "action2",
    render: (text, record) => (
      <Link
        to={`/moderation/feedback/${record.type.toLowerCase()}/${
          record.feedbackId
        }`}
        state={{
          userType: record.userType,
          feedbackId: record.feedbackId,
          userId: record.userId,
          otherUserId: record.otherUserId,
          chatId: record.id,
          experience: record.experience,
          feeling: record.feeling,
          rating: record.rating,
          timestamp: record.timestamp,
        }}
      >
        <RightOutlined />
      </Link>
    ),
  },
];

const moderationListenerReportColumn = [
  {
    title: "Chat ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Seeker name",
    dataIndex: "seeker",
    key: "seeker",
  },
  {
    title: "Report",
    dataIndex: "report",
    key: "report",
  },
  {
    title: "Timestamp",
    dataIndex: "timestamp",
    key: "timestamp",
  },
  {
    title: "",
    dataIndex: "action1",
    key: "action1",
    render: (text, record) => (
      <Link
        to={`/moderation/reports/${record.userType.toLowerCase()}/${
          record.reportId
        }`}
        state={{
          reportId: record.reportId,
          userType: record.userType,
          chatId: record.id,
          userId: record.userId,
          otherUserId: record.otherUserId,
          report: record.report,
          requestReported: record.requestReported,
        }}
      >
        <button className="text-lg text-black font-medium underline">
          View Report
        </button>
      </Link>
    ),
  },
  {
    title: "",
    dataIndex: "action2",
    key: "action2",
    render: (text, record) => (
      <Link
        to={`/moderation/reports/${record.userType.toLowerCase()}/${
          record.reportId
        }`}
        state={{
          reportId: record.reportId,
          userType: record.userType,
          chatId: record.id,
          userId: record.userId,
          otherUserId: record.otherUserId,
          report: record.report,
          requestReported: record.requestReported,
        }}
      >
        <RightOutlined />
      </Link>
    ),
  },
];

const moderationSeekerReportColumn = [
  {
    title: "Chat ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Listener name",
    dataIndex: "listener",
    key: "listener",
  },
  {
    title: "Report",
    dataIndex: "report",
    key: "report",
  },
  {
    title: "Timestamp",
    dataIndex: "timestamp",
    key: "timestamp",
  },
  {
    title: "",
    dataIndex: "action1",
    key: "action1",
    render: (text, record) => (
      <Link
        to={`/moderation/reports/${record.userType.toLowerCase()}/${
          record.reportId
        }`}
        state={{
          reportId: record.reportId,
          userType: record.userType,
          chatId: record.id,
          userId: record.userId,
          otherUserId: record.otherUserId,
          report: record.report,
        }}
      >
        <button className="text-lg text-black font-medium underline">
          View Report
        </button>
      </Link>
    ),
  },
  {
    title: "",
    dataIndex: "action2",
    key: "action2",
    render: (text, record) => (
      <Link
        to={`/moderation/reports/${record.userType.toLowerCase()}/${
          record.reportId
        }`}
        state={{
          reportId: record.reportId,
          userType: record.userType,
          chatId: record.id,
          userId: record.userId,
          otherUserId: record.otherUserId,
          report: record.report,
        }}
      >
        <RightOutlined />
      </Link>
    ),
  },
];

const sessionColumns = [
  {
    title: "Session ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Seeker ID",
    dataIndex: "seekerId",
    key: "seekerId",
    render: (text, record) => (
      <Link
        to={`/seekerprofile/${record.seekerId}`}
        state={{ userId: record.seekerId }}
      >
        {text}
      </Link>
    ),
  },
  {
    title: "Reason",
    dataIndex: "reasonForBooking",
    key: "reasonForBooking",
  },
  {
    title: "Started",
    dataIndex: "started",
    key: "started",
  },
  {
    title: "",
    dataIndex: "action",
    key: "action",
    render: (text, record) => (
      <Link
        to={`/sessionDetail/${record.key}`}
        state={{
          detail: {
            sessionId: record.id,
            seekerId: record.seekerId,
            therapist: record.therapist,
            payment: record.payment,
            paidTime: record.paidTime,
            bookedAt: record.started,
            email: record.email,
            reasonForBooking: record.reasonForBooking,
            preferredAge: record.preferredAge,
            preferredLanguage: record.preferredLanguage,
          },
        }}
      >
        <RightOutlined />
      </Link>
    ),
  },
];

const therapistColumn = [
  {
    title: "Photo",
    dataIndex: "photo",
    key: "photo",
    render: (text, record) => (
      <img
        src={record.photo !== "" ? record.photo : Images.fallBackImage}
        className="w-[48px] h-[54px] object-contain"
        alt=""
      />
    ),
  },
  {
    title: "Therapist Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "",
    dataIndex: "action",
    key: "action",
    render: (text, record) => (
      <Link
        to={`/therapistdetail/${record.key}`}
        state={{
          detail: {
            therapistInfo: record,
          },
        }}
      >
        <RightOutlined />
      </Link>
    ),
  },
];

const sessionRequestsColumns = [
  {
    title: "Session ID",
    dataIndex: "sessionId",
    key: "sessionId",
  },
  {
    title: "Therapist",
    dataIndex: "therapist",
    key: "therapist",
  },
  {
    title: "Reason",
    dataIndex: "reason",
    key: "reason",
  },
  {
    title: "Started",
    dataIndex: "started",
    key: "started",
  },
];

const sessionUpdatesColumns = [
  {
    title: "Session ID",
    dataIndex: "sessionId",
    key: "sessionId",
  },
  {
    title: "Therapist",
    dataIndex: "therapist",
    key: "therapist",
  },
  {
    title: "Reason",
    dataIndex: "reason",
    key: "reason",
  },
  {
    title: "Started",
    dataIndex: "started",
    key: "started",
  },
];

const sessionCreditsColumn = [
  {
    title: "Therapist",
    dataIndex: "therapist",
    key: "therapist",
  },
  {
    title: "Session Booked",
    dataIndex: "sessionsBooked",
    key: "sessionsBooked",
    render: (text, record) => <p>{record.sessionsBooked.join(" , ")}</p>,
  },
  {
    title: "Credits Purchased",
    dataIndex: "creditsPurchased",
    key: "creditsPurchased",
  },
  {
    title: "Credits Left",
    dataIndex: "creditsLeft",
    key: "creditsLeft",
  },
];

const globalArchiveChatColumns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Listener",
    dataIndex: "listener",
    key: "listener",
    render: (text, record) => (
      <Link
        to={`/listenerprofile/${record.listenerId}`}
        state={{ userId: record.listenerId }}
      >
        {text}
      </Link>
    ),
  },
  {
    title: "Seeker",
    dataIndex: "seekerId",
    key: "seekerId",
    render: (text, record) => (
      <Link
        to={`/seekerprofile/${record.seekerId}`}
        state={{
          userId: record.seekerId,
        }}
      >
        {text}
      </Link>
    ),
  },
  {
    title: "Ended",
    dataIndex: "ended",
    key: "ended",
  },
  {
    title: "",
    dataIndex: "action",
    key: "action",
    render: (text, record) => (
      <Link
        to={`/chatdetail/${record.chatId}`}
        state={{
          detail: {
            chatId: record.chatId,
            userId: record.seekerId,
            otherUserId: record.listenerId,
            report: false,
            chatType: record.chatType,
          },
        }}
      >
        <RightOutlined />
      </Link>
    ),
  },
];

export {
  seekerColumns,
  seekersChatColumn,
  seekerSessionColumn,
  chatColumns,
  memberListColumns,
  chatRequestColumn,
  missedChatRequestColumn,
  listenerColumns,
  listenersChatColumn,
  appFeebackColumn,
  matchingFeedbackColumn,
  listenerFeedbackColumn,
  seekersReportColumn,
  seekerFeedbackColumn,
  moderationListenerReportColumn,
  moderationSeekerReportColumn,
  listenersReportColumn,
  listenersReviewColumn,
  sessionColumns,
  sessionRequestsColumns,
  sessionUpdatesColumns,
  sessionCreditsColumn,
  therapistColumn,
  globalArchiveChatColumns,
};
