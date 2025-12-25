export interface InstructorSocialMedia {
    name: string,
    icon: string,
    type: string,
    profile_url: string,
    id: number
}
export interface Instructor {
    user: {
        id: number,
        name: string,
        email: string,
        phone: string,
        avatar_url: string,
        account_type: string,
        type: string,
        auth_method: string,
        preferred_language: string,
        birthdate: string,
        nationality: string,
        residency: string,
        job_title: string
    }
    avatar: string,
    ratings_count: number,
    reviews_count: number,
    students_count: number,
    courses_count: number,
    social_media: InstructorSocialMedia[]
}