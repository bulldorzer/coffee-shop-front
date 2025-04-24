import { useEffect, useState } from "react";
import axios from "axios";

const CartComponent = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        axios.get('/api/cart/coffeeBeans')
            .then(res => setCartItems(res.data))
            .catch(err => console.error(err));
    }, []);


    return (
        <div>
            <div>배송상품 ({})</div>
            <div>
                <input type="checkbox" />
                <span>이미지</span>
                <span>상품정보</span>
                <span>판매가</span>
                <span>수량</span>
                <span>배송비</span>
                <span>합계</span>
                <span>적립</span>
                <span>선택</span>
            </div>

            {cartItems.map(item => (
                <div key={item.cartCoffeeBeanId} className="cart-item">
                    <input type="checkbox" />
                    <img src={`/images/${item.imageFile}`} alt={item.name} width="50" />
                    <span>{item.name} ({item.grind_flag ? '분쇄' : '홀빈'})</span>
                    <span>{item.price.toLocaleString()}원</span>
                    <span>{item.qty}</span>
                    <span>무료</span>
                    <span>{(item.price * item.qty).toLocaleString()}원</span>
                    <span>계산예정</span> 
                    <button>삭제</button>
                </div>
            ))}

            <div>
                <span>총 상품 금액</span>
                <span>총 배송비</span>
                <span>총 금액</span>
            </div>

            <div>
                <button>선택 제품 구매</button>
                <button>전체 구매</button>
            </div>
        </div>
    );
}

export default CartComponent; 