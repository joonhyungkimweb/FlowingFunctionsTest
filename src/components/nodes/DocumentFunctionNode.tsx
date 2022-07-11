import { useEffect } from 'react';
import { FunctionNodeComponentProps } from '../../types/functionNode';

const DocumentFunctionNode = ({ runner, id }: FunctionNodeComponentProps) => {
  const docId = `document-comp-${id}`;
  useEffect(() => {
    runner.current = (script: string) => `
        const root = document.getElementById('${docId}');
        const doc = document.createDocumentFragment();
        try {
          ${script}
        } finally {
          root.innerHTML = '';
          root.appendChild(doc);
          console.log('ended');
        }`;
  }, []);

  return <div id={docId}></div>;
};

export default DocumentFunctionNode;
