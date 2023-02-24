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
    Products: {
        
    }
});

export default models.Sale || model("Sale", saleSchema);