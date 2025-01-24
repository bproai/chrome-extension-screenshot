import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Card, CardContent } from './ui/card';

function TranscriptionViewer() {
  const [transcriptions, setTranscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTranscriptions();
  }, []);

  const fetchTranscriptions = async () => {
    try {
      const response = await fetch('http://localhost:3002/transcribed-images');
      const data = await response.json();
      if (data.success) {
        setTranscriptions(data.images);
      } else {
        setError('Failed to fetch transcriptions');
      }
    } catch (err) {
      setError('Error connecting to server');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const components = {
    h1: (props) => (
      <h1 {...props} className="text-3xl font-bold mt-6 mb-4" />
    ),
    h2: (props) => (
      <h2 {...props} className="text-2xl font-bold mt-6 mb-3" />
    ),
    p: (props) => (
      <p {...props} className="my-2" />
    ),
    code: ({ inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '');
      return inline ? (
        <code {...props} className="font-mono text-sm bg-gray-100 rounded px-1 text-gray-800">
          {children}
        </code>
      ) : (
        <code {...props} className="font-mono text-sm block text-gray-800">
          {children}
        </code>
      );
    },
    pre: ({ children, ...props }) => (
      <pre {...props} className="bg-gray-50 rounded-lg p-4 my-4 overflow-x-auto text-gray-800">
        {children}
      </pre>
    ),
    ol: ({ ordered, children, ...props }) => (
      <ol {...props} className="list-decimal ml-6 my-2">
        {children}
      </ol>
    ),
    ul: ({ ordered, children, ...props }) => (
      <ul {...props} className="list-disc ml-6 my-2">
        {children}
      </ul>
    )
  };

  const renderContent = (content) => {
    if (!content) return null;
    
    try {
      return (
        <ReactMarkdown 
          components={components}
          className="prose max-w-none"
        >
          {content}
        </ReactMarkdown>
      );
    } catch (err) {
      console.error('Markdown rendering error:', err);
      return <div className="text-red-500">Error rendering markdown: {err.message}</div>;
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading transcriptions...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Transcriptions</h1>
      {transcriptions.length === 0 ? (
        <div className="text-center p-4">No transcriptions found</div>
      ) : (
        transcriptions.map((doc) => (
          <Card key={doc._id} className="w-full max-w-3xl mx-auto mb-6">
            <CardContent className="p-6">
              <div className="mb-4 text-sm text-gray-500">
                Object Key: {doc.objectKey}
                <br />
                Created: {new Date(doc.createdAt).toLocaleString()}
              </div>
              {renderContent(doc.transcription)}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}

export default TranscriptionViewer;