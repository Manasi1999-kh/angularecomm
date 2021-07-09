const express = require('express')
const router = express.Router();
const multer = require('multer')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const mongoose = require('mongoose');
const data = require('../data/products.json')
const User = require('../model/user');
const Address = require('../model/address');
const Products = require('../model/products')
const db = 'mongodb://localhost:27017/angular'

mongoose.connect(db, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Database connected');
    }
})

router.get('/products', (req, res) => {
    res.send(data);
})

// http://localhost:5000/api/products/1
router.get('/products/:id', (req, res) => {
    console.log(req.params.id);
    let item = data.products.filter((element) => element.id === parseInt(req.params.id))
    console.log(item);
    res.send(item)
})

router.post('/signup', (req, res) => {
    let userData = req.body;
    User.findOne({ email: userData.email }, (err, user) => {
        if (err) {
            console.log(err)
        }
        console.log(user)
        if (user) {
            res.status(401).send('Email already present')// need to check
        } else {
            console.log(userData)
            let user = new User(userData);
            user.save((err, result) => {
                if (err) {
                    console.log(err)
                }
                if (result) {
                    async function main() {
                        // Generate test SMTP service account from ethereal.email
                        // Only needed if you don't have a real mail account for testing
                        // let testAccount = await nodemailer.createTestAccount();

                        // create reusable transporter object using the default SMTP transport
                        let transporter = nodemailer.createTransport({
                            host: "smtp.gmail.com",
                            port: 587,
                            secure: false, // true for 465, false for other ports
                            auth: {
                                user: 'manasikhankari757@gmail.com', // generated ethereal user
                                pass: '7797428622', // generated ethereal password
                            },
                        });

                        // send mail with defined transport object
                        let info = await transporter.sendMail({
                            from: '"E-com" <manasikhankari757@gmailcom>', // sender address
                            to:userData.email,
                            subject: "welcome to H&M ✔", // Subject line
                            text: "Hello world?", // plain text body
                            html: "<b>Thank you for registering in our website , hope you have a good day!!! </b>", // html body
                        });
                        console.log("Message sent: %s", info.messageId);
                        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

                        // Preview only available when sending through an Ethereal account
                        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
                    }

                    main().catch(console.error);


                    res.status(200).send({ result });
                }
            })
        }
    })
})

router.post('/login', (req, res) => {
    let userData = req.body;

    User.findOne({ email: userData.email }, (err, user) => {
        if (err) {
            console.log(err);
        }
        console.log(user);
        if (!user) {
            res.status(401).send('Invalid email');
        } else {
            if (user.password !== userData.password) {
                res.status(401).send('Password incorect')
            } else {
                let payload = { subject: user._id }
                let token = jwt.sign(payload, 'secretKey')
                res.status(200).send({ token: token, user: user })
            }
        }
        // if(user)
    })
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload')
    },
    filename: function (req, file, cb) {
        const mimeType = file.mimetype.split('/');
        const fileType = mimeType[1];
        const fileName = file.originalname + '.' + fileType;
        cb(null, fileName)
    }
})

const upload = multer({ storage: storage }).single('image')



router.put('/upload/:id', upload, (req, res) => {
    const image = `http://localhost:5000/upload/${req.file.filename}`
    User.findByIdAndUpdate(req.params.id, { image: image }, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).send(result)
        }
    })
})


router.get('/userProfile/:id', (req, res) => {
    User.findById(req.params.id, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send(result);
        }
    })
})


router.put('/update/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        pincode: req.body.pincode,
        dob: req.body.dob,
        locality: req.body.locality,
        gender: req.body.gender
    }, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).send(result);
        }
    })
})


router.post('/address/:id', (req, res) => {
    let user_id = req.params.id
    // let address = req.body;
    let addressData = new Address({
        user_id: user_id,
        fname: req.body.fname,
        lname: req.body.lname,
        address: req.body.address,
        pincode: req.body.pincode,
        locality: req.body.locality
    })
    addressData.save((err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send(result)
        }
    })
})


router.post('/orderProducts', (req, res) => {
    console.log(req.body)
    let productsData = new Products(req.body)
    productsData.save((err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send(result);
        }
    })
})
router.get('/orderedProducts/:id', (req, res) => {
    Products.find({ user_id: req.params.id }, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            if (result) {
                res.status(200).send(result);
            } else {
                res.status(401).send('ERROR')
            }
        }
    })
    
})


module.exports = router;