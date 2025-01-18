import React, { useState, useEffect, useCallback } from "react";
import { Box, Flex, Image, Progress, SimpleGrid, Text } from "@chakra-ui/react";
import { TimeIcon } from "@chakra-ui/icons";
import "./App.css";

import computiq from "./assets/logos/computiq.png";
import cs50 from "./assets/logos/cs50.png";

const App = () => {
  const [data, setData] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState("connecting");

  const processData = (newData) => {
    try {
      if (Array.isArray(newData)) {
        const processedData = newData
          .map((item) => ({
            ...item,
            votesCount: Number(item.votesCount) || 0,
          }))
          .filter((item) => item.votesCount > 0);
        setData(processedData);
      } else if (typeof newData === "object" && newData !== null) {
        setData((prevData) => {
          const newVotesCount = Number(newData.votesCount) || 0;

          if (newVotesCount === 0) {
            return prevData.filter(
              (team) => team.teamName !== newData.teamName
            );
          }

          const updatedData = [...prevData];
          const teamIndex = updatedData.findIndex(
            (team) => team.teamName === newData.teamName
          );

          if (teamIndex !== -1) {
            updatedData[teamIndex] = {
              ...updatedData[teamIndex],
              votesCount: newVotesCount,
            };
          } else {
            updatedData.push({
              ...newData,
              votesCount: newVotesCount,
            });
          }

          return updatedData;
        });
      }
    } catch (error) {
      console.error("Error processing data:", error);
    }
  };

  const connectWebSocket = useCallback(() => {
    try {
      const ws = new WebSocket("ws://176.57.184.160:5400");

      ws.onopen = () => {
        setConnectionStatus("connected");
      };

      ws.onmessage = (event) => {
        try {
          const newData = JSON.parse(event.data);
          processData(newData);
        } catch (error) {
          console.error("Error:", error);
        }
      };

      ws.onerror = (error) => {
        setConnectionStatus("error");
      };

      ws.onclose = () => {
        setConnectionStatus("disconnected");
        setTimeout(connectWebSocket, 5000);
      };

      return ws;
    } catch (error) {
      setConnectionStatus("error");
      return null;
    }
  }, []);

  useEffect(() => {
    const ws = connectWebSocket();
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [connectWebSocket]);

  const totalVotes = data.reduce(
    (acc, curr) => acc + (curr.votesCount || 0),
    0
  );

  return (
    <>
      <Box padding={0} marginY={10} marginX={6} mt={5}>
        <Flex justifyContent="space-between" alignItems="center">
          <Flex justifyContent="center" alignItems="center" gap={3}>
            <Box w={90} h={90}>
              <Image src={cs50} alt="CS50 Logo" />
            </Box>
          </Flex>

          <Flex justifyContent="center" gap={40}>
            <Flex gap={2}>
              <Text fontSize={25} fontWeight="semibold">
                {totalVotes}
              </Text>
              <Text fontSize={25}>TOTAL VOTES</Text>
            </Flex>
            <Flex alignItems="center" gap={3}>
              <TimeIcon w={6} h={6} />
              <Text fontSize={25}>EXPIRED</Text>
            </Flex>
          </Flex>

          <Flex justifyContent="center" gap={5}>
            <Box w={120} h={120}>
              <Image src={computiq} alt="Computiq Logo" />
            </Box>
          </Flex>
        </Flex>
      </Box>

      <SimpleGrid columns={3} spacingY={20} spacingX={120} marginX={10}>
        {data.map((element, index) => {
          const votesCount = element.votesCount || 0;
          const percentage = totalVotes ? (votesCount / totalVotes) * 100 : 0;

          return (
            <Box w="100%" h="10" key={element.teamName || index}>
              <Text fontWeight="bold" ml={3}>
                {element.teamName}
              </Text>
              <Flex alignItems="center" gap={3} mt={2}>
                <Progress hasStripe value={percentage} height={5} flex={1} />
                <Text fontSize={18}>{percentage.toFixed(2)}% .</Text>
                <Flex gap={1} fontSize={18}>
                  <Text fontWeight="bold">{votesCount}</Text>
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
