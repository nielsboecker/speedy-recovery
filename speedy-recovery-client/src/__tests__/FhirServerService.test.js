import FetchMock from "jest-fetch-mock";
import FhirServerService from "../service/FhirServerService";
import CapabilityStatement_STU3_allResourcesAvailable
  from "./test_input/fhir_server/FhirExampleCapabilityStatement_STU3_allResourcesAvailable.json";

// Mock fetch()
global.fetch = FetchMock;

beforeEach(() => {
  fetch.resetMocks();
});

test("success when FHIR server is valid", async () => {
  // given
  fetch.mockResponseOnce(JSON.stringify(CapabilityStatement_STU3_allResourcesAvailable));

  // when
  const result = await FhirServerService.checkFhirCapabilityStatement();

  // then
  expect(fetch.mock.calls.length).toEqual(1);
  expect(result).toEqual(CapabilityStatement_STU3_allResourcesAvailable);
});
