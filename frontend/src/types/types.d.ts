// checking for css files
declare module "*.module.css" {
  const content: Record<string, string>;
  export default content;
}

// checking for png files
declare module "*.png" {
  const content: Record<string>;
  export default content;
}
