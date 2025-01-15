import { Box, Flex, Text } from "@chakra-ui/react";
import { TimeIcon } from "@chakra-ui/icons";
import React from "react";

const Header = ({ data }) => {
  return (
    <>
      <Box padding={0} marginY={10} marginX={6} mt={5}>
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Flex justifyContent={"center"} gap={3}>
            <Box w={100} h={100} bg={"blue.500"}>
              CS50X
            </Box>
            <Box w={100} h={100} bg={"green.500"}>
              WEB50X
            </Box>
          </Flex>
          <Flex justifyContent={"center"} gap={40}>
            <Flex gap={2}>
              <Text fontSize={25} fontWeight={"semibold"}>
                100
              </Text>
              <Text fontSize={25}>TOTAL VOTES</Text>
            </Flex>
            <Flex alignItems={"center"} gap={3}>
              <TimeIcon w={6} h={6} />
              <Text fontSize={25}>EXPIRED</Text>
            </Flex>
          </Flex>
          <Flex justifyContent={"center"} gap={5}>
            <Box w={100} h={100} bg={"green.500"}>
              1
            </Box>
            <Box w={100} h={100} bg={"purple"}>
              AI50X
            </Box>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default Header;
