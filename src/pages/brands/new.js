import { useState, useEffect } from "react";
import { Button, Form, Grid, Loader } from "semantic-ui-react";
import { useRouter } from "next/router";

const NewBrand = () => {
  const [NewBrand, setNewBrand] = useState({
    name: "",
  });
  const { query, push } = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const getBrand = async () => {
    const res = await fetch("http://localhost:3000/api/brands/" + query.id);
    const data = await res.json();
    setNewBrand({ name: data.name });
  };

  useEffect(() => {
    if (query.id) getBrand();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errs = validate();

    if (Object.keys(errs).length) return setErrors(errs);

    setIsSubmitting(true);

    if (query.id) {
      await updateBrand();
    } else {
      await createBrand();
    }

    await push("/");
  };

  const handleChange = (e) =>
    setNewBrand({ ...NewBrand, [e.target.name]: e.target.value });

  const validate = () => {
    let errors = {};

    if (!NewBrand.name) {
      errors.name = "Name is required";
    }

    return errors;
  };

  const createBrand = async () => {
    try {
      await fetch("http://localhost:3000/api/brands", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(NewBrand),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const updateBrand = async () => {
    try {
      await fetch("http://localhost:3000/api/brands/" + query.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(NewBrand),
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
            <h1>{!query.id ? "Agregar marca" : "Actualizar marca"}</h1>
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
                    value={NewBrand.name}
                    autoFocus
                  />
                  <div class="ui buttons" style={{ padding: "1rem" }}>
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

export default NewBrand;