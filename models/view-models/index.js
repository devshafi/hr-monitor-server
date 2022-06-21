import validateEmployee from "./employee_viewmodel.js";
import validateEmployeesQuery from "./employees_query_viewmodel.js";
import validateCSV from "./csv_viewmodel.js";
import validateEmailData from "./email-viewmodel.js";

const validators = {
    employeeSchemaValidate: validateEmployee,
    employeesQuerySchemaValidate: validateEmployeesQuery,
    csvSchemaValidate: validateCSV,
    emailDataValidate: validateEmailData
}

export default validators;