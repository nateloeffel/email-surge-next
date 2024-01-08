"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./ui/card";
import {
	checkExistingProfiles,
	extractUsernameFromLinkedinUrl,
	normalizeLinkedinUrl,
} from "@/lib/utils";

function EducationCard({ education }: { education: Education }) {
	return (
		<Card className="w-full my-3">
			<CardHeader>
				<CardTitle>{education.degree}</CardTitle>
				<CardDescription>{education.institution_name}</CardDescription>
			</CardHeader>
			<CardContent>{education.description}</CardContent>
		</Card>
	);
}

function ExperienceCard({ experience }: { experience: Experience }) {
	return (
		<Card className="w-full my-3">
			<CardHeader>
				<CardTitle>{experience.institution_name}</CardTitle>
				<CardDescription>{experience.position_title}</CardDescription>
			</CardHeader>
			<CardContent>{experience.description}</CardContent>
			<CardFooter>
				{experience.from_date}
				{experience.to_date ? " - " + experience.to_date : null}
				{experience.location ? ": " + experience.location : null}
			</CardFooter>
		</Card>
	);
}

export default function ScrapeForm() {
	const [formData, setFormData] = useState({
		profileUrl: "",
	});
	const [responseData, setResponseData] = useState<UserProfile>();
	const [loading, setLoading] = useState<boolean>(false);
	const [educationVisible, setEducationVisible] = useState<boolean>(false);
	const [experienceVisible, setExperienceVisible] = useState<boolean>(false);

	const handleChange = (e: any) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleEducation = () => {
		setExperienceVisible(false);
		setEducationVisible(!educationVisible);
	};

	const handleExperience = () => {
		setEducationVisible(false);
		setExperienceVisible(!experienceVisible);
	};

	async function submitUserProfile(profileData: UserProfile) {
		const url = "/api/profile"; // API endpoint URL
		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ profile: profileData }),
		};

		try {
			const response = await fetch(url, options);
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			const data = await response.json();
			console.log("Profile created:", data);
			return data;
		} catch (error) {
			console.error("Error submitting profile:", error);
			throw error;
		}
	}

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setResponseData(undefined);
		setLoading(true);

		if (!formData.profileUrl) return setLoading(false);

		// check if a profile exists in the cache
		const newProfileUrl = normalizeLinkedinUrl(formData.profileUrl);
		setFormData({ profileUrl: newProfileUrl ?? "" });
		const username = extractUsernameFromLinkedinUrl(formData.profileUrl);
		const profile = await checkExistingProfiles(username);
		if (profile) {
			setResponseData(profile);
			console.log("Profile was found in cache.");
		} else {
			try {
				const response = await fetch("https://emailsurge.unthought.co/scrape", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formData),
				});

				if (!response.ok) {
					throw new Error(`Error: ${response.status}`);
				}

				const data: UserProfile = await response.json();
				setResponseData(data);
				submitUserProfile(data);
			} catch (error) {
				console.error("Error:", error);
				// Handle errors
			}
		}

		setLoading(false);
	};

	return (
		<div className="flex justify-center">
			<form
				onSubmit={handleSubmit}
				className="w-full flex flex-col items-center"
			>
				<div className="flex flex-col md:flex-row w-full">
					<div className="md:w-1/2 w-full md:h-[500px] bg-white rounded-t-lg md:rounded-l-lg md:rounded-tr-none pb-5 items-center flex flex-col">
						<div className=" w-full  max-w-lg mt-3">
							<Label htmlFor="profileUrl">Linkedin URL</Label>
							<Input
								autoComplete="off"
								type="text"
								id="profileUrl"
								name="profileUrl"
								value={formData.profileUrl}
								onChange={handleChange}
								placeholder="Profile Url"
							/>
						</div>
					</div>
					<div className="md:w-1/2 md:h-[500px] rounded-b-lg md:rounded-r-lg md:rounded-bl-none w-full p-5 flex overflow-y-auto bg-slate-200">
						{responseData ? (
							<div className="w-full">
								<h2>Name: {responseData.name}</h2>
								<h3>Location: {responseData.location}</h3>
								<h3>
									Email: {responseData.email ?? "Not Found"}
								</h3>
								<h3>Company: {responseData.company}</h3>
								<h3>Job Title: {responseData.job_title}</h3>
								<div className="flex justify-start">
									{responseData.educations ? (
										<Button
											onClick={handleEducation}
											className="mr-5 mt-3"
											type="button"
										>
											{educationVisible ? "Hide" : "Show"}{" "}
											Education
										</Button>
									) : null}
									{responseData.experiences ? (
										<Button
											onClick={handleExperience}
											className="mr-5 mt-3"
											type="button"
										>
											{experienceVisible
												? "Hide"
												: "Show"}{" "}
											Experiences
										</Button>
									) : null}
								</div>
								{educationVisible ? (
									<div className="w-full">
										{responseData.educations.length > 0 ? (
											<>
												{responseData.educations.map(
													(education) => {
														return (
															<EducationCard
																key={
																	education.institution_name
																}
																education={
																	education
																}
															/>
														);
													}
												)}
											</>
										) : (
											<p>No education data found!</p>
										)}
									</div>
								) : null}
								{experienceVisible ? (
									<div>
										{responseData.experiences.length > 0 ? (
											<>
												{responseData.experiences.map(
													(experience) => {
														return (
															<ExperienceCard
																key={
																	experience.institution_name
																}
																experience={
																	experience
																}
															/>
														);
													}
												)}
											</>
										) : (
											<p>No experience data found!</p>
										)}
									</div>
								) : null}
							</div>
						) : null}
						{loading ? (
							<div className="w-full flex items-center justify-center">
								<div role="status">
									<svg
										aria-hidden="true"
										className="w-24 h-24 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
										viewBox="0 0 100 101"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
											fill="currentColor"
										/>
										<path
											d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
											fill="currentFill"
										/>
									</svg>
									<span className="sr-only">Loading...</span>
								</div>
							</div>
						) : null}
					</div>
				</div>
				<Button
					className="mt-5 w-full"
					disabled={loading}
					variant="outline"
					type="submit"
				>
					Generate
				</Button>
			</form>
		</div>
	);
}
