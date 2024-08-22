import Styles from "./Type.module.css";
import Input from "../../cards/Input";

function Category({ handleChange }) {
  return (
    <div>
      <h2 className={Styles.sidebar_title}>Type</h2>

      <div className={Styles.main}>
        <label className={Styles.sidebar}>
          <input onChange={handleChange} type="checkbox" value="" name="test" />
          <span className={Styles.checkmark}></span>All
        </label>
        <Input
          handleChange={handleChange}
          className={Styles.input}
          value="Report"
          title="Report"
          name="test"
        />
        <Input
          handleChange={handleChange}
          className={Styles.input}
          value="Guide"
          title="Guide"
          name="test"
        />
        <Input
          handleChange={handleChange}
          className={Styles.input}
          value="Policy"
          title="Policy"
          name="test"
        />
      </div>
    </div>
  );
}

export default Category;
