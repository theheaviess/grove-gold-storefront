import type { ReactElement } from 'react';

export interface AuroraProps {
  colorStops?: string[];
  amplitude?: number;
  blend?: number;
  speed?: number;
}

declare function Aurora(props: AuroraProps): ReactElement;
export default Aurora;
