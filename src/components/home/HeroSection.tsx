import { Button } from '@/components/ui/button';
import { Calendar, Users, Star, ArrowRight } from 'lucide-react';
import heroImage from '@/assets/nutrition-hero.jpg';

const HeroSection = () => {
  const stats = [
    { label: 'Nutritionnistes certifiés', value: '250+', icon: Users },
    { label: 'Consultations réalisées', value: '5000+', icon: Calendar },
    { label: 'Note moyenne', value: '4.8/5', icon: Star },
  ];

  return (
    <section className="relative bg-gradient-hero overflow-hidden">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-primary-foreground leading-tight">
                Votre santé entre les mains d'experts
              </h1>
              <p className="text-xl text-primary-foreground/90 leading-relaxed">
                Trouvez le nutritionniste qui vous correspond, prenez rendez-vous en ligne 
                et commencez votre parcours vers une alimentation équilibrée.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="cta" size="lg" className="group">
                Trouver un nutritionniste
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg" className="bg-background/10 border-primary-foreground/20 text-primary-foreground hover:bg-background/20">
                Comment ça marche ?
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center space-y-2">
                  <div className="flex justify-center">
                    <stat.icon className="h-6 w-6 text-primary-foreground/80" />
                  </div>
                  <div className="text-2xl font-bold text-primary-foreground">
                    {stat.value}
                  </div>
                  <div className="text-sm text-primary-foreground/70">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-strong">
              <img
                src={heroImage}
                alt="Nutrition et bien-être"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-background rounded-lg p-6 shadow-strong max-w-xs">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Prochain RDV</div>
                  <div className="font-semibold">Aujourd'hui 14h30</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
        <div className="w-full h-full bg-gradient-to-l from-primary-foreground/20 to-transparent" />
      </div>
    </section>
  );
};

export default HeroSection;