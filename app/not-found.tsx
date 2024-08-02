import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4">
      <h2 className="text-2xl font-bold">404 | Page not found!</h2>
      <Link
        className="flex gap-1 rounded-full bg-slate-500 px-4 py-2 text-white transition-colors duration-300 ease-in-out hover:bg-slate-600 active:bg-slate-700"
        href="/#"
      >
        <i className="bi bi-arrow-left text-xl" /> Back to Home
      </Link>
    </div>
  );
}
