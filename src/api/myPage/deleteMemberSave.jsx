import axios from "axios";

// 관심상품 목록 삭제 API
const deleteMemberSave = async (memberSaveId, selectedItems, onSuccess, onError) => {
  try {
    await axios.delete(
      `http://localhost:8081/api/membersave/delete/${memberSaveId}`, // memberSaveId를 URL 경로로 전달
      {
        data: selectedItems,  // 삭제할 coffeeBeanId 목록
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
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
