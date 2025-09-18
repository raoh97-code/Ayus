import { Link, useLocation } from 'react-router-dom';
import { useMember } from '@/integrations';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { User, LogOut, Calendar, Hospital } from 'lucide-react';

export default function Header() {
  const { member, isAuthenticated, isLoading, actions } = useMember();
  const location = useLocation();

  const getDashboardLink = () => {
    // In a real app, you would determine this based on user role stored in member data
    // For demo purposes, we'll check localStorage or use a default
    const userRole = localStorage.getItem('userRole') || 'patient';
    
    if (userRole === 'doctor') {
      return '/doctor-dashboard';
    } else if (userRole === 'admin') {
      return '/admin-dashboard';
    } else {
      return '/dashboard';
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-secondary/20 sticky top-0 z-50">
      <div className="max-w-[120rem] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-heading font-bold text-lg">A</span>
            </div>
            <span className="font-heading text-2xl font-bold text-foreground">AyurSutra</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`font-paragraph text-sm transition-colors hover:text-primary ${
                location.pathname === '/' ? 'text-primary' : 'text-foreground'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/hospitals" 
              className={`font-paragraph text-sm transition-colors hover:text-primary ${
                location.pathname === '/hospitals' ? 'text-primary' : 'text-foreground'
              }`}
            >
              <Hospital className="w-4 h-4 inline mr-1" />
              Hospitals
            </Link>
            <Link 
              to="/treatments" 
              className={`font-paragraph text-sm transition-colors hover:text-primary ${
                location.pathname === '/treatments' ? 'text-primary' : 'text-foreground'
              }`}
            >
              Treatments
            </Link>
            <Link 
              to="/appointment" 
              className={`font-paragraph text-sm transition-colors hover:text-primary ${
                location.pathname === '/appointment' ? 'text-primary' : 'text-foreground'
              }`}
            >
              <Calendar className="w-4 h-4 inline mr-1" />
              Book Appointment
            </Link>
          </nav>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {isLoading && <LoadingSpinner />}
            
            {!isAuthenticated && !isLoading && (
              <div className="flex items-center space-x-3">
                <Button 
                  onClick={actions.login}
                  variant="outline" 
                  size="sm" 
                  className="font-paragraph"
                >
                  Sign In
                </Button>
              </div>
            )}
            
            {isAuthenticated && (
              <div className="flex items-center space-x-3">
                <Link 
                  to={getDashboardLink()}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors"
                >
                  <User className="w-4 h-4 text-primary" />
                  <span className="font-paragraph text-sm text-foreground">
                    {member?.profile?.nickname || member?.contact?.firstName || 'Dashboard'}
                  </span>
                </Link>
                <Button 
                  onClick={actions.logout}
                  variant="outline" 
                  size="sm" 
                  className="font-paragraph"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  Sign Out
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}