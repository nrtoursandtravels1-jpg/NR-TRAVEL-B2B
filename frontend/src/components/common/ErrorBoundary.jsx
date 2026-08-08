import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Unhandled app error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
          <div className="max-w-md rounded-2xl bg-white p-8 shadow text-center">
            <h2 className="text-xl font-semibold text-slate-900">
              Something went wrong
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              The page could not be loaded properly. Please refresh the page or go back home.
            </p>
            <button
              onClick={() => (window.location.href = "/")}
              className="mt-6 rounded-lg bg-blue-600 px-4 py-2 text-white"
            >
              Go Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
