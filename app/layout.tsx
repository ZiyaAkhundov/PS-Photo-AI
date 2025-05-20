import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import Favicon from "../public/logo.svg";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

const IBMPlex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex",
});

export const metadata: Metadata = {
  title: "PS Photo AI",
  description: "AI-powered image editor designed by programmers school",
  icons: [{ rel: "icon", url: Favicon.src }],
  openGraph: {
    title: "PS Photo AI",
    description: "AI-powered image editor designed by programmers school",
    url: "https://ps-photo-ai.vercel.app",
    siteName: "PS Photo AI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PS Photo AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PS Photo AI",
    description: "AI-powered image editor designed by programmers school",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn("font-IBMPlex antialiased", IBMPlex.variable)}>
          {children}
          <Toaster />
          <SpeedInsights />
          <Script
            id="tawk-to-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
                (function(){
                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/6752a5152480f5b4f5a88429/1iedd9ng9';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
                })();
              `,
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
