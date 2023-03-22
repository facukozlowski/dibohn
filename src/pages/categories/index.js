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
import ModalDelete from "./modalDelete";



export default function HomePage({ categories }) {
  const router = useRouter();


  
  //Si no existen categorias creadas, mostrar esto:
  if (categories.legth === 0)
    return (
      <Grid
        centered
        verticalAlign="middle"
        columns={1}
        style={{ heigth: "80vh" }}
      >
        <Grid.Row>
          <Grid.Column textAlign="center">
            <h1>No existen categorias en la base de datos</h1>
            <div>
              <Button primary>Agregar categoria</Button>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );

  //Lista de categorias en caso de existir:

  return (
    <Container style={{ padding: "20px" }}>
      <Card.Group itemsPerRow={4}>
        {categories.map((category) => (
          <Card key={category._id}>
            <Card.Content textAlign="center">
              <Card.Header>{category.name}</Card.Header>
            </Card.Content>
            <Card.Content extra textAlign="center">
              <div class="ui buttons" style={{ padding: "0.5rem" }}>
                <button
                  class="ui black basic button"
                  onClick={() => router.push(`/categories/${category._id}`)}
                >
                  Ver
                </button>
              </div>
              <div class="ui buttons" style={{ padding: "0.5rem" }}>
                <button
                  class="ui olive basic button"
                  onClick={() => {
                    const URL = `/categories/${category._id}/edit`;
                    router.push(URL);
                  }}
                >
                  Editar
                </button>
              </div>
              <ModalDelete category={category} />
              

            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Container>
  );
}

export const getServerSideProps = async (ctx) => {
  const res = await fetch("http://localhost:3000/api/categories");
  const categories = await res.json();

  return {
    props: {
      categories,
    },
  };
};
