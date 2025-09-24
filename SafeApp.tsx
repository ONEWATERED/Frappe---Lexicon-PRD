





import React, { Suspense } from 'react';

const App = React.lazy(() => import('./App'));

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  // FIX: Converted to an arrow function to ensure `this` is correctly bound, fixing an issue where `this.setState` was not found.
  componentDidCatch = (error: Error, errorInfo: React.ErrorInfo) => {
    // We can also log the error to an error reporting service.
    // Here we'll just update state with more details.
    this.setState({ error, errorInfo });
    console.error("Uncaught error:", error, errorInfo);
  }

  // FIX: Converted to an arrow function to ensure `this` is correctly bound, fixing an issue where `this.props` was not found.
  render = () => {
    if (this.state.hasError) {
      // Render fallback UI
      return <DiagnosticsOverlay error={this.state.error} errorInfo={this.state.errorInfo} />;
    }

    return this.props.children;
  }
}

const DiagnosticsOverlay: React.FC<{ error?: Error; errorInfo?: React.ErrorInfo }> = ({ error, errorInfo }) => (
    <div className="fixed inset-0 bg-red-900/90 text-white p-8 overflow-auto z-50">
      <h1 className="text-3xl font-bold mb-4">Something went wrong.</h1>
      <p className="mb-4">An error occurred in the application. Please check the details below.</p>
      <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm">
        <h2 className="text-xl font-semibold mb-2 text-red-400">Error Details:</h2>
        <pre className="whitespace-pre-wrap">
          {error?.toString()}
        </pre>
        <h2 className="text-xl font-semibold mt-4 mb-2 text-red-400">Component Stack:</h2>
        <pre className="whitespace-pre-wrap">
          {errorInfo?.componentStack}
        </pre>
      </div>
    </div>
);


const BootScreen: React.FC<{ message: string }> = ({ message }) => (
  <div className="bg-blue-600 text-white text-center p-2 text-sm font-semibold">
    {message}
  </div>
);

const SafeApp: React.FC = () => {
  return (
    <ErrorBoundary>
      <BootScreen message="oraKLES is booting..." />
      <Suspense fallback={<div className="h-screen w-screen bg-slate-900 flex items-center justify-center text-white text-xl">Loading...</div>}>
        <App />
      </Suspense>
    </ErrorBoundary>
  );
};

export default SafeApp;