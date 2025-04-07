import { Link } from "react-router-dom" 

function MainPage(){
    return(
        <>
            <header>
                <h1>
                    <Link to="/">로고</Link>
                </h1>
                <nav>
                    <ul>
                        <li><Link to="/">메뉴1</Link></li>
                        <li><Link to="/">메뉴2</Link></li>
                        <li><Link to="/">메뉴3</Link></li>
                    </ul>
                </nav>
                <div className="useUtil">
                    <ul>
                        <li><Link to="/">장바구니</Link></li>
                        <li><Link to="/">로그인</Link></li>
                    </ul>
                </div>
            </header>
            <main>
                <section className="container">
                    <h3>
                        메인 콘텐츠1
                    </h3>
                    <div>
                        <p>메인 콘텐츠 내용</p>
                    </div>
                </section>
                <section className="container">
                    <h3>
                        메인 콘텐츠2
                    </h3>
                    <div>
                        <p>메인 콘텐츠 내용</p>
                    </div>
                </section>
            </main>
            <footer>
                <h2>
                    로고
                </h2>
                <address>
                    회사 주소
                </address>
            </footer>
        </>
    )
}
export default MainPage;