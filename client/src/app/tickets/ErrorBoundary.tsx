import React, { ErrorInfo, ReactNode } from 'react';
import { ErrorMessage } from './components/ErrorMessage';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }
  override render() {
    if (this.state.hasError && this.state.error) {
      return <ErrorMessage message={this.state.error.message} />;
    }

    return this.props.children;
  }
}
