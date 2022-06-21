import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Employee = db.define("Employees", {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [1, 40],
                msg: "First Name length must be in between 1 and 40 characters"
            }
        }

    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [1, 40],
                msg: "Last Name length must be in between 1 and 40 characters"
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, { freezeTableName: true })

export default Employee;