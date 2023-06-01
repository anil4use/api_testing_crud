import express, { json } from "express";
// import {getdata} from './routes/ContectRoutes.js'
import env from 'dotenv'
import bodyParser from "body-parser";
import mongoose from 'mongoose'
import {config} from'dotenv'

// import mongoose from 'mongoose'
mongoose.connect("mongodb+srv://anildata:anil4use@cluster0.vuxxvds.mongodb.net/?retryWrites=true", { dbName: "Backend" }).then(() => {
    console.log("mognoDB connetct succesfully")
}).catch(e => {
    console.log(e)
})
config({
    path: ".env"
 })
const PORT = process.env.PORT || 4000;
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())
const proDuctSchema = new mongoose.Schema({
    name: String,
    data:String
});
const Product = new mongoose.model("Prodect", proDuctSchema);
app.post("/api/v1/product/new", async (req, res) => {
    const product = await Product.create(req.body)

    res.status(200).json({
        succuss: true,
        product,
    })
});
app.get("/api/v1/products", async (req, res) => {
    const product = await Product.find()
    res.status(200).json({
        succuss: true,
        product
    })
});
app.put("/api/v1/product/:id", async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ succuss: true, message: "plez id nodt exit" })
    let products = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true, useFindAndModify: true,
        runValidators: true
    }
    );
    res.status(200).json({
        succuss: true,
        products
    });
});
app.delete("/api/v1/product/:id", async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(500).json({
            succuss: false,
            message: "id does not exit"
        })
    }
    product.deleteOne()
    res.status(200).json({
        succuss: true,
        message: "delete"
    })
});
app.listen(PORT, (req, res) => {
    console.log("server is working ")
});

app.get("/", (req, res) => {
    res.send("ok")
})