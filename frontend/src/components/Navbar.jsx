import {Box, Button, Container, Flex, HStack, Text, useColorMode, useColorModeValue} from "@chakra-ui/react";
import {PlusSquareIcon} from "@chakra-ui/icons";
import {IoMoon} from "react-icons/io5";
import {LuSun} from "react-icons/lu";
import {Link} from "react-router-dom";

const Navbar = () => {
    const {colorMode, toggleColorMode} = useColorMode();
    return <Box as="header" w="100%" bg={useColorModeValue("red.100", "gray.900")}>
        <Container maxW="1140px" px={4} minW="1200px">
            <Flex
                h={16}
                w="100%"
                alignItems={"center"}
                justify="space-between"
                flexDir={{base: "column", sm: "row"}}
            >
                <Text
                    bgGradient='linear(to-l, cyan.400, blue.500)'
                    bgClip='text'
                    textTransform={"uppercase"}
                    textAlign={"center"}
                    fontSize={{base: "22", sm: "28"}}
                    fontWeight='bold'
                >
                    <Link to={"/"}> Product Store </Link>
                </Text>
                <HStack spacing={2} alignItems={"center"}>
                    <Link to={"/create"}>
                        <Button>
                            <PlusSquareIcon fontSize={20}></PlusSquareIcon>
                        </Button>
                    </Link>
                    <Button onClick={toggleColorMode}>
                        {colorMode === "light" ? <IoMoon/> : <LuSun/>}
                    </Button>
                </HStack>
            </Flex>
        </Container>
    </Box>
}
export default Navbar