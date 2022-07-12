import { NodeProps } from 'react-flow-renderer';
import '../../styles/css/documentNode.css';

const DocumentNode = ({ id }: NodeProps) => {
  return (
    <>
      <div className="function-node">
        <div id={id}></div>
      </div>
    </>
  );
};

export default DocumentNode;
