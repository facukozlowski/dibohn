import { dbConnect } from "@/utils/mongoosefacu";
import Brand from "@/models/Brandfacu";

dbConnect();

export default async function handler(req, res){
  const {method, body} = req 

  switch (method){
    case "GET":
        try{
            const brands = await Brand.find();
            return res.status(200).json(brands);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }

        case "POST":
            try{
                const newBrand = new Brand(body);
                const savedBrand = await newBrand.save();
                return res.status(201).json(savedBrand);
            } catch (error) {
                return res.status(500).json({ error: error.message });
            }
            

    default:
        return res.status(400).json({ msg: "this method is not supported"});

  }
}