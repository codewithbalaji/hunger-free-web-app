import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  Container,
  Form,
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "react-bootstrap";
import { useAuth } from "hooks/auth";
import { useAddPost } from "hooks/posts";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { uploadImageToCloudinary } from "lib/cloudinary";
import { TimePicker } from "antd";
import Swal from "sweetalert2";

function NewPost() {
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
  const { addPost, isLoading: addingPost } = useAddPost();
  const { user, isLoading: authLoading } = useAuth();
  const [img, setImg] = useState(null);
  const [url, setUrl] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [cookedTime, setCookedTime] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const foodQuantity = watch("foodQuantity");

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  const handleClick = async () => {
    if (!img) {
      Swal.fire({
        icon: "error",
        title: "Select an image to upload!",
        showConfirmButton: false,
        timer: 5000,
        position: "top",
      });
      return;
    }

    setIsUploading(true);
    try {
      const imgURL = await uploadImageToCloudinary(img);
      setUrl(imgURL);
      Swal.fire({
        icon: "success",
        title: "Image Uploaded!",
        showConfirmButton: false,
        timer: 2000,
        position: "top",
      });
      setImg(null);
    } catch (error) {
      console.error("Error uploading image: ", error);
      Swal.fire({
        icon: "error",
        title: "Error uploading image",
        showConfirmButton: false,
        timer: 5000,
        position: "top",
      });
    } finally {
      setIsUploading(false);
    }
  };

  function handleAddPost(data) {
    addPost(
      {
        uid: user.id,
        text: data.text,
        foodQuantity: data.foodQuantity,
        cookedTime: cookedTimeString,
        currentLocation: currentLocation,
        address: data.address,
        request: false,
        acceptby: null,
        ph: user.ph,
      },
      url
    );
    reset();
    setUrl("");
    setCookedTime(null);
  }

  const cookedTimeString = cookedTime ? cookedTime.format("h:mm a") : "";

  return (
    <Container className="py-5">
      <h2 className="text-center mt-4 mb-4">Donate Food</h2>
      <Form onSubmit={handleSubmit(handleAddPost)}>
        <FormGroup>
          <TextareaAutosize
            className="form-control mb-3"
            placeholder="What food you donating today?"
            minRows={5}
            {...register("text", { required: true })}
          />
          {errors.text && <span className="text-danger">This field is required</span>}
        </FormGroup>
        <Button onClick={onOpen} size="sm" className="mb-3">
          Upload Image
        </Button>
        <FormGroup className="mb-3">
          <label htmlFor="foodQuantity" className="form-label">
            Food Quantity: {foodQuantity}
          </label>
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            className="form-range"
            id="foodQuantity"
            {...register("foodQuantity", { required: true })}
          />
          {errors.foodQuantity && <span className="text-danger">This field is required</span>}
        </FormGroup>
        <FormGroup className="mb-3">
          <label htmlFor="cookedTime" className="form-label me-2">
            Cooked Time:
          </label>
          <TimePicker
            onChange={setCookedTime}
            value={cookedTime}
            disableClock={true}
            format="h:mm a"
          />
        </FormGroup>
        <FormGroup className="mb-3">
          <label htmlFor="address" className="form-label">
            Address:
          </label>
          <TextareaAutosize
            className="form-control"
            id="address"
            placeholder="Enter your address"
            minRows={5}
            {...register("address", { required: true })}
          />
          {errors.address && <span className="text-danger">This field is required</span>}
        </FormGroup>
        <Modal show={isOpen} onHide={onClose}>
          <ModalHeader closeButton className="text-center">
            Choose Image
          </ModalHeader>
          <ModalBody>
            <Container className="d-flex flex-column align-items-center">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImg(e.target.files[0])}
                id="image-upload"
                style={{ display: "none" }}
              />
              <label htmlFor="image-upload">
                <Button
                  as="span"
                  size="sm"
                  variant="outline-primary"
                  className="mt-4"
                >
                  Choose Image
                </Button>
              </label>
              {img && <span className="text-muted">{img.name}</span>}
            </Container>
          </ModalBody>
          <ModalFooter className="justify-content-center">
            <ButtonGroup style={{ gap: "10px" }}>
              <Button
                variant="outline-success"
                onClick={() => {
                  handleClick();
                  onClose();
                }}
                disabled={img !== null && addingPost}
              >
                Save
              </Button>
              <Button variant="outline-danger" onClick={onClose}>
                Cancel
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </Modal>
        <div className="d-grid gap-2 mt-4">
          <Button
            variant="primary"
            type="submit"
            size="lg"
            disabled={authLoading || addingPost || !url || !watch("text") || !watch("foodQuantity") || !cookedTime || !watch("address") || isUploading}
          >
            {isUploading ? "Uploading Image..." : (authLoading || addingPost ? "Loading" : "Post")}
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default function Dashboard() {
  return (
    <div>
      <NewPost />
    </div>
  );
}
