import httpService from "./http.service";
const deliveryEndpoint = "/delivery";

const deliveryService = {
    get: async () => {
        const { data } = await httpService.get(deliveryEndpoint);
        return data;
    }
};

export default deliveryService;
