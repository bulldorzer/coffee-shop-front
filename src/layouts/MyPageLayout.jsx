import React from "react";
import { Outlet } from "react-router-dom";
import SidebarMenu from "../component/menu/SideBarMenu";
import {MemberProvider} from "../component/myPage/MemberContextComponent";

// 마이페이지 기본 레이아웃 - 이재민
const MyPageLayout = () => {
  return (
    <MemberProvider>
      <div>
        {/* 왼쪽 사이드 메뉴 */}
        <aside>
          <h2>마이 페이지</h2>
          <SidebarMenu />
        </aside>

        {/* 오른쪽 콘텐츠 영역 */}
        <main>
          <Outlet />
        </main>
      </div>
    </MemberProvider>
  );
};

export default MyPageLayout;