/* Common functions the whole application will be using
* by Zaki */
const nodemailer = require("nodemailer")


enum EmailCode{
    success,
    bad_format,
    failed_sending,
    other
}
interface MyResponse{
    msg:string,
    code:EmailCode
};

// Email a group of people a message
function email(target: [string], subject: string, body: string): MyResponse {
    const re = /\S+@\S+\.\S+/
    // https://www.w3schools.com/nodejs/nodejs_email.asp
    // Once we have an email server/other shit, we will use this
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '12xx.supersussupersus.xx21@gmail.com',
            pass: '~j5Gfs!:~qOL&Wla6rf>V[$_?'
        }
    });
    target.forEach(emailObj => {
        let _email = emailObj
        if (!re.test(_email)) {
            console.log("WRONG EMAIL FORMAT" + _email, emailObj)
            return { msg: "Wrong Email format", code: EmailCode.success }
        }


        try {
            var mailOptions = {
                from: '12xx.supersussupersus.xx21@gmail.com',
                to: _email,
                subject: subject,
                text: body
            };

            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error, info);
                    return { msg: error + "\n" + info, code: EmailCode.failed_sending }
                } else {
                    console.log('Email sent: ' + info.response, "to ", _email);
                }
            });
        }
        catch (e) {
            console.log(e)
            return { msg: "Other Error has occured:\n" + e, code: EmailCode.other }
        }
    })
    return { msg: "Success", code: EmailCode.success }

}


module.exports = { email, EmailCode };
