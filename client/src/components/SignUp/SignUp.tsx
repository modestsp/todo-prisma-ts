import { useForm, SubmitHandler } from 'react-hook-form';
import { object, string } from 'zod';
import { useNavigate } from 'react-router-dom';
import { CreateUserInput, User } from '../../types';
import userService from '../../services/user.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, useState } from 'react';
import { UserContext } from '../../App';
import styles from './signup.module.css';
// Check for available username
// If user created redirect
// Else tell the user the error

export const createUserSchema = object({
  name: string({
    required_error: 'Name is required',
  }),
  username: string({
    required_error: 'Username is required',
  }),
  password: string({
    required_error: 'Name is required',
  }).min(6, 'Password should be at least 6 characters'),
  passwordConfirm: string({
    required_error: 'Password confirm is required',
  }),
  email: string({
    required_error: 'Email is required',
  }).email('Not a valid email'),
}).refine((data) => data.password === data.passwordConfirm, {
  message: 'Passwords do not match',
  path: ['passwordConfirm'],
});

export const SignUp = () => {
  const navigate = useNavigate();
  const [errorMesage, setErrorMessage] = useState<string | null>(null);
  const context = useContext(UserContext);
  // const { accessToken, setAccessToken } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
  });
  const onSubmit: SubmitHandler<CreateUserInput> = async (input) => {
    try {
      const { username, password } = input;
      const createdUser = await userService.createUser(input);
      context?.setCurrentUser(createdUser);
      const tokens = await userService.login({ username, password });
      if (tokens) return navigate('/');
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
      <label htmlFor="name">Name</label>
      <input
        id="name"
        placeholder="name"
        defaultValue="test"
        {...register('name', { required: true })}
      />
      <p>{errors.name?.message}</p>
      <label htmlFor="username">Username</label>
      <input
        id="username"
        placeholder="username"
        defaultValue="test"
        {...register('username', { required: true })}
      />
      <p>{errors.username?.message}</p>
      <label htmlFor="password">Password</label>
      <input
        id="password"
        placeholder="password"
        {...register('password', { required: true })}
      />
      <p>{errors.password?.message}</p>
      <label htmlFor="passwordConfirm">Confirm password</label>
      <input
        id="passwordConfirm"
        placeholder="Confirm password"
        defaultValue="test"
        {...register('passwordConfirm', { required: true })}
      />
      <p>{errors.passwordConfirm?.message}</p>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        placeholder="email"
        defaultValue="test"
        {...register('email', { required: true })}
      />
      <p>{errors.email?.message}</p>
      {errorMesage ? <p>{errorMesage}</p> : null}
      <input type="submit" />
    </form>
  );
};
