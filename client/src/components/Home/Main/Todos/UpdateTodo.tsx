import { object, string, boolean } from 'zod';
import { useState } from 'react';
import { useGetCurrentUser } from '../../../hooks/useGetCurrentUser';
import { Todo, UpdateTodoInput } from '../../../../types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateTodo } from '../../../hooks/useUpdateTodo';
import { useForm, SubmitHandler } from 'react-hook-form';
import styles from './todos.module.css';
export const updateTodoSchema = object({
  todoId: string().optional(),
  description: string().optional(),
  endsAt: string().optional(),
});

export const UpdateTodoForm = ({ todo }: { todo: Todo }) => {
  const [errorMesage, setErrorMessage] = useState<string | null>(null);
  const { data: currentUser } = useGetCurrentUser();

  const { mutate, isLoading, error, isError } = useUpdateTodo();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateTodoInput>({
    resolver: zodResolver(updateTodoSchema),
  });
  const errorHand = (e: any) => {
    console.log('error', e);
  };
  const onSubmit: SubmitHandler<UpdateTodoInput> = async (input) => {
    console.log('INPUTS', input);
    console.log('ACA EL INPUT', { ...input, todoId: todo.id });
    console.log('ACA EL INPUT222', input);
    try {
      if (currentUser) {
        mutate({ ...input, todoId: todo.id });
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
    <form
      onSubmit={handleSubmit(onSubmit, errorHand)}
      className={styles.todoForm}
    >
      <label htmlFor="description">Description</label>
      <input
        id="description"
        placeholder="description"
        defaultValue="test"
        {...register('description')}
      />
      <p>{errors.description?.message}</p>
      <label htmlFor="endsAt">End Date</label>
      <input
        id="endsAt"
        placeholder="End Date"
        defaultValue="test"
        {...register('endsAt')}
      />
      <p>{errors.endsAt?.message}</p>
      <input type="submit" />
    </form>
  );
};
