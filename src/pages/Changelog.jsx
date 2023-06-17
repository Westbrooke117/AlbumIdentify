import {Button, Container, Heading, Text} from "@chakra-ui/react";
import {Link} from "react-router-dom";

function Changelog(){
    return (
        <div>
            <Container>
                <Button mt={2}><Link to={"/"}>Go back</Link></Button>
                <Heading mb={2} mt={2}>Changelog</Heading>
                <hr/>
                <Text mt={2} style={{fontWeight:"bold"}}>v. 1.0.2</Text>
                <ul>
                    <li>Added a results breakdown table in the post-game summary</li>
                </ul>
                <Text mt={2} style={{fontWeight:"bold"}}>v. 1.0.1</Text>
                <ul>
                    <li>Increased album sample size to top 50</li>
                    <li>Added blacklist to filter out album variations</li>
                </ul>
            </Container>
        </div>
    )
}

export default Changelog;