/**
 * =============================================================
 *  Type Narrowing — تضييق الأنواع في TypeScript
 * =============================================================
 * 
 * 📌 فهرس الدرس
 * ---------------------------------
 * 1. مقدمة سريعة
 * 2. typeof Type Guards
 * 3. Truthiness & Non-null Narrowing
 * 4. Equality Narrowing و switch
 * 5. in operator
 * 6. instanceof
 * 7. Discriminated (Tagged) Unions
 * 8. User-defined Type Guards
 * 9. Control Flow Analysis
 * 10. Array Narrowing
 * 11. Assertion Functions
 * 12. مثال عملي: Form Validator (مبسط)
 * 13. تمرين عملي: Payment Processor (مطلوب منك تنفيذ)
 * 
 * ✨ الهدف: أمثلة عملية ومبسطة مناسبة للمبتدئين وملائمة للعمل مع Angular.
 */

// =============================================================
// 1. مقدمة سريعة
// =============================================================
// Type Narrowing = تحويل نوع عام (مثلاً union) إلى نوع أكثر تحديداً
// TypeScript يتابع سياق التنفيذ (control flow) ويضيّق النوع تلقائياً.


// =============================================================
// 2. typeof Type Guards
// =============================================================
function processValue(value: string | number): string {
    if (typeof value === "string") {
        // هنا TypeScript تعرف أن value: string
        return value.toUpperCase();
    } else {
        // هنا TypeScript تعرف أن value: number
        return value.toFixed(2);
    }
}

console.log(processValue("hello"));
console.log(processValue(123.456));

// ملاحظة: typeof يناسب primitives فقط (string, number, boolean, symbol)


// =============================================================
// 3. Truthiness & Non-null Narrowing
// =============================================================
function printLength(text: string | null | undefined): void {
    if (text) {
        // text هنا string فقط (لكن احذر من "" كـ falsy)
        console.log(`Length: ${text.length}`);
    } else {
        console.log("No text provided");
    }
}

// تجنب مشكلة 0 كـ falsy عند التعامل مع number
function processNumberCorrect(num: number | null): void {
    if (num !== null) {
        console.log(num * 2); // 0 يعمل بشكل صحيح هنا
    } else {
        console.log("No number");
    }
}


// =============================================================
// 4. Equality Narrowing و switch
// =============================================================
function compare(x: string | number, y: string | boolean) {
    if (x === y) {
        // هنا كلاهما string
        console.log((x as string).toUpperCase());
        console.log((y as string).toUpperCase());
    } else {
        console.log(x, y);
    }
}

// Switch مع exhaustiveness check (مفيد مع discriminated unions)
type Status = "pending" | "approved" | "rejected" | "cancelled";

function handleStatus(status: Status): string {
    switch (status) {
        case "pending":
            return "Waiting";
        case "approved":
            return "Approved";
        case "rejected":
            return "Rejected";
        case "cancelled":
            return "Cancelled";
        default:
            const _exhaustive: never = status;
            return _exhaustive;
    }
}


// =============================================================
// 5. in Operator
// =============================================================
type Fish = { swim(): void; layEggs(): void };
type Bird = { fly(): void; layEggs(): void };

function move(animal: Fish | Bird) {
    if ("swim" in animal) {
        animal.swim(); // animal is Fish
    } else {
        (animal as Bird).fly(); // animal is Bird
    }
}


// =============================================================
// 6. instanceof
// =============================================================
class Dog {
    bark() { console.log("Woof!"); }
}
class Cat {
    meow() { console.log("Meow!"); }
}
function makeSound(animal: Dog | Cat) {
    if (animal instanceof Dog) animal.bark();
    else animal.meow();
}


// =============================================================
// 7. Discriminated (Tagged) Unions — أقوى نمط
// =============================================================
// كل نوع يملك property ثابتة (tag) لتمييزه

type Circle = { kind: "circle"; radius: number };
type Rectangle = { kind: "rectangle"; width: number; height: number };
type Triangle = { kind: "triangle"; base: number; height: number };

type Shape = Circle | Rectangle | Triangle;

function getArea(shape: Shape): number {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "rectangle":
            return shape.width * shape.height;
        case "triangle":
            return (shape.base * shape.height) / 2;
        default:
            const _exhaustive: never = shape;
            return _exhaustive;
    }
}

console.log(getArea({ kind: "circle", radius: 5 }));

// Discriminated unions مفيدة جداً لResponses في Angular services

type LoadingState = { status: "loading" };
type SuccessState<T> = { status: "success"; data: T };
type ErrorState = { status: "error"; error: { message: string; code: number } };

type ApiState<T> = LoadingState | SuccessState<T> | ErrorState;

interface SimpleUser { id: number; name: string }

function renderUser(state: ApiState<SimpleUser>): string {
    switch (state.status) {
        case "loading": return "Loading...";
        case "success": return `User: ${state.data.name}`;
        case "error": return `Error ${state.error.code}: ${state.error.message}`;
    }
}


// =============================================================
// 8. User-defined Type Guards (دوال تضييق خاصة بك)
// =============================================================
function isString(value: unknown): value is string {
    return typeof value === "string";
}

function processUnknown(value: unknown) {
    if (isString(value)) {
        // هنا value: string
        console.log(value.toUpperCase());
    } else {
        console.log("Not a string");
    }
}

// Guard للكائنات
interface UserModel { id: number; name: string; email: string }
function isUser(obj: any): obj is UserModel {
    return (
        obj &&
        typeof obj.id === "number" &&
        typeof obj.name === "string" &&
        typeof obj.email === "string"
    );
}


// =============================================================
// 9. Control Flow Analysis
// =============================================================
function processValueCF(value: string | number | null): string {
    if (value === null) return "null"; // بعد هذا: string | number
    if (typeof value === "string") return value.toUpperCase(); // بعد هذا: number
    return value.toFixed(2);
}

// Early return و throw يساعدان TypeScript على تضييق الأنواع


// =============================================================
// 10. Array Narrowing
// =============================================================
function isStringArray(value: unknown): value is string[] {
    return Array.isArray(value) && value.every(item => typeof item === "string");
}

function processData(data: unknown) {
    if (isStringArray(data)) {
        data.forEach(s => console.log(s.toUpperCase()));
    }
}


// =============================================================
// 11. Assertion Functions (asserts) — للتأكد القاطع
// =============================================================
function assert(condition: any, message?: string): asserts condition {
    if (!condition) throw new Error(message ?? "Assertion failed");
}

function assertIsString(value: unknown): asserts value is string {
    if (typeof value !== "string") throw new Error("Not a string");
}

function useAssert(value: unknown) {
    assertIsString(value);
    // بعد هذه السطر، TypeScript تعتبر value: string
    console.log(value.toUpperCase());
}


// =============================================================
// 12. مثال عملي مبسط: Form Validation (مختصر)
// =============================================================

type FieldValue = string | number | boolean | null;

type ValidationRule =
    | { type: "required" }
    | { type: "minLength"; length: number }
    | { type: "min"; value: number }
    | { type: "pattern"; regex: RegExp };

interface FieldConfig {
    name: string;
    value: FieldValue;
    rules: ValidationRule[];
}

type ValidationResult = { valid: true } | { valid: false; errors: string[] };

function isNumber(value: FieldValue): value is number {
    return typeof value === "number";
}

function validateField(field: FieldConfig): ValidationResult {
    const errors: string[] = [];
    for (const rule of field.rules) {
        switch (rule.type) {
            case "required":
                if (field.value === null || field.value === "") errors.push("Required");
                break;
            case "minLength":
                if (typeof field.value !== "string") { errors.push("Must be string"); break; }
                if (field.value.length < rule.length) errors.push(`Min length ${rule.length}`);
                break;
            case "min":
                if (!isNumber(field.value)) { errors.push("Must be number"); break; }
                if (field.value < rule.value) errors.push(`Min ${rule.value}`);
                break;
            case "pattern":
                if (typeof field.value !== "string") { errors.push("Must be string"); break; }
                if (!rule.regex.test(field.value)) errors.push("Invalid format");
                break;
        }
    }
    return errors.length ? { valid: false, errors } : { valid: true };
}


// =============================================================
// 13. تمرين عملي: Payment Processor (مطلوب منك تنفيذ)
// =============================================================
/**
 * المطلوب منك: قم بتنفيذ نظام Payment Processing بنفسك داخل ملفك.
 * أدناه أنا أضع scaffold (الهيكل) مع أمثلة للـ types و signatures.
 * 
 * متطلبات التمرين (مختصر):
 * 1) أنشئ discriminated union للطرق (cash|card|paypal|crypto)
 * 2) أنشئ نتائج الدفع (success | failure)
 * 3) اكتب type guards (isCashPayment ...)
 * 4) اكتب assertion functions للتحقق من صلاحية المدفوعات
 * 5) أنشئ class PaymentProcessor مع method processPayment
 * 6) استخدم switch على payment.method لتضييق النوع
 * 7) تأكد من exhaustiveness و type-safety
 */

// --- Scaffold (ابدأ من هنا وتكمل بنفسك) ---

type CashPayment = { method: "cash"; amount: number; receivedAmount: number };
type CardPayment = { method: "card"; amount: number; cardNumber: string; cvv: string };
type PayPalPayment = { method: "paypal"; amount: number; email: string };
type CryptoPayment = { method: "crypto"; amount: number; walletAddress: string; currency: string };

type Payment = CashPayment | CardPayment | PayPalPayment | CryptoPayment;

type PaymentSuccess = { success: true; transactionId: string; timestamp: string };
type PaymentFailure = { success: false; error: string; errorCode?: number };

type PaymentResult = PaymentSuccess | PaymentFailure;

// أمثلة على type guards (يمكنك توسيعها)
function isCashPayment(p: Payment): p is CashPayment { return p.method === "cash"; }
function isCardPayment(p: Payment): p is CardPayment { return p.method === "card"; }
function isPayPalPayment(p: Payment): p is PayPalPayment { return p.method === "paypal"; }
function isCryptoPayment(p: Payment): p is CryptoPayment { return p.method === "crypto"; }

// Assertion examples
function assertSufficientCash(received: number, required: number): asserts received is number {
    if (received < required) throw new Error("Insufficient cash");
}

function isValidCardNumber(value: string): boolean {
    // بسيط: تحقق طول فقط (للمثال)
    return /^[0-9]{16}$/.test(value);
}

// PaymentProcessor scaffold
class PaymentProcessor {
    processPayment(payment: Payment): PaymentResult {
        switch (payment.method) {
            case "cash":
                try {
                    assertSufficientCash(payment.receivedAmount, payment.amount);
                    return { success: true, transactionId: "tx_cash_" + Date.now(), timestamp: new Date().toISOString() };
                } catch (e: any) {
                    return { success: false, error: e.message };
                }

            case "card":
                if (!isValidCardNumber(payment.cardNumber)) return { success: false, error: "Invalid card" };
                // Simulate success
                return { success: true, transactionId: "tx_card_" + Date.now(), timestamp: new Date().toISOString() };

            case "paypal":
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payment.email)) return { success: false, error: "Invalid email" };
                return { success: true, transactionId: "tx_pp_" + Date.now(), timestamp: new Date().toISOString() };

            case "crypto":
                if (!payment.walletAddress) return { success: false, error: "Invalid wallet" };
                return { success: true, transactionId: "tx_crypto_" + Date.now(), timestamp: new Date().toISOString() };

            default:
                const _exhaustive: never = payment;
                return { success: false, error: "Unknown payment method" };
        }
    }

    validatePayment(payment: Payment): boolean {
        // مثال بسيط باستخدام type guards
        if (isCashPayment(payment)) return payment.receivedAmount >= payment.amount;
        if (isCardPayment(payment)) return isValidCardNumber(payment.cardNumber);
        if (isPayPalPayment(payment)) return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payment.email);
        if (isCryptoPayment(payment)) return !!payment.walletAddress;
        return false;
    }
}

// اختبار سريع
const processor = new PaymentProcessor();
console.log(processor.processPayment({ method: "cash", amount: 50, receivedAmount: 100 }));
console.log(processor.processPayment({ method: "card", amount: 20, cardNumber: "1234567812345678", cvv: "123" }));
console.log(processor.processPayment({ method: "paypal", amount: 10, email: "bad-email" }));

// =============================================================
// نهاية الدرس — مراجعة سريعة
// =============================================================
// • typeof → للمقارنة على primitive types
// • in → لفحص properties في objects
// • instanceof → للكائنات المبنية من classes
// • discriminated unions → أفضل نمط لأنواع الـ API و state
// • اكتب type guards و assertion functions لتحسين الأمان النوعي
// • استخدم control flow و early returns لتسهيل تضييق الأنواع

// انتهى الدرس 🎯
