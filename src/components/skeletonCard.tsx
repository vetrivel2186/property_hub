export default function SkeletonCard() {
  return (
    <div className="animate-pulse bg-white rounded-xl shadow p-4">
      <div className="h-48 bg-gray-300 rounded" />
      <div className="mt-4 h-5 bg-gray-300 rounded" />
      <div className="mt-2 h-5 bg-gray-300 rounded" />
    </div>
  );
}