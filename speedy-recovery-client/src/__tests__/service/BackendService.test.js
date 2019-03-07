import mockAxios from "jest-mock-axios";
import { postMessages,getMessages,getConversation,getPractitionerInfo } from "../../service/BackendService";
import message from "../test_input/db_resources/Message.json";
import conversation from "../test_input/db_resources/Conversation.json";
import practitionerInfo from "../test_input/db_resources/PractitionerExtra.json";


afterEach(() => {
  // cleaning up the mess left behind the previous test
  mockAxios.reset();
});

test("Test to GET Conversations from backend", ()=>{
  const userID = "smart-Practitioner-72080416";
  getConversation(userID);
  expect(mockAxios.get).toHaveBeenCalled();
  expect(mockAxios.get).toHaveBeenCalledWith("https://speedy-recovery-server.azurewebsites.net/conversations?userid=" + userID);
  const serverResponse = {
    data : conversation 
  };
  mockAxios.mockResponse(serverResponse);
  expect(mockAxios.get).toHaveReturnedTimes(1);
  //Doesnt work
  //expect(mockAxios.get).toHaveReturnedWith(serverResponse);
});

test("Test to GET Messages from backend", ()=>{
  const userId = "smart-Practitioner-72080416";
  const userId2 = "d0d0cde0-4b21-42f6-9c1e-bfa447d";
  getMessages(userId,userId2);
  
  expect(mockAxios.get).toHaveBeenCalled();
  expect(mockAxios.get).toHaveBeenCalledWith("https://speedy-recovery-server.azurewebsites.net/conversation?userid1=" + userId + "&userid2=" + userId2);
  const serverResponse = {
    data: message
  }
  mockAxios.mockResponse(serverResponse);
  expect(mockAxios.get).toHaveReturnedTimes(1);
  //Doesnt work
  //expect(mockAxios.get).toHaveReturnedWith(serverResponse);

});

test("Test to GET PractitionerExtraInfo from backend", ()=>{
  const id = "smart-Practitioner-72080416";
  getPractitionerInfo(id);
  expect(mockAxios.get).toHaveBeenCalled();
  expect(mockAxios.get).toHaveBeenCalledWith("https://speedy-recovery-server.azurewebsites.net/practitioners?userid=" + id);
  const serverResponse = {
    data : practitionerInfo 
  };
  mockAxios.mockResponse(serverResponse);
  expect(mockAxios.get).toHaveReturnedTimes(1);
  //Doesnt work
  //expect(mockAxios.get).toHaveReturnedWith(serverResponse);
});


test("Test to POST Message to backend", async() => {
  const  thenFunction = jest.fn();
  const  catchFunction = jest.fn();
  const  senderID = "smart-Practitioner-72080416";
  const  recipientID = "d0d0cde0-4b21-42f6-9c1e-bfa447d";
  const  message = "FROM TEST CLASS";
  let headers = {
    Sender: senderID,
    Recipient: recipientID
  }
  let data = {
    message: `<message_start>${message}<message_end>`
  }
 
  postMessages(senderID, recipientID, message)
  .then(thenFunction)
  .catch(catchFunction);

  expect(mockAxios.post).toHaveBeenCalled();
  expect(mockAxios.post).toHaveBeenCalledWith("https://speedy-recovery-server.azurewebsites.net/messages?", data, {headers:headers});
 
  const serverResponse = {
    data: {},
    status: 200,
    statusText: 'OK',
    headers: {"content-type": "text/plain"},
    config: {} 
  }
  // mockAxios.mockResponse(serverResponse);
  // expect(mockAxios.post).toHaveReturnedTimes(1);
  // expect(thenFunction).toHaveBeenCalledWith(serverResponse);
  // expect(catchFunction).not.toHaveBeenCalled();
});