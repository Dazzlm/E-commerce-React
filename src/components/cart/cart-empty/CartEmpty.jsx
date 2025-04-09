import styles from "./CartEmpty.module.css";
import ListCart from "../list-cart/ListCart";
import { useShoesStore } from "../../../zustand/shoesStore";

const CartEmpty = () => {
  const cartList = useShoesStore((state) => state.cartList);
  const isEmpty =
    cartList == undefined || cartList.length == 0 || cartList === null;

  return (
    <div className={styles["cart"]}>
      <div className={styles["cart__header"]}>
        <h4 className={styles["cart__header--title"]}>Cart</h4>
        <hr className={styles["cart__header--line"]} />
      </div>
      <div className={styles["cart__content"]}>
        {isEmpty ? (
          <p className={styles["cart__content--info"]}>Your cart is empty.</p>
        ) : (
          <ListCart listCart={cartList} />
        )}
      </div>
    </div>
  );
};
export default CartEmpty;
