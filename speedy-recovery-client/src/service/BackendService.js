import axios from 'axios';

const baseUrl = 'https://speedy-recovery-server.azurewebsites.net';
const getConversation = async (id)  => {
     console.log(id);
     const url = baseUrl + '/conversations?userid=' + id;
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

export { getConversation, getPractitionerInfo };


  