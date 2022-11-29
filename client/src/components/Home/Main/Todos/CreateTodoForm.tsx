import { object, string } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CreateTodoInput } from '../../../../types';
import styles from './todos.module.css';
import { useGetCurrentUser } from '../../../hooks/useGetCurrentUser';
import { useCreateTodo } from '../../../hooks/useCreateTodo';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader } from '../../../utils/Loader';

export const createTodoSchema = object({
  description: string().min(1, 'Description is required'),
  endsAt: string().min(1, 'End date is required'),
  projectId: string().optional(),
});

export const CreateTodoForm = ({
  projectId,
  handleClose,
}: {
  projectId?: string;
  handleClose: () => void;
}) => {
  const [errorMesage, setErrorMessage] = useState<string | null>(null);
  const { data: currentUser } = useGetCurrentUser();

  const { mutate, isLoading, error, isError } = useCreateTodo();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateTodoInput>({
    resolver: zodResolver(createTodoSchema),
  });
  const onSubmit: SubmitHandler<CreateTodoInput> = async (input) => {
    try {
      if (currentUser) {
        return new Promise<void>((resolve) => {
          setTimeout(() => {
            mutate({ input, userId: currentUser.id, projectId });
            handleClose();
            resolve();
          }, 2000);
        });
      }
    } catch (e: any) {
      setErrorMessage(e.response?.data?.error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.todoForm}>
      <label htmlFor="description">Description</label>
      <input
        id="description"
        placeholder="Description"
        {...register('description', { required: true })}
      />
      <p className={styles.errorMessage}>{errors.description?.message}</p>
      <label htmlFor="endsAt">End Date</label>
      <input
        type={'date'}
        id="endsAt"
        placeholder="End Date"
        {...register('endsAt', { required: true })}
      />
      <p className={styles.errorMessage}>{errors.endsAt?.message}</p>
      <motion.button
        type="submit"
        className={styles.submitButton}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isSubmitting ? <Loader /> : 'Create Todo'}
      </motion.button>
    </form>
  );
};
