import Image, { StaticImageData } from "next/image";

interface TutorialCardProps {
    id: number;
    title: string;
    description: string;
    imageUrl: StaticImageData;
}

export default function TutorialCard({
    title,
    imageUrl,
    description,
}: TutorialCardProps) {
    return (
        <div className="flex items-start gap-4">
            <div className="relative w-20 h-20 flex-shrink-0">
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover bg-slate-600"
                    unoptimized={true}
                />
            </div>
            <div className="flex-1">
                <h3 className="text-lg text-gray-100 mb-2">{title}</h3>
                <p className="text-gray-300">{description}</p>
            </div>
        </div>
    );
}
