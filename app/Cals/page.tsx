"use client";

const Cals = () => {
  const cals = ["+", "-", "*", "/", "="];

  return (
    <div className="grid gap-4 grid-cols-3 min-w-40 pt-10">
      {cals.map((sign) => {
        return (
          <div key={sign} className="text-center p-2 bg-slate-300 rounded-lg">
            {sign}
          </div>
        );
      })}
    </div>
  );
};

export default Cals;
