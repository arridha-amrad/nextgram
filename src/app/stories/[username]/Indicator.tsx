type Props = {
  progress: number;
};

export default function Indicator({ progress }: Props) {
  return (
    <div className="relative mb-4 flex h-max w-full items-center gap-2">
      <div className="bg-foreground/50 relative h-[3px] w-full rounded-full">
        <div
          style={{ width: `${progress}%` }}
          className="bg-foreground absolute inset-0 h-[3px]"
        />
      </div>
    </div>
  );
}
