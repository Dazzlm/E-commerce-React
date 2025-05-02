import cart from "../../assets/images/icon-cart.svg";
import styles from "./AddCart.module.css";
import { useLocation } from "react-router-dom";
import { useShoesStore } from "../../zustand/shoesStore";

const AddCartButton = ({ productId }) => {
  const cartList = useShoesStore((state) => state.cartList);
  const addCart = useShoesStore((state) => state.addCart);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const quantityURL = parseInt(queryParams.get("quantity")) || 1;
  const item = cartList.find((item) => item.id === productId);
  const quantity = useShoesStore((state) => state.quantity);
  const setQuantity = useShoesStore((state) => state.AddQuantity);

  const handleClick = () => {
    if (item === undefined) {
      addCart(productId, quantityURL || quantity);
      setQuantity(1);
    }
  };

  return (
    <div className={styles["div__AddCart"]}>
      <button
        className={styles["div__AddCart--button"]}
        onClick={handleClick}
        disabled={item !== undefined ? true : false}
      >
        <img
          className={styles["AddCart__button--image"]}
          src={cart}
          alt="cart-icon"
        />

        <span>Add to cart</span>
      </button>
      <p className={styles["alert__message"]}>
        You alredy have this product in your cart, use the pluss and minus
        buttons to change the quantity
      </p>
    </div>
  );
};

export default AddCartButton;
