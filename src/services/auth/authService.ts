import type { RegisterFormData } from "@/schemas/auth/registerSchema";

const registerUser = async (body: RegisterFormData) => {
    const res = await fetch('/@api/auth/register', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(body)
    })

    return await res.json();
}


export const authService = {
    registerUser
}