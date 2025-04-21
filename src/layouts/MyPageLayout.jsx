import React from "react";
import { Outlet } from "react-router-dom";
import SidebarMenu from "../component/menu/SideBarMenu";
import {MemberProvider} from "../component/myPage/MemberContextComponent";
import "../css/myPage/MyPageLayout.css"

// 마이페이지 기본 레이아웃 - 이재민
const MyPageLayout = () => {
  return (
    <MemberProvider>
      <h2 className="title">마이 페이지</h2>
      <div className="mypage-layout">
        {/* 왼쪽 사이드 메뉴 */}
        <aside className="sidebar">
          <SidebarMenu />
        </aside>

        {/* 오른쪽 콘텐츠 영역 */}
        <main className="content">
          <Outlet />
        </main>
      </div>
    </MemberProvider>
  );
};

export default MyPageLayout;