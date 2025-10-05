declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      tubeGeometry: any;
      sphereGeometry: any;
      meshStandardMaterial: any;
      meshBasicMaterial: any;
      ambientLight: any;
      directionalLight: any;
    }
  }
}

export {};