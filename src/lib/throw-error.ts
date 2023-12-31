import axios from "axios";
import { ZodError } from "zod";

// Function to handle Axios errors
export function throwError(error: unknown): never {
    if (axios.isAxiosError(error)) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            throw new Error(`Error ${error.response.status}: ${error.response.statusText}`);
        } else if (error.request) {
            // The request was made but no response was received
            throw new Error(`No response received: ${error.request}`);
        } else {
            // Something happened in setting up the request that triggered an Error
            throw new Error(`Error: ${error.message}`);
        }
    } else if (error instanceof ZodError) {
        throw new Error(`Invalid options: ${error.message}`)
    } else {
        // The error is not an AxiosError, handle it appropriately
        throw new Error('Unexpected error');
    }
}