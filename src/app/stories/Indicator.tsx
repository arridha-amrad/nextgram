type Props = {
  progress: number;
  onClick: VoidFunction;
};

export default function Indicator({ progress, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="relative flex h-max w-full items-center gap-2 py-4"
    >
      <div className="relative h-[3px] w-full rounded-full bg-white/50">
        <div
          style={{ width: `${progress}%` }}
          className="absolute inset-0 h-[3px] bg-white"
        />
      </div>
    </div>
  );
}
