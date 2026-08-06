export const PRODUCT_SELECT_QUERY = `
  id,
  title,
  price,
  discount_percent,
  description,
  category_id,
  categories (
    id,
    name
  ),
  product_images (
    id,
    url,
    sort_order
  )
`;