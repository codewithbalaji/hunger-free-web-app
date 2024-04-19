import { Box, Text } from "@chakra-ui/react";
import Header from "./Header";
import Actions from "./Actions";

export default function Post({ post }) {
  // Destructuring text and image from post
  const { text, image } = post;

  return (
    <Box p="2" maxW="600px" textAlign="left">
      <Box border="2px solid" borderColor="gray.100" borderRadius="md">
        <Header post={post} />

        <Box p="2" minH="100px">
          {/* Rendering text content */}
          {text && (
            <Text wordBreak="break-word" fontSize="md">
              {text}
            </Text>
          )}

          {/* Rendering image if available */}
          {image && (
            <Box objectFit='cover'>
              <img src={image} alt="Post" />
            </Box>
          )}
        </Box>

        <Actions post={post} />
      </Box>
    </Box>
  );
}
