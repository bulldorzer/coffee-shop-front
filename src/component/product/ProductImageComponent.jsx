import "../../css/product/ProductDetailPage.css";

export default function ProductImageComponent({product}) {

    return (
        <div className="product-image-section">
            <img className="product-image" src={`http://localhost:8081/api/coffeeBeans/view/${product.uploadFileNames[0]}`} 
            alt={product.name}/> 
        </div>
    );

}