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

/* This file tests the functions in BackendMappingExtractionUtils*/
import {
  getPosition,
  getText,
  getTime,
  getUserId,
  getTitle,
  getId,
  getAvatar,
  getAlt,
  getSubtitle,
  getUnread,
  getDate
} from "../../service/BackendMappingExtractionUtils";

const missingField = "Unknown";

test("getPosition(missingResource)", () => {
  const mockResource = {};
  const mockId = "mockId";
  const pos = getPosition(mockResource, mockId);
  expect(pos).toEqual("right");
});

test("getPosition(mockMessageResource)", () => {
  const mockResource = { Recipient: "mockId" };
  const mockId = "mockId";
  const pos = getPosition(mockResource, mockId);
  expect(pos).toEqual("left");
});

test("getText(missingResource)", () => {
  const mockResource = {};
  const text = getText(mockResource);
  expect(text).toEqual(missingField);
});

test("getText(mockMessageResource)", () => {
  const mockMessage = "mockMessage";
  const mockResource = { Message: mockMessage };
  const text = getText(mockResource);
  expect(text).toEqual(mockMessage);
});

test("getTime(missingResource)", () => {
  const mockResource = {};
  const time = getTime(mockResource);
  expect(time).toEqual(missingField);
});

test("getTime(mockMessageResource)", () => {
  const mockResource = { time: "mockTime" };
  getTime(mockResource);
});

test("getUserId(missingResource,mockId)", () => {
  const mockResource = {};
  const mockId = "mockId";
  const id = getUserId(mockResource, mockId);
  expect(id).toEqual(missingField);
});

test("getUserId(mockConversationResource,mockId)", () => {
  const mockResource = { userid1: "mockId", userid2: "mockId2" };
  const mockId = "mockId";
  const id = getUserId(mockResource, mockId);
  expect(id).toEqual("mockId2");
});

test("getUserId(mockConversationResource,mockId)", () => {
  const mockResource = { userid1: "mockId1", userid2: "mockId2" };
  const mockId = "mockId";
  const id = getUserId(mockResource, mockId);
  expect(id).toEqual("mockId1");
});

test("getTitle(missingResource,mockId,mockList)", () => {
  const mockResource = {};
  const mockId = "mockId";
  const mockList = [{}];
  const title = getTitle(mockResource, mockId, mockList);
  expect(title).toEqual(missingField);
});

test("getTitle(mockConversationResource,mockId,mockList)", () => {
  const mockResource = { userid1: "mockId", userid2: "mockId2" };
  const mockId = "mockId";
  const mockList = [{}];
  getTitle(mockResource, mockId, mockList);
});

test("getTitle(mockConversationResource,mockId,mockList)", () => {
  const mockResource = { userid1: "mockId1", userid2: "mockId2" };
  const mockId = "mockId";
  const mockList = [{}];
  getTitle(mockResource, mockId, mockList);
});

test("getTitle(mockConversationResource,mockId,mockList)", () => {
  const mockResource = { userid1: "mockId", userid2: "mockId2" };
  const mockId = "mockId";
  const mockList = [{ id: "mockId2" }];
  getTitle(mockResource, mockId, mockList);
});

test("getTitle(mockConversationResource,mockId,mockList)", () => {
  const mockResource = { userid1: "mockId1", userid2: "mockId2" };
  const mockId = "mockId";
  const mockList = [{ id: "mockId1" }];
  getTitle(mockResource, mockId, mockList);
});

test("getId(missingResource)", () => {
  const mockResource = {};
  const id = getId(mockResource);
  expect(id).toEqual(missingField);
});

test("getId(mockConversationResource)", () => {
  const cid = "mockConversationId";
  const mockResource = { Conversation_Id: cid };
  const id = getId(mockResource);
  expect(id).toEqual(cid);
});

test("getAvatar(missingResource)", () => {
  const mockResource = {};
  getAvatar(mockResource);
});

test("getAvatar(mockConversationResource)", () => {
  const mockResource = { avatar: "mockAvatar" };
  getAvatar(mockResource);
});

test("getAlt(missingResource)", () => {
  const mockResource = {};
  const alt = getAlt(mockResource);
  expect(alt).toEqual(missingField);
});

test("getAlt(mockConversationResource)", () => {
  const mockAlt = "mockAlt";
  const mockResource = { alt: mockAlt };
  const alt = getAlt(mockResource);
  expect(alt).toEqual(mockAlt);
});

test("getSubtitle(missingResource)", () => {
  const mockResource = {};
  const sub = getSubtitle(mockResource);
  expect(sub).toEqual(missingField);
});

test("getSubtitle(mockConversationResource)", () => {
  const mockSubtitle = "mockSubtitle";
  const mockResource = { subtitle: mockSubtitle };
  const sub = getSubtitle(mockResource);
  expect(sub).toEqual(mockSubtitle);
});

test("getUnread(missingResource)", () => {
  const mockResource = {};
  const un = getUnread(mockResource);
  expect(un).toEqual(missingField);
});

test("getUnread(mockConversationResource)", () => {
  const mockUnread = "mockUnread";
  const mockResource = { unread: mockUnread };
  const un = getUnread(mockResource);
  expect(un).toEqual(mockUnread);
});

test("getDate(missingResource)", () => {
  const mockResource = {};
  const d = getDate(mockResource);
  expect(d).toEqual(missingField);
});

test("getDate(mockConversationResource)", () => {
  const mockDate = "1895-11-1";
  const mockResource = { date: mockDate };
  getDate(mockResource);
});
