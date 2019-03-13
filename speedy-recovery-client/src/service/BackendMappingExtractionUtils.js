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

/* This file contains functions used to help map data from our database into our internal format.
 */

const missingField = "Unknown";
const getPosition = (messageResource, id) => {
  if (
    messageResource &&
    messageResource.Recipient &&
    messageResource.Recipient === id
  ) {
    return "left";
  }
  return "right";
};

const getText = messageResource => {
  if (messageResource && messageResource.Message) {
    return messageResource.Message;
  }
  return missingField;
};

const getTime = messageResource => {
  if (messageResource && messageResource.time) {
    return new Date(messageResource.time);
  }
  return missingField;
};

const getUserId = (conversationResource, id) => {
  if (
    conversationResource &&
    conversationResource.userid1 &&
    conversationResource.userid2
  ) {
    if (conversationResource.userid1 === id) {
      return conversationResource.userid2;
    }
    return conversationResource.userid1;
  }
  return missingField;
};

const getTitle = (conversationResource, id, conversationList) => {
  if (
    conversationResource &&
    conversationResource.userid1 &&
    conversationResource.userid2 &&
    conversationList
  ) {
    if (conversationResource.userid1 === id) {
      for (let conversation of conversationList) {
        if (conversation.id === conversationResource.userid2) {
          return conversation.name;
        }
      }
    } else {
      for (let conversation of conversationList) {
        if (conversation.id === conversationResource.userid1) {
          return conversation.name;
        }
      }
    }
  }
  return missingField;
};

const getId = conversationResource => {
  if (conversationResource && conversationResource.Conversation_Id) {
    return conversationResource.Conversation_Id;
  }
  return missingField;
};

const getAvatar = conversationResource => {
  if (conversationResource && conversationResource.avatar) {
    return "https://institutogoldenprana.com.br/wp-content/uploads/2015/08/no-avatar-25359d55aa3c93ab3466622fd2ce712d1.jpg";
  }
  return "https://institutogoldenprana.com.br/wp-content/uploads/2015/08/no-avatar-25359d55aa3c93ab3466622fd2ce712d1.jpg";
};

const getAlt = conversationResource => {
  if (conversationResource && conversationResource.alt) {
    return conversationResource.alt;
  }
  return missingField;
};

const getSubtitle = conversationResource => {
  if (conversationResource && conversationResource.subtitle) {
    return conversationResource.subtitle;
  }
  return missingField;
};

const getUnread = conversationResource => {
  if (conversationResource && conversationResource.unread) {
    return conversationResource.unread;
  }
  return missingField;
};

const getDate = conversationResource => {
  if (conversationResource && conversationResource.date) {
    return new Date(conversationResource.date);
  }
  return missingField;
};

export {
  getPosition,
  getText,
  getDate,
  getTime,
  getTitle,
  getId,
  getAvatar,
  getAlt,
  getSubtitle,
  getUnread,
  getUserId
};
