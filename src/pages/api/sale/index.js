import { dbConnect } from "@/utils/mongoosefacu";
import Sale from "@/models/Salefacu";

dbConnect();

export default async function handler(req, res){
    const {method, body} = req 
  
    switch (method){
      case "GET":
          try{
              const sale = await Sale.find();
              return res.status(200).json(sale);
          } catch (error) {
              return res.status(500).json({ error: error.message });
          }
  
          case "POST":
              try{
                  const newSale = new Sale(body);
                  const savedSale = await newSale.save();
                  return res.status(201).json(savedSale);
              } catch (error) {
                  return res.status(500).json({ error: error.message });
              }
              
  
      default:
          return res.status(400).json({ msg: "this method is not supported"});
  
    }
  }