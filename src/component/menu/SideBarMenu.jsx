import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../../css/menu/SideBarMenu.css"

// 마이페이지 사이드메뉴 - 이재민
const menu = [
  {
    title: "쇼핑정보",
    items: [
      { label: "- 주문목록/배송조회", path: "/mypage/orders" },
      { label: "- 취소/환불/교환내역", path: "/mypage/orders_cancel" },
      { label: "- 장바구니", path: "/mypage/cart" },
      { label: "- 관심상품", path: "/mypage/membersave" },
    ],
  },
  {
    title: "혜택관리",
    items: [{ label: "- 회원등급/마일리지", path: "/mypage/rewards" }],
  },
  {
    title: "회원정보",
    items: [{ label: "- 회원정보 변경/탈퇴", path: "/mypage/profile" }],
  },
  {
    title: "고객센터",
    items: [
      { label: "- 나의 상품문의", path: "/mypage/productQnA" },
      { label: "- 이용 문의", path: "/mypage/support" },
      { label: "- 나의 리뷰", path: "/mypage/review" }
    ],
  },
];

function SidebarMenu() {
  const location = useLocation();

  return (
    <nav>
      {menu.map((section, index) => (
        <div key={index}>
          <h3>{section.title}</h3>
          <ul>
            {section.items.map((item, idx) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={idx} className={isActive ? "active" : ""}>
                  <Link to={item.path}>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export default SidebarMenu;