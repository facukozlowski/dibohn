import { dbConnect } from "@/utils/mongoosefacu"
import Sale from "@/models/Salefacu";

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
            const sale = await Sale.findById(id);
            if (!sale) return res.status(404).json({ msg: "Sale not exist"});
            return res.status(200).json(sale); 
            } catch (error) {
                return res.status(500).json({ msg: error.message});
            }      
        case "PUT":
            try {
                const sale = await Sale.findByIdAndUpdate(id, body, {
                    new: true,
                });
                if (!sale) return res.status(404).json({ msg: "Sale not exist"});
                return res.status(200).json(sale);
            } catch (error) {
                return res.status(500).json({ msg: error.message});
            }
        case "DELETE":
            try {
                const deletedSale = await Sale.findByIdAndDelete(id);
                if (!deletedSale) return res.status(404).json({msg : "Sale not exist"});
                return res.status(204).json();
            } catch (error) {
                return res.status(400).json({msg: error.message});
            }
            default:
                return res.status(400).json({msg: "this method is not supported"});
    }
};
