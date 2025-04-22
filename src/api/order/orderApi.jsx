import axios from "axios";
import { API_SERVER_PORT } from "../utilApi";

const prefix = `${API_SERVER_PORT}/api/order`;

export  const getMemberDTO = async (email) =>{
    try {
        const response = await axios.get(`${API_SERVER_PORT}/api/members/me/${email}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        });
        return response.data;
        
    } catch (error) {
        
    }
}