import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
            <nav>
                <div className="menu-left">
                    <h1>
                        <Link to="/">
                            <img src="/logo/logo.png" alt="Main Logo" className="logo" />
                        </Link>
                    </h1>
                </div>
                {/* 가운데: 카테고리 메뉴 */}
                <div className="menu-center">
                    <ul className="category-menu">
                        <li><Link to="/special">특가상품</Link></li>
                        <li><Link to="/productList">원두커피</Link></li>
                        <li><Link to="/coldbrew">콜드브루</Link></li>
                        <li><Link to="/gift">선물세트</Link></li>
                    </ul>
                </div>
                {/* 오른쪽: 로그인/회원가입/이용안내 + 장바구니 + 검색창 */}
                <div className="menu-right">
                    <ul className="user-menu">
                    {isLoggedIn ? (
                        <>
                            <li><Link to="/mypage">마이페이지</Link></li>
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
                    <Link to="/cart">
                        <img src="/icon/icon_cart.png" alt="Cart" className="cart-icon" />
                    </Link>
                    <div>
                        <input type="text" placeholder="검색어를 입력하세요" className="search-input" />
                        <img src="/icon/icon_search.png" alt="Cart" className="cart-icon" />
                    </div>
                </div>
            </nav>
        </header>
        
    )
}

export default MenuBar;