import SmartAuthService from "../service/SmartAuthService";


beforeEach(function() {
  //global.sessionStorage = jest.genMockFunction();
  //global.sessionStorage.setItem = jest.genMockFunction();
  //global.sessionStorage.getItem = jest.genMockFunction();
});

test("start smart authenticated session", () => {
  // Mock SMART on FHIR auth
  const mockFhirAuthCall = jest.fn();
  global.FHIR.oauth2.authorize = mockFhirAuthCall;

  SmartAuthService.startSmartAuthenticatedSession();

  expect(mockFhirAuthCall.mock.calls.length).toBe(1);
  const configParam = mockFhirAuthCall.mock.calls[0][0]; // First param of first function call
  expect(configParam).toHaveProperty("client");
  expect(configParam).toHaveProperty("server");
});

test("on start authetication session callback is registered", () => {
  expect(SmartAuthService.onSmartAuthenticatedSessionReady).toBeInstanceOf(Function);
});


// test("end smart authenticated session", () => {
//   // sessionStorage.accessToken = "foo";
//   // endSmartAuthenticatedSession();
//   expect(sessionStorage).toBe({});
// });
