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
          <Accordion.Control>Destination</Accordion.Control>
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
