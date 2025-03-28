import React from "react";
import { Box, Flex, Grid, Image, Stack, Text, Title } from "@mantine/core";
import TopHotels from "../../assets/img/hotels/Top-Hotels.png";
import SOU from "../../assets/img/hotels/SOU.png";
import Counter from "../../common/Counter";

const AboutUs = () => {
  return (
    <>
      <Grid>
        <Grid.Col span={{ base: 12, md: 6, lg: 8 }}>
          <Stack gap={"sm"}>
            <Text
              tt={"uppercase"}
              c={"var(--primary-color)"}
              fw={600}
              fz={{ base: "xs", sm: "md" }}
            >
              About Us
            </Text>
            <Title>Your perfect stay, just a click away!</Title>
            <Text c={"var(--text-gray-color)"} w={"80%"}>
              At{" "}
              <Text span fw={700}>
                Holiday Point
              </Text>
              , we customize your packages effortlessly with a wide range of
              stays across{" "}
              <Text span fw={700}>
                India and top International destinations
              </Text>{" "}
              like Bali, Dubai, and singapur. From luxury resorts to
              budget-friendly stays, enjoy exclusive deals,
              <Text span fw={700}>
                {" "}
                24/7 support
              </Text>
              , and a seamless booking experience.{" "}
              <Text fw={700}>Book now for a stress-free journey!</Text>
            </Text>

            <Flex my="md" justify="start" align="center" gap="xl">
              <Flex
                direction="column"
                align="center"
                gap="xs"
                w={"max-content"}
              >
                <Counter end={1000} />
                <Text c="dimmed">Success Trips</Text>
              </Flex>

              <Flex
                direction="column"
                align="center"
                gap="xs"
                w={"max-content"}
              >
                <Counter end={1500} />
                <Text c="dimmed">Happy Clients</Text>
              </Flex>
            </Flex>
          </Stack>
        </Grid.Col>
        <Grid.Col
          display={{ base: "none", sm: "block" }}
          span={{ base: 12, md: 6, lg: 4 }}
        >
          <Flex
            w="100%"
            h="100%"
            pos="relative"
            direction="column"
            align="start"
            justify="start"
          >
            <Box
              w="80%"
              pos="relative"
              // bottom="-40px"
              left="0px"
              style={{ zIndex: 3 }}
            >
              <Image
                src={TopHotels}
                w={350}
                h={250}
                radius="xl"
                style={{
                  outline: "10px solid #f3f3f3",
                  objectFit: "cover",
                }}
              />
            </Box>
            
            <Box
              w="80%"
              pos="absolute"
              top="35%"
              right="5%"
              style={{ zIndex: 2 }}
            >
              <Image
                src={SOU}
                w={300}
                h={300}
                pos={"absolute"}
                top={0}
                right={0}
                radius="xl"
                style={{
                  outline: "10px solid #f3f3f3",
                  objectFit: "cover",
                  opacity: 0.85,
                  filter: "blur(0.5px)",
                }}
              />
            </Box>
          </Flex>
        </Grid.Col>
      </Grid>
    </>
  );
};

export default AboutUs;
