export const PRODUCT_SELECT_QUERY = `
          id,
          title,
          price,
          discount_percent,
          image,
          description,
          category_id,
          categories (
            id,
            name
          )
        `;