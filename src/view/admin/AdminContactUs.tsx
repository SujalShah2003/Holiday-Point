import { Accordion, ActionIcon, Avatar, Flex, Loader, Text } from "@mantine/core";
import { IconUser } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";

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
        {contactData?.map((item) => (
          <Accordion.Item key={item._id} value={item._id}>
            <Accordion.Control
              icon={
                <Avatar color="gray" radius="md">
                  <IconUser size={20} />
                </Avatar>
              }
            >
              {item?.username}
            </Accordion.Control>
            <Accordion.Panel>{item.contact}</Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </>
  );
};

export default AdminContactUs;
