import { API } from 'src/constants'

import { IResponse } from '@interfaces/IResponse'

const postRequest = async <T, B>(url: string, body: B, token?: string): Promise<IResponse<T>> => {
  try {
    const tokenConfig = token && { authorization: `Bearer ${token}` }
    const response = await fetch(`${API}${url}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...tokenConfig,
      },
      body: JSON.stringify(body),
    })

    return await response.json()
  } catch (err) {
    return { data: null, message: `${err}` }
  }
}

export const HeliosAPI = {
  postRequest,
}
