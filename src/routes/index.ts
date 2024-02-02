import { lazy } from 'react';

const Quiz = lazy(() => import('../pages/Quiz'));
const Skills = lazy(() => import('../pages/Skills'));
const Course = lazy(() => import('../pages/Course'));
const Shorts = lazy(() => import('../pages/Shorts'));

const coreRoutes = [
  {
    path: '/',
    title: 'EduGames',
    component: Quiz,
  },
  {
    path: '/skills',
    title: 'EduSkills',
    component: Skills,
  },
  {
    path: '/shorts',
    title: 'EduShorts',
    component: Shorts,
  },
  {
    path: '/course',
    title: 'EduCourse',
    component: Course,
  },
];

const routes = [...coreRoutes];
export default routes;
