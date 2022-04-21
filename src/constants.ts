import { IRoute } from './interfaces/IRoute'

export const SITE_NAME = 'Helios'
export const API = process.env.NEXT_PUBLIC_API || 'http://localhost:8080/v1/api'
export const STORAGE_USER = 'user'
export const STORAGE_REFRESH_TOKEN = 'refreshToken'
export const IMAGE_MAX_SIZE = 15 * 1024 * 1024
export const PUBLIC_ROUTES: IRoute[] = [
  { name: 'Home', path: '/' },
  { name: 'Catalog', path: '/catalog' },
]
export const PROTECTED_ROUTES: IRoute[] = [
  { name: 'My courses', path: '/courses' },
  { name: 'Settings', path: '/settings' },
]
export const PRIVATE_ROUTES: IRoute[] = [
  { name: 'Сourse management', path: '/course-management' },
  { name: 'Other features', path: '/other' },
]
export const MENTOR_ROUTES: IRoute[] = [{ name: 'Mentor dashboard', path: '/mentor' }]
