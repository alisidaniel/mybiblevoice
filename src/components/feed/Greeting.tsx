interface GreetingProps {
    firstName: string;
    date: string;
    subtitle?: string;
  }
  
  export function Greeting({ firstName, date, subtitle }: GreetingProps) {
    return (
      <div className="flex items-end justify-between px-0.5 pb-1 pt-2">
        <div>
          <h1 className="font-serif text-[30px] leading-none tracking-tight text-zinc-900">
            Good morning, {firstName}
          </h1>
          {subtitle && (
            <p className="mt-1.5 text-[13px] text-zinc-400">{subtitle}</p>
          )}
        </div>
        <div className="text-[12.5px] font-medium text-zinc-400">{date}</div>
      </div>
    );
  }