import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faBriefcase,
  faPaperPlane,
  faQuestion,
  faImage,
  faCopy,
} from '@fortawesome/free-solid-svg-icons';
import SubNav from './subNav';
import { NavItem, NavLink, Nav } from 'reactstrap';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

const SideBar = ({ toggle, isOpen }) => (
  <div className={classNames('sidebar', { 'is-open': isOpen })}>
    <div className="sidebar-header">
      <span color="info" onClick={toggle} style={{ color: 'blue' }}>
        &times;
      </span>
      <h3>Mbali Health</h3>
    </div>
    <div className="side-menu">
      <Nav vertical className="list-unstyled pb-3">
        <SubNav title="Dashboard" icon={faHome} items={submenus[0]} />
        <NavItem>
          <NavLink tag={Link} to={'/dashboard'}>
            <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
            Patients
          </NavLink>
        </NavItem>
        <SubNav title="Consultations" icon={faPaperPlane} items={submenus[1]} />
        <NavItem>
          <NavLink tag={Link} to={'/chats'}>
            <FontAwesomeIcon icon={faImage} className="mr-2" />
            New Nav
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to={'#'}>
            <FontAwesomeIcon icon={faQuestion} className="mr-2" />
            New Nav
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to={'#'}>
            <FontAwesomeIcon icon={faCopy} className="mr-2" />
            FAQ
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  </div>
);

const submenus = [
  [
    {
      title: 'Home 1',
      target: 'Home-1',
    },
    {
      title: 'Home 2',
      target: 'Home-2',
    },
    {
      itle: 'Home 3',
      target: 'Home-3',
    },
  ],
  [
    {
      title: 'Page 1',
      target: 'Page-1',
    },
    {
      title: 'Page 2',
      target: 'Page-2',
    },
  ],
];

export default SideBar;
