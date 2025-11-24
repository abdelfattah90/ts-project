/*
============================================================================
📘 Advanced Object Types in TypeScript
============================================================================
هذا الملف يحتوي على شرح تفصيلي للمفاهيم المتقدمة للكائنات في TypeScript.
تم دمج الشرح النظري مع الأمثلة العملية لتعزيز الفهم.

📑 فهرس المحتوى:
1️⃣  Optional Properties (?)
2️⃣  الفرق بين Optional و Undefined
3️⃣  Readonly Properties
4️⃣  Readonly<T> + DeepReadonly
5️⃣  Index Signatures
6️⃣  Excess Property Checking
7️⃣  Property Modifiers Combinations
8️⃣  Nested & Complex Object Types
9️⃣  Mapped Types
🔟  Template Literal Types
1️⃣1️⃣ keyof Operator
1️⃣2️⃣ typeof Operator
1️⃣3️⃣ Const Assertions (as const)
1️⃣4️⃣ مثال عملي شامل: Configuration Management System
============================================================================
*/

// ============================================================================
// 1️⃣ Optional Properties (?)
// ============================================================================
/*
✅ **ما هو؟**
هي خصائص داخل الـ Interface أو Type يمكن أن تكون موجودة أو غير موجودة في الكائن.
نستخدم علامة الاستفهام `?` بعد اسم الخاصية لتعريفها.

✅ **لماذا نستخدمه؟**
لمنح المرونة للكائنات التي قد لا تكتمل بياناتها دائماً، مما يمنع حدوث أخطاء إذا كانت البيانات ناقصة.

✅ **أين نستخدمه؟**
في نماذج تسجيل المستخدمين (حقول اختيارية)، أو عند التعامل مع استجابات API قد لا تعيد كل الحقول دائماً.

✅ **متى نستخدمه؟**
عندما يكون الحقل "غير إلزامي" (Optional) ولا يؤثر غيابه على عمل التطبيق.
*/

interface User {
    id: number;
    name: string;
    email: string;
    phone?: string;     // 💡 خاصية اختيارية: قد تكون string أو undefined
    address?: string;   // 💡 خاصية اختيارية
}

const user1: User = {
    id: 1,
    name: "Ahmed",
    email: "ahmed@example.com"
    // 💡 لم نمرر phone أو address وهذا مقبول تماماً
};

const user2: User = {
    id: 2,
    name: "Sara",
    email: "sara@example.com",
    phone: "+20 123 456 7890"
};

function displayUserInfo(user: User): string {
    // 💡 يجب التحقق من وجود القيمة قبل استخدامها
    const phoneInfo = user.phone ? `, Phone: ${user.phone}` : "";

    // 💡 استخدام Nullish Coalescing (??) لتعيين قيمة افتراضية
    const addressInfo = user.address ?? "No address provided";

    return `${user.name} (${user.email})${phoneInfo} - ${addressInfo}`;
}

// ============================================================================
// 2️⃣ Optional vs Undefined
// ============================================================================
/*
✅ **ما هو الفرق؟**
- `key?: type` (Optional): المفتاح (Key) نفسه يمكن أن يكون غير موجود في الكائن.
- `key: type | undefined`: المفتاح **يجب** أن يكون موجوداً، ولكن يمكن أن تكون قيمته `undefined`.

✅ **لماذا هذا التمييز؟**
للتمييز بين "تجاهل الحقل تماماً" وبين "تعيين قيمة فارغة بشكل صريح".

✅ **متى نستخدمه؟**
- استخدم `?` عندما يكون الحقل ثانوياً.
- استخدم `| undefined` عندما تريد إجبار المبرمج على اتخاذ قرار بشأن القيمة (حتى لو كانت فارغة).
*/

interface Config {
    timeout?: number;               // 💡 يمكن حذف هذا السطر تماماً من الكائن
    retries: number | undefined;    // ⚠️ المفتاح retries إلزامي، حتى لو كانت قيمته undefined
}

const config1: Config = {
    retries: undefined // ✅ صحيح: المفتاح موجود
    // timeout غير موجود، وهذا مقبول
};

/* ❌ خطأ: المفتاح retries مفقود
const config2: Config = {
    timeout: 5000
}; 
*/

const config3: Config = {
    timeout: 5000,
    retries: undefined
};

// ============================================================================
// 3️⃣ Readonly Properties
// ============================================================================
/*
✅ **ما هو؟**
كلمة مفتاحية `readonly` تجعل الخاصية قابلة للقراءة فقط، أي لا يمكن تعديل قيمتها بعد الإنشاء الأولي.

✅ **لماذا نستخدمه؟**
للحفاظ على "ثبات البيانات" (Immutability) ومنع التعديلات العرضية التي قد تسبب أخطاء (Side Effects).

✅ **أين نستخدمه؟**
مع الـ IDs، التواريخ الثابتة، أو إعدادات التكوين التي لا يجب أن تتغير أثناء تشغيل التطبيق.
*/

interface Point {
    readonly x: number;
    readonly y: number;
}

const point: Point = { x: 10, y: 20 };

// point.x = 5; // ❌ Error: Cannot assign to 'x' because it is a read-only property.

// ============================================================================
// 4️⃣ Readonly<T> Utility + DeepReadonly
// ============================================================================
/*
✅ **ما هو؟**
- `Readonly<T>`: أداة جاهزة في TS تجعل كل خصائص المستوى الأول للكائن للقراءة فقط.
- `DeepReadonly`: نوع مخصص (Custom Type) لجعله للقراءة فقط بشكل تكراري (لكل المستويات المتداخلة).

✅ **لماذا نستخدمه؟**
`Readonly<T>` لا تحمي الكائنات المتداخلة (Nested Objects)، لذا نلجأ لـ `DeepReadonly` لحماية الكائن بالكامل.

✅ **متى نستخدمه؟**
عند تمرير State في تطبيقات React أو Redux حيث يجب ألا يتم تعديل الحالة مباشرة.
*/

interface BasicUser {
    id: number;
    name: string;
    email: string;
}

// تحويل كل الخصائص إلى readonly
type ReadonlyUser = Readonly<BasicUser>;

// 💡 Recursive Type لجعل الكائن محمي بالكامل
type DeepReadonly<T> = {
    readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

// ============================================================================
// 5️⃣ Index Signatures
// ============================================================================
/*
✅ **ما هو؟**
طريقة لتعريف كائنات لا نعرف أسماء مفاتيحها مسبقاً، ولكن نعرف نوع المفتاح ونوع القيمة.
الصيغة: `[key: type]: type`

✅ **لماذا نستخدمه؟**
لإنشاء "قواميس" (Dictionaries) أو خرائط (Maps) حيث تكون المفاتيح ديناميكية.

✅ **أين نستخدمه؟**
في ملفات الترجمة، قوائم الإعدادات الديناميكية، أو تخزين بيانات غير مهيكلة تماماً.
*/

interface StringMap {
    [key: string]: string; // المفتاح نص والقيمة نص
}

const translations: StringMap = {
    hello: "مرحبا",
    goodbye: "وداعا",
    // 💡 يمكن إضافة أي مفتاح طالما القيمة نصية
    welcome: "أهلا بك"
};

// 💡 التعامل مع قيم مختلطة
interface MixedData {
    [key: string]: string | number | boolean;
}

// 💡 دمج خصائص معروفة مع Index Signature
interface UserData {
    id: number;
    name: string;
    [key: string]: any; // يسمح بإضافة أي خصائص إضافية
}

// ============================================================================
// 6️⃣ Excess Property Checking
// ============================================================================
/*
✅ **ما هو؟**
آلية أمان في TS تمنع تمرير خصائص إضافية غير معرفة في الـ Interface عند إنشاء "Object Literal" مباشرة.

✅ **لماذا نستخدمه؟**
لاكتشاف الأخطاء المطبعية (Typos). إذا كتبت `namr` بدلاً من `name`، فسيقوم هذا الفحص بتنبيهك.

✅ **حيلة (Workaround):**
إذا قمت بتعيين الكائن لمتغير أولاً، ثم مررت المتغير، فإن TS يتساهل مع الخصائص الإضافية (طالما الخصائص المطلوبة موجودة).
*/

interface Pnt {
    x: number;
    y: number;
}

// const p: Pnt = { x: 10, y: 20, z: 30 }; // ❌ Error: Object literal may only specify known properties

// 💡 الالتفاف على الفحص عبر متغير وسيط
const tempPoint = { x: 10, y: 20, z: 30 };
const p1: Pnt = tempPoint; // ✅ OK (لأن tempPoint ليس Object Literal هنا)

// 💡 الالتفاف باستخدام Type Assertion (استخدمه بحذر)
const p2: Pnt = { x: 10, y: 20, z: 30 } as Pnt; // ✅ OK

// ============================================================================
// 7️⃣ Property Modifiers Combinations
// ============================================================================
/*
✅ **ما هو؟**
القدرة على دمج `readonly` مع `?` (Optional) في نفس الخاصية.

✅ **السيناريو:**
خاصية قد لا تكون موجودة، ولكن إذا وجدت، لا يمكن تعديلها.
*/

interface AppConfigMod {
    readonly id: number;        // إلزامي + للقراءة فقط
    readonly name: string;
    timeout?: number;           // اختياري + قابل للتعديل
    readonly retries?: number;  // اختياري + للقراءة فقط (أقوى قيد)
}

const cfg: AppConfigMod = {
    id: 1,
    name: "MyApp"
};

cfg.timeout = 5000; // ✅ OK
// cfg.id = 2;      // ❌ Error

// ============================================================================
// 8️⃣ Nested & Complex Object Types
// ============================================================================
/*
✅ **ما هو؟**
تعريف كائنات تحتوي على كائنات أخرى ومصفوفات بداخله بشكل هرمي.

✅ **لماذا نستخدمه؟**
لتمثيل بيانات العالم الحقيقي (مثل هيكل شركة، فاتورة، استجابة API معقدة).

✅ **نصيحة:**
يفضل تجزئة الأنواع المتداخلة إلى Interfaces صغيرة منفصلة لتسهيل القراءة وإعادة الاستخدام.
*/

interface Company {
    name: string;
    address: {
        street: string;
        city: string;
        country: string;
        coordinates?: {
            lat: number;
            lng: number;
        };
    };
    employees: {
        id: number;
        name: string;
        department: {
            id: number;
            name: string;
            manager?: {
                id: number;
                name: string;
            };
        };
    }[]; // مصفوفة من الكائنات
    metadata?: Record<string, any>; // استخدام Record لنوع مرن
}

// ============================================================================
// 9️⃣ Mapped Types
// ============================================================================
/*
✅ **ما هو؟**
طريقة لإنشاء أنواع جديدة بناءً على أنواع قديمة عبر "المرور" (Mapping) على مفاتيحها.
يشبه حلقة `for...in` ولكن للأنواع.

✅ **لماذا نستخدمه؟**
لتقليل التكرار (DRY). بدلاً من كتابة Interface جديد لنسخة اختيارية، نستخدم Mapped Type لتحويل الـ Interface الأصلي.

✅ **الرموز:**
- `+`: إضافة (افتراضي)
- `-`: إزالة
- `?`: اختياري
- `readonly`: للقراءة فقط
*/

type UserExample = {
    id: number;
    name: string;
    email: string;
};

// تحويل كل الخصائص إلى اختيارية
type OptionalUser = {
    [K in keyof UserExample]?: UserExample[K];
};

// تحويل كل الخصائص إلى للقراءة فقط
type ReadonlyMapped = {
    readonly [K in keyof UserExample]: UserExample[K];
};

// إزالة readonly من الخصائص (جعلها قابلة للتعديل)
type Mutable<T> = {
    -readonly [K in keyof T]: T[K];
};

// إزالة ? (جعل الخصائص إلزامية)
type RequiredMapped<T> = {
    [K in keyof T]-?: T[K];
};

// 💡 نوع شرطي داخل Mapped Type: إذا كان النص، اجعله يقبل null
type NullableStrings<T> = {
    [K in keyof T]: T[K] extends string ? T[K] | null : T[K];
};

// ============================================================================
// 🔟 Template Literal Types
// ============================================================================
/*
✅ **ما هو؟**
بناء أنواع نصية معقدة باستخدام قوالب النصوص (Backticks). يمكن دمج Union Types لتوليد احتمالات متعددة.

✅ **لماذا نستخدمه؟**
لإنشاء أنماط محددة جداً للقيم النصية، مثل أسماء الـ Events أو CSS Classes.

✅ **أين نستخدمه؟**
مكتبات الـ UI، تعريفات الـ Events الديناميكية.
*/

type Prefix = "get" | "set";
type Suffix = "Name" | "Age" | "Email";

// سيولد: "getName" | "getAge" | "getEmail" | "setName" ...
type Methods = `${Prefix}${Suffix}`;

type EventName = "click" | "focus" | "blur";
// استخدام Utility Types مثل Capitalize لتغيير حالة الأحرف
type ElementEvent = `on${Capitalize<EventName>}`; // "onClick" | "onFocus" | "onBlur"

// ============================================================================
// 1️⃣1️⃣ keyof Operator
// ============================================================================
/*
✅ **ما هو؟**
يستخرج "اتحاد" (Union) من أسماء المفاتيح لنوع معين.
مثال: `keyof User` تعود بـ `"id" | "name" | "email"`.

✅ **لماذا نستخدمه؟**
لضمان أننا نصل فقط إلى خصائص موجودة بالفعل في الكائن، مما يمنع الأخطاء الإملائية عند استدعاء الخصائص ديناميكياً.
*/

interface UserK {
    id: number;
    name: string;
    email: string;
}

// دالة تقبل كائناً ومفتاحاً، وتضمن أن المفتاح ينتمي للكائن
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

// getProperty(user, "age"); // ❌ Error: "age" is not a key of UserK

// ============================================================================
// 1️⃣2️⃣ typeof Operator
// ============================================================================
/*
✅ **ما هو؟**
في سياق الـ Types، يُستخدم لاستخراج الـ Type من متغير أو كائن JavaScript موجود بالفعل.

✅ **لماذا نستخدمه؟**
لتجنب كتابة الـ Interface يدوياً إذا كان لديك كائن بيانات جاهز وتريد استنساخ هيكله.

✅ **متى نستخدمه؟**
عند التعامل مع مكتبات خارجية أو ثوابت إعدادات معقدة (Config Objects).
*/

const exampleUser = {
    id: 1,
    name: "Ahmed",
    email: "ahmed@example.com"
};

// TypeScript سيستنتج النوع تلقائياً من الكائن أعلاه
type ExampleUserType = typeof exampleUser;
// { id: number; name: string; email: string; }

// ============================================================================
// 1️⃣3️⃣ Const Assertions (as const)
// ============================================================================
/*
✅ **ما هو؟**
تقنية لتحويل الكائنات والمصفوفات إلى "قيم ثابتة حرفية" (Literal Types) وجعلها `readonly` بالكامل.

✅ **لماذا نستخدمه؟**
- يمنع توسيع الأنواع (Narrowing): النص لا يصبح `string` بل يبقى بقيمته المحددة.
- المصفوفات تصبح `readonly tuple`.
- بديل قوي وآمن للـ Enums.
*/

const COLORS = {
    primary: "#007bff",
    secondary: "#6c757d"
} as const;
// 💡 الآن primary نوعها "#007bff" وليس string

// استخراج المفاتيح
type ColorName = keyof typeof COLORS; // "primary" | "secondary"

// استخراج القيم
type ColorValue = typeof COLORS[ColorName]; // "#007bff" | "#6c757d"

// ============================================================================
// 1️⃣4️⃣ مثال عملي كبير — Configuration Management System
// ============================================================================
/*
✅ **وصف المثال:**
نظام لإدارة إعدادات تطبيق (Config Manager) يدعم بيئات مختلفة (Dev, Prod).
يجمع هذا المثال معظم المفاهيم السابقة:
- Nested Interfaces
- Readonly Properties
- Optional Properties
- Union Types
- Const Assertions
- Typeof & Keyof
*/

// 1. تعريف الهياكل الأساسية
interface BaseConfig {
    readonly id: string;      // لا يتغير المعرف
    readonly name: string;
    version: string;
}

interface DatabaseConfig {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    ssl?: boolean;            // اختياري
    readonly connectionPool?: { // كائن اختياري لكنه محمي من التعديل الداخلي
        min: number;
        max: number;
    };
}

interface ApiConfig {
    baseUrl: string;
    timeout: number;
    retries: number;
    headers: Record<string, string>; // مفاتيح ديناميكية للـ Headers
    endpoints: Record<string, string>;
}

interface LoggingConfig {
    level: "debug" | "info" | "warn" | "error"; // Literal Union
    format: "json" | "text";
    outputs: readonly ("console" | "file" | "remote")[]; // مصفوفة للقراءة فقط
    filePath?: string;
    remoteUrl?: string;
}

// 2. تجميع الإعدادات (Composition)
interface AppConfig extends BaseConfig {
    database: DatabaseConfig;
    api: ApiConfig;
    logging: LoggingConfig;
    features: Record<string, boolean>; // Feature Flags
    metadata?: Record<string, any>;
}

type Environment = "development" | "staging" | "production";

// 3. إنشاء إعدادات التطوير باستخدام (as const) لاستنتاج دقيق
const DEV_CONFIG = {
    id: "dev",
    name: "Development",
    version: "1.0.0",
    database: {
        host: "localhost",
        port: 5432,
        username: "dev_user",
        password: "dev_pass",
        database: "dev_db",
        ssl: false,
        connectionPool: { min: 2, max: 10 }
    },
    api: {
        baseUrl: "http://localhost:3000",
        timeout: 30000,
        retries: 3,
        headers: { "Content-Type": "application/json" },
        endpoints: {
            users: "/api/users",
            products: "/api/products",
            orders: "/api/orders"
        }
    },
    logging: {
        level: "debug",
        format: "text",
        outputs: ["console", "file"],
        filePath: "./logs/dev.log"
    },
    features: {
        enableCache: false,
        enableAnalytics: false,
        enableDebugMode: true
    }
} as const; // 💡 يجعل القيم حرفية ومحمية

// 4. إعدادات الإنتاج (Explicit Type)
const PROD_CONFIG: AppConfig = {
    id: "prod",
    name: "Production",
    version: "1.0.0",
    database: {
        host: "prod-db.example.com",
        port: 5432,
        username: "prod_user",
        password: "secure_pass",
        database: "prod_db",
        ssl: true,
        connectionPool: { min: 10, max: 50 }
    },
    api: {
        baseUrl: "https://api.example.com",
        timeout: 10000,
        retries: 5,
        headers: {
            "Content-Type": "application/json",
            "X-API-Version": "v1"
        },
        endpoints: {
            users: "/api/v1/users",
            products: "/api/v1/products",
            orders: "/api/v1/orders"
        }
    },
    logging: {
        level: "error",
        format: "json",
        outputs: ["remote"],
        remoteUrl: "https://logs.example.com"
    },
    features: {
        enableCache: true,
        enableAnalytics: true,
        enableDebugMode: false
    }
};

// 5. مدير الإعدادات
class ConfigManager {
    private configs: Record<Environment, AppConfig>;
    private currentEnv: Environment;

    constructor() {
        this.configs = {
            // تحويل DEV_CONFIG من readonly type صارم إلى AppConfig
            development: DEV_CONFIG as any as AppConfig,
            staging: PROD_CONFIG,
            production: PROD_CONFIG
        };
        this.currentEnv = "development";
    }

    // يعيد نسخة للقراءة فقط لضمان عدم العبث بالإعدادات خارج الكلاس
    getConfig(): Readonly<AppConfig> {
        return this.configs[this.currentEnv];
    }
}

// ============================================================================
// End of Lesson
// ============================================================================