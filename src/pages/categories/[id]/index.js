import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Confirm, Button, Loader, Grid } from "semantic-ui-react";
import Error from "next/error";

const Category = ({ category, error }) => {
  const [confirm, setConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { query, push } = useRouter();

  const deleteCategory = async () => {
    const { id } = query;
    try {
      await fetch(`http://localhost:3000/api/categories/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const open = () => setConfirm(true);
  const close = () => setConfirm(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteCategory();
    push("/");
    close();
  };

  if (error && error.statusCode)
    return <Error statusCode={error.statusCode} title={error.statusText} />;

  return (
    <Grid
      centered
      verticalAlign="middle"
      columns="1"
      style={{ height: "80vh" }}
    >
      <Grid.Row>
        <Grid.Column textAlign="center">
          <h1>{category.name}</h1>
          <div>
            <Button color="red" onClick={open} loading={isDeleting}>
              Delete
            </Button>
          </div>
        </Grid.Column>
      </Grid.Row>

      {/* Confirm modal */}
      <Confirm
        content={`Are you sure to delete the brand ${category.name}`}
        header="Please confirm"
        open={confirm}
        onConfirm={handleDelete}
        onCancel={close}
      />
    </Grid>
  );
};

export async function getServerSideProps({ query: { id } }) {
  const res = await fetch(`http://localhost:3000/api/categories/${id}`);

  if (res.status === 200) {
    const category = await res.json();

    return {
      props: {
        category,
      },
    };
  }

  return {
    props: {
      error: {
        statusCode: res.status,
        statusText: "Invalid Id",
      },
    },
  };
}

export default Category;