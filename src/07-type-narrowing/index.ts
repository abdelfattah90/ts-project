/**
 * ==============================================================================
 * 📘 Type Narrowing in TypeScript — الدليل الشامل (نظري وعملي)
 * ==============================================================================
 * * هذا الملف يجمع بين الشرح النظري العميق والتطبيق العملي لكل تقنيات تضييق الأنواع.
 * تم إعداد الشرح للإجابة على:
 * 1. ✅ ما هو المفهوم؟ (Definition)
 * 2. ✅ لماذا نستخدمه؟ (Benefit)
 * 3. ✅ أين نستخدمه؟ (Use Case)
 * 4. ✅ متى نستخدمه؟ (Timing)
 */

// ==============================================================================
// 1. مقدمة سريعة | Introduction
// ==============================================================================
/*
 * 📘 الشرح النظري:
 * ----------------
 * ✅ ما هو؟: هو عملية تحويل نوع واسع (Broad Type) مثل (string | number) إلى نوع 
 * أكثر دقة وتحديداً (Narrow Type) مثل (string) فقط.
 * * ✅ لماذا؟: لأن TypeScript لا يسمح لك باستخدام methods خاصة بـ string إذا كان المتغير
 * يحتمل أن يكون number. التضييق يضمن الأمان (Safety).
 * * ✅ أين؟: داخل الـ Functions التي تقبل Union Types.
 * * ✅ متى؟: عندما يكون لديك متغير يمكن أن يحمل أكثر من نوع، وتريد تنفيذ منطق مختلف لكل نوع.
 */

// --- 💻 الكود العملي ---

// في البداية، TypeScript يرى هذا المتغير كـ Union
function demoNarrowing(input: string | number) {
    // input هنا: string | number

    if (typeof input === "string") {
        // 💡 هنا TypeScript "ضيق" النوع تلقائياً
        // input هنا: string فقط
        console.log(input.toUpperCase());
    } else {
        // input هنا: number فقط
        console.log(input.toFixed(2));
    }
}


// ==============================================================================
// 2. typeof Type Guards
// ==============================================================================
/*
 * 📘 الشرح النظري:
 * ----------------
 * ✅ ما هو؟: استخدام مشغل JavaScript الأصلي `typeof` لفحص الأنواع الأساسية.
 * * ✅ لماذا؟: لأنه أسرع وأبسط طريقة مدمجة في اللغة ولا تحتاج لتعريفات إضافية.
 * * ✅ أين؟: عند التعامل مع Primitives (string, number, boolean, symbol).
 * * ✅ متى؟: عندما يكون الـ Union Type مكوناً من أنواع بدائية بسيطة.
 * * ⚠️ تحذير: لا يعمل مع null (يعود بـ "object") ولا المصفوفات (تعود بـ "object").
 */

// --- 💻 الكود العملي ---

function processValue(value: string | number): string {
    if (typeof value === "string") {
        // ✅ TypeScript knows: value is string
        return value.toUpperCase();
    } else {
        // ✅ TypeScript knows: value is number
        return value.toFixed(2);
    }
}

console.log(processValue("hello"));    // HELLO
console.log(processValue(123.456));    // 123.46


// ==============================================================================
// 3. Truthiness & Non-null Narrowing
// ==============================================================================
/*
 * 📘 الشرح النظري:
 * ----------------
 * ✅ ما هو؟: الاعتماد على منطق JavaScript في تحويل القيم إلى true/false (Truthiness).
 * * ✅ لماذا؟: لاستبعاد القيم الفارغة مثل `null` و `undefined` بسرعة.
 * * ✅ أين؟: في الـ Optional Properties أو البيانات القادمة من API قد تكون مفقودة.
 * * ✅ متى؟: عندما تريد التأكد فقط من "وجود" قيمة قبل استخدامها.
 * * ⚠️ تنبيه هام: الصفر `0` والنص الفارغ `""` تعتبر قيم Falsy، لذا احذر عند استخدام هذا
 * الأسلوب مع الأرقام والنصوص.
 */

// --- 💻 الكود العملي ---

function printLength(text: string | null | undefined): void {
    // text here is: string | null | undefined
    if (text) {
        // ✅ text here is: string (تم استبعاد null و undefined)
        console.log(`Length: ${text.length}`);
    } else {
        console.log("No text provided");
    }
}

// مثال لتجنب مشكلة الصفر (0)
function processNumberCorrect(num: number | null): void {
    // ❌ خطأ شائع: if (num) ... سيفشل إذا كان الرقم 0

    // ✅ الطريقة الصحيحة:
    if (num !== null) {
        console.log(num * 2);
    } else {
        console.log("No number");
    }
}


// ==============================================================================
// 4. Equality Narrowing و switch
// ==============================================================================
/*
 * 📘 الشرح النظري:
 * ----------------
 * ✅ ما هو؟: استخدام معاملات المساواة `===` أو `!==` أو جملة `switch`.
 * * ✅ لماذا؟: لمقارنة القيم الحرفية (Literal Values) وتضييق النوع بناءً على القيمة.
 * * ✅ أين؟: عند التعامل مع حالات محددة (States) أو قيم ثابتة.
 * * ✅ متى؟: عندما يكون لديك قيم معروفة مسبقاً (Literal Types) مثل Status.
 */

// --- 💻 الكود العملي ---

function compare(x: string | number, y: string | boolean) {
    if (x === y) {
        // 💡 لكي يتساوى x مع y، يجب أن يكون كلاهما من النوع المشترك (string)
        // لذلك هنا TypeScript يعرف أن x و y هما string
        console.log((x as string).toUpperCase());
        console.log((y as string).toUpperCase());
    } else {
        console.log(x, y);
    }
}

// --- استخدام Switch مع Exhaustiveness Checking ---
type Status = "pending" | "approved" | "rejected" | "cancelled";

function handleStatus(status: Status): string {
    switch (status) {
        case "pending": return "Waiting";
        case "approved": return "Approved";
        case "rejected": return "Rejected";
        case "cancelled": return "Cancelled";
        default:
            // 💡 هذه التقنية تضمن أنك غطيت جميع الحالات.
            // إذا أضفت حالة جديدة لـ Status ولم تضفها هنا، سيظهر خطأ.
            const _exhaustive: never = status;
            return _exhaustive;
    }
}


// ==============================================================================
// 5. in Operator
// ==============================================================================
/*
 * 📘 الشرح النظري:
 * ----------------
 * ✅ ما هو؟: مشغل يفحص وجود خاصية (Key/Property) معينة داخل كائن ما.
 * * ✅ لماذا؟: لأن `typeof` لا يميز بين الـ Interfaces المختلفة (كلها objects).
 * * ✅ أين؟: عندما يكون الفرق بين الأنواع هو وجود Methods أو Properties معينة.
 * * ✅ متى؟: عندما تتعامل مع Interfaces أو Types ولا يمكنك استخدام `instanceof`.
 */

// --- 💻 الكود العملي ---

type Fish = { swim(): void; layEggs(): void };
type Bird = { fly(): void; layEggs(): void };

function move(animal: Fish | Bird) {
    // هل يوجد "swim" داخل animal؟
    if ("swim" in animal) {
        // ✅ TypeScript: animal is Fish
        animal.swim();
    } else {
        // ✅ TypeScript: animal is Bird (تلقائياً)
        (animal as Bird).fly();
    }
}


// ==============================================================================
// 6. instanceof
// ==============================================================================
/*
 * 📘 الشرح النظري:
 * ----------------
 * ✅ ما هو؟: مشغل JavaScript يفحص إذا كان الكائن قد تم إنشاؤه بواسطة Class معين.
 * * ✅ لماذا؟: للتأكد من نوع الكائن بناءً على الـ Prototype Chain.
 * * ✅ أين؟: حصراً عند استخدام الـ Classes (OOP).
 * * ✅ متى؟: عندما تكون بياناتك عبارة عن Instances من Classes وليست Plain Objects.
 */

// --- 💻 الكود العملي ---

class Dog {
    bark() { console.log("Woof!"); }
}
class Cat {
    meow() { console.log("Meow!"); }
}

function makeSound(animal: Dog | Cat) {
    if (animal instanceof Dog) {
        // ✅ animal is Dog
        animal.bark();
    } else {
        // ✅ animal is Cat
        animal.meow();
    }
}


// ==============================================================================
// 7. Discriminated (Tagged) Unions — 🌟 الأهم والأقوى
// ==============================================================================
/*
 * 📘 الشرح النظري:
 * ----------------
 * ✅ ما هو؟: نمط تصميمي حيث يشترك كل نوع في الـ Union بوجود خاصية ثابتة (تسمى tag أو kind)
 * تميزه عن غيره.
 * * ✅ لماذا؟: يعتبر الطريقة الأكثر أماناً ووضوحاً لتمثيل الحالات المختلفة في التطبيق.
 * * ✅ أين؟: في استجابات الـ API، إدارة الحالة (Redux/NgRx)، وأنظمة الأحداث.
 * * ✅ متى؟: عندما يكون لديك كائنات معقدة ومختلفة في البنية ولكنها تندرج تحت مظلة واحدة.
 */

// --- 💻 الكود العملي ---

// 1. تعريف الأنواع مع خاصية مميزة "kind"
type Circle = { kind: "circle"; radius: number };
type Rectangle = { kind: "rectangle"; width: number; height: number };
type Triangle = { kind: "triangle"; base: number; height: number };

type Shape = Circle | Rectangle | Triangle;

function getArea(shape: Shape): number {
    // TypeScript يستخدم "kind" لتضييق النوع بدقة متناهية
    switch (shape.kind) {
        case "circle":
            // shape is Circle here
            return Math.PI * shape.radius ** 2;
        case "rectangle":
            // shape is Rectangle here
            return shape.width * shape.height;
        case "triangle":
            // shape is Triangle here
            return (shape.base * shape.height) / 2;
        default:
            const _exhaustive: never = shape;
            return _exhaustive;
    }
}

// 💡 مثال عملي (Real-world): حالات تحميل البيانات في Angular/React
type LoadingState = { status: "loading" };
type SuccessState<T> = { status: "success"; data: T };
type ErrorState = { status: "error"; error: { message: string; code: number } };

type ApiState<T> = LoadingState | SuccessState<T> | ErrorState;

interface SimpleUser { id: number; name: string }

function renderUser(state: ApiState<SimpleUser>): string {
    switch (state.status) {
        case "loading": return "Loading...";
        case "success": return `User: ${state.data.name}`; // data متاحة فقط هنا
        case "error": return `Error ${state.error.code}: ${state.error.message}`; // error متاح فقط هنا
    }
}


// ==============================================================================
// 8. User-defined Type Guards
// ==============================================================================
/*
 * 📘 الشرح النظري:
 * ----------------
 * ✅ ما هو؟: دالة عادية نكتبها بأنفسنا، لكن نوع الإرجاع فيها هو `arg is Type`.
 * * ✅ لماذا؟: لأن TypeScript لا يستطيع دائماً استنتاج الأنواع المعقدة تلقائياً، 
 * فنحن نكتب دالة "تخبر" المترجم أن الفحص قد تم.
 * * ✅ أين؟: في دوال التحقق (Validation Functions) المعقدة.
 * * ✅ متى؟: عندما تريد إعادة استخدام منطق التحقق في أماكن متعددة.
 */

// --- 💻 الكود العملي ---

// دالة تخبر TypeScript: إذا عادت true، فإن value هو string
function isString(value: unknown): value is string {
    return typeof value === "string";
}

function processUnknown(value: unknown) {
    if (isString(value)) {
        // ✅ TypeScript trusts our function: value is string
        console.log(value.toUpperCase());
    } else {
        console.log("Not a string");
    }
}

// Guard متقدم للكائنات
interface UserModel { id: number; name: string; email: string }

// التحقق من أن كائناً عشوائياً هو UserModel
function isUser(obj: any): obj is UserModel {
    return (
        obj &&
        typeof obj.id === "number" &&
        typeof obj.name === "string" &&
        typeof obj.email === "string"
    );
}


// ==============================================================================
// 9. Control Flow Analysis
// ==============================================================================
/*
 * 📘 الشرح النظري:
 * ----------------
 * ✅ ما هو؟: قدرة TypeScript على تتبع مسار الكود (Returns, Throws) وفهم كيفية تغير النوع.
 * * ✅ لماذا؟: لتقليل الحاجة إلى `else` blocks المتداخلة وجعل الكود أنظف.
 * * ✅ أين؟: داخل الدوال التي تستخدم Early Return أو Throw Error.
 * * ✅ متى؟: دائماً! حاول استخدام الـ Guard Clauses (التحقق والخروج مبكراً).
 */

// --- 💻 الكود العملي ---

function processValueCF(value: string | number | null): string {
    if (value === null) {
        return "null";
    }
    // 💡 هنا TypeScript يعرف أن value لا يمكن أن يكون null
    // النوع الحالي: string | number

    if (typeof value === "string") {
        return value.toUpperCase();
    }
    // 💡 وهنا يعرف أنه ليس string وليس null
    // إذن هو حتماً number

    return value.toFixed(2);
}


// ==============================================================================
// 10. Array Narrowing
// ==============================================================================
/*
 * 📘 الشرح النظري:
 * ----------------
 * ✅ ما هو؟: تضييق نوع مصفوفة كاملة أو تصفية العناصر المختلطة داخل مصفوفة.
 * * ✅ لماذا؟: عند التعامل مع قوائم تحتوي بيانات غير معروفة المصدر (unknown[]).
 * * ✅ أين؟: في دوال معالجة البيانات (Data Processing).
 * * ✅ متى؟: عند استلام مصفوفة `any` أو `unknown` وتريد التأكد أن كل عناصرها صالحة.
 */

// --- 💻 الكود العملي ---

function isStringArray(value: unknown): value is string[] {
    return Array.isArray(value) && value.every(item => typeof item === "string");
}

function processData(data: unknown) {
    if (isStringArray(data)) {
        // ✅ data is string[]
        data.forEach(s => console.log(s.toUpperCase()));
    }
}


// ==============================================================================
// 11. Assertion Functions (asserts)
// ==============================================================================
/*
 * 📘 الشرح النظري:
 * ----------------
 * ✅ ما هو؟: دوال لا تعيد قيمة، لكنها ترمي خطأ (Throw Error) إذا لم يتحقق الشرط.
 * تستخدم الكلمة المفتاحية `asserts`.
 * * ✅ لماذا؟: للتأكد القاطع (Hard Validation). إذا مر الكود بعد هذه الدالة، 
 * فإن TypeScript يضمن أن النوع صحيح.
 * * ✅ أين؟: في بداية الدوال للتحقق من المدخلات، أو في الـ Unit Tests.
 * * ✅ متى؟: عندما يكون عدم تطابق النوع خطأً فادحاً يجب أن يوقف التنفيذ.
 */

// --- 💻 الكود العملي ---

// دالة عامة للـ Assertion
function assert(condition: any, message?: string): asserts condition {
    if (!condition) throw new Error(message ?? "Assertion failed");
}

// دالة Assertion مخصصة للأنواع
function assertIsString(value: unknown): asserts value is string {
    if (typeof value !== "string") throw new Error("Not a string");
}

function useAssert(value: unknown) {
    // إذا لم يكن string، سيتوقف الكود هنا بخطأ
    assertIsString(value);

    // ✅ وصلنا هنا؟ إذن value هو string بالتأكيد
    console.log(value.toUpperCase());
}


// ==============================================================================
// 12. مثال عملي: Form Validator (مبسط)
// ==============================================================================
/*
 * مثال يجمع ما سبق:
 * نتحقق من قيم حقول نموذج بناءً على قواعد (Rules).
 * نستخدم Discriminated Unions لتعريف أنواع القواعد المختلفة.
 */

type FieldValue = string | number | boolean | null;

// Discriminated Union للقواعد
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

// Helper Guard
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
                // تضييق النوع: يجب أن يكون string ليملك length
                if (typeof field.value !== "string") {
                    errors.push("Must be string");
                    break;
                }
                if (field.value.length < rule.length) errors.push(`Min length ${rule.length}`);
                break;

            case "min":
                // تضييق النوع: يجب أن يكون number
                if (!isNumber(field.value)) {
                    errors.push("Must be number");
                    break;
                }
                if (field.value < rule.value) errors.push(`Min ${rule.value}`);
                break;

            case "pattern":
                if (typeof field.value !== "string") {
                    errors.push("Must be string");
                    break;
                }
                if (!rule.regex.test(field.value)) errors.push("Invalid format");
                break;
        }
    }

    return errors.length ? { valid: false, errors } : { valid: true };
}


// ==============================================================================
// 13. تمرين عملي: Payment Processor
// ==============================================================================
/*
 * 🚀 الهدف: بناء نظام معالجة مدفوعات آمن نوعياً.
 * التقنيات المستخدمة:
 * 1. Discriminated Unions (لأنواع الدفع).
 * 2. Type Guards (للتحقق من كل نوع).
 * 3. Assertion Functions (للتحقق من الرصيد وصحة البيانات).
 * 4. Switch Case (للمعالجة المنطقية).
 */

// --- 1. تعريف أنواع المدفوعات (Discriminated Unions) ---
type CashPayment = { method: "cash"; amount: number; receivedAmount: number };
type CardPayment = { method: "card"; amount: number; cardNumber: string; cvv: string };
type PayPalPayment = { method: "paypal"; amount: number; email: string };
type CryptoPayment = { method: "crypto"; amount: number; walletAddress: string; currency: string };

type Payment = CashPayment | CardPayment | PayPalPayment | CryptoPayment;

// --- 2. تعريف أنواع النتائج ---
type PaymentSuccess = { success: true; transactionId: string; timestamp: string };
type PaymentFailure = { success: false; error: string; errorCode?: number };
type PaymentResult = PaymentSuccess | PaymentFailure;

// --- 3. Type Guards ---
function isCashPayment(p: Payment): p is CashPayment { return p.method === "cash"; }
function isCardPayment(p: Payment): p is CardPayment { return p.method === "card"; }
function isPayPalPayment(p: Payment): p is PayPalPayment { return p.method === "paypal"; }
function isCryptoPayment(p: Payment): p is CryptoPayment { return p.method === "crypto"; }

// --- 4. Helpers & Assertions ---
function assertSufficientCash(received: number, required: number): asserts received is number {
    if (received < required) throw new Error(`Insufficient cash: Needed ${required}, got ${received}`);
}

function isValidCardNumber(value: string): boolean {
    return /^[0-9]{16}$/.test(value); // محاكاة بسيطة
}

function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// --- 5. Payment Processor Class ---
class PaymentProcessor {

    processPayment(payment: Payment): PaymentResult {
        // نستخدم Switch على الـ method لتضييق النوع وتوجيه المنطق
        switch (payment.method) {
            case "cash":
                // TypeScript يعلم هنا أن payment هو CashPayment
                try {
                    assertSufficientCash(payment.receivedAmount, payment.amount);
                    return this.createSuccess("tx_cash_");
                } catch (e: any) {
                    return this.createFailure(e.message);
                }

            case "card":
                // TypeScript يعلم هنا أن payment هو CardPayment
                if (!isValidCardNumber(payment.cardNumber)) {
                    return this.createFailure("Invalid card number");
                }
                return this.createSuccess("tx_card_");

            case "paypal":
                // TypeScript يعلم هنا أن payment هو PayPalPayment
                if (!isValidEmail(payment.email)) {
                    return this.createFailure("Invalid PayPal email");
                }
                return this.createSuccess("tx_pp_");

            case "crypto":
                // TypeScript يعلم هنا أن payment هو CryptoPayment
                if (!payment.walletAddress) {
                    return this.createFailure("Missing wallet address");
                }
                return this.createSuccess("tx_crypto_");

            default:
                // Exhaustiveness Check: لضمان تغطية جميع طرق الدفع
                const _exhaustive: never = payment;
                return this.createFailure("Unknown payment method");
        }
    }

    // دوال مساعدة لإنشاء النتائج
    private createSuccess(prefix: string): PaymentSuccess {
        return {
            success: true,
            transactionId: prefix + Date.now(),
            timestamp: new Date().toISOString()
        };
    }

    private createFailure(message: string): PaymentFailure {
        return { success: false, error: message };
    }
}

// --- التشغيل والاختبار ---
const processor = new PaymentProcessor();

console.log("--- Testing Payments ---");

// 1. Cash
console.log(processor.processPayment({ method: "cash", amount: 50, receivedAmount: 100 }));
// 2. Card
console.log(processor.processPayment({ method: "card", amount: 20, cardNumber: "1234567812345678", cvv: "123" }));
// 3. PayPal Error
console.log(processor.processPayment({ method: "paypal", amount: 10, email: "bad-email" }));