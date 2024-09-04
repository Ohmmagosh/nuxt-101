import type { NitroFetchRequest, 
  $Fetch,
} from 'nitropack'

export const userRepository = <T>(fetch: $Fetch<T, NitroFetchRequest>) => ({
  async get(): Promise<T> {
    return $fetch<T>('/users')
  },
  async create(user: T): Promise<T> {
    return $fetch<T>('/users', {
      method: 'POST',
      body: JSON.stringify(user)
    })
  }
})
