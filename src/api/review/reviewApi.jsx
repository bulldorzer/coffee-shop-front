
export const API_SERVER_PORT = "http://localhost:8081";

const prefic = `${API_SERVER_PORT}/api/api/review/`;

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
      return response.data;
    } catch (error) {
      console.error("리뷰 작성 실패:", error);
      throw error;
    }
  };