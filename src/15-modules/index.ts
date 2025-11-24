/*
===========================================
📘 TypeScript Modules — Simplified Version (Option B)
===========================================

📑 الفهرس:
1. ما هي الـ Modules؟
2. Named Exports & Imports
3. Default Exports & Imports
4. Mix: Named + Default
5. Barrel Exports (index.ts)
6. Type-Only Imports / Exports
7. Dynamic Imports (مهم لـ Angular lazy loading)
8. Module Resolution
9. Path Mapping (مهم جدًا في Angular)
10. Module Organization Patterns
11. Circular Dependencies — وكيف نتجنبها
-------------------------------------------

1️⃣ ما هي الـ Modules؟
Modules = ملفات مستقلة تحتوي على وظائف/كلاسات/متغيرات يمكن تصديرها واستخدامها في ملفات أخرى.
-------------------------------------------
*/

/*
2️⃣ Named Exports — أفضل أسلوب في معظم المشاريع
-------------------------------------------
*/
export const PI = 3.14159;

export function add(a: number, b: number): number {
    return a + b;
}

export class Calculator {
    multiply(a: number, b: number): number {
        return a * b;
    }
}

/* Example import:
import { PI, add, Calculator } from './module';
*/

/*
3️⃣ Default Export — استخدمه عند وجود "شيء رئيسي" في الملف
-------------------------------------------
*/
export default class User {
    constructor(public id: number, public name: string) { }
}

/* Example import:
import User from './user';
*/

/*
4️⃣ Mixing Default + Named
-------------------------------------------
*/
export const API_URL = "https://api.example.com";
export function connect() { }
// default can exist once
// export default function createClient() {}

/*
5️⃣ Barrel Exports (index.ts) — تنظيم أفضل
-------------------------------------------
index.ts:
export * from './user';
export * from './product';
export * from './order';
*/

/*
6️⃣ Type-Only Imports — لتحسين الأداء وإزالة الأنواع في JS الناتج
-------------------------------------------
*/
// import type { IUser } from './types';

// let user: IUser = { id: 1, name: "Ahmed" };

/*
7️⃣ Dynamic Imports — مهم لـ Lazy Loading
-------------------------------------------
*/
// async function loadModule() {
//   const module = await import('./heavy');
//   module.run();
// }

/* مثال في Angular:
loadChildren: () => import('./admin/admin.module')
  .then(m => m.AdminModule)
*/

/*
8️⃣ Module Resolution — مسارات Relative
-------------------------------------------
import { User } from './user';      // نفس المجلد
import { Product } from '../models'; // مستوى أعلى
*/

/*
9️⃣ Path Mapping — مهم جدًا في Angular
-------------------------------------------
tsconfig.json:
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@models/*": ["models/*"],
      "@services/*": ["services/*"]
    }
  }
}
-------------------------------------------
Example:
import { User } from '@models/user';
*/

/*
🔟 Module Organization Patterns
-------------------------------------------
Feature-based structure (المفضل في Angular):
features/user/
  user.model.ts
  user.service.ts
  user.component.ts
  index.ts
*/

/*
1️⃣1️⃣ Circular Dependencies — تجنبها
-------------------------------------------
الحل: استخراج types في ملفات منفصلة وعدم جعل ملف يعتمد على ملف يعتمد عليه.
*/

// مثال مبسط للحل
export interface IEntity { id: number; }

export class A implements IEntity {
    constructor(public id: number) { }
}

export class B implements IEntity {
    constructor(public id: number) { }
}

/*
===========================================
✔️ جاهز للنسخ داخل VSCode
✔️ منظم + مختصر
✔️ بدون تفاصيل متقدمة مزعجة
✔️ يغطي ما تحتاجه قبل البدء في Angular
===========================================
*/
