export interface IModalProps {
  isShowModal: boolean
  title?: string
}

export interface IModalLayoutEmits {
  (e: 'click', event: Event): void
}
