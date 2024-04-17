import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import { router } from "lib/routes";
import Loader from "components/loader/Loader";
import { useEffect, useState } from "react";


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
  const [isLoading, setIsLoading] = useState(true);
useEffect(() => {
  const fakeDataFetch = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  };

  fakeDataFetch();
}, []);
  return isLoading ? (
    <Loader />
  ) : (
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}
