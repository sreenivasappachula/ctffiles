(async function postAndGet1369() {
    
    // Force session cookie to 1369
    document.cookie = "session=1369; path=/";

    await new Promise(r => setTimeout(r, 400));

    // ==================== POST Testimonial to 1369 ====================
    console.log("📤 Posting testimonial with session=1369...");

    await fetch('/api/testimonials', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*'
        },
        credentials: 'include',
        body: JSON.stringify({ 
            content: "test" 
        })
    })
    .then(r => {
        console.log("POST Status:", r.status);
        return r.text();
    })
    .then(text => console.log("POST Response:", text))
    .catch(err => console.error("POST Error:", err));

    // Small delay
    await new Promise(r => setTimeout(r, 800));

    // ==================== GET Testimonials of 1369 ====================
    console.log("📥 Fetching testimonials for session=1369...");

    fetch('/api/testimonials', {
        method: 'GET',
        credentials: 'include'
    })
    .then(r => {
        console.log("GET Status:", r.status);
        return r.json();
    })
    .then(data => {
        console.log("✅ Testimonials received:");
        console.log(data);
        console.table(data);
    })
    .catch(err => console.error("GET Error:", err));

})();
