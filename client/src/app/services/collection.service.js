import httpService from "./http.service";
const collectionEndpoint = "/product?";

const collectionService = {
    get: async ({ field, value }) => {
        const { data } = await httpService.get(
            collectionEndpoint + `field=${field}&value=${value}`
        );
        return data;
    }
};

export default collectionService;
