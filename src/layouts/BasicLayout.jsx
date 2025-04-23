import { Outlet } from "react-router-dom";
import Footer from "../component/footer/Footer";
import MenuBar from "../component/menu/MenuBar";
import "../css/layout/BasicLayout.css";


/**
 * 최진우제작
 * @param {*} children 
 * @returns 
 * BasicLayout태그로 감싸면 자식 태그가 div 위치에 표시됨
 */
const BasicLayout = ({children}) => {
    return(
        <>
            
            <MenuBar></MenuBar>
            <div>
                <main className="main">{children}<Outlet /></main>  
            </div>
            <Footer></Footer>
        </>
    )
}
export default BasicLayout;