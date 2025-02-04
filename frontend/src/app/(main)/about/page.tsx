import Image from "next/image";
import Footer from "@/lib/components/layout/footer";
import Header from "@/lib/components/layout/header";

export default function About() {
    return (
        <>
            <Header />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8 text-center text-gray-100 dark:text-white">
                    About AI Meme Generator
                </h1>

                <div className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-100 dark:text-white">
                        Our Mission
                    </h2>
                    <p className="text-gray-200 dark:text-gray-300 mb-4">
                        At AI Meme Generator, our mission is to democratize
                        creativity and bring laughter to the world through the
                        power of artificial intelligence. We believe that
                        everyone has the potential to create hilarious and
                        engaging content, and our platform is designed to make
                        that process as easy and fun as possible.
                    </p>
                    <p className="text-gray-200 dark:text-gray-300">
                        By combining cutting-edge AI technology with a
                        user-friendly interface, empowering people from all
                        walks of life to express themselves through memes,
                        fostering a global community of creators and humor
                        enthusiasts.
                    </p>
                </div>

                <div className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-100 dark:text-white">
                        Our Team
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Jane Doe",
                                role: "Founder & CEO",
                                image: "wolf.svg?text=Jane",
                            },
                            {
                                name: "John Smith",
                                role: "CTO",
                                image: "wolf.svg?text=John",
                            },
                            {
                                name: "Emily Brown",
                                role: "Head of Design",
                                image: "wolf.svg?text=Emily",
                            },
                        ].map((member) => (
                            <div key={member.name} className="text-center">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    width={200}
                                    height={200}
                                    className="rounded-full mx-auto mb-4"
                                />
                                <h3 className="text-xl font-semibold mb-2 text-gray-100 dark:text-white">
                                    {member.name}
                                </h3>
                                <p className="text-gray-200 dark:text-gray-300">
                                    {member.role}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-100 dark:text-white">
                        Our Journey
                    </h2>
                    <p className="text-gray-200 dark:text-gray-300 mb-4">
                        Founded in 2023, AI Meme Generator started as a passion
                        project among a group of friends who loved memes and
                        were fascinated by the potential of AI. What began as a
                        simple idea quickly grew into a platform used by
                        thousands of creators worldwide.
                    </p>
                    <p className="text-gray-200 dark:text-gray-300">
                        Todayre constantly innovating and improving our
                        technology to bring you the best meme generation
                        experience possible. Our journey is just beginning, and
                        excited to see where the future of AI-powered creativity
                        will take us.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-4 text-gray-100 dark:text-white">
                        Our Sponsors
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            {
                                name: "TechCorp",
                                image: "wolf.svg?text=TechCorp",
                            },
                            {
                                name: "AI Innovations",
                                image: "wolf.svg?text=AIInnovations",
                            },
                            {
                                name: "Meme Masters",
                                image: "wolf.svg?text=MemeMasters",
                            },
                            {
                                name: "Creative Solutions",
                                image: "wolf.svg?text=CreativeSolutions",
                            },
                        ].map((sponsor) => (
                            <div key={sponsor.name} className="text-center">
                                <Image
                                    src={sponsor.image}
                                    alt={sponsor.name}
                                    width={150}
                                    height={150}
                                    className="mx-auto mb-2"
                                />
                                <p className="text-gray-200 dark:text-gray-300">
                                    {sponsor.name}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
