import { Link } from "react-router-dom" 
import { useState } from "react";
import BasicLayout from "../layouts/BasicLayout";

// 메인 페이지 - 이재민
// 아이템 -> 클릭시 아이템 상세 페이지로 이동 추후 변경
function MainPage(){
  
  // 이벤트 이미지를 관리하는 state
  const [selectedEvent, setSelectedEvent] = useState(1);
  
    return(
        <>
          <BasicLayout>
          <main>
              <section>
                <h2>주간 BEST</h2>
                <div>
                  <a>아이템1</a>
                  <a>아이템2</a>
                  <a>아이템3</a>
                  <a>아이템4</a>
                </div>
              </section>
              <section>
                <h2>EVENT</h2>
                <div>
                  <button onClick={() => setSelectedEvent(1)}>이벤트1</button>
                  <button onClick={() => setSelectedEvent(2)}>이벤트2</button>
                  <button onClick={() => setSelectedEvent(3)}>이벤트3</button>
                  <div>
                    {selectedEvent === 1 && <img src="/event/event_baner1.jpg" alt="이벤트1 이미지" />}
                    {selectedEvent === 2 && <img src="/event/event_baner2.jpg" alt="이벤트2 이미지" />}
                    {selectedEvent === 3 && <img src="/event/event_baner3.jpg" alt="이벤트3 이미지" />}
                  </div>
                </div>
              </section>
            </main>
          </BasicLayout>
        </>
    )
}
export default MainPage;