"use server";
import { MailPlus, PlusIcon, UserRoundSearch } from "lucide-react";
import Link from "next/link";

function NavItem({
	href,
	name,
	icon,
}: {
	href: string;
	name: string;
	icon: any;
}) {
	return (
		<Link
			href={href}
			className="text-sm font-medium text-slate-200 hover:bg-[#114a73] p-1 pl-3 w-full rounded-md flex items-center"
		>
			{icon}
			<span className="text-lg">{name}</span>
		</Link>
	);
}

export const SideBar = () => {
	return (
		<div className="flex flex-col justify-between items-start w-64 bg-[#003e6b]">
			<nav className="flex flex-col justify-start items-center p-2 w-full">
				<span className="text-2xl font-medium text-white p-1 pl-3 w-full rounded-md">
					Email Surge
				</span>
				<NavItem href="/create" name="Create" icon={<MailPlus className="mr-3" size={20} />} />
				<NavItem href="/scrape" name="Scrape" icon={<UserRoundSearch className="mr-3" />} />
			</nav>
			<div className="flex justify-between items-center h-16 w-full p-2">
				{/* Auth */}
			</div>
		</div>
	);
};
