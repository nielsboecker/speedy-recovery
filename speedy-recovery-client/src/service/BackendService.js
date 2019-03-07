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
  const url = `${baseUrl}/conversations?userid=${id}`;
  try{
    const response = await axios.get(url);
    return response.data;
  }catch(error) {
    console.log(error);
  } 
};

const getMessages = async (id, id2) => {
  const url = `${baseUrl}/conversation?userid1=${id}&userid2=${id2}`;
  try{
    const response = await axios.get(url);
    return response.data;
  }catch(error){
    console.log(error);
  }
};

const getPractitionerInfo = async id => {
  const url = `${baseUrl}/practitioners?userid=${id}`;
  try{
    const response = await axios.get(url);
    return response;
  }catch(error){
    console.log(error);
  }
};

const postMessages = async (senderID,recipientID, message) => {
  const url = `${baseUrl}/messages?`;
  let headers = {
    Sender: senderID,
    Recipient: recipientID
  }
  let data = {
    message: `<message_start>${message}<message_end>`
  }
   axios
    .post(url, data, {headers:headers})
    .then(response => {
      console.log("POSTING MESSAGE response", response);
    }).catch(error => {
      console.log(error);
    });
  }
  
const mapConversations = (conversationResource, id, conversationList) => ({
  userId: getUserId(conversationResource, id),
  id: getId(conversationResource),
  avatar: getAvatar(conversationResource),
  alt: getAlt(conversationResource),
  title: getTitle(conversationResource, id, conversationList),
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
  let num = 0;
  for (let resource of messageResource) {
    if (resource.position === "right") {
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
