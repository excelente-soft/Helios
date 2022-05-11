import { IRoute } from '@interfaces/IRoute'

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
  { name: 'Сourses management', path: '/courses-management' },
  { name: 'Other features', path: '/other' },
]
export const MENTOR_ROUTES: IRoute[] = [{ name: 'Mentor dashboard', path: '/mentor' }]
export const POSSIBLE_QUESTIONS = [
  {
    question: 'What is the best way to learn?',
    answer: 'We have a lot of resources to help you learn.',
  },
  {
    question: 'Will I be able to use the platform after the end of the course?',
    answer: 'Yes, you can use the platform after the end of the course.',
  },
  {
    question: "Will I receive a certificate after I've completed the course?",
    answer: 'Yes, you will receive a certificate after you have completed the course.',
  },
  {
    question: 'Do I need a powerful PC or any solver knowledge?',
    answer: "No, you don't need any knowledge.",
  },
  {
    question: 'Are you a company?',
    answer: 'No, we are a non-profit organization. We are not a company.',
  },
  {
    question: 'How can I get a refund?',
    answer: 'You can get a refund by contacting us by email: support-me@helios.education',
  },
  {
    question: 'I have a question, how can I contact you?',
    answer: 'You can contact us by email: support-me@helios.education',
  },
]
export const LECTURE_COMPLETE_DELAY = 7000
