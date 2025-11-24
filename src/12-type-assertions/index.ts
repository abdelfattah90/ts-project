/********************************************************************************************
 *                            Type Assertions & Non-null Assertion                           *
 *                                  Ahmed – Simplified Notes                                 *
 ********************************************************************************************/

/**
 * ===============================
 * 📘 الفهرس
 * ===============================
 * 1. مقدمة Type Assertions
 * 2. الأسلوب الموصى به: as Syntax
 * 3. Angle Bracket Syntax ولماذا نتجنبها
 * 4. Assertions مع Union Types
 * 5. Assertions مع DOM
 * 6. Double Assertions (نادر الاستخدام)
 * 7. Const Assertions (as const)
 * 8. Non-null Assertion Operator (!)
 * 9. Non-null Assertion مع DOM و Objects
 * 10. متى نستخدم Assertions ومتى نتجنبها
 * 11. Assertions في Angular
 * 12. Assertions vs Type Guards
 * 13. Satisfies Operator
 * 14. مثال عملي مبسّط
 */

/********************************************************************************************
 * 1️⃣ مقدمة
 * Type Assertions = إخبار TypeScript بالنوع الحقيقي عندما تكون أنت متأكدًا أكثر.
 * لكن: ⚠️ لا يضيف Runtime Checks.
 ********************************************************************************************/

let value: any = "hello world";
let length = (value as string).length; // آمن لأننا نعرف أنه string

/********************************************************************************************
 * 2️⃣ as Syntax (الأفضل دائمًا)
 ********************************************************************************************/

const emailInput = document.getElementById("email") as HTMLInputElement;
emailInput.value = "test@example.com";

/********************************************************************************************
 * 3️⃣ Angle Bracket Syntax (<type>) – تجنبها مع JSX/TSX
 ********************************************************************************************/

let msg: any = "hello";
let len = (msg as string).length;
// لا تستخدم <> في React أو Angular

/********************************************************************************************
 * 4️⃣ Assertions مع Union Types
 ********************************************************************************************/

type Result = { success: true; data: string } | { success: false; error: string };

function unsafe(result: Result) {
    const r = result as { success: true; data: string }; // ⚠️ قد يكون خطأ
    console.log(r.data);
}

// الأفضل: Type Guard
function safe(result: Result) {
    if (result.success) console.log(result.data);
}

/********************************************************************************************
 * 5️⃣ Assertions مع DOM
 ********************************************************************************************/

const usernameInput = document.querySelector("#username") as HTMLInputElement;
const formElement = document.querySelector("form") as HTMLFormElement;

usernameInput.value = "Ahmed";
formElement.onsubmit = (e) => e.preventDefault();

/********************************************************************************************
 * 6️⃣ Double Assertions (نادر جدًا)
 ********************************************************************************************/

interface Cat { meow(): void }
interface Dog { bark(): void }

let pet = {} as Dog;
let c = pet as unknown as Cat; // ⚠️ خطير – لا تستخدمه إلا للضرورة

/********************************************************************************************
 * 7️⃣ Const Assertions (as const)
 ********************************************************************************************/

const COLORS = ["red", "green", "blue"] as const;
// readonly ["red", "green", "blue"]

const CONFIG = {
    host: "localhost",
    port: 3000,
} as const;

/********************************************************************************************
 * 8️⃣ Non-null Assertion Operator (!)
 * يخبر TypeScript أن القيمة ليست null.
 * ⚠️ إذا كانت null فعليًا → Runtime Error.
 ********************************************************************************************/

function process(v: string | null) {
    console.log(v!.toUpperCase()); // ⚠️ نستخدمه فقط إذا متأكدين
}

/********************************************************************************************
 * 9️⃣ Non-null Assertion مع DOM
 ********************************************************************************************/

const input2 = document.querySelector<HTMLInputElement>("#email")!;
input2.value = "test@example.com";

/********************************************************************************************
 * 🔟 متى نستخدم Assertions؟
 * ✅ عندما تكون متأكدًا 100% من النوع
 * ❌ لا تستخدمه لإخفاء أخطاء TypeScript
 ********************************************************************************************/

// ❌ خطأ – يخفي خطأ حقيقي
const data = { id: 1 };
// const u = data as User; // لا تفعل هذا

/********************************************************************************************
 * 1️⃣1️⃣ Assertions في Angular
 ********************************************************************************************/

// مثال مبسّط
class ExampleComponent {
    //   @ViewChild('emailInput') emailInput!: ElementRef<HTMLInputElement>; // Non-null assertion

    //   ngAfterViewInit() {
    //     this.emailInput.nativeElement.focus();
    //   }

    onClick(event: Event) {
        const btn = event.target as HTMLButtonElement;
        btn.disabled = true;
    }
}

/********************************************************************************************
 * 1️⃣2️⃣ Assertions vs Type Guards
 ********************************************************************************************/

interface Cat2 { type: "cat"; meow(): void }
interface Dog2 { type: "dog"; bark(): void }
type Pet2 = Cat2 | Dog2;

function isCat(pet: Pet2): pet is Cat2 {
    return pet.type === "cat";
}

function makeSound(pet: Pet2) {
    if (isCat(pet)) pet.meow(); else pet.bark();
}

/********************************************************************************************
 * 1️⃣3️⃣ Satisfies Operator (TypeScript 4.9+)
 * يحافظ على Literal Types ويتأكد من التوافق.
 ********************************************************************************************/

type ApiConfig = { host: string; port: number };

const apiConfig = {
    host: "localhost",
    port: 3000,
} satisfies ApiConfig;

/********************************************************************************************
 * 1️⃣4️⃣ مثال عملي شامل – مختصر (بدون DOM حقيقي)
 ********************************************************************************************/

interface FormField {
    value: string;
    error?: string;
}

class SimpleForm {
    private fields: Record<string, FormField> = {};

    constructor(names: string[]) {
        names.forEach(n => this.fields[n] = { value: "" });
    }

    setValue(name: string, value: string) {
        const field = this.fields[name]!; // Non-null assertion
        field.value = value;
    }

    getValues<T extends Record<string, any>>() {
        return this.fields as unknown as T; // Assertion آمن إذا تأكدت من الشكل
    }
}
