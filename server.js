const express=require('express')
const app=express()
const port=5000
const mongoDB=require('./db')

app.get('/',(req,res)=>{
    res.send("Hello world")
})
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","https://deploy-gofood-backend.onrender.com");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})
app.use(express.json())
app.use('/api/',require('./Routes/CreateUser'))
app.use('/api/',require('./Routes/DisplayData'))
app.use('/api/',require('./Routes/OrderData'))

app.listen((port),()=>{
    console.log(`Server is Starting...${port}`)
})

mongoDB()