import { Box, Flex, Progress, SimpleGrid, Text } from "@chakra-ui/react";

const CustomCard = ({ data }) => {
  console.log(data);
  return (
    <SimpleGrid columns={3} spacingY={40} spacingX={120} marginX={10}>
      {data.map((element, index) => {
        return (
          <Box w="100%" h="10" key={index}>
            <Text fontWeight={"bold"} ml={3}>
              {element}
            </Text>
            <Flex alignItems={"center"} gap={3} mt={2}>
              <Progress hasStripe value={40} height={5} flex={1} />
              <Text>{element + "% ."}</Text>

              <Flex gap={1}>
                <Text fontWeight={"bold"}>{element}</Text>
                <Text>VOTES</Text>
              </Flex>
            </Flex>
          </Box>
        );
      })}
    </SimpleGrid>
  );
};

export default CustomCard;
