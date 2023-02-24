import { Schema, model, models } from "mongoose";

const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, "category is required"],
        try: true,
    }
});

export default models.Category || model("Category", categorySchema);