import { useParams } from "react-router-dom";
import "./product.scss";
function Product() {
  const { title } = useParams();

  return <div>{title}</div>;
}

export default Product;
