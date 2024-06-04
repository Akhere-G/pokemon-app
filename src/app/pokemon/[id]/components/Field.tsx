export default function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-between gap-2 border-b-2 mb-2 items-baseline w-full py-2">
      <p>{label}</p>
      {children}
    </div>
  );
}
