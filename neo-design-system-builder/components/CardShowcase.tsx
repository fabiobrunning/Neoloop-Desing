import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardImage,
  StatCard,
  ProductCard,
  ProfileCard,
  CardLayout,
  CardVariant,
  CardShadow,
  CardRadius,
} from './Card';
import { Button, IconButton } from './Button';
import {
  Star, Heart, Share2, MoreHorizontal, TrendingUp, TrendingDown,
  Users, DollarSign, Activity, ShoppingCart, ArrowRight,
  Settings, Bell, Mail, Calendar, MapPin, Phone, Globe,
  Bookmark, MessageSquare, Eye, Download, Edit, Trash2,
  Play, Pause, SkipForward, Volume2, Zap, Shield, Rocket,
  CheckCircle2, XCircle, Clock, AlertTriangle
} from 'lucide-react';
import type { ColorToken } from '../src/types/design-system';

// ============================================================================
// TYPES
// ============================================================================

interface CardShowcaseProps {
  colors: ColorToken[];
}

// ============================================================================
// SECTION COMPONENT
// ============================================================================

interface SectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, description, children }) => (
  <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
    <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
    {description && (
      <p className="text-sm text-slate-500 mb-6">{description}</p>
    )}
    {children}
  </div>
);

// ============================================================================
// CARD SHOWCASE COMPONENT
// ============================================================================

const CardShowcase: React.FC<CardShowcaseProps> = ({ colors }) => {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  // Get colors from design system
  const primaryColor = colors.find(c => c.id === 'p-500')?.hex || '#2b4bee';
  const successColor = colors.find(c => c.id === 's-500')?.hex || '#22c55e';
  const warningColor = colors.find(c => c.id === 'w-500')?.hex || '#f59e0b';
  const dangerColor = colors.find(c => c.id === 'e-500')?.hex || '#ef4444';

  const toggleFavorite = (id: string) => {
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const layouts: CardLayout[] = ['simple', 'with-header', 'with-footer', 'with-image', 'horizontal'];
  const variants: CardVariant[] = ['default', 'primary', 'secondary', 'success', 'warning', 'danger', 'gradient'];
  const shadows: CardShadow[] = ['none', 'sm', 'md', 'lg', 'xl', '2xl'];
  const radii: CardRadius[] = ['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'];

  return (
    <div className="grid grid-cols-1 gap-6">
      {/* ================================================================== */}
      {/* LAYOUTS */}
      {/* ================================================================== */}
      <Section
        title="Card Layouts"
        description="Different card structures for various content needs."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Simple Layout */}
          <Card layout="simple">
            <CardContent>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Simple Card</h4>
              <p className="text-sm text-slate-500">
                A basic card with just content. Perfect for simple information display.
              </p>
            </CardContent>
          </Card>

          {/* With Header Layout */}
          <Card layout="with-header">
            <CardHeader
              title="With Header"
              subtitle="Includes title and action"
              icon={Star}
              iconBg="bg-amber-100"
              iconColor="text-amber-600"
              action={
                <IconButton icon={MoreHorizontal} aria-label="More options" variant="ghost" size="sm" />
              }
            />
            <CardContent>
              <p className="text-sm text-slate-500">
                Card with a structured header containing icon, title, subtitle and action.
              </p>
            </CardContent>
          </Card>

          {/* With Footer Layout */}
          <Card layout="with-footer">
            <CardContent>
              <h4 className="text-lg font-bold text-slate-900 mb-2">With Footer</h4>
              <p className="text-sm text-slate-500">
                Card with action buttons in the footer area.
              </p>
            </CardContent>
            <CardFooter divider align="between">
              <Button variant="ghost" size="sm">Cancel</Button>
              <Button variant="primary" size="sm" primaryColor={primaryColor}>Save</Button>
            </CardFooter>
          </Card>

          {/* With Image Layout */}
          <Card layout="with-image" padding="none" className="overflow-hidden">
            <CardImage
              src="https://picsum.photos/seed/card1/400/200"
              alt="Card image"
              height="md"
              hoverZoom
            />
            <div className="p-6">
              <h4 className="text-lg font-bold text-slate-900 mb-2">With Image</h4>
              <p className="text-sm text-slate-500">
                Card featuring an image with hover zoom effect.
              </p>
            </div>
          </Card>

          {/* With Image and Overlay */}
          <Card layout="with-image" padding="none" className="overflow-hidden">
            <CardImage
              src="https://picsum.photos/seed/card2/400/300"
              alt="Card with overlay"
              height="lg"
              overlay
              hoverZoom
              overlayContent={
                <div className="text-white">
                  <h4 className="text-xl font-bold mb-1">Image Overlay</h4>
                  <p className="text-sm text-white/80">Content over the image</p>
                </div>
              }
            />
          </Card>

          {/* Complete Card */}
          <Card layout="with-image" padding="none" className="overflow-hidden">
            <CardImage
              src="https://picsum.photos/seed/card3/400/150"
              alt="Complete card"
              height="sm"
              hoverZoom
            />
            <div className="p-6">
              <CardHeader
                title="Complete Card"
                subtitle="All elements combined"
                icon={Rocket}
                iconBg="bg-purple-100"
                iconColor="text-purple-600"
              />
              <CardContent className="text-sm">
                This card combines image, header, content, and footer into one cohesive component.
              </CardContent>
              <CardFooter align="right">
                <Button variant="outline" size="sm" iconLeft={Share2}>Share</Button>
                <Button variant="primary" size="sm" primaryColor={primaryColor} iconRight={ArrowRight}>
                  Learn More
                </Button>
              </CardFooter>
            </div>
          </Card>
        </div>
      </Section>

      {/* ================================================================== */}
      {/* VARIANTS */}
      {/* ================================================================== */}
      <Section
        title="Card Variants"
        description="Different color schemes for various contexts and states."
      >
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {variants.map((variant) => (
            <Card
              key={variant}
              variant={variant}
              primaryColor={variant === 'gradient' ? primaryColor : undefined}
              className="text-center"
            >
              <p className={`font-bold ${variant === 'gradient' ? 'text-white' : 'text-slate-900'}`}>
                {variant.charAt(0).toUpperCase() + variant.slice(1)}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      {/* ================================================================== */}
      {/* SHADOWS / ELEVATIONS */}
      {/* ================================================================== */}
      <Section
        title="Shadow Elevations"
        description="Different shadow depths for visual hierarchy."
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {shadows.map((shadow) => (
            <Card key={shadow} shadow={shadow} border="none" className="text-center">
              <p className="font-bold text-slate-900">{shadow}</p>
              <p className="text-xs text-slate-500 mt-1">shadow-{shadow}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* ================================================================== */}
      {/* BORDER RADIUS */}
      {/* ================================================================== */}
      <Section
        title="Border Radius Options"
        description="Different corner styles from sharp to rounded."
      >
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {radii.map((radius) => (
            <Card key={radius} radius={radius} className="text-center">
              <p className="font-bold text-slate-900">{radius}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* ================================================================== */}
      {/* HOVER & INTERACTIVE */}
      {/* ================================================================== */}
      <Section
        title="Hover & Interactive Cards"
        description="Cards with hover effects and click interactions."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Hover Effect */}
          <Card hover shadow="md">
            <CardHeader
              title="Hover Effect"
              subtitle="Elevates on hover"
              icon={TrendingUp}
              iconBg="bg-green-100"
              iconColor="text-green-600"
            />
            <CardContent className="text-sm">
              This card lifts up and increases shadow when hovered.
            </CardContent>
          </Card>

          {/* Interactive/Clickable */}
          <Card
            interactive
            hover
            shadow="md"
            onClick={() => alert('Card clicked!')}
          >
            <CardHeader
              title="Interactive Card"
              subtitle="Click anywhere"
              icon={Zap}
              iconBg="bg-amber-100"
              iconColor="text-amber-600"
            />
            <CardContent className="text-sm">
              This entire card is clickable. Try clicking anywhere!
            </CardContent>
          </Card>

          {/* Combined Effects */}
          <Card
            hover
            shadow="lg"
            variant="gradient"
            primaryColor={primaryColor}
          >
            <CardHeader
              title="Gradient + Hover"
              subtitle="Premium feel"
              icon={Shield}
              iconBg="bg-white/20"
              iconColor="text-white"
            />
            <CardContent className="text-sm text-white/80">
              Gradient background with hover elevation effect.
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* ================================================================== */}
      {/* STAT CARDS */}
      {/* ================================================================== */}
      <Section
        title="Stat Cards"
        description="Display metrics and KPIs with the StatCard component."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            label="Total Users"
            value="24.5K"
            change="+12% this month"
            positive
            icon={Users}
            iconBg="bg-blue-100"
            iconColor="text-blue-600"
            hover
          />
          <StatCard
            label="Revenue"
            value="$128K"
            change="+8% this month"
            positive
            icon={DollarSign}
            iconBg="bg-green-100"
            iconColor="text-green-600"
            hover
          />
          <StatCard
            label="Active Now"
            value="1.2K"
            change="Real-time"
            positive
            icon={Activity}
            iconBg="bg-purple-100"
            iconColor="text-purple-600"
            hover
          />
          <StatCard
            label="Conversion"
            value="3.2%"
            change="-2% this month"
            positive={false}
            icon={TrendingDown}
            iconBg="bg-red-100"
            iconColor="text-red-600"
            hover
          />
        </div>
      </Section>

      {/* ================================================================== */}
      {/* PRODUCT CARDS */}
      {/* ================================================================== */}
      <Section
        title="Product Cards"
        description="E-commerce ready product cards with all essential features."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { id: '1', name: 'Wireless Headphones', category: 'Electronics', price: 299, originalPrice: 399, rating: 4 },
            { id: '2', name: 'Smart Watch Pro', category: 'Wearables', price: 199, rating: 5 },
            { id: '3', name: 'Premium Backpack', category: 'Accessories', price: 89, originalPrice: 129, rating: 4 },
            { id: '4', name: 'Designer Sunglasses', category: 'Fashion', price: 159, rating: 3 },
          ].map((product) => (
            <ProductCard
              key={product.id}
              image={`https://picsum.photos/seed/product${product.id}/300/300`}
              name={product.name}
              category={product.category}
              price={product.price}
              originalPrice={product.originalPrice}
              rating={product.rating}
              isFavorite={favorites[product.id]}
              onFavoriteClick={() => toggleFavorite(product.id)}
              onAddToCartClick={() => alert(`Added ${product.name} to cart!`)}
              buttonColor={primaryColor}
            />
          ))}
        </div>
      </Section>

      {/* ================================================================== */}
      {/* PROFILE CARDS */}
      {/* ================================================================== */}
      <Section
        title="Profile Cards"
        description="Display user profiles with actions."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { id: '1', name: 'Sarah Johnson', role: 'Product Designer', bio: 'Creating beautiful user experiences.' },
            { id: '2', name: 'Mike Chen', role: 'Software Engineer', bio: 'Building scalable applications.' },
            { id: '3', name: 'Emma Wilson', role: 'Marketing Lead', bio: 'Driving growth through data.' },
          ].map((user) => (
            <ProfileCard
              key={user.id}
              image={`https://picsum.photos/seed/user${user.id}/100/100`}
              name={user.name}
              role={user.role}
              bio={user.bio}
              hover
              primaryAction={
                <Button variant="primary" size="sm" primaryColor={primaryColor}>Follow</Button>
              }
              secondaryAction={
                <Button variant="secondary" size="sm">Message</Button>
              }
            />
          ))}
        </div>
      </Section>

      {/* ================================================================== */}
      {/* FEATURE CARDS */}
      {/* ================================================================== */}
      <Section
        title="Feature Cards"
        description="Highlight features and benefits."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card hover shadow="md">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-4">
              <Rocket size={28} className="text-white" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-2">Fast Performance</h4>
            <p className="text-sm text-slate-500 leading-relaxed">
              Optimized for speed with lazy loading and efficient rendering for the best user experience.
            </p>
          </Card>

          <Card hover shadow="md">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mb-4">
              <Shield size={28} className="text-white" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-2">Secure by Default</h4>
            <p className="text-sm text-slate-500 leading-relaxed">
              Enterprise-grade security with encryption at rest and in transit. Your data is safe.
            </p>
          </Card>

          <Card hover shadow="md">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mb-4">
              <Zap size={28} className="text-white" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-2">Easy Integration</h4>
            <p className="text-sm text-slate-500 leading-relaxed">
              Connect with your favorite tools in minutes with our extensive API and webhooks.
            </p>
          </Card>
        </div>
      </Section>

      {/* ================================================================== */}
      {/* STATUS CARDS */}
      {/* ================================================================== */}
      <Section
        title="Status Cards"
        description="Display different states and alerts."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card variant="success" border="md">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="text-green-600 flex-shrink-0" size={20} />
              <div>
                <h5 className="font-bold text-green-800">Success</h5>
                <p className="text-sm text-green-700">Operation completed successfully.</p>
              </div>
            </div>
          </Card>

          <Card variant="warning" border="md">
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-amber-600 flex-shrink-0" size={20} />
              <div>
                <h5 className="font-bold text-amber-800">Warning</h5>
                <p className="text-sm text-amber-700">Please review before continuing.</p>
              </div>
            </div>
          </Card>

          <Card variant="danger" border="md">
            <div className="flex items-start gap-3">
              <XCircle className="text-red-600 flex-shrink-0" size={20} />
              <div>
                <h5 className="font-bold text-red-800">Error</h5>
                <p className="text-sm text-red-700">Something went wrong.</p>
              </div>
            </div>
          </Card>

          <Card variant="primary" border="md">
            <div className="flex items-start gap-3">
              <Clock className="text-blue-600 flex-shrink-0" size={20} />
              <div>
                <h5 className="font-bold text-blue-800">Info</h5>
                <p className="text-sm text-blue-700">Process is running.</p>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* ================================================================== */}
      {/* MEDIA CARDS */}
      {/* ================================================================== */}
      <Section
        title="Media Cards"
        description="Audio, video and content cards."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Music Player Card */}
          <Card shadow="lg" padding="none" className="overflow-hidden">
            <div className="flex">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                <Play size={40} className="text-white" />
              </div>
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <h5 className="font-bold text-slate-900">Now Playing</h5>
                  <p className="text-sm text-slate-500">Artist Name - Song Title</p>
                </div>
                <div className="flex items-center gap-3">
                  <IconButton icon={SkipForward} aria-label="Previous" variant="ghost" size="sm" className="rotate-180" />
                  <IconButton icon={Pause} aria-label="Play/Pause" variant="primary" size="sm" primaryColor={primaryColor} />
                  <IconButton icon={SkipForward} aria-label="Next" variant="ghost" size="sm" />
                  <IconButton icon={Volume2} aria-label="Volume" variant="ghost" size="sm" />
                </div>
              </div>
            </div>
          </Card>

          {/* Video Thumbnail Card */}
          <Card shadow="lg" padding="none" className="overflow-hidden">
            <div className="relative">
              <img
                src="https://picsum.photos/seed/video/600/300"
                alt="Video thumbnail"
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <button className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors">
                  <Play size={28} className="text-slate-900 ml-1" />
                </button>
              </div>
              <span className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 text-white text-xs rounded">
                12:34
              </span>
            </div>
            <div className="p-4">
              <h5 className="font-bold text-slate-900 mb-1">Video Tutorial: Getting Started</h5>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1">
                  <Eye size={14} /> 24.5K views
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={14} /> 2 days ago
                </span>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* ================================================================== */}
      {/* PRICING CARDS */}
      {/* ================================================================== */}
      <Section
        title="Pricing Cards"
        description="Subscription and pricing tier displays."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Basic */}
          <Card hover shadow="md" className="relative">
            <h4 className="text-xl font-bold text-slate-900 mb-2">Basic</h4>
            <p className="text-sm text-slate-500 mb-4">For individuals</p>
            <div className="mb-6">
              <span className="text-4xl font-black text-slate-900">$9</span>
              <span className="text-slate-500">/month</span>
            </div>
            <ul className="space-y-3 mb-6">
              {['5 Projects', '10GB Storage', 'Email Support'].map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle2 size={16} className="text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button variant="outline" fullWidth>Get Started</Button>
          </Card>

          {/* Pro (Featured) */}
          <Card
            variant="gradient"
            primaryColor={primaryColor}
            shadow="xl"
            className="relative"
          >
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-amber-400 text-amber-900 text-xs font-bold rounded-full">
              MOST POPULAR
            </span>
            <h4 className="text-xl font-bold text-white mb-2">Pro</h4>
            <p className="text-sm text-white/70 mb-4">For teams</p>
            <div className="mb-6">
              <span className="text-4xl font-black text-white">$29</span>
              <span className="text-white/70">/month</span>
            </div>
            <ul className="space-y-3 mb-6">
              {['Unlimited Projects', '100GB Storage', 'Priority Support', 'Analytics'].map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm text-white/90">
                  <CheckCircle2 size={16} className="text-white" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button variant="secondary" fullWidth className="bg-white hover:bg-white/90 text-slate-900">
              Get Started
            </Button>
          </Card>

          {/* Enterprise */}
          <Card hover shadow="md" className="relative">
            <h4 className="text-xl font-bold text-slate-900 mb-2">Enterprise</h4>
            <p className="text-sm text-slate-500 mb-4">For organizations</p>
            <div className="mb-6">
              <span className="text-4xl font-black text-slate-900">$99</span>
              <span className="text-slate-500">/month</span>
            </div>
            <ul className="space-y-3 mb-6">
              {['Everything in Pro', 'Unlimited Storage', '24/7 Support', 'Custom Integration', 'SLA'].map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle2 size={16} className="text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button variant="primary" fullWidth primaryColor={primaryColor}>Contact Sales</Button>
          </Card>
        </div>
      </Section>

      {/* ================================================================== */}
      {/* API REFERENCE */}
      {/* ================================================================== */}
      <Section
        title="Component API"
        description="Quick reference for Card component props."
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 font-bold text-slate-900">Prop</th>
                <th className="text-left py-3 px-4 font-bold text-slate-900">Type</th>
                <th className="text-left py-3 px-4 font-bold text-slate-900">Default</th>
                <th className="text-left py-3 px-4 font-bold text-slate-900">Description</th>
              </tr>
            </thead>
            <tbody className="text-slate-600">
              <tr className="border-b border-slate-100">
                <td className="py-3 px-4 font-mono text-blue-600">layout</td>
                <td className="py-3 px-4 font-mono text-xs">'simple' | 'with-header' | 'with-footer' | 'with-image' | 'horizontal'</td>
                <td className="py-3 px-4 font-mono">'simple'</td>
                <td className="py-3 px-4">Card structure layout</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-3 px-4 font-mono text-blue-600">variant</td>
                <td className="py-3 px-4 font-mono text-xs">'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'gradient'</td>
                <td className="py-3 px-4 font-mono">'default'</td>
                <td className="py-3 px-4">Visual color variant</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-3 px-4 font-mono text-blue-600">shadow</td>
                <td className="py-3 px-4 font-mono text-xs">'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'</td>
                <td className="py-3 px-4 font-mono">'sm'</td>
                <td className="py-3 px-4">Shadow elevation</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-3 px-4 font-mono text-blue-600">border</td>
                <td className="py-3 px-4 font-mono text-xs">'none' | 'sm' | 'md' | 'lg'</td>
                <td className="py-3 px-4 font-mono">'sm'</td>
                <td className="py-3 px-4">Border width</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-3 px-4 font-mono text-blue-600">radius</td>
                <td className="py-3 px-4 font-mono text-xs">'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'</td>
                <td className="py-3 px-4 font-mono">'2xl'</td>
                <td className="py-3 px-4">Border radius</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-3 px-4 font-mono text-blue-600">hover</td>
                <td className="py-3 px-4 font-mono text-xs">boolean</td>
                <td className="py-3 px-4 font-mono">false</td>
                <td className="py-3 px-4">Enable hover effect</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-3 px-4 font-mono text-blue-600">interactive</td>
                <td className="py-3 px-4 font-mono text-xs">boolean</td>
                <td className="py-3 px-4 font-mono">false</td>
                <td className="py-3 px-4">Make card clickable</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-3 px-4 font-mono text-blue-600">fullHeight</td>
                <td className="py-3 px-4 font-mono text-xs">boolean</td>
                <td className="py-3 px-4 font-mono">false</td>
                <td className="py-3 px-4">Fill container height</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-3 px-4 font-mono text-blue-600">padding</td>
                <td className="py-3 px-4 font-mono text-xs">'none' | 'sm' | 'md' | 'lg' | 'xl'</td>
                <td className="py-3 px-4 font-mono">'md'</td>
                <td className="py-3 px-4">Internal padding</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-blue-600">primaryColor</td>
                <td className="py-3 px-4 font-mono text-xs">string (hex)</td>
                <td className="py-3 px-4 font-mono">-</td>
                <td className="py-3 px-4">Custom gradient color</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Sub-components */}
        <div className="mt-8">
          <h4 className="text-lg font-bold text-slate-900 mb-4">Sub-components</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl">
              <h5 className="font-bold text-slate-900 mb-2">CardHeader</h5>
              <p className="text-sm text-slate-600">title, subtitle, icon, iconBg, iconColor, action, divider</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <h5 className="font-bold text-slate-900 mb-2">CardContent</h5>
              <p className="text-sm text-slate-600">children, className</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <h5 className="font-bold text-slate-900 mb-2">CardFooter</h5>
              <p className="text-sm text-slate-600">children, align, divider</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <h5 className="font-bold text-slate-900 mb-2">CardImage</h5>
              <p className="text-sm text-slate-600">src, alt, height, overlay, overlayContent, hoverZoom</p>
            </div>
          </div>
        </div>

        {/* Convenience Components */}
        <div className="mt-8">
          <h4 className="text-lg font-bold text-slate-900 mb-4">Convenience Components</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl">
              <h5 className="font-bold text-slate-900 mb-2">StatCard</h5>
              <p className="text-sm text-slate-600">label, value, change, positive, icon</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <h5 className="font-bold text-slate-900 mb-2">ProductCard</h5>
              <p className="text-sm text-slate-600">image, name, category, price, rating, onFavoriteClick, onAddToCartClick</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <h5 className="font-bold text-slate-900 mb-2">ProfileCard</h5>
              <p className="text-sm text-slate-600">image, name, role, bio, primaryAction, secondaryAction</p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default CardShowcase;
