import { useState, useEffect } from "react";
import { Button, Form, Grid, Loader } from "semantic-ui-react";
import { useRouter } from "next/router";

const newCategory = () => {
  const [newCategory, setNewCategory] = useState({
    name: "",
  });
  const { query, push } = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const getCategory = async () => {
    const res = await fetch("http://localhost:3000/api/categories/" + query.id);
    const data = await res.json();
    setNewCategory({ name: data.name });
  };

  useEffect(() => {
    if (query.id) getCategory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errs = validate();

    if (Object.keys(errs).length) return setErrors(errs);

    setIsSubmitting(true);

    if (query.id) {
      await updateCategory();
    } else {
      await createCategory();
    }

    await push("/");
  };

  const handleChange = (e) =>
    setNewCategory({ ...newCategory, [e.target.name]: e.target.value });

  const validate = () => {
    let errors = {};

    if (!newCategory.name) {
      errors.name = "Name is required";
    }

    return errors;
  };

  const createCategory = async () => {
    try {
      await fetch("http://localhost:3000/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategory),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const updateCategory = async () => {
    try {
      await fetch("http://localhost:3000/api/categories/" + query.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategory),
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
                    value={newCategory.name}
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

export default newCategory;