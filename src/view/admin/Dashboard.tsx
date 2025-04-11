import {
  AppShell,
  Burger,
  Group,
  Image,
  UnstyledButton,
  Text,
  Box,
  Stack,
  Flex,
  Avatar,
  Title,
  Button,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import Logo from "../../assets/img/logo/Logo.png";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [opened, { toggle }] = useDisclosure();
  const [activeSection, setActiveSection] = useState("dashboard");
  const navigate = useNavigate();
  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Text> Dashboard Overview</Text>;
      case "users":
        return <Text> Manage Users</Text>;
      case "settings":
        return <Text> Settings Panel</Text>;
      default:
        return <Text>Welcome to the Admin Panel</Text>;
    }
  };
  const handlelogout = () => {
    localStorage.removeItem("admin-username");
    navigate("/");
  };
  return (
    <AppShell
      header={{ height: 70 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Image
            src={Logo}
            w={50}
            h={50}
            alt="Logo"
            ml={{ base: "unset", xs: "md" }}
          />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Flex
          w={"100%"}
          h={"100%"}
          justify={"space-between"}
          direction={"column"}
        >
          <Stack mb="md">
            <UnstyledButton
              onClick={() => setActiveSection("dashboard")}
              w={"100%"}
              p={"sm"}
            >
              Dashboard
            </UnstyledButton>

            <UnstyledButton
              onClick={() => setActiveSection("users")}
              w={"100%"}
              p={"sm"}
            >
              Users
            </UnstyledButton>

            <UnstyledButton
              onClick={() => setActiveSection("settings")}
              w={"100%"}
              p={"sm"}
            >
              Settings
            </UnstyledButton>
          </Stack>
          <Box>
            <Flex align={"center"} gap={"sm"} style={{ cursor: "default" }}>
              <Avatar
                radius="md"
                w={50}
                h={50}
                color={"var(--primary-color)"}
              />
              <Text fz={"h2"} fw={700} truncate="end">
                {localStorage.getItem("admin-username")}
              </Text>
            </Flex>
            <Button
              variant="default"
              bg={"black"}
              c={"white"}
              w={"100%"}
              radius={"md"}
              mt={"sm"}
              onClick={handlelogout}
            >
              Log out
            </Button>
          </Box>
        </Flex>
      </AppShell.Navbar>

      <AppShell.Main>{renderContent()}</AppShell.Main>
    </AppShell>
  );
};

export default Dashboard;
