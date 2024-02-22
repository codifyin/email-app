const express = require('express'); 
const path = require('path');
const nodemailer = require('nodemailer'); 
const dotenv = require('dotenv');
dotenv.config( {path: './.env'} );
const multer = require('multer');

const app = express(); 

const PORT = process.env.PORT || 3000; 

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); 
app.use(express.json());

// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/app.html')); 
});

app.post('/', upload.single('attachment'), async (req, res) => { 
    console.log(req.body); 



    const transport = nodemailer.createTransport({ 
        service: 'gmail',
        auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        }
    });

   const attachment = req.file;
   console.log(attachment);
   let mailOptions;
   if(attachment){
      mailOptions = { 
        from: process.env.EMAIL_USER,
        to: req.body.email,
        subject: `Message for ${req.body.email} ${req.body.subject}`,
        text: req.body.message,
        attachments: [
            {  
                filename: attachment.originalname,
                content: attachment.buffer
            }
        ]
    };
   }else{
       mailOptions = { 
        from: process.env.EMAIL_USER,
        to: req.body.email,
        subject: `Message for ${req.body.email} ${req.body.subject}`,
        text: req.body.message,
    };
   }

    await transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error); 
            res.send(error);
        } else {
            console.log('Email sent: ' + info.response); 
            res.send('SUCCESS');
        }
    });
});

app.listen(PORT, () => { 
    console.log(`app listening on port ${PORT}`);
});
