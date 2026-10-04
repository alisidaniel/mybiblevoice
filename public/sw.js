const CACHE = "mybiblevoice-v2";
const PRECACHE = ["/", "/index.html", "/manifest.webmanifest"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // Skip cross-origin
  if (url.origin !== self.location.origin) return;

  // Network-first for API-ish routes (placeholder)
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(
      fetch(request).catch(() => caches.match(request).then((r) => r ?? Response.error()))
    );
    return;
  }

  // Cache-first for everything else
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE).then((c) => c.put(request, copy));
          return response;
        })
        .catch(() => caches.match("/index.html"));
    })
  );
});

// Handle incoming push notifications
self.addEventListener("push", (event) => {
  let data = { title: "MyBibleVoice", body: "Your verse is ready." };
  try {
    if (event.data) data = event.data.json();
  } catch {
    /* fallback to default */
  }
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "/icons/icon-192.svg",
      badge: "/icons/icon-192.svg",
      data: data.data || {},
      tag: data.tag || "mybiblevoice",
    })
  );
});

// Handle notification clicks
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const target = event.notification.data?.url || "/";
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((wins) => {
      for (const w of wins) {
        if (w.url.includes(self.location.origin) && "focus" in w) {
          w.navigate(target);
          return w.focus();
        }
      }
      if (clients.openWindow) return clients.openWindow(target);
    })
  );
});