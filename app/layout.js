import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import CreateEventDrawer from "@/components/create-event";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
    title: "Schedulrr",
    description: "Meeting & Call Scheduling App",
};

export default function RootLayout({ children }) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={poppins.className}>
                    {/* Header */}
                    <Header />
                    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">{children}</main>
                    {/* Footer */}
                    <footer className="py-12 bg-blue-100">
                        <div className="text-center mx-auto container px-4 text-gray-600">
                            <p>
                                {" "}
                                &lt;/&gt; with 💖 by <span className="font-bold">codebyzair</span>{" "}
                            </p>
                        </div>
                    </footer>
                    <CreateEventDrawer />
                </body>
            </html>
        </ClerkProvider>
    );
}
