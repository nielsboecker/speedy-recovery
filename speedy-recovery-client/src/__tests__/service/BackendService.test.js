import mockAxios from 'jest-mock-axios';
import {
    getConversation,
    getMessages,
    postMessages,
    getPractitionerInfo
} from "../../service/BackendService";

test("testing dummy", () =>{
  expect(2+2).toBe(4);
});

// TODO 
// afterEach(() => {
//     // cleaning up the mess left behind the previous test
//     mockAxios.reset();
// });


//  test('Test to Post messages to backend', () =>{
//     let thenFunction = jest.fn();
//     let catchFunction = jest.fn();
//     let senderID = "smart-Practitioner-72080416";
//     let RecipientID = "d0d0cde0-4b21-42f6-9c1e-bfa447d";
//     let message = "Hi i am testing hereeeeeeeeee";
//     postMessages(senderID,RecipientID,message)
//     .then(thenFunction)
//     .catch(catchFunction);
     
    
 
//     expect(mockAxios.post).toHaveBeenCalledWith("https://speedy-recovery-server.azurewebsites.net/messages?",
//      {data: {
//          senderID, 
//          RecipientID,
//          message
//       }});

//       let responseObj = 'server says hello!' ;
//     mockAxios.mockResponse(responseObj);
       
//  });

