import { ActionIcon, Box, Flex, Image, Text } from "@mantine/core";
import React from "react";
import Logo from "../../assets/img/logo/Logo.png";
import { IconBrandFacebook, IconBrandInstagram } from "@tabler/icons-react";
type FooterProps = {
  scrollToSection: (id: string) => void;
};

const Footer = ({ scrollToSection }: FooterProps) => {
  return (
    <>
      <Box
        px="lg"
        pt={"lg"}
        style={{ borderTop: "1px solid var(--mantine-color-gray-3)" }}
      >
        <Flex
          justify={"space-between"}
          align={"center"}
          wrap={"wrap"}
          gap={{ base: "lg" }}
          mb={"sm"}
        >
          <Image
            src={Logo}
            w={60}
            h={60}
            alt="Logo"
            style={{ cursor: "pointer" }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          />
          <Flex align={"center"} gap={"lg"} mr={"xl"}>
            <Text tt={"uppercase"}>Follow us: </Text>
            <Flex gap={"xs"}>
              <ActionIcon variant="transparent">
                <IconBrandInstagram color="black" />
              </ActionIcon>
              <ActionIcon variant="transparent">
                <IconBrandFacebook color="black" />
              </ActionIcon>
            </Flex>
          </Flex>
        </Flex>
        <Flex
          justify="space-between"
          align="center"
          wrap="wrap"
          gap={{ base: "md", sm: "lg" }}
        >
          {/* Left text */}
          <Text
            fz={{ base: "sm", sm: "md", md: "lg" }}
            style={{
              lineHeight: 1.6,
              maxWidth: "800px",
            }}
          >
            Book your tour with us for a budget-friendly adventure and top-notch
            service. Enjoy seamless travel, unforgettable experiences, and the
            best value for your money!
          </Text>

          {/* Right label */}
          <Flex gap={"lg"} mr={"xl"} wrap={"wrap"}>
            <Text
              fz={{ base: "sm", sm: "md" }}
              fw={600}
              c="var(--primary-color)"
              style={{ cursor: "pointer", whiteSpace: "nowrap" }}
              onClick={() => scrollToSection("domestic")}
            >
              Domestic Packages
            </Text>
            <Text
              fz={{ base: "sm", sm: "md" }}
              fw={600}
              c="var(--primary-color)"
              style={{ cursor: "pointer", whiteSpace: "nowrap" }}
              onClick={() => scrollToSection("international")}
            >
              International Packages
            </Text>
            <Text
              fz={{ base: "sm", sm: "md" }}
              fw={600}
              c="var(--primary-color)"
              style={{ cursor: "pointer", whiteSpace: "nowrap" }}
              onClick={() => scrollToSection("contact_us")}
            >
              Let's Connect
            </Text>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default Footer;
