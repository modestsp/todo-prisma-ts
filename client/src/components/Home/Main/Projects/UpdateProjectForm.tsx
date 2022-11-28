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

export const updateProjectSchema = object({
  title: string().optional(),
  endsAt: string().optional(),
  projectId: string().optional(),
});

export const UpdateProjectForm = ({ projectId }: { projectId?: string }) => {
  const [errorMesage, setErrorMessage] = useState<string | null>(null);
  const { data: currentUser } = useGetCurrentUser();
  const [waiting, setWaiting] = useState(false);
  const { mutate, isLoading, error, isError } = useUpdateProject();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProjectInput>({
    resolver: zodResolver(updateProjectSchema),
  });

  const errorHand = (e: any) => {
    console.log('error', e);
  };

  const onSubmit: SubmitHandler<UpdateProjectInput> = async (input) => {
    console.log('INPUTS', input);
    console.log('ACA EL INPUT', { ...input });
    console.log('ACA EL INPUT222', input);
    try {
      if (currentUser) {
        mutate({ ...input, projectId });
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
        Update Project
      </motion.button>
      <p>{waiting ? 'Submitting' : null}</p>
    </form>
  );
};
