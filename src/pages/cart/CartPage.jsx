import React from "react";
import BasicLayout from "../../layouts/BasicLayout";
import CartComponent from "../../component/cart/CartComponent";

/**
 * 카트 페이지 - 진우
 * @returns 
 */
const CartPage = () => {
  return (
    <BasicLayout>
        <h2>장바구니</h2>
        <CartComponent/>
    </BasicLayout>
  );
};

export default CartPage;
