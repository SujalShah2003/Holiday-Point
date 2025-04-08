import {
  ActionIcon,
  Box,
  Flex,
  Image,
  NumberFormatter,
  Text,
} from "@mantine/core";
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
          <Flex align={{base:"start",sm:"end"}} gap={5} mr={{base:"unset",sm:"xl"}} direction="column">
            {/* Social Icons */}
            <Flex gap={5} align="center">
              <Text
                tt="uppercase"
                c={"var(--primary-color)"}
                fw={600}
                fz={"sm"}
              >
                Follow us:
              </Text>
              <Flex gap="xs" align={"center"}>
                <ActionIcon
                  component="a"
                  href="https://www.instagram.com/holidaypointt/"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="transparent"
                  aria-label="Instagram"
                >
                  <IconBrandInstagram color="black" />
                </ActionIcon>
                <ActionIcon
                  component="a"
                  href="https://www.facebook.com/profile.php?id=100070530663309"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="transparent"
                  aria-label="Facebook"
                >
                  <IconBrandFacebook color="black" />
                </ActionIcon>
              </Flex>
            </Flex>

            {/* Email info */}
            <Flex gap={5} align="center" wrap="wrap">
              <Text
                tt="uppercase"
                c={"var(--primary-color)"}
                fw={600}
                fz={"sm"}
              >
                Email :{" "}
              </Text>
              <Text ta={"center"} fz={"sm"}  >
                enquirygujarat1@gmail.com
              </Text>
            </Flex>

            {/* Contact Info */}
            <Flex gap={5} align="center" wrap="wrap">
              <Text
                tt="uppercase"
                c={"var(--primary-color)"}
                fw={600}
                fz={"sm"}
              >
                Contact Info :{" "}
              </Text>
              <NumberFormatter
                prefix="+91 "
                value={9512121334}
                style={{ fontSize: "13px" }}
              />
              <Text>|</Text>
              <NumberFormatter
                prefix="+91 "
                value={9726739494}
                style={{ fontSize: "13px" }}
              />
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
            my={{base:"md"}}

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
