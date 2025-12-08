import Container from "@/_components/common/container/Container";
import { useTranslations } from "next-intl";
const HomePage = () => {
  const t = useTranslations("Home");

  return (
    <>
      <section className="h-screen bg-blue-200">
        <Container className="bg-red-200">
          <div></div>
        </Container>
      </section>
    </>
  );
};

export default HomePage;
