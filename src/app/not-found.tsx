import Link from "next/link";
import PillButton from "@/components/PillButton";

export default function NotFound() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center px-4 py-12">
      <h1 className="text-3xl font-serif text-gray-800 mb-2">Page not found</h1>
      <p className="text-gray-600 text-sm mb-6 text-center max-w-md">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link href="/">
        <PillButton variant="gold">Back to home</PillButton>
      </Link>
    </div>
  );
}
