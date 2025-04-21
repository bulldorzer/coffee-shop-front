import React from "react";
import BasicLayout from "../../layouts/BasicLayout";

/**
 * 카트 페이지 - 진우
 * @returns 
 */
const CartPage = () => {
  return (
    <div className="p-8 space-y-6">
    {/* 장바구니 title 공통부분으로 빠질부분 */}
    <h2 className="text-4xl font-bold text-center">장바구니</h2>
    <hr/>

    <div className="border border-black">
        <div className="flex bg-gray-200">
                <div className="w-1/2 text-center p-2 border-r border-black">배송상품(0)</div>
        </div>

        <div className="bg-gray-100 text-center grid grid-cols-8 border-t border-black text-sm">
            <div className="p-2 border-r border-black">&nbsp;</div>
            <div className="p-2 border-r border-black">이미지</div>
            <div className="p-2 border-r border-black col-span-2">상품정보</div>
            <div className="p-2 border-r border-black">판매가</div>
            <div className="p-2 border-r border-black">수량</div>
            <div className="p-2 border-r border-black">배송비</div>
            <div className="p-2 border-black">합계</div>
        </div>

        <div className="grid grid-cols-8 text-center items-center border-t border-black">
        <div className="p-2 border-r border-black">
            <input type="checkbox" />
        </div>
        <div className="p-2 border-r border-black">
            <div className="w-20 h-20 border border-black mx-auto bg-gray-200" />
        </div>
        <div className="p-2 border-r border-black col-span-2 text-left">
            <div>상품 이름</div>
            <div className="text-xs">[옵션 : ]</div>
            <button className="border border-black px-2 py-0.5 text-xs mt-1">옵션변경</button>
        </div>
        <div className="p-2 border-r border-black">원</div>
            <div className="p-2 border-r border-black">
                <input
                type="number"
                className="w-16 border border-black text-center"
                min={0}
                defaultValue={0}
                />
            </div>
            <div className="p-2 border-r border-black">3000원</div>
            <div className="p-2">
                <div>원</div>
                <div className="flex flex-col gap-1 mt-1">
                <button className="border border-black px-2 text-sm">주문하기</button>
                <button className="border border-black px-2 text-sm">삭제</button>
                </div>
            </div>
        </div>

        <div className="text-center bg-yellow-300 py-1 font-bold border-t border-black">
        목록 생략
        </div>
    </div>

        <div className="border border-black">
            <div className="grid grid-cols-3 bg-white text-center text-lg font-bold border-b border-black">
                <div className="p-2 border-r border-black">총 상품 금액</div>
                <div className="p-2 border-r border-black">총 배송비</div>
                <div className="p-2">총 금액</div>
                </div>
                <div className="grid grid-cols-3 text-center text-lg h-16">
                <div className="p-2 border-r border-black">원</div>
                <div className="p-2 border-r border-black">원</div>
                <div className="p-2">원</div>
            </div>
        </div>

        <div className="flex justify-center gap-6 pt-4">
            <button className="border border-black px-6 py-2 text-lg">선택 제품 구매</button>
            <button className="border border-black px-6 py-2 text-lg">전체 구매</button>
        </div>
    </div>
  );
};

export default CartPage;
