import ClosingCta from "@/components/closing-cta";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import HorizontalStory from "@/components/horizontal-story";
import Process from "@/components/process";
import Services from "@/components/services";
import StudioIntro from "@/components/studio-intro";
import Ticker from "@/components/ticker";
import WorkSection from "@/components/work-section";

export default function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <WorkSection />
      <StudioIntro />
      <HorizontalStory />
      <Services />
      <Process />
      <ClosingCta />
      <Contact />
      <Footer />
    </>
  );
}
