import React from "react";
import { Box, Flex, Grid, Stack, Text, Title } from "@mantine/core";

const InternationalPackages = () => {
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
          {[...Array(6)].map((_, i) => (
            <Grid.Col key={i} span={{ base: 12, md: 6, lg: 4 }}>
              <div
                style={{
                  background: "#228be6",
                  color: "white",
                  padding: "20px",
                  borderRadius: "8px",
                  height: "100%",
                }}
              >
                {i + 1}
              </div>
            </Grid.Col>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default InternationalPackages;
