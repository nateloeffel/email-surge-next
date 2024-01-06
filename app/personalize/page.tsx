import MainForm from "@/components/MainForm";
import PersonalizeForm from "@/components/PersonalizeForm";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Personalize() {
	const session = await getServerSession(authOptions)
	if (!session?.user) {
		redirect('api/auth/signin')
	}

	return (
		<div className="m-3 w-full">
			<h1 className="text-2xl">Personalize Email</h1>
			<PersonalizeForm />
		</div>
	);
}
