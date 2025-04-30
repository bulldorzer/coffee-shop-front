import apiClient from "../apiClient";





const prefix = `${API_SERVER_PORT}/api/cfaq`;

/**
 * 
 * @returns 이용문의 전체목록 조회 API - 진우
 * @description 전체 이용문의 목록을 조회하는 API입니다.
 */
export const getCfaqsAll = async () =>{
    try {
        const response = await apiClient.get(`/cfaq/list`);
        return response.data
    } catch (error) {
        // console.error("이용문의 전체목록 불러오기 실패:", error);
        // throw error;
    }
}

/**
 * 멤버의 이용문의 조회 API - 진우
 * @param {*} memberId 
 * @param {*} page 
 * @param {*} size 
 * @returns 
 */
export const getCfaqsByMember = async (memberId, page=0, size=10) => {
    try {
        const response = await apiClient.get(`/cfaq/list/member/${memberId}?page=${page}&size=${size}`);
        return response.data
    } catch (error) {
        // console.error("내 이용문의 불러오기 실패:", error);
        // throw error;
    }
}

/**
 * 이용문의 작성 API - 진우
 * @param {*} memberId 
 * @param {*} cfaqData 
 * @returns 
 */
export const postAdd = async (memberId, cfaqData) => {
    try {
        const response = await apiClient.post(`/cfaq/${memberId}`,
            cfaqData
        );
        return response.data;
    } catch (error) {
        // console.error("이용문의 작성 실패:", error);
        // throw error;
    }
}