// 📘 Advanced Object Types
/*
============================================================================
📑 فهرس الدرس (TOC)
============================================================================
1️⃣  Optional Properties (?)
2️⃣  الفرق بين Optional و Undefined
3️⃣  Readonly Properties
4️⃣  Readonly<T> + DeepReadonly
5️⃣  Index Signatures (بالتفصيل)
6️⃣  Excess Property Checking
7️⃣  Property Modifiers Combinations
8️⃣  Nested & Complex Object Types
9️⃣  Mapped Types (الأساسيات + المتقدمة)
🔟  Template Literal Types
1️⃣1️⃣ keyof Operator
1️⃣2️⃣ typeof Operator
1️⃣3️⃣ Const Assertions (as const)
1️⃣4️⃣ مثال عملي كبير: Configuration Management System
============================================================================
*/

// ============================================================================
// 1️⃣ Optional Properties (?)
// ============================================================================

interface User {
    id: number;
    name: string;
    email: string;
    phone?: string;     // خاصية اختيارية
    address?: string;   // خاصية اختيارية
}

const user1: User = {
    id: 1,
    name: "Ahmed",
    email: "ahmed@example.com"
};

const user2: User = {
    id: 2,
    name: "Sara",
    email: "sara@example.com",
    phone: "+20 123 456 7890"
};

function displayUserInfo(user: User): string {
    const phoneInfo = user.phone ? `, Phone: ${user.phone}` : "";
    const addressInfo = user.address ?? "No address provided";

    return `${user.name} (${user.email})${phoneInfo} - ${addressInfo}`;
}

// ============================================================================
// 2️⃣ Optional vs Undefined
// ============================================================================

interface Config {
    timeout?: number; // optional → قد لا توجد
    retries: number | undefined; // يجب تمريرها لكنها قد تكون undefined
}

const config1: Config = {
    retries: undefined
};

const config3: Config = {
    timeout: 5000,
    retries: undefined
};

// ============================================================================
// 3️⃣ Readonly Properties
// ============================================================================

interface Point {
    readonly x: number;
    readonly y: number;
}

const point: Point = { x: 10, y: 20 };

// ============================================================================
// 4️⃣ Readonly<T> Utility + DeepReadonly
// ============================================================================

interface BasicUser {
    id: number;
    name: string;
    email: string;
}

type ReadonlyUser = Readonly<BasicUser>;

// DeepReadonly

type DeepReadonly<T> = {
    readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

// ============================================================================
// 5️⃣ Index Signatures
// ============================================================================

interface StringMap {
    [key: string]: string;
}

const translations: StringMap = {
    hello: "مرحبا",
    goodbye: "وداعا"
};

// Mixed values
interface MixedData {
    [key: string]: string | number | boolean;
}

// Known props + index signature
interface UserData {
    id: number;
    name: string;
    [key: string]: any;
}

// ============================================================================
// 6️⃣ Excess Property Checking
// ============================================================================

interface Pnt {
    x: number;
    y: number;
}

const tempPoint = { x: 10, y: 20, z: 30 };
const p1: Pnt = tempPoint; // OK
const p2: Pnt = { x: 10, y: 20, z: 30 } as Pnt; // OK

// ============================================================================
// 7️⃣ Property Modifiers Combinations
// ============================================================================

interface AppConfigMod {
    readonly id: number;
    readonly name: string;
    timeout?: number;
    readonly retries?: number;
}

const cfg: AppConfigMod = {
    id: 1,
    name: "MyApp"
};

cfg.timeout = 5000; // OK

// ============================================================================
// 8️⃣ Nested & Complex Object Types
// ============================================================================

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
    }[];
    metadata?: Record<string, any>;
}

// ============================================================================
// 9️⃣ Mapped Types
// ============================================================================

type UserExample = {
    id: number;
    name: string;
    email: string;
};

type OptionalUser = {
    [K in keyof UserExample]?: UserExample[K];
};

type ReadonlyMapped = {
    readonly [K in keyof UserExample]: UserExample[K];
};

type Mutable<T> = {
    -readonly [K in keyof T]: T[K];
};

type RequiredMapped<T> = {
    [K in keyof T]-?: T[K];
};

// Conditional Mapped

type NullableStrings<T> = {
    [K in keyof T]: T[K] extends string ? T[K] | null : T[K];
};

// ============================================================================
// 🔟 Template Literal Types
// ============================================================================

type Prefix = "get" | "set";
type Suffix = "Name" | "Age" | "Email";

type Methods = `${Prefix}${Suffix}`;

type EventName = "click" | "focus" | "blur";
type ElementEvent = `on${Capitalize<EventName>}`;

// ============================================================================
// 1️⃣1️⃣ keyof
// ============================================================================

interface UserK {
    id: number;
    name: string;
    email: string;
}

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

// ============================================================================
// 1️⃣2️⃣ typeof Operator
// ============================================================================

const exampleUser = {
    id: 1,
    name: "Ahmed",
    email: "ahmed@example.com"
};

type ExampleUserType = typeof exampleUser;

// ============================================================================
// 1️⃣3️⃣ Const Assertions (as const)
// ============================================================================

const COLORS = {
    primary: "#007bff",
    secondary: "#6c757d"
} as const;

type ColorName = keyof typeof COLORS;

type ColorValue = typeof COLORS[ColorName];

// ============================================================================
// 1️⃣4️⃣ مثال عملي كبير — Configuration Management System
// ============================================================================

interface BaseConfig {
    readonly id: string;
    readonly name: string;
    version: string;
}

interface DatabaseConfig {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    ssl?: boolean;
    readonly connectionPool?: {
        min: number;
        max: number;
    };
}

interface ApiConfig {
    baseUrl: string;
    timeout: number;
    retries: number;
    headers: Record<string, string>;
    endpoints: Record<string, string>;
}

interface LoggingConfig {
    level: "debug" | "info" | "warn" | "error";
    format: "json" | "text";
    outputs: readonly ("console" | "file" | "remote")[];
    filePath?: string;
    remoteUrl?: string;
}

interface AppConfig extends BaseConfig {
    database: DatabaseConfig;
    api: ApiConfig;
    logging: LoggingConfig;
    features: Record<string, boolean>;
    metadata?: Record<string, any>;
}

type Environment = "development" | "staging" | "production";

// DEV CONFIG
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
} as const;

// Production Config
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

class ConfigManager {
    private configs: Record<Environment, AppConfig>;
    private currentEnv: Environment;

    constructor() {
        this.configs = {
            development: DEV_CONFIG as any as AppConfig,
            staging: PROD_CONFIG,
            production: PROD_CONFIG
        };
        this.currentEnv = "development";
    }

    getConfig(): Readonly<AppConfig> {
        return this.configs[this.currentEnv];
    }
}

// ============================================================================
