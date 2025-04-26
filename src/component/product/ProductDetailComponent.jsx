import { useState, useEffect } from "react";
import "../../css/product/ProductDetailPage.css"
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProductDetailComponent({ product }) {
  const [member, setMember] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [grindFlag, setGrindFlag] = useState(1); // 분쇄 여부
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const total = quantity * product.price + (quantity * product.price >= product.freeShippingPrice ? 0 : product.deliveryFee); // 배송비 포함 (30,000원 이상 주문시 배송비 무료)

  const handleGrindFlagChange = (e) => {
    setGrindFlag(e.target.checked ? 1 : 0); // 체크 여부에 따라 grindFlag 업데이트
  };

  // 회원 id 받아오기
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setLoading(false);
      return;
    }

    const decodeJWT = (token) => {
      const base64Url = token.split('.')[1]; // JWT의 payload 부분을 분리
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // URL 안전한 Base64 -> 일반 Base64로 변환
      const decodedPayload = JSON.parse(atob(base64)); // Base64를 디코딩하고 JSON으로 파싱

      const email = decodedPayload.email || decodedPayload.sub; // 이메일을 추출
      return email;
    };

    const email = decodeJWT(token); // 토큰에서 이메일 추출

    // 이메일을 기반으로 회원 정보를 받아옴
    if (email) {
      axios.get(`http://localhost:8081/api/members/me/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,  // JWT 토큰
        },
      })
        .then((response) => {
          setMember(response.data); // 응답 받은 회원 정보 저장
        })
        .catch((error) => {
          console.error("회원 정보 로딩 실패:", error);
        })
        .finally(() => {
          setLoading(false);  // 로딩 완료
        });
    } else {
      setLoading(false);  // 이메일 추출 실패 시 로딩 완료
    }
  }, []);

  // 장바구니에 추가하는 함수
  const addToCart = async () => {
    try {
      if (!member) {
        alert("회원 정보가 없습니다.");
        return;
      }

      const accessToken = localStorage.getItem("accessToken");

      const cartCoffeeBeanDTO = {
        coffeeBeanId: product.id,
        qty: quantity,
        grind_flag: grindFlag,
      };

      await axios.post("http://localhost:8081/api/cart/item", cartCoffeeBeanDTO, {
        params: {
          email: member.email,  // 이메일을 쿼리 파라미터로 전달
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      alert("장바구니에 추가되었습니다.");
    } catch (error) {
      console.error("장바구니 추가 실패:", error);
      alert("장바구니 추가에 실패했습니다.");
    }
  };

  // 관심상품 등록 함수
  const addToMemberSave = async () => {
    try {
      if (!member) {
        alert("회원 정보가 없습니다.");
        return;
      }

      const accessToken = localStorage.getItem("accessToken");

      await axios.post("http://localhost:8081/api/membersave/add", {
        memberId: member.memberId,  // `member.id` 사용
        coffeeBeanId: product.id
      }, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });

      alert("관심상품에 등록되었습니다.");
    } catch (error) {
      console.error("관심상품 등록 실패:", error);
      alert("이미 등록되어있는 상품입니다.");
    }
  };

  return (
    <div className="product-info-section">
      <h2>{product.name}</h2>

      <div className="product-details">
        <p>제품명: {product.name}</p>
        <p>판매가: {product.price.toLocaleString()}원</p>
        <p>원산지: {product.country}</p>
        <p>용량: {product.amount}</p>
        <p>배송비: {product.deliveryFee}원 ({product.freeShippingPrice}원 이상 구매 시 무료)</p>
      </div>

      <div className="checkbox-group">
        <label>분쇄:</label>
        <input
          className="checkbox"
          type="checkbox"
          checked={grindFlag === 1}
          onChange={handleGrindFlagChange}
        />
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
        <button onClick={() => navigate("/order", {
          state: {
            productId: product.id,
            productName: product.name,
            productImage: product.uploadFileNames[0],
            productPrice: product.price,
            deliveryFee: product.deliveryFee,
            quantity,
            grindFlag,
            total,
          },
        })}>바로 구매하기</button>
        <button onClick={addToCart}>장바구니 담기</button>
        <button onClick={addToMemberSave}>관심상품 등록</button>
      </div>
    </div>
  );
}
