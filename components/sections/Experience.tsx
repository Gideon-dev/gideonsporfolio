import ExperienceStack from "@/components/experience/ExperienceStack";
import { experienceStack } from "@/lib/experience";

const Experience = () => (
  <section id="experience" className="mt-20 scroll-mt-20" aria-labelledby="experience-heading">
    <div className="xp-intro">
      <p className="xp-eyebrow">Selected work</p>
      <h2 id="experience-heading" className="xp-heading">
        Work &amp; Experience
      </h2>
      <p className="xp-lede">
        Six products, newest first, from multi-app platforms to a custom storefront. Open any folder for the full case
        file.
      </p>
    </div>
    <ExperienceStack content={experienceStack} />
  </section>
);

export default Experience;
