import React, { lazy, Suspense } from 'react';
import { Zap } from 'lucide-react';
import { ViewType, DesignSystem } from '../src/types/design-system';

// Regular imports for lightweight components (< 5KB)
import ColorTokensView from './ColorTokensView';
import TypographyView from './TypographyView';
import TypographyValidatorView from './TypographyValidatorView';
import SpacingView from './SpacingView';
import SpacingValidatorView from './SpacingValidatorView';
import ShadowsView from './ShadowsView';
import BorderRadiusView from './BorderRadiusView';
import BreakpointsView from './BreakpointsView';
import ContrastCheckerView from './ContrastCheckerView';
import LoadingSpinner from './LoadingSpinner';

// Lazy-loaded heavy components (> 10KB or with large dependencies)
const IconsView = lazy(() => import('./IconsView'));
const CustomIconsView = lazy(() => import('./CustomIconsView'));
const IconsLibraryView = lazy(() => import('./IconsLibraryView'));
const SocialLogosView = lazy(() => import('./SocialLogosView'));
const PaymentMethodsView = lazy(() => import('./PaymentMethodsView'));
const ChartsView = lazy(() => import('./ChartsView'));
const ChartsLibraryView = lazy(() => import('./ChartsLibraryView'));
const BackgroundsView = lazy(() => import('./BackgroundsView'));
const AnimationsView = lazy(() => import('./AnimationsView'));
const UIComponentsView = lazy(() => import('./UIComponentsView'));

// Loading messages for lazy-loaded components
const getLoadingMessage = (view: ViewType): string => {
  const messages: Partial<Record<ViewType, string>> = {
    [ViewType.ICONS]: 'Carregando 1.500+ icones Lucide...',
    [ViewType.ICONS_LIBRARY]: 'Carregando biblioteca de 3.820 icones...',
    [ViewType.ICONS_CUSTOM]: 'Carregando icones customizados...',
    [ViewType.CHARTS]: 'Carregando Chart Builder...',
    [ViewType.CHARTS_LIBRARY]: 'Carregando biblioteca de graficos...',
    [ViewType.BACKGROUNDS]: 'Carregando backgrounds...',
    [ViewType.ANIMATIONS]: 'Carregando animacoes...',
    [ViewType.SOCIAL_LOGOS]: 'Carregando logos sociais...',
    [ViewType.PAYMENT_METHODS]: 'Carregando metodos de pagamento...',
    [ViewType.UI_BUTTONS]: 'Carregando componentes de botoes...',
    [ViewType.UI_CARDS]: 'Carregando componentes de cards...',
    [ViewType.UI_FORMS]: 'Carregando componentes de formularios...',
  };
  return messages[view] || 'Carregando...';
};

interface ViewsContainerProps {
  currentView: ViewType;
  designSystem: DesignSystem;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

const ViewsContainer: React.FC<ViewsContainerProps> = ({
  currentView,
  designSystem,
  selectedId,
  onSelect,
}) => {
  switch (currentView) {
    // Lightweight components - no lazy loading needed
    case ViewType.COLOR_TOKENS:
      return <ColorTokensView colors={designSystem.colors} selectedId={selectedId} onSelect={onSelect} />;
    case ViewType.TYPOGRAPHY:
      return <TypographyView tokens={designSystem.typography} />;
    case ViewType.TYPOGRAPHY_VALIDATOR:
      return <TypographyValidatorView tokens={designSystem.typography} />;
    case ViewType.SPACING:
      return <SpacingView tokens={designSystem.spacing} />;
    case ViewType.SPACING_VALIDATOR:
      return <SpacingValidatorView tokens={designSystem.spacing} />;
    case ViewType.ELEVATIONS:
      return <ShadowsView tokens={designSystem.shadows || []} />;
    case ViewType.BORDER_RADIUS:
      return <BorderRadiusView radii={designSystem.borderRadius} />;
    case ViewType.BREAKPOINTS:
      return <BreakpointsView breakpoints={designSystem.breakpoints} />;
    case ViewType.CONTRAST_CHECKER:
      return <ContrastCheckerView />;

    // Heavy components - lazy loaded with Suspense
    case ViewType.ICONS:
      return (
        <Suspense fallback={<LoadingSpinner message={getLoadingMessage(ViewType.ICONS)} />}>
          <IconsView />
        </Suspense>
      );
    case ViewType.ICONS_CUSTOM:
      return (
        <Suspense fallback={<LoadingSpinner message={getLoadingMessage(ViewType.ICONS_CUSTOM)} />}>
          <CustomIconsView />
        </Suspense>
      );
    case ViewType.ICONS_LIBRARY:
      return (
        <Suspense fallback={<LoadingSpinner message={getLoadingMessage(ViewType.ICONS_LIBRARY)} />}>
          <IconsLibraryView />
        </Suspense>
      );
    case ViewType.SOCIAL_LOGOS:
      return (
        <Suspense fallback={<LoadingSpinner message={getLoadingMessage(ViewType.SOCIAL_LOGOS)} />}>
          <SocialLogosView />
        </Suspense>
      );
    case ViewType.PAYMENT_METHODS:
      return (
        <Suspense fallback={<LoadingSpinner message={getLoadingMessage(ViewType.PAYMENT_METHODS)} />}>
          <PaymentMethodsView />
        </Suspense>
      );
    case ViewType.CHARTS:
      return (
        <Suspense fallback={<LoadingSpinner message={getLoadingMessage(ViewType.CHARTS)} />}>
          <ChartsView />
        </Suspense>
      );
    case ViewType.CHARTS_LIBRARY:
      return (
        <Suspense fallback={<LoadingSpinner message={getLoadingMessage(ViewType.CHARTS_LIBRARY)} />}>
          <ChartsLibraryView />
        </Suspense>
      );
    case ViewType.BACKGROUNDS:
      return (
        <Suspense fallback={<LoadingSpinner message={getLoadingMessage(ViewType.BACKGROUNDS)} />}>
          <BackgroundsView />
        </Suspense>
      );
    case ViewType.ANIMATIONS:
      return (
        <Suspense fallback={<LoadingSpinner message={getLoadingMessage(ViewType.ANIMATIONS)} />}>
          <AnimationsView />
        </Suspense>
      );
    case ViewType.UI_BUTTONS:
    case ViewType.UI_CARDS:
    case ViewType.UI_FORMS:
      return (
        <Suspense fallback={<LoadingSpinner message={getLoadingMessage(currentView)} />}>
          <UIComponentsView type={currentView} colors={designSystem.colors} />
        </Suspense>
      );
    default:
      return (
        <div className="flex flex-col items-center justify-center h-96 border-2 border-dashed border-slate-200 rounded-3xl bg-white/50">
          <Zap className="text-blue-200 mb-4" size={48} />
          <h3 className="text-slate-900 font-bold text-xl">Em Construcao</h3>
          <p className="text-slate-500 text-sm">A visualizacao para {currentView} esta sendo preparada.</p>
        </div>
      );
  }
};

export default ViewsContainer;
