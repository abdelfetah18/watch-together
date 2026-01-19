import { FieldBind } from "@/hooks/useField";
import { useRef, useState } from "react";

interface ImageUploadProps {
    bind?: FieldBind<File>;
    defaultImageURL?: string;
}

export default function ImageUpload({ bind, defaultImageURL = "" }: ImageUploadProps) {
    const [imageURL, setImageURL] = useState(defaultImageURL);
    const imageInputRef = useRef(null);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (event.target.files.length > 0) {
            const imageFile = event.target.files[0];
            bind?.onChange(imageFile);
            setImageURL(URL.createObjectURL(imageFile));
        }
    }

    const onSelectImage = (): void => {
        if (!imageInputRef.current) {
            return;
        }

        imageInputRef.current.click();
    }

    const onRemoveImage = (): void => {
        if (!imageInputRef.current) {
            return;
        }

        imageInputRef.current.value = "";
        bind?.onChange(null);
        setImageURL(defaultImageURL)
    }

    return (
        <div className="flex items-center gap-4">
            <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                onChange={onChange}
                hidden
            />
            <img className="h-20 w-20 object-cover rounded-full" src={imageURL} />
            <div>
                {
                    bind?.value ? (
                        <div onClick={onRemoveImage} className="bg-zinc-800 hover:bg-zinc-700 cursor-pointer text-gray-50 rounded-lg px-4 py-2 text-sm">Remove Image</div>
                    ) : (
                        <div onClick={onSelectImage} className="bg-zinc-800 hover:bg-zinc-700 cursor-pointer text-gray-50 rounded-lg px-4 py-2 text-sm">Select Image</div>
                    )
                }
            </div>
        </div>
    )
}