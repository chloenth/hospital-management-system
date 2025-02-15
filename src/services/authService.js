import config from '~/config';
import httpRequest from '~/utils/httpRequest';

export const logIn = async (formData) => {
  try {
    const response = await httpRequest.post(config.API.LOGIN, formData);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
