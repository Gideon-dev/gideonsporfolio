import { activeSocials, site } from "@/lib/site";

const personId = `${site.url}/#person`;

const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: site.name,
      alternateName: site.shortName,
      jobTitle: site.role,
      description: site.description,
      url: site.url,
      email: `mailto:${site.email}`,
      image: `${site.url}/opengraph-image`,
      address: { "@type": "PostalAddress", addressCountry: "NG" },
      knowsAbout: [...site.skills],
      sameAs: activeSocials.map((social) => social.href),
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: `${site.name} Portfolio`,
      description: site.description,
      inLanguage: "en",
      author: { "@id": personId },
    },
    {
      "@type": "ProfilePage",
      "@id": `${site.url}/#profile`,
      url: site.url,
      name: `${site.name} | ${site.role}`,
      isPartOf: { "@id": `${site.url}/#website` },
      mainEntity: { "@id": personId },
    },
  ],
};

// Escape "<" so a value can never close the script tag early.
const json = JSON.stringify(graph).replace(/</g, "\\u003c");

export default function JsonLd() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
