import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  HStack,
  ModalFooter,
  Text,
  Textarea,
} from "@chakra-ui/react";
import PostsLists from "components/post/PostsList";
import { useAuth } from "hooks/auth";
import { useAddPost, usePosts } from "hooks/posts";
import { useState } from "react";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { storage } from "lib/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { useToast } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";

function NewPost() {
  const { register, handleSubmit, reset } = useForm();
  const { addPost, isLoading: addingPost } = useAddPost();
  const { user, isLoading: authLoading } = useAuth();
  const [img, setImg] = useState("");
  const [url, setUrl] = useState("");
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  const handleClick = async () => {
    if(img === ""){
      toast({
        title: "select an img to upload!",
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
      },
      url
    );
    reset();
    setUrl("");
  }

  return (
    <Box maxW="600px" mx="auto" py="10">
      <form onSubmit={handleSubmit(handleAddPost)}>
        <HStack justify="space-between" mb="5">
          <Heading size="lg">New Post</Heading>
          <Button
            colorScheme="teal"
            backgroundColor="#ff5800"
            type="submit"
            isLoading={authLoading || addingPost}
            loadingText="Loading"
          >
            Post
          </Button>
        </HStack>
        <Textarea
          as={TextareaAutosize}
          resize="none"
          mt="5"
          placeholder="Create a new post..."
          minRows={3}
          {...register("text", { required: true })}
        />
        <Button onClick={onOpen} size="sm" cursor="pointer">
          Upload Image
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent borderRadius="xl">
            <ModalHeader textAlign="center" fontSize="2xl">
              Choose Image
            </ModalHeader>
            <ModalCloseButton color="gray.500" />
            <ModalBody>
              <Flex direction="column" alignItems="center">
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
                    mt="4"
                    size="sm"
                    fontWeight="normal"
                    _hover={{ bg: "teal.600" }}
                    _active={{ bg: "teal.700" }}
                  >
                    Choose Image
                  </Button>
                </label>
                {img && (
                  <Text mt="2" fontSize="sm" color="gray.600">
                    {img.name}
                  </Text>
                )}
              
              </Flex>
            </ModalBody>
            <ModalFooter justifyContent="center">
              <ButtonGroup variant="outline" spacing="6">
                <Button
                  colorScheme="green"
                  onClick={() => { handleClick(); onClose(); }}
                  isLoading={img !== "" && addingPost}
                >
                  Save
                </Button>
                <Button colorScheme="red" onClick={onClose}>Cancel</Button>
              </ButtonGroup>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </form>
    </Box>
  );
}

export default function Dashboard() {
  const { posts, isLoading } = usePosts();
  const { user, isLoading: authLoading } = useAuth();

  if (isLoading || authLoading) return "Loading...";

  const isContributor = user && user.role === "contributor";
  const filteredPosts = isContributor
    ? posts.filter((post) => post.uid === user.id)
    : posts;

  return (
    <>
      {isContributor && <NewPost />}
      <PostsLists posts={filteredPosts} />
    </>
  );
}
