import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownComponentProps {
  children: React.ReactNode; // Explicitly type 'children' as React.ReactNode
}

const MarkdownComponent: React.FC<MarkdownComponentProps> = ({ children }) => {
  // Convert the children (React elements) to markdown text strings
  const markdownText = React.Children.map(children, (child) => {
    if (typeof child === 'string') {
      return child; // If the child is a string, return it directly
    }

    // Ensure the child is a ReactElement before accessing its props
    if (React.isValidElement(child)) {
      // TypeScript now knows that 'child' is a ReactElement
      const reactChild = child as React.ReactElement<React.PropsWithChildren<object>>;
      return reactChild.props.children; // Access the 'children' prop of the React element
    }

    return ''; // Return an empty string if the child isn't a valid React element or string
  })?.join('\n\n');

  return <ReactMarkdown>{markdownText}</ReactMarkdown>;
};

export default MarkdownComponent;