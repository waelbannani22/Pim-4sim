import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import lockFill from '@iconify/icons-eva/lock-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';
import heart from '@iconify/icons-eva/heart-fill';
import code from '@iconify/icons-eva/code-outline';
import video from '@iconify/icons-eva/video-fill';
// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;
const sidebarConfigTeacher = [
    {
      title: 'dashboard',
      path: '/dashboard/app',
      icon: getIcon(pieChart2Fill)
    },
    {
      title: 'videochat',
      path: '/dashboard/videochat',
      icon: getIcon(video)
    },
   
    {
      title: 'my classes',
      path: '/dashboard/teacherClasses',
      icon: getIcon(peopleFill)
    },
    {
      title: 'product',
      path: '/dashboard/products',
      icon: getIcon(shoppingBagFill)
    },
    {
      title: 'Compilator',
      path: '/dashboard/Compilator',
      icon: getIcon(code)
    },
    {
      title: 'Donation',
      path: '/dashboard/Payment',
      icon: getIcon(heart)
    },
    {
      title: 'blog',
      path: '/dashboard/blog',
      icon: getIcon(fileTextFill)
    },
    {
      title: 'card',
      path: '/dashboard/card',
      icon: getIcon(fileTextFill)
    },
    
   
  ];
  
export default sidebarConfigTeacher;