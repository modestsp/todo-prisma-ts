import { object, string } from 'zod';
import { useContext, useState } from 'react';
import { UserContext } from '../../../../App';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CreateTodoInput } from '../../../../types';
import todoService from '../../../../services/todo.service';
import { useMutation, useQuery } from '@tanstack/react-query';
import styles from './todos.module.css';
import userService from '../../../../services/user.service';

export const createTodoSchema = object({
  description: string({
    required_error: 'Description is required',
  }),
  endsAt: string({
    required_error: 'End date is required',
  }),
});

export const CreateTodoForm = () => {
  // const navigate = useNavigate();
  const [errorMesage, setErrorMessage] = useState<string | null>(null);
  const contextT = useContext(UserContext);

  const addTodo = useMutation({
    mutationFn: () => {
      return 'Helo';
    },
  });

  // const { accessToken, setAccessToken } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTodoInput>({
    resolver: zodResolver(createTodoSchema),
  });
  const onSubmit: SubmitHandler<CreateTodoInput> = async (input) => {
    try {
      const currentUser = contextT?.currentUser;
      if (currentUser?.id) {
        // const createdTodo = await todoService.createTodo(input, currentUser.id);
        // console.log('NEW TODO', createdTodo);
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
    <form onSubmit={handleSubmit(onSubmit)} className={styles.createTodoForm}>
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
