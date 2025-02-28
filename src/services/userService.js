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

export const getAllUsersWithProfile = async (
  page,
  sortBy,
  order,
  size,
  searchText,
  gender,
  role
) => {
  const params = {
    ...(page && { page }),
    ...(sortBy && { sortBy }),
    ...(order && { order }),
    ...(size && { size }),
    ...(searchText && { searchText }),
    ...(gender && { gender }),
    ...(role && { role }),
  };

  console.log('params: ', params);

  try {
    const res = await httpRequest.get(config.API.GET_USERS, {
      params,
    });

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const changeUsername = async (userId, username) => {
  try {
    const res = await httpRequest.put(config.API.CHANGE_USERNAME(userId), {
      username,
    });

    return res.data;
  } catch (error) {
    console.error(error);
  }
};
