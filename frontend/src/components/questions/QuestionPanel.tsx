import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Flex,
  Button,
  Card,
  CardBody,
  Divider,
} from "@chakra-ui/react";
import React from "react";
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import QuestionCard from "./QuestionCard";
import { Exam } from "@/types";

type Props = {
  data: Exam;
};

function QuestionPanel({ data }: Props) {
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  return (
    <>
      <Tabs
        variant="enclosed"
        colorScheme="cyan"
        index={tabIndex}
        onChange={handleTabsChange}
        mt={4}
      >
        <TabList>
          {data.parts.map((part) => (
            <Tab key={part.id}>{part.name}</Tab>
          ))}
        </TabList>

        <TabPanels>
          {data.parts.map((part) => (
            <TabPanel key={part.id}>
              <Box>
                {part.question_groups.map((questionGroup, index) => (
                  <Box key={questionGroup.id}>
                    {questionGroup.questions.map((question) => (
                      <QuestionCard key={question.id} question={question} />
                    ))}
                    <Divider/>
                  </Box>
                ))}
              </Box>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
      <Flex justify={"space-between"} mx={4}>
        {tabIndex > 0 ? (
          <Button
            colorScheme="teal"
            variant={"outline"}
            onClick={() => handleTabsChange(tabIndex - 1)}
          >
            <ChevronLeftIcon />
            <span>Previous page</span>
          </Button>
        ) : null}
        {tabIndex < data.parts.length - 1 ? (
          <Button
            colorScheme="teal"
            variant="outline"
            onClick={() => handleTabsChange(tabIndex + 1)}
          >
            <span>Next page </span> <ChevronRightIcon />
          </Button>
        ) : null}
      </Flex>
    </>
  );
}

export default QuestionPanel;
