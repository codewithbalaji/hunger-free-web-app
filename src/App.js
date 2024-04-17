import {
  Button,
  ChakraProvider,
  background,
  extendTheme,
} from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import { router } from "lib/routes";

const theme = extendTheme({
  colors: {
    teal: "#fff",
  },
  colorScheme: {
    teal: "#fff",
  },
  styles: {
    global: {
      Button: {
        bg: "#ff5800",
        color: "#000", // Example text color
      },
    },
  },
});

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}
