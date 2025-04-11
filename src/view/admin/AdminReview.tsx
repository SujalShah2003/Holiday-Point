import { useState, useEffect } from "react";
import {
  Text,
  Rating,
  Paper,
  Flex,
  Avatar,
  Modal,
  Box,
  SimpleGrid,
  Title,
  Button,
  ActionIcon,
  Grid,
  GridCol,
  Center,
  Loader,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { IconMapPin } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { toast } from "react-toastify";

export interface Review {
  _id: string;
  username: string;
  location: string;
  rating: number;
  reviewDetails: string;
  createdAt?: string;
  updatedAt?: string;
  time?: string;
}

const AdminReview: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [modelOpened, { open, close }] = useDisclosure(false);
  const [detailReview, setDetailsReview] = useState<Review>();
  const [
    deleteModalOpened,
    { open: openDeleteModal, close: closeDeleteModal },
  ] = useDisclosure(false);
  const [selectedDeleteReviewId, setSelectedDeleteReviewId] =
    useState<String>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://holiday-point-backend-rx2e.onrender.com/api/reviews")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
        setLoading(false);
      });
  }, []);

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
  const handleDeleteClick = async () => {
    if (!selectedDeleteReviewId) return;

    try {
      const res = await fetch(
        `https://holiday-point-backend-rx2e.onrender.com/api/reviews/${selectedDeleteReviewId}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) {
        throw new Error("Failed to delete review");
      }
      setReviews((prevReviews) =>
        prevReviews.filter((review) => review._id !== selectedDeleteReviewId)
      );
      closeDeleteModal();
      toast.success("Review Deleted Successfully", {
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
      {reviews?.length === 0 ? (
        <Text ta="center">No reviews found.</Text>
      ) : (
        <>
          <Flex justify={"space-between"} align={"center"} mb={"md"}>
            <Text ml={"xs"} fz={"h4"} fw={600}>
              User Reviews{" "}
            </Text>
            <ActionIcon bg="var(--mantine-color-gray-4)" radius={"md"} p={"sm"}>
              {reviews?.length}
            </ActionIcon>
          </Flex>
          <Grid>
            {reviews
              ?.slice() // optional: makes sure original array isn't mutated
              ?.reverse()
              ?.map((review) => {
                return (
                  <>
                    <GridCol span={{ base: 12, md: 6, lg: 4 }}>
                      <Paper
                        key={review._id}
                        shadow="sm"
                        p="lg"
                        radius="lg"
                        withBorder
                        h={225}
                        style={{ cursor: "pointer", zIndex: 50 }}
                        onClick={() => handleClick(review?._id)}
                      >
                        <Flex
                          direction="column"
                          align="start"
                          justify="space-between"
                          h="100%"
                          gap="md"
                        >
                          <Flex
                            align="center"
                            direction="row"
                            w="100%"
                            wrap="wrap"
                            gap={{ base: "sm" }}
                            justify="space-between"
                          >
                            <Flex align="center" gap="sm">
                              <Avatar color="cyan" radius="xl">
                                {review.username.slice(0, 2).toUpperCase()}
                              </Avatar>
                              <Flex direction="column" align="start">
                                <Text fw={500} tt="capitalize">
                                  {review.username}
                                </Text>
                                <Flex align="center">
                                  <IconMapPin
                                    size={13}
                                    color="var(--text-gray-color)"
                                    style={{ marginRight: 5 }}
                                  />
                                  <Text
                                    fz={{ base: "xs", sm: "sm" }}
                                    c="var(--text-gray-color)"
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

                          <Flex
                            w={"100%"}
                            justify={"space-between"}
                            align={"center"}
                            wrap={"wrap"}
                          >
                            <Text size="xs" c={"dimmed"}>
                              {review.time}
                            </Text>
                            <Button
                              color={"red"}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedDeleteReviewId(review?._id);
                                openDeleteModal();
                              }}
                              style={{ zIndex: 55 }}
                            >
                              Delete
                            </Button>
                          </Flex>
                        </Flex>
                      </Paper>
                    </GridCol>
                  </>
                );
              })}
          </Grid>
        </>
      )}

      <Modal
        opened={deleteModalOpened}
        onClose={closeDeleteModal}
        title="Are you sure?"
        withCloseButton={false}
      >
        <Text>Do you really want to delete this review?</Text>
        <Flex justify="end" gap="sm" mt="lg">
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
              <Flex direction={"column"} align={"end"} gap={4}>
                <Rating
                  value={detailReview?.rating}
                  fractions={2}
                  readOnly
                  size="md"
                />
                <Text size="xs" c={"dimmed"}>
                  {detailReview.time}
                </Text>
              </Flex>
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

            <Flex justify={"end"} w={"100%"}>
              <Button
                h={"auto"}
                px={"md"}
                py={"sm"}
                color={"red"}
                onClick={(e) => {
                  close();
                  setSelectedDeleteReviewId(detailReview?._id);
                  openDeleteModal();
                }}
                style={{ zIndex: 55 }}
              >
                Delete
              </Button>
            </Flex>
          </Flex>
        </Modal>
      )}
    </>
  );
};

export default AdminReview;
