import {
    getConversation,
    getMessages,
    getPractitionerInfo
} from "../../service/BackendService";

//TODO
 test('Test to fetch Conversations from backend', async() => {      
    const response = await getConversation('smart-Practitioner-72080416');
    expect(response[0]).toHaveProperty('Conversation_Id');       
});