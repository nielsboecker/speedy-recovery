const axios = require('axios');
//import axios from 'axios';

const baseUrl = 'https://speedy-recovery-server.azurewebsites.net';
const getConversation = async (id)  => {
     const url = baseUrl + '/conversations?userid=' + id;
     const response = await axios.get(url);
     return (response.data);
};

const getMessages = async (id)  => {
    const url = baseUrl + '/conversation?userid1='+ id +'&userid2=d0d0cde0-4b21-42f6-9c1e-bfa447d72059';
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

const mapMessages = (messageResource, id) => ({
    position: getPosition(messageResource,id),
    type: "text",
    text : getText(messageResource),
    date: getDate(messageResource)
});

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

const getDate = messageResource => {
    if (messageResource && messageResource.time) {
        return new Date(messageResource.time);
    }
    return null;
};

export { getConversation, getMessages, postMessages, getPractitionerInfo, mapMessages };
//module.exports = { getConversation, getMessages, getPractitionerInfo, mapMessages };