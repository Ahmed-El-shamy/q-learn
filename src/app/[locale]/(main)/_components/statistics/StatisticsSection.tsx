import ErrorHandler from "@/_components/common/error-handler/ErrorHandler";
import api, { Api } from "@/_lib/api/api";
import StatisticsCard from "./StatisticsCard";
import Container from "@/_components/common/container/Container";
import { Stats } from "./type/stats.types";

export default async function StatisticsSection() {
  try {
    const response = await api.get(Api.routes.site.stats);
    if (!response?.status) return null;
    const d = response.data as Stats;

    return (
      <Container>
        <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8 mb-20 lg:-mt-32 mt-20 relative z-1 duration-300">
          <StatisticsCard
            bgColor="#425073"
            iconKey="book"
            number={d?.online_courses_count}
            textKey="onlineCourses"
          />
          <StatisticsCard
            bgColor="#17c7ff"
            iconKey="users"
            number={d?.student_enrolled_count}
            textKey="studentEnrolled"
          />
          <StatisticsCard
            bgColor="#feb74c"
            iconKey="earth"
            number={d?.countries_count}
            textKey="countriesStudent"
          />
          <StatisticsCard
            bgColor="#4b64ec"
            iconKey="heart"
            number={d?.positive_feedback_count}
            textKey="positiveFeedback"
          />
        </div>
      </Container>
    );
  } catch {
    return <ErrorHandler />;
  }
}
