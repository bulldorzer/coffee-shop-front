import React, { useEffect, useState } from 'react';
import { getpfaqsAll, getpfaqsByCoffeeBean } from '../../api/productInquiry/ProductInquiryApi';
import DynamicTable from '../utilComponent/DynamicTable';

{/* 필드 정의 */}
const columns = [
    { key: 'postDate', label: '문의날짜' },
    { key: 'content', label: '문의내용' },
    { key: 'writer', label: '작성자' },
    { key: 'answer', label: '응답상태'},
];

const ProductInquiryComponent = ({coffeeBeanId}) => {

    const [pfaqs, setPfaqs] = useState([]);

    const fetchPfaqsAll = async () => {
        try {
            console.log("받은 coffeeBeanId:", coffeeBeanId);
            const data = await getpfaqsByCoffeeBean(coffeeBeanId);
            setPfaqs(data.content);
            console.log("상품문의 전체목록 조회 성공:", data.content);
        } catch (error) {
            console.error("상품문의 전체목록 불러오기 실패:", error);
        }
    };

    useEffect(() => {
        fetchPfaqsAll();
    }, []);
    return (
        <>
            <div>
                <h3>상품 문의</h3>
            </div>
            <div>
                <DynamicTable
                    columns={columns}
                    data={pfaqs}
                    itemsPerPage={6}
                />
            </div>
        </>
        
    );
};

export default ProductInquiryComponent;