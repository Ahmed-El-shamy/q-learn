import HTMLConvertor from "@/_components/common/HTMLConvertor";

const CourseOverview = ({ overview }: { overview: string }) => {
    return (
        <HTMLConvertor html={overview} />
    );
}

export default CourseOverview;