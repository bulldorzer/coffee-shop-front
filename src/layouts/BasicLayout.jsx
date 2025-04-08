

/**
 * 
 * @param {*} children 
 * @returns BasicLayout태그로 감싸면 해당 태그가 div 위치에 표시됨
 */
const BasicLayout = ({children}) => {
    return(
        <>
            <header>
                <h1>Header</h1>
            </header>
            <div>
                <main className="main">{children}</main>
            </div>
        </>
    )
}
export default BasicLayout;