import brandFormPage from "../new";

export const getServerSideProps = async (ctx) => {
    const res = await fetch('http://localhost:3000/api/brands');
    const brands = await res.json();
  
    return {
      props: {
        brands,
      },
    };
  }

export default brandFormPage