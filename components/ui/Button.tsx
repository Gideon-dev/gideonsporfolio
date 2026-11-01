type ButtonProps = {
  name: string;
  isBeam?: boolean;
  containerClass?: string;
  /** Renders a link styled as a button instead of a <button>. */
  href?: string;
  type?: "button" | "submit";
};

const Beam = () => (
  <span className="relative flex h-3 w-3" aria-hidden="true">
    <span className="btn-ping" />
    <span className="btn-ping_dot" />
  </span>
);

const Button = ({ name, isBeam = false, containerClass = "", href, type = "button" }: ButtonProps) => {
  const className = `btn ${containerClass}`;

  if (href) {
    return (
      <a href={href} className={className}>
        {isBeam && <Beam />}
        {name}
      </a>
    );
  }

  return (
    <button type={type} className={className}>
      {isBeam && <Beam />}
      {name}
    </button>
  );
};

export default Button;
