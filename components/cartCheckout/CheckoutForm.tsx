"use client";

import { useState } from "react";
import Field, { inputClass } from "./Field";
import {
    validateCheckoutForm,
    type ValidationErrors,
} from "@/lib/validation/checkoutValidation";
import { useCheckoutSubmit } from "@/hooks/useCheckoutSubmit";
import SiteRules from "./RulesOfbuisness";

export interface CheckoutFormData {
    fullName: string;
    phone: string;
    province: string;
    city: string;
    postalCode: string;
    address: string;
}

const CheckoutForm = () => {
    const { isSubmitting, submitError, submitOrder } = useCheckoutSubmit();
    const [formData, setFormData] = useState<CheckoutFormData>({
        fullName: "",
        phone: "",
        province: "",
        city: "",
        postalCode: "",
        address: "",
    });

    const [errors, setErrors] = useState<ValidationErrors>({});
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    // کاربر باید اول قوانین رو باز کنه تا تیک زدن فعال بشه
    const [rulesRead, setRulesRead] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // پاک کردن ارور فیلد هنگام تایپ
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const validationErrors = validateCheckoutForm(formData);
        setErrors(validationErrors);

        if (Object.values(validationErrors).some(Boolean)) return;

        await submitOrder(formData);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2.5 w-full text-xs sm:text-sm"
        >
            <Field label="نام و نام خانوادگی" error={errors.fullName}>
                {(invalid) => (
                    <input
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="نام و نام خانوادگی"
                        className={inputClass(invalid)}
                    />
                )}
            </Field>

            <Field label="شماره موبایل" error={errors.phone}>
                {(invalid) => (
                    <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="شماره موبایل"
                        inputMode="tel"
                        className={inputClass(invalid)}
                    />
                )}
            </Field>

            <Field label="استان" error={errors.province}>
                {(invalid) => (
                    <input
                        name="province"
                        value={formData.province}
                        onChange={handleChange}
                        placeholder="استان"
                        className={inputClass(invalid)}
                    />
                )}
            </Field>

            <Field label="شهر" error={errors.city}>
                {(invalid) => (
                    <input
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="شهر"
                        className={inputClass(invalid)}
                    />
                )}
            </Field>

            <Field label="کد پستی" error={errors.postalCode}>
                {(invalid) => (
                    <input
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        placeholder="کد پستی"
                        inputMode="numeric"
                        className={inputClass(invalid)}
                    />
                )}
            </Field>

            <Field label="آدرس کامل" error={errors.address}>
                {(invalid) => (
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="آدرس کامل"
                        rows={2}
                        className={`${inputClass(invalid)} resize-y`}
                    />
                )}
            </Field>
            <SiteRules onOpen={() => setRulesRead(true)} />
            <label
                className={`flex items-center gap-2 text-sm ${
                    rulesRead
                        ? "text-foreground"
                        : "cursor-not-allowed text-muted-text"
                }`}
            >
                <input
                    type="checkbox"
                    checked={agreedToTerms}
                    disabled={!rulesRead}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="size-4 accent-primary disabled:cursor-not-allowed"
                />

                <span>
                    {rulesRead
                        ? "قوانین و مقررات را می‌پذیرم"
                        : "برای فعال شدن، ابتدا قوانین سایت را مطالعه کنید"}
                </span>
            </label>

            {submitError && (
                <p className="text-sm text-red-500">{submitError}</p>
            )}

            <button
                type="submit"
                disabled={!agreedToTerms || isSubmitting}
                className="w-full rounded-lg bg-primary px-4 py-1.5 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSubmitting ? "در حال انتقال به درگاه..." : "ثبت سفارش و پرداخت"}
            </button>
        </form>
    );
};

export default CheckoutForm;