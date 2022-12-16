import * as searchRequest from '~/utils/searchRequest';

export const search = async (q, type = 'less') => {
    try {
        const res = await searchRequest.get('users/search', {
            params: {
                q,
                type,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
