// Set session cookie to 1369 and fetch testimonials
document.cookie = "session=1369; path=/";

fetch('/api/testimonials')
  .then(r => {
    console.log("Status:", r.status);
    return r.json();
  })
  .then(data => {
    console.log("✅ Testimonials for session 1369:");
    console.log(data);
    console.table(data);   // Nice table format
  })
  .catch(err => {
    console.error("Error:", err);
  });
