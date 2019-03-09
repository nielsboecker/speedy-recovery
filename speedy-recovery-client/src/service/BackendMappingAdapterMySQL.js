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
    getUnread,
    getUserId
  } from "./BackendMappingExtractionUtils";

const mapConversationsMySQL = (conversationResource, id, conversationList) => ({
    userId: getUserId(conversationResource, id),
    id: getId(conversationResource),
    avatar: getAvatar(conversationResource),
    alt: getAlt(conversationResource),
    title: getTitle(conversationResource, id, conversationList),
    subtitle: getSubtitle(conversationResource),
    unread: getUnread(conversationResource),
    date: getDate(conversationResource)
  });
  
  const mapMessagesMySQL = (messageResource, id) => ({
    position: getPosition(messageResource, id),
    type: "text",
    text: getText(messageResource),
    date: getTime(messageResource)
  });

  export {
    mapConversationsMySQL,
    mapMessagesMySQL,
  };