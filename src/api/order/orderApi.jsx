
import apiClient from "../apiClient";

// const prefix = `${API_SERVER_PORT}/api/orders`;

/**
 * @description 주문서 생성 API  - 진우
 * @param {*} memberId 
 * @param {*} orderData 
 * @returns 
 */
export const createOrder = async (memberId, orderData) =>{
    try {
        console.log("--------createOrder--------");
        const response = await apiClient.post(`/orders/${memberId}`, orderData);
        return response.data;
    } catch (error) {
        console.error("주문서 생성 실패:", error);
        throw error; // 에러를 상위로 전달
    }
    
}

/**
 * @description 주문서 상품추가 API
 * @param {*} orderId 
 * @param {*} itemData 
 * @returns 
 */
export const addOrderItem = async ( {orderId, orderItems, addPoint, usepoint}) => {
    try {
        console.log("--------addOrderItem--------");
        console.log("orderId", orderId);
        console.log("orderItems", orderItems);
        console.log("addPoint", addPoint);
        console.log("usepoint", usepoint);
    
        const response = await apiClient.post(
          `/orders/${orderId}/coffeeBean?addpoint=${addPoint}&usepoint=${usepoint}`, // ✅ 쿼리 파라미터에 coffeeBeanId, qty, usepoint 추가
          orderItems // ✅ request body에 OrderDTO  보내기
        );
    
        console.log("주문서 상품추가 성공:", response.data);
        return response.data;
      } catch (error) {
        console.error("주문서 상품추가 실패:", error);
        throw error;
      }
    
}
