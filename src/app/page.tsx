import { LandingExperience } from "@/components/gsap/LandingExperience";

export default function Home() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ahmed Raza",
    jobTitle: "MERN Stack Developer & E-Commerce Specialist",
    email: "123raza83@gmail.com",
    url: siteUrl,
    sameAs: [
      "https://github.com/razakhan83",
      "https://www.linkedin.com/in/razakdev",
      "https://wa.me/923052622043",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <LandingExperience />
    </>
  );
}
