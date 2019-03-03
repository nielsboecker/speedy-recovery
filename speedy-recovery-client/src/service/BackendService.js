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
    getUnread
} from "./BackendMappingExtractionUtils";
const axios = require('axios');

const baseUrl = 'https://speedy-recovery-server.azurewebsites.net';
const getConversation = async (id)  => {
    const url = baseUrl + '/conversations?userid=' + id;
    const response = await axios.get(url);
    return (response.data);
};

const getMessages = async (id, id2)  => {
    const url = baseUrl + '/conversation?userid1=' + id +'&userid2=' + id2;
    const response = await axios.get(url);
    return (response.data);
};

const postMessages = async (id)  => {

};

const getPractitionerInfo = async (id)  => {
    const url = baseUrl + '/practitioners?userid=' + id;
    const response = await axios.get(url);
    return (response.data);
};

const mapConversations = (conversationResource, id) => ({
    id: getId(conversationResource),
    avatar: getAvatar(conversationResource),
    alt: getAlt(conversationResource),
    title: getTitle(conversationResource, id),
    subtitle: getSubtitle(conversationResource),
    unread: getUnread(conversationResource),
    date: getDate(conversationResource)
});

const mapMessages = (messageResource, id) => ({
    position: getPosition(messageResource,id),
    type: "text",
    text : getText(messageResource),
    date: getTime(messageResource)
});

export { getConversation, getMessages, postMessages, getPractitionerInfo, mapConversations, mapMessages };
//module.exports = { getConversation, getMessages, getPractitionerInfo, mapMessages };