import {
  mapMessagesGOSH,
  mapConversationsGOSH
} from "./BackendMappingAdapterGOSH";

const conversationMap = (
  conversationResource,
  id,
  userList,
  dbType
) => {
  if (dbType) {
    switch (dbType) {
      case "MySQL":
        return mapConversationsGOSH(conversationResource, id, userList);
      case "2":
      default:
        console.log("Invalid type of database resource provided: ", dbType);
    }
  }
  console.log("No database type has been supplied");
};

const messageMap = (messageResource, id, dbType, role, name, title) => {
  if (dbType) {
    switch (dbType) {
      case "MySQL":
        return mapMessagesGOSH(messageResource, id, role, name, title);
      case "2":
      default:
        console.log("Invalid type of database resource provided: ", dbType);
    }
  }
  console.log("No database type has been supplied");
};

const setupMessages = (messageResource, name) => ({
  position: "right",
  type: "text",
  title: name,
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
