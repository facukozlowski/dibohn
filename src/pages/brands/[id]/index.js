import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Confirm, Button, Loader, Grid } from "semantic-ui-react";
import Error from "next/error";

const Brand = ({ brand, error }) => {
  const [confirm, setConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { query, push } = useRouter();

  const deleteBrand = async () => {
    const { id } = query;
    try {
      await fetch(`http://localhost:3000/api/brands/${id}`, {
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
    await deleteBrand();
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
          <h1>{brand.name}</h1>
          <div>
            <Button color="red" onClick={open} loading={isDeleting}>
              Delete
            </Button>
          </div>
        </Grid.Column>
      </Grid.Row>

      {/* Confirm modal */}
      <Confirm
        content={`Are you sure to delete the brand ${brand.name}`}
        header="Please confirm"
        open={confirm}
        onConfirm={handleDelete}
        onCancel={close}
      />
    </Grid>
  );
};

export async function getServerSideProps({ query: { id } }) {
  const res = await fetch(`http://localhost:3000/api/brands/${id}`);

  if (res.status === 200) {
    const brand = await res.json();

    return {
      props: {
        brand,
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

export default Brand;