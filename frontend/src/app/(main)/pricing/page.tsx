import Footer from "@/lib/components/layout/footer";
import Header from "@/lib/components/layout/header";
import { Check } from "lucide-react";

const plans = [
    {
        name: "Free",
        price: "$0",
        features: [
            "Basic meme generation",
            "Access to public templates",
            "Limited daily creations",
        ],
    },
    {
        name: "Professional",
        price: "$9.99/month",
        features: [
            "Advanced meme generation",
            "Custom template uploads",
            "Unlimited daily creations",
            "Ad-free experience",
        ],
    },
    {
        name: "Premium",
        price: "$19.99/month",
        features: [
            "All Professional features",
            "API access",
            "Priority support",
            "Commercial use license",
        ],
    },
];

export default function Pricing() {
    return (
        <>
            <Header />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">
                    Choose Your Plan
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 flex flex-col"
                        >
                            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
                                {plan.name}
                            </h2>
                            <p className="text-3xl font-bold mb-6 text-blue-500">
                                {plan.price}
                            </p>
                            <ul className="mb-8 flex-grow">
                                {plan.features.map((feature, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center mb-2 text-gray-600 dark:text-gray-300"
                                    >
                                        <Check
                                            className="mr-2 text-green-500"
                                            size={20}
                                        />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg w-full">
                                Choose Plan
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">
                        Compare Plans
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-100 dark:bg-gray-600">
                                    <th className="p-2 text-left text-gray-800 dark:text-white">
                                        Feature
                                    </th>
                                    <th className="p-2 text-center text-gray-800 dark:text-white">
                                        Free
                                    </th>
                                    <th className="p-2 text-center text-gray-800 dark:text-white">
                                        Professional
                                    </th>
                                    <th className="p-2 text-center text-gray-800 dark:text-white">
                                        Premium
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <td className="p-2 text-gray-600 dark:text-gray-300">
                                        Meme Generation
                                    </td>
                                    <td className="p-2 text-center text-gray-600 dark:text-gray-300">
                                        Basic
                                    </td>
                                    <td className="p-2 text-center text-gray-600 dark:text-gray-300">
                                        Advanced
                                    </td>
                                    <td className="p-2 text-center text-gray-600 dark:text-gray-300">
                                        Advanced
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <td className="p-2 text-gray-600 dark:text-gray-300">
                                        Daily Creations
                                    </td>
                                    <td className="p-2 text-center text-gray-600 dark:text-gray-300">
                                        Limited
                                    </td>
                                    <td className="p-2 text-center text-gray-600 dark:text-gray-300">
                                        Unlimited
                                    </td>
                                    <td className="p-2 text-center text-gray-600 dark:text-gray-300">
                                        Unlimited
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <td className="p-2 text-gray-600 dark:text-gray-300">
                                        Custom Templates
                                    </td>
                                    <td className="p-2 text-center text-gray-600 dark:text-gray-300">
                                        ❌
                                    </td>
                                    <td className="p-2 text-center text-gray-600 dark:text-gray-300">
                                        ✅
                                    </td>
                                    <td className="p-2 text-center text-gray-600 dark:text-gray-300">
                                        ✅
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <td className="p-2 text-gray-600 dark:text-gray-300">
                                        API Access
                                    </td>
                                    <td className="p-2 text-center text-gray-600 dark:text-gray-300">
                                        ❌
                                    </td>
                                    <td className="p-2 text-center text-gray-600 dark:text-gray-300">
                                        ❌
                                    </td>
                                    <td className="p-2 text-center text-gray-600 dark:text-gray-300">
                                        ✅
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-2 text-gray-600 dark:text-gray-300">
                                        Commercial Use
                                    </td>
                                    <td className="p-2 text-center text-gray-600 dark:text-gray-300">
                                        ❌
                                    </td>
                                    <td className="p-2 text-center text-gray-600 dark:text-gray-300">
                                        ❌
                                    </td>
                                    <td className="p-2 text-center text-gray-600 dark:text-gray-300">
                                        ✅
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
