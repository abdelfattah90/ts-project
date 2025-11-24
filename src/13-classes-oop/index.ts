/********************************************************************************************
 *                            TypeScript OOP & Classes (نسخة مبسطة)                          *
                                    
 ********************************************************************************************/

/**
 * ===============================
 * 📘 الفهرس
 * ===============================
 * 1. مقدمة OOP في TypeScript
 * 2. تعريف Class بسيط
 * 3. Constructor واستخدام this
 * 4. Modifiers: public / private / protected
 * 5. readonly keyword
 * 6. Getter & Setter
 * 7. Methods
 * 8. Inheritance (الوراثة)
 * 9. super()
 * 10. Override
 * 11. Abstract Classes
 * 12. Interfaces vs Classes
 * 13. Static Members
 * 14. instanceof
 * 15. استخدام الكلاسات في Angular
 * 16. مثال عملي شامل
 */

/********************************************************************************************
 * 1️⃣ مقدمة
 * الكلاسات = قالب لإنشاء كائنات (Objects) لها خصائص + دوال.
 * TypeScript يضيف نظام typing قوي فوق JavaScript.
 ********************************************************************************************/

/********************************************************************************************
 * 2️⃣ تعريف Class بسيط
 ********************************************************************************************/

class User {
    name: string;
    email: string;

    constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
    }

    greet() {
        console.log(`Hello ${this.name}`);
    }
}

const u1 = new User("Ahmed", "a@test.com");
u1.greet();

/********************************************************************************************
 * 3️⃣ Constructor
 ********************************************************************************************/

class Product {
    constructor(public name: string, public price: number) { }
}

const p = new Product("Laptop", 5000);

/********************************************************************************************
 * 4️⃣ Modifiers → public / private / protected
 ********************************************************************************************/

class BankAccount {
    public owner: string;
    private balance: number = 0;
    protected currency: string = "USD";

    constructor(owner: string) {
        this.owner = owner;
    }

    deposit(amount: number) {
        this.balance += amount;
    }

    getBalance() {
        return this.balance;
    }
}

/********************************************************************************************
 * 5️⃣ readonly
 ********************************************************************************************/

class Settings {
    readonly version = "1.0";
}

/********************************************************************************************
 * 6️⃣ Getters & Setters
 ********************************************************************************************/

class Person {
    private _age = 0;

    set age(v: number) {
        if (v >= 0) this._age = v;
    }

    get age() {
        return this._age;
    }
}

/********************************************************************************************
 * 7️⃣ Methods
 ********************************************************************************************/

class Calc {
    add(a: number, b: number) {
        return a + b;
    }
}

/********************************************************************************************
 * 8️⃣ Inheritance (الوراثة)
 ********************************************************************************************/

class Animal {
    constructor(public name: string) { }
    move() {
        console.log(`${this.name} is moving`);
    }
}

class Dog extends Animal {
    bark() {
        console.log(`${this.name} barks`);
    }
}

/********************************************************************************************
 * 9️⃣ super()
 ********************************************************************************************/

class Car {
    constructor(public brand: string) { }
}

class BMW extends Car {
    constructor() {
        super("BMW");
    }
}

/********************************************************************************************
 * 🔟 Override
 ********************************************************************************************/

class Shape {
    area(): number {
        return 0;
    }
}

class Square extends Shape {
    constructor(public size: number) {
        super();
    }
    override area(): number {
        return this.size * this.size;
    }
}

/********************************************************************************************
 * 1️⃣1️⃣ Abstract Classes
 ********************************************************************************************/

abstract class Vehicle {
    abstract move(): void;
    stop() {
        console.log("Stopped");
    }
}

class Bike extends Vehicle {
    move() {
        console.log("Bike moving...");
    }
}

/********************************************************************************************
 * 1️⃣2️⃣ Interface vs Class
 ********************************************************************************************/

interface Printable {
    print(): void;
}

class Report implements Printable {
    print() {
        console.log("Printing report...");
    }
}

/********************************************************************************************
 * 1️⃣3️⃣ Static Members
 ********************************************************************************************/

class MathUtils {
    static PI = 3.14;
    static add(a: number, b: number) {
        return a + b;
    }
}

console.log(MathUtils.PI);
console.log(MathUtils.add(2, 3));

/********************************************************************************************
 * 1️⃣4️⃣ instanceof
 ********************************************************************************************/

const dog = new Dog("Rex");
console.log(dog instanceof Dog); // true
console.log(dog instanceof Animal); // true

/********************************************************************************************
 * 1️⃣5️⃣ استخدام الكلاسات في Angular
 ********************************************************************************************/

class UserModel {
    constructor(
        public id: number,
        public name: string,
        public email: string
    ) { }
}

class UserService {
    getUser() {
        return new UserModel(1, "Ahmed", "a@test.com");
    }
}

/********************************************************************************************
 * 1️⃣6️⃣ مثال عملي شامل
 ********************************************************************************************/

class TodoItem {
    constructor(public id: number, public title: string, public done = false) { }
}

class TodoList {
    private items: TodoItem[] = [];

    add(title: string) {
        const id = this.items.length + 1;
        this.items.push(new TodoItem(id, title));
    }

    toggle(id: number) {
        const item = this.items.find(i => i.id === id);
        if (item) item.done = !item.done;
    }

    getAll() {
        return this.items;
    }
}
