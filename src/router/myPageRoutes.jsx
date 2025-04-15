import React, { lazy, Suspense } from "react";
import MyPageLayout from "../layouts/MyPageLayout";
import BasicLayout from "../layouts/BasicLayout";
import MyPageOrders_CancelPage from "../pages/myPage/MyPageOrders_CancelPage";
import MyPageOrdersPage from "../pages/myPage/MyPageOrdersPage";
import MyPageMemberSavePage from "../pages/myPage/MyPageMemberSavePage";
import MyPageRewardsPage from "../pages/myPage/MyPageRewardsPage";
import MyPageProfilePage from "../pages/myPage/MyPageProfilePage";
import MyPageProductQnAPage from "../pages/myPage/MyPageProductQnAPage";
import MyPageSupportPage from "../pages/myPage/MyPageSupportPage";
import MyPageDeleteAccountPage from "../pages/myPage/MyPageDeleteAccountPage";
import MyPageReviewPage from "../pages/myPage/MyPageReviewPage";

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
              element: <Suspense fallback={loading}><MyPageOrdersPage /></Suspense>,
            },
            {
              path: "orders", // /mypage/orders
              element: <Suspense fallback={loading}><MyPageOrdersPage /></Suspense>,
            },
            {
              path: "orders_cancel",
              element: <Suspense fallback={loading}><MyPageOrders_CancelPage /></Suspense>,
            },
            {
              path: "membersave",
              element: <Suspense fallback={loading}><MyPageMemberSavePage /></Suspense>
            },
            {
              path: "rewards",
              element: <Suspense fallback={loading}><MyPageRewardsPage /></Suspense>
            },
            {
              path: "profile",
              element: <Suspense fallback={loading}><MyPageProfilePage /></Suspense>
            },
            {
              path: "productQnA",
              element: <Suspense fallback={loading}><MyPageProductQnAPage /></Suspense>
            },
            {
              path: "support",
              element: <Suspense fallback={loading}><MyPageSupportPage /></Suspense>
            },
            {
              path: "deleteaccount",
              element: <Suspense fallback={loading}><MyPageDeleteAccountPage /></Suspense>
            },
            {
              path: "review",
              element: <Suspense fallback={loading}><MyPageReviewPage /></Suspense>
            }
        ]
    }
  ]
};

export default myPageRoutes;
