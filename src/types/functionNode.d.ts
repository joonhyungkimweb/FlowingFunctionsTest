import { ComponentType, MutableRefObject } from 'react';

type CustomScript = (string) => string;

interface FunctionNodeComponentProps {
  runner: MutableRefObject<componentRunner>;
  id: string;
}

interface FunctionNodeProps<p extends FunctionNodeComponentProps> {
  Component?: ComponentType<p> | null;
  nodeOptions?: {
    input: boolean;
    output: boolean;
  };
}

interface RendererNode<p extends FunctionNodeComponentProps> {
  nodeOptions?: {
    input: boolean;
  };
}

export {
  CustomScript,
  FunctionNodeProps,
  FunctionNodeComponentProps,
  RendererNode,
};
