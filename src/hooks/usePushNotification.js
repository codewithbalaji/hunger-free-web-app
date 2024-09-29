import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { useSubscribe } from "react-pwa-push-notifications";
import toast from "react-hot-toast";

// in PROD use from .env
const PUBLIC_KEY =
  "BK8AxptECxHakJHo12njeA9Fpfq5qrv5CIpWW_01Pl2_yaSdATLYWD6wpJw-M4tuUeiKlWoUR0pHg6liA7quC4s";

const URL = "https://pushbackend-lt3b2m0i.b4a.run";
// const URL = "http://localhost:8080";

export const usePushNotification = () => {
  const [loadingSubscribe, setLoadingSubscribe] = useState(false);
  const [loadingPush, setLoadingPush] = useState(false);
  const [pushId, setPushId] = useState("");
  const [subscribeId, setSubscribeId] = useState("");
  const { getSubscription } = useSubscribe({ publicKey: PUBLIC_KEY });

  useEffect(() => {
    FingerprintJS.load()
      .then((fp) => fp.get())
      .then((result) => {
        setSubscribeId(result.visitorId);
        setPushId(result.visitorId);
      });
  }, []);

  const subscribe = useCallback(
    async (id) => {
      setLoadingSubscribe(true);
      try {
        const subscription = await getSubscription();
        await axios.post(URL + "/subscribe", {
          subscription,
          id,
        });
        toast.success("Subscribe success");
      } catch (error) {
        toast.error("Subscription failed. Check console.");
        console.error(error);
      } finally {
        setLoadingSubscribe(false);
      }
    },
    [getSubscription]
  );

  const sendPushNotification = useCallback(
    async (id, title, message) => {
      setLoadingPush(true);
      try {
        await axios.post(URL + "/send", {
          id,
          title,
          message,
        });
        // debug
        console.log({ id, title, message });   
        toast.success("Push notification sent successfully!");
      } catch (error) {
        toast.error("Failed to send notification.");
        console.error(error);
      } finally {
        setLoadingPush(false);
      }
    },
    []
  );

  return {
    loadingSubscribe,
    loadingPush,
    pushId,
    subscribeId,
    subscribe,
    sendPushNotification,
    setPushId,
    setSubscribeId,
  };
};