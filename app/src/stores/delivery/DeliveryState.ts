

export interface DeliveryStatus {
  delivery: {
    status: "idle" |
    "delivered" | "undelivered",
    latitude: number,
    longitude: number
  }
}

export interface DeliveryState extends DeliveryStatus {
  id: string,
  client: string,
  customer: {
    name: string
    address: string,
    city: string,
    zipCode: string,
    latitude: string,
    longitude: string
  }
};