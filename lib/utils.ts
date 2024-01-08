import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function normalizeLinkedinUrl(linkedinUrl: string) {
	// Remove the protocol (http:// or https://) and "www." if present
	let normalizedUrl = linkedinUrl.replace(/^(https?:\/\/)?(www\.)?/, "");

	// Check if the domain is 'linkedin.com' and the path starts with '/in/'
	if (normalizedUrl.startsWith("linkedin.com/in/")) {
		// Prepend the standard protocol and 'www.'
		normalizedUrl = `https://www.${normalizedUrl}`;

		// Ensure the URL does not end with a slash
		if (normalizedUrl.endsWith("/")) {
			normalizedUrl = normalizedUrl.slice(0, -1);
		}
		return normalizedUrl;
	} else {
		// If the URL doesn't match expected pattern, return null or handle as needed
		return "";
	}
}

export function extractUsernameFromLinkedinUrl(normalizedUrl: string) {
  // Assuming normalizedUrl is always in the format "https://www.linkedin.com/in/{username}"
  const parts = normalizedUrl.split('/');
  const username = parts[parts.length - 1]; // The username should be the last part
  return username;
}

export async function checkExistingProfiles(username: string) {
  const url = `/api/profile/${username}`;

  try {
    const response = await fetch(url);

    if (response.status === 404) {
      return false; // Return false if the user profile is not found
    }

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const userProfile = await response.json();
    return userProfile; // Assuming the response matches the UserProfile structure
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error; // Re-throw the error for other error statuses
  }
}