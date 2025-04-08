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
  TextInput,
  Title,
  Tooltip,
} from "@mantine/core";
import { useForm, UseFormReturnType } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import { LocationOption, happyClient } from "../../helper/data";
import { Carousel } from "@mantine/carousel";
import { IconInfoSmall } from "@tabler/icons-react";
import { toast } from "react-toastify";

type ContactFormValues = {
  username: string | null;
  checkIn: Date | null;
  checkOut: Date | null;
  location: string | null;
  members: number;
  category: string | null;
  contact: string | null;
};

const ContactUs = () => {
  const form = useForm({
    initialValues: {
      username: "",
      checkIn: null,
      checkOut: null,
      location: null,
      members: 2,
      category: null,
      contact: "",
    },
    validate: {
      username: (value) => (value ? null : "Name is required"),
      checkIn: (value) => (value ? null : "Check-in date is required"),
      checkOut: (value) => (value ? null : "Check-out date is required"),
      location: (value) => (value ? null : "Location is required"),
      members: (value) => (value ? null : "Number of members is required"),
      category: (value) => (value ? null : "Hotel category is required"),
      contact: (value) =>
        value && value?.length === 10
          ? null
          : "Enter a valid 10-digit contact number",
    },
  });
  const handleSubmit = async (
    values: ContactFormValues,
    form: UseFormReturnType<ContactFormValues>
  ): Promise<void> => {
    try {
      const response = await fetch(
        "https://holiday-point-backend-rx2e.onrender.com/api/contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );
  
      const data: { error?: string; message?: string } = await response.json();
  
      if (response.ok) {
        toast.success(
          "Our team will get back to you within 24 hours. Thank You !!",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
        form.reset();
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
                    minDate={form.values.checkIn || new Date()}
                    withAsterisk
                    w={"100%"}
                    label="Check-In Date"
                    placeholder="Select check-in date"
                    {...form.getInputProps("checkIn")}
                  />
                  <DateInput
                    minDate={
                      form.values.checkIn
                        ? new Date(
                            new Date(form.values.checkIn).setDate(
                              new Date(form.values.checkIn).getDate() + 2
                            )
                          )
                        : new Date()
                    }
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
                  <TextInput
                    w={"100%"}
                    withAsterisk
                    label="Your Name"
                    placeholder="Enter your full name"
                    {...form.getInputProps("username")}
                  />
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
                    w={"100%"}
                    withAsterisk
                    hideControls
                    label="Contact Number"
                    placeholder="Enter your number"
                    type="tel"
                    value={form.values.contact ?? ""}
                    // Parse out non-digit characters and limit to 10 digits
                    // @ts-ignore
                    parser={(value: string) =>
                      value.replace(/\D/g, "").slice(0, 10)
                    }
                    // Format with +91 prefix
                    formatter={(value: string) =>
                      value
                        ? `+91 ${value.slice(0, 5)} ${value.slice(5, 10)}`
                        : ""
                    }
                    onChange={(value: string | number) => {
                      const str =
                        typeof value === "string" ? value : value?.toString();
                      const digits =
                        str?.replace(/\D/g, "").slice(0, 10) ?? null;
                      // @ts-ignore
                      form.setFieldValue("contact", digits || null);
                    }}
                    error={form.errors.contact}
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
