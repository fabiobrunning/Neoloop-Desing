import React from 'react';
import { ViewType } from '../src/types/design-system';
import type { ColorToken } from '../src/types/design-system';
import ButtonShowcase from './ButtonShowcase';
import FormShowcase from './FormShowcase';
import CardShowcase from './CardShowcase';

interface UIComponentsViewProps {
  type: ViewType;
  colors: ColorToken[];
}

const UIComponentsView: React.FC<UIComponentsViewProps> = ({ type, colors }) => {
  // BUTTONS VIEW - Using new ButtonShowcase component
  if (type === ViewType.UI_BUTTONS) {
    return <ButtonShowcase colors={colors} />;
  }

  // CARDS VIEW - Using new CardShowcase component
  if (type === ViewType.UI_CARDS) {
    return <CardShowcase colors={colors} />;
  }

  // FORMS VIEW - Using new FormShowcase component
  if (type === ViewType.UI_FORMS) {
    return <FormShowcase colors={colors} />;
  }

  return null;
};

export default UIComponentsView;
