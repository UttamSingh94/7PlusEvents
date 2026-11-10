/**
 * 7 PLUS EVENTS - CENTRALIZED BUSINESS CONFIGURATION
 * 
 * Business Name: 7 Plus Events
 * Location: University Rd, Keshav Nagar, Ayad, Pahada, Udaipur, Rajasthan 313001
 * Google Maps: https://maps.app.goo.gl/unFHhDAecw6rCvzb9
 * Phone & WhatsApp: +91 79769 67467 (Verified)
 */

const BUSINESS = {
    name: "7 Plus Events",
    tagline: "Premier Balloon, Birthday & Event Decoration in Udaipur",
    category: "Balloon Decoration, Birthday Decoration & Event Decoration",
    address: "University Rd, Keshav Nagar, Ayad, Pahada, Udaipur, Rajasthan 313001",
    pincode: "313001",
    city: "Udaipur",
    state: "Rajasthan",
    country: "India",
    location: "University Rd, Keshav Nagar, Ayad, Pahada, Udaipur, Rajasthan 313001",
    
    // Official Google Maps URL (Verified)
    googleMaps: "https://maps.app.goo.gl/unFHhDAecw6rCvzb9",
    
    // Verified Contact Information
    phone: "+91 79769 67467",
    whatsapp: "7976967467",
    email: "",
    
    // Social Media Links (Unverified)
    instagram: "",
    facebook: "",
    
    // Service operating hours
    operatingHours: "9:00 AM - 10:00 PM (All 7 Days)",
    serviceAreas: [
        "University Rd / Keshav Nagar / Ayad / Pahada",
        "Fateh Sagar Lake & Lake Pichola area",
        "Panchwati & Sukher",
        "Hiran Magri (Sec 1 to 14)",
        "Shobhagpura & Bhuwana",
        "Madhuban & Goverdhan Vilas",
        "Celebration Mall vicinity",
        "City Palace & Old City",
        "All Udaipur Hotels, Banquet Halls, Resorts & Private Residences"
    ]
};

// Freeze object to prevent runtime mutations
if (typeof Object.freeze === "function") {
    Object.freeze(BUSINESS);
}
