/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? '/api/v1/users/updateMyPassword'
        : '/api/v1/users/updateMe';

    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });

    if (res.data.status === 'success') {
      const message =
        type === 'password'
          ? 'Password updated successfully!'
          : 'Profile updated successfully!,Please refresh the page to see the changes';
      showAlert('success', message);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
