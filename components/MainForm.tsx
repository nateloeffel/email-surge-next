"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";

export default function MainForm() {
	const [formData, setFormData] = useState({
		companyName: "",
		senderName: "",
		senderService: "",
		targetName: "",
		targetType: "",
	});
	const [responseMessage, setResponseMessage] = useState<String>("");
	const [loading, setLoading] = useState<Boolean>(false)

	const handleChange = (e: any) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setLoading(true)
		try {
			const response = await fetch("https://emailsurge.unthought.co/create", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (!response.ok) {
				throw new Error(`Error: ${response.status}`);
			}

			const data = await response.json();
			console.log("Success:", data);
			setResponseMessage(data.message);
		} catch (error) {
			console.error("Error:", error);
			// Handle errors
		}
		setLoading(false)
	};

	return (
		<div className="flex justify-center">
			<form
				onSubmit={handleSubmit}
				className="w-full flex flex-col items-center"
			>
				<div className="flex flex-col md:flex-row w-full">
					<div className="md:w-1/2 w-full md:h-[500px] bg-white rounded-t-lg md:rounded-l-lg md:rounded-tr-none pb-5 items-center flex flex-col">
						<div className=" w-full  max-w-lg mt-3 px-2">
							<Label htmlFor="companyNmae">Company Name</Label>
							<Input
								autoComplete="off"
								type="text"
								id="companyName"
								name="companyName"
								value={formData.companyName}
								onChange={handleChange}
								placeholder="Company Name"
							/>
						</div>
						<div className="w-full  max-w-lg mt-3 px-2 ">
							<Label htmlFor="senderName">Sender Name</Label>
							<Input
								autoComplete="off"
								type="text"
								id="senderName"
								name="senderName"
								value={formData.senderName}
								onChange={handleChange}
								placeholder="Sender Name"
							/>
						</div>
						<div className=" w-full  max-w-lg mt-3 px-2 ">
							<Label htmlFor="senderService">
								Sender Service
							</Label>
							<Input
								autoComplete="off"
								type="text"
								id="senderService"
								name="senderService"
								value={formData.senderService}
								onChange={handleChange}
								placeholder="Sender Service"
							/>
						</div>
						<div className=" w-full  max-w-lg mt-3 px-2 ">
							<Label htmlFor="targetName">Target Name</Label>
							<Input
								autoComplete="off"
								type="text"
								id="targetName"
								name="targetName"
								value={formData.targetName}
								onChange={handleChange}
								placeholder="Target Name"
							/>
						</div>
						<div className=" w-full  max-w-lg mt-3 px-2 ">
							<Label htmlFor="targetType">Target Type</Label>
							<Input
								autoComplete="off"
								type="text"
								id="targetType"
								name="targetType"
								value={formData.targetType}
								onChange={handleChange}
								placeholder="Individual/Business"
							/>
						</div>
					</div>
					<div className="md:w-1/2 w-full p-5 md:h-[500px] flex rounded-b-lg md:rounded-r-lg md:rounded-bl-none  bg-slate-200">
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
						{responseMessage ? <p>{responseMessage}</p> : null}
					</div>
				</div>
				<Button className="mt-5 w-full" variant="outline" type="submit">
					Generate
				</Button>
			</form>
		</div>
	);
}
