import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Flex, Button } from "@chakra-ui/react";
import React from "react";
import {ChevronRightIcon, ChevronLeftIcon} from '@chakra-ui/icons'
import { Part } from "@/types";
import QuestionCard from "./QuestionCard";

type Props = {
  data: Part[];
};

function QuestionPanel({ data }: Props) {
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };
  return (
    <>
      <Tabs
        variant="soft-rounded"
        colorScheme="cyan"
        index={tabIndex}
        onChange={handleTabsChange}
      >
        <TabList>
          {data.map((d) => (
            <Tab key={d.testPart.name}>Part {d.testPart.name}</Tab>
          ))}
        </TabList>

        <TabPanels>
          {data.map((d, i) => (
            <TabPanel key={i}>
              <Box>
                {d.testPart.items.map((items, index) => (
                  <QuestionCard key={index} items={items} />
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
            onClick={() => handleTabsChange(tabIndex - 1)}
          >
            <ChevronLeftIcon/>
            <span>
            Previous page
            </span>
          </Button>
        ) : null}
        {tabIndex < data.length - 1 ? (
          <Button
            colorScheme="teal"
            onClick={() => handleTabsChange(tabIndex + 1)}
          >
            <span>Next page </span> <ChevronRightIcon/>
          </Button>
        ) : null}
      </Flex>
    </>
  );
}

export default QuestionPanel;
