import type { IUser } from '@/core/interfaces/user.interface'
import type { IndexedGetters } from './genera.interfaces'

export interface State {
  users: IUser[]
  pageLimit: number
  totalPage: number
  pageNumber: number
}

export interface Getters extends IndexedGetters {}

export interface Actions {
  getAllUsers: () => void
  setNewUser: (newUser: IUser) => void
  deleteUser: (userId: number) => void
  updateUser: (updatedUser: IUser) => void
  changeCurrentPage: (page: number) => void
  updateLocalStorage: (users: IUser[], currentPage: number, totalUser: number) => void
}
