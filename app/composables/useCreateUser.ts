import type { TCreateUser } from '~/components/UserCreateCard.vue';

export const useCreateUser = () => {
  const user = useState('user', () => ({
    username: '',
    email: '',
    age: 0,
  }))
  const setUser = (newUser: TCreateUser) => {
    user.value = newUser
  }
  return {
    user,
    setUser,
  }
}