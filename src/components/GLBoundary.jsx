import { Component } from 'react';

// If the WebGL canvas throws at runtime (context blocked/lost), swap to the
// CSS fallback instead of crashing the hero to black.
export default class GLBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    /* swallow — the fallback covers it */
  }

  render() {
    if (this.state.failed) return this.props.fallback || null;
    return this.props.children;
  }
}
