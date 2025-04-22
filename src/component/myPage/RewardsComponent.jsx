import {useMember} from "../myPage/MemberContextComponent"
import "../../css/myPage/Rewards.css"

// 마이페이지 혜택관리 - 이재민
const RewardsComponent = () => {
    const member = useMember();
    if (!member) {
        return <div>회원 정보를 불러오는 중입니다...</div>;
      }
    return (
     <div className="rewards-page">
        <section className="membership">
            <p className="membership-status">현재 회원등급: {member.memberShip}</p>
            <div className="explanation">
                <p>
                    Bronze<br/>
                    구매 금액의 0.5% 마일리지 적립<br/>
                    <br/>
                    Silver (누적 구매 금액 10만원 이상)<br/>
                    5% 할인 혜택, 0.7% 마일리지 적립<br/>
                    <br/>
                    Gold (누적 구매 금액 20만원 이상)<br/>
                    7% 할인 혜택, 1.2% 마일리지 적립<br/>
                    <br/>
                    VIP ( 누적 구매 금액 30만원 이상)<br/>
                    10% 할인 혜택, 2% 마일리지 적립
                </p>
            </div>
        </section>
        <section className="point">
            <p className="remaining-points">잔여 마일리지: {member.point}원</p>
            <div className="explanation">
                <p>
                    마일리지 제도<br/>
                    ① 저희 콩볶는사람들 원두커피 쇼핑몰 홀릭커피는 마일리지를 사용할 수 있습니다.<br/>
                    ② 마일리지 100점은 현금 100원과 같습니다.<br/>
                    ③ 마일리지는 3000원 이상 되어야 사용하실 수 있고 쇼핑몰 내에서 현금처럼 사용이 가능합니다.<br/>
                    ④ 마일리지의 유효기간은 지급일로부터 1년이며, 1년 후에는 소멸됩니다.<br/>
                    ⑤ 1년 이상 장기 미로그인 시 휴먼회원으로 전환되며, 휴면회원 전환 후 보유 마일리지는 소멸됩니다.
                </p>
            </div>
        </section>
     </div>   
    )

}


export default RewardsComponent;