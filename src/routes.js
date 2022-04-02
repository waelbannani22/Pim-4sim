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
import AddNewCard from './pages/AddNewCard';
import SeeAllChapter from './pages/SeeAllChapter';
import AddChapter from './pages/AddChapter';
import { AddCommentModal, PdfUpload, PdfViewer } from './pages';
import AddComment from './pages/AddComment';
import HomeWork from './pages/HomeWork';
import HomeWorkList from './pages/HomeWorkList';
import Drag from './pages/Drag';






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
        { path: 'confirmpassword', element: <ConfirmpasswordPage /> }
        
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
        { path: 'card', element: <AddNewCard /> },
        { path: 'allChapter', element: <SeeAllChapter /> },
        { path: 'addChapter', element: <AddChapter /> },
        { path: 'pdf', element: <PdfUpload /> },
        { path: 'pdfview', element: <PdfViewer /> },
        { path: 'commentModal', element: <AddCommentModal /> },
        { path: 'homework', element: <HomeWork /> },
        { path: 'homeworklist', element: <HomeWorkList /> },
        

        { path: 'addComment', element: <AddComment /> }
      
      ]
    },
    
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
