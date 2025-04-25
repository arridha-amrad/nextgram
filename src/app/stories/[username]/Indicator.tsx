type Props = {
  progress: number;
};

export default function Indicator({ progress }: Props) {
  return (
    <div className="relative mb-4 flex h-max w-full items-center gap-2">
      <div className="relative h-[3px] w-full rounded-full bg-white/50">
        <div
          style={{ width: `${progress}%` }}
          className="absolute inset-0 h-[3px] bg-white"
        />
      </div>
    </div>
  );
}
