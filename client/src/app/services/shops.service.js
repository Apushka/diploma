import httpService from "./http.service";
const shopsEndpoint = "/shop";

const shopsService = {
    get: async () => {
        const { data } = await httpService.get(shopsEndpoint);
        return data;
    }
};

export default shopsService;
