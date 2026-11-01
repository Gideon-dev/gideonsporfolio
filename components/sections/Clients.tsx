import Image from "next/image";
import { clientReviews } from "@/lib/constants";

const Clients = () => {
  return (
    <section className="c-space my-20" aria-labelledby="clients-heading">
      <h2 id="clients-heading" className="head-text">
        Hear from my clients
      </h2>

      <div className="client-container">
        {clientReviews.map(({ id, name, review, img, position }) => (
          <figure key={id} className="client-review">
            <blockquote className="text-white font-light">{review}</blockquote>
            <figcaption className="client-content">
              <div className="flex gap-3">
                <Image src={img} alt="" width={48} height={48} className="w-12 h-12 rounded-full" />
                <div className="flex flex-col">
                  <p className="font-semibold text-white-800">{name}</p>
                  <p className="md:text-base text-sm text-white-500">{position}</p>
                </div>
              </div>
              <div className="flex self-end items-center gap-2" role="img" aria-label="Rated 5 out of 5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Image key={index} src="/assets/star.png" alt="" width={39} height={38} className="h-5 w-auto" />
                ))}
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};

export default Clients;
