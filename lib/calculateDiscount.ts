// lib/utils.ts
export interface DiscountInput {
    price: number
    discountPercent?: number
}

export interface DiscountResult {
    hasDiscount: Boolean   
    finalPrice: number
    discountAmount: number
}

export function calculateDiscount({ price, discountPercent }: DiscountInput): DiscountResult {

    const safePercent = discountPercent && discountPercent > 0 ? discountPercent : 0;
    const hasDiscount = safePercent > 0;
    const finalPrice = hasDiscount
        ? price - (price * (discountPercent || 0)) / 100
        : price;

    const discountAmount = price - finalPrice;

    return {
        hasDiscount,
        finalPrice,
        discountAmount,
    };
}