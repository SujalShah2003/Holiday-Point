import { useState, useEffect } from "react";
import { Text, Rating, Paper, Flex, Avatar, Modal, Box } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { IconMapPin } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

export interface Review {
  _id: string;
  username: string;
  location: string;
  rating: number;
  reviewDetails: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ReviewListProps {
  opened: boolean;
}

const ReviewList: React.FC<ReviewListProps> = ({ opened }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [modelOpened, { open, close }] = useDisclosure(false);
  const [detailReview, setDetailsReview] = useState<Review>();

  useEffect(() => {
    fetch("https://holiday-point-backend-rx2e.onrender.com/api/reviews")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  }, [opened]);

  const handleClick = (id: string) => {
    fetch(`https://holiday-point-backend-rx2e.onrender.com/api/reviews/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setDetailsReview(data);
        open();
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  };

  return (
    <>
      {reviews?.length === 0 ? (
        <Text ta="center">No reviews found.</Text>
      ) : (
        <Carousel
          slideSize={{base:"100%",sm:"33.333%"}}
          slidesToScroll={1}
          align="start"
          withIndicators
          slideGap="md"
          loop={true}
          // @ts-ignore
          breakpoints={[
            { maxWidth: 1024, slideSize: "50%" }, // Tablet: 2 cards
            { maxWidth: 768, slideSize: "100%" }, // Mobile: 1 card
            { maxWidth: 425, slideSize: "100%" }, // Mobile: 1 card
          ]}
          styles={{
            control: { backgroundColor: "white", borderRadius: "50%" },
          }}
        >
          {reviews?.length >0 && reviews
            // ?.slice()
            ?.reverse()
            ?.map((review) => (
              <Carousel.Slide key={review._id}>
                <Paper
                  shadow="sm"
                  p="lg"
                  radius="lg"
                  withBorder
                  h={225}
                  style={{ cursor: "pointer", height: "100%" }}
                  onClick={() => handleClick(review?._id)}
                >
                  <Flex direction="column" align="start" justify={"space-between"}  gap="md">
                    <Flex
                      align="center"
                      direction={"row"}
                      w={"100%"}
                      wrap={"wrap"}
                      gap={{ base: "sm" }}
                      justify={"space-between"}
                    >
                      <Flex align={"center"} gap={"sm"}>
                        <Avatar color="cyan" radius="xl">
                          {review.username.slice(0, 2).toUpperCase()}
                        </Avatar>
                        <Flex direction={"column"} align={"start"}>
                          <Text fw={500} tt={"capitalize"}>
                            {review.username}
                          </Text>
                          <Flex align={"center"}>
                            <IconMapPin
                              size={13}
                              color="var(--text-gray-color)"
                              style={{ marginRight: 5 }}
                            />
                            <Text
                              fz={{base:"xs",sm:"sm"}}
                              c={"var(--text-gray-color)"}
                              style={{ letterSpacing: 0.5 }}
                            >
                              {review.location}
                            </Text>
                          </Flex>
                        </Flex>
                      </Flex>
                      <Rating value={review.rating} readOnly size="md" />
                    </Flex>

                    <Text size="sm" lineClamp={3}>
                      {review.reviewDetails}
                    </Text>
                  </Flex>
                </Paper>
              </Carousel.Slide>
            ))}
        </Carousel>
      )}

      {detailReview && (
        <Modal
          opened={modelOpened}
          onClose={close}
          withCloseButton={false}
          centered
          size={"lg"}
          // h={"max-content"}
        >
          <Flex direction="column" p={"lg"} align="start" gap="md" h={300}>
            {/* User Avatar and Name */}
            <Flex
              align="center"
              direction={"row"}
              w={"100%"}
              justify={"space-between"}
              wrap={"wrap"}
              gap={{ base: "sm" }}
            >
              <Flex align={"center"} gap={"sm"}>
                <Avatar color="cyan" radius="xl">
                  {detailReview?.username?.slice(0, 2)?.toUpperCase()}
                </Avatar>
                <Flex direction={"column"} align={"start"}>
                  <Text fw={500} tt={"capitalize"}>
                    {detailReview?.username}
                  </Text>
                  <Flex align={"center"}>
                    <IconMapPin
                      size={13}
                      color="var(--text-gray-color)"
                      style={{ marginRight: 5 }}
                    />
                    <Text
                      size="sm"
                      c={"var(--text-gray-color)"}
                      ta={"center"}
                      style={{ letterSpacing: 0.5 }}
                    >
                      {detailReview?.location}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
              {/* Rating */}
              <Rating
                value={detailReview?.rating}
                fractions={2}
                readOnly
                size="md"
              />
            </Flex>

            {/* detailReview Details */}
            <Box h={"100%"} w={"100%"}>
              <Text
                size={"10px"}
                fw={500}
                c={"var(--text-gray-color)"}
                style={{ letterSpacing: 0.5 }}
              >
                Review
              </Text>
              <Box mt={5} h={"100%"} w={"100%"}>
                <Text size="sm" pb={"xl"}>
                  {detailReview.reviewDetails}
                </Text>
              </Box>
            </Box>
          </Flex>
        </Modal>
      )}
    </>
  );
};

export default ReviewList;
