import { Button, Card, Container, Grid } from "semantic-ui-react";
import { useRouter } from "next/router";
import ModalDelete from "./modalDelete";

export default function HomePage({ products }) {
  //Si no existen productos mostrar lo siguiente:
  const router = useRouter();
  if (products.length === 0)
    return (
      <Grid
        centered
        verticalAlign="middle"
        columns={1}
        style={{ heigth: "80vh" }}
      >
        <Grid.Row>
          <Grid.Column textAlign="center" style={{ margin: "200px" }}>
            <h1>No existen productos creados</h1>
            <div>
              <Button primary onClick={() => router.push("/products/new")}>
                Agregar productos
              </Button>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );

  //Si ya existen productos, mostrar lo siguiente:
  return (
    <Container style={{ padding: "20px" }}>
      <Card.Group itemsPerRow={4}>
        {products.map((products) => (
          <Card key={products._id}>
            <Card.Content textAlign="center">
              <Card.Header>{products.name}</Card.Header>
              <p>{products.description}</p>
              <p>{products.category_name}</p>
              <p>{products.brand_name}</p>
            </Card.Content>
            <Card.Content extra textAlign="center">
              <div class="ui buttons" style={{ padding: "0.5rem" }}>
                <button
                  class="ui black basic button"
                  onClick={() => router.push(`/products/${products._id}`)}
                >
                  Ver
                </button>
              </div>
              <div class="ui buttons" style={{ padding: "0.5rem" }}>
                <button
                  class="ui olive basic button"
                  onClick={() => router.push(`/products/${products._id}/edit`)}
                >
                  Editar
                </button>
              </div>

              <ModalDelete products={products} />
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Container>
  );
}

export const getServerSideProps = async (ctx) => {
  const res = await fetch("http://localhost:3000/api/products");
  const products = await res.json();
  return {
    props: {
      products,
    },
  };
};
