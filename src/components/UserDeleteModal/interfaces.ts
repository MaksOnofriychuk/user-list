export interface IUserDeleteModalProps {
  userId: number
}

export interface ICloseModalEmit {
  (e: 'close-modal'): void
}
