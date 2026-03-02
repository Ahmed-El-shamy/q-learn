import HTMLConvertor from "@/_components/common/HTMLConvertor";

const CourseOverview = ({ overview }: { overview: string }) => {
    return (
        <div className="text-sm sm:text-base [&_p]:mb-2 [&_p:last-child]:mb-0">
            <HTMLConvertor html={overview} />
        </div>
    );
}

export default CourseOverview;