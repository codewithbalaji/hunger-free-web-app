import { useState, useEffect, useCallback, useRef } from "react";
import Swal from "sweetalert2";
import TextInput from "../components/Input";

const SubscribeForm = ({ subscribeId, loading, subscribe, setSubscribeId }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const subscribeButtonRef = useRef(null); // Reference to the subscribe button

  // Check localStorage for subscription status on component mount
  useEffect(() => {
    const subscriptionStatus = localStorage.getItem("isSubscribed");
    if (subscriptionStatus === "true") {
      setIsSubscribed(true);  // User has already subscribed
    } else {
      // Automatically click the Subscribe button if not subscribed
      setTimeout(() => {
        if (subscribeButtonRef.current) {
          subscribeButtonRef.current.click();
        }
      }, 1000); // Delay to ensure the button is available
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Show confirmation dialog
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to subscribe with this ID?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, subscribe!'
    });

    if (result.isConfirmed) {
      // Call the subscribe function if confirmed
      subscribe(subscribeId);

      // Set subscription status in localStorage
      localStorage.setItem("isSubscribed", "true");

      // Update state to hide the form
      setIsSubscribed(true);

      // Show success message
      Swal.fire(
        'Subscribed!',
        'You have successfully subscribed.',
        'success'
      );
    }
  };

  const handleChange = useCallback(
    (e) => {
      setSubscribeId(e.target.value);
    },
    [setSubscribeId]
  );

  // If already subscribed, don't show the form
  if (isSubscribed) {
    return null; // Hide the form
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* hide text input */}
      <TextInput 
        id="fingerprint"
        placeholder="Your id"
        value={subscribeId}
        onChange={handleChange}
      />
      <button 
        className={loading ? "loading" : ""} 
        type="submit"
        ref={subscribeButtonRef} // Attach ref to the button
        style={{ display: "none" }}
      >
        Subscribe
      </button>
    </form>
  );
};

export default SubscribeForm;
