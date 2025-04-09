import { useShoesStore } from "../../zustand/shoesStore";
import ImageProductDetail from "../../components/product-image-detail/ImageProductDetail";
import DescriptionDetail from "../../components/product-description-detail/DescriptionDetail";
import Style from "../ProductDetail/ProductDetail.module.css";
import { useParams } from "react-router-dom";
await useShoesStore.getState().fetch();

export default function ProductDetail() {
  const { id } = useParams();
  const products = useShoesStore((state) => state.shoes);
  const productInformation = products.find(
    (product) => product.id === parseInt(id)
  );

  return (
    <article className={Style["article__detailView"]}>
      <ImageProductDetail productInformation={productInformation.Imagenes} />
      <DescriptionDetail productInformation={productInformation} />
    </article>
  );
}
