import categoryFormPage from "../new";

export const getServerSideProps = async (ctx) => {
    const res = await fetch('http://localhost:3000/api/categories');
    const categories = await res.json();
  
    return {
      props: {
        categories,
      },
    };
  }

export default categoryFormPage