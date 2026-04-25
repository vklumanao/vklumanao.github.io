function GlassCard({ className = "", children, ...props }) {
  return (
    <div className={`glass ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}

export default GlassCard;
