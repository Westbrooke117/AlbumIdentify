import {Box, Flex, Spinner, TableContainer, Text} from "@chakra-ui/react";

function PlaceholderImageGrid(){
 return (
     <>
         <TableContainer
             mt={7}
             mb={2}
             rounded={5}
             border='1px'
             borderColor={'#3f444e'}
         >
             <Box
                 rounded={4}
                 id="background-container"
                 backgroundRepeat="no-repeat"
                 backgroundPosition="center center"
                 backgroundSize="100%">
                 <Flex alignItems={"center"} justifyContent={"center"} height={"500px"}>
                     <Spinner/>
                 </Flex>
             </Box>
         </TableContainer>
     </>
 )
}

export default PlaceholderImageGrid;