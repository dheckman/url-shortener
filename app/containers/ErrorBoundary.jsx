import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    const { hasError } = this.state;
    const { children, errorMessage } = this.props;
    if (hasError) {
      return <div className="ErrorMessage">{errorMessage}</div>;
    }
    return children;
  }
}

export default ErrorBoundary;
