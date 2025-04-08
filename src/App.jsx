import { RouterProvider } from "react-router-dom";
import root from "./router/root";
// css 추후 추가 예정


function App() {
  
  /* 라우터 위치 표시 */
  return (
    <RouterProvider router={root}/>
  )
}

export default App
