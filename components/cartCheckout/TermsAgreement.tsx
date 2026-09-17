"use client";

import Link from "next/link";

interface TermsAgreementProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    showError: boolean;
}

const termsAgreement = ({ checked, onChange, showError }: TermsAgreementProps) => {
    return (
        <div className="flex flex-col gap-1 border-t border-dashed border-gray-200 pt-4">
            <label className="flex items-start gap-2 text-sm text-gray-700 cursor-pointer">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-gray-300"
                />
                <span>
                    <Link
                        href="/terms"
                        target="_blank"
                        className="text-primary underline underline-offset-2"
                    >
                        قوانین سایت و حقوق مشتری
                    </Link>{" "}
                    را مطالعه کرده و می‌پذیرم.
                </span>
            </label>

            {showError && !checked && (
                <span className="text-xs text-red-500">
                    برای ادامه باید قوانین را تایید کنید.
                </span>
            )}
        </div>
    );
};

export default termsAgreement;