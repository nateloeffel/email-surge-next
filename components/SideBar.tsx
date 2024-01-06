"use server";
import { authOptions } from "@/lib/authOptions";
import { MailPlus, PencilIcon, PlusIcon, UserRoundSearch } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ProfileDropdown } from "./ProfileDropdown";

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

export const SideBar = async () => {
	const session = await getServerSession(authOptions);
	return (
		<div className="flex flex-col justify-between items-start w-64 bg-[#003e6b]">
			<nav className="flex flex-col justify-start items-center p-2 w-full">
				<span className="text-2xl font-medium text-white p-1 pl-3 w-full rounded-md">
					Email Surge
				</span>
				<NavItem
					href="/create"
					name="Create"
					icon={<MailPlus className="mr-3" size={20} />}
				/>
				<NavItem
					href="/scrape"
					name="Scrape"
					icon={<UserRoundSearch className="mr-3" />}
				/>
				<NavItem
					href="/personalize"
					name="Personalize"
					icon={<PencilIcon className="mr-3" />}
				/>
			</nav>
			<div className="flex justify-between items-center h-16 rounded-md hover:bg-[#114a73] w-full p-2">
				{/* Auth */}
				
				<ProfileDropdown />
			</div>
		</div>
	);
};
