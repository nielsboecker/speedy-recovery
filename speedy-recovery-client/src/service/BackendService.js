import axios from 'axios';

const baseUrl = 'https://speedy-recovery-server.azurewebsites.net';
const getConversation = async (id)  => {
     console.log(id);
     const url = baseUrl + '/conversations?userid=' + id;
     const response = await axios.get(url);
     console.log('Response from backend service :' , response);
     return (response.data);
};

const getMessages = async (id)  => {
    console.log(id);
    const url = baseUrl + '/conversation?userid1='+ id +'&userid2=d0d0cde0-4b21-42f6-9c1e-bfa447d72059';
    const response = await axios.get(url);
    console.log('Response from backend service :' , response);
    return (response.data);
};

const getPractitionerInfo = async (id)  => {
    console.log(id);
    const url = baseUrl + '/practitioners?userid=' + id;
    const response = await axios.get(url);
    console.log('Response from backend service :', response);
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
        return messageResource.time;
    }
    return null;
};

export { getConversation, getMessages, getPractitionerInfo, mapMessages };


  