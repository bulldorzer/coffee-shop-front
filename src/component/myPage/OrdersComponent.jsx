import { useEffect, useState } from "react";

// 주문 내역 조회 컴포넌트 - 이재민
const OrdersComponent = ({orders}) => {
    

    return (
    <>
        <ul>
            <li>
                <span>주문날짜</span>
                <span>상품명</span>
                <span>상품금액</span>
                <span>주문상태</span>
            </li>
            {orders.content.map((order) => (
            <li key={order.ord_id}>
                <span>{order.order_date}</span>
                <span>{order.member_id}</span>
                <span>{order.order_id}</span>
                <span>{order.status}</span>
            </li>
            ))}
        </ul>
    </>
    )
}

export default OrdersComponent;