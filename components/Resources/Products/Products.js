
import Sidebar from "../Sidebar/Sidebar";
import { useState, useEffect } from "react";
import Card from "../cards/Card";
import styles from "./Product.module.css";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/products', {
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const productsArray = Array.isArray(products)? products : [products];

  const filteredItems = productsArray.filter((product) => {
    if (!product ||!product.title) return false;
    return product.title.toLowerCase().indexOf(query.toLowerCase())!== -1;
  });

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredData = (products, selected, query) => {
    let filteredProducts = products;

    if (query) {
      filteredProducts = filteredItems;
    }

    if (selected) {
      filteredProducts = filteredProducts.filter((product) => {
        if (!product) return false;
        return (
          product.categories === selected ||
          product.header === selected ||
          product.types === selected ||
          product.title === selected
        );
      });
    }

    return filteredProducts?.map((product) => {
      if (!product) return null;
      return (
        <Card
          key={Math.random()}
          img={product.previewImageUrl}
          title={product.title}
          types={product.types}
          header={product.header}
          linkToDocument={
            product.linkToDocument && product.linkToDocument!== ""
             ? product.linkToDocument
              : null
          }
          target="_blank"
        />
      );
    });
  };

  useEffect(() => {
    const results = filteredData(products, selectedCategory, query);
    setFilteredProducts(results);
  }, [products, selectedCategory, query]);

  const filteredCount = filteredProducts.length;

  return (
    <div className={styles.product_h}>
      <Sidebar
        handleChange={handleChange}
        query={query}
        handleInputChange={handleInputChange}
      />
      <section className={styles.main_p}>
        <section className={styles.result_card}>
          <h1 className={styles.h1}>
            {error? "Error fetching data" : `${filteredCount} Result`}
          </h1>
        </section>
        <section className={styles.card_container}>
          {error? (
            <p style={{ color: "red" }}>{error}</p>
          ) : (
            <div>{filteredProducts}</div>
          )}
        </section>
      </section>
    </div>
  );
};

export default Products;