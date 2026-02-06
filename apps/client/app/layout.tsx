import { Toaster } from "@workspace/ui/components/sonner";
import { ThemeProvider } from "@workspace/ui/components/theme-provider";
import AuthProvider from "@/providers/AuthProvider";
import EasyPeasyStoreProvider from "@/providers/EasyPeasyStoreProvider";
import StepProvider from "@/providers/StepProvider";
import { SWRProvider } from "@/providers/SWRProvider";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Poppins } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "@workspace/ui/globals.css";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: {
    default: "Bookora – Write, Organize, and Build Your Book",
    template: "%s | Bookora",
  },
  description:
    "Bookora is a simple book writing tool that helps authors write content, organize chapters, and structure books in one place. Focus on writing without distractions.",
  keywords: [
    "book writing tool",
    "write a book online",
    "chapter organization",
    "author tools",
    "writing app",
    "book drafting",
    "novel writing",
    "Bookora",
  ],
  authors: [{ name: "Bookora" }],
  creator: "Bookora",
  publisher: "Bookora",

  metadataBase: new URL("https://bookora.vercel.app"),

  openGraph: {
    title: "Bookora – Write and Organize Your Book",
    description:
      "Write your book, manage chapters, and organize content easily with Bookora. A focused writing tool built for authors.",
    url: "https://bookora.vercel.app",
    siteName: "Bookora",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bookora – Book Writing & Chapter Management Tool",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Bookora – Book Writing Tool",
    description:
      "A simple tool for writing books and organizing chapters. Focus on writing with Bookora.",
    images: ["/images/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const language = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={language} suppressHydrationWarning>
      <body className={poppins.className}>
        <AuthProvider>
          <SWRProvider>
            <EasyPeasyStoreProvider>
              <StepProvider>
                <NextIntlClientProvider messages={messages}>
                  <NextTopLoader color="#155dfb" />
                  <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                  >
                    {children}
                    <Toaster position="bottom-right" />
                  </ThemeProvider>
                </NextIntlClientProvider>
              </StepProvider>
            </EasyPeasyStoreProvider>
          </SWRProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
