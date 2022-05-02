import { API } from 'src/constants'

import { IResponse } from '@interfaces/IResponse'

const requestToServer = async <R = boolean, B = unknown>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  body: B,
  token?: string
): Promise<IResponse<R>> => {
  try {
    const tokenConfig = token && { authorization: `Bearer ${token}` }
    const bodyConfig = body && { body: JSON.stringify(body) }
    const response = await fetch(`${API}${url}`, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...tokenConfig,
      },
      ...bodyConfig,
    })
    return await response.json()
  } catch (err) {
    return { data: null, message: `${err}` }
  }
}

export const RequestUtility = {
  requestToServer,
}
