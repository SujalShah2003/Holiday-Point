import { useState } from "react";
import {
  Modal,
  Button,
  TextInput,
  Textarea,
  Select,
  Rating,
  Stack,
  Text,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { LocationOption } from "../helper/data";
import { toast } from "react-toastify";
const AddReviewModal = ({
  opened,
  close,
}: {
  opened: boolean;
  close: () => void;
}) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState<number | null>(0);
  const [reviewDetails, setReviewDetails] = useState("");
  const [error, setError] = useState(false);

  // @ts-ignore
  const checkIcon = <IconCheck size={20} />;

  const handleSubmit = async () => {
    if (!name || !location || !rating || !reviewDetails) {
      setError(true);
      return;
    }

    try {
      const response = await fetch("https://holiday-point-backend-rx2e.onrender.com/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: name,
          location,
          rating,
          reviewDetails,
        }),
      });

      if (!response.ok) throw new Error("Failed to add review");

      toast.success("Thank you for your review !!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      // Reset form
      setName("");
      setLocation("");
      setRating(0);
      setReviewDetails("");
      setError(false);
      close();
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to submit review. Please try again.");
    }
  };
  return (
    <>
    
      <Modal
        opened={opened}
        onClose={close}
        title="Add Your Review"
        withCloseButton
        centered
      >
        <Stack gap={"xs"}>
          <TextInput
            withAsterisk
            label="Name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={error && !name ? "Name is required" : ""}
          />
          <Select
            withAsterisk
            checkIconPosition="right"
            label="Location"
            placeholder="Select your location"
            // @ts-ignore
            data={LocationOption}
            value={location}
            // @ts-ignore
            onChange={setLocation}
            error={error && !location ? "Location is required" : ""}
          />
          <Text size="sm" fw={500}>
            Rating <span style={{ color: "#fa5252" }}>*</span>
          </Text>
          {/* @ts-ignore */}
          <Rating value={rating} fractions={2} onChange={setRating} size="lg" />
          {error && !rating && (
            <div style={{ color: "red", fontSize: "12px" }}>
              Rating is required
            </div>
          )}
          <Textarea
            withAsterisk
            label="Review"
            placeholder="Write your experience..."
            minRows={7}
            value={reviewDetails}
            onChange={(e) => setReviewDetails(e.target.value)}
            error={
              error && !reviewDetails ? "Review description is required" : ""
            }
          />
          <Button
            fullWidth
            mt="md"
            onClick={handleSubmit}
            p={"sm"}
            h={"max-content"}
            bg={"var(--primary-color)"}
          >
            Submit Review
          </Button>
        </Stack>
      </Modal>
    </>
  );
};

export default AddReviewModal;
