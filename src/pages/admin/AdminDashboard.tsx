import { useAuth } from '@/contexts/AuthContext';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  DollarSign,
  UserCheck,
  AlertCircle,
  Eye,
  MoreHorizontal
} from 'lucide-react';
import { mockNutritionists, mockUsers, mockAppointments, mockBlogPosts } from '@/data/mockData';

const AdminDashboard = () => {
  const { user } = useAuth();

  // Statistics calculations
  const stats = {
    totalNutritionists: mockNutritionists.length,
    totalUsers: mockUsers.filter(u => u.role === 'client').length,
    totalAppointments: mockAppointments.length,
    pendingAppointments: mockAppointments.filter(a => a.status === 'pending').length,
    verifiedNutritionists: mockNutritionists.filter(n => n.verified).length,
    totalRevenue: mockAppointments.reduce((sum, apt) => sum + apt.price, 0),
    averageRating: (mockNutritionists.reduce((sum, n) => sum + n.rating, 0) / mockNutritionists.length).toFixed(1),
    publishedPosts: mockBlogPosts.filter(p => p.isPublished).length
  };

  const recentNutritionists = mockNutritionists.slice(0, 5);
  const recentAppointments = mockAppointments.slice(0, 5);

  return (
    <div className="min-h-screen bg-muted/30">
      <AdminSidebar />
      
      <main className="ml-64">
        {/* Header */}
        <div className="border-b border-border bg-background p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Tableau de bord
              </h1>
              <p className="text-muted-foreground">
                Bienvenue, {user?.firstName} {user?.lastName}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">Admin</Badge>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Voir le site
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-card border-0 shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Nutritionnistes</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalNutritionists}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.verifiedNutritionists} vérifiés
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Rendez-vous</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalAppointments}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.pendingAppointments} en attente
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Chiffre d'affaires</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalRevenue}€</div>
                <p className="text-xs text-success flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12% ce mois
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Note moyenne</CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.averageRating}/5</div>
                <p className="text-xs text-muted-foreground">
                  Sur {mockNutritionists.reduce((sum, n) => sum + n.reviewCount, 0)} avis
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Nutritionists */}
            <Card className="bg-gradient-card border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Nutritionnistes récents</span>
                  <Button variant="ghost" size="sm">
                    Voir tout
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentNutritionists.map((nutritionist) => {
                    const user = mockUsers.find(u => u.id === nutritionist.userId);
                    return (
                      <div key={nutritionist.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <img
                            src={user?.avatar || '/api/placeholder/40/40'}
                            alt={`${user?.firstName} ${user?.lastName}`}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <div className="font-medium text-sm">
                              Dr. {user?.firstName} {user?.lastName}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {nutritionist.location}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {nutritionist.verified ? (
                            <Badge variant="secondary" className="text-xs">Vérifié</Badge>
                          ) : (
                            <Badge variant="outline" className="text-xs">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              En attente
                            </Badge>
                          )}
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Recent Appointments */}
            <Card className="bg-gradient-card border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Rendez-vous récents</span>
                  <Button variant="ghost" size="sm">
                    Voir tout
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAppointments.map((appointment) => {
                    const nutritionist = mockNutritionists.find(n => n.id === appointment.nutritionistId);
                    const nutrUser = mockUsers.find(u => u.id === nutritionist?.userId);
                    const client = mockUsers.find(u => u.id === appointment.clientId);
                    
                    return (
                      <div key={appointment.id} className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="text-sm font-medium">
                            {appointment.date} à {appointment.time}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Dr. {nutrUser?.firstName} - {client?.firstName} {client?.lastName}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge 
                            variant={appointment.status === 'confirmed' ? 'secondary' : 'outline'}
                            className="text-xs"
                          >
                            {appointment.status === 'confirmed' ? 'Confirmé' : 'En attente'}
                          </Badge>
                          <span className="text-sm font-medium">{appointment.price}€</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardHeader>
              <CardTitle>Actions rapides</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <Users className="h-6 w-6" />
                  <span className="text-xs">Ajouter nutritionniste</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <Calendar className="h-6 w-6" />
                  <span className="text-xs">Gérer RDV</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <AlertCircle className="h-6 w-6" />
                  <span className="text-xs">Vérifications</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <TrendingUp className="h-6 w-6" />
                  <span className="text-xs">Rapports</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;