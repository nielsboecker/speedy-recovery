import {
  mapMessagesGOSH,
  mapConversationsGOSH
} from "./BackendMappingAdapterGOSH";

const conversationMap = (
  conversationResource,
  id,
  conversationList,
  dbType
) => {
  if (dbType) {
    switch (dbType) {
      case "MySQL":
        return mapConversationsGOSH(
          conversationResource,
          id,
          conversationList
        );
      case "2":
      default:
        console.log("Invalid type of database resource provided: ", dbType);
    }
  }
  console.log("No database type has been supplied");
};

const messageMap = (messageResource, id, dbType) => {
  if (dbType) {
    switch (dbType) {
      case "MySQL":
        return mapMessagesGOSH(messageResource, id);
      case "2":
      default:
        console.log("Invalid type of database resource provided: ", dbType);
    }
  }
  console.log("No database type has been supplied");
};

const setupMessages = messageResource => ({
  position: "right",
  type: "text",
  text: messageResource,
  date: new Date()
});

const getSenderMessageNum = messageResource => {
  let num = 0;
  for (let resource of messageResource) {
    if (resource.position === "right") {
      num++;
    }
  }
  return num;
};

export { conversationMap, messageMap, setupMessages, getSenderMessageNum };
