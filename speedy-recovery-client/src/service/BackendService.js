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

/* This file contains functionality that carries out the HTTP requests to retrieve data from the database for messaging
and extra practitioner information.
 */

import axios from "axios";

const baseUrl = "https://speedy-recovery-server.azurewebsites.net";

const getConversation = async id => {
  const url = `${baseUrl}/conversations?userid=${id}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log("GET server error: ", error);
  }
};

const getMessages = async (id, id2) => {
  const url = `${baseUrl}/conversation?userid1=${id}&userid2=${id2}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log("GET server error: ", error);
  }
};

const getPractitionerInfo = async id => {
  const url = `${baseUrl}/practitioners?userid=${id}`;
  try {
    return await axios.get(url);
  } catch (error) {
    console.error("GET server error: ", error);
  }
};

const postMessages = async (senderID, recipientID, message) => {
  const url = `${baseUrl}/messages?`;
  const headers = {
    Sender: senderID,
    Recipient: recipientID
  };
  const data = {
    message: `<message_start>${message}<message_end>`
  };

  axios
    .post(url, data, { headers: headers })
    .then(response => console.log("POST server success: ", response))
    .catch(error => console.error("POST server error: ", error));
};

export { getConversation, getMessages, postMessages, getPractitionerInfo };
