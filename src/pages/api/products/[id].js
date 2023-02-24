import { dbConnect } from "@/utils/mongoosefacu"
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
            const products = await Product.findById(id);
            if (!products) return res.status(404).json({ msg: "Product not exist"});
            return res.status(200).json(products); 
            } catch (error) {
                return res.status(500).json({ msg: error.message});
            }      
        case "PUT":
            try {
                const products = await Product.findByIdAndUpdate(id, body, {
                    new: true,
                });
                if (!products) return res.status(404).json({ msg: "Product not exist"});
                return res.status(200).json(products);
            } catch (error) {
                return res.status(500).json({ msg: error.message});
            }
        case "DELETE":
            try {
                const deletedProduct = await Product.findByIdAndDelete(id);
                if (!deletedProduct) return res.status(404).json({msg : "Product not exist"});
                return res.status(204).json();
            } catch (error) {
                return res.status(400).json({msg: error.message});
            }
            default:
                return res.status(400).json({msg: "this method is not supported"});
    }
};
