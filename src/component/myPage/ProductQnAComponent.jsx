import { useEffect, useState } from "react";
import { getpfaqsByMember } from "../../api/productInquiry/ProductInquiryApi";
import DynamicTable from "../utilComponent/DynamicTable";


{/* 필드 정의 */}
const columns = [
    { key: 'productName', label: '상품' },
    { key: 'content', label: '내용' },
    { key: 'writer', label: '이름' },
    { key: 'postDate', label: '등록날짜' },
  ];
  
  export default function ProductQnAComponent({ memberId }) {
    const [showForm, setShowForm] = useState(false);
    const [pfaq, setPfaqs] = useState([]);
  
    useEffect(() => {
      const fetchMyPfaqs = async () => {
        try {
          const data = await getpfaqsByMember(memberId);
          setPfaqs(data.content);  // CustomPage 구조일 경우
          console.log("받은 data.content: ", data.content);
  
        } catch (error) {
          console.error("내 리뷰 로딩 실패", error);
        }
      };
  
      fetchMyPfaqs();
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
          <h3>내가 작성한 상품문의</h3>
          <DynamicTable
              columns={columns}
              data={pfaq}
              itemsPerPage={6}
              // showWriteButton={!showForm}  // 작성폼이 열려있으면 버튼 숨김
              // onWriteClick={handleWriteClick}
          />
          {/* 후기 폼 memberId={1} coffeeBeanId={1}로 고정했지만 나중에 수정해야함 - 진우 */}
          {/* {showForm && <ReviewForm onCancel={handleCancel} memberId={member.memberId} coffeeBeanId={null} /> } */}
      </div>
    );
  }