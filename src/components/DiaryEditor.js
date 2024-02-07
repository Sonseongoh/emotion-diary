import { useNavigate } from "react-router-dom";
import { useContext, useRef, useState } from "react";

import MyButton from "./MyButton";
import MyHeader from "./MyHeader";
import EmotionItem from "./EmotionItem";
import { DiaryDispatchContext } from "../App";

const emotionList = [
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
    emotion_descript: "완전 좋음",
  },
  {
    emotion_id: 2,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion2.png`,
    emotion_descript: "좋음",
  },
  {
    emotion_id: 3,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion3.png`,
    emotion_descript: "그럭저럭",
  },
  {
    emotion_id: 4,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion4.png`,
    emotion_descript: "나쁨",
  },
  {
    emotion_id: 5,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion5.png`,
    emotion_descript: "끔찍함",
  },
];

//2024-02-07  yyyy-mm-dd 형태로 날짜를 변경해준다
const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};

const DiaryEditor = () => {
  //focus 기능을 위하여
  const contentRef = useRef();
  //새로운 일기
  const [content, setContent] = useState("");

  const [emotion, setEmotion] = useState(3);

  //date의 기본값을 현재 날짜로 설정
  const [date, setDate] = useState(getStringDate(new Date()));

  //DiaryDispatchContext로 부터 onCreate를 받아옴
  const { onCreate } = useContext(DiaryDispatchContext);

  const handleClickEmote = (emotion) => {
    setEmotion(emotion);
  };

  const navigate = useNavigate();

  //작성완료 버튼
  const handleSubmit = () => {
    //한글자 이상 작성 안할 시 포커스
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }
    //App.js에서 확인 시 date,content,emotion 을 받는다
    onCreate(date, content, emotion);

    //home 으로 돌아가는데 이때 뒤로가기로 일기작성하는 페이지로 돌아가지 못하게 설정함
    navigate("/", { replace: true });
  };

  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={"새로운 일기 쓰기"}
        //뒤로가기
        leftChild={<MyButton text={"뒤로 가기"} onClick={() => navigate(-1)} />}
      />
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            {/* type='date'로 년월일 입력받는 입력창 생성 */}
            <input
              className="input_date"
              value={date}
              type="date"
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((el) => (
              // 스프레드연산자로 모든 데이터전달
              <EmotionItem
                key={el.emotion_id}
                {...el}
                onClick={handleClickEmote}
                // 자신이 선택된 감정인지 아닌지
                isSelected={el.emotion_id === emotion}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="input_box text_wrapper">
            <textarea
              placeholder="오늘은 어땠나요?"
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </section>
        <section>
          <div className="control_box">
            <MyButton text={"취소하기"} onClick={() => navigate(-1)} />
            <MyButton
              text={"작성완료"}
              type={"positive"}
              onClick={handleSubmit}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
