/**
 * =============================================================
 *  📘 TypeScript: Interfaces vs Type Aliases - شرح شامل ومنظم
 * =============================================================
 * 
 * 📌 فهرس الدرس (Table of Contents)
 * ---------------------------------
 * 1. مقدمة سريعة
 * 2. تعريف Interface
 * 3. تعريف Type Alias
 * 4. الفرق بين توسيع Interface و Intersection Types
 * 5. الأشياء التي يستطيع Type فعلها ولا يستطيع Interface
 * 6. استخدام Interface مع Classes
 * 7. Index Signatures
 * 8. متى نستخدم Interface ومتى نستخدم Type
 * 9. خلاصة مبسطة
 */

// =============================================================
// 1️⃣ مقدمة سريعة
// =============================================================

/*
 * ✅ ما هو Interface و Type Alias؟
 * --------------------------------
 * هما أدوات في TypeScript لتعريف أنواع البيانات (Types) وتحديد شكل الكائنات (Objects).
 * 
 * Interface: يُستخدم لتعريف شكل Object أو Contract للـ Classes.
 * Type Alias: يُستخدم لتعريف أي نوع من الأنواع (Objects, Unions, Tuples, Primitives).
 * 
 * 
 * ✅ لماذا نستخدمهم؟
 * ------------------
 * 1. Type Safety: لضمان أن البيانات تتبع شكل معين وتجنب الأخطاء.
 * 2. Autocompletion: دعم IntelliSense في الـ IDE.
 * 3. Documentation: توثيق شكل البيانات بشكل واضح.
 * 4. Maintainability: سهولة الصيانة وإعادة الاستخدام.
 * 
 * 
 * ✅ أين نستخدمهم؟
 * -----------------
 * • في Angular: لتعريف Models للبيانات القادمة من API.
 * • في React/Vue: لتحديد Props و State.
 * • في Node.js: لتحديد Request/Response objects.
 * • في أي مشروع TypeScript: لتحديد شكل البيانات المتوقعة.
 * 
 * 
 * ✅ متى نستخدمهم؟
 * -----------------
 * • عندما تريد تحديد شكل Object بوضوح.
 * • عندما تحتاج إلى Type Safety في المشروع.
 * • عندما تعمل مع API أو قواعد بيانات وتحتاج Model واضح.
 * 
 * 
 * 💡 ملاحظة: Angular يعتمد بشكل كبير على Interfaces لتمثيل Models.
 */

// =============================================================
// 2️⃣ تعريف Interface
// =============================================================

/*
 * ✅ ما هو Interface؟
 * -------------------
 * Interface هو عقد (Contract) يحدد شكل Object معين.
 * يُستخدم لتعريف البنية المتوقعة للكائنات (Properties و Methods).
 * 
 * 
 * ✅ لماذا نستخدم Interface؟
 * ---------------------------
 * 1. تحديد شكل واضح للبيانات.
 * 2. إجبار الكلاسات على تطبيق Methods معينة (implements).
 * 3. إمكانية التوسيع (extends) بسهولة.
 * 4. Declaration Merging (يمكن دمج تعريفات متعددة).
 * 
 * 
 * ✅ أين نستخدم Interface؟
 * -------------------------
 * • Models في Angular (مثل: UserModel, ProductModel).
 * • تعريف Props في React.
 * • تعريف Contracts للـ Classes.
 * • API Response Types.
 * 
 * 
 * ✅ متى نستخدم Interface؟
 * ------------------------
 * • عندما تريد تعريف شكل Object.
 * • عندما تحتاج extends لتوسيع Interface آخر.
 * • عندما تعمل مع Classes وتريد Contract واضح.
 */

// 📌 مثال بسيط: User Interface
interface User {
    id: number;        // رقم المستخدم - إجباري
    name: string;      // الاسم - إجباري
    email: string;     // البريد الإلكتروني - إجباري
    age?: number;      // العمر - اختياري (optional)
}

const user: User = {
    id: 1,
    name: "Ahmed",
    email: "ahmed@example.com",
    // age غير موجودة وهذا مسموح لأنها optional
};

// ✅ صح
// ❌ لو نسينا id أو name أو email، TypeScript سيعطي خطأ


// 📌 Interface مع Methods
interface Calculator {
    add(a: number, b: number): number;
    subtract(a: number, b: number): number;
}

const calc: Calculator = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
};

console.log(calc.add(5, 3));      // Output: 8
console.log(calc.subtract(10, 4)); // Output: 6


// 📌 Readonly Properties
/*
 * Readonly: تجعل الخاصية للقراءة فقط (لا يمكن تغييرها بعد التهيئة).
 * 
 * ✅ لماذا نستخدم Readonly؟
 * • لحماية البيانات الحساسة من التعديل.
 * • لضمان Immutability في أجزاء من الكود.
 * 
 * ✅ أين نستخدمها؟
 * • Configuration Objects.
 * • Constants.
 * • API Keys.
 */
interface Config {
    readonly apiUrl: string;
    readonly timeout: number;
    retries: number; // ليست readonly، يمكن تعديلها
}

const config: Config = {
    apiUrl: "https://api.example.com",
    timeout: 5000,
    retries: 3,
};

config.retries = 5; // ✅ مسموح
// config.apiUrl = "new-url"; // ❌ خطأ! لأنها readonly


// =============================================================
// 3️⃣ تعريف Type Alias
// =============================================================

/*
 * ✅ ما هو Type Alias؟
 * --------------------
 * Type Alias هو اسم بديل (alias) لأي نوع من الأنواع في TypeScript.
 * أكثر مرونة من Interface لأنه يدعم Union Types, Tuples, Primitives.
 * 
 * 
 * ✅ لماذا نستخدم Type Alias؟
 * ----------------------------
 * 1. تعريف Union Types (مثل: string | number).
 * 2. تعريف Tuple Types (مثل: [number, string]).
 * 3. تعريف Conditional Types و Mapped Types.
 * 4. إعطاء اسم واضح لأنواع معقدة.
 * 
 * 
 * ✅ أين نستخدم Type Alias؟
 * --------------------------
 * • Union Types للحالات المحدودة (مثل: Status).
 * • Utility Types (مثل: ReadonlyType).
 * • Tuples للبيانات ذات الترتيب الثابت.
 * 
 * 
 * ✅ متى نستخدم Type Alias؟
 * -------------------------
 * • عندما تحتاج Union أو Intersection.
 * • عندما تحتاج Tuple أو Primitive alias.
 * • عندما تحتاج Advanced Types (Conditional, Mapped).
 */

// 📌 مثال: نفس User ولكن باستخدام Type
type UserType = {
    id: number;
    name: string;
    email: string;
    age?: number;
};

const user2: UserType = {
    id: 2,
    name: "Sara",
    email: "sara@example.com",
};


// 📌 Union Types
/*
 * Union: يسمح بأن يكون المتغير من أكثر من نوع.
 * 
 * ✅ لماذا نستخدم Union؟
 * • لتمثيل قيم محدودة (مثل: Status).
 * • لقبول أكثر من نوع في Function parameter.
 */
type ID = string | number; // يمكن أن يكون string أو number

type Status = "pending" | "approved" | "rejected"; // حالات محدودة

let userId: ID = 123;       // ✅ صح
userId = "user-456";        // ✅ صح أيضاً

let orderStatus: Status = "pending"; // ✅ صح
// orderStatus = "canceled"; // ❌ خطأ! ليست من القيم المسموحة


// 📌 Primitive Type Aliases
type Email = string;
type Count = number;

let userEmail: Email = "test@example.com";
let productCount: Count = 50;


// =============================================================
// 4️⃣ الفرق بين توسيع Interface و Intersection Types
// =============================================================

/*
 * ✅ ما هو التوسيع (Extending)؟
 * ------------------------------
 * التوسيع يعني إنشاء Type جديد يرث خصائص Type آخر + إضافة خصائص جديدة.
 * 
 * 
 * ✅ لماذا نستخدم التوسيع؟
 * -------------------------
 * • لتجنب التكرار (DRY Principle).
 * • لإنشاء Hierarchies واضحة (مثل: Person → Employee).
 * • لإعادة استخدام Types.
 * 
 * 
 * ✅ الفرق بين Interface extends و Type Intersection:
 * ----------------------------------------------------
 * • Interface: تستخدم extends (أوضح وأسهل للقراءة).
 * • Type: يستخدم & للدمج (Intersection).
 * 
 * كلاهما يحقق نفس النتيجة، لكن الـ syntax مختلف.
 */

// 📌 مثال: Interface مع extends
interface Person {
    name: string;
    age: number;
}

interface Employee extends Person {
    employeeId: number;
    department: string;
}

const emp1: Employee = {
    name: "Ahmed",
    age: 25,
    employeeId: 100,
    department: "Engineering",
};


// 📌 مثال: Type مع Intersection (&)
type PersonT = {
    name: string;
    age: number;
};

type EmployeeT = PersonT & {
    employeeId: number;
    department: string;
};

const emp2: EmployeeT = {
    name: "Mohamed",
    age: 30,
    employeeId: 200,
    department: "Marketing",
};

/*
 * 💡 ملاحظة:
 * النتيجة واحدة، لكن:
 * • extends أوضح للقراءة في حالة Interfaces.
 * • & مفيد عند دمج أكثر من Type.
 */


// =============================================================
// 5️⃣ أشياء يستطيع Type فعلها ولا يستطيع Interface
// =============================================================

/*
 * ✅ ما الذي يميز Type Alias؟
 * ----------------------------
 * Type أكثر قوة ومرونة من Interface في حالات معينة:
 * 1. Union Types
 * 2. Tuple Types
 * 3. Mapped Types
 * 4. Conditional Types
 * 5. Primitive Type Aliases
 * 
 * 
 * ✅ لماذا نحتاج هذه المميزات؟
 * ------------------------------
 * • Union: لتمثيل قيم محدودة أو أنواع متعددة.
 * • Tuple: لتمثيل arrays بترتيب ثابت (مثل: coordinates).
 * • Mapped Types: لإنشاء Utility Types (مثل: Readonly, Partial).
 * • Conditional Types: لإنشاء Types ذكية تعتمد على شروط.
 * 
 * 
 * ✅ متى نستخدم هذه الأنواع؟
 * --------------------------
 * • Union: عند تحديد حالات محدودة (Status, Role).
 * • Tuple: عند العمل مع بيانات ذات ترتيب ثابت (Point, RGB).
 * • Mapped/Conditional: عند إنشاء Utility Types متقدمة.
 */

// 1️⃣ Union Types
type Result = "success" | "error";

function handleResult(result: Result) {
    if (result === "success") {
        console.log("✅ العملية نجحت");
    } else {
        console.log("❌ حدث خطأ");
    }
}


// 2️⃣ Tuple Types
/*
 * Tuple: Array ذو طول ثابت وأنواع محددة لكل عنصر.
 * 
 * ✅ أين نستخدم Tuples؟
 * • Coordinates (x, y).
 * • RGB Colors (red, green, blue).
 * • Database rows.
 */
type Point = [number, number]; // [x, y]
type RGB = [number, number, number]; // [red, green, blue]

const point: Point = [10, 20];
const color: RGB = [255, 0, 128];


// 3️⃣ Mapped Types
/*
 * Mapped Type: ينشئ Type جديد من Type موجود بتطبيق transformation.
 * 
 * ✅ لماذا نستخدم Mapped Types؟
 * • لإنشاء Readonly, Partial, Required versions من Type.
 */
type ReadonlyType<T> = {
    readonly [K in keyof T]: T[K];
};

type MutableUser = { name: string; age: number };
type ReadonlyUser = ReadonlyType<MutableUser>;

const user3: ReadonlyUser = { name: "Ali", age: 28 };
// user3.name = "Omar"; // ❌ خطأ! readonly


// 4️⃣ Conditional Types
/*
 * Conditional Type: يختار Type بناءً على شرط.
 * Syntax: T extends U ? X : Y
 * 
 * ✅ متى نستخدم Conditional Types؟
 * • في Advanced Utility Types.
 * • للتحقق من أنواع معينة.
 */
type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false


// 5️⃣ Primitive Type Alias
/*
 * يمكن إعطاء اسم لأنواع بدائية (Primitive Types) لتوضيح المعنى.
 */
type Age = number;
type Username = string;

let userAge: Age = 25;
let username: Username = "john_doe";


// =============================================================
// 6️⃣ استخدام Interface مع Classes (مهم جدًا لـ Angular)
// =============================================================

/*
 * ✅ ما هو implements؟
 * ---------------------
 * implements: تُستخدم لإجبار Class على تطبيق Interface معين.
 * 
 * 
 * ✅ لماذا نستخدم Interface مع Classes؟
 * ---------------------------------------
 * 1. Contracts: لضمان أن الـ Class يطبق Methods معينة.
 * 2. Polymorphism: Classes مختلفة تطبق نفس Interface.
 * 3. Testability: سهولة عمل Mocking في Unit Tests.
 * 
 * 
 * ✅ أين نستخدمها؟
 * -----------------
 * • Services في Angular.
 * • Design Patterns (Strategy, Factory).
 * • OOP Applications.
 * 
 * 
 * ✅ متى نستخدمها؟
 * -----------------
 * • عندما تريد contract واضح بين Classes.
 * • عندما تحتاج أكثر من Class يشتركون في نفس البنية.
 */

interface Drawable {
    draw(): void;
    getArea(): number;
}

// Class: Circle تطبق Drawable Interface
class Circle implements Drawable {
    constructor(private radius: number) { }

    draw(): void {
        console.log(`🔵 Drawing circle with radius ${this.radius}`);
    }

    getArea(): number {
        return Math.PI * this.radius ** 2;
    }
}

// Class: Rectangle تطبق Drawable Interface
class Rectangle implements Drawable {
    constructor(private width: number, private height: number) { }

    draw(): void {
        console.log(`🟦 Drawing rectangle ${this.width}x${this.height}`);
    }

    getArea(): number {
        return this.width * this.height;
    }
}

// 💡 Polymorphism في العمل
const shapes: Drawable[] = [
    new Circle(5),
    new Rectangle(10, 20)
];

shapes.forEach(shape => {
    shape.draw();
    console.log(`📏 Area: ${shape.getArea()}`);
});


// =============================================================
// 7️⃣ Index Signatures
// =============================================================

/*
 * ✅ ما هو Index Signature؟
 * --------------------------
 * Index Signature: يسمح بإضافة خصائص غير معروفة مسبقاً لـ Object.
 * 
 * 
 * ✅ لماذا نستخدم Index Signature؟
 * ---------------------------------
 * • عندما لا نعرف أسماء الخصائص مسبقاً.
 * • عندما نريد Dictionary/Map-like structure.
 * 
 * 
 * ✅ أين نستخدمها؟
 * -----------------
 * • Translation files (مثل: i18n).
 * • Configuration objects.
 * • Dynamic properties.
 * 
 * 
 * ✅ متى نستخدمها؟
 * -----------------
 * • عندما يكون عدد الخصائص غير محدود.
 * • عندما تأتي الخصائص من مصدر خارجي (API, User input).
 */

interface StringDictionary {
    [key: string]: string; // أي key من نوع string، والقيمة string
}

const translations: StringDictionary = {
    hello: "مرحبا",
    bye: "وداعا",
    welcome: "أهلا وسهلا",
};

console.log(translations["hello"]); // Output: مرحبا
console.log(translations.bye);      // Output: وداعا


// 📌 مثال متقدم: Index Signature مع خصائص محددة
interface ApiResponse {
    status: number;           // خاصية محددة
    message: string;          // خاصية محددة
    [key: string]: any;       // خصائص إضافية غير معروفة
}

const response: ApiResponse = {
    status: 200,
    message: "Success",
    data: { users: [] },      // خاصية إضافية
    timestamp: 1234567890,    // خاصية إضافية أخرى
};


// =============================================================
// 8️⃣ متى نستخدم Interface ومتى نستخدم Type (الأهم لـ Angular)
// =============================================================

/*
 * ✅ القاعدة الذهبية:
 * -------------------
 * • Interface → للـ Object Shapes و Classes
 * • Type → للـ Unions, Tuples, Utilities
 * 
 * 
 * ✅ استخدم Interface عندما:
 * ---------------------------
 * 1. تمثل شكل Object (مثل: User, Product).
 * 2. تعمل مع Classes وتحتاج implements.
 * 3. تكتب Models في Angular.
 * 4. تحتاج extends بشكل واضح ومباشر.
 * 5. تريد Declaration Merging (نادر).
 * 
 * 
 * ✅ استخدم Type عندما:
 * ---------------------
 * 1. تحتاج Union Types (مثل: string | number).
 * 2. تحتاج Tuple Types (مثل: [number, string]).
 * 3. تحتاج Conditional Types.
 * 4. تحتاج Mapped Types.
 * 5. تعطي alias لـ Primitive (مثل: type ID = string).
 * 
 * 
 * 💡 في Angular:
 * --------------
 * الأغلب ستستخدم Interfaces لأن:
 * • Models تمثل Objects.
 * • Services تستخدم Interfaces كـ contracts.
 * • Component Props واضحة أكثر مع Interfaces.
 */

// ✅ مثال Angular-style

// Interface للـ Model
interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
}

// Type للـ Status
type OrderStatus = "pending" | "shipped" | "delivered" | "canceled";

// Interface للـ Service Contract
interface ProductService {
    getProducts(): Product[];
    getProductById(id: number): Product | undefined;
}

// Class تطبق الـ Interface
class MockProductService implements ProductService {
    private products: Product[] = [
        { id: 1, name: "Laptop", price: 1000, category: "Electronics" },
        { id: 2, name: "Phone", price: 500, category: "Electronics" },
    ];

    getProducts(): Product[] {
        return this.products;
    }

    getProductById(id: number): Product | undefined {
        return this.products.find(p => p.id === id);
    }
}


// =============================================================
// 9️⃣ خلاصة مبسطة
// =============================================================

/*
 * 📋 الخلاصة النهائية:
 * --------------------
 *
 * ┌─────────────────┬──────────────────────────────────────────┐
 * │   Feature       │   Interface   │   Type                   │
 * ├─────────────────┼───────────────┼──────────────────────────┤
 * │ Object Shape    │      ✅       │      ✅                  │
 * │ Extends         │      ✅       │   ✅ (using &)           │
 * │ Implements      │      ✅       │      ❌                  │
 * │ Union Types     │      ❌       │      ✅                  │
 * │ Tuple Types     │      ❌       │      ✅                  │
 * │ Mapped Types    │      ❌       │      ✅                  │
 * │ Conditional     │      ❌       │      ✅                  │
 * │ Merging         │      ✅       │      ❌                  │
 * └─────────────────┴───────────────┴──────────────────────────┘
 *
 *
 * 🎯 متى تستخدم أيهما؟
 * --------------------
 *
 * Interface:
 * ✅ Models في Angular/React
 * ✅ API Response Types
 * ✅ Class Contracts
 * ✅ عندما تحتاج extends واضح
 *
 * Type:
 * ✅ Union Types (Status, Role)
 * ✅ Tuples (Point, RGB)
 * ✅ Utility Types (Readonly, Partial)
 * ✅ Complex Types
 *
 *
 * 💡 نصيحة أخيرة:
 * ---------------
 * في Angular ستستخدم Interfaces أكثر (80% من الوقت).
 * احفظ هذه القاعدة: Interface للـ Objects، Type لكل شيء آخر.
 *
 *
 * ⚠️ تذكر:
 * --------
 * • Interface أوضح وأسهل للقراءة في معظم الحالات.
 * • Type أقوى وأكثر مرونة للحالات المتقدمة.
 * • لا تفكر كثيراً، ابدأ بـ Interface وإذا احتجت Union/Tuple استخدم Type.
 */

// =============================================================
// 🎉 انتهى الدرس - Happy Coding! 🚀
// =============================================================

/*
 * 📚 للمزيد من التعلم:
 * -------------------
 * • TypeScript Handbook: https://www.typescriptlang.org/docs/handbook/
 * • Angular Style Guide: https://angular.io/guide/styleguide
 * • Practice: حاول تطبيق هذه المفاهيم في مشاريعك الخاصة
 * 
 * 
 * 💪 تمرين عملي:
 * --------------
 * حاول إنشاء:
 * 1. Interface لـ Student مع Properties: id, name, grades
 * 2. Type للـ Grade (A | B | C | D | F)
 * 3. Class يطبق Interface Gradeable مع Method: calculateAverage()
 */