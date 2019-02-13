# Here is the script for you to sending request to the SMART-FHIR server.
## In the src file there will be two different file. one is post ther other one is delete. use the post you can send a request to the fhir server to create an appointment or etc.
1. the way it create the appointment or other resource type is create a json file under the json folder and write json code inseif the file you jus create
2. you can create a lot of appoinments or other resoucrce to the server at once. the script will post all the json files belongs to the json folder.

## the delete file allows you to delete the resource you create or the resource in the server, but to do that 
you need to know the id for the resource you want to delete and change the resource type and the id in the url section.

## to use the script you need to add all the external jar library  as dependecy to the project.
