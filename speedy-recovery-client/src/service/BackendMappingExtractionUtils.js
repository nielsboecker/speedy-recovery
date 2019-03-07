const missingField = "Unknown";
const getPosition = (messageResource, id) => {
  if(
    messageResource && 
    messageResource.Recipient && 
    messageResource.Recipient === id
    ) {
    return "left";
  }
  return "right";
};

const getText = messageResource => {
  if(messageResource && 
    messageResource.Message
  ) {
    return messageResource.Message;
  }
  return missingField;
};

const getTime = messageResource => {
  if(messageResource && 
    messageResource.time
  ) {
    return new Date(messageResource.time);
  }
  return missingField;
};

const getUserId = (conversationResource, id) => {
  if(conversationResource && 
    conversationResource.userid1 && 
    conversationResource.userid2
  ){
    if (conversationResource.userid1 === id) {
      return conversationResource.userid2;
    }
    return conversationResource.userid1;
  }
  return missingField;
};

const getTitle = (conversationResource, id, conversationList) => {
  if(conversationResource && 
    conversationResource.userid1 && 
    conversationResource.userid2 &&
    conversationList
  ) {
    if (conversationResource.userid1 === id) {
      for (let conversation of conversationList) {
        if (conversation.id === conversationResource.userid2) {
          return conversation.name;
        }
      }
    } else {
       for(let conversation of conversationList) {
        if (conversation.id === conversationResource.userid1) {
          return conversation.name;
        }
      }
    }
  }
  return missingField;
};

const getId = conversationResource => {
  if (conversationResource && 
    conversationResource.Conversation_Id
  ) {
    return conversationResource.Conversation_Id;
  }
  return missingField;
};

const getAvatar = conversationResource => {
  if (conversationResource &&
     conversationResource.avatar
  ) {
    return conversationResource.avatar;
  }
  return missingField;
};

const getAlt = conversationResource => {
  if (conversationResource && 
    conversationResource.alt
  ) {
    return conversationResource.alt;
  }
  return missingField;
};

const getSubtitle = conversationResource => {
  if (conversationResource && 
    conversationResource.subtitle
  ) {
    return conversationResource.subtitle;
  }
  return missingField;
};

const getUnread = conversationResource => {
  if (conversationResource && 
    conversationResource.unread
  ) {
    return conversationResource.unread;
  }
  return missingField;
};

const getDate = conversationResource => {
  if (conversationResource &&
     conversationResource.date
  ) {
    return new Date(conversationResource.date);
  }
  return missingField;
};

export {
  getPosition,
  getText,
  getDate,
  getTime,
  getTitle,
  getId,
  getAvatar,
  getAlt,
  getSubtitle,
  getUnread,
  getUserId
};
