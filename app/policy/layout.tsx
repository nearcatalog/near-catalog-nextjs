export default function PolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto my-4 flex flex-col gap-4 p-4">
      <div className="prose prose-invert max-w-none">{children}</div>
    </div>
  );
}
