import Footer from "../component/footer/Footer";
import MenuBar from "../component/menu/MenuBar";


/**
 * 
 * @param {*} children 
 * @returns BasicLayout태그로 감싸면 해당 태그가 div 위치에 표시됨
 */
const BasicLayout = ({children}) => {
    return(
        <>
            
            <MenuBar></MenuBar>
            <div>
                <main className="main">{children}</main>
            </div>
            <Footer></Footer>
        </>
    )
}
export default BasicLayout;