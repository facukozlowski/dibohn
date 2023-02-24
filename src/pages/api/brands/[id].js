import { dbConnect } from "@/utils/mongoosefacu"
import Brand from "@/models/Brandfacu"

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
                return res.status(204).json();
            } catch (error) {
                return res.status(400).json({msg: error.message});
            }
            default:
                return res.status(400).json({msg: "this method is not supported"});
    }
};
