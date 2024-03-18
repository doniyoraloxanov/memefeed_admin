import React from 'react';
import { Drawer } from '@mui/material';
import classnames from 'classnames/bind';
import styles from './right-drawer.module.scss';

const cn = classnames.bind(styles);

interface RightDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const RightDrawer: React.FC<RightDrawerProps> = ({ isOpen, onClose, children }) => {
  return (
    <Drawer open={isOpen} onClose={onClose} anchor="right">
      <div className={cn('main-drawer')} role="presentation">
        {children}
      </div>
    </Drawer>
  );
};

export default RightDrawer;
