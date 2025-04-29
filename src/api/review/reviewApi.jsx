import axios from "axios";
import { API_SERVER_PORT } from "../utilApi";



const prefix = `${API_SERVER_PORT}/api/review`;

/**
 * 후기 작성 API - 진우
 * @param {string} memberId 
 * @param {number} coffeeBeanId 
 * @param {object} reviewData { score, title, writer, content }
 * @returns 
 */
export const postAdd = async (memberId, coffeeBeanId, reviewData) => {
  try {
    const response = await axios.post(
      `${prefix}/${memberId}/${coffeeBeanId}`,
      reviewData
    );
    console.log("리뷰 작성 결과:", response.data);
    alert("리뷰가 성공적으로 등록되었습니다!");
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      alert(error.response.data.message); // 백엔드 에러 메시지 표시
    } else {
      alert("리뷰 등록 중 오류가 발생했습니다.");
    }
  }
};

/**
 * 리뷰 모든 데이터 조회
 * @returns 
 */
export const getAllReviews = async (page = 0, size = 999) =>{
  try {
    const response = await axios.get(`${prefix}/list?page=${page}&size=${size}`);
    return response.data
  } catch (error) {
    // console.error("리뷰 목록 불러오기실패:", error);
    // throw error;
  }
}

/**
 * 특성 상품의 모든 리뷰 조회 
 * @param {*} coffeeBeanId 
 * @param {*} page 
 * @param {*} size 
 * @returns 
 */
export const getReviewsByCoffeeBean = async (coffeeBeanId, page = 0, size = 999) => {
  try {
    // console.log("요청 URL:", `${prefix}/list/product/${coffeeBeanId}?page=${page}&size=${size}`);
    const response = await axios.get(`${prefix}/list/product/${coffeeBeanId}?page=${page}&size=${size}`);
    return response.data;
  } catch (error) {
    // console.error("해당 상품의 리뷰 목록 불러오기실패:", error);
    // throw error;
  } 
};

/**
 * 특정 멤버가 작성한 리뷰목록 조회 
 * @param {*} memberId 
 * @param {*} page 
 * @param {*} size 
 * @returns 
 */
export const getReviewsByMember = async (memberId, page = 0, size = 10) => {
  try {
    const response = await axios.get(`${prefix}/member/${memberId}?page=${page}&size=${size}`);
    return response.data;
  } catch (error) {
    // console.error("내 리뷰 불러오기 실패:", error);
    // throw error;
  }
};



  