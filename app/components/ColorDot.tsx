export function ColorDot({
  color,
  active = false,
  onClick,
}: {
  color: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-9 w-9 rounded-full border-2 transition ${
        active
          ? "border-zinc-100"
          : "border-transparent hover:border-zinc-400/60"
      }`}
      style={{ backgroundColor: color }}
      aria-label={`Pick ${color}`}
    />
  );
}
