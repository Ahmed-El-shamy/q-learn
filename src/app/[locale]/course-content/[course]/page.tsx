import api, { Api } from "@/_lib/api/api";

const CourseContent = async ({
    params
}: {
    params: Promise<{
        course: string
    }>
}) => {
    const { course: courseId } = await params;
    
    if (true) {
        return (
            <div>
                Hello there {courseId}
            </div>
        );
    }
    throw new Error("something went wrong");
}

export default CourseContent;