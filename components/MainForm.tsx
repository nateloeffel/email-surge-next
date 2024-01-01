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

	const handleChange = (e: any) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		try {
			const response = await fetch("http://127.0.0.1:5000/create", {
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
	};

	return (
		<div className="flex justify-center">
			<form
				onSubmit={handleSubmit}
				className="w-full flex flex-col items-center"
			>
				<div className="flex w-full">
					<div className="w-1/2 bg-red-300 pb-5 items-center flex flex-col">
						<div className=" w-full  max-w-lg mt-3">
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
						<div className="w-full  max-w-lg mt-3 ">
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
						<div className=" w-full  max-w-lg mt-3 ">
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
						<div className=" w-full  max-w-lg mt-3 ">
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
						<div className=" w-full  max-w-lg mt-3 ">
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
					<div className="w-1/2 p-5 flex bg-slate-500">
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
