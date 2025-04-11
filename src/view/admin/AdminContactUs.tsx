import {
  Accordion,
  ActionIcon,
  Avatar,
  Button,
  Flex,
  Loader,
  Modal,
  NumberInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { IconUser } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export interface Contact {
  _id: string;
  username: string;
  checkIn: Date;
  checkOut: Date;
  location: string;
  members: number;
  category: string;
  contact: string;
  time: string;
}

const AdminContactUs = () => {
  const [contactData, setContactData] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDeleteId, setSelectedDeleteId] = useState<string | null>(null);
  const [
    deleteModalOpened,
    { open: openDeleteModal, close: closeDeleteModal },
  ] = useDisclosure(false);

  useEffect(() => {
    fetch("https://holiday-point-backend-rx2e.onrender.com/api/contact-details")
      .then((res) => res.json())
      .then((data) => {
        setContactData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
        setLoading(false);
      });
  }, []);

  const handleDeleteClick = async () => {
    if (!selectedDeleteId) return;

    try {
      const res = await fetch(
        `https://holiday-point-backend-rx2e.onrender.com/api/reviews/${selectedDeleteId}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) {
        throw new Error("Failed to delete review");
      }
      setContactData((prevContact) =>
        prevContact.filter((contact) => contact._id !== selectedDeleteId)
      );

      toast.success("Contact Info Deleted Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      toast.error("Something went wrong", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  if (loading) {
    return (
      <Flex h="100%" w="100%" justify={"center"} align={"center"}>
        <Loader color="blue" size="lg" type="dots" />
      </Flex>
    );
  }

  return (
    <>
      <Flex justify={"space-between"} align={"center"} mb={"md"}>
        <Text ml={"xs"} fz={"h4"} fw={600}>
          Contact Us Detail{" "}
        </Text>
      </Flex>
      <Accordion variant="separated">
        {contactData.length > 0 &&
          contactData
            ?.slice()
            ?.reverse()
            ?.map((item) => (
              <Accordion.Item key={item._id} value={item._id} p={5}>
                <Accordion.Control icon={<IconUser size={20} />}>
                  {item?.username}
                </Accordion.Control>
                <Accordion.Panel>
                  <Stack
                    gap={"md"}
                    style={{
                      borderTop: "1px solid var(--mantine-color-gray-3)",
                    }}
                  >
                    {/* Name, Members, Contact */}
                    <Flex
                      w={"100%"}
                      gap={"md"}
                      mt={"md"}
                      wrap={{ base: "wrap", sm: "nowrap" }}
                    >
                      <TextInput
                        value={item.username}
                        label="Your Name"
                        disabled
                        w={"100%"}
                      />
                      <NumberInput
                        value={item.members}
                        label="Members"
                        disabled
                        w={"100%"}
                      />
                      <TextInput
                        value={item.contact}
                        label="Contact Number"
                        disabled
                        w={"100%"}
                      />
                    </Flex>

                    {/* Location & Hotel Category */}
                    <Flex
                      w={"100%"}
                      gap={"md"}
                      wrap={{ base: "wrap", sm: "nowrap" }}
                    >
                      <TextInput
                        value={item.location}
                        label="Location"
                        disabled
                        w={"100%"}
                      />
                      <TextInput
                        value={item.category}
                        label="Hotel Category"
                        disabled
                        w={"100%"}
                      />
                    </Flex>

                    {/* Check-in and Check-out Dates */}
                    <Flex
                      w={"100%"}
                      gap={"md"}
                      wrap={{ base: "wrap", sm: "nowrap" }}
                    >
                      <DateInput
                        value={new Date(item.checkIn)}
                        label="Check-In Date"
                        disabled
                        w={"100%"}
                      />
                      <DateInput
                        value={new Date(item.checkOut)}
                        label="Check-Out Date"
                        disabled
                        w={"100%"}
                      />
                    </Flex>

                    {/* Time of submission */}
                    <Flex mt={2} justify={"space-between"} align={"center"}>
                      <Text fz={"xs"} c={"dimmed"}>
                        {item.time}
                      </Text>
                      <Button
                        color={"red"}
                        onClick={() => setSelectedDeleteId(item?._id)}
                      >
                        Delete
                      </Button>
                    </Flex>
                  </Stack>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
      </Accordion>

      <Modal
        opened={deleteModalOpened}
        onClose={closeDeleteModal}
        title="Are you sure?"
        centered
        withCloseButton={false}
      >
        <Text>Do you really want to delete this review?</Text>
        <Flex justify="end" gap="sm" mt="md">
          <Button variant="default" onClick={closeDeleteModal}>
            Cancel
          </Button>
          <Button
            color="red"
            onClick={() => {
              handleDeleteClick();
              closeDeleteModal();
            }}
          >
            Confirm Delete
          </Button>
        </Flex>
      </Modal>
    </>
  );
};

export default AdminContactUs;
