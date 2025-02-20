import config from '~/config';
import httpRequest from '~/utils/httpRequest';

export const addUser = async (formData) => {
  try {
    const res = await httpRequest.post(config.API.ADD_USER, formData);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllUsersWithProfile = async () => {
  try {
    const res = await httpRequest.get(config.API.GET_ALL_USERS);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};
