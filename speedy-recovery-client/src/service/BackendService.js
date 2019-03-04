import {
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
} from "./BackendMappingExtractionUtils";
const axios = require("axios");

const baseUrl = "https://speedy-recovery-server.azurewebsites.net";
const getConversation = async id => {
  const url = baseUrl + "/conversations?userid=" + id;
  const response = await axios.get(url);
  return response.data;
};

const getMessages = async (id, id2) => {
  const url = baseUrl + "/conversation?userid1=" + id + "&userid2=" + id2;
  const response = await axios.get(url);
  return response.data;
};

const postMessages = async (id1, id2, message) => {
  const url = baseUrl + "/messages?";
  axios({
    method: "post",
    url: url,
    data: {
      message: "<message_start>" + message + "<message_end>"
    },
    headers: {
      Sender: id1,
      Recipient: id2
    }
  }).then(response => {
    console.log(response);
  });
};

const getPractitionerInfo = async id => {
  const url = baseUrl + "/practitioners?userid=" + id;
  const response = await axios.get(url);
  return response.data;
};

const mapConversations = (conversationResource, id, userList) => ({
  userId: getUserId(conversationResource, id),
  id: getId(conversationResource),
  avatar: getAvatar(conversationResource),
  alt: getAlt(conversationResource),
  title: getTitle(conversationResource, id, userList),
  subtitle: getSubtitle(conversationResource),
  unread: getUnread(conversationResource),
  date: getDate(conversationResource)
});

const mapMessages = (messageResource, id) => ({
  position: getPosition(messageResource, id),
  type: "text",
  text: getText(messageResource),
  date: getTime(messageResource)
});

const setupMessages = messageResource => ({
  position: "right",
  type: "text",
  text: messageResource,
  date: new Date()
});

export {
  getConversation,
  getMessages,
  postMessages,
  getPractitionerInfo,
  mapConversations,
  mapMessages,
  setupMessages
};
//module.exports = { getConversation, getMessages, getPractitionerInfo, mapMessages };
