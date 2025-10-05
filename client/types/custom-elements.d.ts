// Allow JSX to recognize the Spline web component
// Minimal typing to keep TS happy when using <spline-viewer /> in React
// This file is included via tsconfig include (client/**/*)

declare namespace JSX {
  interface IntrinsicElements {
    'spline-viewer': any;
  }
}
