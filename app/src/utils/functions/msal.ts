export enum MsGraphEndpoints {
  USER_THUMBNAIL = 'https://graph.microsoft.com/v1.0/me/photos/48x48/$value',
}

export const callMsGraph = async (
  endpoint: string,
  accessToken: string,
  responseType: string = 'json',
) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': responseType === 'json' ? 'application/json' : 'image/jpeg',
  }
  const options = {
    method: 'GET',
    headers: headers,
  }
  const response = await fetch(endpoint, options)
  if (responseType === 'blob') {
    const blob = await response.blob()
    return URL.createObjectURL(blob)
  } else {
    return await response.json()
  }
}
