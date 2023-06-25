import React from 'react';
import CookieConsent from "react-cookie-consent";

// Default implementation, that you can customize
export default function Root({ children }) {
    return (<>
        {children}
        <CookieConsent>This site uses anonymized cookies for analytics.</CookieConsent>
    </>);
}