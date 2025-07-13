const express = require('express');

const ServerConfig = require('./config/serverConfig.js');
const connectDB = require('./config/dbConfig.js'); 
const userRouter = require('./routes/userRoute.js');
const cartRouter = require('./routes/cartRouter.js');
// const User = require('./schema/userSchema.js');

const app = express();

app.use(express.json( ))
app.use(express.text())
app.use(express.urlencoded( {extended: true} ));

// routing middleware
// if your req route starts with /users then handle it using userRouter 
app.use('/users', userRouter); // connects router to the server 
app.use('/carts', cartRouter)

app.post('/ping', (req, res) => {
    console.log(req.body)
    return res.json({message: "pong"})
})

app.listen(ServerConfig.PORT, async () => {
    await connectDB();
    console.log(`Server started at port ${ServerConfig.PORT}`);

    // const newUser = await User.create({
    //     email: 'a@b.com',
    //     password: '123456',
    //     firstName: 'johnathan',
    //     lastName: 'majors',
    //     mobileNumber: '1234567890'
    // });

    // console.log("Created new user");
    // console.log(newUser);

})

// sadashivkale604
// gtSc4T9KrjrArpCa