import React, { useEffect, useState } from 'react';
import { getAllReviews, getReviewsByCoffeeBean } from '../../api/review/reviewApi';
import DynamicTable from '../utilComponent/DynamicTable';
import ReviewForm from './ReviewForm';

/**
 * 별이 5개면 별 5개 표시
 * @param {*} score 별점수 1~5
 * @returns 
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
  { key: 'writer', label: '작성자' },
  { key: 'postDate', label: '등록날짜' },
];


/**
 * 상품후기 컴포넌트 - 진우
 * @returns 
 */
const ReviewList = ({coffeeBeanId}) =>{
    const [showForm, setShowForm] = useState(false);
    const [reviewData, setReviewData] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
          try {
            // console.log("받은 coffeeBeanId:", coffeeBeanId);
            const data = await getReviewsByCoffeeBean(coffeeBeanId); // 서버에서 데이터 받아오기
            setReviewData(data.content);
            
          } catch (err) {
            console.error("리뷰 목록 불러오기 실패:", err);
          }
        };
    
        fetchReviews();
      }, [coffeeBeanId]);

    // const handleWriteClick = () => {
    //     setShowForm(true); // 작성 모드 ON
    // };

    // const handleCancel = () => {
    //     setShowForm(false); // 작성 모드 OFF
    // };
    return(
        <>
            <div>
                <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>상품후기</h2>
                <DynamicTable
                  columns={columns}
                  data={reviewData}
                  itemsPerPage={6}
                  // showWriteButton={!showForm}  // 작성폼이 열려있으면 버튼 숨김
                  // onWriteClick={handleWriteClick}
                />
                {/* 후기 폼 memberId={1} coffeeBeanId={1}로 고정했지만 나중에 수정해야함 - 진우 */}
                {/* {showForm && <ReviewForm onCancel={handleCancel} memberId={1} coffeeBeanId={1} writer={"로그인아이디"} /> } */}
            </div>
        </>
    )
}

export default ReviewList;