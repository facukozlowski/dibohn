import { Schema, model, models } from "mongoose";

const saleSchema = new Schema({
    date: {
        type: String,
        required: [true, "name is required"],
        try: true,
    },
    total: {
        type: Number,
        required: [true, "total is required"],
        try: true,
    },
    products:  [{ name: String, product_id:String, cant: String, unitPrice:String }],
        required: [true]
    });

export default models.Sale || model("Sale", saleSchema);