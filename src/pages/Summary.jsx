import {useParams} from "react-router-dom";
import {Text} from "@chakra-ui/react";

function Summary(){
    const { score, total } = useParams()
    return(
        <>
            <Text>You scored {score} out of {total} points!</Text>
        </>
    )
}

export default Summary;