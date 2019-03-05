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
import axios from "axios";

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

// TODO @Fabiha rename variables so it is clear who is sender and receiver
const postMessages = async (id1, id2, message) => {
  const url = baseUrl + "/messages?";
  axios
    .post(url, {
      // TODO @Fabiha Use ES6 string template syntax (also for similar string concatenations in this file)
      data: {
        message: "<message_start>" + message + "<message_end>"
      },
      headers: {
        Sender: id1,
        Recipient: id2
      }
    })
    .then(response => {
      console.log(response);
    });
  // TODO @Fabiha also have an error handling, even if it is just logging
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

const getSenderMessageNum = messageResource => {
  var num = 0;
  for (var i = 0; i < messageResource.length; i++) {
    if (messageResource[i].position === "right") {
      num++;
    }
  }
  return num;
};

export {
  getConversation,
  getMessages,
  postMessages,
  getPractitionerInfo,
  mapConversations,
  mapMessages,
  setupMessages,
  getSenderMessageNum
};
