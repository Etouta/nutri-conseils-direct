import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Users, Calendar } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground">
              Prêt à transformer votre alimentation ?
            </h2>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Rejoignez des milliers de personnes qui ont déjà amélioré leur santé 
              grâce à nos nutritionnistes experts. Commencez dès aujourd'hui !
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="cta" size="lg" className="group bg-background text-primary hover:bg-background/90">
              <Users className="mr-2 h-5 w-5" />
              Trouver mon nutritionniste
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" size="lg" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
              <Calendar className="mr-2 h-5 w-5" />
              Prendre RDV maintenant
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-primary-foreground/20">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-primary-foreground">
                250+
              </div>
              <div className="text-primary-foreground/80">
                Nutritionnistes certifiés
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-primary-foreground">
                5000+
              </div>
              <div className="text-primary-foreground/80">
                Consultations réalisées
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center space-x-1">
                <span className="text-3xl font-bold text-primary-foreground">4.8</span>
                <Star className="h-6 w-6 fill-warning text-warning" />
              </div>
              <div className="text-primary-foreground/80">
                Note moyenne des patients
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;