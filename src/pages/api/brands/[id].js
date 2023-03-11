import { dbConnect } from "@/utils/mongoosefacu"
import Brand from "@/models/Brandfacu"
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
            const brands = await Brand.findById(id);
            if (!brands) return res.status(404).json({ msg: "Brand not exist"});

            const products= await Product.find({brandId:brands._id});


            return res.status(200).json(brands); 
            } catch (error) {
                return res.status(500).json({ msg: error.message});
            }      
        case "PUT":
            try {
                const brands = await Brand.findByIdAndUpdate(id, body, {
                    new: true,
                });
                if (!brands) return res.status(404).json({ msg: "Brand not exist"});
                return res.status(200).json(brands);
            } catch (error) {
                return res.status(500).json({ msg: error.message});
            }
        case "DELETE":
            try {
                const deletedBrand = await Brand.findByIdAndDelete(id);
                if (!deletedBrand) return res.status(400).json({msg : "Brand not exist"});

                  // const products = await Product.find({brand_id:id});

          await Product.deleteMany({brand_id:id});
          
          
          /* Promise.all(
              products.map(async (item)=> {

                const brand = await Product.findByIdAndDelete(item._id);   
              })
            ); */

                return res.status(204).json();
            } catch (error) {
                return res.status(400).json({msg: error.message});
            }
            default:
                return res.status(400).json({msg: "this method is not supported"});
    }
};
