import FhirDataQueryingService from "../../service/FhirDataQueryingService";
import FhirExampleAppointmentsBundleSTU3
  from "../test_input/fhir_resources_stu3/FhirExampleAppointmentsBundleSTU3.json";

test("extracting data from bundle works for valid data", () => {
  // given
  const appointmentsBundle = {
    data: FhirExampleAppointmentsBundleSTU3
  };

  // when
  const result = FhirDataQueryingService.extractResourcesFromBundle(appointmentsBundle);

  // then
  // TODO @Fanbo Add assertions
});

test("extracting data from bundle works for empty data", () => {
  // given
  const appointmentsBundle = {
    data: { total: 0 }
  };

  // when
  const result = FhirDataQueryingService.extractResourcesFromBundle(appointmentsBundle);

  // then
  // TODO @Fanbo Add assertions
});
