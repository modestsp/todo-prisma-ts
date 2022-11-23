import { object, string } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CreateProjectInput, CreateTodoInput } from '../../../../types';
import styles from './projects.module.css';
import { useGetCurrentUser } from '../../../hooks/useGetCurrentUser';
import { useCreateTodo } from '../../../hooks/useCreateTodo';
import { useState } from 'react';
import { useCreateProject } from '../../../hooks/useCreateProject';

export const createProjectSchema = object({
  title: string({
    required_error: 'Title is required',
  }),
  endsAt: string({
    required_error: 'End date is required',
  }),
});

export const CreateProjectForm = ({
  modalOpen,
  setModalOpen,
}: {
  modalOpen: any;
  setModalOpen: any;
}) => {
  const [errorMesage, setErrorMessage] = useState<string | null>(null);
  const { data: currentUser } = useGetCurrentUser();
  const [waiting, setWaiting] = useState(false);

  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.createProjectForm}
    >
      <label htmlFor="name">Title</label>
      <input
        id="title"
        placeholder="title"
        defaultValue="test"
        {...register('title', { required: true })}
      />
      <p>{errors.title?.message}</p>
      <label htmlFor="endsAt">End Date</label>
      <input
        id="endsAt"
        placeholder="End date"
        defaultValue="test"
        {...register('endsAt', { required: true })}
      />
      <p>{errors.endsAt?.message}</p>
      <button onClick={() => (modalOpen ? close() : open())} type="submit">
        Send
      </button>
      <p>{waiting ? 'Submitting' : null}</p>
    </form>
  );
};
