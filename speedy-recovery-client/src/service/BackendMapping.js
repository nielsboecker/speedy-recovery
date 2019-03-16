/*
 * Speedy Recovery -- A patient-centred app based on the FHIR standard facilitating communication between paediatric
 * patients, parents and hospital staff
 *
 * Copyright (C) 2019 University College London
 *
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General
 * Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option)
 * any later version.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not,
 * see http://www.gnu.org/license/.
 * */

/* This file defines which mapping function should be used for back-end data based on the type of data being retrieved.
 */

import {
  mapMessagesGOSH,
  mapConversationsGOSH
} from "./BackendMappingAdapterGOSH";

// Based on the type of the back-end data a different mapping function is used
const conversationMap = (conversationResource, id, userList, dbType) => {
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
  // Based on the type of the back-end data a different mapping function is used
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
