import { API } from '@/api/api'
import { defineStore } from 'pinia'
import { vaultService } from '@/core/services/local-storage'
import type { IUser } from '@/core/interfaces/user.interface'
import type { State, Getters, Actions } from '@/core/types/stores/users.interfaces'

export const useUsersStore = defineStore<'users', State, Getters, Actions>('users', {
  state: () => ({
    users: vaultService.get('users') || [],
    totalPage: vaultService.get('totalPage') || 0,
    pageNumber: vaultService.get('pageNumber') || 1,
    pageLimit: 3
  }),

  actions: {
    setNewUser(newUser) {
      const storageUsers = vaultService.get<IUser[]>('users')

      vaultService.set('users', [newUser, ...storageUsers])

      this.users = [newUser, ...this.users]
    },

    deleteUser(userId) {
      const storageUsers = vaultService.get<IUser[]>('users')

      const filteredUsers = storageUsers.filter(({ id }) => id !== userId)

      vaultService.set('users', filteredUsers)

      this.users = filteredUsers
    },

    updateUser(updatedUser) {
      const storageUsers = vaultService.get<IUser[]>('users')

      const updatedUsers = storageUsers.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      )

      vaultService.set('users', updatedUsers)

      this.users = updatedUsers
    },

    changeCurrentPage(page) {
      this.pageNumber = page
    },

    updateLocalStorage(users: IUser[], currentPage: number, totalUser: number) {
      const storageUsers = vaultService.get<IUser[]>('users')
      const storageTotalPage = vaultService.get<number>('totalPage')
      const storagePageNumber = vaultService.get<number>('pageNumber')

      if (!storageUsers || storagePageNumber !== currentPage) {
        vaultService.set('users', users)
        vaultService.set('pageNumber', currentPage)
        vaultService.set('totalPage', Math.ceil(totalUser / this.pageLimit))

        this.totalPage = Math.ceil(totalUser / this.pageLimit)
        this.pageNumber = currentPage
        this.users = users
      } else {
        this.totalPage = storageTotalPage
        this.pageNumber = storagePageNumber
        this.users = storageUsers
      }
    },

    async getAllUsers() {
      try {
        const {
          data: { data: responseUsers, total: responseTotalUser, page: responseCurrentPage }
        } = await API.get('users', {
          params: {
            page: this.pageNumber,
            per_page: this.pageLimit
          }
        })

        this.updateLocalStorage(responseUsers, responseCurrentPage, responseTotalUser)
      } catch (error) {
        console.error(error)
        /**
         *  In this case, this is enough, but in all other cases, you need to make an errorHandler to catch errors
         */
      }
    }
  }
})
