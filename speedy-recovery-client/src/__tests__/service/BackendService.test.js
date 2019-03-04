import {
    getConversation,
    getMessages,
    getPractitionerInfo
} from "../../service/BackendService";

 test('Test to fetch Conversations from backend', async() => {    
    const get = jest.fn().mockImplementation((id)=> 
    Promise.resolve({
        status : 200,
        data : [{
            Conversation_Id: 5,
            alt: "alt",
            date: "2019-03-03T21:15:38.000Z",
            subtitle: "ok",
            unread: 2,
            userid1: "smart-Practitioner-72080416",
            userid2: "user8"
        }]
    })
    );  
    const response = await get('smart-Practitioner-72080416');
    console.log("the response is", response);
    expect(response.status).toBe(200);  
    expect(response.data[0].Conversation_Id).toBe(5);
    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith('smart-Practitioner-72080416');
});

test('Test to fetch Messages from backend', async() => {  
    //set up  
    const get = jest.fn().mockImplementation((id1, id2)=> 
    Promise.resolve({
        status : 200,
        data : [{
            Conversation_Id: 9,
            ID: 20,
            Message: "Hi eva",
            Recipient: "user8",
            Sender: "smart-Practitioner-72080416",
            time: "2019-03-01T15:01:46.000Z"
        }]
    })
    );
    //work 
    const response = await get('smart-Practitioner-72080416','user8');
    //console.log("the response is", response);
    //expect
    expect(response.status).toBe(200);  
    expect(response.data[0].Conversation_Id).toBe(9);
    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith('smart-Practitioner-72080416', 'user8');
});

