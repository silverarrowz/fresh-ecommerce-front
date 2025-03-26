const ProductCardSkeleton = () => {
  return (
    <article className="relative bg-white shadow-sm rounded-2xl overflow-hidden animate-pulse">
      <div className="flex flex-col h-full">
        <div className="relative w-full aspect-square bg-gray-200" />
        <div className="p-6 flex flex-col flex-grow">
          <div className="h-6 w-3/4 bg-gray-200 rounded mb-2" />
          <div className="h-4 w-1/2 bg-gray-200 rounded mb-4" />
          <div className="mt-auto">
            <div className="h-8 w-1/3 bg-gray-200 rounded mb-4" />
            <div className="h-10 w-full bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductCardSkeleton;
