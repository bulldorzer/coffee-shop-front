import React, { lazy, Suspense } from "react";
import MyPageLayout from "../layouts/MyPageLayout";
import BasicLayout from "../layouts/BasicLayout";
import MyPageOrders_CANCEL from "../pages/MyPageOrders_CANCEL";
import MyPageOrders from "../pages/MyPageOrders";
import MyPageMemberSave from "../pages/MyPageMemberSave";
import MyPageRewards from "../pages/MyPageRewards";
import MyPageProfile from "../pages/MyPageProfile";
import MyPageProductQnA from "../pages/MyPageProductQnA";
import MyPageSupport from "../pages/MyPageSupport";

const loading = <div>Loading...</div>;

const myPageRoutes = {
  path: "/mypage",
  element: <BasicLayout />,
  children: [
    {
        element: <MyPageLayout />,
        children: [
            {
              index: true, // /mypage 접근 시 기본
              element: <Suspense fallback={loading}><MyPageOrders /></Suspense>,
            },
            {
              path: "orders", // /mypage/orders
              element: <Suspense fallback={loading}><MyPageOrders /></Suspense>,
            },
            {
              path: "orders_cancel",
              element: <Suspense fallback={loading}><MyPageOrders_CANCEL /></Suspense>,
            },
            {
              path: "membersave",
              element: <Suspense fallback={loading}><MyPageMemberSave /></Suspense>
            },
            {
              path: "rewards",
              element: <Suspense fallback={loading}><MyPageRewards /></Suspense>
            },
            {
              path: "profile",
              element: <Suspense fallback={loading}><MyPageProfile /></Suspense>
            },
            {
              path: "productQnA",
              element: <Suspense fallback={loading}><MyPageProductQnA /></Suspense>
            },
            {
              path: "support",
              element: <Suspense fallback={loading}><MyPageSupport /></Suspense>
            }
        ]
    }
  ]
};

export default myPageRoutes;
