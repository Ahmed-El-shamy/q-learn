"use client";

import Container from "@/_components/common/container/Container";
import StatisticsCard from "./StatisticsCard";
import { BookOpen, Users, Earth, Heart } from "lucide-react";

const statisticsData = [
  {
    bgColor: "#425073",
    icon: BookOpen,
    number: 100,
    text: "Online Courses",
  },
  {
    bgColor: "#17c7ff",
    icon: Users,
    number: 23692,
    text: "Student Enrolled",
  },
  {
    bgColor: "#feb74c",
    icon: Earth,
    number: 126,
    text: "Countries Student",
  },
  {
    bgColor: "#4b64ec",
    icon: Heart,
    number: 876,
    text: "Positive Feedback",
  },
];

const StatisticsSection = () => {
  return (
    <Container>
      <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8 mb-20 lg:-mt-32 mt-20 relative z-1 duration-300">
        {statisticsData.map((item, i) => (
          <StatisticsCard
            key={i}
            bgColor={item.bgColor}
            icon={item.icon}
            number={item.number}
            text={item.text}
          />
        ))}
      </div>
    </Container>
  );
};

export default StatisticsSection;
