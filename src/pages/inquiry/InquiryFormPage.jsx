import InquiryFormComponent from "../../component/InquiryForm/InquiryFormComponent";
import BasicLayout from "../../layouts/BasicLayout";
import "../../css/InquiryForm/InquiryForm.css"


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
            <h2 className="page-title">이용 문의</h2>
            <hr/>

            <div className="inquiry-section">
                <InquiryFormComponent/>
            </div>
        </div>
        </BasicLayout>
    )
}
export default InquiryFormPage;