import { dbConnect } from "@/utils/mongoosefacu";
import Product from "@/models/Productfacu";
import Category from "@/models/Categoryfacu";
import Brand from "@/models/Brandfacu";

dbConnect();

export default async function handler(req, res) {
  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const db_products = await Product.find();

        const products = await Promise.all(
          db_products.map(async (item) => {
            const category = await Category.findById(item.category_id);
            const brand = await Brand.findById(item.brand_id);

            return {
              ...item._doc,
              category_name: category.name,
              brand_name: brand.name,
            };
          })
        );

        return res.status(200).json(products);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }

    case "POST":
      try {
        const newProduct = new Product(body);
        const savedProduct = await newProduct.save();
        return res.status(201).json(savedProduct);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }

    default:
      return res.status(400).json({ msg: "this method is not supported" });
  }
}
