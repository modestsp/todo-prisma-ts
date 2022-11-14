import { useForm, SubmitHandler } from 'react-hook-form';
import styles from './login.module.css';
type Inputs = {
  username: string;
  password: string;
};

export default function LogInForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) =>
    console.log('Aca la data', data);

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
