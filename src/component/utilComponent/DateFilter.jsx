import { useState, useEffect } from "react";

// 날짜 필터 - 이재민

const DateFilter = ({ onSearch, initialRange = "today" }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedRange, setSelectedRange] = useState(initialRange);
  const [error, setError] = useState("");

  // 날짜 범위 설정
  const setRange = (range) => {
    const end = new Date();
    let start = new Date(); // ✅ let으로
  
    switch (range) {
      case "1m":
        start.setMonth(start.getMonth() - 1);
        break;
      case "3m":
        start.setMonth(start.getMonth() - 3);
        break;
      case "1y":
        start.setFullYear(start.getFullYear() - 1);
        break;
      default:
        break; // ✅ 불필요한 재할당 제거
    }
  
    setStartDate(formatDate(start));
    setEndDate(formatDate(end));
    setSelectedRange(range);
  };

  // 날짜 유효성 검사
  const validateDates = () => {
    if (new Date(startDate) > new Date(endDate)) {
      setError("시작일은 종료일보다 이전이어야 합니다.");
      return false;
    }
    setError("");
    return true;
  };

  // 날짜를 yyyy-mm-dd형식으로 초기화
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };



  // 날짜 바뀔 때마다 유효성 검사
  useEffect(() => {
    if (startDate && endDate) {
      validateDates();
    }
  }, [startDate, endDate]);

  // 초기 날짜 설정
  useEffect(() => {
    setRange(initialRange);
  }, [initialRange]);

  // 조회 버튼 클릭 시
  const handleSearch = () => {
    if (validateDates()) {
      onSearch(startDate, endDate);
    }
  };

  return (
    <div>
      <span>조회기간</span>
      <div>
        {[
          { label: "오늘", value: "today" },
          { label: "1개월", value: "1m" },
          { label: "3개월", value: "3m" },
          { label: "1년", value: "1y" },
        ].map((btn) => (
          <button
            key={btn.value}
            onClick={() => setRange(btn.value)}
          >
            {btn.label}
          </button>
        ))}

        <input
          type="date"
          value={startDate}
          onChange={(e) => {
            setStartDate(e.target.value);
            setSelectedRange("");
          }}
        />
        <span>-</span>
        <input
          type="date"
          value={endDate}
          onChange={(e) => {
            setEndDate(e.target.value);
            setSelectedRange("");
          }}
        />

        <button onClick={handleSearch} disabled={!!error}>
          조회
        </button>
      </div>

      {error && <div>{error}</div>}
    </div>
  );
};

export default DateFilter;
