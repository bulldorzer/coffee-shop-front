import InquiryFormComponent from "../../css/InquiryForm/InquiryFormComponent";
import BasicLayout from "../../layouts/BasicLayout";


/**
 * 이용문의 - 최진우
 * @returns 
 * 메뉴바 이용문의 클릭시 이동되는 페이지
 */
const InquiryFormPage = () =>{
    return(
        <BasicLayout>
        
        <div className="inquiry-container">
            {/* 공통 title로 빠질 예정 */}    
            <h2>이용 문의</h2>
            <hr/>

            <div className="inquiry-section">
                <InquiryFormComponent/>
            </div>
        </div>
        </BasicLayout>
    )
}
export default InquiryFormPage;