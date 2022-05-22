import { IRoute } from '@interfaces/IRoute'

export const SITE_NAME = 'Helios'
export const API = process.env.NEXT_PUBLIC_API || 'http://localhost:8080/v1/api'
export const STORAGE_USER = 'user'
export const STORAGE_REFRESH_TOKEN = 'refreshToken'
export const IMAGE_MAX_SIZE = 15 * 1024 * 1024
export const LECTURE_COMPLETE_DELAY = 7000
export const WEEK = 1000 * 60 * 60 * 24 * 7
export const CATALOG_IMAGES_COUNT = 7
export const STARS_COUNT = 30
export const PUBLIC_ROUTES: IRoute[] = [
  { name: 'Home', path: '/' },
  { name: 'Catalog', path: '/catalog' },
]
export const PROTECTED_ROUTES: IRoute[] = [
  { name: 'Certificates', path: '/certificates' },
  { name: 'My courses', path: '/courses' },
  { name: 'Settings', path: '/settings' },
]
export const PRIVATE_ROUTES: IRoute[] = [
  { name: 'Сourses management', path: '/courses-management' },
  { name: 'Other features', path: '/other' },
]
export const MENTOR_ROUTES: IRoute[] = [{ name: 'Mentor dashboard', path: '/mentor-dashboard' }]
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
export const FAKE_USER_COURSE_STATISTICS = [
  {
    id: 'bbde45af-ae58-488b-9222-6ae934fd3e4e',
    type: 'lecture',
    rating: 1,
    taskId: 'fdf9eba2-83bb-4e6a-98ad-1fedba3db4ca',
    studentId: 'd6694f70-f173-49a7-a3f7-d7b7b86af3e9',
    createdAt: '1/11/2022',
  },
  {
    id: 'b5256e8c-4818-4493-b866-de019ea0cb75',
    type: 'test',
    rating: 7,
    taskId: 'bcda0fb5-63da-4d84-9fee-60a22575fb19',
    studentId: 'd6694f70-f173-49a7-a3f7-d7b7b86af3e9',
    createdAt: '1/11/2022',
  },
  {
    id: '7b1441a0-0248-4d3a-9b6c-18d48e772acb',
    type: 'test',
    rating: 2,
    taskId: 'bcda0fb5-63da-4d84-9fee-60a22575fb19',
    studentId: 'd6694f70-f173-49a7-a3f7-d7b7b86af3e9',
    createdAt: '1/11/2022',
  },
  {
    id: '7b1441a0-0248-4d3a-9b6c-18d48e772acb',
    type: 'test',
    rating: 8,
    taskId: 'bcda0fb5-63da-4d84-9fee-60a22575fb19',
    studentId: 'd6694f70-f173-49a7-a3f7-d7b7b86af3e9',
    createdAt: '1/11/2022',
  },
]
