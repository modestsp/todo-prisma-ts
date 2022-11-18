import axios from 'axios';
export const axiosErrorHandler = (error: any) => {
  console.log('Entre al axios error handler');
  let message;
  console.log('BOOLEAN', axios.isAxiosError(error));
  if (axios.isAxiosError(error) && error.response) {
    message = error.response.data.error;
  } else message = String(error);
  console.log('Aca el mensaje', message);
  console.log('Aca el error', error);
};
