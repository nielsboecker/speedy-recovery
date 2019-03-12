import {
  getAlt,
  getAvatar,
  getDate,
  getId,
  getPosition,
  getSubtitle,
  getText,
  getTime,
  getTitle,
  getMessageTitle,
  getUnread,
  getUserId
} from "./BackendMappingExtractionUtils";

const mapConversationsGOSH = (conversationResource, id, userList) => ({
  userId: getUserId(conversationResource, id),
  id: getId(conversationResource),
  avatar: getAvatar(conversationResource),
  alt: getAlt(conversationResource),
  title: getTitle(conversationResource, id, userList),
  subtitle: getSubtitle(conversationResource),
  unread: getUnread(conversationResource),
  date: getDate(conversationResource)
});

const mapMessagesGOSH = (messageResource, id, role, name, title) => ({
  position: getPosition(messageResource, id),
  type: "text",
  title: getMessageTitle(getPosition(messageResource, id),role, name, title),
  text: getText(messageResource),
  date: getTime(messageResource)
});

export { mapConversationsGOSH, mapMessagesGOSH };
