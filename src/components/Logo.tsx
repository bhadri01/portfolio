type LogoProps = {
  size?: number;
  showWordmark?: boolean;
  className?: string;
};

export default function Logo({ size = 36, showWordmark = false, className = "" }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <img
        src="/logo-mark.svg"
        alt="Bhadrinathan logo"
        style={{ height: size, width: "auto" }}
        className="block"
      />
      {showWordmark && (
        <span className="font-brand text-[15px] tracking-[0.16em] text-[#000b1b] leading-none">
          BHADRINATHAN
        </span>
      )}
    </span>
  );
}
