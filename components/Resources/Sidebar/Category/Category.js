import Styles from "./Category.module.css";
import Input from "../../cards/Input";

function Category({ handleChange }) {
  return (
    <div>
      <h2 className={Styles.sidebar_title}>Category</h2>

      <div className={Styles.main}>
        <label className={Styles.sidebar_label_container}>
          <input onChange={handleChange} type="checkbox" value="" name="test" />
          <span className={Styles.checkmark}></span>All
        </label>
        <Input 
          handleChange={handleChange}
          className={Styles.input}
          value="Finance"
          title="Finance"
          name="test"
        />
        <Input
          handleChange={handleChange}
          className={Styles.input}
          value="Marketing"
          title="Marketing"
          name="test"
        />
        <Input
          handleChange={handleChange}
          className={Styles.input}
          value="Human Resources"
          title="Human Resources"
          name="test"
        />
        <Input
          handleChange={handleChange}
          className={Styles.input}
          value="Sales"
          title="Sales"
          name="test"
        />
        <Input
          handleChange={handleChange}
          className={Styles.input}
          value="IT"
          title="IT"
          name="test"
        />
        <Input
          handleChange={handleChange}
          className={Styles.input}
          value="Operations"
          title="Operations"
          name="test"
        />
        <Input
          handleChange={handleChange}
          className={Styles.input}
          value="Customer Service"
          title="Customer Service"
          name="test"
        />
        <Input
          handleChange={handleChange}
          className={Styles.input}
          value="Compliance"
          title="Compliance"
          name="test"
        />
      </div>
    </div>
  );
}

export default Category;
