import axios from "axios";
import { API_SERVER_PORT } from "../utilApi";



const prefix =  `${API_SERVER_PORT}/api/pfaq`

/**
 * 상품문의 작성 API - 진우
 * @param {*} memberId 
 * @param {*} coffeeBeanId 
 * @param {*} pfaqData 
 * @returns 
 */
export const postAdd = async (memberId, coffeeBeanId, pfaqData) => {
    try {
        const response = await axios.post(
            `${prefix}/${memberId}/${coffeeBeanId}`,
            pfaqData
        );
        return response.data;
    } catch (error) {
        console.error("상품문의 작성 실패:", error);
        throw error;
    }
}

/**
 * 상품문의 전체목록 조회 API - 진우
 * @description 전체 상품문의 목록을 조회하는 API입니다.
 * @returns 
 */
export const getpfaqsAll = async () =>{
    try {
        const response = await axios.get(`${prefix}/list`);
        return response.data
    } catch (error) {
        console.error("상품문의 전체목록 불러오기 실패:", error);
        throw error;
    }
};

/**
 * 특정 상품의 모든 상품문의 조회 API - 진우
 * @description 특정 상품에 대한 모든 상품문의 목록을 조회하는 API입니다.
 * @description 페이지네이션을 지원하며, 기본값은 0페이지, 999개 항목입니다.
 * @param {*} coffeeBeanId 
 * @param {*} page 
 * @param {*} size 
 * @returns 
 */
export const getpfaqsByCoffeeBean = async (coffeeBeanId, page = 0, size = 999) => {
    try {
        const response = await axios.get(`${prefix}/list/product/${coffeeBeanId}?page=${page}&size=${size}`);
        return response.data;
    } catch (error) {
        console.error("해당 상품의 상품문의 목록 불러오기실패:", error);
        throw error;
    } 
};

/**
 * 특정 멤버가 작성한 상품문의 목록 조회 API - 진우
 * @description 특정 멤버가 작성한 상품문의 목록을 조회하는 API입니다.
 * @description 페이지네이션을 지원하며, 기본값은 0페이지, 999개 항목입니다.
 * @param {*} memberId 
 * @param {*} page 
 * @param {*} size 
 * @returns 
 */
export const getpfaqsByMember = async (memberId, page = 0, size = 999) => {
    try {
        const response = await axios.get(`${prefix}/member/${memberId}?page=${page}&size=${size}`);
        return response.data;
    } catch (error) {
        console.error("해당 회원의 상품문의 목록 불러오기실패:", error);
        throw error;
    } 
}