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
  const [error, setError] = useState("");
  const [adminData, setAdminData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://holiday-point-backend-rx2e.onrender.com/admin-data")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAdminData(data);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  }, []);

  const handleSubmit = () => {
    const isAdmin = adminData.find(
      (data: any) =>
        data.admin_username == username && data.admin_password == password
    );

    if (isAdmin) {
      toast.success(`Login successfully !! Welcome ${username} 🎉`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      localStorage.setItem("admin-username",username)
      navigate('/dashboard')
    } else {
      toast.error("Something went wrong !! please try after some time", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
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

          {error && (
            <Text color="red" size="sm" mb="sm">
              {error}
            </Text>
          )}

          <Button
            fullWidth
            onClick={handleSubmit}
            mt={error.length == 0 ? "lg" : "unset"}
          >
            Login
          </Button>
        </Paper>
      </Flex>
    </>
  );
};

export default AdminPanel;
