import {useState} from "react";
import {Button, Container, Flex, FormControl, FormLabel, Heading, Input, Select, Table, Text, Tr, Td, Th, Thead, Tbody} from "@chakra-ui/react";
import {Link} from "react-router-dom";

function MenuPage(){
    const [formData, setFormData] = useState({
        username: "",
        period:"overall",
        difficulty: 5,
    })

    return (
        <Container>
            <Flex justifyContent={"center"} alignItems={"baseline"}>
                <Heading mb={5} mt={5} textAlign={"center"}>AlbumIdentify</Heading>
                <Text as={"sub"} style={{textDecoration:"underline"}}><Link to={"/changelog"}>v. 1.0.2</Link></Text>
                {/*Version numbering guidelines:*/}
                {/*First digit is for major update*/}
                {/*Second digit is for minor update*/}
                {/*Third digit is for a patch/bug fix*/}
            </Flex>
            <FormControl mt={5} mb={3}>
                <FormLabel>last.fm Username</FormLabel>
                <Input status={'error'} type='text' placeholder={"Enter last.fm username"} onChange={(event) => {
                    setFormData({
                        ...formData,
                        username: event.target.value
                    })
                }}/>
            </FormControl>
            <FormLabel>Time Period</FormLabel>
            <Select mb={3} name={"time-periods"} onChange={(event) => {
                setFormData({
                    ...formData,
                    period: event.target.value
                })
            }}>
                <option value={"overall"}>Overall</option>
                <option value={"7day"}>Last 7 Days</option>
                <option value={"1month"}>Last 30 days</option>
                <option value={"3month"}>Last 90 days</option>
                <option value={"6month"}>Last 180 days</option>
                <option value={"12month"}>Last 365 days</option>
            </Select>
            <FormLabel>Difficulty</FormLabel>
            <Select defaultValue={5} mb={3} name={"difficulty"} onChange={(event) => {
                setFormData({
                    ...formData,
                    difficulty: parseInt(event.target.value)
                })
            }}>
                <option value={3}>Easy (3x3)</option>
                <option value={5}>Medium (5x5)</option>
                <option value={7}>Hard (7x7)</option>
                <option value={9}>Insane (9x9)</option>
            </Select>
            <Link to={`/play/${formData.username}/${formData.period}/${formData.difficulty}`}>
                <Button w={"100%"}>Start Game</Button>
            </Link>
        </Container>
    )
}

export default MenuPage;