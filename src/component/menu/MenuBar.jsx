import { Link } from "react-router-dom";


const MenuBar = () =>{
    return(
        
        <nav>
            <h1>
                <Link to={"/"}><img src="/logo/logo.png" alt="Main Logo"/></Link>
            </h1>
            <div>
                
            </div>
        </nav>
        
    )
}

export default MenuBar;