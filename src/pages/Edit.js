import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {
  const [originData, setOriginData] = useState();
  const navigate = useNavigate();
  //지금 현재 전달받은 아이디를 꺼내주도록
  const { id } = useParams();

  const diaryList = useContext(DiaryStateContext);

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감정일기장 - ${id}번 일기 수정`;
  }, []);

  //다이어리 리스트에서 id 값과 일치하는 id를 갖는 일기 꺼내주기(현재 수정하려는일기), Edit 컴포넌트가 mount 될떄
  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (el) => parseInt(el.id) === parseInt(id)
      );
      console.log(targetDiary);

      //없는 일기일 경우 home으로 보내준다
      if (targetDiary) {
        setOriginData(targetDiary);
      } else {
        alert("없는 일기입니다");
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);

  return (
    <div>
      {/* originData가 있으면 DiaryEditor  */}
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  );
};

export default Edit;
