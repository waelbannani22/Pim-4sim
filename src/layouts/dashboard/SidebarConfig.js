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
import wel from '@iconify/icons-eva/globe-2-fill';
// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;


  const sidebarConfig = [
    {
      title: 'welcome',
      path: '/dashboard/welcomeadmin',
      icon: getIcon(wel)
    },

  
 
  {
    title: 'user',
    path: '/dashboard/user',
    icon: getIcon(peopleFill)
  },

 
  {
    title: 'Donation',
    path: '/dashboard/Payment',
    icon: getIcon(heart)
  },
  
 
  
  
];



export default sidebarConfig;
