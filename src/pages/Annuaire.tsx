import { useState } from 'react';
import { Search, Filter, MapPin, Star, Calendar, Euro } from 'lucide-react';
import Header from '@/components/navigation/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockNutritionists, mockUsers, getUserById } from '@/data/mockData';

const Annuaire = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  const specialties = [
    'Tous',
    'Nutrition sportive',
    'Perte de poids',
    'Diabète',
    'Nutrition pédiatrique',
    'Allergies alimentaires',
    'Troubles digestifs'
  ];

  const filteredNutritionists = mockNutritionists.filter(nutritionist => {
    const user = getUserById(nutritionist.userId);
    if (!user) return false;

    const matchesSearch = searchTerm === '' || 
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nutritionist.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nutritionist.specialties.some(specialty => 
        specialty.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesSpecialty = selectedSpecialty === '' || selectedSpecialty === 'Tous' ||
      nutritionist.specialties.includes(selectedSpecialty);

    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold text-foreground">
            Annuaire des nutritionnistes
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez {mockNutritionists.length} nutritionnistes certifiés près de chez vous. 
            Filtrez par spécialité et trouvez l'expert qui vous correspond.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-gradient-card rounded-lg p-6 shadow-soft mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Rechercher par nom, ville ou spécialité..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Specialty Filter */}
            <div className="flex gap-2 flex-wrap">
              {specialties.map((specialty) => (
                <Button
                  key={specialty}
                  variant={selectedSpecialty === specialty ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSpecialty(specialty)}
                  className="whitespace-nowrap"
                >
                  {specialty}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">
              {filteredNutritionists.length} nutritionniste(s) trouvé(s)
            </h2>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Plus de filtres
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNutritionists.map((nutritionist) => {
              const user = getUserById(nutritionist.userId);
              if (!user) return null;

              return (
                <Card key={nutritionist.id} className="bg-gradient-card border-0 shadow-soft hover:shadow-medium transition-all duration-300 transform hover:scale-105">
                  <CardContent className="p-6 space-y-4">
                    {/* Header */}
                    <div className="flex items-start space-x-4">
                      <img
                        src={user.avatar || '/api/placeholder/64/64'}
                        alt={`${user.firstName} ${user.lastName}`}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-lg">
                            Dr. {user.firstName} {user.lastName}
                          </h3>
                          {nutritionist.verified && (
                            <Badge variant="secondary" className="text-xs">
                              Vérifié
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span>{nutritionist.location}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-sm">
                          <Star className="h-3 w-3 fill-warning text-warning" />
                          <span className="font-medium">{nutritionist.rating}</span>
                          <span className="text-muted-foreground">
                            ({nutritionist.reviewCount} avis)
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Specialties */}
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Spécialités :</div>
                      <div className="flex flex-wrap gap-1">
                        {nutritionist.specialties.slice(0, 3).map((specialty) => (
                          <Badge key={specialty} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                        {nutritionist.specialties.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{nutritionist.specialties.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {nutritionist.description.substring(0, 120)}...
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center space-x-1 text-sm">
                        <Euro className="h-3 w-3" />
                        <span className="font-medium">{nutritionist.consultationPrice}€</span>
                        <span className="text-muted-foreground">/ consultation</span>
                      </div>
                      <Button variant="hero" size="sm">
                        <Calendar className="h-3 w-3 mr-1" />
                        Prendre RDV
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredNutritionists.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">Aucun résultat trouvé</h3>
              <p className="text-muted-foreground">
                Essayez de modifier vos critères de recherche ou supprimez les filtres.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Annuaire;