import { useState, useEffect } from "react";
import { Button, Form, Grid, Loader } from "semantic-ui-react";
import { useRouter } from "next/router";

const NewProduct = ({ brand, category }) => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    brand_name: "",
    category_name:""
  });
  const { query, push } = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const getProduct = async () => {
    const res = await fetch("http://localhost:3000/api/products/" + query.id);
    const data = await res.json();
    setNewProduct({ name: data.name, description: data.description, brand_name: data.brand_name, category_name: data.category_name });
  };

  useEffect(() => {
    if (query.id) getProduct();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errs = validate();

    if (Object.keys(errs).length) return setErrors(errs);

    setIsSubmitting(true);

    if (query.id) {
      await updateProduct();
    } else {
      await createProduct();
    }

    await push("/");
  };

  const handleChange = (e) =>
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });

  const validate = () => {
    let errors = {};

    if (!newProduct.name) {
      errors.name = "Name is required";
    }
    if (!newProduct.description) {
      errors.description = "Description is required";
    }
    if (!newProduct.brand_name) {
      errors.brand_name = "Brand is required";
    }
    if (!newProduct.category_name) {
        errors.category_name = "Category is required";
      }

    return errors;
  };

  const createProduct = async () => {
    try {
      await fetch("http://localhost:3000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const updateProduct = async () => {
    try {
      await fetch("http://localhost:3000/api/products/" + query.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Grid
      centered
      verticalAlign="middle"
      columns="3"
      style={{ height: "80vh" }}
    >
      <Grid.Row>
        <Grid.Column textAlign="center">
          <div className="form-container">
            <h1>{!query.id ? "Agregar producto" : "Actualizar producto"}</h1>
            <div>
              {isSubmitting ? (
                <Loader active inline="centered" />
              ) : (
                <Form onSubmit={handleSubmit}>
                  <Form.Input
                    error={
                      errors.name
                        ? { content: "Please enter a name", pointing: "below" }
                        : null
                    }
                    label="Name"
                    placeholder="Name"
                    name="Name"
                    onChange={handleChange}
                    value={newProduct.name}
                    autoFocus
                  />
                  <Form.TextArea
                    error={
                      errors.description
                        ? {
                          content: "Please enter a Description",
                          pointing: "below",
                        }
                        : null
                    }
                    label="Description"
                    placeholder="Description"
                    name="description"
                    onChange={handleChange}
                    value={newProduct.description}
                  />
                  <select
                    name="brand"
                    onChange={handleChange}
                    error={
                      errors.brand_name
                        ? { content: "Please choice a brand", pointing: "below" }
                        : null
                    }>
                    <option value="">Select</option>
                    {brand.map(brand => (
                      <option key={brand._id} value={brand._id}>{brand.name}</option>
                    ))}
                  </select>
                  <div class="ui buttons" style={{ padding: "2rem" }}>
                    <button class="ui positive button">Save</button>
                  </div>
                </Form>
              )}
            </div>
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};


export const getServerSideProps = async (ctx) => {
  const res = await fetch('http://localhost:3000/api/brands'); 
  const brand = await res.json()

  return {
    props: {
      brand,
    },
  };
}

export default NewProduct;
