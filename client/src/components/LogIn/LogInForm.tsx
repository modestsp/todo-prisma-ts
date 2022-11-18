import { useForm, SubmitHandler } from 'react-hook-form';
import { object, string } from 'zod';
import userService from '../../services/user.service';
import { CreateSessionInput } from '../../types';
import styles from './login.module.css';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { AxiosError } from 'axios';
import { axiosErrorHandler } from '../../utils/axiosErrorHandler';

export const createSessionSchema = object({
  username: string({
    required_error: 'Username is required',
  }),
  password: string({
    required_error: 'Password is required',
  }),
});

export default function LogInForm() {
  const navigate = useNavigate();
  const [errorMesage, setErrorMessage] = useState<string | null>(null);
  const context = useContext(UserContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateSessionInput>({
    resolver: zodResolver(createSessionSchema),
  });
  const onSubmit: SubmitHandler<CreateSessionInput> = async (data) => {
    try {
      const { username, password } = data;
      await userService.login({ username, password });
      const loggedUser = await userService.getCurrentUser();
      context?.setCurrentUser(loggedUser);
      return navigate('/');
      // const logged = await axios.get('http://localhost:4000/api/me', {
      //   withCredentials: true,
      // });
    } catch (e: any) {
      setErrorMessage(e.response?.data?.error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
      console.log(errorMesage);
    }
  };

  console.log(watch('username')); // watch input value by passing the name of it

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <label htmlFor="username">Username</label>
      <input
        id="username"
        placeholder="username"
        defaultValue="test"
        {...register('username', { required: true })}
      />
      {errors.username && (
        <span className={styles.errorMessage}>This field is required</span>
      )}
      <label htmlFor="password">password</label>
      <input
        id="password"
        placeholder="password"
        {...register('password', { required: true })}
      />
      {errors.password && (
        <span className={styles.errorMessage}>This field is required</span>
      )}
      {errorMesage ? <p>{errorMesage}</p> : null}
      <button type="submit">Send</button>
    </form>
  );
}
