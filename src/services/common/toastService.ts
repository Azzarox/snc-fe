import { toast } from "sonner";

type ToastType = "success" | "error" | "warning" | "info";

const defaultDuration = 3000;

function showToast(
    type: ToastType,
    message: string,
    description?: string,
    options?: object
) {
    const fn = toast[type];
    fn(message, { description, duration: defaultDuration, ...options });
}

export const toastService = {
    success: (msg: string, desc?: string, opts?: object) =>
        showToast("success", msg, desc, opts),
    error: (msg: string, desc?: string, opts?: object) =>
        showToast("error", msg, desc, opts),
    warning: (msg: string, desc?: string, opts?: object) =>
        showToast("warning", msg, desc, opts),
    info: (msg: string, desc?: string, opts?: object) =>
        showToast("info", msg, desc, opts),
};