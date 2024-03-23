import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Flex, Button, Card, CardBody, Divider, Text } from "@chakra-ui/react";
import React from "react";
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import QuestionCard from "./QuestionCard";
import { Exam } from "@/types";

type Props = {
  data: Exam;
  activeTab: number;
  onTabChange?: (index: number) => void;
};

function QuestionPanel({ data, activeTab, onTabChange }: Props) {
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
    onTabChange?.(index + 1);
  };

  React.useEffect(() => {
    setTabIndex(activeTab - 1);
  });

  return (
    <>
      {data.parts.map((part) => (
        <Box key={part.id}>
          {part.question_groups.map((questionGroup, index) => (
            <Card key={questionGroup.id} borderRadius={14} mb={4} boxShadow="sm">
              <CardBody>
                <Text fontWeight={600}>Question {questionGroup.name || questionGroup.group_index}</Text>
                {questionGroup.questions.map((question) => (
                  <QuestionCard key={question.id} question={question} />
                ))}
              </CardBody>
            </Card>
          ))}
        </Box>
      ))}
    </>
  );
}

export default QuestionPanel;
