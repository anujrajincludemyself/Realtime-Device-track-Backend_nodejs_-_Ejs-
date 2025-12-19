

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded");

  const mapDiv = document.getElementById("map");
  if (!mapDiv) {
    console.error("Map div not found");
    return;
  }

  const map = L.map("map").setView([20.5937, 78.9629], 5);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors"
  }).addTo(map);

  let marker = null;

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      console.log("Location:", lat, lng);

      map.setView([lat, lng], 16);

      marker = L.marker([lat, lng]).addTo(map);
    },
    (err) => {
      console.error("Geolocation error:", err);
    },
    { enableHighAccuracy: true }
  );
});
