// 회원 탈퇴 - 이재민
const DeleteAccountComponent = () => {

    return(
        <div>
            <p>
                콩볶는사람들 원두커피쇼핑몰 홀릭커피 탈퇴안내<br/>
                <br/>
                쇼핑몰 이용에 불편하셨던 점이나 붐만사항을 알려주시면 적극 반영해서 고객님의 불편함을 해결해 드리도록 노력하겠습니다.<br/>
                <br/>
                아울러 회원 탈퇴시의 아래 사항을 숙지하시기 바랍니다.<br/>
                1. 회원 탈퇴 시 회원님의 정보는 상품 반품 및 A/S를 위해 전자상거래 등의 소비자 보호에 관한 볍률에 의거한 고객정보 보호 정책에 따라 괸리 됩니다.<br/>
                2. 탈퇴 시 회원님께서 보유하셨던 마일리지는 삭제 됩니다.
            </p>
            <hr/>
            <label>* 비밀번호 확인</label><input />
            <button>회원 탈퇴</button>
        </div>
    )
}

export default DeleteAccountComponent;