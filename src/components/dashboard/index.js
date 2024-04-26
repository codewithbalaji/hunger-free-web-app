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
import { storage } from "lib/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { useToast } from "@chakra-ui/react";
import { TimePicker } from "antd";

function NewPost() {
  const { register, handleSubmit, reset,  watch } = useForm();
  const { addPost, isLoading: addingPost } = useAddPost();
  const { user, isLoading: authLoading } = useAuth();
  const [img, setImg] = useState("");
  const [url, setUrl] = useState("");
  const [currentLocation, setCurrentLocation] = useState(""); // State for current location checkbox
  const [cookedTime, setCookedTime] = useState(""); // State for cooked time
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const foodQuantity = watch("foodQuantity"); // Watch foodQuantity for changes

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  const handleClick = async () => {
    if (img === "") {
      toast({
        title: "Select an image to upload!",
        status: "error",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
      return;
    }
    const imgRef = ref(storage, `files/${v4()}`);
    await uploadBytes(imgRef, img);
    const imgURL = await getDownloadURL(imgRef);
    console.log(imgURL);
    setUrl(imgURL);
    toast({
      title: "Image Uploaded!",
      status: "success",
      isClosable: true,
      position: "top",
      duration: 5000,
    });
    setImg("");
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
      },
      url
    );
    reset();
    setUrl("");
    setCookedTime("");
  }

  // Function to get current location
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  // Function to show current position
  function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const mapsLink = `https://www.google.com/maps/place/${latitude},${longitude}`;
    setCurrentLocation(mapsLink)
    console.log(currentLocation)
  }

  const cookedTimeString = cookedTime ? cookedTime.format("h:mm a") : "";


  console.log(cookedTimeString)

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Donate Food</h2>
      <Form onSubmit={handleSubmit(handleAddPost)}>
        <FormGroup>
          <TextareaAutosize
            className="form-control mb-3"
            placeholder="What food you donating today?"
            minRows={3}
            {...register("text", { required: true })}
          />
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
            {...register("foodQuantity")}
          />
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
            minRows={3}
            {...register("address")}
          />
        </FormGroup>
        <FormGroup className="mb-3">
          <div className="">
            <button
              className="btn btn-primary"
              
              onClick={(e) => {
                e.preventDefault();
                getLocation(); // Call getLocation when the button is clicked
              }}
            >
              Get Current Location
            </button>
          </div>
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
                style={{ display: "none" }} // Hide the file input visually
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
            <ButtonGroup style={{ gap: '10px' }} >
              <Button
                variant="outline-success"
                onClick={() => {
                  handleClick();
                  onClose();
                }}
                disabled={img !== "" && addingPost}
              >
                Save
              </Button>
              <Button variant="outline-danger" onClick={onClose}>
                Cancel
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </Modal>
        <Button
          variant="primary"
          type="submit"
          disabled={authLoading || addingPost}
        >
          {authLoading || addingPost ? "Loading" : "Post"}
        </Button>
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
