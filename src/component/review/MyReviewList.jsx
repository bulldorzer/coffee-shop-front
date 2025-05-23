import React, { useEffect, useState } from 'react';
import { getReviewsByMember } from '../../api/review/reviewApi';
import DynamicTable from '../utilComponent/DynamicTable';


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
  { key: 'productName', label: '상품' },
  { key: 'content', label: '내용' },
  { key: 'writer', label: '이름' },
  { key: 'postDate', label: '등록날짜' },
];

export default function MyReviewList({ memberId }) {
  const [showForm, setShowForm] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchMyReviews = async () => {
      try {
        const data = await getReviewsByMember(memberId);
        setReviews(data.content);  // CustomPage 구조일 경우
        console.log("받은 data.content: ", data.content);

      } catch (error) {
        console.error("내 리뷰 로딩 실패", error);
      }
    };

    fetchMyReviews();
  }, [memberId]);

// const handleWriteClick = () => {
//   setShowForm(true); // 수정 모드 ON
// };

// const handleCancel = () => {
//     setShowForm(false); // 수정 모드 OFF
// };

// 멤버 DTO 정보 불러오기
// const member = useMember();

  return (
    <div>
        <h2 className='page-title'>내가 작성한 리뷰</h2>
        <DynamicTable
            columns={columns}
            data={reviews}
            itemsPerPage={6}
            // showWriteButton={!showForm}  // 작성폼이 열려있으면 버튼 숨김
            // onWriteClick={handleWriteClick}
        />
        {/* 후기 폼 memberId={1} coffeeBeanId={1}로 고정했지만 나중에 수정해야함 - 진우 */}
        {/* {showForm && <ReviewForm onCancel={handleCancel} memberId={member.memberId} coffeeBeanId={null} /> } */}
    </div>
  );
}