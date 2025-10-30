import type { ApiResponse, ErrorResponse, SuccessResponse } from "@/hooks/useAuthService";
import { toastService } from "@/services/common/toastService";
import { useCallback } from "react";

export interface FetchOptions extends RequestInit {
    toast?: boolean;
}

export function useFetch() {
    const fetchJson = useCallback(
        async <T>(url: string, options?: FetchOptions): Promise<ApiResponse<T> | never> => {
            try {
                const { toast = false, ...fetchOptions } = options || {};

                const res = await fetch(url, {
                    headers: { "Content-Type": "application/json" },
                    ...fetchOptions,
                });

                const json = (await res.json()) as ApiResponse<T>;

                // Context Free Errors
                if (!json.success && json.status >= 500) {
                    throw new Error(json.message!);
                }

                // Context Errors (conditional toast)
                if (!json.success && json.errors) {
                    if (toast) {
                        toastService.error(`Error occurred: ${json.message}; Errors: ${json.errors.join(', ')}`)
                    }
                    return json as ErrorResponse;
                }

                if (!json.success) {
                    if (toast) {
                        toastService.error(`Error occurred: ${json.message};`);
                    }

                    return json as ErrorResponse;
                }


                return json as SuccessResponse<T>
            } catch (err: any) {
                const showDevError = import.meta.env.MODE === 'development';
                toastService.error(showDevError ? err.message : "Unexpected error occurred!");
                throw err
            }
        },
        []
    );

    return { fetchJson };
}