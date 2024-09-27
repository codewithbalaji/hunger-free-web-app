// public/service-worker.js

self.addEventListener("push", function(event) {
    const data = event.data ? event.data.text() : "No payload";
    const options = {
      body: data,
      icon: "/logo192.png"
    };
  
    event.waitUntil(
      self.registration.showNotification("PWA Notification", options)
    );
  });
  