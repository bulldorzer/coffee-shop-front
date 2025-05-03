import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useMemberInfo from "../../hook/useMemberInfo";
import "../../css/cart/CartPage.css";

const CartComponent = () => {
    const [cartItems, setCartItems] = useState([]); // 장바구니 아이템 상태 관리

    const navigate = useNavigate();

    // useMemberInfo 훅을 사용하여 로그인한 회원 정보 가져오기
    const { member, loading } = useMemberInfo();

    // 체크박스 전체 선택/해제
    const [selectedItems, setSelectedItems] = useState([]);
    const allSelected = selectedItems.length === cartItems.length && cartItems.length > 0;

    // 개별 체크박스 변경 함수
    const handleSelectItem = (id) => {
        setSelectedItems(prev =>
            prev.includes(id)
                ? prev.filter(itemId => itemId !== id)
                : [...prev, id]
        );
    };

    // 전체 선택 토글 함수
    const handleSelectAll = () => {
        if (allSelected) {
            setSelectedItems([]);
        } else {
            setSelectedItems(cartItems.map(item => item.cartCoffeeBeanId));
        }
    };

    // 삭제 요청 함수
    const handleDeleteCartItem = async (cartId, coffeeBeanId) => {
        console.log("커피id: ", coffeeBeanId)
        const token = localStorage.getItem("accessToken");
        if (!token) return;

        try {
            await axios.delete("http://localhost:8081/api/cart/item", {
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                params: {
                    cartId,
                    coffeeBeanId
                }
            });

            setCartItems(prevItems =>
                prevItems.filter(item => item.coffeeBeanId !== coffeeBeanId)
            );
        } catch (error) {
            console.error("아이템 삭제 실패:", error);
        }
    };

    useEffect(() => {
        
        
        if (!loading) {
            // console.log("회원정보: ", member.email);
            const token = localStorage.getItem("accessToken");
            
            if (!token) return;
        
            const email = member.email; // useMemberInfo 훅에서 가져온 이메일
        
            axios.get(`http://localhost:8081/api/cart/items?email=${email}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
            })
            .then(res => {
            console.log("장바구니 데이터:", res.data); // 콘솔에 데이터 출력
            setCartItems(res.data);
            })
            .catch(err => console.error("장바구니 데이터 요청 오류:", err));
        }
        
    }, [member, loading]);

    const handleQtyAndGrindFlagChange = (cartCoffeeBeanId, newQty, newGrindFlag) => {
        axios.put('http://localhost:8081/api/cart/changeOption', {
            cartCoffeeBeanId,
            qty: newQty,          // 수량
            grindFlag: newGrindFlag  // 분쇄 여부
        })
        .then(() => {
            setCartItems(prevItems => prevItems.map(item =>
                item.cartCoffeeBeanId === cartCoffeeBeanId
                    ? { ...item, qty: newQty, grindFlag: newGrindFlag }
                    : item
            ));
        })
        .catch((err) => {
            console.error("수량 및 분쇄 여부 변경 요청 실패", err);
        });
    };
    

    // 마일리지 계산
    const calculateMileage = (price, qty, memberShip) => {
        const totalPrice = price * qty;
        let rate = 0;

        switch (memberShip) {
            case "VIP":
                rate = 0.02;
                break;
            case "Gold":
                rate = 0.012;
                break;
            case "Silver":
                rate = 0.007;
                break;
            case "Bronze":
            default:
                rate = 0.005;
        }

        return Math.floor(totalPrice * rate);
    };

    // 총 상품 금액 계산
    const totalProductPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

    // 배송비: 3만원 이상이면 무료, 아니면 3000원
    const deliveryFee = totalProductPrice >= 30000 ? 0 : 3000;

    // 결제 예정 금액
    const totalPrice = totalProductPrice + deliveryFee;

    const handlePurchaseSelected = () =>{
        console.log("전체 cartItems:", cartItems);
        console.log("선택된 ID 목록:", selectedItems);

        const selectedCartItems = cartItems.filter(item =>
            selectedItems.includes(item.cartCoffeeBeanId)
        );

        if (selectedCartItems.length === 0) {
            alert("선택된 상품이 없습니다.");
            return;
        }

        console.log("선택된 항목:", selectedCartItems);
        navigate("/order", {
            state: {
                selectedCartItems: selectedCartItems, // 선택된 장바구니 아이템, 배열
                deliveryFee,       // 배송비
                productPrice: totalProductPrice, // 총 상품 금액
                total: totalPrice,        // 총 결제 금액
            }
        });
    }

    return (
        <div className="cart-container">
            <div className="cart-header">
                <input type="checkbox" checked={allSelected} onChange={handleSelectAll} />
                <span className="cart-img">이미지</span>
                <span>상품정보</span>
                <span>판매가</span>
                <span>수량</span>
                <span>합계</span>
                <span>적립</span>
                <span>선택</span>
            </div>

            {cartItems.map(item => (
                <div key={item.cartCoffeeBeanId} className="cart-item">
                    <input
                        type="checkbox"
                        checked={selectedItems.includes(item.cartCoffeeBeanId)}
                        onChange={() => handleSelectItem(item.cartCoffeeBeanId)}
                    />
                    <div className="product-image">
                        <img src={`/images/${item.imageFile}`} alt={item.name} />
                    </div>
                    <div className="product-info">
                        <span>{item.name}</span>
                        <label className="grind-checkbox-label"> 분쇄 여부
                        <input
                            type="checkbox"
                            checked={item.grindFlag}  // 체크 여부를 grindFlag 값에 따라 결정
                            onChange={(e) => handleQtyAndGrindFlagChange(
                                item.cartCoffeeBeanId,  // 해당 cartCoffeeBeanId
                                item.qty,                // 현재 수량 유지
                                e.target.checked         // 체크박스 상태 (true/false)
                            )}
                        />
                        </label>
                    </div>

                    <span>{item.price.toLocaleString()}원</span>

                    <div className="qty-and-grind">
                    <input
                        type="number"
                        value={item.qty}
                        min="1"
                        max="100"
                        onChange={(e) => handleQtyAndGrindFlagChange(
                            item.cartCoffeeBeanId,  // 해당 cartCoffeeBeanId
                            e.target.value,         // 새로운 수량
                            item.grindFlag          // 기존 grindFlag
                        )}
                    />
                    </div>

                    <span>{(item.price * item.qty).toLocaleString()}원</span>
                    <span>{calculateMileage(item.price, item.qty, item.memberShip).toLocaleString()}원</span>
                    <button onClick={() => handleDeleteCartItem(item.cartId, item.coffeeBeanId)}>삭제</button>
                </div>
            ))}

            <div className="total-section-container">
                <div className="total-section">
                    <div className="row">
                        <span>총 상품 금액</span>
                        <span>총 배송비</span>
                        <span>결제 예정 금액</span>
                    </div>
                    <div className="row amount">
                        <span>{totalProductPrice.toLocaleString()}원</span>
                        <span>{deliveryFee.toLocaleString()}원</span>
                        <span>{totalPrice.toLocaleString()}원</span>
                    </div>
                </div>

                <div className="button-section">
                    <button onClick={handlePurchaseSelected}>선택 제품 구매</button>
                    <button>전체 구매</button>
                </div>
            </div>
        </div>
    );
};

export default CartComponent;
