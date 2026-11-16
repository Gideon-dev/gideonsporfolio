import Image from "next/image";
import CopyEmail from "@/components/about/CopyEmail";
import GlobeCard from "@/components/about/GlobeCard";
import TechOrbit from "@/components/about/TechOrbit";
import Button from "@/components/ui/Button";
import { site } from "@/lib/site";

const About = () => (
  <section className="c-space my-20 scroll-mt-24" id="about" aria-labelledby="about-heading">
    <h2 id="about-heading" className="sr-only">
      About me
    </h2>
    <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full">
      <div className="col-span-1 xl:row-span-3">
        <div className="grid-container">
          {/* TODO(gideon): template avatar. Swap for a real photo. */}
          <Image src="/assets/grid1.png" alt="" width={816} height={672} className="w-full sm:h-[276px] h-fit object-contain" />
          <div>
            <h3 className="grid-headtext">Hi, I&apos;m {site.shortName}</h3>
            <p className="grid-subtext">
              A frontend engineer with 2+ years of experience building multi-role platforms, complex product workflows
              and reusable component systems.
            </p>
          </div>
        </div>
      </div>

      <div className="col-span-1 xl:row-span-3">
        <div className="grid-container">
          <div className="flex w-full items-center justify-center sm:h-[276px]">
            <TechOrbit monogram={site.shortName.charAt(0)} />
          </div>
          <div>
            <h3 className="grid-headtext">Tech Stack</h3>
            <p className="grid-subtext">
              I work in TypeScript across the React and Next.js ecosystem: multi-app Turborepo platforms, typed API
              clients and shared component systems. I have also shipped custom WordPress and WooCommerce builds.
            </p>
          </div>
        </div>
      </div>

      <div className="col-span-1 xl:row-span-4">
        <div className="grid-container">
          <div className="rounded-3xl w-full sm:h-[326px] h-fit flex justify-center items-center">
            <GlobeCard />
          </div>
          <div>
            <h3 className="grid-headtext">I work remotely across most timezones</h3>
            <p className="grid-subtext">I&apos;m based in Lagos, {site.location}, and work with remote teams.</p>
            <Button name="Contact me" href="#contact" isBeam containerClass="w-full mt-10" />
          </div>
        </div>
      </div>

      <div className="xl:col-span-2 xl:row-span-3">
        <div className="grid-container">
          <div>
            <h3 className="grid-headtext">How I work</h3>
            <p className="grid-subtext">
              I care about code a team can keep working in: typed contracts between frontend and API, shared packages
              instead of copies, and conventions that are written down. I write up the decisions I make so the next
              person does not have to guess.
            </p>
          </div>
          <ul className="flex flex-wrap gap-2" aria-label="Toolbox">
            {site.toolbox.map((tool) => (
              <li key={tool} className="rounded-full border border-black-300 bg-black-100 px-3 py-1 text-sm text-white-600">
                {tool}
              </li>
            ))}
          </ul>
          <p className="mt-auto border-t border-black-300 pt-4 text-sm text-white-500">
            <span className="text-white-700">{site.education.degree}</span>, {site.education.school} ·{" "}
            {site.education.years}
          </p>
        </div>
      </div>

      <div className="xl:col-span-1 xl:row-span-2">
        <div className="grid-container">
          <Image
            src="/assets/grid4.png"
            alt=""
            width={720}
            height={544}
            className="w-full md:h-[126px] sm:h-[276px] h-fit object-cover sm:object-top"
          />
          <div className="space-y-2">
            <p className="grid-subtext text-center">Contact me</p>
            <CopyEmail email={site.email} />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default About;
