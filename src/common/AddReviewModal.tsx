import { useState } from "react";
import {
  Modal,
  Button,
  TextInput,
  Textarea,
  Select,
  Rating,
} from "@mantine/core";
import { reviewData } from "../helper/data";

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

  const handleSubmit = () => {
    if (!name || !location || !rating || !reviewDetails) {
      setError(true);
      return;
    }

    reviewData.unshift({ username: name, location, rating, reviewDetails });

    // Reset form fields after submission
    setName("");
    setLocation("");
    setRating(0);
    setReviewDetails("");
    setError(false);

    close(); // Close modal after submitting
  };


  console.log({reviewData})
  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Add Your Review"
      withCloseButton
      centered
    >
      <TextInput
        label="Name"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={error && !name ? "Name is required" : ""}
      />
      <Select
        label="Location"
        placeholder="Select your location"
        data={["Kumbhalgarh", "Goa", "Kerala", "Himachal", "Jammu & Kashmir"]}
        value={location}
        // @ts-ignore
        onChange={setLocation}
        error={error && !location ? "Location is required" : ""}
      />
      {/* @ts-ignore */}
      <Rating value={rating} onChange={setRating} size="lg" />
      {error && !rating && (
        <div style={{ color: "red", fontSize: "12px" }}>Rating is required</div>
      )}
      <Textarea
        label="Review"
        placeholder="Write your experience..."
        minRows={4}
        value={reviewDetails}
        onChange={(e) => setReviewDetails(e.target.value)}
        error={error && !reviewDetails ? "Review description is required" : ""}
      />
      <Button fullWidth mt="md" onClick={handleSubmit}>
        Submit Review
      </Button>
    </Modal>
  );
};

export default AddReviewModal;
