"use client";
import {
	Cloud,
	CreditCard,
	Github,
	Keyboard,
	LifeBuoy,
	LogOut,
	Mail,
	MailPlus,
	MessageCircleQuestionIcon,
	MessageSquare,
	MessageSquarePlus,
	PencilIcon,
	Plus,
	PlusCircle,
	Settings,
	Sparkles,
	User,
	UserPlus,
	UserRoundSearch,
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

export const MobileProfileDropdown = () => {
	const session = useSession();
	return (
		<div className="flex md:hidden justify-between items-center h-16 rounded-md hover:bg-[#114a73] w-full p-2">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<div className="w-full flex justify-between items-center">
						<Avatar className="cursor-pointer">
							<AvatarImage
								src={session.data?.user?.image ?? ""}
								alt={
									session.data?.user?.name ??
									"profile picture"
								}
								width="10px"
							/>
							<AvatarFallback>
								{session.data?.user?.name?.charAt(0)}
							</AvatarFallback>
						</Avatar>
					</div>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-56">
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<Link href="/">
							<DropdownMenuItem>
								<MessageCircleQuestionIcon className="mr-2 h-4 w-4" />
								<span>Tutorial</span>
							</DropdownMenuItem>
						</Link>
						<Link href="create">
							<DropdownMenuItem>
								<MailPlus className="mr-2 h-4 w-4" />
								<span>Create</span>
							</DropdownMenuItem>
						</Link>

						<Link href="scrape">
							<DropdownMenuItem>
								<UserRoundSearch className="mr-2 h-4 w-4" />
								<span>Scrape</span>
							</DropdownMenuItem>
						</Link>

						<Link href="personalize">
							<DropdownMenuItem>
								<PencilIcon className="mr-2 h-4 w-4" />
								<span>Personalize</span>
							</DropdownMenuItem>
						</Link>
					</DropdownMenuGroup>
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
		</div>
	);
};
