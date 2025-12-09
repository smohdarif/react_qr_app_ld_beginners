# ErrorBoundary Component - LaunchDarkly Observability Integration

## Overview

The `ErrorBoundary` component catches JavaScript errors in React's component tree and:
1. Displays a user-friendly fallback UI instead of crashing
2. Forwards errors to **LaunchDarkly Observability** for tracking

## When Does ErrorBoundary Trigger?

| ✅ **CATCHES** | ❌ **DOES NOT CATCH** |
|----------------|----------------------|
| Errors in `render()` method | Event handler errors (onClick, etc.) |
| Errors in lifecycle methods | Async errors (setTimeout, fetch) |
| Errors in constructors | Errors in the ErrorBoundary itself |
| Errors in child components | Server-side rendering errors |

## How It Works

### Step 1: Error Occurs in a Child Component
```javascript
const BrokenComponent = () => {
  throw new Error("I crashed!");  // 💥 This triggers ErrorBoundary
  return <div>Hello</div>;
};
```

### Step 2: `getDerivedStateFromError` Runs
```javascript
static getDerivedStateFromError(error) {
  return { hasError: true, error };  // Sets state to show fallback UI
}
```

### Step 3: `componentDidCatch` Runs → Sends to LaunchDarkly
```javascript
componentDidCatch(error, errorInfo) {
  // 🚀 This sends the error to LaunchDarkly Observability
  LDObserve.recordError(
    error,                          // The error object
    "React Error Boundary",         // Error source label
    { componentStack: errorInfo.componentStack }  // Component stack trace
  );
}
```

### Step 4: Fallback UI Renders
Instead of a white screen, users see a friendly error page with a "Reload" button.

## What LaunchDarkly Receives

When the ErrorBoundary catches an error, LaunchDarkly receives:

```javascript
{
  error: "Error message here",
  source: "React Error Boundary",
  metadata: {
    componentStack: `
      at BrokenComponent (BrokenComponent.js:5)
      at App (App.js:34)
      at ErrorBoundary (ErrorBoundary.js:4)
      at LDProvider (index.js:39)
    `
  }
}
```

Plus:
- **Session Replay** showing what the user did before the crash
- **Feature flag values** at the time of the crash
- **Network requests** that occurred before the error

## Testing the ErrorBoundary

To test, temporarily add a throw statement to any component:

```javascript
const MyComponent = () => {
  // 🧪 TEMPORARY: Uncomment to test ErrorBoundary
  throw new Error("Test error - ErrorBoundary demo!");
  
  return <div>Hello</div>;
};
```

## Why This Matters

| Without ErrorBoundary | With ErrorBoundary |
|----------------------|-------------------|
| App crashes → white screen | Shows friendly error page |
| No error tracking | Error sent to LaunchDarkly |
| User confused | User can reload |
| No visibility into issues | Full error + session replay + flag values |

## Correlating Errors with Feature Flags

This setup lets you **correlate crashes with feature flag changes**:
- If you roll out a new flag and errors spike, you'll see it in LaunchDarkly
- Session replay shows exactly what the user experienced
- You can identify if a specific flag variation is causing issues

## Related Files

- `src/components/ErrorBoundary.js` - The ErrorBoundary component
- `src/index.js` - Where ErrorBoundary wraps the App
- `@launchdarkly/observability` - The Observability plugin

## Resources

- [LaunchDarkly Observability Docs](https://docs.launchdarkly.com/home/observability)
- [React Error Boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)

