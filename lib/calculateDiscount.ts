// lib/utils.ts
export interface discountInput {
    price: number
    discountPercent?: number
}

export interface discountResult {
    hasDiscount: Boolean
    finalPrice: number
    discountAmount: number
}

export function CalculateDiscount({ price, discountPercent }: discountInput): discountResult {

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