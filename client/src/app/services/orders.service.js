import httpService from "./http.service";
const ordersEndpoint = "order/";

const ordersService = {
    get: async (userId) => {
        const { data } = await httpService.get(ordersEndpoint + userId);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.post(ordersEndpoint, payload);
        return data;
    }
};

export default ordersService;
