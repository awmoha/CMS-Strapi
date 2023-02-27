import React, { useState, useEffect } from "react";
import { Box, Typography, makeStyles } from "@material-ui/core";
import ProductCard from "../components/ProductCard";
import { fetchCategory, fetchProducts } from "../servis/api";

const useStyles = makeStyles(() => ({
  title: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "90px",
  },
}));
const Home = () => {
  const classes = useStyles();

  const [products, setProducts] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  return (
    <Box>
      <ProductCard products={products} />
    </Box>
  );
};

Home.propTypes = {};

export default Home;
