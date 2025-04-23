import { useEffect, useState } from "react";
import { getCfaqsAll } from "../../api/myPage/supportApi";
import DynamicTable from "../../component/utilComponent/DynamicTable";
import DateFilter from "../../component/utilComponent/DateFilter";

/* 필드정의 */
const columns = [
    { key: 'postDate', label: '문의날짜'},
    { key: 'content', label: '문의내용'},
    { key: 'writer', label: '작성자'},
    { key: 'answer', label: '응답상태'},
]
/**
 * 이용문의 컴포넌트 - 진우
 * @returns 
 */
const InquiryFormComponent = () => {

    const [cfaqs, setCfaqs] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);

    const fetchCfaqsAll = async () =>{
        try {
            const data = await getCfaqsAll();
            // console.log(data.content);
            setCfaqs(data.content)
            setFilteredOrders(data.content);
        } catch (error) {
            // console.error("전체 이용문의 조회 실패", error);
        }
    };

    useEffect(()=>{
        fetchCfaqsAll();
    },[])

    const handleDateSearch = (startDate, endDate) => {
        // console.log("startDate ",startDate, "endDate ", endDate);
        const filtered = cfaqs.filter((cfaqs) => {
          const postDate = new Date(cfaqs.postDate);
          const start = new Date(startDate);
          const end = new Date(endDate);
          return postDate >= start && postDate <= end;
        });
        setFilteredOrders(filtered);
        // console.log("setFilteredOrders ", filtered)
      }

    return(
        <>
            {/* 조회 기간 필터 컴포넌트로 뺄예정*/}
            <h3>문의 조회</h3>
            <div>
                <DateFilter onSearch={handleDateSearch}/>
            </div>

            {/* 조회 테이블 */}
            <DynamicTable
                columns={columns}
                data={filteredOrders}
                itemsPerPage={6}
            />
        </>
    )
}
export default InquiryFormComponent;