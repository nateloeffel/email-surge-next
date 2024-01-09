import MainForm from "@/components/MainForm";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    redirect('api/auth/signin')
  }

	return (
		<div className="m-3 w-full">
			<h1 className="text-2xl">How to Use</h1>
			<div className=" rounded-lg w-full p-5 flex overflow-y-auto bg-slate-200 items-center justify-center">
				<iframe
					width="560"
					height="315"
					src="https://www.youtube.com/embed/eH4tep5lYIY?si=bk0zqvzkK8GtFoJS"
					title="YouTube video player"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					allowFullScreen
				></iframe>
			</div>
		</div>
	);
}
