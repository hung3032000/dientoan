import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography
} from '@material-ui/core';
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon,
  Home as HomeIcon,
  Trello as TrelloIcon,
  Smartphone as SmartphoneIcon,
  PieChart as PieChartIcon,
  Calendar, Server, UserCheck, Clock, Edit
} from 'react-feather';
import NavItem from './NavItem';
import RoutesString from 'src/routes/routesString';

const items = [
  {
    href: RoutesString.Exams,
    icon: SettingsIcon,
    title: 'Bài kiểm tra'
  }
];

const DashboardSidebar = ({ }) => {

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2
        }}
      >
       
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => {
            return (
              <NavItem
                href={item.href}
                key={item.title}
                title={item.title}
                icon={item.icon}
              />
            );
          })}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );

  return (
    <>
      {/* <Hidden >
      </Hidden> */}
      <Hidden >
        <Drawer
          anchor="left"
          open
          className="drawer-container"
          variant="persistent"
          PaperProps={{
            sx: {
              width: 180,
              top: 64,
              height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

export default DashboardSidebar;
