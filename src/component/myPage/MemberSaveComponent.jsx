import { useState, useEffect } from "react";
import { useMember } from "../../component/myPage/MemberContextComponent";
import { Link } from "react-router-dom";
import axios from "axios";
import deleteMemberSave from "../../api/myPage/deleteMemberSave"

const MemberSaveComponent = () => {
  const member = useMember();
  const [wishlist, setWishlist] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
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
      setWishlist(response.data.content);
      setTotalItems(response.data.totalElements);
    } catch (error) {
      console.error("관심 상품 조회 실패:", error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [page, size]);

  const handleCheckboxChange = (coffeeBeanId) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(coffeeBeanId)
        ? prevSelected.filter((id) => id !== coffeeBeanId)
        : [...prevSelected, coffeeBeanId]
    );
  };

  const handleDelete = () => {
    if (selectedItems.length === 0) {
      alert("삭제할 상품을 선택해주세요.");
      return;
    }

    deleteMemberSave(
      memberId,
      selectedItems,
      () => {
        alert("삭제 완료!");
        setSelectedItems([]);
        fetchWishlist();
      },
      (error) => {
        alert("삭제 실패!");
      }
    );
  };

  return (
    <div>
      <ul>
        <li>
          <span>상품명</span>
          <span>상품금액</span>
        </li>
      </ul>
      <div>
        {wishlist.length === 0 ? (
          <p>관심상품 목록이 없습니다.</p>
        ) : (
          <ul>
            {wishlist.map((item) => (
              <li key={item.coffeeBeanId}>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.coffeeBeanId)}
                  onChange={() => handleCheckboxChange(item.coffeeBeanId)}
                />
                <Link to={`/product/${item.coffeeBeanId}`}>
                  <img src={item.imageFile} alt={item.name} width="100" />
                  <div>{item.name}</div>
                  <div>{item.price.toLocaleString()}원</div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <button onClick={handleDelete}>선택 상품 삭제</button>
      </div>
    </div>
  );
};

export default MemberSaveComponent;
