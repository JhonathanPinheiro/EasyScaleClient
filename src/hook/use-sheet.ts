import type { NiceModalStore } from '@ebay/nice-modal-react'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { useContext } from 'react'
import { delayRemoveSheet } from '../utils/delay'

export function closeAllDialogs(modals: NiceModalStore) {
  Object.keys(modals).forEach((mid) => {
    delayRemoveSheet(() => NiceModal.remove(mid))
    void NiceModal.hide(mid)
  })
}

export function useSheet() {
  const modals = useContext(NiceModal.NiceModalContext)
  const { hide, remove, ...rest } = useModal()
  function handleClose() {
    delayRemoveSheet(remove)
    void hide()
  }

  return {
    close: handleClose,
    closeAllDialogs: () => closeAllDialogs(modals),
    ...rest,
  }
}
