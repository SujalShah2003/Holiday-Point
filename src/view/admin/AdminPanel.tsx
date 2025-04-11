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
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [adminData, setAdminData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://holiday-point-backend-rx2e.onrender.com/admin-data")
      .then((res) => res.json())
      .then((data) => {
        setAdminData(data);
      })
      .catch((error) => {
        toast.error("Unable to fetch the data", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      });
  }, []);

  const handleSubmit = async () => {
    try {
      const res = await fetch(
        "https://holiday-point-backend-rx2e.onrender.com/admin-data",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await res.json();

      if (data.isAdmin) {
        toast.success(`Login successful! Welcome ${data.username} 🎉`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
        localStorage.setItem("admin-username", data.username);
        navigate("/dashboard");
      } else {
        toast.error("Invalid credentials. Please try again.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again later.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
  };

  return (
    <>
      <Flex
        w={"100vw"}
        h={"100vh"}
        bg={"var(--mantine-color-gray-3)"}
        justify={"center"}
        align={"center"}
        direction={"column"}
        gap={"lg"}
      >
        <Image src={Logo} w={80} h={100} alt="Logo" />

        <Paper
          p={"xl"}
          bg={"var(--mantine-color-gray-2)"}
          shadow="lg"
          radius="lg"
          w={"100%"}
          maw={{ base: 300, xs: 500 }}
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

          <Button fullWidth onClick={handleSubmit} mt={"lg"}>
            Login
          </Button>
        </Paper>
      </Flex>
    </>
  );
};

export default AdminPanel;
