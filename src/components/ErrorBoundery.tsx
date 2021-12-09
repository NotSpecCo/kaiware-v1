import React from 'react';

// for reference see https://reactjs.org/docs/error-boundaries.html

export class ErrorBoundary extends React.Component {
  state: { hasError: boolean; error: null | string };
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error(error, errorInfo);
    this.setState({ error: JSON.stringify({ error, errorInfo }, null, 4) });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <h1>Something went wrong.</h1>
          <code>
            <pre>{this.state.error}</pre>
          </code>
        </div>
      );
    }
    return this.props.children;
  }
}
