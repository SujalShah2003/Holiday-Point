import { useState, useEffect } from "react";
import {
  Card,
  Text,
  Rating,
  Loader,
  Center,
  Paper,
  Flex,
  Avatar,
  Modal,
  Box,
} from "@mantine/core";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { IconMapPin } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

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
    fetch("http://localhost:5000/api/reviews")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  }, [opened]);

  const handleClick = (id: string) => {
    fetch(`http://localhost:5000/api/reviews/${id}`)
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
          responsive={responsive}
          autoPlaySpeed={1000}
          customTransition="all .5"
          transitionDuration={500}
        >
          {reviews
            // ?.slice()
            // ?.reverse()
            ?.map((review) => (
              <Paper
                shadow="sm"
                p="lg"
                radius="lg"
                withBorder
                key={review._id}
                h={200}
                style={{ marginRight: "16px", cursor: "pointer" }}
                onClick={() => handleClick(review?._id)}
              >
                <Flex direction="column" align="start" gap="md">
                  {/* User Avatar and Name */}
                  <Flex
                    align="center"
                    direction={"row"}
                    w={"100%"}
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
                            size="sm"
                            c={"var(--text-gray-color)"}
                            ta={"center"}
                            style={{letterSpacing:0.5}}
                          >
                            {review.location}
                          </Text>
                        </Flex>
                      </Flex>
                    </Flex>
                    <Rating value={review.rating} readOnly size="md" />
                  </Flex>

                  {/* Rating */}

                  {/* Review Details */}
                  <Text size="sm" lineClamp={3}>
                    {review.reviewDetails}
                  </Text>
                </Flex>
              </Paper>
            ))}
        </Carousel>
      )}

      {detailReview && (
        <Modal
          opened={modelOpened}
          onClose={close}
          withCloseButton={false}
          centered
          size={"md"}
          
        >
          <Flex direction="column" p={"lg"} align="start" gap="md" h={300}>
            {/* User Avatar and Name */}
            <Flex
              align="center"
              direction={"row"}
              w={"100%"}
              justify={"space-between"}
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
                    <Text size="sm" c={"var(--text-gray-color)"} ta={"center"} style={{letterSpacing:0.5}}>
                      {detailReview?.location}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
              <Rating value={detailReview?.rating} readOnly size="md" />
            </Flex>

            {/* Rating */}

            {/* detailReview Details */}
            <Box h={"100%"} w={"100%"}>
              <Text size={"10px"} fw={500} c={"var(--text-gray-color)"} style={{letterSpacing:0.5}}>
                Review
              </Text>
              <Box
                mt={5}
                h={"100%"}
                w={"100%"}
                style={{ overflowY: "auto", scrollbarWidth: "none" }}
              >
                <Text size="sm">{detailReview.reviewDetails}</Text>
              </Box>
            </Box>
          </Flex>
        </Modal>
      )}
    </>
  );
};

export default ReviewList;
