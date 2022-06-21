import validateEmployee from "./employee_viewmodel";
import validateEmployeesQuery from "./employees_query_viewmodel";
import validateCSV from "./csv_viewmodel";
import validateEmailData from "./email-viewmodel";

const validators = {
    employeeSchemaValidate: validateEmployee,
    employeesQuerySchemaValidate: validateEmployeesQuery,
    csvSchemaValidate: validateCSV,
    emailDataValidate: validateEmailData
}

export default validators;