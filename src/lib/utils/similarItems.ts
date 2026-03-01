// similer products
const similerItems = (currentItem: any, allItems: any, slug: string) => {
  let tags: [] = [];

  // set tags
  if (currentItem.data.tags && currentItem.data.tags.length > 0) {
    tags = currentItem.data.tags;
  }

  // filter by tags
  const filterByTags = allItems.filter((item: { data: { tags: string[] } }) =>
    tags.find((tag) => item.data.tags.includes(tag))
  );

  // merged after filter
  const mergedItems = [...new Set([...filterByTags])];

  // filter by slug
  const filterBySlug = mergedItems.filter(
    (product: any) => product.slug !== slug && product.id !== slug
  );

  return filterBySlug;
};

export default similerItems;
