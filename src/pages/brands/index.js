import {
  Button,
  Card,
  Container,
  Grid,
  Confirm,
  Loader,
} from "semantic-ui-react";
import { useRouter } from "next/router";
import { useState } from "react";


export default function HomePage({ brands }) {
  const router = useRouter();

  
  //Si no existen marcas creadas, mostrar esto:
  if (brands.legth === 0)
    return (
      <Grid
        centered
        verticalAlign="middle"
        columns={1}
        style={{ heigth: "80vh" }}
      >
        <Grid.Row>
          <Grid.Column textAlign="center">
            <h1>No existen marcas en la base de datos</h1>
            <div>
              <Button primary>Agregar marca</Button>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );

  //Lista de marcas en caso de existir:

  return (
    <Container style={{ padding: "20px" }}>
      <Card.Group itemsPerRow={4}>
        {brands.map((brand) => (
          <Card key={brand._id}>
            <Card.Content textAlign="center">
              <Card.Header>{brand.name}</Card.Header>
            </Card.Content>
            <Card.Content extra textAlign="center">
              <div class="ui buttons" style={{ padding: "0.5rem" }}>
                <button
                  class="ui inverted green button"
                  onClick={() => router.push(`/brands/${brand._id}`)}
                >
                  Ver
                </button>
              </div>
              <div class="ui buttons" style={{ padding: "0.5rem" }}>
                <button
                  class="ui inverted secondary button"
                  onClick={() => {
                    const URL = `/brands/${brand._id}/edit`;
                    router.push(URL);
                  }}
                >
                  Editar
                </button>
              </div>

            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Container>
  );
}

export const getServerSideProps = async (ctx) => {
  const res = await fetch("http://localhost:3000/api/brands");
  const brands = await res.json();

  return {
    props: {
      brands,
    },
  };
};
