import React from "react";
import { Button, Container, Flex, Text, Title } from "@mantine/core";
import BannerVideo from "../../assets/video/BannerVideo.mp4";
import BannerVideo2 from "../../assets/video/BannerVideo2.mp4";
type BannerProps = {
  opened: boolean;
  toggle: () => void;
  scrollToSection: (id: string) => void;
};
const Banner = ({ opened, toggle, scrollToSection }: BannerProps) => {
  return (
    <>
      <Container
        size="full"
        style={{
          position: "relative",
          height: "80vh",
          padding: 0,
          overflow: "hidden",
        }}
      >
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "90%",
            backgroundColor:"rgba(0,0,0,0.3)",
            objectFit: "cover",
            zIndex: 0,
          }}
        >
          <source src={BannerVideo2} type="video/mp4" />
        
        </video>

        {/* Overlay Content */}
        <Flex
          pos={"relative"}
          h={"90%"}
          w={"100%"}
          align={"start"}
          justify={"center"}
          c={"white"}
          direction={"column"}
          style={{
            zIndex: 1,
          }}
        >
          <Flex
            direction={"column"}
            ml="xl"
            w={{ base: "90%", sm: "70%", md: "50%" }}
          >
            <Title
              order={1}
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.2 }}
            >
              Book your travel{" "}
              <Text
                span
                fz={"inherit"}
                fw={"inherit"}
                c={"var(--primary-color)"}
              >
                stress-free
              </Text>{" "}
              at{" "}
              <Text
                span
                fz={"inherit"}
                fw={"inherit"}
                c={"var(--primary-color)"}
              >
                {" "}
                affordable prices!
              </Text>
            </Title>
            <Text
              mt={"lg"}
              style={{
                fontSize: "clamp(1rem, 2vw, 1.2rem)",
                lineHeight: 1.6,
              }}
            >
              Book your tour with us for a budget-friendly adventure and
              top-notch service. Enjoy seamless travel, unforgettable
              experiences, and the best value for your money!
            </Text>
            <Button
              size="md"
              mt="lg"
              bg={"black"}
              w={{
                base: "70%",
                xs: "50%",
                sm: "65%",
                md: "75%",
                lg: "50%",
                xl: "30%",
              }}
              radius={"md"}
              onClick={() => scrollToSection("domestic")}
            >
              Explore Tours
            </Button>
          </Flex>
        </Flex>
      </Container>
    </>
  );
};

export default Banner;
