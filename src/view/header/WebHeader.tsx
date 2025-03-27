import {
  Group,
  Image,
  Menu,
  UnstyledButton,
  Button,
  Burger,
} from "@mantine/core";
import Logo from "../../assets/img/Logo.png";
import classes from "../../assets/css/app.module.css";

type HeaderProps = {
  opened: boolean;
  toggle: () => void;
  scrollToSection: (id: string) => void;
};

const WebHeader = ({ opened, toggle, scrollToSection }: HeaderProps) => {
  return (
    <Group
      h="100%"
      px="xl"
      justify="space-between"
      style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
    >
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
            <UnstyledButton className={classes.control}>
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
        <Button radius={"xl"} px={"lg"} bg={"black"}>
          Contact Us
        </Button>
      </Group>

      <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
    </Group>
  );
};

export default WebHeader;
