import { IconType } from "react-icons";

interface TopHeaderProps {
    title: string;
    Icon?: IconType;
    imageURL?: string;
}

export default function TopHeader({ title, Icon, imageURL }: TopHeaderProps) {
    return (
        <div className="w-full flex items-center justify-center py-1">
            <div className="flex items-center gap-2">
                {Icon && <Icon className="text-white" />}
                {!Icon && imageURL?.length > 0 && <img className="w-6 aspect-square object-cover rounded-lg" src={imageURL} />}
                <div className="text-white capitalize">{title}</div>
            </div>
        </div>
    )
}