const expect = import('chai').expect;
const backendService = import('../src/service/BackendService');

describe('Test to fetch data from backend database', () => {
    it('Test to fetch Conversations from backend', async() => {      
        const response = await backendService.getConversation('smart-Practitioner-72080416');
        expect(response).to.be.an('array').that.is.not.empty;
        expect(response[0]).to.have.all.keys(
            'alt','Conversation_Id','userid1', 'userid2', 'subtitle','date','unread'
        );
            
    });

    it('Test to fetch Messages from backend', async() => {
        const response = await backendService.getMessages('smart-Practitioner-72080416');
        expect(response).to.be.an('array').that.is.not.empty;
        expect(response[0]).to.have.all.keys(
            'ID','time','Conversation_Id', 'Sender', 'Recipient','Message'
        );
     
    });
    
    it('Test to fetch PractitionerInfo from backend', async() => {
        const response = await backendService.getPractitionerInfo('smart-Practitioner-72080416')
        expect(response).to.be.an('array').that.is.not.empty;
        expect(response[0]).to.have.all.keys(
          'ID','FavouriteFootballTeam','Hometown', 'FavouriteFood', 'FavouriteAnimal'
        );
    });



});

  


  
  

