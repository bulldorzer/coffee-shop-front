import React, { useState, useMemo } from 'react';
import '../../css/util/dynamicTable.css'; // 스타일 분리

/**
 * 
 * @param { columns(필드), data(데이터), itemsPerPage = 5(표시페이지 default 5), showWriteButton = false(작성하기 버튼), onWriteClick = () => {}(작성하기 버튼 클릭시 이벤트) } props
 * @returns
 * 동적 테이블
 */
const DynamicTable = ({ 
    columns, 
    data, 
    itemsPerPage = 5, 
    showWriteButton = false, 
    onWriteClick = () => {}, // 추가된 props
    emptyMessage = '데이터가 없습니다.' // 기본값 설정
  }) => {
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);

  // 정렬된 데이터 계산
  const sortedData = useMemo(() => {
    if (!sortField) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortField, sortOrder]);

  // 현재 페이지 데이터
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const pagedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 정렬 클릭
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  {/* 페이지그룹 10개씩 표시 */}
  const pageGroupSize = 10;
  const startPage = Math.floor((currentPage - 1) / pageGroupSize) * pageGroupSize + 1;
  const endPage = Math.min(startPage + pageGroupSize - 1, totalPages);

  return (
    <div className="table-container">
      <table className="dynamic-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} onClick={() => handleSort(col.key)}>
                {col.label}
                {sortField === col.key && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
        {pagedData.length === 0 ? (
          <tr>
            <td colSpan={columns.length} style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
              {emptyMessage} {/* ✅ 여기를 동적으로 */}
            </td>
          </tr>
        ) : (
          pagedData.map((row, i) => (
            <tr key={i}>
              {columns.map((col) => (
                <td key={col.key}>
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))
        )}
        </tbody>
      </table>

      {/* 페이징 */}
      {pagedData.length > 0 && (
        <div className="pagination">
          <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
            처음
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            이전
          </button>
          {startPage > 1 && (
            <button onClick={() => setCurrentPage(startPage - 1)}>◀</button>
          )}

          {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
            const page = startPage + i;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={currentPage === page ? 'active' : ''}
              >
                {page}
              </button>
            );
          })}

          {endPage < totalPages && (
            <button onClick={() => setCurrentPage(endPage + 1)}>▶</button>
          )}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            다음
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            마지막
          </button>

          
        </div>
      )}
      {/* 작성하기 버튼 */}
      {showWriteButton && (
            <div className="write-button-wrapper" style={{ marginTop: '10px', textAlign: 'right' }}>
            <button className="write-button" onClick={onWriteClick}>
              작성하기
            </button>
          </div>
      )}
    </div>
  );
};

export default DynamicTable;