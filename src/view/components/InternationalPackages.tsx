import React from "react";

import {
  Box,
  Flex,
  Grid,
  Image,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import classes from "../../assets/css/app.module.css";

import Bali from "../../assets/img/international-place/Bali.jpg";
import Vietnam from "../../assets/img/international-place/Vietnam.jpg";
import Dubai from "../../assets/img/international-place/Dubai.jpg";
import SingaporeMalaysia from "../../assets/img/international-place/Singapur-Malaysia.jpg";
import Maldives from "../../assets/img/international-place/Maldives.jpg";
import SriLanka from "../../assets/img/international-place/SriLanka.jpg";

const placeData = [
  { name: "Vietnam", image: Vietnam },
  { name: "Dubai", image: Dubai },
  { name: "Singapore Malaysia", image: SingaporeMalaysia },
  { name: "Maldives", image: Maldives },
  { name: "Bali", image: Bali },
  { name: "Sri Lanka", image: SriLanka },
];

const InternationalPackages = () => {
  return (
    <>
      <Box my={{ base: "20%", md: "8%" }}>
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
              Destination
            </Text>
            <Title
              fw={600}
              fz={{ base: 30, sm: 32, md: 40 }}
              px={{ base: "unset", sm: "md" }}
            >
              <Text span c={"var(--primary-color)"} fz={"inherit"} fw={600}>
                International Packages
              </Text>{" "}
              Experience Luxury and Comfort
            </Title>
            <Text
              c={"var(--text-gray-color"}
              fz={{ base: "sm", sm: "md" }}
              px={{ base: "unset", sm: "md" }}
            >
              {" "}
              Find the best packages from budget stays to luxury resorts, with
              exclusive deals and hassle-free booking.
            </Text>
          </Stack>
        </Flex>
        <Grid gutter="xl">
          {placeData.map((place, index) => (
            <Grid.Col key={index} span={{ base: 12, md: 6, lg: 4 }}>
              <Paper
                pos="relative"
                shadow="xl"
                radius="lg"
                style={{
                  overflow: "hidden",
                  cursor: "pointer",
                }}
                className={classes.hoverScale}
              >
                <Box
                  style={{
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Image Wrapper for Scaling Effect */}
                  <Box className={classes.imagewrapper}>
                    <Image
                      src={place.image}
                      alt={place.name}
                      height={250}
                      width="100%"
                      style={{
                        transition: "transform 1s ease-in-out",
                      }}
                    />
                  </Box>

                  {/* Dark Overlay */}
                  <Box
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      background: "rgba(0, 0, 0, 0.4)", // Dark overlay
                      zIndex: 1,
                    }}
                  />

                  {/* Centered Text */}
                  <Flex
                    pos="absolute"
                    top="50%"
                    left="50%"
                    style={{
                      transform: "translate(-50%, -50%)",
                      zIndex: 2,
                    }}
                    align="center"
                    justify="center"
                  >
                    <Title
                      size="lg"
                      tt={"uppercase"}
                      c="white"
                      ta={"center"}
                      style={{ fontSize: 22 }}
                    >
                      {place.name}
                    </Title>
                  </Flex>
                </Box>
              </Paper>
            </Grid.Col>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default InternationalPackages;
