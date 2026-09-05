"use client";

import dynamic from "next/dynamic";

const Backdrop = dynamic(
  () => import("@/components/ui/shares/backdrop/Backdrop"),
  { ssr: false, loading: () => null }
);

export default function BackdropLoader() {
  return <Backdrop />;
}