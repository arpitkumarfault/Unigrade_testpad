export function Card(props: React.HTMLAttributes<HTMLDivElement>) {
  const { className, style, ...rest } = props;
  return <div className={`card ${className ?? ""}`} style={{ padding: 16, ...(style || {}) }} {...rest} />;
}
