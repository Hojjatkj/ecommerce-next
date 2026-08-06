import Image from "next/image";

interface HeroCardProps {
  title: string;
  price: number;
  image: string;
}

export function HeroCard({ title, price, image }: HeroCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-3xl bg-white/80 p-2 backdrop-blur-xl border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)]">
      
      {/* Container عکس و اورلی */}
      <div className="relative h-[450px] w-full overflow-hidden rounded-2xl">
        <img
          alt={title}
          width={600}
          height={600}
          src={image}       
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        
        {/* گرادینت تاریک روی عکس */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />

        {/* باکس شیشه‌ای متن در پایین کارت */}
        <div className="absolute bottom-4 inset-x-4 p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white flex justify-between items-end transition-transform duration-300 group-hover:translate-y-0">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">پیشنهاد ویژه</span>
            <h3 className="text-xl font-bold mt-1 text-white drop-shadow-sm">{title}</h3>
          </div>
          
          <div className="text-right">
            <span className="text-xs text-gray-300 block">قیمت</span>
            <p className="text-2xl font-black text-emerald-300">${price}</p>
          </div>
        </div>
      </div>

    </div>
  );
}