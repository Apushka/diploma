import httpService from "./http.service";
const userEndpoint = "user/";

const userService = {
    get: async (userId) => {
        const { data } = await httpService.get(userEndpoint, {
            params: {
                userId
            }
        });
        return data;
    },
    update: async (payload) => {
        const { data } = await httpService.patch(
            userEndpoint + payload._id,
            payload
        );
        return data;
    }
};

export default userService;
