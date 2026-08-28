import { Component } from 'react';

// Keeps a failed 3D scene (missing model, texture, or lost WebGL context) from
// unmounting the whole app. React re-throws asset errors above <Canvas>, so
// without this the entire page goes blank.
class SceneBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    console.error('3D scene failed to load:', error);
  }

  render() {
    if (this.state.failed) return this.props.fallback ?? null;

    return this.props.children;
  }
}

export default SceneBoundary;
