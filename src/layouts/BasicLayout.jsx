

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