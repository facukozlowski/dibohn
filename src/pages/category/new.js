import { useState, useEffect } from "react";
import { Button, Form, Grid, Loader } from "semantic-ui-react";
import { useRouter } from "next/router";

const Newcategory = () => {
  const [Newcategory, setNewcategory] = useState({
    name: "",
  });
  const { query, push } = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const getcategory = async () => {
    const res = await fetch("http://localhost:3000/api/category/" + query.id);
    const data = await res.json();
    setNewcategory({ name: data.name });
  };

  useEffect(() => {
    if (query.id) getcategory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errs = validate();

    if (Object.keys(errs).length) return setErrors(errs);

    setIsSubmitting(true);

    if (query.id) {
      await updatecategory();
    } else {
      await createcategory();
    }

    await push("/");
  };

  const handleChange = (e) =>
    setNewcategory({ ...Newcategory, [e.target.name]: e.target.value });

  const validate = () => {
    let errors = {};

    if (!Newcategory.name) {
      errors.name = "Name is required";
    }

    return errors;
  };

  const createcategory = async () => {
    try {
      await fetch("http://localhost:3000/api/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Newcategory),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const updatecategory = async () => {
    try {
      await fetch("http://localhost:3000/api/category/" + query.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Newcategory),
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
                    value={Newcategory.name}
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

export default Newcategory;