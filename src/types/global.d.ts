declare module '*.css' {}
declare module '*.scss' {}

declare module '*.svg' {
    const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    export default content;
}

declare const OKO: {
    title: string;
    version: string;
};
