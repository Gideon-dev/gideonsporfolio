import ExperienceReveal from "@/components/experience/ExperienceReveal";
import ExperienceStack from "@/components/experience/ExperienceStack";
import { experienceReveal, experienceStack } from "@/lib/experience";

const Experience = () => (
  <>
    <ExperienceReveal content={experienceReveal} />
    <ExperienceStack content={experienceStack} />
  </>
);

export default Experience;
