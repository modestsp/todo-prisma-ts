import { useForm, SubmitHandler } from 'react-hook-form';
import { object, string } from 'zod';
import { useNavigate } from 'react-router-dom';
import { CreateUserInput } from '../../types';
import userService from '../../services/user.service';
import { zodResolver } from '@hookform/resolvers/zod';
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
      await userService.createUser(input);
      await userService.login({ username, password });
      return navigate('/');
    } catch (e: any) {
      console.error(e.message);
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
      <input type="submit" />
    </form>
  );
};
