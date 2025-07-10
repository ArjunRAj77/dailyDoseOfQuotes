import { users, quotes, type User, type InsertUser, type Quote, type InsertQuote } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllQuotes(): Promise<Quote[]>;
  getQuotesByCategory(category: string): Promise<Quote[]>;
  getRandomQuote(): Promise<Quote | undefined>;
  getQuote(id: number): Promise<Quote | undefined>;
  createQuote(quote: InsertQuote): Promise<Quote>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private quotes: Map<number, Quote>;
  private currentUserId: number;
  private currentQuoteId: number;

  constructor() {
    this.users = new Map();
    this.quotes = new Map();
    this.currentUserId = 1;
    this.currentQuoteId = 1;
    
    // Initialize with some inspiring quotes
    this.initializeQuotes();
  }

  private initializeQuotes() {
    const initialQuotes: Omit<Quote, 'id'>[] = [
      {
        text: "The only way to do great work is to love what you do. Stay hungry, stay foolish, and never settle for ordinary.",
        author: "Steve Jobs",
        category: "Philosophy"
      },
      {
        text: "Life is what happens to you while you're busy making other plans.",
        author: "John Lennon",
        category: "Famous People"
      },
      {
        text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
        author: "Nelson Mandela",
        category: "Inspiration"
      },
      {
        text: "May the Force be with you.",
        author: "Obi-Wan Kenobi",
        category: "Movies"
      },
      {
        text: "The way to get started is to quit talking and begin doing.",
        author: "Walt Disney",
        category: "Success"
      },
      {
        text: "Your time is limited, so don't waste it living someone else's life.",
        author: "Steve Jobs",
        category: "Philosophy"
      },
      {
        text: "If life were predictable it would cease to be life, and be without flavor.",
        author: "Eleanor Roosevelt",
        category: "Famous People"
      },
      {
        text: "It is during our darkest moments that we must focus to see the light.",
        author: "Aristotle",
        category: "Philosophy"
      },
      {
        text: "I'll be back.",
        author: "The Terminator",
        category: "Movies"
      },
      {
        text: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt",
        category: "Inspiration"
      },
      {
        text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        author: "Winston Churchill",
        category: "Success"
      },
      {
        text: "You miss 100% of the shots you don't take.",
        author: "Wayne Gretzky",
        category: "Success"
      },
      {
        text: "Keep your friends close, but your enemies closer.",
        author: "The Godfather",
        category: "Movies"
      },
      {
        text: "The only impossible journey is the one you never begin.",
        author: "Tony Robbins",
        category: "Inspiration"
      },
      {
        text: "In the end, we will remember not the words of our enemies, but the silence of our friends.",
        author: "Martin Luther King Jr.",
        category: "Famous People"
      },
      {
        text: "Life is like a box of chocolates. You never know what you're gonna get.",
        author: "Forrest Gump",
        category: "Movies"
      },
      {
        text: "The unexamined life is not worth living.",
        author: "Socrates",
        category: "Philosophy"
      },
      {
        text: "Be yourself; everyone else is already taken.",
        author: "Oscar Wilde",
        category: "Famous People"
      },
      {
        text: "Believe you can and you're halfway there.",
        author: "Theodore Roosevelt",
        category: "Inspiration"
      },
      {
        text: "The only thing we have to fear is fear itself.",
        author: "Franklin D. Roosevelt",
        category: "Famous People"
      }
    ];

    initialQuotes.forEach(quote => {
      const id = this.currentQuoteId++;
      this.quotes.set(id, { ...quote, id });
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllQuotes(): Promise<Quote[]> {
    return Array.from(this.quotes.values());
  }

  async getQuotesByCategory(category: string): Promise<Quote[]> {
    return Array.from(this.quotes.values()).filter(
      quote => quote.category.toLowerCase() === category.toLowerCase()
    );
  }

  async getRandomQuote(): Promise<Quote | undefined> {
    const allQuotes = Array.from(this.quotes.values());
    if (allQuotes.length === 0) return undefined;
    
    const randomIndex = Math.floor(Math.random() * allQuotes.length);
    return allQuotes[randomIndex];
  }

  async getQuote(id: number): Promise<Quote | undefined> {
    return this.quotes.get(id);
  }

  async createQuote(insertQuote: InsertQuote): Promise<Quote> {
    const id = this.currentQuoteId++;
    const quote: Quote = { ...insertQuote, id };
    this.quotes.set(id, quote);
    return quote;
  }
}

export const storage = new MemStorage();
