const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express(); 
const PORT = 5000;

app.use(bodyParser.json());

app.options('*', cors());

app.use(cors({
    origin:["https://icms2024-honi2302s-projects.vercel.app"],
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true
}));

// Replace these with your actual email and the newly generated app password
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sarhoneysharma@gmail.com',
        pass: 'vbczvillcrvhmsya'
    }
});

app.post('/send-email', (req, res) => {
    const {title, firstName, middleName, lastName, gender, mobileNumber, address, designation , organization, accomodationNeeded,abstractTitle, PaymentMode,  email, theme, dob } = req.body;
    console.log(req.body)

    const mailOptions = {
        from: 'a2phinno@gmail.com',
        to: email,
        subject: 'Thank you for  registration for ICMS 20024 event!',
        text: `Hi ${firstName} ${middleName} ${lastName},\n\nThanks ${firstName} ${middleName} ${lastName} for registering with us and booking seat in the event.\n\n Here is the information submitted by you for booking Seat \n\n\n\n Name: ${title} ${firstName} ${middleName} ${lastName}\n\n Gender: ${gender} \n\n Date Of Birth: ${dob} \n\n Email:${email} \n\n Mobile Number: ${mobileNumber}\n\n Address: ${address}\n\n Desgisnation : ${designation}\n\n Organization : ${organization} \n\n Accomodation Needed: ${accomodationNeeded}\n\n Abstract Title: ${abstractTitle}\n\n Abstract Theme: ${theme}\n\n Payment Mode: ${PaymentMode} \n\n\n\n Thanks & Regards \n\n Team ICMS.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email sent: ' + info.response);
    });
});



app.post('/payment-approve', (req, res) => {
    const {Firstname, MiddleName, Lastname, PaymentStatus, Email } = req.body;
    console.log(Firstname, MiddleName,Lastname, PaymentStatus,Email)


    const mailOptions = {
        from: 'a2phinno@gmail.com',
        to: Email,
        subject: `Your payment for ICMS 2024 seat Booking is ${PaymentStatus}`,
        text: `Hi ${Firstname} ${MiddleName} ${Lastname},\n\nThanks ${Firstname} ${MiddleName} ${Lastname} for showing interest in ICMS 2024 event\n\n Your payment against the seat booking is ${PaymentStatus} \n\n\n\nKindly reply to this mail for any clarification or queries\n\n\nThanks & Regards \n\n Team ICMS.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
            return res.status(500).send(error.toString());
            
        }
        res.status(200).send('Email sent: ' + info.response);
    });
});

app.post('/payment-declined', (req, res) => {
    const {firstName, middleName, lastName, PaymentStatus, email } = req.body;
    console.log(req.body)

    const mailOptions = {
        from: 'a2phinno@gmail.com',
        to: email,
        subject: `Your payment for ICMS 2024 seat Booking is ${PaymentStatus}`,
        text: `Hi ${firstName} ${middleName} ${lastName},\n\nThanks ${firstName} ${middleName} ${lastName} for showing interest in ICMS 2024 event\n\n Your payment against the seat booking is ${PaymentStatus} \n\n\n\nKindly reply to this mail for any clarification or queries\n\n\nThanks & Regards \n\n Team ICMS.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
            return res.status(500).send(error.toString());
            
        }
        res.status(200).send('Email sent: ' + info.response);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
