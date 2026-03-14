type HadoukenEasterEggProps = {
  show: boolean;
};

export default function HadoukenEasterEgg({
  show,
}: HadoukenEasterEggProps) {
  if (!show) return null;

  return (
    <div className="hadoukenShell" aria-hidden="true">
      <img
        className="hadoukenGif"
        src={`${import.meta.env.BASE_URL}hadouken.gif`}
        alt=""
        draggable={false}
      />
    </div>
  );
}