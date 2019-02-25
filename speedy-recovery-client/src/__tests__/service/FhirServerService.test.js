import FetchMock from "jest-fetch-mock";
import FhirServerService from "../../service/FhirServerService";
import CapabilityStatement_STU3_allResourcesAvailable
  from "../test_input/fhir_server/FhirExampleCapabilityStatement_STU3_allResourcesAvailable.json";
import CapabilityStatement_STU3_PatientResourceMissing
  from "../test_input/fhir_server/FhirExampleCapabilityStatement_STU3_PatientResourceMissing.json";
import CapabilityStatement_STU2_allResourcesAvailable
  from "../test_input/fhir_server/FhirExampleCapabilityStatement_STU2_allResourcesAvailable.json";
import CapabilityStatement_wrongFhirVersion
  from "../test_input/fhir_server/FhirExampleCapabilityStatement_wrongFhirVersion";


// Mock fetch()
global.fetch = FetchMock;

beforeEach(() => {
  fetch.resetMocks();
});

test("success when FHIR server is STU3 (3.0.1)", async () => {
  fetch.mockResponseOnce(
    JSON.stringify(CapabilityStatement_STU3_allResourcesAvailable)
  );

  await expect(
    FhirServerService.checkFhirCapabilityStatement()
  ).resolves.toEqual(CapabilityStatement_STU3_allResourcesAvailable);
  expect(fetch.mock.calls.length).toEqual(1);
});

test("success when FHIR server is DSTU2 (1.0.2)", async () => {
  fetch.mockResponseOnce(
    JSON.stringify(CapabilityStatement_STU2_allResourcesAvailable)
  );

  await expect(
    FhirServerService.checkFhirCapabilityStatement()
  ).resolves.toEqual(CapabilityStatement_STU2_allResourcesAvailable);
  expect(fetch.mock.calls.length).toEqual(1);
});

test("failure when FHIR server lacks support for required resources", async () => {
  fetch.mockResponseOnce(
    JSON.stringify(CapabilityStatement_STU3_PatientResourceMissing)
  );

  await expect(
    FhirServerService.checkFhirCapabilityStatement()
  ).rejects.toEqual("FHIR server requirements not met");
  expect(fetch.mock.calls.length).toEqual(1);
});

test("failure when FHIR server supports wrong version of FHIR standard", async () => {
  fetch.mockResponseOnce(JSON.stringify(CapabilityStatement_wrongFhirVersion));

  await expect(
    FhirServerService.checkFhirCapabilityStatement()
  ).rejects.toEqual("FHIR server requirements not met");
  expect(fetch.mock.calls.length).toEqual(1);
});

test("failure when FHIR server doesn't reply with a valid CapabilityStatement", async () => {
  fetch.mockResponseOnce(42);

  await expect(
    FhirServerService.checkFhirCapabilityStatement()
  ).rejects.toEqual("FHIR server requirements not met");
  expect(fetch.mock.calls.length).toEqual(1);
});

test("failure when FHIR server does not respond (fetch CapabilityStatement fails)", async () => {
  fetch.mockReject(new Error("Fake error message"));

  await expect(
    FhirServerService.checkFhirCapabilityStatement()
  ).rejects.toEqual("FHIR server not responding");
  expect(fetch.mock.calls.length).toEqual(1);
});
