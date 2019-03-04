import axios from 'axios';

const getCoversation = async (id) => {
    //var url = "https://speedy-recovery-server.azurewebsites.net/conversation?userid1=smart-Practitioner-72080416&userid2=d0d0cde0-4b21-42f6-9c1e-bfa447d72059";
    var url = 'https://speedy-recovery-server.azurewebsites.net/conversations?userid=' + id;
    const response = await axios.get(url);
    console.log(response);
    return response.data;
};

export default {
    getCoversation
};
