import { useState } from "react";

const sortOptionList = [
  {
    value: "latest",
    name: "최신순",
  },
  {
    value: "oldest",
    name: "오래된 순",
  },
];

const filterOptionList = [
  { value: "all", name: "모두" },
  { value: "good", name: "좋은 감정만" },
  { value: "bad", name: "나쁜 감정만" },
];

// 정렬기능
const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select value={value} onChange={(el) => onChange(el.target.value)}>
      {optionList.map((el, idx) => (
        <option key={idx} value={el.value}>
          {el.name}
        </option>
      ))}
    </select>
  );
};

const DiaryList = ({ diaryList }) => {
  const [sortType, setSortType] = useState("latest");
  const [filter, setFilter] = useState("all");

  const getProcessedDiaryList = () => {
    // 필터링을 할 수 있는 함수
    const filterCallBack = (item) => {
      if (filter === "good") {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    };

    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };
    // 깊은복사
    const copyList = JSON.parse(JSON.stringify(diaryList));

    const filteredList =
      filter === "all" ? copyList : copyList.filter((el) => filterCallBack(el));

    const sortedList = filteredList.sort(compare);
    return sortedList;
  };

  return (
    <div>
      <ControlMenu
        value={sortType}
        onChange={setSortType}
        optionList={sortOptionList}
      />
      <ControlMenu
        value={filter}
        onChange={setFilter}
        optionList={filterOptionList}
      />
      {getProcessedDiaryList().map((el) => (
        <div key={el.id}>
          {el.content} {el.emotion}
        </div>
      ))}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
