import { Schema, model, models } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        unique: true,
        try: true,
    },
    code: {
        type: String,
        try: true,
    },
    image: {
        type: String,
        try: true,
    },
    description: {
        type: String,
        try: true,
    },
    category_id: {
        type: String,
        required: [true, "category_id is required"]
    },
    brand_id: {
        type: String,
        required: [true, "brand_id is required"]
    }
    });

 export default models.Product || model("Product", productSchema);