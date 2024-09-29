import { useState } from "react";
import { Toaster } from "react-hot-toast";
import SubscribeForm from "../../hooks/SubscribeForm";
import { usePushNotification } from "../../hooks/usePushNotification";

const Notify = () => {
  const [showSubscribe, setShowSubscribe] = useState(true);
  const {
    loadingSubscribe,
    loadingPush,
    pushId,
    subscribeId,
    subscribe,
    sendPushNotification,
    setPushId,
    setSubscribeId,
  } = usePushNotification();

  const onShowSubscribe = () => setShowSubscribe(true);
  const onShowPush = () => setShowSubscribe(false);

  return (
    <div className="App">
      <main>
        <SubscribeForm
          subscribeId={subscribeId}
          loading={loadingSubscribe}
          subscribe={subscribe}
          setSubscribeId={setSubscribeId}
        />
      </main>
      <Toaster />
    </div>
  );
};

export default Notify;
