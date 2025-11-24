/*
============================================
📘 04 - Union & Intersection Types
============================================

📑 الفهرس (Table of Contents)
1. مقدمة سريعة
2. Union Types — الأساسيات
  - أمثلة بسيطة
  - Union مع Objects
3. Type Narrowing (طرق تضييق النوع)
  - typeof
  - Truthiness
  - Equality / Discriminant (Tagged Unions)
  - in operator
  - instanceof
4. Discriminated Unions — نمط قوي
  - مثال: processPayment
  - مثال عملي: AsyncState (Angular-friendly)
5. Intersection Types — الأساسيات
  - أمثلة
6. دمج Union و Intersection
7. أنماط عملية (Practical Patterns)
  - Extending Types
  - Mixins
  - Conditional/Validation pattern
8. تمرين عملي: Event Management
9. نصائح سريعة للمبتدئين

ملاحظات هامّة للمستوى المبتدئ:
- الشرح مكتوب داخل تعليقات بالعربية، والكود جاهز للنسخ إلى VS Code.
- سأبقي الأمور بسيطة ومباشرة لتسهيل الانتقال لاحقًا إلى Angular.
*/

// --------------------------------------------
// 1️⃣ مقدمة سريعة
// --------------------------------------------
// Union و Intersection تسمحان ببناء أنواع أكثر مرونة من أنواع بسيطة.

// --------------------------------------------
// 2️⃣ Union Types — الأساسيات
// --------------------------------------------
// Union يعني "أو" — القيمة يمكن أن تكون نوعاً واحداً من عدة أنواع.

let id: string | number;
id = "ABC123"; // ✅
id = 12345;     // ✅
// id = true;   // ❌ خطأ

function printId(id: string | number): void {
    console.log(`ID: ${id}`);
}

printId("ABC123");
printId(12345);

// Union من عدة قيم حرفية (Literal types)
type Status = "pending" | "approved" | "rejected";
let orderStatus: Status = "pending";

// --------------------------------------------
// Union مع Objects — مثال API Response
// --------------------------------------------

type SuccessResponse = { status: "success"; data: any };
type ErrorResponse = { status: "error"; message: string; code: number };

type ApiResponse = SuccessResponse | ErrorResponse;

function handleResponse(resp: ApiResponse): void {
    if (resp.status === "success") {
        // هنا TypeScript تعرف أن resp هو SuccessResponse
        console.log("Data:", resp.data);
    } else {
        // هنا TypeScript تعرف أن resp هو ErrorResponse
        console.log(`Error ${resp.code}: ${resp.message}`);
    }
}

// --------------------------------------------
// 3️⃣ Type Narrowing — كيف نضيق النوع
// --------------------------------------------
// لأن Union يمكن أن تكون أكثر من نوع، نستخدم "narrowing" قبل الوصول لخصائص خاصة.

// --- typeof
function processValue(value: string | number): string {
    if (typeof value === "string") {
        return value.toUpperCase();
    } else {
        return value.toFixed(2); // هنا value هي number
    }
}

// --- Truthiness (فحص الحقيقة)
function printText(text: string | null | undefined): void {
    if (text) {
        // text هنا string فقط
        console.log(text.toUpperCase());
    } else {
        console.log("No text provided");
    }
}

// --- Equality Narrowing / Discriminant property (نمط مهم جداً)

type Shape =
    | { kind: "circle"; radius: number }
    | { kind: "square"; size: number }
    | { kind: "rectangle"; width: number; height: number };

function getArea(shape: Shape): number {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "square":
            return shape.size ** 2;
        case "rectangle":
            return shape.width * shape.height;
    }
}

// --- in operator

type Bird = { fly: () => void; layEggs: () => void };
type Fish = { swim: () => void; layEggs: () => void };

function move(animal: Bird | Fish): void {
    if ("fly" in animal) {
        animal.fly(); // ضمناً Bird
    } else {
        animal.swim(); // Fish
    }
}

// --- instanceof
class Dog { bark() { console.log("Woof!"); } }
class Cat { meow() { console.log("Meow!"); } }

function makeSound(a: Dog | Cat): void {
    if (a instanceof Dog) {
        a.bark();
    } else {
        a.meow();
    }
}

// --------------------------------------------
// 4️⃣ Discriminated Unions — Tagged Unions
// --------------------------------------------
// كل نوع يحتوي على خاصية مميزة (discriminant) مثل "type" أو "status".

type PaymentMethod =
    | { type: "cash"; amount: number }
    | { type: "card"; cardNumber: string; amount: number }
    | { type: "paypal"; email: string; amount: number };

function processPayment(p: PaymentMethod): string {
    switch (p.type) {
        case "cash":
            return `Cash payment: $${p.amount}`;
        case "card":
            return `Card payment (${p.cardNumber}): $${p.amount}`;
        case "paypal":
            return `PayPal payment (${p.email}): $${p.amount}`;
    }
}

// مثال عملي شبيه بواجهات Angular

type LoadingState = { status: "loading" };
type SuccessState<T> = { status: "success"; data: T };
type ErrorState = { status: "error"; error: string };

type AsyncState<T> = LoadingState | SuccessState<T> | ErrorState;

interface User { id: number; name: string }

class UserComponentExample {
    userState: AsyncState<User> = { status: "loading" };

    displayUser(): string {
        switch (this.userState.status) {
            case "loading":
                return "Loading...";
            case "success":
                return `User: ${this.userState.data.name}`; // data آمنة هنا
            case "error":
                return `Error: ${this.userState.error}`;
        }
    }
}

// --------------------------------------------
// 5️⃣ Intersection Types — التقاطع (&)
// --------------------------------------------
// Intersection تعني أن القيمة يجب أن تمتلك كل خصائص الأنواع المدمجة.

type Person = { name: string; age: number };
type Employee = { employeeId: number; department: string };

type EmployeePerson = Person & Employee;

const employee: EmployeePerson = {
    name: "Ahmed",
    age: 25,
    employeeId: 12345,
    department: "Engineering",
};

// دمج أكثر من نوع
type Timestamped = { createdAt: Date; updatedAt: Date };
type WithId = { id: number };

type AuditedEntity = WithId & Timestamped & { createdBy: string };

const doc: AuditedEntity = {
    id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: "admin",
};

// --------------------------------------------
// 6️⃣ Combining Union & Intersection
// --------------------------------------------
// مثال عملي: أنواع حسابات (Account) مبنية على BaseInfo + UserType (Union)

type Admin = { role: "admin"; permissions: string[] };
type NormalUser = { role: "user"; subscription: "free" | "premium" };
type Guest = { role: "guest" };

type UserType = Admin | NormalUser | Guest;

type BaseInfo = { id: number; name: string; email: string };

type Account = BaseInfo & UserType;

const adminAcc: Account = {
    id: 1,
    name: "Admin",
    email: "admin@example.com",
    role: "admin",
    permissions: ["read", "write"],
};

function hasPermission(account: Account, permission: string): boolean {
    if (account.role === "admin") {
        return account.permissions.includes(permission);
    }
    return false;
}

// --------------------------------------------
// 7️⃣ Practical Patterns
// --------------------------------------------
// Pattern 1: Extending Types

type Product = { id: number; name: string; price: number };

type DigitalProduct = Product & { downloadUrl: string; fileSize: number };
type PhysicalProduct = Product & { weight: number; dimensions: { w: number; h: number; d: number } };

type AnyProduct = DigitalProduct | PhysicalProduct;

function displayProductInfo(p: AnyProduct): string {
    let info = `${p.name} - $${p.price}`;
    if ("downloadUrl" in p) {
        info += ` (Download: ${p.fileSize}MB)`; // digital
    } else {
        info += ` (Weight: ${p.weight}kg)`; // physical
    }
    return info;
}

// Pattern 2: Mixins — دمج قدرات

type Flyable = { fly: () => void; altitude: number };
type Swimmable = { swim: () => void; depth: number };

type Duck = Flyable & Swimmable & { name: string };

const duck: Duck = {
    name: "Donald",
    altitude: 100,
    depth: 5,
    fly: () => console.log("Flying"),
    swim: () => console.log("Swimming"),
};

// Pattern 3: Conditional/Validation pattern

type ValidationSuccess = { valid: true; data: any };
type ValidationError = { valid: false; errors: string[] };

type ValidationResult = ValidationSuccess | ValidationError;

function validateInput(input: string): ValidationResult {
    if (input.trim().length > 0) {
        return { valid: true, data: input.trim() };
    }
    return { valid: false, errors: ["Input cannot be empty"] };
}

// --------------------------------------------
// 8️⃣ تمرين عملي: Event Management (حل مختصر)
// --------------------------------------------
// المطلوب أنشئ Discriminated Union للأحداث واستخدم Intersection لبناء CompleteEvent

// Event types (discriminated)

type OnlineEvent = { type: "online"; meetingUrl: string; durationMinutes: number };
type InPersonEvent = { type: "in-person"; location: string; capacity: number };
type HybridEvent = { type: "hybrid"; meetingUrl: string; location: string; capacity: number };

type EventType = OnlineEvent | InPersonEvent | HybridEvent;

// Base event

type BaseEvent = { id: number; title: string; description?: string; date: Date; organizer: string };

// Complete event = base + specific

type CompleteEvent = BaseEvent & EventType;

type EventStatus = "draft" | "published" | "cancelled" | "completed";

type EventWithStatus = CompleteEvent & { status: EventStatus };

class EventManager {
    private events: EventWithStatus[] = [];
    private nextId = 1;

    createEvent(event: CompleteEvent): EventWithStatus {
        const e: EventWithStatus = { ...event, id: this.nextId++, status: "draft" };
        this.events.push(e);
        return e;
    }

    getEventInfo(e: EventWithStatus): string {
        // type narrowing حسب e.type
        switch (e.type) {
            case "online":
                return `Online: ${e.title} (${e.meetingUrl})`;
            case "in-person":
                return `In-person: ${e.title} at ${e.location} (capacity: ${e.capacity})`;
            case "hybrid":
                return `Hybrid: ${e.title} at ${e.location} & ${e.meetingUrl}`;
        }
    }

    canRegister(e: EventWithStatus): boolean {
        if (e.status !== "published") return false;
        if (e.type === "in-person" || e.type === "hybrid") {
            // ضمناً in-person و hybrid يمتلكان capacity
            return e.capacity > 0;
        }
        return true; // online يمكن التسجيل دائماً
    }

    filterEvents(events: EventWithStatus[], type?: EventType['type']): EventWithStatus[] {
        return events.filter(ev => (type ? ev.type === type : true));
    }
}

// اختبار سريع
const manager = new EventManager();
// const ev1 = manager.createEvent({ type: "online", title: "Webinar", date: new Date(), organizer: "A", meetingUrl: "https://meet" , description: "" });
// const ev2 = manager.createEvent({ type: "in-person", title: "Workshop", date: new Date(), organizer: "B", location: "Cairo", capacity: 30 });

// console.log(manager.getEventInfo(ev1));
// console.log(manager.getEventInfo(ev2));

// --------------------------------------------
// 9️⃣ نصائح سريعة للمبتدئين
// --------------------------------------------
// - استخدم discriminated unions (خاصية مميزة مثل 'type' أو 'status') لأنّها تسهّل التضييق (narrowing).
// - استخدم Union عندما تريد "واحد من"، و Intersection عندما تريد "كلّ".
// - عند التعامل مع response من API استخدم union مع discriminant لتسهيل المعالجة في Angular.
// - اجعل الأنواع بسيطة وواضحة في البداية، ولا تدخل في Conditional Types أو Advanced Mapped Types الآن.

// انتهى الدرس — جاهز لتحويل هذا الملف أو أي درس آخر بنفس الأسلوب.
