import { useForm, SubmitHandler } from 'react-hook-form';
import { object, string } from 'zod';
import userService from '../../services/user.service';
import { CreateSessionInput } from '../../types';
import styles from './login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader } from '../utils/Loader';

export const createSessionSchema = object({
  username: string().min(1, 'Username cannot be empty'),
  password: string().min(1, 'Password cannot be empty'),
});

export default function LogInForm() {
  const navigate = useNavigate();
  const [errorMesage, setErrorMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateSessionInput>({
    resolver: zodResolver(createSessionSchema),
  });
  const onSubmit: SubmitHandler<CreateSessionInput> = async (data) => {
    try {
      const { username, password } = data;
      await userService.login({ username, password });
      return navigate('/home');
    } catch (e: any) {
      setErrorMessage(e.response?.data?.error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };
  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.title}>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          placeholder="username"
          {...register('username', { required: true })}
        />
        {errors.username && (
          <span className={styles.errorMessage}>{errors.username.message}</span>
        )}
        <label htmlFor="password">Password</label>
        <input
          type={'password'}
          id="password"
          placeholder="password"
          {...register('password', { required: true })}
        />
        {errors.password?.message && (
          <span className={styles.errorMessage}>{errors.password.message}</span>
        )}
        {errorMesage ? (
          <p className={styles.errorMessage}>{errorMesage}</p>
        ) : (
          <p className={styles.disableMessage}>errorMesage</p>
        )}
        <motion.button
          type="submit"
          className={styles.loginButton}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isSubmitting ? <Loader /> : 'Log In'}
        </motion.button>
        <p className={styles.createAccount}>
          Don't have an account?{' '}
          <Link to={'/auth/sign-up'} className={styles.createAccount}>
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
}
