import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Shield, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const LoginAdmin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login, loginBypass } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const success = await login(email, password);
      if (success) {
        toast({
          title: "Connexion réussie",
          description: "Bienvenue dans l'espace d'administration",
        });
        navigate('/admin/dashboard');
      } else {
        setError('Identifiants incorrects');
      }
    } catch (err) {
      setError('Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  const handleBypassAdmin = () => {
    loginBypass('admin');
    toast({
      title: "Connexion admin bypass",
      description: "Accès administrateur activé",
    });
    navigate('/admin/dashboard');
  };

  const handleBypassNutritionist = () => {
    loginBypass('nutritionist');
    toast({
      title: "Connexion nutritionniste bypass",
      description: "Accès nutritionniste activé",
    });
    navigate('/nutritionist/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-background rounded-full flex items-center justify-center shadow-strong">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-primary-foreground">
            Espace Administration
          </h1>
          <p className="text-primary-foreground/80">
            Connectez-vous pour accéder au panneau d'administration
          </p>
        </div>

        {/* Login Form */}
        <Card className="bg-background/95 backdrop-blur shadow-strong border-0">
          <CardHeader>
            <CardTitle className="text-center">Connexion Admin</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@nutriplatform.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Votre mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading}
                variant="hero"
              >
                {loading ? 'Connexion...' : 'Se connecter'}
              </Button>
            </form>

            {/* Development Bypass */}
            <div className="pt-4 border-t space-y-3">
              <div className="text-center">
                <span className="text-sm text-muted-foreground">
                  Mode développement - Accès rapide
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBypassAdmin}
                  className="flex items-center gap-2"
                >
                  <Zap className="h-3 w-3" />
                  Admin
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBypassNutritionist}
                  className="flex items-center gap-2"
                >
                  <Zap className="h-3 w-3" />
                  Nutritionniste
                </Button>
              </div>
              
              <div className="text-xs text-center text-muted-foreground">
                Credentials test: admin@nutriplatform.com / password
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-primary-foreground/80 hover:text-primary-foreground"
          >
            ← Retour à l'accueil
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;