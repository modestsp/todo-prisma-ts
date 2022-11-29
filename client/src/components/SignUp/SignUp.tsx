import { useForm, SubmitHandler } from 'react-hook-form';
import { object, string } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { CreateUserInput } from '../../types';
import userService from '../../services/user.service';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from './signup.module.css';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader } from '../utils/Loader';
// Check for available username
// If user created redirect
// Else tell the user the error

export const createUserSchema = object({
  name: string({
    required_error: 'Name is required',
  }).min(3, 'Name should be at least 3 characters'),
  username: string({
    required_error: 'Username is required',
  }).min(3, 'Username should be at least 3 characters'),
  password: string({
    required_error: 'Password is required',
  }).min(6, 'Password should be at least 6 characters'),
  passwordConfirm: string({
    required_error: 'Password confirm is required',
  }),
  email: string().min(1, 'Email cannot be empty').email('Not a valid email'),
}).refine((data) => data.password === data.passwordConfirm, {
  message: 'Passwords do not match',
  path: ['passwordConfirm'],
});

// Revisar si funciona el mensaje de error que viene desde el backend
export const SignUp = () => {
  const navigate = useNavigate();
  const [errorMesage, setErrorMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserInput>({
    mode: 'all',
    resolver: zodResolver(createUserSchema),
  });
  const onSubmit: SubmitHandler<CreateUserInput> = async (input) => {
    try {
      // Aca puedo usar react query, y usar on succes para navigar
      const { username, password } = input;
      await userService.createUser(input);
      const tokens = await userService.login({ username, password });
      if (tokens) return navigate('/home');
    } catch (e: any) {
      setErrorMessage(e.response?.data?.error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  return (
    <div className={styles.signupContainer}>
      <h1 className={styles.title}>Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          placeholder="name"
          {...register('name', { required: true })}
        />
        <p className={styles.formError}>{errors.name?.message}</p>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          placeholder="username"
          {...register('username', { required: true })}
        />
        <p className={styles.formError}>{errors.username?.message}</p>
        <label htmlFor="password">Password</label>
        <input
          type={'password'}
          id="password"
          placeholder="password"
          {...register('password', { required: true })}
        />
        <p className={styles.formError}>{errors.password?.message}</p>
        <label htmlFor="passwordConfirm">Confirm password</label>
        <input
          id="passwordConfirm"
          placeholder="Confirm password"
          {...register('passwordConfirm', { required: true })}
        />
        <p className={styles.formError}>{errors.passwordConfirm?.message}</p>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          placeholder="email"
          {...register('email', { required: true })}
        />
        <p className={styles.formError}>{errors.email?.message}</p>
        {errorMesage ? (
          <p className={styles.errorMessage}>{errorMesage}</p>
        ) : (
          <p className={styles.disableMessage}>errorMesage</p>
        )}
        <motion.button
          type="submit"
          className={styles.createAccountButton}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isSubmitting ? <Loader /> : 'Create Account'}
        </motion.button>
        <p className={styles.login}>
          Already have an account?{' '}
          <Link to={'/auth/login'} className={styles.login}>
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
};
