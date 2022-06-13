export interface AuthResponse {
  ok?: boolean,
  error?: string,
  user?: User,
  token?: string,
}

export interface User {
  uuid: string,
  name: string,
  email: string,
  role: 'USER_ROLE'|'ADMIN_ROLE',
}

export interface AllNewsResponse {
  news: New[],
}

export interface CreateEditNewResponse {
  news: New,
  ok?: boolean,
}

export interface New {
  newsUuid?: string,
  uuid?: string,
  title: string,
  description: string,
}
