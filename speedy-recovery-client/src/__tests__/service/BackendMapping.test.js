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

/* This file tests the functions in BackendMapping*/
import {
  conversationMap,
  messageMap,
  getSenderMessageNum,
  setupMessages
} from "../../service/BackendMapping";

test("conversationMap(missingResource,mockId,mockList,missingDbType)", () => {
  const mockResource = {};
  const mockId = "mockId";
  const mockList = [{}];
  conversationMap(mockResource, mockId, mockList);
});

test("conversationMap(missingResource,mockId,mockList,wrongDbType)", () => {
  const mockResource = {};
  const mockId = "mockId";
  const mockList = [{}];
  const mockDbType = "2";
  conversationMap(mockResource, mockId, mockList, mockDbType);
});

test("conversationMap(missingResource,mockId,mockList,MySQLDbType)", () => {
  const mockResource = {};
  const mockId = "mockId";
  const mockList = [{}];
  const mockDbType = "MySQL";
  conversationMap(mockResource, mockId, mockList, mockDbType);
});

test("messageMap(missingResource,mockId,missingDbType)", () => {
  const mockResource = {};
  const mockId = "mockId";
  messageMap(mockResource, mockId);
});

test("messageMap(missingResource,mockId,wrongDbType)", () => {
  const mockResource = {};
  const mockId = "mockId";
  const mockDbType = "2";
  messageMap(mockResource, mockId, mockDbType);
});

test("messageMap(missingResource,mockId,MySQLDbType)", () => {
  const mockResource = {};
  const mockId = "mockId";
  const mockDbType = "MySQL";
  messageMap(mockResource, mockId, mockDbType);
});

test("getSenderMessageNum(missingResource)", () => {
  const mockResource = [{}];
  const num = getSenderMessageNum(mockResource);
  expect(num).toEqual(0);
});

test("getSenderMessageNum(mockResource)", () => {
  const mockResource = [{ position: "right" }];
  const num = getSenderMessageNum(mockResource);
  expect(num).toEqual(1);
});

test("getSenderMessageNum(mockResource)", () => {
  const mockResource = [
    { position: "right" },
    { position: "left" },
    { position: "left" },
    { position: "right" },
    { position: "right" }
  ];
  const num = getSenderMessageNum(mockResource);
  expect(num).toEqual(3);
});

test("getSenderMessageNum(mockResource)", () => {
  const mockResource = [{ position: "left" }];
  const num = getSenderMessageNum(mockResource);
  expect(num).toEqual(0);
});

test("setupMessages(missingResource)", () => {
  setupMessages();
});
