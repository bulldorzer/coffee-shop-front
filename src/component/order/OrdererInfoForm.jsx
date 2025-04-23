/**
 * @description 주문자 정보 입력 폼
 * @param {*} param0 
 * @returns 
 */
const OrdererInfoForm = ({ orderInfo, setOrderInfo }) => (
    <section>
      <h2 className="title">주문자 정보</h2>
      <div className="space-y-2">
        <div className="flex items-center gap-4">
          <label>*이름</label>
          <input className="border px-2 py-1 flex-1" type="text" value={orderInfo.name}
            onChange={e => setOrderInfo({ ...orderInfo, name: e.target.value })} />
        </div>
        <div className="flex items-center gap-4">
          <label>*휴대폰 번호</label>
          <input className="border px-2 py-1 flex-1" type="text" value={orderInfo.phone}
            onChange={e => setOrderInfo({ ...orderInfo, phone: e.target.value })} />
          <span>배송 안내 SMS로 알려드립니다.</span>
        </div>
      </div>
    </section>
  );
  
  export default OrdererInfoForm;