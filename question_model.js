
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Question = require('./models/Question');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error));

const seedQuestions = async () => {
    const questions = [
        {
            questionText: "Which of the following is a valid declaration of a float in Java?",
            options: ["float f = 10.5;", "float f = 10.5f;", "float f = 10.5F;", "Both B and C"],
            correctAnswer: 3
        },
        {
            questionText: "What is the size of a char in Java?",
            options: ["8 bits", "16 bits", "32 bits", "64 bits"],
            correctAnswer: 1
        },
        {
            questionText: "Which of the following is not a valid keyword in Java?",
            options: ["static", "String", "void", "private"],
            correctAnswer: 1
        },
        {
            questionText: "Which method is the entry point for any Java application?",
            options: ["start()", "main()", "init()", "run()"],
            correctAnswer: 1
        },
        {
            questionText: "What is the default value of a boolean variable in Java?",
            options: ["true", "false", "0", "null"],
            correctAnswer: 1
        },
        {
            questionText: "Which of the following can be used to create an object in Java?",
            options: ["new", "class", "object", "instance"],
            correctAnswer: 0
        },
        {
            questionText: "Which of the following statements is used to exit a loop in Java?",
            options: ["stop", "exit", "break", "return"],
            correctAnswer: 2
        },
        {
            questionText: "What is the purpose of the final keyword in Java?",
            options: ["To make a class final", "To make a variable unchangeable", "To prevent method overriding", "All of the above"],
            correctAnswer: 3
        },
        {
            questionText: "Which of the following is a correct way to declare an array in Java?",
            options: ["int arr[];", "int[] arr;", "int arr[5];", "Both A and B"],
            correctAnswer: 3
        },
        {
            questionText: "Which interface does Java use for event handling?",
            options: ["EventListener", "Runnable", "Serializable", "Cloneable"],
            correctAnswer: 0
        },
        {
            questionText: "What is the output of System.out.println(3 + 4 + 'Hello');?",
            options: ["7Hello", "Hello7", "3Hello4", "Hello34"],
            correctAnswer: 0
        },
        {
            questionText: "Which of the following exceptions is thrown when trying to divide by zero?",
            options: ["IOException", "ArithmeticException", "NullPointerException", "ArrayIndexOutOfBoundsException"],
            correctAnswer: 1
        },
        {
            questionText: "What is the main purpose of garbage collection in Java?",
            options: ["To remove unused variables", "To free up memory", "To optimize performance", "To manage threads"],
            correctAnswer: 1
        },
        {
            questionText: "Which of the following can be a superclass in Java?",
            options: ["Object", "String", "Integer", "All of the above"],
            correctAnswer: 0
        },
        {
            questionText: "Which of the following is used to handle exceptions in Java?",
            options: ["try-catch", "throw-try", "throw-catch", "catch-throw"],
            correctAnswer: 0
        },
        {
            questionText: "What is the purpose of the this keyword in Java?",
            options: ["To refer to the current class", "To refer to the current object", "To access static members", "To create a new object"],
            correctAnswer: 1
        },
        {
            questionText: "What does super keyword do in Java?",
            options: ["Refers to the parent class", "Refers to the current class", "Refers to static methods", "None of the above"],
            correctAnswer: 0
        },
        {
            questionText: "Which of the following is a valid constructor in Java?",
            options: ["MyClass() {}", "void MyClass() {}", "MyClass() { return; }", "MyClass() : this() {}"],
            correctAnswer: 0
        },
        {
            questionText: "What will be the output of System.out.println('5' + 5);?",
            options: ["10", "55", "Error", "5"],
            correctAnswer: 1
        },
        {
            questionText: "Which of the following is true about the String class in Java?",
            options: ["Strings are mutable", "Strings are immutable", "Strings can be changed", "Strings do not support concatenation"],
            correctAnswer: 1
        },
        {
            questionText: "What does the instanceof operator do in Java?",
            options: ["Checks if a variable is an instance of a class", "Creates a new instance of a class", "Casts an object to a class", "None of the above"],
            correctAnswer: 0
        },
        {
            questionText: "Which of the following is not a valid access modifier in Java?",
            options: ["public", "private", "protected", "hidden"],
            correctAnswer: 3
        },
        {
            questionText: "What is the default access modifier for a class in Java if no access modifier is specified?",
            options: ["public", "private", "protected", "Package-private"],
            correctAnswer: 3
        },
        {
            questionText: "What is polymorphism in Java?",
            options: ["Multiple methods with the same name", "The ability of different classes to be treated as instances of the same class", "Both A and B", "None of the above"],
            correctAnswer: 2
        },
        {
            questionText: "Which method is used to start a thread in Java?",
            options: ["run()", "start()", "begin()", "init()"],
            correctAnswer: 1
        },
        {
            questionText: "What is an abstract class in Java?",
            options: ["A class that cannot be instantiated", "A class that can have abstract methods", "A class that must be extended", "All of the above"],
            correctAnswer: 3
        },
        {
            questionText: "Which of the following statements is correct about interfaces in Java?",
            options: ["An interface can contain method implementations", "A class can implement multiple interfaces", "Interfaces cannot extend other interfaces", "All of the above"],
            correctAnswer: 1
        },
        {
            questionText: "What is the output of the following code? System.out.println(10 + '20');?",
            options: ["30", "1020", "Error", "10 20"],
            correctAnswer: 1
        },
        {
            questionText: "Which of the following is not a Java feature?",
            options: ["Object-oriented", "Platform-independent", "Use of pointers", "Multithreading"],
            correctAnswer: 2
        },
        {
            questionText: "Which of the following is the correct way to declare a method in Java?",
            options: ["public void methodName()", "void methodName() public", "methodName() public void", "public methodName() void"],
            correctAnswer: 0
        }
    ];
    

    try {
        await Question.insertMany(questions);
        console.log("Questions inserted successfully!");
    } catch (error) {
        console.error("Error inserting questions:", error);
    } finally {
        mongoose.connection.close();
    }
};

seedQuestions();
