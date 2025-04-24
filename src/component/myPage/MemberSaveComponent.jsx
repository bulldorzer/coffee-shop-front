import { useState, useEffect } from "react";
import { useMember } from "../../component/myPage/MemberContextComponent";
import { Link } from "react-router-dom";
import axios from "axios";
import deleteMemberSave from "../../api/myPage/deleteMemberSave";
import "../../css/myPage/MemberSave.css";

const MemberSaveComponent = () => {
  const member = useMember();
  const [wishlist, setWishlist] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false); // ✅ 추가
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const memberId = member.memberId;

  const fetchWishlist = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/api/membersave/list/${memberId}`,
        {
          params: { page, size },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // 데이터가 있으면 받아와서 상태 업데이트
      setWishlist(response.data.content);
      setTotalItems(response.data.totalElements);
      setSelectedItems([]); // 데이터 새로 불러올 때 선택 초기화
      setIsAllSelected(false);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // 404 에러 발생 시 빈 리스트 처리
        setWishlist([]); // 빈 리스트를 설정
        setTotalItems(0); // 전체 아이템 수는 0으로 설정
        setSelectedItems([]); // 선택된 아이템 초기화
        setIsAllSelected(false); // '전체 선택' 초기화
      } else {
        console.error("관심 상품 조회 실패:", error);
      }
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [page, size]);

  const handleCheckboxChange = (coffeeBeanId) => {
    setSelectedItems((prevSelected) => {
      const updated = prevSelected.includes(coffeeBeanId)
        ? prevSelected.filter((id) => id !== coffeeBeanId)
        : [...prevSelected, coffeeBeanId];

      setIsAllSelected(updated.length === wishlist.length);
      return updated;
    });
  };

  const handleSelectAllChange = () => {
    if (isAllSelected) {
      setSelectedItems([]);
    } else {
      const allIds = wishlist.map((item) => item.coffeeBeanId);
      setSelectedItems(allIds);
    }
    setIsAllSelected(!isAllSelected);
  };

  const handleDelete = () => {
    if (selectedItems.length === 0) {
      alert("삭제할 상품을 선택해주세요.");
      return;
    }

    deleteMemberSave(
      memberId,
      selectedItems,
      async () => {
        alert("삭제 완료!");
        setSelectedItems([]);
        // 목록을 다시 불러와서 업데이트
        fetchWishlist();
      },
      (error) => {
        alert("삭제 실패!");
      }
    );
  };

  return (
    <div>
      <ul className="membersave-list">
        <li className="membersave-header">
          <input
            type="checkbox"
            checked={isAllSelected}
            onChange={handleSelectAllChange}
          />
          <span>이미지</span>
          <span>상품명</span>
          <span>상품금액</span>
        </li>

        <div>
          {wishlist.length === 0 ? (
            <p className="empty-orders">관심상품 목록이 없습니다.</p>
          ) : (
            <ul>
              {wishlist.map((item) => (
                <li className="membersave-item" key={item.coffeeBeanId}>
                  <input
                    className="membersave-checkbox"
                    type="checkbox"
                    checked={selectedItems.includes(item.coffeeBeanId)}
                    onChange={() => handleCheckboxChange(item.coffeeBeanId)}
                  />
                  <span>
                    <Link to={`/product/${item.coffeeBeanId}`}>
                      <img src={item.imageFile} alt={item.name} />
                    </Link>
                  </span>
                  <span className="membersave-name">
                    <Link to={`/product/${item.coffeeBeanId}`}>{item.name}</Link>
                  </span>
                  <span>{item.price.toLocaleString()}원</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="delete-item-btn">
          <button onClick={handleDelete}>선택 상품 삭제</button>
        </div>
      </ul>
    </div>
  );
};

export default MemberSaveComponent;
