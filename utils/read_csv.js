import fs from "fs";
import fastCsv from "fast-csv";
import { BadRequest, FailedToParse } from "./errors.js";

const convertCSVToArray = (file) => {
    return new Promise((resolve, reject) => {
        const options = {
            ignoreEmpty: true,
            headers: true,
            // renameHeaders: false,
            // discardUnmappedColumns: false
        };
        const validEntries = [];
        let validRows = 0;
        let invalidRows = 0;
        const mustHaveHeaders = ["First name", "Last name", "Email address"];

        let emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        const readCSVStream = fs.createReadStream(file)
            .pipe(fastCsv.parse(options))
            .on("headers", (headers) => {
                const mustHaveHeaders = ["First name", "Last name", "Email address"];
                const headersContainsMustHave = mustHaveHeaders.every(header => headers.includes(header))
                if (!headersContainsMustHave) {
                    // no need to check other events
                    readCSVStream.destroy();
                    reject(new BadRequest(`CSV file must contain ${mustHaveHeaders.join(" ,")} fields `))
                }

            })
            .transform(data => ({
                firstName: data[mustHaveHeaders[0]],
                lastName: data[mustHaveHeaders[1]],
                email: data[mustHaveHeaders[2]],
            }))
            .validate(data =>
                data.firstName !== "" &&
                data.lastName !== "" &&
                emailPattern.test(data.email)
            )
            .on("data-invalid", () => {
                invalidRows++;
            })
            .on("data", (data) => {
                validRows++;
                validEntries.push(data);
            })
            .on("end", (totalRows) => {
                // delete file after parsing
                fs.unlinkSync(file)
                resolve({ totalRows, validRows, invalidRows, validEntries });
            })
            .on("error", (error) => {
                reject(new FailedToParse(`Failed to parse the file`))
            })

    })
}

export default convertCSVToArray;