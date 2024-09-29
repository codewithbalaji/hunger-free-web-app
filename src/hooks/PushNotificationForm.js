import  { useCallback, useState } from "react";
import TextInput from "../components/Input";

const PushNotificationForm = ({ pushId, loading, sendPushNotification, setPushId }) => {
  const [title, setTitle] = useState("Hello");
  const [message, setMessage] = useState("World");

  const handleSubmit = (e) => {
    e.preventDefault();
    sendPushNotification(pushId, title, message);
  };

  const handleChange = useCallback(
    (setState) => (e) => {
      setState(e.target.value);
    },
    []
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="title">Notification</div>
      <TextInput
        id="idSubscribe"
        placeholder="id"
        value={pushId}
        onChange={handleChange(setPushId)}
      />
      <TextInput
        id="title"
        placeholder="title"
        value={title}
        onChange={handleChange(setTitle)}
      />
      <TextInput
        id="message"
        placeholder="message"
        value={message}
        onChange={handleChange(setMessage)}
      />
      <button className={loading ? "loading" : ""} type="submit">
        Send
      </button>
    </form>
  );
};

export default PushNotificationForm;
