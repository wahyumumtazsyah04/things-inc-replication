"use client";
import React from "react";
import Script from "next/script";

/**
 * ConsentAnalytics
 * - Mounts GA4/GTM scripts only when consent is granted
 * - Listens for consent:changed event and injects when the user accepts
 */
export default function ConsentAnalytics() {
    const [enabled, setEnabled] = React.useState(false);
    const gaId = process.env.NEXT_PUBLIC_GA_ID;
    const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
    React.useEffect(() => {
        if (typeof window === "undefined") return;
        const init = () => {
            // Only enable when explicitly granted; treat undefined as not granted
            const granted = (window as any).__consentGranted === true;
            setEnabled(granted);
        };
        init();
        const onChange = (e: Event) => {
            const detail = (e as CustomEvent).detail as { granted?: boolean } | undefined;
            setEnabled(detail?.granted === true);
        };
        window.addEventListener("consent:changed", onChange as EventListener);
        return () => window.removeEventListener("consent:changed", onChange as EventListener);
    }, []);

    if (!enabled) return null;

    return (
        <>
            {gaId && (
                <>
                    <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
                    <Script id="ga4-init" strategy="afterInteractive">
                        {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', { page_path: window.location.pathname });
            `}
                    </Script>
                </>
            )}
            {gtmId && (
                <Script id="gtm-init" strategy="afterInteractive">
                    {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `}
                </Script>
            )}
        </>
    );
}
