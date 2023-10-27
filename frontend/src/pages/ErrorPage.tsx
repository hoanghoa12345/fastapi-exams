import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import imageSrc from '@/assets/page_not_found.svg'
import { useRouteError } from 'react-router-dom';
const ErrorPage = () => {
    let error = useRouteError();
  return (
    <Box w='full' h='full' display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <div>
        <img src={imageSrc} alt='404 not found' width={300} height={300} />
           <Text fontSize={'2xl'} fontWeight={500} textAlign={'center'} py={4}>Page not found</Text> 
           {JSON.stringify(error)}
        </div>
    </Box>
  )
}

export default ErrorPage