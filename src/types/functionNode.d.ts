import { ComponentType, MutableRefObject } from 'react';

type componentRunner = (input: any) => any;

interface FunctionNodeComponentProps {
  runner: MutableRefObject<componentRunner>;
}

interface FunctionNodeProps<p extends FunctionNodeComponentProps> {
  Component?: ComponentType<p> | null;
  nodeOptions?: {
    input: boolean;
    output: boolean;
  };
}

export { componentRunner, FunctionNodeProps, FunctionNodeComponentProps };
