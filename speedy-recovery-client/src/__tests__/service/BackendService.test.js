import mockAxios from "jest-mock-axios";
import {
  getConversation,
  getMessages,
  getPractitionerInfo,
  postMessages
} from "../../service/BackendService";
import message from "../test_input/db_resources/Message.json";
import conversation from "../test_input/db_resources/Conversation.json";
import practitionerInfo from "../test_input/db_resources/PractitionerExtra.json";

afterEach(() => {
  // cleaning up after the previous test
  mockAxios.reset();
});

test("Test to GET Conversations from backend", () => {
  const userID = "smart-Practitioner-72080416";
  getConversation(userID);
  expect(mockAxios.get).toHaveBeenCalled();
  expect(mockAxios.get).toHaveBeenCalledWith(
    `https://speedy-recovery-server.azurewebsites.net/conversations?userid=${userID}`
  );

  mockAxios.mockResponse(conversation);
  expect(mockAxios.get).toHaveReturnedTimes(1);
  expect(mockAxios.get).toHaveReturnedWith(
    expect.objectContaining({
      data: conversation
    })
  );
});

test("Test to GET Messages from backend", () => {
  const userId = "smart-Practitioner-72080416";
  const userId2 = "d0d0cde0-4b21-42f6-9c1e-bfa447d";
  getMessages(userId, userId2);

  expect(mockAxios.get).toHaveBeenCalled();
  expect(mockAxios.get).toHaveBeenCalledWith(
    `https://speedy-recovery-server.azurewebsites.net/conversation?userid1=${userId}&userid2=${userId2}`
  );

  mockAxios.mockResponse(message);
  expect(mockAxios.get).toHaveReturnedTimes(1);
  expect(mockAxios.get).toHaveReturnedWith(
    expect.objectContaining({
      data: message
    })
  );
});

test("Test to GET PractitionerExtraInfo from backend", () => {
  const id = "smart-Practitioner-72080416";
  getPractitionerInfo(id);
  expect(mockAxios.get).toHaveBeenCalled();
  expect(mockAxios.get).toHaveBeenCalledWith(
    `https://speedy-recovery-server.azurewebsites.net/practitioners?userid=${id}`
  );

  mockAxios.mockResponse(practitionerInfo);
  expect(mockAxios.get).toHaveReturnedTimes(1);
  expect(mockAxios.get).toHaveReturnedWith(
    expect.objectContaining({
      data: practitionerInfo
    })
  );
});

test("Test to POST Message to backend", () => {
  const senderID = "smart-Practitioner-72080416";
  const recipientID = "d0d0cde0-4b21-42f6-9c1e-bfa447d";
  const message = "FROM TEST CLASS";
  let headers = {
    Sender: senderID,
    Recipient: recipientID
  };
  let data = {
    message: `<message_start>${message}<message_end>`
  };

  postMessages(senderID, recipientID, message);

  expect(mockAxios.post).toHaveBeenCalled();
  expect(mockAxios.post).toHaveBeenCalledWith(
    "https://speedy-recovery-server.azurewebsites.net/messages?",
    data,
    { headers }
  );

  mockAxios.mockResponse();
  expect(mockAxios.post).toHaveReturnedTimes(1);

  expect(mockAxios.post).toHaveReturnedWith(
    expect.objectContaining({
      data: expect.objectContaining({
        status: 200
      })
    })
  );
});
