import config from '~/config';
import httpRequest from '~/utils/httpRequest';

// ADD USER
export const addUser = async (formData) => {
  try {
    const res = await httpRequest.post(config.API.ADD_USER, formData);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

// GET ALL USERS WITH THEIR PROFILES
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

// CHANGE USERNAME
export const changeUsername = async (userId, data) => {
  try {
    const res = await httpRequest.put(config.API.CHANGE_USERNAME(userId), data);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

// CHANGE PASSWORD
export const changePassword = async (userId, data) => {
  try {
    const res = await httpRequest.put(config.API.CHANGE_PASSWORD(userId), data);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

// GET USER BY ID
export const getUserById = async (userId) => {
  try {
    const res = await httpRequest.get(config.API.GET_USER(userId));

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

// UPDATE PROFILE
export const updateProfile = async (profileId, data) => {
  try {
    const res = await httpRequest.put(
      config.API.UPDATE_PROFILE(profileId),
      data
    );

    return res.data;
  } catch (error) {
    console.error(error);
  }
};
