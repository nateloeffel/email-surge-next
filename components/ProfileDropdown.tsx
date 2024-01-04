"use client";
import {
	Cloud,
	CreditCard,
	Github,
	Keyboard,
	LifeBuoy,
	LogOut,
	Mail,
	MessageSquare,
	MessageSquarePlus,
	Plus,
	PlusCircle,
	Settings,
	Sparkles,
	User,
	UserPlus,
	Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export const ProfileDropdown = () => {
	const session = useSession();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div className="w-full flex justify-between items-center">
					<span className="text-slate-100 text-lg">
						{session?.data?.user?.name}
					</span>
					<Avatar className="cursor-pointer">
						<AvatarImage
							src={session.data?.user?.image ?? ""}
							alt={session.data?.user?.name ?? "profile picture"}
							width="10px"
						/>
						<AvatarFallback>
							{session.data?.user?.name?.charAt(0)}
						</AvatarFallback>
					</Avatar>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuLabel>My Account</DropdownMenuLabel>

				{/* <DropdownMenuSeparator />
				<DropdownMenuGroup>
					<Link href="profile">
						<DropdownMenuItem>
							<User className="mr-2 h-4 w-4" />
							<span>Profile</span>
						</DropdownMenuItem>
					</Link>
					<Link href="billing">
						<DropdownMenuItem>
							<CreditCard className="mr-2 h-4 w-4" />
							<span>Billing</span>
						</DropdownMenuItem>
					</Link>

					<Link href="settings">
						<DropdownMenuItem>
							<Settings className="mr-2 h-4 w-4" />
							<span>Settings</span>
						</DropdownMenuItem>
					</Link>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<Link href="https://docs.google.com/forms/d/e/1FAIpQLSeVcZZ5qd1kpxLecpoK8ofeS8CQMLh5S-RISHoMPHyDCunNiQ/viewform?usp=sf_link">
					<DropdownMenuItem>
						<MessageSquarePlus className="mr-2 h-4 w-4" />
						<span>Feedback</span>
					</DropdownMenuItem>
				</Link>

				<Link href="./#support">
					<DropdownMenuItem>
						<LifeBuoy className="mr-2 h-4 w-4" />
						<span>Support</span>
					</DropdownMenuItem>
				</Link> */}
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={() => {
						signOut();
					}}
				>
					<LogOut className="mr-2 h-4 w-4" />
					<span>Log out</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
