import { useState } from "react";
import "../../css/product/ProductDetailPage.css"
import { useNavigate } from "react-router-dom";

export default function ProductDetailComponent({product}) {

const [quantity, setQuantity] = useState(1);
const [option, setOption] = useState('');

const navigate = useNavigate();

const total = quantity * product.price + (quantity * product.price >= product.freeShippingPrice ? 0 : product.deliveryFee);    // 배송비 포함 (30,000원 이상 주문시 배송비 무료)

    return (
        <container className="product-info-section">

            <h2>{product.name}</h2>

            <div className="product-details">
                <p>제품명: {product.name}</p>
                <p>판매가: {product.price.toLocaleString()}원</p>
                <p>원산지: {product.country}</p>
                <p>용량: {product.amount}</p>
                <p>배송비: {product.deliveryFee}원 (
                    {product.freeShippingPrice}원 이상 구매 시 무료)</p>
            </div>

            <div className="select-group">
                <label>분쇄:</label>
                <select
                    value={option}
                    onChange={(e) => setOption(e.target.value)}
                >
                    <option value="">- 옵션 선택 -</option>
                    {product.options.map((opt, idx) => (
                    <option key={idx} value={opt}>{opt}</option>
                    ))}
                </select>
            </div>

            <div className="quantity-input">
                <label>수량:</label>
                <input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                /> 개
            </div>

            <div className="total-price">
                총 상품 금액(수량): <strong>{total.toLocaleString()}원</strong> ({quantity}개)
            </div>

            <div className="button-group">
                <button onClick={()=>{navigate("/order",{
                    state: {
                        productId:product.id,
                        productName:product.name,
                        productImage:product.image,
                        productPrice:product.price,
                        quantity,
                        option,
                        total
                      }
                });}}>바로 구매하기</button>
                <button onClick={()=>{navigate("/cart",{
                    state: {
                        productId:product.id,
                        productName:product.name,
                        productImage:product.image,
                        productPrice:product.price,
                        quantity,
                        option,
                        total
                      }
                });}}>장바구니 담기</button>
                <button onClick={()=>{navigate("/mypage/membersave",{
                    state: {
                        productId:product.id,
                        productName:product.name,
                        productImage:product.image,
                        productPrice:product.price
                        
                      }
                });}}>관심상품 등록</button>
            </div>

        </container>
    );
    
}