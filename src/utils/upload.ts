import { IMAGE_MAX_SIZE } from '@constants'

export const readFile = (file: File, onLoad: (result: { message?: string; data?: string }) => void) => {
  if (!file) {
    return
  } else if (!file.type) {
    return onLoad({ message: 'The selected file type is not supported' })
  } else if (!file.type.match('image.*')) {
    return onLoad({ message: 'The selected file is not an image' })
  } else if (file.size >= IMAGE_MAX_SIZE) {
    return onLoad({ message: 'Selected file is too large' })
  }

  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.addEventListener('load', (e: ProgressEvent<FileReader>) => {
    if (e.target) {
      onLoad({ data: e.target.result as string })
    } else {
      onLoad({ message: 'Error reading file' })
    }
  })
}
