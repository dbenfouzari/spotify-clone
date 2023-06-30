import "./globals.css";
import { Figtree } from "next/font/google";
import { getActiveProductsWithPrices } from "@/actions/get-active-products-with-prices";
import { getSongsByUserId } from "@/actions/get-songs-by-user-id";
import { Player } from "@/components/player";
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

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userSongs = await getSongsByUserId();
  const products = await getActiveProductsWithPrices();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />

        <SupabaseProvider>
          <UserProvider>
            <ModalProvider products={products} />

            <Sidebar songs={userSongs}>{children}</Sidebar>

            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
