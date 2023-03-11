import { Button, Card, Grid } from "semantic-ui-react";
import { useRouter } from "next/router";

export default function HomePage({ products }) {
  const router = useRouter();

  return (
    <Grid
      centered
      verticalAlign="middle"
      columns="3"
      style={{ height: "80vh" }}
    >
      <Grid.Row>
        <Grid.Column textAlign="center">
          <h1>Dibohn</h1>
          <Grid.Column>
            <Card.Content position="left">
              <div class="ui buttons" style={{ padding: "1rem" }}>
                <button
                  class="ui secondary button"
                  onClick={() => router.push(`/products`)}
                >
                  Productos
                </button>
              </div>
              <div class="ui buttons" style={{ padding: "2rem" }}>
                <button
                  class="ui secondary button"
                  onClick={() => router.push(`/category`)}
                >
                  Categorias
                </button>
              </div>

              <div class="ui buttons" style={{ padding: "2rem" }}>
                <button
                  class="ui secondary button"
                  onClick={() => router.push(`/brands`)}
                >
                  Marcas
                </button>
              </div>

              <div class="ui buttons" style={{ padding: "2rem" }}>
                <button
                  class="ui secondary button"
                  onClick={() => router.push(`/sale`)}
                >
                  Ventas
                </button>
              </div>
            </Card.Content>
          </Grid.Column>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
