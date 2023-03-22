import { useState, useEffect } from "react";
import { Button, Form, Grid, Loader } from "semantic-ui-react";
import { useRouter } from "next/router";


const NewProduct = ( {brands, categories} ) => {
  const [NewProduct, setNewProduct] = useState({
    name: "",
    description: "",
    brand: "",
    category: ""
  });
  const { query, push } = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const getProduct = async () => {
    const res = await fetch("http://localhost:3000/api/products/" + query.id);
    const data = await res.json();
    setNewProduct({ name: data.name, description: data.description, brand: data.brand, category: data.category });
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
    setNewProduct({ ...NewProduct, [e.target.name]: e.target.value });

  const validate = () => {
    let errors = {};

    if (!NewProduct.name) {
      errors.name = "Name is required";
    }
    if (!NewProduct.brand) {
      errors.brands = "Brand is required";
    }
    if (!NewProduct.category) {
      errors.category = "Category is required";
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
        body: JSON.stringify(NewProduct),
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
        body: JSON.stringify(NewProduct),
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
            <h1>{!query.id ? "Agregar nuevo producto" : "Actualizar producto"}</h1>
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
                    name="name"
                    onChange={handleChange}
                    value={NewProduct.name}
                    autoFocus
                  />
                  <Form.TextArea
                    label="Description"
                    placeholder="Description"
                    name="description"
                    onChange={handleChange}
                    value={NewProduct.description}
                  />
                  <select
                    name="brand"
                    onChange={handleChange}
                    error={
                      errors.brands
                        ? { content: "Please select a Brand", pointing: "below" }
                        : null
                    }>
                    <option value="">Brand</option>
                    {brands.map(brand => (
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
  const brands = await res.json();


  return {
    props: {
      brands,
    },
  };
}



export default NewProduct;