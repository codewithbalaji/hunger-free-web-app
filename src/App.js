import { RouterProvider } from "react-router-dom";
import { router } from "lib/routes";
import { useEffect } from "react";



const App = () => {
  useEffect(() => {
    askNotificationPermission();
  }, []);

  // Function to request notification permission
  const askNotificationPermission = () => {
    if ("Notification" in window) {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          console.log("Notification permission granted.");
        } else {
          console.log("Notification permission denied.");
        }
      });
    }
  };

  // Function to trigger a local notification
  const triggerNotification = () => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Hello!", {
        body: "This is a test notification from your PWA.",
        icon: "/logo192.png" // Optional icon
      });
    }
  };

  return (
    <>
      <h1>PWA Push Notification Example</h1>
      <button onClick={triggerNotification}>Trigger Notification</button>
      <RouterProvider router={router} />;
    </>
    
  );
};

export default App;




