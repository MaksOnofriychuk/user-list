<template>
  <div class="modal__content">
    <div class="modal__inputs">
      <div class="modal__input_wrap">
        <input
          v-model.trim="user.first_name"
          class="modal__input"
          type="text"
          placeholder="Enter First Name..."
          @blur="validator.first_name.$commit"
        />
        <p v-if="validator.first_name.$error && validator.first_name.$dirty" class="error">
          First Name is required
        </p>
      </div>
      <div class="modal__input_wrap">
        <input
          v-model.trim="user.last_name"
          class="modal__input"
          type="text"
          placeholder="Enter Last Name..."
          @blur="validator.first_name.$commit"
        />
        <p v-if="validator.last_name.$error" class="error">Last Name is required</p>
      </div>
      <div class="modal__input_wrap">
        <input
          v-model.trim="user.email"
          class="modal__input"
          type="email"
          placeholder="Enter Email..."
          @blur="validator.first_name.$commit"
        />
        <p v-if="validator.email.$error && !user.email" class="error">Email is required</p>
        <p v-if="validator.email.$error && user.email" class="error">Invalid email format</p>
      </div>
    </div>
    <button class="modal__button" @click="mode === 'edit' ? editUser() : createUser()">
      {{ mode === 'edit' ? 'EDIT USER' : 'CREATE' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import useVuelidate from '@vuelidate/core'
import { useUsersStore } from '@/stores/usersStore'
import { required, email } from '@vuelidate/validators'
import type { ICloseModalEmit, IUserFormProps } from './interfaces'

const { setNewUser, updateUser } = useUsersStore()

const props = defineProps<IUserFormProps>()

const emits = defineEmits<ICloseModalEmit>()

const user = ref({
  first_name: '',
  last_name: '',
  email: ''
})

const rules = {
  first_name: { required },
  last_name: { required },
  email: { required, email }
}

const validator = useVuelidate(rules, user, { $rewardEarly: true })

const createUser = async () => {
  const isValid = await validator.value.$validate()

  if (isValid) {
    const updatedUser = { ...user.value, id: Date.now(), avatar: '' }

    setNewUser(updatedUser)

    user.value.first_name = ''
    user.value.last_name = ''
    user.value.email = ''

    emits('close-modal')
  }
}

console.log(' emits', emits('close-modal'))

watchEffect(() => {
  if (!props.isModalOpen) {
    user.value.first_name = ''
    user.value.last_name = ''
    user.value.email = ''

    validator.value.$reset()
  }

  if (props.isModalOpen && props.userInfo) {
    user.value.first_name = props.userInfo.first_name || ''
    user.value.last_name = props.userInfo.last_name || ''
    user.value.email = props.userInfo.email || ''
  }
})

const editUser = async () => {
  const isValid = await validator.value.$validate()
  if (isValid && props.userInfo) {
    const updatedUser = { ...user.value, id: props.userInfo.id, avatar: props.userInfo.avatar }

    updateUser(updatedUser)
    emits('close-modal')
  }
}
</script>

<style lang="scss" scoped>
@import './UserFormView.scss';
</style>
