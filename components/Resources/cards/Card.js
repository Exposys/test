import Link from "next/link";
import Styles from "../Products/Product.module.css"
const Card = ({ img, title, header, linkToDocument }) => {
  return (
    <>
      <section className={Styles.p_card}>
        <div className={Styles.p_card_details}>
          <h3 className={Styles.p_card_title}>{title}</h3>
        </div>
        <section className={Styles.p_card_heade}>
          <Link
            href={linkToDocument}
            target="_blank" rel="noopener noreferrer"
            className={Styles.navbar_brand}
            activeClassName="active"
          >
            <h3 className={Styles.card_header}>{header}</h3>
          </Link>
        </section>
        <img src={img} alt={title} className={Styles.card_img} />
      </section>
    </>
  );
};

export default Card;
