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

/* This file tests the extraction of data from a resource bundle when querying a FHIR server for resources*/

import FhirDataQueryingService from "../../service/FhirDataQueryingService";
import FhirExampleAppointmentsBundleSTU3 from "../test_input/fhir_resources_stu3/FhirExampleAppointmentsBundleSTU3.json";

test("extracting data from bundle works for valid data", () => {
  // given
  const appointmentsBundle = {
    data: FhirExampleAppointmentsBundleSTU3
  };

  // when
  const result = FhirDataQueryingService.extractResourcesFromBundle(
    appointmentsBundle
  );

  // then
  expect(result).toMatchSnapshot();
});

test("extracting data from bundle works for empty data", () => {
  // given
  const appointmentsBundle = {
    data: { total: 0 }
  };

  // when
  const result = FhirDataQueryingService.extractResourcesFromBundle(
    appointmentsBundle
  );

  // then
  expect(result).toEqual([]);
});

test("get practitioner data", () => {
  const practId = "mock";
  const familyName = "mock";
  FhirDataQueryingService.getPractitioner(practId, familyName);
});
