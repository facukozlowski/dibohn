import productFormPage from "../new";

export const getServerSideProps = async (ctx) => {
    const res = await fetch('http://localhost:3000/api/products');
    const products = await res.json();
  
    return {
      props: {
        products,
      },
    };
  }

export default productFormPage