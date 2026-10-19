import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Junaid Asghar & Sahrish — Wedding Invitation", description: "Royal wedding invitation of Junaid Asghar & Sahrish with animated envelope, event schedule, scratch-to-reveal date and RSVP." };
export default function Layout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }
