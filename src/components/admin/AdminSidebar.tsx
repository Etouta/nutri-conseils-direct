import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Calendar, 
  BarChart3, 
  Settings, 
  LogOut, 
  Shield,
  BookOpen,
  ShoppingBag,
  User,
  Menu,
  X
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const menuItems = [
    {
      label: 'Vue d\'ensemble',
      icon: BarChart3,
      href: '/admin/dashboard',
      description: 'Statistiques générales'
    },
    {
      label: 'Nutritionnistes',
      icon: Users,
      href: '/admin/nutritionists',
      description: 'Gestion des professionnels'
    },
    {
      label: 'Rendez-vous',
      icon: Calendar,
      href: '/admin/appointments',
      description: 'Suivi des consultations'
    },
    {
      label: 'Blog',
      icon: BookOpen,
      href: '/admin/blog',
      description: 'Articles et contenu'
    },
    {
      label: 'Boutique',
      icon: ShoppingBag,
      href: '/admin/shop',
      description: 'Produits et commandes'
    },
    {
      label: 'Utilisateurs',
      icon: User,
      href: '/admin/users',
      description: 'Gestion des comptes'
    },
    {
      label: 'Paramètres',
      icon: Settings,
      href: '/admin/settings',
      description: 'Configuration'
    }
  ];

  const isActive = (href: string) => location.pathname === href;

  const handleLogout = () => {
    logout();
    toast({
      title: "Déconnexion",
      description: "Vous avez été déconnecté avec succès",
    });
    navigate('/admin/login');
  };

  return (
    <aside className={`bg-background border-r border-border transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    } min-h-screen fixed left-0 top-0 z-40`}>
      
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                <Shield className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-semibold text-sm">Admin Panel</h2>
                <p className="text-xs text-muted-foreground">NutriPlatform</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-8 w-8"
          >
            {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* User Info */}
      {!isCollapsed && user && (
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-secondary rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user.role === 'admin' ? 'Administrateur' : 'Nutritionniste'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="p-2 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-colors ${
                isActive(item.href)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              }`}
              title={isCollapsed ? item.label : ''}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <div className="font-medium">{item.label}</div>
                  <div className="text-xs opacity-70">{item.description}</div>
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-2 border-t border-border">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className={`w-full justify-start text-muted-foreground hover:text-foreground ${
            isCollapsed ? 'px-2' : 'px-3'
          }`}
        >
          <LogOut className="h-4 w-4 flex-shrink-0" />
          {!isCollapsed && <span className="ml-3">Déconnexion</span>}
        </Button>
      </div>
    </aside>
  );
};

export default AdminSidebar;