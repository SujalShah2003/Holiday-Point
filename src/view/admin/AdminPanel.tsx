import {
  Button,
  Flex,
  Image,
  Paper,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import Logo from "../../assets/img/logo/Logo.png";
import { useEffect, useState } from "react";

const AdminPanel = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [adminData, setAdminData] = useState([]);

  useEffect(() => {
    fetch("https://holiday-point-backend-rx2e.onrender.com/admin-data")
      .then((res) => res.json())
      .then((data) => {
        console.log({data})
        setAdminData(data);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  }, []);

  const handleSubmit = () => {
    // Dummy credentials for testing
    const adminUser = "admin";
    const adminPass = "1234";

    if (username === adminUser && password === adminPass) {
      alert("Login successful ✅");
      setError("");
      // You can navigate or show actual panel here
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <>
      <Flex
        w={"100vw"}
        h={"100vh"}
        bg={"var(--mantine-color-gray-4)"}
        justify={"center"}
        align={"center"}
        direction={"column"}
        gap={"lg"}
      >
        <Image src={Logo} w={80} h={100} alt="Logo" />

        <Paper
          p={"lg"}
          bg={"var(--mantine-color-gray-3)"}
          shadow="md"
          radius="md"
          w={"100%"}
          maw={{ base: 250, xs: 500 }}
        >
          <Text fw={600} ta={"center"} mb="md">
            Admin Panel Of Holiday Point
          </Text>

          <TextInput
            label="Username"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
            mb="sm"
          />

          <PasswordInput
            label="Password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            mb="sm"
          />

          {error && (
            <Text color="red" size="sm" mb="sm">
              {error}
            </Text>
          )}

          <Button fullWidth onClick={handleSubmit}>
            Login
          </Button>
        </Paper>
      </Flex>
    </>
  );
};

export default AdminPanel;
