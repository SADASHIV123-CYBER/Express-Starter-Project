const express = require('express');
const cookieParser = require('cookie-parser');

const ServerConfig = require('./config/serverConfig.js');
const connectDB = require('./config/dbConfig.js'); 
const userRouter = require('./routes/userRoute.js');
const cartRouter = require('./routes/cartRouter.js');
const authRouter = require('./routes/authRoute.js');
const { isLoggedIn } = require('./validation/authValidator.js');
const uploader = require('./middlewares/multerMiddleware.js');
const cloudinary = require('./config/cloudinaryConfig.js');
const fs = require('fs/promises');
const productRouter = require('./routes/productRoute.js');

// const User = require('./schema/userSchema.js');

const app = express();

app.use(cookieParser())
app.use(express.json())
app.use(express.text())
app.use(express.urlencoded( {extended: true} ));

// routing middleware
// if your req route starts with /users then handle it using userRouter 
app.use('/users', userRouter); // connects router to the server 
app.use('/carts', cartRouter);
app.use('/auth', authRouter)
app.use('/products', productRouter)

app.get('/ping', (req, res) => {
    console.log(req.body);
    console.log(req.cookies)
    return res.json({message: "pong"})
});

app.post('/photo', uploader.single('incommingFile'), async (req, res) => {
    console.log(req.file);
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log("result from cloudinary", result);
    await fs.unlink(req.file.path);
    return res.json({
        message: 'ok'
    })
});

app.listen(ServerConfig.PORT, async () => {
    await connectDB();
    console.log(`Server started at port ${ServerConfig.PORT}`);
})

