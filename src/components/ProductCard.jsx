import { Link } from "react-router-dom";

const ProductCard = ({obj}) => {
    return ( 
        <>
         <Link key={obj.id} to={`/${obj.category}/${obj.id}`}>
                    <div className="rounded-lg px-4 w-3xs border border-red mt-6 flex flex-col items-center justify-center cursor-pointer bg-white">
                      <div className="product-image-container">
                        <img src={obj.img} alt={obj.name} className="product-image" />
                      </div>
                      <p className="mb-4 text-2xl">{obj.name}</p>
                      <p className="mb-4">{obj.price}</p>
                    </div>
         </Link>
        </>
     );
}
 
export default ProductCard;