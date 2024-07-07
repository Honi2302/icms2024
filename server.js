const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

const allowedOrigins = ['http://localhost:3000', 'https://my-admin.icms2024.in/admin/onlineBooking', 'https://my-admin.icms2024.in/admin/onlineUser/data/:id'];

app.use(cors({
    origin: allowedOrigins,
    methods: ['POST', 'GET', 'DELETE', 'PUT', 'OPTIONS'],
    credentials: true
}));

app.options('*', (req, res) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.sendStatus(200);
});

// Replace these with your actual email and the newly generated app password
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sarhoneysharma@gmail.com',
        pass: 'vbczvillcrvhmsya'
    }
});

app.post('/send-email', (req, res) => {
    const { title, firstName, middleName, lastName, gender, mobileNumber, address, designation, organization, accomodationNeeded, abstractTitle, PaymentMode, email, theme, dob } = req.body;
    console.log(req.body);

    const mailOptions = {
        from: 'a2phinno@gmail.com',
        to: email,
        subject: 'Thank you for registration for ICMS 2024 event!',
        text: `Hi ${firstName} ${middleName} ${lastName},\n\nThanks ${firstName} ${middleName} ${lastName} for registering with us and booking a seat in the event.\n\nHere is the information submitted by you for booking a seat:\n\nName: ${title} ${firstName} ${middleName} ${lastName}\nGender: ${gender}\nDate Of Birth: ${dob}\nEmail: ${email}\nMobile Number: ${mobileNumber}\nAddress: ${address}\nDesignation: ${designation}\nOrganization: ${organization}\nAccommodation Needed: ${accomodationNeeded}\nAbstract Title: ${abstractTitle}\nAbstract Theme: ${theme}\nPayment Mode: ${PaymentMode}\n\nThanks & Regards,\n\nTeam ICMS.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email sent: ' + info.response);
    });
});

app.post('/payment-approve', (req, res) => {
    const { Firstname, MiddleName, Lastname, PaymentStatus, Email } = req.body;
    console.log(Firstname, MiddleName, Lastname, PaymentStatus, Email);

    const mailOptions = {
        from: 'a2phinno@gmail.com',
        to: Email,
        subject: `Your payment for ICMS 2024 seat booking is ${PaymentStatus}`,
        text: `Hi ${Firstname} ${MiddleName} ${Lastname},\n\nThanks ${Firstname} ${MiddleName} ${Lastname} for showing interest in the ICMS 2024 event.\n\nYour payment against the seat booking is ${PaymentStatus}.\n\nKindly reply to this email for any clarification or queries.\n\nThanks & Regards,\n\nTeam ICMS.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email sent: ' + info.response);
    });
});

app.post('/payment-declined', (req, res) => {
    const { firstName, middleName, lastName, PaymentStatus, email } = req.body;
    console.log(req.body);

    const mailOptions = {
        from: 'a2phinno@gmail.com',
        to: email,
        subject: `Your payment for ICMS 2024 seat booking is ${PaymentStatus}`,
        text: `Hi ${firstName} ${middleName} ${lastName},\n\nThanks ${firstName} ${middleName} ${lastName} for showing interest in the ICMS 2024 event.\n\nYour payment against the seat booking is ${PaymentStatus}.\n\nKindly reply to this email for any clarification or queries.\n\nThanks & Regards,\n\nTeam ICMS.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email sent: ' + info.response);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
