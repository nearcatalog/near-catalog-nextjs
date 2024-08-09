export default function PolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto my-4 p-4">
      <div className="prose prose-invert mx-auto max-w-[768px]">{children}</div>
    </div>
  );
}
