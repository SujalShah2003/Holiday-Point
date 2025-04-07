import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Grid,
  Image,
  NumberInput,
  Select,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { useForm, UseFormReturnType } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import { LocationOption, happyClient } from "../../helper/data";
import React from "react";
import { Carousel } from "@mantine/carousel";
import { IconInfoSmall } from "@tabler/icons-react";
import { toast, ToastContainer } from "react-toastify";

type ContactFormValues = {
  checkIn: Date | null;
  checkOut: Date | null;
  location: string;
  members: number;
  category: string;
  contact: string | number | null;
};

const ContactUs = () => {
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
  const handleSubmit = async (
    values: ContactFormValues,
    form: UseFormReturnType<ContactFormValues>
  ): Promise<void> => {
    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data: { error?: string; message?: string } = await response.json();

      if (response.ok) {
        toast.success(
          "Your request has been registered successfully. Our team will get back to you within 24 hours."
        );
        form.reset(); // ✅ Reset form fields
      } else {
        alert(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("Server error. Please try again later.");
    }
  };
  return (
    <>
      <ToastContainer />

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
        <Grid gutter={"xl"}>
          <Grid.Col span={{ base: 12, sm: 6 }} order={{ base: 2, sm: 0 }}>
            <Carousel
              withIndicators
              // height={"100%"}
              type="container"
              slideSize={{
                base: "100%",
                "300px": "50%",
                "500px": "50%",
              }}
              slideGap={{ base: "lg", "300px": "md", "500px": "lg" }}
              loop
              align="start"
            >
              {happyClient?.map((item) => {
                return (
                  <>
                    <Carousel.Slide>
                      <Image src={item?.img_src} alt={item?.img_alt} />
                    </Carousel.Slide>
                  </>
                );
              })}
            </Carousel>
          </Grid.Col>
          <Grid.Col
            span={{ base: 12, sm: 6 }}
            style={{ alignContent: "center" }}
          >
            <form
             //@ts-ignore 
              onSubmit={form.onSubmit((values) => handleSubmit(values, form))}
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
                    <Tooltip
                      withArrow
                      label="Please Counter the member or else default 2 will be entered"
                      w={"200px"}
                      fz={"xs"}
                      bg={"gray"}
                      style={{ textWrap: "wrap" }}
                    >
                      <ActionIcon
                        variant="filled"
                        aria-label="Settings"
                        color="#d7d7d7"
                        radius={"50%"}
                      >
                        <IconInfoSmall
                          color="gray"
                          style={{ width: "100%", height: "100%" }}
                          stroke={1.5}
                        />
                      </ActionIcon>
                    </Tooltip>
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
