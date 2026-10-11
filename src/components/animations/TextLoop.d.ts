import type { ReactElement } from 'react';

export interface TextLoopProps {
  text?: string;
  speed?: number;
  separator?: string;
  color?: string;
  ribbonColor?: string;
}

declare function TextLoop(props: TextLoopProps): ReactElement;
export default TextLoop;
