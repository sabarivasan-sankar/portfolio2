type Props = {
  items: string[];
  reverse?: boolean;
  className?: string;
};

export function Marquee({ items, reverse, className }: Props) {
  return (
    <div className={`overflow-hidden ${className ?? ""}`}>
      <div className="marquee-track" data-dir={reverse ? "reverse" : undefined}>
        <span className="flex">
          {items.map((item, i) => (
            <span
              key={i}
              className="font-mono text-sm text-fg-muted px-6 py-3 whitespace-nowrap border-r border-border"
            >
              {item}
            </span>
          ))}
        </span>
        <span className="flex" aria-hidden="true">
          {items.map((item, i) => (
            <span
              key={i}
              className="font-mono text-sm text-fg-muted px-6 py-3 whitespace-nowrap border-r border-border"
            >
              {item}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}
