import BasicLayout from "../../layouts/BasicLayout";


/**
 * 1:1 이용문의 - 최진우
 * @returns 
 * 메뉴바 고객센터 클릭시 이동되는 페이지
 */
const InquiryFormPage = () =>{
    return(
        <BasicLayout>
        
        <div className="inquiry-container">
            {/* 공통 title로 빠질 예정 */}    
            <h2>이용 문의</h2>
            <hr/>

            <div className="inquiry-section">
                <h3>문의 조회</h3>

                {/* 조회 기간 필터 컴포넌트로 뺄예정*/}
                <div className="filter-row">
                    <span>조회 기간</span>
                    <button>오늘</button>
                    <button>1개월</button>
                    <button>3개월</button>
                    <button>1년</button>
                    <input type="date" />
                    <input type="date" />
                    <button>조회</button>
                </div>

                {/* 테이블 헤더 컴포넌트로 뺄예정*/}
                <table className="inquiry-table">
                    <thead>
                        <tr>
                            <th>문의 날짜</th>
                            <th>카테고리(미정)</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>답변</th>
                        </tr>
                    </thead>
                <tbody>
                    <tr>
                        <td colSpan="5" className="no-result">조회내역이 없습니다.</td>
                    </tr>
                </tbody>
                </table>

                {/* 문의하기 버튼 */}
                <div className="inquiry-button-box">
                    <button className="inquiry-button">문의하기</button>
                </div>
            </div>
        </div>
        </BasicLayout>
    )
}
export default InquiryFormPage;