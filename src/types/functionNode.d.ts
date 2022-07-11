import { ComponentType, MutableRefObject } from 'react';

type componentRunner = (input: any) => any;

interface FunctionNodeComponentProps {
  runner: MutableRefObject<componentRunner>;
}

interface FunctionNodeProps {
  Component?: ComponentType<FunctionNodeComponentProps> | null;
  nodeOptions?: {
    input: boolean;
    output: boolean;
  };
}

export { componentRunner, FunctionNodeProps, FunctionNodeComponentProps };
