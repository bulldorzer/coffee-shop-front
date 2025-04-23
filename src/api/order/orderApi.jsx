import axios from "axios";
import { API_SERVER_PORT } from "../utilApi";

const prefix = `${API_SERVER_PORT}/api/orders`;

/**
 * @description 주문서 생성 API  
 * @param {*} memberId 
 * @param {*} orderData 
 * @returns 
 */
export const createOrder = async (memberId, orderData) =>{
    try {
        console.log("--------createOrder--------");
        console.log("memberId", memberId);
        console.log("orderData", orderData);
        const response = await axios.post(`${prefix}/${memberId}`, orderData);
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
export const addOrderItem = async ( orderId, {coffeeBeanId, qty}) => {
    try {
        console.log("--------addOrderItem--------");
        console.log("orderId", orderId);
        console.log("coffeeBeanId", coffeeBeanId);
        console.log("qty", qty);
        const response = await axios.post(`${prefix}/${orderId}/coffeeBean?coffeeBeanId=${coffeeBeanId}&qty=${qty}`
        );
        console.log("주문서 상품추가 성공:", response.data);
        return response.data;
    } catch (error) {
        console.error("주문서 상품추가 실패:", error);
        throw error; // 에러를 상위로 전달
        
    }
    
}
