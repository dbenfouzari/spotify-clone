import "./globals.css";
import { Figtree } from "next/font/google";
import Sidebar from "@/components/sidebar";
import ModalProvider from "@/providers/modal-provider";
import SupabaseProvider from "@/providers/supabase-provider";
import { ToasterProvider } from "@/providers/toaster-provider";
import UserProvider from "@/providers/user-provider";

const font = Figtree({ subsets: ["latin"] });

export const metadata = {
  title: "Spotify Clone",
  description: "Listen to music!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />

        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />

            <Sidebar>{children}</Sidebar>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
