import httpService from "./http.service";
const productEndpoint = "/product/";

const productService = {
    get: async (productId) => {
        const { data } = await httpService.get(productEndpoint + productId);
        return data;
    }
};

export default productService;
