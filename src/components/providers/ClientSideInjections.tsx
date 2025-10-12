"use client";
import React from "react";
import dynamic from "next/dynamic";

// Dynamically load client-only utilities/providers
const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), { ssr: false });
const RouteChangeEffects = dynamic(() => import("@/components/providers/RouteChangeEffects"), { ssr: false });
const AnalyticsEvents = dynamic(() => import("@/components/providers/AnalyticsEvents"), { ssr: false });
const WebVitalsReporter = dynamic(() => import("@/components/providers/WebVitalsReporter"), { ssr: false });
const ConsentAnalytics = dynamic(() => import("@/components/providers/ConsentAnalytics"), { ssr: false });

export default function ClientSideInjections() {
    return (
        <>
            {/* Consent-gated analytics boot */}
            <ConsentAnalytics />
            {/* Handle scroll + ScrollTrigger refresh on navigation */}
            <RouteChangeEffects />
            {/* Custom cursor for desktop pointers (hidden on touch automatically) */}
            <CustomCursor />
            {/* Analytics event wiring (pageviews + scroll depth) */}
            <AnalyticsEvents />
            {/* Web Vitals (LCP/CLS/FID) reporter to GA/dataLayer; logs in dev */}
            <WebVitalsReporter />
        </>
    );
}
