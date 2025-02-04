import Image from "next/image";
import Link from "next/link";
import Header from "../lib/components/layout/header";
import Footer from "../lib/components/layout/footer";
import BannerGif from "../shared/assets/bannergif.gif";
import axios from "axios";
import TutorialCard from "@/lib/components/TutorialCard/TutorialCard";
import TutorialImg from "../shared/assets/tutorial.jpg";
// import SplashCursor from "./SplashCursor";

interface Meme {
    url: string;
    id: string;
    name: string;
    width: number;
    height: number;
    box_count: number;
    caption: string;
}

const tutorials = [
    {
        id: 1,
        title: "Lorem ipsum dolor sit amet",
        description: "consectetur. Mi pretium augue ut sagittis.",
        imageUrl: TutorialImg,
    },
    {
        id: 2,
        title: "Lorem ipsum dolor sit amet",
        description: "consectetur. Mi pretium augue ut sagittis.",
        imageUrl: TutorialImg,
    },
    {
        id: 3,
        title: "Lorem ipsum dolor sit amet",
        description: "consectetur. Mi pretium augue ut sagittis.",
        imageUrl: TutorialImg,
    },
    {
        id: 4,
        title: "Lorem ipsum dolor sit amet",
        description: "consectetur. Mi pretium augue ut sagittis.",
        imageUrl: TutorialImg,
    },
    {
        id: 5,
        title: "Lorem ipsum dolor sit amet",
        description: "consectetur. Mi pretium augue ut sagittis.",
        imageUrl: TutorialImg,
    },
    {
        id: 6,
        title: "Lorem ipsum dolor sit amet",
        description: "consectetur. Mi pretium augue ut sagittis.",
        imageUrl: TutorialImg,
    },
];

export default async function Home() {
    const memes_data = await axios.get("https://api.imgflip.com/get_memes");
    // console.log("memes data from imgflip -> ", memes_data.data.data);
    const memes: Meme[] = memes_data.data.data.memes;

    return (
        <div className="bg-[#090e14]">
            {/* <SplashCursor /> */}
            <Header />
            <div className="flex flex-col mx-auto px-4 gap-y-32">
                <div className="lg:flex items-center mx-5 xl:mx-16 mt-[50px] gap-6 2xl:mx-32">
                    <div className="flex text-center lg:mt-[100px] lg:text-left flex-col mb-8 xl:gap-7 2xl:gap-10 md:mb-0">
                        <h2 className="text-4xl lg:text-4xl xl:text-4xl 2xl:text-5xl mb-6 text-blue-500 font-bold dark:text-gray-300">
                            Wellcome to Zupdogillion
                        </h2>
                        <h1 className="text-7xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold md:text-7xl mb-8 text-gray-100 dark:text-white">
                            Turn text into memes with AI
                        </h1>
                        <h1 className="text-2xl 2xl:mr-32 md:text-xl font-bold mb-4 text-gray-100 dark:text-white">
                            Turn text into memes with AI Turn text into memes
                            with AI Turn text into memes with AI Turn text into
                            memes with AI
                        </h1>
                        <div className="my-5">
                            <Link
                                href="/generate"
                                className=" bg-blue-500 px-16 hover:bg-blue-600 text-white font-bold py-3 mt-5 rounded-lg mx-auto text-lg transition duration-300"
                            >
                                Start
                            </Link>
                        </div>
                    </div>
                    <div className="flex md:mx-24 lg:mx-6 mt-16 mx-5 justify-center rounded-md items-center">
                        <Image
                            src={BannerGif}
                            alt="AI Meme Generator"
                            width={900}
                            height={900}
                            className="rounded-[5px]"
                            unoptimized={true}
                        />
                    </div>
                </div>

                <div className="lg:flex flex-col xl:mx-16 2xl:mx-32 text-center mx-5 mb-16 pt-16">
                    <div className="flex flex-col lg:w-[60%] lg:text-left">
                        <h2 className="text-5xl lg:text-6xl 2xl:text-7xl leading-snug font-bold mb-6 text-gray-100 dark:text-white">
                            <span className="text-blue-600"> Publish </span> and
                            <span className="text-blue-600"> Look </span>other
                            memes from users
                        </h2>
                        <div className="my-5">
                            <Link
                                href="/all-memes"
                                className="bg-blue-500 mx-auto px-16 hover:bg-blue-600 text-white font-bold py-3 mt-5 rounded-lg text-lg transition duration-300"
                            >
                                View All Memes
                            </Link>
                        </div>
                    </div>
                    <div className="relative grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-16">
                        {memes.slice(0, 10).map((meme, index) => {
                            return (
                                <Image
                                    key={index}
                                    src={meme.url}
                                    alt="AI memes"
                                    width={400}
                                    height={400}
                                    unoptimized={true}
                                    layout="fixed"
                                />
                            );
                        })}
                        <div className="absolute bottom-0 w-full h-64 bg-gradient-to-t from-[#090E14] to-transparent"></div>
                    </div>
                </div>

                <div className="mb-16 2xl:mx-24 ">
                    <h2 className="text-5xl mx-5 lg:text-6xl leading-snug font-bold mb-6 text-gray-100 dark:text-white text-center">
                        Zupdogillion.ai Tutorial
                    </h2>
                    <p className="text-center lg:text-2xl mx-5 pb-16 text-gray-300 text-xl">
                        Why should you use Zupdogillion.ai to generate memes
                        over other popular tools?
                    </p>
                    <div className="grid justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {tutorials.map((item, index) => (
                            <TutorialCard
                                key={index}
                                id={item.id}
                                description={item.description}
                                title={item.title}
                                imageUrl={item.imageUrl}
                            />
                        ))}
                    </div>
                </div>

                {/* <section>
                    <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white text-center">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                                How does the AI meme generator work?
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Our AI analyzes your input and matches it with
                                suitable templates and images to create
                                hilarious memes tailored to your ideas.
                            </p>
                        </div>
                        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                                Can I use the generated memes commercially?
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                The memes generated are for personal use. For
                                commercial use, please check our licensing
                                options in the pricing section.
                            </p>
                        </div>
                    </div>
                </section> */}
            </div>
            <Footer />
        </div>
    );
}
