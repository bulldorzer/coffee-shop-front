import { Link } from "react-router-dom" 
import BasicLayout from "../layouts/BasicLayout";

function MainPage(){
    return(
        <>
          <BasicLayout>
            <p>헤더부분</p>
            <p>메인부분</p>
            <p>푸터부분</p>
          </BasicLayout>
        </>
    )
}
export default MainPage;