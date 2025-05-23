import React, { useState } from "react";
import { postAdd } from "../../api/review/reviewApi";
import "../../css/review/reviewForm.css";

/**
 * 상품후기 작성 - 진우
 * @returns 
 */
const ReviewForm = ({ onCancel, onSubmitComplete, memberId, coffeeBeanId, writer }) => {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [writerState, setWriterState] = useState(writer);
  const [content,setContent] = useState("");

  console.log("memberId ",memberId, "coffeeBeanId ",coffeeBeanId, "writer ",writer);

  const handleSubmit = async () =>{
    try {
      const  reviewData ={
          score: rating,
          title,
          writer:writerState,
          content,
      };

      // console.log("reviewData ",reviewData);
      await postAdd(memberId,coffeeBeanId,reviewData)
      alert("리뷰가 성공적으로 등록되었습니다!");
      if (onSubmitComplete) onSubmitComplete(); // ✅ 리뷰 제출 후 콜백 실행
      if (onCancel) onCancel(); // 작성후 폼닫기

    } catch (error) {
      console.error("리뷰 작성실패: ",error)
      alert("리뷰 작성중 오류가 발생했습니다.");
    }
  }

  return (
    <div className="review-form-container">
      <h2 className="form-title">상품후기</h2>
      <hr className="title-divider" />

      <div className="form-row">
        <div>
          <label className="form-label">상품명 :</label>
          <span> 상품 이름 표시 </span>
        </div>
        <div>
          <label className="form-label">평점 :</label>
          {[1, 2, 3, 4, 5].map((val) => (
            <span
              key={val}
              className={`star ${val <= rating ? "selected" : ""}`}
              onClick={() => setRating(val)}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      <textarea 
        className="review-textarea" 
        rows="8" 
        placeholder="후기를 작성해주세요"
        value={content}
        onChange={(e)=> setContent(e.target.value)} />

      <div className="button-row">
        <button className="btn cancel" onClick={onCancel}>취소</button>
        <button className="btn submit" onClick={handleSubmit}>작성하기</button>
      </div>
    </div>
  );
};

export default ReviewForm;