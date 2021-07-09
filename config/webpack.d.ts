declare module "*.scss" {
  const calsses: Record<string, string>;
  export default classes;
}

declare module "*.svg" {
  const svg: React.FunctionComponent<React.SVGProps<SVGAElement>>;
  export default svg;
}
