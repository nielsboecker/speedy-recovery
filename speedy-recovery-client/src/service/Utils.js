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

/* This file contains various utility functions used throughout the codebase.
 */

export const formatDate = date => {
  if (date) {
    return new Date(date).toLocaleString("en-uk");
  }
  return "Invalid date";
};

// Source: https://stackoverflow.com/questions/1353684/detecting-an-invalid-date-date-instance-in-javascript
export const isValidDate = date => {
  return date instanceof Date && !isNaN(date);
};

export const removeArrayDuplicates = (array, field) =>
    array !== undefined
        ? array.reduce(
        (prev, curr) =>
            prev.find(a => a[field] === curr[field])
                ? prev
                : prev.push(curr) && prev,
        []
        )
        : array;
