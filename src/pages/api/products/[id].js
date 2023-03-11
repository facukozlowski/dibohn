import { dbConnect } from "@/utils/mongoosefacu";
import Product from "@/models/Productfacu";
import Category from "@/models/Categoryfacu";
import Brand from "@/models/Brandfacu";

dbConnect();

export default async (req, res) => {
  const {
    method,
    body,
    query: { id },
  } = req;

  switch (method) {
    case "GET":
      try {
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ msg: "Product not exist" });

        const category = await Category.findById(product.category_id);
        const brand = await Brand.findById(product.brand_id);

        return res.status(200).json({
          ...product._doc,
          category_name: category.name,
          brand_name: brand.name,
        });
        
      } catch (error) {
        return res.status(500).json({ msg: error.message });
      }
    case "PUT":
      try {
        const products = await Product.findByIdAndUpdate(id, body, {
          new: true,
        });
        if (!products)
          return res.status(404).json({ msg: "Product not exist" });
        return res.status(200).json(products);
      } catch (error) {
        return res.status(500).json({ msg: error.message });
      }
    case "DELETE":
      try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct)
          return res.status(404).json({ msg: "Product not exist" });
        return res.status(204).json();
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      }
    default:
      return res.status(400).json({ msg: "this method is not supported" });
  }
};
