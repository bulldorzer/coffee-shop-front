import React, { useState } from "react";
import { postAdd } from "../../api/myPage/supportApi";
import "../../css/myPage/SupprotForm.css"


const SupportForm = ({onCancel, onSubmitComplete, memberId, writer}) => {
    const [title, setTitle] = useState("");
    const [writerState, setWriterState] = useState(writer);
    const [content,setContent] = useState("");

    // console.log("memberId ",memberId, "writer ",writer);

    const handleSubmit = async () =>{
        try {
            const  cfaqData ={
                title,
                writer:writerState,
                content,
            };

            // console.log("memberId ",memberId,"cfaqData ",cfaqData);
            await postAdd(memberId,cfaqData)
            alert("나의 이용문의가 성공적으로 등록되었습니다!");
            if (onSubmitComplete) onSubmitComplete(); // ✅ 작성 완료 후 콜백 실행
            if (onCancel) onCancel(); // 작성후 폼닫기

        } catch (error) {
            console.error("이용문의 작성실패: ",error)
            alert("이용문의 작성중 오류가 발생했습니다.");
        }
    }

    return (
        <div className="support-form-container">
            <div className="form-header">
                <div className="form-title">이용 문의</div>
                <div className="form-description">홈페이지 이용 중 문제나 문의사항을 남겨주세요.</div>
            </div>

            <div className="form-row">
                <div className="form-label">작성자 :</div>
                <div>{writer}</div>
            </div>

            {/* <div className="form-row">
                <label className="form-label" htmlFor="title">제목 :</label>
                <input
                className="support-input"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
            </div> */}

            <div className="form-row">
                <label className="form-label" htmlFor="content">본문 :</label>
                <textarea
                className="support-textarea"
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                />
            </div>

            <div className="button-row">
                <button className="btn" onClick={onCancel}>이전</button>
                <button className="btn" onClick={handleSubmit}>문의하기</button>
            </div>
        </div>
    );
};

export default SupportForm;