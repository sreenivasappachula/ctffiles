(async function getTestimonials1369() {

    const url = '/api/testimonials';

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Cookie': 'session=1369',
                'Accept': '*/*',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36',
                'Sec-Ch-Ua': '"Chromium";v="148", "Google Chrome";v="148", "Not/A)Brand";v="99"',
                'Sec-Ch-Ua-Mobile': '?0',
                'Sec-Ch-Ua-Platform': '"Windows"',
                'Sec-Fetch-Site': 'same-origin',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Dest': 'empty',
                'Referer': 'https://challenge-0526.intigriti.io/challenge',
                'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
                'If-None-Match': 'W/"123-sCDJcEOGKD6DBJS4qNk1R/d6PTA"'   // as per your request
            },
            credentials: 'include'
        });

        console.log('Status:', response.status);

        if (response.status === 304) {
            console.log('✅ Not Modified (304) - Testimonials not changed');
        } else if (response.ok) {
            const data = await response.json();
            console.log('✅ Testimonials received successfully:');
            console.log(data);
            console.table(data);   // Nice table view if it's an array
        } else {
            console.log('Response:', await response.text());
        }

    } catch (error) {
        console.error('Fetch Error:', error);
    }

})();   // Auto runs
