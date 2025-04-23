import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../css/menu/Menubar.css"

/**
 * 메뉴바 - 최진우
 * 해당 매뉴들 모두 Link태그로 구성하여 매핑하면 클릭시 이동
 * @returns 
 */
const MenuBar = () =>{

    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        setIsLoggedIn(!!token); // 토큰 있으면 true
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        setIsLoggedIn(false);
        navigate("/"); // 홈으로 이동
      };

    return(
        <header>
            <div className="nav-container">
                {/* 왼쪽: 로고 */}
                <div className="nav-left">
                    <Link to="/">
                        <img src="/logo/logo.png" alt="로고" className="logo" />
                    </Link>
                </div>

                {/* 가운데: 메인 카테고리 메뉴 */}
                <div className="nav-center">
                    <ul className="main-menu">
                        <li><Link to="/special">특가상품</Link></li>
                        <li><Link to="/productList">원두커피</Link></li>
                        <li><Link to="/coldbrew">콜드브루</Link></li>
                        <li><Link to="/gift">선물세트</Link></li>
                    </ul>
                </div>

                {/* 오른쪽: 유저 메뉴 + 검색창 */}
                <div className="nav-right">
                    {/* 위쪽: 로그인/마이페이지/이용문의 */}
                    <ul className="user-menu">
                        {isLoggedIn ? (
                        <>
                            <li><Link to="/mypage/orders">마이페이지</Link></li>
                            <li><Link to="/" onClick={handleLogout}>로그아웃</Link></li>
                        </>
                        ) : (
                        <>
                            <li><Link to="/login">로그인</Link></li>
                            <li><Link to="/selectjoin">회원가입</Link></li>
                        </>
                        )}
                        <li><Link to="/guide">이용문의</Link></li>
                    </ul>

                    {/* 아래쪽: 검색창 + 장바구니 */}
                    <div className="search-cart">
                        <input type="text" placeholder="검색어를 입력하세요" className="search-input" />
                        <img src="/icon/icon_search.png" alt="검색" className="icon-btn" />
                        <Link to="/cart"><img src="/icon/icon_cart.png" alt="장바구니" className="icon-btn" /></Link>
                    </div>
                </div>
            </div>
        </header>
        
    )
}

export default MenuBar;