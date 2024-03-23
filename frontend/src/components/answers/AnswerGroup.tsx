import { Part } from "@/types";
import React from "react";
import AnswerItem from "./AnswerItem";

type Props = {
  part: Part;
};

function AnswerGroup({ part }: Props) {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([""]);

  const handleChangeValue = (newValue: string, groupIndex: number) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[groupIndex] = newValue;
    setSelectedOptions(newSelectedOptions);
  };

  return (
    <>
      {part.testPart.items.map((items, index) => (
        <AnswerItem
          key={index}
          items={items}
          index={index}
          value={selectedOptions[index]}
          setValue={(newValue: string) => handleChangeValue(newValue, index)}
        />
      ))}
    </>
  );
}

export default AnswerGroup;
