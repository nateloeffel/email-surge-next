interface Experience {
    position_title: string;
    from_date: string;
    to_date: string;
    duration: string | null;
    location: string;
    description: string;
    institution_name: string;
    linkedin_url: string;
}

interface Education {
    from_date: string | null;
    to_date: string | null;
    description: string;
    degree: string;
    institution_name: string;
    linkedin_url: string;
}

interface Interest {
    name: string; 
}

interface Accomplishment {
    category: string;
    title: string;
}

interface Contact {
    name: string;
    occupation: string;
    url: string;
}

interface UserProfile {
    linkedin_url: string;
    name: string;
    location: string;
    email: string | null;
    about: string;
    experiences: Experience[];
    educations: Education[];
    interests: Interest[];
    accomplishments: Accomplishment[];
    contacts: Contact[];
    company: string | null;
    job_title: string | null;
}