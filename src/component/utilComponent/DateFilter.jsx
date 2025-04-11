import { useState, useEffect } from "react";
import dayjs from "dayjs";
// 날짜 필터 - 이재민

// 외부로 넘겨줄 값
type Props = {
  onSearch: (startDate: string, endDate: string) => void;
  initialRange?: "today" | "1m" | "3m" | "1y";
};

const DateFilter = ({ onSearch, initialRange = "today" }: Props) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedRange, setSelectedRange] = useState(initialRange);
  const [error, setError] = useState("");

  // 날짜 범위 세팅 함수
  const setRange = (range: string) => {
    const end = dayjs();
    let start = end;

    switch (range) {
      case "1m":
        start = end.subtract(1, "month");
        break;
      case "3m":
        start = end.subtract(3, "month");
        break;
      case "1y":
        start = end.subtract(1, "year");
        break;
      default:
        start = end;
    }

    setStartDate(start.format("YYYY-MM-DD"));
    setEndDate(end.format("YYYY-MM-DD"));
    setSelectedRange(range);
  };

  // 유효성 검사
  const validateDates = () => {
    if (dayjs(startDate).isAfter(dayjs(endDate))) {
      setError("시작일은 종료일보다 이전이어야 합니다.");
      return false;
    }
    setError("");
    return true;
  };

  // 날짜 변경 시 유효성 검사
  useEffect(() => {
    if (startDate && endDate) {
      validateDates();
    }
  }, [startDate, endDate]);

  // 초기 범위 설정
  useEffect(() => {
    setRange(initialRange);
  }, [initialRange]);

  const handleSearch = () => {
    if (validateDates()) {
      onSearch(startDate, endDate);
    }
  };

  return (
    <div className="flex flex-col gap-1 text-sm">
      <div className="flex items-center gap-2">
        {[
          { label: "오늘", value: "today" },
          { label: "1개월", value: "1m" },
          { label: "3개월", value: "3m" },
          { label: "1년", value: "1y" },
        ].map((btn) => (
          <button
            key={btn.value}
            onClick={() => setRange(btn.value)}
            className={`border px-3 py-1 rounded ${
              selectedRange === btn.value ? "bg-gray-300 font-bold" : ""
            }`}
          >
            {btn.label}
          </button>
        ))}

        <input
          type="date"
          value={startDate}
          onChange={(e) => {
            setStartDate(e.target.value);
            setSelectedRange(""); // 커스텀 선택 감지
          }}
          className="border px-2 py-1 rounded"
        />
        <span>-</span>
        <input
          type="date"
          value={endDate}
          onChange={(e) => {
            setEndDate(e.target.value);
            setSelectedRange(""); // 커스텀 선택 감지
          }}
          className="border px-2 py-1 rounded"
        />

        <button
          onClick={handleSearch}
          className={`border px-4 py-1 rounded ${
            error ? "bg-gray-200 text-gray-400 cursor-not-allowed" : ""
          }`}
          disabled={!!error}
        >
          조회
        </button>
      </div>

      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default DateFilter;
