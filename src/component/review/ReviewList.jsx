import React, { useState } from 'react';
import DynamicTable from '../utilComponent/DynamicTable';
import ReviewForm from './ReviewForm';

const data = [
  { score: 5, content: '아주 좋아요!', writer: '홍길동', postDate: '2024-04-01' },
  { score: 4, content: '만족합니다', writer: '김철수', postDate: '2024-04-02' },
  
  // 더미 데이터 추가 가능
];

/**
 * 
 * @param {*} score 별점수 1~5
 * @returns 별이 5개면 별 5개 표시
 */
const renderStars = (score) => {
    const full = '★'.repeat(score);
    const empty = '☆'.repeat(5 - score);
    return <span style={{ color: 'gold', fontSize: '16px' }}>{full}{empty}</span>;
  };

{/* 필드 정의 */}
const columns = [
  { key: 'score', label: '별점', render: renderStars },
  { key: 'content', label: '내용' },
  { key: 'writer', label: '이름' },
  { key: 'postDate', label: '등록날짜' },
];



/**
 * 상품후기 컴포넌트 - 진우
 * @returns 
 */
const ReviewList = () =>{
    const [showForm, setShowForm] = useState(false);
    const handleWriteClick = () => {
        setShowForm(true); // 작성 모드 ON
    };

    const handleCancel = () => {
        setShowForm(false); // 작성 모드 OFF
    };
    return(
        <>
            <div>
                <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>상품후기</h2>
                <DynamicTable
                    columns={columns}
                    data={data}
                    itemsPerPage={6}
                    showWriteButton={!showForm}  // 작성폼이 열려있으면 버튼 숨김
                    onWriteClick={handleWriteClick}
                />
                {/* 후기 폼 */}
                {showForm && <ReviewForm onCancel={handleCancel} /> }
            </div>
        </>
    )
}

export default ReviewList;