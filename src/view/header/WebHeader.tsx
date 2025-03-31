import {
  Group,
  Image,
  Menu,
  UnstyledButton,
  Button,
  Burger,
} from "@mantine/core";
import Logo from "../../assets/img/logo/Logo.png";
import classes from "../../assets/css/app.module.css";

type HeaderProps = {
  opened: boolean;
  toggle: () => void;
  scrollToSection: (id: string) => void;
};

const WebHeader = ({ opened, toggle, scrollToSection }: HeaderProps) => {
  return (
    <Group h="100%" px="xl" justify="space-between">
      <Image
        src={Logo}
        w={60}
        h={60}
        alt="Logo"
        style={{ cursor: "pointer" }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      />

      <Group ml="xl" gap={20} visibleFrom="sm">
        <UnstyledButton
          key={"about_us"}
          className={classes.control}
          onClick={() => scrollToSection("about_us")}
          fw={600}
        >
          About Us
        </UnstyledButton>

        <Menu
          trigger="hover"
          openDelay={100}
          closeDelay={200}
          position="bottom"
          withArrow
        >
          <Menu.Target>
            <UnstyledButton className={classes.control} fw={600}>
              Destination
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={() => scrollToSection("domestic")}>
              Domestic Destinations
            </Menu.Item>
            <Menu.Item onClick={() => scrollToSection("international")}>
              International Destinations
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>

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

        <Button radius={"xl"} px={"lg"} bg={"black"}  onClick={() => scrollToSection("contact_us")}>
          Contact Us
        </Button>
      </Group>

      <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
    </Group>
  );
};

export default WebHeader;
