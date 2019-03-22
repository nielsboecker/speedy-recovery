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

/* This file tests functions in DateUtils*/
import { formatDate, removeArrayDuplicates } from "../../service/Utils";

test("trigger formatDate(mockDate)", () => {
  const mockDate = "2222-12-12";
  const result = formatDate(mockDate);
  const expected = new Date(mockDate).toLocaleString("en-uk");
  expect(result).toEqual(expected);
});

test("trigger formatDate(missingDate)", () => {
  const mockDate = "";
  const result = formatDate(mockDate);
  expect(result).toEqual("Invalid date");
});

test("trigger removeArrayDuplicates without crashing", () => {
  removeArrayDuplicates(["mock", "mock"]);
});

test("trigger removeArrayDuplicates(missingResource) without crashing", () => {
  removeArrayDuplicates();
});
