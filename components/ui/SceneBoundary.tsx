"use client";

import { Component, type ReactNode } from "react";

type Props = { children: ReactNode; fallback?: ReactNode };
type State = { failed: boolean };

// Keeps a failed 3D scene (missing model, texture, or lost WebGL context) from
// unmounting the whole page. React re-throws asset errors above <Canvas>, so
// without this the entire page goes blank.
class SceneBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.error("3D scene failed to load:", error);
  }

  render() {
    if (this.state.failed) return this.props.fallback ?? null;
    return this.props.children;
  }
}

export default SceneBoundary;
