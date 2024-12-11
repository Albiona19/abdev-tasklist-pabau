import React, { useState } from 'react';

type ModelObject = Record<string, any>;

export function useForm(getFreshModelObject: () => ModelObject) {
    const [values, setValues] = useState<ModelObject>(getFreshModelObject());
    const [errors, setErrors] = useState<Record<string, string | null>>({}); 

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const resetFormControls = () => {
        setValues(getFreshModelObject());
        setErrors({});
    };

    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetFormControls,
    };
}
