import { API } from 'src/constants'

import { IResponse } from '@interfaces/IResponse'

const postRequest = async <T, B>(url: string, body: B): Promise<IResponse<T>> => {
  const response = await fetch(`${API}${url}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  return await response.json()
}

export const HeliosAPI = {
  postRequest,
}
