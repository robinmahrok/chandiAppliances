const nodemailer = require("nodemailer");
const COMMON_NAME = 'Panch Pandav';
const { 
    credentials
} = require('./config/config');


const mailSettings = {
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        
		user: credentials.password.email,
		pass: credentials.password.password,
	
    },

};
let transporter = nodemailer.createTransport(mailSettings);

const mailer = (data, cb) => {
    let mailOptions = {
        from: '"Chandi Appliances and Services" <' + mailSettings.auth.user + '>',
        to: data.email,
        subject: "Feedback",
        html: "<h1>Hello "+data.name+"</h1><p>Thank You for your precious feedback.</p>" // html body
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
console.log(mailSettings.auth.user+"  "+credentials.password.password)

        if (error) {
          console.log(error);
            cb({ status: 1001 });
        } else {
            
            cb({ status: 1000 });
        }
    });
};

const mailer2 = (data, cb) => {

    let mailOptions = {
        from: '"Chandi Appliances and Services" <' + mailSettings.auth.user + ">",
        to: credentials.password.email,
        subject: "Feedback",
        html: "<h1>Sender's Name: "+data.name+"</h1><p>Sender's Email: "+data.email+"</p><p>Sender's Contact No.: "+data.contact+"</p>"+
        "<p>Feedback: <b>"+data.feedback+"</b></p>" // html body
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
            cb({ status: 1001 });
        } else {
            
            cb({ status: 1000 });
        }
    });
};

module.exports={mailer,mailer2};