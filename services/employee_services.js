import Employee from "../models/Employee";
import transporter from "../utils/email/transporter";

export const saveEmployee = async (employee) => {
    const createdEmployee = await Employee.create(employee);
    return createdEmployee;
}

export const saveEmployees = async (employees) => {
    const savedEmployees = await Employee.bulkCreate(employees, {
        validate: true
    })
    return savedEmployees;
}

export const getAllEmployees = async (query) => {

    const offset = parseInt(query.offset);
    const limit = parseInt(query.limit)

    const employees = await Employee.findAndCountAll({
        limit: limit,
        offset: ((offset - 1) * limit),
        order: [["createdAt", "desc"]]
    });
    return employees;

}

export const sendEmail = async (emailData) => {

    const { email, to } = emailData;

    await transporter.sendMail({
        from: "Test user <foo@example.com>", // sender address
        to,
        subject: email.subject,
        text: email.body,

    });
}
