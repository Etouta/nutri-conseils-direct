import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  MapPin,
  Star,
  Euro
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { mockNutritionists, mockUsers, getUserById } from '@/data/mockData';

const NutritionistManagement = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredNutritionists = mockNutritionists.filter(nutritionist => {
    const user = getUserById(nutritionist.userId);
    if (!user) return false;

    const matchesSearch = searchTerm === '' || 
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nutritionist.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' ||
      (statusFilter === 'verified' && nutritionist.verified) ||
      (statusFilter === 'pending' && !nutritionist.verified);

    return matchesSearch && matchesStatus;
  });

  const statusFilterOptions = [
    { value: 'all', label: 'Tous', count: mockNutritionists.length },
    { value: 'verified', label: 'Vérifiés', count: mockNutritionists.filter(n => n.verified).length },
    { value: 'pending', label: 'En attente', count: mockNutritionists.filter(n => !n.verified).length }
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <AdminSidebar />
      
      <main className="ml-64">
        {/* Header */}
        <div className="border-b border-border bg-background p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Gestion des nutritionnistes
              </h1>
              <p className="text-muted-foreground">
                Gérez les professionnels de santé inscrits sur la plateforme
              </p>
            </div>
            <Button variant="hero">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un nutritionniste
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Filters */}
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-4">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Rechercher par nom ou ville..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Status Filter */}
                <div className="flex gap-2">
                  {statusFilterOptions.map((option) => (
                    <Button
                      key={option.value}
                      variant={statusFilter === option.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setStatusFilter(option.value)}
                      className="whitespace-nowrap"
                    >
                      {option.label} ({option.count})
                    </Button>
                  ))}
                </div>

                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Plus de filtres
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-card border-0 shadow-soft">
              <CardContent className="p-4">
                <div className="text-2xl font-bold">{mockNutritionists.length}</div>
                <p className="text-sm text-muted-foreground">Total nutritionnistes</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-card border-0 shadow-soft">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-success">
                  {mockNutritionists.filter(n => n.verified).length}
                </div>
                <p className="text-sm text-muted-foreground">Vérifiés</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-card border-0 shadow-soft">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-warning">
                  {mockNutritionists.filter(n => !n.verified).length}
                </div>
                <p className="text-sm text-muted-foreground">En attente</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-card border-0 shadow-soft">
              <CardContent className="p-4">
                <div className="text-2xl font-bold">
                  {(mockNutritionists.reduce((sum, n) => sum + n.rating, 0) / mockNutritionists.length).toFixed(1)}
                </div>
                <p className="text-sm text-muted-foreground">Note moyenne</p>
              </CardContent>
            </Card>
          </div>

          {/* Nutritionists Table */}
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardHeader>
              <CardTitle>
                Nutritionnistes ({filteredNutritionists.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr className="text-left">
                      <th className="p-4 font-medium">Nutritionniste</th>
                      <th className="p-4 font-medium">Localisation</th>
                      <th className="p-4 font-medium">Spécialités</th>
                      <th className="p-4 font-medium">Évaluation</th>
                      <th className="p-4 font-medium">Tarif</th>
                      <th className="p-4 font-medium">Statut</th>
                      <th className="p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredNutritionists.map((nutritionist) => {
                      const user = getUserById(nutritionist.userId);
                      if (!user) return null;

                      return (
                        <tr key={nutritionist.id} className="border-b hover:bg-accent/50">
                          <td className="p-4">
                            <div className="flex items-center space-x-3">
                              <img
                                src={user.avatar || '/api/placeholder/40/40'}
                                alt={`${user.firstName} ${user.lastName}`}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                              <div>
                                <div className="font-medium">
                                  Dr. {user.firstName} {user.lastName}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {user.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm">{nutritionist.location}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex flex-wrap gap-1">
                              {nutritionist.specialties.slice(0, 2).map((specialty) => (
                                <Badge key={specialty} variant="outline" className="text-xs">
                                  {specialty}
                                </Badge>
                              ))}
                              {nutritionist.specialties.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{nutritionist.specialties.length - 2}
                                </Badge>
                              )}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center space-x-1">
                              <Star className="h-3 w-3 fill-warning text-warning" />
                              <span className="text-sm font-medium">{nutritionist.rating}</span>
                              <span className="text-xs text-muted-foreground">
                                ({nutritionist.reviewCount})
                              </span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center space-x-1">
                              <Euro className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm font-medium">
                                {nutritionist.consultationPrice}
                              </span>
                            </div>
                          </td>
                          <td className="p-4">
                            {nutritionist.verified ? (
                              <Badge variant="secondary" className="text-xs">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Vérifié
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="text-xs">
                                <XCircle className="h-3 w-3 mr-1" />
                                En attente
                              </Badge>
                            )}
                          </td>
                          <td className="p-4">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  Voir le profil
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Modifier
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                {!nutritionist.verified && (
                                  <DropdownMenuItem>
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Vérifier
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Suspendre
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {filteredNutritionists.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold mb-2">Aucun résultat trouvé</h3>
                  <p className="text-muted-foreground">
                    Aucun nutritionniste ne correspond aux critères de recherche.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default NutritionistManagement;