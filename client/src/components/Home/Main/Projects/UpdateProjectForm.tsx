import { object, string, boolean } from 'zod';
import { useState } from 'react';
import { useGetCurrentUser } from '../../../hooks/useGetCurrentUser';
import { Todo, UpdateProjectInput } from '../../../../types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateTodo } from '../../../hooks/useUpdateTodo';
import { useForm, SubmitHandler } from 'react-hook-form';
import { motion } from 'framer-motion';
import styles from './projects.module.css';
import { useUpdateProject } from '../../../hooks/useUpdateProject';
import { Loader } from '../../../utils/Loader';

export const updateProjectSchema = object({
  title: string().optional(),
  endsAt: string().optional(),
  projectId: string().optional(),
  completed: boolean().optional(),
});

export const UpdateProjectForm = ({
  projectId,
  handleClose,
}: {
  projectId?: string;
  handleClose: () => void;
}) => {
  const [errorMesage, setErrorMessage] = useState<string | null>(null);
  const { data: currentUser } = useGetCurrentUser();
  const { mutate } = useUpdateProject();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateProjectInput>({
    resolver: zodResolver(updateProjectSchema),
  });

  const onSubmit: SubmitHandler<UpdateProjectInput> = async (input) => {
    try {
      if (currentUser) {
        return new Promise<void>((resolve) => {
          setTimeout(() => {
            mutate({ ...input, projectId });
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
      console.log(errorMesage);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.createProjectForm}
    >
      <label htmlFor="title">Title</label>
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
        {isSubmitting ? <Loader /> : 'Update Project'}
      </motion.button>
    </form>
  );
};
