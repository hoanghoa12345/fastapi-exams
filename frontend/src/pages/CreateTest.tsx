import React, { useState, useEffect } from 'react'
import { Box, FormControl, Heading, FormLabel, Stack, Select, Input, InputGroup, InputLeftAddon, Button } from '@chakra-ui/react'
import { getAllExams } from '@/services/getExams'
type Props = {}

function CreateTest({ }: Props) {
  const [selectAnswerType, setSelectAnsweType] = useState(4)
  const [answerArr, setAnswerArr] = useState([1, 2, 3, 4])

  const handleSelectAnswerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    if (e.target.value === '4') {
      setAnswerArr([1, 2, 3, 4])
    } else if (e.target.value === '3') {
      setAnswerArr([1, 2, 3])
    }
  }

  useEffect(() => {
    const fetchExams = async () => { const data = await getAllExams(); console.log(data) }
    fetchExams()
  }, [])
  return (
    <Box>
      <Heading as='h3' size='lg'>
        Create New Test
      </Heading>
      <Box>
        <FormControl>
          <FormLabel>Choose Test: </FormLabel>
          <Stack spacing={3}>
            <Select variant="outline" placeholder="--Choose Test--">
              <option value="1">Test 1</option>
              <option value="2">Test 2</option>
            </Select>
          </Stack>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Select Part</FormLabel>

          <Select
            //    mt={4}
            placeholder="--Select Part--"
            w="full"
          //  onChange={handleSelectChange}
          >
            <option value="part1">Part 1</option>
            <option value="part2">Part 2</option>
            <option value="part3">Part 3</option>
            <option value="part4">Part 4</option>
            <option value="part5">Part 5</option>
            <option value="part6">Part 6</option>
            <option value="part7">Part 7</option>
          </Select>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Enter Question</FormLabel>
          <InputGroup>
            <InputLeftAddon children="1." />
            <Input placeholder="Question" type='text' />
          </InputGroup>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Select Answer Type</FormLabel>
          <Select placeholder='Select Type' w='full' onChange={handleSelectAnswerChange}>
            <option value='4'>4 answers</option>
            <option value='3'>3 answers</option>
          </Select>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Enter Answers</FormLabel>

          <Box>{
            answerArr.map((index) => (

              <InputGroup key={index}>
                <InputLeftAddon children={index} />
                <Input placeholder={`Answer ${index}`} type='text' />
              </InputGroup>
            ))

          }</Box>

        </FormControl>
        <Button colorScheme='teal' type='button'>
          Create
        </Button>
      </Box>
    </Box>
  )
}

export default CreateTest
