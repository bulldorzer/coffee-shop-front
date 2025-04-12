import axios from "axios";
import { getCookie, setCookie } from "./cookieUtil";
import {API_SERVER_PORT} from "../api/todoApi"

const jwtAxios = axios.create() // 새로운 axios 객체(인스턴스) 생성 - 진우

// 기존 쿠키에서 access토큰과 refresh토큰 값 받아옴 -> 서버에 다시 요청함
const refreshJWT = async(accessToken, refreshToken) => {
    const host = API_SERVER_PORT

    const header = {headers : {"Authorization" : `Bearer ${accessToken}` }}

    const res = await axios.get(`${host}/api/member/refresh?refreshToken=${refreshToken}`, header)

    console.log("-----------------")
    console.log(res.data)
    return res.data
}

// 요청 보내기전에 수행할 동작
const beforeReq = (config) => {

    console.log('------- before request -------')

    // list는 인증 없음
    if (config.url.includes("/list")) {
        return config;
    }

    // 기타 경로 인증 받기
    const memberInfo = getCookie("member") // 쿠키 가져오기

    if(!memberInfo){ // 쿠키가 없다면
        return Promise.reject( // 프로미스 객체의 reject에 에러 메시지 설정
            {response : {data : {error : "REQUIRE_LOGIN"}}}
        )
    }

    const {accessToken} = memberInfo // 접근 가능한 토큰 정보 추출
    config.headers.Authorization = `Bearer ${accessToken}` //  헤더에 인증 정보에 토큰 설정

    return config
}

// 요청 실패 했을때
const requestFail = (err) => {
    console.log('request error....')
    return Promise.reject(err)
}

// 응답 전에 실행할 구문
const beforeRes = async (res) => {
    console.log('response error....')
    
    const data = res.data

    if(data && data.error === "ERROR_ACCESS_TOKEN"){ // access토큰 만료된 경우

        const memberCookieValue = getCookie("member")

        // 방어 코드 추가
        if (!memberCookieValue) {
            return Promise.reject({
                response: { data: { error: "REQUIRE_LOGIN" } },
            });
        }

        const result = await (memberCookieValue.accessToken, memberCookieValue.refreshToken)
        console.log("resfresshJWT RESULT", result)

        // 요청 결과를 가지고 -> 현재 쿠키를 업데이트함
        memberCookieValue.accessToken = result.accessToken
        memberCookieValue.refreshToken = result.refreshToken

        setCookie("member", JSON.stringify(memberCookieValue), 1) // 쿠키 재 설정


        // 인증 갱신
        const originalRequest = res.config
        originalRequest.headers.Authorization = `Bearer ${result.accessToken}`
        return await axios(originalRequest)
    }

    return res
}

// 응답이 실패 했을 때
const responseFail = (err) => {
    console.log('response fail....')

    return Promise.reject(err)
}

// 인터셉터에 등록
jwtAxios.interceptors.request.use(beforeReq, requestFail) // 요청 (실행할내용, 실패했을때)
jwtAxios.interceptors.response.use(beforeRes, responseFail) // 응답 

export default jwtAxios // 내보내기