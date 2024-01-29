<template>
  <div class="modal__content">
    <div class="modal__inputs">
      <input
        v-model.trim="user.first_name"
        class="modal__input"
        type="text"
        placeholder="Enter First Name..."
      />
      <input
        v-model.trim="user.last_name"
        class="modal__input"
        type="text"
        placeholder="Enter Last Name..."
      />
      <input
        v-model.trim="user.email"
        class="modal__input"
        type="email"
        placeholder="Enter Email..."
      />
    </div>
    <button class="modal__button" @click="mode === 'edit' ? editUser() : createUser()">
      {{ mode === 'edit' ? 'EDIT USER' : 'CREATE' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
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

const validator = useVuelidate(rules, user)

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

const editUser = async () => {
  const isValid = await validator.value.$validate()
  if (isValid && props.userInfo) {
    const updatedUser = { ...user.value, id: props.userInfo.id, avatar: '' }

    updateUser(updatedUser)

    user.value.first_name = ''
    user.value.last_name = ''
    user.value.email = ''

    emits('close-modal')
  }
}

onMounted(() => {
  if (props.userInfo) {
    user.value.first_name = props.userInfo.first_name || ''
    user.value.last_name = props.userInfo.last_name || ''
    user.value.email = props.userInfo.email || ''
  }
})
</script>

<style lang="scss" scoped>
@import './UserFormView.scss';
</style>
