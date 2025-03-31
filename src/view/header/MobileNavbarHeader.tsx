import { Accordion, Button, Stack, UnstyledButton } from "@mantine/core";
import classes from "../../assets/css/app.module.css";
import { useState } from "react";

type MobileNavbarHeaderProps = {
  scrollToSection: (id: string) => void;
};

const MobileNavbarHeader = ({ scrollToSection }: MobileNavbarHeaderProps) => {
  const [accordionValue, setAccordionValue] = useState<string | null>(null);

  const handleClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setAccordionValue(null); // Close accordion
  };
  return (
    <>
      <UnstyledButton
        key={"about_us"}
        className={classes.control}
        onClick={() => scrollToSection("about_us")}
        fw={600}
      >
        About Us
      </UnstyledButton>

      <Accordion
        variant="filled"
        radius="md"
        value={accordionValue}
        onChange={setAccordionValue}
      >
        <Accordion.Item value="destination">
          <Accordion.Control fw={600}>Destination</Accordion.Control>
          <Accordion.Panel>
            <UnstyledButton
              onClick={() => handleClick("domestic")}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                padding: "8px 0",
              }}
            >
              Domestic Destinations
            </UnstyledButton>
            <UnstyledButton
              onClick={() => handleClick("international")}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                padding: "8px 0",
              }}
            >
              International Destinations
            </UnstyledButton>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>

      <UnstyledButton
        key={"service"}
        className={classes.control}
        onClick={() => scrollToSection("service")}
        fw={600}
      >
        Services
      </UnstyledButton>
      <UnstyledButton
        key={"testimonials"}
        className={classes.control}
        onClick={() => scrollToSection("testimonials")}
        fw={600}
      >
        Testimonials
      </UnstyledButton>

      <Button
        pos={"absolute"}
        bottom={20}
        radius="xl"
        p="lg"
        w={"-webkit-fill-available"}
        h={"max-content"}
        fz={"md"}
        bg="black"
        onClick={() => scrollToSection("contact_us")}
      >
        Contact Us
      </Button>
    </>
  );
};

export default MobileNavbarHeader;
