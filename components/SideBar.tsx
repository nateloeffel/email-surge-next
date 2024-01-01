"use server";
import Link from "next/link";

export const SideBar = () => {
	return (
		<div className="flex flex-col justify-between items-start bg-slate-300 w-1/6">
			<nav className="flex flex-col justify-start items-center p-2 w-full">
				<Link
					href="/create"
					className="text-sm font-medium transition-colors hover:text-primary p-1 w-full bg-red-500 rounded-md my-2"
				>
					<span className="text-lg">Create</span>
				</Link>
				<Link
					href="/scrape"
					className="text-sm font-medium transition-colors hover:text-primary p-1 w-full bg-red-500 rounded-md my-2"
				>
					<span className="text-lg">Scrape</span>
				</Link>
			</nav>
			<div className="flex justify-between items-center h-16 bg-slate-500 w-full p-2">
				{/* Auth */}
				<p>Logged in as Nate</p>
			</div>
		</div>
	);
};
