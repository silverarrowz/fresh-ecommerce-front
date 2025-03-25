const ProductCardSkeleton = () => {
  return (
    <article className="group relative bg-white shadow-md px-4 py-6 rounded-xl animate-pulse">
      <div className="flex flex-col justify-between gap-y-6 h-full">
        <div className="flex flex-col gap-y-6">
          <div className="w-full min-h-80 aspect-w-1 aspect-h-1 overflow-hidden lg:h-80 lg:aspect-none bg-gray-200 rounded-lg" />

          <div className="flex justify-between">
            <div className="space-y-2">
              <div className="h-6 w-24 bg-gray-200 rounded" />

              <div className="h-6 w-48 bg-gray-200 rounded" />

              <div className="h-4 w-32 bg-gray-200 rounded" />
            </div>
          </div>
        </div>

        <div className="w-full h-10 bg-gray-200 rounded-md" />
      </div>
    </article>
  );
};

export default ProductCardSkeleton;
