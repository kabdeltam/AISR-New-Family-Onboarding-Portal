
import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const NavItem: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `px-4 py-2 rounded-md text-sm lg:text-base font-medium transition-colors duration-200 ${
        isActive ? 'bg-aisr-gold text-white' : 'text-aisr-blue hover:bg-aisr-light-blue'
      }`
    }
  >
    {children}
  </NavLink>
);

const SubNavItem: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-4 py-2 text-sm font-medium transition-colors duration-200 ${
          isActive ? 'text-aisr-gold' : 'text-gray-600 hover:text-aisr-blue'
        }`
      }
    >
      {children}
    </NavLink>
  );

function Header() {
  const location = useLocation();
  const { isAdmin } = useAuth();
  const { t } = useLanguage();
  const pathParts = location.pathname.split('/').filter(p => p);
  const enrollmentPeriod = pathParts.includes('summer-fall') ? 'summer-fall' : pathParts.includes('aisr') ? 'aisr' : null;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link to="/">
              <img className="h-12 w-auto" src="https://www.aisr.org/fs/resource-manager/view/95c4b175-9808-44d7-8f96-676425751921" alt="AISR Logo" />
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-4">
            <NavItem to="/aisr/es">{t('schoolDivisions')}</NavItem>
            <NavItem to="/ptso">{t('ptso')}</NavItem>
            <NavItem to="/booster-club">{t('boosterClub')}</NavItem>
          </nav>
          <div className="flex items-center gap-4">
             <Link to={isAdmin ? "/admin" : "/login"} className="text-sm text-gray-500 hover:text-aisr-blue whitespace-nowrap">
              {isAdmin ? t('adminDashboard') : t('adminLogin')}
             </Link>
          </div>
        </div>
        {enrollmentPeriod && (
          <div className="bg-aisr-gray -mx-4 -mb-px px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center h-12 border-t border-gray-200 space-x-8">
              <SubNavItem to={`/${enrollmentPeriod}/es`}>{t('elementarySchool')}</SubNavItem>
              <SubNavItem to={`/${enrollmentPeriod}/ms`}>{t('middleSchool')}</SubNavItem>
              <SubNavItem to={`/${enrollmentPeriod}/hs`}>{t('highSchool')}</SubNavItem>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
