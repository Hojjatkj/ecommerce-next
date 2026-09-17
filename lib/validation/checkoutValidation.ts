import type { CheckoutFormData } from "@/components/cartCheckout/CheckoutForm";

export type ValidationErrors = Partial<Record<keyof CheckoutFormData, string>>;

const normalizeDigits = (value: string) =>
    value.replace(/[۰-۹]/g, (d) =>
        String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))
    );

export const validateCheckoutForm = (data: CheckoutFormData): ValidationErrors => {
    const errors: ValidationErrors = {};

    // نام و نام خانوادگی
    if (!data.fullName.trim()) {
        errors.fullName = "نام و نام خانوادگی الزامی است";
    } else if (data.fullName.trim().length < 3) {
        errors.fullName = "نام باید حداقل ۳ کاراکتر باشد";
    }

    // شماره موبایل (ایران)
    const phone = normalizeDigits(data.phone).trim();
    if (!phone) {
        errors.phone = "شماره موبایل الزامی است";
    } else if (!/^09\d{9}$/.test(phone)) {
        errors.phone = "شماره موبایل معتبر نیست (مثال: 09123456789)";
    }

    // استان
    if (!data.province.trim()) {
        errors.province = "استان الزامی است";
    }

    // شهر
    if (!data.city.trim()) {
        errors.city = "شهر الزامی است";
    }

    // کد پستی
    const postalCode = normalizeDigits(data.postalCode).trim();
    if (!postalCode) {
        errors.postalCode = "کد پستی الزامی است";
    } else if (!/^\d{10}$/.test(postalCode)) {
        errors.postalCode = "کد پستی باید ۱۰ رقم باشد";
    }

    // آدرس
    if (!data.address.trim()) {
        errors.address = "آدرس الزامی است";
    } else if (data.address.trim().length < 10) {
        errors.address = "آدرس باید حداقل ۱۰ کاراکتر باشد";
    }

    return errors;
};

export const hasErrors = (errors: ValidationErrors) =>
    Object.values(errors).some(Boolean);
