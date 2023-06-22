

// fetchOptions
interface headersOptoins {
    "Content-Type"?: "application/json",
    "Accept"?: "application/json",
    "Authorization"?: string
}

interface fetchOptions {
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    headers?: headersOptoins,
    body: string
}
// --End-- fetchOptions --End--

export type {
    fetchOptions
}