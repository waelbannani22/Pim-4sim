import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import NotFound from './pages/Page404';
import Profile from './pages/profile';
import Reset from './pages/resetpassword';
import ConfirmpasswordPage from './pages/confirmpasswordpage';
import TeacherChart from './pages/TeachersStatChart';
import AffectStudent from './pages/AffectStudent';
import UserProfile from './components/authentication/profile/FullProfile';
import WelcomeAdmin from './pages/WelcomeAdmin';
import Students from './pages/Student';
import Compilator from './pages/compilator';
import Payment from'./pages/payment';
import LoginGoogle from './pages/LoginGoogle';
import AddNewCard from './pages/AddNewCard';
import SeeAllChapter from './pages/SeeAllChapter';
import AddChapter from './pages/AddChapter';
import { AddCommentModal, PdfUpload, PdfViewer } from './pages';
import AddComment from './pages/AddComment';
import HomeWork from './pages/HomeWork';
import HomeWorkList from './pages/HomeWorkList';
import ClassCard from './pages/classesCard';
import StudentsTeacher from './pages/StudentTeacher';
import ClassAffect from './pages/classAfect';
import Drag from './pages/Drag';
import TeacherClasses from './pages/teacherClasses';
import StudentClass from './pages/studentClass';
import Todo from './pages/todo';
import DetailLesson from './pages/detailLesson';
import VideoChat from './pages/videochat';






// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    
     
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { element: <Navigate to="/login" replace /> },

        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> },
        { path: 'resetpassword', element: <Reset /> },
        { path: 'confirmpassword', element: <ConfirmpasswordPage /> },
        { path: 'loginGoogle', element: <LoginGoogle /> }
        
      ]
    },
    {
      path: '/dashboard',
       element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
        { path: 'profile', element: <Profile /> },
        { path: 'chart', element: <TeacherChart /> },
        { path: 'AffectStudent', element: <AffectStudent /> },
        { path: 'Student', element: <Students /> },
        { path: 'Compilator', element: <Compilator /> },
          { path: 'Payment', element: <Payment /> },
        { path: 'welcomeadmin', element: <WelcomeAdmin /> },
        { path: 'card', element: <AddNewCard /> },
        { path: 'allChapter', element: <SeeAllChapter /> },
        { path: 'addChapter', element: <AddChapter /> },
        { path: 'pdf', element: <PdfUpload /> },
        { path: 'pdfview', element: <PdfViewer /> },
        { path: 'commentModal', element: <AddCommentModal /> },
        { path: 'homework', element: <HomeWork /> },
        { path: 'homeworklist', element: <HomeWorkList /> },
        { path: 'addComment', element: <AddComment /> },
        { path: 'classes', element: <ClassCard /> },
        { path: 'classesTeacher', element: <StudentsTeacher /> },
        { path: 'classesAffect', element: <ClassAffect /> },
        { path: 'teacherClasses', element: <TeacherClasses /> },
        { path: 'StudentClass', element: <StudentClass /> },
        { path: 'todo', element: <Todo /> },
        { path: 'detailLesson', element: <DetailLesson /> },
        { path: 'videochat', element: <VideoChat /> },
      ]
    },
    
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
