import { Product } from "@/types/type";


const ProductDetail = ({product}:{product: Product}) => {
    
  return (
    <div>
      <h1>{product.title}</h1>
      <img src={product.image}/>
      <p>{product.price}</p>
    </div>
  );
};

export default ProductDetail;
