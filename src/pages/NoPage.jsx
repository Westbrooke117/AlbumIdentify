import {Flex, Heading, Text} from "@chakra-ui/react";

function NoPage(){
    return (
        <div>
            <Flex mt={5} justifyContent={"center"} alignItems={"center"}>
                <Heading>Error 404</Heading>
            </Flex>
            <Flex justifyContent={"center"} alignItems={"center"}>
                <Text>Page not found</Text>
            </Flex>
        </div>
    )
}

export default NoPage;