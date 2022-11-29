import { object, string } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CreateProjectInput } from '../../../../types';
import styles from './projects.module.css';
import { useGetCurrentUser } from '../../../hooks/useGetCurrentUser';
import { useState } from 'react';
import { useCreateProject } from '../../../hooks/useCreateProject';
import { motion } from 'framer-motion';
import { Loader } from '../../../utils/Loader';

export const createProjectSchema = object({
  title: string().min(1, 'Title is required'),
  endsAt: string().min(1, 'Date is required'),
});

export const CreateProjectForm = ({
  handleClose,
}: {
  handleClose: () => void;
}) => {
  const [errorMesage, setErrorMessage] = useState<string | null>(null);
  const { data: currentUser } = useGetCurrentUser();
  const [waiting, setWaiting] = useState(false);

  const { mutate, isLoading, error, isError } = useCreateProject();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, isSubmitting, isSubmitSuccessful },
  } = useForm<CreateProjectInput>({
    resolver: zodResolver(createProjectSchema),
  });

  const onSubmit: SubmitHandler<CreateProjectInput> = async (input) => {
    try {
      if (currentUser) {
        return new Promise<void>((resolve) => {
          setTimeout(() => {
            mutate({ input, userId: currentUser.id });
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
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.createProjectForm}
    >
      <label htmlFor="name">Title</label>
      <input
        id="title"
        placeholder="title"
        {...register('title', { required: true })}
      />
      <p className={styles.errorMessage}>{errors.title?.message}</p>
      <label htmlFor="endsAt">End Date</label>
      <input
        type={'date'}
        id="endsAt"
        placeholder="End date"
        {...register('endsAt', { required: true })}
      />
      <p className={styles.errorMessage}>{errors.endsAt?.message}</p>
      <motion.button
        type="submit"
        className={styles.submitButton}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isSubmitting ? <Loader /> : 'Create Project'}
      </motion.button>
    </form>
  );
};
