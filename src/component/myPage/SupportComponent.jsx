import { useEffect, useState } from 'react'
import { getCfaqsByMember } from '../../api/myPage/supportApi'
import DynamicTable from '../utilComponent/DynamicTable'
import '../../css/myPage/SupportComponent.css'
import SupportForm from './SupportForm'


{/* 필드정의 */}
const columns = [
    { key: 'postDate', label: '문의날짜'},
    { key: 'content', label: '문의내용'},
    { key: 'answer', label: '응답상태'},
]

const SupportComponent = ({ memberId, name }) => {

    const [showForm, setShowForm] = useState(false);
    const [cfaqs, setCfaqs] = useState([]);

    // 🔥 외부에서 호출 가능하게 함수 따로 정의
    const fetchMyCfaqs = async () => {
        try {
            const data = await getCfaqsByMember(memberId);
            setCfaqs(data.content);
        } catch (error) {
            console.error("내 이용문의 로딩 실패", error);
        }
    };

    useEffect(()=>{
        fetchMyCfaqs();
    }, [memberId])

    const handleWriteClick = () => {
      setShowForm(true); // 수정 모드 ON
    };

    const handleCancel = () => {
        setShowForm(false); // 수정 모드 OFF
    };

    // ✅ 작성 완료 시 실행할 콜백 함수
    const handleSubmitComplete = () => {
        setShowForm(false); // 작성 폼 닫기
        fetchMyCfaqs();     // 리스트 새로고침
    };

    return(
        <>
            <div class="container">
                <div className="support-title-container">
                    <h1 className="support-title">이용 문의</h1>
                    <p className="support-description">홈페이지 이용 중 문제나 문의사항을 남겨주세요.</p>
                </div>
                <DynamicTable
                    columns={columns}
                    data={cfaqs}
                    itemsPerPage={6}
                    showWriteButton={!showForm}  // 작성폼이 열려있으면 버튼 숨김
                    onWriteClick={handleWriteClick}
                />
                {/* 후기 폼 memberId={1} coffeeBeanId={1}로 고정했지만 나중에   수정해야함 - 진우 */}
                {showForm && <SupportForm 
                    onCancel={handleCancel} 
                    onSubmitComplete={handleSubmitComplete} // ✅ 콜백 넘기기
                    memberId={memberId} 
                    writer={name}/> 
                }
            </div>
        </>
    )
}

export default SupportComponent;