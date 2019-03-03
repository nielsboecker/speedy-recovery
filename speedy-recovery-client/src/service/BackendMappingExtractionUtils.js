const getPosition = (messageResource, id) => {
    if(messageResource && messageResource.Recipient && messageResource.Recipient === id){
        return "left";
    }
    return "right";
};

const getText = messageResource => {
    if (messageResource && messageResource.Message) {
        return messageResource.Message;
    }
    return null;
};

const getTime = messageResource => {
    if (messageResource && messageResource.time) {
        return new Date(messageResource.time);
    }
    return null;
};

const getTitle = (conversationResource, id) => {
    if (conversationResource && conversationResource.userid1 && conversationResource.userid2) {
        if(conversationResource.userid1===id){
            return conversationResource.userid2;
        }
    }
    return conversationResource.userid1;
};

const getId = (conversationResource) => {
    if (conversationResource && conversationResource.Conversation_Id) {
        return conversationResource.Conversation_Id;
    }
    return "undefined";
};

const getAvatar = (conversationResource) => {
    if (conversationResource && conversationResource.avatar) {
        return conversationResource.avatar;
    }
    return null;
};

const getAlt = (conversationResource) => {
    if (conversationResource && conversationResource.alt) {
        return conversationResource.alt;
    }
    return null;
};

const getSubtitle = (conversationResource) => {
    if (conversationResource && conversationResource.subtitle) {
        return conversationResource.subtitle;
    }
    return null;
};

const getUnread = (conversationResource) => {
    if (conversationResource && conversationResource.unread) {
        return conversationResource.unread;
    }
    return null;
};

const getDate = conversationResource => {
    if (conversationResource && conversationResource.date) {
        return new Date(conversationResource.date);
    }
    return null;
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
    getUnread
};
