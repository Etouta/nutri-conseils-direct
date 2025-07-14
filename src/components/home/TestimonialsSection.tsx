import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sophie Lambert',
      role: 'Patiente',
      avatar: '/api/placeholder/64/64',
      rating: 5,
      content: 'Grâce à Marie, j\'ai enfin trouvé un équilibre alimentaire qui me convient. Son approche bienveillante et ses conseils personnalisés ont transformé ma relation à la nourriture.',
      nutritionist: 'Marie Dubois'
    },
    {
      id: 2,
      name: 'Thomas Martin',
      role: 'Sportif amateur',
      avatar: '/api/placeholder/64/64',
      rating: 5,
      content: 'Les conseils nutritionnels de Pierre ont considérablement amélioré mes performances sportives. La prise de RDV en ligne est un vrai plus pour mon emploi du temps chargé.',
      nutritionist: 'Pierre Martin'
    },
    {
      id: 3,
      name: 'Claire Dupont',
      role: 'Maman de 2 enfants',
      avatar: '/api/placeholder/64/64',
      rating: 5,
      content: 'Une plateforme formidable ! J\'ai pu trouver facilement un nutritionniste spécialisé en nutrition pédiatrique près de chez moi. Mes enfants adorent leurs nouveaux repas équilibrés.',
      nutritionist: 'Dr. Leclerc'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Ce que disent nos patients
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez les témoignages de personnes qui ont transformé leur vie 
            grâce à nos nutritionnistes experts.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-gradient-card border-0 shadow-soft hover:shadow-medium transition-all duration-300">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                    ))}
                  </div>
                  <Quote className="h-6 w-6 text-primary/20" />
                </div>
                
                <p className="text-muted-foreground leading-relaxed">
                  "{testimonial.content}"
                </p>
                
                <div className="border-t pt-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-foreground">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </div>
                      <div className="text-xs text-primary">
                        Suivi par {testimonial.nutritionist}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;