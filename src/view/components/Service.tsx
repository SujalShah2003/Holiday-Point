import { Box, Flex, Grid, Paper, Stack, Text, Title } from "@mantine/core";
import React from "react";

const data = [
  {
    servicename: "International Packages",
    describe:
      "Explore top destinations like Bali, Dubai, and Singapore with our tailored travel packages.",
  },
  {
    servicename: "Domestic Packages",
    describe:
      "Discover India's breathtaking beauty with customized trips to Goa, Himachal, Kerala, and more.",
  },
  {
    servicename: "Air Tickets",
    describe:
      "Get the best deals on domestic and international flights with our expert assistance.",
  },
  {
    servicename: "Tourist Visa",
    describe:
      "Get your hassle-free tourist visa for India and other countries with our quick and reliable services.",
  },
];

const Service = () => {
  return (
    <>
      <Box my={{ base: "10%", md: "8%" }}>
        <Flex
          direction={"column"}
          justify={"center"}
          align={"center"}
          my={{ base: "md", md: "xl" }}
          ta={{ base: "start", sm: "center" }}
        >
          <Stack gap={"xs"}>
            <Text
              tt={"uppercase"}
              c={"var(--primary-color)"}
              fw={600}
              fz={{ base: "xs", sm: "md" }}
            >
              Services
            </Text>
            <Title
              fw={600}
              fz={{ base: 30, sm: 32, md: 40 }}
              px={{ base: "unset", sm: "md" }}
            >
              Explore Our Services
            </Title>
          </Stack>
        </Flex>

        <Grid gutter="xl">
          {data.map((item, i) => (
            <Grid.Col key={i} span={{ base: 12, md: 6, lg: 3 }}>
              <Paper radius={"lg"} h={"100%"} style={{ overflow: "hidden" }}>
                <Flex
                  justify={"space-between"}
                  p={"xl"}
                  h={"100%"}
                  bg={"var(--mantine-color-blue-light"}
                  wrap={"wrap"}
                >
                  <Title order={2} c={"var(--primary-color)"}>
                    {item.servicename}
                  </Title>
                  <Text mt={"sm"} c={"var(--text-gray-color)"}>
                    {item.describe}
                  </Text>
                </Flex>
              </Paper>
            </Grid.Col>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Service;
