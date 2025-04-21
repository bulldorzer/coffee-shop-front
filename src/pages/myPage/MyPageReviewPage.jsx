import { useMember } from "../../component/myPage/MemberContextComponent";
import MyReviewList from "../../component/review/MyReviewList";

const MyPageReviewPage = () => {

    const member = useMember();
    return(
        // 나중에 로그인한 이이디값으로 변경해야함 - 진우
        <MyReviewList memberId={member.memberId} />
        
    )
}

export default MyPageReviewPage;