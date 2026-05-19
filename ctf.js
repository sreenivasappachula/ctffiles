
(async function getTestimonials1369() {
    
    console.log("📥 Fetching testimonials for session=1369...");

    try {
        const response = await fetch('/api/testimonials?cookie=1369', {
            method: 'GET',
            headers: {
                'Cookie': 'session=1369',
                'Accept': 'application/json'
            },
            credentials: 'include'
        });

        if (response.ok) {
            const testimonials = await response.json();
            console.log("✅ Success! Testimonials received:");
            console.log(testimonials);
            
            // Also show in a clean table if possible
            console.table(testimonials);
        } else {
            console.log("❌ Failed with status:", response.status);
        }
    } catch (error) {
        console.error("❌ Error fetching testimonials:", error);
    }

})();   // Auto runs immediately