"use server";
import Link from "next/link";

function NavItem({ href, name }: { href: string; name: string }) {
	return (
		<Link
			href={href}
			className="text-sm font-medium transition-colors hover:text-primary p-1 w-full bg-red-500 hover:bg-red-800 rounded-md my-2"
		>
			<span className="text-lg">{name}</span>
		</Link>
	);
}

export const SideBar = () => {
	return (
		<div className="flex flex-col justify-between items-start bg-slate-300 w-64">
			<nav className="flex flex-col justify-start items-center p-2 w-full">
				<NavItem href="/create" name="Create" />
				<NavItem href="/scrape" name="Scrape" />
			</nav>
			<div className="flex justify-between items-center h-16 bg-slate-500 w-full p-2">
				{/* Auth */}
				<p>Logged in as Nate</p>
			</div>
		</div>
	);
};
