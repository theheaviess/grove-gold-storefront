import type { ReactElement } from 'react';

// A toggle sends the new boolean value to its parent component.
export interface BellToggleProps {
  offLabel?: string;
  onLabel?: string;
  onChange?: (pressed: boolean) => void;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

declare function BellToggle(props: BellToggleProps): ReactElement;
export default BellToggle;
