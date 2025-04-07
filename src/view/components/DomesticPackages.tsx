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

import Gujarat from "../../assets/img/domestic-place/Gujarat.jpg";
import HimachalPradesh from "../../assets/img/domestic-place/Himachal-Pradesh.jpg";
import Goa from "../../assets/img/domestic-place/Goa.jpg";
import Kerala from "../../assets/img/domestic-place/Kerala.jpg";
import Kumbhalgarh from "../../assets/img/domestic-place/Kumbhalgarh.jpg";
import JammuKashmir from "../../assets/img/domestic-place/Jammu-Kashmir.jpg";

const placeData = [
  { name: "Gujarat", image: Gujarat },
  { name: "Himachal Pradesh", image: HimachalPradesh },
  { name: "Goa", image: Goa },
  { name: "Kerala", image: Kerala },
  { name: "Kumbhalgarh", image: Kumbhalgarh },
  { name: "Jammu & Kashmir", image: JammuKashmir },
];

const DomesticPackages = () => {
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
              Destination 
            </Text>
            <Title
              fw={600}
              fz={{ base: 30, sm: 32, md: 40 }}
              px={{ base: "unset", sm: "md" }}
            >
              <Text span c={"var(--primary-color)"} fz={"inherit"} fw={600}>
                Domestic Packages
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
                  <Box className={classes.imagewrapper} >
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
                    <Title size="lg" ta={"center"} tt={"uppercase"} c="white" style={{fontSize : 22}}>
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

export default DomesticPackages;
