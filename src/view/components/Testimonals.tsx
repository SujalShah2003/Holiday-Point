import React, { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Box, Button, Flex, Modal, Stack, Text, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import AddReviewModal from "../../common/AddReviewModal";

const Testimonals = () => {
  const [opened, setOpened] = useState(false);
  return (
    <>
      <Box my={{ base: "10%", md: "8%" }}>
        <Flex
          direction={"column"}
          justify={"start"}
          align={"center"}
          my={{ base: "md", md: "xl" }}
        >
          <Stack gap={"xs"} w={"100%"}>
            <Text
              tt={"uppercase"}
              c={"var(--primary-color)"}
              fw={600}
              fz={{ base: "xs", sm: "md" }}
            >
              Testimonals
            </Text>
            <Flex justify={"space-between"} align={"center"} wrap={"wrap"}>
              <Title
                fw={600}
                fz={{ base: 30, sm: 32, md: 40 }}
                // px={{ base: "unset", sm: "md" }}
              >
                Let's see what our Travaller's say
              </Title>
              <Button
                variant="light"
                c={"var(--primary-color)"}
                size="lg"
                onClick={() => setOpened(true)}
                radius={"md"}
                mt={{base:"lg",sm:"unset"}}
              >
                <IconPlus style={{ marginRight: 8 }} size={"20px"} /> Add Your
                Review
              </Button>
            </Flex>
          </Stack>
        </Flex>
      </Box>

      <AddReviewModal opened={opened} close={() => setOpened(false)} />

    </>
  );
};

export default Testimonals;
