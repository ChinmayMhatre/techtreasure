const express = require('express')
const nodemailer = require('nodemailer');
const app = express()
const PORT = process.env.PORT || 5000;
const path = require('path');

//*middleware
app.use(express.static('public'));
app.use(express.json());

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/index.html')
})
app.post('/',(req,res)=>{
    console.log(req.body);

    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'technicaltreasurehunt20@gmail.com',
            pass: 'TechnicalPassword1' 
        }
    })

    const mailOptions = {
        from:'technicaltreasurehunt20@gmail.com',
        to:req.body.email,
        subject : `congratulations ${req.body.answer} is the correct answer`,
        text : 'Here is your next hint',
        html:"<a href='https://s3.us-west-2.amazonaws.com/secure.notion-static.com/0748fe73-9be6-4b83-8a47-d33acdfcbd1a/encrypted_image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210306T044949Z&X-Amz-Expires=86400&X-Amz-Signature=66380b0149214f0747c2b1fdeb769f020c3c02eb0d4e633a7880492fa18bc455&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22encrypted_image.png%22'>click here</a>"
    }

    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            console.log(error);
            res.send('error')
        }else{
            console.log('email send');
            res.send("success")
        }
    })
})

app.listen(PORT,()=>{
    console.log('app running');
})