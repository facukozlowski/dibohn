import { dbConnect } from "@/utils/mongoosefacu"
import Category from "@/models/Categoryfacu";
import Product from "@/models/Productfacu";

dbConnect();

export default  async (req, res) => {
    const {
        method,
         body,
          query: {id},
        } = req;
    
    switch(method){
        case "GET":
            try {
            const categories = await Category.findById(id);
            if (!categories) return res.status(404).json({ msg: "Category not exist"});

            const products= await Product.find({categoryId:categories._id});

            return res.status(200).json(categories); 
            } catch (error) {
                return res.status(500).json({ msg: error.message});
            }      
        case "PUT":
            try {
                const categories = await Category.findByIdAndUpdate(id, body, {
                    new: true,
                });
                if (!categories) return res.status(404).json({ msg: "Category not exist"});
                return res.status(200).json(categories);
            } catch (error) {
                return res.status(500).json({ msg: error.message});
            }
        case "DELETE":
            try {
                const deletedCategory = await Category.findByIdAndDelete(id);
                if (!deletedCategory) return res.status(404).json({msg : "Category not exist"});

                    // const products = await Product.find({category_id:id});


                await Product.deleteMany({category_id:id});
          

                return res.status(204).json();
            } catch (error) {
                return res.status(400).json({msg: error.message});
            }
            default:
                return res.status(400).json({msg: "this method is not supported"});
    }
};
