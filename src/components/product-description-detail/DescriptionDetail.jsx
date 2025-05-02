import styles from "./DescriptionDetail.module.css";
import AddCartButton from "../add-cart-button/AddCartButton.jsx";
import AddQuantity from "../quantity-button/AddQuantity.jsx";
import { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

export default function DescriptionDetail({ productInformation }) {
  return (
    <div className={styles["div__DescriptionDetail"]}>
      <ShowTextDetail productInformation={productInformation} />
      <Price productInformation={productInformation} />
      <div className={styles["div__buttonsContainer"]}>
        <AddQuantity productInformation={productInformation} />
        <AddCartButton productId={productInformation.id} />
      </div>
    </div>
  );
}
export function ShowTextDetail({ productInformation }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const colorURL = queryParams.get("color") || null;
  const quantityURL = parseInt(queryParams.get("quantity")) || 1;
  const [colorSeleccionado, setColorSeleccionado] = useState(colorURL);
  const prodQuntityURL = (newColor) => {
    queryParams.set("color", newColor);
    navigate(`/product/${id}?${queryParams.toString()}`);
  };

  return (
    <div className={styles["div__ShowTextDetail"]}>
      <section className={styles["div__ShowTextDetail--marcaContainer"]}>
        <h3 className={styles["ShowTextDetail__marcaContainer--marca"]}>
          {productInformation.Marca.toUpperCase()}
        </h3>
      </section>

      <section className={styles["div__ShowTextDetail--titleContainer"]}>
        <h1 className={styles["ShowTextDetail__titleContainer--title"]}>
          {productInformation.Nombre}
        </h1>
      </section>

      <section className={styles["div__ShowTextDetail--descriptionContainer"]}>
        <p
          className={
            styles["ShowTextDetail__descriptionContainer--description"]
          }
        >
          {productInformation.Descripcion}
        </p>
      </section>
      <section className={styles["div__ShowTextDetail--colorsContainer"]}>
        {productInformation.colores.map((color, index) => (
          <button
            key={index}
            className={`${styles["colorSelector__dot"]} ${
              colorSeleccionado === color &&
              styles["colorSelector__dot--selected"]
            }`}
            style={{ backgroundColor: color }}
            onClick={() => (setColorSeleccionado(color), prodQuntityURL(color))}
            aria-label={`Seleccionar color ${color}`}
          />
        ))}
      </section>
    </div>
  );
}

export function Price({ productInformation }) {
  const hasDiscount = productInformation.Descuento !== 0;
  return (
    <section className={styles["div__Price--priceContainer"]}>
      <div>
        <h2>
          $
          {(
            productInformation.Precio -
            (productInformation.Descuento / 100) * productInformation.Precio
          ).toFixed(2)}
        </h2>

        {hasDiscount && (
          <p className={styles["prince__priceContainer--discount"]}>
            {productInformation.Descuento}%
          </p>
        )}
      </div>

      {hasDiscount && (
        <p className={styles["prince__priceContainer--fullPrice"]}>
          ${productInformation.Precio.toFixed(2)}
        </p>
      )}
    </section>
  );
}
