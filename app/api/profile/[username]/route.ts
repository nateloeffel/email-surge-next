import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const getUserProfileByLinkedinUrl = async (
	linkedinUrl: string
): Promise<UserProfile | null> => {
	try {
		const userProfile = await prisma.userProfile.findUnique({
			where: { linkedin_url: linkedinUrl },
			include: {
				experiences: true,
				educations: true,
				interests: true,
				accomplishments: true,
				contacts: true,
			},
		});

		return userProfile;
	} catch (error) {
		console.error("Error fetching UserProfile:", error);
		throw error;
	}
};

export const GET = async (req: Request, context: any) => {
	const username = context.params.username;

	if (!username) {
		return NextResponse.json({ message: "Bad request" }, { status: 400 });
	}

	let userProfile;
	try {
		userProfile = await getUserProfileByLinkedinUrl(
			`https://www.linkedin.com/in/${username}`
		);
		if (userProfile) {
			return NextResponse.json(userProfile, { status: 200 });
		} else {
			return NextResponse.json(
				{ error: "User profile not found" },
				{ status: 404 }
			);
		}
	} catch (error) {
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
};
