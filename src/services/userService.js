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

export const getAllUsersWithProfile = async (page, sortBy, order, pageSize) => {
  const params = {};

  if (page != null) {
    // Only add 'page' if it's not null or undefined
    params.page = page;
  }

  if (sortBy != null) {
    // Only add 'sortBy' if it's not null or undefined
    params.sortBy = sortBy;
  }

  if (order != null) {
    // Only add 'order' if it's not null or undefined
    params.order = order;
  }

  if (pageSize != null) {
    params.size = pageSize;
  }

  try {
    const res = await httpRequest.get(config.API.GET_USERS, {
      params,
    });

    return res.data;
  } catch (error) {
    console.error(error);
  }
};
