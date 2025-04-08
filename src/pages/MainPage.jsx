import { Link } from "react-router-dom" 
import { useState } from "react";
import BasicLayout from "../layouts/BasicLayout";


function MainPage(){
  
  
  // 이벤트 이미지를 관리하는 state
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  // 이벤트 클릭 시 상태 업데이트 함수
  const handleEventClick = (eventNumber) => {
    setSelectedEvent(eventNumber);
  };

    return(
        <>
          <BasicLayout>
          <main>
              <section>
                <h2>주간 BEST</h2>
                <div>
                  <p>아이템1</p>
                  <p>아이템2</p>
                  <p>아이템3</p>
                  <p>아이템4</p>
                </div>
              </section>
              <section>
                <h2>EVENT</h2>
                <div>
                  <p onClick={() => handleEventClick(1)}>이벤트1</p>
                  <p onClick={() => handleEventClick(2)}>이벤트2</p>
                  <p onClick={() => handleEventClick(3)}>이벤트3</p>
                  <div>
                    {selectedEvent === 1 && <img src="/event/event_banner1.jpg" alt="이벤트1 이미지" />}
                    {selectedEvent === 2 && <img src="/event/event_banner2.jpg" alt="이벤트2 이미지" />}
                    {selectedEvent === 3 && <img src="/event/event_banner.jpg" alt="이벤트3 이미지" />}
                  </div>
                </div>
              </section>
            </main>
          </BasicLayout>
        </>
    )
}
export default MainPage;