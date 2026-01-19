import { useState } from "react";

export interface FieldBind<T> {
    value: T;
    onChange: (value: T) => void;
}

export default function useField<T>(initial: T): FieldBind<T> {
    const [value, setValue] = useState(initial);

    return {
        value,
        onChange: (value: T) => {
            setValue(value);
        },
    };
}
