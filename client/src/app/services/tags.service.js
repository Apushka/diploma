import httpService from "./http.service";
const tagsEndpoint = "/tag";

const tagsService = {
    get: async () => {
        const { data } = await httpService.get(tagsEndpoint);
        return data;
    }
};

export default tagsService;
