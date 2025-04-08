import { Link } from "react-router-dom";


const MenuBar = () =>{
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
                    <li><Link to="/coffee">원두커피</Link></li>
                    <li><Link to="/coldbrew">콜드브루</Link></li>
                    <li><Link to="/gift">선물세트</Link></li>
                    </ul>
                </div>
                {/* 오른쪽: 로그인/회원가입/이용안내 + 장바구니 + 검색창 */}
                <div className="menu-right">
                    <ul className="user-menu">
                    <li><Link to="/login">로그인</Link></li>
                    <li><Link to="/signup">회원가입</Link></li>
                    <li><Link to="/guide">이용안내</Link></li>
                    </ul>
                    <Link to="/cart">
                    <img src="/icon/icon_search.png" alt="Cart" className="cart-icon" />
                    </Link>
                    <input type="text" placeholder="검색어를 입력하세요" className="search-input" />
                </div>
            </nav>
        </header>
        
    )
}

export default MenuBar;