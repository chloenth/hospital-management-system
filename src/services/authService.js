import config from '~/config';
import httpRequest from '~/utils/httpRequest';

export const logIn = async (formData) => {
  try {
    const res = await httpRequest.post(config.API.LOGIN, formData);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};
