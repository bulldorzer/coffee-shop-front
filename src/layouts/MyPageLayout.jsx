import React from "react";
import { Outlet } from "react-router-dom";
import SidebarMenu from "../component/menu/SideBarMenu";

// 마이페이지 기본 레이아웃 - 이재민
const MyPageLayout = () => {
  return (
    <div>
      {/* 왼쪽 사이드 메뉴 */}
      <aside>
        <h2>마이 페이지</h2>
        <hr/>
        <SidebarMenu />
      </aside>

      {/* 오른쪽 콘텐츠 영역 */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MyPageLayout;