const nodemailer = require("nodemailer");
const fs = require("fs");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();
const { GMAIL_USER, GMAIL_PASS } = process.env;

console.log("GMAIL_USER", GMAIL_USER);
console.log("GMAIL_PASS", GMAIL_PASS);

/**
 *
 * creds - {name:Aditya, otp:123456}
 * #{name} - Aditya
 * #{otp} - 123456
 */
function replaceContent(content, creds) {
    const allkeysArr = Object.keys(creds);
    allkeysArr.forEach(function (key) {
        content = content.replace(`#{${key}}`, creds[key]);
    });
    return content;
}

async function EmailHelper(templateName, receiverEmail, creds) {
    try {
        const templatePath = path.join(__dirname, "email_Templates", templateName);
        let content = await fs.promises.readFile(templatePath, "utf-8");
        const emailDetails = {
            to: receiverEmail,
            from: `"BMSClone" <${GMAIL_USER}>`,
            subject: "Mail from ScalerShows",
            text: `Hi ${creds.name} this is your reset otp ${creds.otp}`,
            html: replaceContent(content, creds),
        };
        const transportDetails = {
            service: "gmail",
            auth: {
                user: GMAIL_USER,
                pass: GMAIL_PASS,
            },
        };
        const transporter = nodemailer.createTransport(transportDetails);
        await transporter.sendMail(emailDetails);
        console.log("email sent successfully");
    } catch (err) {
        console.error("error is sending email", err);
    }
}

module.exports = EmailHelper;