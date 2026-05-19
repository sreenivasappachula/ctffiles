(async function transferTestimonials() {
    
    console.log("🚀 Starting transfer from 1369 to 1333...");

    // Force session=1369
    document.cookie = "session=1369; path=/";
    await new Promise(r => setTimeout(r, 500));

    // ==================== 1. GET All Testimonials from 1369 ====================
    let allTestimonials = [];
    
    try {
        const res = await fetch('/api/testimonials', {
            method: 'GET',
            credentials: 'include'
        });

        if (res.ok) {
            allTestimonials = await res.json();
            console.log(`✅ Fetched ${allTestimonials.length || 1} testimonial(s) from 1369`);
        }
    } catch (e) {
        console.error("Failed to fetch testimonials", e);
    }

    // Combine all testimonials into one string
    let combinedContent = "No testimonials found";

    if (Array.isArray(allTestimonials) && allTestimonials.length > 0) {
        combinedContent = allTestimonials
            .map(item => {
                if (typeof item === 'string') return item;
                if (item && item.content) return item.content;
                return JSON.stringify(item);
            })
            .join(" | ");
    } else if (allTestimonials && allTestimonials.content) {
        combinedContent = allTestimonials.content;
    }

    // ==================== 2. POST Combined Content to 1333 ====================
    document.cookie = "session=1333; path=/";
    await new Promise(r => setTimeout(r, 500));

    console.log("📤 Posting combined testimonials to session=1333...");

    await fetch('/api/testimonials', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*'
        },
        credentials: 'include',
        body: JSON.stringify({ 
            content: combinedContent 
        })
    })
    .then(r => {
        console.log("POST Status:", r.status);
        return r.text();
    })
    .then(text => console.log("POST Response:", text))
    .catch(err => console.error("POST Error:", err));

    console.log("✅ Transfer Completed!");

})();
