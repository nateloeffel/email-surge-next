import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { NavBar } from "@/components/NavBar";
import { SideBar } from "@/components/SideBar";
import SessionProvider from "@/components/SessionProvider";

export const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});

export const metadata: Metadata = {
	title: "Email Surge",
	description: "Created by Nate Loeffel",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body
				className={cn(
					"min-h-screen bg-background font-sans antialiased light",
					fontSans.variable
				)}
			>
				<SessionProvider>
					<div className="flex w-screen h-screen bg-slate-100">
						<SideBar />
						{children}
					</div>
				</SessionProvider>
			</body>
		</html>
	);
}
