export interface Delivery {
    id: string,
    client: string,
    customer: {
        name: string
        address: string,
        city: string,
        zipCode: string,
        latitude: string,
        longitude: string
    },
    delivery: {
        status: "idle" |
        "delivered" | "undelivered",
        latitude: number,
        longitude: number
    }
}