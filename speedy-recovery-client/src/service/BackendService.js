import axios from "axios";

const baseUrl = "https://speedy-recovery-server.azurewebsites.net";

const getConversation = async id => {
  const url = `${baseUrl}/conversations?userid=${id}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log("GET server error: ", error);
  }
};

const getMessages = async (id, id2) => {
  const url = `${baseUrl}/conversation?userid1=${id}&userid2=${id2}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log("GET server error: ", error);
  }
};

const getPractitionerInfo = async id => {
  const url = `${baseUrl}/practitioners?userid=${id}`;
  try {
    return await axios.get(url);
  } catch (error) {
    console.error("GET server error: ", error);
  }
};

const postMessages = async (senderID, recipientID, message) => {
  const url = `${baseUrl}/messages?`;
  const headers = {
    Sender: senderID,
    Recipient: recipientID
  };
  const data = {
    message: `<message_start>${message}<message_end>`
  };

  axios
    .post(url, data, { headers: headers })
    .then(response => console.log("POST server success: ", response))
    .catch(error => console.error("POST server error: ", error));
};

export { getConversation, getMessages, postMessages, getPractitionerInfo };
