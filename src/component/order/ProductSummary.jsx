import DynamicTable from "../utilComponent/DynamicTable";


/**
 * 상품 요약 컴포넌트 - 진우
 * @component
 * @description 상품 요약 정보를 보여주는 컴포넌트입니다.
 * @param {*} param0 
 * @returns 
 */
const ProductSummary = ({ tableData }) => {
  const columns = [
    { key: 'productName', label: '상품정보' },
    { key: 'quantity', label: '수량' },
    { key: 'productPrice', label: '금액' },
    { key: 'addPoint', label: '적립포인트' },
  ];

   /**
     * 테이블 데이터에서 총합 계산
     * @param {Array} data - 테이블 데이터
     * @returns {Object} - 총합 객체
     
     */
  const calculateTotals = (data) => {
    let totalQuantity = 0, totalPrice = 0, totalPoint = 0;
    data.forEach(item => {
      totalQuantity += Number(item.quantity);
      totalPrice += Number(item.productPrice);
      totalPoint += Number(item.addPoint);
    });
    return { totalQuantity, totalPrice, totalPoint };
  };

  return (
    <section className="border border-black">
      <h2 className="title">주문서</h2>
      <hr />
      <DynamicTable
        columns={columns}
        data={tableData.map(item => ({
          ...item,
          quantity: `${item.quantity} 개`,
          productPrice: `${item.productPrice.toLocaleString()} 원`,
          addPoint: `${item.addPoint.toLocaleString()} 원`,
        }))}
        itemsPerPage={6}
        showFooter={true}
        footerContent={() => {
          const { totalQuantity, totalPrice, totalPoint } = calculateTotals(tableData);
          return (
            <tr className="text-right font-semibold">
              <td colSpan={4} className="p-2">
                총 합계: {totalQuantity}개 | 금액: {totalPrice.toLocaleString()}원 | 적립 포인트: {totalPoint.toLocaleString()}원
              </td>
            </tr>
          );
        }}
      />
    </section>
  );
};

export default ProductSummary;