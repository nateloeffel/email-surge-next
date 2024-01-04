import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "@/lib/authOptions";

export const POST = async (req: Request, res: Response) => {
	const session = await getServerSession(authOptions);

	// If there's no user in the session, return a 401 Unauthorized response
	if (!session?.user) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const {
		profile,
	}: {
		profile: UserProfile;
	} = await req.json();

	if (!profile) {
		return NextResponse.json(
			{ message: "Missing required fields" },
			{ status: 400 }
		);
	}


	let userProfile
	try {
		userProfile = await prisma.userProfile.create({
			data: {
				linkedin_url: profile.linkedin_url,
				name: profile.name,
				location: profile.location,
				email: profile.email,
				about: profile.about,
				company: profile.company,
				job_title: profile.job_title,
				experiences: {
					create: profile.experiences, // Array of Experience objects
				},
				educations: {
					create: profile.educations, // Array of Education objects
				},
				interests: {
					create: profile.interests, // Array of Interest objects
				},
				accomplishments: {
					create: profile.accomplishments, // Array of Accomplishment objects
				},
				contacts: {
					create: profile.contacts, // Array of Contact objects
				},
			},
		});

		console.log("UserProfile created:", userProfile);
	} catch (error) {
		console.error("Error creating UserProfile:", error);
		throw error;
	}

	return NextResponse.json(userProfile, { status: 200 });
};
