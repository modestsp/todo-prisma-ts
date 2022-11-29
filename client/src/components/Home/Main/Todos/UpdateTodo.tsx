import { object, string, boolean } from 'zod';
import { useState } from 'react';
import { useGetCurrentUser } from '../../../hooks/useGetCurrentUser';
import { Todo, UpdateTodoInput } from '../../../../types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateTodo } from '../../../hooks/useUpdateTodo';
import { useForm, SubmitHandler } from 'react-hook-form';
import { motion } from 'framer-motion';
import styles from './todos.module.css';
import { Loader } from '../../../utils/Loader';

export const updateTodoSchema = object({
  todoId: string().optional(),
  description: string().optional(),
  endsAt: string().optional(),
  projectId: string().optional(),
  completed: boolean().optional(),
});

export const UpdateTodoForm = ({
  todo,
  projectId,
  handleClose,
}: {
  todo: Todo;
  projectId?: string;
  handleClose: () => void;
}) => {
  const [errorMesage, setErrorMessage] = useState<string | null>(null);
  const { data: currentUser } = useGetCurrentUser();

  const { mutate } = useUpdateTodo();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateTodoInput>({
    resolver: zodResolver(updateTodoSchema),
  });

  const onSubmit: SubmitHandler<UpdateTodoInput> = async (input) => {
    try {
      if (currentUser) {
        return new Promise<void>((resolve) => {
          setTimeout(() => {
            mutate({ ...input, todoId: todo.id, projectId });
            handleClose();
            resolve();
          }, 3000);
        });
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
      <label htmlFor="description">Description</label>
      <input
        id="description"
        placeholder="description"
        {...register('description')}
      />
      <p className={styles.errorMesage}>{errors.description?.message}</p>
      <label htmlFor="endsAt">End Date</label>
      <input
        type={'date'}
        id="endsAt"
        placeholder="End Date"
        {...register('endsAt')}
      />
      <p className={styles.errorMesage}>{errors.endsAt?.message}</p>
      <motion.button
        type="submit"
        className={styles.submitButton}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isSubmitting ? <Loader /> : 'Update Todo'}
      </motion.button>
    </form>
  );
};
