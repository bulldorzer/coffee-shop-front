import axios from "axios";

// 관심상품 목록 삭제 API
const deleteMemberSave = async (memberId, selectedItems, onSuccess, onError) => {
  try {
    await axios.delete(
      `http://localhost:8081/api/membersave/delete/${memberId}`,
      {
        data: selectedItems,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    onSuccess();
  } catch (error) {
    console.error("삭제 실패:", error);
    if (onError) onError(error);
  }
};

export default deleteMemberSave;
