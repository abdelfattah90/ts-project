/*
============================================
📘 TypeScript: Objects & Functions Typing
   الشرح النظري + الأمثلة العملية
============================================

📑 الفهرس (Table of Contents)
1. Object Types — الأساسيات
2. Type Alias
3. Optional Properties (?)
4. Readonly Properties
5. Nested Objects
6. Index Signatures
7. Function Types — الأساسيات
8. void و never
9. Optional & Default Parameters
10. Rest Parameters
11. Function Type Expressions
12. Call Signatures
13. مقدمة عن Generic Functions
14. مثال عملي: User Service
============================================
*/

// ============================================
// 1️⃣ Object Types — الأساسيات
// ============================================
/*
📖 الشرح النظري:
-----------------
ما هو؟
  - طريقة لتحديد شكل (structure) الـ object بالضبط
  - تحديد أي properties يحتويها وما نوع كل property

لماذا نستخدمه؟
  ✅ منع الأخطاء في runtime (مثل الوصول لـ property غير موجودة)
  ✅ الـ IDE يعطيك autocomplete دقيق
  ✅ التأكد من أن كل الـ data المطلوبة موجودة

أين نستخدمه؟
  • عند استقبال API responses
  • تعريف models للـ data
  • function parameters و return types

متى؟
  • عندما تحتاج structure ثابت ومعروف للـ object
*/

// ✅ التوصيف المباشر Inline Type
let user: { name: string; age: number } = {
    name: "Ahmed",
    age: 25,
};

// ❌ أخطاء محتملة:
// خاصية ناقصة
// let invalidUser: { name: string; age: number } = { name: "Ali" };

// خاصية زائدة
// let invalidUser2: { name: string; age: number } = {
//   name: "Sara",
//   age: 22,
//   email: "wrong",
// };

// ============================================
// 2️⃣ Type Alias — أفضل للمشاريع
// ============================================
/*
📖 الشرح النظري:
-----------------
ما هو؟
  - إعطاء اسم لـ type معين لإعادة استخدامه في أماكن متعددة

لماذا نستخدمه؟
  ✅ Reusability: تكتب الـ type مرة واحدة وتستخدمه في كل مكان
  ✅ Maintainability: لو احتجت تعديل، تعدل في مكان واحد
  ✅ Readability: الكود يصبح أوضح (User أفضل من كتابة الـ object type كاملاً)

أين نستخدمه؟
  • تعريف Models (User, Product, Order...)
  • API contracts
  • Shared types بين components

متى؟
  • عندما تستخدم نفس الـ type أكثر من مرة
  • في المشاريع الحقيقية (دائماً استخدم Type Alias بدل inline types)
*/

type User = {
    name: string;
    age: number;
    email: string;
};

let user1: User = {
    name: "Ahmed",
    age: 25,
    email: "ahmed@example.com",
};

let user2: User = {
    name: "Sara",
    age: 22,
    email: "sara@example.com",
};

let users: User[] = [user1, user2];

// ============================================
// 3️⃣ Optional Properties (?)
// ============================================
/*
📖 الشرح النظري:
-----------------
ما هو؟
  - جعل property اختيارية
  - الـ object صحيح حتى لو لم تحتوي على هذه الـ property

لماذا نستخدمه؟
  ✅ Flexibility: ليس كل الـ data متاحة دائماً
  ✅ منع إجبار المستخدم على إدخال بيانات غير ضرورية
  ✅ التعامل مع partial data

أين نستخدمه؟
  • الـ fields الثانوية في Forms (مثل middle name, phone number)
  • API responses (بعض الـ fields قد لا تأتي)
  • Configuration objects

متى؟
  • عندما الـ property ليست critical
  • عندما يكون لها default value أو fallback

⚠️ ملحوظة مهمة:
  استخدم ?? (nullish coalescing) للـ default values بدل || لأنها أدق
*/

type Product = {
    id: number;
    name: string;
    price: number;
    description?: string; // اختيارية
    discount?: number; // اختيارية
};

const product1: Product = {
    id: 1,
    name: "Laptop",
    price: 999,
};

const product2: Product = {
    id: 2,
    name: "Mouse",
    price: 25,
    description: "Wireless mouse",
    discount: 0.1,
};

function displayProduct(product: Product): string {
    const desc = product.description ?? "No description";
    const finalPrice = product.price * (1 - (product.discount ?? 0));
    return `${product.name}: $${finalPrice} - ${desc}`;
}

// ============================================
// 4️⃣ Readonly Properties
// ============================================
/*
📖 الشرح النظري:
-----------------
ما هو؟
  - منع تعديل property بعد إنشاء الـ object (immutability)

لماذا نستخدمه؟
  ✅ Data Integrity: منع التعديل الخاطئ للبيانات الحساسة
  ✅ Predictability: تضمن أن القيمة لن تتغير
  ✅ Safety: منع bugs ناتجة عن تعديلات غير متوقعة

أين نستخدمه؟
  • IDs (لا يجب أن تتغير أبداً)
  • Configuration values (API URLs, keys)
  • Timestamps (createdAt)
  • Constants

متى؟
  • عندما القيمة يجب أن تُحدد مرة واحدة فقط ولا تتغير

💡 Utility Type: Readonly<T>
  - يجعل كل properties في الـ type readonly دفعة واحدة
*/

type Config = {
    readonly apiUrl: string;
    readonly timeout: number;
    retries: number;
};

const config: Config = {
    apiUrl: "https://api.example.com",
    timeout: 5000,
    retries: 3,
};

config.retries = 5; // ✅ مسموح
// config.apiUrl = "new"; // ❌ غير مسموح

// Utility type: Readonly<T>
type ReadonlyUser = Readonly<User>;

const readonlyUser: ReadonlyUser = {
    name: "Ahmed",
    age: 25,
    email: "ahmed@example.com",
};

// readonlyUser.name = "Ali"; // ❌ خطأ

// ============================================
// 5️⃣ Nested Objects
// ============================================
/*
📖 الشرح النظري:
-----------------
ما هو؟
  - object يحتوي على objects أخرى بداخله (hierarchical structure)

لماذا نستخدمه؟
  ✅ تمثيل الـ data المعقدة بشكل منظم
  ✅ تجميع الـ related data معاً
  ✅ يعكس الـ real-world relationships

أين نستخدمه؟
  • User profiles (user → address → city)
  • E-commerce (order → items → product)
  • Forms مع sections متعددة

متى؟
  • عندما البيانات لها علاقات hierarchical واضحة

⚠️ Optional Chaining (?.):
  - استخدمها دائماً مع nested optional properties لتجنب errors
*/

type Address = {
    street: string;
    city: string;
    country: string;
    zipCode?: string;
};

type UserWithAddress = {
    id: number;
    name: string;
    email: string;
    address: Address;
    contacts?: {
        phone?: string;
        mobile?: string;
    };
};

const userWithAddress: UserWithAddress = {
    id: 1,
    name: "Ahmed",
    email: "ahmed@example.com",
    address: {
        street: "123 Main St",
        city: "Cairo",
        country: "Egypt",
    },
    contacts: {
        mobile: "+20 123 456 7890",
    },
};

console.log(userWithAddress.address.city);
console.log(userWithAddress.contacts?.phone ?? "Not provided");

// ============================================
// 6️⃣ Index Signatures — dynamic properties
// ============================================
/*
📖 الشرح النظري:
-----------------
ما هو؟
  - السماح بـ dynamic property names مع تحديد نوع الـ value

لماذا نستخدمه؟
  ✅ عندما لا تعرف أسماء الـ properties مسبقاً
  ✅ للـ dynamic keys
  ✅ للـ dictionary/map structures

أين نستخدمه؟
  • Translations/Localization ({ [key: string]: string })
  • Dynamic configurations
  • Cache/Storage objects
  • API responses مع dynamic keys

متى؟
  • عندما الـ keys غير معروفة compile time
  • عندما تحتاج flexibility في أسماء الـ properties

⚠️ تحذير:
  - استخدمه بحذر - يفقدك بعض type safety
  - إذا كانت الـ keys معروفة، استخدم type عادي
*/

type StringDictionary = {
    [key: string]: string;
};

const translations: StringDictionary = {
    hello: "مرحبا",
    thanks: "شكرا",
};

translations.welcome = "أهلا";

// ============================================
// 7️⃣ Function Types — الأساسيات
// ============================================
/*
📖 الشرح النظري:
-----------------
ما هو؟
  - تحديد أنواع parameters والـ return value للـ functions

لماذا نستخدمه؟
  ✅ Type Safety: منع تمرير arguments خاطئة
  ✅ Documentation: الـ signature يوضح كيفية استخدام الـ function
  ✅ Autocomplete: الـ IDE يساعدك

أين نستخدمه؟
  • في كل function تقريباً في TypeScript!

متى؟
  • دائماً - حتى لو TypeScript يستطيع infer الـ types
  • من الأفضل كتابتها explicitly
*/

function add(a: number, b: number): number {
    return a + b;
}

const subtract = function (a: number, b: number): number {
    return a - b;
};

const multiply = (a: number, b: number): number => a * b;

// ============================================
// 8️⃣ void و never
// ============================================
/*
📖 الشرح النظري:
-----------------
void:
  ما هو؟ Function لا ترجع قيمة (أو ترجع undefined)
  لماذا؟ للتوضيح أن الـ function للـ side effects فقط
  أين؟ Logging, event handlers, DOM manipulation

never:
  ما هو؟ Function لن ترجع أبداً (throw error أو infinite loop)
  لماذا؟ للإشارة أن execution لن يكمل بشكل طبيعي
  أين؟ Error handling functions, assertion functions

الفرق المهم:
  • void: الـ function تنتهي بشكل طبيعي لكن بدون return value
  • never: الـ function لا تنتهي أصلاً (exception أو loop)
*/

function logMessage(msg: string): void {
    console.log(msg);
}

function throwError(message: string): never {
    throw new Error(message);
}

// ============================================
// 9️⃣ Optional & Default Parameters
// ============================================
/*
📖 الشرح النظري:
-----------------
Optional (?):
  ما هو؟ Parameter يمكن عدم تمريره
  لماذا؟ Flexibility في استدعاء الـ function
  متى؟ عندما الـ parameter ليس ضروري دائماً

Default Parameters:
  ما هو؟ Parameter له قيمة افتراضية إذا لم يُمرَّر
  لماذا؟ أفضل من optional لأنه يضمن وجود قيمة دائماً

💡 Best Practice:
  - استخدم Default Parameters بدل Optional عندما تستطيع
  - أوضح وأسهل
*/

function greet(name: string, greeting?: string): string {
    return `${greeting ?? "Hello"}, ${name}`;
}

function greetBetter(name: string, greeting: string = "Hello"): string {
    return `${greeting}, ${name}`;
}

// ============================================
// 🔟 Rest Parameters
// ============================================
/*
📖 الشرح النظري:
-----------------
ما هو؟
  - تمرير عدد غير محدد من arguments كـ array

لماذا نستخدمه؟
  ✅ عدد الـ arguments غير معروف مسبقاً
  ✅ Flexibility مع type safety

أين نستخدمه؟
  • Utility functions (sum, max, min)
  • Event aggregators
  • Variadic functions

متى؟
  • عندما تحتاج قبول أي عدد من arguments من نفس النوع
*/

function sum(...nums: number[]): number {
    return nums.reduce((total, n) => total + n, 0);
}

// ============================================
// 1️⃣1️⃣ Function Type Expressions
// ============================================
/*
📖 الشرح النظري:
-----------------
ما هو؟
  - تعريف type للـ function نفسها (الـ signature كاملاً)

لماذا نستخدمه؟
  ✅ تمرير functions كـ parameters (callbacks, higher-order functions)
  ✅ Reusability للـ function signatures
  ✅ Type safety للـ callbacks

أين نستخدمه؟
  • Event handlers
  • Array methods (map, filter, reduce)
  • Strategy pattern
  • Dependency injection

متى؟
  • عندما تحتاج تمرير function كـ parameter أو return type
*/

type MathOperation = (a: number, b: number) => number;

const addOp: MathOperation = (a, b) => a + b;

function calculate(op: MathOperation, x: number, y: number): number {
    return op(x, y);
}

// ============================================
// 1️⃣2️⃣ Call Signatures
// ============================================
/*
📖 الشرح النظري:
-----------------
ما هو؟
  - تعريف function يمكنها أن تحتوي على properties إضافية

لماذا نستخدمه؟
  ✅ Functions يمكن أن تكون objects أيضاً في JavaScript
  ✅ إضافة metadata للـ functions

أين نستخدمه؟
  • Functions مع configuration
  • Plugin systems
  • Advanced patterns

متى؟
  • حالات متقدمة - نادراً ما تحتاجه في الكود العادي
*/

type DescribableFunction = {
    description: string;
    (input: string): string;
};

function createFormatter(desc: string): DescribableFunction {
    const formatter = (text: string) => `[${desc}] ${text}`;
    (formatter as DescribableFunction).description = desc;
    return formatter as DescribableFunction;
}

// ============================================
// 1️⃣3️⃣ مقدمة في Generics
// ============================================
/*
📖 الشرح النظري:
-----------------
ما هو؟
  - Function تعمل مع أي type لكن مع الحفاظ على type safety

لماذا نستخدمه؟
  ✅ Reusability: نفس الـ logic لأنواع مختلفة
  ✅ Type Safety: الـ type يُحفظ خلال execution
  ✅ Flexibility: بدون losing type information

أين نستخدمه؟
  • Utility functions (getFirst, map, filter)
  • Data structures (Array, Map, Set)
  • API calls (generic response types)

متى؟
  • عندما الـ logic نفسه يعمل مع types مختلفة

💡 فائدة:
  - بدل كتابة getFirstString, getFirstNumber...
  - تكتب getFirst<T> مرة واحدة
*/

function getFirst<T>(arr: T[]): T | undefined {
    return arr[0];
}

// ============================================
// 1️⃣4️⃣ مثال عملي — User Service
// ============================================
/*
📖 الشرح النظري:
-----------------
يجمع كل المفاهيم السابقة:
  ✅ Type Aliases (User, Address)
  ✅ Union Types (UserId = number | string)
  ✅ Optional Properties (age?, address?)
  ✅ Readonly (readonly id)
  ✅ Utility Types (Omit, Partial)
  ✅ Generic Functions (findUser)
  ✅ Function Types (callbacks)

لماذا هذا المثال مهم؟
  - يوضح كيف تستخدم كل هذه المفاهيم معاً
  - في real-world service class
  - مثل الذي ستستخدمه في Angular! 🎯
*/

type UserId = number | string;

type UserAddress = {
    street: string;
    city: string;
    country: string;
};

type FullUser = {
    readonly id: UserId;
    name: string;
    email: string;
    age?: number;
    address?: UserAddress;
    createdAt: Date;
};

type CreateUserDto = Omit<FullUser, "id" | "createdAt">;
type UpdateUserDto = Partial<CreateUserDto>;

class UserService {
    private users: FullUser[] = [];
    private currentId = 1;

    createUser(data: CreateUserDto): FullUser {
        const newUser: FullUser = {
            ...data,
            id: this.currentId++,
            createdAt: new Date(),
        };
        this.users.push(newUser);
        return newUser;
    }

    findUser(predicate: (u: FullUser) => boolean): FullUser | undefined {
        return this.users.find(predicate);
    }

    updateUser(id: UserId, updates: UpdateUserDto): FullUser | null {
        const user = this.users.find((u) => u.id === id);
        if (!user) return null;

        Object.assign(user, updates);
        return user;
    }

    displayUser = (user: FullUser): string => {
        const { name, email, age, address } = user;
        const ageInfo = age ? `, Age: ${age}` : "";
        const addressInfo = address ? `, ${address.city}` : "";
        return `${name} (${email})${ageInfo}${addressInfo}`;
    };

    filterUsers(criteria: Partial<FullUser>, limit?: number): FullUser[] {
        let result = this.users.filter((u) => {
            return Object.entries(criteria).every(([key, value]) => {
                return u[key as keyof FullUser] === value;
            });
        });
        return limit ? result.slice(0, limit) : result;
    }
}

/*
============================================
🎯 الخلاصة
============================================

TypeScript objects & functions typing يعطيك:

1. ✅ Type Safety - منع الأخطاء قبل runtime
2. ✅ Better IDE Support - autocomplete ودقة
3. ✅ Self-Documenting Code - الـ types توضح الاستخدام
4. ✅ Refactoring Confidence - تعديل بأمان
5. ✅ Team Collaboration - contracts واضحة

هذه الأساسيات ستستخدمها يومياً في Angular! 💪

جاهز للدرس القادم؟ 🚀
============================================
انتهى الدرس 🎉
============================================
*/