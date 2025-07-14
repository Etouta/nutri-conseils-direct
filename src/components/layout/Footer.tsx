import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: 'Plateforme',
      links: [
        { name: 'Annuaire', href: '/annuaire' },
        { name: 'Blog', href: '/blog' },
        { name: 'Boutique', href: '/boutique' },
        { name: 'Prise de RDV', href: '/rdv' }
      ]
    },
    {
      title: 'Professionnels',
      links: [
        { name: 'Devenir partenaire', href: '/rejoindre' },
        { name: 'Espace nutritionniste', href: '/dashboard' },
        { name: 'Tarifs', href: '/tarifs' },
        { name: 'Formation', href: '/formation' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Centre d\'aide', href: '/aide' },
        { name: 'Contact', href: '/contact' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Signaler un problème', href: '/signaler' }
      ]
    },
    {
      title: 'Légal',
      links: [
        { name: 'Mentions légales', href: '/mentions' },
        { name: 'Confidentialité', href: '/confidentialite' },
        { name: 'CGU', href: '/cgu' },
        { name: 'Cookies', href: '/cookies' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' }
  ];

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-primary">
                <span className="text-sm font-bold text-primary-foreground">N</span>
              </div>
              <span className="text-xl font-bold text-primary">NutriPlatform</span>
            </Link>
            
            <p className="text-muted-foreground leading-relaxed">
              La plateforme de référence pour connecter patients et nutritionnistes. 
              Trouvez l'expert qui vous accompagnera vers une alimentation équilibrée.
            </p>

            <div className="space-y-2">
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>contact@nutriplatform.com</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>01 23 45 67 89</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>75001 Paris, France</span>
              </div>
            </div>

            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-background rounded-full flex items-center justify-center shadow-soft hover:shadow-medium transition-all duration-200 hover:scale-105"
                  aria-label={social.name}
                >
                  <social.icon className="h-4 w-4 text-muted-foreground hover:text-primary" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="font-semibold text-foreground">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Bottom */}
        <div className="py-6 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © 2024 NutriPlatform. Tous droits réservés.
            </p>
            <div className="flex items-center space-x-6">
              <span className="text-sm text-muted-foreground">
                Plateforme certifiée et sécurisée
              </span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-xs text-success">Service disponible</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;