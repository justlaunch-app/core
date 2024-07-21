import { create, ApisauceInstance } from 'apisauce';

const createApiClient = (baseURL: string, authorizationHeader: string): ApisauceInstance => {
    return create({
        baseURL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authorizationHeader,
        },
    });
};

export default createApiClient;
