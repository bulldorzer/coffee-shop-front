const DeliveryInfoForm = ({ deliveryInfo, setDeliveryInfo, orderInfo, handleAddressSearch }) => (
  <section>
    <h2 className="title">배송 정보</h2>
    {/* 주문자 정보와 동일 체크박스 */}
    <label>
        <input
          type="checkbox"
          onChange={(e) => {
            if (e.target.checked) {
              setDeliveryInfo(prev => ({
                ...prev,
                receiverName: orderInfo.name,
                receiverPhone: orderInfo.phone,
                address: orderInfo.address,
                addressDetail: orderInfo.addressDetail,
              }));
            } else {
              setDeliveryInfo(prev => ({
                ...prev,
                receiverName: '',
                receiverPhone: '',
                address: '',
                addressDetail: '',
              }));
            }
          }}
        />
        주문자 정보와 동일
      </label>
    <div className="space-y-2">
      <div className="flex items-center gap-4">
        <label>*수령인</label>
        <input className="border px-2 py-1 flex-1" type="text" value={deliveryInfo.receiverName}
          onChange={e => setDeliveryInfo({ ...deliveryInfo, receiverName: e.target.value })} />
        <span>0자 / 25자</span>
      </div>
      <div className="flex items-center gap-4">
        <label>*휴대폰 번호</label>
        <input className="border px-2 py-1 flex-1" type="text" value={deliveryInfo.receiverPhone}
          onChange={e => setDeliveryInfo({ ...deliveryInfo, receiverPhone: e.target.value })} />
        <span>상품 도착 안내를 SMS로 알려드립니다</span>
      </div>
      <div className="flex items-center gap-4">
        <label>*주소</label>
        <input className="border px-2 py-1 w-1/3" type="text" value={deliveryInfo.address}
          onChange={e => setDeliveryInfo({ ...deliveryInfo, address: e.target.value })} readOnly 
          placeholder="주소는 직접 입력할 수 없습니다"/>
        <button className="order-button" onClick={handleAddressSearch}>주소검색</button>
        <input className="border px-2 py-1 flex-1" type="text" placeholder="상세주소"
          value={deliveryInfo.addressDetail}
          onChange={e => setDeliveryInfo({ ...deliveryInfo, addressDetail: e.target.value })} />
      </div>
      <div>
        <label>*배송 요청 사항</label>
        <textarea className="border px-2 py-1 w-full h-24"
          value={deliveryInfo.deliveryRequest}
          onChange={e => setDeliveryInfo({ ...deliveryInfo, deliveryRequest: e.target.value })} />
        <span className="block text-right">0자 / 100자</span>
      </div>
    </div>
  </section>
);

export default DeliveryInfoForm;
