import { Schema, model, models } from "mongoose";

const brandSchema = new Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        try: true,
    }
});

export default models.Brand || model("Brand", brandSchema);