import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { object, string } from 'zod';
import userService from '../../services/user.service';
import { UserContext } from '../../App';
import { CreateSessionInput } from '../../types';
import styles from './login.module.css';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const { accessToken, setAccessToken } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateSessionInput>();
  const onSubmit: SubmitHandler<CreateSessionInput> = async (data) => {
    try {
      const { username, password } = data;
      const tokens = await userService.login({ username, password });
      setAccessToken(tokens.accessToken);
      userService.setAccessToken(tokens.accessToken);
      console.log('ACA EL TOKEN **********', accessToken);
      const loggedUser = await userService.getCurrentUser();
      console.log('LoggedUser', loggedUser);
      return navigate('/');
      // console.log('Aca la data', data);
      // const logged = await axios.get('http://localhost:4000/api/me', {
      //   headers: { Authorization: `Bearer ${accessToken}` },
      // });
      // console.log('ACA EL LOGED', logged);
    } catch (e: any) {
      console.error(e.message);
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

      <input type="submit" />
    </form>
  );
}
