"use server";
import Link from "next/link";

export const NavBar = () => {
	return (
		<div className=" flex items-center justify-between border-b-2 px-4 h-14 ">
			<nav className="flex items-center space-x-4 lg:space-x-6">
				<Link
					href="/create"
					className="text-sm font-medium transition-colors hover:text-primary"
				>
					Create
				</Link>
				<Link
					href="/scrape"
					className="text-sm font-medium transition-colors hover:text-primary"
				>
					Scrape
				</Link>
			</nav>
		</div>
	);
};
