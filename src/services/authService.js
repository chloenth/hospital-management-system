import config from '~/config';
import httpRequest from '~/utils/httpRequest';

export const login = async (formData) => {
  try {
    const res = await httpRequest.post(config.API.LOGIN, formData);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getMyInfo = async () => {
  try {
    const res = await httpRequest.get(config.API.GET_MY_INFO);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const logout = async () => {
  try {
    const res = await httpRequest.get(config.API.LOGOUT);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};
