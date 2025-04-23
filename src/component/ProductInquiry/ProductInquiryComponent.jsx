import React, { useEffect, useState } from 'react';
import { getpfaqsByCoffeeBean } from '../../api/productInquiry/ProductInquiryApi';
import DynamicTable from '../utilComponent/DynamicTable';
import "../../css/product/ProductInquiry.css";
import ProductInquiryForm from './ProductInquiryForm';

{/* 필드 정의 */}
const columns = [
    { key: 'postDate', label: '문의날짜' },
    { key: 'content', label: '문의내용' },
    { key: 'writer', label: '작성자' },
    { key: 'answer', label: '응답상태'},
];
/**
 * 상품문의 컴포넌트 - 진우
 * @param {number} coffeeBeanId - 커피빈 아이디
 * @param {number} name - 상품자명
 * @returns 
 */
const ProductInquiryComponent = ({coffeeBeanId, member}) => {

    const [showForm, setShowForm] = useState(false);
    const [pfaqs, setPfaqs] = useState([]);

    const fetchPfaqsAll = async () => {
        try {
            // console.log("받은 coffeeBeanId:", coffeeBeanId);
            const data = await getpfaqsByCoffeeBean(coffeeBeanId);
            setPfaqs(data.content);
            // console.log("상품문의 전체목록 조회 성공:", data.content);
        } catch (error) {
            // console.error("상품문의 전체목록 불러오기 실패:", error);
        }
    };

    

    useEffect(() => {
        fetchPfaqsAll();
    }, []);

    const handleWriteClick = () => {
        setShowForm(true); // 수정 모드 ON
    };

    const handleCancel = () => {
        setShowForm(false); // 수정 모드 OFF
    };

    // 🔥 외부에서 호출 가능하게 함수 따로 정의
        const fetchMyPfaqs = async () => {
            try {
                const data = await fetchPfaqsAll();
                setPfaqs(data.content);
            } catch (error) {
                // console.error("내 이용문의 로딩 실패", error);
            }
        };

    // ✅ 작성 완료 시 실행할 콜백 함수
    const handleSubmitComplete = () => {
        setShowForm(false); // 작성 폼 닫기
        fetchMyPfaqs();     // 리스트 새로고침
    };
    return (
        <>
            <div className='pfq-list-coontainer'>
                <h3>상품 문의</h3>
                <DynamicTable
                    columns={columns}
                    data={pfaqs}
                    itemsPerPage={6}
                    showWriteButton={!showForm}  // 작성폼이 열려있으면 버튼 숨김
                    emptyMessage="상품문의가 없습니다."
                    onWriteClick={handleWriteClick} // 작성 버튼 클릭 시 호출되는 함수
                />
                
                {showForm && <ProductInquiryForm 
                    onCancel={handleCancel} 
                    onSubmitComplete={handleSubmitComplete} // ✅ 콜백 넘기기
                    memberId={member.memberId} 
                    coffeeBeanId={coffeeBeanId}
                    writer={member.name}/> 
                }
                
            </div>
        </>
        
    );
};

export default ProductInquiryComponent;