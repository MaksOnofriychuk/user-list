import type { IUser } from '@/core/interfaces/user.interface'

export interface IUserFormProps {
  userInfo?: IUser
  isModalOpen: boolean
  mode: string
}

export interface ICloseModalEmit {
  (e: 'close-modal'): void
}
