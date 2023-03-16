import React from 'react';
import './Sidebar.css';
import { CustomersMajor } from '@shopify/polaris-icons';
import { Icon } from '@shopify/polaris';

function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <a href="/" className="link">
            <Icon source={CustomersMajor} color="base" />
            <span>Customer</span>
          </a>
        </li>
      </ul>
     
    </div>
  );
}

export default Sidebar;
