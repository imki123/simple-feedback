export type UserType = {
  id: number
  name: string
  email: string
  team: string
  job: string
}

const users: UserType[] = [
  {
    id: 1,
    name: 'Hoodie',
    email: 'hoodie@haechi.io',
    team: 'FaceWallet',
    job: 'FE Developer',
  },
  {
    id: 2,
    name: 'Hoodie2',
    email: 'hoodie2@haechi.io',
    team: 'FaceWallet',
    job: 'FE Developer',
  },
  {
    id: 3,
    name: 'Hoodie3',
    email: 'hoodie3@haechi.io',
    team: '피플팀',
    job: '총무',
  },
]

export const getUsers = async (): Promise<UserType[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...users])
    }, 1000)
  })
}

export const getUser = async (id: number): Promise<UserType | null> => {
  const users = await getUsers()
  return Promise.resolve(users.find((user) => user.id === id) || null)
}
