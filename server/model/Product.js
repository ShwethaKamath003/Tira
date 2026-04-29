const mongoose=require("mongoose");
const productSchema=new mongoose.Schema(
    {
        name:String,
        price:String,
        category:String,
        description:String,
        file:String
    }
);
const ProductModel=mongoose.model("Products",productSchema);
module.exports=ProductModel;