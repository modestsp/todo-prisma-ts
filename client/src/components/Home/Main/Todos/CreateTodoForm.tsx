import { object, string } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CreateTodoInput } from '../../../../types';
import styles from './todos.module.css';
import { useGetCurrentUser } from '../../../hooks/useGetCurrentUser';
import { useCreateTodo } from '../../../hooks/useCreateTodo';
import { useState } from 'react';

export const createTodoSchema = object({
  description: string({
    required_error: 'Description is required',
  }),
  endsAt: string({
    required_error: 'End date is required',
  }),
});

export const CreateTodoForm = () => {
  const [errorMesage, setErrorMessage] = useState<string | null>(null);
  const { data: currentUser } = useGetCurrentUser();

  const { mutate, isLoading, error, isError } = useCreateTodo();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTodoInput>({
    resolver: zodResolver(createTodoSchema),
  });
  const onSubmit: SubmitHandler<CreateTodoInput> = async (input) => {
    try {
      console.log('Input', input);
      if (currentUser) {
        mutate({ input, userId: currentUser.id });
      }
    } catch (e: any) {
      setErrorMessage(e.response?.data?.error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
      console.log(errorMesage);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.todoForm}>
      <label htmlFor="name">Description</label>
      <input
        id="name"
        placeholder="name"
        defaultValue="test"
        {...register('description', { required: true })}
      />
      <p>{errors.description?.message}</p>
      <label htmlFor="endsAt">End Date</label>
      <input
        id="endsAt"
        placeholder="username"
        defaultValue="test"
        {...register('endsAt', { required: true })}
      />
      <p>{errors.endsAt?.message}</p>
      <input type="submit" />
    </form>
  );
};
