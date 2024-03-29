import { Menu, Container, Button } from "semantic-ui-react";
import { useRouter } from "next/router";
import Link from 'next/link'

export const Navbar = () => {


  const router = useRouter();

  return (
    <Menu inverted borderless attached>
      <Container>
       <Menu.Item>
          <Link href= "/" >
          <img src="/logo" />
          </Link>
        </Menu.Item>
        <Menu.Menu position="right">
            <Menu.Item>
            <button class="ui inverted button" onClick={() => router.push('/products/new')}>Agregar nuevo producto</button>
            </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
};
