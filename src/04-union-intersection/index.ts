/*
============================================
📘 Union & Intersection Types في TypeScript
============================================

✅ ما هو Union Type؟
-------------------
Union Type هو نوع يسمح للمتغير أن يحمل قيمة من نوع واحد أو أكثر (OR logic).
يُكتب باستخدام الرمز | بين الأنواع.

✅ لماذا نستخدم Union Types؟
----------------------------
• المرونة: السماح بأكثر من نوع دون فقدان Type Safety
• API Responses: معالجة حالات النجاح والفشل بشكل آمن
• State Management: تمثيل حالات مختلفة (loading, success, error)
• Input Validation: قبول أنواع مختلفة من المدخلات

✅ أين نستخدم Union Types؟
--------------------------
• معالجة استجابات API في Angular Services
• إدارة حالات الـ Components (AsyncState pattern)
• Function Parameters التي تقبل أنواع متعددة
• Form Validation و Input Handling
• Event Handling مع أنواع أحداث مختلفة

✅ متى نستخدم Union Types؟
--------------------------
• عندما تحتاج قيمة يمكن أن تكون من عدة أنواع
• عند التعامل مع APIs التي ترجع أنواع مختلفة
• في State Management لتمثيل حالات متعددة
• عندما تريد Type Safety مع المرونة

💡 ملاحظات مهمة:
--------------
⚠️ استخدم Type Narrowing للوصول الآمن للخصائص
⚠️ Discriminated Unions أفضل نمط للـ Union Types
✅ TypeScript تتحقق تلقائياً من النوع بعد Narrowing
============================================
*/

// ============================================
// 1️⃣ Union Types - الأساسيات
// ============================================

// مثال بسيط: قبول string أو number
let id: string | number;
id = "ABC123"; // ✅ صحيح
id = 12345;    // ✅ صحيح
// id = true;  // ❌ خطأ - boolean غير مسموح

// Function مع Union Parameter
function printId(id: string | number): void {
    console.log(`ID: ${id}`);
}

printId("ABC123"); // ✅
printId(12345);    // ✅

// Union من Literal Types (قيم محددة)
type Status = "pending" | "approved" | "rejected";
let orderStatus: Status = "pending"; // ✅
// orderStatus = "unknown"; // ❌ خطأ

// Union مع Objects - مثال API Response
type SuccessResponse = {
    status: "success";
    data: any
};

type ErrorResponse = {
    status: "error";
    message: string;
    code: number
};

type ApiResponse = SuccessResponse | ErrorResponse;

function handleResponse(resp: ApiResponse): void {
    // TypeScript تعرف تلقائياً النوع بناءً على status
    if (resp.status === "success") {
        console.log("Data:", resp.data);
    } else {
        console.log(`Error ${resp.code}: ${resp.message}`);
    }
}

/*
============================================
📘 Type Narrowing (تضييق النوع)
============================================

✅ ما هو Type Narrowing؟
-----------------------
هو عملية تحديد النوع الفعلي من Union Type للوصول الآمن للخصائص.

✅ لماذا نحتاج Type Narrowing؟
------------------------------
• Union Type يحتوي على أنواع متعددة
• لا يمكن الوصول لخصائص معينة إلا بعد تحديد النوع
• Type Safety: منع الأخطاء في Runtime

✅ طرق Type Narrowing:
---------------------
1. typeof - للأنواع الأساسية (string, number, boolean)
2. Truthiness - فحص القيم الصحيحة/الخاطئة
3. Equality/Discriminant - استخدام خاصية مميزة
4. in operator - فحص وجود خاصية
5. instanceof - للـ Classes

💡 أفضل نمط: Discriminated Unions (Tagged Unions)
============================================
*/

// ============================================
// 2️⃣ Type Narrowing - الطرق المختلفة
// ============================================

// --- typeof Narrowing ---
// ✅ الأفضل للأنواع الأساسية: string, number, boolean
function processValue(value: string | number): string {
    if (typeof value === "string") {
        return value.toUpperCase(); // ✅ string methods آمنة
    } else {
        return value.toFixed(2);    // ✅ number methods آمنة
    }
}

// --- Truthiness Narrowing ---
// ✅ مفيد مع null و undefined
function printText(text: string | null | undefined): void {
    if (text) {
        // text هنا string فقط (null/undefined محذوفة)
        console.log(text.toUpperCase());
    } else {
        console.log("No text provided");
    }
}

// --- Equality Narrowing (Discriminated Unions) ---
// ✅ النمط الأقوى والأكثر استخداماً
type Shape =
    | { kind: "circle"; radius: number }
    | { kind: "square"; size: number }
    | { kind: "rectangle"; width: number; height: number };

function getArea(shape: Shape): number {
    // switch على discriminant property (kind)
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "square":
            return shape.size ** 2;
        case "rectangle":
            return shape.width * shape.height;
    }
}

// --- in operator Narrowing ---
// ✅ فحص وجود خاصية في Object
type Bird = {
    fly: () => void;
    layEggs: () => void
};

type Fish = {
    swim: () => void;
    layEggs: () => void
};

function move(animal: Bird | Fish): void {
    if ("fly" in animal) {
        animal.fly();  // ✅ Bird
    } else {
        animal.swim(); // ✅ Fish
    }
}

// --- instanceof Narrowing ---
// ✅ للتحقق من Classes
class Dog {
    bark() { console.log("Woof!"); }
}

class Cat {
    meow() { console.log("Meow!"); }
}

function makeSound(animal: Dog | Cat): void {
    if (animal instanceof Dog) {
        animal.bark(); // ✅ Dog
    } else {
        animal.meow(); // ✅ Cat
    }
}

/*
============================================
📘 Discriminated Unions (Tagged Unions)
============================================

✅ ما هو Discriminated Union؟
----------------------------
نمط قوي يستخدم خاصية مميزة (discriminant) لتحديد النوع.
عادة تكون الخاصية: type, kind, status, tag

✅ لماذا Discriminated Unions؟
-----------------------------
• Type Safety كامل
• سهولة القراءة والصيانة
• Exhaustive Checking في switch/if
• الأفضل في Angular State Management

✅ أين نستخدمها؟
-----------------
• API Response Handling
• State Management (loading/success/error)
• Payment Methods
• Event Types
• Form Validation Results

✅ متى نستخدمها؟
-----------------
• عندما يكون لديك أنواع متعددة منفصلة
• في معالجة حالات مختلفة تماماً
• عند الحاجة لـ Type Safety قوي
============================================
*/

// ============================================
// 3️⃣ Discriminated Unions - أمثلة عملية
// ============================================

// مثال 1: Payment Methods
type PaymentMethod =
    | { type: "cash"; amount: number }
    | { type: "card"; cardNumber: string; amount: number }
    | { type: "paypal"; email: string; amount: number };

function processPayment(payment: PaymentMethod): string {
    // switch على discriminant property (type)
    switch (payment.type) {
        case "cash":
            return `Cash payment: $${payment.amount}`;
        case "card":
            return `Card payment (${payment.cardNumber}): $${payment.amount}`;
        case "paypal":
            return `PayPal payment (${payment.email}): $${payment.amount}`;
    }
}

// مثال 2: Async State (مهم جداً في Angular!)
// ✅ نمط شائع جداً في Angular Services
type LoadingState = {
    status: "loading"
};

type SuccessState<T> = {
    status: "success";
    data: T
};

type ErrorState = {
    status: "error";
    error: string
};

type AsyncState<T> = LoadingState | SuccessState<T> | ErrorState;

// مثال استخدام في Angular Component
interface User {
    id: number;
    name: string;
    email: string;
}

class UserComponent {
    userState: AsyncState<User> = { status: "loading" };

    displayUser(): string {
        // Type-safe handling لكل حالة
        switch (this.userState.status) {
            case "loading":
                return "Loading user...";
            case "success":
                return `User: ${this.userState.data.name}`; // ✅ data آمنة
            case "error":
                return `Error: ${this.userState.error}`;    // ✅ error آمنة
        }
    }

    // في Angular Service
    loadUser(id: number): void {
        this.userState = { status: "loading" };

        // Simulated API call
        setTimeout(() => {
            this.userState = {
                status: "success",
                data: { id, name: "Ahmed", email: "ahmed@example.com" }
            };
        }, 1000);
    }
}

/*
============================================
📘 Intersection Types (&)
============================================

✅ ما هو Intersection Type؟
--------------------------
Intersection Type يجمع عدة أنواع في نوع واحد (AND logic).
يُكتب باستخدام الرمز & بين الأنواع.
القيمة يجب أن تمتلك جميع خصائص الأنواع المدمجة.

✅ لماذا نستخدم Intersection Types؟
-----------------------------------
• دمج أنواع متعددة دون تكرار
• إنشاء أنواع معقدة من أنواع بسيطة
• Mixins Pattern
• إضافة خصائص مشتركة (timestamps, audit, etc)

✅ أين نستخدم Intersection Types؟
---------------------------------
• Entity Models مع Audit Fields
• User Types مع Roles
• Base Types + Extended Features
• Mixins للقدرات المشتركة

✅ متى نستخدم Intersection Types؟
---------------------------------
• عندما تحتاج دمج أنواع متعددة
• لإضافة خصائص مشتركة لعدة أنواع
• عند بناء Type Hierarchies
• في Mixins Pattern

💡 الفرق بين Union و Intersection:
---------------------------------
Union (|) = أو → واحد من الأنواع
Intersection (&) = و → جميع الأنواع معاً
============================================
*/

// ============================================
// 4️⃣ Intersection Types - الأساسيات
// ============================================

// مثال بسيط: دمج نوعين
type Person = {
    name: string;
    age: number
};

type Employee = {
    employeeId: number;
    department: string
};

// Intersection = Person + Employee
type EmployeePerson = Person & Employee;

const employee: EmployeePerson = {
    name: "Ahmed",
    age: 25,
    employeeId: 12345,
    department: "Engineering"
};

// دمج أكثر من نوع
type Timestamped = {
    createdAt: Date;
    updatedAt: Date
};

type WithId = {
    id: number
};

type AuditedEntity = WithId & Timestamped & {
    createdBy: string
};

const document: AuditedEntity = {
    id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: "admin"
};

/*
============================================
📘 دمج Union و Intersection معاً
============================================

✅ لماذا ندمج Union و Intersection؟
-----------------------------------
• بناء Type Hierarchies معقدة
• Base Types + Specific Variants
• مثال: User System مع أنواع مستخدمين مختلفة

✅ النمط الشائع:
---------------
Base Type (Intersection) + Role/Type (Union)
مثال: BaseInfo & (Admin | User | Guest)
============================================
*/

// ============================================
// 5️⃣ Combining Union & Intersection
// ============================================

// مثال: نظام حسابات (Accounts) مع أنواع مستخدمين

// خطوة 1: تعريف أنواع المستخدمين (Union)
type Admin = {
    role: "admin";
    permissions: string[]
};

type NormalUser = {
    role: "user";
    subscription: "free" | "premium"
};

type Guest = {
    role: "guest"
};

type UserType = Admin | NormalUser | Guest;

// خطوة 2: المعلومات الأساسية (Base)
type BaseInfo = {
    id: number;
    name: string;
    email: string
};

// خطوة 3: دمج Base مع UserType
type Account = BaseInfo & UserType;

// أمثلة استخدام
const adminAccount: Account = {
    id: 1,
    name: "Admin",
    email: "admin@example.com",
    role: "admin",
    permissions: ["read", "write", "delete"]
};

const userAccount: Account = {
    id: 2,
    name: "User",
    email: "user@example.com",
    role: "user",
    subscription: "premium"
};

// Function مع Type Narrowing
function hasPermission(account: Account, permission: string): boolean {
    if (account.role === "admin") {
        // TypeScript تعرف أن account هو Admin
        return account.permissions.includes(permission);
    }
    return false;
}

/*
============================================
📘 Practical Patterns (أنماط عملية)
============================================

✅ Pattern 1: Extending Types
---------------------------
إضافة خصائص لنوع موجود لإنشاء أنواع متخصصة

✅ Pattern 2: Mixins
------------------
دمج قدرات (capabilities) متعددة في نوع واحد

✅ Pattern 3: Validation Pattern
------------------------------
استخدام Discriminated Unions لنتائج Validation
============================================
*/

// ============================================
// 6️⃣ Practical Patterns - أمثلة عملية
// ============================================

// --- Pattern 1: Extending Types ---
// ✅ مفيد في Product Catalogs

type Product = {
    id: number;
    name: string;
    price: number
};

type DigitalProduct = Product & {
    downloadUrl: string;
    fileSize: number
};

type PhysicalProduct = Product & {
    weight: number;
    dimensions: { w: number; h: number; d: number }
};

type AnyProduct = DigitalProduct | PhysicalProduct;

function displayProductInfo(product: AnyProduct): string {
    let info = `${product.name} - $${product.price}`;

    // Type narrowing بـ in operator
    if ("downloadUrl" in product) {
        info += ` (Download: ${product.fileSize}MB)`;
    } else {
        info += ` (Weight: ${product.weight}kg)`;
    }

    return info;
}

// --- Pattern 2: Mixins ---
// ✅ دمج قدرات متعددة

type Flyable = {
    fly: () => void;
    altitude: number
};

type Swimmable = {
    swim: () => void;
    depth: number
};

// Duck يمتلك كلا القدرتين
type Duck = Flyable & Swimmable & {
    name: string
};

const duck: Duck = {
    name: "Donald",
    altitude: 100,
    depth: 5,
    fly: () => console.log("Flying at altitude:", duck.altitude),
    swim: () => console.log("Swimming at depth:", duck.depth)
};

// --- Pattern 3: Validation Pattern ---
// ✅ مهم جداً في Form Validation

type ValidationSuccess = {
    valid: true;
    data: any
};

type ValidationError = {
    valid: false;
    errors: string[]
};

type ValidationResult = ValidationSuccess | ValidationError;

function validateInput(input: string): ValidationResult {
    if (input.trim().length > 0) {
        return {
            valid: true,
            data: input.trim()
        };
    }

    return {
        valid: false,
        errors: ["Input cannot be empty"]
    };
}

// استخدام في Angular Form
function handleFormSubmit(input: string): void {
    const result = validateInput(input);

    if (result.valid) {
        // ✅ result.data متاحة فقط هنا
        console.log("Valid data:", result.data);
    } else {
        // ✅ result.errors متاحة فقط هنا
        console.log("Errors:", result.errors);
    }
}

/*
============================================
📘 تمرين عملي: Event Management System
============================================

✅ الهدف من التمرين:
-------------------
بناء نظام إدارة أحداث يستخدم:
• Discriminated Unions للأنواع المختلفة
• Intersection Types لدمج Base + Specific
• Type Narrowing للمعالجة الآمنة

✅ المتطلبات:
-----------
1. أنواع أحداث: Online, In-Person, Hybrid
2. Base Event Info مشتركة
3. Event Status management
4. Type-safe operations

💡 هذا المثال يحاكي سيناريوهات Angular حقيقية
============================================
*/

// ============================================
// 7️⃣ تمرين عملي: Event Management System
// ============================================

// --- خطوة 1: تعريف أنواع الأحداث (Discriminated Union) ---

type OnlineEvent = {
    type: "online";
    meetingUrl: string;
    durationMinutes: number
};

type InPersonEvent = {
    type: "in-person";
    location: string;
    capacity: number
};

type HybridEvent = {
    type: "hybrid";
    meetingUrl: string;
    location: string;
    capacity: number
};

type EventType = OnlineEvent | InPersonEvent | HybridEvent;

// --- خطوة 2: Base Event Information ---

type BaseEvent = {
    id: number;
    title: string;
    description?: string;
    date: Date;
    organizer: string
};

// --- خطوة 3: Complete Event (Base + Type) ---

type CompleteEvent = BaseEvent & EventType;

// --- خطوة 4: Event Status ---

type EventStatus = "draft" | "published" | "cancelled" | "completed";

type EventWithStatus = CompleteEvent & {
    status: EventStatus
};

// --- خطوة 5: Event Manager Class ---

class EventManager {
    private events: EventWithStatus[] = [];
    private nextId = 1;

    // إنشاء حدث جديد
    // ✅ الحل: استخدم CompleteEvent مباشرة (بدون Omit)
    createEvent(event: Omit<BaseEvent, 'id'> & EventType): EventWithStatus {
        const newEvent: EventWithStatus = {
            ...event,
            id: this.nextId++,
            status: "draft"
        };

        this.events.push(newEvent);
        return newEvent;
    }

    // عرض معلومات الحدث مع Type Narrowing
    getEventInfo(event: EventWithStatus): string {
        const baseInfo = `[${event.status.toUpperCase()}] ${event.title}`;

        // Type narrowing حسب event.type
        switch (event.type) {
            case "online":
                return `${baseInfo} - Online Event
                        URL: ${event.meetingUrl}
                        Duration: ${event.durationMinutes} minutes`;

            case "in-person":
                return `${baseInfo} - In-Person Event
                        Location: ${event.location}
                        Capacity: ${event.capacity} attendees`;

            case "hybrid":
                return `${baseInfo} - Hybrid Event
                        Location: ${event.location}
                        Online URL: ${event.meetingUrl}
                        Capacity: ${event.capacity} attendees`;
        }
    }

    // التحقق من إمكانية التسجيل
    canRegister(event: EventWithStatus): boolean {
        // يجب أن يكون الحدث منشور
        if (event.status !== "published") {
            return false;
        }

        // Online events دائماً متاحة
        if (event.type === "online") {
            return true;
        }

        // In-person و Hybrid يعتمد على capacity
        if (event.type === "in-person" || event.type === "hybrid") {
            return event.capacity > 0;
        }

        return false;
    }

    // تصفية الأحداث حسب النوع
    filterEventsByType(type?: EventType['type']): EventWithStatus[] {
        if (!type) {
            return this.events;
        }

        return this.events.filter(event => event.type === type);
    }

    // تحديث حالة الحدث
    updateEventStatus(eventId: number, status: EventStatus): boolean {
        const event = this.events.find(e => e.id === eventId);

        if (!event) {
            return false;
        }

        event.status = status;
        return true;
    }

    // الحصول على جميع الأحداث
    getAllEvents(): EventWithStatus[] {
        return this.events;
    }
}

// --- اختبار النظام ---

const eventManager = new EventManager();

// إنشاء حدث Online
const webinar = eventManager.createEvent({
    type: "online",
    title: "TypeScript Best Practices",
    description: "Learn TypeScript advanced features",
    date: new Date("2025-12-01"),
    organizer: "Tech Academy",
    meetingUrl: "https://meet.example.com/webinar",
    durationMinutes: 90
});

// إنشاء حدث In-Person
const workshop = eventManager.createEvent({
    type: "in-person",
    title: "Angular Workshop",
    description: "Hands-on Angular development",
    date: new Date("2025-12-15"),
    organizer: "Code School",
    location: "Cairo Tech Hub",
    capacity: 30
});

// إنشاء حدث Hybrid
const conference = eventManager.createEvent({
    type: "hybrid",
    title: "Tech Conference 2025",
    date: new Date("2026-01-20"),
    organizer: "Tech Community",
    meetingUrl: "https://meet.example.com/conference",
    location: "Cairo Convention Center",
    capacity: 200
});

// نشر الأحداث
eventManager.updateEventStatus(webinar.id, "published");
eventManager.updateEventStatus(workshop.id, "published");

// عرض معلومات الأحداث
console.log(eventManager.getEventInfo(webinar));
console.log(eventManager.getEventInfo(workshop));
console.log(eventManager.getEventInfo(conference));

// التحقق من التسجيل
console.log("Can register for webinar?", eventManager.canRegister(webinar));
console.log("Can register for conference?", eventManager.canRegister(conference));

// تصفية الأحداث
const onlineEvents = eventManager.filterEventsByType("online");
console.log("Online events:", onlineEvents.length);

/*
============================================
📘 نصائح سريعة للمبتدئين
============================================

✅ Best Practices:
----------------
1. استخدم Discriminated Unions (خاصية مميزة مثل type/status)
   → أسهل في Type Narrowing وأكثر أماناً

2. اجعل الـ discriminant property بسيطة
   → استخدم string literals: "type", "kind", "status"

3. استخدم Union لـ "واحد من" و Intersection لـ "جميع"
   → Union (|) = OR logic
   → Intersection (&) = AND logic

4. في Angular:
   → AsyncState pattern للـ API calls
   → Discriminated Unions للـ State Management
   → Intersection للـ Base + Extended Types

5. Type Narrowing:
   → typeof للأنواع الأساسية
   → in operator للـ Objects
   → instanceof للـ Classes
   → switch/if على discriminant property

⚠️ تجنب:
--------
❌ Union types معقدة جداً (أكثر من 5 أنواع)
❌ Intersection مع أنواع متناقضة
❌ الوصول لخصائص دون Type Narrowing
❌ استخدام any مع Union/Intersection

💡 تذكر:
-------
• Union Types = مرونة + Type Safety
• Discriminated Unions = أفضل نمط
• Intersection Types = دمج الأنواع
• Type Narrowing = الوصول الآمن

🚀 الخطوة التالية:
-----------------
بعد إتقان Union و Intersection:
→ Generics
→ Conditional Types
→ Mapped Types
→ Utility Types

============================================
✨ انتهى الدرس - جاهز للتطبيق في Angular! 🎯
============================================
*/