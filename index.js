const express=require('express')
const app=express()

const cors=require('cors')
const connectDB=require('./config/db')


app.use(express.json())
app.use(cors())
require('dotenv').config()



const authRoutes=require('./routes/authRoutes')
const menuRoutes=require('./routes/menuRoutes')
const orderRoutes=require('./routes/orderRoutes')
//const paymentRoutes=require('./routes/paymentRoutes')

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json())

connectDB()

app.use("/api/auth",authRoutes)
app.use("/api/menu",menuRoutes)
app.use("/api/orders",orderRoutes)
//app.use("/api/payment",paymentRoutes)


app.get("/",(req,res)=>{
    res.json({message:"Restaurnat POS Backend Running"})
})

app.use((err,req,res,next)=>{
    console.log("Serverr error",err.message)
    res.status(500).json({message:"Internal Server Error",error:err.message})
})

const port=process.env.port || 5000

app.listen(port,()=>{
    console.log(`server is running at ${port}`)
})