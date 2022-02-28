import axios from "axios";
import { getAllDeliveries, getDeliveryById, putDelivery } from "./DeliveriesService";

jest.mock("axios");

describe("getAllDeliveries", () => {
  it("should return a delivery list with success when getAll", async () => {

    const data = [
      {
        client: "Quigley Inc",
        customer: {
          name: "Clyde Bosco",
          address: "8459 Koss Skyway",
          city: "Waukegan",
          zipCode: 19087,
          latitude: 36.7388,
          longitude: -101.2631
        },
        delivery: { status: "idle", latitude: null, longitude: null }
      },
      {
        client: "Bergnaum",
        customer: {
          name: "Randall Walter II",
          address: "8459 Koss Skyway",
          city: "Waukegan",
          zipCode: 12323,
          latitude: 36.1238,
          longitude: -101.4354
        },
        delivery: { status: "idle", latitude: null, longitude: null }
      }
    ];

    axios.get.mockImplementation(() => Promise.resolve({ data }));

    const result = await getAllDeliveries();
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(result).toEqual(data);
    expect(axios.get).toHaveBeenCalledWith(
      "https://60e84194673e350017c21844.mockapi.io/api/deliveries"
    );
  });

  it("should throw error when the server request has a error", async () => {
    const errorMessage = "Network Error";

    axios.get.mockImplementation(() => Promise.reject(new Error(errorMessage)));

    try {
      await getAllDeliveries();
    } catch {
      await expect(axios.get).rejects.toThrow(errorMessage);
    }
  });
});

describe("getDeliveryById", () => {
  it("should return a delivery with success when getDeliveryById", async () => {
    const idToDoRequest = "1"
    const data = {
      id: "1",
      client: "Quigley Inc",
      customer: {
        name: "Clyde Bosco",
        address: "8459 Koss Skyway",
        city: "Waukegan",
        zipCode: 19087,
        latitude: 36.7388,
        longitude: -101.2631
      },
      delivery: { status: "idle", latitude: null, longitude: null }
    }

    axios.get.mockImplementation(() => Promise.resolve({ data }));

    const result = await getDeliveryById(idToDoRequest);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(result).toEqual(data);
    expect(axios.get).toHaveBeenCalledWith(
      "https://60e84194673e350017c21844.mockapi.io/api/deliveries/1"
    );
  });

  it("should throw error when the server request has a error", async () => {
    const errorMessage = "Network Error";

    axios.get.mockImplementation(() => Promise.reject(new Error(errorMessage)));

    try {
      await getDeliveryById();
    } catch {
      await expect(axios.get).rejects.toThrow(errorMessage);
    }
  });
});

describe("putDelivery", () => {
  it("should update a delivery with success when putDelivery", async () => {

    const idToDoRequest = "1"

    const data = {
      delivery: {
        status: "delivered",
        latitude: null,
        longitude: null
      }
    }


    axios.put = jest.fn().mockImplementation(() => Promise.resolve({ status: 200, data: { data } }))

    const result = await putDelivery(idToDoRequest, data)
    expect(axios.put).toHaveBeenCalledTimes(1)
    expect(result).toEqual({ data });
  });

  it("should throw error when the server request has a error", async () => {
    const errorMessage = "Network Error";

    axios.put.mockImplementation(() => Promise.reject(new Error(errorMessage)));

    try {
      await putDelivery();
    } catch {
      await expect(axios.put).rejects.toThrow(errorMessage);
    }
  });
});