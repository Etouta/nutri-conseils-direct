import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Users, Stethoscope, ShoppingBag, BookOpen, Shield } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Users,
      title: 'Annuaire complet',
      description: 'Trouvez facilement le nutritionniste qui correspond à vos besoins grâce à notre système de filtres avancés.',
      color: 'text-blue-600'
    },
    {
      icon: Calendar,
      title: 'Prise de RDV en ligne',
      description: 'Réservez vos consultations 24h/24, 7j/7 en quelques clics directement sur la plateforme.',
      color: 'text-green-600'
    },
    {
      icon: Stethoscope,
      title: 'Suivi personnalisé',
      description: 'Bénéficiez d\'un accompagnement sur mesure avec des outils de suivi adaptés à vos objectifs.',
      color: 'text-primary'
    },
    {
      icon: ShoppingBag,
      title: 'Boutique spécialisée',
      description: 'Accédez à une sélection de produits et programmes nutritionnels recommandés par nos experts.',
      color: 'text-orange-600'
    },
    {
      icon: BookOpen,
      title: 'Blog d\'expertise',
      description: 'Consultez nos articles rédigés par des professionnels pour enrichir vos connaissances nutritionnelles.',
      color: 'text-purple-600'
    },
    {
      icon: Shield,
      title: 'Professionnels certifiés',
      description: 'Tous nos nutritionnistes sont diplômés et vérifiés pour vous garantir la meilleure qualité de service.',
      color: 'text-red-600'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Tout pour votre bien-être nutritionnel
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Une plateforme complète qui réunit tous les outils dont vous avez besoin 
            pour prendre soin de votre santé alimentaire.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-gradient-card border-0 shadow-soft hover:shadow-medium transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-8 text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center">
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;