import Sidebar from "../Sidebar/Sidebar";
import { useState, useEffect, useCallback } from "react";
import Card from "../cards/Card";
import styles from "./Product.module.css";
import axios from "axios";

const Products = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = "/api/resources";

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(apiUrl);

      if (response.data && Array.isArray(response.data.documents)) {
        setProducts(response.data.documents);
      } else {
        setError("Unexpected data format.");
      }
    } catch (error) {
      setError("Error fetching data. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };
  const handleChange = (event) => {
    const value = event.target.value;
    const checked = event.target.checked;

    if (checked) {
      setSelectedCategories([...selectedCategories, value]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((category) => category !== value)
      );
    }
  };
  const filteredItems = products.filter(
    (product) =>
      product.title.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      product.types.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  const filteredData = (products, selectedCategories, query) => {
    let filteredProducts = products;
    // Filter by query if present
    if (query) {
      filteredProducts = products.filter(
        (product) =>
          product.title.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
          product.types.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    }

    // Filter by category if selected
    if (selectedCategories.length > 0) {
      const types = [...new Set(products.map((product) => product.types))];
      const categories = [
        ...new Set(products.map((product) => product.categories)),
      ];
      const selectedTypes = types.filter((type) =>
        selectedCategories.includes(type)
      );
      const selectedCategoriesFilter = categories.filter((category) =>
        selectedCategories.includes(category)
      );

      if (
        selectedCategories.includes("select-all") &&
        selectedCategories.includes("types") &&
        selectedCategories.includes("categories")
      ) {
        filteredProducts = products;
      } else if (selectedCategories.includes("select-all")) {
        filteredProducts = products;
      } else if (
        selectedTypes.length > 0 &&
        selectedCategoriesFilter.length === 0
      ) {
        filteredProducts = filteredProducts.filter((product) => {
          return selectedTypes.includes(product.types);
        });
      } else if (
        selectedTypes.length > 0 &&
        selectedCategoriesFilter.length > 0
      ) {
        filteredProducts = filteredProducts.filter((product) => {
          return (
            selectedTypes.includes(product.types) &&
            selectedCategoriesFilter.some(
              (category) => product.categories === category
            )
          );
        });
      } else {
        filteredProducts = filteredProducts.filter((product) => {
          return selectedCategories.some((category) => {
            return (
              product.categories === category ||
              product.header === category ||
              product.types === category ||
              product.title === category
            );
          });
        });
      }
    }

    // Additional conditions
    if (
      selectedCategories.includes("select-all") &&
      selectedCategories.length > 1
    ) {
      filteredProducts = filteredProducts.filter((product) => {
        return selectedCategories.some((category) => {
          return (
            product.categories === category ||
            product.header === category ||
            product.types === category ||
            product.title === category
          );
        });
      });
    }

    if (selectedCategories.includes("types") && selectedCategories.length > 1) {
      filteredProducts = filteredProducts.filter((product) => {
        return selectedCategories.some((category) => {
          return product.types === category || true;
        });
      });
    }

    if (
      selectedCategories.includes("categories") &&
      selectedCategories.length > 1
    ) {
      filteredProducts = filteredProducts.filter((product) => {
        return selectedCategories.some((category) => {
          return product.categories === category || true;
        });
      });
    }

    // Check if both "all" from types and categories are selected
    if (
      selectedCategories.includes("select-all") &&
      selectedCategories.length === 1
    ) {
      filteredProducts = products;
      const checkboxes = document.querySelectorAll("#check_1");
      checkboxes.forEach((checkbox) => {
        checkbox.checked = true;
      });
    }

    return filteredProducts.map(
      ({ previewImageUrl, title, types, header, linkToDocument }) => (
        <Card
          key={Math.random()}
          img={previewImageUrl}
          title={title}
          types={types}
          header={header}
          linkToDocument={
            linkToDocument && linkToDocument !== "" ? linkToDocument : null
          }
          target="_blank"
        />
      )
    );
  };
  const results = filteredData(products, selectedCategories, query);

  const filteredCount = results.length;

  return (
    <>
      <div className={styles.product_h}>
        <Sidebar
          handleChange={handleChange}
          query={query}
          handleInputChange={handleInputChange}
        />
        <section className={styles.main_p}>
          <section className={styles.result_card}>
            {loading ? (
              <h1 className={styles.h1}>Loading...</h1>
            ) : error ? (
              <h1 className={styles.h1}>{error}</h1>
            ) : (
              <h1 className={styles.h1}>
                {filteredCount} Result{filteredCount !== 1 ? "s" : ""}
              </h1>
            )}
          </section>
          <section className={styles.card_container}>{results}</section>
        </section>
      </div>
    </>
  );
};

export default Products;
