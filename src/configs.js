class api  {
    baseURL = 'https://api.corvium.com/';
    PSK ='61e0a16ba1b67b237271feaf';
    headers = {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMDE2IiwibmFtZSI6ImlBbGVydCBEZXZlbG9wZXIiLCJhZG1pbiI6dHJ1ZX0.2akYsCOtrsocM1UXPsoXbLjqwlc1X22lHCCcAqaNCo8",
        "Content-Type": "application/json"
    };
    listURL = `${this.baseURL}api/1.0.0/test/events/${this.PSK}/list`;
    getEvent = `${this.baseURL}api/1.0.0/test/events/${this.PSK}/`;
    createEvent = `${this.baseURL}api/1.0.0/test/events/${this.PSK}/new`;
    updateEvent = `${this.baseURL}api/1.0.0/test/events/${this.PSK}/`;
    deleteEvent = `${this.baseURL}api/1.0.0/test/events/${this.PSK}/`
    
}

export default api;