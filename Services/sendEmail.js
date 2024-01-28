const Responses = require('../responses');
const nodemailer = require('nodemailer');
const formattedDate = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jerusalem' });

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
        user: process.env.TRANSPORTER_USER,
        pass: process.env.TRANSPORTER_PASS
    },
});

// transporter.verify((err, success) => {
    //     if(err)  return console.log(err);
    
    //     return console.info({email_connected: success})
    // })
    
class SendEmailService {

    constructor() 
    {
        this.timeZone = formattedDate
    }

    async sendEmail(req) {
        try
        {
            const vals = {};
            const subject = 'New Job Message';
            const response = Responses.success;
            const { name, email, message } = req.body;

            const mailDetails = {
                from: email,
                to: process.env.EMAIL_ADDRESS,
                subject: subject,
                text: `Name: ${name}\nMessage: ${message}.\nTimeZone: ${this.timeZone}\nEmail: ${email}`,
            };

            const info = await transporter.sendMail(mailDetails);
            vals.info = info;

            return {...response, ...vals};
        }
        catch(err)
        {
            console.log(err.message);
            return {...Responses.server_error};
        }
    }
}


module.exports = SendEmailService;