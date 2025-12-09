import React from "react";
import { LDObserve } from "@launchdarkly/observability";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Forward error to LaunchDarkly Observability
    LDObserve.recordError(
      error,
      "React Error Boundary",
      { componentStack: errorInfo.componentStack }
    );

    // You can also log to console for debugging
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI when an error occurs
      return (
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundColor: "#1a1a2e",
          color: "#fff",
          fontFamily: "Arial, sans-serif",
          textAlign: "center",
          padding: "20px"
        }}>
          <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
            Oops! Something went wrong.
          </h1>
          <p style={{ fontSize: "1rem", color: "#aaa", marginBottom: "2rem" }}>
            We've been notified and are working on a fix.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "12px 24px",
              fontSize: "1rem",
              backgroundColor: "#405BFF",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

