import React from 'react'
import { Heading, Box, Text } from '@chakra-ui/react'
import { Link } from "react-router-dom";

type Props = {}

function LeftSidebar({}: Props) {
  return (
    <React.Fragment>
       <Heading as="h3" size={"lg"} color="cyan.600">
          Dashboard
        </Heading>
        <Box py={2}>
          <Text fontWeight={600}>Welcome user!</Text>
          <Link to="/main-test">Go to main </Link>
        </Box>
    </React.Fragment>
  )
}

export default LeftSidebar