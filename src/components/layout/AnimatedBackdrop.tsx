import "../../styles/layout/animated-backdrop.css";

export default function AnimatedBackdrop() {
  return (
    <div className="animatedBackdrop" aria-hidden="true">
      <div className="auroraLayer auroraLayer--one" />
      <div className="auroraLayer auroraLayer--two" />
      <div className="auroraLayer auroraLayer--three" />
      <div className="auroraGlow" />
      <div className="auroraNoise" />
    </div>
  );
}