// Centralized mock data for nutrition platform

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'nutritionist' | 'client';
  avatar?: string;
  phone?: string;
  createdAt: string;
}

export interface Nutritionist {
  id: string;
  userId: string;
  specialties: string[];
  location: string;
  description: string;
  experience: number;
  rating: number;
  reviewCount: number;
  consultationPrice: number;
  availability: string[];
  certifications: string[];
  languages: string[];
  verified: boolean;
}

export interface Appointment {
  id: string;
  nutritionistId: string;
  clientId: string;
  date: string;
  time: string;
  duration: number;
  type: 'consultation' | 'follow-up' | 'group';
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  price: number;
}

export interface BlogPost {
  id: string;
  authorId: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  tags: string[];
  publishedAt: string;
  readTime: number;
  likes: number;
  isPublished: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
  tags: string[];
  nutritionistId?: string;
}

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'admin-1',
    email: 'admin@nutriplatform.com',
    firstName: 'Admin',
    lastName: 'System',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'nutr-1',
    email: 'marie.dubois@email.com',
    firstName: 'Marie',
    lastName: 'Dubois',
    role: 'nutritionist',
    avatar: '/api/placeholder/64/64',
    phone: '+33 6 12 34 56 78',
    createdAt: '2024-02-15T10:30:00Z'
  },
  {
    id: 'nutr-2',
    email: 'pierre.martin@email.com',
    firstName: 'Pierre',
    lastName: 'Martin',
    role: 'nutritionist',
    avatar: '/api/placeholder/64/64',
    phone: '+33 6 87 65 43 21',
    createdAt: '2024-02-20T14:15:00Z'
  },
  {
    id: 'client-1',
    email: 'sophie.lambert@email.com',
    firstName: 'Sophie',
    lastName: 'Lambert',
    role: 'client',
    avatar: '/api/placeholder/64/64',
    createdAt: '2024-03-01T09:00:00Z'
  }
];

// Mock Nutritionists
export const mockNutritionists: Nutritionist[] = [
  {
    id: 'nutr-1',
    userId: 'nutr-1',
    specialties: ['Nutrition sportive', 'Perte de poids', 'Diabète'],
    location: 'Paris 15ème',
    description: 'Diététicienne-nutritionniste diplômée avec 8 ans d\'expérience. Spécialisée dans l\'accompagnement des sportifs et la gestion du poids.',
    experience: 8,
    rating: 4.8,
    reviewCount: 127,
    consultationPrice: 65,
    availability: ['lundi', 'mardi', 'mercredi', 'vendredi'],
    certifications: ['DUT Génie Biologique', 'Master Nutrition Humaine'],
    languages: ['Français', 'Anglais'],
    verified: true
  },
  {
    id: 'nutr-2',
    userId: 'nutr-2',
    specialties: ['Nutrition pédiatrique', 'Allergies alimentaires', 'Troubles digestifs'],
    location: 'Lyon 6ème',
    description: 'Nutritionniste spécialisé en pédiatrie et troubles digestifs. Approche bienveillante et personnalisée pour chaque patient.',
    experience: 12,
    rating: 4.9,
    reviewCount: 203,
    consultationPrice: 70,
    availability: ['lundi', 'mardi', 'jeudi', 'vendredi', 'samedi'],
    certifications: ['Master Sciences de l\'Alimentation', 'Formation TCC'],
    languages: ['Français', 'Italien'],
    verified: true
  }
];

// Mock Appointments
export const mockAppointments: Appointment[] = [
  {
    id: 'apt-1',
    nutritionistId: 'nutr-1',
    clientId: 'client-1',
    date: '2024-07-20',
    time: '10:00',
    duration: 60,
    type: 'consultation',
    status: 'confirmed',
    notes: 'Première consultation - objectif perte de poids',
    price: 65
  },
  {
    id: 'apt-2',
    nutritionistId: 'nutr-1',
    clientId: 'client-1',
    date: '2024-07-25',
    time: '14:30',
    duration: 45,
    type: 'follow-up',
    status: 'pending',
    price: 50
  }
];

// Mock Blog Posts
export const mockBlogPosts: BlogPost[] = [
  {
    id: 'blog-1',
    authorId: 'nutr-1',
    title: 'Les bienfaits des oméga-3 dans l\'alimentation sportive',
    excerpt: 'Découvrez comment les acides gras oméga-3 peuvent améliorer vos performances sportives et accélérer votre récupération.',
    content: 'Les oméga-3 sont des acides gras essentiels qui jouent un rôle crucial dans...',
    featuredImage: '/api/placeholder/800/400',
    tags: ['nutrition sportive', 'oméga-3', 'performance'],
    publishedAt: '2024-07-10T08:00:00Z',
    readTime: 5,
    likes: 42,
    isPublished: true
  },
  {
    id: 'blog-2',
    authorId: 'nutr-2',
    title: 'Gérer les allergies alimentaires chez l\'enfant',
    excerpt: 'Guide pratique pour les parents : comment identifier, gérer et accompagner un enfant avec des allergies alimentaires.',
    content: 'Les allergies alimentaires chez l\'enfant sont de plus en plus fréquentes...',
    featuredImage: '/api/placeholder/800/400',
    tags: ['allergies', 'pédiatrie', 'prévention'],
    publishedAt: '2024-07-12T10:30:00Z',
    readTime: 7,
    likes: 38,
    isPublished: true
  }
];

// Mock Products
export const mockProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Programme alimentaire personnalisé - 1 mois',
    description: 'Plan alimentaire sur mesure avec recettes et liste de courses',
    price: 89,
    image: '/api/placeholder/300/200',
    category: 'programmes',
    inStock: true,
    tags: ['personnalisé', 'recettes', 'suivi'],
    nutritionistId: 'nutr-1'
  },
  {
    id: 'prod-2',
    name: 'Guide nutrition sportive - PDF',
    description: 'Guide complet de 50 pages sur la nutrition pour les sportifs',
    price: 24,
    image: '/api/placeholder/300/200',
    category: 'guides',
    inStock: true,
    tags: ['sport', 'guide', 'PDF'],
    nutritionistId: 'nutr-1'
  },
  {
    id: 'prod-3',
    name: 'Consultation groupe - Nutrition famille',
    description: 'Séance collective pour apprendre les bases de la nutrition familiale',
    price: 45,
    image: '/api/placeholder/300/200',
    category: 'consultations',
    inStock: true,
    tags: ['famille', 'groupe', 'éducation'],
    nutritionistId: 'nutr-2'
  }
];

// Helper functions
export const getUserById = (id: string): User | undefined => 
  mockUsers.find(user => user.id === id);

export const getNutritionistById = (id: string): Nutritionist | undefined => 
  mockNutritionists.find(nutritionist => nutritionist.id === id);

export const getNutritionistByUserId = (userId: string): Nutritionist | undefined => 
  mockNutritionists.find(nutritionist => nutritionist.userId === userId);

export const getAppointmentsByNutritionist = (nutritionistId: string): Appointment[] => 
  mockAppointments.filter(appointment => appointment.nutritionistId === nutritionistId);

export const getAppointmentsByClient = (clientId: string): Appointment[] => 
  mockAppointments.filter(appointment => appointment.clientId === clientId);

export const getBlogPostsByAuthor = (authorId: string): BlogPost[] => 
  mockBlogPosts.filter(post => post.authorId === authorId && post.isPublished);

export const getProductsByNutritionist = (nutritionistId: string): Product[] => 
  mockProducts.filter(product => product.nutritionistId === nutritionistId);