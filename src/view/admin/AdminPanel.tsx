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
import { useEffect, useState } from "react";
import Logo from "../../assets/img/logo/Logo.png";
import { useNavigate } from "react-router-dom";
import AdminReview from "./AdminReview";
import AdminContactUs from "./AdminContactUs";

const AdminPanel = () => {
  const [opened, { toggle }] = useDisclosure();
  const [activeSection, setActiveSection] = useState("reviews");
  const navigate = useNavigate();

  const renderContent = () => {
    switch (activeSection) {
      case "reviews":
        return <AdminReview />;
      case "contact_us":
        return <AdminContactUs />;
      // case "settings":
      //   return <Text> Settings Panel</Text>;
      default:
        return <Text>Welcome to the Admin Panel</Text>;
    }
  };
  const handlelogout = () => {
    localStorage.removeItem("admin-username");
    navigate("/");
  };

  useEffect(() => {
    const adminData = localStorage.getItem("admin-username");
    if (adminData?.length == 0) {
      navigate("/");
    }
  }, []);
  return (
    <AppShell
      header={{ height: 70 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
      bg={"var(--mantine-color-gray-1)"}
    >
      <AppShell.Header>
        <Flex h="100%" px="md" align={"center"} justify={"space-between"}>
          <Image
            src={Logo}
            w={50}
            h={50}
            alt="Logo"
            ml={{ base: "unset", xs: "md" }}
          />
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Flex>
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
              onClick={() => {
                setActiveSection("reviews");
                toggle();
              }}
              w={"100%"}
              p={"sm"}
              fw={600}
              style={{
                backgroundColor:
                  activeSection === "reviews"
                    ? "var(--mantine-color-gray-1)"
                    : "transparent",
                color: activeSection === "reviews" ? "black" : "gray",
                borderRadius: 8,
              }}
            >
              Reviews
            </UnstyledButton>

            <UnstyledButton
              onClick={() => {
                setActiveSection("contact_us");
                toggle();
              }}
              w={"100%"}
              p={"sm"}
              fw={600}
              style={{
                backgroundColor:
                  activeSection === "contact_us"
                    ? "var(--mantine-color-gray-1)"
                    : "transparent",
                color: activeSection === "users" ? "black" : "gray",
                borderRadius: 8,
              }}
            >
              Contact Us
            </UnstyledButton>

            {/* <UnstyledButton
              onClick={() => {
                setActiveSection("settings");
                toggle();
              }}
              w={"100%"}
              p={"sm"}
              fw={600}
              style={{
                backgroundColor:
                  activeSection === "settings"
                    ? "var(--mantine-color-gray-1)"
                    : "transparent",
                color: activeSection === "settings" ? "black" : "gray",
                borderRadius: 8,
              }}
            >
              Settings
            </UnstyledButton> */}
          </Stack>
          <Box>
            <Flex align={"center"} gap={"sm"} style={{ cursor: "default" }}>
              <Avatar
                radius="lg"
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

      <AppShell.Main mx={"sm"}>{renderContent()}</AppShell.Main>
    </AppShell>
  );
};

export default AdminPanel;
