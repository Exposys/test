import Styles from "./Category.module.css";
import Input from "../../cards/Input";
import axios from "axios";
import { useEffect, useState } from "react";

function Category({ handleChange }) {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/resources");
        const data = response.data.documents; 
        setCategories(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchCategories();
  }, []);

  const uniqueCategories = [
    ...new Set(categories.map((category) => category.categories)),
  ];

  return (
    <div>
      <h2 className={Styles.sidebar_title}>Category</h2>

      <div className={Styles.main}>
        <label className={Styles.sidebar_label_container}>
          <input onChange={handleChange} type="checkbox" value="select-all" name="test" id="check_1"/>
          <span className={Styles.checkmark}></span>All
        </label>
        {error ? (
          <p>Error: {error}</p>
        ) : (
          uniqueCategories.map((category, index) => (
            <Input
              key={index}
              handleChange={handleChange}
              className={Styles.input}
              value={category}
              title={category.replace("Ap1ku$-", "")}
              name="test"
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Category;
