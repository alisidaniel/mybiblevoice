import { useNavigate } from "react-router-dom";
import { PickComposer } from "../components/community/PickComposer";

export default function NewPick() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-serif text-[30px] leading-none tracking-tight text-zinc-900 dark:text-zinc-100">
        Share a pick
      </h1>
      <PickComposer
        onPosted={() => {
          navigate("/community");
        }}
      />
    </div>
  );
}