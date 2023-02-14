import React, { useState, useEffect } from "react";
import { Box, Flex, Image, Progress, SimpleGrid, Text } from "@chakra-ui/react";

import "./App.css";
import { TimeIcon } from "@chakra-ui/icons";

// logos
import computiq from "./assets/logos/computiq.png";
import cs50 from "./assets/logos/cs50.png";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("ws://server.mouamle.space:5600");

    ws.onopen = () => {
      console.log("WebSocket connection established");
    };

    ws.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setData(newData.sort((a, b) => b.votesCount - a.votesCount));
      console.log(newData);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error: ", error);
    };

    return () => {
      ws.close();
    };
  }, [data]);

  const totalVotes = data.reduce((acc, curr) => acc + curr.votesCount, 0);
  console.log(data);
  return (
    <>
      <Box padding={0} marginY={10} marginX={6} mt={5}>
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Flex justifyContent={"center"} alignItems={"center"} gap={3}>
            <Box w={90} h={90}>
              <Image src={cs50} alt="computiq"></Image>
            </Box>
          </Flex>
          <Flex justifyContent={"center"} gap={40}>
            <Flex gap={2}>
              <Text fontSize={25} fontWeight={"semibold"}>
                {totalVotes}
              </Text>
              <Text fontSize={25}>TOTAL VOTES</Text>
            </Flex>
            <Flex alignItems={"center"} gap={3}>
              <TimeIcon w={6} h={6} />
              <Text fontSize={25}>EXPIRED</Text>
            </Flex>
          </Flex>
          <Flex justifyContent={"center"} gap={5}>
            <Box w={120} h={120}>
              <Image src={computiq} alt="computiq"></Image>
            </Box>
          </Flex>
        </Flex>
      </Box>
      <SimpleGrid columns={3} spacingY={20} spacingX={120} marginX={10}>
        {data.map((element, index) => {
          const percentage = (element.votesCount / totalVotes) * 100;
          return (
            <Box w="100%" h="10" key={index}>
              <Text fontWeight={"bold"} ml={3}>
                {element.teamName}
              </Text>
              <Flex alignItems={"center"} gap={3} mt={2}>
                <Progress hasStripe value={percentage} height={5} flex={1} />

                <Text fontSize={18}>{percentage.toFixed(2) + "% ."}</Text>

                <Flex gap={1} fontSize={18}>
                  <Text fontWeight={"bold"}>{element.votesCount}</Text>
                  <Text>VOTES</Text>
                </Flex>
              </Flex>
            </Box>
          );
        })}
      </SimpleGrid>
    </>
  );
};

export default App;
