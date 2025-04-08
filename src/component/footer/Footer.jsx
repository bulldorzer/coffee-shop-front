import { Link } from "react-router-dom";


const Footer = () =>{
    return(
        <footer className="footer">
            <div className="footer-top">
                <div className="footer-logo">
                <h2>쇼핑몰</h2>
                </div>

                <div className="footer-info">
                <p><strong>- CS CENTER</strong> 111-1111 평일 오전 09:00 ~ 오후 06:00 주말 및 공휴일은 휴무입니다.</p>
                <p><strong>- ABOUT</strong> 대표 : OOO  Tel : 111-1111  이메일 : <a href="mailto:aaa@aaa.com">aaa@aaa.com</a><br />
                    주소 : OOO</p>
                <p><strong>- FOLLOW</strong> 공식 홈페이지 | Instagram | Facebook</p>
                </div>
            </div>

            <div className="footer-bottom">
                <Link to={"/introduce"}>회사소개</Link> |
                <Link to={"/useguide"}>이용약관</Link> |
                <Link to={"/a"}>개인정보</Link> |
                <Link to={"/b"}>처리방침</Link> |
                <Link to={"/c"}>고객센터</Link> 
                
            </div>
        </footer>
    )
}

export default Footer;