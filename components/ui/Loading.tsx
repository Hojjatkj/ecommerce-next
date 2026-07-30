import "@/public/css/animations.css";

export default function Loading() {
  return (
    <div className="loading-backdrop">
      <div className="loading-spinner">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
}