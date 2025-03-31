import {
  Box,
  Button,
  Flex,
  Grid,
  Image,
  NumberInput,
  Paper,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import BannerImage from "../../assets/video/BannerImage.jpg";
import { LocationOption } from "../../helper/data";

import React from "react";

import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel } from "@mantine/carousel";

const ContactUs = () => {
  const autoplay = useRef(Autoplay({ delay: 2000 }));

  const form = useForm({
    initialValues: {
      checkIn: null,
      checkOut: null,
      location: "",
      members: 2,
      category: "",
      contact: null,
    },
    validate: {
      checkIn: (value) => (value ? null : "Check-in date is required"),
      checkOut: (value) => (value ? null : "Check-out date is required"),
      location: (value) => (value ? null : "Location is required"),
      members: (value) => (value ? null : "Number of members is required"),
      category: (value) => (value ? null : "Hotel category is required"),
      contact: (value) => (value ? null : "Contact number is required"),
    },
  });

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
              Contact Us
            </Text>
            <Title
              fw={600}
              fz={{ base: 30, sm: 32, md: 40 }}
              px={{ base: "unset", sm: "md" }}
            >
              Let's connect and plan an unforgettable trip!
            </Title>
          </Stack>
        </Flex>
        <Grid>
          <Grid.Col
            span={{ base: 0, sm: 6 }}
            display={{ base: "none", sm: "block" }}
          >
            <Carousel
              withIndicators
              height={"100%"}
              plugins={[autoplay.current]}
              onMouseEnter={autoplay.current.stop}
              onMouseLeave={autoplay.current.reset}
            >
              <Carousel.Slide>
                <Image src={BannerImage} alt="Travel Destination" />
              </Carousel.Slide>
              <Carousel.Slide>
                <Image src={BannerImage} alt="Travel Destination" />
              </Carousel.Slide>
              <Carousel.Slide>
                <Image src={BannerImage} alt="Travel Destination" />
              </Carousel.Slide>
              {/* ...other slides */}
            </Carousel>
          </Grid.Col>
          <Grid.Col
            span={{ base: 12, sm: 6 }}
            style={{ alignContent: "center" }}
          >
            <form
              onSubmit={form.onSubmit((values) => {
                console.log("Booking Details:", values);
              })}
            >
              <Stack gap={"xs"}>
                {/* Date Inputs */}
                <Flex
                  w={"100%"}
                  gap={"md"}
                  wrap={{ base: "wrap", sm: "nowrap" }}
                >
                  <DateInput
                    minDate={new Date()}
                    withAsterisk
                    w={"100%"}
                    label="Check-In Date"
                    placeholder="Select check-in date"
                    {...form.getInputProps("checkIn")}
                  />
                  <DateInput
                    minDate={new Date()}
                    withAsterisk
                    w={"100%"}
                    label="Check-Out Date"
                    placeholder="Select check-out date"
                    {...form.getInputProps("checkOut")}
                  />
                </Flex>

                {/* Location & Hotel Category */}
                <Flex
                  w={"100%"}
                  gap={"md"}
                  wrap={{ base: "wrap", sm: "nowrap" }}
                >
                  <Select
                    withAsterisk
                    checkIconPosition="right"
                    label="Location"
                    placeholder="Select your location"
                    // @ts-ignore
                    data={LocationOption}
                    {...form.getInputProps("location")}
                    w={"100%"}
                  />
                  <Select
                    withAsterisk
                    checkIconPosition="right"
                    label="Hotel Category"
                    placeholder="Select category"
                    data={["3 Star", "4 Star", "5 Star"]}
                    {...form.getInputProps("category")}
                    w={"100%"}
                  />
                </Flex>

                {/* Members Counter & Contact Number */}
                <Flex
                  w={"100%"}
                  gap={"md"}
                  wrap={{ base: "wrap", sm: "nowrap" }}
                  justify={"space-between"}
                >
                  <Text>Members</Text>
                  <Flex align="center" gap="xs" w={"100%"} justify={"center"}>
                    <Button
                      radius={"50%"}
                      onClick={() =>
                        form.setFieldValue(
                          "members",
                          Math.max(2, form.values.members - 1)
                        )
                      }
                      disabled={form.values.members <= 2}
                    >
                      -
                    </Button>
                    <Text mx={"lg"}>{form.values.members}</Text>
                    <Button
                      radius={"50%"}
                      onClick={() =>
                        form.setFieldValue("members", form.values.members + 1)
                      }
                      bg={"black"}
                    >
                      +
                    </Button>
                  </Flex>
                  <NumberInput
                    withAsterisk
                    hideControls
                    prefix="+91 "
                    label="Contact Number"
                    placeholder="Enter your number"
                    type="tel"
                    {...form.getInputProps("contact")}
                    w={"100%"}
                  />
                </Flex>

                {/* Submit Button */}
                <Button type="submit" fullWidth mt="md" bg={"black"}>
                  Book Now
                </Button>
              </Stack>
            </form>
          </Grid.Col>
        </Grid>
      </Box>
    </>
  );
};

export default ContactUs;
