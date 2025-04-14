import { useState } from "react";
// 관심상품 - 이재민
const MemberSaveComponent = () => {

    const [wishlist, setWishlist] = useState([]); // DB에서 넘어올 아이템 정보들

    return(
        <div>
            <ul>
                <li>
                    <span>상품명</span>
                    <span>상품금액</span>
                </li>
            </ul>
            <div>
            {wishlist.length === 0 ? (
                <p>관심상품 목록이 없습니다.</p> // 목록 없을 경우
            ) : (
                <ul> 
                {wishlist.map((item) => (
                    <li key={item.id}>
                        <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleCheckboxChange(item.id)}
                        />
                        <img />
                        <div>{item.name}</div>
                        <div>{item.price.toLocaleString()}원</div>
                    </li> // 있을경우
                ))}
                </ul>
            )}
            </div>
            <div>
                <button>선택 상품 삭제</button>
                <button>선택 상품 장바구니 추가</button>
            </div>
        </div>
    )
}

export default MemberSaveComponent;