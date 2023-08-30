import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Input,
  FormLabel,
  FormControl,
  FormHelperText,
  Button,
  Select,
  RadioGroup,
  Stack,
  Radio,
  Text,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
type Props = {};

const MainTest = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputState, setInputState] = useState("");
  const [dynamicElems, setDynamicElems] = useState<JSX.Element[]>([]);
  const [selectType, setSelectType] = useState("");
  const [keyEl, setKeyEl] = useState(1);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputState(e.target.value);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectType(e.target.value);
  };

  const addComponent = () => {
    const inputEl = (
      <FormControl key={keyEl}>
        {/* <FormLabel mt={4}>{selectType}</FormLabel> */}
        <Stack direction={"row"}>
          <Text py={2}>{keyEl}.</Text>
          <Input
            type="text"
            name="textInput"
            onChange={handleInputChange}
            placeholder="Enter question?"
          />
        </Stack>

        {/* <FormHelperText>Enter text provided</FormHelperText> */}
        <RadioGroup my={4}>
          <Stack direction="column">
            <Stack direction={"row"}>
              <Radio value="1"></Radio>
              <Input type="text" placeholder="A" />
            </Stack>
            <Stack direction={"row"}>
              <Radio value="2"></Radio>
              <Input type="text" placeholder="B" />
            </Stack>
            <Stack direction={"row"}>
              <Radio value="3"></Radio>
              <Input type="text" placeholder="C" />
            </Stack>
          </Stack>
        </RadioGroup>
      </FormControl>
    );

    setDynamicElems(() => [...dynamicElems, inputEl]);

    setKeyEl(keyEl + 1);
  };

  useEffect(() => {
    setInputState("Text");

    return () => {};
  }, []);

  return (
    <Container maxW="container.xl">
      <form onSubmit={onSubmit}>
        <FormControl>
          <FormLabel>Test Name</FormLabel>
          <Input type="text" name="textInput" />
          <FormHelperText>Enter text provided</FormHelperText>
        </FormControl>
        <Select
          mt={4}
          placeholder="Select option"
          w="full"
          onChange={handleSelectChange}
        >
          <option value="part1">Part 1</option>
          <option value="part1">Part 2</option>
          <option value="part1">Part 3</option>
          <option value="part1">Part 4</option>
          <option value="part1">Part 5</option>
          <option value="part1">Part 6</option>
          <option value="part1">Part 7</option>
        </Select>
        <Box mt={4}>{dynamicElems}</Box>
        <Button mt={4} w={"full"} onClick={addComponent}>
          <AddIcon />
        </Button>
        <Button type="submit" mt={4} colorScheme="teal" isLoading={isLoading}>
          Create
        </Button>
      </form>
    </Container>
  );
};

export default MainTest;
