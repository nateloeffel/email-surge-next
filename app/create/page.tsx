import MainForm from "@/components/MainForm";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Create() {
	const session = await getServerSession(authOptions)
	if (!session?.user) {
		redirect('api/auth/signin')
	}

	return (
		<div className="m-3 w-full">
			<h1 className="text-2xl">Generate Email</h1>
			<MainForm />
		</div>
	);
}
