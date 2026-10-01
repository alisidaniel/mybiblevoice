import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <div className="font-serif text-[80px] leading-none text-zinc-200">
        404
      </div>
      <h1 className="text-[18px] font-semibold">Nothing here.</h1>
      <p className="max-w-sm text-[13.5px] text-zinc-500">
        This page has wandered off. Let's get you back to today's verse.
      </p>
      <button
        onClick={() => navigate("/")}
        className="mt-2 rounded-lg bg-zinc-900 px-4 py-2 text-[13px] font-medium text-zinc-50"
      >
        Back to Today
      </button>
    </div>
  );
}